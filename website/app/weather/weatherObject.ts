export interface WeatherObject {
    id: number;
    name: string;
    weather: {
        id: number,
        main: string,
        description: string,
        icon: string
    };
    coords: {
        lon:string,
        lat: string
    },
    base: string;
    main:{
        temp: float,
        pressure: float,
        humidity: float,
        temp_min: float,
        temp_max: float,
        sea_level: float,
        grnd_leve: float
    },
    wind: {
        speed: float,
        deg: float
    };
    rain:{};
    clouds:{};
}