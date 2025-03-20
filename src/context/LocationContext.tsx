'use client'

import { createContext, useContext, useEffect, useState } from "react";

interface Location{
    lat: number;
    lng: number;
    address: string;
}

interface LocationContextType{
    location: Location | null;
    setLocation: (loc: Location) => void;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export const LocationProvider = ({children} : {children : React.ReactNode})=>{
    const [location, setLocation] = useState<Location | null>(null);

    useEffect(()=>{
        const savedLocation = localStorage.getItem('selectedLocation');
        if(savedLocation) setLocation(JSON.parse(savedLocation));
    }, []);

    const updateLocation = (loc: Location) =>{
        setLocation(loc);
        localStorage.setItem("selectedLocation", JSON.stringify(loc));
    };

    return (
        <LocationContext.Provider value={{ location, setLocation: updateLocation}} >
            {children}
        </LocationContext.Provider>
    )
}

export const useLocation = () =>{
    const context = useContext(LocationContext);
    if(!context){
        throw new Error("useLocation must be used within a LocationProvider");
    }

    return context;
}