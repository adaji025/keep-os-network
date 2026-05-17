"use client";

import { format, isValid, parseISO, startOfDay } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

import { FIELD_INPUT_CLASSNAME } from "./booking-form";

function parseStoredDate(value: string): Date | undefined {
    if (!value) return undefined;
    const parsed = parseISO(value);
    return isValid(parsed) ? parsed : undefined;
}

function toStoredDate(date: Date): string {
    return format(date, "yyyy-MM-dd");
}

type DatePickerFieldProps = {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    disabled?: (date: Date) => boolean;
    className?: string;
};

export function DatePickerField({
    value,
    onChange,
    placeholder = "mm/dd/yyyy",
    disabled,
    className,
}: DatePickerFieldProps) {
    const selected = parseStoredDate(value);

    return (
        <div className={cn("w-full", className)}>
            <Popover>
                <PopoverTrigger asChild className="w-full">
                    <Button
                        type="button"
                        variant="outline"
                        data-empty={!selected}
                        className={cn(
                            FIELD_INPUT_CLASSNAME,
                            "flex w-full shrink justify-between px-3 font-normal data-[empty=true]:text-muted-foreground",
                        )}
                    >
                        <span className="truncate">
                            {selected
                                ? format(selected, "MM/dd/yyyy")
                                : placeholder}
                        </span>
                        <CalendarIcon className="size-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent
                    className="w-(--radix-popover-trigger-width) p-0"
                    align="start"
                >
                    <Calendar
                        mode="single"
                        selected={selected}
                        defaultMonth={selected}
                        onSelect={(date) =>
                            onChange(date ? toStoredDate(date) : "")
                        }
                        disabled={disabled}
                        className="w-full p-3 [--cell-size:calc((100%-0.75rem)/7)] **:data-[slot=button]:size-auto **:data-[slot=button]:min-h-(--cell-size) **:data-[slot=button]:min-w-0 **:data-[slot=button]:w-full"
                        classNames={{
                            root: "w-full",
                            months: "relative w-full",
                            month: "flex w-full flex-col gap-3",
                            month_caption: "flex h-(--cell-size) w-full items-center justify-center",
                            weekdays: "flex w-full",
                            weekday: "flex-1 text-center",
                            week: "mt-2 flex w-full",
                            day: "group/day relative flex flex-1 aspect-square min-w-0 p-0 text-center select-none",
                        }}
                    />
                </PopoverContent>
            </Popover>
        </div>
    );
}

export function disablePastDates(date: Date) {
    return startOfDay(date) < startOfDay(new Date());
}

export function disableBeforeDate(minDate: string | undefined) {
    const min = minDate ? parseStoredDate(minDate) : undefined;
    if (!min) return disablePastDates;

    return (date: Date) => startOfDay(date) < startOfDay(min);
}
