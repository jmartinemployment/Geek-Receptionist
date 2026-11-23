# Mongo behind WireGuard: runbook (2026-11-23)

Goal: Mongo on the VPS (`2.24.101.90`) stops accepting connections from the internet. GeekRepository on Railway reaches it only through a WireGuard tunnel, with TLS inside the tunnel. Nothing here has been run; I cannot reach the VPS. Placeholders are in angle brackets. Never paste real keys into a chat or a commit.

## Corrections to the pasted instructions
1. **The tunnel belongs in GeekRepository, not GeekAPI.** Only GeekRepository connects to Mongo (`MONGO_CRAWLER_URL`, `GeekRepository/ServiceRegistration.cs:88`). GeekAPI has no Mongo connection. The setting is `MONGO_CRAWLER_URL`, not `MONGODB_URI`.
2. **Mongo runs in Docker on the VPS** (project `mongodb`, image `mongo:7.0`, per `Geek-Crawler-v2/README.md`), not as a host `mongod`. `/etc/mongod.conf` and `systemctl restart mongod` do not apply. Configure it through its compose file.
3. **Inside the container, bind to all interfaces and restrict on the host side.** Use `bindIp: 0.0.0.0` in the container and publish the port as `"10.8.0.1:27017:27017"` (the WireGuard address), never `0.0.0.0`. Docker bypasses ufw rules for published ports, so the publish address is the real control.
4. **Do not set `tls.CAFile` on the server** unless you want client certificates. With a server CA file set, Mongo requires clients to present a certificate unless `allowConnectionsWithoutCertificates` is set (check the Mongo 7 docs before relying on this). The server needs only its own certificate and key; the client holds the CA certificate to check the server.
5. **Vercel OIDC issuer** is `https://oidc.vercel.com/<TEAM>` (team mode), not `https://vercel.com<team_slug>` (see `plans/vercel-machine-identity-for-geekapi.md`).
6. Use `10.8.0.0/24` for the tunnel (server `10.8.0.1`, GeekRepository `10.8.0.2`, your laptop `10.8.0.3`).

## Phase 0: before changing anything
- Keep a second SSH session open for the whole job. Confirm key login works before turning off passwords.
- Check logs for intruders since 2026-10-20: `/var/log/auth.log` on the VPS, `~/.ssh/authorized_keys`, and unexpected outbound connections. Check Railway deployment and build logs and Vercel logs for the same period.

## Phase 1: WireGuard on the VPS
```
apt-get update && apt-get install -y wireguard
umask 077; mkdir -p /etc/wireguard && cd /etc/wireguard
wg genkey | tee server.key | wg pubkey > server.pub
wg genkey | tee repo.key   | wg pubkey > repo.pub      # GeekRepository's keypair
wg genkey | tee laptop.key | wg pubkey > laptop.pub    # your laptop's keypair
wg genpsk > repo.psk; wg genpsk > laptop.psk
```
`/etc/wireguard/wg0.conf`:
```
[Interface]
PrivateKey = <contents of server.key>
Address = 10.8.0.1/24
ListenPort = 51820

[Peer]   # GeekRepository (Railway)
PublicKey = <repo.pub>
PresharedKey = <repo.psk>
AllowedIPs = 10.8.0.2/32

[Peer]   # laptop
PublicKey = <laptop.pub>
PresharedKey = <laptop.psk>
AllowedIPs = 10.8.0.3/32
```
```
systemctl enable --now wg-quick@wg0 && ufw allow 51820/udp && wg show
```
Then put `repo.key` and `repo.psk` into Railway as variables, and delete the private key and preshared key files for the Railway peer from the VPS.

## Phase 2: certificates for TLS inside the tunnel
Run on a trusted machine. Keep `ca.key` offline; only `ca.crt` (public) is shipped.
```
umask 077; mkdir pki && cd pki
openssl genrsa -out ca.key 4096
openssl req -x509 -new -key ca.key -sha256 -days 1825 -subj "/CN=Geek Mongo CA" -out ca.crt
openssl genrsa -out mongo.key 4096
openssl req -new -key mongo.key -subj "/CN=mongo.geek" -out mongo.csr
printf 'subjectAltName=IP:127.0.0.1,IP:10.8.0.1\nextendedKeyUsage=serverAuth\nbasicConstraints=CA:FALSE\n' > san.cnf
openssl x509 -req -in mongo.csr -CA ca.crt -CAkey ca.key -CAcreateserial -out mongo.crt -days 365 -sha256 -extfile san.cnf
cat mongo.key mongo.crt > mongo.pem
```
The server certificate expires in 365 days: put the date in a calendar and re-issue before then. The SAN includes `127.0.0.1` because GeekRepository connects to the local end of the tunnel.

