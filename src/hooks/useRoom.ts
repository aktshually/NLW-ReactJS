import { useEffect, useState } from "react"
import { database } from "../services/firebase"
import { useAuth } from "./useAuth"

type QuestionType = {
    id: string
    author: {
        name: string,
        avatar: string
    }

    content: string,
    isAnswered: boolean,
    isHightLitghted: boolean,
    likeCount: number,
    likeID: string | undefined
}

type FirebaseQuestions = Record<string, {
    author: {
        name: string,
        avatar: string
    }

    content: string,
    isAnswered: boolean,
    isHightLitghted: boolean,
    likes: Record<string, {
        authorId: string
    }>

}>


export function useRoom(RoomID: string) {

    const { user } = useAuth()
    const [questions, setQuestions] = useState<QuestionType[]>([])
    const [title, setTitle] = useState("")

    useEffect(() => {

        const roomRef = database.ref(`rooms/${RoomID}`)

        roomRef.on("value", room => {

            const firebaseQuestions: FirebaseQuestions = room.val().questions ?? {}

            const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value]) => {
                return {
                    id: key,
                    content: value.content,
                    author: value.author,
                    isHightLitghted: value.isHightLitghted,
                    isAnswered: value.isAnswered,
                    likeCount: Object.values(value.likes ?? {}).length,
                    likeID: Object.entries(value.likes ?? {}).find(([key, like]) => like.authorId === user?.id)?.[0]
                }
            })

            setTitle(room.val().title)
            setQuestions(parsedQuestions)
        })

        return () => {
            roomRef.off("value")
        }

    }, [RoomID, user?.id])

    return { questions, title }

}