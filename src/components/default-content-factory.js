import React from 'react';
import _ from 'underscore';
import DefaultContent from '../components/default-content';

export const defaultContentFactory = content =>
  (_.isString(content) ? content : <DefaultContent text={content} />);
