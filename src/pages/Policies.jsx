import React, { useEffect } from 'react';

export default function Policies() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div style={{ background: '#fff', minHeight: '100vh', paddingBottom: '4rem' }}>
            {/* Hero Section */}
            <section style={{
                position: 'relative',
                width: '100%',
                height: '420px',
                backgroundImage: `url('/homepageimgs/628B0145-Edited-scaled.jpg.jpeg')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center 30%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                paddingTop: '60px'
            }}>
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'rgba(0,0,0,0.35)',
                    zIndex: 1
                }} />
                
                <h1 style={{
                    position: 'relative',
                    zIndex: 2,
                    fontFamily: "'Marcellus', serif",
                    fontSize: '3.2rem',
                    color: '#fff',
                    fontWeight: 400,
                    textAlign: 'center',
                }}>
                    Policies & Practical Details
                </h1>
            </section>

            {/* Content Section */}
            <section style={{ padding: '4rem 2rem 0' }}>
                <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                    
                    {/* Who we are */}
                    <div style={{ marginBottom: '3rem' }}>
                        <h2 style={{ fontFamily: "'Marcellus', serif", fontSize: '1.8rem', color: '#111', marginBottom: '1.2rem', fontWeight: 400 }}>Who we are</h2>
                        <p style={{ fontFamily: "'Lato', sans-serif", fontSize: '0.95rem', color: '#444', lineHeight: 1.8 }}>
                            Our website address is: https://www.velvetsuites.rw.
                        </p>
                    </div>

                    {/* Check-In / Check-Out */}
                    <div style={{ marginBottom: '3rem' }}>
                        <h2 style={{ fontFamily: "'Marcellus', serif", fontSize: '1.8rem', color: '#111', marginBottom: '1.2rem', fontWeight: 400 }}>Check-In / Check-Out</h2>
                        <ul style={{ listStyleType: 'disc', paddingLeft: '1.2rem', fontFamily: "'Lato', sans-serif", fontSize: '0.95rem', color: '#444', lineHeight: 1.8, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                            <li>Check-In: From 2:00 PM</li>
                            <li>Early Check-In: $20 (if before 10:00 AM)</li>
                            <li>Check-Out: Until 11:00 AM</li>
                            <li>Late Check-Out: Free until 12:00 PM; 50% rate until 3:00 PM</li>
                        </ul>
                    </div>

                    {/* Cancellation Policy */}
                    <div style={{ marginBottom: '3rem' }}>
                        <h2 style={{ fontFamily: "'Marcellus', serif", fontSize: '1.8rem', color: '#111', marginBottom: '1.2rem', fontWeight: 400 }}>Cancellation Policy</h2>
                        <ul style={{ listStyleType: 'disc', paddingLeft: '1.2rem', fontFamily: "'Lato', sans-serif", fontSize: '0.95rem', color: '#444', lineHeight: 1.8, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                            <li>Free cancellation 48+ hours before arrival</li>
                            <li>1-night charge for late cancellations/no-shows</li>
                            <li>30% deposit required for stays of 5+ nights</li>
                        </ul>
                    </div>

                    {/* Accepted Payment Methods */}
                    <div style={{ marginBottom: '3rem' }}>
                        <h2 style={{ fontFamily: "'Marcellus', serif", fontSize: '1.8rem', color: '#111', marginBottom: '1.2rem', fontWeight: 400 }}>Accepted Payment Methods</h2>
                        <ul style={{ listStyleType: 'disc', paddingLeft: '1.2rem', fontFamily: "'Lato', sans-serif", fontSize: '0.95rem', color: '#444', lineHeight: 1.8, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                            <li>Credit Cards (Visa / MasterCard / Amex) – 3% fee</li>
                            <li>Bank Transfer (for groups)</li>
                            <li>
                                Online Payment Link<br />
                                Cash in USD or RWF
                            </li>
                        </ul>
                    </div>

                </div>
            </section>
        </div>
    );
}
