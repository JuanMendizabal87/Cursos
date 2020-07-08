import React from 'react';
import  { BrowserRouter, Switch, Route } from 'react-router-dom';

import { Dashboard } from './pages/Dashboard';
import { Login } from './pages/Login';
import { Register } from './pages/Register';

import { Home } from "./pages/Home";
import { SoyProfesor } from './pages/SoyAlumno';
import { SoyAlumno } from './pages/SoyProfesor';

import { AuthProvider } from './context/auth-context';
import { PrivateRoute } from './components/PrivateRoute';

// import { Header } from "./components/Header";
// import { Footer } from "./components/Footer";


function App() {
  return (
    <BrowserRouter>
      {/* <Header /> */}
      {/* <SoyAlumno /> */}
      {/* <HomeSlider /> */}
      <AuthProvider>
        <Switch>
          <PrivateRoute exact path="/dashboard">
            <Dashboard />
          </PrivateRoute>
          <Route path="/soy-alumno">
            <SoyProfesor />
          </Route>
          <Route path="/soy-profesor">
            <SoyAlumno />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </AuthProvider>
      {/* <Footer /> */}
    </BrowserRouter>
  );
}

export default App;
