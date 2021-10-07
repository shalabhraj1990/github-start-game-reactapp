import { useEffect, useState } from "react";
import utils from "../utils/utils";
const useGameState = () => {
  const [stars, setStars] = useState(utils.random(1, 9));
  const [availableNums, setAvailableNums] = useState(utils.range(1, 9));
  const [candidateNums, setCanditateNums] = useState([]);
  const [secondsLeft, setSecondsLeft] = useState(10);

  //hook
  useEffect(() => {
    if (secondsLeft > 0 && availableNums.length > 0) {
      const timerId = setTimeout(() => {
        setSecondsLeft(secondsLeft - 1);
      }, 1000);
      return () => clearTimeout(timerId);
    }
  });
  const setGameState = (newCandidateNums) => {
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
  return {stars,availableNums,candidateNums,secondsLeft,setGameState};
};

export default useGameState;
