import { useState } from "react"
import StartMatch from "./StarMatch";

const Game = () => {
    const [gameId,setGameId] = useState(0);
    return <StartMatch key={gameId} startNewMatch={() => setGameId(gameId+1) } />
}

export default Game;