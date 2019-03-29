/* eslint no-bitwise: 0 */
import { createElement as t } from 'react';
import { render } from 'react-dom';
import { compose, withState } from 'recompose';
import withMessageListener from '../dist';

const generateRandomColor = () =>
  '#000000'.replace(/0/g, () => (~~(Math.random() * 16)).toString(16));

const enhance = compose(
  withState('background', 'setBackground', '#fff'),
  withState('isVisible', 'setVisibility', false),
  withMessageListener('set-color', ({ background, setBackground }) =>
    setBackground(background)
  ),
  withMessageListener('toggle-visibility', ({ isVisible, setVisibility }) =>
    setVisibility(!isVisible)
  )
);

const el = enhance(({ background, isVisible }) => {
  const display = isVisible ? 'block' : 'none';
  return t(
    'div',
    { style: { background } },
    t(
      'button',
      {
        type: 'button',
        onClick: () => window.postMessage('toggle-visibility', '*')
      },
      'Toggle'
    ),
    t(
      'button',
      {
        type: 'button',
        onClick: () =>
          window.postMessage(
            { type: 'set-color', background: generateRandomColor() },
            '*'
          )
      },
      'Set Color'
    ),
    t('div', { style: { display } }, 'Hello World')
  );
});

render(t(el), document.getElementById('app'));
