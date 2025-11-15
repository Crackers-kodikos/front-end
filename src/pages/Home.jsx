
import React from "react";
import { Link } from "react-router-dom";
import hero from "../assets/hero.jpg";
import logo from '../assets/logo.svg';
import logo2 from '../assets/logo2.svg';
import starter from '../assets/starter.svg';
import grow from '../assets/grow.svg';
import master from '../assets/master.svg';
import paymentService from "../api/paymentService";


import { Check, Phone, Mail, MapPin, Clock } from "lucide-react";

function PricingCard({ name, subtitle, price, oldPrice, features, icon }) {
  return (
    <div className="w-full max-w-[300px] bg-white rounded-lg border border-black/8 shadow-[0_106.667px_106.667px_-71.111px_rgba(76,86,115,0.08)]"
	style={{ fontFamily: " 'Poppins', sans-serif" }}
	>
      <div className="p-6 md:p-9 pb-4 md:pb-6 border-b border-[#F0F3F9] mt-10">
        <div className="mb-3 ">
          {icon === "star" && (
            <div className="w-[50px] h-[50px] mt-7 rounded-full bg-green border-2 border-green/10 flex items-center justify-center">
             <img src={starter} alt="Starter Icon" className="w-9 h-9 " /> 
            </div>
          )}

          {icon === "sparkle" && (
            <div className="w-[50px] h-[50px] mt-7 rounded-full bg-green border-2 border-green/10 flex items-center justify-center">
              <img src={grow} alt="Growing Icon" className="w-9 h-9 " />
            </div>
          )}
        </div>

        <div className="space-y-2 md:space-y-3">
          <div>
            <h3 className="font-cormorant text-[26px] md:text-[30px] font-bold text-[#101828] leading-[36px] tracking-[-0.569px]">
              {name}
            </h3>
            <p className="font-cormorant text-[12px] md:text-[13px] text-[#101828]/40 tracking-[-0.569px]">
              {subtitle}
            </p>
          </div>

          <div className="flex items-center gap-2 md:gap-3">
            <div>
              <span className="font-poppins text-[24px] md:text-[27px] font-medium text-[#101828]">
                {price}
              </span>
              <span className="font-cormorant text-[13px] text-[#101828]"> DA</span>
            </div>
            <div className="flex flex-col">
              <span className="font-poppins text-[11px] md:text-[12px] font-medium text-[#101828] line-through">
                {oldPrice}
              </span>
              <span className="font-cormorant text-[11px] md:text-[12px] text-[#475467]">
                /per month
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 md:p-9 pt-4 md:pt-6 space-y-6 md:space-y-8">
        <div className="space-y-2 md:space-y-3">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start gap-2">
              <Check className="w-[18px] h-[18px] text-green flex-shrink-0 mt-0.5" strokeWidth={2} />
              <span className="font-cormorant text-[15px] md:text-[16px] font-medium text-[#101828]/60 leading-[21px] tracking-[-0.142px]">
                {feature}
              </span>
            </div>
          ))}
        </div>
         
        <button className="w-full py-2 px-3 rounded-lg bg-gradient-to-b from-[#94E2AB] to-[#4A7C59] text-white font-manrope text-[12px] font-semibold shadow-[0_10.667px_21.333px_0_rgba(74,124,89,0.20)] hover:opacity-90 transition-opacity">
          Start 7-day free trial
        </button>
      </div>
    </div>
  );
}

