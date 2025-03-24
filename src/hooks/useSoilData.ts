import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "@/context/LocationContext";

export default function useSoilData(){
    const [soilData, setSoilData] = useState(null);
    const { location } = useLocation();
    const lat = location?.lat;
    const lng = location?.lng;
    
    const refreshSoilData = async () => {
        try {
            const { data } = await axios.get("/api/soil-data", {
                params: {
                    lat,
                    lng
                }
            });
            console.log(data);
            
            setSoilData(data);
        } catch (error) {
            console.error("Error fetching soil data:", error);
        }
    };

    useEffect(() => {
        if (lat && lng) {
            refreshSoilData();
        }
    }, [lat]);

    return { soilData, refreshSoilData };
};
