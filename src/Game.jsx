import React, { useState } from "react";
import "./Game.css";
import icons from "./images";

export default function Game() {
  const [widgets, setWidgets] = useState([]);

  function handleOnDrag(e, name) {
    e.dataTransfer.setData("characterName", name);
  }

  function handleOnDrop(e) {
    const name = e.dataTransfer.getData("characterName");
    setWidgets(prev => [...prev, name]);
  }

  function handleDragOver(e) {
    e.preventDefault();
  }

  return (
    <div className="App">
      <div className="widgets">
        <div
          className="widget"
          draggable
          onDragStart={(e) => handleOnDrag(e, "c0")}
        >
          Widget A
        </div>
        <div
          className="widget"
          draggable
          onDragStart={(e) => handleOnDrag(e, "c1")}
        >
          Widget B
        </div>
      </div>
      <div className="page" onDrop={handleOnDrop} onDragOver={handleDragOver}>
        {widgets.map((widget, index) => (
          <img
            key={index}
            className="dropped-widget"
            //src={`assets/${widget}.png`}
            src={icons[widget]}
          />
        ))}
      </div>
    </div>
  );
}