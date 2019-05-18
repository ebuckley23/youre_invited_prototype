import React from 'react';
import {TextField, Button, Paper, Divider, Subheader} from 'react-md';

export default class CreateADate extends React.PureComponent {
  state = DEFAULT_STATE;
  onSave = async () => {
    try {
      const response = await fetch('/api/invitations', {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(this.state)
      });

      const data = await response.json();
      this.setState({...this.state, date_code: data.date_code});
    }
    catch (err) {
      console.warn('err', err);
    }
  }
  updateQuestion = (key, value) => {
    this.setState(state => {
      const questionaire = state.questionaire.map((item) => {
        if (item.key === key) {
          return {...item, q: value};
        }
        return item;
      });
      return {...state, questionaire}
    })
  }
  updateDateLocation = (key, propName, value) => {
    this.setState(state => {
      const date_location_options = state.date_location_options.map(item => {
        if (item.key === key) {
          return {...item, [propName]: value};
        }
        return item;
      })
      return {...state, date_location_options};
    })
  }
  onAddQuestion = (question_count) => {
    const id = makeid(question_count + 1);
    this.setState({
      ...this.state, 
      questionaire: [
        ...this.state.questionaire, 
        {key: id, q: '', a: ''}
      ]
    });
  }
  onAddDateLocation = (location_count) => {
    const id = makeid(location_count + 1);
    this.setState({
      ...this.state,
      date_location_options: [
        ...this.state.date_location_options,
        {key: id, place: '', address: '', img_url: ''}
      ]
    });
  }
  _isEnabled = () => {
    const {questionaire, date_location_options} = this.state;
    return questionaire.length && date_location_options.length;
  }
  render() {
    const {questionaire, date_location_options} = this.state;
    return (
      <Paper style={{display: 'flex', flexDirection: 'column', flex: 1, padding: 15}}>
        <Subheader primary primaryText='Invitation Information' />
        <TextField label='Your Pic URL' onChange={(my_pic_url) => this.setState({my_pic_url})} />
        <TextField rows={4} label='Intro Message' onChange={(intro_message) => this.setState({intro_message})}/>
        <TextField label='Name of the Person the invitation is for:' onChange={(value) => this.setState({with: value})} />

        <Subheader primary primaryText='Questionaire' />
        {questionaire.map((x, i) => {
          return (
            <TextField
              label={`Question ${i + 1}.`}
              key={x.key}
              value={x.q}
              onChange={(value) =>this.updateQuestion(x.key, value)}
            />
          )
        })}
        <Button raised secondary onClick={() => this.onAddQuestion(questionaire.length)}>Add Question</Button>
        <Divider />
        <Subheader primary primaryText='Location Suggestions' />
        {date_location_options.map(x => {
          return (
            <>
              <TextField
                label='Place'
                value={x.place}
                onChange={(value) => this.updateDateLocation(x.key, 'place', value)}
              />
              <TextField
                label='Address'
                value={x.address}
                onChange={(value) => this.updateDateLocation(x.key, 'address', value)}
              />
              <TextField
                label='Img Url'
                value={x.img_url}
                onChange={(value) => this.updateDateLocation(x.key, 'img_url', value)}
              />
            </>
          )
        })}
        <Button raised secondary onClick={() => this.onAddDateLocation(date_location_options.length)}>Add Location</Button>
        <Divider />
        <Button disabled={!this._isEnabled()} onClick={this.onSave} raised primary>
          Save
        </Button>
        {!this.state.date_code ? null : (
          <div>
            <b>You're Invited! Code Below</b><br />
            <a href={`${window.location.origin}/invitation/${this.state.date_code}`}>Code</a>
          </div>
        )}
      </Paper>
    )
  }
}

const DEFAULT_STATE = {
  my_pic_url: '',
  intro_message: '',
  date_code: '',
  with: '',
  questionaire: [],
  date_location_options: []
}

function makeid(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}