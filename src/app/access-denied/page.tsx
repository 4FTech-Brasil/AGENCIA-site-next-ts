import { redirect } from "next/navigation";
import { auth, signOut } from "@/lib/auth";

export default async function AccessDeniedPage() {
  const session = await auth();

  // Se não está logado, redireciona para login
  if (!session) {
    redirect("/login");
  }

  async function logoutAction() {
    "use server";
    await signOut({ redirectTo: "/" });
  }

  return (
    <div className="min-h-screen bg-brand-dark flex items-center justify-center py-20">
      <div className="bg-brand-gray rounded-2xl p-8 max-w-md w-full mx-4 text-center">
        <div className="text-6xl mb-4">🚫</div>
        <h1 className="text-2xl font-bold text-white mb-4">Acesso Negado</h1>
        <p className="text-brand-light-gray mb-6">
          Seu email <strong>{session.user?.email}</strong> não está autorizado para acessar o painel administrativo.
        </p>

        <form action={logoutAction}>
          <button type="submit" className="bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors">
            Fazer Logout
          </button>
        </form>
      </div>
    </div>
  );
}
