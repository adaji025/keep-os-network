"use client";

import type { HotelRoom } from "../data";
import { BookingDiscount } from "./booking-discount";
import {
    calculateBookingPricing,
    MOCK_KPS_BALANCE,
    redeemKpsToDiscount,
} from "./booking-pricing";
import { BookingSummary } from "./booking-summary";
import type { BookingFormState, UpdateBookingForm } from "./booking-form";

type BookingPreviewProps = {
    room: HotelRoom | null;
    form: BookingFormState;
    updateForm: UpdateBookingForm;
};

export function BookingPreview({
    room,
    form,
    updateForm,
}: BookingPreviewProps) {
    const pricing = calculateBookingPricing(form, room);

    const handleUseKpsChange = (useKps: boolean) => {
        updateForm("useKps", useKps);
        if (!useKps) {
            updateForm("kpsRedeemInput", "");
            updateForm("kpsDiscountAmount", 0);
        }
    };

    const handleRedeem = () => {
        const discount = redeemKpsToDiscount(
            form.kpsRedeemInput,
            MOCK_KPS_BALANCE,
            pricing.subtotalBeforeDiscount,
        );
        updateForm("kpsDiscountAmount", discount);
    };

    return (
        <div className="space-y-6">
            <BookingDiscount
                useKps={form.useKps}
                kpsRedeemInput={form.kpsRedeemInput}
                onUseKpsChange={handleUseKpsChange}
                onKpsRedeemInputChange={(value) =>
                    updateForm("kpsRedeemInput", value)
                }
                onRedeem={handleRedeem}
            />
            <BookingSummary room={room} form={form} pricing={pricing} />
        </div>
    );
}
