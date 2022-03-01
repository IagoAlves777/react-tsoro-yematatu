import tie from "../../assets/tie.gif";
import { Button } from "react-bootstrap/";
import "./style.css";
function Draw({
  resetGame,
}) {
  return (
    <div className="div_tie">
      <img src={tie}></img>
      <Button 
      variant={`outline-dark`}
      size='lg'
      onClick={() => resetGame()}>
        Play again
      </Button>
    </div>
  );
}

export default Draw;
