"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { FormField } from "@/components/_core/shared/form-field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const INPUT_CLASSNAME = "h-11!";

type RegisterFormState = {
    phone: string;
    firstName: string;
    lastName: string;
    email: string;
};

export function RegisterForm() {
    const router = useRouter();
    const [form, setForm] = useState<RegisterFormState>({
        phone: "",
        firstName: "",
        lastName: "",
        email: "",
    });
    const [agreedToTerms, setAgreedToTerms] = useState(false);

    const updateField = <K extends keyof RegisterFormState>(
        key: K,
        value: RegisterFormState[K],
    ) => {
        setForm((prev) => ({ ...prev, [key]: value }));
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const digits = form.phone.replace(/\D/g, "");
        const query = digits
            ? `?phone=${encodeURIComponent(digits)}`
            : "";
        router.push(`/explore/auth/verify-otp${query}`);
    };

    return (
        <div className="w-full max-w-lg rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
            <header className="text-center sm:text-left">
                <h1 className="text-xl font-bold text-neutral-900 sm:text-2xl">
                    Get Started with KeepOS.Network
                </h1>
                <p className="mt-2 text-sm text-neutral-500">
                    Add your details to start ordering from your favorite
                    vendors.
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
                            value={form.phone}
                            onChange={(event) =>
                                updateField("phone", event.target.value)
                            }
                            placeholder="Enter Mobile Number"
                            className="h-full! min-h-0! rounded-none border-0 bg-transparent px-3 shadow-none focus-visible:border-0 focus-visible:ring-0"
                        />
                    </div>
                </FormField>

                <div className="grid gap-5 sm:grid-cols-2">
                    <FormField label="First Name">
                        <Input
                            type="text"
                            value={form.firstName}
                            onChange={(event) =>
                                updateField("firstName", event.target.value)
                            }
                            placeholder="Enter First Name"
                            className={INPUT_CLASSNAME}
                        />
                    </FormField>
                    <FormField label="Last Name">
                        <Input
                            type="text"
                            value={form.lastName}
                            onChange={(event) =>
                                updateField("lastName", event.target.value)
                            }
                            placeholder="Enter Last Name"
                            className={INPUT_CLASSNAME}
                        />
                    </FormField>
                </div>

                <FormField label="Email Address">
                    <Input
                        type="email"
                        value={form.email}
                        onChange={(event) =>
                            updateField("email", event.target.value)
                        }
                        placeholder="Enter Email Address"
                        className={INPUT_CLASSNAME}
                    />
                </FormField>

                <label className="flex cursor-pointer items-start gap-3">
                    <input
                        type="checkbox"
                        checked={agreedToTerms}
                        onChange={(event) =>
                            setAgreedToTerms(event.target.checked)
                        }
                        className="mt-0.5 size-4 shrink-0 rounded border-neutral-300 text-primary accent-primary"
                    />
                    <span className="text-sm leading-snug text-neutral-600">
                        I agree to the{" "}
                        <Link
                            href="#"
                            className="font-medium text-primary hover:underline"
                        >
                            Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link
                            href="#"
                            className="font-medium text-primary hover:underline"
                        >
                            Privacy Policy
                        </Link>
                        .
                    </span>
                </label>

                <Button
                    type="submit"
                    className="h-11 w-full rounded-xl text-base font-semibold"
                    disabled={!agreedToTerms}
                >
                    Create Account
                </Button>

                <p className="text-center text-sm text-neutral-600">
                    Already have an account?{" "}
                    <Link
                        href="/explore/auth/login"
                        className="font-semibold text-primary hover:underline"
                    >
                        Login
                    </Link>
                </p>
            </form>
        </div>
    );
}
