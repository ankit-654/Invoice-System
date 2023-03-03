// import React from "react";
// import axios from "axios";
// import 'bootstrap/dist/css/bootstrap.min.css';

// import {Button,Modal,Row,Col} from "react-bootstrap"
// class Customer extends React.Component{
// constructor(props){
//     super(props);
//     this.state={
//       customer:[],
//       show:false,
//       setShow:false
//     }
//     this.FetchCustomer();
// }
// //// to fetch customers
// FetchCustomer(){
// axios.get("http://localhost:9090/Customers").then(e=>{
//     var data=e.data;
//     console.log(data);
//     this.setState({customer:data})
// })
// }
// //// to add customers
// AddCustomer(){
// var cname=this.refs.customer_name.value;
// var ct=this.refs.city.value;
// var em=this.refs.email_address.value;
// var mn=this.refs.mobile_number.value;
// var st={"customer_name":cname,"city":ct,"email_address":em,"mobile_number":mn};
// console.log(st);
// axios.post("http://localhost:9090/Customers",st).then(e=>{
//     alert(e);
//     this.handleClose();
//     this.FetchCustomer();

// })
// }

// handleShow(){
//     this.setState({show:true})
// }

// handleClose(){
//     this.setState({show:false})
// }

// render(){
//     return(
//         <>
//             <div>

//             {/* <hr/> */}
//             <h4>Customers Data</h4>
//             <hr/>
//             <div>
//                 <Row>
//                     <Col md={10}><input type="text" className="form-control" placeholder="Filter Data"/><br/></Col>
//                     <Col><Button variant="none" style={{backgroundColor:"#AED6F1 ",color:"black"}} onClick={this.handleShow.bind(this)}>Add Customer</Button>

//                     <Modal show={this.state.show} onHide={this.handleClose.bind(this)}>
//                     <Modal.Header closeButton  style={{backgroundColor:"#2E86C1",color:"white"}}>
//                     <Modal.Title closeButton>Add Customer Data </Modal.Title>
//                     </Modal.Header>
//                     <Modal.Body>
//                         <label>Customer Name :</label>
//                         <input type="text" ref="customer_name" className="form-control"/>
//                         <label>City :</label>
//                         <input type="text" ref="city" className="form-control"/>
//                         <label>Email Address :</label>
//                         <input type="text" ref="email_address" className="form-control"/>
//                         <label>Mobile Number :</label>
//                         <input type="text" ref="mobile_number" className="form-control"/>
//                         {/* <label>Customer Name :</label>
//                         <input type="text" ref="customer_name" className="form-control"/> */}
//                     </Modal.Body>
//                     <Modal.Footer>
//                         <Button variant="none" className="btn btn-outline-success" onClick={this.AddCustomer.bind(this)}>Submit</Button>
//                         <Button variant="none" className="btn btn-outline-danger">Close</Button>
//                     </Modal.Footer>
//                     </Modal>
//                     </Col>
//                 </Row>
//             </div>
//             </div>
//             <div>
//                 <table  className="table table-bordered table-hover table-striped">
//                     <thead>
//                         <tr style={{backgroundColor:"#AED6F1",color:"black"}}>
//                             <th>Serial No.</th>
//                             <th>Customer Name</th>
//                             <th>City</th>
//                             <th>Email Address</th>
//                             <th>Mobile Number</th>
//                             <th>Action</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                 {this.state.customer.map((e,k)=>(
//                     <tr key={k}>
//                     <td>{e.customer_id}</td>
//                     <td>{e.customer_name}</td>
//                     <td>{e.city}</td>
//                     <td>{e.email_address}</td>
//                     <td>{e.mobile_number}</td>
//                     </tr>
//                 ))}
//             </tbody>
//                 </table>
//             </div>
//         </>
//     )
// }
// }
// export default Customer



import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { Button, Col, Modal, Row } from "react-bootstrap";
 const Customer = (props) => {
    const [customer , setCustomer]=useState([]);
    const [show,setShow]=useState(false);
    const navigate =useNavigate();
    useEffect(()=>{
        Display();
    },[]);  

    const Display = () => {
        axios.get("http://localhost:9090/Customers").then(e=>{
            console.log(e)
            setCustomer(e.data)
        })

    }

    const txtcustomer_name=useRef();
    const txtcity =useRef();
    const txtemail_address=useRef();
    const txtmobile_number=useRef();

    
    const Submit = () => {
        var customer_name=txtcustomer_name.current.value;
        var city =txtcity.current.value;
        var email_address=txtemail_address.current.value;
        var mobile_number=txtmobile_number.current.value;
        var st={"customer_name":customer_name,"city":city,"email_address":email_address,"mobile_number":mobile_number};
        console.log(st)
            axios.post("http://localhost:9090/Customers",st).then(e=>{
                alert("Data Submitted Succesfully");
                ClearFields();
                setShow(false);
        Display();
            }) 
    }

    const ClearFields = () => {
        txtcustomer_name.current.value="";
        txtcity.current.value="";
        txtemail_address.current.value="";
        txtmobile_number.current.value="";
        }

return(
   <>
    <div>
    <Row>
    <Col md={4}><h4>Customer</h4></Col>
    <Col md={6}></Col>
    <Col md={2}><Button onClick={() => setShow(true)} variant="dark">Add Customer</Button></Col>
    </Row>

                <Modal show={show}>
                    <Modal.Header closeButton  onClick={() => setShow(false)} style={{backgroundColor:"#AED6F1 ",color:"black"}}>
                        <Modal.Title>Customer Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                   <div>
                    <Row>
                        <Col md={1}></Col>
                        <Col md={5}>
                            <label>Customer Name  :</label>
                            <input type="text" ref={txtcustomer_name} className="form-control" />
                            {/* <span></span> */}
                        </Col>
                        <Col md={5}>
                        <label>City  :</label>
                            <input type="text" ref={txtcity} className="form-control" />
                        </Col>
                    </Row><br/>
                    <Row>
                        <Col md={1}></Col>
                        <Col md={5}>
                            <label>Email Address  :</label>
                            <input type="text" ref={txtemail_address} className="form-control" />
                        </Col>
                        <Col md={5}>
                        <label>Mobile Number  :</label>
                            <input type="text" ref={txtmobile_number} className="form-control" />
                        </Col>
                    </Row>

                   </div>
                    
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="none" className="btn btn-success" onClick={() => Submit()}>Submit</Button>
                    <Button variant="none" className="btn btn-danger" onClick={() => setShow(false)}>Close</Button>
                    </Modal.Footer>
                </Modal>
                


    <hr/>
        <table className="table table-bordered table-striped table-hover">
            <thead>
                <tr>
                    <th>Serial no</th>
                    <th>Customer Name</th>
                    <th>City</th>
                    <th>Email Address</th>
                    <th>Mobile Number</th>
                </tr>
            </thead>
            <tbody>
                {customer.map((ele)=>(
                    <tr>
                        <td>{ele.customer_id}</td>
                        <td>{ele.customer_name}</td>
                        <td>{ele.city}</td>
                        <td>{ele.email_address}</td>
                        <td>{ele.mobile_number}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
   </>
)
}
export default Customer