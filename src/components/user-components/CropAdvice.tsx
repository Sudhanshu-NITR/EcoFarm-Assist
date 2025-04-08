import React, { useEffect, useState } from 'react'
import Card from "@/components/Card";
import { Leaf, LucideIcon } from 'lucide-react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { LatestAdvice } from '@/types/LatestAdvice';

function CropAdvice() {
    const {data: session} = useSession();
    const [latestAdvice, setLatestAdvice] = useState<LatestAdvice | null>(null);
    
    useEffect(()=>{
        if (!session?.user?._id) return;
        const fetchAdvice = async () =>{
            try {
                const response = await axios.get('/api/get-latest-advice', { 
                    params: { user_id: session?.user._id } 
                });
                const responseData = response.data.data;
                setLatestAdvice(responseData.latestAdvice);
            } catch (error) {
                console.log("Error fetching the latest Advice", error);
            }
        }

        fetchAdvice();
    }, [session]);

    const labelMap: { [key: string]: string } = {
        apple: "🍎", 
        banana: "🍌", 
        blackgram: "🖤", 
        chickpea: "🧆", 
        coconut: "🥥",
        coffee: "☕", 
        cotton: "🧵", 
        grapes: "🍇", 
        jute: "🧶", 
        kidneybeans: "🫘",
        lentil: "🫘", 
        maize: "🌽", 
        mango: "🥭", 
        mothbeans: "🫘", 
        mungbean: "🫘",
        muskmelon: "🍈", 
        orange: "🍊", 
        papaya: "🍈", 
        pigeonpeas: "🫘", 
        pomegranate: "🍎",
        rice: "🍚", 
        watermelon: "🍉"
    };

    return (
        <>
            <Card
                Icon={Leaf as LucideIcon}
                title="Latest Crop Advice"
                description={`Recommended Crop: ${latestAdvice?.crop} ${
                    latestAdvice?.crop !== "None" ? labelMap[latestAdvice?.crop as keyof typeof labelMap] : ""
                }`}
                content={`${latestAdvice?.details}`}
                buttonText="View detailed analysis"
                buttonLink="/coming-soon"
                iconColor="text-teal-400"
            />
        </>
    )
}

export default CropAdvice
