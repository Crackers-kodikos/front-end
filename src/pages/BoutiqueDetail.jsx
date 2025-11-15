import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Sidebar from '../component/Sidebar'
import * as mockBoutiques from '../api/mockBoutiques'
import ConfirmModal from '../component/ConfirmModal'

export default function BoutiqueDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [boutique, setBoutique] = useState(null)
  const [confirmOpen, setConfirmOpen] = useState(false)

  useEffect(() => {
    let mounted = true
    mockBoutiques.getBoutique(id).then(b => { if (mounted) setBoutique(b) })
    return () => { mounted = false }
  }, [id])

  const handleDelete = () => {
    setConfirmOpen(true)
  }

  const confirmDelete = async () => {
    setConfirmOpen(false)
    await mockBoutiques.deleteBoutique(id)
    navigate('/boutiques')
  }

  const cancelDelete = () => {
    setConfirmOpen(false)
  }

  if (!boutique) {
    return (
      <div className="min-h-screen bg-[#F6F6EE] font-poppins flex" style={{ fontFamily: 'Poppins' }}>
        <Sidebar />
        <div className="flex-1 p-8 flex items-center justify-center">
          <div className="text-gray-500">Loading...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F6F6EE] font-poppins flex" style={{ fontFamily: 'Poppins' }}>
      <Sidebar />

      <main className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-6">
            <button 
              className="text-[#2f6b4d] mb-4 hover:text-[#1F6A4A]" 
              onClick={() => navigate(-1)}
            >
              ← Back
            </button>
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-semibold text-[#1F6A4A]">
                {boutique.fullName} #{id}
              </h1>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => navigate(`/boutiques/${id}/edit`)}
                  className="px-4 py-2 bg-[#3F6E57] text-white rounded text-sm hover:bg-[#2F5E47]"
                >
                  Edit Boutique
                </button>
                <button 
                  onClick={handleDelete}
                  className="px-4 py-2 border border-red-300 text-red-600 rounded text-sm hover:bg-red-50"
                >
                  Delete Boutique
                </button>
              </div>
            </div>
          </div>

          {/* Main Boutique Info */}
          <div className="bg-white rounded-lg shadow-sm border border-[#F0F0EA] p-6 mb-6">
            <h2 className="text-lg font-semibold text-[#1F6A4A] mb-6">Boutique Information</h2>
            
            <div className="flex gap-8">
              <div className="w-40">
                <img 
                  src={boutique.image || '/src/assets/6b6752ac8194e5ebad81c81e4fc1695cf9c39259.jpg'} 
                  alt="Boutique" 
                  className="w-32 h-32 rounded-lg object-cover border border-gray-200"
                />
              </div>

              <div className="flex-1 grid grid-cols-3 gap-4 items-start">
                <div>
                  <div className="text-xs text-[#9B9B9B] mb-1">Full Name</div>
                  <div className="bg-[#FBFBF8] p-3 rounded">{boutique.fullName}</div>
                </div>

                <div>
                  <div className="text-xs text-[#9B9B9B] mb-1">Number of orders sent</div>
                  <div className="bg-[#FBFBF8] p-3 rounded">{boutique.ordersCount}</div>
                </div>

                <div>
                  <div className="text-xs text-[#9B9B9B] mb-1">Date started</div>
                  <div className="bg-[#FBFBF8] p-3 rounded">{boutique.dateStarted}</div>
                </div>

                <div className="col-span-2">
                  <div className="text-xs text-[#9B9B9B] mb-1">Address</div>
                  <div className="bg-[#FBFBF8] p-3 rounded">{boutique.address}</div>
                </div>

                <div className="col-span-1">
                  <div className="text-xs text-[#9B9B9B] mb-1">ID</div>
                  <div className="bg-[#FBFBF8] p-3 rounded">#{boutique.id}</div>
                </div>

                <div className="col-span-3">
                  <div className="text-xs text-[#9B9B9B] mb-1">Speciality</div>
                  <div className="bg-[#FBFBF8] p-3 rounded">{boutique.specialty}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Owner Information */}
          <div className="bg-white rounded-lg shadow-sm border border-[#F0F0EA] p-6 mb-6">
            <h2 className="text-lg font-semibold text-[#1F6A4A] mb-6">Boutique Owner</h2>
            
            <div className="flex gap-8">
              <div className="w-40">
                <img 
                  src={boutique.owner?.image || '/src/assets/avatar-placeholder.png'} 
                  alt="Owner" 
                  className="w-32 h-32 rounded-full object-cover border-2 border-[#F6F6EE]"
                  onError={(e) => {
                    e.target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMzIiIGN5PSIzMiIgcj0iMzIiIGZpbGw9IiNGM0Y0RjYiLz48L3N2Zz4="
                  }}
                />
              </div>

              <div className="flex-1 grid grid-cols-3 gap-4 items-start">
                <div>
                  <div className="text-xs text-[#9B9B9B] mb-1">Full Name</div>
                  <div className="bg-[#FBFBF8] p-3 rounded">{boutique.owner.fullName}</div>
                </div>

                <div>
                  <div className="text-xs text-[#9B9B9B] mb-1">Phone 1</div>
                  <div className="bg-[#FBFBF8] p-3 rounded">{boutique.owner.phone1}</div>
                </div>

                <div>
                  <div className="text-xs text-[#9B9B9B] mb-1">Phone 2</div>
                  <div className="bg-[#FBFBF8] p-3 rounded">{boutique.owner.phone2}</div>
                </div>

                <div>
                  <div className="text-xs text-[#9B9B9B] mb-1">Birth date</div>
                  <div className="bg-[#FBFBF8] p-3 rounded">{boutique.owner.birthDate}</div>
                </div>

                <div className="col-span-2">
                  <div className="text-xs text-[#9B9B9B] mb-1">City, Address</div>
                  <div className="bg-[#FBFBF8] p-3 rounded">{boutique.owner.city}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Statistics or Additional Info */}
          <div className="bg-white rounded-lg shadow-sm border border-[#F0F0EA] p-6">
            <h2 className="text-lg font-semibold text-[#1F6A4A] mb-6">Statistics</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-[#F6F6EE] rounded-lg">
                <div className="text-2xl font-bold text-[#3F6E57]">{boutique.ordersCount || '0'}</div>
                <div className="text-sm text-gray-600">Total Orders</div>
              </div>
              
              <div className="text-center p-4 bg-[#F6F6EE] rounded-lg">
                <div className="text-2xl font-bold text-[#3F6E57]">
                  {boutique.dateStarted ? new Date().getFullYear() - new Date(boutique.dateStarted.split('-').reverse().join('-')).getFullYear() : '0'}
                </div>
                <div className="text-sm text-gray-600">Years Active</div>
              </div>
              
              <div className="text-center p-4 bg-[#F6F6EE] rounded-lg">
                <div className="text-2xl font-bold text-[#3F6E57]">Active</div>
                <div className="text-sm text-gray-600">Status</div>
              </div>
            </div>
          </div>
        </div>

        <ConfirmModal 
          open={confirmOpen} 
          title="Are you sure you want to delete this boutique?" 
          message="This action cannot be undone. All boutique data will be permanently deleted." 
          onCancel={cancelDelete} 
          onConfirm={confirmDelete} 
        />
      </main>
    </div>
  )
}