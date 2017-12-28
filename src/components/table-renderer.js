import React from 'react';
import PropTypes from 'prop-types';
import _ from 'underscore';

const forbiddenProps = ['class', 'classes', 'className', 'style', 'styles', 'key'];
const propKeyMapper = {
  colspan: 'colSpan',
};

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function mapKeys(obj = {}, keyMapper = {}) {
  const mapper = {};
  _.each(keyMapper, (destKey, srcKey) => {
    if (_.has(obj, srcKey)) {
      _.extend(mapper, {
        [destKey]: obj[srcKey],
      });
    }
  });
  return _.chain({})
    .extend(obj)
    .extend(mapper)
    .omit(_.keys(keyMapper))
    .value();
}

function formatProps({ key, classes = [], props = {}, events = {}, styles = {} }) {
  if (!_.isEmpty(_.pick(props, forbiddenProps))) {
    window.console.warn(`${forbiddenProps.join(' or ')} is not allowed in props`);
  }

  return _.defaults(
    key ? { key } : {},
    {
      className: classes.join(' '),
      style: styles,
    },
    mapKeys(_.omit(props, forbiddenProps), propKeyMapper),
    _.reduce(events, (memo, handler, eventName) => {
      if (/^on[A-Z]/.test(eventName)) {
        window.console.warn('Please dont prepend your event name with "on". It may cause bugs if you use frameworks like vue.js');

        return _.defaults({}, { [eventName]: handler }, memo);
      }

      return _.defaults({}, { [`on${capitalizeFirstLetter(eventName)}`]: handler }, memo);
    }, {})
  );
}

function renderTrs(trs) {
  return (
    trs.map(tr => (
      <tr {...formatProps(tr)}>
        {tr.tds.map((td) => {
          if (td.tag === 'TH') {
            return (
              <th {...formatProps(td)}>
                {td.content}
              </th>);
          }
          return (
            <td {...formatProps(td)}>
              {td.content}
            </td>);
        })}
      </tr>
    ))
  );
}

export const TableRender = (props) => {
  const { table } = props.model;

  const caption = table.caption ?
    (
      <caption {...formatProps(table.caption)}>
        {table.caption.content}
      </caption>
    ) : null;

  const colgroups = table.colgroups.map(colgroup => (
    <colgroup {...formatProps(colgroup)}>
      {colgroup.cols.map(col => (
        <col {...formatProps(col)} />
      ))}
    </colgroup>
  ));

  const thead = (
    <thead {...formatProps(table.thead)}>
      {renderTrs(table.thead.trs)}
    </thead>
  );

  const tbodies = table.tbodies.map(tbody => (
    <tbody {...formatProps(tbody)}>
      {renderTrs(tbody.trs)}
    </tbody>
  ));

  const tfoot = table.tfoot ? (
    <tfoot>
      {renderTrs(table.tfoot.trs)}
    </tfoot>
  ) : null;

  return (
    <div>
      <table {...formatProps(table)}>
        {caption}
        {colgroups}
        {thead}
        {tbodies}
        {tfoot}
      </table>
    </div>
  );
};

TableRender.defaultProps = {
  model: {},
};

TableRender.propTypes = {
  model: PropTypes.oneOfType([
    PropTypes.object,
  ]).isRequired,
};
