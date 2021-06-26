import { useHistory, useParams } from "react-router-dom"
import { useRoom } from "../hooks/useRoom";

import LogoImg from "../assets/images/logo.svg"
import DeleteImg from "../assets/images/delete.svg"
import CheckImg from "../assets/images/check.svg"
import AnswerImg from "../assets/images/answer.svg"

import Button from "../components/Button";
import RoomCode from "../components/RoomCode";
import Question from "../components/Question";

import "../styles/room.scss"

import { database } from "../services/firebase";

type RoomParams = {
    id: string
}

const AdminRoom = () => {

    const history = useHistory()


    // const { user } = useAuth();

    const params = useParams<RoomParams>()
    const RoomID = params.id

    const { title, questions } = useRoom(RoomID)

    async function handleEndRoom() {

        await database.ref(`rooms/${RoomID}`).update({
            endedAt: new Date()
        })

        history.push("/home")

    }

    async function handleDeleteQuestion(questionID: string) {

        if (window.confirm("Tem certeza que deseja excluir essa pergunta?")) {

            await database.ref(`rooms/${RoomID}/questions/${questionID}`).remove()

        }

    }

    async function handleCheckQuestionAsAnswered(questionID: string) {

        await database.ref(`rooms/${RoomID}/questions/${questionID}`).update({
            isAnswered: true
        })

    }

    async function handleHighlightQuestion(questionID: string) {

        await database.ref(`rooms/${RoomID}/questions/${questionID}`).update({
            isHightLitghted: true
        })

    }

    return (
        <div id="PageRoom">

            <header>

                <div className="content">

                    <img src={LogoImg} alt="Letmeask" />
                    <div>
                        <RoomCode code={RoomID} />
                        <Button isOutlined onClick={handleEndRoom}>Encerrar sala</Button>
                    </div>

                </div>

            </header>

            <main className="content">

                <div className="RoomTitle">

                    <h1>
                        Sala "{title}"
                    </h1>
                    {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}

                </div>

                <div className="QuestionList">
                    {questions.map(question => {
                        return (
                            <Question
                                key={question.id}
                                content={question.content}
                                author={question.author}
                                isAnswered={question.isAnswered}
                                isHighLitghted={question.isHighLitghted}
                            >
                                {!question.isAnswered && (
                                    <>
                                        <button
                                            type="button"
                                            onClick={() => handleCheckQuestionAsAnswered(question.id)}
                                        >
                                            <img src={CheckImg} alt="Marcar pergunta como respondida" />
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => handleHighlightQuestion(question.id)}
                                        >
                                            <img src={AnswerImg} alt="Dar destaque à pergunta" />
                                        </button>
                                    </>
                                )}

                                <button
                                    type="button"
                                    onClick={() => handleDeleteQuestion(question.id)}
                                >
                                    <img src={DeleteImg} alt="Remover pergunta" />
                                </button>
                            </Question>
                        )
                    })}
                </div>

            </main>

        </div>
    )

}

export default AdminRoom;