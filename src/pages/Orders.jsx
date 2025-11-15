import React from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../component/Sidebar'
import { exportOrdersAsPDF } from '../utils/pdfExport'

export default function Orders() {
  const navigate = useNavigate();

  const handleExportPDF = () => {
    exportOrdersAsPDF('orders-export.pdf');
  };

  return (
    <div className="min-h-screen bg-[#F6F6EE] font-poppins flex"
      style={{
        fontFamily : "Poppins"
    }}
    >
      <Sidebar />

      {/* Main content */}
      <main className="flex-1 p-8 ">
        <header className="flex items-center flex gap-90  mb-6">
          <h1 className="text-2xl font-semibold text-[#1F6A4A]">Orders</h1>
          <div className="flex items-center justify-between gap-160 ">
            <div className="bg-white px-3 py-2 rounded shadow-sm flex items-center gap-2  align-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M21 21l-4.35-4.35" stroke="#6B6B6B" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              <input placeholder="Search" className="outline-none text-sm" />
            </div>
            <div className="text-sm text-gray-600">Youcef Bouhafs<br/><span className="text-xs text-gray-400">Admin</span></div>
          </div>
        </header>

        <div className="mb-6">
          <div className="bg-white p-6 rounded shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-3xl font-extrabold text-[#2f6b4d]">Total Orders : <span className="text-[#3F6E57]">12</span></h2>

              <div className="flex items-center gap-3">
                {/* filter icon button */}
                <button aria-label="filter" className="p-3 rounded bg-[#3F6E57] text-white flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M10 18h4" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/><path d="M3 6h18" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/><path d="M7 12h10" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>

                <button className="px-4 py-2 border border-[#3F6E57] rounded text-[#3F6E57] flex items-center gap-2" onClick={handleExportPDF}>
                  <span>Export as pdf</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 3v12" stroke="#3F6E57" strokeWidth="1.4" strokeLinecap="round"/><path d="M8 11l4 4 4-4" stroke="#3F6E57" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>

                <button onClick={() => navigate('/orders/new')} className="px-4 py-2 border border-[#3F6E57] rounded text-[#3F6E57]">Create a new order +</button>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3 flex-wrap">
                <div className="flex items-center bg-white border rounded-md px-4 py-3 shadow-sm">
                  <div className="text-sm font-semibold text-[#2f6b4d] mr-4">Start date :</div>
                  <div className="text-sm text-gray-500">21 - 03 - 2025</div>
                  <svg className="ml-3 text-gray-400" width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M7 11V7" stroke="#6B6B6B" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/><path d="M17 11V7" stroke="#6B6B6B" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/><rect x="3" y="5" width="18" height="16" rx="2" stroke="#6B6B6B" strokeWidth="1.2"/></svg>
                  <button className="ml-3 text-gray-400">✕</button>
                </div>

                <div className="flex items-center bg-white border rounded-md px-4 py-3 shadow-sm">
                  <div className="text-sm font-semibold text-[#2f6b4d] mr-4">End date :</div>
                  <div className="text-sm text-gray-500">26 - 04 - 2025</div>
                  <svg className="ml-3 text-gray-400" width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M7 11V7" stroke="#6B6B6B" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/><path d="M17 11V7" stroke="#6B6B6B" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/><rect x="3" y="5" width="18" height="16" rx="2" stroke="#6B6B6B" strokeWidth="1.2"/></svg>
                  <button className="ml-3 text-gray-400">✕</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sample order cards (updated layout to match design) */}
        {[1,2].map((i) => (
          <section key={i} className="mb-6 bg-white rounded shadow-sm p-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-sm font-semibold text-[#2f6b4d]">
                <span>Order {i} #10928</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-[#2f6b4d]">
                  <path d="M6 9l6 6 6-6" stroke="#2f6b4d" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <div>21/03/2025</div>
                <button className="p-1 rounded border text-[#6B6B6B]"></button>
              </div>
            </div>

            {/* Product table-like row */}
            <div className="mb-3">
              <div className="grid grid-cols-12 gap-4 items-center text-xs text-gray-500 font-medium pb-3">
                <div className="col-span-3">Image</div>
                <div className="col-span-5">name - couleur</div>
                <div className="col-span-2 text-center">id</div>
                <div className="col-span-2 text-right">price</div>
              </div>

              <div className="grid grid-cols-12 gap-4 items-center">
                <div className="col-span-3 flex items-start gap-4">
                  <img src="/src/assets/6b6752ac8194e5ebad81c81e4fc1695cf9c39259.jpg" alt="product" className="w-20 h-20 object-cover rounded" />
                  <div>
                    <div className="text-sm font-semibold">Karakou - bleu</div>
                    <div className="text-xs text-gray-500">traditionel</div>
                    <div className="text-xs text-gray-400 mt-1">Couture , SURGER , fetla , perlage</div>
                  </div>
                </div>

                <div className="col-span-5"></div>

                <div className="col-span-2 text-center text-sm text-gray-700">FRCH-001</div>
                <div className="col-span-2 text-right text-sm font-semibold">2000 DA</div>

                {/* action button aligned to right of this row */}
                <div className="col-span-12 flex justify-end mt-2">
                  <button className="w-8 h-8 rounded bg-white border text-[#3F6E57]">→</button>
                </div>
              </div>
            </div>

            <hr className="border-t border-dashed border-[#E8E8E4] my-4" />

            {/* Price / dates row */}
            <div className="grid grid-cols-12 gap-4 items-center">
              <div className="col-span-4">
                <div className="text-xs text-gray-500">Price</div>
                <input className="mt-2 w-full p-2 rounded bg-[#F8F8F6] text-sm" defaultValue="1 000 000 DA" />
              </div>

              <div className="col-span-4">
                <div className="text-xs text-gray-500">Date started</div>
                <input className="mt-2 w-full p-2 rounded bg-[#F8F8F6] text-sm" defaultValue="21 - 03 - 2025" />
              </div>

              <div className="col-span-4">
                <div className="text-xs text-gray-500">Date ended</div>
                <input className="mt-2 w-full p-2 rounded bg-[#F8F8F6] text-sm" placeholder="-- -- ----" />
              </div>

              <div className="col-span-12 flex justify-end mt-4">
                <button className="px-4 py-2 bg-[#EAF4ED] text-[#3F6E57] rounded text-sm">view more →</button>
              </div>
            </div>
          </section>
        ))}

        <div className="mt-6 flex items-center justify-between text-sm text-gray-500">
          <div>‹ Previous</div>
          <div className="flex items-center gap-2">
            {[1,2,3,4,5].map(n => (
              <div key={n} className={`px-3 py-1 rounded ${n===1? 'bg-[#3F6E57] text-white' : 'bg-white'}`}>{n}</div>
            ))}
            <div>Next ›</div>
          </div>
        </div>

      </main>
    </div>
  )
}
