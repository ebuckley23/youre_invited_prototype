import React from 'react';
import {TextField, DatePicker, Slider} from 'react-md';

export default class Misc extends React.PureComponent {
  render() {
    const {
      suggestions, 
      interest_level, 
      selected_date,
      addSuggestion,
      addSelectedDate,
      setInterestLevel
    } = this.props;
    return (
      <>
        <div>
          <DatePicker
            label="Have a date in mind?"
            className="md-cell"
            value={selected_date}
            inline
            onChange={addSelectedDate}
          />
        </div>
        <div>
          <TextField
            label={'Any Suggestions?'}
            value={suggestions}
            onChange={addSuggestion}
            rows={4}
          />
        </div>
        <div>
          <Slider
            id='slider12'
            label={<InterestLevelLabel interest_level={interest_level} />}
            min={1}
            max={5}
            step={1}
            value={interest_level}
            onChange={setInterestLevel}
          />
        </div>
      </>
    )
  }
}

const InterestLevelLabel = ({interest_level}) => {
  const text = getInterestLevel(interest_level);
  return (
    <div>Select your interest level -> <b>{text}</b></div>
  )
}

const getInterestLevel = (value) => {
  const levels = {
    1: 'Not really interested',
    2: 'Probably, if I have nothing else to do',
    3: 'Okay',
    4: 'Kinda looking forward to it',
    5: 'Interested!'
  }
  return levels[value];
}