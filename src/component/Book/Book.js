import React from "react";
import { Card, Form, Button, Col } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faList, faPlusSquare, faSave, faUndo } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { connect } from 'react-redux';
import { saveBook,fetchBook,updateBook } from '../../services/books/bookActions';

class Book extends React.Component {

    constructor(props) {
        super(props);

        this.state = this.initialState;
        this.bookChange = this.bookChange.bind(this);
        this.submitBook = this.submitBook.bind(this);
    }
    initialState = {
        id: '', title: '', author: '', coverPhotoUrl: '', isbnNumber: '', price: '', language: ''
    }

    componentDidMount() {
        const bookId = +this.props.match.params.id;
        if (bookId) {
            this.findBookbyId(bookId);
        }
    };

    findBookbyId = (bookId) => {

        this.props.fetchBook(bookId);

        let books=this.props.bookObject.books;

       
        if (books != null) {
            this.setState({
                id: books.id,
                title: books.title,
                author: books.author,
                coverPhotoUrl: books.coverPhotoURL,
                isbnNumber: books.isbnNumber,
                price: books.price,
                language: books.language

            });
        
        }

    
        // axios.get("http://localhost:8081/rest/books/" + bookId)
        //     .then(response => {
        //         if (response.data != null) {
        //             this.setState({
        //                 id: response.data.id,
        //                 title: response.data.title,
        //                 author: response.data.author,
        //                 coverPhotoUrl: response.data.coverPhotoURL,
        //                 isbnNumber: response.data.isbnNumber,
        //                 price: response.data.price,
        //                 language: response.data.language

        //             })
        //         }

        //     }).catch((error) => {
        //         console.error("Error " + error);
        //     });
    }
    resetBook = () => {
        this.setState(() => this.initialState)
    };
    bookList = () => {
        return this.props.history.push("/list");
    };
    submitBook = event => {
        event.preventDefault();
        const book = {
            title: this.state.title,
            author: this.state.author,
            coverPhotoURL: this.state.coverPhotoUrl,
            isbnNumber: this.state.isbnNumber,
            price: this.state.price,
            language: this.state.language
        };
        this.props.saveBook(book);




        // axios.post("http://localhost:8081/rest/books", book)
        // .then(response=>{
        //     console.log("response", response);
        //     if(response.data !=null){
        //         this.setState(this.initialState);
        //         alert("Book Saved Successful");

        //     }
        // })
        setTimeout(() => {
            if(this.props.saveBookObject !=null){
                        this.setState(this.initialState);
                        alert("Book Saved Successful");
        
                    }
        }, 2000);

    }
    updateBook = event => {

        event.preventDefault();
        const book = {
            id: this.state.id,
            title: this.state.title,
            author: this.state.author,
            coverPhotoURL: this.state.coverPhotoUrl,
            isbnNumber: this.state.isbnNumber,
            price: this.state.price,
            language: this.state.language
        };
        console.log("book", book)

        // axios.put("http://localhost:8081/rest/books", book)
        //     .then(response => {
        //         console.log("response", response);
        //         if (response.data != null) {
        //             this.setState(this.initialState);
        //             alert("Book Updated");

        //         }
        //     })
                this.props.updateBook(book);
                setTimeout(() => {
                    if (this.props.updateBookObject != null) {
                                    this.setState(this.initialState);
                                    alert("Book Updated");
                
                                }
                }, 2000);
    };

    bookChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    

    render() {
        const { title, author, coverPhotoUrl, isbnNumber, price, language } = this.state;
        return (
            <Card className=" border border-dark bg-dark text-white">
                <Card.Header>                <FontAwesomeIcon icon={this.state.id ? faEdit : faPlusSquare} />{this.state.id ? " Update Book" : " Add New Book"}</Card.Header>
                <Form onReset={this.resetBook} onSubmit={this.state.id ? this.updateBook : this.submitBook} id="bookFormId">
                    <Card.Body>

                        <Form.Row>
                            <Form.Group as={Col} controlId="formGirdTitle">
                                <Form.Label>Title</Form.Label>
                                <Form.Control type="text" name="title" required autoComplete="off"
                                    value={title}
                                    onChange={this.bookChange}
                                    className="bg-dark text-white"
                                    placeholder="Enter Book Title" />

                            </Form.Group>
                            <Form.Group as={Col} controlId="formGirdAuthor">
                                <Form.Label>Author</Form.Label>
                                <Form.Control type="text" name="author" required autoComplete="off"
                                    value={author}
                                    onChange={this.bookChange}
                                    className="bg-dark text-white"
                                    placeholder="Enter Book Author" />

                            </Form.Group>
                        </Form.Row>


                        <Form.Row>
                            <Form.Group as={Col} controlId="formGirdCoverPhotoUrl">
                                <Form.Label>Cover Photo URL </Form.Label>
                                <Form.Control type="text" name="coverPhotoUrl" required autoComplete="off"
                                    value={coverPhotoUrl}
                                    onChange={this.bookChange}
                                    className="bg-dark text-white"
                                    placeholder="Enter Book Cover Photo URL" />

                            </Form.Group>
                            <Form.Group as={Col} controlId="formGirdISBNNumber" >
                                <Form.Label>ISBN Number</Form.Label>
                                <Form.Control type="number" name="isbnNumber" required autoComplete="off"
                                    value={isbnNumber}
                                    onChange={this.bookChange}
                                    className="bg-dark text-white"
                                    placeholder="Enter Book ISBN Number" />

                            </Form.Group>
                        </Form.Row>


                        <Form.Row>
                            <Form.Group as={Col} controlId="formGirdPrice">
                                <Form.Label>Price</Form.Label>
                                <Form.Control type="number" name="price" required autoComplete="off"
                                    value={price}
                                    onChange={this.bookChange}
                                    className="bg-dark text-white"
                                    placeholder="Enter Book Price" />

                            </Form.Group>
                            <Form.Group as={Col} controlId="formGirdLanguage">
                                <Form.Label>Language</Form.Label>
                                <Form.Control type="textname" name="language" required autoComplete="off"
                                    value={language}
                                    onChange={this.bookChange}
                                    className="bg-dark text-white"
                                    placeholder="Enter Book Language" />

                            </Form.Group>
                        </Form.Row>



                    </Card.Body>
                    <Card.Footer style={{ "textAlign": "right" }}>
                        <Button size="sm" variant="success" type="submit">
                            <FontAwesomeIcon icon={faSave} />{this.state.id ? " Update" : " Save"}
                        </Button>{' '}
                        <Button size="sm" variant="info" type="reset" >
                            <FontAwesomeIcon icon={faUndo} />   Reset
                         </Button>{' '}
                        <Button size="sm" variant="info" type="button" onClick={this.bookList.bind()} >
                            <FontAwesomeIcon icon={faList} />   Book List
                         </Button>
                    </Card.Footer>
                </Form>

            </Card>
        )
    }
}

const x = state => {
    return {
        saveBookObject: state.book,
        bookObject: state.book,
        updateBookObject: state.book


    }
};
const y = dispatch => {
    return {
        saveBook: (book) => dispatch(saveBook(book)),
        fetchBook: (bookId) => dispatch(fetchBook(bookId)),
        updateBook: (book) => dispatch(updateBook(book))

    }
};
export default connect(x, y)(Book);