export function PricingSection() {
  return (
    <section className="w-full bg-light-beige py-12 md:py-16 lg:py-20">
      <div className="max-w-[1000px] mx-auto px-4 md:px-8">
        <div className="text-center space-y-6 md:space-y-8 mb-8 md:mb-12">
          <h2 className="font-cormorant text-[36px] md:text-[48px] lg:text-[56px] font-bold text-green leading-[130%] tracking-[1.12px] px-4 text-[#2f4e29]">
            Pick your plan, choose your seats
          </h2>

          <p className="font-cormorant text-[24px] md:text-[28px] lg:text-[33px] text-black/60 px-4">
            Pick an account plan that fits your workflow
          </p>

          <div className="inline-flex flex-col sm:flex-row items-center gap-2 sm:gap-4 p-1 rounded-[28px] border border-white/12 bg-white/8 backdrop-blur-md">
            {/* Monthly button - selected */}
            <button
              className="px-6 md:px-7 py-2 rounded-[21px] bg-green text-white font-cormorant text-[20px] md:text-[22px] w-full sm:w-auto font-medium shadow-[0_6px_14px_0_rgba(74,124,89,0.18)] focus:outline-none focus:ring-2 focus:ring-green/40 bg-[#4A7C59]"
              aria-pressed="true"
            >
              Monthly
            </button>

            {/* Yearly button - unselected but clickable */}
            <button
              className="px-6 md:px-7 py-2 rounded-[21px] bg-transparent text-black font-cormorant text-[20px] md:text-[22px] w-full sm:w-auto font-medium hover:bg-black/5 transition-colors focus:outline-none focus:ring-2 focus:ring-black/10"
              aria-pressed="false"
            >
              Yearly
            </button>

            {/* Promo pill */}
            <button
              className="ml-0 sm:ml-3 px-3 md:px-4 py-1 rounded-full border border-black/20 bg-white/16 backdrop-blur-md font-cormorant text-[14px] md:text-[16px] text-black whitespace-nowrap hover:bg-white/24 focus:outline-none"
            >
              2-Months Free
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 justify-items-center">
          <PricingCard
            name="Starter Atelier"
            subtitle="(For small workshops)"
            price="30000"
            oldPrice="45000"
            icon="star"
            features={[
              "1 boutique",
              "Unlimited orders",
              "Traditional product templates",
              "Basic stock tracking",
              "Wedding deadline alerts"
            ]}
          />

          <div className="relative ">
            <div className="rounded-2xl bg-gradient-to-b from-[#234157] to-[#2c8650] p-6 shadow-xl text-white relative overflow-hidden">
      {/* Icon */}
      <div className="w-12 h-12 rounded-full bg-white/30 flex items-center justify-center mb-4">
        <span className="text-2xl">✤</span>
      </div>

      {/* Title */}
      <h2 className="text-2xl font-semibold">Master Atelier</h2>
      <p className="text-sm opacity-80 mb-4">(Medium ateliers)</p>

      {/* Pricing */}
      <div className="mb-6">
        <span className="text-4xl font-bold">100000</span>
        <span className="ml-1">DA</span>

        <div className="text-sm opacity-60 line-through">120000 DA</div>
        <div className="text-sm opacity-80">/per month</div>
      </div>

      {/* Features */}
      <ul className="space-y-3 mb-8 text-sm">
        <li className="flex gap-2 items-center">
          <Check className="w-4 h-4" /> 5 boutiques
        </li>
        <li className="flex gap-2 items-center">
          <Check className="w-4 h-4" /> Full analytics
        </li>
        <li className="flex gap-2 items-center leading-tight">
          <Check className="w-4 h-4" /> 
          Waste tracking (how much velvet lost because of wrong measurements)
        </li>
        <li className="flex gap-2 items-center">
          <Check className="w-4 h-4" /> Custom karakou design library
        </li>
        <li className="flex gap-2 items-center">
          <Check className="w-4 h-4" /> Premium support
        </li>
      </ul>

      {/* Button */}
      <button className="w-full py-3 bg-white text-black text-sm rounded-xl font-medium shadow-md hover:bg-gray-100 transition">
        Start 7-day free trial
      </button>
    </div>
          </div>

          <PricingCard
            name="Growing Atelier"
            subtitle="(Medium ateliers)"
            price="65000"
            oldPrice="90000"
            icon="sparkle"
            features={[
              "3 boutiques",
              "Detailed materials tracking",
              "Model history (karakou models made before)",
              "Productivity dashboard (broderie hours, finishing hours)",
              "Priority client support"
            ]}
          />
        </div>
      </div>
    </section>
  );
}

