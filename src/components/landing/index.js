import React from 'react';
import {TextField, Paper, FontIcon, Divider} from 'react-md';
import {Link, withRouter} from 'react-router-dom';

class Landing extends React.PureComponent {
  state = {
    invitation_code: ''
  }
  render() {
    const {history} = this.props;
    const {invitation_code} = this.state;
    return (
      <Paper className='md-grid'>
        <TextField
          label='Enter invitation code!'
          value={this.state.invitation_code}
          onChange={(value) => this.setState({invitation_code: value})}
          rightIcon={<FontIcon primary onClick={() => invitation_code && history.push(`/invitation/${invitation_code}`)}>send</FontIcon>}
        />
        <Divider />
        <Link to='/admin'>Create an invitation</Link>
      </Paper>
    )
  }
}

export default withRouter(Landing);