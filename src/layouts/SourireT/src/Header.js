import React, {Component} from "react";
import {connect} from "react-redux";
import Select from "react-select";
import {Nav, Navbar, NavbarBrand, NavbarToggler} from "reactstrap";
import {HashRouter as Router, NavLink, Link} from "react-router-dom";
import Logo from "./static/images/logo.png";
import FontAwesome from "react-fontawesome";
import Websocket from "react-websocket";
import Badge from "material-ui/Badge";
import PropTypes from 'prop-types';
import {FormattedMessage} from 'react-intl';
import config  from './config.json';
import {
  Row,
  Col
} from 'reactstrap';
import Avatar from 'material-ui/Avatar';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faAddressBook} from '@fortawesome/fontawesome-free-solid'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
library.add(
  fab
)


export class HeaderView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value : 1
    };
  
  }
  val (value) {
    this.setState({
      value: value === 0? 1 : 0
    });
  }
  render() {
    const {classes} = this.props;
    const {hostname, port} = window.location;
    var webSocketUrl = `ws://${hostname}:${port}/`;
    const themeIcon = sessionStorage.getItem("toggleTheme") === "true";
    const dashLink = props => (
      <Link to="/" exact activeClassName="active" {...props} />
    );
    const transLink = props => (
      <Link to="/transactions" activeClassName="active" {...props} />
    );

    const header = [], status = [];
    for (let i = 0; i < config.header.length; i++) {
      switch(config.header[i]) {
        case "dashboardview" : header.push(<li>
                  <NavLink
                    to="/"
                    exact
                    className="dashButtons"
                    activeClassName="activeTab"
                  >
                    <FormattedMessage
                    id="page.localeProvider.dashboard"
                    defaultMessage="DASHBOARD"
                    description="DASHBOARD"
                    />
                  </NavLink>
                </li> ); break;
        case "blocksview": header.push( <li>
                  <NavLink
                    to="/blocks"
                    className="dashButtons"
                    activeClassName="activeTab"
                  >
                    <FormattedMessage
                    id="page.localeProvider.blocks"
                    defaultMessage="BLOCKS"
                    description="BLOCKS"
                    />
                  </NavLink>
                </li> ); break;
        case "contractview" : header.push( <li>
                  <NavLink
                    to="/contracts"
                    className="dashButtons"
                    activeClassName="activeTab"
                  >
                    <FormattedMessage
                    id="page.localeProvider.contracts"
                    defaultMessage="CONTRACTS"
                    description="CONTRACTS"
                    />
                    
                  </NavLink>
                </li> ); break;
        case "chainview" : header.push( <li>
                  <NavLink
                    to="/channels"
                    className="dashButtons"
                    activeClassName="activeTab"
                  >
                    <FormattedMessage
                    id="page.localeProvider.chain"
                    defaultMessage="CHAIN"
                    description="CHAIN"
                    />
                    
                  </NavLink>
                </li> ); break;
        case "nodesview" : header.push( <li>
                  <NavLink
                    to="/nodes"
                    className="dashButtons"
                    activeClassName="activeTab"
                  >
                    <FormattedMessage
                    id="page.localeProvider.nodes"
                    defaultMessage="NODES"
                    description="NODES"
                    />
                  </NavLink>
                </li> ); break;
        case "transactionsview" :header.push( <li>
                  <NavLink
                    to="/transactions"
                    className="dashButtons"
                    activeClassName="activeTab"
                  >
                    <FormattedMessage
                    id="page.localeProvider.transactions"
                    defaultMessage="TRANSACTIONS"
                    description="TRANSACTIONS"
                    />
                    
                  </NavLink>
                </li> ); break;
        case "select" : header.push(
          <div>
            <Select
              className="channel-dropdown"
              placeholder="Select Channel..."
              required={true}
              name="form-field-name"
              isLoading={this.state.isLoading}
              value={this.state.selectedChannel}
              onChange={this.handleChange}
              options={this.state.channels}
            />
          </div>
        ); break; 
        case "language" : header.push(
          <div  className="admin-buttons theme-switch" onClick= {() => {
          this.props.onChange(this.state.value); this.val(this.state.value)}}>
            <FontAwesomeIcon icon="language" className = "langIcon" />
          </div>
        ); break;
        case "theme" : header.push(
          <div className="admin-buttons theme-switch">
            <FontAwesome name="sun-o" className="sunIcon" />
            <Switch
              onChange={() => this.handleThemeChange()}
              checked={themeIcon}
            />
            <FontAwesome name="moon-o" className="moonIcon" />
          </div>
        ); break;
        case "github" : header.push(
          <div  className="admin-buttons theme-switch" >
            <NavbarBrand href="https://github.com/DSiSc/justitia">
              <FontAwesomeIcon
                  icon={['fab', 'github']}
                  className = "githubIcon"
                />
            </NavbarBrand>
          </div>
        ); break;
        default:  break;
      }
    }
    for (let i = 0; i < config.status.length; i++) {

      switch(config.status[i]) {
        case "blocks" : status.push(
          <div className="statistic vdivide" style={{ width: "19%" }}>
            <Row>
              <Col sm= "4">
                <span className="stat-count">1</span>
              </Col>
              <Col sm= "4">
              
                <div className="stat-avatar avatar-block div-icon" style={{ margin: "0px 0px 0px 40px", padding : "0" }}>
                  <FontAwesomeIcon
                    icon={['fas', 'cube']}
                  />
                </div>
              </Col>
            </Row>
            <span className="stat-name">
              <FormattedMessage
                id="page.localeProvider.blocks"
                defaultMessage="BLOCKS"
                description="BLOCKS"
                />
              </span>
          </div>
        ); break;
        case "transactions" : status.push(
          <div className="statistic vdivide" style={{ width: "19%" }}>
            <Row>
              <Col sm= "4">
                <span className="stat-count">2</span>
              </Col>
              <Col sm= "4">
                <div className="stat-avatar avatar-block div-icon"  style={{ margin: "0px 0px 0px 40px", padding : "0" }}>
                  <FontAwesomeIcon
                    icon={['fas', 'list-alt']}
                  />
                </div>
              </Col>
            </Row>
            <span className="stat-name">
              <FormattedMessage
              id="page.localeProvider.transactions"
              defaultMessage="TRANSACTIONS"
              description="TRANSACTIONS"
              />
            </span>
         </div>
        ); break;
        case "nodes" : status.push(<div className="statistic vdivide" style={{ width: "19%" }}>
                  <Row>
                    <Col sm= "4">
                      <span className="stat-count">3</span>
                    </Col>
                    <Col sm= "4">
                      <div className="stat-avatar avatar-block div-icon"  style={{ margin: "0px 0px 0px 40px", padding : "0" }}>
                        <FontAwesomeIcon
                        icon={['fas', 'users']}
                      />
                      </div>
                    </Col>
                  </Row>
                  <span className="stat-name">
                    <FormattedMessage
                      id="page.localeProvider.nodes"
                      defaultMessage="NODES"
                      description="NODES"
                      />
                  </span>
                </div>); break;
        case "contracts" : status.push(<div className="statistic vdivide" style={{ width: "19%" }}>
                  <Row>
                    <Col sm= "4">
                      <span className="stat-count">4</span>
                    </Col>
                    <Col sm= "4">
                      <div className="stat-avatar avatar-block div-icon"  style={{ margin: "0px 0px 0px 40px", padding : "0" }}>
                        <FontAwesomeIcon
                          icon={['fa', 'handshake']}
                        />
                      </div>
                    </Col>
                  </Row>
                  <span className="stat-name">
                    <FormattedMessage
                      id="page.localeProvider.contracts"
                      defaultMessage="CONTRACTS"
                      description="CONTRACTS"
                      />
                  </span>
                </div>); break;
          case "chains" : status.push(<div className="statistic vdivide" style={{ width: '19%' }}>
                  <Row>
                    <Col sm= "4">
                      <span className="stat-count">5</span>
                    </Col>
                    <Col sm= "4">
                      <div className="stat-avatar avatar-block div-icon"  style={{ margin: "0px 0px 0px 40px", padding : "0" }}>
                        <FontAwesomeIcon
                          icon={['fas', 'tree']}
                        />

                      </div>
                    </Col>
                  </Row>
                  <span className="stat-name">
                    <FormattedMessage
                      id="page.localeProvider.chains"
                      defaultMessage="chain"
                      description="chain"
                      />
                  </span>
                </div>); break;
        default:  break;
      }
    }
    return (
      <div>
        <Router>
          <div className="navbar-header" >
            <Navbar expand="md">
              <NavbarBrand href="/">
                {" "}
                <img src={Logo} className="logo" alt={config.logo} />
              </NavbarBrand>
              <NavbarBrand>
                <span className = 'dashButtons'>Justitia Chain Explorer</span>
              </NavbarBrand>
              <NavbarToggler onClick={this.toggle} />
              <Nav className="ml-auto " navbar>
                {header}
                <br />
                
              </Nav>
              
            </Navbar>
            <div className="stat" >
              <Row>
                {status}
              </Row>
            </div>
          </div>
        </Router>
        
      </div>
    );
  }
}

export default HeaderView;