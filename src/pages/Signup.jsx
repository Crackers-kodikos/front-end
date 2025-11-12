import { useState } from "react";
import { useNavigate } from "react-router-dom";
import signup from "../api/signup";
import { setTokensFromResponse } from "../api/auth";

// This page implements a simple local (no-backend) sign-up flow for demo purposes.
// New users are stored in localStorage under the `users` key as an object keyed by phone.

export default function Signup() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Simple helper to read/write users in localStorage
  const readUsers = () => {
    try {
      const raw = localStorage.getItem("users");
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  };

  const writeUsers = (users) => {
    localStorage.setItem("users", JSON.stringify(users));
  };

  const validatePhone = (p) => {
    const trimmed = p.trim();
    // very permissive phone check (digits, optional +), length between 6 and 15
    return /^\+?\d{6,15}$/.test(trimmed);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");

    const trimmedPhone = phone.trim();

    if (!validatePhone(trimmedPhone)) {
      setError("Please enter a valid phone number (6-15 digits). Example: 0783060128");
      return;
    }

    if (password.length < 3) {
      setError("Password must be at least 3 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const users = readUsers();
    if (users[trimmedPhone]) {
      setError("An account with this phone already exists. Please log in.");
      return;
    }

    setLoading(true);
    try {
      // Attempt to create the user on the API
      const payload = { phone: trimmedPhone, password };
      const res = await signup(payload);

      if (res.ok) {
        // Persist tokens from server response (if any)
        try { setTokensFromResponse(res.data); } catch (e) { console.warn('setTokens failed', e); }
        // API signup succeeded
        navigate("/dashboard");
        return;
      }

      // If we get here, API responded with an error or message.
      // If it was a network/unknown error (no status), fall back to local storage for demo.
      if (!res.status) {
        // Fallback: Save user locally (for demo only)
        users[trimmedPhone] = { password, createdAt: Date.now() };
        writeUsers(users);
        navigate("/dashboard");
        return;
      }

      // Show server-provided message if available
      setError(res.message || "Signup failed. Please try again.");
    } catch (err) {
      // Log unexpected error and fallback to local storage for demo
      console.error(err);
      const usersFallback = readUsers();
      usersFallback[trimmedPhone] = { password, createdAt: Date.now() };
      writeUsers(usersFallback);
      navigate("/dashboard");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-white">
      {/* Left: Illustration on large screens (order-first on lg) */}
      <div className="hidden lg:flex items-center justify-center relative order-last lg:order-first">
        <div className="max-w-[520px] mx-auto p-6">
          <h2
            className="text-white text-3xl font-semibold mb-6"
            style={{ fontFamily: "Poppins" }}
          >
            Manage your restaurant operations easily – anywhere, anytime
          </h2>
        </div>
        {/* Orange login main image */}
        <img
          src="/src/assets/images/orange-login.png"
          alt="Login illustration"
          className="absolute w-[460px] rounded-xl shadow-2xl"
          style={{ top: "20px" }}
        />
        {/* Dashboard preview */}
        <img
          src="/src/assets/images/dashboard.png"
          alt="Dashboard"
          className="absolute w-[260px] rounded-xl shadow-xl"
          style={{ right: "120px", bottom: "180px" }}
        />
        {/* Homepage preview (using provided homepage.png) */}
        <img
          src="/src/assets/images/homepage.png"
          alt="Homepage"
          className="absolute w-60 rounded-xl shadow-xl"
          style={{ left: "120px", bottom: "120px" }}
        />
      </div>

      {/* Right: Form (order-first on small, order-last on lg) */}
      <div className="flex items-center justify-center px-6 py-10 lg:px-12 order-first lg:order-last">
        <div className="w-full max-w-[520px]">
          {/* Logo */}
          {/* <div className="mb-6 flex items-center gap-2">
            <LogoDzDelice />
            <span className="text-[24px] font-extrabold leading-none">
              <span className="text-black">Dz</span>
              <span className="text-[#F67F20]">Délice</span>
            </span>
          </div> */}

          <h1
            className="mb-1 text-[24px] font-medium"
            style={{
              fontFamily: "Poppins",
              lineHeight: "42px",
              letterSpacing: "-0.7px",
            }}
          >
            Create an account for <span className="text-[#F67F20]">DzDélice</span>
            Staff Portal
          </h1>
          <p
            className="mb-6 text-[14px]"
            style={{
              fontFamily: "Poppins",
              fontWeight: 400,
              lineHeight: "100%",
              letterSpacing: "-0.7px",
              color: "#00000059",
            }}
          >
            Sign up with your phone number to create a staff account
          </p>

          {/* Error message */}
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
              {error}
            </div>
          )}

          {/* Social buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            <button
              className="flex items-center justify-center gap-[15px] rounded-md hover:bg-gray-50"
              style={{
                width: "213px",
                height: "34px",
                borderWidth: "1px",
                padding: "9px 20px",
                borderColor: "#0000001A",
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.99976 6.54541V9.6436H12.3052C12.1161 10.64 11.5488 11.4836 10.6979 12.0509L13.2943 14.0655C14.807 12.6691 15.6797 10.6182 15.6797 8.18185C15.6797 7.61459 15.6288 7.06908 15.5342 6.5455L7.99976 6.54541Z"
                  fill="#4285F4"
                />
                <path
                  d="M3.51649 9.52262L2.93092 9.97087L0.858154 11.5854C2.17451 14.1963 4.8725 15.9999 7.99974 15.9999C10.1597 15.9999 11.9706 15.2872 13.2942 14.0654L10.6979 12.0509C9.98516 12.5309 9.07606 12.8218 7.99974 12.8218C5.91976 12.8218 4.15254 11.4182 3.51976 9.52724L3.51649 9.52262Z"
                  fill="#34A853"
                />
                <path
                  d="M0.858119 4.41455C0.312695 5.49087 0 6.70543 0 7.99995C0 9.29448 0.312695 10.509 0.858119 11.5854C0.858119 11.5926 3.51998 9.51991 3.51998 9.51991C3.35998 9.03991 3.26541 8.53085 3.26541 7.99987C3.26541 7.46889 3.35998 6.95983 3.51998 6.47984L0.858119 4.41455Z"
                  fill="#FBBC05"
                />
                <path
                  d="M7.99991 3.18545C9.17811 3.18545 10.2254 3.59271 11.0617 4.37818L13.3526 2.0873C11.9635 0.792777 10.1599 0 7.99991 0C4.87266 0 2.17451 1.79636 0.858154 4.41455L3.51994 6.48001C4.15263 4.58908 5.91992 3.18545 7.99991 3.18545Z"
                  fill="#EA4335"
                />
              </svg>
              <span
  style={{
    fontFamily: "Poppins",
    fontWeight: 400,
    fontSize: "14px",
    lineHeight: "100%",
    letterSpacing: "-0.7px",
    color: "#000000",
  }}
>
  Sign up with Google
</span>
            </button>
            <button
              className="flex items-center justify-center gap-[15px] rounded-md hover:bg-gray-50"
              style={{
                width: "213px",
                height: "34px",
                borderWidth: "1px",
                padding: "9px 20px",
                borderColor: "#0000001A",
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_65_574)">
                  <path
                    d="M16 8C16 3.58176 12.4182 0 8 0C3.58176 0 0 3.58176 0 8C0 11.7517 2.58304 14.8998 6.06752 15.7645V10.4448H4.41792V8H6.06752V6.94656C6.06752 4.22368 7.29984 2.9616 9.97312 2.9616C10.48 2.9616 11.3546 3.06112 11.7123 3.16032V5.37632C11.5235 5.35648 11.1955 5.34656 10.7882 5.34656C9.47648 5.34656 8.9696 5.84352 8.9696 7.13536V8H11.5827L11.1338 10.4448H8.9696V15.9414C12.9309 15.463 16.0003 12.0902 16.0003 8H16Z"
                    fill="#0866FF"
                  />
                  <path
                    d="M11.1333 10.4448L11.5823 8H8.96916V7.13536C8.96916 5.84352 9.47604 5.34656 10.7877 5.34656C11.1951 5.34656 11.5231 5.35648 11.7119 5.37632V3.16032C11.3541 3.0608 10.4796 2.9616 9.97268 2.9616C7.2994 2.9616 6.06708 4.22368 6.06708 6.94656V8H4.41748V10.4448H6.06708V15.7645C6.68596 15.9181 7.33332 16 7.99956 16C8.32756 16 8.65108 15.9798 8.96884 15.9414V10.4448H11.133H11.1333Z"
                    fill="white"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_65_574">
                    <rect width="16" height="16" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              <span
                style={{
                  fontFamily: "Poppins",
                  fontWeight: 400,
                  fontSize: "14px",
                  lineHeight: "100%",
                  letterSpacing: "-0.7px",
                  color: "#000000",
                }}
              >
                Sign up with Facebook
              </span>
            </button>
          </div>

          <div className="flex items-center gap-3 my-4">
            <div className="h-px flex-1 bg-gray-200" />
            <span className="text-xs text-gray-400">or</span>
            <div className="h-px flex-1 bg-gray-200" />
          </div>

          <form onSubmit={handleSignUp}>
            {/* Phone number */}
            <div className="mb-4">
              <label
                htmlFor="phone"
                className="block mb-1"
                style={{
                  opacity: 0.8,
                  fontFamily: "Poppins",
                  fontWeight: 400,
                  fontSize: "14px",
                  lineHeight: "100%",
                  letterSpacing: "0px",
                }}
              >
                Phone
              </label>
              <input
                id="phone"
                type="tel"
                placeholder="Your Phone Number"
                className="w-full rounded-lg bg-[#F9F9F9] outline-none focus:ring-0"
                style={{
                  height: "44.47px",
                  padding: "11px 19px",
                  fontFamily: "Poppins",
                  fontSize: "14px",
                  lineHeight: "100%",
                  letterSpacing: "0px",
                  color: "#000000",
                }}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                aria-label="Phone number"
                required
              />
            </div>

            {/* Password */}
            <div className="mb-2">
              <div className="flex items-center justify-between mb-3">
                <label
                  htmlFor="password"
                  style={{
                    opacity: 0.8,
                    fontFamily: "Poppins",
                    fontWeight: 400,
                    fontSize: "14px",
                    lineHeight: "100%",
                    letterSpacing: "0px",
                  }}
                >
                  Password
                </label>
                <button
                  type="button"
                  style={{
                    opacity: 0.8,
                    fontFamily: "Poppins",
                    fontWeight: 400,
                    fontSize: "14px",
                    lineHeight: "100%",
                    letterSpacing: "0px",
                    color: "#F67F20",
                  }}
                >
                  Forgot password ?
                </button>
              </div>
              <div className="relative">
                <input
                  type="password"
                  id="password"
                  placeholder="Enter password"
                  className="w-full rounded-lg bg-[#F9F9F9] outline-none focus:ring-0 pr-9"
                  style={{
                    height: "44.47px",
                    padding: "11px 19px",
                    fontFamily: "Poppins",
                    fontSize: "14px",
                    lineHeight: "100%",
                    letterSpacing: "0px",
                  }}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.95245 3.21027C8.29113 3.16019 8.64051 3.13333 9.00035 3.13333C13.2545 3.13333 16.0461 6.88737 16.9839 8.37235C17.0974 8.55208 17.1542 8.64195 17.1859 8.78056C17.2098 8.88466 17.2098 9.04889 17.1859 9.15298C17.1541 9.29158 17.097 9.38205 16.9827 9.56297C16.7328 9.95846 16.3518 10.5143 15.8471 11.117M4.6036 4.56253C2.80187 5.78475 1.57871 7.48281 1.01759 8.37107C0.903571 8.55156 0.846562 8.64180 0.814783 8.78040C0.790914 8.88450 0.790905 9.04870 0.814761 9.15280C0.846525 9.29140 0.903276 9.38126 1.01678 9.56098C1.95462 11.046 4.74618 14.8 9.00035 14.8C10.7157 14.8 12.1932 14.1897 13.4074 13.3638M1.50035 1.46667L16.5003 16.4667M7.23258 7.19890C6.78017 7.65131 6.50035 8.27631 6.50035 8.96667C6.50035 10.3474 7.61964 11.4667 9.00035 11.4667C9.69070 11.4667 10.3157 11.1868 10.7681 10.7344"
                      stroke="black"
                      strokeOpacity="0.26"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </div>
            </div>

            {/* Confirm password */}
            <div className="mb-4">
              <label
                htmlFor="confirmPassword"
                className="block mb-1"
                style={{ opacity: 0.8, fontFamily: "Poppins", fontWeight: 400, fontSize: "14px" }}
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="Confirm password"
                className="w-full rounded-lg bg-[#F9F9F9] outline-none focus:ring-0"
                style={{ height: "44.47px", padding: "11px 19px", fontFamily: "Poppins", fontSize: "14px" }}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            {/* Remember me */}
              <label
                className="mt-2 mb-6 inline-flex items-center gap-2"
                style={{
                  fontFamily: "Poppins",
                  fontWeight: 400,
                  fontSize: "14px",
                  lineHeight: "100%",
                  letterSpacing: "-0.7px",
                  color: "#BBBBBB",
                }}
              >
                <input id="remember" type="checkbox" className="rounded border-gray-300" />
                Remember me
              </label>

            {/* Sign up */}
            <button
              type="submit"
              disabled={loading}
              aria-busy={loading}
              className={`w-full bg-[#F67F20] text-white rounded-lg hover:bg-[#E55A2B] transition-colors ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}
              style={{ height: "45px", padding: "6px 16px" }}
            >
              <span
                style={{
                  fontFamily: "Poppins",
                  fontWeight: 500,
                  fontSize: "15px",
                  lineHeight: "100%",
                  letterSpacing: "0px",
                }}
              >
                {loading ? 'Creating...' : 'Create account'}
              </span>
            </button>
          </form>

          <div
            className="mt-4 text-sm"
            style={{
              fontFamily: "Poppins",
              fontWeight: 400,
              fontSize: "14px",
              lineHeight: "100%",
              letterSpacing: "-0.7px",
              color: "#000000",
            }}
          >
            Already have an account?{" "}
            <button className="text-[#F67F20] underline" onClick={() => navigate('/login')}>Log in</button>
          </div>
        </div>
      </div>

      {/* (Illustration moved above) */}
    </div>
  );
}