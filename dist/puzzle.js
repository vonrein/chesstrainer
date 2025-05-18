"use strict";
(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __esm = (fn, res) => function __init() {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  };
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

  // node_modules/.pnpm/chess.js@1.2.0/node_modules/chess.js/dist/esm/chess.js
  function rank(square) {
    return square >> 4;
  }
  function file(square) {
    return square & 15;
  }
  function isDigit(c) {
    return "0123456789".indexOf(c) !== -1;
  }
  function algebraic(square) {
    const f = file(square);
    const r = rank(square);
    return "abcdefgh".substring(f, f + 1) + "87654321".substring(r, r + 1);
  }
  function swapColor(color) {
    return color === WHITE ? BLACK : WHITE;
  }
  function validateFen(fen) {
    const tokens = fen.split(/\s+/);
    if (tokens.length !== 6) {
      return {
        ok: false,
        error: "Invalid FEN: must contain six space-delimited fields"
      };
    }
    const moveNumber = parseInt(tokens[5], 10);
    if (isNaN(moveNumber) || moveNumber <= 0) {
      return {
        ok: false,
        error: "Invalid FEN: move number must be a positive integer"
      };
    }
    const halfMoves = parseInt(tokens[4], 10);
    if (isNaN(halfMoves) || halfMoves < 0) {
      return {
        ok: false,
        error: "Invalid FEN: half move counter number must be a non-negative integer"
      };
    }
    if (!/^(-|[abcdefgh][36])$/.test(tokens[3])) {
      return { ok: false, error: "Invalid FEN: en-passant square is invalid" };
    }
    if (/[^kKqQ-]/.test(tokens[2])) {
      return { ok: false, error: "Invalid FEN: castling availability is invalid" };
    }
    if (!/^(w|b)$/.test(tokens[1])) {
      return { ok: false, error: "Invalid FEN: side-to-move is invalid" };
    }
    const rows = tokens[0].split("/");
    if (rows.length !== 8) {
      return {
        ok: false,
        error: "Invalid FEN: piece data does not contain 8 '/'-delimited rows"
      };
    }
    for (let i = 0; i < rows.length; i++) {
      let sumFields = 0;
      let previousWasNumber = false;
      for (let k = 0; k < rows[i].length; k++) {
        if (isDigit(rows[i][k])) {
          if (previousWasNumber) {
            return {
              ok: false,
              error: "Invalid FEN: piece data is invalid (consecutive number)"
            };
          }
          sumFields += parseInt(rows[i][k], 10);
          previousWasNumber = true;
        } else {
          if (!/^[prnbqkPRNBQK]$/.test(rows[i][k])) {
            return {
              ok: false,
              error: "Invalid FEN: piece data is invalid (invalid piece)"
            };
          }
          sumFields += 1;
          previousWasNumber = false;
        }
      }
      if (sumFields !== 8) {
        return {
          ok: false,
          error: "Invalid FEN: piece data is invalid (too many squares in rank)"
        };
      }
    }
    if (tokens[3][1] == "3" && tokens[1] == "w" || tokens[3][1] == "6" && tokens[1] == "b") {
      return { ok: false, error: "Invalid FEN: illegal en-passant square" };
    }
    const kings = [
      { color: "white", regex: /K/g },
      { color: "black", regex: /k/g }
    ];
    for (const { color, regex } of kings) {
      if (!regex.test(tokens[0])) {
        return { ok: false, error: `Invalid FEN: missing ${color} king` };
      }
      if ((tokens[0].match(regex) || []).length > 1) {
        return { ok: false, error: `Invalid FEN: too many ${color} kings` };
      }
    }
    if (Array.from(rows[0] + rows[7]).some((char) => char.toUpperCase() === "P")) {
      return {
        ok: false,
        error: "Invalid FEN: some pawns are on the edge rows"
      };
    }
    return { ok: true };
  }
  function getDisambiguator(move3, moves) {
    const from = move3.from;
    const to = move3.to;
    const piece = move3.piece;
    let ambiguities = 0;
    let sameRank = 0;
    let sameFile = 0;
    for (let i = 0, len = moves.length; i < len; i++) {
      const ambigFrom = moves[i].from;
      const ambigTo = moves[i].to;
      const ambigPiece = moves[i].piece;
      if (piece === ambigPiece && from !== ambigFrom && to === ambigTo) {
        ambiguities++;
        if (rank(from) === rank(ambigFrom)) {
          sameRank++;
        }
        if (file(from) === file(ambigFrom)) {
          sameFile++;
        }
      }
    }
    if (ambiguities > 0) {
      if (sameRank > 0 && sameFile > 0) {
        return algebraic(from);
      } else if (sameFile > 0) {
        return algebraic(from).charAt(1);
      } else {
        return algebraic(from).charAt(0);
      }
    }
    return "";
  }
  function addMove(moves, color, from, to, piece, captured = void 0, flags = BITS.NORMAL) {
    const r = rank(to);
    if (piece === PAWN && (r === RANK_1 || r === RANK_8)) {
      for (let i = 0; i < PROMOTIONS.length; i++) {
        const promotion = PROMOTIONS[i];
        moves.push({
          color,
          from,
          to,
          piece,
          captured,
          promotion,
          flags: flags | BITS.PROMOTION
        });
      }
    } else {
      moves.push({
        color,
        from,
        to,
        piece,
        captured,
        flags
      });
    }
  }
  function inferPieceType(san) {
    let pieceType = san.charAt(0);
    if (pieceType >= "a" && pieceType <= "h") {
      const matches = san.match(/[a-h]\d.*[a-h]\d/);
      if (matches) {
        return void 0;
      }
      return PAWN;
    }
    pieceType = pieceType.toLowerCase();
    if (pieceType === "o") {
      return KING;
    }
    return pieceType;
  }
  function strippedSan(move3) {
    return move3.replace(/=/, "").replace(/[+#]?[?!]*$/, "");
  }
  function trimFen(fen) {
    return fen.split(" ").slice(0, 4).join(" ");
  }
  var WHITE, BLACK, PAWN, KNIGHT, BISHOP, ROOK, QUEEN, KING, DEFAULT_POSITION, Move, EMPTY, FLAGS, SQUARES, BITS, SEVEN_TAG_ROSTER, SUPLEMENTAL_TAGS, HEADER_TEMPLATE, Ox88, PAWN_OFFSETS, PIECE_OFFSETS, ATTACKS, RAYS, PIECE_MASKS, SYMBOLS, PROMOTIONS, RANK_1, RANK_2, RANK_7, RANK_8, SIDES, ROOKS, SECOND_RANK, TERMINATION_MARKERS, Chess;
  var init_chess = __esm({
    "node_modules/.pnpm/chess.js@1.2.0/node_modules/chess.js/dist/esm/chess.js"() {
      WHITE = "w";
      BLACK = "b";
      PAWN = "p";
      KNIGHT = "n";
      BISHOP = "b";
      ROOK = "r";
      QUEEN = "q";
      KING = "k";
      DEFAULT_POSITION = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
      Move = class {
        color;
        from;
        to;
        piece;
        captured;
        promotion;
        /**
         * @deprecated This field is deprecated and will be removed in version 2.0.0.
         * Please use move descriptor functions instead: `isCapture`, `isPromotion`,
         * `isEnPassant`, `isKingsideCastle`, `isQueensideCastle`, `isCastle`, and
         * `isBigPawn`
         */
        flags;
        san;
        lan;
        before;
        after;
        constructor(chess, internal) {
          const { color, piece, from, to, flags, captured, promotion } = internal;
          const fromAlgebraic = algebraic(from);
          const toAlgebraic = algebraic(to);
          this.color = color;
          this.piece = piece;
          this.from = fromAlgebraic;
          this.to = toAlgebraic;
          this.san = chess["_moveToSan"](internal, chess["_moves"]({ legal: true }));
          this.lan = fromAlgebraic + toAlgebraic;
          this.before = chess.fen();
          chess["_makeMove"](internal);
          this.after = chess.fen();
          chess["_undoMove"]();
          this.flags = "";
          for (const flag in BITS) {
            if (BITS[flag] & flags) {
              this.flags += FLAGS[flag];
            }
          }
          if (captured) {
            this.captured = captured;
          }
          if (promotion) {
            this.promotion = promotion;
            this.lan += promotion;
          }
        }
        isCapture() {
          return this.flags.indexOf(FLAGS["CAPTURE"]) > -1;
        }
        isPromotion() {
          return this.flags.indexOf(FLAGS["PROMOTION"]) > -1;
        }
        isEnPassant() {
          return this.flags.indexOf(FLAGS["EP_CAPTURE"]) > -1;
        }
        isKingsideCastle() {
          return this.flags.indexOf(FLAGS["KSIDE_CASTLE"]) > -1;
        }
        isQueensideCastle() {
          return this.flags.indexOf(FLAGS["QSIDE_CASTLE"]) > -1;
        }
        isBigPawn() {
          return this.flags.indexOf(FLAGS["BIG_PAWN"]) > -1;
        }
      };
      EMPTY = -1;
      FLAGS = {
        NORMAL: "n",
        CAPTURE: "c",
        BIG_PAWN: "b",
        EP_CAPTURE: "e",
        PROMOTION: "p",
        KSIDE_CASTLE: "k",
        QSIDE_CASTLE: "q"
      };
      SQUARES = [
        "a8",
        "b8",
        "c8",
        "d8",
        "e8",
        "f8",
        "g8",
        "h8",
        "a7",
        "b7",
        "c7",
        "d7",
        "e7",
        "f7",
        "g7",
        "h7",
        "a6",
        "b6",
        "c6",
        "d6",
        "e6",
        "f6",
        "g6",
        "h6",
        "a5",
        "b5",
        "c5",
        "d5",
        "e5",
        "f5",
        "g5",
        "h5",
        "a4",
        "b4",
        "c4",
        "d4",
        "e4",
        "f4",
        "g4",
        "h4",
        "a3",
        "b3",
        "c3",
        "d3",
        "e3",
        "f3",
        "g3",
        "h3",
        "a2",
        "b2",
        "c2",
        "d2",
        "e2",
        "f2",
        "g2",
        "h2",
        "a1",
        "b1",
        "c1",
        "d1",
        "e1",
        "f1",
        "g1",
        "h1"
      ];
      BITS = {
        NORMAL: 1,
        CAPTURE: 2,
        BIG_PAWN: 4,
        EP_CAPTURE: 8,
        PROMOTION: 16,
        KSIDE_CASTLE: 32,
        QSIDE_CASTLE: 64
      };
      SEVEN_TAG_ROSTER = {
        Event: "?",
        Site: "?",
        Date: "????.??.??",
        Round: "?",
        White: "?",
        Black: "?",
        Result: "*"
      };
      SUPLEMENTAL_TAGS = {
        WhiteTitle: null,
        BlackTitle: null,
        WhiteElo: null,
        BlackElo: null,
        WhiteUSCF: null,
        BlackUSCF: null,
        WhiteNA: null,
        BlackNA: null,
        WhiteType: null,
        BlackType: null,
        EventDate: null,
        EventSponsor: null,
        Section: null,
        Stage: null,
        Board: null,
        Opening: null,
        Variation: null,
        SubVariation: null,
        ECO: null,
        NIC: null,
        Time: null,
        UTCTime: null,
        UTCDate: null,
        TimeControl: null,
        SetUp: null,
        FEN: null,
        Termination: null,
        Annotator: null,
        Mode: null,
        PlyCount: null
      };
      HEADER_TEMPLATE = {
        ...SEVEN_TAG_ROSTER,
        ...SUPLEMENTAL_TAGS
      };
      Ox88 = {
        a8: 0,
        b8: 1,
        c8: 2,
        d8: 3,
        e8: 4,
        f8: 5,
        g8: 6,
        h8: 7,
        a7: 16,
        b7: 17,
        c7: 18,
        d7: 19,
        e7: 20,
        f7: 21,
        g7: 22,
        h7: 23,
        a6: 32,
        b6: 33,
        c6: 34,
        d6: 35,
        e6: 36,
        f6: 37,
        g6: 38,
        h6: 39,
        a5: 48,
        b5: 49,
        c5: 50,
        d5: 51,
        e5: 52,
        f5: 53,
        g5: 54,
        h5: 55,
        a4: 64,
        b4: 65,
        c4: 66,
        d4: 67,
        e4: 68,
        f4: 69,
        g4: 70,
        h4: 71,
        a3: 80,
        b3: 81,
        c3: 82,
        d3: 83,
        e3: 84,
        f3: 85,
        g3: 86,
        h3: 87,
        a2: 96,
        b2: 97,
        c2: 98,
        d2: 99,
        e2: 100,
        f2: 101,
        g2: 102,
        h2: 103,
        a1: 112,
        b1: 113,
        c1: 114,
        d1: 115,
        e1: 116,
        f1: 117,
        g1: 118,
        h1: 119
      };
      PAWN_OFFSETS = {
        b: [16, 32, 17, 15],
        w: [-16, -32, -17, -15]
      };
      PIECE_OFFSETS = {
        n: [-18, -33, -31, -14, 18, 33, 31, 14],
        b: [-17, -15, 17, 15],
        r: [-16, 1, 16, -1],
        q: [-17, -16, -15, 1, 17, 16, 15, -1],
        k: [-17, -16, -15, 1, 17, 16, 15, -1]
      };
      ATTACKS = [
        20,
        0,
        0,
        0,
        0,
        0,
        0,
        24,
        0,
        0,
        0,
        0,
        0,
        0,
        20,
        0,
        0,
        20,
        0,
        0,
        0,
        0,
        0,
        24,
        0,
        0,
        0,
        0,
        0,
        20,
        0,
        0,
        0,
        0,
        20,
        0,
        0,
        0,
        0,
        24,
        0,
        0,
        0,
        0,
        20,
        0,
        0,
        0,
        0,
        0,
        0,
        20,
        0,
        0,
        0,
        24,
        0,
        0,
        0,
        20,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        20,
        0,
        0,
        24,
        0,
        0,
        20,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        20,
        2,
        24,
        2,
        20,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        2,
        53,
        56,
        53,
        2,
        0,
        0,
        0,
        0,
        0,
        0,
        24,
        24,
        24,
        24,
        24,
        24,
        56,
        0,
        56,
        24,
        24,
        24,
        24,
        24,
        24,
        0,
        0,
        0,
        0,
        0,
        0,
        2,
        53,
        56,
        53,
        2,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        20,
        2,
        24,
        2,
        20,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        20,
        0,
        0,
        24,
        0,
        0,
        20,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        20,
        0,
        0,
        0,
        24,
        0,
        0,
        0,
        20,
        0,
        0,
        0,
        0,
        0,
        0,
        20,
        0,
        0,
        0,
        0,
        24,
        0,
        0,
        0,
        0,
        20,
        0,
        0,
        0,
        0,
        20,
        0,
        0,
        0,
        0,
        0,
        24,
        0,
        0,
        0,
        0,
        0,
        20,
        0,
        0,
        20,
        0,
        0,
        0,
        0,
        0,
        0,
        24,
        0,
        0,
        0,
        0,
        0,
        0,
        20
      ];
      RAYS = [
        17,
        0,
        0,
        0,
        0,
        0,
        0,
        16,
        0,
        0,
        0,
        0,
        0,
        0,
        15,
        0,
        0,
        17,
        0,
        0,
        0,
        0,
        0,
        16,
        0,
        0,
        0,
        0,
        0,
        15,
        0,
        0,
        0,
        0,
        17,
        0,
        0,
        0,
        0,
        16,
        0,
        0,
        0,
        0,
        15,
        0,
        0,
        0,
        0,
        0,
        0,
        17,
        0,
        0,
        0,
        16,
        0,
        0,
        0,
        15,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        17,
        0,
        0,
        16,
        0,
        0,
        15,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        17,
        0,
        16,
        0,
        15,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        17,
        16,
        15,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        0,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        -15,
        -16,
        -17,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        -15,
        0,
        -16,
        0,
        -17,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        -15,
        0,
        0,
        -16,
        0,
        0,
        -17,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        -15,
        0,
        0,
        0,
        -16,
        0,
        0,
        0,
        -17,
        0,
        0,
        0,
        0,
        0,
        0,
        -15,
        0,
        0,
        0,
        0,
        -16,
        0,
        0,
        0,
        0,
        -17,
        0,
        0,
        0,
        0,
        -15,
        0,
        0,
        0,
        0,
        0,
        -16,
        0,
        0,
        0,
        0,
        0,
        -17,
        0,
        0,
        -15,
        0,
        0,
        0,
        0,
        0,
        0,
        -16,
        0,
        0,
        0,
        0,
        0,
        0,
        -17
      ];
      PIECE_MASKS = { p: 1, n: 2, b: 4, r: 8, q: 16, k: 32 };
      SYMBOLS = "pnbrqkPNBRQK";
      PROMOTIONS = [KNIGHT, BISHOP, ROOK, QUEEN];
      RANK_1 = 7;
      RANK_2 = 6;
      RANK_7 = 1;
      RANK_8 = 0;
      SIDES = {
        [KING]: BITS.KSIDE_CASTLE,
        [QUEEN]: BITS.QSIDE_CASTLE
      };
      ROOKS = {
        w: [
          { square: Ox88.a1, flag: BITS.QSIDE_CASTLE },
          { square: Ox88.h1, flag: BITS.KSIDE_CASTLE }
        ],
        b: [
          { square: Ox88.a8, flag: BITS.QSIDE_CASTLE },
          { square: Ox88.h8, flag: BITS.KSIDE_CASTLE }
        ]
      };
      SECOND_RANK = { b: RANK_7, w: RANK_2 };
      TERMINATION_MARKERS = ["1-0", "0-1", "1/2-1/2", "*"];
      Chess = class {
        _board = new Array(128);
        _turn = WHITE;
        _header = {};
        _kings = { w: EMPTY, b: EMPTY };
        _epSquare = -1;
        _halfMoves = 0;
        _moveNumber = 0;
        _history = [];
        _comments = {};
        _castling = { w: 0, b: 0 };
        // tracks number of times a position has been seen for repetition checking
        _positionCount = {};
        constructor(fen = DEFAULT_POSITION, { skipValidation = false } = {}) {
          this.load(fen, { skipValidation });
        }
        clear({ preserveHeaders = false } = {}) {
          this._board = new Array(128);
          this._kings = { w: EMPTY, b: EMPTY };
          this._turn = WHITE;
          this._castling = { w: 0, b: 0 };
          this._epSquare = EMPTY;
          this._halfMoves = 0;
          this._moveNumber = 1;
          this._history = [];
          this._comments = {};
          this._header = preserveHeaders ? this._header : { ...HEADER_TEMPLATE };
          this._positionCount = {};
          this._header["SetUp"] = null;
          this._header["FEN"] = null;
        }
        load(fen, { skipValidation = false, preserveHeaders = false } = {}) {
          let tokens = fen.split(/\s+/);
          if (tokens.length >= 2 && tokens.length < 6) {
            const adjustments = ["-", "-", "0", "1"];
            fen = tokens.concat(adjustments.slice(-(6 - tokens.length))).join(" ");
          }
          tokens = fen.split(/\s+/);
          if (!skipValidation) {
            const { ok, error } = validateFen(fen);
            if (!ok) {
              throw new Error(error);
            }
          }
          const position = tokens[0];
          let square = 0;
          this.clear({ preserveHeaders });
          for (let i = 0; i < position.length; i++) {
            const piece = position.charAt(i);
            if (piece === "/") {
              square += 8;
            } else if (isDigit(piece)) {
              square += parseInt(piece, 10);
            } else {
              const color = piece < "a" ? WHITE : BLACK;
              this._put({ type: piece.toLowerCase(), color }, algebraic(square));
              square++;
            }
          }
          this._turn = tokens[1];
          if (tokens[2].indexOf("K") > -1) {
            this._castling.w |= BITS.KSIDE_CASTLE;
          }
          if (tokens[2].indexOf("Q") > -1) {
            this._castling.w |= BITS.QSIDE_CASTLE;
          }
          if (tokens[2].indexOf("k") > -1) {
            this._castling.b |= BITS.KSIDE_CASTLE;
          }
          if (tokens[2].indexOf("q") > -1) {
            this._castling.b |= BITS.QSIDE_CASTLE;
          }
          this._epSquare = tokens[3] === "-" ? EMPTY : Ox88[tokens[3]];
          this._halfMoves = parseInt(tokens[4], 10);
          this._moveNumber = parseInt(tokens[5], 10);
          this._updateSetup(fen);
          this._incPositionCount(fen);
        }
        fen() {
          let empty = 0;
          let fen = "";
          for (let i = Ox88.a8; i <= Ox88.h1; i++) {
            if (this._board[i]) {
              if (empty > 0) {
                fen += empty;
                empty = 0;
              }
              const { color, type: piece } = this._board[i];
              fen += color === WHITE ? piece.toUpperCase() : piece.toLowerCase();
            } else {
              empty++;
            }
            if (i + 1 & 136) {
              if (empty > 0) {
                fen += empty;
              }
              if (i !== Ox88.h1) {
                fen += "/";
              }
              empty = 0;
              i += 8;
            }
          }
          let castling = "";
          if (this._castling[WHITE] & BITS.KSIDE_CASTLE) {
            castling += "K";
          }
          if (this._castling[WHITE] & BITS.QSIDE_CASTLE) {
            castling += "Q";
          }
          if (this._castling[BLACK] & BITS.KSIDE_CASTLE) {
            castling += "k";
          }
          if (this._castling[BLACK] & BITS.QSIDE_CASTLE) {
            castling += "q";
          }
          castling = castling || "-";
          let epSquare = "-";
          if (this._epSquare !== EMPTY) {
            const bigPawnSquare = this._epSquare + (this._turn === WHITE ? 16 : -16);
            const squares = [bigPawnSquare + 1, bigPawnSquare - 1];
            for (const square of squares) {
              if (square & 136) {
                continue;
              }
              const color = this._turn;
              if (this._board[square]?.color === color && this._board[square]?.type === PAWN) {
                this._makeMove({
                  color,
                  from: square,
                  to: this._epSquare,
                  piece: PAWN,
                  captured: PAWN,
                  flags: BITS.EP_CAPTURE
                });
                const isLegal = !this._isKingAttacked(color);
                this._undoMove();
                if (isLegal) {
                  epSquare = algebraic(this._epSquare);
                  break;
                }
              }
            }
          }
          return [
            fen,
            this._turn,
            castling,
            epSquare,
            this._halfMoves,
            this._moveNumber
          ].join(" ");
        }
        /*
         * Called when the initial board setup is changed with put() or remove().
         * modifies the SetUp and FEN properties of the header object. If the FEN
         * is equal to the default position, the SetUp and FEN are deleted the setup
         * is only updated if history.length is zero, ie moves haven't been made.
         */
        _updateSetup(fen) {
          if (this._history.length > 0)
            return;
          if (fen !== DEFAULT_POSITION) {
            this._header["SetUp"] = "1";
            this._header["FEN"] = fen;
          } else {
            this._header["SetUp"] = null;
            this._header["FEN"] = null;
          }
        }
        reset() {
          this.load(DEFAULT_POSITION);
        }
        get(square) {
          return this._board[Ox88[square]];
        }
        findPiece(piece) {
          const squares = [];
          for (let i = Ox88.a8; i <= Ox88.h1; i++) {
            if (i & 136) {
              i += 7;
              continue;
            }
            if (!this._board[i] || this._board[i]?.color !== piece.color) {
              continue;
            }
            if (this._board[i].color === piece.color && this._board[i].type === piece.type) {
              squares.push(algebraic(i));
            }
          }
          return squares;
        }
        put({ type, color }, square) {
          if (this._put({ type, color }, square)) {
            this._updateCastlingRights();
            this._updateEnPassantSquare();
            this._updateSetup(this.fen());
            return true;
          }
          return false;
        }
        _put({ type, color }, square) {
          if (SYMBOLS.indexOf(type.toLowerCase()) === -1) {
            return false;
          }
          if (!(square in Ox88)) {
            return false;
          }
          const sq = Ox88[square];
          if (type == KING && !(this._kings[color] == EMPTY || this._kings[color] == sq)) {
            return false;
          }
          const currentPieceOnSquare = this._board[sq];
          if (currentPieceOnSquare && currentPieceOnSquare.type === KING) {
            this._kings[currentPieceOnSquare.color] = EMPTY;
          }
          this._board[sq] = { type, color };
          if (type === KING) {
            this._kings[color] = sq;
          }
          return true;
        }
        remove(square) {
          const piece = this.get(square);
          delete this._board[Ox88[square]];
          if (piece && piece.type === KING) {
            this._kings[piece.color] = EMPTY;
          }
          this._updateCastlingRights();
          this._updateEnPassantSquare();
          this._updateSetup(this.fen());
          return piece;
        }
        _updateCastlingRights() {
          const whiteKingInPlace = this._board[Ox88.e1]?.type === KING && this._board[Ox88.e1]?.color === WHITE;
          const blackKingInPlace = this._board[Ox88.e8]?.type === KING && this._board[Ox88.e8]?.color === BLACK;
          if (!whiteKingInPlace || this._board[Ox88.a1]?.type !== ROOK || this._board[Ox88.a1]?.color !== WHITE) {
            this._castling.w &= ~BITS.QSIDE_CASTLE;
          }
          if (!whiteKingInPlace || this._board[Ox88.h1]?.type !== ROOK || this._board[Ox88.h1]?.color !== WHITE) {
            this._castling.w &= ~BITS.KSIDE_CASTLE;
          }
          if (!blackKingInPlace || this._board[Ox88.a8]?.type !== ROOK || this._board[Ox88.a8]?.color !== BLACK) {
            this._castling.b &= ~BITS.QSIDE_CASTLE;
          }
          if (!blackKingInPlace || this._board[Ox88.h8]?.type !== ROOK || this._board[Ox88.h8]?.color !== BLACK) {
            this._castling.b &= ~BITS.KSIDE_CASTLE;
          }
        }
        _updateEnPassantSquare() {
          if (this._epSquare === EMPTY) {
            return;
          }
          const startSquare = this._epSquare + (this._turn === WHITE ? -16 : 16);
          const currentSquare = this._epSquare + (this._turn === WHITE ? 16 : -16);
          const attackers = [currentSquare + 1, currentSquare - 1];
          if (this._board[startSquare] !== null || this._board[this._epSquare] !== null || this._board[currentSquare]?.color !== swapColor(this._turn) || this._board[currentSquare]?.type !== PAWN) {
            this._epSquare = EMPTY;
            return;
          }
          const canCapture = (square) => !(square & 136) && this._board[square]?.color === this._turn && this._board[square]?.type === PAWN;
          if (!attackers.some(canCapture)) {
            this._epSquare = EMPTY;
          }
        }
        _attacked(color, square, verbose) {
          const attackers = [];
          for (let i = Ox88.a8; i <= Ox88.h1; i++) {
            if (i & 136) {
              i += 7;
              continue;
            }
            if (this._board[i] === void 0 || this._board[i].color !== color) {
              continue;
            }
            const piece = this._board[i];
            const difference = i - square;
            if (difference === 0) {
              continue;
            }
            const index = difference + 119;
            if (ATTACKS[index] & PIECE_MASKS[piece.type]) {
              if (piece.type === PAWN) {
                if (difference > 0 && piece.color === WHITE || difference <= 0 && piece.color === BLACK) {
                  if (!verbose) {
                    return true;
                  } else {
                    attackers.push(algebraic(i));
                  }
                }
                continue;
              }
              if (piece.type === "n" || piece.type === "k") {
                if (!verbose) {
                  return true;
                } else {
                  attackers.push(algebraic(i));
                  continue;
                }
              }
              const offset = RAYS[index];
              let j = i + offset;
              let blocked = false;
              while (j !== square) {
                if (this._board[j] != null) {
                  blocked = true;
                  break;
                }
                j += offset;
              }
              if (!blocked) {
                if (!verbose) {
                  return true;
                } else {
                  attackers.push(algebraic(i));
                  continue;
                }
              }
            }
          }
          if (verbose) {
            return attackers;
          } else {
            return false;
          }
        }
        attackers(square, attackedBy) {
          if (!attackedBy) {
            return this._attacked(this._turn, Ox88[square], true);
          } else {
            return this._attacked(attackedBy, Ox88[square], true);
          }
        }
        _isKingAttacked(color) {
          const square = this._kings[color];
          return square === -1 ? false : this._attacked(swapColor(color), square);
        }
        isAttacked(square, attackedBy) {
          return this._attacked(attackedBy, Ox88[square]);
        }
        isCheck() {
          return this._isKingAttacked(this._turn);
        }
        inCheck() {
          return this.isCheck();
        }
        isCheckmate() {
          return this.isCheck() && this._moves().length === 0;
        }
        isStalemate() {
          return !this.isCheck() && this._moves().length === 0;
        }
        isInsufficientMaterial() {
          const pieces = {
            b: 0,
            n: 0,
            r: 0,
            q: 0,
            k: 0,
            p: 0
          };
          const bishops = [];
          let numPieces = 0;
          let squareColor = 0;
          for (let i = Ox88.a8; i <= Ox88.h1; i++) {
            squareColor = (squareColor + 1) % 2;
            if (i & 136) {
              i += 7;
              continue;
            }
            const piece = this._board[i];
            if (piece) {
              pieces[piece.type] = piece.type in pieces ? pieces[piece.type] + 1 : 1;
              if (piece.type === BISHOP) {
                bishops.push(squareColor);
              }
              numPieces++;
            }
          }
          if (numPieces === 2) {
            return true;
          } else if (
            // k vs. kn .... or .... k vs. kb
            numPieces === 3 && (pieces[BISHOP] === 1 || pieces[KNIGHT] === 1)
          ) {
            return true;
          } else if (numPieces === pieces[BISHOP] + 2) {
            let sum = 0;
            const len = bishops.length;
            for (let i = 0; i < len; i++) {
              sum += bishops[i];
            }
            if (sum === 0 || sum === len) {
              return true;
            }
          }
          return false;
        }
        isThreefoldRepetition() {
          return this._getPositionCount(this.fen()) >= 3;
        }
        isDrawByFiftyMoves() {
          return this._halfMoves >= 100;
        }
        isDraw() {
          return this.isDrawByFiftyMoves() || this.isStalemate() || this.isInsufficientMaterial() || this.isThreefoldRepetition();
        }
        isGameOver() {
          return this.isCheckmate() || this.isStalemate() || this.isDraw();
        }
        moves({ verbose = false, square = void 0, piece = void 0 } = {}) {
          const moves = this._moves({ square, piece });
          if (verbose) {
            return moves.map((move3) => new Move(this, move3));
          } else {
            return moves.map((move3) => this._moveToSan(move3, moves));
          }
        }
        _moves({ legal = true, piece = void 0, square = void 0 } = {}) {
          const forSquare = square ? square.toLowerCase() : void 0;
          const forPiece = piece?.toLowerCase();
          const moves = [];
          const us = this._turn;
          const them = swapColor(us);
          let firstSquare = Ox88.a8;
          let lastSquare = Ox88.h1;
          let singleSquare = false;
          if (forSquare) {
            if (!(forSquare in Ox88)) {
              return [];
            } else {
              firstSquare = lastSquare = Ox88[forSquare];
              singleSquare = true;
            }
          }
          for (let from = firstSquare; from <= lastSquare; from++) {
            if (from & 136) {
              from += 7;
              continue;
            }
            if (!this._board[from] || this._board[from].color === them) {
              continue;
            }
            const { type } = this._board[from];
            let to;
            if (type === PAWN) {
              if (forPiece && forPiece !== type)
                continue;
              to = from + PAWN_OFFSETS[us][0];
              if (!this._board[to]) {
                addMove(moves, us, from, to, PAWN);
                to = from + PAWN_OFFSETS[us][1];
                if (SECOND_RANK[us] === rank(from) && !this._board[to]) {
                  addMove(moves, us, from, to, PAWN, void 0, BITS.BIG_PAWN);
                }
              }
              for (let j = 2; j < 4; j++) {
                to = from + PAWN_OFFSETS[us][j];
                if (to & 136)
                  continue;
                if (this._board[to]?.color === them) {
                  addMove(moves, us, from, to, PAWN, this._board[to].type, BITS.CAPTURE);
                } else if (to === this._epSquare) {
                  addMove(moves, us, from, to, PAWN, PAWN, BITS.EP_CAPTURE);
                }
              }
            } else {
              if (forPiece && forPiece !== type)
                continue;
              for (let j = 0, len = PIECE_OFFSETS[type].length; j < len; j++) {
                const offset = PIECE_OFFSETS[type][j];
                to = from;
                while (true) {
                  to += offset;
                  if (to & 136)
                    break;
                  if (!this._board[to]) {
                    addMove(moves, us, from, to, type);
                  } else {
                    if (this._board[to].color === us)
                      break;
                    addMove(moves, us, from, to, type, this._board[to].type, BITS.CAPTURE);
                    break;
                  }
                  if (type === KNIGHT || type === KING)
                    break;
                }
              }
            }
          }
          if (forPiece === void 0 || forPiece === KING) {
            if (!singleSquare || lastSquare === this._kings[us]) {
              if (this._castling[us] & BITS.KSIDE_CASTLE) {
                const castlingFrom = this._kings[us];
                const castlingTo = castlingFrom + 2;
                if (!this._board[castlingFrom + 1] && !this._board[castlingTo] && !this._attacked(them, this._kings[us]) && !this._attacked(them, castlingFrom + 1) && !this._attacked(them, castlingTo)) {
                  addMove(moves, us, this._kings[us], castlingTo, KING, void 0, BITS.KSIDE_CASTLE);
                }
              }
              if (this._castling[us] & BITS.QSIDE_CASTLE) {
                const castlingFrom = this._kings[us];
                const castlingTo = castlingFrom - 2;
                if (!this._board[castlingFrom - 1] && !this._board[castlingFrom - 2] && !this._board[castlingFrom - 3] && !this._attacked(them, this._kings[us]) && !this._attacked(them, castlingFrom - 1) && !this._attacked(them, castlingTo)) {
                  addMove(moves, us, this._kings[us], castlingTo, KING, void 0, BITS.QSIDE_CASTLE);
                }
              }
            }
          }
          if (!legal || this._kings[us] === -1) {
            return moves;
          }
          const legalMoves = [];
          for (let i = 0, len = moves.length; i < len; i++) {
            this._makeMove(moves[i]);
            if (!this._isKingAttacked(us)) {
              legalMoves.push(moves[i]);
            }
            this._undoMove();
          }
          return legalMoves;
        }
        move(move3, { strict = false } = {}) {
          let moveObj = null;
          if (typeof move3 === "string") {
            moveObj = this._moveFromSan(move3, strict);
          } else if (typeof move3 === "object") {
            const moves = this._moves();
            for (let i = 0, len = moves.length; i < len; i++) {
              if (move3.from === algebraic(moves[i].from) && move3.to === algebraic(moves[i].to) && (!("promotion" in moves[i]) || move3.promotion === moves[i].promotion)) {
                moveObj = moves[i];
                break;
              }
            }
          }
          if (!moveObj) {
            if (typeof move3 === "string") {
              throw new Error(`Invalid move: ${move3}`);
            } else {
              throw new Error(`Invalid move: ${JSON.stringify(move3)}`);
            }
          }
          const prettyMove = new Move(this, moveObj);
          this._makeMove(moveObj);
          this._incPositionCount(prettyMove.after);
          return prettyMove;
        }
        _push(move3) {
          this._history.push({
            move: move3,
            kings: { b: this._kings.b, w: this._kings.w },
            turn: this._turn,
            castling: { b: this._castling.b, w: this._castling.w },
            epSquare: this._epSquare,
            halfMoves: this._halfMoves,
            moveNumber: this._moveNumber
          });
        }
        _makeMove(move3) {
          const us = this._turn;
          const them = swapColor(us);
          this._push(move3);
          this._board[move3.to] = this._board[move3.from];
          delete this._board[move3.from];
          if (move3.flags & BITS.EP_CAPTURE) {
            if (this._turn === BLACK) {
              delete this._board[move3.to - 16];
            } else {
              delete this._board[move3.to + 16];
            }
          }
          if (move3.promotion) {
            this._board[move3.to] = { type: move3.promotion, color: us };
          }
          if (this._board[move3.to].type === KING) {
            this._kings[us] = move3.to;
            if (move3.flags & BITS.KSIDE_CASTLE) {
              const castlingTo = move3.to - 1;
              const castlingFrom = move3.to + 1;
              this._board[castlingTo] = this._board[castlingFrom];
              delete this._board[castlingFrom];
            } else if (move3.flags & BITS.QSIDE_CASTLE) {
              const castlingTo = move3.to + 1;
              const castlingFrom = move3.to - 2;
              this._board[castlingTo] = this._board[castlingFrom];
              delete this._board[castlingFrom];
            }
            this._castling[us] = 0;
          }
          if (this._castling[us]) {
            for (let i = 0, len = ROOKS[us].length; i < len; i++) {
              if (move3.from === ROOKS[us][i].square && this._castling[us] & ROOKS[us][i].flag) {
                this._castling[us] ^= ROOKS[us][i].flag;
                break;
              }
            }
          }
          if (this._castling[them]) {
            for (let i = 0, len = ROOKS[them].length; i < len; i++) {
              if (move3.to === ROOKS[them][i].square && this._castling[them] & ROOKS[them][i].flag) {
                this._castling[them] ^= ROOKS[them][i].flag;
                break;
              }
            }
          }
          if (move3.flags & BITS.BIG_PAWN) {
            if (us === BLACK) {
              this._epSquare = move3.to - 16;
            } else {
              this._epSquare = move3.to + 16;
            }
          } else {
            this._epSquare = EMPTY;
          }
          if (move3.piece === PAWN) {
            this._halfMoves = 0;
          } else if (move3.flags & (BITS.CAPTURE | BITS.EP_CAPTURE)) {
            this._halfMoves = 0;
          } else {
            this._halfMoves++;
          }
          if (us === BLACK) {
            this._moveNumber++;
          }
          this._turn = them;
        }
        undo() {
          const move3 = this._undoMove();
          if (move3) {
            const prettyMove = new Move(this, move3);
            this._decPositionCount(prettyMove.after);
            return prettyMove;
          }
          return null;
        }
        _undoMove() {
          const old = this._history.pop();
          if (old === void 0) {
            return null;
          }
          const move3 = old.move;
          this._kings = old.kings;
          this._turn = old.turn;
          this._castling = old.castling;
          this._epSquare = old.epSquare;
          this._halfMoves = old.halfMoves;
          this._moveNumber = old.moveNumber;
          const us = this._turn;
          const them = swapColor(us);
          this._board[move3.from] = this._board[move3.to];
          this._board[move3.from].type = move3.piece;
          delete this._board[move3.to];
          if (move3.captured) {
            if (move3.flags & BITS.EP_CAPTURE) {
              let index;
              if (us === BLACK) {
                index = move3.to - 16;
              } else {
                index = move3.to + 16;
              }
              this._board[index] = { type: PAWN, color: them };
            } else {
              this._board[move3.to] = { type: move3.captured, color: them };
            }
          }
          if (move3.flags & (BITS.KSIDE_CASTLE | BITS.QSIDE_CASTLE)) {
            let castlingTo, castlingFrom;
            if (move3.flags & BITS.KSIDE_CASTLE) {
              castlingTo = move3.to + 1;
              castlingFrom = move3.to - 1;
            } else {
              castlingTo = move3.to - 2;
              castlingFrom = move3.to + 1;
            }
            this._board[castlingTo] = this._board[castlingFrom];
            delete this._board[castlingFrom];
          }
          return move3;
        }
        pgn({ newline = "\n", maxWidth = 0 } = {}) {
          const result = [];
          let headerExists = false;
          for (const i in this._header) {
            const headerTag = this._header[i];
            if (headerTag)
              result.push(`[${i} "${this._header[i]}"]` + newline);
            headerExists = true;
          }
          if (headerExists && this._history.length) {
            result.push(newline);
          }
          const appendComment = (moveString2) => {
            const comment = this._comments[this.fen()];
            if (typeof comment !== "undefined") {
              const delimiter = moveString2.length > 0 ? " " : "";
              moveString2 = `${moveString2}${delimiter}{${comment}}`;
            }
            return moveString2;
          };
          const reversedHistory = [];
          while (this._history.length > 0) {
            reversedHistory.push(this._undoMove());
          }
          const moves = [];
          let moveString = "";
          if (reversedHistory.length === 0) {
            moves.push(appendComment(""));
          }
          while (reversedHistory.length > 0) {
            moveString = appendComment(moveString);
            const move3 = reversedHistory.pop();
            if (!move3) {
              break;
            }
            if (!this._history.length && move3.color === "b") {
              const prefix = `${this._moveNumber}. ...`;
              moveString = moveString ? `${moveString} ${prefix}` : prefix;
            } else if (move3.color === "w") {
              if (moveString.length) {
                moves.push(moveString);
              }
              moveString = this._moveNumber + ".";
            }
            moveString = moveString + " " + this._moveToSan(move3, this._moves({ legal: true }));
            this._makeMove(move3);
          }
          if (moveString.length) {
            moves.push(appendComment(moveString));
          }
          moves.push(this._header.Result || "*");
          if (maxWidth === 0) {
            return result.join("") + moves.join(" ");
          }
          const strip = function() {
            if (result.length > 0 && result[result.length - 1] === " ") {
              result.pop();
              return true;
            }
            return false;
          };
          const wrapComment = function(width, move3) {
            for (const token of move3.split(" ")) {
              if (!token) {
                continue;
              }
              if (width + token.length > maxWidth) {
                while (strip()) {
                  width--;
                }
                result.push(newline);
                width = 0;
              }
              result.push(token);
              width += token.length;
              result.push(" ");
              width++;
            }
            if (strip()) {
              width--;
            }
            return width;
          };
          let currentWidth = 0;
          for (let i = 0; i < moves.length; i++) {
            if (currentWidth + moves[i].length > maxWidth) {
              if (moves[i].includes("{")) {
                currentWidth = wrapComment(currentWidth, moves[i]);
                continue;
              }
            }
            if (currentWidth + moves[i].length > maxWidth && i !== 0) {
              if (result[result.length - 1] === " ") {
                result.pop();
              }
              result.push(newline);
              currentWidth = 0;
            } else if (i !== 0) {
              result.push(" ");
              currentWidth++;
            }
            result.push(moves[i]);
            currentWidth += moves[i].length;
          }
          return result.join("");
        }
        /**
         * @deprecated Use `setHeader` and `getHeaders` instead. This method will return null header tags (which is not what you want)
         */
        header(...args) {
          for (let i = 0; i < args.length; i += 2) {
            if (typeof args[i] === "string" && typeof args[i + 1] === "string") {
              this._header[args[i]] = args[i + 1];
            }
          }
          return this._header;
        }
        // TODO: value validation per spec
        setHeader(key, value) {
          this._header[key] = value ?? SEVEN_TAG_ROSTER[key] ?? null;
          return this.getHeaders();
        }
        removeHeader(key) {
          if (key in this._header) {
            this._header[key] = SEVEN_TAG_ROSTER[key] || null;
            return true;
          }
          return false;
        }
        // return only non-null headers (omit placemarker nulls)
        getHeaders() {
          const nonNullHeaders = {};
          for (const [key, value] of Object.entries(this._header)) {
            if (value !== null) {
              nonNullHeaders[key] = value;
            }
          }
          return nonNullHeaders;
        }
        loadPgn(pgn, { strict = false, newlineChar = "\r?\n" } = {}) {
          function mask(str) {
            return str.replace(/\\/g, "\\");
          }
          function parsePgnHeader(header) {
            const headerObj = {};
            const headers2 = header.split(new RegExp(mask(newlineChar)));
            let key = "";
            let value = "";
            for (let i = 0; i < headers2.length; i++) {
              const regex = /^\s*\[\s*([A-Za-z]+)\s*"(.*)"\s*\]\s*$/;
              key = headers2[i].replace(regex, "$1");
              value = headers2[i].replace(regex, "$2");
              if (key.trim().length > 0) {
                headerObj[key] = value;
              }
            }
            return headerObj;
          }
          pgn = pgn.trim();
          const headerRegex = new RegExp("^(\\[((?:" + mask(newlineChar) + ")|.)*\\])((?:\\s*" + mask(newlineChar) + "){2}|(?:\\s*" + mask(newlineChar) + ")*$)");
          const headerRegexResults = headerRegex.exec(pgn);
          const headerString = headerRegexResults ? headerRegexResults.length >= 2 ? headerRegexResults[1] : "" : "";
          this.reset();
          const headers = parsePgnHeader(headerString);
          let fen = "";
          for (const key in headers) {
            if (key.toLowerCase() === "fen") {
              fen = headers[key];
            }
            this.header(key, headers[key]);
          }
          if (!strict) {
            if (fen) {
              this.load(fen, { preserveHeaders: true });
            }
          } else {
            if (headers["SetUp"] === "1") {
              if (!("FEN" in headers)) {
                throw new Error("Invalid PGN: FEN tag must be supplied with SetUp tag");
              }
              this.load(headers["FEN"], { preserveHeaders: true });
            }
          }
          function toHex(s) {
            return Array.from(s).map(function(c) {
              return c.charCodeAt(0) < 128 ? c.charCodeAt(0).toString(16) : encodeURIComponent(c).replace(/%/g, "").toLowerCase();
            }).join("");
          }
          function fromHex(s) {
            return s.length == 0 ? "" : decodeURIComponent("%" + (s.match(/.{1,2}/g) || []).join("%"));
          }
          const encodeComment = function(s) {
            s = s.replace(new RegExp(mask(newlineChar), "g"), " ");
            return `{${toHex(s.slice(1, s.length - 1))}}`;
          };
          const decodeComment = function(s) {
            if (s.startsWith("{") && s.endsWith("}")) {
              return fromHex(s.slice(1, s.length - 1));
            }
          };
          let ms = pgn.replace(headerString, "").replace(
            // encode comments so they don't get deleted below
            new RegExp(`({[^}]*})+?|;([^${mask(newlineChar)}]*)`, "g"),
            function(_match, bracket, semicolon) {
              return bracket !== void 0 ? encodeComment(bracket) : " " + encodeComment(`{${semicolon.slice(1)}}`);
            }
          ).replace(new RegExp(mask(newlineChar), "g"), " ");
          const ravRegex = /(\([^()]+\))+?/g;
          while (ravRegex.test(ms)) {
            ms = ms.replace(ravRegex, "");
          }
          ms = ms.replace(/\d+\.(\.\.)?/g, "");
          ms = ms.replace(/\.\.\./g, "");
          ms = ms.replace(/\$\d+/g, "");
          let moves = ms.trim().split(new RegExp(/\s+/));
          moves = moves.filter((move3) => move3 !== "");
          let result = "";
          for (let halfMove = 0; halfMove < moves.length; halfMove++) {
            const comment = decodeComment(moves[halfMove]);
            if (comment !== void 0) {
              this._comments[this.fen()] = comment;
              continue;
            }
            const move3 = this._moveFromSan(moves[halfMove], strict);
            if (move3 == null) {
              if (TERMINATION_MARKERS.indexOf(moves[halfMove]) > -1) {
                result = moves[halfMove];
              } else {
                throw new Error(`Invalid move in PGN: ${moves[halfMove]}`);
              }
            } else {
              result = "";
              this._makeMove(move3);
              this._incPositionCount(this.fen());
            }
          }
          if (result && Object.keys(this._header).length && this._header["Result"] !== result) {
            this.setHeader("Result", result);
          }
        }
        /*
         * Convert a move from 0x88 coordinates to Standard Algebraic Notation
         * (SAN)
         *
         * @param {boolean} strict Use the strict SAN parser. It will throw errors
         * on overly disambiguated moves (see below):
         *
         * r1bqkbnr/ppp2ppp/2n5/1B1pP3/4P3/8/PPPP2PP/RNBQK1NR b KQkq - 2 4
         * 4. ... Nge7 is overly disambiguated because the knight on c6 is pinned
         * 4. ... Ne7 is technically the valid SAN
         */
        _moveToSan(move3, moves) {
          let output = "";
          if (move3.flags & BITS.KSIDE_CASTLE) {
            output = "O-O";
          } else if (move3.flags & BITS.QSIDE_CASTLE) {
            output = "O-O-O";
          } else {
            if (move3.piece !== PAWN) {
              const disambiguator = getDisambiguator(move3, moves);
              output += move3.piece.toUpperCase() + disambiguator;
            }
            if (move3.flags & (BITS.CAPTURE | BITS.EP_CAPTURE)) {
              if (move3.piece === PAWN) {
                output += algebraic(move3.from)[0];
              }
              output += "x";
            }
            output += algebraic(move3.to);
            if (move3.promotion) {
              output += "=" + move3.promotion.toUpperCase();
            }
          }
          this._makeMove(move3);
          if (this.isCheck()) {
            if (this.isCheckmate()) {
              output += "#";
            } else {
              output += "+";
            }
          }
          this._undoMove();
          return output;
        }
        // convert a move from Standard Algebraic Notation (SAN) to 0x88 coordinates
        _moveFromSan(move3, strict = false) {
          const cleanMove = strippedSan(move3);
          let pieceType = inferPieceType(cleanMove);
          let moves = this._moves({ legal: true, piece: pieceType });
          for (let i = 0, len = moves.length; i < len; i++) {
            if (cleanMove === strippedSan(this._moveToSan(moves[i], moves))) {
              return moves[i];
            }
          }
          if (strict) {
            return null;
          }
          let piece = void 0;
          let matches = void 0;
          let from = void 0;
          let to = void 0;
          let promotion = void 0;
          let overlyDisambiguated = false;
          matches = cleanMove.match(/([pnbrqkPNBRQK])?([a-h][1-8])x?-?([a-h][1-8])([qrbnQRBN])?/);
          if (matches) {
            piece = matches[1];
            from = matches[2];
            to = matches[3];
            promotion = matches[4];
            if (from.length == 1) {
              overlyDisambiguated = true;
            }
          } else {
            matches = cleanMove.match(/([pnbrqkPNBRQK])?([a-h]?[1-8]?)x?-?([a-h][1-8])([qrbnQRBN])?/);
            if (matches) {
              piece = matches[1];
              from = matches[2];
              to = matches[3];
              promotion = matches[4];
              if (from.length == 1) {
                overlyDisambiguated = true;
              }
            }
          }
          pieceType = inferPieceType(cleanMove);
          moves = this._moves({
            legal: true,
            piece: piece ? piece : pieceType
          });
          if (!to) {
            return null;
          }
          for (let i = 0, len = moves.length; i < len; i++) {
            if (!from) {
              if (cleanMove === strippedSan(this._moveToSan(moves[i], moves)).replace("x", "")) {
                return moves[i];
              }
            } else if ((!piece || piece.toLowerCase() == moves[i].piece) && Ox88[from] == moves[i].from && Ox88[to] == moves[i].to && (!promotion || promotion.toLowerCase() == moves[i].promotion)) {
              return moves[i];
            } else if (overlyDisambiguated) {
              const square = algebraic(moves[i].from);
              if ((!piece || piece.toLowerCase() == moves[i].piece) && Ox88[to] == moves[i].to && (from == square[0] || from == square[1]) && (!promotion || promotion.toLowerCase() == moves[i].promotion)) {
                return moves[i];
              }
            }
          }
          return null;
        }
        ascii() {
          let s = "   +------------------------+\n";
          for (let i = Ox88.a8; i <= Ox88.h1; i++) {
            if (file(i) === 0) {
              s += " " + "87654321"[rank(i)] + " |";
            }
            if (this._board[i]) {
              const piece = this._board[i].type;
              const color = this._board[i].color;
              const symbol = color === WHITE ? piece.toUpperCase() : piece.toLowerCase();
              s += " " + symbol + " ";
            } else {
              s += " . ";
            }
            if (i + 1 & 136) {
              s += "|\n";
              i += 8;
            }
          }
          s += "   +------------------------+\n";
          s += "     a  b  c  d  e  f  g  h";
          return s;
        }
        perft(depth) {
          const moves = this._moves({ legal: false });
          let nodes = 0;
          const color = this._turn;
          for (let i = 0, len = moves.length; i < len; i++) {
            this._makeMove(moves[i]);
            if (!this._isKingAttacked(color)) {
              if (depth - 1 > 0) {
                nodes += this.perft(depth - 1);
              } else {
                nodes++;
              }
            }
            this._undoMove();
          }
          return nodes;
        }
        turn() {
          return this._turn;
        }
        board() {
          const output = [];
          let row = [];
          for (let i = Ox88.a8; i <= Ox88.h1; i++) {
            if (this._board[i] == null) {
              row.push(null);
            } else {
              row.push({
                square: algebraic(i),
                type: this._board[i].type,
                color: this._board[i].color
              });
            }
            if (i + 1 & 136) {
              output.push(row);
              row = [];
              i += 8;
            }
          }
          return output;
        }
        squareColor(square) {
          if (square in Ox88) {
            const sq = Ox88[square];
            return (rank(sq) + file(sq)) % 2 === 0 ? "light" : "dark";
          }
          return null;
        }
        history({ verbose = false } = {}) {
          const reversedHistory = [];
          const moveHistory = [];
          while (this._history.length > 0) {
            reversedHistory.push(this._undoMove());
          }
          while (true) {
            const move3 = reversedHistory.pop();
            if (!move3) {
              break;
            }
            if (verbose) {
              moveHistory.push(new Move(this, move3));
            } else {
              moveHistory.push(this._moveToSan(move3, this._moves()));
            }
            this._makeMove(move3);
          }
          return moveHistory;
        }
        /*
         * Keeps track of position occurrence counts for the purpose of repetition
         * checking. All three methods (`_inc`, `_dec`, and `_get`) trim the
         * irrelevent information from the fen, initialising new positions, and
         * removing old positions from the record if their counts are reduced to 0.
         */
        _getPositionCount(fen) {
          const trimmedFen = trimFen(fen);
          return this._positionCount[trimmedFen] || 0;
        }
        _incPositionCount(fen) {
          const trimmedFen = trimFen(fen);
          if (this._positionCount[trimmedFen] === void 0) {
            this._positionCount[trimmedFen] = 0;
          }
          this._positionCount[trimmedFen] += 1;
        }
        _decPositionCount(fen) {
          const trimmedFen = trimFen(fen);
          if (this._positionCount[trimmedFen] === 1) {
            delete this._positionCount[trimmedFen];
          } else {
            this._positionCount[trimmedFen] -= 1;
          }
        }
        _pruneComments() {
          const reversedHistory = [];
          const currentComments = {};
          const copyComment = (fen) => {
            if (fen in this._comments) {
              currentComments[fen] = this._comments[fen];
            }
          };
          while (this._history.length > 0) {
            reversedHistory.push(this._undoMove());
          }
          copyComment(this.fen());
          while (true) {
            const move3 = reversedHistory.pop();
            if (!move3) {
              break;
            }
            this._makeMove(move3);
            copyComment(this.fen());
          }
          this._comments = currentComments;
        }
        getComment() {
          return this._comments[this.fen()];
        }
        setComment(comment) {
          this._comments[this.fen()] = comment.replace("{", "[").replace("}", "]");
        }
        /**
         * @deprecated Renamed to `removeComment` for consistency
         */
        deleteComment() {
          return this.removeComment();
        }
        removeComment() {
          const comment = this._comments[this.fen()];
          delete this._comments[this.fen()];
          return comment;
        }
        getComments() {
          this._pruneComments();
          return Object.keys(this._comments).map((fen) => {
            return { fen, comment: this._comments[fen] };
          });
        }
        /**
         * @deprecated Renamed to `removeComments` for consistency
         */
        deleteComments() {
          return this.removeComments();
        }
        removeComments() {
          this._pruneComments();
          return Object.keys(this._comments).map((fen) => {
            const comment = this._comments[fen];
            delete this._comments[fen];
            return { fen, comment };
          });
        }
        setCastlingRights(color, rights) {
          for (const side of [KING, QUEEN]) {
            if (rights[side] !== void 0) {
              if (rights[side]) {
                this._castling[color] |= SIDES[side];
              } else {
                this._castling[color] &= ~SIDES[side];
              }
            }
          }
          this._updateCastlingRights();
          const result = this.getCastlingRights(color);
          return (rights[KING] === void 0 || rights[KING] === result[KING]) && (rights[QUEEN] === void 0 || rights[QUEEN] === result[QUEEN]);
        }
        getCastlingRights(color) {
          return {
            [KING]: (this._castling[color] & SIDES[KING]) !== 0,
            [QUEEN]: (this._castling[color] & SIDES[QUEEN]) !== 0
          };
        }
        moveNumber() {
          return this._moveNumber;
        }
      };
    }
  });

  // node_modules/.pnpm/chessground@9.1.1/node_modules/chessground/dist/types.js
  var colors, files, ranks;
  var init_types = __esm({
    "node_modules/.pnpm/chessground@9.1.1/node_modules/chessground/dist/types.js"() {
      colors = ["white", "black"];
      files = ["a", "b", "c", "d", "e", "f", "g", "h"];
      ranks = ["1", "2", "3", "4", "5", "6", "7", "8"];
    }
  });

  // node_modules/.pnpm/chessground@9.1.1/node_modules/chessground/dist/util.js
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
    "node_modules/.pnpm/chessground@9.1.1/node_modules/chessground/dist/util.js"() {
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

  // node_modules/.pnpm/chessground@9.1.1/node_modules/chessground/dist/premove.js
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
    "node_modules/.pnpm/chessground@9.1.1/node_modules/chessground/dist/premove.js"() {
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

  // node_modules/.pnpm/chessground@9.1.1/node_modules/chessground/dist/board.js
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
    let file2 = Math.floor(8 * (pos[0] - bounds.left) / bounds.width);
    if (!asWhite)
      file2 = 7 - file2;
    let rank2 = 7 - Math.floor(8 * (pos[1] - bounds.top) / bounds.height);
    if (!asWhite)
      rank2 = 7 - rank2;
    return file2 >= 0 && file2 < 8 && rank2 >= 0 && rank2 < 8 ? pos2key([file2, rank2]) : void 0;
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
    "node_modules/.pnpm/chessground@9.1.1/node_modules/chessground/dist/board.js"() {
      init_util();
      init_premove();
      canMove = (state, orig, dest) => {
        var _a, _b;
        return orig !== dest && isMovable(state, orig) && (state.movable.free || !!((_b = (_a = state.movable.dests) === null || _a === void 0 ? void 0 : _a.get(orig)) === null || _b === void 0 ? void 0 : _b.includes(dest)));
      };
      whitePov = (s) => s.orientation === "white";
    }
  });

  // node_modules/.pnpm/chessground@9.1.1/node_modules/chessground/dist/fen.js
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
    "node_modules/.pnpm/chessground@9.1.1/node_modules/chessground/dist/fen.js"() {
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

  // node_modules/.pnpm/chessground@9.1.1/node_modules/chessground/dist/config.js
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
      const rank2 = state.movable.color === "white" ? "1" : "8", kingStartPos = "e" + rank2, dests = state.movable.dests.get(kingStartPos), king2 = state.pieces.get(kingStartPos);
      if (!dests || !king2 || king2.role !== "king")
        return;
      state.movable.dests.set(kingStartPos, dests.filter((d) => !(d === "a" + rank2 && dests.includes("c" + rank2)) && !(d === "h" + rank2 && dests.includes("g" + rank2))));
    }
  }
  function deepMerge(base, extend) {
    for (const key in extend) {
      if (Object.prototype.hasOwnProperty.call(extend, key)) {
        if (Object.prototype.hasOwnProperty.call(base, key) && isPlainObject(base[key]) && isPlainObject(extend[key]))
          deepMerge(base[key], extend[key]);
        else
          base[key] = extend[key];
      }
    }
  }
  function isPlainObject(o) {
    if (typeof o !== "object" || o === null)
      return false;
    const proto = Object.getPrototypeOf(o);
    return proto === Object.prototype || proto === null;
  }
  var init_config = __esm({
    "node_modules/.pnpm/chessground@9.1.1/node_modules/chessground/dist/config.js"() {
      init_board();
      init_fen();
    }
  });

  // node_modules/.pnpm/chessground@9.1.1/node_modules/chessground/dist/anim.js
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
    "node_modules/.pnpm/chessground@9.1.1/node_modules/chessground/dist/anim.js"() {
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

  // node_modules/.pnpm/chessground@9.1.1/node_modules/chessground/dist/draw.js
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
    "node_modules/.pnpm/chessground@9.1.1/node_modules/chessground/dist/draw.js"() {
      init_board();
      init_util();
      brushes = ["green", "red", "blue", "yellow"];
    }
  });

  // node_modules/.pnpm/chessground@9.1.1/node_modules/chessground/dist/drag.js
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
    "node_modules/.pnpm/chessground@9.1.1/node_modules/chessground/dist/drag.js"() {
      init_board();
      init_util();
      init_draw();
      init_anim();
    }
  });

  // node_modules/.pnpm/chessground@9.1.1/node_modules/chessground/dist/explosion.js
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
    "node_modules/.pnpm/chessground@9.1.1/node_modules/chessground/dist/explosion.js"() {
    }
  });

  // node_modules/.pnpm/chessground@9.1.1/node_modules/chessground/dist/api.js
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
    "node_modules/.pnpm/chessground@9.1.1/node_modules/chessground/dist/api.js"() {
      init_board();
      init_fen();
      init_config();
      init_anim();
      init_drag();
      init_explosion();
    }
  });

  // node_modules/.pnpm/chessground@9.1.1/node_modules/chessground/dist/state.js
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
        visible: true,
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
    "node_modules/.pnpm/chessground@9.1.1/node_modules/chessground/dist/state.js"() {
      init_fen();
      init_util();
    }
  });

  // node_modules/.pnpm/chessground@9.1.1/node_modules/chessground/dist/svg.js
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
    "node_modules/.pnpm/chessground@9.1.1/node_modules/chessground/dist/svg.js"() {
      init_util();
      hilites = {
        hilitePrimary: { key: "hilitePrimary", color: "#3291ff", opacity: 1, lineWidth: 1 },
        hiliteWhite: { key: "hiliteWhite", color: "#ffffff", opacity: 1, lineWidth: 1 }
      };
    }
  });

  // node_modules/.pnpm/chessground@9.1.1/node_modules/chessground/dist/wrap.js
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
    "node_modules/.pnpm/chessground@9.1.1/node_modules/chessground/dist/wrap.js"() {
      init_util();
      init_types();
      init_svg();
    }
  });

  // node_modules/.pnpm/chessground@9.1.1/node_modules/chessground/dist/drop.js
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
    "node_modules/.pnpm/chessground@9.1.1/node_modules/chessground/dist/drop.js"() {
      init_board();
      init_util();
      init_drag();
    }
  });

  // node_modules/.pnpm/chessground@9.1.1/node_modules/chessground/dist/events.js
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
    "node_modules/.pnpm/chessground@9.1.1/node_modules/chessground/dist/events.js"() {
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

  // node_modules/.pnpm/chessground@9.1.1/node_modules/chessground/dist/render.js
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
    const rank2 = pos[1];
    const z = asWhite ? minZ + 7 - rank2 : minZ + rank2;
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
    "node_modules/.pnpm/chessground@9.1.1/node_modules/chessground/dist/render.js"() {
      init_util();
      init_board();
      isPieceNode = (el) => el.tagName === "PIECE";
      isSquareNode = (el) => el.tagName === "SQUARE";
      pieceNameOf = (piece) => `${piece.color} ${piece.role}`;
    }
  });

  // node_modules/.pnpm/chessground@9.1.1/node_modules/chessground/dist/sync.js
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
    "node_modules/.pnpm/chessground@9.1.1/node_modules/chessground/dist/sync.js"() {
    }
  });

  // node_modules/.pnpm/chessground@9.1.1/node_modules/chessground/dist/autoPieces.js
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
    "node_modules/.pnpm/chessground@9.1.1/node_modules/chessground/dist/autoPieces.js"() {
      init_util();
      init_board();
      init_sync();
      hash = (autoPiece) => {
        var _a, _b, _c;
        return [autoPiece.orig, (_a = autoPiece.piece) === null || _a === void 0 ? void 0 : _a.role, (_b = autoPiece.piece) === null || _b === void 0 ? void 0 : _b.color, (_c = autoPiece.piece) === null || _c === void 0 ? void 0 : _c.scale].join(",");
      };
    }
  });

  // node_modules/.pnpm/chessground@9.1.1/node_modules/chessground/dist/chessground.js
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
    "node_modules/.pnpm/chessground@9.1.1/node_modules/chessground/dist/chessground.js"() {
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

  // randomTheme.ts
  function randomTheme(container) {
    const styleSheet = document.createElement("style");
    styleSheet.id = "themeStyles";
    fetch("/random-theme").then((res) => res.json()).then(({ board, pieces }) => {
      let themeStyle = `.boardtheme cg-board {
      background-image: url("/assets/images/board/${board}");
    } `;
      for (const p of pieceNames) {
        themeStyle += `
.piecetheme cg-board piece.${p}.white {
        background-image: url("/assets/images/pieces/${pieces}/w${p[0].toUpperCase()}.svg");
    }`;
        themeStyle += `
.piecetheme cg-board piece.${p}.black {
        background-image: url("/assets/images/pieces/${pieces}/b${p[0].toUpperCase()}.svg");
    }`;
      }
      themeStyle += `
.piecetheme cg-board piece.knight.white {
        background-image: url("/assets/images/pieces/${pieces}/wN.svg");
    }`;
      themeStyle += `
.piecetheme cg-board piece.knight.black {
        background-image: url("/assets/images/pieces/${pieces}/bN.svg");
    }`;
      styleSheet.textContent = themeStyle;
      container.classList.add("boardtheme", "piecetheme");
    });
    return styleSheet;
  }
  var pieceNames;
  var init_randomTheme = __esm({
    "randomTheme.ts"() {
      "use strict";
      pieceNames = ["king", "queen", "rook", "bishop", "pawn"];
    }
  });

  // chessUtils.ts
  function computeDests(chess) {
    const dests = /* @__PURE__ */ new Map();
    for (const square of SQUARES) {
      const moves = chess.moves({ square, verbose: true });
      const uniqueTos = [...new Set(moves.map((m) => m.to))];
      if (uniqueTos.length > 0) {
        dests.set(square, uniqueTos);
      }
    }
    return dests;
  }
  function getTurnColor(turn, reverse = false) {
    if (!reverse)
      return turn === "w" ? "white" : "black";
    return turn === "w" ? "black" : "white";
  }
  function promoteAble(chess, promo, from, to) {
    if (promo) return promo;
    const piece = chess.get(from);
    if (piece?.type === "p") {
      const targetRank = parseInt(to[1], 10);
      const isPromotionRank = piece.color === "w" && targetRank === 8 || piece.color === "b" && targetRank === 1;
      if (isPromotionRank) {
        return "q";
      }
    }
    return void 0;
  }
  function parseUCIMove(chess, uci) {
    const from = uci.slice(0, 2);
    const to = uci.slice(2, 4);
    let promotion = promoteAble(chess, uci[4], from, to);
    return { from, to, promotion };
  }
  var init_chessUtils = __esm({
    "chessUtils.ts"() {
      "use strict";
      init_chess();
    }
  });

  // puzzle.ts
  var require_puzzle = __commonJS({
    "puzzle.ts"() {
      init_chess();
      init_chessground();
      init_randomTheme();
      init_chessUtils();
      var container = document.getElementById("board");
      var params = new URLSearchParams(window.location.search);
      var max = params.get("max") ?? "4000";
      var min = params.get("min") ?? "100";
      var limit = params.get("limit") ?? "1";
      var sort = params.get("sort") ?? "";
      var theme = params.get("theme") ?? "";
      var optionalQueryString = (sort != "" ? "&sort=1" : "") + (theme != "" ? "&theme=" + theme : "");
      var id = params.get("id");
      var rawSource = params.get("source");
      var source = rawSource === "storm" || rawSource === "streak" || rawSource === "local" ? rawSource : "local";
      var query = id != null ? `id=${id}` : `max=${max}&min=${min}&limit=${limit}${optionalQueryString}`;
      var chess = new Chess();
      var moveQueue = [];
      var ground;
      var playerColor;
      var activePuzzle = false;
      var puzzleURL = "";
      var puzzleQueue = [];
      var mistake = false;
      var composeGlyph = (fill, path) => `<defs><filter id="shadow"><feDropShadow dx="4" dy="7" stdDeviation="5" flood-opacity="0.5" /></filter></defs><g transform="translate(71 -12) scale(0.4)"><circle style="fill:${fill};filter:url(#shadow)" cx="50" cy="50" r="50" />${path}</g>`;
      var goodmoveSVG = `<path fill="#fff" d="M87 32.8q0 2-1.4 3.2L51 70.6 44.6 77q-1.7 1.3-3.4 1.3-1.8 0-3.1-1.3L14.3 53.3Q13 52 13 50q0-2 1.3-3.2l6.4-6.5Q22.4 39 24 39q1.9 0 3.2 1.3l14 14L72.7 23q1.3-1.3 3.2-1.3 1.6 0 3.3 1.3l6.4 6.5q1.3 1.4 1.3 3.4z"/>`;
      var wrongMoveSVG = `    '<path fill="#fff" d="M79.4 68q0 1.8-1.4 3.2l-6.7 6.7q-1.4 1.4-3.5 1.4-1.9 0-3.3-1.4L50 63.4 35.5 78q-1.4 1.4-3.3 1.4-2 0-3.5-1.4L22 71.2q-1.4-1.4-1.4-3.3 0-1.7 1.4-3.5L36.5 50 22 35.4Q20.6 34 20.6 32q0-1.7 1.4-3.5l6.7-6.5q1.2-1.4 3.5-1.4 2 0 3.3 1.4L50 36.6 64.5 22q1.2-1.4 3.3-1.4 2.3 0 3.5 1.4l6.7 6.5q1.4 1.8 1.4 3.5 0 2-1.4 3.3L63.5 49.9 78 64.4q1.4 1.8 1.4 3.5z"/>'`;
      var glyphToSvg = {
        "\u2713": { html: composeGlyph("#22ac38", goodmoveSVG) },
        "\u2717": { html: composeGlyph("#df5353", wrongMoveSVG) }
      };
      function initGround() {
        ground = Chessground(
          container,
          {
            fen: "",
            orientation: "white",
            viewOnly: false,
            highlight: { lastMove: true, check: true },
            check: chess.isCheck(),
            animation: { enabled: true, duration: 200 },
            draggable: { showGhost: true },
            movable: { free: false, color: "white", dests: /* @__PURE__ */ new Map() },
            premovable: { enabled: true },
            events: {},
            drawable: {
              enabled: true,
              visible: true,
              autoShapes: [],
              shapes: []
            }
          }
        );
      }
      initGround();
      function updateGround(options = {}) {
        ground.set({
          fen: chess.fen(),
          orientation: playerColor,
          turnColor: getTurnColor(chess.turn()),
          check: chess.isCheck(),
          movable: { color: playerColor, dests: computeDests(chess), free: false },
          events: {},
          ...options
        });
      }
      function showStatus(msg = "", pzInfo = "") {
        if (msg != "") document.getElementById("status").textContent = msg;
        if (pzInfo != "") document.getElementById("puzzleInfo").textContent = pzInfo;
      }
      function makeMove(uci, quiet = false) {
        const { from, to, promotion } = parseUCIMove(chess, uci);
        chess.move(parseUCIMove(chess, uci));
        if (!quiet) ground.move(from, to);
        updateGround();
      }
      async function loadPuzzles() {
        let puzzleSourceURL = source === "local" ? `http://localhost:5000/api/puzzles?${query}` : `https://lichess.org/api/${source}`;
        try {
          const response = await fetch(puzzleSourceURL);
          const data = await response.json();
          let puzzles = [];
          let initialPuzzleCount2;
          if (source === "storm") {
            puzzles = data.puzzles.map((obj) => ({
              ...obj,
              moves: obj.line
            }));
            initialPuzzleCount2 = puzzles.length;
          } else if (source === "streak") {
            const streakIds = data.streak.split(" ");
            if (!streakIds.length) {
              showStatus("No puzzles found!");
              return;
            }
            const streakResponse = await fetch(
              `http://localhost:5000/api/streak?ids=${streakIds.join(",")}`
            );
            puzzles = await streakResponse.json();
            initialPuzzleCount2 = streakIds.length;
          } else {
            puzzles = data;
            initialPuzzleCount2 = puzzles.length;
          }
          if (!puzzles.length) {
            showStatus("No puzzles found!");
            return;
          }
          puzzleQueue = puzzles;
          showStatus("", `${initialPuzzleCount2} puzzles loaded.`);
          loadNextPuzzle();
        } catch (error) {
          console.error("Error loading puzzles:", error);
          showStatus("Error loading puzzles!");
        }
      }
      function loadNextPuzzle() {
        mistake = false;
        if (!puzzleQueue.length) {
          showStatus("", "All puzzles solved! \u{1F389}");
          return;
        }
        const p = puzzleQueue.shift();
        console.log(p);
        activePuzzle = true;
        puzzleURL = "https://lichess.org/training/" + p.id;
        chess.load(p.fen);
        moveQueue = p.moves.split(" ");
        startPuzzle(p.fen, moveQueue.shift());
        showStatus("", `Puzzle rating: ${p.rating} (${puzzleQueue.length} left)`);
      }
      function startPuzzle(initFen, oppUci) {
        chess.load(initFen);
        playerColor = initFen.split(" ")[1] === "w" ? "black" : "white";
        updateGround({ fen: initFen, orientation: playerColor, viewOnly: false, events: { move: () => null } });
        setTimeout(() => {
          makeMove(oppUci, false);
          playerColor = getTurnColor(chess.turn());
          updateGround({ events: { move: onUserMove } });
        }, 500);
      }
      function onUserMove(from, to) {
        if (!activePuzzle) return false;
        const expected = moveQueue[0];
        const uci = from + to + (promoteAble(chess, void 0, from, to) ?? "");
        makeMove(uci, false);
        if (uci !== expected && !chess.isGameOver()) {
          showStatus("\u274C Wrong move");
          mistake = true;
          setTimeout(() => {
            chess.undo();
            updateGround();
          }, 500);
          return false;
        }
        ground.setAutoShapes([
          { orig: moveQueue[0].slice(2, 4), customSvg: glyphToSvg["\u2713"] }
        ]);
        moveQueue.shift();
        showStatus(moveQueue.length ? "\u2705 Correct, go on!" : "\u2705 Puzzle complete!");
        updateGround({ events: {} });
        if (!moveQueue.length || chess.isGameOver()) {
          activePuzzle = false;
          showStatus(`\u2705 Puzzle complete! URL: <a href="${puzzleURL}">${mistake ? "\u274C" : "\u2705"}</a>`);
          setTimeout(() => {
            loadNextPuzzle();
          }, 1e3);
          return false;
        }
        updateGround({ events: { move: () => null } });
        setTimeout(() => {
          makeMove(moveQueue.shift(), false);
          ground.setAutoShapes([]);
          playerColor = chess.turn() === "w" ? "white" : "black";
          updateGround({ events: { move: onUserMove } });
        }, 500);
        return true;
      }
      document.getElementById("loadPuzzleBtn").addEventListener("click", async () => {
        await loadPuzzles();
      });
      document.head.appendChild(randomTheme(container));
      var themeChanged = false;
      document.addEventListener("keydown", (e) => {
        if (e.key == "c" && !themeChanged) {
          themeChanged = true;
          document.querySelector("#themeStyles").remove();
          document.head.appendChild(randomTheme(document.getElementById("board")));
        }
      });
      document.addEventListener("keyup", (e) => {
        themeChanged = false;
      });
    }
  });
  require_puzzle();
})();
/*! Bundled license information:

chess.js/dist/esm/chess.js:
  (**
   * @license
   * Copyright (c) 2025, Jeff Hlywa (jhlywa@gmail.com)
   * All rights reserved.
   *
   * Redistribution and use in source and binary forms, with or without
   * modification, are permitted provided that the following conditions are met:
   *
   * 1. Redistributions of source code must retain the above copyright notice,
   *    this list of conditions and the following disclaimer.
   * 2. Redistributions in binary form must reproduce the above copyright notice,
   *    this list of conditions and the following disclaimer in the documentation
   *    and/or other materials provided with the distribution.
   *
   * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
   * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
   * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
   * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE
   * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
   * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
   * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
   * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
   * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
   * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
   * POSSIBILITY OF SUCH DAMAGE.
   *)
*/
