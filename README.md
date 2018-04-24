# react-message-listener

A higher order component for composing `postMessage` listeners.

## Installation

`npm i @highpoint/react-message-listener`

## Usage

`postMessage` events may pass either a string or an object. If an object is passed,
it must have a `type` property set, and that is what is used to determine if the
listener fires.

For example, `postMessage` can send a simple string like `window.postMessage('toggle', '*')`
or an object like `window.postMessage({ type: 'toggle', active: true }, '*')`.

## Example

```js
import { createElement } from 'react';
import withMessageListener from '@highpoint/react-message-listener';
import { render } from 'react-dom';
import { compose, withState } from 'recompose';

const enhance = compose(
  withState('isVisible', 'setVisibility', false),
  withMessageListener('toggle', ({ isVisible, setVisibility }) =>
    setVisibility(!isVisible)
  )
);

const el = enhance(({ isVisible }) => {
  const display = isVisible ? 'block' : 'none';
  return createElement('div', { style: { display } }, 'Hello World');
});

render(createElement(el), document.getElementById('app'));
```

Refer to `experiment` for a full example of this component working.
You can run it with `npm run experiment`.
