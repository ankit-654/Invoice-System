import React from "react";
import axios from "axios";
import { Row,Col,Button, Modal } from "react-bootstrap";
class InvoiceDetail extends React.Component{
    constructor(props){
        super(props);
        this.state={
         invoicedetails:[],
         customer:[],
         items:[],
         item_name:"",
         invoice_items:[],
         finaltotal:0,
         show:false,
         setShow:false
         
        }
        this.FetchInvoiceDetails();
        this.FetchCustomer();
        this.FetchItems();
    }
////// FETCH CUSTOMER FOR DROPDOWN
    FetchCustomer(){
        axios.get("http://localhost:9090/Customers").then(e=>{
            var data=e.data;
            // console.log(data);
            this.setState({customer:data})
        })
        }
////// FETCH INVOICE DETAILS
    FetchInvoiceDetails(){
        axios.get("http://localhost:9090/invoice_detail").then(e=>{
            var data=e.data;
            // console.log(data);
            this.setState({invoicedetails:data})
        })
    }

////// FETCH ITEMS
    FetchItems(){
        axios.get("http://localhost:9090/Items").then(e=>{
            var data=e.data;
            // console.log(data);
            this.setState({items:data});
        })
    }

///// ADD ON ONCHANGE FUNCTION ITEM DETAILS
    ItemDetails(){
        var id=this.refs.dditem.value;
        // alert(id)    
        axios.get("http://localhost:9090/item/"+id).then(e=>{
        // console.log(e.data)    
            this.setState({item_name:e.data.item_name})
            this.refs.txtrate.value=(e.data.selling_rate);
            this.refs.txttax.value=(e.data.tax);
            this.refs.txtstock.value=(e.data.stock_quantity);
        })  
    }

 ///// CALCULATE AMOUNT PER QUANTITY   
    Calculate(){
           var r=Number(this.refs.txtrate.value);
           var t=Number(this.refs.txttax.value);
           var q=Number(this.refs.txtquantity.value);
           var total=(((r*t/100)+r)*q);
        //    console.log(total);
           this.refs.txttotal.value=(total);
    }

///// ADD MULTIPLE Invoice
    AddInvoice(){
        
          var item_id=this.refs.dditem.value;
          var item_name=this.state.item_name;
          var rate=this.refs.txtrate.value;
          var tax=this.refs.txttax.value;
          var qty=this.refs.txtquantity.value;
          var total=Number(this.refs.txttotal.value);
        var final=Number(this.state.finaltotal)+total;
        this.setState({finaltotal:final});
          var st={"item_id":item_id,"item_name":item_name,"rate":rate,"tax":tax,"quantity":qty,"total":total}
        //   console.log(st);
          this.state.invoice_items.push(st);
          this.setState({invoice_items:this.state.invoice_items})
    }

    

    Submit(){

        var date=this.refs.txtdate.value;
        var cid=this.refs.ddcustomers.value;
        var itemdata=[];
        this.state.invoice_items.forEach((d,i)=>{
            var s={"item":{"item_id":d.item_id},"quantity":d.quantity};
            itemdata.push(s);
        })
        var st={"customers":{"customer_id":cid},"invoice_date":date,"total_amount":this.state.finaltotal,"invoiceitem":itemdata};
        console.log(st)
        axios.post("http://localhost:9090/invoicedetail",st ).then(e=>{
            console.log(e);
            alert("Submitted")
        })
    }

    handleShow(){
        this.setState({show:true})
    }
    handleClose(){
        this.setState({show:false})
    }
    render(){
        return(
           <>
            <div>
            <Row>
                <Col md={6}> <h4>Invoice Details</h4></Col>
                <Col md={6} style={{textAlign:"right"}}><a href="/all_invoices"><Button variant="dark">View Invoices</Button></a></Col>
            </Row><hr/>
            {/* <h4>Invoice Details</h4><hr/> */}
            
            <Row>
                <Col md={3}><label>Customer ID</label>
                 <select ref="ddcustomers" className="form-control">
                    <option selected disabled>Select Customer</option>
                    {this.state.customer.map((c,k)=>(
                        <option  key={k} value={c.customer_id}>
                         {c.customer_name}
                        </option>
                    ))}
                 </select></Col>
                 <Col md={3}>
                 <label>Invoice Date  :</label>
                 <input type="date"  className="form-control" ref="txtdate"/>
                 </Col>
                 <Col md={3}>
                 <label> Select Item  :</label>
                 <select ref="dditem"  className="form-control" onChange={this.ItemDetails.bind(this)}>
                    <option selected disabled>Select Option</option>
                    {this.state.items.map((i,k)=>(
                        <option key={k} value={i.item_id}>{i.item_name}</option>
                    ))}
                 </select> 
                 </Col>
            </Row>
            <br/>
           {/* <Row>
             <Col> */}
             <Row>
                    <Col md={2}><label>Rate : </label><input type="text" ref="txtrate" disabled className="form-control"/></Col>
                    <Col md={1}><label>Tax : </label><input type="text" ref="txttax" disabled  className="form-control" /></Col>
                    <Col md={2}><label>Stock  :</label><input type="text" ref="txtstock" disabled  className="form-control"/></Col>
                    <Col md={2}><label>Quantity : </label><input type="text" ref="txtquantity"  className="form-control" onChange={this.Calculate.bind(this)}/></Col>
                    <Col md={3}><label>Total  :</label><input type="text" ref="txttotal"  className="form-control"/></Col>
                    <Col md={2}><Button variant="none" className="btn btn-outline-info" style={{marginTop:"1.5rem"}} onClick={this.AddInvoice.bind(this)}>Add</Button><br/></Col> 
             </Row><br/>
               
            {/*  Fetch Invoice */}
                   <Row>
                     <Col>
                        <table className="table table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th>Item ID</th>
                                    <th>Item Name</th>
                                    <th>Rate</th>
                                    <th>Tax</th>
                                    <th>Quantity</th>
                                    <th>Amount</th>
                                </tr>
                            </thead>
                            <tbody style={{scrollbarWidth:"3rem"}}>
                             {this.state.invoice_items.map((a,k)=>(
                                <tr key={k}>
                                    <td>{k+1}</td>
                                    <td>{a.item_name}</td>
                                    <td>{a.rate}</td>
                                    <td>{a.tax}</td>
                                    <td>{a.quantity}</td>
                                    <td>{a.total}</td>
                                </tr>
                             ))}
                            </tbody>
                        </table>
                     </Col>
                   </Row>

                
                <div> 
                    <Button variant="success" onClick={this.Submit.bind(this)}>Submit</Button>&nbsp;
                    <Button variant="danger">Clear</Button>
                    <label style={{paddingLeft:"30rem"}}>Payable Amount  :{this.state.finaltotal}</label>
                </div>
              
            
            {/* </Col>
           </Row> */}

           {/* FETCH ALL INVOICE DETAILS */}
                {/* <table className=" table table-bordered table-hover table-striped">
                    <thead>
                    <tr>
                        <th>Invoice ID</th>
                        <th>Invoice Date</th>
                        <th>Total Amount</th>
                        <th>Customer Name</th>
                    </tr>
                    </thead>
                    <tbody>
                {this.state.invoicedetails.map((e,k)=>(
                    <tr key={k}>
                    <td>{e.invoice_id}</td>
                    <td>{e.invoice_date}</td>
                    <td>{e.total_amount}</td>
                    <td>{e.customers.customer_name}</td>
                    </tr>
                ))}
                    </tbody>
                </table> */}
            </div>
           </>
        )
    }
}
export default InvoiceDetail