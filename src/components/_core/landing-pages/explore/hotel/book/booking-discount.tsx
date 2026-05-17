"use client";

import { GemSvg } from "@/components/_core/shared/svg";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

import { FIELD_INPUT_CLASSNAME } from "./booking-form";
import { KPS_CONVERSION_LABEL, MOCK_KPS_BALANCE } from "./booking-pricing";

type BookingDiscountProps = {
    useKps: boolean;
    kpsRedeemInput: string;
    onUseKpsChange: (value: boolean) => void;
    onKpsRedeemInputChange: (value: string) => void;
    onRedeem: () => void;
    balance?: number;
};

export function BookingDiscount({
    useKps,
    kpsRedeemInput,
    onUseKpsChange,
    onKpsRedeemInputChange,
    onRedeem,
    balance = MOCK_KPS_BALANCE,
}: BookingDiscountProps) {
    return (
        <section className="space-y-3">
            <h3 className="text-base font-bold text-foreground">Discount</h3>
            <div className="rounded-xl border border-border bg-background p-4">
                <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                        <GemSvg />
                        <span className="text-sm font-medium text-foreground">
                            Got KPS?
                        </span>
                    </div>
                    <Switch
                        checked={useKps}
                        onCheckedChange={onUseKpsChange}
                        aria-label="Use KPS for discount"
                    />
                </div>

                {useKps ? (
                    <div className="mt-4 space-y-3 border-t border-border pt-4">
                        <div className="flex items-center justify-between gap-3 text-sm">
                            <span className="text-muted-foreground">
                                Redeem Discount
                            </span>
                            <span className="text-muted-foreground">
                                Balance : {balance.toLocaleString("en-NG")} KPS
                            </span>
                        </div>

                        <div className="relative">
                            <Input
                                type="text"
                                inputMode="numeric"
                                value={kpsRedeemInput}
                                onChange={(event) =>
                                    onKpsRedeemInputChange(event.target.value)
                                }
                                placeholder="Enter KPS Value"
                                className={cn(
                                    FIELD_INPUT_CLASSNAME,
                                    "pr-20",
                                )}
                            />
                            <button
                                type="button"
                                className="absolute top-1/2 right-3 -translate-y-1/2 text-sm font-semibold text-primary hover:text-primary/80"
                                onClick={onRedeem}
                            >
                                Redeem
                            </button>
                        </div>

                        <p className="text-xs text-muted-foreground">
                            {KPS_CONVERSION_LABEL}
                        </p>
                    </div>
                ) : null}
            </div>
        </section>
    );
}
