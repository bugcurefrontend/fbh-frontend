"use client";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

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
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="max-w-[533px] border border-[#E4E4E4] rounded-2xl dialog-pop gap-4">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-2xl leading-9 text-center font-semibold md:font-bold text-[#232D26]">
            BEFORE YOU PROCEED...
          </AlertDialogTitle>
        </AlertDialogHeader>

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
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default LoginDialog;
