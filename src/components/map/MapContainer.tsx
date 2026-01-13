export default function MapContainer() {
    return (
        <div
            className="rounded-2xl overflow-hidden shadow-2xl border-2 border-gray-200 hover:shadow-3xl transition-shadow duration-300 relative z-0"
            id="map"
            style={{
                height: "500px",
                width: "100%",
            }}
        ></div>
    );
}