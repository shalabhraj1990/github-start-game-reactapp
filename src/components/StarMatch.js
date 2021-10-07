import { useState } from "react";
import utils from "../utils/utils";
import PlayButton from "./PlayButton";
import StarsDisplay from "./StarDisplay";
import PlayAgain from "./PlayAgain";
const StartMatch = () => {
  const [stars, setStars] = useState(utils.random(1, 9));
  const [availableNums, setAvailableNums] = useState(utils.range(1, 9));
  const [candidateNums, setCanditateNums] = useState([]);

  const candidatesAreWrong = utils.sum(candidateNums) > stars;
  const resetGame = () => {
    setStars(utils.random(1, 9));
    setAvailableNums(utils.range(1, 9));
    setCanditateNums([]);
  }
const gameIsDone = availableNums.length === 0;
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
    const newCandidateNums = (currentStatus === 'available') ? candidateNums.concat(number):candidateNums.filter(cn => cn !== number);
    if (utils.sum(newCandidateNums) !== stars) {
      setCanditateNums(newCandidateNums);
    } else {
      const newAvailableNumbs = availableNums.filter(
        (n) => !newCandidateNums.includes(n)
      );
      //redraw the numbe of stars(from what's is avaialbel)
      setStars(utils.randomSumIn(newAvailableNumbs, 9));
      setAvailableNums(newAvailableNumbs);
      setCanditateNums([]);
    }
  };
  return (
    <div className="game">
      <div className="help">
        Pick 1 or more numbers that sum to the number of stars
      </div>
      <div className="body">
        <div className="left">
          {
            gameIsDone ?(<PlayAgain onClick={resetGame} />):( <StarsDisplay count={stars} />)
          }
         
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
      <div className="timer">Time Remaining: 10</div>
    </div>
  );
};
export default StartMatch;
