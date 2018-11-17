import Arlement from './arlement'

let $ = new Arlement()

function fixture (content) {
  document.getElementById('qunit-fixture').innerHTML = content
}

QUnit.test('instantiation', t => {
  t.equal(typeof new Arlement(), 'function', 'arlement instance is a function')
})

QUnit.module('arlement creation', () => {
  QUnit.test('result is an array', t => {
    t.ok(Array.isArray($()), 'array')
  })

  QUnit.module('selector argument', {
    beforeEach: () => fixture`
        <ul>
          <li>one</li>
          <li>two</li>
          <li>three</li>
        </ul>
      `
  }, () => {
    QUnit.test('selector is empty or unsupported', t => {
      [undefined, null, true, 42, {}, () => {}].forEach(selector => {
        t.equal($(selector).length, 0, 'result is empty')
      })
    })

    QUnit.test('selector is a CSS selector string', t => {
      t.expect(3)
      $('li').forEach(element => t.ok(element instanceof Element))
    })

    QUnit.test('selector is a NodeList', t => {
      t.expect(3)
      const nodeList = document.querySelectorAll('li')
      $(nodeList).forEach(item => t.ok(item instanceof Element))
    })

    QUnit.test('selector is a HTMLElement', t => {
      t.expect(1)
      const element = document.querySelector('ul')
      $(element).forEach(item => t.ok(item instanceof Element))
    })

    QUnit.test('selector is an Array of HTMLElements', t => {
      t.expect(3)
      const elementArray = Array.from(document.querySelectorAll('li'))
      $(elementArray).forEach(item => t.ok(item instanceof Element))
    })
  })

  QUnit.module('context argument', {
    beforeEach: () => fixture`
      <h1 class="header">Outer Header</h1>
      <div class="inner first">
        <h2 class="header">Inner Header 1</h2>
      </div>
      <div class="inner second">
        <h2 class="header">Inner Header 2</h2>
      </div>
    `
  }, () => {
    QUnit.test('context is empty or unsupported', t => {
      [undefined, null, 'string', true, 42, {}, () => {}].forEach(context => {
        t.equal($('.header', context).length, 3, 'context is document')
      })
    })

    QUnit.test('context is an Array', t => {
      const context = Array.from(document.querySelectorAll('.inner'))
      t.equal($('.header', context).length, 1, 'context is not document')
      t.equal($('.header', context)[0].textContent, 'Inner Header 1', 'context is first array item')
    })

    QUnit.test('context is an Element', t => {
      const context = document.querySelector('.second')
      t.equal($('.header', context).length, 1, 'context is not document')
      t.equal($('.header', context)[0].textContent, 'Inner Header 2', 'context is given element')
    })
  })
})

QUnit.module('extendibility', () => {
  QUnit.test('extensions are attached to arlement', t => {
    $ = new Arlement({
      foo: () => {},
      bar: () => {}
    })

    t.equal(typeof $().foo, 'function')
    t.equal(typeof $().bar, 'function')
  })

  QUnit.test('existing array methods cannot be overwritten', t => {
    fixture`
      <div id="container"></div>
    `
    $ = new Arlement({
      indexOf: () => 'foo'
    })

    t.notEqual($().indexOf(), 'foo')
    t.equal($().indexOf(42), -1)
  })
})
