import React from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../component/Sidebar.jsx'
import logo from '../assets/logo.svg'
import { useEffect, useState } from 'react'
import ConfirmModal from '../component/ConfirmModal'
import mockTailors from '../api/mockTailors'

// NOTE: list comes from mockTailors (localStorage)

export default function Tailors() {
  const navigate = useNavigate()
  const [tailors, setTailors] = useState([])
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [toDelete, setToDelete] = useState(null)

  useEffect(() => {
    let mounted = true
    mockTailors.listTailors().then(list => { if (mounted) setTailors(list) })
    return () => { mounted = false }
  }, [])

  function openDelete(t) { setToDelete(t); setConfirmOpen(true) }
  function cancelDelete() { setToDelete(null); setConfirmOpen(false) }
  async function confirmDelete() {
    if (!toDelete) return
    await mockTailors.deleteTailor(toDelete.id)
    const list = await mockTailors.listTailors()
    setTailors(list)
    setConfirmOpen(false)
    setToDelete(null)
  }

  return (
    
    <div className="flex min-h-screen bg-[#F6F6EE]" style={{ fontFamily: 'Poppins' }}>
        
      <Sidebar />
       
      <div className="flex-1 p-8">
  <header className="flex items-center gap-90 mb-6">
          <h1 className="text-2xl font-semibold text-[#1F6A4A]">Tailors</h1>
          <div className="flex items-center justify-between gap-160 ">
            <div className="bg-white px-3 py-2 rounded shadow-sm flex items-center gap-2  align-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M21 21l-4.35-4.35" stroke="#6B6B6B" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              <input placeholder="Search" className="outline-none text-sm" />
            </div>
            <div className="text-sm text-gray-600">Youcef Bouhafs<br/><span className="text-xs text-gray-400">Admin</span></div>
          </div>
        </header>
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-[#2f6b4d]">Total tailors : <span className="font-bold">{tailors.length}</span></h2>
            <button onClick={() => navigate('/tailors/new')} className="px-4 py-2 rounded border border-[#dfe6dc] text-[#2f6b4d] bg-white">Add new tailor +</button>
          </div>

          <div className="bg-white rounded shadow-sm border border-[#F0F0EA] overflow-hidden">
            <div className="grid grid-cols-2 gap-0">
              {[0, 1].map(col => (
                <div key={col} className="p-6 border-l last:border-l-0">
                  <div className="text-xs text-[#9B9B9B] mb-4 flex items-center justify-between">
                    <div className="w-1/2">Image <span className="ml-2 text-[#BEBEBE]">name - speciality</span></div>
                    <div className="w-1/4 text-center">Id</div>
                    <div className="w-1/4 text-right">&nbsp;</div>
                  </div>

                  <div>
                    {tailors.map((t) => (
                      <div key={t.id} className="flex items-center gap-4 py-4 border-t first:border-t-0">
                        <div className="flex items-center gap-3 w-1/2">
                          <img src={t.image || logo} alt={t.name} className="w-12 h-12 rounded-md object-cover" />
                          <div>
                            <div className="font-semibold text-sm cursor-pointer text-[#1F6A4A]" onClick={() => navigate(`/tailors/${t.id}`)}>{t.name}</div>
                            <div className="text-xs text-[#9B9B9B]">{t.speciality}</div>
                          </div>
                        </div>

                        <div className="w-1/4 text-center text-sm text-[#6B6B6B]">{t.id}</div>

                        <div className="w-1/4 text-right flex items-center justify-end gap-3">
                          <button className="text-green-600" onClick={() => navigate(`/tailors/${t.id}`)}>✎</button>
                          <button className="text-red-500" onClick={() => openDelete(t)}>🗑</button>
                          <button onClick={() => navigate(`/tailors/${t.id}`)} className="bg-[#F6F6EE] p-2 rounded">➜</button>
                        </div>
                      </div>
                    ))}
                    <ConfirmModal open={confirmOpen} title="Are you sure you want to delete this tailor?" message="This action cannot be undone" onCancel={cancelDelete} onConfirm={confirmDelete} />
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t flex items-center justify-between">
              <button className="px-3 py-1 rounded border text-sm">&lt; Previous</button>

              <div className="flex items-center gap-2">
                {[1,2,3,4].map(n => (
                  <div key={n} className={`w-8 h-8 flex items-center justify-center rounded border ${n===1? 'bg-[#F6F6EE] text-[#2f6b4d]' : 'bg-white'}`}>{n}</div>
                ))}
                <div className="w-8 h-8 flex items-center justify-center rounded border">25</div>
              </div>

              <button className="px-3 py-1 rounded border text-sm">Next &gt;</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
