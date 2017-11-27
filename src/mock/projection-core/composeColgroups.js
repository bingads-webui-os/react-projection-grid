import _ from 'underscore';

export function composeColgroups(model) {
  return [{
    attributes: {},
    key: 'default-colgroup',
    cols: _.chain(model.columns)
      .map(col => model.composeCols(col, model))
      .flatten()
      .compact()
      .value(),
  }];
}
