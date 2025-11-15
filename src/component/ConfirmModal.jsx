import React from 'react'

export default function ConfirmModal({ open, title = 'Are you sure?', message = '', onCancel, onConfirm }) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-30" onClick={onCancel}></div>

      <div className="relative bg-white rounded-lg shadow-lg max-w-md w-full p-6">
        <h3 className="text-xl font-semibold text-[#2f6b4d] mb-2">{title}</h3>
        {message && <p className="text-sm text-gray-600 mb-4">{message}</p>}

        <div className="flex justify-end gap-3">
          <button onClick={onCancel} className="px-4 py-2 border rounded text-red-600">Cancel</button>
          <button onClick={onConfirm} className="px-4 py-2 bg-[#3F6E57] text-white rounded">Continue</button>
        </div>
      </div>
    </div>
  )
}
