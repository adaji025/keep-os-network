"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { FormField } from "@/components/_core/shared/form-field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export function LoginForm() {
    const router = useRouter();
    const [phone, setPhone] = useState("");

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const digits = phone.replace(/\D/g, "");
        const query = digits
            ? `?phone=${encodeURIComponent(digits)}`
            : "";
        router.push(`/explore/auth/verify-otp${query}`);
    };

    return (
        <div className="w-full max-w-lg rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
            <header className="text-center sm:text-left">
                <h1 className="text-xl font-bold text-neutral-900 sm:text-2xl">
                    Log in to your account
                </h1>
                <p className="mt-2 text-sm text-neutral-500">
                    Welcome back! Log in with your phone number.
                </p>
            </header>

            <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
                <FormField label="Phone Number">
                    <div
                        className={cn(
                            "flex h-11 items-stretch overflow-hidden rounded-lg border border-input bg-background",
                            "focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50",
                        )}
                    >
                        <span className="flex shrink-0 items-center border-r border-input px-3 text-sm text-muted-foreground">
                            +234
                        </span>
                        <Input
                            type="tel"
                            inputMode="tel"
                            value={phone}
                            onChange={(event) => setPhone(event.target.value)}
                            placeholder="Enter Mobile Number"
                            className="h-full! min-h-0! rounded-none border-0 bg-transparent px-3 shadow-none focus-visible:border-0 focus-visible:ring-0"
                        />
                    </div>
                </FormField>

                <Button
                    type="submit"
                    className="h-11 w-full rounded-xl text-base font-semibold"
                >
                    Continue
                </Button>

                <p className="text-center text-sm text-neutral-600">
                    Don&apos;t have an account?{" "}
                    <Link
                        href="/explore/auth/register"
                        className="font-semibold text-primary hover:underline"
                    >
                        Signup
                    </Link>
                </p>
            </form>
        </div>
    );
}

