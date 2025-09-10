var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/.pnpm/snabbdom@0.7.4/node_modules/snabbdom/es/vnode.js
function vnode(sel, data, children, text, elm) {
  var key = data === void 0 ? void 0 : data.key;
  return { sel, data, children, text, elm, key };
}
var vnode_default;
var init_vnode = __esm({
  "node_modules/.pnpm/snabbdom@0.7.4/node_modules/snabbdom/es/vnode.js"() {
    vnode_default = vnode;
  }
});

// node_modules/.pnpm/snabbdom@0.7.4/node_modules/snabbdom/es/is.js
function primitive(s) {
  return typeof s === "string" || typeof s === "number";
}
var array;
var init_is = __esm({
  "node_modules/.pnpm/snabbdom@0.7.4/node_modules/snabbdom/es/is.js"() {
    array = Array.isArray;
  }
});

// node_modules/.pnpm/snabbdom@0.7.4/node_modules/snabbdom/es/htmldomapi.js
function createElement(tagName2) {
  return document.createElement(tagName2);
}
function createElementNS(namespaceURI, qualifiedName) {
  return document.createElementNS(namespaceURI, qualifiedName);
}
function createTextNode(text) {
  return document.createTextNode(text);
}
function createComment(text) {
  return document.createComment(text);
}
function insertBefore(parentNode2, newNode, referenceNode) {
  parentNode2.insertBefore(newNode, referenceNode);
}
function removeChild(node2, child) {
  node2.removeChild(child);
}
function appendChild(node2, child) {
  node2.appendChild(child);
}
function parentNode(node2) {
  return node2.parentNode;
}
function nextSibling(node2) {
  return node2.nextSibling;
}
function tagName(elm) {
  return elm.tagName;
}
function setTextContent(node2, text) {
  node2.textContent = text;
}
function getTextContent(node2) {
  return node2.textContent;
}
function isElement(node2) {
  return node2.nodeType === 1;
}
function isText(node2) {
  return node2.nodeType === 3;
}
function isComment(node2) {
  return node2.nodeType === 8;
}
var htmlDomApi, htmldomapi_default;
var init_htmldomapi = __esm({
  "node_modules/.pnpm/snabbdom@0.7.4/node_modules/snabbdom/es/htmldomapi.js"() {
    htmlDomApi = {
      createElement,
      createElementNS,
      createTextNode,
      createComment,
      insertBefore,
      removeChild,
      appendChild,
      parentNode,
      nextSibling,
      tagName,
      setTextContent,
      getTextContent,
      isElement,
      isText,
      isComment
    };
    htmldomapi_default = htmlDomApi;
  }
});

// node_modules/.pnpm/snabbdom@0.7.4/node_modules/snabbdom/es/h.js
function addNS(data, children, sel) {
  data.ns = "http://www.w3.org/2000/svg";
  if (sel !== "foreignObject" && children !== void 0) {
    for (var i = 0; i < children.length; ++i) {
      var childData = children[i].data;
      if (childData !== void 0) {
        addNS(childData, children[i].children, children[i].sel);
      }
    }
  }
}
function h(sel, b, c) {
  var data = {}, children, text, i;
  if (c !== void 0) {
    data = b;
    if (array(c)) {
      children = c;
    } else if (primitive(c)) {
      text = c;
    } else if (c && c.sel) {
      children = [c];
    }
  } else if (b !== void 0) {
    if (array(b)) {
      children = b;
    } else if (primitive(b)) {
      text = b;
    } else if (b && b.sel) {
      children = [b];
    } else {
      data = b;
    }
  }
  if (children !== void 0) {
    for (i = 0; i < children.length; ++i) {
      if (primitive(children[i]))
        children[i] = vnode(void 0, void 0, void 0, children[i], void 0);
    }
  }
  if (sel[0] === "s" && sel[1] === "v" && sel[2] === "g" && (sel.length === 3 || sel[3] === "." || sel[3] === "#")) {
    addNS(data, children, sel);
  }
  return vnode(sel, data, children, text, void 0);
}
var init_h = __esm({
  "node_modules/.pnpm/snabbdom@0.7.4/node_modules/snabbdom/es/h.js"() {
    init_vnode();
    init_is();
  }
});

// node_modules/.pnpm/snabbdom@0.7.4/node_modules/snabbdom/es/thunk.js
var init_thunk = __esm({
  "node_modules/.pnpm/snabbdom@0.7.4/node_modules/snabbdom/es/thunk.js"() {
    init_h();
  }
});

