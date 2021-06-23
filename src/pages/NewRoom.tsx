import { Link, useHistory } from "react-router-dom";

import Button from "../components/Button"

import IllustrationImg from "../assets/images/illustration.svg"
import LogoImg from "../assets/images/logo.svg"

import "../styles/global.scss"
import "../styles/auth.scss"

import { useAuth } from "../hooks/useAuth";

import { FormEvent } from "react";

import { useState } from "react";
import { database } from "../services/firebase";

const NewRoom = () => {

    const { user } = useAuth()

    const history = useHistory();

    const [newRoom, setNewRoom] = useState("")

    async function handleCreateRoom(event: FormEvent) {
        event.preventDefault();

        if (newRoom.trim() === "") {
            return
        } // trim() = strip() em python

        const roomRef = database.ref("rooms");
        
        const firebaseRoom = await roomRef.push({
            title: newRoom,
            authorID: user?.id,
        })


        history.push(`/rooms/${firebaseRoom.key}`)

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
                    <h1>
                        {user?.name}
                    </h1>
                    <h2>
                        Criar uma nova sala
                    </h2>
                    <form onSubmit={handleCreateRoom}>
                        <input
                            type="text"
                            placeholder="Nome da sala"
                            onChange={event => setNewRoom(event.target.value)}
                            value={newRoom}
                        ></input>
                        <Button type="submit">
                            Criar sala
                        </Button>
                    </form>
                    <p>
                        Quer entrar em uma sala existente? <Link to="/home">Clique aqui</Link>
                    </p>
                </div>
            </main>

        </div>
    )
}

export default NewRoom;