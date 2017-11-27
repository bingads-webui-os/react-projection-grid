import _ from 'underscore';

export function composeTrs(record, model) {
  return [{
    attributes: {},
    key: model.primaryKey(record),
    tds: _.chain(model.columns)
      .map(col => model.composeTds(col, record, model))
      .flatten()
      .compact()
      .value(),
  }];
}
