import { useEffect, useState, useRef } from "react";
import "leaflet/dist/leaflet.css";
import LocationContext from "../../context/location/LocationContext";
import MapContainer from "./MapContainer";
import MapControls from "./MapControls";
import RouteInfoPanel from "./RouteInfoPanel";
import DestinationSelector from "./DestinationSelector";
import LocationsPanel from "./LocationsPanel";
import SelectedLocationInfo from "./SelectedLocationInfo";
import { MapContext } from "../../context/map/MapContext";
import type { MapLocation } from "../../types/map.types";

export default function MapUbication({ changeBackground = false }) {
  const [showLocations, setShowLocations] = useState(false);
  const [showDestinationSelector, setShowDestinationSelector] = useState(false);
  const [showRoutePanel, setShowRoutePanel] = useState(true);

  // Ref para evitar doble inicialización
  const mapInitialized = useRef(false);

  const {
    locations,
    selected,
    setSelected,
    findNearestLocation,
    getMapCenter,
    calculateRealDistance,
  } = LocationContext();

  const {
    map,
    setMap,
    L,
    setL,
    userLocation,
    setUserLocation,
    routeInfo,
    setRoutingControl,
    createRouteToLocation,
    clearRoute,
    clearAll,
    focusLocation,
  } = MapContext();

  // Manejar selección de destino
  const handleDestinationSelect = async (location: MapLocation) => {
    if (!userLocation || !map || !L) {
      return;
    }

    if (!location) {
      return;
    }

    clearRoute();

    const control = await createRouteToLocation(
      L,
      map,
      userLocation.marker,
      userLocation.lat,
      userLocation.lng,
      location,
      setSelected,
      calculateRealDistance,
    );

    if (control) {
      setRoutingControl(control);
      setShowRoutePanel(true);
    }

    setShowDestinationSelector(false);
  };

  // Manejar focus en ubicación
  const handleFocusLocation = (location: MapLocation) => {
    focusLocation(location);
    setSelected(location);
  };

  // Cerrar solo el panel, NO la ruta
  const handleCloseRoutePanel = () => {
    setShowRoutePanel(false);
  };

  useEffect(() => {
    // Prevenir doble inicialización
    if (mapInitialized.current) {
      return;
    }

    mapInitialized.current = true;

    // Cargar CSS de leaflet-routing-machine
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://unpkg.com/leaflet-routing-machine@latest/dist/leaflet-routing-machine.css";
    document.head.appendChild(link);

    import("leaflet").then((LeafletModule) => {
      const LeafletLib = LeafletModule.default;
      setL(LeafletLib);

      const center = getMapCenter();

      // Verificar si el contenedor existe
      const mapContainer = document.getElementById("map");
      if (!mapContainer) {
        return;
      }

      // Limpiar contenedor si tiene contenido previo
      mapContainer.innerHTML = "";

      const mapInstance = LeafletLib.map("map").setView(center, 13);

      LeafletLib.tileLayer(
        "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
        {
          attribution: "<a>Ubicación directa</a>",
        },
      ).addTo(mapInstance);

      setMap(mapInstance);

      // Agregar marcadores
      locations.forEach((location) => {
        const customIcon = LeafletLib.icon({
          iconUrl: location.logo,
          iconSize: [38, 38],
          iconAnchor: [19, 38],
          popupAnchor: [0, -38],
        });

        const marker = LeafletLib.marker([location.lat, location.lng], {
          icon: customIcon,
        }).addTo(mapInstance);

        marker.bindPopup(`<b>${location.name}</b><br>${location.address}`);
        marker.on("click", () => setSelected(location));
      });

      // Ajustar vista
      if (locations.length > 1) {
        const bounds = LeafletLib.latLngBounds(
          locations.map((loc) => [loc.lat, loc.lng]),
        );
        mapInstance.fitBounds(bounds, { padding: [50, 50] });
      }

      const btn = document.getElementById("btn-location");

      if (btn) {
        const handleClick = async () => {
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
              async (pos) => {
                const lat = pos.coords.latitude;
                const lng = pos.coords.longitude;

                // CRÍTICO: Limpiar TODO antes de crear nueva ubicación
                clearAll();

                // Pequeña pausa para asegurar la limpieza
                await new Promise((resolve) => setTimeout(resolve, 100));

                // Agregar nuevo marcador de usuario
                const userMarker = LeafletLib.marker([lat, lng], {
                  icon: LeafletLib.icon({
                    iconUrl:
                      "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
                    shadowUrl:
                      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
                    iconSize: [25, 41],
                    iconAnchor: [12, 41],
                    popupAnchor: [1, -34],
                    shadowSize: [41, 41],
                  }),
                })
                  .addTo(mapInstance)
                  .bindPopup("Tu ubicación actual")
                  .openPopup();

                // Guardar nueva ubicación de usuario
                setUserLocation({ lat, lng, marker: userMarker });

                // Encontrar ubicación más cercana
                const nearestLocation = findNearestLocation(lat, lng);

                // VALIDACIÓN CRÍTICA: Verificar que nearestLocation existe
                if (!nearestLocation) {
                  alert("No se pudo encontrar una ubicación cercana");
                  return;
                }

                // Crear nueva ruta
                const control = await createRouteToLocation(
                  LeafletLib,
                  mapInstance,
                  userMarker,
                  lat,
                  lng,
                  nearestLocation,
                  setSelected,
                  calculateRealDistance,
                );

                if (control) {
                  setRoutingControl(control);
                  setShowRoutePanel(true);
                }

                setShowDestinationSelector(true);
              },
              () => {
                alert("No se pudo obtener tu ubicación");
              },
            );
          } else {
            alert("Tu navegador no soporta geolocalización.");
          }
        };

        btn.addEventListener("click", handleClick);
      }

      return () => {
        if (mapInstance) {
          mapInstance.remove();
        }
        mapInitialized.current = false;
      };
    });
  }, [locations]);

  return (
    <section className={`relative overflow-hidden ${changeBackground ? 'bg-white' : 'bg-slate-200'} py-20 md:py-28`}>
      <style>{`
        .map-section-gradient-top {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 140px;
          background: linear-gradient(
            to bottom,
            rgba(148, 163, 184, 0.2) 0%,
            rgba(148, 163, 184, 0.08) 40%,
            transparent 100%
          );
          pointer-events: none;
          z-index: 1;
        }

        .map-section-gradient-bottom {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 120px;
          background: linear-gradient(
            to bottom,
            transparent 0%,
            rgba(15, 23, 42, 0.04) 50%,
            rgba(15, 23, 42, 0.08) 100%
          );
          pointer-events: none;
          z-index: 1;
        }
      `}</style>
      <div className="map-section-gradient-top" />
      <div className="map-section-gradient-bottom" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <div className="mb-4 md:mb-6 flex justify-center">
            <span className="section-badge bg-blue-50 text-blue-700 px-4 md:px-6 py-2 md:py-3 rounded-full text-xs md:text-sm font-bold tracking-wide uppercase shadow-lg border border-blue-200">
              Ubicación
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-4 leading-tight">
            Encuéntranos
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Visítanos en nuestras {locations.length}{" "}
            {locations.length === 1 ? "ubicación" : "ubicaciones"} o traza tu
            ruta desde donde estés
          </p>
        </div>

        <MapControls
          userLocation={userLocation}
          onToggleDestinations={() =>
            setShowDestinationSelector(!showDestinationSelector)
          }
          onToggleLocations={() => setShowLocations(!showLocations)}
          locationsCount={locations.length}
        />

        <div className="relative">
          <MapContainer />

          {showRoutePanel && (
            <RouteInfoPanel
              routeInfo={routeInfo}
              onClose={handleCloseRoutePanel}
            />
          )}

          <DestinationSelector
            show={showDestinationSelector}
            onClose={() => setShowDestinationSelector(false)}
            userLocation={userLocation}
            onSelectDestination={handleDestinationSelect}
          />

          <LocationsPanel
            show={showLocations}
            onClose={() => setShowLocations(false)}
            onSelectLocation={handleFocusLocation}
          />

          <SelectedLocationInfo
            location={selected}
            onClose={() => setSelected(null)}
          />
        </div>
      </div>
    </section>
  );
}
