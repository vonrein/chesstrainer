
const pieceNames = ["king","queen","rook","bishop","pawn"  ]//handle knight seperately
export function randomTheme(container:HTMLElement){
    fetch('/random-theme')
  .then(res => res.json())
  .then(({ board, pieces }) => {
    let themeStyle = `.${board.match(/^[^\.]+/)[0]} cg-board {
      background-image: url("/assets/images/board/${board}");
    } `

    for(const p of pieceNames){
      themeStyle += `\n.${pieces} cg-board piece.${p}.white {
        background-image: url("/assets/images/pieces/${pieces}/w${p[0].toUpperCase()}.svg");
    }`;
      themeStyle += `\n.${pieces} cg-board piece.${p}.black {
        background-image: url("/assets/images/pieces/${pieces}/b${p[0].toUpperCase()}.svg");
    }`;
      }

      themeStyle += `\n.${pieces} cg-board piece.knight.white {
        background-image: url("/assets/images/pieces/${pieces}/wN.svg");
    }`;
      themeStyle += `\n.${pieces} cg-board piece.knight.black {
        background-image: url("/assets/images/pieces/${pieces}/bN.svg");
    }`;
    
  
    const styleSheet = document.createElement("style");
    styleSheet.textContent = themeStyle;
    document.head.appendChild(styleSheet);

    container.classList.add(board.match(/^[^\.]+/)[0],pieces)
    
  })
}
