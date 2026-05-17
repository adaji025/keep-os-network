import { formatNaira, type PaymentTotals } from "./booking-pricing";

type PaymentOrderSummaryProps = {
    totals: PaymentTotals;
};

function SummaryRow({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex items-center justify-between gap-4 text-sm">
            <dt className="text-muted-foreground">{label}</dt>
            <dd className="font-semibold text-foreground">{value}</dd>
        </div>
    );
}

export function PaymentOrderSummary({ totals }: PaymentOrderSummaryProps) {
    return (
        <section className="space-y-3">
            <h3 className="text-sm font-bold text-foreground">Summary</h3>
            <dl className="space-y-2.5">
                <SummaryRow
                    label="Sub total"
                    value={formatNaira(totals.subtotal)}
                />
                <SummaryRow label="Vat" value={formatNaira(totals.vat)} />
                <div className="border-t border-border pt-3">
                    <div className="flex items-center justify-between gap-4">
                        <dt className="text-sm text-muted-foreground">Total</dt>
                        <dd className="text-base font-bold text-foreground">
                            {formatNaira(totals.total)}
                        </dd>
                    </div>
                </div>
            </dl>
        </section>
    );
}
