import StudioFooter from "./StudioFooter.jsx";
import StudioHeader from "./StudioHeader.jsx";

export default function StudioShell({ children, className = "", id = "top" }) {
  return (
    <div className={`studio-page min-h-screen bg-stone-50 text-black antialiased ${className}`} id={id}>
      <StudioHeader />
      <main id="main-wrapper" className="relative z-1 bg-stone-50">
        {children}
      </main>
      <StudioFooter />
    </div>
  );
}
