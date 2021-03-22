import React from 'react';
import { Jumbotron } from "react-bootstrap";

class Welcome extends React.Component {

    render() {
        return (
            <Jumbotron className="bg-dark text-white text-center mt-3">
                <h1>Welcome to Book Store</h1>
               <blockquote className="blockquote mb-0">
                   <p>
                    Good friends,good books and a sleepy conscience:
                    this is the ideal life
                   </p>
               </blockquote>
                <footer className="blockquote-footer">
                    Mark Twaim
                </footer>
            </Jumbotron>
        )
    }
}
export default Welcome;