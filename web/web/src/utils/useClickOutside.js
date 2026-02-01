import React, { useEffect, useRef, useState } from "react";

let useClickOutside = (handler) => {
  let domNode = useRef();

  useEffect(() => {
    let maybeHandler = (event) => {
      if (!domNode.current.contains(event.target)) {
        handler();
      }
    };

    document.addEventListener("mousedown", maybeHandler);

    return () => {
      document.removeEventListener("mousedown", maybeHandler);
    };
  });

  return domNode;
};

function App() {
  let [isOpen, setIsOpen] = useState(false);

  let domNode = useClickOutside(() => {
    setIsOpen(false);
  });

  return (
    <>
      <div ref={domNode}>
        <button onClick={() => setIsOpen((isOpen) => !isOpen)}>Options</button>

        <div className={isOpen ? "open" : "d-none"}>
          <p>One</p>
          <p>One</p>
          <p>One</p>
          <p>One</p>
        </div>
      </div>
    </>
  );
}

export default App;
