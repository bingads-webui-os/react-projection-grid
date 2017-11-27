export function composeTable(model) {
  return {
    attributes: {},
    caption: model.composeCaption(model),
    colgroups: model.composeColgroups(model),
    thead: model.composeThead(model),
    tbodies: model.composeTbodies(model),
    tfoot: model.composeTfoot(model),
  };
}
