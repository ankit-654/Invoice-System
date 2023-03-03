import React from "react";
import axios from "axios";
export default class NewInvoice extends React.Component{
    
    constructor(props){
        super(props);
        this.state={
            customers:[],
            items:[],
            invoice_items:[],
            item_name:"",
            finaltotal:0,
            textstyle:{
                width:"70px"
            },
            mystyle:{
                'text-align':'right'
            }
        }
        this.GetCustomers();
        this.GetItems();

    }
    GetCustomers(){
        axios.get("http://localhost:9090/api/customer").then(e=>{
            this.state.customers=e.data;
            this.setState({customers:this.state.customers})
        })
    }
    GetItems(){
        axios.get("http://localhost:9090/api/item").then(e=>{
            this.state.items=e.data;
            this.setState({items:this.state.items})
        })
    }

    GetItemById(){
        var id=this.refs.dditem.value;
        axios.get("http://localhost:9090/api/item/"+id).then(e=>{
        var c=e.data;
        this.setState({item_name:c.item_name});
        this.refs.txtrate.value=c.selling_rate;
        this.refs.txttax.value=c.tax;
        this.refs.txtstock.value=c.stock_quantity;
        this.Calculate();
    })
    }

    Calculate(){
        var rate=Number(this.refs.txtrate.value);
        var tax=Number(this.refs.txttax.value);
        var qty=Number(this.refs.txtqty.value);

        var total=(rate+(rate*tax/100))*qty;
        this.refs.txttotal.value=total;
    }
    AddItem(){
        var item_name=this.state.item_name;

        var item_id=this.refs.dditem.value;
        var rate=Number(this.refs.txtrate.value);
        var tax=Number(this.refs.txttax.value);
        var qty=Number(this.refs.txtqty.value);
        var total=Number(this.refs.txttotal.value);
        var final=Number(this.state.finaltotal)+total;
        this.setState({finaltotal:final});
        var st={"item_id":item_id,"item_name":item_name,"rate":rate,"tax":tax,"quantity":qty,"total":total};
        this.state.invoice_items.push(st);
        this.setState({invoice_items:this.state.invoice_items})
    }
    Submit(){

        var date=this.refs.txtdate.value;
        var cid=this.refs.ddcustomer.value;
        var itemdata=[];
        this.state.invoice_items.forEach((d,i)=>{
            var s={"item":{"item_id":d.item_id},"quantity":d.quantity};
            itemdata.push(s);
        })
        var st={"customer":{"customer_id":cid},"invoice_date":date,"total_amount":this.state.finaltotal,"invoiceitem":itemdata};
        console.log(st)
        axios.post("http://localhost:9090/api/generateinvoice",st ).then(e=>{
            console.log(e);
        })
    }
    render(){
        return(
            <div>
                <h4>New Invoice</h4>
                <div className="row">
                    <table className="table">
                        <tbody>
                            <tr>
                                <td>Customer
                                <select ref="ddcustomer">
                                    <option selected disabled>Select Customer</option>
                                    {
                                        this.state.customers.map((c,k)=>(
                                            <option key={k} value={c.customer_id}>{c.customer_name}</option>
                                        ))
                                    }
                                </select>

                                </td>
                                <td>
                                    Invoice Date
                                    <input type="date" ref="txtdate"/>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <hr/>
                    <table className="table">
                        <tbody>
                            <tr>
                                <td>
                                    Item<br/>
                                    <select ref="dditem" onChange={this.GetItemById.bind(this)}>
                                        <option selected disabled>Select Item</option>
                                        {
                                        this.state.items.map((c,k)=>(
                                            <option key={k} value={c.item_id}>{c.item_name}</option>
                                        ))
                                    }
                                    </select>
                                </td>
                                <td>
                                    Rate<br/>
                                    <input type="text" ref="txtrate" style={this.state.textstyle} disabled/>
                                </td>
                                <td>
                                    Tax<br/>
                                    <input type="text" ref="txttax" style={this.state.textstyle}  disabled/>
                                </td>
                                <td>
                                    Stock<br/>
                                    <input type="text" ref="txtstock" style={this.state.textstyle} disabled/>
                                </td>
                                <td>
                                    Quantity<br/>
                                    <input type="text" ref="txtqty" style={this.state.textstyle} onChange={this.Calculate.bind(this)}/>
                                </td>
                                <td>
                                    Total<br/>
                                    <input type="text" ref="txttotal" style={this.state.textstyle} disabled/>
                                </td>
                                <td>
                                     <br/>
                                    <input type="button" value="+"  onClick={this.AddItem.bind(this)} />
                                </td>
                            
                            </tr>
                        </tbody>
                    </table>
                    <hr/>
                    <table class="table table-borderd">
                        <thead>
                            <tr>
                                <th>Sr No</th>
                                <th>Item </th>
                                <th>Rate</th>
                                <th>Tax</th>
                                <th>Quantity</th>
                                <td>Total</td>
                            </tr>

                        </thead>
                        <tbody>
                            {
                                this.state.invoice_items.map((d,k)=>(
                                    <tr key={k}>
                                        <td>{k+1}</td>
                                        <td>{d.item_name}</td>
                                        <td>{d.rate}</td>
                                        <td>{d.tax}</td>
                                        <td>{d.quantity}</td>
                                        <td>{d.total}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colspan="5" style={this.state.mystyle}>Total=</td>
                                <td><b>{this.state.finaltotal}</b></td>
                            </tr>
                        </tfoot>
                    </table>
                    <hr/>
                </div>
                <input type="button" value="Submit" onClick={this.Submit.bind(this)} />

            </div>
        )
    }
}