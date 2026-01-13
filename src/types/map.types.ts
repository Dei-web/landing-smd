export type MapLocation = {
    id: number
    name: string
    lat: number
    lng: number
    address: string
    description: string
    schedule: string
    logo: string
    workDays: Array<number>
    startHour: number
    endHour: number
    googleMapsUrl: string
}

export type UserLocation = {
    lat: number;
    lng: number;
    marker?: unknown; // marcador Leaflet
};

export type RouteInfo = {
    distance: string;
    time: string;
    destination: string;
    straightLineDistance: string;
};