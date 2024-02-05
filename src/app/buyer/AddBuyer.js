import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import {baseURL} from '../../api';
import { useHistory } from "react-router-dom";
import axios from "axios";
import {  NotificationManager,} from "react-notifications";
import MenuItem from "@material-ui/core/MenuItem";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";

const AddBuyer = (props) => {

    let history = useHistory();

    const [buyer, setBuyer] = useState({
        buyer_sort: "",
        buyer_name: "",
        buyer_address: "",
        buyer_gst: "",
        buyer_state: "",
        buyer_statecode: ""
    });

    const onInputChange = (e) => {
        
        setBuyer({
        ...buyer,
        [e.target.name]: e.target.value,
        });
        
    };

    const [isButtonDisabled, setIsButtonDisabled] = React.useState(false);

    useEffect(() => {
        var isLoggedIn = localStorage.getItem("user_type_id");
        if(!isLoggedIn){

        window.location = "/login";
        
        }else{

        }
        
    });

    const [state, setState] = useState([]);
    useEffect(() => {
      var isLoggedIn = localStorage.getItem("user_type_id");
      if(!isLoggedIn){
  
        window.location = "/login";
        
      }else{
  
      }
  
      var theLoginToken = localStorage.getItem('login');       
          
        const requestOptions = {
              method: 'GET', 
              headers: {
                 'Authorization': 'Bearer '+theLoginToken,
              }             
        };     
  
  
      fetch(baseURL+'/web-fetch-state', requestOptions)
      .then(response => response.json())
      .then(data => setState(data.state)); 
    }, []);

    const [statecode, setStateCode] = useState([]);
    useEffect(() => {
      var isLoggedIn = localStorage.getItem("user_type_id");
      if(!isLoggedIn){
  
        window.location = "/login";
        
      }else{
  
      }
  
      var theLoginToken = localStorage.getItem('login');       
          
        const requestOptions = {
              method: 'GET', 
              headers: {
                 'Authorization': 'Bearer '+theLoginToken,
              }             
        };     
  
  
      fetch(baseURL+'/web-fetch-state-by-id/'+buyer.buyer_state, requestOptions)
      .then(response => response.json())
      .then(data => setStateCode(data.statecode)); 
    }, [buyer.buyer_state]);

    const onSubmit = (e) => {
      
        let data = {
            buyer_sort: buyer.buyer_sort,
            buyer_name: buyer.buyer_name,
            buyer_address: buyer.buyer_address ,
            buyer_gst: buyer.buyer_gst,
            buyer_state: buyer.buyer_state,
            buyer_statecode: buyer.buyer_statecode,
        };
        e.preventDefault();
        var v = document.getElementById("addIndiv").checkValidity();
        var v = document.getElementById("addIndiv").reportValidity();
        if (v) {
        setIsButtonDisabled(true)
        axios({
            url: baseURL+"/web-create-buyer",
            method: "POST",
            data,
            headers: {
            Authorization: `Bearer ${localStorage.getItem("login")}`,
            },
        }).then((res) => {
            if(res.data.code == '200'){
                NotificationManager.success("Buyer Created Sucessfully");
                history.push("buyer");
            }else{
                NotificationManager.error("Duplicate Entry");
            }
            
        });
    }
    };

    return(
        <div>
            <div className="page-header">
                <h3 className="page-title"> Add Buyer </h3>
            </div>
            <div className="row">
                <div className="col-md-12 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <form id="addIndiv" autoComplete="off">
                                <div className="row">
                                    <div className="col-sm-12 col-md-12 col-xl-4">
                                        <div className="form-group">
                                            <TextField
                                            fullWidth
                                            required
                                            label="Sort Name"
                                            autoComplete="Name"
                                            name="buyer_sort"
                                            value={buyer.buyer_sort}
                                            onChange={(e) => onInputChange(e)}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-12 col-xl-4">
                                        <div className="form-group">
                                            <TextField
                                            fullWidth
                                            required
                                            label="Buyer Name"
                                            autoComplete="Name"
                                            name="buyer_name"
                                            value={buyer.buyer_name}
                                            onChange={(e) => onInputChange(e)}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-12 col-xl-4">
                                        <div className="form-group">
                                            <TextField
                                            fullWidth
                                            label="GST"
                                            autoComplete="Name"
                                            name="buyer_gst"
                                            value={buyer.buyer_gst}
                                            onChange={(e) => onInputChange(e)}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-12 col-md-12 col-xl-12">
                                        <div className="form-group">
                                            <TextField
                                            fullWidth
                                            label="Address"
                                            autoComplete="Name"
                                            name="buyer_address"
                                            value={buyer.buyer_address}
                                            onChange={(e) => onInputChange(e)}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-12 col-md-12 col-xl-6">
                                        <div className="form-group">
                                            <TextField
                                            fullWidth
                                            label="State"
                                            autoComplete="Name"
                                            name="buyer_state"
                                            SelectProps={{
                                                MenuProps: {},
                                            }}
                                            select
                                            value={buyer.buyer_state}
                                            onChange={(e) => onInputChange(e)}
                                            >
                                                {state.map((fabric, key) => (
                                                <MenuItem key={fabric.state_name} value={fabric.state_name}>
                                                    {fabric.state_name}
                                                </MenuItem>
                                                ))}
                                            </TextField>
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-12 col-xl-6">
                                        <div className="form-group">
                                            <TextField
                                            fullWidth
                                            label="State Code"
                                            autoComplete="Name"
                                            name="buyer_statecode"
                                            SelectProps={{
                                                MenuProps: {},
                                            }}
                                            select
                                            value={buyer.buyer_statecode}
                                            onChange={(e) => onInputChange(e)}
                                            >
                                                {statecode.map((fabric, key) => (
                                                <MenuItem key={fabric.state_code} value={fabric.state_code}>
                                                    {fabric.state_code}
                                                </MenuItem>
                                                ))}
                                            </TextField>
                                        </div>
                                    </div>
                                </div>
                                <Button
              type="submit"
              className="btn btn-gradient-primary mr-2"
              color="primary"
              onClick={(e) => onSubmit(e)}
              disabled={isButtonDisabled}
            >
              Submit
            </Button>
            <Link to="buyer">
              <Button className="btn btn-light" color="success">
              Cancel
              </Button>
            </Link>               
                  
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default AddBuyer;