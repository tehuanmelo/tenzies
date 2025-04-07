import { useState, useEffect } from "react"
import Die from "./Die"
import { nanoid } from "nanoid"
import ConfettiExplosion from 'react-confetti-explosion';

/**
 * Challenge:
 * 
 * Create state to hold our array of numbers. (Initialize
 * the state by calling our `generateAllNewDice` function so it 
 * loads all new dice as soon as the app loads)
 * 
 * Map over the state numbers array to generate our array
 * of Die components and render those in place of our
 * manually-written 10 Die elements.
 */

const getRandonNumber = () => Math.ceil(Math.random() * 6)

function generateAllNewDice() {
    return new Array(10)
        .fill(0)
        .map(() => {
            return {
                value: getRandonNumber(),
                isHeld: false,
                id: nanoid()
            }
        })
}


export default function App() {
    const [diceArray, setDiceArray] = useState(generateAllNewDice())
    const diceElements = diceArray.map((obj) => (
        <Die key={obj.id} isHeld={obj.isHeld} value={obj.value} holdDice={() => holdDice(obj.id)}/>
    ))

    const [isExploding, setIsExploding] = useState(false);

    const gameWon = diceArray.every(die => die.isHeld && die.value == diceArray[0].value)

    useEffect(() => {
        setIsExploding(gameWon)
    }, [gameWon])

    function holdDice(id) {
        setDiceArray(prev => {
            return prev.map(die => 
                die.id === id ? 
                    {...die, isHeld: !die.isHeld} : die
            )
        })
    }
    
    function rollDice() {
        setDiceArray(prev => {
            return prev.map(die => (
                die.isHeld ? die : {...die, value: getRandonNumber()}
            ))
        })
    }

    function resetGame() {
        setDiceArray(generateAllNewDice)
    }

    const styles = {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        display: "flex",
        justifyContent: "center",
    }
      

    return (
        <main style={{position: "relative"}}>
            <h1>{gameWon ? "You win" : "Tenzies"}</h1>
            {!gameWon && 
            <p className="instructions">
                Roll the dice until all of them show the same number. Click a die to freeze it at its current value between rolls.
            </p>
            }
                        <div style={styles}>
                {isExploding && <ConfettiExplosion />}
            </div>
            <div className="dice-container">
                {diceElements}
            </div>
            <button onClick={gameWon ? resetGame : rollDice} className="roll-button">{ gameWon? "New Game" : "Roll Dice"}</button>
        </main>
    )
}