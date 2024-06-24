import { useState } from "react";
import "./App.css";

import Header from "./components/Header";
import TableUsers from "./components/TableUsers";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Form from "./components/Form";

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={[<Header key={1} type='register' />, <Form type="register" textButton='Registrarme' key={2} />]} />
        <Route path="/"  element={ <Header type='Home' /> } />
        <Route path="/login"  element={[ <Header key={1} type='Home' />, <Form type="login" textButton='Iniciar' key={2} /> ]} />
        <Route path="/users"  element={[ <Header key={1} type='Users' />, <TableUsers key={2} /> ]} />

      </Routes>
    </BrowserRouter>
  )
}

export default App;
