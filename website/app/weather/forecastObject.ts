export interface ForecastObject {
    city: {
        id: number,
        name: string,
        coord: {
            lon: number,
            lat: number,
        },
        country: string,
        population: number
    },
    list: Array
}