import React from 'react';
import PropTypes from 'prop-types';

const DefaultContent = ({ text }) => <span>{text}</span>;

DefaultContent.propTypes = {
  text: PropTypes.string,
};

DefaultContent.defaultProps = {
  text: '',
};

export default DefaultContent;
