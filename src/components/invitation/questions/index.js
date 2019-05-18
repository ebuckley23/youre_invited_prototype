import React from 'react';
import {TextField} from 'react-md';

export default class Questions extends React.PureComponent {
  render() {
    const {questionaire = [], updateAnswer} = this.props;
    return (
      <>
        {questionaire.map(question => {
          return (
            <TextField
              key={question._id}
              label={`Q. ${question.q}`}
              value={question.a}
              onChange={(value) => updateAnswer(question._id, value)}
            />
          )
        })}
      </>
    )
  }
}