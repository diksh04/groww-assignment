"use client";

import { useState } from "react";
import Hero from "./components/Hero";
import NavBar from "./components/NavBar";

// import Hero from "./components/Hero";
// import NavBar from "./components/NavBar";
// import Product from "./components/random";
function darkModeHanlder() {
  
}
export default function Home() {
  const [item,setItem] = useState("day");
  return (
    <div >
      <NavBar onToggle={darkModeHanlder}/>
      <Hero />
    </div>
  );
}
