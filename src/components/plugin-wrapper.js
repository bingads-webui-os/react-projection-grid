import React from 'react';
import _ from 'underscore';

export default function hocPlugin(plugin, grid) {
  const dispatchAction = (action, args, callback) => {
    // process event support in grid view
    switch (action) {
      case 'set:columns':
        grid.set({ columns: args.columns });
        break;
      default:
        break;
    }
    if (_.isFunction(callback)) {
      callback(args);
    }
  };
  return React.cloneElement(plugin, {
    dispatchAction,
  });
}
