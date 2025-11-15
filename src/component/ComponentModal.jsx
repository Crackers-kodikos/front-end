import React, { useEffect, useState } from 'react'
import FormInput from './FormInput'
import { validationRules } from '../hooks/useFormValidation'

export default function ComponentModal({ open, initial = { name: '', price: '' }, mode = 'add', onCancel, onSave }) {
  const [name, setName] = useState(initial.name || '')
  const [price, setPrice] = useState(initial.price || '')
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})

  useEffect(() => {
    setName(initial.name || '')
    setPrice(initial.price || '')
    setErrors({})
    setTouched({})
  }, [initial, open])

  if (!open) return null

  const validateForm = () => {
    const newErrors = {}

    // Validate name
    const nameError = validationRules.required('Component name is required')(name)
    if (nameError) newErrors.name = nameError
    else {
      const minError = validationRules.minLength(2, 'Name must be at least 2 characters')(name)
      if (minError) newErrors.name = minError
    }

    // Validate price
    const priceError = validationRules.required('Price is required')(price)
    if (priceError) {
      newErrors.price = priceError
    } else {
      const numError = validationRules.number('Price must be a valid number')(price)
      if (numError) {
        newErrors.price = numError
      } else {
        const minError = validationRules.minValue(0, 'Price cannot be negative')(price)
        if (minError) newErrors.price = minError
      }
    }

    return newErrors
  }

  const handleSave = () => {
    const newErrors = validateForm()
    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
      onSave({ name: name.trim(), price: price })
    }
  }

  const handleNameChange = (e) => {
    setName(e.target.value)
    if (touched.name && errors.name) {
      const error = validationRules.required('Component name is required')(e.target.value)
      if (!error) {
        setErrors(prev => {
          const updated = { ...prev }
          delete updated.name
          return updated
        })
      }
    }
  }

  const handlePriceChange = (e) => {
    setPrice(e.target.value)
    if (touched.price && errors.price) {
      const error = validationRules.required('Price is required')(e.target.value)
      if (!error) {
        const numError = validationRules.number('Price must be a valid number')(e.target.value)
        if (!numError) {
          setErrors(prev => {
            const updated = { ...prev }
            delete updated.price
            return updated
          })
        }
      }
    }
  }

  const handleNameBlur = () => {
    setTouched(prev => ({ ...prev, name: true }))
    const error = validationRules.required('Component name is required')(name)
    if (!error) {
      const minError = validationRules.minLength(2, 'Name must be at least 2 characters')(name)
      if (minError) {
        setErrors(prev => ({ ...prev, name: minError }))
      } else {
        setErrors(prev => {
          const updated = { ...prev }
          delete updated.name
          return updated
        })
      }
    } else {
      setErrors(prev => ({ ...prev, name: error }))
    }
  }

  const handlePriceBlur = () => {
    setTouched(prev => ({ ...prev, price: true }))
    const error = validationRules.required('Price is required')(price)
    if (error) {
      setErrors(prev => ({ ...prev, price: error }))
    } else {
      const numError = validationRules.number('Price must be a valid number')(price)
      if (numError) {
        setErrors(prev => ({ ...prev, price: numError }))
      } else {
        const minError = validationRules.minValue(0, 'Price cannot be negative')(price)
        if (minError) {
          setErrors(prev => ({ ...prev, price: minError }))
        } else {
          setErrors(prev => {
            const updated = { ...prev }
            delete updated.price
            return updated
          })
        }
      }
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-30" onClick={onCancel}></div>

      <div className="relative bg-white rounded-lg shadow-lg max-w-md w-full p-6">
        <h3 className="text-xl font-semibold text-[#2f6b4d] mb-4">{mode === 'add' ? 'Add component' : 'Edit component'}</h3>

        <div className="grid gap-4">
          <FormInput
            label="Component Name"
            name="name"
            value={name}
            error={errors.name}
            touched={touched.name}
            onChange={handleNameChange}
            onBlur={handleNameBlur}
            placeholder="Enter component name"
            required
          />

          <FormInput
            label="Price (DA)"
            name="price"
            type="number"
            value={price}
            error={errors.price}
            touched={touched.price}
            onChange={handlePriceChange}
            onBlur={handlePriceBlur}
            placeholder="Enter price"
            required
          />
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button onClick={onCancel} className="px-4 py-2 border rounded text-sm text-gray-600 hover:bg-gray-50">Cancel</button>
          <button onClick={handleSave} className="px-4 py-2 bg-[#3F6E57] text-white rounded text-sm hover:bg-[#2f5a47]">Save</button>
        </div>
      </div>
    </div>
  )
}
