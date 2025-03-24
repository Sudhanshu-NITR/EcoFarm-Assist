export interface WeatherData {
  currentWeather: {
    temperature: Number;
    humidity: Number;
    rainfall: Number;
    windSpeed: Number;
    icon: String;
    description: String;
  };
  averagedWeather: {
    temperature: Number;
    humidity: Number;
    rainfall: Number;
    windSpeed: Number
  }
}