import React from "react";
import { Download, DownloadIcon, X } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";

interface DownloadCertificateProps {
  recipientName: string;
  treesPlanted: number;
  certificateUrl: string | null;
}

const DownloadCertificate: React.FC<DownloadCertificateProps> = ({
  recipientName,
  treesPlanted,
  certificateUrl,
}) => {
  const handleDownload = () => {
    if (certificateUrl) {
      window.open(certificateUrl, '_blank');
    } else {
      alert("Certificate not available yet.");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex cursor-pointer gap-2 items-center justify-center bg-[#003399] hover:bg-[#062d7b] text-white font-semibold h-11 px-5 py-3 rounded-[8px] w-full sm:w-[50%]">
          <span className="max-md:hidden">Download</span>Certificate
          <Download className="w-4 h-4" />
        </div>
      </DialogTrigger>

      <DialogContent
        showCloseButton={false}
        className="md:w-[533px] md:h-[442px] py-4 px-2 gap-0"
      >
        <DialogTitle className="flex items-center justify-between uppercase font-bold sm:text-2xl px-2 md:px-4">
          Download Certificate
          <DialogClose asChild>
            <button className="border-none rounded-full transition">
              <X size={24} className="text-black max-sm:w-4.5" />
            </button>
          </DialogClose>
        </DialogTitle>

        <div className="max-md:h-[236px] overflow-y-scroll px-2 md:pl-4 mt-4">
          <div className="space-y-4 w-full">
            <div
              className="md:h-[70px] h-[68px] px-4 py-3 border rounded-[8px] hover:bg-gray-50"
            >
              <div className="flex items-center">
                <div className="flex-1">
                  <div
                    style={{
                      fontFamily: "'Public Sans', sans-serif",
                      fontWeight: 600,
                      lineHeight: "22px",
                      color: "#090C0F",
                    }}
                    className="md:text-xl"
                  >
                    {recipientName || "Anonymous"}
                  </div>

                  <div className="mt-1 flex items-center text-[#0D824B]">
                    <Image
                      src="/images/leaf.png"
                      alt="tree"
                      width={18}
                      height={18}
                      className="mr-1"
                    />
                    <span
                      style={{
                        fontFamily: "'Public Sans', sans-serif",
                        fontWeight: 600,
                        fontSize: "14px",
                        lineHeight: "22px",
                        color: "#0D824B",
                      }}
                    >
                      {treesPlanted} Trees Planted
                    </span>
                  </div>
                </div>
                <DownloadIcon
                  className="text-[#003399] cursor-pointer"
                  size={20}
                  onClick={handleDownload}
                />
              </div>
            </div>

            {!certificateUrl && (
              <p className="text-sm text-gray-500 text-center mt-2">
                Certificate will be available once trees are allocated.
              </p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DownloadCertificate;
