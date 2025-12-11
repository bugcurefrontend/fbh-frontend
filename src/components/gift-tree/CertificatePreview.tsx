import React from "react";
import { Eye } from "lucide-react";
import {
  Dialog,
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

      <DialogContent className="max-w-4xl p-0 overflow-hidden gap-0">
        <DialogTitle className="text-xl font-semibold py-4 border-b px-6">
          Sample Certificate
        </DialogTitle>

        <Image
          src="/images/certificate.jpg"
          alt="Certificate"
          width={671}
          height={465}
          className="w-full h-auto object-contain p-3"
        />
      </DialogContent>
    </Dialog>
  );
};

export default CertificatePreview;
