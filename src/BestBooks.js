import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { withAuth0 } from '@auth0/auth0-react';
import { Card, Jumbotron,} from 'react-bootstrap/'
import axios from 'axios'
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
    let url =`http://localhost:3001/books?usermail=${this.props.auth0.user.email}`

    let getData = await axios.get(url);

    await this.setState({
      TheUsersBooks: getData.data,
      
    });
    
  }



   


    





  render() {


    return (
    <>
    <Jumbotron>
        <h1>My Favorite Books</h1>
        <p>
          This is a collection of my favorite books
        </p>
     
        {  
         this.state.TheUsersBooks.map((ele)=> {


            return (
              <>
              <Card className="book" style={{ width: '18rem', backgroundColor: 'lightgrey', boxShadow: '2px 2px 2px black' }} >

                <Card.Body>
                  <Card.Title>name : {ele.name}</Card.Title>
                  <Card.Img variant="top" src={ele.Img} alt={ele.name} />
                
                  <Card.Text>
                  description : {ele.description}
                  </Card.Text>
                  <Card.Text>
                  status : {ele.status}
                  </Card.Text>
                </Card.Body>
              </Card>
              </>
            );
          })}
     
     </Jumbotron>


     </>
    )
  }
}

export default withAuth0(MyFAVORITEBooK);