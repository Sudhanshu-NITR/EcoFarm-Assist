'use client'
import { Leaf, Cloud, MessageCircle, User, BarChart3, Droplet } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const Dashboard = () => {
  return (
      <div className="flex-1 p-6 overflow-auto">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-extrabold tracking-tight text-blue-100">Dashboard Overview</h2>
              <div className="h-10 w-10 bg-teal-500 rounded-full flex items-center justify-center">
                <Droplet className="h-5 w-5 text-white" />
              </div>
            </div>
            
            <div className="h-1 w-32 bg-gradient-to-r from-blue-400 to-teal-400 rounded-full"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="bg-slate-800 border-slate-700 shadow-lg hover:border-blue-500 transition-all">
                <CardHeader className="pb-2">
                  <CardTitle className="text-blue-100 flex items-center">
                    <Leaf className="mr-2 h-5 w-5 text-teal-400" />
                    Latest Crop Advice
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-slate-700 p-4 rounded-md border border-slate-600">
                    <h3 className="text-lg font-medium text-slate-200">Recommended Crop: <span className="text-teal-400">Wheat 🌾</span></h3>
                    <p className="text-slate-300 mt-2">Optimal planting time in your region based on soil conditions and forecasted weather patterns.</p>
                    <Button variant="link" className="mt-2 text-blue-400 hover:text-blue-300 p-0">View detailed analysis</Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-slate-800 border-slate-700 shadow-lg hover:border-blue-500 transition-all">
                <CardHeader className="pb-2">
                  <CardTitle className="text-blue-100 flex items-center">
                    <Cloud className="mr-2 h-5 w-5 text-blue-400" />
                    Weather Update
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-slate-700 p-4 rounded-md border border-slate-600">
                    <h3 className="text-lg font-medium text-slate-200">Rain Expected Tomorrow <span className="text-blue-400">☔</span></h3>
                    <p className="text-slate-300 mt-2">Precipitation: 80% chance. Consider adjusting your irrigation schedule accordingly.</p>
                    <Button variant="link" className="mt-2 text-blue-400 hover:text-blue-300 p-0">See 7-day forecast</Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-slate-800 border-slate-700 shadow-lg hover:border-blue-500 transition-all">
                <CardHeader className="pb-2">
                  <CardTitle className="text-blue-100 flex items-center">
                    <Droplet className="mr-2 h-5 w-5 text-blue-400" />
                    Soil Insights
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-slate-700 p-4 rounded-md border border-slate-600">
                    <h3 className="text-lg font-medium text-slate-200">pH Level: <span className="text-green-400">6.8 - Ideal for crops ✅</span></h3>
                    <p className="text-slate-300 mt-2">Nitrogen levels are optimal. Potassium may need supplementation within 2 weeks.</p>
                    <Button variant="link" className="mt-2 text-blue-400 hover:text-blue-300 p-0">View soil health report</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
              <Card className="bg-slate-800 border-slate-700 shadow-lg hover:border-blue-500 transition-all">
                <CardHeader>
                  <CardTitle className="text-blue-100 flex items-center">
                    <BarChart3 className="mr-2 h-5 w-5 text-blue-400" />
                    Yield Forecast
                  </CardTitle>
                  <CardDescription className="text-slate-400">Projected harvest based on current conditions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-slate-700 p-4 rounded-md border border-slate-600 h-48 flex items-center justify-center">
                    <p className="text-slate-300">Yield visualization chart would appear here</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-slate-800 border-slate-700 shadow-lg hover:border-blue-500 transition-all">
                <CardHeader>
                  <CardTitle className="text-blue-100 flex items-center">
                    <MessageCircle className="mr-2 h-5 w-5 text-blue-400" />
                    Recent AI Insights
                  </CardTitle>
                  <CardDescription className="text-slate-400">Custom recommendations from your AI assistant</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-slate-700 p-4 rounded-md border border-slate-600">
                    <p className="text-slate-300 mb-3">Based on your recent soil samples and weather patterns, consider increasing irrigation by 15% for the next week to maximize crop growth.</p>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">Ask AI Assistant</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )

      </div>
  )
}

export default Dashboard