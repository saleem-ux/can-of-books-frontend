import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import axios from 'axios';
import { withAuth0 } from '@auth0/auth0-react';
import { Card, Col, Container, Row, Button } from 'react-bootstrap';
import './BestBooks.css';
import AddBookForm from './components/AddBookForm';
import UpdateBookForm from './components/UpdateBookForm';


class MyFavoriteBooks extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      userBooks: [],
      show: false,
      showModal: false,
      showUpdateModal: false,
      index: 0,
      updateTitle: '',
      updateDescription: '',
      updateImage: '',
      updateStatus: '',
    }
  }

  componentDidMount = async () => {

    const { user } = this.props.auth0;

    let userBooks = await axios.get(`${process.env.REACT_APP_BOOK_SERVER}/books?userEmail=${user.email}`)
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

    const addBookForm = {
      addTitle: event.target.addTitle.value,
      addDescription: event.target.addDescription.value,
      addImage: event.target.addImage.value,
      addStatus: event.target.addStatus.value,
      email: user.email,
    }
    console.log(addBookForm);

    let userBooks = await axios.post(`${process.env.REACT_APP_BOOK_SERVER}/book`, addBookForm)

    this.setState({
      userBooks: userBooks.data
    })
    console.log(userBooks.data);
  }

  // ============================ delete book

  deleteBook = async (index) => {
    const { user } = this.props.auth0;
    let paramsBook = {
      email: user.email,
    }
    let userBooks = await axios.delete(`${process.env.REACT_APP_BOOK_SERVER}/deleteBook/${index}`, { params: paramsBook })

    this.setState({
      userBooks: userBooks.data
    })
  }

  // ======================================= update book

  showUpdateForm = async (index) => {
    await this.setState({
      showUpdateModal: true,
      index: index,
      updateTitle: this.state.userBooks[index].name,
      updateDescription: this.state.userBooks[index].description,
      updateImage: this.state.userBooks[index].img,
      updateStatus: this.state.userBooks[index].status,
    })
  }

  handleCloseUpdate = () => {
    this.setState({
      showUpdateModal: false
    })
  }

  updateBook = async (event) => {
    event.preventDefault();
    const { user } = this.props.auth0;

    let updateBookObject = {
      updateTitle: event.target.updateTitle.value,
      updateDescription: event.target.updateDescription.value,
      updateImage: event.target.updateImage.value,
      updateStatus: event.target.updateStatus.value,
      email: user.email,
    }
    let userBooks = await axios.put(`${process.env.REACT_APP_BOOK_SERVER}/updateBook/${this.state.index}`, updateBookObject)

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
                      <Button variant="primary" size="lg" onClick={() => this.showUpdateForm(index)} >
                        Update Book
                      </Button>
                    </Card>
                  </Col>
                </Row>
              </Container>
            )
          })
        }
        <AddBookForm addBook={this.addBook} handleClose={this.handleClose} handleModal={this.handleModal} show={this.state.showModal} />
        <UpdateBookForm
          updateBook={this.updateBook}
          handleClose={this.handleCloseUpdate}
          show={this.state.showUpdateModal}
          updateTitle={this.state.updateTitle}
          updateDescription={this.state.updateDescription}
          updateImage={this.state.updateImage}
          updateStatus={this.state.updateStatus}
        />
      </Jumbotron>
    )
  }
}

export default withAuth0(MyFavoriteBooks);
