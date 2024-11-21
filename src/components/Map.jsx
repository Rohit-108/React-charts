import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const customIcon = L.icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/1673/1673188.png",
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
});

const Map = () => {
    const [currentLocation, setCurrentLocation] = useState([28.63977, 77.42302]);
    const [searchQuery, setSearchQuery] = useState("");

    const MapComponent = () => {
        const map = useMap();

        useEffect(() => {
            map.setView(currentLocation, 13);
        }, [currentLocation, map]);

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
                setCurrentLocation([parseFloat(lat), parseFloat(lon)]);
            } else {
                alert("Location not found!");
            }
        } catch (error) {
            console.error("Error fetching location:", error);
        }
    };

    return (
        <div className="mx-10 rounded-s-2xl mb-5">
            <div className="flex ml-5 mb-3">
                <input
                    type="text"
                    placeholder="Search location"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="p-2 w-[200px] border border-1 rounded-lg mr-2"
                />
                <button
                    onClick={handleSearch}
                    className="flex p-2 bg-blue-600 text-white border border-none cursor-pointer rounded-lg"
                >
                    Search
                </button>
            </div>

            <MapContainer
                center={currentLocation}
                zoom={13}
                style={{ height: "100vh", width: "100%" }}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
                />
                <Marker position={currentLocation} icon={customIcon}>
                    <Popup>
                        Current location: {currentLocation[0]}, {currentLocation[1]}
                    </Popup>
                </Marker>
                <MapComponent />
            </MapContainer>
        </div>
    );
};

export default Map;
