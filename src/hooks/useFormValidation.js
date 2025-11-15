import { useState, useCallback } from 'react'

/**
 * Custom hook for form validation
 * @param {Object} initialValues - Initial form values
 * @param {Function} onSubmit - Callback when form is valid and submitted
 * @param {Object} validationRules - Validation rules object
 */
export const useFormValidation = (initialValues, onSubmit, validationRules = {}) => {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateField = useCallback((name, value, rules) => {
    const fieldRules = rules[name]
    if (!fieldRules) return null

    for (const rule of fieldRules) {
      const error = rule(value)
      if (error) return error
    }
    return null
  }, [])

  const validateForm = useCallback((valuesToValidate) => {
    const newErrors = {}
    Object.keys(validationRules).forEach(fieldName => {
      const error = validateField(fieldName, valuesToValidate[fieldName], validationRules)
      if (error) newErrors[fieldName] = error
    })
    return newErrors
  }, [validationRules, validateField])

  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target
    const newValue = type === 'checkbox' ? checked : value
    setValues(prev => ({ ...prev, [name]: newValue }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      const error = validateField(name, newValue, validationRules)
      setErrors(prev => {
        const updated = { ...prev }
        if (error) {
          updated[name] = error
        } else {
          delete updated[name]
        }
        return updated
      })
    }
  }, [errors, validateField, validationRules])

  const handleBlur = useCallback((e) => {
    const { name } = e.target
    setTouched(prev => ({ ...prev, [name]: true }))
    const error = validateField(name, values[name], validationRules)
    setErrors(prev => {
      const updated = { ...prev }
      if (error) {
        updated[name] = error
      } else {
        delete updated[name]
      }
      return updated
    })
  }, [values, validateField, validationRules])

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    const newErrors = validateForm(values)
    setErrors(newErrors)
    
    if (Object.keys(newErrors).length === 0) {
      try {
        await onSubmit(values)
      } catch (error) {
        console.error('Form submission error:', error)
      }
    }
    
    setIsSubmitting(false)
  }, [values, validateForm, onSubmit])

  const reset = useCallback(() => {
    setValues(initialValues)
    setErrors({})
    setTouched({})
  }, [initialValues])

  const setFieldValue = useCallback((name, value) => {
    setValues(prev => ({ ...prev, [name]: value }))
  }, [])

  const setFieldError = useCallback((name, error) => {
    setErrors(prev => {
      const updated = { ...prev }
      if (error) {
        updated[name] = error
      } else {
        delete updated[name]
      }
      return updated
    })
  }, [])

  return {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    reset,
    setFieldValue,
    setFieldError,
    setValues
  }
}

// Common validation rules
export const validationRules = {
  required: (message = 'This field is required') => (value) => {
    if (!value || (typeof value === 'string' && !value.trim())) {
      return message
    }
    return null
  },

  minLength: (min, message = `Minimum ${min} characters required`) => (value) => {
    if (value && value.length < min) {
      return message
    }
    return null
  },

  maxLength: (max, message = `Maximum ${max} characters allowed`) => (value) => {
    if (value && value.length > max) {
      return message
    }
    return null
  },

  email: (message = 'Invalid email address') => (value) => {
    if (!value) return null
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(value)) {
      return message
    }
    return null
  },

  phone: (message = 'Invalid phone number') => (value) => {
    if (!value) return null
    const phoneRegex = /^[\d\s\-+()]+$/
    if (!phoneRegex.test(value) || value.replace(/\D/g, '').length < 10) {
      return message
    }
    return null
  },

  number: (message = 'Must be a valid number') => (value) => {
    if (!value) return null
    if (isNaN(Number(value))) {
      return message
    }
    return null
  },

  minValue: (min, message = `Minimum value is ${min}`) => (value) => {
    if (value === '' || value === null || value === undefined) return null
    if (Number(value) < min) {
      return message
    }
    return null
  },

  maxValue: (max, message = `Maximum value is ${max}`) => (value) => {
    if (value === '' || value === null || value === undefined) return null
    if (Number(value) > max) {
      return message
    }
    return null
  },

  pattern: (regex, message = 'Invalid format') => (value) => {
    if (!value) return null
    if (!regex.test(value)) {
      return message
    }
    return null
  }
}
