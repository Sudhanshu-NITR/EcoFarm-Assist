"use client";
import { createContext, useContext, useEffect, useState } from "react";

interface Location {
    lat: number;
    lng: number;
    address: string;
}

interface LocationContextType {
    location: Location | null;
    setLocation: (loc: Location) => void;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export const LocationProvider = ({ children }: { children: React.ReactNode }) => {
    const [location, setLocation] = useState<Location | null>(null);

    useEffect(() => {
        try {
            const savedLocation = localStorage.getItem("selectedLocation");
            console.log(savedLocation);
            
            if (savedLocation) {
                const parsedLocation: Location = JSON.parse(savedLocation);
                if (parsedLocation?.lat && parsedLocation?.lng) {
                    setLocation(parsedLocation);
                } else {
                    console.warn("Invalid location data in localStorage.");
                }
            }
        } catch (error) {
            console.error("Error loading location from localStorage:", error);
        }
    }, []);

    const updateLocation = (loc: Location) => {
        setLocation(loc);
        localStorage.setItem("selectedLocation", JSON.stringify(loc));
    };

    return (
        <LocationContext.Provider value={{ location, setLocation: updateLocation }}>
            {children}
        </LocationContext.Provider>
    );
};

export const useLocation = () => {
    const context = useContext(LocationContext);
    if (!context) {
        throw new Error("useLocation must be used within a LocationProvider");
    }
    return context;
};