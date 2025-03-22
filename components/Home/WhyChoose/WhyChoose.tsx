import SectionHeading from "@/components/Helper/SectionHeading";
import React from "react";
import WhyChooseCard from "./WhyChooseCard";

const WhyChoose = () => {
  return (
    <div className="pt-16 pb-24">
      {/* Section Heading */}
      <SectionHeading heading="Why Choose Us" description="Trusted by thousands, we offer unbeatable prices, expert guidance, and unforgettable experiences to make your journey extraordinary" />
      <div className="grid w-[80%] mx-auto grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 items-center mt-20">
        {/* Why choose card */}
        <div data-aos="fade-up" data-aos-anchor-placement="top-center">
          <WhyChooseCard image="/images/c1.svg" title="Best Price Guarantee" description="Unbeatable rates with a promise to match or beat any lower price, ensuring you always get the best deal"/>
        </div>
        <div
          data-aos="fade-up"
          data-aos-anchor-placement="top-center"
          data-aos-delay="150"
        >
          <WhyChooseCard image="/images/c2.svg" title="Easy & Quick Booking" description="A seamless, user-friendly platform designed to get you from search to confirmation in just a few clicks."/>
        </div>
        <div
          data-aos="fade-up"
          data-aos-anchor-placement="top-center"
          data-aos-delay="300"
        >
          <WhyChooseCard image="/images/c3.svg" title="Customer Care 24/7" description="Round-the-clock support to assist you at every step, making your travel experience stress-free and enjoyable."/>
        </div>
      </div>
    </div>
  );
};

export default WhyChoose;
