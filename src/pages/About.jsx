import React from 'react'

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
          <h1 className="text-4xl font-bold text-[#2f6b4d] mb-6">About Khayt</h1>
          
          <div className="space-y-6">
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">Our Mission</h2>
              <p className="text-gray-600 leading-relaxed">
                Khayt is a revolutionary platform that connects traditional tailors with modern technology, 
                empowering artisans and bringing authentic craftsmanship to the digital age. We bridge the 
                gap between traditional tailoring skills and contemporary fashion needs.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">What We Offer</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium text-[#2f6b4d] mb-2">For Tailors</h3>
                  <ul className="text-gray-600 space-y-1">
                    <li>• Digital presence and portfolio showcase</li>
                    <li>• Order management system</li>
                    <li>• Customer relationship tools</li>
                    <li>• Business growth opportunities</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-[#2f6b4d] mb-2">For Customers</h3>
                  <ul className="text-gray-600 space-y-1">
                    <li>• Access to skilled artisans</li>
                    <li>• Custom clothing solutions</li>
                    <li>• Quality craftsmanship guarantee</li>
                    <li>• Convenient online ordering</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">Our Vision</h2>
              <p className="text-gray-600 leading-relaxed">
                We envision a world where traditional craftsmanship thrives alongside modern innovation, 
                creating sustainable livelihoods for artisans while providing customers with unique, 
                high-quality, personalized products that celebrate cultural heritage and individual style.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">Why Choose Khayt?</h2>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-[#F6F6EE] rounded-lg">
                  <h4 className="font-semibold text-[#2f6b4d] mb-2">Authenticity</h4>
                  <p className="text-sm text-gray-600">Genuine craftsmanship from skilled artisans</p>
                </div>
                <div className="text-center p-4 bg-[#F6F6EE] rounded-lg">
                  <h4 className="font-semibold text-[#2f6b4d] mb-2">Innovation</h4>
                  <p className="text-sm text-gray-600">Modern technology meets traditional techniques</p>
                </div>
                <div className="text-center p-4 bg-[#F6F6EE] rounded-lg">
                  <h4 className="font-semibold text-[#2f6b4d] mb-2">Community</h4>
                  <p className="text-sm text-gray-600">Building connections between artisans and customers</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}