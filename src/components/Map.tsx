"use client";

import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

const center = { lat: 17.183633, lng: 78.20529 };

const locations = [
  { lat: 17.183633, lng: 78.20529 },
  { lat: 17.183565, lng: 78.205271 },
  { lat: 17.183427, lng: 78.205236 },
  { lat: 17.183352, lng: 78.20522 },
  { lat: 17.183376, lng: 78.205148 },
  { lat: 17.183447, lng: 78.205164 },
  { lat: 17.183584, lng: 78.205199 },
  { lat: 17.183653, lng: 78.205217 },
  { lat: 17.183793, lng: 78.205254 },
  { lat: 17.183866, lng: 78.205272 },
  { lat: 17.183935, lng: 78.205288 },
  { lat: 17.184006, lng: 78.205307 },
  { lat: 17.184297, lng: 78.20553 },
];

export default function Map() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  });

  if (!isLoaded) return <div>Loading Map...</div>;

  return (
    <div className="w-full md:h-[475px] h-[300px] rounded-xl overflow-hidden">
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "100%" }}
        center={center}
        zoom={18}
      >
        {locations.map((pos, index) => (
          <Marker key={index} position={pos} />
        ))}
      </GoogleMap>
    </div>
  );
}
