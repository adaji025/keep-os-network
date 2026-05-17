import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";

export function RoomQuantityStepper({
    value,
    onChange,
}: {
    value: number;
    onChange: (value: number) => void;
}) {
    return (
        <div className="flex h-11 items-center rounded-lg border border-input bg-background">
            <Button
                type="button"
                variant="ghost"
                size="icon"
                className="size-11 shrink-0 rounded-none rounded-l-lg"
                onClick={() => onChange(Math.max(1, value - 1))}
                disabled={value <= 1}
                aria-label="Decrease rooms"
            >
                <Minus className="size-4" />
            </Button>
            <span className="min-w-10 flex-1 border-x border-input text-center text-sm font-semibold">
                {value}
            </span>
            <Button
                type="button"
                variant="ghost"
                size="icon"
                className="size-11 shrink-0 rounded-none rounded-r-lg"
                onClick={() => onChange(value + 1)}
                aria-label="Increase rooms"
            >
                <Plus className="size-4" />
            </Button>
        </div>
    );
}