import { cn } from "@/lib/utils";

export const BOOKING_STEPS = [
    { id: 1, label: "Stay Details" },
    { id: 2, label: "Personal Info" },
    { id: 3, label: "Review" },
    { id: 4, label: "Payment" },
] as const;

const STEP_CIRCLE_OFFSET = "top-4"; // vertical center of size-8 circle

export function BookingStepper({ currentStep }: { currentStep: number }) {
    return (
        <nav aria-label="Booking progress">
            <ol className="flex w-full items-start">
                {BOOKING_STEPS.map((step, index) => {
                    const isActive = currentStep === step.id;
                    const isComplete = currentStep > step.id;
                    const previousStep = BOOKING_STEPS[index - 1];
                    const isFirst = index === 0;
                    const isLast = index === BOOKING_STEPS.length - 1;

                    return (
                        <li
                            key={step.id}
                            className="relative flex min-w-0 flex-1 flex-col items-center"
                        >
                            {!isFirst ? (
                                <span
                                    className={cn(
                                        "absolute left-0 h-0.5 w-1/2 -translate-y-1/2 rounded-full",
                                        STEP_CIRCLE_OFFSET,
                                        previousStep &&
                                        currentStep > previousStep.id
                                            ? "bg-primary"
                                            : "bg-border",
                                    )}
                                    aria-hidden
                                />
                            ) : null}
                            {!isLast ? (
                                <span
                                    className={cn(
                                        "absolute right-0 h-0.5 w-1/2 -translate-y-1/2 rounded-full",
                                        STEP_CIRCLE_OFFSET,
                                        isComplete ? "bg-primary" : "bg-border",
                                    )}
                                    aria-hidden
                                />
                            ) : null}

                            <div className="relative z-10 flex w-full flex-col items-center px-1">
                                <span
                                    className={cn(
                                        "flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold",
                                        isActive || isComplete
                                            ? "bg-primary text-primary-foreground"
                                            : "bg-muted text-muted-foreground",
                                    )}
                                >
                                    {step.id}
                                </span>
                                <span
                                    className={cn(
                                        "mt-2 w-full text-center text-xs leading-snug sm:text-sm",
                                        isActive
                                            ? "font-semibold text-foreground"
                                            : "text-muted-foreground",
                                    )}
                                >
                                    {step.label}
                                </span>
                            </div>
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}
