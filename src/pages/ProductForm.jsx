import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Sidebar from '../component/Sidebar'
import ComponentModal from '../component/ComponentModal'
import FormInput from '../component/FormInput'
import { useFormValidation, validationRules } from '../hooks/useFormValidation'
import * as mockProducts from '../api/mockProducts'

export default function ProductForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [imagePreview, setImagePreview] = useState(null)
  const [successMessage, setSuccessMessage] = useState('')
  const [submitError, setSubmitError] = useState('')

  const [modalOpen, setModalOpen] = useState(false)
  const [modalMode, setModalMode] = useState('add')
  const [modalInitial, setModalInitial] = useState({ name: '', price: '' })
  const [editingId, setEditingId] = useState(null)

  const productValidationRules = {
    name: [
      validationRules.required('Product name is required'),
      validationRules.minLength(2, 'Product name must be at least 2 characters'),
      validationRules.maxLength(100, 'Product name must not exceed 100 characters')
    ],
    price: [
      validationRules.required('Price is required'),
      validationRules.number('Price must be a valid number'),
      validationRules.minValue(0, 'Price cannot be negative')
    ],
    productType: [
      validationRules.required('Product type is required')
    ],
    fabricType: [
      validationRules.required('Fabric type is required')
    ],
    fabricColor: [
      validationRules.required('Fabric color is required')
    ],
    threadType: [
      validationRules.required('Thread type is required')
    ],
    creationTime: [
      validationRules.required('Creation time is required')
    ]
  }

  const handleSubmitForm = async (values) => {
    setSubmitError('')
    try {
      if (id) {
        await mockProducts.updateProduct(id, values)
        setSuccessMessage('Product updated successfully!')
        setTimeout(() => navigate(`/products/${id}`), 1500)
      } else {
        const created = await mockProducts.createProduct(values)
        setSuccessMessage('Product created successfully!')
        setTimeout(() => navigate(`/products/${created.id}`), 1500)
      }
    } catch (error) {
      console.error('Error saving product:', error)
      setSubmitError('Failed to save product. Please try again.')
    }
  }

  const form = useFormValidation(
    {
      name: '',
      productType: '',
      price: '',
      fabricType: '',
      fabricColor: '',
      threadType: '',
      creationTime: '',
      desc: '',
      components: []
    },
    handleSubmitForm,
    productValidationRules
  )

  useEffect(() => {
    if (!id) return
    let mounted = true
    mockProducts.getProduct(id).then(p => {
      if (mounted && p) {
        form.setValues(p)
        if (p.image) setImagePreview(p.image)
      }
    })
    return () => { mounted = false }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  const handleFile = (file) => {
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      form.setFieldValue('image', ev.target.result)
      setImagePreview(ev.target.result)
    }
    reader.readAsDataURL(file)
  }

  const onFileChange = (e) => {
    const f = e.target.files && e.target.files[0]
    if (f) handleFile(f)
  }

  const removeImage = () => {
    form.setFieldValue('image', null)
    setImagePreview(null)
  }

  const addComponent = () => {
    setModalMode('add')
    setModalInitial({ name: '', price: '' })
    setEditingId(null)
    setModalOpen(true)
  }

  const editComponent = (compId) => {
    const comp = (form.values.components || []).find(c => c.id === compId)
    if (!comp) return
    setModalMode('edit')
    setModalInitial({ name: comp.name || '', price: comp.price || '' })
    setEditingId(compId)
    setModalOpen(true)
  }

  const removeComponent = (compId) => {
    form.setFieldValue('components', 
      (form.values.components || []).filter(c => c.id !== compId)
    )
  }

  const onModalSave = (data) => {
    if (modalMode === 'add') {
      form.setFieldValue('components', 
        [...(form.values.components || []), { id: Date.now(), ...data }]
      )
    } else if (modalMode === 'edit' && editingId != null) {
      form.setFieldValue('components',
        (form.values.components || []).map(c => 
          c.id === editingId ? { ...c, ...data } : c
        )
      )
    }
    setModalOpen(false)
  }

  const onModalCancel = () => {
    setModalOpen(false)
  }

  return (
    <div className="min-h-screen bg-[#F6F6EE] font-poppins flex" style={{ fontFamily: 'Poppins' }}>
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="bg-white rounded p-4 shadow-sm mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button onClick={() => navigate('/products')} className="px-3 py-2 rounded bg-[#EAF4ED] text-[#2f6b4d]">←</button>
              <h2 className="text-lg font-semibold text-[#2f6b4d]">{id ? 'Edit product' : 'Create product'}</h2>
            </div>

            <div className="flex items-center gap-3">
              {id && <button onClick={() => navigate(`/products/${id}`)} className="px-3 py-1 border rounded text-sm">Cancel</button>}
            </div>
          </div>
        </div>

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

        <form onSubmit={form.handleSubmit} className="bg-white rounded shadow-sm p-6">
          <div className="grid grid-cols-6 gap-4">
            <div className="col-span-3">
              <FormInput
                label="Product Name"
                name="name"
                value={form.values.name}
                error={form.errors.name}
                touched={form.touched.name}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                placeholder="Enter product name"
                required
              />
              <div className="mt-4">
                <div className="text-xs text-gray-500">Image (jpg, png)</div>
                <div className="mt-2 w-48">
                  <div className="w-48 h-48 bg-[#F8F8F6] rounded flex items-center justify-center overflow-hidden">
                    {imagePreview ? (
                      <img src={imagePreview} alt="preview" className="w-full h-full object-cover" />
                    ) : (
                      <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer text-xs text-gray-500">
                        <input type="file" accept="image/*" onChange={onFileChange} className="hidden" />
                        Click to upload
                        <div className="text-[10px]">JPG, JPEG, PNG less than 4MB</div>
                      </label>
                    )}
                  </div>
                  <div className="mt-2 flex gap-2">
                    {imagePreview && <button type="button" onClick={removeImage} className="px-3 py-1 border rounded text-sm text-red-600">Remove image</button>}
                    {!imagePreview && (
                      <label className="px-3 py-1 border rounded text-sm cursor-pointer text-[#2f6b4d]">
                        Upload
                        <input type="file" accept="image/*" onChange={onFileChange} className="hidden" />
                      </label>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="col-span-3">
              <div className="grid grid-cols-2 gap-4">
                <FormInput
                  label="Product Type"
                  name="productType"
                  value={form.values.productType}
                  error={form.errors.productType}
                  touched={form.touched.productType}
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  required
                />
                <FormInput
                  label="Price"
                  name="price"
                  type="number"
                  value={form.values.price}
                  error={form.errors.price}
                  touched={form.touched.price}
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  required
                />
                <FormInput
                  label="Fabric Type"
                  name="fabricType"
                  value={form.values.fabricType}
                  error={form.errors.fabricType}
                  touched={form.touched.fabricType}
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  required
                />
                <FormInput
                  label="Thread Type Used"
                  name="threadType"
                  value={form.values.threadType}
                  error={form.errors.threadType}
                  touched={form.touched.threadType}
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  required
                />
                <FormInput
                  label="Fabric Color"
                  name="fabricColor"
                  value={form.values.fabricColor}
                  error={form.errors.fabricColor}
                  touched={form.touched.fabricColor}
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  required
                />
                <FormInput
                  label="Creation Time"
                  name="creationTime"
                  value={form.values.creationTime}
                  error={form.errors.creationTime}
                  touched={form.touched.creationTime}
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  required
                />
              </div>
            </div>
          </div>

          <div className="mt-6">
            <div className="bg-white rounded p-4 shadow-sm mb-4">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-semibold text-[#2f6b4d]">Components</h3>
                <button type="button" onClick={addComponent} className="px-3 py-1 border rounded text-sm text-[#2f6b4d]">add component +</button>
              </div>

              <div className="mt-4">
                <div className="flex gap-6 overflow-x-auto py-2">
                  {(form.values.components || []).length === 0 ? (
                    <div className="text-sm text-gray-500">No components yet</div>
                  ) : (
                    (form.values.components || []).map(c => (
                      <div key={c.id} className="min-w-[220px] shrink-0">
                        <div className="text-lg font-medium text-[#111827]">{c.name}</div>
                        <div className="mt-3 p-4 bg-[#F8F8F6] rounded border border-dashed border-gray-200 flex items-center justify-between">
                          <div className="text-sm text-gray-500">---- <span className="ml-2">{c.price} DA</span></div>
                        </div>
                        <div className="mt-2 flex gap-2">
                          <button type="button" onClick={() => editComponent(c.id)} className="text-sm px-2 py-1 border rounded">Edit</button>
                          <button type="button" onClick={() => removeComponent(c.id)} className="text-sm px-2 py-1 border rounded text-red-600">Remove</button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>

          <ComponentModal open={modalOpen} mode={modalMode} initial={modalInitial} onCancel={onModalCancel} onSave={onModalSave} />

          <div className="mt-6 flex items-center justify-end gap-4">
            <button type="button" onClick={() => navigate('/products')} className="px-4 py-2 border rounded text-sm">Cancel</button>
            <button type="submit" disabled={form.isSubmitting} className="px-4 py-2 bg-[#3F6E57] text-white rounded text-sm disabled:opacity-50">
              {form.isSubmitting ? 'Saving...' : id ? 'Save changes' : 'Create product'}
            </button>
          </div>
        </form>
      </main>
    </div>
  )
}
