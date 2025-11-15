import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../component/Sidebar'
import ConfirmModal from '../component/ConfirmModal'
import * as mockBoutiques from '../api/mockBoutiques'
import './MyBoutiques.css'

export default function MyBoutiques() {
  const navigate = useNavigate()
  const [boutiques, setBoutiques] = useState([])
  const [deleting, setDeleting] = useState(null)
  const [confirmOpen, setConfirmOpen] = useState(false)

  useEffect(() => {
    let mounted = true
    mockBoutiques.listBoutiques().then(list => { if (mounted) setBoutiques(list) })
    return () => { mounted = false }
  }, [])

  const refresh = async () => setBoutiques(await mockBoutiques.listBoutiques())

  const handleDelete = (id) => {
    setDeleting(id)
    setConfirmOpen(true)
  }

  const confirmDelete = async () => {
    setConfirmOpen(false)
    if (!deleting) return
    await mockBoutiques.deleteBoutique(deleting)
    setDeleting(null)
    refresh()
  }

  const cancelDelete = () => { setDeleting(null); setConfirmOpen(false) }

  return (
    <div className="min-h-screen bg-[#F6F6EE] font-poppins flex" style={{ fontFamily: 'Poppins' }}>
      <Sidebar />

      <main className="flex-1 p-8">
        <header className="flex items-center gap-90 mb-6">
          <h1 className="text-2xl font-semibold text-[#1F6A4A]">My Boutiques</h1>
          <div className="flex items-center justify-between gap-160">
            <div className="bg-white px-3 py-2 rounded shadow-sm flex items-center gap-2 align-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M21 21l-4.35-4.35" stroke="#6B6B6B" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <input placeholder="Search" className="outline-none text-sm" />
            </div>
            <div className="text-sm text-gray-600">
              Youcef Bouhafs<br/>
              <span className="text-xs text-gray-400">Admin</span>
            </div>
          </div>
        </header>

        <div className="mb-6">
          <div className="bg-white p-4 rounded shadow-sm flex items-center justify-between">
            <div className="text-sm text-[#6B6B6B]">
              My Boutiques : <span className="font-semibold text-[#3F6E57]">{boutiques.length}/10</span>
            </div>

            <div className="flex items-center gap-3">
              <button 
                onClick={() => navigate('/boutiques/new')} 
                className="px-3 py-2 bg-[#3F6E57] text-white rounded text-sm"
              >
                Add new boutique +
              </button>
              <button 
                className="px-3 py-2 bg-[#1F6A4A] text-white rounded text-sm"
              >
                Upgrade Plan →
              </button>
            </div>
          </div>
        </div>

        {/* Boutique Cards */}
        <div className="space-y-6">
          {boutiques.map((boutique) => (
            <div key={boutique.id} className="bg-white rounded-lg shadow-sm p-6 boutique-card">
              {/* Header with boutique name and actions */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-[#1F6A4A] flex items-center gap-2">
                  {boutique.fullName}
                  <button className="text-gray-400">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M7 7h10M7 7v10a2 2 0 002 2h6a2 2 0 002-2V7M7 7l-1-1M17 7l1-1M9 5V3a1 1 0 011-1h4a1 1 0 011 1v2" stroke="currentColor" strokeWidth="1.5"/>
                    </svg>
                  </button>
                </h3>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => navigate(`/boutiques/${boutique.id}`)} 
                    className="px-3 py-1 bg-[#1F6A4A] text-white rounded text-sm hover:bg-[#3F6E57] action-button"
                  >
                    View Details
                  </button>
                  <button 
                    aria-label="edit" 
                    onClick={() => navigate(`/boutiques/${boutique.id}/edit`)} 
                    className="text-[#1F6A4A] hover:text-[#3F6E57] text-lg action-button p-2 rounded"
                  >
                    ✎
                  </button>
                  <button 
                    aria-label="delete" 
                    onClick={() => handleDelete(boutique.id)} 
                    className="text-red-600 hover:text-red-700 text-sm px-3 py-1 rounded delete-button"
                  >
                    Delete boutique
                  </button>
                </div>
              </div>

              {/* Boutique Details */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Side: Boutique Image and Info */}
                <div className="flex gap-4">
                  <img 
                    src={boutique.image || '/src/assets/6b6752ac8194e5ebad81c81e4fc1695cf9c39259.jpg'} 
                    alt="Boutique" 
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="font-medium text-gray-700">Full Name</div>
                        <div className="text-gray-600">{boutique.fullName}</div>
                      </div>
                      <div>
                        <div className="font-medium text-gray-700">Number of orders sent</div>
                        <div className="text-gray-600">{boutique.ordersCount}</div>
                      </div>
                      <div>
                        <div className="font-medium text-gray-700">Address</div>
                        <div className="text-gray-600">{boutique.address}</div>
                      </div>
                      <div>
                        <div className="font-medium text-gray-700">Date started</div>
                        <div className="text-gray-600">{boutique.dateStarted}</div>
                      </div>
                      <div className="col-span-2">
                        <div className="font-medium text-gray-700">Speciality</div>
                        <div className="text-gray-600">{boutique.specialty}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Side: Boutique Owner */}
                <div>
                  <h4 className="font-semibold text-[#1F6A4A] mb-3">Boutique owner</h4>
                  <div className="flex gap-4">
                    <img 
                      src="/src/assets/avatar-placeholder.png" 
                      alt="Owner" 
                      className="w-16 h-16 object-cover rounded-full boutique-owner-avatar"
                      onError={(e) => {
                        e.target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMzIiIGN5PSIzMiIgcj0iMzIiIGZpbGw9IiNGM0Y0RjYiLz4KPHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeD0iMjAiIHk9IjIwIj4KPHA="
                      }}
                    />
                    <div className="flex-1">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="font-medium text-gray-700">Full Name</div>
                          <div className="text-gray-600">{boutique.owner.fullName}</div>
                        </div>
                        <div>
                          <div className="font-medium text-gray-700">Phone 1</div>
                          <div className="text-gray-600">{boutique.owner.phone1}</div>
                        </div>
                        <div>
                          <div className="font-medium text-gray-700">Phone 2</div>
                          <div className="text-gray-600">{boutique.owner.phone2}</div>
                        </div>
                        <div>
                          <div className="font-medium text-gray-700">Birth date</div>
                          <div className="text-gray-600">{boutique.owner.birthDate}</div>
                        </div>
                        <div className="col-span-2">
                          <div className="font-medium text-gray-700">City, Address</div>
                          <div className="text-gray-600">{boutique.owner.city}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <ConfirmModal 
          open={confirmOpen} 
          title="Are you sure you want to delete this boutique?" 
          message="This action cannot be undone" 
          onCancel={cancelDelete} 
          onConfirm={confirmDelete} 
        />
      </main>
    </div>
  )
}