// node_modules/.pnpm/snabbdom@0.7.4/node_modules/snabbdom/es/snabbdom.js
function isUndef(s) {
  return s === void 0;
}
function isDef(s) {
  return s !== void 0;
}
function sameVnode(vnode1, vnode2) {
  return vnode1.key === vnode2.key && vnode1.sel === vnode2.sel;
}
function isVnode(vnode2) {
  return vnode2.sel !== void 0;
}
function createKeyToOldIdx(children, beginIdx, endIdx) {
  var i, map = {}, key, ch;
  for (i = beginIdx; i <= endIdx; ++i) {
    ch = children[i];
    if (ch != null) {
      key = ch.key;
      if (key !== void 0)
        map[key] = i;
    }
  }
  return map;
}
function init(modules, domApi) {
  var i, j, cbs = {};
  var api = domApi !== void 0 ? domApi : htmldomapi_default;
  for (i = 0; i < hooks.length; ++i) {
    cbs[hooks[i]] = [];
    for (j = 0; j < modules.length; ++j) {
      var hook = modules[j][hooks[i]];
      if (hook !== void 0) {
        cbs[hooks[i]].push(hook);
      }
    }
  }
  function emptyNodeAt(elm) {
    var id = elm.id ? "#" + elm.id : "";
    var c = elm.className ? "." + elm.className.split(" ").join(".") : "";
    return vnode_default(api.tagName(elm).toLowerCase() + id + c, {}, [], void 0, elm);
  }
  function createRmCb(childElm, listeners2) {
    return function rmCb() {
      if (--listeners2 === 0) {
        var parent_1 = api.parentNode(childElm);
        api.removeChild(parent_1, childElm);
      }
    };
  }
  function createElm(vnode2, insertedVnodeQueue) {
    var i2, data = vnode2.data;
    if (data !== void 0) {
      if (isDef(i2 = data.hook) && isDef(i2 = i2.init)) {
        i2(vnode2);
        data = vnode2.data;
      }
    }
    var children = vnode2.children, sel = vnode2.sel;
    if (sel === "!") {
      if (isUndef(vnode2.text)) {
        vnode2.text = "";
      }
      vnode2.elm = api.createComment(vnode2.text);
    } else if (sel !== void 0) {
      var hashIdx = sel.indexOf("#");
      var dotIdx = sel.indexOf(".", hashIdx);
      var hash2 = hashIdx > 0 ? hashIdx : sel.length;
      var dot = dotIdx > 0 ? dotIdx : sel.length;
      var tag = hashIdx !== -1 || dotIdx !== -1 ? sel.slice(0, Math.min(hash2, dot)) : sel;
      var elm = vnode2.elm = isDef(data) && isDef(i2 = data.ns) ? api.createElementNS(i2, tag) : api.createElement(tag);
      if (hash2 < dot)
        elm.setAttribute("id", sel.slice(hash2 + 1, dot));
      if (dotIdx > 0)
        elm.setAttribute("class", sel.slice(dot + 1).replace(/\./g, " "));
      for (i2 = 0; i2 < cbs.create.length; ++i2)
        cbs.create[i2](emptyNode, vnode2);
      if (array(children)) {
        for (i2 = 0; i2 < children.length; ++i2) {
          var ch = children[i2];
          if (ch != null) {
            api.appendChild(elm, createElm(ch, insertedVnodeQueue));
          }
        }
      } else if (primitive(vnode2.text)) {
        api.appendChild(elm, api.createTextNode(vnode2.text));
      }
      i2 = vnode2.data.hook;
      if (isDef(i2)) {
        if (i2.create)
          i2.create(emptyNode, vnode2);
        if (i2.insert)
          insertedVnodeQueue.push(vnode2);
      }
    } else {
      vnode2.elm = api.createTextNode(vnode2.text);
    }
    return vnode2.elm;
  }
  function addVnodes(parentElm, before, vnodes, startIdx, endIdx, insertedVnodeQueue) {
    for (; startIdx <= endIdx; ++startIdx) {
      var ch = vnodes[startIdx];
      if (ch != null) {
        api.insertBefore(parentElm, createElm(ch, insertedVnodeQueue), before);
      }
    }
  }
  function invokeDestroyHook(vnode2) {
    var i2, j2, data = vnode2.data;
    if (data !== void 0) {
      if (isDef(i2 = data.hook) && isDef(i2 = i2.destroy))
        i2(vnode2);
      for (i2 = 0; i2 < cbs.destroy.length; ++i2)
        cbs.destroy[i2](vnode2);
      if (vnode2.children !== void 0) {
        for (j2 = 0; j2 < vnode2.children.length; ++j2) {
          i2 = vnode2.children[j2];
          if (i2 != null && typeof i2 !== "string") {
            invokeDestroyHook(i2);
          }
        }
      }
    }
  }
  function removeVnodes(parentElm, vnodes, startIdx, endIdx) {
    for (; startIdx <= endIdx; ++startIdx) {
      var i_1 = void 0, listeners2 = void 0, rm = void 0, ch = vnodes[startIdx];
      if (ch != null) {
        if (isDef(ch.sel)) {
          invokeDestroyHook(ch);
          listeners2 = cbs.remove.length + 1;
          rm = createRmCb(ch.elm, listeners2);
          for (i_1 = 0; i_1 < cbs.remove.length; ++i_1)
            cbs.remove[i_1](ch, rm);
          if (isDef(i_1 = ch.data) && isDef(i_1 = i_1.hook) && isDef(i_1 = i_1.remove)) {
            i_1(ch, rm);
          } else {
            rm();
          }
        } else {
          api.removeChild(parentElm, ch.elm);
        }
      }
    }
  }
  function updateChildren(parentElm, oldCh, newCh, insertedVnodeQueue) {
    var oldStartIdx = 0, newStartIdx = 0;
    var oldEndIdx = oldCh.length - 1;
    var oldStartVnode = oldCh[0];
    var oldEndVnode = oldCh[oldEndIdx];
    var newEndIdx = newCh.length - 1;
    var newStartVnode = newCh[0];
    var newEndVnode = newCh[newEndIdx];
    var oldKeyToIdx;
    var idxInOld;
    var elmToMove;
    var before;
    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
      if (oldStartVnode == null) {
        oldStartVnode = oldCh[++oldStartIdx];
      } else if (oldEndVnode == null) {
        oldEndVnode = oldCh[--oldEndIdx];
      } else if (newStartVnode == null) {
        newStartVnode = newCh[++newStartIdx];
      } else if (newEndVnode == null) {
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldStartVnode, newStartVnode)) {
        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue);
        oldStartVnode = oldCh[++oldStartIdx];
        newStartVnode = newCh[++newStartIdx];
      } else if (sameVnode(oldEndVnode, newEndVnode)) {
        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue);
        oldEndVnode = oldCh[--oldEndIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldStartVnode, newEndVnode)) {
        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue);
        api.insertBefore(parentElm, oldStartVnode.elm, api.nextSibling(oldEndVnode.elm));
        oldStartVnode = oldCh[++oldStartIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldEndVnode, newStartVnode)) {
        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue);
        api.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
        oldEndVnode = oldCh[--oldEndIdx];
        newStartVnode = newCh[++newStartIdx];
      } else {
        if (oldKeyToIdx === void 0) {
          oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
        }
        idxInOld = oldKeyToIdx[newStartVnode.key];
        if (isUndef(idxInOld)) {
          api.insertBefore(parentElm, createElm(newStartVnode, insertedVnodeQueue), oldStartVnode.elm);
          newStartVnode = newCh[++newStartIdx];
        } else {
          elmToMove = oldCh[idxInOld];
          if (elmToMove.sel !== newStartVnode.sel) {
            api.insertBefore(parentElm, createElm(newStartVnode, insertedVnodeQueue), oldStartVnode.elm);
          } else {
            patchVnode(elmToMove, newStartVnode, insertedVnodeQueue);
            oldCh[idxInOld] = void 0;
            api.insertBefore(parentElm, elmToMove.elm, oldStartVnode.elm);
          }
          newStartVnode = newCh[++newStartIdx];
        }
      }
    }
    if (oldStartIdx <= oldEndIdx || newStartIdx <= newEndIdx) {
      if (oldStartIdx > oldEndIdx) {
        before = newCh[newEndIdx + 1] == null ? null : newCh[newEndIdx + 1].elm;
        addVnodes(parentElm, before, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
      } else {
        removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
      }
    }
  }
  function patchVnode(oldVnode, vnode2, insertedVnodeQueue) {
    var i2, hook2;
    if (isDef(i2 = vnode2.data) && isDef(hook2 = i2.hook) && isDef(i2 = hook2.prepatch)) {
      i2(oldVnode, vnode2);
    }
    var elm = vnode2.elm = oldVnode.elm;
    var oldCh = oldVnode.children;
    var ch = vnode2.children;
    if (oldVnode === vnode2)
      return;
    if (vnode2.data !== void 0) {
      for (i2 = 0; i2 < cbs.update.length; ++i2)
        cbs.update[i2](oldVnode, vnode2);
      i2 = vnode2.data.hook;
      if (isDef(i2) && isDef(i2 = i2.update))
        i2(oldVnode, vnode2);
    }
    if (isUndef(vnode2.text)) {
      if (isDef(oldCh) && isDef(ch)) {
        if (oldCh !== ch)
          updateChildren(elm, oldCh, ch, insertedVnodeQueue);
      } else if (isDef(ch)) {
        if (isDef(oldVnode.text))
          api.setTextContent(elm, "");
        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
      } else if (isDef(oldCh)) {
        removeVnodes(elm, oldCh, 0, oldCh.length - 1);
      } else if (isDef(oldVnode.text)) {
        api.setTextContent(elm, "");
      }
    } else if (oldVnode.text !== vnode2.text) {
      if (isDef(oldCh)) {
        removeVnodes(elm, oldCh, 0, oldCh.length - 1);
      }
      api.setTextContent(elm, vnode2.text);
    }
    if (isDef(hook2) && isDef(i2 = hook2.postpatch)) {
      i2(oldVnode, vnode2);
    }
  }
  return function patch(oldVnode, vnode2) {
    var i2, elm, parent;
    var insertedVnodeQueue = [];
    for (i2 = 0; i2 < cbs.pre.length; ++i2)
      cbs.pre[i2]();
    if (!isVnode(oldVnode)) {
      oldVnode = emptyNodeAt(oldVnode);
    }
    if (sameVnode(oldVnode, vnode2)) {
      patchVnode(oldVnode, vnode2, insertedVnodeQueue);
    } else {
      elm = oldVnode.elm;
      parent = api.parentNode(elm);
      createElm(vnode2, insertedVnodeQueue);
      if (parent !== null) {
        api.insertBefore(parent, vnode2.elm, api.nextSibling(elm));
        removeVnodes(parent, [oldVnode], 0, 0);
      }
    }
    for (i2 = 0; i2 < insertedVnodeQueue.length; ++i2) {
      insertedVnodeQueue[i2].data.hook.insert(insertedVnodeQueue[i2]);
    }
    for (i2 = 0; i2 < cbs.post.length; ++i2)
      cbs.post[i2]();
    return vnode2;
  };
}
var emptyNode, hooks;
var init_snabbdom = __esm({
  "node_modules/.pnpm/snabbdom@0.7.4/node_modules/snabbdom/es/snabbdom.js"() {
    init_vnode();
    init_is();
    init_htmldomapi();
    init_h();
    init_thunk();
    emptyNode = vnode_default("", {}, [], void 0, void 0);
    hooks = ["create", "update", "remove", "destroy", "pre", "post"];
  }
});

// node_modules/.pnpm/snabbdom@0.7.4/node_modules/snabbdom/modules/class.js
var require_class = __commonJS({
  "node_modules/.pnpm/snabbdom@0.7.4/node_modules/snabbdom/modules/class.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function updateClass(oldVnode, vnode2) {
      var cur, name, elm = vnode2.elm, oldClass = oldVnode.data.class, klass2 = vnode2.data.class;
      if (!oldClass && !klass2)
        return;
      if (oldClass === klass2)
        return;
      oldClass = oldClass || {};
      klass2 = klass2 || {};
      for (name in oldClass) {
        if (!klass2[name]) {
          elm.classList.remove(name);
        }
      }
      for (name in klass2) {
        cur = klass2[name];
        if (cur !== oldClass[name]) {
          elm.classList[cur ? "add" : "remove"](name);
        }
      }
    }
    exports.classModule = { create: updateClass, update: updateClass };
    exports.default = exports.classModule;
  }
});

// node_modules/.pnpm/snabbdom@0.7.4/node_modules/snabbdom/modules/attributes.js
var require_attributes = __commonJS({
  "node_modules/.pnpm/snabbdom@0.7.4/node_modules/snabbdom/modules/attributes.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var xlinkNS = "http://www.w3.org/1999/xlink";
    var xmlNS = "http://www.w3.org/XML/1998/namespace";
    var colonChar = 58;
    var xChar = 120;
    function updateAttrs(oldVnode, vnode2) {
      var key, elm = vnode2.elm, oldAttrs = oldVnode.data.attrs, attrs = vnode2.data.attrs;
      if (!oldAttrs && !attrs)
        return;
      if (oldAttrs === attrs)
        return;
      oldAttrs = oldAttrs || {};
      attrs = attrs || {};
      for (key in attrs) {
        var cur = attrs[key];
        var old = oldAttrs[key];
        if (old !== cur) {
          if (cur === true) {
            elm.setAttribute(key, "");
          } else if (cur === false) {
            elm.removeAttribute(key);
          } else {
            if (key.charCodeAt(0) !== xChar) {
              elm.setAttribute(key, cur);
            } else if (key.charCodeAt(3) === colonChar) {
              elm.setAttributeNS(xmlNS, key, cur);
            } else if (key.charCodeAt(5) === colonChar) {
              elm.setAttributeNS(xlinkNS, key, cur);
            } else {
              elm.setAttribute(key, cur);
            }
          }
        }
      }
      for (key in oldAttrs) {
        if (!(key in attrs)) {
          elm.removeAttribute(key);
        }
      }
    }
    exports.attributesModule = { create: updateAttrs, update: updateAttrs };
    exports.default = exports.attributesModule;
  }
});

// node_modules/.pnpm/snabbdom@0.7.4/node_modules/snabbdom/modules/props.js
var require_props = __commonJS({
  "node_modules/.pnpm/snabbdom@0.7.4/node_modules/snabbdom/modules/props.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function updateProps(oldVnode, vnode2) {
      var key, cur, old, elm = vnode2.elm, oldProps = oldVnode.data.props, props2 = vnode2.data.props;
      if (!oldProps && !props2)
        return;
      if (oldProps === props2)
        return;
      oldProps = oldProps || {};
      props2 = props2 || {};
      for (key in oldProps) {
        if (!props2[key]) {
          delete elm[key];
        }
      }
      for (key in props2) {
        cur = props2[key];
        old = oldProps[key];
        if (old !== cur && (key !== "value" || elm[key] !== cur)) {
          elm[key] = cur;
        }
      }
    }
    exports.propsModule = { create: updateProps, update: updateProps };
    exports.default = exports.propsModule;
  }
});

