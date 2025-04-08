import React, { useEffect, useState } from 'react';
import Card from '@/components/Card';
import { Droplet } from 'lucide-react';
import useSoilData from '@/hooks/useSoilData';
import SoilData from '@/types/SoilData';

function SoilUpdate() {
    const { soilData } = useSoilData();
    const [storedSoilData, setStoredSoilData] = useState(null);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedData = localStorage.getItem("soilData");
            if (storedData) {
                setStoredSoilData(JSON.parse(storedData));
            }
        }
    }, [soilData]);

    const dataToUse = (soilData || storedSoilData) as SoilData;

    if (!dataToUse) {
        return (
            <Card
                Icon={Droplet}
                title="Soil Insights"
                description="pH Level: Loading..."
                content="Loading data..."
                buttonText="View soil health report"
                buttonLink="/coming-soon"
                iconColor="text-blue-400"
            />
        );
    }

    const getPhMessage = (ph: number): string => {
        if (ph < 4.5) return "⚠️ Too acidic - Poor for most crops";
        if (ph >= 4.5 && ph < 5.5) return "⚠️ Strongly acidic - Suitable for acid-loving crops";
        if (ph >= 5.5 && ph < 6.5) return "✅ Slightly acidic - Ideal for most crops";
        if (ph >= 6.5 && ph < 7.5) return "✅ Neutral - Best for most crops";
        if (ph >= 7.5 && ph < 8.5) return "⚠️ Slightly alkaline - Some crops may struggle";
        return "⚠️ Too alkaline - Poor for most crops";
    };

    const getNitrogenMessage = (nitrogen: number): string => {
        if (nitrogen < 50) return "⚠️ Too low - Poor soil fertility";
        if (nitrogen >= 50 && nitrogen < 100) return "⚠️ Moderate - Needs supplementation";
        if (nitrogen >= 100 && nitrogen < 200) return "✅ Optimal - Suitable for most crops";
        return "⚠️ Too high - Risk of excessive vegetative growth";
    };

    return (
        <Card
            Icon={Droplet}
            title="Soil Insights"
            description={`pH Level: ${dataToUse.ph?.toFixed(2)} - ${getPhMessage(dataToUse.ph!)}`}
            content={`Nitrogen Level: ${(dataToUse.nitrogen! / 10).toFixed(2)} mg/kg - ${getNitrogenMessage(dataToUse.nitrogen!)}`}
            buttonText="View soil health report"
            buttonLink="/coming-soon"
            iconColor="text-blue-400"
        />
    );
}

export default SoilUpdate;
