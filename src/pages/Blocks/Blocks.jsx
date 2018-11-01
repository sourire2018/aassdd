import React, { Component } from 'react';
import AuthorityTable from './components/AuthorityTable';

export default class Blocks extends Component {
  static displayName = 'Blocks';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="blocks-page">
        <AuthorityTable />
      </div>
    );
  }
}
