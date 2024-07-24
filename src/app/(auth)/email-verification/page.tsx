"use client";
import { Button } from "@/components/ui/button";
import { verifyEmailResponse } from "@/types/response";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";

function EmailVerificationPage() {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const router = useRouter();

  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  const onSubmit = useCallback(() => {
    if (!token) {
      setError("Missing Token");
      return;
    }
    fetch("/api/verify-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    })
      .then((data) => data.json())
      .then((data: verifyEmailResponse) => {
        if (data.success) {
          setSuccess(data.success);
        } else {
          setError(data.error);
        }
      })
      .catch(() => {
        setError("Something Went Wrong");
      });
  }, [token]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <main className="flex-1 flex items-center justify-center">
      <div className="flex flex-col gap-8">
        <div>
          {!success && !error && (
            <p className="text-center">
              Verifying your email
              <BeatLoader className="inline-block mr-2" />
            </p>
          )}
        </div>

        {error && (
          <div className="bg-red-200 text-red-600 border-2 border-red-300 py-2 px-8 rounded-lg">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-200 text-green-600 border-2 border-green-300 py-2 px-8 rounded-lg">
            {success}
          </div>
        )}
        <div className="flex flex-col items-center">
          <Button
            onClick={() => {
              router.push("/login");
            }}
            className="w-fit"
            disabled={!success && !error}
          >
            Go To Login Page
          </Button>
        </div>
      </div>
    </main>
  );
}

export default EmailVerificationPage;
