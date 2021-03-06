import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
  Segment, 
  Container, 
  Divider, 
  Header, 
  Grid, 
  Button, 
  Icon,
  Confirm 
} from 'semantic-ui-react';
import { deleteEmail } from '../../reducers/email';

class EmailView extends Component {
  state = { open: false }

  show = () => this.setState({ open: true })
  
  handleClose = () => this.setState({ open: false })
  
  handleConfirm = (id) => {
    const { dispatch, history } = this.props;
    dispatch(deleteEmail(id, history));
    this.setState({ open: false });
  }

  render() {
    const { id, header, sender, time, body, filter, category } = this.props.location.state;

    return(
      <Container>
        <br/>
        <Segment raised color='black'>
          <b>Subject:</b> {header}
          <Divider />
          <Grid columns='equal'>
          <Grid.Row>
            <Grid.Column>
              <Header as='h5'>from: {sender}</Header>
            </Grid.Column>
            <Grid.Column>
              <Header as='h5' textAlign='right'>{time}</Header>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Header as='h5'>{filter}</Header>
            </Grid.Column>
            <Grid.Column>
              <Header as='h5' textAlign='right'>{category}</Header>
            </Grid.Column>
          </Grid.Row>
          </Grid>
          <Segment padded='very'>{body}</Segment>
          <Divider />
            <Button animated='vertical' compact color='yellow' >
              <Button.Content hidden>Edit</Button.Content>
              <Button.Content visible>
                <Icon name='edit' />
              </Button.Content>
            </Button> 
            <Button animated='vertical' compact floated='right' color='red' onClick={this.show}>
              <Button.Content hidden>Delete</Button.Content>
              <Button.Content visible>
                <Icon name='delete' />
              </Button.Content>
            </Button>
            <Confirm
              open={this.state.open}
              cancelButton='Never mind'
              confirmButton="Let it Burn 🔥"
              header="You Are About To Obliterate This Email !!!"
              onCancel={this.handleClose}
              onConfirm={() => this.handleConfirm(id)}
            />
        </Segment>  
      </Container> 
    )
  }
}

export default connect()(EmailView);