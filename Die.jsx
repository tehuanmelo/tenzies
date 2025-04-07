export default function Die(props) {
    return (
        <button onClick={props.holdDice} className={props.isHeld ? "held" : ""}>{props.value}</button>
    )
}