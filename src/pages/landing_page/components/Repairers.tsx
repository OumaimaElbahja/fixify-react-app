import { useState, useEffect } from "react";
import svgPaths from "../imports/svg-21r8cmelfo";
import imgRepairer from "figma:asset/95e6829c30dfb0c519d5332fb7d707aff1eb91d3.png";
import imgImage29 from "figma:asset/35038ea7d677815e2e6b1fcecdb1c1cd4f128888.png";

export function Repairers() {
  return (
    <section className="bg-[#ffffff] relative py-12 md:py-16 overflow-hidden">
      {/* Background SVG */}
      <div className="absolute flex h-[1213.918px] items-center justify-center left-[-1150px] top-[280px] w-[3663.636px] pointer-events-none">
        <div className="flex-none rotate-[353.56deg] skew-x-[0.413deg]">
          <div className="h-[817.233px] relative w-[3588.78px]">
            <svg
              className="block size-full"
              fill="none"
              preserveAspectRatio="none"
              viewBox="0 0 3589 818"
            >
              <path
                d={svgPaths.p16715380}
                fill="url(#paint0_linear_7_715)"
                fillOpacity="0.5"
                id="Ellipse 125"
                opacity="0.5"
              />
              <defs>
                <linearGradient
                  gradientUnits="userSpaceOnUse"
                  id="paint0_linear_7_715"
                  x1="920.761"
                  x2="1115.31"
                  y1="525.239"
                  y2="-311.96"
                >
                  <stop stopColor="#CDCDCD" />
                  <stop offset="0.417652" stopColor="#BAC1C9" />
                  <stop offset="0.721154" stopColor="#94AAC2" />
                  <stop offset="0.9998" stopColor="#84A6CF" />
                  <stop offset="0.9999" stopColor="#94AAC2" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-2 sm:px-4 lg:px-4">
        <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-2">
          {/* Center Content */}
          <div className="flex-1 text-center lg:text-left order-1 lg:order-2">
            <h2 className="font-['Poppins'] font-bold text-[#1a3151] text-xl md:text-2xl lg:text-[36px] leading-[40px] mb-2 text-left">
              Votre Appareil Entre de Bonnes Mains
            </h2>
            <div className="font-['Poppins'] text-[#000000] text-lg lg:text-[20px] leading-[60px] max-w-[538px] mx-auto lg:mx-0">
              <p className="text-left p-[-2px] mx-[0px] my-[-4px]">
                <span>Chez </span>
                <span className="font-['Poppins'] font-regular text-[#2768ad]">
                  Fixify
                </span>
                <span className="font-normal text-[16px] text-[18px]">
                  , chaque réparation est effectuée par des
                  techniciens certifiés utilisant uniquement des
                  pièces d'origine. Votre appareil est traité
                  avec soin et livré dans les meilleurs délais.
                </span>
              </p>
            </div>
          </div>

          {/* Left Image - Repairer */}
          <div className="flex-shrink-0 order-2 lg:order-1">
            <div
              className="w-[260px] h-[200px] md:w-[360px] md:h-[240px] lg:w-[375px] lg:h-[300px] bg-center bg-cover bg-no-repeat rounded-[20px] shadow-[-4px_4px_4px_0px_rgba(0,0,0,0.25)] translate-y-8 -translate-x-4"
              style={{
                backgroundImage: `url('${imgRepairer}')`,
              }}
            />
          </div>
        </div>

        {/* Right Image - Laptop */}
        <div className="flex flex-row items-center">
          <div className="flex-shrink-0 order-3 hidden lg:block ml-auto">
            <div className="flex h-[440px] items-center justify-center w-[380px] mt-[-90px]">
              <div className="flex-none rotate-[356.671deg]">
                <div
                  className="bg-center bg-cover bg-no-repeat h-[360px] w-[500px] -translate-y-36  translate-x-14"
                  style={{
                    backgroundImage: `url('${imgImage29}')`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}