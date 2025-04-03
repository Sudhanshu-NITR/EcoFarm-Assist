"use client";
import { useLocation } from "@/context/LocationContext";
import axios from "axios";
import { useRef, useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Navigation } from "lucide-react";

// Ensure API key is set in .env.local
const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

declare global {
  interface Window {
    google: any;
    initMap: () => void;
  }
}

export default function LocationSelector() {
  const { setLocation } = useLocation();
  const [address, setAddress] = useState("");
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapError, setMapError] = useState("");
  const mapRef = useRef<HTMLDivElement>(null);
  const autoCompleteRef = useRef<HTMLInputElement>(null);
  const markerRef = useRef<any>(null);
  const mapInstanceRef = useRef<any>(null);
  const autocompleteInstanceRef = useRef<any>(null);
  const lastFetchedLocationRef = useRef({ lat: 0, lng: 0 });

  // Load Google Maps script
  useEffect(() => {
    if (typeof window !== "undefined" && !window.google) {
      if (!GOOGLE_MAPS_API_KEY) {
        setMapError("Google Maps API key is missing. Please check your environment variables.");
        return;
      }

      window.initMap = () => setMapLoaded(true);

      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places&callback=initMap&v=weekly`;
      script.async = true;
      script.defer = true;
      script.onerror = () => setMapError("Failed to load Google Maps.");
      document.head.appendChild(script);
    } else if (typeof window !== "undefined" && window.google) {
      setMapLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (mapLoaded && mapRef.current && autoCompleteRef.current) {
      initializeMap();
    }
  }, [mapLoaded]);

  const initializeMap = () => {
    if (!mapRef.current || !window.google?.maps) {
      setMapError("Google Maps initialization failed.");
      return;
    }

    try {
      const map = new window.google.maps.Map(mapRef.current, {
        center: { lat: 20.5937, lng: 78.9629 },
        zoom: 5,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: true,
        zoomControl: true,
      });

      mapInstanceRef.current = map;

      const marker = new window.google.maps.Marker({
        map,
        position: map.getCenter(),
        draggable: true,
        animation: window.google.maps.Animation.DROP,
      });

      markerRef.current = marker;

      map.addListener("click", (event: any) => {
        const position = event.latLng;
        marker.setPosition(position);
        fetchAddress(position.lat(), position.lng());
      });

      marker.addListener("dragend", () => {
        const position = marker.getPosition();
        if (position) {
          fetchAddress(position.lat(), position.lng());
        }
      });

      if (autoCompleteRef.current && window.google.maps.places) {
        const autocomplete = new window.google.maps.places.Autocomplete(autoCompleteRef.current, {
          types: ["geocode", "establishment"],
        });

        autocompleteInstanceRef.current = autocomplete;

        autocomplete.addListener("place_changed", () => {
          const place = autocomplete.getPlace();
          if (!place.geometry?.location) return;

          const { lat, lng } = place.geometry.location;
          map.setCenter({ lat: lat(), lng: lng() });
          map.setZoom(15);
          marker.setPosition({ lat: lat(), lng: lng() });

          const formattedAddress = place.formatted_address || place.name || "Selected Location";
          setAddress(formattedAddress);
          setLocation({ lat: lat(), lng: lng(), address: formattedAddress });
        });
      }
    } catch (error) {
      setMapError("Error initializing map.");
      console.log(error);
      
    }
  };

  const fetchAddress = async (lat: number, lng: number) => {
    if (lastFetchedLocationRef.current.lat === lat && lastFetchedLocationRef.current.lng === lng) return;

    lastFetchedLocationRef.current = { lat, lng };
    setAddress("Fetching address...");
    setLocation({ lat, lng, address: "Fetching address..." });

    try {
      const response = await axios.get(`/api/geocode?lat=${lat}&lng=${lng}`);
      if (response.data?.results?.length > 0) {
        const formattedAddress = response.data.results[0].formatted_address || "Unknown Location";
        setAddress(formattedAddress);
        setLocation({ lat, lng, address: formattedAddress });
      } else {
        throw new Error("No address found.");
      }
    } catch {
      setAddress("Error fetching address");
      setLocation({ lat, lng, address: "Error fetching address" });
    }
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      setAddress("Getting your location...");

      navigator.geolocation.getCurrentPosition(
        ({ coords: { latitude, longitude } }) => {
          if (mapInstanceRef.current && markerRef.current) {
            mapInstanceRef.current.setCenter({ lat: latitude, lng: longitude });
            mapInstanceRef.current.setZoom(15);
            markerRef.current.setPosition({ lat: latitude, lng: longitude });
            fetchAddress(latitude, longitude);
          }
        },
        (error) => {
          setAddress("Could not get your location");
          setMapError(error.message);
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    } else {
      setAddress("Geolocation not supported.");
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
            className="p-2 w-full border rounded bg-slate-600 text-slate-200 border-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search location..."
            disabled={!mapLoaded}
          />

          {!mapLoaded && !mapError && (
            <div className="w-full h-64 flex items-center justify-center border rounded border-slate-500 bg-slate-600">
              <p className="text-slate-300">Loading map...</p>
            </div>
          )}

          {mapError && (
            <div className="w-full h-64 flex items-center justify-center border rounded border-slate-500 bg-slate-600 text-red-300 p-4">
              <p>{mapError}</p>
            </div>
          )}

          <div ref={mapRef} className={`w-full h-64 border rounded border-slate-500 ${!mapLoaded || mapError ? "hidden" : ""}`}></div>

          {address && (
            <div className="text-sm text-slate-300 flex items-center">
              <Navigation className="mr-2 h-4 w-4 text-blue-400" />
              Selected Location: {address}
            </div>
          )}

          <div className="flex space-x-2">
            <Button variant="outline" className="text-blue-400 border-blue-400" onClick={getCurrentLocation} disabled={!mapLoaded || !!mapError}>
              <Navigation className="mr-2 h-4 w-4" />
              Use My Location
            </Button>

            <Button variant="default" className="bg-blue-600 hover:bg-blue-700 text-white" disabled={!address || !mapLoaded}>
              Confirm Location
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
