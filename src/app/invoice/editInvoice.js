import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import {baseURL} from '../../api';
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import {  NotificationManager,} from "react-notifications";
import MenuItem from "@material-ui/core/MenuItem";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";

const status = [
    {
      value: "Open",
      label: "Open",
    },
    {
      value: "Close",
      label: "Close",
    },
    {
        value: "Cancel",
        label: "Cancel",
    },
  ];

const EditInvoice = (props) => {

    let history = useHistory();

    const params = useParams();

    const [invoiceSub, setInvoiceSub] = useState({});
    const [invoice, setInvoice] = useState({
        
        inv_date: "",
        inv_buyer_name: "",
        inv_period_from: "",
        inv_period_to: "",
        inv_place: "",
        inv_declaration: "",
        inv_status: "",
        inv_no_data: "",
        invoice_sub_data: "",

    });

    useEffect(() => {
        var isLoggedIn = localStorage.getItem("user_type_id");
        if(!isLoggedIn){

        window.location = "/signin";
        
        }else{

        }

        axios({
            url: baseURL+"/web-fetch-invoice-by-id/" + params.id,
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("login")}`,
            },
          }).then((res) => {
            
            setInvoice(res.data.invoice);
            setUsers(res.data.invoicesub);
      
        });
    }, []);

    const useTemplate = {id:"",inv_sub_lr_no:"", inv_sub_freight_charges:"",inv_sub_unloading_charges:"",inv_sub_halt_charges:"",inv_sub_other_charges:""};
    const [users, setUsers] = useState([useTemplate]);
    
    const onChange = (e, index) =>{
        const updatedUsers = users.map((user, i) => 
        index == i 
        ? Object.assign(user,{[e.target.name]: e.target.value}) 
        : user );
        setUsers(updatedUsers);
    };
    
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

    const onUpdate = (e) => {
      
        let data = {
            
            inv_date: invoice.inv_date,
            inv_buyer_name: invoice.inv_buyer_name,
            inv_period_from: invoice.inv_period_from,
            inv_period_to: invoice.inv_period_to,
            inv_place: invoice.inv_place,
            inv_declaration: invoice.inv_declaration,
            inv_status: invoice.inv_status,
            inv_no_data: invoice.inv_no_data,
            invoice_sub_data: users
        };
        e.preventDefault();
        var v = document.getElementById("addIndiv").checkValidity();
        var v = document.getElementById("addIndiv").reportValidity();
        if (v) {
        setIsButtonDisabled(true)
        axios({
            url: baseURL+"/web-update-invoice/"+ params.id,
            method: "PUT",
            data,
            headers: {
            Authorization: `Bearer ${localStorage.getItem("login")}`,
            },
        }).then((res) => {
            if(res.data.code == '200'){
                NotificationManager.success("Invoice Update Sucessfully");
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
                <h3 className="page-title"> Edit Invoice </h3>
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
                                    <div className="col-sm-12 col-md-12 col-xl-4">
                                        <div className="form-group">
                                            <TextField
                                            fullWidth
                                            required
                                            type="date"
                                            label="Period From"
                                            autoComplete="Name"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            name="inv_period_from"
                                            value={invoice.inv_period_from}
                                            onChange={(e) => onInputChange(e)}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-12 col-xl-4">
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
                                    <div className="col-sm-12 col-md-12 col-xl-4">
                                        <div className="form-group">
                                            <TextField
                                            fullWidth
                                            required
                                            label="Status"
                                            autoComplete="Name"
                                            name="inv_status"
                                            select
                                            SelectProps={{
                                                MenuProps: {},
                                            }}
                                            value={invoice.inv_status}
                                            onChange={(e) => onInputChange(e)}
                                            >
                                            {status.map((statusName, key) => (
                                                <MenuItem key={key} value={statusName.value}>
                                                    {statusName.value}
                                                </MenuItem>
                                                ))}
                                            </TextField>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-12 col-md-12 col-xl-12">
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
                                                    disabled
                                                    autoComplete="Name"
                                                    name="inv_sub_lr_no"
                                                    value={user.inv_sub_lr_no}
                                                    onChange={e => onChange(e, index)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-sm-12 col-md-12 col-xl-2">
                                                <div className="form-group">
                                                    <TextField
                                                    fullWidth
                                                    label="Freight Charge"
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
                                                    label="Unloading Charge"
                                                    autoComplete="Name"
                                                    name="inv_sub_unloading_charges"
                                                    value={user.inv_sub_unloading_charges}
                                                    onChange={e => onChange(e, index)}
                                                    />
                                                    <TextField
                                                    fullWidth
                                                    label="ID"
                                                    autoComplete="Name"
                                                    name="id"
                                                    value={user.id}
                                                    hidden
                                                    onChange={e => onChange(e, index)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-sm-12 col-md-12 col-xl-2">
                                                <div className="form-group">
                                                    <TextField
                                                    fullWidth
                                                    label="Halt Charge"
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
                                                    label="Other Charge"
                                                    autoComplete="Name"
                                                    name="inv_sub_other_charges"
                                                    value={user.inv_sub_other_charges}
                                                    onChange={e => onChange(e, index)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                                
                                
                                <Button
                                    type="submit"
                                    className="btn btn-gradient-primary mr-2"
                                    color="primary"
                                    onClick={(e) => onUpdate(e)}
                                    disabled={isButtonDisabled}
                                    >
                                    Update
                                    </Button>
                                    <Link to="../invoice">
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

export default EditInvoice;