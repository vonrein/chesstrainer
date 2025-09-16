// These arrays are kept so you can easily use them later to build a theme selector UI.
const boardThemes = ["blue-marble.jpg", "blue.svg", "blue2.jpg", "blue3.jpg", "brown.png", "canvas2.jpg", "green-plastic.png", "green.png", "grey.jpg", "ic.png", "leather.jpg", "maple.jpg", "maple2.jpg", "marble.jpg", "metal.jpg", "ncf-board.png", "olive.jpg", "pink-pyramid.png", "purple.png", "wood.jpg", "wood2.jpg", "wood3.jpg", "wood4.jpg", "xboard.png"];
const pieceThemes = ["alpha", "anarcandy", "caliente", "california", "cardinal", "cburnett", "celtic", "chess7", "chessnut", "companion", "cooke", "dubrovny", "fantasy", "firi", "fresca", "gioco", "governor", "horsey", "icpieces", "kiwen-suwi", "kosal", "leipzig", "letter", "maestro", "merida", "monarchy", "mpchess", "pirouetti", "pixel", "reillycraig", "rhosgfx", "riohacha", "shapes", "spatial", "staunty", "tatiana", "xkcd"];

// A helper array for building the CSS rules. The knight is handled separately.
const pieceNames = ["king", "queen", "rook", "bishop", "pawn"];

/**
 * Creates and returns a <style> element to apply a chess theme.
 * @param container The HTMLElement that contains the cg-board.
 * @param board The filename for the board theme. Defaults to 'brown.png'.
 * @param pieces The name of the piece theme. Defaults to 'cburnett'.
 * @returns The <style> element with the generated theme rules.
 */
export function applyTheme(
  container: HTMLElement,
  board: string = "brown.png",
  pieces: string = "cburnett"
): HTMLStyleElement {
  const styleSheet = document.createElement("style");
  styleSheet.id = "themeStyles";

  let themeStyle = `
    .boardtheme cg-board {
      background-image: url("assets/images/board/${board}");
    }
  `;

  // Generate rules for all pieces except the knight
  for (const p of pieceNames) {
    const pieceInitial = p[0].toUpperCase();
    themeStyle += `
      .piecetheme cg-board piece.${p}.white {
        background-image: url("assets/images/pieces/${pieces}/w${pieceInitial}.svg");
      }
      .piecetheme cg-board piece.${p}.black {
        background-image: url("assets/images/pieces/${pieces}/b${pieceInitial}.svg");
      }
    `;
  }

  // Add specific rules for the knight
  themeStyle += `
    .piecetheme cg-board piece.knight.white {
      background-image: url("assets/images/pieces/${pieces}/wN.svg");
    }
    .piecetheme cg-board piece.knight.black {
      background-image: url("assets/images/pieces/${pieces}/bN.svg");
    }
  `;

  styleSheet.textContent = themeStyle;
  container.classList.add("boardtheme", "piecetheme");

  return styleSheet;
}