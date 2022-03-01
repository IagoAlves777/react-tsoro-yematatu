import io from "socket.io-client";
import { useEffect, useState } from "react";
import {
  BrowserRouter,
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import "./App.css";
import Menu from "./components/Menu";
import Game from "./components/Game";
import Draw from "./components/Draw";
import { Alert, Button, Modal, Spinner } from "react-bootstrap/";
import Chat from "./components/Chat";
import { v4 as uuidv4 } from "uuid";

function App() {
  const socket = io("http://localhost:8080", {
    transports: ["websocket"],
  });
  const [nick, setNick] = useState("");
  const [color, setColor] = useState("");
  const [radioValue, setRadioValue] = useState("");

  const initialtop = {
    colorPoint: "black",
    point: 0,
  };
  const initialmid1 = {
    colorPoint: "black",
    point: 1,
  };
  const initialmid2 = {
    colorPoint: "black",
    point: 2,
  };
  const initialmid3 = {
    colorPoint: "black",
    point: 3,
  };
  const initialbottom1 = {
    colorPoint: "black",
    point: 4,
  };
  const initialbottom2 = {
    colorPoint: "black",
    point: 5,
  };
  const initialbottom3 = {
    colorPoint: "black",
    point: 6,
  };
  const navigate = useNavigate();
  const [top, setTop] = useState(initialtop);
  const [mid1, setMid1] = useState(initialmid1);
  const [mid2, setMid2] = useState(initialmid2);
  const [mid3, setMid3] = useState(initialmid3);
  const [bottom1, setBottom1] = useState(initialbottom1);
  const [bottom2, setBottom2] = useState(initialbottom2);
  const [bottom3, setBottom3] = useState(initialbottom3);
  const [showWinner, setShowWinner] = useState(false);
  const handleCloseW = () => setShowWinner(false);
  const handleShowW = () => setShowWinner(true);
  const [showDraw, setShowDraw] = useState(false);
  const handleCloseD = () => setShowDraw(false);
  const [countDraw, setcountDraw] = useState(0);
  const [colorWinner, setColorWinner] = useState("dark");
  const [blue, setBlue] = useState(false);
  const [red, setRed] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [danger, setDanger] = useState(false);
  const [turnIs, setTurnIs] = useState("Red");
  const [turnColor, setTurnColor] = useState("Red");
  const [messages, updateMessages] = useState([]);
  const myId = uuidv4();

  function handleFormSubmit(message) {
    if (message.trim()) {
      if (message === "/draw") return drawGame();
      if (message === "/ff") return resetGame();
      socket.emit("sendMessege", {
        color: color,
        message: message,
      });
    }
  }

  function pickColor() {
    setColor(radioValue);
  }

  function emitColor(point) {
    socket.emit("changeColor", {
      cor: color,
      ponto: point,
    });
    //socket.disconnect();
  }
  function recuseDraw() {
    socket.emit("recuseDraw", {
      recuse: true,
    });
  }

  function resetGame() {
    navigate("/");
    setColorWinner("dark");
    setTop(initialtop);
    setMid1(initialmid1);
    setMid2(initialmid2);
    setMid3(initialmid3);
    setBottom1(initialbottom1);
    setBottom2(initialbottom2);
    setBottom3(initialbottom3);
    document.location.reload(true);
    return false;
  }

  function drawGame() {
    socket.emit("drawGame", {
      drawGame: true,
    });
  }

  function changeColor(point) {
    const oldPoint = {
      colorPoint: "black",
      point: point.ponto.point,
    };
    const newPoint = {
      colorPoint: point.cor,
      point: point.ponto.point,
    };
    if (point.ponto.point === 0) {
      if (point.ponto.colorPoint === oldPoint.colorPoint) {
        setTop(newPoint);
      }
      if (point.ponto.colorPoint === newPoint.colorPoint) {
        setTop(oldPoint);
      }
    }

    if (point.ponto.point === 1) {
      if (point.ponto.colorPoint === oldPoint.colorPoint) {
        setMid1(newPoint);
      }
      if (point.ponto.colorPoint === newPoint.colorPoint) {
        setMid1(oldPoint);
      }
    }

    if (point.ponto.point === 2) {
      if (point.ponto.colorPoint === oldPoint.colorPoint) {
        setMid2(newPoint);
      }
      if (point.ponto.colorPoint === newPoint.colorPoint) {
        setMid2(oldPoint);
      }
    }

    if (point.ponto.point === 3) {
      if (point.ponto.colorPoint === oldPoint.colorPoint) {
        setMid3(newPoint);
      }
      if (point.ponto.colorPoint === newPoint.colorPoint) {
        setMid3(oldPoint);
      }
    }

    if (point.ponto.point === 4) {
      if (point.ponto.colorPoint === oldPoint.colorPoint) {
        setBottom1(newPoint);
      }
      if (point.ponto.colorPoint === newPoint.colorPoint) {
        setBottom1(oldPoint);
      }
    }

    if (point.ponto.point === 5) {
      if (point.ponto.colorPoint === oldPoint.colorPoint) {
        setBottom2(newPoint);
      }
      if (point.ponto.colorPoint === newPoint.colorPoint) {
        setBottom2(oldPoint);
      }
    }

    if (point.ponto.point === 6) {
      if (point.ponto.colorPoint === oldPoint.colorPoint) {
        setBottom3(newPoint);
      }
      if (point.ponto.colorPoint === newPoint.colorPoint) {
        setBottom3(oldPoint);
      }
    }
  }

  socket.on("wo", () => {
    setShowWinner(true);
  });

  function iniciar() {
    if (nick !== "" && radioValue !== "") {
      socket.on("connect", () => {
        //console.log("Vc se conectou!");
      });
      socket.emit("connectedPlayer", {
        nickName: nick,
        color: radioValue,
      });
      console.log("Nick: ", nick, "Cor: ", radioValue);

      navigate("/game");
    } else {
      setDanger(true);
    }
    //socket.disconnect();
  }

  function acceptDraw() {
    socket.emit("acceptDraw", {
      acceptDraw: countDraw,
    });
  }

  function handleAccept() {
    setLoading(true);
    acceptDraw();
  }

  useEffect(() => {
    socket.on("connectedPlayer", (data) => {
      if (data === "red") {
        setRed(true);
      }
      if (data === "blue") {
        setBlue(true);
      }
    });
    socket.on("drawGame", (data) => {
      setShowDraw(data);
    });
    socket.on("acceptDraw", (data) => {
      setcountDraw(data);
      if (data === 2) {
        setShowDraw(false);
        navigate("/draw");
        setLoading(false);
      }
    });
    socket.on("turnIs", (data) => {
      setTurnIs(data);
      if (data === "red") {
        setTurnColor("danger");
      }
      if (data === "blue") {
        setTurnColor("primary");
      }
    });
  }, [socket]);

  useEffect(() => {
    socket.on("recuseDraw", (data) => {
      setShowDraw(false);
    });
  }, [showDraw]);

  useEffect(() => {
    function sendMessege(newMessage) {
      updateMessages([newMessage, ...messages]);
    }
    const handleNewMessage = (newMessage) => sendMessege(newMessage);
    socket.on("sendMessege", handleNewMessage);
    return () => socket.off("sendMessege", handleNewMessage);
  }, [messages]);

  useEffect(() => {
    socket.on("changeColor", (data) => {
      changeColor(data);
    });
  }, [color]);

  useEffect(() => {
    socket.on("RedWin", (data) => {
      handleShowW();
      setColorWinner("danger");
    });
  }, [showWinner]);

  useEffect(() => {
    socket.on("BlueWin", (data) => {
      handleShowW();
      setColorWinner("primary");
    });
  }, [showWinner]);

  return (
    <Routes>
      <Route
        path="/game"
        element={
          <div className="div_game">
            <Modal show={showWinner} onHide={handleCloseW} centered={true}>
              <Modal.Header closeButton>
                <Modal.Title>{color.toLocaleUpperCase()} Win!</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                With a better strategy and impeccable reasoning {nick} won
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant={`outline-${colorWinner}`}
                  onClick={() => resetGame()}
                >
                  Play again
                </Button>
              </Modal.Footer>
            </Modal>
            <Modal show={showDraw} onHide={handleCloseD} centered={true}>
              <Modal.Header closeButton>
                <Modal.Title>Draw Game</Modal.Title>
              </Modal.Header>
              <Modal.Body>do you want to accept the tie?</Modal.Body>
              <Modal.Footer>
                <Button
                  variant={`outline-${colorWinner}`}
                  disabled={isLoading}
                  onClick={!isLoading ? handleAccept : () => acceptDraw()}
                >
                  {isLoading ? (
                    <>
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                      />
                      waiting to accept
                    </>
                  ) : (
                    "Yes"
                  )}
                </Button>
                <Button
                  variant={`outline-${colorWinner}`}
                  disabled={isLoading}
                  onClick={() => recuseDraw()}
                >
                  No
                </Button>
              </Modal.Footer>
            </Modal>
            <div className="div_topGame">
              <Alert variant={`${turnColor}`}>Turn Is {turnIs}</Alert>
              <Button variant="outline-dark" onClick={() => drawGame()}>
                Draw Game
              </Button>
            </div>
            <Game
              changeColor={emitColor}
              top={top}
              mid1={mid1}
              mid2={mid2}
              mid3={mid3}
              bottom1={bottom1}
              bottom2={bottom2}
              bottom3={bottom3}
            />
            <div className="div_bottomGame">
              <Chat
                messages={messages}
                updateMessages={updateMessages}
                handleFormSubmit={handleFormSubmit}
                myId={myId}
              />
            </div>
          </div>
        }
      />
      <Route
        path="/"
        element={
          <div className="Menu">
            {danger ? (
              <Alert variant="danger">Pick your nick and your color!</Alert>
            ) : (
              <></>
            )}
            <Menu
              nick={nick}
              setNick={setNick}
              setStart={iniciar}
              setRadioValue={setRadioValue}
              radioValue={radioValue}
              pickColor={pickColor}
              disableRed={red}
              disableBlue={blue}
              setColor={setColor}
            />
          </div>
        }
      />

      <Route
        path="/draw"
        element={
          <div className="Menu">
            <Draw resetGame={resetGame} />
          </div>
        }
      />
    </Routes>
  );
}

export default App;
