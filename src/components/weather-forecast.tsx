import { ForecastData } from "@/api/types"
import { format } from "date-fns";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { ArrowDown, ArrowUp, Droplets, Wind } from "lucide-react";

interface WeatherForecastProps{
    data: ForecastData;
}

interface DailyForecasts{
    date: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
    wind: number;
    weather:{
        id: number;
        main: string;
        description: string;
        icon: string;
    };
}

const WeatherForecast = ({data} : WeatherForecastProps) => {

    const dailyForecasts = data.list.reduce((acc,forecast) =>{
        const date = format(new Date(forecast.dt *1000), "yyyy-MM-dd");
        if(!acc[date]){
            acc[date] = {
                temp_min : forecast.main.temp_min,
                temp_max : forecast.main.temp_max,
                humidity : forecast.main.humidity,
                wind : forecast.wind.speed,
                weather : forecast.weather[0],
                date : forecast.dt,
            };
        }
        else{
            acc[date].temp_min = Math.min(acc[date].temp_min, forecast.main.temp_min);
            acc[date].temp_max = Math.max(acc[date].temp_max, forecast.main.temp_max);
        }
        return acc;
    },{} as Record<string, DailyForecasts>);

    const nextDays = Object.values(dailyForecasts).slice(0,6);
    const formatTemp = (temp: number)=>`${Math.round(temp)}°`;

  return (
    <Card>
        <CardHeader>
            <CardTitle>5-Day Forecast</CardTitle>
        </CardHeader>
        <CardContent>
            <div className="grid gap-4">
                {nextDays.map((day)=>{
                    return (
                    <div key={day.date} className="flex flex-wrap items-center justify-between gap-4 p-4 border rounded-lg">
                        <div>
                            <p className="font-medium">{format(new Date(day.date*1000), "EEE, MMM d")}</p>
                            <p className="text-sm capitalize text-muted-foreground">{day.weather.description}</p>
                        </div>

                        <div className="flex justify-center gap-4">
                            <span className="flex items-center text-blue-500">
                                <ArrowDown className="w-4 h-4 mr-1"/>
                                {formatTemp(day.temp_max)}
                            </span>
                            <span className="flex items-center text-red-500">
                            <ArrowUp className="w-4 h-4 mr-1"/>
                            {formatTemp(day.temp_max)}
                            </span>
                        </div>

                        <div className="flex justify-end gap-4">
                            <span className="flex items-center gap-1">
                                <Droplets className="w-4 h-4 text-blue-500" />
                                <span className="text-sm">{day.humidity}%</span>
                            </span>

                            <span className="flex items-center gap-1">
                                <Wind className="w-4 h-4 text-blue-500" />
                                <span className="text-sm">{day.wind}m/s</span>
                            </span>
                        </div>

                    </div>
                    );
                })}
            </div>
        </CardContent>
    </Card>
  )
}

export default WeatherForecast
