"use client";
import React, { useEffect, useState } from "react";
import { ArrowRightCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";

type PaymentStatus = "success" | "failed";

interface PaymentStatusPageClientProps {
  status: PaymentStatus;
}

const PaymentStatusPageClient: React.FC<PaymentStatusPageClientProps> = ({
  status: initialStatus,
}) => {
  const searchParams = useSearchParams();
  const ref = searchParams.get("ref") || searchParams.get("reference");
  const [status] = useState<PaymentStatus>(initialStatus);
  const [referenceNumber, setReferenceNumber] = useState<string>("N/A");

  useEffect(() => {
    if (ref) {
      setReferenceNumber(ref);
    } else {
      setReferenceNumber("N/A");
    }
  }, [ref]);
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full">
        {/* Payment Status Card */}
        <div className="text-center flex items-center justify-center">
          {status === "success" ? (
            <div className="md:py-12 py-8 md:px-16 px-4 border-[#12B569] border rounded-[16px]">
              {/* Success State */}
              <div className="inline-flex items-center justify-center w-25 h-25 animate-bounce">
                <Image
                  src="/images/success.png"
                  alt="success"
                  width={100}
                  height={100}
                />
              </div>

              <h1 className="text-2xl sm:text-[32px] font-[Playfair_Display] font-semibold sm:text-center text-[#232D26] md:text-[32px] md:font-semibold md:leading-[48px] md:align-middle md:text-[#232D26]">
                Payment Successful!
              </h1>

              <div className="py-2 w-fit mx-auto px-4 my-6 rounded-[8px] bg-[#E7F8F0]">
                <p className="font-bold md:text-xl leading-9 text-green-700">
                  Reference Number: {referenceNumber}
                </p>
              </div>

              <p className="text-[#090C0F] font-medium md:text-2xl md:leading-9">
                Your tree is now planted for a greener tomorrow.{" "}
                <br className="max-sm:hidden" />
                Thank you for making a difference!
              </p>

              <Link href="/" className="mt-6 sm:mt-8 inline-block">
                <Button
                  className={`flex-1 bg-[#003399] hover:bg-[#002266] text-white font-bold w-[207px] h-12 rounded-[8px]`}
                >
                  Go to Dashboard
                  <ArrowRightCircle className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          ) : (
            <div className="md:py-12 py-8 md:px-16 px-4 border-[#F04438] border rounded-[16px]">
              {/* Failed State */}
              <div className="inline-flex items-center justify-center w-20 h-20 animate-bounce">
                <Image
                  src="/images/failed.png"
                  alt="success"
                  width={80}
                  height={80}
                />
              </div>

              <h1 className="text-2xl sm:text-[32px] font-[Playfair_Display] font-semibold sm:text-center text-[#232D26] mb-4 md:text-[32px] md:font-semibold md:leading-[48px] md:align-middle md:text-[#232D26]">
                Payment Failed! <br />
                Donation did not succeed
              </h1>

              <div className="w-fit mx-auto py-2 px-4 my-6 rounded-[8px] bg-[#FEEDEC]">
                <p className="font-bold md:text-xl leading-9 text-[#F04438]">
                  Reference Number: {referenceNumber}
                </p>
              </div>

              <p className="text-[#F04438] font-medium md:text-2xl md:leading-9 mb-4">
                Please check you bank/card account. If money is debited,
                <br className="max-sm:hidden" />
                it will get refunded back to your/card account
              </p>

              <p className="text-sm text-gray-500 italic mb-8">
                Note: Please don't hit browser back button, <br />
                Use the below button to navigate to home
              </p>

              <Link href="/" className="inline-block">
                <Button
                  className={`flex-1 bg-[#003399] hover:bg-[#002266] text-white font-bold w-[207px] h-12 rounded-[8px]`}
                >
                  Go to Home Page
                  <ArrowRightCircle className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentStatusPageClient;
