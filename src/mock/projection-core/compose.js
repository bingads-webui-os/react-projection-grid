export function compose(model) {
  return {
    table: model.composeTable(model),
  };
}
