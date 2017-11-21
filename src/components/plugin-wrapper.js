import React from 'react';
import _ from 'underscore';

function setPagination(grid, pageNumber, pageSize) {
  const skip = pageSize * pageNumber;
  const take = pageSize;
  grid.set({
    query: _.defaults({ skip, take }, grid.get('query')),
  });
}

export default function hocPlugin(plugin, grid, onGridChanged) {
  const dispatchAction = (action, args) => {
    // process event support in grid view
    switch (action) {
      case 'set:columns':
        grid.set({ columns: args.columns });
        break;
      case 'set:pagination':
        setPagination(grid, args.pageNumber, args.pageSize);
        break;
      default:
        return;
    }

    onGridChanged(action, args);
  };
  return React.cloneElement(plugin, {
    dispatchAction,
  });
}
