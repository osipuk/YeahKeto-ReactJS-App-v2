import React from 'react';
import { connect } from 'react-redux';
import { AuthActions } from 'redux/actions';

import Control_411721 from './media-section/control.js';
import Treatment_411723 from './media-section/Treatment_411723.js';

const format = input => {
  if (input === 0 || input < 0) return '00';
  return input < 10 ? `0${input}` : `${input}`;
};

class PromoSectionFiveMobile extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      hours: '00',
      minutes: '04',
      seconds: '33',
    };
  }

  componentDidMount() {
    setInterval(() => {
      this.updateTime();
    }, 1000);
  }

  updateTime() {
    let seconds = parseInt(this.state.seconds, 10) - 1;
    let minutes = parseInt(this.state.minutes, 10);
    let hours = parseInt(this.state.hours, 10);
    if (seconds <= 0) {
      seconds = 59;
      minutes -= 1;
    }
    if (minutes <= 0) {
      minutes = 59;
      hours -= 1;
      if (hours < 0) hours = 0;
    }
    this.setState({
      seconds: format(seconds),
      minutes: format(minutes),
      hours: format(hours),
    });
  }

  render() {
    return (
      <React.Fragment>
        {this.props.isAuthentic.isAuthenticUser ? (
          <Treatment_411723 {...this.state} />
        ) : (
          <Control_411721 {...this.state} />
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  abtastyParams: state.auth.abtastyParams,
  isAuthentic: state.auth.isAuthentic,
});

export default connect(mapStateToProps, { ...AuthActions })(
  PromoSectionFiveMobile,
);
