export default function (Alpine) {
    Alpine.directive('super-teleport', teleport)

    function teleport(el, { modifiers, expression }, { cleanup }) {
        if (el.tagName.toLowerCase() !== 'template')
            Alpine.warn('x-super-teleport can only be used on a <template> tag', el)

        let target = document.querySelector(expression)

        if (!target)
            Alpine.warn(`Cannot find x-super-teleport element for selector: "${expression}"`)

        let clone = el.content.cloneNode(true).firstElementChild

        // Add reference to element on <template x-super-teleport, and visa versa.
        el._x_teleport = clone
        clone._x_teleportBack = el

        // Forward event listeners:
        if (el._x_forwardEvents) {
            el._x_forwardEvents.forEach((eventName) => {
                clone.addEventListener(eventName, (e) => {
                    e.stopPropagation()

                    el.dispatchEvent(new e.constructor(e.type, e))
                })
            })
        }

        Alpine.addScopeToNode(clone, {}, el)

        Alpine.mutateDom(() => {
            if (modifiers.includes('before')) {
                target.parentNode.insertBefore(clone, target)
            } else if (modifiers.includes('after')) {
                target.parentNode.insertBefore(clone, target.nextSibling)
            } else if (modifiers.includes('prepend')) {
                target.insertBefore(clone, target.firstChild)
            } else if (modifiers.includes('replace')) {
                target.parentNode.insertBefore(clone, target)
                target.parentNode.removeChild(target)
            } else {
                target.appendChild(clone)
            }

            Alpine.initTree(clone)

            clone._x_ignore = true
        })

        cleanup(() => clone.remove())
    }
}