// node_modules/.pnpm/snabbdom@0.7.4/node_modules/snabbdom/modules/eventlisteners.js
var require_eventlisteners = __commonJS({
  "node_modules/.pnpm/snabbdom@0.7.4/node_modules/snabbdom/modules/eventlisteners.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function invokeHandler(handler, vnode2, event) {
      if (typeof handler === "function") {
        handler.call(vnode2, event, vnode2);
      } else if (typeof handler === "object") {
        if (typeof handler[0] === "function") {
          if (handler.length === 2) {
            handler[0].call(vnode2, handler[1], event, vnode2);
          } else {
            var args = handler.slice(1);
            args.push(event);
            args.push(vnode2);
            handler[0].apply(vnode2, args);
          }
        } else {
          for (var i = 0; i < handler.length; i++) {
            invokeHandler(handler[i], vnode2, event);
          }
        }
      }
    }
    function handleEvent(event, vnode2) {
      var name = event.type, on = vnode2.data.on;
      if (on && on[name]) {
        invokeHandler(on[name], vnode2, event);
      }
    }
    function createListener() {
      return function handler(event) {
        handleEvent(event, handler.vnode);
      };
    }
    function updateEventListeners(oldVnode, vnode2) {
      var oldOn = oldVnode.data.on, oldListener = oldVnode.listener, oldElm = oldVnode.elm, on = vnode2 && vnode2.data.on, elm = vnode2 && vnode2.elm, name;
      if (oldOn === on) {
        return;
      }
      if (oldOn && oldListener) {
        if (!on) {
          for (name in oldOn) {
            oldElm.removeEventListener(name, oldListener, false);
          }
        } else {
          for (name in oldOn) {
            if (!on[name]) {
              oldElm.removeEventListener(name, oldListener, false);
            }
          }
        }
      }
      if (on) {
        var listener = vnode2.listener = oldVnode.listener || createListener();
        listener.vnode = vnode2;
        if (!oldOn) {
          for (name in on) {
            elm.addEventListener(name, listener, false);
          }
        } else {
          for (name in on) {
            if (!oldOn[name]) {
              elm.addEventListener(name, listener, false);
            }
          }
        }
      }
    }
    exports.eventListenersModule = {
      create: updateEventListeners,
      update: updateEventListeners,
      destroy: updateEventListeners
    };
    exports.default = exports.eventListenersModule;
  }
});

