import React from 'react'
import Sidebar from '../../component/Sidebar'

export default function OrderCreate() {
  return (
    <div className="min-h-screen bg-[#F6F6EE] font-poppins flex" style={{ fontFamily: 'Poppins' }}>
      <Sidebar />

      <main className="flex-1 p-8">
        <div className="mb-4">
          <div className="text-sm text-[#2f6b4d]">Orders &gt; Create an order</div>
          <div className="mt-3 bg-white p-4 rounded shadow-sm flex items-center justify-between">
            <div className="text-green-700 font-semibold">← assign</div>
            <div className="text-xl font-bold text-[#2f6b4d]">#1025</div>
          </div>
        </div>

        <section className="mb-6 bg-white p-6 rounded shadow-sm">
          <h3 className="text-lg font-semibold text-[#2f6b4d] mb-4">Assign a tailor</h3>
          <div className="bg-[#F8F8F6] p-3 rounded mb-4">
            <input placeholder="Search for a tailor" className="w-full bg-transparent outline-none" />
          </div>

          <div className="space-y-3">
            {[1,2,3].map(i => (
              <div key={i} className="flex items-center justify-between border rounded p-3">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gray-200" />
                  <div>
                    <div className="font-semibold">Bouhafs Rim</div>
                    <div className="text-xs text-gray-400">Couture</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-sm text-gray-600">140</div>
                  <button className="px-3 py-1 border rounded text-green-700">+</button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-6 bg-white p-6 rounded shadow-sm">
          <h3 className="text-lg font-semibold text-[#2f6b4d] mb-4">Product</h3>

          <div className="grid grid-cols-12 gap-4 items-start">
            <div className="col-span-3">
              <img src="/src/assets/6b6752ac8194e5ebad81c81e4fc1695cf9c39259.jpg" alt="product" className="w-full rounded" />
            </div>

            <div className="col-span-9">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="text-xs text-gray-500 mb-1">Product Type</div>
                  <input className="w-full p-3 bg-[#F8F8F6] rounded text-sm" defaultValue="FRCH-001" />
                </div>

                <div>
                  <div className="text-xs text-gray-500 mb-1">Price:</div>
                  <input className="w-full p-3 bg-[#F8F8F6] rounded text-sm" defaultValue="14,500 DZD" />
                </div>

                <div>
                  <div className="text-xs text-gray-500 mb-1">Fabric Type</div>
                  <input className="w-full p-3 bg-[#F8F8F6] rounded text-sm" defaultValue="satin, silk, crepe" />
                </div>

                <div>
                  <div className="text-xs text-gray-500 mb-1">Thread Type Used</div>
                  <input className="w-full p-3 bg-[#F8F8F6] rounded text-sm" defaultValue="1300" />
                </div>

                <div>
                  <div className="text-xs text-gray-500 mb-1">Fabric Color</div>
                  <input className="w-full p-3 bg-[#F8F8F6] rounded text-sm" defaultValue="Black, burgundy, emerald, white..." />
                </div>

                <div>
                  <div className="text-xs text-gray-500 mb-1">Creation Time:</div>
                  <input className="w-full p-3 bg-[#F8F8F6] rounded text-sm" defaultValue="2 months" />
                </div>
              </div>

              <div className="mt-6">
                <div className="flex items-start justify-between">
                  <div className="text-lg font-semibold text-[#2f6b4d]">Notes</div>
                  <div className="text-sm text-gray-400">15/500</div>
                </div>
                <textarea className="mt-3 w-full p-4 bg-[#F8F8F6] rounded h-36" placeholder="anything ...." />
              </div>
            </div>
          </div>
        </section>

        <section className="mb-6 bg-white p-6 rounded shadow-sm">
          <h3 className="text-lg font-semibold text-[#2f6b4d] mb-4">Order details</h3>

          <div className="grid grid-cols-3 gap-6">
            <div>
              <div className="text-xs text-gray-500 mb-1">Shoulder Length :</div>
              <input className="w-full p-3 bg-[#F8F8F6] rounded text-sm" defaultValue="FRCH-001" />
            </div>

            <div>
              <div className="text-xs text-gray-500 mb-1">Sleeve Length :</div>
              <input className="w-full p-3 bg-[#F8F8F6] rounded text-sm" defaultValue="14,500 DZD" />
            </div>

            <div>
              <div className="text-xs text-gray-500 mb-1">Tissu :</div>
              <input className="w-full p-3 bg-[#F8F8F6] rounded text-sm" defaultValue="satin, silk, crepe" />
            </div>

            <div>
              <div className="text-xs text-gray-500 mb-1">Color</div>
              <input className="w-full p-3 bg-[#F8F8F6] rounded text-sm" defaultValue="2 months" />
            </div>

            <div>
              <div className="text-xs text-gray-500 mb-1">Dress Length :</div>
              <input className="w-full p-3 bg-[#F8F8F6] rounded text-sm" defaultValue="1300" />
            </div>

            <div>
              <div className="text-xs text-gray-500 mb-1">Dress Width :</div>
              <input className="w-full p-3 bg-[#F8F8F6] rounded text-sm" defaultValue="1300" />
            </div>

            <div>
              <div className="text-xs text-gray-500 mb-1">Waist to Floor Length :</div>
              <input className="w-full p-3 bg-[#F8F8F6] rounded text-sm" defaultValue="Black, burgundy, emerald, white..." />
            </div>

            <div>
              <div className="text-xs text-gray-500 mb-1">Knee to Floor Length :</div>
              <input className="w-full p-3 bg-[#F8F8F6] rounded text-sm" defaultValue="2 months" />
            </div>

            <div>
              <div className="text-xs text-gray-500 mb-1">Slit Length :</div>
              <input className="w-full p-3 bg-[#F8F8F6] rounded text-sm" defaultValue="2 months" />
            </div>

            <div>
              <div className="text-xs text-gray-500 mb-1">Slit Width :</div>
              <input className="w-full p-3 bg-[#F8F8F6] rounded text-sm" defaultValue="2 months" />
            </div>

            <div>
              <div className="text-xs text-gray-500 mb-1">Shoulder to Waist Length :</div>
              <input className="w-full p-3 bg-[#F8F8F6] rounded text-sm" defaultValue="2 months" />
            </div>

            <div>
              <div className="text-xs text-gray-500 mb-1">Shoulder Width :</div>
              <input className="w-full p-3 bg-[#F8F8F6] rounded text-sm" defaultValue="2 months" />
            </div>

            <div>
              <div className="text-xs text-gray-500 mb-1">Bust Width (Underarm to Underarm):</div>
              <input className="w-full p-3 bg-[#F8F8F6] rounded text-sm" defaultValue="2 months" />
            </div>

            <div>
              <div className="text-xs text-gray-500 mb-1">Mesure hauteur :</div>
              <input className="w-full p-3 bg-[#F8F8F6] rounded text-sm" defaultValue="2 months" />
            </div>
          </div>

          <div className="mt-6">
            <div className="text-xs text-gray-500 mb-1">Notes :</div>
            <textarea className="w-full p-3 bg-[#F8F8F6] rounded h-28" defaultValue="2 months" />
          </div>

          <div className="mt-4">
            <div className="flex items-start justify-between">
              <button className="px-4 py-2 bg-[#A8D3B0] text-[#23583b] rounded">Generate the guarantee</button>
              <div className="text-sm text-gray-400">15/500</div>
            </div>
          </div>
        </section>

        <section className="mb-6 bg-white p-6 rounded shadow-sm">
          <h3 className="text-lg font-semibold text-[#2f6b4d] mb-4">Client</h3>

          <div className="grid grid-cols-3 gap-6">
            <div>
              <div className="text-xs text-gray-500 mb-1">Full Name</div>
              <input className="w-full p-3 bg-[#F8F8F6] rounded text-sm" defaultValue="Ahmed Benali" />
            </div>

            <div>
              <div className="text-xs text-gray-500 mb-1">Role</div>
              <input className="w-full p-3 bg-[#F8F8F6] rounded text-sm" defaultValue="Couture + surger" />
            </div>

            <div>
              <div className="text-xs text-gray-500 mb-1">Role</div>
              <select className="w-full p-3 bg-[#F8F8F6] rounded text-sm">
                <option>Couture</option>
              </select>
            </div>

            <div>
              <div className="text-xs text-gray-500 mb-1">Birth date</div>
              <input className="w-full p-3 bg-[#F8F8F6] rounded text-sm" defaultValue="21-03-1990" />
            </div>

            <div>
              <div className="text-xs text-gray-500 mb-1">Phone</div>
              <input className="w-full p-3 bg-[#F8F8F6] rounded text-sm" defaultValue="+213 6 23 45 67 89" />
            </div>

            <div>
              <div className="text-xs text-gray-500 mb-1">Address</div>
              <input className="w-full p-3 bg-[#F8F8F6] rounded text-sm" defaultValue="Sidi Bel Abbès, Algeria" />
            </div>

            <div>
              <div className="text-xs text-gray-500 mb-1">Start Date</div>
              <input className="w-full p-3 bg-[#F8F8F6] rounded text-sm" defaultValue="12 Feb 2023" />
            </div>

            <div>
              <div className="text-xs text-gray-500 mb-1">3rboun</div>
              <input className="w-full p-3 bg-[#F8F8F6] rounded text-sm" defaultValue="5000 da" />
            </div>

            <div />
          </div>

          <div className="mt-6">
            <div className="flex items-start justify-between">
              <div className="text-sm font-semibold">Notes :</div>
              <div className="text-sm text-gray-400">15/500</div>
            </div>
            <textarea className="mt-3 w-full p-4 bg-[#F8F8F6] rounded h-36" placeholder="anything ...." />
          </div>

          <div className="mt-6 flex justify-end gap-4">
            <button className="px-4 py-2 border rounded text-red-600">Cancel</button>
            <button className="px-4 py-2 bg-[#3F6E57] text-white rounded">Create product</button>
          </div>
        </section>
      </main>
    </div>
  )
}
