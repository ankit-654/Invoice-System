import React from "react";
import axios from "axios";
import {BiRupee} from "react-icons/bi"
import { Button } from "react-bootstrap";
class AllInvoice extends React.Component{
    constructor(props){
        super(props);
        this.state={
          allinvoice:[]
        }
        this.FetchAllInvoice();
    }
    FetchAllInvoice(){
        axios.get("http://localhost:9090/all_invoices").then(e=>{
            var data=e.data;
            console.log(data)
            this.setState({allinvoice:data})
        })
    }
    
    render(){
        return(
            <div>
                <h4>Invoices</h4>
                <table className="table  table-hover">
                    <thead style={{backgroundColor:"black",color:"white",borderRadius:"5px"}}>
                        <tr>
                            <th>Serial No.</th>
                            <th>Customer Name</th>
                            <th>Invoice Date</th>
                            <th>Total Amount</th>
                            <th>Paid Amount</th>
                            <th>Remaining Amount</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                   <tbody style={{backgroundColor:"skyblue"}}>
                    {this.state.allinvoice.map((a,k)=>(
                        <tr key={k}>
                           <td>{a.invoice_id}</td>
                           {/* <td>{a.customer_id}</td> */}
                           <td>{a.customer_name}</td>
                           <td>{a.invoice_date}</td>
                           <td>{a.total_amount}</td>
                           <td>{a.paid_amount}</td>
                           <td>{a.remaining_amount}</td>
                           <td>{a.status}</td>
                           <td><Button variant="dark"   href={"/payinvoice/"+a.invoice_id}><BiRupee/>   Pay</Button></td>
                        </tr>
                    ))}
                   </tbody>
                </table>
            </div>
        )
    }
}
export default AllInvoice