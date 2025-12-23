"use client";

import { useState } from "react";
import { Check, Share2 } from "lucide-react";

interface ShareButtonProps {
  className?: string;
}

const ShareButton: React.FC<ShareButtonProps> = ({ className }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleShare = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500); // Reset after 2.5 seconds
  };

  return (
    <button
      onClick={handleShare}
      className={`flex items-center justify-center absolute md:h-12 md:w-12 h-8 w-8 rounded md:rounded-[8px] text-white bg-[#003399] hover:bg-[#002266] transition-colors ${className}`}
    >
      {isCopied ? (
        <Check strokeWidth={1.5} className="md:w-6 w-4.5 md:h-6 h-4.5" />
      ) : (
        <Share2 strokeWidth={1.5} className="md:w-6 w-4.5 md:h-6 h-4.5" />
      )}
    </button>
  );
};

export default ShareButton;
