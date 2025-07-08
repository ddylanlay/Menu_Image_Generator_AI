import React, { useState } from "react";
import { uploadMenuImage } from "../services/api";
import MenuCard from "./MenuCard";

export default function MenuVisualiser() {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [restaurantName, setRestaurantName] = useState("Menu Visualiser");

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setLoading(true);
    setError("");
    try {
      const data = await uploadMenuImage(file);
      setMenuItems(data.menu);
      setRestaurantName(data.restaurantName || "Menu Visualiser");
    } catch (err) {
      setError(err.message || "Failed to process image");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 1000, margin: "0 auto", padding: 24 }}>
      <h1 style={{ textAlign: "center", fontSize: "2.5rem", marginBottom: 24 }}>{restaurantName}</h1>
      <div style={{ textAlign: "center", marginBottom: 24 }}>
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        {loading && <p style={{ color: "#007bff" }}>Processing image...</p>}
        {error && <p style={{ color: "#dc3545" }}>{error}</p>}
      </div>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: 24
      }}>
        {menuItems.map((item, idx) => (
          <MenuCard key={idx} name={item.name} description={item.description} image={item.image} />
        ))}
      </div>
    </div>
  );
}
