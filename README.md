# KLIMATE 🌤️

A modern, feature-rich weather application that provides real-time weather data and forecasts with an intuitive user interface.

## ✨ Features

- **Real-time Weather Data**: Get current weather conditions for any location
- **Extended Forecasts**: View detailed 5-day and hourly weather forecasts
- **Location-based Services**: Automatic location detection using browser geolocation
- **Search Functionality**: Search weather data for cities worldwide
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Dark/Light Mode**: Toggle between themes for optimal viewing
- **Temperature Units**: Switch between Celsius and Fahrenheit
- **Weather Alerts**: Get notified about severe weather conditions

## 🚀 Demo

![Website Overview](public/klimate.mp4)

## 📸 Screenshots

![KLIMATE Dashboard - Dark Mode](public/klimate1)
![Weather Details - Dark Mode](public/klimate2)
![Search Page](public/klimate3)
![KLIMATE Dashboard - Light Mode](public/klimate4)
![Weather Details - Light Mode](public/klimate5)

## 🛠️ Technologies Used

- **Frontend**: React.js
- **Styling**: Tailwind CSS & ShadCN
- **API**: OpenWeatherMap API

## 🏗️ Project Structure

```
KLIMATE/
├── public/
│   ├── index.html
│   └── manifest.json
├── src/
│   ├── components/
│   │   ├── WeatherCard/
│   │   ├── Forecast/
│   │   ├── SearchBar/
│   │   └── Navigation/
│   ├── hooks/
│   │   ├── useWeatherData.js
│   │   └── useLocation.js
│   ├── services/
│   │   ├── weatherAPI.js
│   │   └── locationService.js
│   ├── utils/
│   │   ├── constants.js
│   │   └── helpers.js
│   ├── styles/
│   ├── App.js
│   └── index.js
├── tests/
├── package.json
└── README.md
```

## 🔧 Configuration

### Weather API Setup

1. Sign up for a free account at [OpenWeatherMap](https://openweathermap.org/api)
2. Get your API key from the dashboard
3. Add the key to your environment variables

### Customization Options

- **Theme Colors**: Modify the CSS variables in `src/styles/variables.css`
- **Default Location**: Set in `src/utils/constants.js`
- **API Endpoints**: Configure in `src/services/weatherAPI.js`
- **Units**: Change default units in the settings component

## 🌐 API Integration

This project uses the following APIs:

- **Weather Data**: OpenWeatherMap API
- **Geolocation**: Browser Geolocation API
- **Geocoding**: OpenWeatherMap Geocoding API (optional)

## 📱 Features in Detail

### Current Weather
- Temperature, humidity, pressure, wind speed
- Weather conditions with icons
- "Feels like" temperature
- UV index and visibility

### Forecasts
- Hourly forecast for the next 24 hours
- 5-day extended forecast
- Precipitation probability
- Min/max temperatures

### Location Services
- Automatic location detection
- Manual city search
- Recent search history

## 🙏 Acknowledgments

- Weather data provided by OpenWeatherMap
- Inspiration from various weather applications

## ⭐ Show your support

Give a ⭐️ if this project helped you!

---

Made with ❤️ by [Shivam Chandak](https://github.com/shivamgchandak)
