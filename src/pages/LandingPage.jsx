import React from "react";
import Navbar from "../ui/components/Landing Page/Navbar";
import Features from "../ui/components/Landing Page/Features";
import Testimonial from "../ui/components/Landing Page/Testimonial";
import CTA from "../ui/components/Landing Page/CTA";
import Footer from "../ui/components/Landing Page/Footer";

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <Features />
      <Testimonial />
      <CTA />
      <Footer />
    </>
  );
}



