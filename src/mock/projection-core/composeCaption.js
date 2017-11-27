export function composeCaption(model) {
  return {
    attributes: {},
    content: model.composeContent(),
  };
}
