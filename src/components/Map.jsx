import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MapContainer, TileLayer, Marker, Popup, useMap, Polygon } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import { polygonCoordinates } from "../utills/contest";
import { setCurrentLocation, setSuggestions } from "../store/mapSlice";

const customIcon = L.icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/1673/1673188.png",
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
});

const Map = () => {
    const dispatch = useDispatch();
    const currentLocation = useSelector((state) => state.map.currentLocation);
    const locations = useSelector((state) => state.map.locations)
    const suggestions = useSelector((state) => state.map.suggestions);

    const [searchQuery, setSearchQuery] = useState("");
    const [isFocused, setIsFocused] = useState(false);

    const fetchSuggestions = async (query) => {
        const response = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${searchQuery}`
        );
        const data = await response.json();
        dispatch(setSuggestions(data));
    };

    const handleSearchInputChange = (e) => {
        const value = e.target.value;
        setSearchQuery(value);
        fetchSuggestions(value);
    };

    const handleSelectSuggestion = (suggestion) => {
        setSearchQuery(suggestion.display_name);
        dispatch(setCurrentLocation([parseFloat(suggestion.lat), parseFloat(suggestion.lon)]));
        dispatch(setSuggestions([]));
    };

    const handleShowMyLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    dispatch(setCurrentLocation([latitude, longitude]));
                },
                (error) => {
                    console.error("Error fetching location:", error);
                    alert("Could not get your location.");
                }
            );
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    };

    const MapComponent = () => {
        const map = useMap();

        useEffect(() => {
            map.setView(currentLocation, 13);
        }, [currentLocation, map]);

        return null;
    };


    return (
        <div className="mx-5 mb-10 rounded-2xl shadow-lg bg-white p-5 ">
            <div className="flex flex-row justify-center gap-x-3  mb-5 relative">
                <div className="relative flex gap-x-3 ">
                    <input
                        type="text"
                        placeholder="Search location"
                        value={searchQuery}
                        onChange={handleSearchInputChange}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        className="w-[500px] h-10 border border-gray-300 rounded-lg px-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    {(isFocused || searchQuery.length > 0) && suggestions.length > 0 && (
                        <div className="absolute bg-white border border-gray-200 rounded-lg shadow-lg mt-1 w-[500px] z-10">
                            {suggestions.map((suggestion, index) => (
                                <div
                                    key={index}
                                    className="p-2 hover:bg-gray-100 cursor-pointer"
                                    onClick={() => handleSelectSuggestion(suggestion)}
                                >
                                    {suggestion.display_name}
                                </div>
                            ))}
                        </div>
                    )}
                    <button
                        onClick={() => fetchSuggestions(searchQuery)}
                        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md"
                    >
                        Search
                    </button>
                    <button
                        onClick={handleShowMyLocation}
                        className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg shadow-md"
                    >
                        Show My Location
                    </button>


                </div>


            </div>

            <MapContainer
                center={currentLocation}
                zoom={13}
                style={{ height: "500px", width: "100%" }}
                className="relative rounded-lg overflow-hidden shadow-lg"
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
                />
                <MarkerClusterGroup>
                    {locations.map((loc, index) => (
                        <Marker key={index} position={[loc.lat, loc.lon]} icon={customIcon}>
                            <Popup>{loc.name}</Popup>
                        </Marker>
                    ))}
                </MarkerClusterGroup>
                <Marker position={currentLocation} icon={customIcon}>
                    <Popup>You are here</Popup>
                </Marker>
                <Polygon
                    positions={polygonCoordinates}
                    color="blue"
                    weight={2}
                    opacity={0.8}
                    fillColor="blue"
                    fillOpacity={0.3}
                />
                <MapComponent />
            </MapContainer>
        </div>
    );
};

export default Map;
