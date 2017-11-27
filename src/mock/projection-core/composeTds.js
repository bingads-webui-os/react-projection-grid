export function composeTds(col, record, model) {
  return [{
    attributes: {},
    key: col.name,
    content: model.composeContent(col, record, model),
  }];
}
