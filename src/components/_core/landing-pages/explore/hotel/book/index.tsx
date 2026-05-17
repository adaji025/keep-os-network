"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import type { HotelRoom } from "../data";
import { BOOKING_STEPS, BookingStepper } from "./booking-stepper";
import { INITIAL_BOOKING_FORM, type BookingFormState } from "./booking-form";
import { PersonalInfo } from "./personal-info";
import { StayDetails } from "./stay-details";
import { BookingPreview } from "./preview";
import { Payment } from "./payment";

type HotelBookingModalProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    hotelName: string;
    room: HotelRoom | null;
};


export function HotelBookingModal({
    open,
    onOpenChange,
    hotelName,
    room,
}: HotelBookingModalProps) {
    const [step, setStep] = useState(1);
    const [form, setForm] = useState<BookingFormState>(INITIAL_BOOKING_FORM);

    useEffect(() => {
        if (!open) {
            setStep(1);
            setForm(INITIAL_BOOKING_FORM);
        }
    }, [open]);

    const updateForm = <K extends keyof BookingFormState>(
        key: K,
        value: BookingFormState[K],
    ) => {
        setForm((prev) => ({ ...prev, [key]: value }));
    };

    const handleBack = () => {
        if (step === 1) {
            onOpenChange(false);
            return;
        }
        setStep((value) => value - 1);
    };

    const handleContinue = () => {
        if (step < BOOKING_STEPS.length) {
            setStep((value) => value + 1);
            return;
        }
        onOpenChange(false);
    };

    const continueLabel =
        step === BOOKING_STEPS.length
            ? "Proceed To Payment"
            : "Continue";

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                className="flex max-h-[min(90vh,720px)] flex-col gap-0 overflow-hidden p-0 sm:max-w-2xl"
                showCloseButton
            >
                <DialogHeader className="border-b border-border px-6 py-5">
                    <DialogTitle className="text-lg font-bold sm:text-xl">
                        {step === 4
                            ? "Choose Payment Method"
                            : "Complete Your Booking"}
                    </DialogTitle>
                </DialogHeader>

                {step !== 4 ? (
                    <div className="border-b border-border px-6 py-5">
                        <BookingStepper currentStep={step} />
                    </div>
                ) : null}

                <div className="flex-1 overflow-y-auto px-6 py-6">
                    {step === 1 ? (
                        <StayDetails form={form} updateForm={updateForm} />
                    ) : null}

                    {step === 2 ? (
                        <PersonalInfo form={form} updateForm={updateForm} />
                    ) : null}

                    {step === 3 ? (
                        <BookingPreview
                            room={room}
                            form={form}
                            updateForm={updateForm}
                        />
                    ) : null}

                    {step === 4 ? (
                        <Payment
                            room={room}
                            form={form}
                            updateForm={updateForm}
                        />
                    ) : null}
                </div>

                <DialogFooter
                    className={cn(
                        "flex-row items-center gap-3 border-t border-border bg-background px-10 py-5",
                        step === 4 ? "justify-center sm:justify-center" : "justify-between sm:justify-between",
                    )}
                >
                    {step !== 4 ? (
                        <Button
                            type="button"
                            variant="outline"
                            className="mb-2 h-10 min-w-24 border-primary text-primary hover:bg-primary/5"
                            onClick={handleBack}
                        >
                            Back
                        </Button>
                    ) : null}
                    <Button
                        type="button"
                        className={cn(
                            "mb-2 h-10",
                            step === BOOKING_STEPS.length
                                ? "w-full sm:w-full"
                                : "min-w-28",
                        )}
                        onClick={handleContinue}
                    >
                        {continueLabel}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
