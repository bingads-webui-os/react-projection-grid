import React from 'react';
import PropTypes from 'prop-types';
import { utils } from 'projection-grid-core';
// import _ from 'underscore';

const forbiddenProps = ['class', 'classes', 'className', 'style', 'styles', 'key'];
const propKeyMapper = {
  colspan: 'colSpan',
};

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function formatProps({ key, classes = [], props = {}, events = {}, styles = {} }) {
  if (utils.pick(props, forbiddenProps).length > 0) {
    window.console.warn(`${forbiddenProps.join(' or ')} is not allowed in props`);
  }

  return utils.assign(key ? { key } : {}, Object.keys(events).reduce((memo, eventName) => {
    if (/^on[A-Z]/.test(eventName)) {
      window.console.warn('Please dont prepend your event name with "on". It may cause bugs if you use frameworks like vue.js');

      return utils.assign({}, memo, { [eventName]: events[eventName] });
    }

    return utils.assign({}, memo, { [`on${capitalizeFirstLetter(eventName)}`]: events[eventName] });
  }, {}), utils.updateKeys(utils.omit(props, forbiddenProps), propKeyMapper), {
    className: classes.join(' ') || null, // '' will add attr class, but null will not
    style: styles,
  });
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
