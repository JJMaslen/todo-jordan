interface PreviousGuessesProps {
    guesses: number[];
}

function PreviousGuesses({guesses}: PreviousGuessesProps) {
    return(
        <div className="previous">
            <p>Previous Guesses</p>
            <ol>
                {guesses.map((guess, index) => (
                    <li key={index}>{guess}</li>
                ))}
            </ol>
        </div>
    )
}

export default PreviousGuesses;