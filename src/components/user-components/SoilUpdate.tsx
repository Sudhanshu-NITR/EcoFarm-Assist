import React from 'react'
import Card from '@/components/Card'
import { Droplet } from 'lucide-react'
import useSoilData from '@/hooks/useSoilData';

function SoilUpdate() {
    const { soilData, refreshSoilData } = useSoilData();
    
    return (
        <>
            <Card
                icon={Droplet}
                title="Soil Insights"
                description="pH Level: 6.8 - Ideal for crops ✅"
                content="Nitrogen levels are optimal. Potassium may need supplementation within 2 weeks."
                buttonText="View soil health report"
                buttonLink="/soil-report"
                iconColor="text-blue-400"
            />
        </>
    )
}

export default SoilUpdate
