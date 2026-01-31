"use client";

interface MapProps {
  trees?: Array<{ lat: number; lng: number }>;
  center?: { lat: number; lng: number };
}

export default function Map({ trees, center }: MapProps) {
  // Use provided center or default to first tree location or fallback
  const mapCenter = center || (trees && trees.length > 0 ? trees[0] : { lat: 17.183633, lng: 78.20529 });

  // Build Google Maps embed URL with center coordinates
  // Format: https://www.google.com/maps?q=lat,lng&z=zoom
  const mapUrl = `https://www.google.com/maps?q=${mapCenter.lat},${mapCenter.lng}&z=18&output=embed`;

  return (
    <div className="w-full md:h-[475px] h-[338px] rounded-[16px] overflow-hidden">
      <iframe
        src={mapUrl}
        width="100%"
        height="100%"
        className="rounded-[16px] border-0"
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
