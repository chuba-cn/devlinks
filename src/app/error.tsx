"use client";

import Navbar from "@/components/navigation/Navbar";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { FaExclamationTriangle } from "react-icons/fa";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <main>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-10 rounded shadow-md text-center">
          <FaExclamationTriangle className="h-16 w-16 text-yellow-500 mx-auto" />
          <h2 className="text-3xl font-bold text-gray-800 mt-4">
            Something went wrong!
          </h2>
          <p className="text-gray-600 mt-2">
            An unexpected error has occurred. Please try again.
          </p>
          <Button onClick={() => reset()} className="mt-4 inline-block">
            Try again
          </Button>
        </div>
      </div>
    </main>
  );
}
