import imgLogoFixify1 from "figma:asset/84806cc0b2ecae0421d150d38ecdda140f8f13fd.png";

function Component1() {
  return (
    <div className="h-10 relative shrink-0 w-[472px]" data-name="Component 1">
      <div
        className="absolute aspect-[128/128] bg-center bg-cover bg-no-repeat left-0 right-[93.988%] top-[5px]"
        data-name="logo_fixify 1"
        style={{ backgroundImage: `url('${imgLogoFixify1}')` }}
      />
      <div className="absolute bottom-0 font-['Racing_Sans_One:Regular',_sans-serif] leading-[0] left-[8.097%] not-italic right-[5.329%] text-[#0b3e74] text-[28px] text-left top-0">
        <p className="block leading-[36px]">Fixify</p>
      </div>
    </div>
  );
}

function Navigation() {
  return (
    <div
      className="bg-[#ffffff] box-border content-stretch flex flex-row font-['Poppins:Regular',_sans-serif] gap-10 items-center justify-center leading-[0] not-italic p-0 relative shrink-0 text-[16px] text-left text-nowrap w-[534px]"
      data-name="navigation"
    >
      <div className="relative shrink-0 text-[#e67a17]">
        <p className="block leading-[24px] text-nowrap whitespace-pre">
          Acceuil
        </p>
      </div>
      <div className="relative shrink-0 text-[#000000]">
        <p className="block leading-[24px] text-nowrap whitespace-pre">
          Nos services
        </p>
      </div>
      <div className="relative shrink-0 text-[#000000]">
        <p className="block leading-[24px] text-nowrap whitespace-pre">{`Marketplace  `}</p>
      </div>
      <div className="relative shrink-0 text-[#000000]">
        <p className="block leading-[24px] text-nowrap whitespace-pre">
          Contact
        </p>
      </div>
      <div className="relative shrink-0 text-[#000000]">
        <p className="block leading-[24px] text-nowrap whitespace-pre">Aide</p>
      </div>
    </div>
  );
}

function Button() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-10 left-[-26.594px] rounded-lg top-0 w-[114px]"
      data-name="button"
    >
      <div className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-lg" />
      <div className="absolute font-['Poppins:Regular',_sans-serif] h-6 leading-[0] left-[57px] not-italic text-[16px] text-center text-neutral-700 top-[9px] translate-x-[-50%] w-[110px]">
        <p className="block leading-[normal]">Connexion</p>
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div
      className="absolute bg-[#e67a17] h-10 left-[102.406px] rounded-lg top-0 w-[185px]"
      data-name="button"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-lg" />
      <div className="absolute font-['Poppins:Regular',_sans-serif] h-6 leading-[0] left-[94.5px] not-italic text-[#ffffff] text-[16px] text-center top-2 translate-x-[-50%] w-[157px]">
        <p className="block leading-[normal]">Créer un compte</p>
      </div>
    </div>
  );
}

function Div() {
  return (
    <div
      className="bg-[rgba(0,0,0,0)] h-10 relative shrink-0 w-[287.812px]"
      data-name="div"
    >
      <div className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none" />
      <Button />
      <Button1 />
    </div>
  );
}

export default function TopBar() {
  return (
    <div
      className="bg-[#ffffff] relative shadow-[0px_0px_6px_0px_rgba(0,0,0,0.12)] size-full"
      data-name="Top Bar"
    >
      <div className="flex flex-row items-center justify-center relative size-full">
        <div className="box-border content-stretch flex flex-row gap-[37px] items-center justify-center pl-0 pr-5 py-5 relative size-full">
          <Component1 />
          <Navigation />
          <Div />
        </div>
      </div>
    </div>
  );
}