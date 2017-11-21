import React from 'react';
import _ from 'underscore';

<<<<<<< HEAD
function setPagination(grid, pageNumber, pageSize) {
  const skip = pageSize * pageNumber;
  const take = pageSize;
  grid.set({
    query: _.defaults({ skip, take }, grid.get('query')),
  });
}

export default function hocPlugin(plugin, grid, onGridChanged) {
  const dispatchAction = (action, args) => {
=======
export default function hocPlugin(plugin, grid) {
  const dispatchAction = (action, args, callback) => {
>>>>>>> refact plugin
    // process event support in grid view
    switch (action) {
      case 'set:columns':
        grid.set({ columns: args.columns });
        break;
<<<<<<< HEAD
      case 'set:pagination':
        setPagination(grid, args.pageNumber, args.pageSize);
        break;
      default:
        return;
    }

    onGridChanged(action, args);
=======
      default:
        break;
    }
    if (_.isFunction(callback)) {
      callback(args);
    }
>>>>>>> refact plugin
  };
  return React.cloneElement(plugin, {
    dispatchAction,
  });
}
