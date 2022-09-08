# Alpine.js Super Teleport

A supercharged version of `x-teleport` for Alpine.js

The built-in [`x-teleport`](https://alpinejs.dev/directives/teleport) directive allows you to transport part of your Alpine template to another part of the DOM on the page entirely.

This plugin takes it into another level. You could not only append to an element, but also prepend, put it before or after, or even replace the element.

## Example

```html
<body>
    <div x-data="{ count: 1 }" id="a">
        <button @click="count++">Inc</button>
        <template x-super-teleport="#b">
            <p><span>Append (default): </span><span x-text="count"></span></p>
        </template>
        <template x-super-teleport.prepend="#b">
            <p><span>Prepend: </span><span x-text="count"></span></p>
        </template>
        <template x-super-teleport.before="#b">
            <p><span>Before: </span><span x-text="count + 1"></span></p>
        </template>
        <template x-super-teleport.after="#b">
            <p><span>After: </span><span x-text="count + 2"></span></p>
        </template>
        <template x-super-teleport.replace="#c">
            <p><span>Replace: </span><span x-text="count + 3"></span></p>
        </template>
    </div>
    <div id="b">
        <p>Original DIV content</p>
    </div>
    <div id="c">This DIV will be gone</div>
</body>
```

## Installation

### CDN

```html
<script defer src="//unpkg.com/@motekar/alpinejs-super-teleport"></script>

<script defer src="//unpkg.com/alpinejs@3"></script>
```

### NPM/Yarn

```shell
npm i -D @motekar/alpinejs-super-teleport

yarn add -D @motekar/alpinejs-super-teleport
```

Then you can register the plugin.

```js
import Alpine from 'alpinejs'
import superTeleport from '@motekar/alpinejs-super-teleport'

Alpine.plugin(superTeleport)

window.Alpine = Alpine

Alpine.start()
```
