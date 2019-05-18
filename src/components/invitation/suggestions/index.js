import React from 'react';
import {Avatar, Button, Card, CardActions, CardText, CardTitle} from 'react-md';

export default class Suggestions extends React.PureComponent {
  render() {
    const {
      date_location_options = [], 
      selected_date_location,
      selectLocation
    } = this.props;
    return (
      <>
        {date_location_options.map(location => {
          const isSelected = location._id === selected_date_location;
          return (
            <Card key={location._id} style={{width: '100%'}}       className='md-block-centered'>
              <CardTitle
                title={location.place}
                subtitle={location.address}
                avatar={<Avatar src={location.img_url} role='presentation' />}
              />
              <CardActions>
                <Button
                  flat={!isSelected}
                  raise={isSelected}
                  onClick={() => selectLocation(location._id)}
                >
                  {isSelected ? 'Unselect' : 'Select'}
                </Button>
              </CardActions>
            </Card>
          )
        })}
      </>
    )
  }
}