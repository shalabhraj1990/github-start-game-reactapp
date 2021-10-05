const PlayButton = props => {
  return  <button className="number" key={props.number} onClick={()=>console.log('num:',props.number)}>{props.number}</button>
}
export default PlayButton;