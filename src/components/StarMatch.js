import { useEffect, useState } from "react";
import utils from "../utils/utils";
import PlayButton from "./PlayButton";
import StarsDisplay from "./StarDisplay";
import PlayAgain from "./PlayAgain";
import { propTypes } from "react-bootstrap/esm/Image";
import useGameState from "../customhooks/useGameState";
const StartMatch = (props) => {
    const {stars,availableNums,candidateNums,secondsLeft,setGameState} = useGameState();
  // const [stars, setStars] = useState(utils.random(1, 9));
  // const [availableNums, setAvailableNums] = useState(utils.range(1, 9));
  // const [candidateNums, setCanditateNums] = useState([]);
  // const [secondsLeft, setSecondsLeft] = useState(10);

  // //hook
  // useEffect(() => {
  //   if (secondsLeft > 0 && availableNums.length > 0) {
  //     const timerId = setTimeout(() => {
  //       setSecondsLeft(secondsLeft - 1);
  //     }, 1000);
  //     return () => clearTimeout(timerId);
  //   }
  // });
  const candidatesAreWrong = utils.sum(candidateNums) > stars;

  const gameStatus =
    availableNums.length === 0 ? "won" : secondsLeft === 0 ? "lost" : "active";

  // const resetGame = () => {
  //   setStars(utils.random(1, 9));
  //   setAvailableNums(utils.range(1, 9));
  //   setCanditateNums([]);
  // };
  
  const numberStatus = (number) => {
    if (!availableNums.includes(number)) {
      return "used";
    }
    if (candidateNums.includes(number)) {
      return candidatesAreWrong ? "wrong" : "candidate";
    }
    return "available";
  };
  const onNumberClick = (number, currentStatus) => {
    //currentStaus ==> newStatus
    if (currentStatus === "used") {
      return;
    }
    //candidateNums
    const newCandidateNums =
      currentStatus === "available"
        ? candidateNums.concat(number)
        : candidateNums.filter((cn) => cn !== number);
        setGameState(newCandidateNums);
    // if (utils.sum(newCandidateNums) !== stars) {
    //   setCanditateNums(newCandidateNums);
    // } else {
    //   const newAvailableNumbs = availableNums.filter(
    //     (n) => !newCandidateNums.includes(n)
    //   );
    //   //redraw the numbe of stars(from what's is avaialbel)
    //   setStars(utils.randomSumIn(newAvailableNumbs, 9));
    //   setAvailableNums(newAvailableNumbs);
    //   setCanditateNums([]);
    // }
  };
  return (
    <div className="game">
      <div className="help">
        Pick 1 or more numbers that sum to the number of stars
      </div>
      <div className="body">
        <div className="left">
          {gameStatus !== 'active' ? (
            <PlayAgain onClick={props.startNewMatch}  gameStatus={gameStatus}/>
          ) : (
            <StarsDisplay count={stars} />
          )}
        </div>
        <div className="right">
          {utils.range(1, 9).map((number) => {
            return (
              <PlayButton
                key={number}
                status={numberStatus(number)}
                number={number}
                onClick={onNumberClick}
              />
            );
          })}
        </div>
      </div>
      <div className="timer">Time Remaining: {secondsLeft}</div>
    </div>
  );
};
export default StartMatch;
