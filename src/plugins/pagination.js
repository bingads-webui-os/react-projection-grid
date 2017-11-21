import { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'underscore';

export class Pagination extends Component {
  componentDidMount() {
    this.updateGrid();
  }

  componentDidUpdate() {
    this.updateGrid();
  }

  updateGrid() {
    this.props.dispatchAction('set:pagination',
      {
        pageNumber: this.props.pageNumber,
        pageSize: this.props.pageSize,
        pageCount: this.props.pageCount,
      });
  }

  render() {
    return null; // no render for example
  }
}

Pagination.defaultProps = {
  dispatchAction: _.noop,
};

Pagination.propTypes = {
  dispatchAction: PropTypes.func,
  pageSize: PropTypes.number.isRequired,
  pageNumber: PropTypes.number.isRequired,
  pageCount: PropTypes.number.isRequired,
};
