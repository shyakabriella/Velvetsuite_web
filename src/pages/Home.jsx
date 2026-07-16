import VelvetHero from '../components/home/VelvetHero';
import VelvetAbout from '../components/home/VelvetAbout';
import VelvetWelcome from '../components/home/VelvetWelcome';
import VelvetHighlights from '../components/home/VelvetHighlights';
import VelvetRooms from '../components/home/VelvetRooms';
import VelvetAmenities from '../components/home/VelvetAmenities';
import WhatsAppFloat from '../components/WhatsAppFloat';

export default function Home() {
  return (
    <div className="vs-page">
      <VelvetHero />
      <VelvetAbout />
      <VelvetWelcome />
      <VelvetHighlights />
      <VelvetRooms />
      <VelvetAmenities />
      <WhatsAppFloat />
    </div>
  );
}
