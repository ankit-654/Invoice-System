// import React, { useRef } from "react";
//  import axios from "axios";
// import {useForm} from "react-hook-form"
//  const Validation =(props)=>{
// const {register,handleSubmit, formState: { errors } }=useForm();

// return(
//     <div>
//         {/* <form>
//           <input {...register("username")}  />
//         </form> */}
//     </div>
// )
// }

//  export default Validation;
import React from "react";
class Validation extends React.Component{
  constructor(props){
    super(props);
    this.state={
    
    }
  }
  Submit(){
    var id =this.refs.txtid.value;
    var st={data:{"id":id}};
    console.log(st)
    alert(st)
   
  }
  render(){
    return(
      <div>
      Id <input type="text" ref="txtid" />
      <input  type="button" value="submit" onClick={this.Submit.bind(this)}/>
      </div>
      
    )
  }
} export default Validation