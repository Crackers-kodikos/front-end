import { NavLink, useNavigate } from "react-router-dom";
// import LogoDzDelice from "../icons/LogoDzDelice.jsx";
// import WebIcon from "../icons/WebIcon.jsx";
// import ShopBagIcon from "../icons/ShopBagIcon.jsx";
// import FacebookIcon from "../icons/FacebookIcon.jsx";
// import InstagramIcon from "../icons/InstagramIcon.jsx";
// import ArrowIcon from "../icons/ArrowIcon.jsx";
import { useCart } from "../context/CartContext.jsx";
import {useState} from "react";

export default function Navbar() {
  const { getCartCount } = useCart();
  const cartCount = getCartCount();
  const [isOrderOpen, setIsOrderOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="relative w-full">
      <div className="container relative mx-auto px-4 pt-3">
        {/* Floating nav bar */}
        <div className="relative z-50 flex items-center gap-4 rounded-[20px] bg-[#FFFFFF] px-3 py-2 shadow-md ring-1 ring-black/5 md:px-4 md:py-3">
          {/* Brand */}
          {/* <div className="flex min-w-fit items-center gap-2">
            <LogoDzDelice />
            <span className="hidden text-[24px] font-extrabold leading-none md:block">
              <span className="text-black">Dz</span>
              <span className="text-[#F67F20]">Délice</span>
            </span>
          </div> */}

          {/* Tabs */}
          <nav className="hidden flex-1 items-center justify-center md:flex">
            <ul className="flex items-center gap-10">
              <li>
                <NavLink
                  to="/"
                  end
                  style={({ isActive }) => ({
                    fontFamily: "Poppins",
                    fontWeight: isActive ? 800 : 400,
                    fontSize: "20px",
                    lineHeight: "100%",
                    letterSpacing: "0%",
                    textAlign: "center",
                    color: isActive ? "#F67F20" : "#00000096",
                  })}
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dishes"
                  style={({ isActive }) => ({
                    fontFamily: "Poppins",
                    fontWeight: isActive ? 800 : 400,
                    fontSize: "20px",
                    lineHeight: "100%",
                    letterSpacing: "0%",
                    textAlign: "center",
                    color: isActive ? "#F67F20" : "#00000096",
                  })}
                >
                  Menu
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  style={({ isActive }) => ({
                    fontFamily: "Poppins",
                    fontWeight: isActive ? 800 : 400,
                    fontSize: "20px",
                    lineHeight: "100%",
                    letterSpacing: "0%",
                    textAlign: "center",
                    color: isActive ? "#F67F20" : "#00000096",
                  })}
                >
                  About us
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/payment-details"
                  style={({ isActive }) => ({
                    fontFamily: "Poppins",
                    fontWeight: isActive ? 800 : 400,
                    fontSize: "20px",
                    lineHeight: "100%",
                    letterSpacing: "0%",
                    textAlign: "center",
                    color: isActive ? "#F67F20" : "#00000096",
                  })}
                >
                  Track Payment
                </NavLink>
              </li>
            </ul>
          </nav>

          {/* Icons */}
          <div className="ml-auto hidden items-center gap-4 text-[#F67F20] md:flex">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-[#FFF1E6]">
              {/* <WebIcon size={20} /> */}
            </span>
            <button
              onClick={() => navigate('/cart')}
              className="relative grid h-8 w-8 place-items-center rounded-full bg-[#FFF1E6] hover:bg-[#F67F20]/10 transition-colors"
            >
              {/* <ShopBagIcon size={19} /> */}
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#F67F20] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </button>
            <span className="grid h-8 w-8 place-items-center rounded-full bg-[#FFF1E6]">
              {/* <FacebookIcon size={20} /> */}
            </span>
            <span className="grid h-8 w-8 place-items-center rounded-full bg-[#FFF1E6]">
              {/* <InstagramIcon size={20} /> */}
            </span>
          </div>

          {/* CTA */}
          <button
            onClick={() => navigate('/login')}
            className="ml-2 flex items-center gap-[10px] whitespace-nowrap bg-[#F67F20] text-white shadow hover:bg-[#E55A2B] transition-colors"
            style={{
              borderRadius: "39px",
              paddingTop: "2px",
              paddingRight: "18px",
              paddingBottom: "2px",
              paddingLeft: "18px",
              width: "175px",
              height: "25px",
            }}
          >
            <span
              style={{
                width: "112px",
                height: "21px",
                fontFamily: "Poppins",
                fontWeight: 500,
                fontSize: "16px",
                lineHeight: "130%",
                letterSpacing: "2%",
                verticalAlign: "middle",
                fontVariantNumeric: "lining-nums proportional-nums",
              }}
            >
              Login as Staff
            </span>
            {/* <ArrowIcon size={9} /> */}
          </button>
        </div>
      </div>
    </header>
  );
}