import type { HotelRoom } from "../data";
import type { BookingFormState } from "./booking-form";
import {
    calculateBookingPricing,
    formatGuestCount,
    formatNaira,
    formatRoomCount,
    formatStayDuration,
    type BookingPricing,
} from "./booking-pricing";

type BookingSummaryProps = {
    room: HotelRoom | null;
    form: Pick<
        BookingFormState,
        "checkIn" | "checkOut" | "guests" | "rooms" | "kpsDiscountAmount"
    >;
    pricing?: BookingPricing;
};

function SummaryRow({
    label,
    value,
}: {
    label: string;
    value: string;
}) {
    return (
        <div className="flex items-center justify-between gap-4 text-sm">
            <dt className="text-muted-foreground">{label}</dt>
            <dd className="font-semibold text-foreground">{value}</dd>
        </div>
    );
}

export function BookingSummary({
    room,
    form,
    pricing: pricingOverride,
}: BookingSummaryProps) {
    const pricing = pricingOverride ?? calculateBookingPricing(form, room);

    return (
        <section className="space-y-3">
            <h3 className="text-base font-bold text-foreground">Summary</h3>
            <dl className="space-y-3 rounded-xl bg-muted/60 p-4">
                <SummaryRow
                    label="Room Type"
                    value={room?.name ?? "—"}
                />
                <SummaryRow
                    label="Duration"
                    value={formatStayDuration(pricing.nights)}
                />
                <SummaryRow
                    label="Guests"
                    value={formatGuestCount(form.guests)}
                />
                <SummaryRow
                    label="Rooms"
                    value={formatRoomCount(form.rooms)}
                />
                <SummaryRow
                    label="Service Fee"
                    value={formatNaira(pricing.serviceFee)}
                />
                <SummaryRow
                    label="Discount Amount"
                    value={formatNaira(pricing.discountAmount)}
                />
                <SummaryRow
                    label="Sub Total"
                    value={formatNaira(pricing.subtotalBeforeDiscount)}
                />
                <div className="border-t border-border pt-3">
                    <div className="flex items-center justify-between gap-4">
                        <dt className="text-sm text-muted-foreground">Total</dt>
                        <dd className="text-base font-bold text-foreground">
                            {formatNaira(pricing.total)}
                        </dd>
                    </div>
                </div>
            </dl>
        </section>
    );
}
