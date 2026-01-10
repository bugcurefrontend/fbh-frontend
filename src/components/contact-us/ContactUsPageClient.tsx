"use client";

import { useState } from "react";
import { Mail, MailOpen, MapPin, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import CircleRightTickIcon from "../icons/CircleRightTickIcon";

const ContactUsPageClient = () => {
  const [personalDetails, setPersonalDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  const [emailError, setEmailError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const onPersonalDetailsChange = (key: string, value: string) => {
    setPersonalDetails((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (
      !personalDetails.firstName ||
      !personalDetails.lastName ||
      !personalDetails.email ||
      !personalDetails.message
    ) {
      return;
    }

    if (emailError) return;

    try {
      setIsSubmitting(true);

      //  Replace this with real API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setIsSuccess(true);

      // Reset form
      setPersonalDetails({
        firstName: "",
        lastName: "",
        email: "",
        message: "",
      });
    } catch (error) {
      console.error("Form submission failed", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="md:space-y-16 space-y-8">
      <div className="bg-[#E6EBF580] flex flex-col gap-6 sm:gap-8 items-center justify-center sm:p-8 p-4">
        <div className="sm:space-y-4 text-center">
          <h2 className="text-[22px] sm:text-[32px] font-[Playfair_Display] font-semibold text-black md:text-[32px] md:font-semibold md:leading-[48px] max-md:text-center md:text-[#090C0F]">
            Get in Touch
          </h2>
          <p className="text-[#454950] font-medium leading-6.5 md:text-lg max-sm:hidden">
            Join us in our mission to restore and conserve Earth's biodiversity.
          </p>
        </div>

        {isSuccess ? (
          <div className="max-w-[706px] w-full bg-white border border-[#E8E8E9] rounded-[8px] p-6 md:p-4 pb-6 space-y-2 md:space-y-4 flex items-center justify-center flex-col text-center">
            <CircleRightTickIcon className="md:w-50 w-25 h-25 md:h-50" />
            <h3 className="md:text-2xl font-semibold leading-6 text-[#090C0F]">
              Message Sent !
            </h3>
            <p className="md:font-medium max-md:leading-6 text-[#454950]">
              Someone from our team will reach out to you shortly.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="max-w-[706px] w-full bg-white border border-[#E8E8E9] rounded-[8px] p-4 space-y-6"
          >
            <div className="grid md:grid-cols-2 gap-6 md:gap-8">
              <div>
                <label className="mb-1.5 block text-xs text-[#344054] font-semibold">
                  First Name
                </label>
                <input
                  type="text"
                  maxLength={30}
                  value={personalDetails.firstName}
                  onChange={(e) =>
                    onPersonalDetailsChange("firstName", e.target.value)
                  }
                  required
                  placeholder="Jason"
                  className="w-full px-3.5 py-2.5 border border-[#D0D5DD] rounded-[8px]"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs text-[#344054] font-semibold">
                  Last Name
                </label>
                <input
                  type="text"
                  maxLength={30}
                  value={personalDetails.lastName}
                  onChange={(e) =>
                    onPersonalDetailsChange("lastName", e.target.value)
                  }
                  required
                  placeholder="Manson"
                  className="w-full px-3.5 py-2.5 border border-[#D0D5DD] rounded-[8px]"
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-xs text-[#344054] font-semibold">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-[#63676C] w-5 h-5" />
                <input
                  type="email"
                  maxLength={50}
                  value={personalDetails.email}
                  onChange={(e) => {
                    const value = e.target.value;
                    onPersonalDetailsChange("email", value);
                    if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                      setEmailError("Please enter a valid email address.");
                    } else {
                      setEmailError("");
                    }
                  }}
                  required
                  placeholder="olivia@heartfulness.com"
                  className="w-full pl-10 px-3.5 py-2.5 border border-[#D0D5DD] rounded-[8px]"
                />
              </div>
              {emailError && (
                <p className="text-xs text-red-500 mt-1">{emailError}</p>
              )}
            </div>

            <div>
              <label className="mb-1.5 block text-xs text-[#344054] font-semibold">
                Message
              </label>
              <Textarea
                value={personalDetails.message}
                onChange={(e) =>
                  onPersonalDetailsChange("message", e.target.value)
                }
                required
                placeholder="Enter Message"
                className="w-full px-3.5 py-2.5 border border-[#D0D5DD] rounded-[8px]"
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-11 md:h-12 border-1 text-white bg-[#003399] rounded-[8px] text-base font-bold hover:bg-[#013eb9] transition-colors disabled:cursor-not-allowed uppercase"
            >
              {isSubmitting ? "Sending..." : "Submit"}
            </Button>
          </form>
        )}
      </div>
      <div className="max-w-7xl mx-auto flex justify-center md:px-16 px-4">
        <div className="w-full rounded-2xl border border-[#95AAD5] bg-white md:px-6 md:py-8">
          <div className="md:h-[236px] grid grid-cols-1 md:grid-cols-3 md:divide-x divide-[#D1D5DB]">
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
                Send us your questions, suggestions,{" "}
                <br className="sm:hidden" /> or collaboration proposals
              </p>
              <a href="mailto:fbh@heartfulness.org">
                <p className="font-bold text-[#003399] hover:underline py-[11px]">
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
                Reach out to us directly for quick <br className="sm:hidden" />{" "}
                responses and inquiries
              </p>
              <a href="https://wa.me/919391003685">
                <p className="font-bold text-[#003399] hover:underline py-[11px]">
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

export default ContactUsPageClient;
