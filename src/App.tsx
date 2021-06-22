//Componentes
import Home from "./pages/Home";
import NewRoom from "./pages/NewRoom";

// Router
import { BrowserRouter as Router, Route } from "react-router-dom";

// Contexto
import AuthContextProvider from "./contexts/AuthContext";


function App() {

  return (
    <Router>

      <AuthContextProvider>
        <Route path="/" component={Home} exact />
        <Route path="/home" component={Home} />
        <Route path="/rooms/new" component={NewRoom} />
      </AuthContextProvider>

    </Router>
  );

  // exact = diz que é exatamente aquele path, caso acessemos uma rota com outra rota com "/"
  // no path, esta seria exibida na tela, não a que queremos acessar (home)
}

export default App;
