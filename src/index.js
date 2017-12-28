import React from 'react';
import PropTypes from 'prop-types';
import createCore from 'projection-grid-core';
import _ from 'underscore';
import defaultContentFactory from './components/default-content-factory';
import { TableRender } from './components/table-renderer';

/* eslint-disable react/no-unused-prop-types */

class ProjectionGridReact extends React.Component {
  componentWillMount() {
    this.core = createCore()
      .useBuiltin({
        defaultContentFactory,
      })
      .use(this.props.projections);
  }

  render() {
    const model = this.core.compose({ config: _.omit(this.props, 'projections') });

    return (
      <TableRender model={model} />
    );
  }
}

ProjectionGridReact.propTypes = {
  data: PropTypes.arrayOf(PropTypes.any),
  caption: PropTypes.shape({ content: PropTypes.any }),
  columns: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string })),
  primaryKey: PropTypes.string.isRequired,
  sort: PropTypes.shape({
    handleResort: PropTypes.func,
    ascClasses: PropTypes.arrayOf(PropTypes.string),
    descClasses: PropTypes.arrayOf(PropTypes.string),
  }),
  projections: PropTypes.arrayOf(PropTypes.any),
};

ProjectionGridReact.defaultProps = {
  data: [],
  columns: [],
  projections: [],
  sort: {},
  caption: {},
};

export default ProjectionGridReact;
