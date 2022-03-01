const Koa = require("koa");
const http = require("http");
const socket = require("socket.io");
const { win32 } = require("path");

const app = new Koa();
const server = http.createServer(app.callback());
const io = socket(server);

const SERVER_HOST = "localhost";
const SERVER_PORT = 8080;
let PlayerC = [];
let playsRed = 0;
let playsBlue = 0;
let point;
let turnIs = "red";
let pointsBlue = [];
let pointsRed = [];
let selectedColors = [];
let countDraw = 0;

function resetGame() {
  //PlayerC = [];
  playsRed = 0;
  playsBlue = 0;
  point;
  turnIs = "red";
  pointsBlue = [];
  pointsRed = [];
}

function checkWin(points) {
  points = points.sort();
  const win1 = [0, 1, 4];
  const win2 = [0, 2, 5];
  const win3 = [0, 3, 6];
  const win4 = [1, 2, 3];
  const win5 = [4, 5, 6];
  let win = JSON.stringify(win1) === JSON.stringify(points);
  if (win === true) return win;
  win = JSON.stringify(win2) === JSON.stringify(points);
  if (win === true) return win;
  win = JSON.stringify(win3) === JSON.stringify(points);
  if (win === true) return win;
  win = JSON.stringify(win4) === JSON.stringify(points);
  if (win === true) return win;
  win = JSON.stringify(win5) === JSON.stringify(points);
  if (win === true) return win;
  return win;
}

io.on("connection", (socket) => {
  //Detecção de que desconectou
  socket.on("disconnect", () => {
    PlayerC.pop();
    if (PlayerC.length === 1) {
      io.emit("wo");
    }
    resetGame();
  });

  socket.on("connectedPlayer", (data) => {
    PlayerC.push(data.nickName);
    selectedColors.push(data.color);
    io.emit("connectedPlayer", data.color);
    io.emit("turnIs", turnIs);
  });
  socket.on("changeColor", (data) => {
    point = data;
    //controle de turno
    if (turnIs == "red" && data.cor == "blue") {
      return console.log("blue it's not your turn!");
    }
    if (turnIs == "blue" && data.cor == "red") {
      return console.log("Red it's not your turn!");
    }

    //Controle pra Marcar apenas 3 vermelhos
    if (data.cor === "red" && data.ponto.colorPoint === "red") {
      playsRed = playsRed - 1;
      newPointsRed = pointsRed.filter(function (point) {
        return point != data.ponto.point;
      });
      pointsRed = newPointsRed;
    }
    if (data.cor === "red") {
      if (playsRed >= 3) {
        return console.log("Desmarque uma peça");
      }
    }

    if (data.cor === "red" && data.ponto.colorPoint === "black") {
      playsRed = playsRed + 1;
      pointsRed.push(data.ponto.point);
      if (playsRed === 3) {
        win = checkWin(pointsRed);
        if (win) {
          resetGame();
          io.emit("RedWin", data);
        }
      }
      turnIs = "blue";
      io.emit("turnIs", turnIs);
    }
    //Controle pra Marcar apenas 3 azuis
    if (data.cor === "blue" && data.ponto.colorPoint === "blue") {
      playsBlue = playsBlue - 1;
      newPointsBlue = pointsBlue.filter(function (point) {
        return point != data.ponto.point;
      });
      pointsBlue = newPointsBlue;
    }
    if (data.cor === "blue") {
      if (playsBlue >= 3) {
        return console.log("Desmarque uma peça");
      }
    }

    if (data.cor === "blue" && data.ponto.colorPoint === "black") {
      playsBlue = playsBlue + 1;
      pointsBlue.push(data.ponto.point);
      if (playsBlue === 3) {
        win = checkWin(pointsBlue);
        if (win) {
          resetGame();
          io.emit("BlueWin", data);
        }
      }
      turnIs = "red";
      io.emit("turnIs", turnIs);
    }

    io.emit("changeColor", point);
    point = null;
  });

  socket.on("drawGame", (data) => {
    io.emit("drawGame", data);
  });
  socket.on("acceptDraw", (data) => {
    countDraw = countDraw + 1;
    io.emit("acceptDraw", countDraw);
    if (countDraw === 2) {
      countDraw = 0;
    }
  });

  socket.on('sendMessege', (data) => {
    io.emit('sendMessege',data);
  })

  socket.on('recuseDraw', (data) => {
    io.emit('recuseDraw', data);
  })

});

server.listen(SERVER_PORT, SERVER_HOST, () => {
  console.log(`Servidor está rodando em https://${SERVER_HOST}:${SERVER_PORT}`);
  console.log("Precione CTRL+C para parar");
});
