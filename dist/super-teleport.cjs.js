var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// builds/module.js
var module_exports = {};
__export(module_exports, {
  default: () => module_default
});
module.exports = __toCommonJS(module_exports);

// src/index.js
function src_default(Alpine) {
  Alpine.directive("super-teleport", teleport);
  function teleport(el, { modifiers, expression }, { cleanup }) {
    if (el.tagName.toLowerCase() !== "template")
      Alpine.warn("x-super-teleport can only be used on a <template> tag", el);
    let target = document.querySelector(expression);
    if (!target)
      Alpine.warn(`Cannot find x-super-teleport element for selector: "${expression}"`);
    let clone = el.content.cloneNode(true).firstElementChild;
    el._x_teleport = clone;
    clone._x_teleportBack = el;
    if (el._x_forwardEvents) {
      el._x_forwardEvents.forEach((eventName) => {
        clone.addEventListener(eventName, (e) => {
          e.stopPropagation();
          el.dispatchEvent(new e.constructor(e.type, e));
        });
      });
    }
    Alpine.addScopeToNode(clone, {}, el);
    Alpine.mutateDom(() => {
      if (modifiers.includes("before")) {
        target.parentNode.insertBefore(clone, target);
      } else if (modifiers.includes("after")) {
        target.parentNode.insertBefore(clone, target.nextSibling);
      } else if (modifiers.includes("prepend")) {
        target.insertBefore(clone, target.firstChild);
      } else if (modifiers.includes("replace")) {
        target.parentNode.insertBefore(clone, target);
        target.parentNode.removeChild(target);
      } else {
        target.appendChild(clone);
      }
      Alpine.initTree(clone);
      clone._x_ignore = true;
    });
    cleanup(() => clone.remove());
  }
}

// builds/module.js
var module_default = src_default;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
