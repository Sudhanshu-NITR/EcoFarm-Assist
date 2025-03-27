import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CloudSun } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

interface ExpandableCardProps {
  title: string;
  description: string;
  content: string;
  buttonText?: string;
  buttonLink?: string;
  Icon?: LucideIcon;
  iconColor?: string;
}

const ExpandableCard: React.FC<ExpandableCardProps> = ({ 
  title, 
  description, 
  content, 
  buttonText, 
  buttonLink,
  Icon, 
  iconColor 
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const displayContent = isExpanded 
    ? content 
    : content.length > 150 
      ? content.slice(0, 150) + '...' 
      : content;

  return (
    <Card className={`
      bg-slate-800 
      border-slate-700 
      shadow-lg 
      hover:border-blue-500 
      transition-all 
      ${isExpanded ? 'expanded' : ''}
    `}>
      <CardHeader className="pb-2">
        <CardTitle className="text-blue-100 flex items-center">
          <CloudSun className={`mr-2 h-5 w-5 ${iconColor || "text-blue-400"}`} />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="bg-slate-700 p-4 rounded-md border border-slate-600">
          <h3 className="text-lg font-medium text-slate-200 flex items-center">
            {description}
            {Icon && (
              <Icon 
                className={`ml-2 h-5 w-5 ${iconColor || "text-blue-400"}`} 
              />
            )}
          </h3>
          <p className={`
            text-slate-300 
            mt-2 
            whitespace-pre-line 
            ${!isExpanded && content.length > 150 ? 'line-clamp-3' : ''}
          `}>
            {displayContent}
          </p>
          
          <div className="flex justify-between items-center mt-2">
            {content.length > 150 && (
                <Button 
                  variant="link" 
                  className="text-blue-400 hover:text-blue-300 p-0" 
                  onClick={() => setIsExpanded(!isExpanded)}
                >
                  {isExpanded ? 'Show Less' : 'Read More'}
                </Button>
              )}
            {buttonText && buttonLink && (
              <Button 
              variant="link" 
              className="text-blue-400 hover:text-blue-300 p-0" 
              onClick={() => (window.location.href = buttonLink)}
              >
                {buttonText}
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExpandableCard;