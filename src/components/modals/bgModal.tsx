import { useBg } from "@/contexts/background";
import Image from "next/image";

export default function BgModal() {
    const { bgList, setCurrBg } = useBg();


    return (
        <div className="grid grid-cols-3 gap-4">
            {
                bgList.map((val) => (
                    <div key={val} onClick={() => { setCurrBg(val); }}>
                        <Image
                            alt="bgImage"
                            className="rounded-xl wallCard"
                            src={val.replace("backgrounds/", "backgrounds/thumbnails/").replace(".mp4", ".png")
                            }
                            width={200}
                            height={200}
                        />
                    </div>
                ))
            }

        </div>
    )
}