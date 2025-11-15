import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import login from "../api/login";
import { setTokensFromResponse } from "../api/auth";
import logo from '../assets/logo.svg';

// Demo credentials (keep here only for local/dev demo)
const VALID_PHONE = "c.alia@esi-sba.dz";
const VALID_PASSWORD = "123456";
const VALID_ATELIER = "Atelier test";
const VALID_BOUTIQUE = "Boutique test";

export default function Login() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState(VALID_PHONE);
  const [password, setPassword] = useState(VALID_PASSWORD);
  const [atelier, setAtelier] = useState(VALID_ATELIER);
  const [boutique, setBoutique] = useState(VALID_BOUTIQUE);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const readUsers = () => {
    try {
      const raw = localStorage.getItem("users");
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError("");
    const trimmedPhone = phone.trim();

    setLoading(true);
    try {
      const payload = { phone: trimmedPhone, password };
      const res = await login(payload);

      if (res.ok) {
        // Persist tokens from server response (if any)
        try { setTokensFromResponse(res.data); } catch (e) { console.warn('setTokens failed', e); }
        navigate("/orders");
        return;
      }

      // If API returned an error with a status, show message
      if (res.status) {
        setError(res.message || "Login failed");
        return;
      }

      // Network/unknown error — fallback to local/demo credentials
      const users = readUsers();
      if (users[trimmedPhone] && users[trimmedPhone].password === password) {
        navigate("/orders");
        return;
      }

      // final fallback: original demo constant check
      if (trimmedPhone === VALID_PHONE && password === VALID_PASSWORD) {
        navigate("/orders");
        return;
      }

      setError(res.message || "User not found");
    } catch (err) {
      console.error(err);
      // fallback to local/demo users on unexpected errors
      const users = readUsers();
      if (users[trimmedPhone] && users[trimmedPhone].password === password) {
        navigate("/orders");
        return;
      }
      if (trimmedPhone === VALID_PHONE && password === VALID_PASSWORD) {
        navigate("/orders");
        return;
      }
      setError("User not found");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-[#F6F6EE] "
    style={{
      fontFamily : "Poppins"
    }}
    >
      {/* Left: Illustration card */}
      <div className="flex items-center justify-center px-6 py-10 lg:px-12 bg-transparent">
        <div className="w-full max-w-[640px]">
          <div
            className="w-full h-[760px] rounded-xl overflow-hidden shadow-lg"
            style={{ backgroundColor: "#3F6E57" }}
          >
            {/* Use an existing project image as a placeholder */}
            <img
              src="/src/assets/image.png"
              alt="illustration"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
 

      {/* Right: Form column */}
      <div className="flex items-center justify-center px-6 py-16 lg:px-20">
        <div className="w-full max-w-[560px]">
          <img src={logo} alt="Khayt logo" className=" mb-6" />
          <p className="mb-8 text-[14px]" style={{ fontFamily: "Poppins", color: "#6B6B6B" }}>
            enter your credentials to access your account now
          </p>

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">{error}</div>
          )}

          <form onSubmit={handleSignIn}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block mb-2 font-medium" style={{ color: "#000" }}>Atelier</label>
                <input 
                  placeholder="Atelier name" 
                  className="w-full rounded-lg bg-white border border-transparent focus:border-gray-200 px-4 py-3"
                  value={atelier}
                  onChange={(e) => setAtelier(e.target.value)}
                />
              </div>
              <div>
                <label className="block mb-2 font-medium" style={{ color: "#000" }}>Boutique</label>
                <input 
                  placeholder="Boutique name" 
                  className="w-full rounded-lg bg-white border border-transparent focus:border-gray-200 px-4 py-3"
                  value={boutique}
                  onChange={(e) => setBoutique(e.target.value)}
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block mb-2 font-medium" style={{ color: "#000" }}>Email</label>
              <input
                id="phone"
                type="email"
                placeholder="Your email"
                className="w-full rounded-lg bg-white border border-transparent focus:border-gray-200 px-4 py-3"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                aria-label="Email"
                required
              />
            </div>

            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <label className="font-medium" htmlFor="password" style={{ color: "#000" }}>Password</label>
                <button type="button" className="text-sm text-[#3F6E57]">Forgot password ?</button>
              </div>
              <div className="relative">
                <input
                  type="password"
                  id="password"
                  placeholder="Enter password"
                  className="w-full rounded-lg bg-white border border-transparent focus:border-gray-200 px-4 py-3 pr-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 5C7 5 3.333 8.333 2 12c1.333 3.667 5 7 10 7s8.667-3.333 10-7c-1.333-3.667-5-7-10-7z" stroke="#000" strokeOpacity="0.3" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </div>
            </div>

            <label className="mt-2 mb-6 inline-flex items-center gap-2 text-sm text-gray-500">
              <input id="remember" type="checkbox" className="rounded border-gray-300" />
              Remember me
            </label>
           <Link to="/orders">
            <button
              type="submit"
              disabled={loading}
              aria-busy={loading}
              className={`w-full bg-[#3F6E57] text-white rounded-lg hover:bg-[#31513f] transition-colors ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}
              style={{ height: "48px", padding: "6px 16px" }}
            >
              <span style={{ fontFamily: "Poppins", fontWeight: 500, fontSize: "15px" }}>{loading ? 'Signing in...' : 'Sign in'}</span>
            </button>
          </Link>
          </form>

        </div>
      </div>
    </div>
  );
}