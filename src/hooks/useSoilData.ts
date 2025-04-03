import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useLocation } from "@/context/LocationContext";
import SoilData from "@/types/SoilData";

export default function useSoilData() {
    const [soilData, setSoilData] = useState<SoilData | null>(null);
    const { location } = useLocation();
    const lat = location?.lat;
    const lng = location?.lng;

    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedData = localStorage.getItem("soilData");
            if (storedData) {
                setSoilData(JSON.parse(storedData));
            }
        }
    }, []);

    const refreshSoilData = useCallback(async () => {
        if (!lat || !lng) return;

        try {
            const { data } = await axios.get("/api/soil-data", { params: { lat, lng } });
            setSoilData(data);
            console.log("useSoilData -> ", data);
            
            if (typeof window !== "undefined") {  
                localStorage.setItem("soilData", JSON.stringify(data));
            }
        } catch (error) {
            console.error("Error fetching soil data:", error);
        }
    }, [lat, lng]); 

    useEffect(() => {
        refreshSoilData();
    }, [refreshSoilData]);

    return { soilData, refreshSoilData };
}
