// hooks
import { useHistory } from "react-router-dom"

// Componentes
import Button from "../components/Button"

// Imagens
import IllustrationImg from "../assets/images/illustration.svg"
import LogoImg from "../assets/images/logo.svg"
import GoogleIconImg from "../assets/images/google-icon.svg"

// CSS
import "../styles/global.scss"
import "../styles/auth.scss"

//Context
import { useAuth } from "../hooks/useAuth"


const Home = () => {

    const history = useHistory();
    const {user, signInWithGoogle} = useAuth();

    async function handleCreateRoom() {
        if (!user) {
            await signInWithGoogle()
        }
        
        history.push("/rooms/new")
    }

    return (
        <div id="PageAuth">

            <aside>
                <img src={IllustrationImg} alt="Ilustrando perguntas e respostas" />
                <strong>
                    Crie suas salas de Q&amp;A ao vivo
                </strong>
                <p>
                    Tire as dúvidas de sua audiência em tempo real
                </p>
            </aside>

            <main>
                <div className="MainContent">
                    <img src={LogoImg} alt="Letmeask" />
                    <button onClick={handleCreateRoom} className="CreateRoom">

                        <img src={GoogleIconImg} alt="Logo da Google" />
                        Crie sua sala com o Google

                    </button>
                    <div className="separator">
                        Ou entre em uma sala
                    </div>
                    <form>
                        <input
                            type="text"
                            placeholder="Digite o código da sala"
                        ></input>
                        <Button type="submit">
                            Entrar na sala
                        </Button>
                    </form>
                </div>
            </main>

        </div>
    )
}

export default Home;