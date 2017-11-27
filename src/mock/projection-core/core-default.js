import _ from 'underscore';
import { composeCaption } from './composeCaption';
import { composeColgroups } from './composeColgroups';
import { composeCols } from './composeCols';
import { composeContent } from './composeContent';
import { composeTable } from './composeTable';
import { composeTbodies } from './composeTbodies';
import { composeTds } from './composeTds';
import { composeTfoot } from './composeTfoot';
import { composeThead } from './composeThead';
import { composeThs } from './composeThs';
import { composeTrs } from './composeTrs';
import { compose } from './compose';

export function CoreDefault(config) {
  const primaryKey = config.primaryKey;
  const columns = config.columns || [];
  const model = {
    records: config.data,
    primaryKey: _.isString(primaryKey) ? _.property(primaryKey) : primaryKey,
    columns: _.map(columns, (col) => {
      if (_.isString(col)) {
        return {
          name: col,
        };
      }
      return col;
    }),
  };
  return _.extend({}, model, {
    composeTable,
    composeTbodies,
    composeTds,
    composeTfoot,
    composeThs,
    composeThead,
    composeTrs,
    composeColgroups,
    composeCols,
    composeContent,
    composeCaption,
    compose,
  });
}
