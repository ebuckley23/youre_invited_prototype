import React from 'react';
import {TabsContainer, Tabs, Tab} from 'react-md';
import CreateADate from './components/create_a_date';

export default class Admin extends React.PureComponent {
  render() {
    return (
      <TabsContainer panelClassName="sm-grid" colored mobile >
        <Tabs tabId='simple-tab' mobile>
          <Tab label='Create A Date'>
            <CreateADate />
          </Tab>
          <Tab label='Created Dates'>
            <h3>List of Created Dates</h3>
          </Tab>
        </Tabs>
      </TabsContainer>
    )
  }
}