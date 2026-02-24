import Image from "next/image";

interface DonationDetailsHeaderProps {
  hfiRcptNo: string;
  name: string;
  emailAddress: string;
  phoneNo: string;
  account: string;
  geoTagged: string;
}

export const DonationDetailsHeader = ({
  hfiRcptNo,
  name,
  emailAddress,
  phoneNo,
  account,
  geoTagged,
}: DonationDetailsHeaderProps) => {
  return (
    <div className="max-w-fit mx-auto bg-white border border-[#E6E6E6] rounded-[12px] overflow-hidden flex justify-between gap-6 p-6">
      {/* HFI Rcpt No */}
      <div className="space-y-2">
        <p className="leading-6 font-semibold truncate text-[#94979A]">
          HFI Rcpt No
        </p>
        <p className="leading-6.5 text-lg font-bold truncate text-[#19212C]">
          {hfiRcptNo}
        </p>
      </div>

      {/* Donor Name */}
      <div className="space-y-2">
        <p className="leading-6 font-semibold truncate text-[#94979A]">
          Donor Name
        </p>
        <p className="leading-6.5 text-lg font-bold truncate text-[#19212C]">
          {name}
        </p>
      </div>

      {/* Email Address */}
      <div className="space-y-2">
        <p className="leading-6 font-semibold truncate text-[#94979A]">
          Email Address
        </p>
        <p className="leading-6.5 text-lg font-bold truncate text-[#19212C]">
          {emailAddress}
        </p>
      </div>

      {/* Phone No */}
      <div className="space-y-2">
        <p className="leading-6 font-semibold truncate text-[#94979A]">
          Phone No.
        </p>
        <p className="leading-6.5 text-lg font-bold truncate text-[#19212C]">
          {phoneNo}
        </p>
      </div>

      {/* Account */}
      <div className="space-y-2">
        <p className="leading-6 font-semibold truncate text-[#94979A]">
          Account
        </p>
        <p className="leading-6.5 text-lg font-bold truncate text-[#19212C]">
          {account}
        </p>
      </div>

      {/* Geo-Tagged */}
      <div className="space-y-3">
        <p className="leading-6 font-semibold truncate text-[#94979A]">
          Geo-Tagged
        </p>
        <div className="">
          {geoTagged === "true" ? (
            <Image
              src="/images/check.png"
              alt="Geo-tagged"
              width={17}
              height={17}
            />
          ) : (
            <Image
              src="/images/warning.png"
              alt="Not geo-tagged"
              width={17}
              height={17}
            />
          )}
        </div>
      </div>
    </div>
  );
};
