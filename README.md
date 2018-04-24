# react-message-listener

A higher order component for composing post-message listeners.

## installation

`npm i @highpoint/react-message-listener`

## usage

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

Refer to [experiment]() for a full example of this component working.
You can run it with `npm run experiment`.
