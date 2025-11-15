import { NavLink, useNavigate } from "react-router-dom";
// import LogoDzDelice from "../icons/LogoDzDelice.jsx";
// import WebIcon from "../icons/WebIcon.jsx";
// import ShopBagIcon from "../icons/ShopBagIcon.jsx";
// import FacebookIcon from "../icons/FacebookIcon.jsx";
// import InstagramIcon from "../icons/InstagramIcon.jsx";
import { useCart } from "../context/CartContext.jsx";
import logo from '../assets/logo.svg';
import search from '../assets/search.svg';
import market from '../assets/market.svg';
export default function Navbar() {
  const { getCartCount } = useCart();
  const cartCount = getCartCount();
  const navigate = useNavigate();

  return (
    <header className="w-full " 
    style={{
      borderBottom: "1px solid black",
    }}
    >
     

      {/* Main nav */}
      <div className="container mx-auto px-4 py-7 bg-white ">
        <div className="flex items-center gap-6">
          {/* Logo */}
          <div className="flex items-center gap-3  cursor-pointer" onClick={() => navigate('/') }>
            <img src={logo} alt="Logo" className="h-8" />
          </div>

          {/* Center links */}
          <nav className="hidden md:flex flex-1 justify-center text-xl ">
            <ul className="flex items-center gap-8 ">
              <li>
                <NavLink to="/" end className={({isActive}) => isActive ? 'font-semibold text-black' : ''}>Home</NavLink>
              </li>
              <li>
                <NavLink to="/about" className={({isActive}) => isActive ? 'font-semibold text-black' : ''}>About us</NavLink>
              </li>
              <li>
                <NavLink to="/signup" className={({isActive}) => isActive ? 'font-semibold text-black' : ''}>Register with us</NavLink>
              </li>
            </ul>
          </nav>

          {/* Right icons and CTAs */}
          <div className="ml-auto flex items-center gap-3 ">
            <button className="hidden md:inline-flex items-center justify-center h-9 w-9 rounded-full text-[#6B896D]">
              <img src={search} alt="Search" className="h-5 w-5" />
            </button>
            <button onClick={() => navigate('/cart')} className="relative inline-flex items-center justify-center h-9 w-9    ">
              <img src={market} alt="Cart" className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1   text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">{cartCount>99? '99+' : cartCount}</span>
              )}
            </button>

            <button onClick={() => navigate('/signup')} className="hidden md:inline-block px-4 py-2 border border-[#6B896D] text-[#6B896D] rounded-full">Sign up</button>
            <button onClick={() => navigate('/login')} className="px-4 py-2 text-white rounded-full bg-[#6B896D] ">Sign in</button>
          </div>
        </div>
      </div>
    </header>
  );
}