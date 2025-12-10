"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface LoginDialogProps {
  isOpen: boolean;
  onClose: (open: boolean) => void;
  onSignIn: () => void;
  onContinueAsGuest: () => void;
}

const LoginDialog: React.FC<LoginDialogProps> = ({
  isOpen,
  onClose,
  onSignIn,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        showCloseButton={false}
        className="max-w-[533px] border border-[#E4E4E4] rounded-2xl dialog-pop gap-4"
      >
        <DialogHeader>
          <DialogTitle className="text-2xl leading-9 text-center font-semibold md:font-bold text-[#232D26]">
            BEFORE YOU PROCEED...
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 flex flex-col items-center">
          <p className="text-center text-xl text-[#090C0F">
            Sign-in to autofill your details and view past contributions
          </p>

          <button
            onClick={onSignIn}
            className="w-fit bg-[#003399] hover:bg-[#152e72] text-white font-semibold py-3 px-5.5 rounded-md"
          >
            LOG-IN / SIGN-UP{" "}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginDialog;
