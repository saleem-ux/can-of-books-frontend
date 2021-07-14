
  
import React, { Component } from 'react';
import { withAuth0 } from '@auth0/auth0-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card} from 'react-bootstrap/'
class Profile extends Component {
    render() {
        const { user, isAuthenticated } = this.props.auth0;
        
        return (
            <>
                {isAuthenticated &&
                    <>
  <Card className="book" style={{ width: '18rem', backgroundColor: 'lightgrey', boxShadow: '2px 2px 2px black' ,display:'-ms-flexbox'}} >

<Card.Body>
  <Card.Title>Hello {user.name}</Card.Title>
  

  <Card.Text>
  Hello {user.email}
  </Card.Text>
  <Card.Img variant="top" src={user.Img} alt={user.name} />
</Card.Body>
</Card>
                    
                        {/* <div></div> */}
                        {/* <div></div> */}
                    </>
                    
                }
            </>
        );
    }
}

export default withAuth0(Profile);