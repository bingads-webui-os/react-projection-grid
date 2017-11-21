import React, { Component } from 'react';
import pgrid from 'projection-grid';
import PropTypes from 'prop-types';
import _ from 'underscore';

import BackboneViewWrapper from './components/backbone-view-wrapper';
import hocPlugin from './components/plugin-wrapper';

class ReactProjectionGrid extends Component {
  constructor(props) {
    super(props);

    this.gridView = pgrid.factory({ vnext: true })
      .create({
        tableClasses: props.config.tableClasses,
        dataSource: props.config.dataSource,
      }).gridView.render();

    this.plugins = {
      grid: this.gridView,
    };
  }

  componentWillUnmount() {
    this.gridView.remove();
  }

  render() {
    const children = React.Children.map(_.flatten([this.props.children]), child =>
      hocPlugin(child, this.gridView, this.props.onChanged));
    return (
      <div>
        <BackboneViewWrapper view={this.gridView} />
        {children}
      </div>
    );
  }
}

ReactProjectionGrid.propTypes = {
  config: PropTypes.shape({
    tableClasses: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string),
    ]),
    dataSource: PropTypes.object,
  }).isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.object,
  ]),
  onChanged: PropTypes.func,
};

ReactProjectionGrid.defaultProps = {
  children: [],
  onChanged: _.noop,
};

export default ReactProjectionGrid;

export * from './plugins/column-chooser';
export * from './plugins/pagination';
