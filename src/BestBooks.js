import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import axios from 'axios';
import { withAuth0 } from '@auth0/auth0-react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import './BestBooks.css';
// import Jumbotron from 'react-bootstrap/Jumbotron';


class MyFAVORITEBooK extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      TheUsersBooks: [],
     
      userEmail: ''
    }
  }
 
  // let url = `http://localhost:3001/books?userEmail=${this.props.auth0.user.userEmail}`;
  componentDidMount = async () => {
    let url =`${process.env.REACT_APP_SERVER_URL}/books?usermail=${this.props.auth0.user.email}`

    let getData = await axios.get(url);

    await this.setState({
      TheUsersBooks: getData.data,
      
    });
    
  }



  


class MyFavoriteBooks extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      userBooks: [],
      show: false
    }
  }

  componentDidMount = async () => {

    const { user } = this.props.auth0;

    let userBooks = await axios.get(`${process.env.REACT_APP_BOOK_SERVER}books?userEmail=${user.email}`)
    await this.setState({
      userBooks: userBooks.data,
      show: true
    })
    console.log(userBooks.data);
  }

  render() {
    return (
      <Jumbotron>

        <h1>My Favorite Books</h1>
        <p>
          This is a collection of my favorite books
        </p>

        {this.state.show &&
          this.state.userBooks.map(book => {
            return (
              <Container>
                <Row>
                  <Col>
                    <Card style={{ width: '18rem' }}>
                      <Card.Img variant="top" src={book.img} />
                      <Card.Body>
                        <Card.Title>{book.name}</Card.Title>
                        <Card.Text>
                          {book.description}
                        </Card.Text>
                        <Card.Text>
                          {book.status}
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </Container>
            )
          })
        }
      </Jumbotron>)
  }
}

export default withAuth0(MyFavoriteBooks);
