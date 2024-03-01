import React, { useEffect, useState } from "react";

const App = () => {
  const [item, setItem] = useState("{}");

  useEffect(() => {
    fetch("http://localhost:5000/api")
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setItem(data);
      });
  }, []);
  return (
    <div>
      <h2>{item.message}</h2>
    </div>
  );
};
export default App;
