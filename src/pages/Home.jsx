import React from "react";

import VelvetHero from "../components/home/VelvetHero";
import VelvetWelcome from "../components/home/VelvetWelcome";
import VelvetMissionVision from "../components/home/VelvetMissionVision";
import VelvetRooms from "../components/home/VelvetRooms";
import VelvetLeadership from "../components/home/VelvetLeadership";
import VelvetRestaurant from "../components/home/VelvetRestaurant";
import VelvetFacilities from "../components/home/VelvetFacilities";
import VelvetReviews from "../components/home/VelvetReviews";
import VelvetReservationCTA from "../components/home/VelvetReservationCTA";
import WhatsAppFloat from "../components/WhatsAppFloat";
import ScrollReveal from "../components/ScrollReveal";

export default function Home() {
  return (
    <div className="vs-page">
      <VelvetHero />
      <VelvetWelcome />
      <VelvetMissionVision />

      <ScrollReveal>
        <VelvetRooms />
      </ScrollReveal>

      <VelvetLeadership />

      <ScrollReveal>
        <VelvetRestaurant />
      </ScrollReveal>

      <ScrollReveal>
        <VelvetFacilities />
      </ScrollReveal>

      <ScrollReveal></ScrollReveal>

      <ScrollReveal>
        <VelvetReviews />
      </ScrollReveal>

      <ScrollReveal>
        <VelvetReservationCTA />
      </ScrollReveal>

      <WhatsAppFloat />
    </div>
  );
}
