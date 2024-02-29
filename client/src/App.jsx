import React, { useEffect, useState } from "react";

const App = () => {
  const [item, setItem] = useState("{}");

  useEffect(() => {
    fetch("/api")
      .then((response) => response.json())
      .then((data) => {
        setItem(data);
      });
  }, []);
  return (
    <div>
      <h2>App</h2>
    </div>
  );
};
export default App;
