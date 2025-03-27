"use client";

import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

interface Location {
  id: number;
  name: string;
  lat: number;
  lng: number;
}

const FoodTruckMap: React.FC = () => {
  const [L, setL] = useState<any>(null);
  const [customIcon, setCustomIcon] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      import("leaflet").then((leaflet) => {
        setL(leaflet);
        setCustomIcon(
          new leaflet.Icon({
            iconUrl: "https://cdn-icons-png.flaticon.com/512/2942/2942262.png",
            iconSize: [40, 40],
          })
        );
      });
    }
  }, []);

  // Coordonnées des emplacements du food truck
  const foodTruckLocations: Location[] = [
    { id: 1, name: "Marché de Moselle", lat: -22.2712, lng: 166.4382 },
    { id: 2, name: "Événement au Centre Ville", lat: -22.255, lng: 166.450 },
  ];

  return (
    <section id="food-truck-map" className="py-12">
      <h2 className="text-3xl font-bold text-center text-orange-500 mb-6">
        Nos Emplacements
      </h2>

      <div className="flex justify-center">
        <div className="w-full md:w-3/4 h-96">
          {L && (
            <MapContainer center={[-22.2712, 166.4382]} zoom={13} style={{ height: "100%", width: "100%" }}>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

              {customIcon &&
                foodTruckLocations.map((location) => (
                  <Marker key={location.id} position={[location.lat, location.lng]} icon={customIcon}>
                    <Popup>{location.name}</Popup>
                  </Marker>
                ))}
            </MapContainer>
          )}
        </div>
      </div>
    </section>
  );
};

export default FoodTruckMap;
