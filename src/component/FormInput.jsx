import React from 'react'

/**
 * Reusable form input component with error display
 */
export default function FormInput({
  label,
  name,
  value,
  error,
  touched,
  onChange,
  onBlur,
  type = 'text',
  placeholder,
  required = false,
  className = '',
  inputClassName = '',
  errorClassName = '',
  ...rest
}) {
  const hasError = touched && error
  const baseInputClassName = 'w-full p-3 rounded border transition-colors'
  const inputClasses = hasError
    ? 'border-red-500 bg-red-50'
    : 'border-gray-300 bg-[#F8F8F6] focus:border-[#2f6b4d] focus:outline-none'

  return (
    <div className={className}>
      {label && (
        <label className="block text-xs text-gray-500 mb-2">
          {label}
          {required && <span className="text-red-600 ml-1">*</span>}
        </label>
      )}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        className={`${baseInputClassName} ${inputClasses} ${inputClassName}`}
        {...rest}
      />
      {hasError && (
        <p className={`text-xs text-red-600 mt-1 ${errorClassName}`}>
          {error}
        </p>
      )}
    </div>
  )
}
