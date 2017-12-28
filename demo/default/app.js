import 'bootstrap/dist/css/bootstrap.min.css'; // eslint-disable-line
import React, { Component } from 'react';
import Octicon from 'react-octicon'; // eslint-disable-line

import ProjectionGridReact from 'projection-grid-react'; // eslint-disable-line
import people from './people.json';

function Caption() {
  return (<span>custom caption for table</span>);
}

const caption = {
  props: {},
  events: {},
  content: {
    Component: Caption,
  },
};

function CustomRow() {
  return (<span>custom row in table body, table head, table foot and test it in every place</span>);
}

const customRow = {
  props: {},
  events: {},
  content: {
    Component: CustomRow,
  },
};

const customRecord = {
  record: {
    UserName: 'testxxxxxx',
    FirstName: 'Russell',
    LastName: 'Whyte',
  },
};

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: people.value,
      classes: ['table'],
      primaryKey: 'UserName',
      cols: [
        { key: 'UserName' },
        { key: 'FirstName' },
        { key: 'LastName' },
      ],
    };
  }

  render() {
    return (
      <div className="demo">
        <ProjectionGridReact
          data={this.state.data}
          caption={{ content: 'Projection Grid React' }}
          cols={this.state.cols}
          primaryKey="UserName"
          projections={[]}
        />
      </div>
    );
  }
}
