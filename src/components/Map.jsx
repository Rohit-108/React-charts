import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "../App.css";

const customIcon = L.icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/1673/1673188.png",
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
});


const createCustomClusterIcon = (cluster) => {
    const count = cluster.getChildCount();
    const size =
        count < 10
            ? "small"
            : count < 100
                ? "medium"
                : "large";

    return L.divIcon({
        html: `<div class="custom-cluster-icon ${size}">${count}</div>`,
        className: "custom-cluster",
        iconSize: L.point(40, 40, true),
    });
};


const CurrentLocationMarker = ({ setCurrentLocation }) => {
    const map = useMapEvents({
        locationfound: (location) => {
            const { lat, lng } = location.latlng;
            setCurrentLocation([lat, lng]);
            map.setView([lat, lng], 10);
        },
    });

    useEffect(() => {
        map.locate({ setView: true, maxZoom: 10 });
    }, [map]);

    return null;
};

const Map = () => {
    const [locations, setLocations] = useState([
        { lat: 28.641313436031897, lon: 77.41597015597313, name: "My Location" },
        { lat: 28.7041, lon: 77.1025, name: "Delhi" },
        { lat: 27.1767, lon: 78.0081, name: "Agra" },
        { lat: 26.9124, lon: 75.7873, name: "Jaipur" },
        { lat: 28.5355, lon: 77.3910, name: "Noida" },
    ]);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentLocation, setCurrentLocation] = useState([28.641313436031897, 77.41597015597313]);

    const FitBounds = () => {
        const map = useMap();
        useEffect(() => {
            const bounds = L.latLngBounds(locations.map((loc) => [loc.lat, loc.lon]));
            if (bounds.isValid()) {
                map.fitBounds(bounds);
            }
        }, [locations, map]);
        return null;
    };

    const handleSearch = async () => {
        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${searchQuery}`
            );
            const data = await response.json();

            if (data.length > 0) {
                const { lat, lon } = data[0];
                setLocations([
                    ...locations,
                    { lat: parseFloat(lat), lon: parseFloat(lon), name: searchQuery },
                ]);
                setCurrentLocation([parseFloat(lat), parseFloat(lon)]);
            } else {
                alert("Location not found!");
            }
        } catch (error) {
            console.error("Error fetching location:", error);
        }
    };

    return (
        <div className="mx-auto w-full h-screen">
            <div className="flex top-4 left-4 bg-white shadow-md rounded-lg p-4 z-10">
                <div className="flex space-x-2">
                    <input
                        type="text"
                        placeholder="Search location"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="flex-grow p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                    />
                    <button
                        onClick={handleSearch}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                    >
                        Search
                    </button>
                </div>
            </div>

            {/* Map */}
            <MapContainer
                center={currentLocation}
                zoom={10}
                style={{ height: "100%", width: "100%" }}
                className="rounded-lg shadow-md"
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
                />
                <CurrentLocationMarker setCurrentLocation={setCurrentLocation} />
                <MarkerClusterGroup
                    chunkedLoading
                    iconCreateFunction={createCustomClusterIcon}
                >
                    {locations.map((loc, index) => (
                        <Marker
                            key={index}
                            position={[loc.lat, loc.lon]}
                            icon={customIcon}
                        >
                            <Popup>
                                <strong>{loc.name}</strong>
                                <br />
                                Latitude: {loc.lat.toFixed(6)}
                                <br />
                                Longitude: {loc.lon.toFixed(6)}
                            </Popup>
                        </Marker>
                    ))}
                </MarkerClusterGroup>
                <FitBounds />
            </MapContainer>
        </div>
    );
};

export default Map;
