import {NavLink} from "react-router-dom";
import Auth from "./Auth";

const __NAV = [
  {title: "Home", href: "/"},
  {title: "My Posts", href: "myposts"},
];

function Navbar() {
  return (
    <nav className="bg-secondary py-4">
      <div className="container grid grid-cols-4 items-center">
        <div className="col-span-2">
          <div className="flex flex-row items-center justify-start space-x-4 text-[1.25em] font-medium text-primary">
            {__NAV.map((nav) => (
              <NavLink
                className={(_nav) => (_nav.isActive ? "text-third" : "")}
                to={nav.href}
                reloadDocument
                key={nav.href}>
                {nav.title}
              </NavLink>
            ))}
          </div>
        </div>
        <div className="col-span-2">
          <Auth />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
