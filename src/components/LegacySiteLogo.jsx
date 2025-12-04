// Legacy site logo preserved for future reference.
// Reintroduce by importing this component and rendering inside a link.

import { LogoGlitchWord } from "../pages/Home.jsx";

export function LegacySiteLogo() {
  return (
    <>
      <span className="px-2 py-1 bg-white text-black">TC</span>
      <LogoGlitchWord text="DESIGN" className="ml-2" />
    </>
  );
}

