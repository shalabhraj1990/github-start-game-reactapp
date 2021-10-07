import utils from "../utils/utils";
const PlayButton = (props) => {
  return (
    <button
      className="number"
      style={{ backgroundColor: utils.colors[props.status] }}
      onClick={() => props.onClick(props.number,props.status)}
    >
      {props.number}
    </button>
  );
};
export default PlayButton;
