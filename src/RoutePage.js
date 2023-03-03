import React from "react";
import { Nav, Navbar } from "react-bootstrap";

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router,Routes, Route,Link } from 'react-router-dom'
import { Button,Container,NavDropdown ,Row,Col,ListGroup, ListGroupItem,Modal,Form} from 'react-bootstrap';
import NavbarPage from "./Navbar";
import Customer from "./InvoiceSystem/Customer";
import HomePage from "./HomePage";
import InvoiceDetail from "./InvoiceSystem/InvoiceDetail";
import InvoicePayment from "./InvoiceSystem/InvoicePayment";
import InvoiceItem from "./InvoiceSystem/InvoiceItem";
import Items from "./InvoiceSystem/Items";
import PayInvoice from "./InvoiceSystem/PayInvoice"
import AllInvoices from "./InvoiceSystem/AllInvoice";
import './StartPage.css'

// import {  BrowserRouter as Router,Route, Routes } from "react-router-dom";
function RoutePage() {
  return (
    
    <div>
      {/* <NavbarPage/> */}
      <Router>
      <Navbar  style={{backgroundColor:"Black",color:"white"}}>
          <Navbar.Brand style={{color:"white",paddingLeft:"5rem"}}>Invoice System</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"></Navbar.Toggle>
          <Navbar.Collapse id="basic-navbar-nav">
          </Navbar.Collapse>
        </Navbar>
        {/* <br/> */}
        <Form>
        <Row>
                    <Col md={2}  style={{backgroundColor:"black" ,paddingBottom:"19rem"}}>
                    <br/><br/>
                    <ListGroup style={{paddingLeft:"1rem"}}>
                    <ListGroupItem className="listgroup-dashboard"><h5>DASHBOARD</h5></ListGroupItem>                    
                    <ListGroupItem className="listgroup-item"><Link to="/customer" style={{textDecoration:"none",color:"black",textAlign:"right"}}><b>Customer</b></Link></ListGroupItem>
                    <ListGroupItem className="listgroup-item"><Link to="/item" style={{textDecoration:"none",color:"black"}}><b>Items</b></Link></ListGroupItem>
                    <ListGroupItem className="listgroup-item" action><Link to="/invoicedetail" style={{textDecoration:"none",color:"black"}}><b>Invoice Details</b></Link></ListGroupItem>
                     </ListGroup>
                     
                    </Col>
                    <Col md={9}>
                          <Routes>
                            <Route path="/customer" element={<Customer/>}/>
                            <Route path="/invoicedetail" element={<InvoiceDetail/>}/>
                            <Route path="/invoicepayment" element={<InvoicePayment/>}/>
                            <Route path="/invoiceitem" element={<InvoiceItem/>}/>
                            <Route path="/item" element={<Items/>}/>
                            <Route path="/all_invoices" element={<AllInvoices/>}/>
                            <Route path="/payinvoice/:id" element={<PayInvoice/>}/>
                          </Routes>
                    </Col>
                </Row>
              </Form>
      </Router>
    </div>
  )
}

export default RoutePage;
