import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

export default function StudioArrowLink({ to, className = "", children }) {
  const isRoute = to.startsWith("/");
  const content = (
    <>
      <span>{children}</span>
      <ArrowUpRight className="ml-2 h-[1em] w-[1em]" />
    </>
  );

  return isRoute ? (
    <Link to={to} className={className} data-cursor="default">
      {content}
    </Link>
  ) : (
    <a href={to} className={className} data-cursor="default">
      {content}
    </a>
  );
}
