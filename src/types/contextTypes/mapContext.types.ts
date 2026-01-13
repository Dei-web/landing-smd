import type { Dispatch, SetStateAction } from "react";
import type { MapLocation, UserLocation } from "../map.types";

export type LocationContextType = {
    locations: MapLocation[];
    selected: MapLocation | null;
    setSelected: React.Dispatch<React.SetStateAction<MapLocation | null>>;
    isLocationOpen: (location: MapLocation) => boolean;
    getStatusText: (location: MapLocation) => string;
    findNearestLocation: (lat: number, lng: number) => MapLocation | null;
    getMapCenter: () => [number, number];
    calculateRealDistance: (
        lat1: number,
        lng1: number,
        lat2: number,
        lng2: number
    ) => number;
};

export type MapContextType = {
    // Map & Leaflet
    map: unknown | null;
    setMap: Dispatch<SetStateAction<unknown | null>>;

    L: unknown | null;
    setL: Dispatch<SetStateAction<unknown | null>>;

    // User
    userLocation: UserLocation | null;
    setUserLocation: Dispatch<SetStateAction<UserLocation | null>>;

    // Routing
    routingControl: unknown | null;
    setRoutingControl: Dispatch<SetStateAction<unknown | null>>;

    routeInfo: {
        distance: string;
        time: string;
        destination: string;
        straightLineDistance: string;
    } | null;
    setRouteInfo: Dispatch<
        SetStateAction<{
            distance: string;
            time: string;
            destination: string;
            straightLineDistance: string;
        } | null>
    >;

    // Utils
    formatDistance: (meters: number) => string;
    formatTime: (seconds: number) => string;

    // Routing logic
    createRouteToLocation: (
        LeafletLib: unknown,
        mapInstance: unknown,
        userMarker: unknown,
        lat: number,
        lng: number,
        targetLocation: MapLocation,
        setSelected: Dispatch<SetStateAction<MapLocation | null>>,
        calculateRealDistance: (
            lat1: number,
            lng1: number,
            lat2: number,
            lng2: number
        ) => number
    ) => Promise<unknown | null>;

    clearRoute: () => void;
    clearAll: () => void;
    focusLocation: (location: MapLocation) => void;
};
