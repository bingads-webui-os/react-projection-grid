export function composeThs(col, model) {
  return [{
    attributes: {},
    key: col.name,
    content: model.composeContent(col),
  }];
}
