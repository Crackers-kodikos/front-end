import React, { useState, useEffect } from 'react'
import Sidebar from '../component/Sidebar'
import FormInput from '../component/FormInput'
import { useFormValidation, validationRules } from '../hooks/useFormValidation'

export default function Profile() {
  const [imagePreview, setImagePreview] = useState(null)
  const [successMessage, setSuccessMessage] = useState('')
  const [submitError, setSubmitError] = useState('')
  const [passwordSectionOpen, setPasswordSectionOpen] = useState(false)
  const [passwordForm, setPasswordForm] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  // Mock user data - in a real app, this would come from authentication context
  const getCurrentUser = () => {
    try {
      const users = JSON.parse(localStorage.getItem('users') || '{}')
      const currentUserEmail = 'c.alia@esi-sba.dz' // This should come from auth context
      return users[currentUserEmail] || {
        email: 'bouhafsyoucef21@gmail.com',
        fullName: 'Youcef Bouhafs',
        fullName2: 'Youcef Bouhafs', // For second full name field
        phone: '+213 555 76 54 32',
        role: 'Youcef Bouhafs',
        cv: 'Youcef Bouhafs',
        skills: 'Youcef Bouhafs',
        city: 'Youcef Bouhafs',
        address: 'Youcef Bouhafs',
        gender: 'Man',
        birthDate: '21-03-2000',
        avatar: null
      }
    } catch {
      return {
        email: 'bouhafsyoucef21@gmail.com',
        fullName: 'Youcef Bouhafs',
        fullName2: 'Youcef Bouhafs',
        phone: '+213 555 76 54 32',
        role: 'Youcef Bouhafs',
        cv: 'Youcef Bouhafs',
        skills: 'Youcef Bouhafs',
        city: 'Youcef Bouhafs',
        address: 'Youcef Bouhafs',
        gender: 'Man',
        birthDate: '21-03-2000',
        avatar: null
      }
    }
  }

  const profileValidationRules = {
    fullName: [
      validationRules.required('Full name is required'),
      validationRules.minLength(2, 'Name must be at least 2 characters'),
      validationRules.maxLength(100, 'Name must not exceed 100 characters')
    ],
    email: [
      validationRules.required('Email is required'),
      validationRules.email('Please enter a valid email address')
    ],
    phone: [
      validationRules.required('Phone number is required'),
      validationRules.phone('Invalid phone number format')
    ],
    birthDate: [
      validationRules.required('Birth date is required')
    ]
  }

  const handleSubmitProfile = async (values) => {
    setSubmitError('')
    try {
      // Save updated profile data
      const users = JSON.parse(localStorage.getItem('users') || '{}')
      users[values.email] = { ...users[values.email], ...values, updatedAt: Date.now() }
      localStorage.setItem('users', JSON.stringify(users))
      
      setSuccessMessage('Profile updated successfully!')
      setTimeout(() => setSuccessMessage(''), 3000)
    } catch (error) {
      console.error('Error updating profile:', error)
      setSubmitError('Failed to update profile. Please try again.')
    }
  }

  const form = useFormValidation(
    getCurrentUser(),
    handleSubmitProfile,
    profileValidationRules
  )

  useEffect(() => {
    const user = getCurrentUser()
    form.setValues(user)
    if (user.avatar) setImagePreview(user.avatar)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleImageFile = (e) => {
    const file = e.target.files && e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      form.setFieldValue('avatar', ev.target.result)
      setImagePreview(ev.target.result)
    }
    reader.readAsDataURL(file)
  }

  const removeImage = () => {
    form.setFieldValue('avatar', null)
    setImagePreview(null)
  }

  const handlePasswordChange = (field, value) => {
    setPasswordForm(prev => ({ ...prev, [field]: value }))
  }

  const handlePasswordSubmit = () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert('New passwords do not match!')
      return
    }
    if (passwordForm.newPassword.length < 6) {
      alert('New password must be at least 6 characters!')
      return
    }
    // Save password logic here
    alert('Password changed successfully!')
    setPasswordForm({ oldPassword: '', newPassword: '', confirmPassword: '' })
    setPasswordSectionOpen(false)
  }

  return (
    <div className="min-h-screen bg-[#F6F6EE] font-poppins flex" style={{ fontFamily: 'Poppins' }}>
      <Sidebar />

      <main className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          {/* Success/Error Messages */}
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

          {/* Profile Card */}
          <div className="bg-white rounded-lg shadow-sm">
            {/* Header */}
            <div className="p-6 border-b border-gray-200">
              <h1 className="text-xl font-semibold text-gray-900 mb-6">My profile</h1>
              
              {/* Profile Picture and Basic Info */}
              <div className="flex items-center space-x-4 mb-6">
                <div className="relative">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Profile"
                      className="w-16 h-16 rounded-lg object-cover border border-gray-200"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-lg bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-500 text-sm">👤</span>
                    </div>
                  )}
                  {imagePreview && (
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600"
                    >
                      ×
                    </button>
                  )}
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">{form.values.fullName}</h2>
                  <p className="text-sm text-gray-600">admin</p>
                  <label className="mt-2 inline-block px-3 py-1 border border-gray-300 rounded text-sm cursor-pointer hover:bg-gray-50">
                    Edit profile
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageFile}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            </div>

            {/* Profile Form */}
            <form onSubmit={form.handleSubmit} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Row 1 */}
                <FormInput
                  label="Full Name"
                  name="fullName"
                  placeholder="Youcef Bouhafs"
                  value={form.values.fullName}
                  onChange={form.handleChange}
                  error={form.errors.fullName}
                />

                <FormInput
                  label="Full Name"
                  name="fullName2"
                  placeholder="Youcef Bouhafs"
                  value={form.values.fullName2}
                  onChange={form.handleChange}
                />

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                  <select
                    name="gender"
                    value={form.values.gender}
                    onChange={form.handleChange}
                    className="w-full p-3 rounded border border-gray-300 bg-gray-50 focus:border-[#3F6E57] focus:outline-none"
                  >
                    <option value="Man">Man</option>
                    <option value="Woman">Woman</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Row 2 */}
                <FormInput
                  label="Date of birth"
                  name="birthDate"
                  type="date"
                  value={form.values.birthDate}
                  onChange={form.handleChange}
                  error={form.errors.birthDate}
                />

                <FormInput
                  label="Role"
                  name="role"
                  placeholder="Youcef Bouhafs"
                  value={form.values.role}
                  onChange={form.handleChange}
                />

                <FormInput
                  label="Cv"
                  name="cv"
                  placeholder="Youcef Bouhafs"
                  value={form.values.cv}
                  onChange={form.handleChange}
                />

                {/* Row 3 */}
                <FormInput
                  label="Skills"
                  name="skills"
                  placeholder="Youcef Bouhafs"
                  value={form.values.skills}
                  onChange={form.handleChange}
                />

                <FormInput
                  label="City"
                  name="city"
                  placeholder="Youcef Bouhafs"
                  value={form.values.city}
                  onChange={form.handleChange}
                />

                <FormInput
                  label="Address"
                  name="address"
                  placeholder="Youcef Bouhafs"
                  value={form.values.address}
                  onChange={form.handleChange}
                />

                {/* Row 4 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">My phone number</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">📞</span>
                    <input
                      type="tel"
                      name="phone"
                      value={form.values.phone}
                      onChange={form.handleChange}
                      className="w-full pl-10 pr-3 py-3 rounded border border-gray-300 bg-gray-50 focus:border-[#3F6E57] focus:outline-none"
                      placeholder="+213 555 76 54 32"
                    />
                  </div>
                  {form.errors.phone && (
                    <div className="mt-1 text-sm text-red-600">{form.errors.phone}</div>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">My email Address</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">✉️</span>
                    <input
                      type="email"
                      name="email"
                      value={form.values.email}
                      onChange={form.handleChange}
                      className="w-full pl-10 pr-3 py-3 rounded border border-gray-300 bg-gray-50 focus:border-[#3F6E57] focus:outline-none"
                      placeholder="bouhafsyoucef21@gmail.com"
                    />
                  </div>
                  {form.errors.email && (
                    <div className="mt-1 text-sm text-red-600">{form.errors.email}</div>
                  )}
                </div>
              </div>

              {/* Save Button */}
              <div className="mt-8 flex justify-end">
                <button
                  type="submit"
                  disabled={form.isSubmitting}
                  className="px-6 py-3 bg-[#3F6E57] text-white rounded-lg hover:bg-[#2F5E47] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {form.isSubmitting ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>

            {/* Password Change Section */}
            <div className="px-6 pb-6">
              <button
                onClick={() => setPasswordSectionOpen(!passwordSectionOpen)}
                className="w-full flex items-center justify-between p-4 text-left text-gray-700 hover:bg-gray-50 rounded-lg border border-gray-200"
              >
                <span className="font-medium">Change your password</span>
                <svg
                  className={`w-5 h-5 transition-transform ${passwordSectionOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {passwordSectionOpen && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Old password</label>
                    <div className="relative">
                      <input
                        type="password"
                        value={passwordForm.oldPassword}
                        onChange={(e) => handlePasswordChange('oldPassword', e.target.value)}
                        className="w-full pr-10 pl-3 py-3 rounded border border-gray-300 focus:border-[#3F6E57] focus:outline-none"
                        placeholder="••••••••••"
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      >
                        👁️
                      </button>
                    </div>
                    <div className="mt-1 text-right">
                      <button type="button" className="text-sm text-blue-600 hover:underline">
                        Forgot password ? restore it
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">New password</label>
                    <div className="relative">
                      <input
                        type="password"
                        value={passwordForm.newPassword}
                        onChange={(e) => handlePasswordChange('newPassword', e.target.value)}
                        className="w-full pr-10 pl-3 py-3 rounded border border-gray-300 focus:border-[#3F6E57] focus:outline-none"
                        placeholder="••••••••••"
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      >
                        👁️
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Confirm new password</label>
                    <div className="relative">
                      <input
                        type="password"
                        value={passwordForm.confirmPassword}
                        onChange={(e) => handlePasswordChange('confirmPassword', e.target.value)}
                        className="w-full pr-10 pl-3 py-3 rounded border border-gray-300 focus:border-[#3F6E57] focus:outline-none"
                        placeholder="••••••••••"
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      >
                        👁️
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={handlePasswordSubmit}
                      className="px-6 py-2 bg-[#3F6E57] text-white rounded hover:bg-[#2F5E47] transition-colors"
                    >
                      Change Password
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}