import React from 'react';

export default function VelvetLocation() {
  return (
    <section className="py-20 px-4 bg-[#faf9f6]" id="location-section">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12">
        {/* Contact Info */}
        <div className="w-full lg:w-1/3 space-y-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#3b0404] mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
              Location & Contact
            </h2>
            <div className="w-16 h-1 bg-[#c9a84c] mb-6"></div>
          </div>
          
          <div className="space-y-6">
            <div className="flex items-start">
              <span className="text-[#c9a84c] text-2xl mr-4">📍</span>
              <div>
                <h4 className="font-semibold text-gray-900">Address</h4>
                <p className="text-gray-600">KK 15 Rd, Kigali, Rwanda</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <span className="text-[#c9a84c] text-2xl mr-4">📞</span>
              <div>
                <h4 className="font-semibold text-gray-900">Phone</h4>
                <a href="tel:+250781423080" className="text-gray-600 hover:text-[#c9a84c] transition-colors">+250 781 423 080</a>
              </div>
            </div>
            
            <div className="flex items-start">
              <span className="text-[#c9a84c] text-2xl mr-4">✉️</span>
              <div>
                <h4 className="font-semibold text-gray-900">Email</h4>
                <a href="mailto:info@velvetsuites.com" className="text-gray-600 hover:text-[#c9a84c] transition-colors">info@velvetsuites.com</a>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-gray-200 space-y-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                <span className="text-[#c9a84c] mr-2">✈️</span> Distance from Airport
              </h4>
              <p className="text-gray-600">Just 5 minutes from Kigali International Airport</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                <span className="text-[#c9a84c] mr-2">🌆</span> Nearby Attractions
              </h4>
              <ul className="text-gray-600 space-y-1">
                <li>• Kigali Convention Centre (10 min)</li>
                <li>• BK Arena (12 min)</li>
                <li>• Kigali Golf Course (15 min)</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="w-full lg:w-2/3 h-[400px] lg:h-[600px] rounded-md overflow-hidden shadow-lg border-2 border-white">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15949.880816041697!2d30.0886111!3d-1.9566667!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19dca685987fb4bf%3A0x6b1ea5b0b2b8e3a2!2sKigali%20International%20Airport!5e0!3m2!1sen!2srw!4v1650000000000!5m2!1sen!2srw" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Hotel Location"
          ></iframe>
        </div>
      </div>
    </section>
  );
}
