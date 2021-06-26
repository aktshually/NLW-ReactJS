import { ReactNode } from "react"

import "../styles/question.scss"

import classnames from "classnames"


type QuestionProps = {
    content: string,
    author: {
        name: string,
        avatar: string
    },
    children?: ReactNode,
    isAnswered?: boolean,
    isHighLitghted?: boolean
}

const Question = ({ content, author, children, isAnswered = false, isHighLitghted = false}: QuestionProps) => {

    return (
        <div 
            className={classnames("question", {
                answered: isAnswered
            },
            {
                highLighted: isHighLitghted && !isAnswered
            })}
        >
            <p>
                {content}
            </p>
            <footer>
                <div className="UserInfo">
                    <img src={author.avatar} alt={author.name} />
                    <span>
                        {author.name}
                    </span>
                </div>
                <div>
                    {children}
                </div>
            </footer>
        </div>
    )

}

export default Question;