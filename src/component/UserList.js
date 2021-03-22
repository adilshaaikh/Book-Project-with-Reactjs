import React, { Component } from 'react';
import { Alert, Button, Card, FormControl, InputGroup, Table } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFastBackward, faFastForward, faStepBackward, faStepForward, faUsers } from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux';
import { fetchUser } from '../services/users/userActions';
class UserList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [],
            currentPage: 1,
            userPerPage: 5
        }
    };

    componentDidMount() {
        this.props.fetchUser();
    };

    // findAllRandomuser() {
    //     axios.get("https://randomapi.com/api/6de6abfedb24f889e0b5f675edc50deb?fmt=raw&sole")
    //         .then(response => response.data)
    //         .then((data) => {
    //             this.setState({ users: data });
    //         });
    // };

    changePage = event => {
        this.setState({
            [event.target.name]: parseInt(event.target.value)
        });
    };

    firstPage = () => {
        if (this.state.currentPage > 1) {
            this.setState({
                currentPage: 1
            })
        }
    };

    prevPage = () => {
        if (this.state.currentPage > 1) {
            this.setState({
                currentPage: this.state.currentPage - 1
            })
        }

    };
    nextPage = () => {
        if (this.state.currentPage < Math.ceil(this.props.userData.users.length / this.state.userPerPage)) {
            this.setState({
                currentPage: this.state.currentPage + 1
            })
        }
    };
    lastPage = () => {
        if (this.state.currentPage < Math.ceil(this.props.userData.users.length / this.state.userPerPage)) {
            this.setState({
                currentPage: Math.ceil(this.props.userData.users.length / this.state.userPerPage)
            })
        }

    };



    render() {
        const { currentPage, userPerPage } = this.state;
        const lastindex = currentPage * userPerPage;
        const firstindex = lastindex - userPerPage;
        const userData=this.props.userData;
        const users=userData.users;
        const currentUsers = users.slice(firstindex, lastindex);
        const totalpages = users.length / userPerPage;

        const pageNubCss = {
            width: "45px",
            border: "1px solid #17A2B8",
            color: "#17A2B8",
            textAlign: "center",
            fontweight: "bold"
        }
        return (
            <div>
                {userData.error ?
                    <Alert variant="danger">
                        {userData.error}
                    </Alert> :
                    <Card className=" border border-dark bg-dark text-white">
                        <Card.Header> <FontAwesomeIcon icon={faUsers} /> User List</Card.Header>
                        <Card.Body>
                            <Table bordered hover striped variant="dark">
                                <thead>
                                    <tr>
                                        <td>Name</td>
                                        <td>Email</td>
                                        <td>Address</td>
                                        <td>Created</td>
                                        <td>Balance</td>

                                    </tr>
                                </thead>
                                <tbody>
                                    {users.length === 0 ?
                                        <tr align="center">
                                            <td colSpan="5">No Users Avaiable</td>
                                        </tr> :
                                        currentUsers.map((user, index) => (
                                            <tr key={index}>
                                                <td>{user.first}{' '}{user.last}</td>
                                                <td>{user.email}</td>

                                                <td>{user.address}</td>
                                                <td>{user.created}</td>
                                                <td>{user.balance}</td>

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
                                    <FormControl style={pageNubCss} className="bg-dark" name="currentPage"
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
                }

            </div>
        )
    }
}

const x = state => {
    return {
        userData: state.user
    }
};
const y = dispatch => {
    return {
        fetchUser: () => dispatch(fetchUser())
    }
};
export default connect(x, y)(UserList);