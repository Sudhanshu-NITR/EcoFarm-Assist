import React from 'react';
import { User } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useSession } from 'next-auth/react';

const UserInfoCard: React.FC = () => {

    const {data: session} = useSession();

    return (
        <Card className="bg-slate-800 border-slate-700 shadow-lg hover:border-blue-500 transition-all">
            <CardHeader className="pb-1 pt-3">
                <CardTitle className="text-blue-100 flex items-center text-lg">
                    <User className="mr-2 h-4 w-4 text-blue-400" />
                    User Information
                </CardTitle>
            </CardHeader>
            <CardContent className="py-3">
                <div className="flex items-center space-x-3">
                    <div className="h-12 w-12 bg-gradient-to-br from-blue-500 to-teal-600 rounded-full flex items-center justify-center">
                        <User className="h-6 w-6 text-white" />
                    </div>
                    <div>
                        <h3 className="text-base sm:text-lg font-bold text-slate-200">{session?.user.name}</h3>
                        <p className="text-slate-400 text-sm">{session?.user.email}</p>
                        <p className="text-slate-500 text-xs">Member since:</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default UserInfoCard;