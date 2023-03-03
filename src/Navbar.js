
import { Nav, Navbar } from "react-bootstrap";

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router,Routes, Route ,Link} from 'react-router-dom'
import { Button,Container,NavDropdown ,Row,Col,ListGroup, ListGroupItem,Modal,Form} from 'react-bootstrap';

function NavbarPage (){
    return(
      <>
        <div>
        <Navbar>
          <Navbar.Brand>Invoice System</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"></Navbar.Toggle>
          <Navbar.Collapse id="basic-navbar-nav">
          <Nav>
            <Nav.Link href="/homepage">Home</Nav.Link>
            <Nav.Link>Home</Nav.Link>
            <Nav.Link>Home</Nav.Link>
            <Nav.Link>Home</Nav.Link>
            <NavDropdown className='nav-link-font-up bg-grey' title="Items" id="basic-nav-dropdown">
            <NavDropdown.Item href="/item1">Item 1</NavDropdown.Item>
            <NavDropdown.Item href="/item2">Item 2</NavDropdown.Item>
          </NavDropdown>
          </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Form>
        <Row>
                    <Col md={2}>
                    <ListGroup>
                    <ListGroupItem className="listgroup-dashboard"><h4><b>DASHBOARD</b></h4></ListGroupItem>
                    <ListGroupItem className="listgroup-dashboard" action ><Link to="/homepage" style={{textDecoration:"none"}}>Customer</Link></ListGroupItem>
                    <ListGroupItem className="listgroup-dashboard" action><Link to="/homepage" style={{textDecoration:"none"}}>Invoice Details</Link></ListGroupItem>
                    <ListGroupItem className="listgroup-dashboard" action><Link to="/homepage" style={{textDecoration:"none"}}>Invoice Payment</Link></ListGroupItem>
                    <ListGroupItem className="listgroup-dashboard" action><Link to="/homepage" style={{textDecoration:"none"}}>Invoice Items</Link></ListGroupItem>
                    <ListGroupItem className="listgroup-dashboard" action><Link to="/homepage" style={{textDecoration:"none"}}>Items</Link></ListGroupItem>
                </ListGroup>
                    </Col>
                </Row>

        </Form>
        </div>
        
      </>

    )
}
export default NavbarPage