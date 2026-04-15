import { Suspense } from "react";

import LoginForm from "./LoginForm";

function LoginFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f2f2f2] px-6">
      <div className="h-10 w-full max-w-sm animate-pulse rounded-2xl bg-neutral-200/80" />
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<LoginFallback />}>
      <LoginForm />
    </Suspense>
  );
}
