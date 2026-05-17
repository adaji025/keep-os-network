import { FormField } from "@/components/_core/shared/form-field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

import {
    FIELD_INPUT_CLASSNAME,
    FIELD_TEXTAREA_CLASSNAME,
    type BookingFormState,
    type UpdateBookingForm,
} from "./booking-form";

type PersonalInfoProps = {
    form: Pick<
        BookingFormState,
        "firstName" | "lastName" | "phone" | "email" | "specialRequest"
    >;
    updateForm: UpdateBookingForm;
};

export function PersonalInfo({ form, updateForm }: PersonalInfoProps) {
    return (
        <div className="grid gap-5 sm:grid-cols-2">
            <FormField label="First Name">
                <Input
                    type="text"
                    value={form.firstName}
                    onChange={(event) =>
                        updateForm("firstName", event.target.value)
                    }
                    placeholder="Enter First Name"
                    className={FIELD_INPUT_CLASSNAME}
                />
            </FormField>
            <FormField label="Last Name">
                <Input
                    type="text"
                    value={form.lastName}
                    onChange={(event) =>
                        updateForm("lastName", event.target.value)
                    }
                    placeholder="Enter Last Name"
                    className={FIELD_INPUT_CLASSNAME}
                />
            </FormField>
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
                            updateForm("phone", event.target.value)
                        }
                        placeholder="Enter Mobile Number"
                        className="h-full! min-h-0! rounded-none border-0 bg-transparent px-3 shadow-none focus-visible:border-0 focus-visible:ring-0"
                    />
                </div>
            </FormField>
            <FormField label="Email Address">
                <Input
                    type="email"
                    value={form.email}
                    onChange={(event) =>
                        updateForm("email", event.target.value)
                    }
                    placeholder="Enter Email Address"
                    className={FIELD_INPUT_CLASSNAME}
                />
            </FormField>
            <FormField label="Special Request" className="sm:col-span-2">
                <Textarea
                    value={form.specialRequest}
                    onChange={(event) =>
                        updateForm("specialRequest", event.target.value)
                    }
                    placeholder="Any special requirements or requests..."
                    className={FIELD_TEXTAREA_CLASSNAME}
                />
            </FormField>
        </div>
    );
}
