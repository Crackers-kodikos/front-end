import React from 'react'

/**
 * Delete confirmation modal component
 * Used for safe deletion of items with user confirmation
 */
export default function DeleteConfirmModal({ 
  open, 
  title = 'Delete Item',
  message = 'This action cannot be undone.',
  itemName = '',
  onCancel, 
  onConfirm,
  isLoading = false
}) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-30" onClick={onCancel}></div>

      <div className="relative bg-white rounded-lg shadow-lg max-w-md w-full p-6">
        <div className="flex items-start gap-4">
          <div className="shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
            <svg className="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4v2m0 0v2m0-6v-2m0-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          
          <div className="flex-1">
            <h3 className="text-lg font-medium text-gray-900">{title}</h3>
            {itemName && <p className="mt-1 text-sm text-gray-600">Deleting: <strong>{itemName}</strong></p>}
            <p className="mt-2 text-sm text-gray-600">{message}</p>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button 
            onClick={onCancel}
            disabled={isLoading}
            className="px-4 py-2 border rounded text-sm text-gray-600 hover:bg-gray-50 disabled:opacity-50"
          >
            Cancel
          </button>
          <button 
            onClick={onConfirm}
            disabled={isLoading}
            className="px-4 py-2 bg-red-600 text-white rounded text-sm hover:bg-red-700 disabled:opacity-50"
          >
            {isLoading ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  )
}
