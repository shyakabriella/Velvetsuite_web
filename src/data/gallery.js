import roomOne from '../Assets/room one.jpeg';
import roomTwo from '../Assets/room two.jpeg';
import p1 from '../Assets/p1.jpg';
import p3 from '../Assets/p3.jpg';
import p4 from '../Assets/p4.jpg';
import p5 from '../Assets/p5.jpg';
import p6 from '../Assets/p6.jpg';
import p8 from '../Assets/p8.jpg';
import p9 from '../Assets/p9.jpg';
import p10 from '../Assets/p10.jpg';
import nightView from '../Assets/night view.avif';

export const galleryImages = [
    {
        src: roomOne,
        alt: 'Standard Double Room at Velvet Suites Kigali',
        category: 'Rooms',
        span: 'lg:col-span-2 lg:row-span-2',
    },
    {
        src: roomTwo,
        alt: 'Executive Suite at Velvet Suites Kigali',
        category: 'Rooms',
    },
    {
        src: p10,
        alt: 'Plush bedroom interior',
        category: 'Rooms',
    },
    {
        src: p9,
        alt: 'Standard Single Room',
        category: 'Rooms',
    },
    {
        src: p8,
        alt: 'Room with city view',
        category: 'Rooms',
    },
    {
        src: p3,
        alt: 'Twin Room with premium furnishings',
        category: 'Rooms',
    },
    {
        src: p4,
        alt: 'Restaurant & Lounge at Velvet Suites',
        category: 'Dining',
    },
    {
        src: p6,
        alt: 'Dining and bar area',
        category: 'Dining',
        span: 'lg:col-span-2',
    },
    {
        src: nightView,
        alt: 'Night view of Velvet Suites Kigali',
        category: 'Hotel',
    },
    {
        src: p5,
        alt: 'Hotel outdoor area and garden',
        category: 'Hotel',
    },
    {
        src: p1,
        alt: 'Double Suite with Balcony',
        category: 'Rooms',
    },
];

export const galleryCategories = ['All', 'Rooms', 'Hotel', 'Dining'];
