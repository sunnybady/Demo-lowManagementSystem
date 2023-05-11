import React, { useState, useRef, useEffect } from "react";

function VirtualScroll({ data, rowHeight }) {
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef(null);
  const visibleCount = Math.ceil(
    containerRef.current?.clientHeight / rowHeight
  );
  const startIndex = Math.floor(scrollTop / rowHeight);
  const endIndex = startIndex + visibleCount + 1;
  const visibleData = data.slice(startIndex, endIndex);

  function handleScroll(event) {
    setScrollTop(event.target.scrollTop);
  }

  useEffect(() => {
    const container = containerRef.current;
    container.addEventListener("scroll", handleScroll);

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, []);
  console.log(visibleCount, startIndex, endIndex, visibleData);

  return (
    <div ref={containerRef} style={{ overflowY: "auto", height: "100%" }}>
      <div
        style={{ height: `${data.length * rowHeight}px`, position: "relative" }}
      >
        {visibleData.map((item, index) => (
          <div
            key={index}
            style={{
              position: "absolute",
              top: `${(startIndex + index) * rowHeight}px`,
              left: 0,
              right: 0,
            }}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

export default VirtualScroll;
