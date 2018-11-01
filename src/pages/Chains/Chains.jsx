import React, { Component } from 'react';
import CustomTable from './components/CustomTable';

export default class Chains extends Component {
  static displayName = 'Chains';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="chains-page">
        <CustomTable />
      </div>
    );
  }
}
