import React from 'react';
import {
  Grid,
  Search,
  Card,
  Image
} from 'semantic-ui-react';
import '../styles/main.css';


class App extends React.Component {

  render (){
    return (
      <Grid centered columns={7}>
        <Grid.Row className="top">
          <Grid.Column><Search size="large"/></Grid.Column>
        </Grid.Row>
        <Grid.Row className="top">
          <Grid.Column>
            <Card className="card">
              <Image src='https://www.nomadfoods.com/wp-content/uploads/2018/08/placeholder-1-e1533569576673-960x960.png' />
              <Card.Content textAlign="center">
                <Card.Header>Algiers</Card.Header>
                <Card.Meta>Sunny</Card.Meta>
                <Card.Description>29 C</Card.Description>
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default App;
