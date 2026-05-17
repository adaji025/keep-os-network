import Image from "next/image";

import { Button } from "@/components/ui/button";

import { formatRoomPrice, type HotelRoom } from "./data";

type RoomCardProps = {
    room: HotelRoom;
    onBookNow?: (room: HotelRoom) => void;
};

export function RoomCard({ room, onBookNow }: RoomCardProps) {
    return (
        <article className="flex flex-col overflow-hidden rounded-2xl border border-neutral-200/90 bg-white shadow-sm">
            <div className="relative aspect-4/3 w-full overflow-hidden">
                <Image
                    src={room.imageSrc}
                    alt={room.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 280px"
                    className="object-cover"
                />
            </div>
            <div className="flex flex-1 flex-col gap-4 p-4">
                <div>
                    <h3 className="font-bold text-neutral-900">{room.name}</h3>
                    <p className="mt-1 text-sm font-semibold text-primary">
                        {formatRoomPrice(room.pricePerNight)}
                    </p>
                </div>
                <Button
                    type="button"
                    variant="outline"
                    className="mt-auto w-full h-10 rounded-lg font-medium border-primary text-primary hover:bg-primary/5"
                    onClick={() => onBookNow?.(room)}
                >
                    Book Now
                </Button>
            </div>
        </article>
    );
}
