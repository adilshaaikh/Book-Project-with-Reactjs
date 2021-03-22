import './App.css';
import NavigationBars from './component/NavigationBar';
import { Container, Row, Col } from "react-bootstrap";
import Welcome from './component/Welcome';
import Footers from './component/Footer';
import Book from './component/Book/Book';
import BookList from './component/Book/BookList';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import UserList from './component/UserList';
import Register from './component/user/Register';
import Login from './component/user/Login';

function App() {
 
  return (
    <Router>
      <NavigationBars />
      <Container>
        <Row>
          <Col lg={12} style={"margintop"}>
              <Route path="/" exact component={Welcome} />
              <Route path="/add" exact component={Book} />
              <Route path="/edit/:id" exact component={Book} />

              <Route path="/list" exact component={BookList} />
              

              <Route path="/users" exact component={UserList} />
              <Route path="/register" exact component={Register} />
              <Route path="/login" exact component={Login} />




          </Col>
        </Row>
      </Container>
      <Footers />
    </Router>
  );
}

export default App;
