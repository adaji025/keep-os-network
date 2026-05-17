"use client";

import { ShoppingBag, Wallet } from "lucide-react";

import { cn } from "@/lib/utils";

import type { HotelRoom } from "../data";
import {
    type BookingFormState,
    type PaymentMethod,
    type UpdateBookingForm,
} from "./booking-form";
import {
    calculateBookingPricing,
    formatNaira,
    getPaymentTotals,
    MOCK_WALLET_BALANCE,
} from "./booking-pricing";
import { PaymentOrderSummary } from "./payment-order-summary";

type PaymentProps = {
    room: HotelRoom | null;
    form: Pick<
        BookingFormState,
        | "checkIn"
        | "checkOut"
        | "rooms"
        | "kpsDiscountAmount"
        | "paymentMethod"
    >;
    updateForm: UpdateBookingForm;
};

type PaymentMethodOptionProps = {
    value: PaymentMethod;
    selected: boolean;
    onSelect: (value: PaymentMethod) => void;
    icon: React.ReactNode;
    title: string;
    description?: string;
};

function PaymentMethodOption({
    value,
    selected,
    onSelect,
    icon,
    title,
    description,
}: PaymentMethodOptionProps) {
    return (
        <button
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onSelect(value)}
            className="flex w-full items-center gap-3 px-4 py-4 text-left transition-colors hover:bg-muted/40"
        >
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                {icon}
            </span>
            <span className="min-w-0 flex-1">
                <span className="block text-sm font-semibold text-foreground">
                    {title}
                </span>
                {description ? (
                    <span className="mt-0.5 block text-xs text-muted-foreground">
                        {description}
                    </span>
                ) : null}
            </span>
            <span
                className={cn(
                    "flex size-5 shrink-0 items-center justify-center rounded-full border-2",
                    selected
                        ? "border-primary"
                        : "border-muted-foreground/50",
                )}
                aria-hidden
            >
                <span
                    className={cn(
                        "size-2.5 rounded-full bg-primary transition-opacity",
                        selected ? "opacity-100" : "opacity-0",
                    )}
                />
            </span>
        </button>
    );
}

export function Payment({ room, form, updateForm }: PaymentProps) {
    const pricing = calculateBookingPricing(form, room);
    const paymentTotals = getPaymentTotals(pricing);

    return (
        <div className="space-y-6">
            <section
                className="overflow-hidden rounded-xl border border-border"
                role="radiogroup"
                aria-label="Payment method"
            >
                <PaymentMethodOption
                    value="wallet"
                    selected={form.paymentMethod === "wallet"}
                    onSelect={(value) => updateForm("paymentMethod", value)}
                    icon={<Wallet className="size-5" strokeWidth={1.75} />}
                    title="Pay From Wallet"
                    description={`Wallet balance: ${formatNaira(MOCK_WALLET_BALANCE)}`}
                />
                <div className="border-t border-border" role="presentation" />
                <PaymentMethodOption
                    value="paystack"
                    selected={form.paymentMethod === "paystack"}
                    onSelect={(value) => updateForm("paymentMethod", value)}
                    icon={
                        <ShoppingBag className="size-5" strokeWidth={1.75} />
                    }
                    title="Pay with Paystack"
                />
            </section>

            <PaymentOrderSummary totals={paymentTotals} />
        </div>
    );
}
