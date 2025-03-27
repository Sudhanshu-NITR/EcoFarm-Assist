import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "@/context/LocationContext";
import SoilData from "@/types/SoilData";

export default function useSoilData() {
    const [soilData, setSoilData] = useState<SoilData | null>(null);
    const { location } = useLocation();
    const lat = location?.lat;
    const lng = location?.lng;

    useEffect(() => {
        if (typeof window !== "undefined") {  // Ensure it's running in the browser
            const storedData = localStorage.getItem("soilData");
            if (storedData) {
                setSoilData(JSON.parse(storedData));
            }
        }
    });

    const refreshSoilData = async () => {
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
    };

    useEffect(() => {
        if (lat && lng) {
            refreshSoilData();
        }
    }, [lat, lng]);

    return { soilData, refreshSoilData };
}
