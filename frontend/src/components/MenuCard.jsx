import React from "react";

export default function MenuCard({ name, description, image }) {
  return (
    <div style={{
      borderRadius: 12,
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      background: "#fff",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    }}>
      <img
        src={image}
        alt={name}
        style={{
          width: "100%",
          height: 180,
          objectFit: "cover"
        }}
      />
      <div style={{ padding: 16, width: "100%" }}>
        <h2 style={{
          background: "#a00",
          color: "#fff",
          textAlign: "center",
          margin: "0 0 12px 0",
          padding: "8px 0",
          borderRadius: 6,
          fontSize: "1.2rem"
        }}>{name}</h2>
        <p style={{ color: "#333", textAlign: "center", margin: 0 }}>{description}</p>
      </div>
    </div>
  );
}