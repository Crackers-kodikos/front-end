import React from 'react'
import Sidebar from '../../component/Sidebar'

export default function Notifications() {
  const items = new Array(12).fill(0)

  return (
    <div className="min-h-screen bg-[#F6F6EE] font-poppins flex" style={{ fontFamily: 'Poppins' }}>
      <Sidebar />

      <main className="flex-1 p-8">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold text-[#1F6A4A]">Notifications</h1>

          <div className="flex items-center gap-3">
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
              <h2 className="text-3xl font-extrabold text-[#2f6b4d]">notifications</h2>

              <div className="flex items-center gap-3">
                <button className="px-4 py-2 border border-[#3F6E57] rounded text-[#3F6E57]">Create an order +</button>
                <button className="px-4 py-2 bg-[#3F6E57] text-white rounded">Add new product +</button>
              </div>
            </div>

            <div className="grid grid-cols-12 gap-4 items-center text-xs text-gray-500 font-medium pb-3">
              <div className="col-span-3">Image</div>
              <div className="col-span-5">name - couleur</div>
              <div className="col-span-2 text-center">id</div>
              <div className="col-span-2 text-right">price</div>
            </div>

            <div className="bg-white rounded">
              {items.map((_, i) => (
                <div key={i} className="flex items-center justify-between px-3 py-4 border-b border-[#F0F0EC]">
                  <div className="flex items-center gap-4 w-9/12">
                    <div className="w-10 h-10 bg-[#F0F0EC] rounded flex items-center justify-center text-sm font-semibold text-[#3F6E57]">IMG</div>
                    <div>
                      <div className="text-sm font-bold text-[#111111]">new order</div>
                      <div className="text-xs text-gray-400">assign a tailor for it</div>
                    </div>
                  </div>

                  <div className="w-3/12 flex items-center justify-end gap-4">
                    <div className="text-sm text-gray-600">FRCH-00{i+1}</div>
                    <div className="text-sm font-semibold">2000 DA</div>
                    <button className="w-8 h-8 rounded bg-white border text-[#3F6E57]">→</button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-center justify-between text-sm text-gray-500">
              <div>‹ Previous</div>
              <div className="flex items-center gap-2">
                {[1,2,3,4].map(n => (
                  <div key={n} className={`px-3 py-1 rounded ${n===1? 'bg-[#3F6E57] text-white' : 'bg-white'}`}>{n}</div>
                ))}
                <div>Next ›</div>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  )
}
