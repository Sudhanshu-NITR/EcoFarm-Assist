'use client';

import { useLocation } from "@/context/LocationContext";
import axios from "axios";
import { useRef, useState, useEffect } from "react";


const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

declare global{
    interface Window{
        google: any;
    }
}

export default function LocationSelector(){
    const { setLocation } = useLocation();
    const [address, setAddress] = useState("");
    const mapRef = useRef<HTMLDivElement>(null);
    const autoCompleteRef = useRef<HTMLDivElement>(null);

    useEffect(()=>{
        const loadGoogleMaps = async () =>{
            if(!window.google){
                const script = document.createElement("script");
                script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`;
                script.async;
                script.onload = initializeMap;
                document.body.appendChild(script);
            }
            else{
                initializeMap();
            }
        }

        const initializeMap = () =>{
            if(!mapRef.current || !autoCompleteRef) return;
            
            const map = new window.google.maps.Map(mapRef.current, {
                center: { lat: 20.5937, lng: 78.9629 }, // Default to India
                zoom: 5,
            });
            const marker = new window.google.maps.Marker({ map, draggable: true});
            map.addListener("click", (event: any) => {
                marker.setPosition(event.latLng);
                fetchAddress(event.latLng.lat(), event.latLng.lng());
            });

            const autocomplete = new window.google.maps.places.Autocomplete(autoCompleteRef.current);
            autocomplete.addListener("places_changed", () =>{
                const place = autocomplete.getPlace();
                if(!place.geometry) return;
                const lat = place.geometry.location.lat();
                const lng = place.geometry.location.lng();
                map.setCenter({lat, lng});
                marker.setPosition({ lat, lng });
                setAddress(place.formatted_address || "");
                setLocation(
                    { 
                        lat, 
                        lng, 
                        address: place.formatted_address || "" 
                    }
                );
            });
        };

        loadGoogleMaps();
    }, []);

    const fetchAddress = async(lat: number, lng: number) =>{
        const response = await axios.get(
            `https://maps.googleapis.com/maps/api/geocode/json`,
            {
              params: {
                latlng: `${lat},${lng}`,
                key: GOOGLE_MAPS_API_KEY,
              },
            }
        );
        const formattedAddress = response.data.results[0]?.formatted_address || "Unknown Location";
        setAddress(formattedAddress);
        setLocation({ lat, lng, address: formattedAddress });
    }

    return(
        <>
            <div className="space-y-4">
                <input 
                    type="text"
                    placeholder="Search location... "
                    className="p-2 w-full border rounded"
                />
                <div ref={mapRef} className="w-full h-64 border rounded"></div>
                {address && <p className="text-sm">Selected Location: {address}</p>}
            </div>
        </>
    )
}