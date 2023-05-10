"use client"; // Error components must be Client components

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-auto flex-col justify-center px-6 py-24 lg:px-8">
      <p className="text-base font-semibold leading-8 text-blue-600">Oops!</p>
      <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-3xl">
        Something went wrong.
      </h1>
      <div className="mt-10">
        <button
          onClick={reset}
          className="text-sm font-semibold leading-7 text-blue-600"
        >
          <span aria-hidden="true">&larr;</span> Retry
        </button>
      </div>
    </div>
  );
}
