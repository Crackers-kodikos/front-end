import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import logo from '../assets/logo.svg'

export default function Sidebar({ className = '' }) {
  // USER ROLES CONFIGURATION:
  // 1. OWNER: Shows all routes - "Products", "Orders", "Tailors", "validator", "magasins", "Notifications"
  // 2. TAILOR: Shows "Products", "Orders", "Tailors", "validator", "magasins", "Notifications"
  // 3. BOUTIQUE: Shows "Products", "Orders", "Tailors", "validator", "magasins", "Notifications" 
  // 4. ADMIN: Shows all navigation options including "My Boutiques"
  
  // For now, displaying as OWNER role (full navigation access)
  const userRole = 'owner'; // TODO: Get from user context/auth
  
  return (
    <aside className={`w-64 p-6 bg-white/60 border-r border-[#F0F0EA] min-h-screen ${className}`}
    style={{
        fontFamily : "Poppins"
    }}
    
    >
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src={logo} alt="logo" />
         
        </div>
      </div>

      <nav className="text-sm text-[#6B6B6B] space-y-4">
        {/* About - Available for all roles */}
        <NavLink 
          to="/about" 
          className={({ isActive }) => 
            `block py-2 px-3 rounded ${
              isActive ? 'bg-[#F6F6EE] text-[#2f6b4d] font-medium' : 'hover:bg-gray-50'
            }`
          }
        >
          About
        </NavLink>

        {/* Products - Available for all roles */}
        <NavLink 
          to="/products" 
          className={({ isActive }) => 
            `block py-2 px-3 rounded ${
              isActive ? 'bg-[#F6F6EE] text-[#2f6b4d] font-medium' : 'hover:bg-gray-50'
            }`
          }
        >
          Products
        </NavLink>

        {/* Orders - For OWNER, TAILOR, BOUTIQUE, ADMIN roles */}
        {(userRole === 'owner' || userRole === 'tailor' || userRole === 'boutique' || userRole === 'admin') && (
          <NavLink 
            to="/orders" 
            className={({ isActive }) => 
              `block py-2 px-3 rounded ${
                isActive ? 'bg-[#F6F6EE] text-[#2f6b4d] font-medium' : 'hover:bg-gray-50'
              }`
            }
          >
            Orders
          </NavLink>
        )}

        {/* Tailors - For OWNER, TAILOR, BOUTIQUE, ADMIN roles */}
        {(userRole === 'owner' || userRole === 'tailor' || userRole === 'boutique' || userRole === 'admin') && (
          <NavLink 
            to="/tailors" 
            className={({ isActive }) => 
              `block py-2 px-3 rounded ${
                isActive ? 'bg-[#F6F6EE] text-[#2f6b4d] font-medium' : 'hover:bg-gray-50'
              }`
            }
          >
            Tailors
          </NavLink>
        )}

        {/* Validator - For OWNER, TAILOR, BOUTIQUE, ADMIN roles */}
        <Link to="/tailors">
        {(userRole === 'owner' || userRole === 'tailor' || userRole === 'boutique' || userRole === 'admin') && (
          <div className="py-2 px-3 rounded hover:bg-gray-50">validator</div>
        )}
        </Link>

        {/* Magasins - For OWNER, TAILOR, BOUTIQUE, ADMIN roles */}
        <Link to="/boutiques">
        {(userRole === 'owner' || userRole === 'tailor' || userRole === 'boutique' || userRole === 'admin') && (
          <div className="py-2 px-3 rounded hover:bg-gray-50">magasins</div>
        )}
        </Link>

        {/* My Boutiques - Only for ADMIN role */}
        {userRole === 'admin' && (
          <NavLink 
            to="/boutiques" 
            className={({ isActive }) => 
              `block py-2 px-3 rounded ${
                isActive ? 'bg-[#F6F6EE] text-[#2f6b4d] font-medium' : 'hover:bg-gray-50'
              }`
            }
          >
            My Boutiques
          </NavLink>
        )}

        {/* Notifications - For OWNER, TAILOR, BOUTIQUE, ADMIN roles */}
        {(userRole === 'owner' || userRole === 'tailor' || userRole === 'boutique' || userRole === 'admin') && (
          <NavLink 
            to="/notifications" 
            className={({ isActive }) => 
              `block py-2 px-3 rounded ${
                isActive ? 'bg-[#F6F6EE] text-[#2f6b4d] font-medium' : 'hover:bg-gray-50'
              }`
            }
          >
            Notifications
          </NavLink>
        )}
      </nav>

      <div className="mt-60 space-y-2">
        <NavLink 
          to="/profile" 
          className={({ isActive }) => 
            `block py-2 px-3 rounded text-xs ${
              isActive ? 'bg-[#F6F6EE] text-[#2f6b4d] font-medium' : 'text-[#9B9B9B] hover:bg-gray-50 hover:text-gray-700'
            }`
          }
        >
          Profile
        </NavLink>
        <div className="py-2 px-3 text-xs text-[#9B9B9B] hover:bg-gray-50 hover:text-gray-700 rounded cursor-pointer">Aide</div>
        <Link to="/">
        <div className="py-2 px-3 text-xs text-[#9B9B9B] hover:bg-gray-50 hover:text-gray-700 rounded cursor-pointer">Log out</div>
        </Link>
      </div>
    </aside>
  )
}