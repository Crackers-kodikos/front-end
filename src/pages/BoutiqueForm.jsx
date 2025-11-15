import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Sidebar from '../component/Sidebar'
import FormInput from '../component/FormInput'
import { useFormValidation, validationRules } from '../hooks/useFormValidation'
import * as mockBoutiques from '../api/mockBoutiques'

export default function BoutiqueForm() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [imagePreview, setImagePreview] = useState(null)
  const [ownerImagePreview, setOwnerImagePreview] = useState(null)
  const [successMessage, setSuccessMessage] = useState('')
  const [submitError, setSubmitError] = useState('')

  const boutiqueValidationRules = {
    fullName: [
      validationRules.required('Boutique name is required'),
      validationRules.minLength(2, 'Name must be at least 2 characters'),
      validationRules.maxLength(100, 'Name must not exceed 100 characters')
    ],
    address: [
      validationRules.required('Address is required'),
      validationRules.minLength(5, 'Address must be at least 5 characters')
    ],
    specialty: [
      validationRules.required('Specialty is required'),
      validationRules.minLength(3, 'Specialty must be at least 3 characters')
    ],
    'owner.fullName': [
      validationRules.required('Owner name is required'),
      validationRules.minLength(2, 'Owner name must be at least 2 characters')
    ],
    'owner.phone1': [
      validationRules.required('Phone 1 is required'),
      validationRules.phone('Invalid phone number format')
    ],
    'owner.phone2': [
      validationRules.phone('Invalid phone number format')
    ],
    'owner.birthDate': [
      validationRules.required('Birth date is required')
    ],
    'owner.city': [
      validationRules.required('City is required'),
      validationRules.minLength(2, 'City must be at least 2 characters')
    ]
  }

  const handleSubmitForm = async (values) => {
    setSubmitError('')
    try {
      if (id) {
        await mockBoutiques.updateBoutique(id, values)
        setSuccessMessage('Boutique updated successfully!')
        setTimeout(() => navigate('/boutiques/success?action=updated'), 1500)
      } else {
        await mockBoutiques.createBoutique(values)
        setSuccessMessage('Boutique created successfully!')
        setTimeout(() => navigate('/boutiques/success?action=created'), 1500)
      }
    } catch (error) {
      console.error('Error saving boutique:', error)
      setSubmitError('Failed to save boutique. Please try again.')
    }
  }

  const form = useFormValidation(
    {
      fullName: '',
      address: '',
      specialty: '',
      ordersCount: '',
      image: null,
      owner: {
        fullName: '',
        phone1: '',
        phone2: '',
        birthDate: '',
        city: '',
        image: null
      }
    },
    handleSubmitForm,
    boutiqueValidationRules
  )

  useEffect(() => {
    if (!id) return
    let mounted = true
    mockBoutiques.getBoutique(id).then(b => {
      if (mounted && b) {
        form.setValues(b)
        if (b.image) setImagePreview(b.image)
        if (b.owner?.image) setOwnerImagePreview(b.owner.image)
      }
    })
    return () => { mounted = false }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  const handleBoutiqueImageFile = (e) => {
    const file = e.target.files && e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      form.setFieldValue('image', ev.target.result)
      setImagePreview(ev.target.result)
    }
    reader.readAsDataURL(file)
  }

  const handleOwnerImageFile = (e) => {
    const file = e.target.files && e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      form.setFieldValue('owner.image', ev.target.result)
      setOwnerImagePreview(ev.target.result)
    }
    reader.readAsDataURL(file)
  }

  const removeBoutiqueImage = () => {
    form.setFieldValue('image', null)
    setImagePreview(null)
  }

  const removeOwnerImage = () => {
    form.setFieldValue('owner.image', null)
    setOwnerImagePreview(null)
  }

  return (
    <div className="min-h-screen bg-[#F6F6EE] font-poppins flex" style={{ fontFamily: 'Poppins' }}>
      <Sidebar />

      <main className="flex-1 p-8 max-w-4xl">
        <header className="flex items-center gap-90 mb-6">
          <h1 className="text-2xl font-semibold text-[#1F6A4A]">
            {id ? 'Edit Boutique' : 'Add New Boutique'}
          </h1>
          <div className="flex items-center justify-between gap-160">
            <div className="text-sm text-gray-600">
              Youcef Bouhafs<br/>
              <span className="text-xs text-gray-400">Admin</span>
            </div>
          </div>
        </header>

        {successMessage && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
            {successMessage}
          </div>
        )}

        {submitError && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {submitError}
          </div>
        )}

        <form onSubmit={form.handleSubmit} className="space-y-8">
          {/* Boutique Information Section */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-[#1F6A4A] mb-6">Boutique Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormInput
                label="Boutique Name"
                name="fullName"
                placeholder="Enter boutique name"
                value={form.values.fullName}
                onChange={form.handleChange}
                error={form.errors.fullName}
                required
              />

              <FormInput
                label="Orders Count"
                name="ordersCount"
                placeholder="Number of orders sent"
                value={form.values.ordersCount}
                onChange={form.handleChange}
                error={form.errors.ordersCount}
              />

              <FormInput
                label="Address"
                name="address"
                placeholder="Enter address"
                value={form.values.address}
                onChange={form.handleChange}
                error={form.errors.address}
                required
                className="md:col-span-2"
              />

              <FormInput
                label="Specialty"
                name="specialty"
                placeholder="e.g., Cotton, Ghila, Melifa"
                value={form.values.specialty}
                onChange={form.handleChange}
                error={form.errors.specialty}
                required
                className="md:col-span-2"
              />
            </div>

            {/* Boutique Image Upload */}
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Boutique Image
              </label>
              <div className="flex items-center gap-4">
                {imagePreview ? (
                  <div className="relative">
                    <img 
                      src={imagePreview} 
                      alt="Preview" 
                      className="w-24 h-24 object-cover rounded-lg border"
                    />
                    <button
                      type="button"
                      onClick={removeBoutiqueImage}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
                    >
                      ×
                    </button>
                  </div>
                ) : (
                  <div className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                    <span className="text-gray-400 text-sm">No image</span>
                  </div>
                )}
                <label className="px-4 py-2 bg-[#3F6E57] text-white rounded text-sm cursor-pointer hover:bg-[#2F5E47]">
                  Choose Image
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleBoutiqueImageFile}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Boutique Owner Section */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-[#1F6A4A] mb-6">Boutique Owner Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormInput
                label="Owner Full Name"
                name="owner.fullName"
                placeholder="Enter owner name"
                value={form.values.owner.fullName}
                onChange={form.handleChange}
                error={form.errors['owner.fullName']}
                required
              />

              <FormInput
                label="Birth Date"
                name="owner.birthDate"
                type="date"
                value={form.values.owner.birthDate}
                onChange={form.handleChange}
                error={form.errors['owner.birthDate']}
                required
              />

              <FormInput
                label="Phone 1"
                name="owner.phone1"
                placeholder="+213 6 23 45 67 89"
                value={form.values.owner.phone1}
                onChange={form.handleChange}
                error={form.errors['owner.phone1']}
                required
              />

              <FormInput
                label="Phone 2"
                name="owner.phone2"
                placeholder="+213 6 23 45 67 89"
                value={form.values.owner.phone2}
                onChange={form.handleChange}
                error={form.errors['owner.phone2']}
              />

              <FormInput
                label="City, Address"
                name="owner.city"
                placeholder="Enter city and address"
                value={form.values.owner.city}
                onChange={form.handleChange}
                error={form.errors['owner.city']}
                required
                className="md:col-span-2"
              />
            </div>

            {/* Owner Image Upload */}
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Owner Photo
              </label>
              <div className="flex items-center gap-4">
                {ownerImagePreview ? (
                  <div className="relative">
                    <img 
                      src={ownerImagePreview} 
                      alt="Owner Preview" 
                      className="w-16 h-16 object-cover rounded-full border-2 border-[#F6F6EE]"
                    />
                    <button
                      type="button"
                      onClick={removeOwnerImage}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
                    >
                      ×
                    </button>
                  </div>
                ) : (
                  <div className="w-16 h-16 border-2 border-dashed border-gray-300 rounded-full flex items-center justify-center">
                    <span className="text-gray-400 text-xs">Photo</span>
                  </div>
                )}
                <label className="px-4 py-2 bg-[#3F6E57] text-white rounded text-sm cursor-pointer hover:bg-[#2F5E47]">
                  Choose Photo
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleOwnerImageFile}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-between bg-white rounded-lg shadow-sm p-6">
            <button
              type="button"
              onClick={() => navigate('/boutiques')}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={form.isSubmitting}
              className="px-6 py-2 bg-[#3F6E57] text-white rounded hover:bg-[#2F5E47] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {form.isSubmitting ? 'Saving...' : (id ? 'Update Boutique' : 'Create Boutique')}
            </button>
          </div>
        </form>
      </main>
    </div>
  )
}