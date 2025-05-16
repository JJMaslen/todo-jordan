import React from "react";
import PreviousGuesses from "./PreviousGuesses";

interface GameInfoPropes {
    guess: number;
    message?: string;
}

function GameInfo({ guess, message }: GameInfoPropes) {

    var text = "";
    switch (guess) {
        case 0:
            text = "You guessed correctly!";
            break;
        case 1:
            text = "Too high!";
            break;
        case 2:
            text = "Too low!";
            break;
        default:
            text = "";
    }

    return (
        <div>
            {message ? <p>{message}</p> : <p>{text}</p>}
        </div>
    )
}

function checkGuess(playerGuess: number, targetNumber: number) {
    if (playerGuess === targetNumber) {
        return 0
    } else if (playerGuess > targetNumber) {
        return 1
    } else {
        return 2
    }
}

function higherOrLowerGame() {
    const [input, setInput] = React.useState("");
    const [guess, setGuess] = React.useState(Number);
    const [targetNumber, setNumber] = React.useState(Number);
    const [message, setMessage] = React.useState<string | undefined>(undefined);
    const [guesses, setGuesses] = React.useState<number[]>([]);

    React.useEffect(() => {
        const initialNumber = Math.floor(Math.random() * 100);
        setNumber(initialNumber)
        setMessage("Enter your first guess!")
        console.log(initialNumber)
    }, [])

    const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        var newNumber: number = Math.floor(Math.random() * 100)
        console.log(newNumber)
        setNumber(newNumber)
        setInput("")
        setGuesses([])
        setMessage("A new number has been generated")
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInput(event.target.value);
    };

    const handleInputSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setGuess(checkGuess(Number(input), targetNumber))
        setGuesses(prev => [...prev, Number(input)]);
        setMessage(undefined)
    }

    return (
        <div className="gameContainer">
            <GameInfo guess={guess} message={message} />
            <form className="gameForm" onSubmit={handleInputSubmit}>
                <input
                    type="text"
                    placeholder="Enter Guess here"
                    value={input}
                    onChange={handleInputChange} />
                <button type="submit">Submit</button>
            </form>
            <button onClick={handleButtonClick}>New Number</button>
            <PreviousGuesses guesses={guesses} />
        </div>
    )
}

export default higherOrLowerGame;