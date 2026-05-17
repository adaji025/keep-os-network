import { LoginForm } from "@/components/_core/landing-pages/auth/login-form";
import { ExploreNav } from "@/components/_core/shared/navbar/explore-nav";

export default function LoginPage() {
    return (
        <div className="flex min-h-screen flex-col bg-neutral-50">
            <ExploreNav />
            <main className="flex flex-1 items-start justify-center px-4 py-10 sm:px-6">
                <LoginForm />
            </main>
        </div>
    );
}
