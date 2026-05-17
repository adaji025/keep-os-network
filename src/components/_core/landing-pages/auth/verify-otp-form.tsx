"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const OTP_LENGTH = 4;

type VerifyOtpFormProps = {
    phone?: string;
};

function formatDisplayPhone(phone: string) {
    const digits = phone.replace(/\D/g, "");
    if (!digits) return "your phone";
    return digits;
}

export function VerifyOtpForm({ phone: phoneProp }: VerifyOtpFormProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const phoneFromQuery = searchParams.get("phone") ?? "";
    const displayPhone = formatDisplayPhone(phoneProp ?? phoneFromQuery);

    const [digits, setDigits] = useState<string[]>(
        Array.from({ length: OTP_LENGTH }, () => ""),
    );
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    const code = digits.join("");

    const setDigitAt = useCallback((index: number, value: string) => {
        setDigits((prev) => {
            const next = [...prev];
            next[index] = value;
            return next;
        });
    }, []);

    const fillFromString = useCallback((raw: string) => {
        const parsed = raw.replace(/\D/g, "").slice(0, OTP_LENGTH).split("");
        setDigits(
            Array.from({ length: OTP_LENGTH }, (_, index) => parsed[index] ?? ""),
        );
        const focusIndex = Math.min(parsed.length, OTP_LENGTH - 1);
        inputRefs.current[focusIndex]?.focus();
    }, []);

    const handleChange = (index: number, value: string) => {
        const digit = value.replace(/\D/g, "").slice(-1);
        setDigitAt(index, digit);
        if (digit && index < OTP_LENGTH - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (
        index: number,
        event: React.KeyboardEvent<HTMLInputElement>,
    ) => {
        if (event.key === "Backspace" && !digits[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
        if (event.key === "ArrowLeft" && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
        if (event.key === "ArrowRight" && index < OTP_LENGTH - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
        event.preventDefault();
        fillFromString(event.clipboardData.getData("text"));
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (code.length !== OTP_LENGTH) return;
        router.push("/explore");
    };

    const handleResend = () => {
        setDigits(Array.from({ length: OTP_LENGTH }, () => ""));
        inputRefs.current[0]?.focus();
    };

    return (
        <div className="w-full max-w-lg rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
            <header className="text-center">
                <h1 className="text-xl font-bold text-neutral-900 sm:text-2xl">
                    Verify Phone Number
                </h1>
                <p className="mt-3 text-sm leading-relaxed text-neutral-500">
                    We&apos;ve sent a 4-digit code to{" "}
                    <span className="font-semibold text-neutral-800">
                        {displayPhone}
                    </span>{" "}
                    via SMS and WhatsApp
                </p>
            </header>

            <form className="mt-3 space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-3">
                    <p className="text-center text-sm font-semibold text-neutral-900">
                        Enter Code
                    </p>
                    <div
                        className="flex justify-center gap-3"
                        role="group"
                        aria-label="Verification code"
                    >
                        {digits.map((digit, index) => (
                            <Input
                                key={index}
                                ref={(element) => {
                                    inputRefs.current[index] = element;
                                }}
                                type="text"
                                inputMode="numeric"
                                autoComplete={index === 0 ? "one-time-code" : "off"}
                                maxLength={1}
                                value={digit}
                                onChange={(event) =>
                                    handleChange(index, event.target.value)
                                }
                                onKeyDown={(event) =>
                                    handleKeyDown(index, event)
                                }
                                onPaste={handlePaste}
                                aria-label={`Digit ${index + 1} of ${OTP_LENGTH}`}
                                className={cn(
                                    "size-14! rounded-xl border-neutral-200 p-0 text-center text-lg font-semibold text-neutral-900",
                                    "focus-visible:border-primary focus-visible:ring-primary/20",
                                )}
                            />
                        ))}
                    </div>
                </div>

                <p className="text-center text-sm text-neutral-600">
                    Didn&apos;t receive code?{" "}
                    <button
                        type="button"
                        onClick={handleResend}
                        className="font-semibold text-primary hover:underline"
                    >
                        Resend
                    </button>
                </p>

                <Button
                    type="submit"
                    className="h-11 w-full rounded-xl text-base font-semibold"
                    disabled={code.length !== OTP_LENGTH}
                >
                    Verify Phone Number
                </Button>
            </form>
        </div>
    );
}
