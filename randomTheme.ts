
const pieceNames = ["king","queen","rook","bishop","pawn"  ]//handle knight seperately
export function randomTheme(container:HTMLElement){
	
	const styleSheet = document.createElement("style");
	styleSheet.id = "themeStyles"
	
    fetch('/random-theme')
  .then(res => res.json())
  .then(({ board, pieces }) => {
    let themeStyle = `.boardtheme cg-board {
      background-image: url("/assets/images/board/${board}");
    } `

    for(const p of pieceNames){
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
    //document.head.appendChild(styleSheet);

    container.classList.add("boardtheme","piecetheme")
    
    //return styleSheet
  })
  return styleSheet
}
