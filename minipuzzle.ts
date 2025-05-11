import { Chess } from "chess.js";
import { Chessground } from "chessground";
import { Color } from "chessground/types";
//import { computeDests, getTurnColor } from "./puzzle";
import { VNode } from "snabbdom/vnode";
import { h } from "snabbdom";

type RawPuzzle = {
  id: string;
  fen: string;
  line: string;
  rating: number;
};
export class Puzzle {
  private readonly chess: Chess;
  private readonly config: any;

  constructor(public readonly data: RawPuzzle) {
    this.chess = new Chess(data.fen);
    this.config = this.createConfig();
  }

  private createConfig() {
    const color = "white"//getTurnColor(this.chess.turn());
    return {
      orientation: color,
      turnColor: color,
      fen: this.data.fen,
      movable: {
        color,
        free: false,
        //dests: computeDests(this.chess),
        events: {
          after: (orig: string, dest: string) => this.handleMove(orig, dest)
        }
      },
      events: {
        select: () => this.drawInitialArrow()
      },
      drawable: {
        shapes: []
      }
    };
  }

  render(): VNode {
    return h("section.blue.merida", [
      h("div.cg-board-wrap", {
        hook: {
          insert: (vnode) => {
            const el = vnode.elm as HTMLElement;
            this.initBoard(el);
          }
        }
      }),
      h("p", [
        h("a", { props: { href: this.url(), target: "_blank" } }, `Rating: ${this.data.rating}`)
      ])
    ]);
  }

  private initBoard(el: HTMLElement) {
    const cg = Chessground(el, this.config);
    this.drawInitialArrow(cg);
  }

  private drawInitialArrow(cg?: ReturnType<typeof Chessground>) {
    const move = this.getFirstMove();
    const shape = this.arrow(move, "red");
    if (cg) {
      cg.set({ drawable: { shapes: [shape] } });
    } else {
      this.config.drawable.shapes = [shape];
    }
  }

  private handleMove(orig: string, dest: string) {
    this.chess.move({ from: orig, to: dest });

    const shapes = [
      this.arrow({ from: orig, to: dest }, "yellow"),
      this.arrow(this.getFirstMove(), "red"),
      this.arrow(this.getSecondMove(), "green")
    ];

    const updatedConfig = {
      turnColor: "white",//getTurnColor(this.chess.turn()),
      movable: {
        color: "white"//getTurnColor(this.chess.turn()),
        //dests: computeDests(this.chess)
      },
      drawable: { shapes }
    };

    // Update all fields
    this.config.turnColor = updatedConfig.turnColor;
    this.config.movable = updatedConfig.movable;
    this.config.drawable.shapes = updatedConfig.drawable.shapes;
  }

  private getFirstMove() {
    const [from, to] = this.data.line.split(" ");
    return { from, to };
  }

  private getSecondMove() {
    const [, , from, to] = this.data.line.split(" ");
    return { from, to };
  }

  private arrow(move: { from: string; to: string }, brush: string) {
    return { orig: move.from, dest: move.to, brush };
  }

  private url(): string {
    const color: Color = "white"//getTurnColor(this.chess.turn());
    const ply = this.data.line.split(" ").length;
    return `https://lichess.org/${this.data.id}/${color}#${ply}`;
  }

  
}