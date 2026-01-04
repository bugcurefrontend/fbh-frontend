"use client";

import { useState } from "react";
import { Check, Share2 } from "lucide-react";
import LinkIcon from "@/components/icons/LinkIcon";

interface ShareButtonProps {
  className?: string;
  popClass?: string;
}

const ShareButton: React.FC<ShareButtonProps> = ({ className, popClass }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleShare = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500); // Reset after 2.5 seconds
  };

  return (
    <div>
      {isCopied && (
        <div
          className={`
           flex items-center justify-center gap-2 absolute md:h-12 h-10 w-[107px] md:w-[134px] leading-4.5 rounded-[8px] shadow-xs bg-white text-[#003399] md:text-sm text-xs font-semibold ${popClass}
          `}
        >
          <LinkIcon />
          Link Copied
        </div>
      )}
      <button
        onClick={handleShare}
        className={`flex items-center justify-center absolute md:h-12 md:w-12 h-10 w-10 rounded md:rounded-[8px] text-white bg-[#003399] hover:bg-[#002266] transition-colors shadow-xs ${className}`}
      >
        {isCopied ? (
          <Check strokeWidth={1.5} className="md:w-6 w-5.5 md:h-6 h-5.5" />
        ) : (
          <Share2 strokeWidth={1.5} className="md:w-6 w-5.5 md:h-6 h-5.5" />
        )}
      </button>
    </div>
  );
};

export default ShareButton;
