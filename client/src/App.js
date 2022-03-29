import React from "react";
import { BrowserRouter } from 'react-router-dom';
import { useRoutes } from "./routes";

import './App.css';

function App() {
  const routes = useRoutes();
  return (
      <div>
        <BrowserRouter>
          {routes}
        </BrowserRouter>
      </div>
  );
}

export default App;
