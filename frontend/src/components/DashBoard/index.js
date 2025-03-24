import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./index.css";

const Dashboard = () => {
  const [cards, setCards] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const token = Cookies.get("jwt_token");
      if (!token) {
        alert("User not logged in");
        navigate("/");
        return;
      }

      const url = "http://localhost:5000/dashboard";
      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const response = await fetch(url, options);
        const data = await response.json();
        console.log(data);

        if (response.ok) {
          setCards(data.cards || []);
        } else {
          alert("Session expired. Please login again.");
          Cookies.remove("jwt_token");
          navigate("/");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [navigate]);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          setError("Location access denied. Please enable location services.");
          console.error(error);
        }
      );
    } else {
      setError("Geolocation is not supported by your browser.");
    }
  }, []);

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-heading">Dashboard</h2>
      <div className="cards-container">
        {cards.length > 0 ? (
          cards.map((card) => (
            <div
              className="map-item"
              key={card.id}
              onClick={() => navigate("/map", { state: { cardData: card } })}
            >
              <h3>{card.title}</h3>
            </div>
          ))
        ) : !userLocation ? ( 
          <p className="paragraph">No cards available</p>
        ) : null}
      </div>

      <div className="map-container">
        <h3>Map View</h3>
        <MapContainer
          center={userLocation || [20.5937, 78.9629]}
          zoom={userLocation ? 13 : 5}
          style={{ height: "250px", width: "700px" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          {userLocation ? (
            <Marker position={[userLocation.lat, userLocation.lng]}>
              <Popup>Your Current Location</Popup>
            </Marker>
          ) : (
            error && <p>{error}</p>
          )}
        </MapContainer>
      </div>
    </div>
  );
};

export default Dashboard;
