import svgPaths from "./svg-r28vv6qzqv";
import imgFrame427318910 from "figma:asset/18b94ee2fbf251aba9c460e4964d894a033dad8e.png";
import imgFrame427318911 from "figma:asset/68b4f60020bdb859db24871d580cbc57275faafa.png";
import imgFrame427318912 from "figma:asset/67742beeaba31977ab95ad99b8b844be3378613d.png";
import imgSmartwatch from "figma:asset/10d63e2e145dcae7e32de1604d4a4e6e842330b3.png";

function Frame427318910() {
  return (
    <div
      className="absolute bg-center bg-cover bg-no-repeat h-[348px] left-[133px] rounded-[26px] shadow-[-6px_6px_4px_0px_rgba(0,0,0,0.25)] top-[88px] w-[313px]"
      style={{ backgroundImage: `url('${imgFrame427318910}')` }}
    />
  );
}

function Frame427318911() {
  return (
    <div
      className="absolute bg-center bg-cover bg-no-repeat h-[348px] left-[484px] overflow-clip rounded-[26px] shadow-[-6px_6px_4px_0px_rgba(0,0,0,0.25)] top-[88px] w-[313px]"
      style={{ backgroundImage: `url('${imgFrame427318911}')` }}
    >
      <div className="absolute bg-[rgba(19,52,88,0.6)] h-[348px] left-0 rounded-[26px] top-0 w-[313px]" />
      <div className="absolute font-['Inter:Bold',_sans-serif] font-bold h-[47px] leading-[0] left-[35px] not-italic text-[#ffffff] text-[26px] text-left top-[272px] w-[267px]">
        <p className="leading-[60px]">
          <span className="font-['Poppins:Bold',_sans-serif]">Réparation</span>
          <span className="font-['Poppins:Regular',_sans-serif]">Tablette</span>
        </p>
      </div>
    </div>
  );
}

function Frame427318912() {
  return (
    <div
      className="absolute bg-center bg-cover bg-no-repeat h-[348px] left-[839px] overflow-clip rounded-[26px] shadow-[-6px_6px_4px_0px_rgba(0,0,0,0.25)] top-[88px] w-[313px]"
      style={{ backgroundImage: `url('${imgFrame427318912}')` }}
    >
      <div className="absolute font-['Inter:Bold',_sans-serif] font-bold h-[47px] leading-[0] left-11 not-italic text-[#ffffff] text-[26px] text-left top-[267px] w-[250px]">
        <p className="leading-[60px]">
          <span className="font-['Poppins:Bold',_sans-serif]">Réparation</span>
          <span className="font-['Poppins:Regular',_sans-serif]">Laptop</span>
        </p>
      </div>
    </div>
  );
}

function Smartwatch() {
  return (
    <div
      className="absolute bg-center bg-cover bg-no-repeat h-[348px] left-[1194px] overflow-clip rounded-[26px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25),-6px_6px_4px_0px_rgba(0,0,0,0.25)] top-[88px] w-[313px]"
      data-name="smartwatch"
      style={{ backgroundImage: `url('${imgSmartwatch}')` }}
    >
      <div className="absolute bg-[rgba(249,249,249,0.7)] h-[348px] left-[-57px] opacity-70 rounded-[26px] top-0 w-[313px]" />
      <div className="absolute bg-[rgba(19,52,88,0.6)] h-[348px] left-[-14px] rounded-[26px] top-0 w-[313px]" />
      <div className="absolute bg-[rgba(16,50,84,0.9)] left-[156px] rounded-2xl shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] size-20 top-[134px]" />
      <div className="absolute font-['Inter:Bold',_sans-serif] font-bold h-[33px] leading-[0] left-[177px] not-italic text-[#ffffff] text-[48px] text-left top-[141px] w-[53px]">
        <p className="block leading-[60px]">{`>`}</p>
      </div>
      <div className="absolute font-['Inter:Bold',_sans-serif] font-bold leading-[0] left-7 not-italic text-[#ffffff] text-[26px] text-left top-[270px] w-[306px]">
        <p className="leading-[60px]">
          <span className="font-['Poppins:Bold',_sans-serif]">Réparation</span>
          <span className="font-['Poppins:Regular',_sans-serif]">
            Smartwach
          </span>
        </p>
      </div>
    </div>
  );
}

export default function Nosservices() {
  return (
    <div className="relative size-full" data-name="Nosservices">
      <Frame427318910 />
      <div className="absolute font-['Inter:Bold',_sans-serif] font-bold leading-[0] left-[156px] not-italic text-[#ffffff] text-[0px] text-left text-nowrap top-[360px]">
        <p className="leading-[60px] text-[26px] whitespace-pre">
          <span className="font-['Poppins:Bold',_sans-serif]">Réparation</span>
          <span className="font-['Poppins:Regular',_sans-serif]">
            Téléphone
          </span>
          <span className="font-['Poppins:Bold',_sans-serif]"> </span>
        </p>
      </div>
      <Frame427318911 />
      <Frame427318912 />
      <Smartwatch />
      <div
        className="absolute font-['Poppins:Bold',_sans-serif] h-[60px] leading-[0] not-italic text-[#1a3151] text-[36px] text-left top-[-5px] w-[260px]"
        style={{ left: "calc(50% - 125px)" }}
      >
        <p className="block leading-[60px]">Nos Services:</p>
      </div>
      <div className="absolute h-[355px] left-[-120px] top-[163px] w-[253px]">
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 253 355"
        >
          <path
            d={svgPaths.pc73a480}
            fill="var(--fill-0, #E67A17)"
            fillOpacity="0.4"
            id="Ellipse 120"
          />
        </svg>
      </div>
    </div>
  );
}