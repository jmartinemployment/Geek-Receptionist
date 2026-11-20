"use client";

import { useActionState, useState } from "react";
import { ui } from "@/lib/ui";
import { connectBucketAction, type BucketState } from "./actions";

const start: BucketState = { error: null, provider: "aws_s3", bucket: "", keyPrefix: "", region: "" };

const field =
  "rounded-md border border-line bg-paper px-3 py-2 text-ink focus-visible:outline-3 focus-visible:outline-offset-1 focus-visible:outline-accent";

/**
 * Where the owner enters their own bucket. The policy below the form is built from what they have typed, so they can grant the key
 * before they make it; it is the least this product needs — one action that may put an object, and nothing that could read, list or
 * delete. The secret is typed, sent once and never shown again: the form keeps the bucket and region on a failure and never the keys.
 */
export function BucketForm({ policyFor }: { policyFor: (provider: string, bucket: string, keyPrefix: string) => Promise<string> }) {
  const [state, action, pending] = useActionState(connectBucketAction, start);
  const [provider, setProvider] = useState(state.provider);
  const [bucket, setBucket] = useState(state.bucket);
  const [keyPrefix, setKeyPrefix] = useState(state.keyPrefix);
  const [policy, setPolicy] = useState<string | null>(null);
  const [policyError, setPolicyError] = useState<string | null>(null);

  async function showPolicy() {
    setPolicyError(null);
    try {
      setPolicy(await policyFor(provider, bucket, keyPrefix));
    } catch {
      setPolicy(null);
      setPolicyError("The policy could not be built. Check the bucket name and try again.");
    }
  }

  return (
    <form action={action} className="flex flex-col gap-2 text-left" aria-describedby={state.error ? "bucket-error" : undefined}>
      {state.error ? (
        <p id="bucket-error" className={ui.status.bad} role="alert">
          {state.error}
        </p>
      ) : null}

      <label htmlFor="bucket-provider" className="font-semibold">
        Where
      </label>
      <select
        id="bucket-provider"
        name="provider"
        className={field}
        value={provider}
        onChange={(event) => setProvider(event.target.value)}
      >
        <option value="aws_s3">Amazon S3</option>
        <option value="google_cloud_storage">Google Cloud Storage</option>
      </select>

      <label htmlFor="bucket-name" className="font-semibold">
        Bucket
      </label>
      <input
        id="bucket-name"
        name="bucket"
        required
        autoComplete="off"
        className={field}
        value={bucket}
        onChange={(event) => setBucket(event.target.value)}
      />

      <label htmlFor="bucket-region" className="font-semibold">
        Region
      </label>
      <input id="bucket-region" name="region" required autoComplete="off" defaultValue={state.region} className={field} />

      <label htmlFor="bucket-prefix" className="font-semibold">
        Folder inside the bucket <span className={ui.muted}>(optional)</span>
      </label>
      <input
        id="bucket-prefix"
        name="keyPrefix"
        autoComplete="off"
        className={field}
        value={keyPrefix}
        onChange={(event) => setKeyPrefix(event.target.value)}
      />

      <button type="button" className={`${ui.button} mt-2`} onClick={showPolicy} disabled={bucket.trim() === ""}>
        Show the permission to grant
      </button>
      {policyError ? (
        <p className={ui.status.bad} role="alert">
          {policyError}
        </p>
      ) : null}
      {policy ? (
        <>
          <p className={ui.muted}>
            Grant exactly this and nothing more. It allows writing one object and does not allow reading, listing or deleting anything.
          </p>
          <pre className="overflow-x-auto rounded-md border border-line bg-paper p-3 text-sm">{policy}</pre>
        </>
      ) : null}

      <label htmlFor="bucket-key" className="font-semibold">
        Access key
      </label>
      <input id="bucket-key" name="accessKeyId" required autoComplete="off" className={field} />

      <label htmlFor="bucket-secret" className="font-semibold">
        Secret
      </label>
      <input id="bucket-secret" name="secretAccessKey" type="password" required autoComplete="off" className={field} />
      <p className={ui.muted}>The secret is sent once, stored encrypted, and never shown again.</p>

      <button className={`${ui.button} mt-2`} type="submit" disabled={pending}>
        {pending ? "Saving…" : "Save bucket"}
      </button>
    </form>
  );
}
