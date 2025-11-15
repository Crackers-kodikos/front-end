import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../component/Sidebar'

export default function Settings() {
  const navigate = useNavigate()
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: false,
      sms: true,
      orderUpdates: true,
      newProducts: false,
      marketing: false
    },
    privacy: {
      profileVisibility: 'private',
      dataSharing: false,
      analytics: true
    },
    preferences: {
      language: 'en',
      timezone: 'GMT+1',
      currency: 'DZD',
      theme: 'light'
    }
  })

  const handleSettingChange = (category, key, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value
      }
    }))
  }

  const saveSettings = () => {
    localStorage.setItem('userSettings', JSON.stringify(settings))
    alert('Settings saved successfully!')
  }

  return (
    <div className="min-h-screen bg-[#F6F6EE] font-poppins flex" style={{ fontFamily: 'Poppins' }}>
      <Sidebar />

      <main className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-[#1F6A4A] mb-2">Settings</h1>
              <p className="text-gray-600">Customize your application preferences</p>
            </div>
            <button
              onClick={() => navigate(-1)}
              className="px-4 py-2 text-[#3F6E57] border border-[#3F6E57] rounded hover:bg-[#F6F6EE] transition-colors"
            >
              ← Back
            </button>
          </div>

          <div className="space-y-6">
            {/* Notifications Settings */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Notification Preferences</h2>
              <div className="space-y-4">
                {Object.entries(settings.notifications).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-gray-900 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </div>
                      <div className="text-sm text-gray-600">
                        {key === 'email' && 'Receive notifications via email'}
                        {key === 'push' && 'Browser push notifications'}
                        {key === 'sms' && 'SMS notifications for important updates'}
                        {key === 'orderUpdates' && 'Get notified about order status changes'}
                        {key === 'newProducts' && 'Notifications about new products'}
                        {key === 'marketing' && 'Marketing and promotional emails'}
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={value}
                        onChange={(e) => handleSettingChange('notifications', key, e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#3F6E57]"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Privacy Settings */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Privacy Settings</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Profile Visibility</label>
                  <select
                    value={settings.privacy.profileVisibility}
                    onChange={(e) => handleSettingChange('privacy', 'profileVisibility', e.target.value)}
                    className="w-full p-3 rounded border border-gray-300 focus:border-[#3F6E57] focus:outline-none"
                  >
                    <option value="public">Public</option>
                    <option value="private">Private</option>
                    <option value="friends">Friends Only</option>
                  </select>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-gray-900">Data Sharing</div>
                    <div className="text-sm text-gray-600">Share usage data to improve services</div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.privacy.dataSharing}
                      onChange={(e) => handleSettingChange('privacy', 'dataSharing', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#3F6E57]"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-gray-900">Analytics</div>
                    <div className="text-sm text-gray-600">Help us improve by sharing anonymous usage data</div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.privacy.analytics}
                      onChange={(e) => handleSettingChange('privacy', 'analytics', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#3F6E57]"></div>
                  </label>
                </div>
              </div>
            </div>

            {/* Application Preferences */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Application Preferences</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                  <select
                    value={settings.preferences.language}
                    onChange={(e) => handleSettingChange('preferences', 'language', e.target.value)}
                    className="w-full p-3 rounded border border-gray-300 focus:border-[#3F6E57] focus:outline-none"
                  >
                    <option value="en">English</option>
                    <option value="fr">Français</option>
                    <option value="ar">العربية</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
                  <select
                    value={settings.preferences.timezone}
                    onChange={(e) => handleSettingChange('preferences', 'timezone', e.target.value)}
                    className="w-full p-3 rounded border border-gray-300 focus:border-[#3F6E57] focus:outline-none"
                  >
                    <option value="GMT+1">GMT+1 (Algeria)</option>
                    <option value="GMT">GMT (London)</option>
                    <option value="GMT+2">GMT+2 (Cairo)</option>
                    <option value="GMT-5">GMT-5 (New York)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
                  <select
                    value={settings.preferences.currency}
                    onChange={(e) => handleSettingChange('preferences', 'currency', e.target.value)}
                    className="w-full p-3 rounded border border-gray-300 focus:border-[#3F6E57] focus:outline-none"
                  >
                    <option value="DZD">Algerian Dinar (DZD)</option>
                    <option value="EUR">Euro (EUR)</option>
                    <option value="USD">US Dollar (USD)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Theme</label>
                  <select
                    value={settings.preferences.theme}
                    onChange={(e) => handleSettingChange('preferences', 'theme', e.target.value)}
                    className="w-full p-3 rounded border border-gray-300 focus:border-[#3F6E57] focus:outline-none"
                  >
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                    <option value="auto">Auto</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end">
              <button
                onClick={saveSettings}
                className="px-6 py-3 bg-[#3F6E57] text-white rounded-lg hover:bg-[#2F5E47] transition-colors"
              >
                Save Settings
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}