import React from 'react';
import PropTypes from 'prop-types';
import _ from 'underscore';

function Content(props) {
  const { col, record } = props;
  if (!_.isEmpty(record)) {
    return (<div>{record[col.name]}</div>);
  }
  return (<div>{col.name}</div>);
}

Content.defaultProps = {
  col: {},
  record: {},
};

Content.propTypes = {
  col: PropTypes.oneOfType([
    PropTypes.object,
  ]).isRequired,
  record: PropTypes.oneOfType([
    PropTypes.object,
  ]).isRequired,
};


export const composeContent = (col, record, model) => (
  {
    Component: Content,
    props: { col, record, model },
    events: {},
  });
