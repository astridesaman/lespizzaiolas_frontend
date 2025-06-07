"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";

interface Location {
  id: number;
  name: string;
  lat: number;
  lng: number;
}

// Import dynamique Leaflet
const MapContainer = dynamic(() => import("react-leaflet").then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then(mod => mod.Popup), { ssr: false });

const FoodTruckMap: React.FC = () => {
  const [L, setL] = useState<typeof import("leaflet") | null>(null);
  const [customIcon, setCustomIcon] = useState<L.Icon | null>(null);

  useEffect(() => {
    import("leaflet").then((leaflet) => {
      setL(leaflet);
      setCustomIcon(
        new leaflet.Icon({
          iconUrl: "\location-pin.png",
          iconSize: [40, 40],
        })
      );
    });
  }, []);

  const foodTruckLocations: Location[] = [
    { id: 1, name: "Marché de Moselle", lat: -22.2712, lng: 166.4382 },
    { id: 2, name: "Événement au Centre Ville", lat: -22.255, lng: 166.450 },
  ];

  return (
    <section id="food-truck-map" className="py-16 px-6">
      <div className="max-w-5xl mx-auto flex flex-col items-center gap-8">
        
        {/* Titre */}
        <h2 className="text-4xl text center font-bold text-orange-500 mb-8">
          Nos Emplacements
        </h2>

        {/* Carte */}
        {L && customIcon && (
          <div className="w-full rounded-2xl overflow-hidden shadow-lg">
            <MapContainer center={[-22.2712, 166.4382]} zoom={13} style={{ height: "400px", width: "100%" }}>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              {foodTruckLocations.map((location) => (
                <Marker key={location.id} position={[location.lat, location.lng]} icon={customIcon}>
                  <Popup>{location.name}</Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        )}

        {/* Infos dessous */}
        <div className="w-full rounded-2xl p-8 shadow-lg text-white space-y-6 text-center">
          <div>
            <h3 className="text-2xl font-semibold mb-2">Adresse :</h3>
            <p>Hôtel de ville,16 rue du général Mangin, BP K1, 98849 Nouméa</p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-2">Horaires :</h3>
            <p>Du lundi au vendredi : 12h - 22h</p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-2">Téléphone :</h3>
            <p>+687 ...</p>
          </div>

        </div>

      </div>
    </section>
  );
};

export default FoodTruckMap;
