import React from 'react';

export default function About() {
    return (
        <div>
            {/* Hero Section */}
            <section className="relative h-screen w-full flex items-center justify-center pt-[100px]">
                <div 
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url('/homepageimgs/628B0145-Edited-scaled.jpg.jpeg')` }}
                />
                <div className="absolute inset-0 bg-black/60" />
                
                <div className="relative z-10 text-center px-4">
                    <h1 className="text-white text-5xl md:text-6xl mb-4 tracking-wide" style={{ fontFamily: "'Marcellus', serif", fontWeight: 400 }}>
                        About Velvet Suites
                    </h1>
                    <p className="text-white/90 text-lg md:text-xl" style={{ fontFamily: "'Lato', sans-serif" }}>
                        A luxury boutique hotel in the heart of Kigali City
                    </p>
                </div>
            </section>

            {/* About Us */}
            <section className="bg-white pt-24 pb-16 px-6 text-center">
                <div className="max-w-[800px] mx-auto">
                    <h2 className="text-[#c9a84c] text-[22px] md:text-[26px] mb-8 tracking-[0.2em] font-bold uppercase" style={{ fontFamily: "'Lato', sans-serif" }}>ABOUT US</h2>
                    <p className="text-[#333333] text-[13px] md:text-[14px] leading-[2.2]" style={{ fontFamily: "'Lato', sans-serif" }}>
                        At Velvet suites, we redefine the essence of elegance, comfort, and hospitality. 
                        Nestled in a prime location, our five-star luxury establishment is a sanctuary for travellers 
                        who seek a perfect blend of contemporary style, world-class service, and unforgettable experiences. 
                        Whether you’re staying for business or leisure, Velvet suites promises more than just accommodation – 
                        we deliver moments of excellence.
                    </p>
                </div>
            </section>

            {/* Our Mission */}
            <section className="bg-white py-12 px-6">
                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-start">
                    <div className="pt-4 md:pr-8">
                        <h3 className="text-[#111] text-[36px] md:text-[42px] mb-6" style={{ fontFamily: "'Marcellus', serif" }}>Our Mission</h3>
                        <p className="text-[#333333] text-[13px] md:text-[14px] leading-[2.2] mb-6" style={{ fontFamily: "'Lato', sans-serif" }}>
                            To provide exceptional, personalized hospitality that exceeds expectations, 
                            making every guest feel genuinely valued and uniquely cared for. 
                        </p>
                        <p className="text-[#333333] text-[13px] md:text-[14px] leading-[2.2]" style={{ fontFamily: "'Lato', sans-serif" }}>
                            Our mission is to craft experiences that go beyond a typical hotel stay. 
                            We are committed to consistently delivering impeccable service, luxurious comfort, 
                            and authentic care through every detail – from our opulent rooms and gourmet dining 
                            to our warm staff and bespoke guest services. At Velvet suites, every visit is designed 
                            to be a memory worth keeping.
                        </p>
                    </div>
                    <div>
                        <img src="/aboutpage/image_4.jpg" alt="Mission" className="w-full h-auto object-cover block" />
                    </div>
                </div>
            </section>

            {/* Our Vision */}
            <section className="bg-white pt-12 pb-0 px-6">
                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-start">
                    <div className="order-2 md:order-1">
                        <img src="/aboutpage/image_5.jpg" alt="Vision" className="w-full h-[350px] md:h-[450px] object-cover block" />
                    </div>
                    <div className="order-1 md:order-2 pt-4 md:pl-8">
                        <h3 className="text-[#111] text-[36px] md:text-[42px] mb-6" style={{ fontFamily: "'Marcellus', serif" }}>Our Vision</h3>
                        <p className="text-[#333333] text-[13px] md:text-[14px] leading-[2.2] mb-6" style={{ fontFamily: "'Lato', sans-serif" }}>
                            To be the most admired hotel in the hospitality industry, known for our refined elegance, 
                            innovative guest experiences, and dedication to creating a luxurious haven for global travellers. 
                        </p>
                        <p className="text-[#333333] text-[13px] md:text-[14px] leading-[2.2]" style={{ fontFamily: "'Lato', sans-serif" }}>
                            We envision Velvet suites as a destination of choice for discerning guests who value sophistication, 
                            serenity, and exceptional hospitality. Our ambition is to lead in redefining luxury by fusing timeless 
                            charm with modern excellence, all while contributing positively to our community and environment.
                        </p>
                    </div>
                </div>
            </section>

            {/* Chairman's Message */}
            <section className="bg-white pt-0 pb-16 md:pb-32 px-6">
                <div className="max-w-6xl mx-auto relative flex items-center">
                    {/* The Image */}
                    <div className="w-[100%] md:w-[65%]">
                        <img src="/aboutpage/image_6.jpeg" alt="Chairman" className="w-full h-[600px] md:h-[800px] object-cover block" />
                    </div>
                    
                    {/* The Black Box */}
                    <div className="md:absolute md:right-0 md:top-1/2 md:-translate-y-1/2 w-[100%] md:w-[50%] bg-[#0d0d0d] text-white p-10 md:p-14 shadow-2xl z-10 mt-[-50px] md:mt-0 relative">
                        <h3 className="text-3xl md:text-4xl mb-6 text-white" style={{ fontFamily: "'Marcellus', serif" }}>Chairman's Message</h3>
                        <p className="text-[13px] md:text-[14px] leading-[2.2] mb-10 text-[#d4d4d4]" style={{ fontFamily: "'Lato', sans-serif" }}>
                            As the founder of Velvet Suites, I am honored to welcome you to a place where our values—excellence, 
                            authenticity, integrity, innovation, sustainability, and guest-centricity—shape every moment. 
                            Our commitment is to deliver unparalleled luxury with genuine warmth, ensuring your comfort and delight 
                            in every detail. Here, you don’t just stay—you belong. Thank you for choosing Velvet Suites, 
                            where every visit feels like coming home, only better.
                        </p>
                        <div className="text-right flex flex-col items-end">
                            <p className="text-[#c9a84c] text-[11px] md:text-[12px] font-bold tracking-wider uppercase mb-1 flex items-center gap-2" style={{ fontFamily: "'Lato', sans-serif" }}>
                                <span className="text-[#c9a84c] text-[14px] leading-none">-</span> Ally GASANA
                            </p>
                            <p className="text-[#c9a84c] text-[11px] md:text-[12px] tracking-wide uppercase flex items-center gap-2" style={{ fontFamily: "'Lato', sans-serif" }}>
                                <span className="text-[#c9a84c] text-[14px] leading-none">-</span> Chairman of the Board
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Meet Our Team */}
            <section className="bg-white py-20 px-6">
                <div className="max-w-5xl mx-auto">
                    <h3 className="text-[#333] text-[28px] md:text-[32px] mb-8" style={{ fontFamily: "'Marcellus', serif" }}>Meet Our Team</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Member 1 */}
                        <div className="relative group overflow-hidden">
                            <img src="/aboutpage/image_7.jpg" alt="Mazimpaka Emmanuel" className="w-full aspect-[4/5] object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-100" />
                            <div className="absolute bottom-6 left-6 right-6">
                                <p className="text-white text-[9px] uppercase tracking-[0.15em] font-extrabold mb-1" style={{ fontFamily: "'Lato', sans-serif" }}>OPERATIONS MANAGER</p>
                                <p className="text-white text-[17px] font-medium" style={{ fontFamily: "'Lato', sans-serif" }}>Mazimpaka Emmanuel</p>
                            </div>
                        </div>
                        {/* Member 2 */}
                        <div className="relative group overflow-hidden">
                            <img src="/aboutpage/image_8.jpg" alt="Musabyimana Louise" className="w-full aspect-[4/5] object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-100" />
                            <div className="absolute bottom-6 left-6 right-6">
                                <p className="text-white text-[9px] uppercase tracking-[0.15em] font-extrabold mb-1" style={{ fontFamily: "'Lato', sans-serif" }}>HEAD OF CUSTOMER CARE</p>
                                <p className="text-white text-[17px] font-medium" style={{ fontFamily: "'Lato', sans-serif" }}>Musabyimana Louise</p>
                            </div>
                        </div>
                        {/* Member 3 */}
                        <div className="relative group overflow-hidden">
                            <img src="/aboutpage/image_9.jpeg" alt="Uwamahoro Delphine" className="w-full aspect-[4/5] object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-100" />
                            <div className="absolute bottom-6 left-6 right-6">
                                <p className="text-white text-[9px] uppercase tracking-[0.15em] font-extrabold mb-1" style={{ fontFamily: "'Lato', sans-serif" }}>RECEPTIONIST</p>
                                <p className="text-white text-[17px] font-medium" style={{ fontFamily: "'Lato', sans-serif" }}>Uwamahoro Delphine</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Board of Directors */}
            <section className="bg-white pb-24 px-6">
                <div className="max-w-5xl mx-auto">
                    <h3 className="text-[#333] text-[28px] md:text-[32px] mb-8" style={{ fontFamily: "'Marcellus', serif" }}>Board of Directors</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Board 1 */}
                        <div className="relative group overflow-hidden">
                            <img src="/aboutpage/image_10.png" alt="Ally Gasana" className="w-full aspect-[4/5] object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-100" />
                            <div className="absolute bottom-6 left-6 right-6">
                                <p className="text-white text-[9px] uppercase tracking-[0.15em] font-extrabold mb-1" style={{ fontFamily: "'Lato', sans-serif" }}>CHAIRMAN OF THE BOARD</p>
                                <p className="text-white text-[17px] font-medium" style={{ fontFamily: "'Lato', sans-serif" }}>Ally Gasana</p>
                            </div>
                        </div>
                        {/* Board 2 */}
                        <div className="relative group overflow-hidden">
                            <img src="/aboutpage/image_11.png" alt="Olivia Nyirandende" className="w-full aspect-[4/5] object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-100" />
                            <div className="absolute bottom-6 left-6 right-6">
                                <p className="text-white text-[9px] uppercase tracking-[0.15em] font-extrabold mb-1" style={{ fontFamily: "'Lato', sans-serif" }}>BOARD MEMBER</p>
                                <p className="text-white text-[17px] font-medium" style={{ fontFamily: "'Lato', sans-serif" }}>Olivia Nyirandende</p>
                            </div>
                        </div>
                        {/* Board 3 */}
                        <div className="relative group overflow-hidden">
                            <img src="/aboutpage/image_12.png" alt="Edwin Kamanzi" className="w-full aspect-[4/5] object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-100" />
                            <div className="absolute bottom-6 left-6 right-6">
                                <p className="text-white text-[9px] uppercase tracking-[0.15em] font-extrabold mb-1" style={{ fontFamily: "'Lato', sans-serif" }}>BOARD MEMBER</p>
                                <p className="text-white text-[17px] font-medium" style={{ fontFamily: "'Lato', sans-serif" }}>Edwin Kamanzi</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
