import type { Metadata } from "next";
import ContactSection from "@/components/contact/ContactSection";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Tanjil Ahmed — Lead Software Engineer in Dhaka, Bangladesh — about web platforms, AI products, and scalable systems.",
};

export default function ContactPage() {
  return (
    <div className="pt-16 md:pt-20">
      <ContactSection />
    </div>
  );
}
