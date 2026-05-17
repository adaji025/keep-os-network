"use client";

import { FormField } from "@/components/_core/shared/form-field";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

import {
    FIELD_INPUT_CLASSNAME,
    GUEST_OPTIONS,
    type BookingFormState,
    type UpdateBookingForm,
} from "./booking-form";
import {
    DatePickerField,
    disableBeforeDate,
    disablePastDates,
} from "./date-picker-field";
import { RoomQuantityStepper } from "./room-quantity-stepper";

type StayDetailsProps = {
    form: Pick<BookingFormState, "checkIn" | "checkOut" | "guests" | "rooms">;
    updateForm: UpdateBookingForm;
};

export function StayDetails({ form, updateForm }: StayDetailsProps) {
    const handleCheckInChange = (checkIn: string) => {
        updateForm("checkIn", checkIn);

        if (
            form.checkOut &&
            checkIn &&
            form.checkOut < checkIn
        ) {
            updateForm("checkOut", "");
        }
    };

    return (
        <div className="grid gap-5 sm:grid-cols-2">
            <FormField label="Check-in Date">
                <DatePickerField
                    value={form.checkIn}
                    onChange={handleCheckInChange}
                    disabled={disablePastDates}
                />
            </FormField>
            <FormField label="Check-out Date">
                <DatePickerField
                    value={form.checkOut}
                    onChange={(checkOut) => updateForm("checkOut", checkOut)}
                    disabled={disableBeforeDate(form.checkIn)}
                />
            </FormField>
            <FormField label="Number of Guests">
                <Select
                    value={form.guests || undefined}
                    onValueChange={(value) => updateForm("guests", value)}
                >
                    <SelectTrigger
                        className={cn("w-full", FIELD_INPUT_CLASSNAME)}
                    >
                        <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                        {GUEST_OPTIONS.map((option) => (
                            <SelectItem key={option} value={option}>
                                {option}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </FormField>
            <FormField label="Number of Rooms">
                <RoomQuantityStepper
                    value={form.rooms}
                    onChange={(rooms) => updateForm("rooms", rooms)}
                />
            </FormField>
        </div>
    );
}