export default function Home() {
	return (
		<main className="min-h-screen ">
			 {/* Top info bar */}
      <div className="w-full  text-[#6B896D] text-sm">
        <div className="container mx-auto px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="hidden md:inline">SUN - THU : 10H - 20H</span>
            <span>07 75 36 45 34</span>
          </div>
          <div className="text-right text-xs">el salam 255 , oum el bouaghi</div>
        </div>
      </div>
			{/* Hero */}
			
			<section className="container mx-auto px-4 py-12">
				<div className="md:flex md:items-center md:gap-8">
					<div className="h-72 md:h-[420px] overflow-hidden rounded-md md:flex-1">
						<img
							src={hero}
							alt="dresses"
							className="w-full h-full object-cover"
						/>
					</div>
          <div className="px-2 md:px-8 md:flex-1 mt-6 md:mt-0 text-center">
            <h1 className="text-4xl md:text-5xl font-serif text-[#7DAB8B] mb-4 text-center ">Quality Clothes For Every Woman</h1>
            <p className="text-gray-600 mb-6">Karakou, Chedda, Melhfa — Customized for Your Special Day</p>
            <Link to="/signup" className="inline-block bg-[#7DAB8B] text-white px-6 py-2 rounded-full">
              register now
            </Link>
          </div>
					</div>
				
			</section>

			{/* Feature strip */}
			<div className="w-full border-t border-b border-gray-200 bg-white">
				<div className="container mx-auto py-3 overflow-hidden">
					{/* marquee wrapper */}
					<div className="relative">
						{/* Track: duplicated content for seamless loop */}
						<div className="marquee-track">
							<div className="marquee-content inline-flex items-center gap-8 md:gap-16 lg:gap-32 text-xl text-gray-700">
								<span>High quality fabrics</span>
								<span>Algerian CUSTOM-MADE creations</span>
								<span>National delivery 58 wilayas</span>
								<span>Experienced artisans</span>
							</div>

							{/* duplicate */}
							<div className="marquee-content inline-flex items-center gap-8 md:gap-16 lg:gap-32 text-xl text-gray-700">
								<span>High quality fabrics</span>
								<span>Algerian CUSTOM-MADE creations</span>
								<span>National delivery 58 wilayas</span>
								<span>Experienced artisans</span>
							</div>
						</div>
					</div>
				</div>

				{/* Styles for the sliding animation */}
				<style>{`
					.marquee-track {
						display: flex;
						width: 200%;
						will-change: transform;
						animation: marquee 18s linear infinite;
					}

					.marquee-content {
						flex: 0 0 50%;
						justify-content: center;
					}

					@keyframes marquee {
						0%   { transform: translateX(0); }
						100% { transform: translateX(-50%); }
					}

					/* Respect user preference for reduced motion */
					@media (prefers-reduced-motion: reduce) {
						.marquee-track {
							animation: none;
						}
					}
				`}</style>
			</div>
      <PricingSection />
			
      <footer className="w-full bg-[#3a5f45] text-white mt-16 border-b-4 border-[#0b63a8] text-xl ">
        <div className="container mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left column: logo + description */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src={logo2} alt="Khayt logo" className="w-9 h-9" />
              <h2 className="font-cormorant text-3xl">Khayt</h2>
            </div>
            <p className="text-sm text-[#F6F5EF]/90 max-w-md">We believe that every woman deserves to feel beautiful and confident, and we are committed to providing you with the best quality and styles that will make you look and feel your best.</p>
          </div>

          {/* Center column: hours and social */}
          <div className="flex items-center justify-center">
            <div className="text-center text-sm space-y-3">
              <div className="text-base">Samedi - jeudi: 10h - 18h</div>
              <div className="text-base">Vendredi: 15h - 20h</div>
              <div className="pt-2">
                <div className="flex items-center justify-center gap-4 text-sm">
                  <span className="flex items-center gap-2"><span className="w-4 h-4 inline-flex items-center justify-center">📷</span> khayt.dz</span>
                  <span className="flex items-center gap-2"><span className="w-4 h-4 inline-flex items-center justify-center">📘</span> khayt dz</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right column: contact list */}
          <div className="flex items-center md:justify-end">
            <ul className="text-sm space-y-3">
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4" />
                <span>0770 22 45 44</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4" />
                <span>Khayt.collection@gmail.com</span>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="w-4 h-4" />
                <span>Khayt, SÉTIF Cité yahiaoui boutique Setif</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="inline-block w-4" />
                <span>boutique alger</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="inline-block w-4" />
                <span>Khayt, Kouba, alger</span>
              </li>
            </ul>
          </div>
        </div>
      </footer>
		</main>
	);
}
