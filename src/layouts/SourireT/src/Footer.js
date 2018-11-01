import React, { Component } from 'react';
import {FormattedMessage} from 'react-intl';
import config from './config.json';

export class Footer extends Component {

  render() {
    return (
      <div>
        <div className="footer">
          <FormattedMessage
            id={config.foot_id}
            values= {
              {
                foot : "Copyright © 2018 "+ config.foot+" | All rights reserved"
              }
            }
            defaultMessage= "trustchain {foot}"
            description="footer"
            />
          {""}
        </div>
      </div>
    );
  }
}

export default Footer;