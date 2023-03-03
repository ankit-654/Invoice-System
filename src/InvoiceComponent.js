import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { Button } from "react-bootstrap";

const Invoice = () => {
    const [allinvoices, setInvoices] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:9090/api/allinvoice").then(e => {
            var data = [];
            e.data.forEach((d, p) => {
                var btnstatus = true;
                if (d.status == "Paid") {
                    btnstatus = false;
                }
                var st = {
                    "invoice_id": d.invoice_id, "customer_id": d.customer_id, "customer_name": d.customer_name, "invoice_date": d.invoice_date, "total_amount": d.total_amount, "paid_amount": d.paid_amount, "remaining_amount": d.remaining_amount, "status": d.status, "btnstatus": btnstatus
                };
                data.push(st);
            })
            setInvoices(data);
        })
    }, []);

    return (
        <div>
            <div className="row">
                <div className="col-md-10">
                    <h3>Invoice Details</h3>
                </div>
                <div className="col-md-2">
                    <Button href="/new-invoice">New Invoice</Button>
                </div>
            </div>
            <hr />
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Invoice Id</th>
                        <th>Customer Name</th>
                        <th>Invoice Date</th>
                        <th>Total Amount</th>
                        <th>Paid Amount</th>
                        <th>Remaining Amount</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        allinvoices.map((d, k) => (
                            <tr key={k}>
                                <td>{d.invoice_id}</td>
                                <td>{d.customer_name}</td>
                                <td>{d.invoice_date}</td>
                                <td>Rs.{d.total_amount}/-</td>
                                <td>Rs.{d.paid_amount}/-</td>
                                <td>Rs.{d.remaining_amount}/-</td>
                                <td>{d.status}</td>
                                <td>
                                <span>
                                    <Button hidden={d.btnstatus} href={"/viewinvoice/" + d.invoice_id}  size="sm">ViewInvoice</Button>
                                    <Button hidden={!d.btnstatus} href={"/payinvoice/" + d.invoice_id}  size="sm">Pay</Button>
                                </span>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Invoice;