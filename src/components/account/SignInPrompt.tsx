"use client";

import { Button } from "@/components/ui/button";

export const SignInPrompt = ({ login }: { login: () => void }) => {
  return (
    <main className="bg-[#F9FAFB]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col items-center gap-4 text-center">
        <p className="text-2xl font-semibold text-[#111827]">
          Please sign in to view your account.
        </p>
        <p className="text-sm text-[#4B5563] max-w-xl">
          Your profile, donations, and trees are available once you are logged
          in.
        </p>
        <Button
          onClick={login}
          className="bg-[#003399] text-white px-5 py-3 h-auto rounded-lg"
        >
          Sign in
        </Button>
      </div>
    </main>
  );
};