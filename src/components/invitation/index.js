import React from 'react';
import {Paper, TabsContainer, Tabs, Tab, Media, Button} from 'react-md';
import Questions from './questions';
import Suggestions from './suggestions';
import Misc from './misc';

const DEFAULT_STATE = {
  my_pic_url: '',
  intro_message: '',
  with: '',
  questionaire: [],
  date_location_options: [],
  suggestions: '',
  interest_level: 2,
  selected_date_location: '',
  selected_date: '',
  submitted: false
}
export default class Invitation extends React.PureComponent {
  state = DEFAULT_STATE;

  async componentDidMount() {
    const { invitationId } = this.props.match.params;
    try {
      const response = await fetch(`/api/invitations/${invitationId}`);
      const data = await response.json();
      this.setState(data);
    }
    catch (err) {
      console.warn('err', err);
    }
  }

  _updateAnswer = (id, value) => {
    this.setState(state => {
      const questionaire = state.questionaire.map((item) => {
        if (item._id === id) {
          return {...item, a: value};
        }
        return item;
      })
      return {...state, questionaire};
    })
  }

  _onLocationSelect = (location_id) => {
    this.setState({selected_date_location: this.state.selected_date_location === location_id ? '' : location_id})
  }

  _onDateSelect = (date) => {
    this.setState({selected_date: date})
  }

  _onInterestLevelChange = (interest_level) => {
    this.setState({interest_level})
  }

  _onSuggestionsChange = (suggestions) => {
    this.setState({suggestions});
  }

  _onSubmit = async () => {
    try {
      const response = await fetch('/api/invitations', {
        method: 'PUT',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(this.state)
      });

      const data = await response.json();
      this.setState(data);
    }
    catch (err) {
      console.warn('err', err);
    }
  }
  render() {
    const {
      my_pic_url, 
      intro_message, 
      questionaire, 
      date_location_options, 
      selected_date_location,
      suggestions,
      interest_level,
      selected_date,
      submitted
    } = this.state;
    return (
      <div>
        <ContainerItem intro_message={intro_message}>
          <Media>
            <img
              style={{width: 200, height: 200}}
              src={my_pic_url}
              alt='ebuckley' />
          </Media>
        </ContainerItem>
        <Paper style={{padding: 10}}>
          <TabsContainer panelClassName="sm-grid" colored mobile={false}>
            <Tabs tabId='invitation-tab'>
              <Tab label='Q/A'>
                <Questions
                  questionaire={questionaire}
                  updateAnswer={this._updateAnswer}
                />
              </Tab>
              <Tab label='Suggestions'>
                <Suggestions
                  {...{
                    date_location_options, 
                    selected_date_location,
                    selectLocation: this._onLocationSelect
                  }}
                />
              </Tab>
              <Tab label='Misc.'>
                <Misc {...{
                  suggestions,
                  interest_level,
                  selected_date,
                  addSuggestion: this._onSuggestionsChange,
                  addSelectedDate: this._onDateSelect,
                  setInterestLevel: this._onInterestLevelChange
                }}/>
              </Tab>
            </Tabs>
          </TabsContainer>
        </Paper>
        {submitted ? <div>{`Thank you ${this.state.with} for submitting your response!`}</div> :
        <Button onClick={this._onSubmit} primary raised>Submit!</Button>}
      </div>
    )
  }
}

const ContainerItem = ({children, intro_message}) => {
  return (
    <Paper className="md-cell md-cell--12 md-grid">
      <section className="md-cell md-cell--3-tablet md-cell--4-desktop">
        {children}
      </section>
      <section className="md-cell md-cell--5-tablet md-cell--8-desktop">
        <p><i>{intro_message}</i></p>
      </section>
    </Paper>
  )
}