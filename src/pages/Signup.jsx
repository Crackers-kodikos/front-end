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
    // Accept either a phone (digits, optional +, 6-15) OR a simple email address
    const phoneOk = /^\+?\d{6,15}$/.test(trimmed);
    const emailOk = /^\S+@\S+\.\S+$/.test(trimmed);
    return phoneOk || emailOk;
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
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-[#F6F6EE]">
      {/* Left: Illustration card */}
      <div className="flex items-center justify-center px-6 py-10 lg:px-12 bg-transparent">
        <div className="w-full max-w-[640px]">
          <div
            className="w-full h-[760px] rounded-xl overflow-hidden shadow-lg"
            style={{ backgroundColor: "#3F6E57" }}
          >
            <img
              src="/src/assets/6b6752ac8194e5ebad81c81e4fc1695cf9c39259.jpg"
              alt="illustration"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Right: Form column */}
      <div className="flex items-center justify-center px-6 py-16 lg:px-20">
        <div className="w-full max-w-[560px]">
          <div className="mb-6 flex items-center gap-3">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L15 8L22 9L17 14L18.5 21L12 18L5.5 21L7 14L2 9L9 8L12 2Z" stroke="#3F6E57" strokeWidth="0.8" fill="none" />
            </svg>
            <span style={{ fontFamily: "Poppins", fontSize: 28, color: "#3F6E57" }}>Khayt</span>
          </div>

          <h1 className="mb-1 text-[28px] font-medium" style={{ fontFamily: "Poppins", color: "#0A0A0A" }}>
            Create account for <span style={{ color: "#3F6E57" }}>Khayt</span>
          </h1>
          <p className="mb-8 text-[14px]" style={{ fontFamily: "Poppins", color: "#6B6B6B" }}>
            enter your credentials to access your account now
          </p>

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">{error}</div>
          )}

          <form onSubmit={handleSignUp}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block mb-2 font-medium" style={{ color: "#000" }}>Atelier</label>
                <input placeholder="Boutique name" className="w-full rounded-lg bg-white border border-transparent focus:border-gray-200 px-4 py-3" />
              </div>
              <div>
                <label className="block mb-2 font-medium" style={{ color: "#000" }}>Boutique</label>
                <input placeholder="Atelier name" className="w-full rounded-lg bg-white border border-transparent focus:border-gray-200 px-4 py-3" />
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
              <label className="font-medium block mb-2" htmlFor="password" style={{ color: "#000" }}>Password</label>
              <input
                type="password"
                id="password"
                placeholder="Enter password"
                className="w-full rounded-lg bg-white border border-transparent focus:border-gray-200 px-4 py-3"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label className="font-medium block mb-2" htmlFor="confirmPassword" style={{ color: "#000" }}>Confirm Password</label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="Confirm password"
                className="w-full rounded-lg bg-white border border-transparent focus:border-gray-200 px-4 py-3"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <label className="mt-2 mb-6 inline-flex items-center gap-2 text-sm text-gray-500">
              <input id="remember" type="checkbox" className="rounded border-gray-300" />
              Remember me
            </label>

            <button
              type="submit"
              disabled={loading}
              aria-busy={loading}
              className={`w-full bg-[#3F6E57] text-white rounded-lg hover:bg-[#31513f] transition-colors ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}
              style={{ height: "48px", padding: "6px 16px" }}
            >
              <span style={{ fontFamily: "Poppins", fontWeight: 500, fontSize: "15px" }}>{loading ? 'Creating...' : 'Create account'}</span>
            </button>
          </form>

          <div className="mt-4 text-sm" style={{ fontFamily: "Poppins", color: "#000" }}>
            Already have an account? <button className="text-[#3F6E57] underline" onClick={() => navigate('/login')}>Log in</button>
          </div>
        </div>
      </div>
    </div>
  );
}