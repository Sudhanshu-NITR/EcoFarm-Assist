"use client";
import { useLocation } from "@/context/LocationContext";
import axios from "axios";
import { useRef, useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Navigation } from "lucide-react";

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

declare global {
  interface Window {
    google: any;
  }
}

export default function LocationSelector() {
  const { setLocation } = useLocation();
  const [address, setAddress] = useState("");
  const mapRef = useRef<HTMLDivElement>(null);
  const autoCompleteRef = useRef<HTMLInputElement>(null);
  const markerRef = useRef<any>(null);

  useEffect(() => {
    // Wait until Google Maps is loaded from `layout.tsx`
    const checkGoogleMaps = setInterval(() => {
      if (window.google && window.google.maps) {
        clearInterval(checkGoogleMaps);
        initializeMap();
      }
    }, 500);

    return () => clearInterval(checkGoogleMaps);
  });

  const initializeMap = () => {
    if (!mapRef.current || !autoCompleteRef.current) return;

    const map = new window.google.maps.Map(mapRef.current, {
      center: { lat: 20.5937, lng: 78.9629 }, // Default to India
      zoom: 5,
    });

    const marker = new window.google.maps.Marker({
      map,
      draggable: true,
    });

    markerRef.current = marker;

    map.addListener("click", (event: any) => {
      const { lat, lng } = event.latLng.toJSON();
      marker.setPosition(event.latLng);
      fetchAddress(lat, lng);
    });

    marker.addListener("dragend", () => {
      const { lat, lng } = marker.getPosition().toJSON();
      fetchAddress(lat, lng);
    });

    const autocomplete = new window.google.maps.places.Autocomplete(
      autoCompleteRef.current
    );

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      if (!place.geometry) return;

      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();
      map.setCenter({ lat, lng });
      marker.setPosition({ lat, lng });
      setAddress(place.formatted_address || "");

      setLocation({
        lat,
        lng,
        address: place.formatted_address || "",
      });
    });
  };

  const lastFetchedLocation = { lat: 0, lng: 0 };

  const fetchAddress = async (lat: number, lng: number) => {
    if (lastFetchedLocation.lat === lat && lastFetchedLocation.lng === lng) {
      console.log("Skipping API request: Location hasn't changed.");
      return;
    }

    lastFetchedLocation.lat = lat;
    lastFetchedLocation.lng = lng;

    setAddress("Fetching address...");
    setLocation({ lat, lng, address: "Fetching address..." });

    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json`,
        {
          params: {
            latlng: `${lat},${lng}`,
            key: GOOGLE_MAPS_API_KEY,
          },
        }
      );

      const formattedAddress =
        response.data.results[0]?.formatted_address || "Unknown Location";

      setAddress(formattedAddress);
      setLocation({ lat, lng, address: formattedAddress });

      console.log("Updated Address:", formattedAddress);
    } catch (error) {
      console.error("Error fetching address:", error);
      setAddress("Error fetching address");
      setLocation({ lat, lng, address: "Error fetching address" });
    }
  };

  return (
    <Card className="bg-slate-800 border-slate-700 shadow-lg mt-8 hover:border-blue-500 transition-all">
      <CardHeader className="pb-2">
        <CardTitle className="text-blue-100 flex items-center">
          <MapPin className="mr-2 h-5 w-5 text-blue-400" />
          Location Selector
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="bg-slate-700 p-4 rounded-md border border-slate-600 space-y-4">
          <input
            ref={autoCompleteRef}
            type="text"
            placeholder="Search location..."
            className="p-2 w-full border rounded bg-slate-600 text-slate-200 border-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div ref={mapRef} className="w-full h-64 border rounded border-slate-500"></div>
          {address && (
            <div className="text-sm text-slate-300 flex items-center">
              <Navigation className="mr-2 h-4 w-4 text-blue-400" />
              Selected Location: {address}
            </div>
          )}
          <Button 
            variant="link" 
            className="mt-2 text-blue-400 hover:text-blue-300 p-0"
            onClick={() => {
              // Add any additional action or logging here
              console.log("Location selected:", address);
            }}
          >
            Confirm Location
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}