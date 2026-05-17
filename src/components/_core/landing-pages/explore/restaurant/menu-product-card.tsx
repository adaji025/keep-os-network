import Image from "next/image";

import { formatMenuPrice, type MenuProduct } from "./data";
import { QuantityControl } from "./quantity-control";

type MenuProductCardProps = {
    product: MenuProduct;
    quantity: number;
    onQuantityChange: (qty: number) => void;
};

export function MenuProductCard({
    product,
    quantity,
    onQuantityChange,
}: MenuProductCardProps) {
    return (
        <article className="flex flex-col overflow-hidden rounded-2xl border border-neutral-200/90 bg-white">
            <div className="relative aspect-4/3 w-full overflow-hidden">
                <Image
                    src={product.imageSrc}
                    alt={product.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 280px"
                    className="object-cover"
                />
            </div>
            <div className="flex flex-1 flex-col gap-3 p-4">
                <div>
                    <h3 className="font-bold text-neutral-900">{product.name}</h3>
                    <p className="mt-1 text-sm font-semibold text-neutral-800">
                        {formatMenuPrice(product.price)}
                    </p>
                </div>
                <div className="mt-auto flex justify-end">
                    <QuantityControl
                        quantity={quantity}
                        onDecrement={() =>
                            onQuantityChange(Math.max(0, quantity - 1))
                        }
                        onIncrement={() => onQuantityChange(quantity + 1)}
                    />
                </div>
            </div>
        </article>
    );
}
