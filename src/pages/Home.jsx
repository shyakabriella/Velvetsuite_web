import React from 'react';
import VelvetHero from '../components/home/VelvetHero';

import VelvetWelcome from '../components/home/VelvetWelcome';
import VelvetRooms from '../components/home/VelvetRooms';
import VelvetRestaurant from '../components/home/VelvetRestaurant';
import VelvetPool from '../components/home/VelvetPool';
import VelvetGym from '../components/home/VelvetGym';
import VelvetWellness from '../components/home/VelvetWellness';
import VelvetBar from '../components/home/VelvetBar';
import VelvetFacilities from '../components/home/VelvetFacilities';
import VelvetEvents from '../components/home/VelvetEvents';
import VelvetGallerySection from '../components/home/VelvetGallerySection';
import VelvetReviews from '../components/home/VelvetReviews';
import VelvetReservationCTA from '../components/home/VelvetReservationCTA';
import WhatsAppFloat from '../components/WhatsAppFloat';
import ScrollReveal from '../components/ScrollReveal';

export default function Home() {
  return (
    <div className="vs-page overflow-x-hidden">
      <VelvetHero />
      <ScrollReveal><VelvetWelcome /></ScrollReveal>
      <ScrollReveal><VelvetRooms /></ScrollReveal>
      <ScrollReveal><VelvetRestaurant /></ScrollReveal>
      <ScrollReveal><VelvetPool /></ScrollReveal>
      <ScrollReveal><VelvetGym /></ScrollReveal>
      <ScrollReveal><VelvetWellness /></ScrollReveal>
      <ScrollReveal><VelvetBar /></ScrollReveal>
      <ScrollReveal><VelvetFacilities /></ScrollReveal>
      <ScrollReveal><VelvetEvents /></ScrollReveal>
      <ScrollReveal><VelvetGallerySection /></ScrollReveal>
      <ScrollReveal><VelvetReviews /></ScrollReveal>
      <ScrollReveal><VelvetReservationCTA /></ScrollReveal>
      <WhatsAppFloat />
    </div>
  );
}
