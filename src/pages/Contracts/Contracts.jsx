import React, { Component } from 'react';
import UserTable from './components/UserTable';

export default class Contracts extends Component {
  static displayName = 'Contracts';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="contracts-page">
        <UserTable />
      </div>
    );
  }
}
