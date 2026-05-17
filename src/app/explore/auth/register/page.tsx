import { RegisterForm } from "@/components/_core/landing-pages/auth/register-form";
import { ExploreNav } from "@/components/_core/shared/navbar/explore-nav";

export default function RegisterPage() {
    return (
        <div className="flex min-h-screen flex-col bg-neutral-50">
            <ExploreNav />
            <main className="flex flex-1 items-center justify-center px-4 py-10 sm:px-6">
                <RegisterForm />
            </main>
        </div>
    );
}

