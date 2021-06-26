/*type ButtonProps = {
    children ?: string // text ?: string significa que aquilo é opcional, não precisa colocar necessariamente
}
*/

import {ButtonHTMLAttributes} from "react";

import "../styles/button.scss"

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    isOutlined?: boolean
}

const Button = ({isOutlined=false, ...props}: ButtonProps) => {
    
    
    return (
        <button 
            className={`button ${isOutlined ? "outlined" : ""}`} 
            {...props}>
        </button>
    )
}

export default Button;
