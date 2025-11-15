import React, { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import './BoutiqueSuccess.css'

export default function BoutiqueSuccess() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const action = searchParams.get('action') || 'created' // 'created' or 'updated'

  useEffect(() => {
    // Auto-redirect after 5 seconds
    const timer = setTimeout(() => {
      navigate('/boutiques')
    }, 5000)

    return () => clearTimeout(timer)
  }, [navigate])

  const getMessage = () => {
    return action === 'updated' 
      ? 'You have successfully updated a boutique'
      : 'You have successfully created a boutique'
  }

  const getTitle = () => {
    return action === 'updated' 
      ? '✨ Updated Successfully! ✨'
      : '🎉 Congratulations! 🎉'
  }

  return (
    <div className="min-h-screen bg-[#F6F6EE] flex items-center justify-center relative overflow-hidden" style={{ fontFamily: 'Poppins' }}>
      {/* Confetti Animation */}
      <div className="confetti-container">
        {Array.from({ length: 60 }, (_, i) => (
          <div
            key={i}
            className={`confetti confetti-${(i % 5) + 1}`}
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${3 + Math.random() * 3}s`,
              transform: `rotate(${Math.random() * 360}deg)`
            }}
          />
        ))}
      </div>

      {/* Balloons */}
      <div className={`balloon balloon-left ${action === 'updated' ? 'balloon-updated' : ''}`}>
        <div className="balloon-body"></div>
        <div className="balloon-string"></div>
      </div>

      <div className={`balloon balloon-right ${action === 'updated' ? 'balloon-updated' : ''}`}>
        <div className="balloon-body"></div>
        <div className="balloon-string"></div>
      </div>

      {/* Success Content */}
      <div className="text-center z-10 relative">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-[#1F6A4A] mb-4 animate-bounce">
            {getTitle()}
          </h1>
          <p className="text-2xl md:text-3xl text-[#2F5E47] font-semibold">
            {getMessage()}
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/boutiques')}
              className="px-8 py-3 bg-[#3F6E57] text-white rounded-lg text-lg font-semibold hover:bg-[#2F5E47] transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Back to My Boutiques
            </button>
            
            <button
              onClick={() => navigate('/')}
              className="px-8 py-3 bg-white text-[#3F6E57] border-2 border-[#3F6E57] rounded-lg text-lg font-semibold hover:bg-[#F6F6EE] transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Back to home page
            </button>
          </div>
          
          <div className="text-sm text-gray-600">
            <p>Redirecting to boutiques automatically in 5 seconds...</p>
          </div>
        </div>

        {/* Additional celebration elements */}
        <div className="mt-8 flex justify-center space-x-4 text-4xl animate-pulse">
          {action === 'updated' ? (
            <>
              <span>✨</span>
              <span>🔄</span>
              <span>✅</span>
              <span>🔄</span>
              <span>✨</span>
            </>
          ) : (
            <>
              <span>🎊</span>
              <span>✨</span>
              <span>🎈</span>
              <span>✨</span>
              <span>🎊</span>
            </>
          )}
        </div>
      </div>
    </div>
  )
}