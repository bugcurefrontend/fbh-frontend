import React from "react";
import Image from "next/image";

export default function Loading() {
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white/80 backdrop-blur-sm">
            <div className="flex flex-col items-center gap-4">
                <div className="relative animate-pulse">
                    <Image
                        src="/images/logo3.svg"
                        alt="Loading..."
                        width={80}
                        height={65}
                        priority
                        className="w-20 h-auto"
                    />
                </div>
                <div className="flex gap-1.5">
                    <div className="w-2 h-2 bg-[#0D824B] rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="w-2 h-2 bg-[#12B569] rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="w-2 h-2 bg-[#80CB00] rounded-full animate-bounce"></div>
                </div>
            </div>
        </div>
    );
}
