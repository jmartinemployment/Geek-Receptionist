export default function SignedOut() {
  return (
    <main className="center">
      <h1>You are signed out</h1>
      <a className="button" href="/api/auth/start">
        Sign in again
      </a>
    </main>
  );
}
