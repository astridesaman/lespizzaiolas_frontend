import { MapContainer, TileLayer, Marker, Polygon, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useState } from 'react';

const deliveryZone: [number, number][] = [
  [-22.274, 166.448],
  [-22.280, 166.460],
  [-22.290, 166.452],
  [-22.285, 166.440],
];

const deliveryStops: {
  day: string;
  position: [number, number];
  title: string;
  time: string;
}[] = [
  {
    day: 'mardi',
    position: [-22.278, 166.445],
    title: 'Mardi - Place des Cocotiers',
    time: '11h30 - 14h00',
  },
  {
    day: 'jeudi',
    position: [-22.287, 166.455],
    title: 'Jeudi - Centre Commercial Dumbéa',
    time: '18h00 - 21h00',
  },
  {
    day: 'samedi',
    position: [-22.290, 166.442],
    title: 'Samedi - Marché de Païta',
    time: '8h00 - 12h00',
  },
];

const truckIcon = new L.Icon({
  iconUrl: '/icons/pizza-truck.png',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

const DeliverySection = () => {
  const [selectedDay, setSelectedDay] = useState('all');

  const filteredStops =
    selectedDay === 'all' ? deliveryStops : deliveryStops.filter((s) => s.day === selectedDay);

  const routeLine = filteredStops.map((stop) => stop.position);

  return (
    <section className="relative w-full px-4 py-24 bg-gradient-to-br from-[#0f0f0f] via-[#1a1a1a] to-[#111111] text-white border-t border-[#292929]" id="zone-livraison">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,115,0,0.08)_0%,transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(255,255,255,0.03)_0%,transparent_50%)]" />
      </div>

      <div className="relative max-w-6xl mx-auto z-10">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-6 drop-shadow text-primary-pizza">
          Notre Zone de Livraison
        </h2>
        <p className="text-lg text-gray-300 mb-10 max-w-2xl leading-relaxed">
          Suivez le parcours de notre four à bois ambulant et découvrez les points de rendez-vous près de chez vous. Chaque jour, une tournée différente, toujours au plus proche de nos clients !
        </p>

        <div className="flex flex-wrap gap-4 mb-10">
          {['all', 'mardi', 'jeudi', 'samedi'].map((day) => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`px-4 py-2 rounded-full font-medium transition-all duration-200 border border-white/10 hover:bg-primary-pizza/80 ${
                selectedDay === day ? 'bg-primary-pizza text-white shadow-lg' : 'bg-zinc-800 text-gray-300'
              }`}
            >
              {day === 'all' ? 'Tous' : day.charAt(0).toUpperCase() + day.slice(1)}
            </button>
          ))}
        </div>

        <div className="w-full h-[500px] rounded-2xl overflow-hidden shadow-2xl ring-2 ring-primary-pizza/30 mb-16">
          <MapContainer center={[-22.280, 166.450]} zoom={13} scrollWheelZoom={true} className="w-full h-full z-0">
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
            />
            <Polygon positions={deliveryZone} pathOptions={{ color: '#A3E635', fillOpacity: 0.3 }} />
            {filteredStops.map((stop, index) => (
              <Marker key={index} position={stop.position} icon={truckIcon}>
                <Popup>
                  <strong>{stop.title}</strong>
                  <br />
                  {stop.time}
                </Popup>
              </Marker>
            ))}
            {routeLine.length > 1 && (
              <Polyline
                positions={routeLine}
                pathOptions={{ color: '#fb923c', dashArray: '5, 10', weight: 4 }}
              />
            )}
          </MapContainer>
        </div>

        <div className="grid md:grid-cols-2 gap-10 text-gray-200">
          <div>
            <h3 className="text-xl font-semibold mb-2 text-primary-pizza">📍 Périmètre desservi</h3>
            <p className="leading-relaxed">15 km autour de Dumbéa, Nouméa et Païta. Livraison selon la disponibilité et les événements spéciaux.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2 text-primary-pizza"> Jours de tournée</h3>
            <ul className="list-disc list-inside leading-relaxed">
              <li>Mardi – Place des Cocotiers</li>
              <li>Jeudi – Centre Commercial Dumbéa</li>
              <li>Samedi – Marché de Païta</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2 text-primary-pizza"> Horaires</h3>
            <p className="leading-relaxed">11h30 - 14h30 (service du midi)<br />18h00 - 21h00 (service du soir)</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2 text-primary-pizza">Notifications</h3>
            <button className="px-4 py-2 mt-2 rounded-xl bg-primary-pizza text-white font-semibold hover:scale-105 transition">Être notifié à notre arrivée</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeliverySection;
