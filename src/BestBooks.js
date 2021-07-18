import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import axios from 'axios';
import { withAuth0 } from '@auth0/auth0-react';
import { Card, Col, Container, Row, Button } from 'react-bootstrap';
import './BestBooks.css';
import AddBookForm from './components/AddBookForm';


class MyFavoriteBooks extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      userBooks: [],
      show: false,
      showModal: false
    }
  }

  componentDidMount = async () => {

    const { user } = this.props.auth0;

    let userBooks = await axios.get(`http://localhost:3001/books?userEmail=${user.email}`)
    await this.setState({
      userBooks: userBooks.data,
      show: true
    })
    console.log(userBooks.data);
  }

  // ==================> Modal for add book form

  handleModal = () => {
    this.setState({
      showModal: true
    })
  }

  handleClose = () => {
    this.setState({
      showModal: false
    })
  }

  addBook = async (event) => {
    event.preventDefault();

    const { user } = this.props.auth0;

    let addTitle = event.target.addTitle.value;
    let addDescription = event.target.addDescription.value;
    let addImage = event.target.addImage.value;
    let addStatus = event.target.addStatus;
    let email = user.email

    const addBookForm = {
      addTitle: event.target.addTitle.value,
      addDescription: event.target.addDescription.value,
      addImage: event.target.addImage.value,
      addStatus: event.target.addStatus.value,
      email: user.email,
    }
    console.log(addBookForm);

    let userBooks = await axios.post(`http://localhost:3001/book`, addBookForm)

    this.setState({
      userBooks: userBooks.data
    })
    console.log(userBooks.data);
  }

  deleteBook = async (index) => {
    const { user } = this.props.auth0;
    let paramsBook = {
      email: user.email,
    }
    let userBooks = await axios.delete(`http://localhost:3001/deleteBook/${index}`, { params: paramsBook })

    this.setState({
      userBooks: userBooks.data
    })

  }
  render() {
    return (
      <Jumbotron>

        <>
          <h1>My Favorite Books</h1>
          <p>
            This is a collection of my favorite books
          </p>
        </>
        <Button variant="primary" size="lg" onClick={this.handleModal}>
          Add Book
        </Button>

        {this.state.show &&
          this.state.userBooks.map((book, index) => {
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
                        <Button onClick={() => this.deleteBook(index)} variant="primary" size="lg">
                          Delete
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </Container>
            )
          })
        }
        <AddBookForm addBook={this.addBook} handleClose={this.handleClose} handleModal={this.handleModal} show={this.state.showModal} />
      </Jumbotron>
    )
  }
}

export default withAuth0(MyFavoriteBooks);
