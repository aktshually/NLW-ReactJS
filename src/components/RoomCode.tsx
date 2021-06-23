import CopyImg from "../assets/images/copy.svg";

import "../styles/RoomCode.scss"

type RoomCodeProps = {
    code: string
}

const RoomCode = (props: RoomCodeProps) => {


    function CopyRoomCodeToClipboard() {
        navigator.clipboard.writeText(props.code)
    }

    return (
        <button onClick={CopyRoomCodeToClipboard} className="RoomCode">
            <div>
                <img src={CopyImg} alt="Copy room code"/>
            </div>
            <span>
                Sala #{props.code}
            </span>
        </button>
    )

}

export default RoomCode