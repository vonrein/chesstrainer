"use strict";
(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __esm = (fn, res) => function __init() {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  };
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

  // node_modules/.pnpm/chessground@9.2.1/node_modules/chessground/dist/types.js
  var colors, files, ranks;
  var init_types = __esm({
    "node_modules/.pnpm/chessground@9.2.1/node_modules/chessground/dist/types.js"() {
      colors = ["white", "black"];
      files = ["a", "b", "c", "d", "e", "f", "g", "h"];
      ranks = ["1", "2", "3", "4", "5", "6", "7", "8"];
    }
  });

  // node_modules/.pnpm/chessground@9.2.1/node_modules/chessground/dist/util.js
  function memo(f) {
    let v;
    const ret = () => {
      if (v === void 0)
        v = f();
      return v;
    };
    ret.clear = () => {
      v = void 0;
    };
    return ret;
  }
  function computeSquareCenter(key, asWhite, bounds) {
    const pos = key2pos(key);
    if (!asWhite) {
      pos[0] = 7 - pos[0];
      pos[1] = 7 - pos[1];
    }
    return [
      bounds.left + bounds.width * pos[0] / 8 + bounds.width / 16,
      bounds.top + bounds.height * (7 - pos[1]) / 8 + bounds.height / 16
    ];
  }
  var invRanks, allKeys, pos2key, key2pos, allPos, timer, opposite, distanceSq, samePiece, posToTranslate, translate, translateAndScale, setVisible, eventPosition, isRightButton, createEl;
  var init_util = __esm({
    "node_modules/.pnpm/chessground@9.2.1/node_modules/chessground/dist/util.js"() {
      init_types();
      invRanks = [...ranks].reverse();
      allKeys = Array.prototype.concat(...files.map((c) => ranks.map((r) => c + r)));
      pos2key = (pos) => allKeys[8 * pos[0] + pos[1]];
      key2pos = (k) => [k.charCodeAt(0) - 97, k.charCodeAt(1) - 49];
      allPos = allKeys.map(key2pos);
      timer = () => {
        let startAt;
        return {
          start() {
            startAt = performance.now();
          },
          cancel() {
            startAt = void 0;
          },
          stop() {
            if (!startAt)
              return 0;
            const time = performance.now() - startAt;
            startAt = void 0;
            return time;
          }
        };
      };
      opposite = (c) => c === "white" ? "black" : "white";
      distanceSq = (pos1, pos2) => {
        const dx = pos1[0] - pos2[0], dy = pos1[1] - pos2[1];
        return dx * dx + dy * dy;
      };
      samePiece = (p1, p2) => p1.role === p2.role && p1.color === p2.color;
      posToTranslate = (bounds) => (pos, asWhite) => [
        (asWhite ? pos[0] : 7 - pos[0]) * bounds.width / 8,
        (asWhite ? 7 - pos[1] : pos[1]) * bounds.height / 8
      ];
      translate = (el, pos) => {
        el.style.transform = `translate(${pos[0]}px,${pos[1]}px)`;
      };
      translateAndScale = (el, pos, scale = 1) => {
        el.style.transform = `translate(${pos[0]}px,${pos[1]}px) scale(${scale})`;
      };
      setVisible = (el, v) => {
        el.style.visibility = v ? "visible" : "hidden";
      };
      eventPosition = (e) => {
        var _a;
        if (e.clientX || e.clientX === 0)
          return [e.clientX, e.clientY];
        if ((_a = e.targetTouches) === null || _a === void 0 ? void 0 : _a[0])
          return [e.targetTouches[0].clientX, e.targetTouches[0].clientY];
        return;
      };
      isRightButton = (e) => e.button === 2;
      createEl = (tagName, className) => {
        const el = document.createElement(tagName);
        if (className)
          el.className = className;
        return el;
      };
    }
  });

  // node_modules/.pnpm/chessground@9.2.1/node_modules/chessground/dist/premove.js
  function rookFilesOf(pieces, color) {
    const backrank = color === "white" ? "1" : "8";
    const files2 = [];
    for (const [key, piece] of pieces) {
      if (key[1] === backrank && piece.color === color && piece.role === "rook") {
        files2.push(key2pos(key)[0]);
      }
    }
    return files2;
  }
  function premove(pieces, key, canCastle) {
    const piece = pieces.get(key);
    if (!piece)
      return [];
    const pos = key2pos(key), r = piece.role, mobility = r === "pawn" ? pawn(piece.color) : r === "knight" ? knight : r === "bishop" ? bishop : r === "rook" ? rook : r === "queen" ? queen : king(piece.color, rookFilesOf(pieces, piece.color), canCastle);
    return allPos.filter((pos2) => (pos[0] !== pos2[0] || pos[1] !== pos2[1]) && mobility(pos[0], pos[1], pos2[0], pos2[1])).map(pos2key);
  }
  var diff, pawn, knight, bishop, rook, queen, king;
  var init_premove = __esm({
    "node_modules/.pnpm/chessground@9.2.1/node_modules/chessground/dist/premove.js"() {
      init_util();
      diff = (a, b) => Math.abs(a - b);
      pawn = (color) => (x1, y1, x2, y2) => diff(x1, x2) < 2 && (color === "white" ? (
        // allow 2 squares from first two ranks, for horde
        y2 === y1 + 1 || y1 <= 1 && y2 === y1 + 2 && x1 === x2
      ) : y2 === y1 - 1 || y1 >= 6 && y2 === y1 - 2 && x1 === x2);
      knight = (x1, y1, x2, y2) => {
        const xd = diff(x1, x2);
        const yd = diff(y1, y2);
        return xd === 1 && yd === 2 || xd === 2 && yd === 1;
      };
      bishop = (x1, y1, x2, y2) => {
        return diff(x1, x2) === diff(y1, y2);
      };
      rook = (x1, y1, x2, y2) => {
        return x1 === x2 || y1 === y2;
      };
      queen = (x1, y1, x2, y2) => {
        return bishop(x1, y1, x2, y2) || rook(x1, y1, x2, y2);
      };
      king = (color, rookFiles, canCastle) => (x1, y1, x2, y2) => diff(x1, x2) < 2 && diff(y1, y2) < 2 || canCastle && y1 === y2 && y1 === (color === "white" ? 0 : 7) && (x1 === 4 && (x2 === 2 && rookFiles.includes(0) || x2 === 6 && rookFiles.includes(7)) || rookFiles.includes(x2));
    }
  });

  // node_modules/.pnpm/chessground@9.2.1/node_modules/chessground/dist/board.js
  function callUserFunction(f, ...args) {
    if (f)
      setTimeout(() => f(...args), 1);
  }
  function toggleOrientation(state) {
    state.orientation = opposite(state.orientation);
    state.animation.current = state.draggable.current = state.selected = void 0;
  }
  function setPieces(state, pieces) {
    for (const [key, piece] of pieces) {
      if (piece)
        state.pieces.set(key, piece);
      else
        state.pieces.delete(key);
    }
  }
  function setCheck(state, color) {
    state.check = void 0;
    if (color === true)
      color = state.turnColor;
    if (color)
      for (const [k, p] of state.pieces) {
        if (p.role === "king" && p.color === color) {
          state.check = k;
        }
      }
  }
  function setPremove(state, orig, dest, meta) {
    unsetPredrop(state);
    state.premovable.current = [orig, dest];
    callUserFunction(state.premovable.events.set, orig, dest, meta);
  }
  function unsetPremove(state) {
    if (state.premovable.current) {
      state.premovable.current = void 0;
      callUserFunction(state.premovable.events.unset);
    }
  }
  function setPredrop(state, role, key) {
    unsetPremove(state);
    state.predroppable.current = { role, key };
    callUserFunction(state.predroppable.events.set, role, key);
  }
  function unsetPredrop(state) {
    const pd = state.predroppable;
    if (pd.current) {
      pd.current = void 0;
      callUserFunction(pd.events.unset);
    }
  }
  function tryAutoCastle(state, orig, dest) {
    if (!state.autoCastle)
      return false;
    const king2 = state.pieces.get(orig);
    if (!king2 || king2.role !== "king")
      return false;
    const origPos = key2pos(orig);
    const destPos = key2pos(dest);
    if (origPos[1] !== 0 && origPos[1] !== 7 || origPos[1] !== destPos[1])
      return false;
    if (origPos[0] === 4 && !state.pieces.has(dest)) {
      if (destPos[0] === 6)
        dest = pos2key([7, destPos[1]]);
      else if (destPos[0] === 2)
        dest = pos2key([0, destPos[1]]);
    }
    const rook2 = state.pieces.get(dest);
    if (!rook2 || rook2.color !== king2.color || rook2.role !== "rook")
      return false;
    state.pieces.delete(orig);
    state.pieces.delete(dest);
    if (origPos[0] < destPos[0]) {
      state.pieces.set(pos2key([6, destPos[1]]), king2);
      state.pieces.set(pos2key([5, destPos[1]]), rook2);
    } else {
      state.pieces.set(pos2key([2, destPos[1]]), king2);
      state.pieces.set(pos2key([3, destPos[1]]), rook2);
    }
    return true;
  }
  function baseMove(state, orig, dest) {
    const origPiece = state.pieces.get(orig), destPiece = state.pieces.get(dest);
    if (orig === dest || !origPiece)
      return false;
    const captured = destPiece && destPiece.color !== origPiece.color ? destPiece : void 0;
    if (dest === state.selected)
      unselect(state);
    callUserFunction(state.events.move, orig, dest, captured);
    if (!tryAutoCastle(state, orig, dest)) {
      state.pieces.set(dest, origPiece);
      state.pieces.delete(orig);
    }
    state.lastMove = [orig, dest];
    state.check = void 0;
    callUserFunction(state.events.change);
    return captured || true;
  }
  function baseNewPiece(state, piece, key, force) {
    if (state.pieces.has(key)) {
      if (force)
        state.pieces.delete(key);
      else
        return false;
    }
    callUserFunction(state.events.dropNewPiece, piece, key);
    state.pieces.set(key, piece);
    state.lastMove = [key];
    state.check = void 0;
    callUserFunction(state.events.change);
    state.movable.dests = void 0;
    state.turnColor = opposite(state.turnColor);
    return true;
  }
  function baseUserMove(state, orig, dest) {
    const result = baseMove(state, orig, dest);
    if (result) {
      state.movable.dests = void 0;
      state.turnColor = opposite(state.turnColor);
      state.animation.current = void 0;
    }
    return result;
  }
  function userMove(state, orig, dest) {
    if (canMove(state, orig, dest)) {
      const result = baseUserMove(state, orig, dest);
      if (result) {
        const holdTime = state.hold.stop();
        unselect(state);
        const metadata = {
          premove: false,
          ctrlKey: state.stats.ctrlKey,
          holdTime
        };
        if (result !== true)
          metadata.captured = result;
        callUserFunction(state.movable.events.after, orig, dest, metadata);
        return true;
      }
    } else if (canPremove(state, orig, dest)) {
      setPremove(state, orig, dest, {
        ctrlKey: state.stats.ctrlKey
      });
      unselect(state);
      return true;
    }
    unselect(state);
    return false;
  }
  function dropNewPiece(state, orig, dest, force) {
    const piece = state.pieces.get(orig);
    if (piece && (canDrop(state, orig, dest) || force)) {
      state.pieces.delete(orig);
      baseNewPiece(state, piece, dest, force);
      callUserFunction(state.movable.events.afterNewPiece, piece.role, dest, {
        premove: false,
        predrop: false
      });
    } else if (piece && canPredrop(state, orig, dest)) {
      setPredrop(state, piece.role, dest);
    } else {
      unsetPremove(state);
      unsetPredrop(state);
    }
    state.pieces.delete(orig);
    unselect(state);
  }
  function selectSquare(state, key, force) {
    callUserFunction(state.events.select, key);
    if (state.selected) {
      if (state.selected === key && !state.draggable.enabled) {
        unselect(state);
        state.hold.cancel();
        return;
      } else if ((state.selectable.enabled || force) && state.selected !== key) {
        if (userMove(state, state.selected, key)) {
          state.stats.dragged = false;
          return;
        }
      }
    }
    if ((state.selectable.enabled || state.draggable.enabled) && (isMovable(state, key) || isPremovable(state, key))) {
      setSelected(state, key);
      state.hold.start();
    }
  }
  function setSelected(state, key) {
    state.selected = key;
    if (isPremovable(state, key)) {
      if (!state.premovable.customDests) {
        state.premovable.dests = premove(state.pieces, key, state.premovable.castle);
      }
    } else
      state.premovable.dests = void 0;
  }
  function unselect(state) {
    state.selected = void 0;
    state.premovable.dests = void 0;
    state.hold.cancel();
  }
  function isMovable(state, orig) {
    const piece = state.pieces.get(orig);
    return !!piece && (state.movable.color === "both" || state.movable.color === piece.color && state.turnColor === piece.color);
  }
  function canDrop(state, orig, dest) {
    const piece = state.pieces.get(orig);
    return !!piece && (orig === dest || !state.pieces.has(dest)) && (state.movable.color === "both" || state.movable.color === piece.color && state.turnColor === piece.color);
  }
  function isPremovable(state, orig) {
    const piece = state.pieces.get(orig);
    return !!piece && state.premovable.enabled && state.movable.color === piece.color && state.turnColor !== piece.color;
  }
  function canPremove(state, orig, dest) {
    var _a, _b;
    const validPremoves = (_b = (_a = state.premovable.customDests) === null || _a === void 0 ? void 0 : _a.get(orig)) !== null && _b !== void 0 ? _b : premove(state.pieces, orig, state.premovable.castle);
    return orig !== dest && isPremovable(state, orig) && validPremoves.includes(dest);
  }
  function canPredrop(state, orig, dest) {
    const piece = state.pieces.get(orig);
    const destPiece = state.pieces.get(dest);
    return !!piece && (!destPiece || destPiece.color !== state.movable.color) && state.predroppable.enabled && (piece.role !== "pawn" || dest[1] !== "1" && dest[1] !== "8") && state.movable.color === piece.color && state.turnColor !== piece.color;
  }
  function isDraggable(state, orig) {
    const piece = state.pieces.get(orig);
    return !!piece && state.draggable.enabled && (state.movable.color === "both" || state.movable.color === piece.color && (state.turnColor === piece.color || state.premovable.enabled));
  }
  function playPremove(state) {
    const move3 = state.premovable.current;
    if (!move3)
      return false;
    const orig = move3[0], dest = move3[1];
    let success = false;
    if (canMove(state, orig, dest)) {
      const result = baseUserMove(state, orig, dest);
      if (result) {
        const metadata = { premove: true };
        if (result !== true)
          metadata.captured = result;
        callUserFunction(state.movable.events.after, orig, dest, metadata);
        success = true;
      }
    }
    unsetPremove(state);
    return success;
  }
  function playPredrop(state, validate) {
    const drop2 = state.predroppable.current;
    let success = false;
    if (!drop2)
      return false;
    if (validate(drop2)) {
      const piece = {
        role: drop2.role,
        color: state.movable.color
      };
      if (baseNewPiece(state, piece, drop2.key)) {
        callUserFunction(state.movable.events.afterNewPiece, drop2.role, drop2.key, {
          premove: false,
          predrop: true
        });
        success = true;
      }
    }
    unsetPredrop(state);
    return success;
  }
  function cancelMove(state) {
    unsetPremove(state);
    unsetPredrop(state);
    unselect(state);
  }
  function stop(state) {
    state.movable.color = state.movable.dests = state.animation.current = void 0;
    cancelMove(state);
  }
  function getKeyAtDomPos(pos, asWhite, bounds) {
    let file = Math.floor(8 * (pos[0] - bounds.left) / bounds.width);
    if (!asWhite)
      file = 7 - file;
    let rank = 7 - Math.floor(8 * (pos[1] - bounds.top) / bounds.height);
    if (!asWhite)
      rank = 7 - rank;
    return file >= 0 && file < 8 && rank >= 0 && rank < 8 ? pos2key([file, rank]) : void 0;
  }
  function getSnappedKeyAtDomPos(orig, pos, asWhite, bounds) {
    const origPos = key2pos(orig);
    const validSnapPos = allPos.filter((pos2) => queen(origPos[0], origPos[1], pos2[0], pos2[1]) || knight(origPos[0], origPos[1], pos2[0], pos2[1]));
    const validSnapCenters = validSnapPos.map((pos2) => computeSquareCenter(pos2key(pos2), asWhite, bounds));
    const validSnapDistances = validSnapCenters.map((pos2) => distanceSq(pos, pos2));
    const [, closestSnapIndex] = validSnapDistances.reduce((a, b, index) => a[0] < b ? a : [b, index], [validSnapDistances[0], 0]);
    return pos2key(validSnapPos[closestSnapIndex]);
  }
  var canMove, whitePov;
  var init_board = __esm({
    "node_modules/.pnpm/chessground@9.2.1/node_modules/chessground/dist/board.js"() {
      init_util();
      init_premove();
      canMove = (state, orig, dest) => {
        var _a, _b;
        return orig !== dest && isMovable(state, orig) && (state.movable.free || !!((_b = (_a = state.movable.dests) === null || _a === void 0 ? void 0 : _a.get(orig)) === null || _b === void 0 ? void 0 : _b.includes(dest)));
      };
      whitePov = (s) => s.orientation === "white";
    }
  });

  // node_modules/.pnpm/chessground@9.2.1/node_modules/chessground/dist/fen.js
  function read(fen) {
    if (fen === "start")
      fen = initial;
    const pieces = /* @__PURE__ */ new Map();
    let row = 7, col = 0;
    for (const c of fen) {
      switch (c) {
        case " ":
        case "[":
          return pieces;
        case "/":
          --row;
          if (row < 0)
            return pieces;
          col = 0;
          break;
        case "~": {
          const piece = pieces.get(pos2key([col - 1, row]));
          if (piece)
            piece.promoted = true;
          break;
        }
        default: {
          const nb = c.charCodeAt(0);
          if (nb < 57)
            col += nb - 48;
          else {
            const role = c.toLowerCase();
            pieces.set(pos2key([col, row]), {
              role: roles[role],
              color: c === role ? "black" : "white"
            });
            ++col;
          }
        }
      }
    }
    return pieces;
  }
  function write(pieces) {
    return invRanks.map((y) => files.map((x) => {
      const piece = pieces.get(x + y);
      if (piece) {
        let p = letters[piece.role];
        if (piece.color === "white")
          p = p.toUpperCase();
        if (piece.promoted)
          p += "~";
        return p;
      } else
        return "1";
    }).join("")).join("/").replace(/1{2,}/g, (s) => s.length.toString());
  }
  var initial, roles, letters;
  var init_fen = __esm({
    "node_modules/.pnpm/chessground@9.2.1/node_modules/chessground/dist/fen.js"() {
      init_util();
      init_types();
      initial = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR";
      roles = {
        p: "pawn",
        r: "rook",
        n: "knight",
        b: "bishop",
        q: "queen",
        k: "king"
      };
      letters = {
        pawn: "p",
        rook: "r",
        knight: "n",
        bishop: "b",
        queen: "q",
        king: "k"
      };
    }
  });

  // node_modules/.pnpm/chessground@9.2.1/node_modules/chessground/dist/config.js
  function applyAnimation(state, config) {
    if (config.animation) {
      deepMerge(state.animation, config.animation);
      if ((state.animation.duration || 0) < 70)
        state.animation.enabled = false;
    }
  }
  function configure(state, config) {
    var _a, _b, _c;
    if ((_a = config.movable) === null || _a === void 0 ? void 0 : _a.dests)
      state.movable.dests = void 0;
    if ((_b = config.drawable) === null || _b === void 0 ? void 0 : _b.autoShapes)
      state.drawable.autoShapes = [];
    deepMerge(state, config);
    if (config.fen) {
      state.pieces = read(config.fen);
      state.drawable.shapes = ((_c = config.drawable) === null || _c === void 0 ? void 0 : _c.shapes) || [];
    }
    if ("check" in config)
      setCheck(state, config.check || false);
    if ("lastMove" in config && !config.lastMove)
      state.lastMove = void 0;
    else if (config.lastMove)
      state.lastMove = config.lastMove;
    if (state.selected)
      setSelected(state, state.selected);
    applyAnimation(state, config);
    if (!state.movable.rookCastle && state.movable.dests) {
      const rank = state.movable.color === "white" ? "1" : "8", kingStartPos = "e" + rank, dests = state.movable.dests.get(kingStartPos), king2 = state.pieces.get(kingStartPos);
      if (!dests || !king2 || king2.role !== "king")
        return;
      state.movable.dests.set(kingStartPos, dests.filter((d) => !(d === "a" + rank && dests.includes("c" + rank)) && !(d === "h" + rank && dests.includes("g" + rank))));
    }
  }
  function deepMerge(base, extend) {
    for (const key in extend) {
      if (key === "__proto__" || key === "constructor" || !Object.prototype.hasOwnProperty.call(extend, key))
        continue;
      if (Object.prototype.hasOwnProperty.call(base, key) && isPlainObject(base[key]) && isPlainObject(extend[key]))
        deepMerge(base[key], extend[key]);
      else
        base[key] = extend[key];
    }
  }
  function isPlainObject(o) {
    if (typeof o !== "object" || o === null)
      return false;
    const proto = Object.getPrototypeOf(o);
    return proto === Object.prototype || proto === null;
  }
  var init_config = __esm({
    "node_modules/.pnpm/chessground@9.2.1/node_modules/chessground/dist/config.js"() {
      init_board();
      init_fen();
    }
  });

  // node_modules/.pnpm/chessground@9.2.1/node_modules/chessground/dist/anim.js
  function render(mutation, state) {
    const result = mutation(state);
    state.dom.redraw();
    return result;
  }
  function computePlan(prevPieces, current) {
    const anims = /* @__PURE__ */ new Map(), animedOrigs = [], fadings = /* @__PURE__ */ new Map(), missings = [], news = [], prePieces = /* @__PURE__ */ new Map();
    let curP, preP, vector;
    for (const [k, p] of prevPieces) {
      prePieces.set(k, makePiece(k, p));
    }
    for (const key of allKeys) {
      curP = current.pieces.get(key);
      preP = prePieces.get(key);
      if (curP) {
        if (preP) {
          if (!samePiece(curP, preP.piece)) {
            missings.push(preP);
            news.push(makePiece(key, curP));
          }
        } else
          news.push(makePiece(key, curP));
      } else if (preP)
        missings.push(preP);
    }
    for (const newP of news) {
      preP = closer(newP, missings.filter((p) => samePiece(newP.piece, p.piece)));
      if (preP) {
        vector = [preP.pos[0] - newP.pos[0], preP.pos[1] - newP.pos[1]];
        anims.set(newP.key, vector.concat(vector));
        animedOrigs.push(preP.key);
      }
    }
    for (const p of missings) {
      if (!animedOrigs.includes(p.key))
        fadings.set(p.key, p.piece);
    }
    return {
      anims,
      fadings
    };
  }
  function step(state, now) {
    const cur = state.animation.current;
    if (cur === void 0) {
      if (!state.dom.destroyed)
        state.dom.redrawNow();
      return;
    }
    const rest = 1 - (now - cur.start) * cur.frequency;
    if (rest <= 0) {
      state.animation.current = void 0;
      state.dom.redrawNow();
    } else {
      const ease = easing(rest);
      for (const cfg of cur.plan.anims.values()) {
        cfg[2] = cfg[0] * ease;
        cfg[3] = cfg[1] * ease;
      }
      state.dom.redrawNow(true);
      requestAnimationFrame((now2 = performance.now()) => step(state, now2));
    }
  }
  function animate(mutation, state) {
    const prevPieces = new Map(state.pieces);
    const result = mutation(state);
    const plan = computePlan(prevPieces, state);
    if (plan.anims.size || plan.fadings.size) {
      const alreadyRunning = state.animation.current && state.animation.current.start;
      state.animation.current = {
        start: performance.now(),
        frequency: 1 / state.animation.duration,
        plan
      };
      if (!alreadyRunning)
        step(state, performance.now());
    } else {
      state.dom.redraw();
    }
    return result;
  }
  var anim, makePiece, closer, easing;
  var init_anim = __esm({
    "node_modules/.pnpm/chessground@9.2.1/node_modules/chessground/dist/anim.js"() {
      init_util();
      anim = (mutation, state) => state.animation.enabled ? animate(mutation, state) : render(mutation, state);
      makePiece = (key, piece) => ({
        key,
        pos: key2pos(key),
        piece
      });
      closer = (piece, pieces) => pieces.sort((p1, p2) => distanceSq(piece.pos, p1.pos) - distanceSq(piece.pos, p2.pos))[0];
      easing = (t) => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    }
  });

  // node_modules/.pnpm/chessground@9.2.1/node_modules/chessground/dist/draw.js
  function start(state, e) {
    if (e.touches && e.touches.length > 1)
      return;
    e.stopPropagation();
    e.preventDefault();
    e.ctrlKey ? unselect(state) : cancelMove(state);
    const pos = eventPosition(e), orig = getKeyAtDomPos(pos, whitePov(state), state.dom.bounds());
    if (!orig)
      return;
    state.drawable.current = {
      orig,
      pos,
      brush: eventBrush(e),
      snapToValidMove: state.drawable.defaultSnapToValidMove
    };
    processDraw(state);
  }
  function processDraw(state) {
    requestAnimationFrame(() => {
      const cur = state.drawable.current;
      if (cur) {
        const keyAtDomPos = getKeyAtDomPos(cur.pos, whitePov(state), state.dom.bounds());
        if (!keyAtDomPos) {
          cur.snapToValidMove = false;
        }
        const mouseSq = cur.snapToValidMove ? getSnappedKeyAtDomPos(cur.orig, cur.pos, whitePov(state), state.dom.bounds()) : keyAtDomPos;
        if (mouseSq !== cur.mouseSq) {
          cur.mouseSq = mouseSq;
          cur.dest = mouseSq !== cur.orig ? mouseSq : void 0;
          state.dom.redrawNow();
        }
        processDraw(state);
      }
    });
  }
  function move(state, e) {
    if (state.drawable.current)
      state.drawable.current.pos = eventPosition(e);
  }
  function end(state) {
    const cur = state.drawable.current;
    if (cur) {
      if (cur.mouseSq)
        addShape(state.drawable, cur);
      cancel(state);
    }
  }
  function cancel(state) {
    if (state.drawable.current) {
      state.drawable.current = void 0;
      state.dom.redraw();
    }
  }
  function clear(state) {
    if (state.drawable.shapes.length) {
      state.drawable.shapes = [];
      state.dom.redraw();
      onChange(state.drawable);
    }
  }
  function eventBrush(e) {
    var _a;
    const modA = (e.shiftKey || e.ctrlKey) && isRightButton(e);
    const modB = e.altKey || e.metaKey || ((_a = e.getModifierState) === null || _a === void 0 ? void 0 : _a.call(e, "AltGraph"));
    return brushes[(modA ? 1 : 0) + (modB ? 2 : 0)];
  }
  function addShape(drawable, cur) {
    const sameShape = (s) => s.orig === cur.orig && s.dest === cur.dest;
    const similar = drawable.shapes.find(sameShape);
    if (similar)
      drawable.shapes = drawable.shapes.filter((s) => !sameShape(s));
    if (!similar || similar.brush !== cur.brush)
      drawable.shapes.push({
        orig: cur.orig,
        dest: cur.dest,
        brush: cur.brush
      });
    onChange(drawable);
  }
  function onChange(drawable) {
    if (drawable.onChange)
      drawable.onChange(drawable.shapes);
  }
  var brushes;
  var init_draw = __esm({
    "node_modules/.pnpm/chessground@9.2.1/node_modules/chessground/dist/draw.js"() {
      init_board();
      init_util();
      brushes = ["green", "red", "blue", "yellow"];
    }
  });

  // node_modules/.pnpm/chessground@9.2.1/node_modules/chessground/dist/drag.js
  function start2(s, e) {
    if (!(s.trustAllEvents || e.isTrusted))
      return;
    if (e.buttons !== void 0 && e.buttons > 1)
      return;
    if (e.touches && e.touches.length > 1)
      return;
    const bounds = s.dom.bounds(), position = eventPosition(e), orig = getKeyAtDomPos(position, whitePov(s), bounds);
    if (!orig)
      return;
    const piece = s.pieces.get(orig);
    const previouslySelected = s.selected;
    if (!previouslySelected && s.drawable.enabled && (s.drawable.eraseOnClick || !piece || piece.color !== s.turnColor))
      clear(s);
    if (e.cancelable !== false && (!e.touches || s.blockTouchScroll || piece || previouslySelected || pieceCloseTo(s, position)))
      e.preventDefault();
    else if (e.touches)
      return;
    const hadPremove = !!s.premovable.current;
    const hadPredrop = !!s.predroppable.current;
    s.stats.ctrlKey = e.ctrlKey;
    if (s.selected && canMove(s, s.selected, orig)) {
      anim((state) => selectSquare(state, orig), s);
    } else {
      selectSquare(s, orig);
    }
    const stillSelected = s.selected === orig;
    const element = pieceElementByKey(s, orig);
    if (piece && element && stillSelected && isDraggable(s, orig)) {
      s.draggable.current = {
        orig,
        piece,
        origPos: position,
        pos: position,
        started: s.draggable.autoDistance && s.stats.dragged,
        element,
        previouslySelected,
        originTarget: e.target,
        keyHasChanged: false
      };
      element.cgDragging = true;
      element.classList.add("dragging");
      const ghost = s.dom.elements.ghost;
      if (ghost) {
        ghost.className = `ghost ${piece.color} ${piece.role}`;
        translate(ghost, posToTranslate(bounds)(key2pos(orig), whitePov(s)));
        setVisible(ghost, true);
      }
      processDrag(s);
    } else {
      if (hadPremove)
        unsetPremove(s);
      if (hadPredrop)
        unsetPredrop(s);
    }
    s.dom.redraw();
  }
  function pieceCloseTo(s, pos) {
    const asWhite = whitePov(s), bounds = s.dom.bounds(), radiusSq = Math.pow(bounds.width / 8, 2);
    for (const key of s.pieces.keys()) {
      const center = computeSquareCenter(key, asWhite, bounds);
      if (distanceSq(center, pos) <= radiusSq)
        return true;
    }
    return false;
  }
  function dragNewPiece(s, piece, e, force) {
    const key = "a0";
    s.pieces.set(key, piece);
    s.dom.redraw();
    const position = eventPosition(e);
    s.draggable.current = {
      orig: key,
      piece,
      origPos: position,
      pos: position,
      started: true,
      element: () => pieceElementByKey(s, key),
      originTarget: e.target,
      newPiece: true,
      force: !!force,
      keyHasChanged: false
    };
    processDrag(s);
  }
  function processDrag(s) {
    requestAnimationFrame(() => {
      var _a;
      const cur = s.draggable.current;
      if (!cur)
        return;
      if ((_a = s.animation.current) === null || _a === void 0 ? void 0 : _a.plan.anims.has(cur.orig))
        s.animation.current = void 0;
      const origPiece = s.pieces.get(cur.orig);
      if (!origPiece || !samePiece(origPiece, cur.piece))
        cancel2(s);
      else {
        if (!cur.started && distanceSq(cur.pos, cur.origPos) >= Math.pow(s.draggable.distance, 2))
          cur.started = true;
        if (cur.started) {
          if (typeof cur.element === "function") {
            const found = cur.element();
            if (!found)
              return;
            found.cgDragging = true;
            found.classList.add("dragging");
            cur.element = found;
          }
          const bounds = s.dom.bounds();
          translate(cur.element, [
            cur.pos[0] - bounds.left - bounds.width / 16,
            cur.pos[1] - bounds.top - bounds.height / 16
          ]);
          cur.keyHasChanged || (cur.keyHasChanged = cur.orig !== getKeyAtDomPos(cur.pos, whitePov(s), bounds));
        }
      }
      processDrag(s);
    });
  }
  function move2(s, e) {
    if (s.draggable.current && (!e.touches || e.touches.length < 2)) {
      s.draggable.current.pos = eventPosition(e);
    }
  }
  function end2(s, e) {
    const cur = s.draggable.current;
    if (!cur)
      return;
    if (e.type === "touchend" && e.cancelable !== false)
      e.preventDefault();
    if (e.type === "touchend" && cur.originTarget !== e.target && !cur.newPiece) {
      s.draggable.current = void 0;
      return;
    }
    unsetPremove(s);
    unsetPredrop(s);
    const eventPos = eventPosition(e) || cur.pos;
    const dest = getKeyAtDomPos(eventPos, whitePov(s), s.dom.bounds());
    if (dest && cur.started && cur.orig !== dest) {
      if (cur.newPiece)
        dropNewPiece(s, cur.orig, dest, cur.force);
      else {
        s.stats.ctrlKey = e.ctrlKey;
        if (userMove(s, cur.orig, dest))
          s.stats.dragged = true;
      }
    } else if (cur.newPiece) {
      s.pieces.delete(cur.orig);
    } else if (s.draggable.deleteOnDropOff && !dest) {
      s.pieces.delete(cur.orig);
      callUserFunction(s.events.change);
    }
    if ((cur.orig === cur.previouslySelected || cur.keyHasChanged) && (cur.orig === dest || !dest))
      unselect(s);
    else if (!s.selectable.enabled)
      unselect(s);
    removeDragElements(s);
    s.draggable.current = void 0;
    s.dom.redraw();
  }
  function cancel2(s) {
    const cur = s.draggable.current;
    if (cur) {
      if (cur.newPiece)
        s.pieces.delete(cur.orig);
      s.draggable.current = void 0;
      unselect(s);
      removeDragElements(s);
      s.dom.redraw();
    }
  }
  function removeDragElements(s) {
    const e = s.dom.elements;
    if (e.ghost)
      setVisible(e.ghost, false);
  }
  function pieceElementByKey(s, key) {
    let el = s.dom.elements.board.firstChild;
    while (el) {
      if (el.cgKey === key && el.tagName === "PIECE")
        return el;
      el = el.nextSibling;
    }
    return;
  }
  var init_drag = __esm({
    "node_modules/.pnpm/chessground@9.2.1/node_modules/chessground/dist/drag.js"() {
      init_board();
      init_util();
      init_draw();
      init_anim();
    }
  });

  // node_modules/.pnpm/chessground@9.2.1/node_modules/chessground/dist/explosion.js
  function explosion(state, keys) {
    state.exploding = { stage: 1, keys };
    state.dom.redraw();
    setTimeout(() => {
      setStage(state, 2);
      setTimeout(() => setStage(state, void 0), 120);
    }, 120);
  }
  function setStage(state, stage) {
    if (state.exploding) {
      if (stage)
        state.exploding.stage = stage;
      else
        state.exploding = void 0;
      state.dom.redraw();
    }
  }
  var init_explosion = __esm({
    "node_modules/.pnpm/chessground@9.2.1/node_modules/chessground/dist/explosion.js"() {
    }
  });

  // node_modules/.pnpm/chessground@9.2.1/node_modules/chessground/dist/api.js
  function start3(state, redrawAll) {
    function toggleOrientation2() {
      toggleOrientation(state);
      redrawAll();
    }
    return {
      set(config) {
        if (config.orientation && config.orientation !== state.orientation)
          toggleOrientation2();
        applyAnimation(state, config);
        (config.fen ? anim : render)((state2) => configure(state2, config), state);
      },
      state,
      getFen: () => write(state.pieces),
      toggleOrientation: toggleOrientation2,
      setPieces(pieces) {
        anim((state2) => setPieces(state2, pieces), state);
      },
      selectSquare(key, force) {
        if (key)
          anim((state2) => selectSquare(state2, key, force), state);
        else if (state.selected) {
          unselect(state);
          state.dom.redraw();
        }
      },
      move(orig, dest) {
        anim((state2) => baseMove(state2, orig, dest), state);
      },
      newPiece(piece, key) {
        anim((state2) => baseNewPiece(state2, piece, key), state);
      },
      playPremove() {
        if (state.premovable.current) {
          if (anim(playPremove, state))
            return true;
          state.dom.redraw();
        }
        return false;
      },
      playPredrop(validate) {
        if (state.predroppable.current) {
          const result = playPredrop(state, validate);
          state.dom.redraw();
          return result;
        }
        return false;
      },
      cancelPremove() {
        render(unsetPremove, state);
      },
      cancelPredrop() {
        render(unsetPredrop, state);
      },
      cancelMove() {
        render((state2) => {
          cancelMove(state2);
          cancel2(state2);
        }, state);
      },
      stop() {
        render((state2) => {
          stop(state2);
          cancel2(state2);
        }, state);
      },
      explode(keys) {
        explosion(state, keys);
      },
      setAutoShapes(shapes) {
        render((state2) => state2.drawable.autoShapes = shapes, state);
      },
      setShapes(shapes) {
        render((state2) => state2.drawable.shapes = shapes, state);
      },
      getKeyAtDomPos(pos) {
        return getKeyAtDomPos(pos, whitePov(state), state.dom.bounds());
      },
      redrawAll,
      dragNewPiece(piece, event, force) {
        dragNewPiece(state, piece, event, force);
      },
      destroy() {
        stop(state);
        state.dom.unbind && state.dom.unbind();
        state.dom.destroyed = true;
      }
    };
  }
  var init_api = __esm({
    "node_modules/.pnpm/chessground@9.2.1/node_modules/chessground/dist/api.js"() {
      init_board();
      init_fen();
      init_config();
      init_anim();
      init_drag();
      init_explosion();
    }
  });

  // node_modules/.pnpm/chessground@9.2.1/node_modules/chessground/dist/state.js
  function defaults() {
    return {
      pieces: read(initial),
      orientation: "white",
      turnColor: "white",
      coordinates: true,
      coordinatesOnSquares: false,
      ranksPosition: "right",
      autoCastle: true,
      viewOnly: false,
      disableContextMenu: false,
      addPieceZIndex: false,
      blockTouchScroll: false,
      pieceKey: false,
      trustAllEvents: false,
      highlight: {
        lastMove: true,
        check: true
      },
      animation: {
        enabled: true,
        duration: 200
      },
      movable: {
        free: true,
        color: "both",
        showDests: true,
        events: {},
        rookCastle: true
      },
      premovable: {
        enabled: true,
        showDests: true,
        castle: true,
        events: {}
      },
      predroppable: {
        enabled: false,
        events: {}
      },
      draggable: {
        enabled: true,
        distance: 3,
        autoDistance: true,
        showGhost: true,
        deleteOnDropOff: false
      },
      dropmode: {
        active: false
      },
      selectable: {
        enabled: true
      },
      stats: {
        // on touchscreen, default to "tap-tap" moves
        // instead of drag
        dragged: !("ontouchstart" in window)
      },
      events: {},
      drawable: {
        enabled: true,
        // can draw
        visible: true,
        // can view
        defaultSnapToValidMove: true,
        eraseOnClick: true,
        shapes: [],
        autoShapes: [],
        brushes: {
          green: { key: "g", color: "#15781B", opacity: 1, lineWidth: 10 },
          red: { key: "r", color: "#882020", opacity: 1, lineWidth: 10 },
          blue: { key: "b", color: "#003088", opacity: 1, lineWidth: 10 },
          yellow: { key: "y", color: "#e68f00", opacity: 1, lineWidth: 10 },
          paleBlue: { key: "pb", color: "#003088", opacity: 0.4, lineWidth: 15 },
          paleGreen: { key: "pg", color: "#15781B", opacity: 0.4, lineWidth: 15 },
          paleRed: { key: "pr", color: "#882020", opacity: 0.4, lineWidth: 15 },
          paleGrey: {
            key: "pgr",
            color: "#4a4a4a",
            opacity: 0.35,
            lineWidth: 15
          },
          purple: { key: "purple", color: "#68217a", opacity: 0.65, lineWidth: 10 },
          pink: { key: "pink", color: "#ee2080", opacity: 0.5, lineWidth: 10 },
          white: { key: "white", color: "white", opacity: 1, lineWidth: 10 }
        },
        prevSvgHash: ""
      },
      hold: timer()
    };
  }
  var init_state = __esm({
    "node_modules/.pnpm/chessground@9.2.1/node_modules/chessground/dist/state.js"() {
      init_fen();
      init_util();
    }
  });

  // node_modules/.pnpm/chessground@9.2.1/node_modules/chessground/dist/svg.js
  function createDefs() {
    const defs = createElement("defs");
    const filter = setAttributes(createElement("filter"), { id: "cg-filter-blur" });
    filter.appendChild(setAttributes(createElement("feGaussianBlur"), { stdDeviation: "0.019" }));
    defs.appendChild(filter);
    return defs;
  }
  function renderSvg(state, shapesEl, customsEl) {
    var _a;
    const d = state.drawable, curD = d.current, cur = curD && curD.mouseSq ? curD : void 0, dests = /* @__PURE__ */ new Map(), bounds = state.dom.bounds(), nonPieceAutoShapes = d.autoShapes.filter((autoShape) => !autoShape.piece);
    for (const s of d.shapes.concat(nonPieceAutoShapes).concat(cur ? [cur] : [])) {
      if (!s.dest)
        continue;
      const sources = (_a = dests.get(s.dest)) !== null && _a !== void 0 ? _a : /* @__PURE__ */ new Set(), from = pos2user(orient(key2pos(s.orig), state.orientation), bounds), to = pos2user(orient(key2pos(s.dest), state.orientation), bounds);
      sources.add(moveAngle(from, to));
      dests.set(s.dest, sources);
    }
    const shapes = d.shapes.concat(nonPieceAutoShapes).map((s) => {
      return {
        shape: s,
        current: false,
        hash: shapeHash(s, isShort(s.dest, dests), false, bounds)
      };
    });
    if (cur)
      shapes.push({
        shape: cur,
        current: true,
        hash: shapeHash(cur, isShort(cur.dest, dests), true, bounds)
      });
    const fullHash = shapes.map((sc) => sc.hash).join(";");
    if (fullHash === state.drawable.prevSvgHash)
      return;
    state.drawable.prevSvgHash = fullHash;
    const defsEl = shapesEl.querySelector("defs");
    syncDefs(d, shapes, defsEl);
    syncShapes(shapes, shapesEl.querySelector("g"), customsEl.querySelector("g"), (s) => renderShape(state, s, d.brushes, dests, bounds));
  }
  function syncDefs(d, shapes, defsEl) {
    var _a;
    const brushes2 = /* @__PURE__ */ new Map();
    let brush;
    for (const s of shapes.filter((s2) => s2.shape.dest && s2.shape.brush)) {
      brush = makeCustomBrush(d.brushes[s.shape.brush], s.shape.modifiers);
      if ((_a = s.shape.modifiers) === null || _a === void 0 ? void 0 : _a.hilite)
        brushes2.set(hilite(brush).key, hilite(brush));
      brushes2.set(brush.key, brush);
    }
    const keysInDom = /* @__PURE__ */ new Set();
    let el = defsEl.firstElementChild;
    while (el) {
      keysInDom.add(el.getAttribute("cgKey"));
      el = el.nextElementSibling;
    }
    for (const [key, brush2] of brushes2.entries()) {
      if (!keysInDom.has(key))
        defsEl.appendChild(renderMarker(brush2));
    }
  }
  function syncShapes(syncables, shapes, customs, renderShape3) {
    const hashesInDom = /* @__PURE__ */ new Map();
    for (const sc of syncables)
      hashesInDom.set(sc.hash, false);
    for (const root of [shapes, customs]) {
      const toRemove = [];
      let el = root.firstElementChild, elHash;
      while (el) {
        elHash = el.getAttribute("cgHash");
        if (hashesInDom.has(elHash))
          hashesInDom.set(elHash, true);
        else
          toRemove.push(el);
        el = el.nextElementSibling;
      }
      for (const el2 of toRemove)
        root.removeChild(el2);
    }
    for (const sc of syncables.filter((s) => !hashesInDom.get(s.hash))) {
      for (const svg of renderShape3(sc)) {
        if (svg.isCustom)
          customs.appendChild(svg.el);
        else
          shapes.appendChild(svg.el);
      }
    }
  }
  function shapeHash({ orig, dest, brush, piece, modifiers, customSvg, label }, shorten, current, bounds) {
    var _a, _b;
    return [
      bounds.width,
      bounds.height,
      current,
      orig,
      dest,
      brush,
      shorten && "-",
      piece && pieceHash(piece),
      modifiers && modifiersHash(modifiers),
      customSvg && `custom-${textHash(customSvg.html)},${(_b = (_a = customSvg.center) === null || _a === void 0 ? void 0 : _a[0]) !== null && _b !== void 0 ? _b : "o"}`,
      label && `label-${textHash(label.text)}`
    ].filter((x) => x).join(",");
  }
  function pieceHash(piece) {
    return [piece.color, piece.role, piece.scale].filter((x) => x).join(",");
  }
  function modifiersHash(m) {
    return [m.lineWidth, m.hilite && "*"].filter((x) => x).join(",");
  }
  function textHash(s) {
    let h = 0;
    for (let i = 0; i < s.length; i++) {
      h = (h << 5) - h + s.charCodeAt(i) >>> 0;
    }
    return h.toString();
  }
  function renderShape(state, { shape, current, hash: hash2 }, brushes2, dests, bounds) {
    var _a, _b;
    const from = pos2user(orient(key2pos(shape.orig), state.orientation), bounds), to = shape.dest ? pos2user(orient(key2pos(shape.dest), state.orientation), bounds) : from, brush = shape.brush && makeCustomBrush(brushes2[shape.brush], shape.modifiers), slots = dests.get(shape.dest), svgs = [];
    if (brush) {
      const el = setAttributes(createElement("g"), { cgHash: hash2 });
      svgs.push({ el });
      if (from[0] !== to[0] || from[1] !== to[1])
        el.appendChild(renderArrow(shape, brush, from, to, current, isShort(shape.dest, dests)));
      else
        el.appendChild(renderCircle(brushes2[shape.brush], from, current, bounds));
    }
    if (shape.label) {
      const label = shape.label;
      (_a = label.fill) !== null && _a !== void 0 ? _a : label.fill = shape.brush && brushes2[shape.brush].color;
      const corner = shape.brush ? void 0 : "tr";
      svgs.push({ el: renderLabel(label, hash2, from, to, slots, corner), isCustom: true });
    }
    if (shape.customSvg) {
      const on = (_b = shape.customSvg.center) !== null && _b !== void 0 ? _b : "orig";
      const [x, y] = on === "label" ? labelCoords(from, to, slots).map((c) => c - 0.5) : on === "dest" ? to : from;
      const el = setAttributes(createElement("g"), { transform: `translate(${x},${y})`, cgHash: hash2 });
      el.innerHTML = `<svg width="1" height="1" viewBox="0 0 100 100">${shape.customSvg.html}</svg>`;
      svgs.push({ el, isCustom: true });
    }
    return svgs;
  }
  function renderCircle(brush, at, current, bounds) {
    const widths = circleWidth(), radius = (bounds.width + bounds.height) / (4 * Math.max(bounds.width, bounds.height));
    return setAttributes(createElement("circle"), {
      stroke: brush.color,
      "stroke-width": widths[current ? 0 : 1],
      fill: "none",
      opacity: opacity(brush, current),
      cx: at[0],
      cy: at[1],
      r: radius - widths[1] / 2
    });
  }
  function hilite(brush) {
    return ["#ffffff", "#fff", "white"].includes(brush.color) ? hilites["hilitePrimary"] : hilites["hiliteWhite"];
  }
  function renderArrow(s, brush, from, to, current, shorten) {
    var _a;
    function renderLine(isHilite) {
      var _a2;
      const m = arrowMargin(shorten && !current), dx = to[0] - from[0], dy = to[1] - from[1], angle = Math.atan2(dy, dx), xo = Math.cos(angle) * m, yo = Math.sin(angle) * m;
      return setAttributes(createElement("line"), {
        stroke: isHilite ? hilite(brush).color : brush.color,
        "stroke-width": lineWidth(brush, current) + (isHilite ? 0.04 : 0),
        "stroke-linecap": "round",
        "marker-end": `url(#arrowhead-${isHilite ? hilite(brush).key : brush.key})`,
        opacity: ((_a2 = s.modifiers) === null || _a2 === void 0 ? void 0 : _a2.hilite) ? 1 : opacity(brush, current),
        x1: from[0],
        y1: from[1],
        x2: to[0] - xo,
        y2: to[1] - yo
      });
    }
    if (!((_a = s.modifiers) === null || _a === void 0 ? void 0 : _a.hilite))
      return renderLine(false);
    const g = createElement("g");
    const blurred = setAttributes(createElement("g"), { filter: "url(#cg-filter-blur)" });
    blurred.appendChild(filterBox(from, to));
    blurred.appendChild(renderLine(true));
    g.appendChild(blurred);
    g.appendChild(renderLine(false));
    return g;
  }
  function renderMarker(brush) {
    const marker = setAttributes(createElement("marker"), {
      id: "arrowhead-" + brush.key,
      orient: "auto",
      overflow: "visible",
      markerWidth: 4,
      markerHeight: 4,
      refX: brush.key.startsWith("hilite") ? 1.86 : 2.05,
      refY: 2
    });
    marker.appendChild(setAttributes(createElement("path"), {
      d: "M0,0 V4 L3,2 Z",
      fill: brush.color
    }));
    marker.setAttribute("cgKey", brush.key);
    return marker;
  }
  function renderLabel(label, hash2, from, to, slots, corner) {
    var _a;
    const labelSize = 0.4, fontSize = labelSize * 0.75 ** label.text.length, at = labelCoords(from, to, slots), cornerOff = corner === "tr" ? 0.4 : 0, g = setAttributes(createElement("g"), {
      transform: `translate(${at[0] + cornerOff},${at[1] - cornerOff})`,
      cgHash: hash2
    });
    g.appendChild(setAttributes(createElement("circle"), {
      r: labelSize / 2,
      "fill-opacity": corner ? 1 : 0.8,
      "stroke-opacity": corner ? 1 : 0.7,
      "stroke-width": 0.03,
      fill: (_a = label.fill) !== null && _a !== void 0 ? _a : "#666",
      stroke: "white"
    }));
    const labelEl = setAttributes(createElement("text"), {
      "font-size": fontSize,
      "font-family": "Noto Sans",
      "text-anchor": "middle",
      fill: "white",
      y: 0.13 * 0.75 ** label.text.length
    });
    labelEl.innerHTML = label.text;
    g.appendChild(labelEl);
    return g;
  }
  function orient(pos, color) {
    return color === "white" ? pos : [7 - pos[0], 7 - pos[1]];
  }
  function isShort(dest, dests) {
    return true === (dest && dests.has(dest) && dests.get(dest).size > 1);
  }
  function createElement(tagName) {
    return document.createElementNS("http://www.w3.org/2000/svg", tagName);
  }
  function setAttributes(el, attrs) {
    for (const key in attrs) {
      if (Object.prototype.hasOwnProperty.call(attrs, key))
        el.setAttribute(key, attrs[key]);
    }
    return el;
  }
  function makeCustomBrush(base, modifiers) {
    return !modifiers ? base : {
      color: base.color,
      opacity: Math.round(base.opacity * 10) / 10,
      lineWidth: Math.round(modifiers.lineWidth || base.lineWidth),
      key: [base.key, modifiers.lineWidth].filter((x) => x).join("")
    };
  }
  function circleWidth() {
    return [3 / 64, 4 / 64];
  }
  function lineWidth(brush, current) {
    return (brush.lineWidth || 10) * (current ? 0.85 : 1) / 64;
  }
  function opacity(brush, current) {
    return (brush.opacity || 1) * (current ? 0.9 : 1);
  }
  function arrowMargin(shorten) {
    return (shorten ? 20 : 10) / 64;
  }
  function pos2user(pos, bounds) {
    const xScale = Math.min(1, bounds.width / bounds.height);
    const yScale = Math.min(1, bounds.height / bounds.width);
    return [(pos[0] - 3.5) * xScale, (3.5 - pos[1]) * yScale];
  }
  function filterBox(from, to) {
    const box = {
      from: [Math.floor(Math.min(from[0], to[0])), Math.floor(Math.min(from[1], to[1]))],
      to: [Math.ceil(Math.max(from[0], to[0])), Math.ceil(Math.max(from[1], to[1]))]
    };
    return setAttributes(createElement("rect"), {
      x: box.from[0],
      y: box.from[1],
      width: box.to[0] - box.from[0],
      height: box.to[1] - box.from[1],
      fill: "none",
      stroke: "none"
    });
  }
  function moveAngle(from, to, asSlot = true) {
    const angle = Math.atan2(to[1] - from[1], to[0] - from[0]) + Math.PI;
    return asSlot ? (Math.round(angle * 8 / Math.PI) + 16) % 16 : angle;
  }
  function dist(from, to) {
    return Math.sqrt([from[0] - to[0], from[1] - to[1]].reduce((acc, x) => acc + x * x, 0));
  }
  function labelCoords(from, to, slots) {
    let mag = dist(from, to);
    const angle = moveAngle(from, to, false);
    if (slots) {
      mag -= 33 / 64;
      if (slots.size > 1) {
        mag -= 10 / 64;
        const slot = moveAngle(from, to);
        if (slots.has((slot + 1) % 16) || slots.has((slot + 15) % 16)) {
          if (slot & 1)
            mag -= 0.4;
        }
      }
    }
    return [from[0] - Math.cos(angle) * mag, from[1] - Math.sin(angle) * mag].map((c) => c + 0.5);
  }
  var hilites;
  var init_svg = __esm({
    "node_modules/.pnpm/chessground@9.2.1/node_modules/chessground/dist/svg.js"() {
      init_util();
      hilites = {
        hilitePrimary: { key: "hilitePrimary", color: "#3291ff", opacity: 1, lineWidth: 1 },
        hiliteWhite: { key: "hiliteWhite", color: "#ffffff", opacity: 1, lineWidth: 1 }
      };
    }
  });

  // node_modules/.pnpm/chessground@9.2.1/node_modules/chessground/dist/wrap.js
  function renderWrap(element, s) {
    element.innerHTML = "";
    element.classList.add("cg-wrap");
    for (const c of colors)
      element.classList.toggle("orientation-" + c, s.orientation === c);
    element.classList.toggle("manipulable", !s.viewOnly);
    const container = createEl("cg-container");
    element.appendChild(container);
    const board = createEl("cg-board");
    container.appendChild(board);
    let svg;
    let customSvg;
    let autoPieces;
    if (s.drawable.visible) {
      svg = setAttributes(createElement("svg"), {
        class: "cg-shapes",
        viewBox: "-4 -4 8 8",
        preserveAspectRatio: "xMidYMid slice"
      });
      svg.appendChild(createDefs());
      svg.appendChild(createElement("g"));
      customSvg = setAttributes(createElement("svg"), {
        class: "cg-custom-svgs",
        viewBox: "-3.5 -3.5 8 8",
        preserveAspectRatio: "xMidYMid slice"
      });
      customSvg.appendChild(createElement("g"));
      autoPieces = createEl("cg-auto-pieces");
      container.appendChild(svg);
      container.appendChild(customSvg);
      container.appendChild(autoPieces);
    }
    if (s.coordinates) {
      const orientClass = s.orientation === "black" ? " black" : "";
      const ranksPositionClass = s.ranksPosition === "left" ? " left" : "";
      if (s.coordinatesOnSquares) {
        const rankN = s.orientation === "white" ? (i) => i + 1 : (i) => 8 - i;
        files.forEach((f, i) => container.appendChild(renderCoords(ranks.map((r) => f + r), "squares rank" + rankN(i) + orientClass + ranksPositionClass)));
      } else {
        container.appendChild(renderCoords(ranks, "ranks" + orientClass + ranksPositionClass));
        container.appendChild(renderCoords(files, "files" + orientClass));
      }
    }
    let ghost;
    if (s.draggable.enabled && s.draggable.showGhost) {
      ghost = createEl("piece", "ghost");
      setVisible(ghost, false);
      container.appendChild(ghost);
    }
    return {
      board,
      container,
      wrap: element,
      ghost,
      svg,
      customSvg,
      autoPieces
    };
  }
  function renderCoords(elems, className) {
    const el = createEl("coords", className);
    let f;
    for (const elem of elems) {
      f = createEl("coord");
      f.textContent = elem;
      el.appendChild(f);
    }
    return el;
  }
  var init_wrap = __esm({
    "node_modules/.pnpm/chessground@9.2.1/node_modules/chessground/dist/wrap.js"() {
      init_util();
      init_types();
      init_svg();
    }
  });

  // node_modules/.pnpm/chessground@9.2.1/node_modules/chessground/dist/drop.js
  function drop(s, e) {
    if (!s.dropmode.active)
      return;
    unsetPremove(s);
    unsetPredrop(s);
    const piece = s.dropmode.piece;
    if (piece) {
      s.pieces.set("a0", piece);
      const position = eventPosition(e);
      const dest = position && getKeyAtDomPos(position, whitePov(s), s.dom.bounds());
      if (dest)
        dropNewPiece(s, "a0", dest);
    }
    s.dom.redraw();
  }
  var init_drop = __esm({
    "node_modules/.pnpm/chessground@9.2.1/node_modules/chessground/dist/drop.js"() {
      init_board();
      init_util();
      init_drag();
    }
  });

  // node_modules/.pnpm/chessground@9.2.1/node_modules/chessground/dist/events.js
  function bindBoard(s, onResize) {
    const boardEl = s.dom.elements.board;
    if ("ResizeObserver" in window)
      new ResizeObserver(onResize).observe(s.dom.elements.wrap);
    if (s.disableContextMenu || s.drawable.enabled) {
      boardEl.addEventListener("contextmenu", (e) => e.preventDefault());
    }
    if (s.viewOnly)
      return;
    const onStart = startDragOrDraw(s);
    boardEl.addEventListener("touchstart", onStart, {
      passive: false
    });
    boardEl.addEventListener("mousedown", onStart, {
      passive: false
    });
  }
  function bindDocument(s, onResize) {
    const unbinds = [];
    if (!("ResizeObserver" in window))
      unbinds.push(unbindable(document.body, "chessground.resize", onResize));
    if (!s.viewOnly) {
      const onmove = dragOrDraw(s, move2, move);
      const onend = dragOrDraw(s, end2, end);
      for (const ev of ["touchmove", "mousemove"])
        unbinds.push(unbindable(document, ev, onmove));
      for (const ev of ["touchend", "mouseup"])
        unbinds.push(unbindable(document, ev, onend));
      const onScroll = () => s.dom.bounds.clear();
      unbinds.push(unbindable(document, "scroll", onScroll, { capture: true, passive: true }));
      unbinds.push(unbindable(window, "resize", onScroll, { passive: true }));
    }
    return () => unbinds.forEach((f) => f());
  }
  function unbindable(el, eventName, callback, options) {
    el.addEventListener(eventName, callback, options);
    return () => el.removeEventListener(eventName, callback, options);
  }
  var startDragOrDraw, dragOrDraw;
  var init_events = __esm({
    "node_modules/.pnpm/chessground@9.2.1/node_modules/chessground/dist/events.js"() {
      init_drag();
      init_draw();
      init_drop();
      init_util();
      startDragOrDraw = (s) => (e) => {
        if (s.draggable.current)
          cancel2(s);
        else if (s.drawable.current)
          cancel(s);
        else if (e.shiftKey || isRightButton(e)) {
          if (s.drawable.enabled)
            start(s, e);
        } else if (!s.viewOnly) {
          if (s.dropmode.active)
            drop(s, e);
          else
            start2(s, e);
        }
      };
      dragOrDraw = (s, withDrag, withDraw) => (e) => {
        if (s.drawable.current) {
          if (s.drawable.enabled)
            withDraw(s, e);
        } else if (!s.viewOnly)
          withDrag(s, e);
      };
    }
  });

  // node_modules/.pnpm/chessground@9.2.1/node_modules/chessground/dist/render.js
  function render2(s) {
    const asWhite = whitePov(s), posToTranslate2 = posToTranslate(s.dom.bounds()), boardEl = s.dom.elements.board, pieces = s.pieces, curAnim = s.animation.current, anims = curAnim ? curAnim.plan.anims : /* @__PURE__ */ new Map(), fadings = curAnim ? curAnim.plan.fadings : /* @__PURE__ */ new Map(), curDrag = s.draggable.current, squares = computeSquareClasses(s), samePieces = /* @__PURE__ */ new Set(), sameSquares = /* @__PURE__ */ new Set(), movedPieces = /* @__PURE__ */ new Map(), movedSquares = /* @__PURE__ */ new Map();
    let k, el, pieceAtKey, elPieceName, anim2, fading, pMvdset, pMvd, sMvdset, sMvd;
    el = boardEl.firstChild;
    while (el) {
      k = el.cgKey;
      if (isPieceNode(el)) {
        pieceAtKey = pieces.get(k);
        anim2 = anims.get(k);
        fading = fadings.get(k);
        elPieceName = el.cgPiece;
        if (el.cgDragging && (!curDrag || curDrag.orig !== k)) {
          el.classList.remove("dragging");
          translate(el, posToTranslate2(key2pos(k), asWhite));
          el.cgDragging = false;
        }
        if (!fading && el.cgFading) {
          el.cgFading = false;
          el.classList.remove("fading");
        }
        if (pieceAtKey) {
          if (anim2 && el.cgAnimating && elPieceName === pieceNameOf(pieceAtKey)) {
            const pos = key2pos(k);
            pos[0] += anim2[2];
            pos[1] += anim2[3];
            el.classList.add("anim");
            translate(el, posToTranslate2(pos, asWhite));
          } else if (el.cgAnimating) {
            el.cgAnimating = false;
            el.classList.remove("anim");
            translate(el, posToTranslate2(key2pos(k), asWhite));
            if (s.addPieceZIndex)
              el.style.zIndex = posZIndex(key2pos(k), asWhite);
          }
          if (elPieceName === pieceNameOf(pieceAtKey) && (!fading || !el.cgFading)) {
            samePieces.add(k);
          } else {
            if (fading && elPieceName === pieceNameOf(fading)) {
              el.classList.add("fading");
              el.cgFading = true;
            } else {
              appendValue(movedPieces, elPieceName, el);
            }
          }
        } else {
          appendValue(movedPieces, elPieceName, el);
        }
      } else if (isSquareNode(el)) {
        const cn = el.className;
        if (squares.get(k) === cn)
          sameSquares.add(k);
        else
          appendValue(movedSquares, cn, el);
      }
      el = el.nextSibling;
    }
    for (const [sk, className] of squares) {
      if (!sameSquares.has(sk)) {
        sMvdset = movedSquares.get(className);
        sMvd = sMvdset && sMvdset.pop();
        const translation = posToTranslate2(key2pos(sk), asWhite);
        if (sMvd) {
          sMvd.cgKey = sk;
          translate(sMvd, translation);
        } else {
          const squareNode = createEl("square", className);
          squareNode.cgKey = sk;
          translate(squareNode, translation);
          boardEl.insertBefore(squareNode, boardEl.firstChild);
        }
      }
    }
    for (const [k2, p] of pieces) {
      anim2 = anims.get(k2);
      if (!samePieces.has(k2)) {
        pMvdset = movedPieces.get(pieceNameOf(p));
        pMvd = pMvdset && pMvdset.pop();
        if (pMvd) {
          pMvd.cgKey = k2;
          if (pMvd.cgFading) {
            pMvd.classList.remove("fading");
            pMvd.cgFading = false;
          }
          const pos = key2pos(k2);
          if (s.addPieceZIndex)
            pMvd.style.zIndex = posZIndex(pos, asWhite);
          if (anim2) {
            pMvd.cgAnimating = true;
            pMvd.classList.add("anim");
            pos[0] += anim2[2];
            pos[1] += anim2[3];
          }
          translate(pMvd, posToTranslate2(pos, asWhite));
        } else {
          const pieceName = pieceNameOf(p), pieceNode = createEl("piece", pieceName), pos = key2pos(k2);
          pieceNode.cgPiece = pieceName;
          pieceNode.cgKey = k2;
          if (anim2) {
            pieceNode.cgAnimating = true;
            pos[0] += anim2[2];
            pos[1] += anim2[3];
          }
          translate(pieceNode, posToTranslate2(pos, asWhite));
          if (s.addPieceZIndex)
            pieceNode.style.zIndex = posZIndex(pos, asWhite);
          boardEl.appendChild(pieceNode);
        }
      }
    }
    for (const nodes of movedPieces.values())
      removeNodes(s, nodes);
    for (const nodes of movedSquares.values())
      removeNodes(s, nodes);
  }
  function renderResized(s) {
    const asWhite = whitePov(s), posToTranslate2 = posToTranslate(s.dom.bounds());
    let el = s.dom.elements.board.firstChild;
    while (el) {
      if (isPieceNode(el) && !el.cgAnimating || isSquareNode(el)) {
        translate(el, posToTranslate2(key2pos(el.cgKey), asWhite));
      }
      el = el.nextSibling;
    }
  }
  function updateBounds(s) {
    var _a, _b;
    const bounds = s.dom.elements.wrap.getBoundingClientRect();
    const container = s.dom.elements.container;
    const ratio = bounds.height / bounds.width;
    const width = Math.floor(bounds.width * window.devicePixelRatio / 8) * 8 / window.devicePixelRatio;
    const height = width * ratio;
    container.style.width = width + "px";
    container.style.height = height + "px";
    s.dom.bounds.clear();
    (_a = s.addDimensionsCssVarsTo) === null || _a === void 0 ? void 0 : _a.style.setProperty("---cg-width", width + "px");
    (_b = s.addDimensionsCssVarsTo) === null || _b === void 0 ? void 0 : _b.style.setProperty("---cg-height", height + "px");
  }
  function removeNodes(s, nodes) {
    for (const node of nodes)
      s.dom.elements.board.removeChild(node);
  }
  function posZIndex(pos, asWhite) {
    const minZ = 3;
    const rank = pos[1];
    const z = asWhite ? minZ + 7 - rank : minZ + rank;
    return `${z}`;
  }
  function computeSquareClasses(s) {
    var _a, _b, _c;
    const squares = /* @__PURE__ */ new Map();
    if (s.lastMove && s.highlight.lastMove)
      for (const k of s.lastMove) {
        addSquare(squares, k, "last-move");
      }
    if (s.check && s.highlight.check)
      addSquare(squares, s.check, "check");
    if (s.selected) {
      addSquare(squares, s.selected, "selected");
      if (s.movable.showDests) {
        const dests = (_a = s.movable.dests) === null || _a === void 0 ? void 0 : _a.get(s.selected);
        if (dests)
          for (const k of dests) {
            addSquare(squares, k, "move-dest" + (s.pieces.has(k) ? " oc" : ""));
          }
        const pDests = (_c = (_b = s.premovable.customDests) === null || _b === void 0 ? void 0 : _b.get(s.selected)) !== null && _c !== void 0 ? _c : s.premovable.dests;
        if (pDests)
          for (const k of pDests) {
            addSquare(squares, k, "premove-dest" + (s.pieces.has(k) ? " oc" : ""));
          }
      }
    }
    const premove2 = s.premovable.current;
    if (premove2)
      for (const k of premove2)
        addSquare(squares, k, "current-premove");
    else if (s.predroppable.current)
      addSquare(squares, s.predroppable.current.key, "current-premove");
    const o = s.exploding;
    if (o)
      for (const k of o.keys)
        addSquare(squares, k, "exploding" + o.stage);
    if (s.highlight.custom) {
      s.highlight.custom.forEach((v, k) => {
        addSquare(squares, k, v);
      });
    }
    return squares;
  }
  function addSquare(squares, key, klass) {
    const classes = squares.get(key);
    if (classes)
      squares.set(key, `${classes} ${klass}`);
    else
      squares.set(key, klass);
  }
  function appendValue(map, key, value) {
    const arr = map.get(key);
    if (arr)
      arr.push(value);
    else
      map.set(key, [value]);
  }
  var isPieceNode, isSquareNode, pieceNameOf;
  var init_render = __esm({
    "node_modules/.pnpm/chessground@9.2.1/node_modules/chessground/dist/render.js"() {
      init_util();
      init_board();
      isPieceNode = (el) => el.tagName === "PIECE";
      isSquareNode = (el) => el.tagName === "SQUARE";
      pieceNameOf = (piece) => `${piece.color} ${piece.role}`;
    }
  });

  // node_modules/.pnpm/chessground@9.2.1/node_modules/chessground/dist/sync.js
  function syncShapes2(shapes, root, renderShape3) {
    const hashesInDom = /* @__PURE__ */ new Map(), toRemove = [];
    for (const sc of shapes)
      hashesInDom.set(sc.hash, false);
    let el = root.firstElementChild, elHash;
    while (el) {
      elHash = el.getAttribute("cgHash");
      if (hashesInDom.has(elHash))
        hashesInDom.set(elHash, true);
      else
        toRemove.push(el);
      el = el.nextElementSibling;
    }
    for (const el2 of toRemove)
      root.removeChild(el2);
    for (const sc of shapes) {
      if (!hashesInDom.get(sc.hash))
        root.appendChild(renderShape3(sc));
    }
  }
  var init_sync = __esm({
    "node_modules/.pnpm/chessground@9.2.1/node_modules/chessground/dist/sync.js"() {
    }
  });

  // node_modules/.pnpm/chessground@9.2.1/node_modules/chessground/dist/autoPieces.js
  function render3(state, autoPieceEl) {
    const autoPieces = state.drawable.autoShapes.filter((autoShape) => autoShape.piece);
    const autoPieceShapes = autoPieces.map((s) => {
      return {
        shape: s,
        hash: hash(s),
        current: false
      };
    });
    syncShapes2(autoPieceShapes, autoPieceEl, (shape) => renderShape2(state, shape, state.dom.bounds()));
  }
  function renderResized2(state) {
    var _a;
    const asWhite = whitePov(state), posToTranslate2 = posToTranslate(state.dom.bounds());
    let el = (_a = state.dom.elements.autoPieces) === null || _a === void 0 ? void 0 : _a.firstChild;
    while (el) {
      translateAndScale(el, posToTranslate2(key2pos(el.cgKey), asWhite), el.cgScale);
      el = el.nextSibling;
    }
  }
  function renderShape2(state, { shape, hash: hash2 }, bounds) {
    var _a, _b, _c;
    const orig = shape.orig;
    const role = (_a = shape.piece) === null || _a === void 0 ? void 0 : _a.role;
    const color = (_b = shape.piece) === null || _b === void 0 ? void 0 : _b.color;
    const scale = (_c = shape.piece) === null || _c === void 0 ? void 0 : _c.scale;
    const pieceEl = createEl("piece", `${role} ${color}`);
    pieceEl.setAttribute("cgHash", hash2);
    pieceEl.cgKey = orig;
    pieceEl.cgScale = scale;
    translateAndScale(pieceEl, posToTranslate(bounds)(key2pos(orig), whitePov(state)), scale);
    return pieceEl;
  }
  var hash;
  var init_autoPieces = __esm({
    "node_modules/.pnpm/chessground@9.2.1/node_modules/chessground/dist/autoPieces.js"() {
      init_util();
      init_board();
      init_sync();
      hash = (autoPiece) => {
        var _a, _b, _c;
        return [autoPiece.orig, (_a = autoPiece.piece) === null || _a === void 0 ? void 0 : _a.role, (_b = autoPiece.piece) === null || _b === void 0 ? void 0 : _b.color, (_c = autoPiece.piece) === null || _c === void 0 ? void 0 : _c.scale].join(",");
      };
    }
  });

  // node_modules/.pnpm/chessground@9.2.1/node_modules/chessground/dist/chessground.js
  function Chessground(element, config) {
    const maybeState = defaults();
    configure(maybeState, config || {});
    function redrawAll() {
      const prevUnbind = "dom" in maybeState ? maybeState.dom.unbind : void 0;
      const elements = renderWrap(element, maybeState), bounds = memo(() => elements.board.getBoundingClientRect()), redrawNow = (skipSvg) => {
        render2(state);
        if (elements.autoPieces)
          render3(state, elements.autoPieces);
        if (!skipSvg && elements.svg)
          renderSvg(state, elements.svg, elements.customSvg);
      }, onResize = () => {
        updateBounds(state);
        renderResized(state);
        if (elements.autoPieces)
          renderResized2(state);
      };
      const state = maybeState;
      state.dom = {
        elements,
        bounds,
        redraw: debounceRedraw(redrawNow),
        redrawNow,
        unbind: prevUnbind
      };
      state.drawable.prevSvgHash = "";
      updateBounds(state);
      redrawNow(false);
      bindBoard(state, onResize);
      if (!prevUnbind)
        state.dom.unbind = bindDocument(state, onResize);
      state.events.insert && state.events.insert(elements);
      return state;
    }
    return start3(redrawAll(), redrawAll);
  }
  function debounceRedraw(redrawNow) {
    let redrawing = false;
    return () => {
      if (redrawing)
        return;
      redrawing = true;
      requestAnimationFrame(() => {
        redrawNow();
        redrawing = false;
      });
    };
  }
  var init_chessground = __esm({
    "node_modules/.pnpm/chessground@9.2.1/node_modules/chessground/dist/chessground.js"() {
      init_api();
      init_config();
      init_state();
      init_wrap();
      init_events();
      init_render();
      init_autoPieces();
      init_svg();
      init_util();
    }
  });

  // uiHandles.ts
  function secondsToMinutes(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  }
  var init_uiHandles = __esm({
    "uiHandles.ts"() {
      "use strict";
    }
  });

  // theme.ts
  function applyTheme(container, board = "brown.png", pieces = "cburnett") {
    const styleSheet = document.createElement("style");
    styleSheet.id = "themeStyles";
    let themeStyle = `
    .boardtheme cg-board {
      background-image: url("/assets/images/board/${board}");
    }
  `;
    for (const p of pieceNames) {
      const pieceInitial = p[0].toUpperCase();
      themeStyle += `
      .piecetheme cg-board piece.${p}.white {
        background-image: url("/assets/images/pieces/${pieces}/w${pieceInitial}.svg");
      }
      .piecetheme cg-board piece.${p}.black {
        background-image: url("/assets/images/pieces/${pieces}/b${pieceInitial}.svg");
      }
    `;
    }
    themeStyle += `
    .piecetheme cg-board piece.knight.white {
      background-image: url("/assets/images/pieces/${pieces}/wN.svg");
    }
    .piecetheme cg-board piece.knight.black {
      background-image: url("/assets/images/pieces/${pieces}/bN.svg");
    }
  `;
    styleSheet.textContent = themeStyle;
    container.classList.add("boardtheme", "piecetheme");
    return styleSheet;
  }
  var pieceNames;
  var init_theme = __esm({
    "theme.ts"() {
      "use strict";
      pieceNames = ["king", "queen", "rook", "bishop", "pawn"];
    }
  });

  // main.ts
  var require_main = __commonJS({
    "main.ts"() {
      init_chessground();
      init_uiHandles();
      init_theme();
      var container = document.getElementById("board");
      var scoreDisplay = document.getElementById("scoreDisplay");
      var timeDisplay = document.getElementById("timeDisplay");
      var rateDisplay = document.getElementById("rateDisplay");
      var resetBtn = document.getElementById("resetBtn");
      var toggleOrientationBtn = document.getElementById("toggleOrientationBtn");
      var coordsOverlay = document.getElementById("coords-overlay");
      var zoomInBtn = document.getElementById("zoomInBtn");
      var zoomOutBtn = document.getElementById("zoomOutBtn");
      var boardWrapper = document.getElementById("board-wrapper");
      var files2 = "abcdefgh";
      var ranks2 = "12345678";
      var orientation = "white";
      var zoomLevel = 1;
      var startTime = Date.now();
      var timerInterval;
      function getQueryParam(key) {
        return new URLSearchParams(window.location.search).get(key);
      }
      function randomChoice(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
      }
      var ui = {
        container,
        boardWrapper,
        scoreDisplay,
        timeDisplay,
        rateDisplay,
        updateDisplays: (score, elapsedMs) => {
          const elapsedSeconds = Math.floor(elapsedMs / 1e3);
          const rate = elapsedSeconds > 0 ? (score / (elapsedSeconds / 30)).toFixed(2) : "0";
          scoreDisplay.textContent = `Score: ${score}`;
          timeDisplay.textContent = `Time: ${secondsToMinutes(elapsedSeconds)}`;
          rateDisplay.textContent = `Points per half minute: ${rate}`;
        },
        updateOverlay: (current, next) => {
          coordsOverlay.innerHTML = `
      <svg viewBox="0 0 100 100" class="coords-svg">
        <g class="current">
          <text x="25" y="20">${current}</text>
        </g>
        <g class="next">
          <text x="25" y="25">${next}</text>
        </g>
      </svg>`;
        },
        zoom: (delta) => {
          zoomLevel = Math.min(Math.max(zoomLevel + delta, 0.5), 2);
          boardWrapper.style.transform = `scale(${zoomLevel})`;
          boardWrapper.style.transformOrigin = "top center";
        }
      };
      zoomInBtn.addEventListener("click", () => ui.zoom(0.1));
      zoomOutBtn.addEventListener("click", () => ui.zoom(-0.1));
      var config = {
        orientation,
        fen: "8/8/8/8/8/8/8/8",
        coordinates: true,
        coordinatesOnSquares: false,
        blockTouchScroll: true,
        movable: { free: false, color: void 0 },
        draggable: { enabled: false },
        selectable: { enabled: false },
        drawable: { enabled: false },
        events: {
          select: (key) => currentMode.handleClick(key, ui)
        }
      };
      var ground = Chessground(container, config);
      function startTimer() {
        timerInterval = window.setInterval(() => ui.updateDisplays(currentMode.getScore(), Date.now() - startTime), 1e3);
      }
      var coordScore = 0;
      var coordCurrent = "a1";
      var coordNext = "b2";
      function randomSquare(exclude) {
        const squares = [];
        for (const f of files2) for (const r of ranks2) squares.push(f + r);
        if (exclude) squares.splice(squares.indexOf(exclude), 1);
        return randomChoice(squares);
      }
      var coordinatesMode = {
        name: "coordinates",
        init(ui2) {
          coordScore = 0;
          coordCurrent = randomSquare();
          coordNext = randomSquare(coordCurrent);
          ui2.updateDisplays(coordScore, 0);
          ui2.updateOverlay(coordCurrent, coordNext);
        },
        handleClick(key, ui2) {
          if (key === coordCurrent) {
            coordScore++;
            ui2.updateDisplays(coordScore, Date.now() - startTime);
            coordCurrent = coordNext;
            coordNext = randomSquare(coordCurrent);
            ui2.updateOverlay(coordCurrent, coordNext);
          } else {
            console.log("\u274C Wrong!", key);
          }
        },
        reset(ui2) {
          startTime = Date.now();
          this.init(ui2);
        },
        renderOverlay(ui2) {
          ui2.updateOverlay(coordCurrent, coordNext);
        },
        getScore() {
          return coordScore;
        }
      };
      var speedList = [];
      var speedCurrent = "a1";
      var speedScore = 0;
      var speedMode = {
        name: "speed",
        init(ui2) {
          speedList = [];
          for (const f of files2) for (const r of ranks2) speedList.push(f + r);
          for (let i = speedList.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [speedList[i], speedList[j]] = [speedList[j], speedList[i]];
          }
          speedScore = 0;
          speedCurrent = speedList.shift();
          ui2.updateDisplays(speedScore, 0);
          ui2.updateOverlay(speedCurrent, speedList[0] ?? "");
        },
        handleClick(key, ui2) {
          if (key === speedCurrent) {
            speedScore++;
            ui2.updateDisplays(speedScore, Date.now() - startTime);
            if (speedList.length === 0) {
              alert(`\u2705 Done! Time: ${((Date.now() - startTime) / 1e3).toFixed(1)}s`);
              this.reset(ui2);
              return;
            }
            speedCurrent = speedList.shift();
            ui2.updateOverlay(speedCurrent, speedList[0] ?? "");
          }
        },
        reset(ui2) {
          startTime = Date.now();
          this.init(ui2);
        },
        renderOverlay(ui2) {
          ui2.updateOverlay(speedCurrent, speedList[0] ?? "");
        },
        getScore() {
          return speedScore;
        }
      };
      var selectedMode = getQueryParam("mode") || "coordinates";
      var currentMode = selectedMode === "speed" ? speedMode : coordinatesMode;
      resetBtn.addEventListener("click", () => currentMode.reset(ui));
      toggleOrientationBtn.addEventListener("click", () => {
        orientation = orientation === "white" ? "black" : "white";
        ground.set({ orientation });
      });
      currentMode.init(ui);
      startTimer();
      document.head.appendChild(applyTheme(document.getElementById("board")));
      var themeChanged = false;
      var flipped = false;
      document.addEventListener("keydown", (e) => {
        if (e.key == "f" && !flipped) {
          flipped = false;
          orientation = orientation === "white" ? "black" : "white";
          ground.set({ orientation });
        }
        if (e.key == "c" && !themeChanged) {
          themeChanged = true;
          document.querySelector("#themeStyles").remove();
          document.head.appendChild(applyTheme(document.getElementById("board")));
        }
      });
      document.addEventListener("keyup", (e) => {
        flipped = false;
        themeChanged = false;
      });
    }
  });
  require_main();
})();
