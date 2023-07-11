import React from "react";

export default function Loading() {
  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)",
      }}
    >
      <div className="spinner-border mt-15" role="status">
        <span className="visually-hidden"></span>
      </div>
    </div>
  );
}
