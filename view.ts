import { Boards } from './boardList';

document.addEventListener("DOMContentLoaded",  () => {
  const container = document.getElementById('chessground-examples');
  const log = document.getElementById('log');
  console.log("container: "+container)

  const boards = new Boards(container, log);
  console.log("boards: "+boards);

  (async ()=>{
    const response = await fetch("https://lichess.org/api/storm");
  const data = await response.json();
  boards.setPuzzles(data.puzzles);

  })()

  

  document.getElementById("search")?.addEventListener("click", () => {
    console.log(boards)
    boards.redraw();
  });
  
});
