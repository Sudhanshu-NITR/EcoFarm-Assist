import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "@/context/LocationContext";
import SoilData from "@/types/SoilData";

export default function useSoilData() {
    const [soilData, setSoilData] = useState<SoilData | null>(() => {
        const storedData = localStorage.getItem("soilData");
        return storedData ? JSON.parse(storedData) : null;
    });

    const { location } = useLocation();
    const lat = location?.lat;
    const lng = location?.lng;

    const refreshSoilData = async () => {
        try {
            const { data } = await axios.get("/api/soil-data--change-while-deployment", { params: { lat, lng } });
            setSoilData(data);
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
};
