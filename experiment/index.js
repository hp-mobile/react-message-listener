import { createElement as t, Fragment } from 'react';
import { render } from 'react-dom';
import { compose, withState } from 'recompose';
import withMessageListener from '../dist';

const enhance = compose(
  withState('isVisible', 'setVisibility', false),
  withMessageListener('toggle', ({ isVisible, setVisibility }) =>
    setVisibility(!isVisible)
  )
);

const el = enhance(({ isVisible }) => {
  const display = isVisible ? 'block' : 'none';
  return t(
    Fragment,
    null,
    t(
      'button',
      {
        type: 'button',
        onClick: () => window.postMessage('toggle', '*')
      },
      'Toggle'
    ),
    t('div', { style: { display } }, 'Hello World')
  );
});

render(t(el), document.getElementById('app'));
