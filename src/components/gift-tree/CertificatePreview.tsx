import React from "react";
import { Eye, X } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";

type Props = {
  imageUrl?: string | null;
  blurImageUrl?: string | null;
};

const CertificatePreview: React.FC<Props> = ({ imageUrl, blurImageUrl }) => {
  const triggerBg = blurImageUrl ?? "/images/blur-certificate.png";
  const dialogImage = imageUrl ?? "/images/certificate.png";

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div
          className="h-[109px] border border-[#94979A] bg-gray-100 rounded-[8px] mb-8 flex items-center justify-center bg-cover bg-center relative overflow-hidden cursor-pointer"
          style={{
            backgroundImage: `url('${triggerBg}')`,
          }}
          role="button"
          aria-label="View Sample Certificate"
        >
          {/* On small screens show only the blurred thumbnail. On md+ show the explicit button text + icon */}
          <button className="hidden md:flex items-center gap-1.5 text-sm font-semibold md:font-bold">
            View Sample Certificate
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </DialogTrigger>

      <DialogContent
        showCloseButton={false}
        className="md:w-[671px] md:h-[533px] p-4 md:p-6 rounded-[8px] md:rounded-[16px]"
      >
        <DialogTitle className="uppercase font-bold text-base md:text-2xl">
          Sample Certificate
        </DialogTitle>
        <DialogClose asChild>
          <button className="absolute right-2.5 md:right-5 top-2.5 md:top-5 p-2 rounded-full hover:bg-gray-100 transition">
            <X size={24} className="text-black max-md:w-4.5 max-md:h-4.5" />
          </button>
        </DialogClose>
        <Image
          src={dialogImage}
          alt="Certificate"
          width={623}
          height={442}
          className="w-full h-auto object-contain"
        />
      </DialogContent>
    </Dialog>
  );
};

export default CertificatePreview;
