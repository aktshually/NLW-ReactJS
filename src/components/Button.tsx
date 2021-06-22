/*type ButtonProps = {
    children ?: string // text ?: string significa que aquilo é opcional, não precisa colocar necessariamente
}
*/

import {ButtonHTMLAttributes} from "react";

import "../styles/button.scss"

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

const Button = (props: ButtonProps) => {
    
    
    return (
        <button className="button" {...props}>
        </button>
    )
}

export default Button;
