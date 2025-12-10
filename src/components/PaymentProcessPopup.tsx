import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const PaymentProcessPopup = () => {
  return (
    <Dialog>
      <DialogContent
        showCloseButton={false}
        className="max-w-[533px] border border-[#E4E4E4] rounded-2xl dialog-pop gap-4"
      >
        <DialogHeader>
          <DialogTitle className="text-2xl leading-9 text-center font-semibold md:font-bold text-[#232D26]">
            Please wait{" "}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 flex flex-col items-center">
          <p className="text-center text-xl text-[#090C0F">
            Holding your trees and taking you to payment.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default PaymentProcessPopup;
