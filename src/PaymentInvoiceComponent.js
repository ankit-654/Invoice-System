import axios from "axios";
import React from "react";

class PaymentInvoice extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            payment_invoice: []
        }
        this.PaymentInvoice();
    }
    PaymentInvoice() {
        axios({
            url: 'http://localhost:9090/api/invoice-payment',
            method: 'get',
            contentType: 'application/json'
        }).then((d) => {
            // console.log(d);
            this.state.payment_invoice= d.data;
            this.setState({ payment_invoice: this.state.payment_invoice })
        })
    }
    render() {
        return (
            <div>
                <h4>Payment Invoice</h4>
                <hr />
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>Sr No.</th>
                            <th>Payemnt Date</th>
                            <th>Payment Amount</th>
                            <th>Payment Mode</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.payment_invoice.map((d,k)=>(
                            <tr key={k}>
                                <td>{k+1}</td>
                                <td>{d.payment_date}</td>
                                <td>{d.payment_amount}</td>
                                <td>{d.payment_mode}</td>
                                <td>{d.description}</td>
                            </tr>
                        ))
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default PaymentInvoice;