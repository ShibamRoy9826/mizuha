import { useBg } from "@/contexts/background";
import Image from "next/image";

export default function BgModal() {
    const { bgList, setCurrBg } = useBg();

    return (
        <div className="grid grid-cols-3 gap-4 p-4">
            {
                bgList.map((val, index) => (
                    val.thumbnail.length !== 0 ?
                        <div key={index} onClick={() => { setCurrBg(val); }}>
                            <Image
                                src={val.thumbnail}
                                className="rounded-xl wallCard"
                                alt="bgImage"
                                width={100}
                                height={100}
                            />
                        </div> : null
                ))
            }

        </div>
    )
}