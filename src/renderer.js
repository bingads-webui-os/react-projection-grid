import React from 'react';
import PropTypes from 'prop-types';

function renderTrs(trs) {
  return (
    trs.map(tr => (
      <tr key={tr.key} {...tr.attributes}>
        {tr.tds.map(td => (
          <td key={td.key} {...td.attributes}>
            <td.content.Component {...td.content.props} {...td.content.events} />
          </td>
        ))}
      </tr>
    ))
  );
}

export const TableRender = (props) => {
  const { table } = props.model;
  return (
    <div>
      <table>
        <caption {...table.caption.attributes}>
          <table.caption.content.Component
            {...table.caption.content.props}
            {...table.caption.content.events}
          />
        </caption>
        {table.colgroups.map(colgroup => (
          <colgroup key={colgroup.key} {...colgroup.attributes}>
            {colgroup.cols.map(col => (
              <col key={col.key} {...col.attributes} />
            ))}
          </colgroup>
        ))}

        <thead {...table.thead.attributes}>
          {table.thead.trs.map(tr => (
            <tr key={tr.key} {...tr.attributes}>
              {tr.ths.map(th => (
                <th key={th.key} {...th.attributes}>
                  <th.content.Component {...th.content.props} {...th.content.events} />
                </th>
              ))}
            </tr>))}
        </thead>
        {table.tbodies.map(tbody => (
          <tbody key={tbody.key} {...tbody.attributes}>
            {renderTrs(tbody.trs)}
          </tbody>
        ))}
        <tfoot {...table.tfoot.attributes}>
          {renderTrs(table.tfoot.trs)}
        </tfoot>
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
