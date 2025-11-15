import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Sidebar from '../component/Sidebar.jsx'
import FormInput from '../component/FormInput'
import { useFormValidation, validationRules } from '../hooks/useFormValidation'
import mockTailors from '../api/mockTailors'

export default function TailorForm(){
  const navigate = useNavigate()
  const { id } = useParams()
  const [imagePreview, setImagePreview] = useState(null)
  const [successMessage, setSuccessMessage] = useState('')
  const [submitError, setSubmitError] = useState('')

  const tailorValidationRules = {
    name: [
      validationRules.required('Full name is required'),
      validationRules.minLength(2, 'Name must be at least 2 characters'),
      validationRules.maxLength(100, 'Name must not exceed 100 characters')
    ],
    phone: [
      validationRules.required('Phone number is required'),
      validationRules.phone('Invalid phone number format')
    ],
    address: [
      validationRules.required('Address is required'),
      validationRules.minLength(5, 'Address must be at least 5 characters')
    ],
    role: [
      validationRules.required('Role is required')
    ],
    startDate: [
      validationRules.required('Start date is required')
    ],
    ccp: [
      validationRules.required('CCP information is required')
    ],
    baridiMob: [
      validationRules.required('BaridiMob information is required')
    ]
  }

  const handleSubmitForm = async (values) => {
    setSubmitError('')
    try {
      if (id) {
        await mockTailors.updateTailor(id, values)
        setSuccessMessage('Tailor updated successfully!')
        setTimeout(() => navigate(`/tailors/${id}`), 1500)
      } else {
        const created = await mockTailors.createTailor(values)
        setSuccessMessage('Tailor created successfully!')
        setTimeout(() => navigate(`/tailors/${created.id}`), 1500)
      }
    } catch (error) {
      console.error('Error saving tailor:', error)
      setSubmitError('Failed to save tailor. Please try again.')
    }
  }

  const form = useFormValidation(
    { 
      name: '',
      role: '',
      phone: '',
      address: '',
      startDate: '',
      ccp: '',
      baridiMob: '',
      image: null
    },
    handleSubmitForm,
    tailorValidationRules
  )

  useEffect(() => {
    if (!id) return
    let mounted = true
    mockTailors.getTailor(id).then(t => {
      if (mounted && t) {
        form.setValues(t)
        if (t.image) setImagePreview(t.image)
      }
    })
    return () => { mounted = false }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  function onFile(e){
    const f = e.target.files && e.target.files[0]
    if (!f) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      form.setFieldValue('image', ev.target.result)
      setImagePreview(ev.target.result)
    }
    reader.readAsDataURL(f)
  }

  const removeImage = () => {
    form.setFieldValue('image', null)
    setImagePreview(null)
  }

  return (
    <div className="flex min-h-screen bg-[#F6F6EE]" style={{ fontFamily: 'Poppins' }}>
      <Sidebar />
      <div className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-semibold text-[#1F6A4A] mb-4">
            {id ? 'Edit Tailor' : 'Create a new tailor'}
          </h1>

          {successMessage && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded mb-6">
              {successMessage}
            </div>
          )}

          {submitError && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
              {submitError}
            </div>
          )}

          <form onSubmit={form.handleSubmit} className="bg-white rounded p-6 border border-[#F0F0EA]">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm text-[#2f6b4d] mb-2">Image</label>
                <div className="border rounded p-4">
                  <input type="file" accept="image/*" onChange={onFile} />
                  {imagePreview && (
                    <>
                      <img src={imagePreview} alt="preview" className="w-24 h-24 mt-2 object-cover rounded" />
                      <button 
                        type="button"
                        onClick={removeImage}
                        className="mt-2 px-3 py-1 border rounded text-sm text-red-600 block"
                      >
                        Remove image
                      </button>
                    </>
                  )}
                </div>
              </div>

              <div>
                <FormInput
                  label="Full Name"
                  name="name"
                  value={form.values.name}
                  error={form.errors.name}
                  touched={form.touched.name}
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  required
                  className="mb-3"
                />
                <FormInput
                  label="Address"
                  name="address"
                  value={form.values.address}
                  error={form.errors.address}
                  touched={form.touched.address}
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  required
                  className="mb-3"
                />
                <FormInput
                  label="CCP Information"
                  name="ccp"
                  value={form.values.ccp}
                  error={form.errors.ccp}
                  touched={form.touched.ccp}
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  required
                />
              </div>

              <div>
                <FormInput
                  label="Role"
                  name="role"
                  value={form.values.role}
                  error={form.errors.role}
                  touched={form.touched.role}
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  required
                  className="mb-3"
                />
                <FormInput
                  label="Start Date"
                  name="startDate"
                  type="date"
                  value={form.values.startDate}
                  error={form.errors.startDate}
                  touched={form.touched.startDate}
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  required
                  className="mb-3"
                />
                <FormInput
                  label="Phone Number"
                  name="phone"
                  type="tel"
                  value={form.values.phone}
                  error={form.errors.phone}
                  touched={form.touched.phone}
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  required
                  className="mb-3"
                />
                <FormInput
                  label="BaridiMob Information"
                  name="baridiMob"
                  value={form.values.baridiMob}
                  error={form.errors.baridiMob}
                  touched={form.touched.baridiMob}
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  required
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-4">
              <button type="button" onClick={()=>navigate(-1)} className="px-4 py-2 border rounded text-red-600">Cancel</button>
              <button type="submit" disabled={form.isSubmitting} className="px-4 py-2 bg-[#2f6b4d] text-white rounded disabled:opacity-50">
                {form.isSubmitting ? 'Saving...' : id ? 'Save changes' : 'Create tailor'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
