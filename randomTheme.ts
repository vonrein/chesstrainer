const pieceNames = ["king", "queen", "rook", "bishop", "pawn"]; //handle knight seperately

const boardThemes = ["blue-marble.jpg", "blue.svg", "blue2.jpg", "blue3.jpg", "brown.png", "canvas2.jpg", "green-plastic.png", "green.png", "grey.jpg", "ic.png", "leather.jpg", "maple.jpg", "maple2.jpg", "marble.jpg", "metal.jpg", "ncf-board.png", "olive.jpg", "pink-pyramid.png", "purple.png", "wood.jpg", "wood2.jpg", "wood3.jpg", "wood4.jpg", "xboard.png"];
const pieceThemes = ["alpha", "anarcandy", "caliente", "california", "cardinal", "cburnett", "celtic", "chess7", "chessnut", "companion", "cooke", "dubrovny", "fantasy", "firi", "fresca", "gioco", "governor", "horsey", "icpieces", "kiwen-suwi", "kosal", "leipzig", "letter", "maestro", "merida", "monarchy", "mpchess", "pirouetti", "pixel", "reillycraig", "rhosgfx", "riohacha", "shapes", "spatial", "staunty", "tatiana", "xkcd"];


export function randomTheme(container: HTMLElement) {
  const styleSheet = document.createElement("style");
  styleSheet.id = "themeStyles";

  const applyTheme = (board: string, pieces: string) => {
    let themeStyle = `.boardtheme cg-board {
      background-image: url("/assets/images/board/${board}");
    } `;

    for (const p of pieceNames) {
      themeStyle += `\n.piecetheme cg-board piece.${p}.white {
        background-image: url("/assets/images/pieces/${pieces}/w${p[0].toUpperCase()}.svg");
      }`;
      themeStyle += `\n.piecetheme cg-board piece.${p}.black {
        background-image: url("/assets/images/pieces/${pieces}/b${p[0].toUpperCase()}.svg");
      }`;
    }

    themeStyle += `\n.piecetheme cg-board piece.knight.white {
      background-image: url("/assets/images/pieces/${pieces}/wN.svg");
    }`;
    themeStyle += `\n.piecetheme cg-board piece.knight.black {
      background-image: url("/assets/images/pieces/${pieces}/bN.svg");
    }`;

    styleSheet.textContent = themeStyle;
    container.classList.add("boardtheme", "piecetheme");
  };

  fetch('/random-theme')
  .then(res => {
    if (!res.ok) {
      throw new Error('Network response was not ok');
    }
    return res.json();
  })
  .then(({ board, pieces }) => {
    applyTheme(board, pieces);
  })
  .catch(() => {
    console.log("Fetching theme from server failed, using local fallback.");
    applyTheme("brown.png", "cburnett");
  });

  return styleSheet;
}
