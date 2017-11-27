import _ from 'underscore';

export function composeTbodies(model) {
  return [{
    attributes: {},
    key: 'default-tbody',
    trs: _.chain(model.records)
      .map(record => model.composeTrs(record, model))
      .flatten()
      .compact()
      .value(),
  }];
}