// node_modules/.pnpm/chess.js@1.4.0/node_modules/chess.js/dist/esm/chess.js
function rootNode(comment) {
  return comment !== null ? { comment, variations: [] } : { variations: [] };
}
function node(move3, suffix, nag, comment, variations) {
  const node2 = { move: move3, variations };
  if (suffix) {
    node2.suffix = suffix;
  }
  if (nag) {
    node2.nag = nag;
  }
  if (comment !== null) {
    node2.comment = comment;
  }
  return node2;
}
function lineToTree(...nodes) {
  const [root, ...rest] = nodes;
  let parent = root;
  for (const child of rest) {
    if (child !== null) {
      parent.variations = [child, ...child.variations];
      child.variations = [];
      parent = child;
    }
  }
  return root;
}
function pgn(headers, game) {
  if (game.marker && game.marker.comment) {
    let node2 = game.root;
    while (true) {
      const next = node2.variations[0];
      if (!next) {
        node2.comment = game.marker.comment;
        break;
      }
      node2 = next;
    }
  }
  return {
    headers,
    root: game.root,
    result: (game.marker && game.marker.result) ?? void 0
  };
}
function peg$subclass(child, parent) {
  function C() {
    this.constructor = child;
  }
  C.prototype = parent.prototype;
  child.prototype = new C();
}
function peg$SyntaxError(message, expected, found, location) {
  var self = Error.call(this, message);
  if (Object.setPrototypeOf) {
    Object.setPrototypeOf(self, peg$SyntaxError.prototype);
  }
  self.expected = expected;
  self.found = found;
  self.location = location;
  self.name = "SyntaxError";
  return self;
}
function peg$padEnd(str, targetLength, padString) {
  padString = padString || " ";
  if (str.length > targetLength) {
    return str;
  }
  targetLength -= str.length;
  padString += padString.repeat(targetLength);
  return str + padString.slice(0, targetLength);
}
function peg$parse(input, options) {
  options = options !== void 0 ? options : {};
  var peg$FAILED = {};
  var peg$source = options.grammarSource;
  var peg$startRuleFunctions = { pgn: peg$parsepgn };
  var peg$startRuleFunction = peg$parsepgn;
  var peg$c0 = "[";
  var peg$c1 = '"';
  var peg$c2 = "]";
  var peg$c3 = ".";
  var peg$c4 = "O-O-O";
  var peg$c5 = "O-O";
  var peg$c6 = "0-0-0";
  var peg$c7 = "0-0";
  var peg$c8 = "$";
  var peg$c9 = "{";
  var peg$c10 = "}";
  var peg$c11 = ";";
  var peg$c12 = "(";
  var peg$c13 = ")";
  var peg$c14 = "1-0";
  var peg$c15 = "0-1";
  var peg$c16 = "1/2-1/2";
  var peg$c17 = "*";
  var peg$r0 = /^[a-zA-Z]/;
  var peg$r1 = /^[^"]/;
  var peg$r2 = /^[0-9]/;
  var peg$r3 = /^[.]/;
  var peg$r4 = /^[a-zA-Z1-8\-=]/;
  var peg$r5 = /^[+#]/;
  var peg$r6 = /^[!?]/;
  var peg$r7 = /^[^}]/;
  var peg$r8 = /^[^\r\n]/;
  var peg$r9 = /^[ \t\r\n]/;
  var peg$e0 = peg$otherExpectation("tag pair");
  var peg$e1 = peg$literalExpectation("[", false);
  var peg$e2 = peg$literalExpectation('"', false);
  var peg$e3 = peg$literalExpectation("]", false);
  var peg$e4 = peg$otherExpectation("tag name");
  var peg$e5 = peg$classExpectation([["a", "z"], ["A", "Z"]], false, false);
  var peg$e6 = peg$otherExpectation("tag value");
  var peg$e7 = peg$classExpectation(['"'], true, false);
  var peg$e8 = peg$otherExpectation("move number");
  var peg$e9 = peg$classExpectation([["0", "9"]], false, false);
  var peg$e10 = peg$literalExpectation(".", false);
  var peg$e11 = peg$classExpectation(["."], false, false);
  var peg$e12 = peg$otherExpectation("standard algebraic notation");
  var peg$e13 = peg$literalExpectation("O-O-O", false);
  var peg$e14 = peg$literalExpectation("O-O", false);
  var peg$e15 = peg$literalExpectation("0-0-0", false);
  var peg$e16 = peg$literalExpectation("0-0", false);
  var peg$e17 = peg$classExpectation([["a", "z"], ["A", "Z"], ["1", "8"], "-", "="], false, false);
  var peg$e18 = peg$classExpectation(["+", "#"], false, false);
  var peg$e19 = peg$otherExpectation("suffix annotation");
  var peg$e20 = peg$classExpectation(["!", "?"], false, false);
  var peg$e21 = peg$otherExpectation("NAG");
  var peg$e22 = peg$literalExpectation("$", false);
  var peg$e23 = peg$otherExpectation("brace comment");
  var peg$e24 = peg$literalExpectation("{", false);
  var peg$e25 = peg$classExpectation(["}"], true, false);
  var peg$e26 = peg$literalExpectation("}", false);
  var peg$e27 = peg$otherExpectation("rest of line comment");
  var peg$e28 = peg$literalExpectation(";", false);
  var peg$e29 = peg$classExpectation(["\r", "\n"], true, false);
  var peg$e30 = peg$otherExpectation("variation");
  var peg$e31 = peg$literalExpectation("(", false);
  var peg$e32 = peg$literalExpectation(")", false);
  var peg$e33 = peg$otherExpectation("game termination marker");
  var peg$e34 = peg$literalExpectation("1-0", false);
  var peg$e35 = peg$literalExpectation("0-1", false);
  var peg$e36 = peg$literalExpectation("1/2-1/2", false);
  var peg$e37 = peg$literalExpectation("*", false);
  var peg$e38 = peg$otherExpectation("whitespace");
  var peg$e39 = peg$classExpectation([" ", "	", "\r", "\n"], false, false);
  var peg$f0 = function(headers, game) {
    return pgn(headers, game);
  };
  var peg$f1 = function(tagPairs) {
    return Object.fromEntries(tagPairs);
  };
  var peg$f2 = function(tagName2, tagValue) {
    return [tagName2, tagValue];
  };
  var peg$f3 = function(root, marker) {
    return { root, marker };
  };
  var peg$f4 = function(comment, moves) {
    return lineToTree(rootNode(comment), ...moves.flat());
  };
  var peg$f5 = function(san, suffix, nag, comment, variations) {
    return node(san, suffix, nag, comment, variations);
  };
  var peg$f6 = function(nag) {
    return nag;
  };
  var peg$f7 = function(comment) {
    return comment.replace(/[\r\n]+/g, " ");
  };
  var peg$f8 = function(comment) {
    return comment.trim();
  };
  var peg$f9 = function(line) {
    return line;
  };
  var peg$f10 = function(result, comment) {
    return { result, comment };
  };
  var peg$currPos = options.peg$currPos | 0;
  var peg$posDetailsCache = [{ line: 1, column: 1 }];
  var peg$maxFailPos = peg$currPos;
  var peg$maxFailExpected = options.peg$maxFailExpected || [];
  var peg$silentFails = options.peg$silentFails | 0;
  var peg$result;
  if (options.startRule) {
    if (!(options.startRule in peg$startRuleFunctions)) {
      throw new Error(`Can't start parsing from rule "` + options.startRule + '".');
    }
    peg$startRuleFunction = peg$startRuleFunctions[options.startRule];
  }
  function peg$literalExpectation(text, ignoreCase) {
    return { type: "literal", text, ignoreCase };
  }
  function peg$classExpectation(parts, inverted, ignoreCase) {
    return { type: "class", parts, inverted, ignoreCase };
  }
  function peg$endExpectation() {
    return { type: "end" };
  }
  function peg$otherExpectation(description) {
    return { type: "other", description };
  }
  function peg$computePosDetails(pos) {
    var details = peg$posDetailsCache[pos];
    var p;
    if (details) {
      return details;
    } else {
      if (pos >= peg$posDetailsCache.length) {
        p = peg$posDetailsCache.length - 1;
      } else {
        p = pos;
        while (!peg$posDetailsCache[--p]) {
        }
      }
      details = peg$posDetailsCache[p];
      details = {
        line: details.line,
        column: details.column
      };
      while (p < pos) {
        if (input.charCodeAt(p) === 10) {
          details.line++;
          details.column = 1;
        } else {
          details.column++;
        }
        p++;
      }
      peg$posDetailsCache[pos] = details;
      return details;
    }
  }
  function peg$computeLocation(startPos, endPos, offset) {
    var startPosDetails = peg$computePosDetails(startPos);
    var endPosDetails = peg$computePosDetails(endPos);
    var res = {
      source: peg$source,
      start: {
        offset: startPos,
        line: startPosDetails.line,
        column: startPosDetails.column
      },
      end: {
        offset: endPos,
        line: endPosDetails.line,
        column: endPosDetails.column
      }
    };
    return res;
  }
  function peg$fail(expected) {
    if (peg$currPos < peg$maxFailPos) {
      return;
    }
    if (peg$currPos > peg$maxFailPos) {
      peg$maxFailPos = peg$currPos;
      peg$maxFailExpected = [];
    }
    peg$maxFailExpected.push(expected);
  }
  function peg$buildStructuredError(expected, found, location) {
    return new peg$SyntaxError(
      peg$SyntaxError.buildMessage(expected, found),
      expected,
      found,
      location
    );
  }
  function peg$parsepgn() {
    var s0, s1, s2;
    s0 = peg$currPos;
    s1 = peg$parsetagPairSection();
    s2 = peg$parsemoveTextSection();
    s0 = peg$f0(s1, s2);
    return s0;
  }
  function peg$parsetagPairSection() {
    var s0, s1, s2;
    s0 = peg$currPos;
    s1 = [];
    s2 = peg$parsetagPair();
    while (s2 !== peg$FAILED) {
      s1.push(s2);
      s2 = peg$parsetagPair();
    }
    s2 = peg$parse_();
    s0 = peg$f1(s1);
    return s0;
  }
  function peg$parsetagPair() {
    var s0, s2, s4, s6, s7, s8, s10;
    peg$silentFails++;
    s0 = peg$currPos;
    peg$parse_();
    if (input.charCodeAt(peg$currPos) === 91) {
      s2 = peg$c0;
      peg$currPos++;
    } else {
      s2 = peg$FAILED;
      if (peg$silentFails === 0) {
        peg$fail(peg$e1);
      }
    }
    if (s2 !== peg$FAILED) {
      peg$parse_();
      s4 = peg$parsetagName();
      if (s4 !== peg$FAILED) {
        peg$parse_();
        if (input.charCodeAt(peg$currPos) === 34) {
          s6 = peg$c1;
          peg$currPos++;
        } else {
          s6 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$e2);
          }
        }
        if (s6 !== peg$FAILED) {
          s7 = peg$parsetagValue();
          if (input.charCodeAt(peg$currPos) === 34) {
            s8 = peg$c1;
            peg$currPos++;
          } else {
            s8 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$e2);
            }
          }
          if (s8 !== peg$FAILED) {
            peg$parse_();
            if (input.charCodeAt(peg$currPos) === 93) {
              s10 = peg$c2;
              peg$currPos++;
            } else {
              s10 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$e3);
              }
            }
            if (s10 !== peg$FAILED) {
              s0 = peg$f2(s4, s7);
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }
    peg$silentFails--;
    if (s0 === peg$FAILED) {
      if (peg$silentFails === 0) {
        peg$fail(peg$e0);
      }
    }
    return s0;
  }
  function peg$parsetagName() {
    var s0, s1, s2;
    peg$silentFails++;
    s0 = peg$currPos;
    s1 = [];
    s2 = input.charAt(peg$currPos);
    if (peg$r0.test(s2)) {
      peg$currPos++;
    } else {
      s2 = peg$FAILED;
      if (peg$silentFails === 0) {
        peg$fail(peg$e5);
      }
    }
    if (s2 !== peg$FAILED) {
      while (s2 !== peg$FAILED) {
        s1.push(s2);
        s2 = input.charAt(peg$currPos);
        if (peg$r0.test(s2)) {
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$e5);
          }
        }
      }
    } else {
      s1 = peg$FAILED;
    }
    if (s1 !== peg$FAILED) {
      s0 = input.substring(s0, peg$currPos);
    } else {
      s0 = s1;
    }
    peg$silentFails--;
    if (s0 === peg$FAILED) {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) {
        peg$fail(peg$e4);
      }
    }
    return s0;
  }
  function peg$parsetagValue() {
    var s0, s1, s2;
    peg$silentFails++;
    s0 = peg$currPos;
    s1 = [];
    s2 = input.charAt(peg$currPos);
    if (peg$r1.test(s2)) {
      peg$currPos++;
    } else {
      s2 = peg$FAILED;
      if (peg$silentFails === 0) {
        peg$fail(peg$e7);
      }
    }
    while (s2 !== peg$FAILED) {
      s1.push(s2);
      s2 = input.charAt(peg$currPos);
      if (peg$r1.test(s2)) {
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$e7);
        }
      }
    }
    s0 = input.substring(s0, peg$currPos);
    peg$silentFails--;
    s1 = peg$FAILED;
    if (peg$silentFails === 0) {
      peg$fail(peg$e6);
    }
    return s0;
  }
  function peg$parsemoveTextSection() {
    var s0, s1, s3;
    s0 = peg$currPos;
    s1 = peg$parseline();
    peg$parse_();
    s3 = peg$parsegameTerminationMarker();
    if (s3 === peg$FAILED) {
      s3 = null;
    }
    peg$parse_();
    s0 = peg$f3(s1, s3);
    return s0;
  }
  function peg$parseline() {
    var s0, s1, s2, s3;
    s0 = peg$currPos;
    s1 = peg$parsecomment();
    if (s1 === peg$FAILED) {
      s1 = null;
    }
    s2 = [];
    s3 = peg$parsemove();
    while (s3 !== peg$FAILED) {
      s2.push(s3);
      s3 = peg$parsemove();
    }
    s0 = peg$f4(s1, s2);
    return s0;
  }
  function peg$parsemove() {
    var s0, s4, s5, s6, s7, s8, s9, s10;
    s0 = peg$currPos;
    peg$parse_();
    peg$parsemoveNumber();
    peg$parse_();
    s4 = peg$parsesan();
    if (s4 !== peg$FAILED) {
      s5 = peg$parsesuffixAnnotation();
      if (s5 === peg$FAILED) {
        s5 = null;
      }
      s6 = [];
      s7 = peg$parsenag();
      while (s7 !== peg$FAILED) {
        s6.push(s7);
        s7 = peg$parsenag();
      }
      s7 = peg$parse_();
      s8 = peg$parsecomment();
      if (s8 === peg$FAILED) {
        s8 = null;
      }
      s9 = [];
      s10 = peg$parsevariation();
      while (s10 !== peg$FAILED) {
        s9.push(s10);
        s10 = peg$parsevariation();
      }
      s0 = peg$f5(s4, s5, s6, s8, s9);
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }
    return s0;
  }
  function peg$parsemoveNumber() {
    var s0, s1, s2, s3, s4, s5;
    peg$silentFails++;
    s0 = peg$currPos;
    s1 = [];
    s2 = input.charAt(peg$currPos);
    if (peg$r2.test(s2)) {
      peg$currPos++;
    } else {
      s2 = peg$FAILED;
      if (peg$silentFails === 0) {
        peg$fail(peg$e9);
      }
    }
    while (s2 !== peg$FAILED) {
      s1.push(s2);
      s2 = input.charAt(peg$currPos);
      if (peg$r2.test(s2)) {
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$e9);
        }
      }
    }
    if (input.charCodeAt(peg$currPos) === 46) {
      s2 = peg$c3;
      peg$currPos++;
    } else {
      s2 = peg$FAILED;
      if (peg$silentFails === 0) {
        peg$fail(peg$e10);
      }
    }
    if (s2 !== peg$FAILED) {
      s3 = peg$parse_();
      s4 = [];
      s5 = input.charAt(peg$currPos);
      if (peg$r3.test(s5)) {
        peg$currPos++;
      } else {
        s5 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$e11);
        }
      }
      while (s5 !== peg$FAILED) {
        s4.push(s5);
        s5 = input.charAt(peg$currPos);
        if (peg$r3.test(s5)) {
          peg$currPos++;
        } else {
          s5 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$e11);
          }
        }
      }
      s1 = [s1, s2, s3, s4];
      s0 = s1;
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }
    peg$silentFails--;
    if (s0 === peg$FAILED) {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) {
        peg$fail(peg$e8);
      }
    }
    return s0;
  }
  function peg$parsesan() {
    var s0, s1, s2, s3, s4, s5;
    peg$silentFails++;
    s0 = peg$currPos;
    s1 = peg$currPos;
    if (input.substr(peg$currPos, 5) === peg$c4) {
      s2 = peg$c4;
      peg$currPos += 5;
    } else {
      s2 = peg$FAILED;
      if (peg$silentFails === 0) {
        peg$fail(peg$e13);
      }
    }
    if (s2 === peg$FAILED) {
      if (input.substr(peg$currPos, 3) === peg$c5) {
        s2 = peg$c5;
        peg$currPos += 3;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$e14);
        }
      }
      if (s2 === peg$FAILED) {
        if (input.substr(peg$currPos, 5) === peg$c6) {
          s2 = peg$c6;
          peg$currPos += 5;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$e15);
          }
        }
        if (s2 === peg$FAILED) {
          if (input.substr(peg$currPos, 3) === peg$c7) {
            s2 = peg$c7;
            peg$currPos += 3;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$e16);
            }
          }
          if (s2 === peg$FAILED) {
            s2 = peg$currPos;
            s3 = input.charAt(peg$currPos);
            if (peg$r0.test(s3)) {
              peg$currPos++;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$e5);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = [];
              s5 = input.charAt(peg$currPos);
              if (peg$r4.test(s5)) {
                peg$currPos++;
              } else {
                s5 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$e17);
                }
              }
              if (s5 !== peg$FAILED) {
                while (s5 !== peg$FAILED) {
                  s4.push(s5);
                  s5 = input.charAt(peg$currPos);
                  if (peg$r4.test(s5)) {
                    peg$currPos++;
                  } else {
                    s5 = peg$FAILED;
                    if (peg$silentFails === 0) {
                      peg$fail(peg$e17);
                    }
                  }
                }
              } else {
                s4 = peg$FAILED;
              }
              if (s4 !== peg$FAILED) {
                s3 = [s3, s4];
                s2 = s3;
              } else {
                peg$currPos = s2;
                s2 = peg$FAILED;
              }
            } else {
              peg$currPos = s2;
              s2 = peg$FAILED;
            }
          }
        }
      }
    }
    if (s2 !== peg$FAILED) {
      s3 = input.charAt(peg$currPos);
      if (peg$r5.test(s3)) {
        peg$currPos++;
      } else {
        s3 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$e18);
        }
      }
      if (s3 === peg$FAILED) {
        s3 = null;
      }
      s2 = [s2, s3];
      s1 = s2;
    } else {
      peg$currPos = s1;
      s1 = peg$FAILED;
    }
    if (s1 !== peg$FAILED) {
      s0 = input.substring(s0, peg$currPos);
    } else {
      s0 = s1;
    }
    peg$silentFails--;
    if (s0 === peg$FAILED) {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) {
        peg$fail(peg$e12);
      }
    }
    return s0;
  }
  function peg$parsesuffixAnnotation() {
    var s0, s1, s2;
    peg$silentFails++;
    s0 = peg$currPos;
    s1 = [];
    s2 = input.charAt(peg$currPos);
    if (peg$r6.test(s2)) {
      peg$currPos++;
    } else {
      s2 = peg$FAILED;
      if (peg$silentFails === 0) {
        peg$fail(peg$e20);
      }
    }
    while (s2 !== peg$FAILED) {
      s1.push(s2);
      if (s1.length >= 2) {
        s2 = peg$FAILED;
      } else {
        s2 = input.charAt(peg$currPos);
        if (peg$r6.test(s2)) {
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$e20);
          }
        }
      }
    }
    if (s1.length < 1) {
      peg$currPos = s0;
      s0 = peg$FAILED;
    } else {
      s0 = s1;
    }
    peg$silentFails--;
    if (s0 === peg$FAILED) {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) {
        peg$fail(peg$e19);
      }
    }
    return s0;
  }
  function peg$parsenag() {
    var s0, s2, s3, s4, s5;
    peg$silentFails++;
    s0 = peg$currPos;
    peg$parse_();
    if (input.charCodeAt(peg$currPos) === 36) {
      s2 = peg$c8;
      peg$currPos++;
    } else {
      s2 = peg$FAILED;
      if (peg$silentFails === 0) {
        peg$fail(peg$e22);
      }
    }
    if (s2 !== peg$FAILED) {
      s3 = peg$currPos;
      s4 = [];
      s5 = input.charAt(peg$currPos);
      if (peg$r2.test(s5)) {
        peg$currPos++;
      } else {
        s5 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$e9);
        }
      }
      if (s5 !== peg$FAILED) {
        while (s5 !== peg$FAILED) {
          s4.push(s5);
          s5 = input.charAt(peg$currPos);
          if (peg$r2.test(s5)) {
            peg$currPos++;
          } else {
            s5 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$e9);
            }
          }
        }
      } else {
        s4 = peg$FAILED;
      }
      if (s4 !== peg$FAILED) {
        s3 = input.substring(s3, peg$currPos);
      } else {
        s3 = s4;
      }
      if (s3 !== peg$FAILED) {
        s0 = peg$f6(s3);
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }
    peg$silentFails--;
    if (s0 === peg$FAILED) {
      if (peg$silentFails === 0) {
        peg$fail(peg$e21);
      }
    }
    return s0;
  }
  function peg$parsecomment() {
    var s0;
    s0 = peg$parsebraceComment();
    if (s0 === peg$FAILED) {
      s0 = peg$parserestOfLineComment();
    }
    return s0;
  }
  function peg$parsebraceComment() {
    var s0, s1, s2, s3, s4;
    peg$silentFails++;
    s0 = peg$currPos;
    if (input.charCodeAt(peg$currPos) === 123) {
      s1 = peg$c9;
      peg$currPos++;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) {
        peg$fail(peg$e24);
      }
    }
    if (s1 !== peg$FAILED) {
      s2 = peg$currPos;
      s3 = [];
      s4 = input.charAt(peg$currPos);
      if (peg$r7.test(s4)) {
        peg$currPos++;
      } else {
        s4 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$e25);
        }
      }
      while (s4 !== peg$FAILED) {
        s3.push(s4);
        s4 = input.charAt(peg$currPos);
        if (peg$r7.test(s4)) {
          peg$currPos++;
        } else {
          s4 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$e25);
          }
        }
      }
      s2 = input.substring(s2, peg$currPos);
      if (input.charCodeAt(peg$currPos) === 125) {
        s3 = peg$c10;
        peg$currPos++;
      } else {
        s3 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$e26);
        }
      }
      if (s3 !== peg$FAILED) {
        s0 = peg$f7(s2);
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }
    peg$silentFails--;
    if (s0 === peg$FAILED) {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) {
        peg$fail(peg$e23);
      }
    }
    return s0;
  }
  function peg$parserestOfLineComment() {
    var s0, s1, s2, s3, s4;
    peg$silentFails++;
    s0 = peg$currPos;
    if (input.charCodeAt(peg$currPos) === 59) {
      s1 = peg$c11;
      peg$currPos++;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) {
        peg$fail(peg$e28);
      }
    }
    if (s1 !== peg$FAILED) {
      s2 = peg$currPos;
      s3 = [];
      s4 = input.charAt(peg$currPos);
      if (peg$r8.test(s4)) {
        peg$currPos++;
      } else {
        s4 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$e29);
        }
      }
      while (s4 !== peg$FAILED) {
        s3.push(s4);
        s4 = input.charAt(peg$currPos);
        if (peg$r8.test(s4)) {
          peg$currPos++;
        } else {
          s4 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$e29);
          }
        }
      }
      s2 = input.substring(s2, peg$currPos);
      s0 = peg$f8(s2);
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }
    peg$silentFails--;
    if (s0 === peg$FAILED) {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) {
        peg$fail(peg$e27);
      }
    }
    return s0;
  }
  function peg$parsevariation() {
    var s0, s2, s3, s5;
    peg$silentFails++;
    s0 = peg$currPos;
    peg$parse_();
    if (input.charCodeAt(peg$currPos) === 40) {
      s2 = peg$c12;
      peg$currPos++;
    } else {
      s2 = peg$FAILED;
      if (peg$silentFails === 0) {
        peg$fail(peg$e31);
      }
    }
    if (s2 !== peg$FAILED) {
      s3 = peg$parseline();
      if (s3 !== peg$FAILED) {
        peg$parse_();
        if (input.charCodeAt(peg$currPos) === 41) {
          s5 = peg$c13;
          peg$currPos++;
        } else {
          s5 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$e32);
          }
        }
        if (s5 !== peg$FAILED) {
          s0 = peg$f9(s3);
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }
    peg$silentFails--;
    if (s0 === peg$FAILED) {
      if (peg$silentFails === 0) {
        peg$fail(peg$e30);
      }
    }
    return s0;
  }
  function peg$parsegameTerminationMarker() {
    var s0, s1, s3;
    peg$silentFails++;
    s0 = peg$currPos;
    if (input.substr(peg$currPos, 3) === peg$c14) {
      s1 = peg$c14;
      peg$currPos += 3;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) {
        peg$fail(peg$e34);
      }
    }
    if (s1 === peg$FAILED) {
      if (input.substr(peg$currPos, 3) === peg$c15) {
        s1 = peg$c15;
        peg$currPos += 3;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$e35);
        }
      }
      if (s1 === peg$FAILED) {
        if (input.substr(peg$currPos, 7) === peg$c16) {
          s1 = peg$c16;
          peg$currPos += 7;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$e36);
          }
        }
        if (s1 === peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 42) {
            s1 = peg$c17;
            peg$currPos++;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$e37);
            }
          }
        }
      }
    }
    if (s1 !== peg$FAILED) {
      peg$parse_();
      s3 = peg$parsecomment();
      if (s3 === peg$FAILED) {
        s3 = null;
      }
      s0 = peg$f10(s1, s3);
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }
    peg$silentFails--;
    if (s0 === peg$FAILED) {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) {
        peg$fail(peg$e33);
      }
    }
    return s0;
  }
  function peg$parse_() {
    var s0, s1;
    peg$silentFails++;
    s0 = [];
    s1 = input.charAt(peg$currPos);
    if (peg$r9.test(s1)) {
      peg$currPos++;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) {
        peg$fail(peg$e39);
      }
    }
    while (s1 !== peg$FAILED) {
      s0.push(s1);
      s1 = input.charAt(peg$currPos);
      if (peg$r9.test(s1)) {
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$e39);
        }
      }
    }
    peg$silentFails--;
    s1 = peg$FAILED;
    if (peg$silentFails === 0) {
      peg$fail(peg$e38);
    }
    return s0;
  }
  peg$result = peg$startRuleFunction();
  if (options.peg$library) {
    return (
      /** @type {any} */
      {
        peg$result,
        peg$currPos,
        peg$FAILED,
        peg$maxFailExpected,
        peg$maxFailPos
      }
    );
  }
  if (peg$result !== peg$FAILED && peg$currPos === input.length) {
    return peg$result;
  } else {
    if (peg$result !== peg$FAILED && peg$currPos < input.length) {
      peg$fail(peg$endExpectation());
    }
    throw peg$buildStructuredError(
      peg$maxFailExpected,
      peg$maxFailPos < input.length ? input.charAt(peg$maxFailPos) : null,
      peg$maxFailPos < input.length ? peg$computeLocation(peg$maxFailPos, peg$maxFailPos + 1) : peg$computeLocation(peg$maxFailPos, peg$maxFailPos)
    );
  }
}
function rotl(x, k) {
  return (x << k | x >> 64n - k) & 0xffffffffffffffffn;
}
function wrappingMul(x, y) {
  return x * y & MASK64;
}
function xoroshiro128(state) {
  return function() {
    let s0 = BigInt(state & MASK64);
    let s1 = BigInt(state >> 64n & MASK64);
    const result = wrappingMul(rotl(wrappingMul(s0, 5n), 7n), 9n);
    s1 ^= s0;
    s0 = (rotl(s0, 24n) ^ s1 ^ s1 << 16n) & MASK64;
    s1 = rotl(s1, 37n);
    state = s1 << 64n | s0;
    return result;
  };
}
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
var MASK64, rand, PIECE_KEYS, EP_KEYS, CASTLING_KEYS, SIDE_KEY, WHITE, BLACK, PAWN, KNIGHT, BISHOP, ROOK, QUEEN, KING, DEFAULT_POSITION, Move, EMPTY, FLAGS, SQUARES, BITS, SEVEN_TAG_ROSTER, SUPLEMENTAL_TAGS, HEADER_TEMPLATE, Ox88, PAWN_OFFSETS, PIECE_OFFSETS, ATTACKS, RAYS, PIECE_MASKS, SYMBOLS, PROMOTIONS, RANK_1, RANK_2, RANK_7, RANK_8, SIDES, ROOKS, SECOND_RANK, SAN_NULLMOVE, Chess;
var init_chess = __esm({
  "node_modules/.pnpm/chess.js@1.4.0/node_modules/chess.js/dist/esm/chess.js"() {
    peg$subclass(peg$SyntaxError, Error);
    peg$SyntaxError.prototype.format = function(sources) {
      var str = "Error: " + this.message;
      if (this.location) {
        var src = null;
        var k;
        for (k = 0; k < sources.length; k++) {
          if (sources[k].source === this.location.source) {
            src = sources[k].text.split(/\r\n|\n|\r/g);
            break;
          }
        }
        var s = this.location.start;
        var offset_s = this.location.source && typeof this.location.source.offset === "function" ? this.location.source.offset(s) : s;
        var loc = this.location.source + ":" + offset_s.line + ":" + offset_s.column;
        if (src) {
          var e = this.location.end;
          var filler = peg$padEnd("", offset_s.line.toString().length, " ");
          var line = src[s.line - 1];
          var last = s.line === e.line ? e.column : line.length + 1;
          var hatLen = last - s.column || 1;
          str += "\n --> " + loc + "\n" + filler + " |\n" + offset_s.line + " | " + line + "\n" + filler + " | " + peg$padEnd("", s.column - 1, " ") + peg$padEnd("", hatLen, "^");
        } else {
          str += "\n at " + loc;
        }
      }
      return str;
    };
    peg$SyntaxError.buildMessage = function(expected, found) {
      var DESCRIBE_EXPECTATION_FNS = {
        literal: function(expectation) {
          return '"' + literalEscape(expectation.text) + '"';
        },
        class: function(expectation) {
          var escapedParts = expectation.parts.map(function(part) {
            return Array.isArray(part) ? classEscape(part[0]) + "-" + classEscape(part[1]) : classEscape(part);
          });
          return "[" + (expectation.inverted ? "^" : "") + escapedParts.join("") + "]";
        },
        any: function() {
          return "any character";
        },
        end: function() {
          return "end of input";
        },
        other: function(expectation) {
          return expectation.description;
        }
      };
      function hex(ch) {
        return ch.charCodeAt(0).toString(16).toUpperCase();
      }
      function literalEscape(s) {
        return s.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\0/g, "\\0").replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/[\x00-\x0F]/g, function(ch) {
          return "\\x0" + hex(ch);
        }).replace(/[\x10-\x1F\x7F-\x9F]/g, function(ch) {
          return "\\x" + hex(ch);
        });
      }
      function classEscape(s) {
        return s.replace(/\\/g, "\\\\").replace(/\]/g, "\\]").replace(/\^/g, "\\^").replace(/-/g, "\\-").replace(/\0/g, "\\0").replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/[\x00-\x0F]/g, function(ch) {
          return "\\x0" + hex(ch);
        }).replace(/[\x10-\x1F\x7F-\x9F]/g, function(ch) {
          return "\\x" + hex(ch);
        });
      }
      function describeExpectation(expectation) {
        return DESCRIBE_EXPECTATION_FNS[expectation.type](expectation);
      }
      function describeExpected(expected2) {
        var descriptions = expected2.map(describeExpectation);
        var i, j;
        descriptions.sort();
        if (descriptions.length > 0) {
          for (i = 1, j = 1; i < descriptions.length; i++) {
            if (descriptions[i - 1] !== descriptions[i]) {
              descriptions[j] = descriptions[i];
              j++;
            }
          }
          descriptions.length = j;
        }
        switch (descriptions.length) {
          case 1:
            return descriptions[0];
          case 2:
            return descriptions[0] + " or " + descriptions[1];
          default:
            return descriptions.slice(0, -1).join(", ") + ", or " + descriptions[descriptions.length - 1];
        }
      }
      function describeFound(found2) {
        return found2 ? '"' + literalEscape(found2) + '"' : "end of input";
      }
      return "Expected " + describeExpected(expected) + " but " + describeFound(found) + " found.";
    };
    MASK64 = 0xffffffffffffffffn;
    rand = xoroshiro128(0xa187eb39cdcaed8f31c4b365b102e01en);
    PIECE_KEYS = Array.from({ length: 2 }, () => Array.from({ length: 6 }, () => Array.from({ length: 128 }, () => rand())));
    EP_KEYS = Array.from({ length: 8 }, () => rand());
    CASTLING_KEYS = Array.from({ length: 16 }, () => rand());
    SIDE_KEY = rand();
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
      QSIDE_CASTLE: "q",
      NULL_MOVE: "-"
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
      QSIDE_CASTLE: 64,
      NULL_MOVE: 128
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
    SAN_NULLMOVE = "--";
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
      _hash = 0n;
      // tracks number of times a position has been seen for repetition checking
      _positionCount = /* @__PURE__ */ new Map();
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
        this._hash = this._computeHash();
        this._positionCount = /* @__PURE__ */ new Map();
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
        this._hash = this._computeHash();
        this._updateSetup(fen);
        this._incPositionCount();
      }
      fen({ forceEnpassantSquare = false } = {}) {
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
          if (forceEnpassantSquare) {
            epSquare = algebraic(this._epSquare);
          } else {
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
      _pieceKey(i) {
        if (!this._board[i]) {
          return 0n;
        }
        const { color, type } = this._board[i];
        const colorIndex = {
          w: 0,
          b: 1
        }[color];
        const typeIndex = {
          p: 0,
          n: 1,
          b: 2,
          r: 3,
          q: 4,
          k: 5
        }[type];
        return PIECE_KEYS[colorIndex][typeIndex][i];
      }
      _epKey() {
        return this._epSquare === EMPTY ? 0n : EP_KEYS[this._epSquare & 7];
      }
      _castlingKey() {
        const index = this._castling.w >> 5 | this._castling.b >> 3;
        return CASTLING_KEYS[index];
      }
      _computeHash() {
        let hash2 = 0n;
        for (let i = Ox88.a8; i <= Ox88.h1; i++) {
          if (i & 136) {
            i += 7;
            continue;
          }
          if (this._board[i]) {
            hash2 ^= this._pieceKey(i);
          }
        }
        hash2 ^= this._epKey();
        hash2 ^= this._castlingKey();
        if (this._turn === "b") {
          hash2 ^= SIDE_KEY;
        }
        return hash2;
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
      _set(sq, piece) {
        this._hash ^= this._pieceKey(sq);
        this._board[sq] = piece;
        this._hash ^= this._pieceKey(sq);
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
        this._set(sq, { type, color });
        if (type === KING) {
          this._kings[color] = sq;
        }
        return true;
      }
      _clear(sq) {
        this._hash ^= this._pieceKey(sq);
        delete this._board[sq];
      }
      remove(square) {
        const piece = this.get(square);
        this._clear(Ox88[square]);
        if (piece && piece.type === KING) {
          this._kings[piece.color] = EMPTY;
        }
        this._updateCastlingRights();
        this._updateEnPassantSquare();
        this._updateSetup(this.fen());
        return piece;
      }
      _updateCastlingRights() {
        this._hash ^= this._castlingKey();
        const whiteKingInPlace = this._board[Ox88.e1]?.type === KING && this._board[Ox88.e1]?.color === WHITE;
        const blackKingInPlace = this._board[Ox88.e8]?.type === KING && this._board[Ox88.e8]?.color === BLACK;
        if (!whiteKingInPlace || this._board[Ox88.a1]?.type !== ROOK || this._board[Ox88.a1]?.color !== WHITE) {
          this._castling.w &= -65;
        }
        if (!whiteKingInPlace || this._board[Ox88.h1]?.type !== ROOK || this._board[Ox88.h1]?.color !== WHITE) {
          this._castling.w &= -33;
        }
        if (!blackKingInPlace || this._board[Ox88.a8]?.type !== ROOK || this._board[Ox88.a8]?.color !== BLACK) {
          this._castling.b &= -65;
        }
        if (!blackKingInPlace || this._board[Ox88.h8]?.type !== ROOK || this._board[Ox88.h8]?.color !== BLACK) {
          this._castling.b &= -33;
        }
        this._hash ^= this._castlingKey();
      }
      _updateEnPassantSquare() {
        if (this._epSquare === EMPTY) {
          return;
        }
        const startSquare = this._epSquare + (this._turn === WHITE ? -16 : 16);
        const currentSquare = this._epSquare + (this._turn === WHITE ? 16 : -16);
        const attackers = [currentSquare + 1, currentSquare - 1];
        if (this._board[startSquare] !== null || this._board[this._epSquare] !== null || this._board[currentSquare]?.color !== swapColor(this._turn) || this._board[currentSquare]?.type !== PAWN) {
          this._hash ^= this._epKey();
          this._epSquare = EMPTY;
          return;
        }
        const canCapture = (square) => !(square & 136) && this._board[square]?.color === this._turn && this._board[square]?.type === PAWN;
        if (!attackers.some(canCapture)) {
          this._hash ^= this._epKey();
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
      hash() {
        return this._hash.toString(16);
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
        return this._getPositionCount(this._hash) >= 3;
      }
      isDrawByFiftyMoves() {
        return this._halfMoves >= 100;
      }
      isDraw() {
        return this.isDrawByFiftyMoves() || this.isStalemate() || this.isInsufficientMaterial() || this.isThreefoldRepetition();
      }
      isGameOver() {
        return this.isCheckmate() || this.isDraw();
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
        } else if (move3 === null) {
          moveObj = this._moveFromSan(SAN_NULLMOVE, strict);
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
        if (this.isCheck() && moveObj.flags & BITS.NULL_MOVE) {
          throw new Error("Null move not allowed when in check");
        }
        const prettyMove = new Move(this, moveObj);
        this._makeMove(moveObj);
        this._incPositionCount();
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
      _movePiece(from, to) {
        this._hash ^= this._pieceKey(from);
        this._board[to] = this._board[from];
        delete this._board[from];
        this._hash ^= this._pieceKey(to);
      }
      _makeMove(move3) {
        const us = this._turn;
        const them = swapColor(us);
        this._push(move3);
        if (move3.flags & BITS.NULL_MOVE) {
          if (us === BLACK) {
            this._moveNumber++;
          }
          this._halfMoves++;
          this._turn = them;
          this._epSquare = EMPTY;
          return;
        }
        this._hash ^= this._epKey();
        this._hash ^= this._castlingKey();
        if (move3.captured) {
          this._hash ^= this._pieceKey(move3.to);
        }
        this._movePiece(move3.from, move3.to);
        if (move3.flags & BITS.EP_CAPTURE) {
          if (this._turn === BLACK) {
            this._clear(move3.to - 16);
          } else {
            this._clear(move3.to + 16);
          }
        }
        if (move3.promotion) {
          this._clear(move3.to);
          this._set(move3.to, { type: move3.promotion, color: us });
        }
        if (this._board[move3.to].type === KING) {
          this._kings[us] = move3.to;
          if (move3.flags & BITS.KSIDE_CASTLE) {
            const castlingTo = move3.to - 1;
            const castlingFrom = move3.to + 1;
            this._movePiece(castlingFrom, castlingTo);
          } else if (move3.flags & BITS.QSIDE_CASTLE) {
            const castlingTo = move3.to + 1;
            const castlingFrom = move3.to - 2;
            this._movePiece(castlingFrom, castlingTo);
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
        this._hash ^= this._castlingKey();
        if (move3.flags & BITS.BIG_PAWN) {
          let epSquare;
          if (us === BLACK) {
            epSquare = move3.to - 16;
          } else {
            epSquare = move3.to + 16;
          }
          if (!(move3.to - 1 & 136) && this._board[move3.to - 1]?.type === PAWN && this._board[move3.to - 1]?.color === them || !(move3.to + 1 & 136) && this._board[move3.to + 1]?.type === PAWN && this._board[move3.to + 1]?.color === them) {
            this._epSquare = epSquare;
            this._hash ^= this._epKey();
          } else {
            this._epSquare = EMPTY;
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
        this._hash ^= SIDE_KEY;
      }
      undo() {
        const hash2 = this._hash;
        const move3 = this._undoMove();
        if (move3) {
          const prettyMove = new Move(this, move3);
          this._decPositionCount(hash2);
          return prettyMove;
        }
        return null;
      }
      _undoMove() {
        const old = this._history.pop();
        if (old === void 0) {
          return null;
        }
        this._hash ^= this._epKey();
        this._hash ^= this._castlingKey();
        const move3 = old.move;
        this._kings = old.kings;
        this._turn = old.turn;
        this._castling = old.castling;
        this._epSquare = old.epSquare;
        this._halfMoves = old.halfMoves;
        this._moveNumber = old.moveNumber;
        this._hash ^= this._epKey();
        this._hash ^= this._castlingKey();
        this._hash ^= SIDE_KEY;
        const us = this._turn;
        const them = swapColor(us);
        if (move3.flags & BITS.NULL_MOVE) {
          return move3;
        }
        this._movePiece(move3.to, move3.from);
        if (move3.piece) {
          this._clear(move3.from);
          this._set(move3.from, { type: move3.piece, color: us });
        }
        if (move3.captured) {
          if (move3.flags & BITS.EP_CAPTURE) {
            let index;
            if (us === BLACK) {
              index = move3.to - 16;
            } else {
              index = move3.to + 16;
            }
            this._set(index, { type: PAWN, color: them });
          } else {
            this._set(move3.to, { type: move3.captured, color: them });
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
          this._movePiece(castlingFrom, castlingTo);
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
      loadPgn(pgn2, { strict = false, newlineChar = "\r?\n" } = {}) {
        if (newlineChar !== "\r?\n") {
          pgn2 = pgn2.replace(new RegExp(newlineChar, "g"), "\n");
        }
        const parsedPgn = peg$parse(pgn2);
        this.reset();
        const headers = parsedPgn.headers;
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
        let node2 = parsedPgn.root;
        while (node2) {
          if (node2.move) {
            const move3 = this._moveFromSan(node2.move, strict);
            if (move3 == null) {
              throw new Error(`Invalid move in PGN: ${node2.move}`);
            } else {
              this._makeMove(move3);
              this._incPositionCount();
            }
          }
          if (node2.comment !== void 0) {
            this._comments[this.fen()] = node2.comment;
          }
          node2 = node2.variations[0];
        }
        const result = parsedPgn.result;
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
        } else if (move3.flags & BITS.NULL_MOVE) {
          return SAN_NULLMOVE;
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
        let cleanMove = strippedSan(move3);
        if (!strict) {
          if (cleanMove === "0-0") {
            cleanMove = "O-O";
          } else if (cleanMove === "0-0-0") {
            cleanMove = "O-O-O";
          }
        }
        if (cleanMove == SAN_NULLMOVE) {
          const res = {
            color: this._turn,
            from: 0,
            to: 0,
            piece: "k",
            flags: BITS.NULL_MOVE
          };
          return res;
        }
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
      setTurn(color) {
        if (this._turn == color) {
          return false;
        }
        this.move("--");
        return true;
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
       * checking. Old positions are removed from the map if their counts are reduced to 0.
       */
      _getPositionCount(hash2) {
        return this._positionCount.get(hash2) ?? 0;
      }
      _incPositionCount() {
        this._positionCount.set(this._hash, (this._positionCount.get(this._hash) ?? 0) + 1);
      }
      _decPositionCount(hash2) {
        const currentCount = this._positionCount.get(hash2) ?? 0;
        if (currentCount === 1) {
          this._positionCount.delete(hash2);
        } else {
          this._positionCount.set(hash2, currentCount - 1);
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
    createEl = (tagName2, className) => {
      const el = document.createElement(tagName2);
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
    const rank2 = state.movable.color === "white" ? "1" : "8", kingStartPos = "e" + rank2, dests = state.movable.dests.get(kingStartPos), king2 = state.pieces.get(kingStartPos);
    if (!dests || !king2 || king2.role !== "king")
      return;
    state.movable.dests.set(kingStartPos, dests.filter((d) => !(d === "a" + rank2 && dests.includes("c" + rank2)) && !(d === "h" + rank2 && dests.includes("g" + rank2))));
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
  const defs = createElement2("defs");
  const filter = setAttributes(createElement2("filter"), { id: "cg-filter-blur" });
  filter.appendChild(setAttributes(createElement2("feGaussianBlur"), { stdDeviation: "0.019" }));
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
  let h2 = 0;
  for (let i = 0; i < s.length; i++) {
    h2 = (h2 << 5) - h2 + s.charCodeAt(i) >>> 0;
  }
  return h2.toString();
}
function renderShape(state, { shape, current, hash: hash2 }, brushes2, dests, bounds) {
  var _a, _b;
  const from = pos2user(orient(key2pos(shape.orig), state.orientation), bounds), to = shape.dest ? pos2user(orient(key2pos(shape.dest), state.orientation), bounds) : from, brush = shape.brush && makeCustomBrush(brushes2[shape.brush], shape.modifiers), slots = dests.get(shape.dest), svgs = [];
  if (brush) {
    const el = setAttributes(createElement2("g"), { cgHash: hash2 });
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
    const el = setAttributes(createElement2("g"), { transform: `translate(${x},${y})`, cgHash: hash2 });
    el.innerHTML = `<svg width="1" height="1" viewBox="0 0 100 100">${shape.customSvg.html}</svg>`;
    svgs.push({ el, isCustom: true });
  }
  return svgs;
}
function renderCircle(brush, at, current, bounds) {
  const widths = circleWidth(), radius = (bounds.width + bounds.height) / (4 * Math.max(bounds.width, bounds.height));
  return setAttributes(createElement2("circle"), {
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
    return setAttributes(createElement2("line"), {
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
  const g = createElement2("g");
  const blurred = setAttributes(createElement2("g"), { filter: "url(#cg-filter-blur)" });
  blurred.appendChild(filterBox(from, to));
  blurred.appendChild(renderLine(true));
  g.appendChild(blurred);
  g.appendChild(renderLine(false));
  return g;
}
function renderMarker(brush) {
  const marker = setAttributes(createElement2("marker"), {
    id: "arrowhead-" + brush.key,
    orient: "auto",
    overflow: "visible",
    markerWidth: 4,
    markerHeight: 4,
    refX: brush.key.startsWith("hilite") ? 1.86 : 2.05,
    refY: 2
  });
  marker.appendChild(setAttributes(createElement2("path"), {
    d: "M0,0 V4 L3,2 Z",
    fill: brush.color
  }));
  marker.setAttribute("cgKey", brush.key);
  return marker;
}
function renderLabel(label, hash2, from, to, slots, corner) {
  var _a;
  const labelSize = 0.4, fontSize = labelSize * 0.75 ** label.text.length, at = labelCoords(from, to, slots), cornerOff = corner === "tr" ? 0.4 : 0, g = setAttributes(createElement2("g"), {
    transform: `translate(${at[0] + cornerOff},${at[1] - cornerOff})`,
    cgHash: hash2
  });
  g.appendChild(setAttributes(createElement2("circle"), {
    r: labelSize / 2,
    "fill-opacity": corner ? 1 : 0.8,
    "stroke-opacity": corner ? 1 : 0.7,
    "stroke-width": 0.03,
    fill: (_a = label.fill) !== null && _a !== void 0 ? _a : "#666",
    stroke: "white"
  }));
  const labelEl = setAttributes(createElement2("text"), {
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
function createElement2(tagName2) {
  return document.createElementNS("http://www.w3.org/2000/svg", tagName2);
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
  return setAttributes(createElement2("rect"), {
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
    svg = setAttributes(createElement2("svg"), {
      class: "cg-shapes",
      viewBox: "-4 -4 8 8",
      preserveAspectRatio: "xMidYMid slice"
    });
    svg.appendChild(createDefs());
    svg.appendChild(createElement2("g"));
    customSvg = setAttributes(createElement2("svg"), {
      class: "cg-custom-svgs",
      viewBox: "-3.5 -3.5 8 8",
      preserveAspectRatio: "xMidYMid slice"
    });
    customSvg.appendChild(createElement2("g"));
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
  for (const node2 of nodes)
    s.dom.elements.board.removeChild(node2);
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
function addSquare(squares, key, klass2) {
  const classes = squares.get(key);
  if (classes)
    squares.set(key, `${classes} ${klass2}`);
  else
    squares.set(key, klass2);
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
var init_chessUtils = __esm({
  "chessUtils.ts"() {
    "use strict";
    init_chess();
  }
});

// minipuzzle.ts
var Puzzle;
var init_minipuzzle = __esm({
  "minipuzzle.ts"() {
    "use strict";
    init_chess();
    init_chessground();
    init_chessUtils();
    init_snabbdom();
    Puzzle = class {
      constructor(data) {
        this.data = data;
        this.chess = new Chess(data.fen);
        this.chess.move(this.getFirstMove());
        this.config = this.createConfig();
      }
      createConfig() {
        return {
          orientation: getTurnColor(this.chess.turn(), false),
          turnColor: getTurnColor(this.chess.turn(), false),
          fen: this.chess.fen(),
          movable: {
            color: getTurnColor(this.chess.turn(), false),
            free: false,
            dests: computeDests(this.chess),
            events: {
              after: (orig, dest) => this.handleMove(orig, dest)
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
      render() {
        return h("section.blue.merida", [
          h("div.cg-board-wrap", {
            hook: {
              insert: (vnode2) => {
                const el = vnode2.elm;
                this.initBoard(el);
              }
            }
          }),
          h("p", [
            h("a", { props: { href: this.url(), target: "_blank" } }, `Rating: ${this.data.rating}`)
          ])
        ]);
      }
      initBoard(el) {
        const cg = Chessground(el, this.config);
        this.drawInitialArrow(cg);
      }
      drawInitialArrow(cg) {
        const move3 = this.getFirstMove();
        const shape = this.arrow(move3, "red");
        if (cg) {
          cg.set({ drawable: { shapes: [shape] } });
        } else {
          this.config.drawable.shapes = [shape];
        }
      }
      handleMove(orig, dest) {
        const solutions = this.getSolutions;
      }
      /*
        private handleMove(orig: string, dest: string) {
          this.chess.move({ from: orig, to: dest });
      
          const shapes = [
            this.arrow({ from: orig, to: dest }, "yellow"),
            this.arrow(this.getFirstMove(), "red"),
            this.arrow(this.getSecondMove(), "green")
          ];
      
          const updatedConfig = {
            turnColor: getTurnColor(this.chess.turn(),false),
            movable: {
              color: getTurnColor(this.chess.turn(),false),
              dests: computeDests(this.chess)
            },
            drawable: { shapes }
          };
      
          // Update all fields
          this.config.turnColor = updatedConfig.turnColor;
          this.config.movable = updatedConfig.movable;
          this.config.drawable.shapes = updatedConfig.drawable.shapes;
        }*/
      getFirstMove() {
        const uci = this.data.line.split(" ")[0];
        const from = uci.slice(0, 2);
        const to = uci.slice(2, 4);
        return { from, to };
      }
      getSolutions() {
        const uciList = this.data.line.split(" ").slice(1).map((u) => {
          return {
            "from": u.slice(0, 2),
            "to": u.slice(2)
          };
        });
        return uciList;
      }
      arrow(move3, brush) {
        return { orig: move3.from, dest: move3.to, brush };
      }
      url() {
        const color = getTurnColor(this.chess.turn(), true);
        const ply = this.data.line.split(" ").length;
        return `https://lichess.org/training/${this.data.id}`;
      }
    };
  }
});

// boardList.ts
var import_class, import_attributes, import_props, import_eventlisteners, Boards;
var init_boardList = __esm({
  "boardList.ts"() {
    "use strict";
    init_snabbdom();
    import_class = __toESM(require_class());
    import_attributes = __toESM(require_attributes());
    import_props = __toESM(require_props());
    import_eventlisteners = __toESM(require_eventlisteners());
    init_minipuzzle();
    Boards = class {
      constructor(element, logElement) {
        this.patch = init([import_class.default, import_props.default, import_attributes.default, import_eventlisteners.default]);
        this.puzzles = [];
        this.element = element;
        this.logElement = logElement;
      }
      setPuzzles(raw) {
        this.puzzles = raw.map((p) => p);
        console.log(this.puzzles);
      }
      redraw(puzzles = this.puzzles) {
        puzzles = puzzles.map((p) => new Puzzle(p));
        this.vnode = this.patch(this.vnode || this.element, this.render(puzzles));
      }
      render(puzzles) {
        console.log(1);
        return h("div#chessground-examples", puzzles.map((p) => p.render()));
      }
      status(msg) {
        console.log(4);
        this.logElement.innerHTML = msg;
      }
    };
  }
});

// view.ts
var require_view = __commonJS({
  "view.ts"() {
    init_boardList();
    document.addEventListener("DOMContentLoaded", () => {
      const container = document.getElementById("chessground-examples");
      const log = document.getElementById("log");
      console.log("container: " + container);
      const boards = new Boards(container, log);
      console.log("boards: " + boards);
      (async () => {
        const response = await fetch("https://lichess.org/api/storm");
        const data = await response.json();
        boards.setPuzzles(data.puzzles);
      })();
      document.getElementById("search")?.addEventListener("click", () => {
        console.log(boards);
        boards.redraw();
      });
    });
  }
});
export default require_view();
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
