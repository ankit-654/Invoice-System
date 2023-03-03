import React from "react";
import axios from "axios";
import { Row ,Col,Button, Modal} from "react-bootstrap";
class Items extends React.Component{
    constructor(props){
        super(props);
        this.state={
          items:[],
          show:false,
          setShow:false
        }
        this.FetchItems();
    }
    FetchItems(){
        axios.get("http://localhost:9090/Items").then(e=>{
            var data=e.data;
            console.log(data);
            this.setState({items:data});
        })
    }

    AddItems(){
        var it=this.refs.item_name.value;
        var pr=this.refs.purchase_rate.value;
        var sr=this.refs.selling_rate.value;
        var t=this.refs.tax.value;
        var sq=this.refs.stock_quantity.value;
        var st={"item_name":it,"purchase_rate":pr,"selling_rate":sr,"tax":t,"stock_quantity":sq};
        console.log(st);
        axios.post("http://localhost:9090/item",st).then(e=>{
            alert(e);
            this.FetchItems();
            this.handleClose();
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
            <h4>Items</h4>
            <hr/>
            <Row>
                <Col md={10}><input type="text" className="form-control" placeholder="Filter Items" /><br/></Col>
                <Col md={2}><Button  variant="dark" onClick={this.handleShow.bind(this)}>Add Items</Button>
                <Modal show={this.state.show} onHide={this.handleClose.bind(this)}>
                    <Modal.Header closeButton  style={{backgroundColor:"#AED6F1 ",color:"black"}}>
                        <Modal.Title>Add Items</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <label>Item Name  :</label>
                    <input type="text" ref="item_name" className="form-control" />
                    <label>Purchase Rate  :</label>
                    <input type="text" ref="purchase_rate" className="form-control" />
                    <label>Selling Rate  :</label>
                    <input type="text" ref="selling_rate" className="form-control" />
                    <label>Tax  :</label>
                    <input type="text" ref="tax" className="form-control" />
                    <label>Stock Quantity  :</label>
                    <input type="text" ref="stock_quantity" className="form-control" />
                    {/* <label>Item Name  :</label>
                    <input type="text" ref="item_name" className="form-control" /> */}
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="none" className="btn btn-outline-success" onClick={this.AddItems.bind(this)}>Submit</Button>
                    <Button variant="none" className="btn btn-outline-danger" onClick={this.handleClose.bind(this)}>Close</Button>
                    </Modal.Footer>
                </Modal>
                </Col>
            </Row>
                <div>
                <table className="table table-bordered table-hover table-striped">
                    <thead  style={{backgroundColor:"rgb(63, 60, 60)",color:"white"}} >
                        <tr>
                            <th>Item ID</th>
                            <th>Item Name</th>
                            <th>Purchase Rate</th>
                            <th>Selling Rate</th>
                            <th>Tax</th>
                            <th>Stock Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.items.map((i,k)=>(
                            <tr key={k}>
                                <td>{i.item_id}</td>
                                <td>{i.item_name}</td>
                                <td>{i.purchase_rate}</td>
                                <td>{i.selling_rate}</td>
                                <td>{i.tax}</td>
                                <td>{i.stock_quantity}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                </div>
            </>
        )
    }
}
export default Items