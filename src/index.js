import { Component, createElement } from 'react';

const on = (eventName, cb) => {
  const handler = ({ data }) => {
    if (data === eventName) return cb();
    if (typeof data === 'object' && data.type === eventName) {
      delete data.type;
      return cb(data);
    }
  };
  window.addEventListener('message', handler, false);
  return () => {
    window.removeEventListener('message', handler);
  };
};

const withMessageListener = (
  event,
  handler,
  { timeout, once = false } = {}
) => ComposedComponent =>
  class extends Component {
    setup() {
      if (event === undefined)
        throw new Error('event is needed for withMessageListener HOC');
      if (handler === undefined)
        throw new Error('handler is needed for withMessageListener HOC');
      this.dispose = on(event, (data = {}) => {
        handler({ ...this.props, ...data });
        if (once) {
          this.dispose();
        }
      });
      if (timeout) {
        const timer = setTimeout(() => {
          clearTimeout(timer);
          this.dispose();
        }, timeout);
      }
    }

    componentDidMount() {
      this.setup();
    }

    componentWillUnmount() {
      this.dispose();
    }

    render() {
      return createElement(ComposedComponent, this.props);
    }
  };

export default withMessageListener;
