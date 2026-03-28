import { h, init } from 'snabbdom';
import klass from 'snabbdom/modules/class';
import attributes from 'snabbdom/modules/attributes';
import props from 'snabbdom/modules/props';
import listeners from 'snabbdom/modules/eventlisteners';
import { Puzzle } from './minipuzzle';

export class Boards {
  patch = init([klass, props, attributes, listeners]);
  vnode: any;
  puzzles: Puzzle[] = [];
  private readonly element: Element;
  private readonly logElement: HTMLElement;

  constructor(element: Element, logElement: HTMLElement) {
        

    this.element = element;
    this.logElement = logElement;
  }

  setPuzzles(raw: any[]): Puzzle[] {

     this.puzzles = raw.map(p => p);
     console.log(this.puzzles)
  
  }
  

  redraw(puzzles = this.puzzles) {
    puzzles = puzzles.map( p=>new Puzzle(p))
    this.vnode = this.patch(this.vnode || this.element, this.render(puzzles));
    }
  

  render(puzzles: Puzzle[]) {
    console.log(1)
    return h('div#chessground-examples', puzzles.map(p => p.render()));
  }



  status(msg: string) {
        console.log(4)

    this.logElement.innerHTML = msg;
  }
}
