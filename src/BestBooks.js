import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { withAuth0 } from '@auth0/auth0-react';
import { Card, Jumbotron,Button} from 'react-bootstrap/';
import axios from 'axios';
import './BestBooks.css';
import Model from './components/Model'
// import Jumbotron from 'react-bootstrap/Jumbotron';


class MyFAVORITEBooK extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      TheUsersBooks: [],
     showtheform:false,
      userEmail: ''
    }
  }
 







  
  // let url = `http://localhost:3001/books?userEmail=mamoun.alshishani@yahoo.com`;
  componentDidMount = async () => {
    let url =`${process.env.REACT_APP_SERVER_URL}/books?usermail=${this.props.auth0.user.email}`

    let getData = await axios.get(url);

    await this.setState({
      TheUsersBooks: getData.data,
      
    });

  }

  



  showForm = async () => {
    await this.setState({
      showtheform: true
    })
  }
  CloseTheform = async () => {
    await this.setState({
      showtheform: false
    })
  }

  handletheform = async (event) => {
    event.preventDefault();
    
    await this.setState({
      showtheform: false
    })
    let addbookForm ={
    
    
      
      bookName:event.target.bookName.value,
      email:this.props.auth0.user.email,
      bookDescription:event.target.bookDescription.value,
      bookImg:event.target.bookImg.value,
      bookstatus:event.target.bookstatus.value,
    }
    
    // http://localhost:3001/addbooks?usermail=addbooks
      let url ='http://localhost:3001/books';
      let addRes=  await axios.post(url, addbookForm);
      
      
      await this.setState({
      
        TheUsersBooks:addRes.data
      })
      
      
  }

 


removebooks = async(index)=>{

let paramobject ={

email : this.props.auth0.user.email,


};
const responseremove = await axios.delete(
  `http://localhost:3001/removebooks/${index}`,
  { params: paramobject }
);

await this.setState({
  TheUsersBooks: responseremove.data
  
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
     <Button onClick={this.showForm}>add a book</Button>


     { <Model handletheform={this.handletheform} show={this.state.showtheform} CloseTheform={this.CloseTheform} />}
        

        {  
         this.state.TheUsersBooks.map((ele,index)=> {


            return (
              <>
              <div key={index}>
              <Card className="book" style={{ width: '18rem', backgroundColor: 'lightgrey', boxShadow: '2px 2px 2px black' ,display:'-ms-flexbox'}} >

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
                <Button variant="beware" onClick ={()=> this.removebooks(index)}>remove</Button>
              </Card>
              </div>
              </>
            );
          })}
     
     </Jumbotron>


     </>
    )
  }
}

export default withAuth0(MyFAVORITEBooK);