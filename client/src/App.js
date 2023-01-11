import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";
// import buf from "node:buffer";
// const buff = require("buff");

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/")
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="App">
      <h1> image uploading react</h1>
      <form action="/profile" method="post" enctype="multipart/form-data">
        <input type="file" name="avatar" />
      </form>
      <hr /> 
      {
        //converting buffer -> base64 -> image
        data.map((item) => {
          const base64String = btoa(
            String.fromCharCode(...new Uint8Array(item.img.data.data))
          );

          return (
            <img
              src={`data:image/png;base64,${base64String}`}
              alt=""
              width="300px"
            />
          );
        })
      }
    </div>
  );
}

export default App;
