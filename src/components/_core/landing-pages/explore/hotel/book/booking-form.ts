export type PaymentMethod = "wallet" | "paystack";

export type BookingFormState = {
    checkIn: string;
    checkOut: string;
    guests: string;
    rooms: number;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    specialRequest: string;
    useKps: boolean;
    kpsRedeemInput: string;
    kpsDiscountAmount: number;
    paymentMethod: PaymentMethod;
};

export const INITIAL_BOOKING_FORM: BookingFormState = {
    checkIn: "",
    checkOut: "",
    guests: "",
    rooms: 1,
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    specialRequest: "",
    useKps: true,
    kpsRedeemInput: "",
    kpsDiscountAmount: 0,
    paymentMethod: "wallet",
};

export const GUEST_OPTIONS = [
    "1 Guest",
    "2 Guests",
    "3 Guests",
    "4 Guests",
    "5+ Guests",
] as const;

export const FIELD_INPUT_CLASSNAME = "h-11!";

export const FIELD_TEXTAREA_CLASSNAME = "min-h-28! resize-none py-3";

export function formatGuestName(
    form: Pick<BookingFormState, "firstName" | "lastName">,
) {
    const name = [form.firstName.trim(), form.lastName.trim()]
        .filter(Boolean)
        .join(" ");
    return name || "—";
}

export function formatGuestPhone(phone: string) {
    return phone.trim() ? `+234 ${phone.trim()}` : "—";
}

export type UpdateBookingForm = <K extends keyof BookingFormState>(
    key: K,
    value: BookingFormState[K],
) => void;
