import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import { Button, Col, Row } from "react-bootstrap";
const PayInvoice = (props)=> {
    let {id}=useParams();
    const [invoice, setInvoice]=useState([]);
    const navigate = new useNavigate();
    useEffect(()=> {
        axios.get("http://localhost:9090/invoice_detail/" + id).then(e => {
            console.log(e)
            setInvoice(e.data);
            // console.log(e.data);
        })
    },[]);
    const txtpaymentdate=useRef();
    const txtpaymentamount=useRef();
    const txtpaymentmode=useRef();
    const txtdescription=useRef();


    const Submit = () =>{
        var payment_date=txtpaymentdate.current.value;
        var payment_amount=txtpaymentamount.current.value;
        var payment_mode=txtpaymentmode.current.value;
        var description=txtdescription.current.value;
        var st={"invoice_details":{"invoice_id":id},"payment_date":payment_date,"payment_amount":payment_amount,"payment_mode":payment_mode,"description":description};
       console.log(st)
        axios.post("http://localhost:9090/invoicepayment",st)
        Clear();
        alert("Payment Succesful")
    }

    const Clear = () => {
        txtpaymentdate.current.value="";
        txtpaymentamount.current.value="";
        txtpaymentmode.current.value="";
        txtdescription.current.value="";
    }

return(
    <div className="form-control">
    <Row>
    <Col md={4}></Col>
        <Col md={4} style={{textAlign:"center"}}><h4>INVOICE</h4><hr/></Col>
    </Row>

       <Row>
        <Col md={1}></Col>
        <Col md={5}>
            <label>Invoice Id</label>
            <input type="text" value={invoice.invoice_id}  disabled className="form-control"/>
        </Col>
        <Col md={5}>
        <label>Invoice Date</label>
            <input type="text" value={invoice.invoice_date}  disabled className="form-control"/>
        </Col>
       </Row>
       <Row>
        <Col md={1}></Col>
        <Col md={5}>
            <label>Customer Name</label>
            <input type="text" value={invoice.customer_name}  disabled className="form-control"/>
        </Col>
        <Col md={5}>
        <label>Total Amount</label>
            <input type="text" value={invoice.total_amount}  disabled className="form-control"/>
        </Col>
       </Row>
       <Row>
        <Col md={1}></Col>
        <Col md={5}>
            <label>Remaining Amount</label>
            <input type="text" value={invoice.remaining_amount}  disabled className="form-control"/>
        </Col>
        <Col md={5}>
        <label>Paid Amount</label>
            <input type="text" value={invoice.paid_amount}  disabled className="form-control"/>
        </Col>
       </Row>
       <Row>
        <Col md={1}></Col>
        <Col md={5}>
            <label>Payment Date</label>
            <input type="date" ref={txtpaymentdate}  className="form-control"/>
        </Col>
        <Col md={5}>
        <label>Payment Amount</label>
            <input type="text" ref={txtpaymentamount} className="form-control"/>
        </Col>
       </Row>
       <Row>
        <Col md={1}></Col>
        <Col md={5}>
            <label>Payment Mode</label>
            <input type="text" ref={txtpaymentmode}  className="form-control"/>
        </Col>
        <Col md={5}>
        <label>Description</label>
            <input type="text" ref={txtdescription} className="form-control"/>
        </Col>
       </Row>
       <br/>
       <Row>
        <Col md={1}><Button variant="success" onClick={() => Submit()}>Submit</Button></Col>
        &nbsp;
        <Col md={1}><Button variant="danger" onClick={() => Clear()}>Clear</Button></Col>
       &nbsp;
       <Col md={7}></Col>
        <Col md={2}><Button variant="dark" href="/all_invoices">View Invoices</Button></Col>
       </Row>
      
    </div>
)




}
export default PayInvoice