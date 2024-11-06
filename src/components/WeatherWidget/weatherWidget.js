import React, {useState, useEffect} from 'react';
import { useStyle } from '@magento/venia-ui/lib/classify';
import defaultClasses from './weatherWidget.module.css';

const DEFAULT_COORDS = {
    lat: 50.0833,
    lon: 19.9167,
};

const WeatherWidget = props => {
    const classes = useStyle(defaultClasses, props.classes);

    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchWeather = async (lat, lon) => {
            try {
                const response = await fetch(
                    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=a2e3341a38ecf5536811dfed17089d30`
                );
                const data = await response.json();
                setWeather(data);
                setLoading(false);
            } catch (error) {
                console.error('Error while fetching weather data:', error);
                setLoading(false);
            }
        };

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    const { latitude, longitude } = position.coords;
                    fetchWeather(latitude, longitude);
                },
                error => {
                    console.warn(
                        'Location not found, using default location:',
                        error
                    );
                    fetchWeather(DEFAULT_COORDS.lat, DEFAULT_COORDS.lon);
                }
            );
        } else {
            console.warn('Geolocation not supported, using default location.');
            fetchWeather(DEFAULT_COORDS.lat, DEFAULT_COORDS.lon);
        }
    }, []);

    if (loading) return <p>Loading weather...</p>;
    if (!weather) return <p>Unable to load weather data.</p>;

    const tempCelcius = Math.round(weather.main.temp * 2) / 2
    const tempFahrenheit = Math.round((weather.main.temp * 9/5 + 32) * 10) / 10;

    return (
        <div className={classes.weatherWidget}>
            <p className={classes.weatherCity}>{`${weather.name}, ${weather.sys.country}`}</p>
            <div className={classes.weatherWidgetInfoContainer}>
                <img
                    className={classes.weatherIcon}
                    src={`https://openweathermap.org/img/wn/${
                        weather.weather[0].icon
                    }@2x.png`}
                    alt={weather.weather[0].description}
                />
                <p className={classes.weatherTemperature}>{`${tempCelcius}°C (${tempFahrenheit}°F)`}</p>
            </div>
        </div>
    );
};

export default WeatherWidget;
