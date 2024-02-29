import { useEffect, useState } from "react";

// import axios from "axios";

const url = "/api";

const App = () => {
  const [backUser, setbackUser] = useState({});

  const fetchData = async () => {
    try {
      const response = await axios("/api");
      const data = response.data;
      console.log(data);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    fetchData();
    setbackUser(data);
  }, []);

  return (
    <div>
      <h2>App</h2>;
      {backUser.users.map((user, i) => {
        return <h2 key={i}>{user}</h2>;
      })}
    </div>
  );
};
export default App;
