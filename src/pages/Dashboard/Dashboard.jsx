import React, { Component } from 'react';
import InfiniteCard from './components/InfiniteCard';
import TabChart from './components/TabChart';
import LiteTable from './components/LiteTable';

export default class Dashboard extends Component {
  static displayName = 'Dashboard';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="dashboard-page">
        <InfiniteCard />
        <TabChart />
        <LiteTable />
      </div>
    );
  }
}
