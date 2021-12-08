/* eslint-disable react/no-unused-class-component-methods */
import { Component } from 'react';
import _ from 'lodash';

export default class CComponent extends Component {
  updateState(key, valueOrFn, fn) {
    if (_.isObject(key))
      this.setState((state) => ({ ...state, ...key }), valueOrFn);
    else this.setState((state) => ({ ...state, [key]: valueOrFn }), fn);
  }

  updateStateSync(key, valueOrFn, fn) {
    return new Promise((resolve) => {
      if (_.isObject(key))
        this.setState(
          (state) => ({ ...state, ...key }),
          () => {
            resolve();
            if (_.isFunction(valueOrFn)) valueOrFn();
          }
        );
      else
        this.setState(
          (state) => ({ ...state, [key]: valueOrFn }),
          () => {
            resolve();
            if (_.isFunction(fn)) fn();
          }
        );
    });
  }
}
