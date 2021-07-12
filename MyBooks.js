import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { withAuth0 } from '@auth0/auth0-react';
import {Card,Button} from 'react-bootstrap/'
class MyBooks extends React.Component{

constructor(props){

super(props)

this.state ={

    TheUserEmail:'',
TheUserBooks:[],
ShowUser:false


}

}

componentDidMount = async ()=>{

const{TheUser}= this.props.auth0


await this.setState({
    userEmail:`${TheUser.email}`

})


let Url =`REACT_APP_SERVER_URL/books-can?userEmail=${this.state.userEmail}`

let reData= await axios.get(Url)


await this.setState({
    ShowUser:true,
    TheUserBooks:reData.data

})


}

render(){

return(


<>
<h1>my infromation</h1>

{
          this.state.ShowUser &&
          this.state.userBooks.map(book => {
            return (
                <Card className="book">
  
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
              )
  
            })
  
          }

</>




)




}

}