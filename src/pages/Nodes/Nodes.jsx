import React, { Component } from 'react';
import RealTimeTradeChart from './components/RealTimeTradeChart';
import EnhanceTable from './components/EnhanceTable';

export default class Nodes extends Component {
  static displayName = 'Nodes';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="nodes-page">
        <RealTimeTradeChart />
        <EnhanceTable />
      </div>
    );
  }
}
