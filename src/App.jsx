import React from "react";
import Header from "./components/Header";
import supabase from "./supabaseClient";

const App = () => {
  console.log(supabase);
  return (
    <div>
      <Header />
    </div>
  );
};

export default App;
