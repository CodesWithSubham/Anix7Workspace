"use client";

import { useActionState } from "react";
import { uploadImageAction } from "./actions";
import { useSession } from "next-auth/react";

// Submit button with loading state
function SubmitButton({ pending }: { pending: boolean }) {
  return (
    <button
      type="submit"
      disabled={pending}
      className={`bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:opacity-50 ${
        pending ? "cursor-wait" : ""
      }`}
    >
      {pending ? "Uploading..." : "Upload"}
    </button>
  );
}

export default function UploadPage() {
  const [state, action, isPending] = useActionState(uploadImageAction, {
    success: false,
    message: "",
  });

  const { data: session, status } = useSession();
  const allowed =
    status === "authenticated" &&
    (session?.user?.role === "admin" || session?.user?.role === "owner");

  if (status === "loading") {
    return <p className="text-center mt-10">Loading...</p>;
  }

  if (!allowed) {
    return (
      <p className="text-center mt-10 text-red-500">
        You do not have permission to upload images.
      </p>
    );
  }

  return (
    <div className="max-w-lg mx-auto py-10 px-4">
      <h1 className="text-2xl font-semibold mb-6 text-center">
        Upload Image (Direct URL)
      </h1>

      <form action={action} className="flex flex-col gap-3">
        <input
          type="url"
          name="url"
          placeholder="Enter direct image URL (https://...)"
          className="border p-2 rounded"
          required
        />

        <input
          type="text"
          name="tags"
          placeholder="Tags (comma separated)"
          className="border p-2 rounded"
        />

        <SubmitButton pending={isPending} />
      </form>

      {state.message && (
        <p
          className={`text-center mt-4 text-sm ${
            state.success ? "text-green-600" : "text-red-500"
          }`}
        >
          {state.message}
        </p>
      )}

      <p className="text-center mt-6 text-gray-500 text-xs">
        Uploaded images need admin approval before appearing publicly.
      </p>
    </div>
  );
}
