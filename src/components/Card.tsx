import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CloudSun, LucideIcon } from "lucide-react";

interface CardItemProps {
  icon: LucideIcon;
  title: string;
  description: string;
  content: string;
  buttonText: string;
  buttonLink: string;
  iconColor?: string;
}

const CardItem = ({ icon: Icon, title, description, content, buttonText, buttonLink, iconColor }: CardItemProps) => {
  
  return (
    <Card className="bg-slate-800 border-slate-700 shadow-lg hover:border-blue-500 transition-all">
      <CardHeader className="pb-2">
        <CardTitle className="text-blue-100 flex items-center">
          <CloudSun className={`mr-2 h-5 w-5 ${iconColor || "text-blue-400"}`} />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="bg-slate-700 p-4 rounded-md border border-slate-600">
          <h3 className="text-lg font-medium text-slate-200">{description}{<Icon className={`mr-2 h-5 w-5 ${iconColor || "text-blue-400"}`} />}</h3>
          <p className="text-slate-300 mt-2 whitespace-pre-line">{content}</p>
          <Button variant="link" className="mt-2 text-blue-400 hover:text-blue-300 p-0" onClick={() => window.location.href = buttonLink}>
            {buttonText}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CardItem;