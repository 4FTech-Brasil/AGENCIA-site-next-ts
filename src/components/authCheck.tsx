/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function AuthCheck({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;

    if (!session) {
      router.push("/login");
      return;
    }

    // Type assertion para evitar erros de tipo
    const user = session.user as any;

    if (!user?.isAdmin) {
      router.push("/access-denied");
      return;
    }
  }, [session, status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-brand-dark flex items-center justify-center">
        <div className="flex items-center gap-3 text-white">
          <div className="w-5 h-5 border-2 border-brand-blue border-t-transparent rounded-full animate-spin"></div>
          Verificando acesso...
        </div>
      </div>
    );
  }

  const user = session?.user as any;
  console.log(user);

  if (!user?.isAdmin) {
    return null;
  }

  return <>{children}</>;
}
