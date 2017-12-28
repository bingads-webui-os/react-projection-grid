import 'bootstrap/dist/css/bootstrap.min.css'; // eslint-disable-line
import React, { Component } from 'react';
import Octicon from 'react-octicon'; // eslint-disable-line

import ProjectionGridReact from 'projection-grid-react'; // eslint-disable-line
import people from './people.json';

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
          tfoot={{
            trs: [{
              content: 'foot placehold',
            }],
          }}
        />
      </div>
    );
  }
}
