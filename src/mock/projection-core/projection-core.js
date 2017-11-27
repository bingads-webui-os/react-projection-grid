import _ from 'underscore';

export class ProjectionCore {
  constructor(projections) {
    this.projections = _.compact(projections);
  }

  compose(config) {
    const model = _.reduce(this.projections,
      (memo, projection) => projection.process(memo, projection.option),
      config);
    return model.compose(model);
  }
}
