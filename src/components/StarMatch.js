import { useState } from "react";
import utils from "../utils/utils";
import PlayButton from "./PlayButton";
import StarsDisplay from "./StarDisplay";

const StartMatch = () => {
  const [stars, setStars] = useState(utils.random(1, 9));

  return (
    <div className="game">
      <div className="help">
        Pick 1 or more numbers that sum to the number of stars
      </div>
      <div className="body">
        <div className="left">
          <StarsDisplay count={stars} />
        </div>
        <div className="right">
          {utils.range(1, 9).map((number) => {
            return <PlayButton number={number} />;
          })}
        </div>
      </div>
      <div className="timer">Time Remaining: 10</div>
    </div>
  );
};
export default StartMatch;
