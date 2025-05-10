import { Chess } from "chess.js"
import { Chessground } from "chessground"
import { Color } from "chessground/types"
import { computeDests, getTurnColor } from "./puzzle"
import { VNode } from "snabbdom/vnode"
import { h } from "snabbdom"

export class Puzzle {
  readonly line
  readonly id
  private readonly chess
  private readonly config
  private status
  
  constructor(id:string,fen:string,line:string,rating:number) {
    this.id = id
    this.line = line
    this.chess = new Chess(fen)
    this.config = this.initialiseConfig()
    this.status = ''
  }

  initialiseConfig() {
    let color: Color = getTurnColor(this.chess.turn())
    return {
      orientation: color,
      turnColor: color,
      fen: this.chess.fen,
      movable: {
        color: color,
        free: false,
        dests: computeDests(this.chess)
      }
    }
  }

  pathFromStatus(path) {
    return (this.status == '') ? path : path + "." +this.status
  }
  
  render() {
    
    return h(this.pathFromStatus("section.blue.merida"), [
      h("div.cg-board-wrap", {
        hook: {
          insert: this.runUnit,
          postpatch: this.runUnit
        }
      }),
      h(
        "p",
        h(
          "a",
          {
            props: {
              href: this.url("https://lichess.org"+this.id),
              target: "_blank"
            }
          },
          //this.analysis.judgment.name
        )
      )
    ])
  }

  url(id:string) {
    //const chess = new Chess(this.fen)
    let color: Color = getTurnColor(this.chess.turn())
    let halfMove = parseInt(this.chess.fen().match(/ \d+$/)![0])
    return `https://lichess.org/${id}/${color}#${halfMove - 1}`
  }

  run(el) {
    const cg = Chessground(el, this.config)
    this.originalMove(cg)
    cg.set({
      movable: {
        events: {
          after: (orig, dest) => {
            this.moveAndResult(cg, orig, dest)
          }
        }
      },
      events: {
        select: ({}) => {
          this.originalMove(cg)
        }
      }
    })

    return cg
  }

  originalMove(cg) {
    cg.set({
      drawable: {
        shapes: [this.arrow(this.position.move, "red")]
      }
    })
  }

  moveAndResult(cg, orig, dest) {
    this.chess.move({ from: orig, to: dest })
    cg.set({
      turnColor: getTurnColor(this.chess.turn()),
      movable: {
        color: getTurnColor(this.chess.turn()),
        dests: computeDests(this.chess)
      },
      drawable: {
        shapes: [
          { orig: orig, dest: dest, brush: "yellow" },
          this.arrow(this.position.move, "red"),
          this.arrow(this.position.best, "green")
        ]
      }
    })
  }

  runUnit = (vnode: VNode) => {
    const el = vnode.elm as HTMLElement
    el.className = "cg-board-wrap"
    this.run(el)
  }

  arrow(move, colour) {
    return { orig: move.from, dest: move.to, brush: colour }
  }
}
