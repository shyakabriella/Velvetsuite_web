export const site = {
    name: 'Velvet Suites',
    tagline: 'Comfort Near the Airport · Kigali, Rwanda',
    subtitle: 'Your Gateway to Unmatched Comfort and Style',
    description: 'Experience comfort and class at Velvet Suites Kigali, just 5 minutes from the airport. Perfect for business or leisure stays with premium hospitality.',
    address: '10 KG 111 Street, Remera, Kigali, Rwanda',
    region: 'Kigali · Rwanda',
    phones: ['+250 780 925 118', '+250 781 423 080'],
    email: 'info@velvetsuites.rw',
    checkIn: '12:00',
    checkOut: '11:00',
    reception: '24-hour concierge',
    roomCount: 20,
    bookingUrl: 'https://www.velvetsuites.rw/',
    apiBase: 'https://api.velvetsuites.rw',
    social: {
        instagram: 'https://www.instagram.com/velve_tsuites/',
        youtube: 'https://www.youtube.com/@VelvetSuitesKigali',
        tripadvisor: 'https://www.tripadvisor.com/Hotel_Review-g293829-d26635262-Reviews-Velvet_Suites-Kigali_Kigali_Province.html',
    },
    distances: {
        parkEntrance: '5 minutes from Kigali International Airport',
        kigaliAirport: '5 km from Kigali International Airport (KGL)',
        driveFromKigali: 'Located in Remera, Kigali city center',
    },
};
export const storageUrl = (path) => `${site.apiBase}/storage/${path.replace(/^\//, '')}`;
