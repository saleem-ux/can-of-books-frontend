import React from 'react'
import { Modal, Button, Form } from 'react-bootstrap/';


class addingModel extends React.Component {
    render() {
        return (
            <div>
                <Modal show={this.props.show} onHide={this.props.CloseTheform} >
                    <Modal.Header closeButton>
                        <Modal.Title>Add a Book</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>  
                        <Form onSubmit={this.props.handletheform}>
                            <Form.Group className="formstyle" >
                                <Form.Label>your book Name</Form.Label>
                                <Form.Control type="text" placeholder="write the book name" name="bookName" />
                            </Form.Group>

                            <Form.Group className="formstyle" >
                                <Form.Label>Books Description</Form.Label>
                                <Form.Control type="text" placeholder="write Description for the book" name="bookDescription" />
                            </Form.Group>

                            <Form.Group className="formstyle" >
                                <Form.Label>Books Status</Form.Label>
                                <Form.Control type="text" placeholder="Status" name="bookstatus" />
                            </Form.Group>

                            <Form.Group className="formstyle" >
                                <Form.Label>Books Image</Form.Label>
                                <Form.Control type="text" placeholder="Image Link here" name="bookImg" />
                            </Form.Group>
                             <Modal.Footer>
                                <Button variant="secondary" onClick={this.props.CloseTheform}>
                                    Close
                                </Button>
                                <Button variant="done" type="submit" >
                                    Add the book
                                </Button>
                            </Modal.Footer>
                        </Form>
                    </Modal.Body>
                </Modal>
            </div>
        )
    }
}

export default addingModel