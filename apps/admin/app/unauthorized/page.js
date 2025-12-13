"use client";

import { useSession } from "@shared/auth/client";
import { WorkBox } from "@shared/components/ui/Boxes";
import { Button } from "@shared/components/ui/Button";

export default function UnauthorizedPage() {
  const session = useSession();

  return (
    <div className="min-h-[50vh] flex items-center justify-center px-4">
      <WorkBox className="max-w-md w-full rounded-2xl shadow-lg p-8 text-center space-y-4">
        <h1 className="text-3xl font-bold text-red-500">Unauthorized</h1>
        {session.status === "loading" ? (
          <p className="text-gray-500">Loading...</p>
        ) : session?.data?.user ? (
          <>
            <p className="text-gray-500">
              <strong>Hay {session.data.user.name}</strong>, You do not
              have permission to view this page.
            </p>
            <Button href="https://www.anix7.in" className="w-full">
              Go to Home
            </Button>
          </>
        ) : (
          <>
            <p className="text-gray-500">
              You do not have permission to view this page.
            </p>
            <Button htmlFor="loginSignupCheckId" className="w-full">
              Click to Login
            </Button>
          </>
        )}
      </WorkBox>
    </div>
  );
}
