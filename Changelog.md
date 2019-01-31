<!-- 9.0.0-beta1 -->

👋 **[Support Styleguidist](https://opencollective.com/styleguidist) on Open Collective** 👋

## New features and breaking changes

### Do not put components into global namespace

Finally we’ve fixed one of the oldest and weirdest issues. Style guide components are no longer accessible on `window`. Only the current component is accessible in the example context (not on `window`). You need to explicitly import any other component.

Current component (like `Button` in this example) is always accessible by its name in the example code. If you want to use other components, you need to explicitly import them:

```jsx
import Placeholder from '../Placeholder'
;<Button>
  <Placeholder />
</Button>
```

Or you can explicitly import everything, to make examples easier to copy into your app code:

```jsx
import React from 'react'
import Button from 'rsg-example/components/Button'
import Placeholder from 'rsg-example/components/Placeholder'
;<Button>
  <Placeholder />
</Button>
```

`require()` statements are still supported.

([#1116](https://github.com/styleguidist/react-styleguidist/issues/1116)), [#1075](https://github.com/styleguidist/react-styleguidist/issues/1075), [#325](https://github.com/styleguidist/react-styleguidist/issues/325) by @sapegin)

### Import statements in the editor

You can also define aliases to make your imports more realistic:

````jsx static
// ```jsx inside Markdown
import React from 'react'
import Button from 'rsg-example/components/Button'
import Placeholder from 'rsg-example/components/Placeholder'
````

In this example `rsg-example` is an alias defined with the [moduleAliases](https://github.com/styleguidist/react-styleguidist/blob/63d72efa49198477442cff80482f306bd6714971/docs/Configuration.md#modulealiases) config option.

([#1142](https://github.com/styleguidist/react-styleguidist/issues/1142), [#1076](https://github.com/styleguidist/react-styleguidist/issues/1076), [#1109](https://github.com/styleguidist/react-styleguidist/issues/1109), [#1074](https://github.com/styleguidist/react-styleguidist/issues/1074) by @sapegin)

### New editor and syntax highlighting

We’ve replaced [CodeMirror](https://codemirror.net/) with [react-simple-code-editor](https://github.com/satya164/react-simple-code-editor) and now using [Prism](https://prismjs.com/) for code highlighting in static examples (instead of Highlight.js) and inside the editor. So code look the same everywhere in Styleguidist. We’ve also removed code splitting because react-simple-code-editor is so small and we can include it in the main bundle (8 KB vs 57 KB).

_There are some breaking changes in the config:_

- `editorConfig` and `highlightTheme` (already deprecated) options were removed.
- No highlighting in fenced code blocks without specified language.
- No highlighting in non-fenced code blocks.

([#1054](https://github.com/styleguidist/react-styleguidist/issues/1054) [#987](https://github.com/styleguidist/react-styleguidist/issues/987) by @sapegin)

### Drop React 15 support

React 16.3 is the minimum supported version.

## Bug fixes

- Add generated IDs to Markdown headings ([#833](https://github.com/styleguidist/react-styleguidist/issues/833), [#1163](https://github.com/styleguidist/react-styleguidist/issues/1163) by @wkillerud)
- Add pointer cursor on <summary> element
- Add custom focus outline for <summary> element
- Add focus outline for the editor
- Better focus styles for inputs
- Tweak colors to make them more accessible
- Wrap long lines in pre tags

## Migrating from 8.x to 9.x

1. Explicitly import all but the current component in your examples:

````js
// ```jsx inside ButtonGroup.md - 8.x
// All style guide component are accessible globally
;<ButtonGroup>
  <Button>Eins</Button>
  <Button>Zwei</Button>
  <Button>Polizei</Button>
</ButtonGroup>

// ```jsx inside ButtonGroup.md - 8.x
// Only the current (ButtonGroup) component is accessible
import Button from './Button'
;<ButtonGroup>
  <Button>Eins</Button>
  <Button>Zwei</Button>
  <Button>Polizei</Button>
</ButtonGroup>
````

2. Replace `highlightTheme` or `editorConfig.theme` options with `theme` option:

We don’t have predefined themes anymore, you can customize colors as you wish using the [theme](https://react-styleguidist.js.org/docs/configuration.html#theme) config option:

```javascript
// styleguide.config.js
module.exports = {
  theme: {
    color: {
      codeComment: '#6d6d6d',
      codePunctuation: '#999',
      codeProperty: '#905',
      codeDeleted: '#905',
      codeString: '#690',
      codeInserted: '#690',
      codeOperator: '#9a6e3a',
      codeKeyword: '#1673b1',
      codeFunction: '#DD4A68',
      codeVariable: '#e90'
    }
  }
}
```
