"use client";

import { useState } from "react";
import { Mail, MailOpen, MapPin, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";

const page = () => {
  const [personalDetails, setPersonalDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });
  const [emailError, setEmailError] = useState("");

  const onPersonalDetailsChange = (key: string, value: string) => {
    setPersonalDetails((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <main className="md:space-y-16 space-y-8">
      <div className="bg-[#E6EBF580] flex flex-col gap-6 sm:gap-10 items-center justify-center sm:p-8 p-4">
        <div className="sm:space-y-4 text-center">
          <h2 className="text-2xl sm:text-[32px] font-[Playfair_Display] font-semibold text-black md:text-[32px] md:font-semibold md:leading-[48px] max-md:text-center md:text-[#090C0F]">
            Get In Touch
          </h2>
          <p className="text-[#454950] font-medium leading-6.5 md:text-lg max-sm:hidden">
            Join us in our mission to restore and conserve Earth's biodiversity.
          </p>
        </div>

        <div className="max-w-[706px] w-full bg-white border border-[#E8E8E9] rounded-2xl p-4 space-y-6">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <label className="mb-1.5 block text-xs text-[#344054] font-semibold">
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={personalDetails.firstName}
                onChange={(e) => {
                  const value = e.target.value
                    .replace(/[^A-Za-z\s'-]/g, "")
                    .slice(0, 40);
                  if (/^[A-Za-z\s'-]*$/.test(value)) {
                    onPersonalDetailsChange("firstName", value);
                  }
                }}
                placeholder="jason"
                className="w-full px-3.5 py-2.5 border border-[#D0D5DD] rounded-lg text-[#090C0F]"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs text-[#344054] font-semibold">
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={personalDetails.lastName}
                onChange={(e) => {
                  const value = e.target.value
                    .replace(/[^A-Za-z\s'-]/g, "")
                    .slice(0, 40);
                  if (/^[A-Za-z\s'-]*$/.test(value)) {
                    onPersonalDetailsChange("lastName", value);
                  }
                }}
                className="w-full px-3.5 py-2.5 border border-[#D0D5DD] rounded-lg text-[#090C0F]"
                placeholder="Manson"
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-xs text-[#344054] font-semibold">
              Email <span className="text-red-500">*</span>
            </label>

            <div className="relative w-full">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-[#63676C] w-5 h-5" />
              <input
                type="text"
                value={personalDetails.email}
                onChange={(e) => {
                  const value = e.target.value.trimStart();
                  onPersonalDetailsChange("email", value);
                  if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                    setEmailError("Please enter a valid email address.");
                  } else {
                    setEmailError("");
                  }
                }}
                placeholder="olivia@heartfulness.com"
                className="w-full pl-10 px-3.5 py-2.5 border border-[#D0D5DD] rounded-lg text-[#090C0F]"
              />
            </div>
            {emailError && (
              <p className="text-xs text-red-500 font-medium mt-1">
                {emailError}
              </p>
            )}
          </div>

          <div>
            <label className="mb-1.5 block text-xs text-[#344054] font-semibold">
              Message
            </label>

            <Textarea
              value={personalDetails.message}
              onChange={(e) => {
                const value = e.target.value.slice(0, 1000);
                onPersonalDetailsChange("message", value);
              }}
              placeholder="Type your message here..."
              className="w-full px-3.5 py-2.5 border border-[#D0D5DD] rounded-lg text-[#090C0F]"
            />

            {emailError && (
              <p className="text-xs text-red-500 font-medium mt-1">
                {emailError}
              </p>
            )}
          </div>

          <Button className="w-full h-12 border-1 disabled:border-[#E8E8E9] disabled:bg-white border-[#95AAD5] text-white bg-[#003399] disabled:text-[#94979A] rounded-lg text-base font-bold hover:bg-[#013eb9] transition-colors disabled:cursor-not-allowed disabled:opacity-100 uppercase">
            Submit
          </Button>
        </div>
      </div>
      <div className="max-w-7xl mx-auto flex justify-center md:px-16 px-4">
        <div className="w-full rounded-2xl border border-[#95AAD5] bg-white px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 md:divide-x divide-[#D1D5DB]">
            {/* Address */}
            <div className="flex flex-col items-center text-center sm:px-4 max-md:py-4">
              <div className="mb-4 flex md:h-20 md:w-20 h-10 w-10 items-center justify-center rounded-full bg-[#E5EBF5]">
                <MapPin className="md:h-8 md:w-8 h-4 w-4 text-[#003399]" />
              </div>
              <h3 className="mb-3 md:text-2xl text-xl font-semibold text-[#090C0F] leading-6">
                Address
              </h3>
              <p className="max-md:text-sm text-[#454950] md:leading-6">
                13-110, Kanha Shanti Vanam <br />
                Kanha Village, Nandigama Mandal <br />
                Ranga Reddy District, Telangana 509328
              </p>
            </div>

            {/* Email */}
            <div className="flex flex-col items-center text-center sm:px-4 max-md:py-4">
              <div className="mb-4 flex md:h-20 md:w-20 h-10 w-10 items-center justify-center rounded-full bg-[#E5EBF5]">
                <MailOpen className="md:h-8 md:w-8 h-4 w-4 text-[#003399]" />
              </div>
              <h3 className="mb-3 md:text-2xl text-xl font-semibold text-[#090C0F] leading-6">
                Email
              </h3>
              <p className="mb-2 max-md:text-sm text-[#454950] md:leading-6">
                Send us your questions, suggestions, or collaboration proposals
              </p>
              <a href="mailto:fbh@heartfulness.org">
                <p className="font-bold text-[#003399] hover:underline">
                  fbh@heartfulness.org
                </p>
              </a>
            </div>

            {/* WhatsApp */}
            <div className="flex flex-col items-center text-center sm:px-4 max-md:py-4">
              <div className="mb-4 flex md:h-20 md:w-20 h-10 w-10 items-center justify-center rounded-full bg-[#E5EBF5]">
                <Image
                  src="/images/whatsapp.png"
                  alt="WhatsApp"
                  height={32}
                  width={32}
                  className="md:h-8 md:w-8 h-4 w-4 text-[#003399]"
                />
              </div>
              <h3 className="mb-3 md:text-2xl text-xl font-semibold text-[#090C0F] leading-6">
                Whatsapp
              </h3>
              <p className="mb-2 max-md:text-sm text-[#454950] md:leading-6">
                Reach out to us directly for quick responses and inquiries
              </p>
              <a href="https://wa.me/919391003685">
                <p className="font-bold text-[#003399] hover:underline">
                  +91 93910 03685
                </p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
export default page;
