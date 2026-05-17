import { differenceInCalendarDays, isValid, parseISO } from "date-fns";

import type { HotelRoom } from "../data";
import type { BookingFormState } from "./booking-form";

export const MOCK_KPS_BALANCE = 2000;
export const KPS_TO_NGN_RATE = 1;
export const KPS_CONVERSION_LABEL = "100 KPS ≈ ₦100";
export const SERVICE_FEE_RATE = 0.1;
export const VAT_RATE = 0.075;
export const MOCK_WALLET_BALANCE = 200_000;

export function formatNaira(value: number) {
    return `₦${value.toLocaleString("en-NG")}`;
}

export function getBookingNights(checkIn: string, checkOut: string) {
    if (!checkIn || !checkOut) return 0;
    const start = parseISO(checkIn);
    const end = parseISO(checkOut);
    if (!isValid(start) || !isValid(end) || end <= start) return 0;
    return differenceInCalendarDays(end, start);
}

export function formatStayDuration(nights: number) {
    if (nights <= 0) return "—";
    return nights === 1 ? "1 Night" : `${nights} Nights`;
}

export function formatGuestCount(guests: string) {
    return guests.trim() || "—";
}

export function formatRoomCount(rooms: number) {
    return rooms === 1 ? "1 Room" : `${rooms} Rooms`;
}

export type BookingPricing = {
    nights: number;
    roomSubtotal: number;
    serviceFee: number;
    subtotalBeforeDiscount: number;
    discountAmount: number;
    total: number;
};

export function calculateBookingPricing(
    form: Pick<BookingFormState, "checkIn" | "checkOut" | "rooms" | "kpsDiscountAmount">,
    room: HotelRoom | null,
): BookingPricing {
    const nights = getBookingNights(form.checkIn, form.checkOut);
    const nightlyRate = room?.pricePerNight ?? 0;
    const roomSubtotal = nightlyRate * Math.max(nights, 0) * form.rooms;
    const serviceFee =
        roomSubtotal > 0
            ? Math.round(roomSubtotal * SERVICE_FEE_RATE)
            : 0;
    const subtotalBeforeDiscount = roomSubtotal + serviceFee;
    const discountAmount = Math.min(
        form.kpsDiscountAmount,
        subtotalBeforeDiscount,
    );
    const total = Math.max(subtotalBeforeDiscount - discountAmount, 0);

    return {
        nights,
        roomSubtotal,
        serviceFee,
        subtotalBeforeDiscount,
        discountAmount,
        total,
    };
}

export type PaymentTotals = {
    subtotal: number;
    vat: number;
    total: number;
};

export function getPaymentTotals(pricing: BookingPricing): PaymentTotals {
    const subtotal = pricing.total;
    const vat = Math.round(subtotal * VAT_RATE);
    const total = subtotal + vat;
    return { subtotal, vat, total };
}

export function redeemKpsToDiscount(
    input: string,
    balance: number,
    maxDiscountNgn: number,
) {
    const kps = Number.parseInt(input.replace(/\D/g, ""), 10) || 0;
    if (kps <= 0 || maxDiscountNgn <= 0) return 0;
    const kpsToUse = Math.min(kps, balance);
    const discountNgn = Math.round(kpsToUse * KPS_TO_NGN_RATE);
    return Math.min(discountNgn, maxDiscountNgn);
}
