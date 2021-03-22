import React from "react";
import{Navbar,Container,Col} from "react-bootstrap";

class Footers extends React.Component{
    render(){
        let fullyear=new Date().getFullYear();
        return(
            <Navbar fixed="bottom" bg="dark" variant="dark">
                <Container>
                    <Col lg={12} className="text-center text-muted">
                        <div>{fullyear}-{fullyear+1}, All Rights Reserved by Avanza</div>
                    </Col>
                </Container>
            </Navbar>
        )
    }
}

export default Footers;