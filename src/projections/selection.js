import React from 'react';
import _ from 'underscore';
import PropTypes from 'prop-types';

const selectionCol = { name: 'projection-selection' };

function CheckboxCol(props) {
  const key = props.model.primaryKey(props.record);

  return (<input
    data-id={key}
    type="Checkbox"
    checked={props.isChecked}
    onChange={props.onChange}
  />);
}

CheckboxCol.defaultProps = {
  record: {},
  model: {},
  isChecked: false,
  onChange: _.noop,
};

CheckboxCol.propTypes = {
  record: PropTypes.oneOfType([
    PropTypes.object,
  ]).isRequired,
  model: PropTypes.oneOfType([
    PropTypes.object,
  ]).isRequired,
  isChecked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

class SelectionProjection {
  constructor(option) {
    this.option = _.defaults(option, { selected: [], onCheckChanged: _.noop });
    this.keys = option.selected;
  }

  onCheckedChange(event) {
    const target = event.target;
    const key = target.getAttribute('data-id');
    if (target.checked) {
      this.keys.push(key);
    } else {
      this.keys = _.without(this.keys, key);
    }
    if (_.isFunction(this.option.onSelectChanged)) {
      this.option.onSelectChanged(this.keys);
    }
  }

  decorateComposeTD(composeTds) {
    const onCheckedChange = this.onCheckedChange.bind(this);
    const isChecked = key => _.contains(this.keys, key);
    return (col, record, model) => {
      if (col.name === selectionCol.name) {
        return [{
          attributes: {},
          key: col.name,
          content: {
            Component: CheckboxCol,
            props: { col, record, model, isChecked: isChecked(model.primaryKey(record)) },
            events: {
              onChange: onCheckedChange,
            },
          },
        }];
      }
      return composeTds(col, record, model);
    };
  }

  process(model) {
    return _.extend(model, {
      composeTds: this.decorateComposeTD(model.composeTds),
      columns: [selectionCol].concat(model.columns),
    });
  }
}

export function getSelection(option) {
  return new SelectionProjection(option);
}
