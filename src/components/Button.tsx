import React from "react"

/*type ButtonProps = {
    children ?: string // text ?: string significa que aquilo é opcional, não precisa colocar necessariamente
}
*/

const Button = () => {

    const [getCount, setCount] = React.useState(0)

    function increment() {
        setCount(getCount + 1)
    }

    return (
        <button onClick={increment}>
            {getCount}
        </button>
    )
}

export default Button;