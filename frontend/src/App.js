import React from "react";
import { useState,useEffect } from "react";

function App() {
  const [loading,setLoading] = useState(true);

  if(loading)return <h1>Loading.....</h1>
  return (
    <h1>
      welcome to bookings hub
    </h1>
  );
}

export default App;
