import React from "react";
import { Card, Table, Image, ButtonGroup, Button,InputGroup,FormControl } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFastBackward, faFastForward, faList, faStepBackward, faStepForward,faEdit, faTrash
 } from '@fortawesome/free-solid-svg-icons'
 import { connect } from 'react-redux';

import axios from 'axios';
import { Link } from "react-router-dom";
import { deleteBook } from '../../services/books/bookActions';

class BookList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            books: [],
            currentPage: 1,
            bookPerPage: 5
        }
    }
    componentDidMount() {
       this.findAllBooks();
    }
    findAllBooks(){
        fetch("http://localhost:8081/rest/books")
        .then(response => response.json())
        .then((data) => {
            this.setState({ books: data });
        });
    }

    deleteBook(bookId) {
        // axios.delete("	http://localhost:8081/rest/books/" + bookId)
        //     .then(response => {
        //         if (response.data != null) {
        //             alert("Book Delete Successful");
        //             this.setState({
        //                 books: this.state.books.filter(book => book.id !== bookId)
        //             });
        //         }
        //     })

        this.props.deleteBook(bookId)
        if (this.props.deleteBookObject != null) {
                        alert("Book Delete Successful");
                        this.setState({
                            books: this.state.books.filter(book => book.id !== bookId)
                        });
                    }
                

    }

    changePage =event=>{
        this.setState({
            [event.target.name]: parseInt(event.target.value)
        });
    };

    firstPage =()=>{
        if(this.state.currentPage >1){
            this.setState({
                currentPage:1
            })
        }
    };

    prevPage =()=>{
        if(this.state.currentPage >1){
            this.setState({
                currentPage:this.state.currentPage-1
            })
        }
        
    };
    nextPage =() => {
        if(this.state.currentPage < Math.ceil(this.state.books.length/this.state.bookPerPage)){
            this.setState({
                currentPage:this.state.currentPage + 1
            })
        }
    };
    lastPage =()=>{
        if(this.state.currentPage < Math.ceil(this.state.books.length/this.state.bookPerPage)){
            this.setState({
                currentPage: Math.ceil(this.state.books.length/  this.state.bookPerPage)
            })
        }
        
    };



    render() {
        const { books, currentPage, bookPerPage } = this.state;
        const lastindex = currentPage * bookPerPage;
        const firstindex = lastindex - bookPerPage;
        const currentUsers = books.slice(firstindex, lastindex);
        const totalpages = Math.ceil( books.length / bookPerPage);

        const pageNubCss = {
            width: "45px",
            border: "1px solid #17A2B8",
            color: "#17A2B8",
            textAlign: "center",
            fontweight: "bold"
        }
        return (

            <Card className=" border border-dark bg-dark text-white">
                <Card.Header> <FontAwesomeIcon icon={faList} /> Book List</Card.Header>
                <Card.Body>
                    <Table bordered hover striped variant="dark">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Author</th>
                                <th>ISBN Number</th>
                                <th>Price</th>
                                <th>Language</th>
                                <th>Actions</th>

                            </tr>
                        </thead>
                        <tbody>
                            {books.length === 0 ?
                                <tr align="center">
                                    <td colSpan="6"> Books avaiable</td>

                                </tr> :
                                currentUsers.map((book,index) => (
                                    <tr key={index}>
                                        <td>
                                            <Image src={book.coverPhotoURL} roundedCircle width="25" height="25" /> {book.title}
                                        </td>
                                        <td>{book.author}</td>
                                        <td>{book.isbnNumber}</td>
                                        <td>{book.price}</td>
                                        <td>{book.language}</td>
                                        <td>
                                            <ButtonGroup>

                                                <Link to={"edit/"+book.id} className="btn btn-sm btn-outline-primary">
                                                    <FontAwesomeIcon icon={faEdit} />

                                                </Link> {' '}

                                                
                                                < Button size="sm" variant="outline-danger"
                                                    onClick={this.deleteBook.bind(this, book.id)}>
                                                    <FontAwesomeIcon icon={faTrash} />

                                                </Button>
                                            </ButtonGroup>
                                        </td>

                                    </tr>
                                ))
                            }
                        </tbody>
                     
                    </Table>
                </Card.Body>
                <Card.Footer>
                    <div style={{ "float": "left" }}>
                        Showing Page {currentPage} of {totalpages}

                    </div>
                    <div style={{ "float": "right" }}>
                        <InputGroup size="sm">
                            <InputGroup.Prepend>
                                <Button type="button" variant="outline-info" disabled={currentPage === 1 ? true : false}
                                    onClick={this.firstPage}
                                >
                                    <FontAwesomeIcon icon={faFastBackward} />  First
                                </Button>
                                <Button type="button" variant="outline-info" disabled={currentPage === 1 ? true : false}
                                    onClick={this.prevPage}

                                >
                                    <FontAwesomeIcon icon={faStepBackward} />  Prev
                                </Button>
                            </InputGroup.Prepend>
                            <FormControl style={pageNubCss} className="bg-dark"  name="currentPage"
                            value={currentPage} onChange={this.changePage}
                            />
                            <InputGroup.Append>
                                <Button type="button" variant="outline-info" disabled={currentPage === totalpages ? true : false}
                                    onClick={this.nextPage}

                                >
                                    <FontAwesomeIcon icon={faStepForward} /> Next
                                </Button>
                                <Button type="button" variant="outline-info" disabled={currentPage === totalpages ? true : false}
                                    onClick={this.lastPage}

                                >
                                    <FontAwesomeIcon icon={faFastForward} />  Last
                                </Button>
                            </InputGroup.Append>
                        </InputGroup>
                    </div>

                </Card.Footer>
            </Card>
        )
    }
}

const x = state => {
    return {
        deleteBookObject: state.book,
      


    }
};
const y = dispatch => {
    return {
        deleteBook: (bookId) => dispatch(deleteBook(bookId)),
        
    }
};
export default connect(x, y)(BookList);
