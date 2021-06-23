import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { useAuth } from "../hooks/useAuth";

import LogoImg from "../assets/images/logo.svg"

import Button from "../components/Button";
import RoomCode from "../components/RoomCode";

import "../styles/room.scss"

import { database } from "../services/firebase";

import { FormEvent } from "react";

type RoomParams = {
    id: string
}

type FirebaseQuestions = Record<string, {
    author: {
        name: string,
        avatar: string
    }

    content: string,
    isAnswered: boolean,
    isHightLitghted: boolean

}>

type Question = {
    id: string
    author: {
        name: string,
        avatar: string
    }

    content: string,
    isAnswered: boolean,
    isHightLitghted: boolean
}

const Room = () => {

    const {user} = useAuth();

    const params = useParams<RoomParams>()
    const RoomID = params.id

    const [NewQuestion, SetNewQuestion] = useState("")
    const [questions, setQuestions] = useState<Question[]>([])
    const [title, setTitle] = useState("")

    useEffect(() => {
        
        const roomRef = database.ref(`rooms/${RoomID}`)

        roomRef.on("value", room => {
            
            const firebaseQuestions: FirebaseQuestions = room.val().questions  ?? {}

            const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value]) => {
                return {
                    id: key,
                    content: value.content,
                    author: value.author,
                    isHightLitghted: value.isHightLitghted,
                    isAnswered: value.isAnswered
                }
            })

            setTitle(room.val().title)
            setQuestions(parsedQuestions)
        })

    }, [RoomID])

    async function handleCreateNewQuestion(event: FormEvent) {
        event.preventDefault()

        if (NewQuestion.trim() === "") {
            return
        }

        if (!user) {
            throw new Error("You must be logged in")
        }


        const question = {
            content: NewQuestion,
            author: {
                name: user?.name,
                avatar: user.avatar
            },
            isHightLitghted: false,
            isAnswer: false
        }

        await database.ref(`rooms/${RoomID}/questions`).push(question)


        SetNewQuestion("")

    }

    return (
        <div id="PageRoom">

            <header>

                <div className="content">

                    <img src={LogoImg} alt="Letmeask"/>
                    <RoomCode code={RoomID}/>

                </div>

            </header>

            <main className="content">

                <div className="RoomTitle">
                    
                    <h1>
                        Sala <code>"{title}"</code>
                    </h1>
                    {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}

                </div>

                <form onSubmit={handleCreateNewQuestion}>

                    <textarea 
                        placeholder="O que você quer perguntar?"
                        onChange={event => SetNewQuestion(event.target.value)}
                        value={NewQuestion}
                    />
                    <div className="FormFooter">

                        { user ? (
                            <div className="UserInfo">
                                <img src={user.avatar} alt={user.name} />
                                <span>{user.name}</span>
                            </div>
                        ) : (
                            <span>Para enviar uma pergunta, <button>faça seu login</button></span>
                        ) }
                        <Button type="submit" disabled={!user}>    
                            Enviar pergunta
                        </Button>

                    </div>

                </form>


                {JSON.stringify(questions)}

            </main>

        </div>
    )

}

export default Room;