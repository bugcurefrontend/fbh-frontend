"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

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
  onContinueAsGuest,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md rounded-none">
        <DialogHeader>
          <DialogTitle className="text-xl text-center font-semibold md:font-bold text-[#090C0F]">
            Manage Your Donations
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <p className="text-center">
            Sign in to autofill your details and view past contributions.
          </p>

          <div className="flex flex-col items-center justify-center gap-4">
            <Button
              onClick={onSignIn}
              className="w-fit bg-[#1E40AF] hover:bg-[#1E3A8A] text-white font-semibold py-3 px-6 rounded-md"
            >
              Sign In
            </Button>

            <button onClick={onContinueAsGuest} className="transition-colors">
              Click here to continue as guest.
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginDialog;
