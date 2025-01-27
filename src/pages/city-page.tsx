import CurrentWeather from "@/components/current-weather";
import HourlyTemperature from "@/components/hourly-temperature";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import WeatherSkeleton from "@/components/ui/loading-skeleton";
import WeatherDetails from "@/components/weather-details";
import WeatherForecast from "@/components/weather-forecast";
import { useWeatherQuery, useForecastQuery } from "@/hooks/use-weather";
import { AlertTriangle } from "lucide-react";
import { useParams, useSearchParams } from "react-router-dom";

const CityPage = () => {
  const [searchParams] = useSearchParams();
  const params = useParams();
  const lat = parseFloat(searchParams.get("lat") || "0");
  const lon = parseFloat(searchParams.get("lon") || "0");

  const coordinates = { lat, lon };

  const weatherQuery = useWeatherQuery(coordinates);
  const forecastQuery = useForecastQuery(coordinates);

  if (weatherQuery.error || forecastQuery.error) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="w-4 h-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
          <p>Failed to fetch weather data. Please try again.</p>
        </AlertDescription>
      </Alert>
    );
  }

  if (!weatherQuery.data || !forecastQuery.data || !params.cityName) {
    return <WeatherSkeleton />;
  }

  return (
    <div className="space-y-4">
      {/* favourite cities */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold tracking-tight">{params.cityName}, {weatherQuery.data.sys.country}</h1>
      </div>

      <div className="grid gap-6">
        <div className="flex flex-col gap-4 lg:flex-row">
          <CurrentWeather data={weatherQuery.data} />
          <HourlyTemperature data={forecastQuery.data} />
        </div>

        <div className="grid items-start gap-6 md:grid-cols-2">
          <WeatherDetails
            data={weatherQuery.data}
          />
          <WeatherForecast data={forecastQuery.data} />
        </div>
      </div>
    </div>
  );
};

export default CityPage;
