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
      }

      concat () {
        return new Arlement(super.concat(...arguments))
      }

      filter () {
        return new Arlement(super.filter(...arguments))
      }

      map () {
        return new Arlement(super.map(...arguments))
      }

      slice () {
        return new Arlement(super.slice(...arguments))
      }
    }

    for (const fn in extensions) {
      if (!Arlement.prototype[fn]) {
        Object.defineProperty(Arlement.prototype, fn, { value: extensions[fn] })
      } else {
        console.warn(`"${fn}" already exists in Arlement.`)
      }
    }

    return (selector, context) => new Arlement(selector, context)
  }
}
