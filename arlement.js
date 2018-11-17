export default class extends Function {
  constructor (extensions) {
    class Arlement extends Array {
      constructor (selector, context) {
        context = (Array.isArray(context) && context.length) ? context[0]
          : (context instanceof Element) ? context
            : document

        const elements = (typeof selector === 'string') ? context.querySelectorAll(selector)
          : (selector instanceof NodeList || Array.isArray(selector)) ? selector
            : (selector instanceof Element) ? [selector]
              : []

        super(...Array.from(elements))

        for (const fn in extensions) {
          if (!this[fn]) {
            Object.defineProperty(this, fn, { value: extensions[fn] })
          } else {
            console.warn(`"${fn}" already exists in Arlement.`)
          }
        }
      }
    }

    return (selector, context) => new Arlement(selector, context)
  }
}