## Phase 3: Mongo's compose file on the VPS (keep public access during cutover)
Mount `mongo.pem` read-only and change the command and port:
```
command: ["mongod","--auth","--bind_ip","0.0.0.0","--tlsMode","requireTLS","--tlsCertificateKeyFile","/etc/ssl/mongo.pem"]
ports:   ["10.8.0.1:27017:27017"]
```
During cutover, if GeekRepository still connects over the internet, publish `"0.0.0.0:27017:27017"` temporarily and remove it in Phase 5. Clients must now use TLS, so GeekRepository's current non-TLS connection breaks the moment Mongo restarts with `requireTLS`: do Phases 3 and 4 in one maintenance window.

## Phase 4: GeekRepository container
- Add the wireproxy binary and `netcat` to `Dockerfile.repository`; copy `ca.crt` (public) to `/app/ca.crt`.
- Set Railway variables on GeekRepository only: `WG_PRIVATE_KEY`, `WG_PRESHARED_KEY`, `WG_CLIENT_ADDRESS=10.8.0.2/32`, `VPS_WG_PUBLIC_KEY`, `VPS_WG_ENDPOINT=2.24.101.90:51820`.
- `MONGO_CRAWLER_URL` becomes `mongodb://<user>:<pass>@127.0.0.1:27017/?authSource=admin&tls=true&tlsCAFile=/app/ca.crt&directConnection=true`.
- Entrypoint (fail loud; `set -eu`; checks that wireproxy is alive; scrubs keys from the environment before `exec`):
```
#!/bin/sh
set -eu
: "${WG_PRIVATE_KEY:?}" "${WG_PRESHARED_KEY:?}" "${WG_CLIENT_ADDRESS:?}" "${VPS_WG_PUBLIC_KEY:?}" "${VPS_WG_ENDPOINT:?}"
[ -d /dev/shm ] && [ -w /dev/shm ] || { echo "[FATAL] /dev/shm not writable" >&2; exit 1; }
umask 077
CONF=$(mktemp /dev/shm/wp.XXXXXX)
cat > "$CONF" <<EOT
[Interface]
PrivateKey = $WG_PRIVATE_KEY
Address = $WG_CLIENT_ADDRESS

[Peer]
PublicKey = $VPS_WG_PUBLIC_KEY
PresharedKey = $WG_PRESHARED_KEY
Endpoint = $VPS_WG_ENDPOINT
AllowedIPs = 10.8.0.1/32
PersistentKeepalive = 25

[TCPClientTunnel]
BindAddress = 127.0.0.1:27017
Target = 10.8.0.1:27017
EOT
unset WG_PRIVATE_KEY WG_PRESHARED_KEY
wireproxy -n -c "$CONF" >&2 || { rm -f "$CONF"; echo "[FATAL] bad wireproxy config" >&2; exit 1; }
wireproxy -c "$CONF" >&2 &
WP=$!
i=0
until nc -z 127.0.0.1 27017 2>/dev/null; do
  kill -0 "$WP" 2>/dev/null || { rm -f "$CONF"; echo "[FATAL] wireproxy exited" >&2; exit 1; }
  i=$((i+1)); [ "$i" -ge 20 ] && { rm -f "$CONF"; kill "$WP" 2>/dev/null; echo "[FATAL] tunnel did not bind" >&2; exit 1; }
  sleep 0.5
done
rm -f "$CONF"
exec "$@"
```
Open question: the local port only proves wireproxy is listening, not that the tunnel reached Mongo. The app's own Mongo call fails loudly if the tunnel is down; add a health check that pings Mongo so Railway restarts the container.

## Phase 5: close the public port, then rotate
1. On the VPS: `wg show` must show a recent handshake; GeekRepository logs must show Mongo calls succeeding over the tunnel.
2. Republish Mongo only on `10.8.0.1`, restart it, then `ufw allow in on wg0 from 10.8.0.2 to 10.8.0.1 port 27017 proto tcp` and delete any public 27017 rule.
3. From a machine outside the VPS and Railway: `nc -zv -w 3 2.24.101.90 27017` must fail.
4. Rotate the Mongo user's password inside the container (`mongosh --tls --tlsCAFile ca.crt --host 127.0.0.1`), update `MONGO_CRAWLER_URL` in Railway, redeploy GeekRepository, and read its logs for successful Mongo calls.
5. SSH: only after a second key-login session works, set `PasswordAuthentication no` and `PermitRootLogin prohibit-password` (or `no` with a deploy user), `ufw limit 22/tcp`.
6. Laptop scripts (Rag): connect through the laptop peer `10.8.0.3`.

## Residual risk
GeekRepository's WireGuard key and preshared key and the Mongo password are all Railway variables. Anyone who reads them can use the tunnel. What changes: Mongo is no longer reachable from the internet; a thief reaches only that port, from that peer; rotation takes minutes (new keys on the VPS, update two variables, `wg set wg0 peer <old-pubkey> remove`); and handshake time in `wg show` reveals use.
