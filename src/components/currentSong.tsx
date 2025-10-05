import Image from "next/image";

interface Props {
    name: string;
    image: string;
    artists: string;
}

export default function CurrentSong({ name, image, artists }: Props) {
    return (
        <div className="h-full flex flex-row items-center justify-center gap-4">
            <div className="relative h-15 w-15 flex flex-row items-center justify-center rounded-xl overflow-hidden">
                <Image
                    src={image}
                    alt="music image blur-sm transition duration-500"
                    style={{ objectFit: "fill" }}
                    fill
                />
            </div>
            <div className="flex flex-col items-start justify-center">
                <h1 className="text-xl bold">{name}</h1>
                <h1 className="text-md text-[rgb(200,200,200)]">{artists}</h1>
            </div>
        </div>
    )
}