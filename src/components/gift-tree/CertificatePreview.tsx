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

const CertificatePreview: React.FC = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div
          className="h-[109px] border border-[#94979A] bg-gray-100 rounded-xl mb-8 flex items-center justify-center bg-cover bg-center relative overflow-hidden cursor-pointer"
          style={{
            backgroundImage: "url('/images/blur-certificate.png')",
          }}
        >
          <button className="flex items-center gap-1.5 text-sm font-bold">
            View Sample Certificate
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </DialogTrigger>

      <DialogContent showCloseButton={false} className="max-w-4xl px-0 ">
        <DialogTitle className="uppercase font-bold text-2xl px-6">
          Sample Certificate
        </DialogTitle>
        <DialogClose asChild>
          <button className="absolute right-5 top-5 p-2 rounded-full hover:bg-gray-100 transition">
            <X size={20} className="text-black" />
          </button>
        </DialogClose>
        <Image
          src="/images/certificate.jpg"
          alt="Certificate"
          width={671}
          height={465}
          className="w-full h-auto object-contain px-4"
        />
      </DialogContent>
    </Dialog>
  );
};

export default CertificatePreview;
