export interface WeatherData {
  currentWeather: {
    temperature: number;
    humidity: number;
    rainfall: number;
    windSpeed: number;
    icon: string;
    description: string;
  };
  averagedWeather: {
    temperature: number;
    humidity: number;
    rainfall: number;
    windSpeed: number
  }
}