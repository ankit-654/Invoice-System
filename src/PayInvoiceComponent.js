import axios from "axios";
import React, { useEffect, useRef,useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const PayInvoice = (props) => {
    let { id } = useParams();
    const [invoice, setInvoice] = useState([]);
    const navigate = new useNavigate();
    useEffect(() => {
        axios.get("http://localhost:9090/api/invoice-by-id/" + id).then(e => {
            setInvoice(e.data);
        })
    },[]);
    const txtamount = useRef();
    const txtdescription = useRef();
    const txtdate = useRef();
    const txtmode = useRef();

    const Submit = () => {
        var date = txtdate.current.value;
        var amount = txtamount.current.value;
        var mode = txtmode.current.value;
        var description = txtdescription.current.value;
        var st = {"invoice_details":{"invoice_id":id},"payment_date":date,"payment_amount":amount,"payment_mode":mode,"description":description};
        console.log(st);
        axios.post("http://localhost:9090/api/newpayment",st).then(e=>{
            navigate("/invoice");
        })
    }

    const Clear = () => {
        txtdate.current.value="";
        txtamount.current.value="";
        txtmode.current.value="";
        txtdescription.current.value="";
    }
    return (
        <div>
            <div className="row">
                <div className="col-md-10">
                    <h3>Pay Invoice Page</h3>
                </div>
                <div className="col-md-2">
                    <Button href="/invoice">Back</Button>
                </div>
            </div>
            <hr />
            <div className="form-group">
                <div className="row">
                    <div className="col-md-3">
                        <h5>Customer Name:</h5>
                    </div>
                    <div className="col-md-2">
                        <input type="text" value={invoice.customer_name} disabled className="form-control" />
                    </div>
                    <div className="col-md-3"></div>
                    <div className="col-md-2">
                        <h5>Invoice Date:</h5>
                    </div>
                    <div className="col-md-2">
                        <input type="text" value={invoice.invoice_date} disabled className="form-control" />
                    </div>
                </div>
                <br />
                <div className="row">
                    <div className="col-md-2">
                        <h5>Total Amount:</h5>
                    </div>
                    <div className="col-md-2">
                        <input type="text" value={invoice.total_amount} disabled className="form-control" />
                    </div>
                    <div className="col-md-2">
                        <h5>Paid Amount:</h5>
                    </div>
                    <div className="col-md-2">
                        <input type="text" value={invoice.paid_amount} disabled className="form-control" />
                    </div>
                    <div className="col-md-2">
                        <h5>Remaining Amount:</h5>
                    </div>
                    <div className="col-md-2">
                        <input type="text" value={invoice.remaining_amount} disabled className="form-control" />
                    </div>
                </div>
                <br />
                <div className="row">
                    <div className="col-md-3">
                        <h5>Payable Amount:</h5>
                    </div>
                    <div className="col-md-2">
                        <input type="text" ref={txtamount} className="form-control" />
                    </div>
                    <div className="col-md-3"></div>
                    <div className="col-md-2">
                        <h5>Payment Date:</h5>
                    </div>
                    <div className="col-md-2">
                        <input type="date" ref={txtdate} className="form-control" />
                    </div>
                </div>
                <br />
                <div className="row">
                    <div className="col-md-2">
                        <h5>Description:</h5>
                    </div>
                    <div className="col-md-2">
                        <input type="text" ref={txtdescription} className="form-control" />
                    </div>
                    <div className="col-md-2"></div>
                    <div className="col-md-2">
                        <h5>Payment Mode:</h5>
                    </div>
                    <div className="col-md-2">
                        <input type="text" ref={txtmode} className="form-control" />
                    </div>
                    <div className="col-md-1">
                        <Button  size="md" onClick={() => Submit()}>Pay</Button>
                    </div>
                    <div className="col-md-1">
                        <Button  size="md" onClick={() => Clear()}>Clear</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PayInvoice;