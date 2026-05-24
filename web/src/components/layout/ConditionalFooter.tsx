"use client";

import { usePathname } from "next/navigation";
import FooterMotionPath from "@/components/FooterMotionPath";
import Footer from "@/components/layout/Footer";

export default function ConditionalFooter() {
  const pathname = usePathname();

  const shouldShowFooter =
    pathname !== "/connexion" &&
    !pathname.startsWith("/admin") &&
    !pathname.startsWith("/vendeur") &&
    !pathname.startsWith("/annonces/");

  if (!shouldShowFooter) return null;

  return (
    <>
      <FooterMotionPath />
      <Footer />
    </>
  );
}
