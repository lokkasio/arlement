# Arlement

> Extendable DOM selector engine

Arlement takes a CSS Selector string and gives you an array of HTML elements. That's it.

## Install

To install Arlement you will need [Node.js](https://nodejs.org/):

```
npm install arlement --save
```

## Usage

```JavaScript
import Arlement from 'arlement'

const $ = new Arlement()

// adds a class to all li-elements
$('li').forEach(element => element.classList.add('list-item'))
```

You can also pass in a HTMLElement, a NodeList or a present Arlement:

```JavaScript
const list = document.querySelector('ul#list')

// adds a class to the selected element
$(list).forEach(element => element.classList.add('list'))

// note: Arlement is always an array (even it contains just one element). The following doesn't work!
$(list).classList.add('list') // error!
```

```JavaScript
const listItems = document.querySelectorAll('li')

// adds a class to all li-elements
$(listItems).forEach(element => element.classList.add('list-item'))
```

```JavaScript
const $heading = $('.heading')
const $listItems = $('li')
const $headingAndListItems = $heading.concat($listItems)

// adds a class to all h1- and li-elements
$(headingAndListItems).forEach(element => element.classList.add('heading-or-list-item'))
```

Arlement is a real Array, so you can use all [buildin Array methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) to work with or manipulate the elements machted by the selector.

```JavaScript
// all hidden li-elements
const $hiddenListItems = $('li').filter(element => element.hasAttribute('hidden'))
```

### context

Of course you can definde a context where to search for elements:

```HTML
<!-- index.html -->
…
<h1 class="heading">Outer Heading</h1>
<div class="inner">
  <h2 class="heading">Inner Headeing</h2>
</div>
…
```

```JavaScript
const $inner = $('.inner')

// selects the h2 only
const innerHeading = $('.heading', $inner)
```

### In your project

To not call `const $ = new Arlement()` in every file, you can instantiate Arlement once and import it in every file you need it:
```JavaScript
// globals.js

import Arlement from 'arlement'
export default new Arlement()
```

```JavaScript
// list.js

import $ from './globals.js'

$('li').forEach(element => element.classList.add('list-item'))
```

## Extensions

If you're seeing youreself often to add classes to elements, you can add a helper function to Arlement

```JavaScript
// globals.js

import Arlement from 'arlement'
export default new Arlement({
  addClass: className => {
    this.forEach(element => element.classList.add(className))
    return this // returning `this` makes your Arlement chainable!
  }
})
```

```JavaScript
// list.js

import $ from './globals.js'

$('li').addClass('list-item')
```

```JavaScript
// heading.js

import $ from './globals.js'

$('h1').addClass('heading')
```
