//Componentes
import Home from "./pages/Home";
import NewRoom from "./pages/NewRoom";
import Room from "./pages/Room";
import AdminRoom from "./pages/AdminRoom";

// Router
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Contexto
import AuthContextProvider from "./contexts/AuthContext";


function App() {

  return (
    <Router>

      <AuthContextProvider>
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/home" component={Home} exact/>
          <Route path="/rooms/new" component={NewRoom} exact/>
          <Route path="/rooms/:id" component={Room}/>
          <Route path="/admin/rooms/:id" component={AdminRoom}/>
        </Switch>
      </AuthContextProvider>

    </Router>
  );

  // exact = diz que é exatamente aquele path, caso acessemos uma rota com outra rota com "/"
  // no path, esta seria exibida na tela, não a que queremos acessar (home)
}

export default App;
