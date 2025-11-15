import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Sidebar from '../component/Sidebar.jsx'
import logo from '../assets/logo.svg'
import mockTailors from '../api/mockTailors'
import ConfirmModal from '../component/ConfirmModal'

const SAMPLE_ORDERS = [
  {
    id: 12675,
    product: 'FRCH-001',
    title: 'Karakuo - bleu',
    date: '21-03-2025',
    status: 'Done'
  },
  {
    id: 12676,
    product: 'FRCH-002',
    title: 'Karakuo - rouge',
    date: '21-03-2025',
    status: 'In progress'
  }
]

export default function TailorDetail(){
  const { id } = useParams()
  const navigate = useNavigate()
  const [tailor, setTailor] = useState(null)
  const [confirmOpen, setConfirmOpen] = useState(false)

  useEffect(() => {
    let mounted = true
    mockTailors.getTailor(id).then(t => { if (mounted) setTailor(t) })
    return () => { mounted = false }
  }, [id])

  return (
    <div className="flex min-h-screen bg-[#F6F6EE]" style={{ fontFamily: 'Poppins' }}>
      <Sidebar />

      <div className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6">
            <button className="text-[#2f6b4d] mb-4" onClick={() => navigate(-1)}>← Back</button>
            <h1 className="text-2xl font-semibold text-[#1F6A4A]">Ahmed Benali #{id}</h1>
          </div>

          <div className="bg-white rounded shadow-sm border border-[#F0F0EA] p-6 mb-6">
            <div className="flex gap-8">
              <div className="w-40">
                <img src={tailor?.image || logo} alt="avatar" className="w-32 h-32 rounded-full object-cover" />
              </div>

              <div className="flex-1 grid grid-cols-3 gap-4 items-start">
                <div>
                  <div className="text-xs text-[#9B9B9B] mb-1">Full Name</div>
                  <div className="bg-[#FBFBF8] p-2 rounded">{tailor?.name || '---'}</div>
                </div>

                <div>
                  <div className="text-xs text-[#9B9B9B] mb-1">Role</div>
                  <div className="bg-[#FBFBF8] p-2 rounded">{tailor?.role || '---'}</div>
                </div>

                <div>
                  <div className="text-xs text-[#9B9B9B] mb-1">Role</div>
                  <div className="bg-[#FBFBF8] p-2 rounded w-full">&nbsp;</div>
                </div>

                <div>
                  <div className="text-xs text-[#9B9B9B] mb-1">Birth date</div>
                  <div className="bg-[#FBFBF8] p-2 rounded">{tailor?.birthDate || '---'}</div>
                </div>

                <div>
                  <div className="text-xs text-[#9B9B9B] mb-1">Phone</div>
                  <div className="bg-[#FBFBF8] p-2 rounded">{tailor?.phone || '---'}</div>
                </div>

                <div>
                  <div className="text-xs text-[#9B9B9B] mb-1">Address</div>
                  <div className="bg-[#FBFBF8] p-2 rounded">{tailor?.address || '---'}</div>
                </div>

                <div>
                  <div className="text-xs text-[#9B9B9B] mb-1">Start Date</div>
                  <div className="bg-[#FBFBF8] p-2 rounded">{tailor?.startDate || '---'}</div>
                </div>

                <div>
                  <div className="text-xs text-[#9B9B9B] mb-1">Payment Cycle Start</div>
                  <div className="bg-[#FBFBF8] p-2 rounded">{tailor?.paymentCycle || '---'}</div>
                </div>

                <div>
                  <div className="text-xs text-[#9B9B9B] mb-1">CCP</div>
                  <div className="bg-[#FBFBF8] p-2 rounded">{tailor?.ccp || '---'}</div>
                </div>

                <div className="col-span-3">
                  <div className="text-xs text-[#9B9B9B] mb-1">BaridiMob</div>
                  <div className="bg-[#FBFBF8] p-2 rounded">{tailor?.baridiMob || '---'}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded shadow-sm border border-[#F0F0EA] p-6">
            <h3 className="font-semibold text-[#2f6b4d] mb-4">Assigned orders</h3>

            {SAMPLE_ORDERS.map(o => (
              <div key={o.id} className="border-t first:border-t-0 py-4">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-sm font-semibold text-[#2f6b4d]">Order 1 #{o.id}</div>
                    <div className="text-xs text-[#9B9B9B] mt-2">Product <strong className="text-black">{o.product}</strong></div>
                    <div className="flex items-center gap-3 mt-3">
                      <img src={logo} alt="prod" className="w-16 h-20 object-cover" />
                      <div>
                        <div className="font-semibold">{o.title}</div>
                        <div className="text-xs text-[#9B9B9B]">Couture , SURGER , feil a, perlage</div>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-xs text-[#9B9B9B]">{o.date}</div>
                    <div className={`mt-3 inline-block px-3 py-1 rounded text-sm ${o.status === 'Done' ? 'bg-green-50 text-green-700' : 'bg-yellow-50 text-yellow-700'}`}>{o.status}</div>
                  </div>
                </div>
              </div>
            ))}

          </div>
          <div className="mt-4">
            <button onClick={() => setConfirmOpen(true)} className="px-3 py-2 bg-red-50 text-red-600 rounded">Delete tailor</button>
          </div>
          <ConfirmModal open={confirmOpen} title="Delete tailor" message="This action cannot be undone" onCancel={() => setConfirmOpen(false)} onConfirm={async () => {
            await mockTailors.deleteTailor(id)
            navigate('/tailors')
          }} />
        </div>
      </div>
    </div>
  )
}
