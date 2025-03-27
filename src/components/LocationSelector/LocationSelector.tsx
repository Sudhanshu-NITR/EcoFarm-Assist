"use client";
import { useLocation } from "@/context/LocationContext";
import axios from "axios";
import { useRef, useState, useEffect } from "react";

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
    const loadGoogleMaps = async () => {
      if (!window.google) {
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`;
        script.async = true;
        script.onload = initializeMap;
        document.body.appendChild(script);
      } else {
        initializeMap();
      }
    };

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

    loadGoogleMaps();
  }, []);

  const lastFetchedLocation = { lat: 0, lng: 0 }; // Stores the last fetched location

  const fetchAddress = async (lat: number, lng: number) => {
    if (lastFetchedLocation.lat === lat && lastFetchedLocation.lng === lng) {
      console.log("Skipping API request: Location hasn't changed.");
      return;
    }

    lastFetchedLocation.lat = lat;
    lastFetchedLocation.lng = lng;

    const tempAddress = "Fetching address...";
    setAddress(tempAddress);
    setLocation({ lat, lng, address: tempAddress });

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

  // const fetchAddress = async (lat: number, lng: number) => {
  //   if (lastFetchedLocation?.lat === lat && lastFetchedLocation?.lng === lng) {
  //     console.log("Skipping state update: Location hasn't changed.");
  //     return;
  //   }
  
  //   const tempAddress = `Lat: ${lat?.toFixed(4)}, Lng: ${lng?.toFixed(4)}`;
  
  //   setAddress(tempAddress);
  //   setLocation({ lat, lng, address: tempAddress });
  
  //   console.log("Updated Location:", { lat, lng, address: tempAddress });
  // };
  


  return (
    <>
      <div className="space-y-4">
        <input
          ref={autoCompleteRef}
          type="text"
          placeholder="Search location..."
          className="p-2 w-full border rounded"
        />
        <div ref={mapRef} className="w-full h-64 border rounded"></div>
        {address && <p className="text-sm">Selected Location: {address}</p>}
      </div>
    </>
  );
}
