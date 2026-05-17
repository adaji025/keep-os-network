import { Suspense } from "react";

import { VerifyOtpForm } from "@/components/_core/landing-pages/auth/verify-otp-form";
import { ExploreNav } from "@/components/_core/shared/navbar/explore-nav";

export default function VerifyOtpPage() {
    return (
        <div className="flex min-h-screen flex-col bg-neutral-50">
            <ExploreNav />
            <main className="flex flex-1 items-start justify-center px-4 py-10 sm:px-6">
                <Suspense>
                    <VerifyOtpForm />
                </Suspense>
            </main>
        </div>
    );
}
