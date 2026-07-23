import React from 'react';

const reviews = [
  {
    name: 'Sarah Johnson',
    location: 'United Kingdom',
    text: '"Absolutely wonderful stay! The staff was incredibly welcoming, the room was pristine, and the food at the restaurant was world-class. Highly recommended for anyone visiting Kigali."',
    rating: 5
  },
  {
    name: 'David Chen',
    location: 'Singapore',
    text: '"A perfect oasis in the city. The swimming pool area is beautiful and relaxing. The proximity to the airport made our transit incredibly easy and stress-free."',
    rating: 5
  },
  {
    name: 'Amina Diop',
    location: 'Senegal',
    text: '"We hosted our corporate event here and everything was flawless. The conference facilities are top-notch and the catering team went above and beyond."',
    rating: 5
  }
];

export default function VelvetReviews() {
  return (
    <section className="py-20 px-4 bg-white" id="reviews-section">
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold text-[#3b0404] mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
          Guest Reviews
        </h2>
        <div className="w-24 h-1 bg-[#c9a84c] mx-auto"></div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {reviews.map((review, idx) => (
          <div key={idx} className="bg-[#faf9f6] p-8 rounded-md shadow-sm relative">
            <div className="text-4xl text-[#c9a84c] absolute top-4 left-4 opacity-50 font-serif">"</div>
            <p className="text-gray-600 italic mb-6 relative z-10 pt-4 leading-relaxed">
              {review.text}
            </p>
            <div className="flex items-center gap-4 border-t border-gray-200 pt-6">
              <div className="w-12 h-12 bg-[#c9a84c] rounded-full flex items-center justify-center text-white font-bold text-xl">
                {review.name.charAt(0)}
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">{review.name}</h4>
                <p className="text-xs text-gray-500">{review.location}</p>
                <div className="text-[#c9a84c] text-sm mt-1">
                  {'★'.repeat(review.rating)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
