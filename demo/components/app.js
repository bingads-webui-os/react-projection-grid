/* eslint-disable */

import 'bootstrap/dist/css/bootstrap.min.css';
import '../demo.css';
import React, { Component } from 'react';
import Octicon from 'react-octicon';
import _ from 'lodash';
import Pagination from 'rc-pagination';
import Select from 'rc-select';
import 'rc-pagination/assets/index.css';
import 'rc-select/assets/index.css';

import ProjectionGridReact from 'projection-grid-react';
import people from '../people.json';
import IconedCell from './iconed-cell';
import EditableCell from './editalbe-cell';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: people.value,
      isBordered: false,
      isStriped: false,
      isHover: false,
      pageNum: 1,
      pageSize: 5,
      gender: 'All',
      selectCurrentPage: false,
      selectAllPage: false,
    };

    this.toggleBorderd = this.toggleBorderd.bind(this);
    this.toggleStriped = this.toggleStriped.bind(this);
    this.toggleHover = this.toggleHover.bind(this);
    this.selectTdIcon = this.selectTdIcon.bind(this);
    this.selectGender = this.selectGender.bind(this);
    this.handlePaging = this.handlePaging.bind(this);
  }

  toggleBorderd() {
    this.setState({
      isBordered: !this.state.isBordered,
    });
  }

  toggleStriped() {
    this.setState({
      isStriped: !this.state.isStriped,
    });
  }

  toggleHover() {
    this.setState({
      isHover: !this.state.isHover,
    });
  }

  selectTdIcon(e) {
    this.setState({
      icon: e.target.value,
    });
  }

  getPageNum(rawPageNum, data) {
    return this.state.pageSize * rawPageNum > data.length ? Math.ceil(data.length / this.state.pageSize) : rawPageNum;
  }

  selectGender(e) {
    const gender = e.target.value;
    const data = people.value.filter(i => i.Gender === gender || gender === 'All');
    const pageNum = this.getPageNum(this.state.pageNum, data);

    this.setState({
      gender,
      data,
      pageNum,
    });
  }

  handlePaging(current, pageSize) {
    this.setState({
      pageNum: this.getPageNum(current, this.state.data),
      pageSize,
    });
  }

  render() {
    const config = {
      data: this.state.data.slice((this.state.pageNum - 1) * this.state.pageSize, this.state.pageSize * this.state.pageNum),
      caption: { content: 'Projection Grid React' },
      cols: [
        {
          key: 'Select',
          $td: {
            content: ({ data, isHeader }, content) => {
              if (isHeader) {
                return content;
              }

              const toggleSelect = (e) => {
                this.setState({
                  data: this.state.data.map((record) => {
                    if (record.UserName === data.UserName) {
                      return _.defaults({}, { isSelected: e.target.checked }, record);
                    }

                    return record;
                  }),
                });
              };


              return (
                <div>
                  <input checked={Boolean(data.isSelected)} onChange={toggleSelect} type="checkbox"/>
                </div>
              );
            },
          },
        },
        {
          key: 'UserName',
          $td: this.state.icon ? {
            content: (td, content) => (
              <IconedCell content={content} icon={this.state.icon} />
            ),
          } : {},
        },
        {
          key: 'FirstName',
          $td: {
            content: (td, content) => {
              if (td.isHeader) {
                return content;
              }

              const handleEdit = (value) => {
                this.setState({
                  data: this.state.data.map((record) => {
                    if (record.UserName === td.data.UserName) {
                      return _.defaults({}, { FirstName: value }, record);
                    }

                    return record;
                  }),
                });
              }

              return <EditableCell value={td.data.FirstName} onValueChanged={handleEdit} />
            }
          }
        },
        { key: 'LastName' },
      ],
      primaryKey: 'UserName',
      classes: [
        'table',
        this.state.isBordered && 'table-bordered',
        this.state.isStriped && 'table-striped',
        this.state.isHover && 'table-hover',
      ].filter(c => typeof(c) === 'string'),
      tfoot: {
        trs: [{
          content: 'foot placehold',
        }],
      },
      sorting: {
        cols: ['LastName', 'FirstName'],
        $default: {
          classes: ['sortable-header'],
        },
        $asc: {
          classes: ['sortable-header'],
          content: (td, content) => {
            return <IconedCell content={content} icon="arrow-up" />
          }
        },
        $desc: {
          classes: ['sortable-header'],
          content: (td, content) => {
            return <IconedCell content={content} icon="arrow-down" />
          }
        },
        onSort: ({ sortBy, direction }) => {
          const dataAsc = _.sortBy(this.state.data, sortBy);

          this.setState({
            sortBy,
            direction,
            data: direction === 'asc' ? dataAsc : _.reverse(dataAsc),
          });
        },
      },
    };

    return (
      <div className="demo">
        <div className="panel panel-primary">
          <div className="panel-heading">
            <h3>Projection Grid for ReactJs</h3>
          </div>
          <div className="panel-body">
            <form className="form-inline">
              <div className="checkbox">
                <label>
                  <input
                    type="checkbox"
                    checked={this.state.isBordered}
                    onChange={this.toggleBorderd}
                  />
                  <span>Is bordered?</span>
                </label>
              </div>
              <div className="checkbox">
                <label>
                  <input
                    type="checkbox"
                    checked={this.state.isStriped}
                    onChange={this.toggleStriped}
                  />
                  <span>Is striped?</span>
                </label>
              </div>
              <div className="checkbox">
                <label>
                  <input
                    type="checkbox"
                    checked={this.state.isHover}
                    onChange={this.toggleHover}
                  />
                  <span>Is hover?</span>
                </label>
              </div>
              <div className="form-group">
                <label>Cell Icon:</label>
                <select className="form-control" value={this.state.icon} onChange={this.selectTdIcon} >
                  <option value="">None</option>
                  <option value="ok">OK</option>
                  <option value="pencil">Pencil</option>
                  <option value="heart">Heart</option>
                  <option value="heart-empty">Empty Heart</option>
                </select>
              </div>
              <div className="form-group">
                <label>Gender:</label>
                <select className="form-control" value={this.state.gender} onChange={this.selectGender} >
                  <option value="All">all</option>
                  <option value="Male">male</option>
                  <option value="Female">female</option>
                </select>
              </div>
            </form>
          </div>
          <ProjectionGridReact
            config={config}
          />
          <Pagination
            total={this.state.data.length}
            current={this.state.pageNum}
            onChange={this.handlePaging}
            pageSize={this.state.pageSize}
            onShowSizeChange={this.handlePaging}
            showSizeChanger
            selectComponentClass={Select}
            pageSizeOptions={['5', '10', '15']}
          />
        </div>
      </div>
    );
  }
}