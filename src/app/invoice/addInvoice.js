import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import {baseURL} from '../../api';
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import {  NotificationManager,} from "react-notifications";
import MenuItem from "@material-ui/core/MenuItem";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";
import dateyear from "../dateyear";
import Moment from 'moment';
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

const AddInvoice = (props) => {

    let history = useHistory();

    var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0");
  var yyyy = today.getFullYear();

  today = mm + "/" + dd + "/" + yyyy;
  
  var todayback = yyyy + "-" + mm + "-" + dd;

    const [invoice_count, setCount] = useState(1);
    const useTemplate = {inv_sub_lr_no:"", inv_sub_freight_charges:"",inv_sub_unloading_charges:"",inv_sub_halt_charges:"",inv_sub_other_charges:""};
    const [users, setUsers] = useState([useTemplate]);
    const addItem = () => {
        setUsers([...users,useTemplate]);
        setCount(invoice_count + 1);
    }
    const onChange = (e, index) =>{
        const updatedUsers = users.map((user, i) => 
        index == i 
        ? Object.assign(user,{[e.target.name]: e.target.value}) 
        : user );
        setUsers(updatedUsers);
    };
    const removeUser = (index) => {
        const filteredUsers = [...users];
        filteredUsers.splice(index, 1);
        setUsers(filteredUsers);
        setCount(invoice_count - 1);
    }

    const [invoice, setInvoice] = useState({
        inv_year: dateyear,
        inv_date: todayback,
        inv_buyer_name: "",
        inv_period_from: "",
        inv_period_to: "",
        inv_place: "",
        inv_declaration: "",
        inv_no_data: "",
        invoice_sub_data: "",

    });

    const onInputChange = (e) => {
        setInvoice({
            ...invoice,
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

    const [customer, setCustomer] = useState([]);
    useEffect(() => {
        var theLoginToken = localStorage.getItem('login');       
        const requestOptions = {
              method: 'GET', 
              headers: {
                 'Authorization': 'Bearer '+theLoginToken,
              }             
        };     
  
  
      fetch(baseURL+'/web-fetch-buyer', requestOptions)
      .then(response => response.json())
      .then(data => setCustomer(data.buyer)); 
    }, []);

    const [lr, setLR] = useState([]);
    useEffect(() => {
        var theLoginToken = localStorage.getItem('login');       
        const requestOptions = {
              method: 'GET', 
              headers: {
                 'Authorization': 'Bearer '+theLoginToken,
              }             
        };     
  
  
      fetch(baseURL+'/web-fetch-lr', requestOptions)
      .then(response => response.json())
      .then(data => setLR(data.lr)); 
    }, []);

    const onUpdate = (e) => {
      
        let data = {
            inv_year: dateyear,
            inv_date: invoice.inv_date,
            lr_inv_no: invoice.lr_inv_no,
            inv_buyer_name: invoice.inv_buyer_name ,
            inv_period_from: invoice.inv_period_from,
            inv_period_to: invoice.inv_period_to,
            inv_place: invoice.inv_place,
            inv_declaration: invoice.inv_declaration,
            inv_no_data: invoice_count,
            invoice_sub_data: users
        };
        e.preventDefault();
        var v = document.getElementById("addIndiv").checkValidity();
        var v = document.getElementById("addIndiv").reportValidity();
        if (v) {
        setIsButtonDisabled(true)
        axios({
            url: baseURL+"/web-create-invoice",
            method: "POST",
            data,
            headers: {
            Authorization: `Bearer ${localStorage.getItem("login")}`,
            },
        }).then((res) => {
            if(res.data.code == '200'){
                NotificationManager.success("Invoice Created Sucessfully");
                history.push("/invoice");
            }else{
                NotificationManager.error("Duplicate Entry");
            }
            
        });
    }
    };

    return(
        <div>
            <div className="page-header">
                <h3 className="page-title"> Create Invoice </h3>
            </div>
            <div className="row">
                <div className="col-md-12 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <form id="addIndiv" autoComplete="off">
                                <div className="row mt-4">
                                    <div className="col-sm-12 col-md-12 col-xl-4">
                                        <div className="form-group">
                                        <TextField
                                            fullWidth
                                            required
                                            type="date"
                                            label="Invoice Date"
                                            autoComplete="Name"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            name="inv_date"
                                            value={invoice.inv_date}
                                            onChange={(e) => onInputChange(e)}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-12 col-xl-4">
                                        <div className="form-group">
                                            <TextField
                                            fullWidth
                                            required
                                            label="Customer"
                                            autoComplete="Name"
                                            SelectProps={{
                                                MenuProps: {},
                                            }}
                                            select
                                            name="inv_buyer_name"
                                            value={invoice.inv_buyer_name}
                                            onChange={(e) => onInputChange(e)}
                                            >
                                                {customer.map((customerName, key) => (
                                                <MenuItem key={key} value={customerName.buyer_name}>
                                                    {customerName.buyer_name}
                                                </MenuItem>
                                                ))}
                                            </TextField>
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-12 col-xl-4">
                                        <div className="form-group">
                                            <TextField
                                            fullWidth
                                            required
                                            label="Place"
                                            autoComplete="Name"
                                            name="inv_place"
                                            value={invoice.inv_place}
                                            onChange={(e) => onInputChange(e)}
                                            />
                                        </div>
                                    </div>
                                    
                                </div>
                                <div className="row">
                                    <div className="col-sm-12 col-md-12 col-xl-3">
                                        <div className="form-group">
                                            <TextField
                                            fullWidth
                                            required
                                            label="Period From"
                                            autoComplete="Name"
                                            type="date"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            name="inv_period_from"
                                            value={invoice.inv_period_from}
                                            onChange={(e) => onInputChange(e)}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-12 col-xl-3">
                                        <div className="form-group">
                                            <TextField
                                            fullWidth
                                            required
                                            label="Period To"
                                            type="date"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            autoComplete="Name"
                                            name="inv_period_to"
                                            value={invoice.inv_period_to}
                                            onChange={(e) => onInputChange(e)}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-12 col-xl-6">
                                        <div className="form-group">
                                            <TextField
                                            fullWidth
                                            
                                            label="Declaration"
                                            autoComplete="Name"
                                            name="inv_declaration"
                                            value={invoice.inv_declaration}
                                            onChange={(e) => onInputChange(e)}
                                            />
                                        </div>
                                    </div>
                                </div>
                                
                                <hr/>
                                {
                                    users.map((user, index)=> (
                                        <div className="row" key={index}>
                                            <div className="col-sm-12 col-md-12 col-xl-3">
                                                <div className="form-group">
                                                    <TextField
                                                    fullWidth
                                                    label="LR No"
                                                    required
                                                    autoComplete="Name"
                                                    name="inv_sub_lr_no"
                                                    value={user.inv_sub_lr_no}
                                                    SelectProps={{
                                                        MenuProps: {},
                                                    }}
                                                    select
                                                    onChange={e => onChange(e, index)}
                                                    >
                                                {lr.map((lrName, key) => (
                                                <MenuItem key={key} value={lrName.lr_no}>
                                                    {lrName.lr_no}
                                                </MenuItem>
                                                ))}
                                            </TextField>
                                                </div>
                                            </div>
                                            <div className="col-sm-12 col-md-12 col-xl-2">
                                                <div className="form-group">
                                                    <TextField
                                                    fullWidth
                                                    label="Freight Charges"
                                                    autoComplete="Name"
                                                    name="inv_sub_freight_charges"
                                                    value={user.inv_sub_freight_charges}
                                                    onChange={e => onChange(e, index)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-sm-12 col-md-12 col-xl-2">
                                                <div className="form-group">
                                                    <TextField
                                                    fullWidth
                                                    label="Unloading Charges"
                                                    autoComplete="Name"
                                                    name="inv_sub_unloading_charges"
                                                    value={user.inv_sub_unloading_charges}
                                                    onChange={e => onChange(e, index)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-sm-12 col-md-12 col-xl-2">
                                                <div className="form-group">
                                                    <TextField
                                                    fullWidth
                                                    label="Halt Charges"
                                                    autoComplete="Name"
                                                    name="inv_sub_halt_charges"
                                                    value={user.inv_sub_halt_charges}
                                                    onChange={e => onChange(e, index)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-sm-12 col-md-12 col-xl-2">
                                                <div className="form-group">
                                                    <TextField
                                                    fullWidth
                                                    label="Other Charges"
                                                    autoComplete="Name"
                                                    name="inv_sub_other_charges"
                                                    value={user.inv_sub_other_charges}
                                                    onChange={e => onChange(e, index)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-sm-12 col-md-12 col-xl-1">
                                                <IconButton onClick={() => removeUser(index)}>
                                                    <DeleteIcon/>
                                                </IconButton>
                                            </div>
                                        </div>
                                    ))
                                }
                                <div className="row">
                                    <Button
                                        className="btn btn-gradient-primary mr-2"
                                        color="primary"
                                        onClick={(e) => addItem(e)}
                                        disabled={isButtonDisabled}
                                    >
                                        Add More
                                    </Button>
                                </div>
                                
                                <Button
                                    type="submit"
                                    className="btn btn-gradient-primary mr-2"
                                    color="primary"
                                    onClick={(e) => onUpdate(e)}
                                    disabled={isButtonDisabled}
                                    >
                                    Submit
                                    </Button>
                                    <Link to="../booking">
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

export default AddInvoice;