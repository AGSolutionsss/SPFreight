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

const EditLR = (props) => {

    let history = useHistory();

    const params = useParams();

    const [booking, setBooking] = useState({});

    useEffect(() => {
        var isLoggedIn = localStorage.getItem("user_type_id");
        if(!isLoggedIn){

        window.location = "/signin";
        
        }else{

        }

        axios({
            url: baseURL+"/web-fetch-booking-by-id/" + params.id,
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("login")}`,
            },
          }).then((res) => {
            
            setBooking(res.data.booking)
      
        });
    }, []);

    useEffect(() => {
        var isLoggedIn = localStorage.getItem("user_type_id");
        if(!isLoggedIn){

        window.location = "/signin";
        
        }else{

        }

        axios({
            url: baseURL+"/web-fetch-lr-by-id/" + params.id,
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("login")}`,
            },
          }).then((res) => {
            
            setLR(res.data.lr)
            setUsers(res.data.lrsub);
        });
    }, []);

    
    const useTemplate = {id:"",lr_sub_description:"", lr_sub_quantity:""};
    const [users, setUsers] = useState([useTemplate]);
    
    const onChange = (e, index) =>{
        const updatedUsers = users.map((user, i) => 
        index == i 
        ? Object.assign(user,{[e.target.name]: e.target.value}) 
        : user );
        setUsers(updatedUsers);
    };
    
    const [lr, setLR] = useState({
        
        lr_date: "",
        lr_inv_no: "",
        lr_ewb_no: "",
        consignee_name: "",
        consignee_address: "",
        lr_packing: "",
        lr_remarks: "",
        lr_no_of_sub: "",
        lr_weight: "",
        lr_value: "",
        lr_pay: "",
        lr_to_be_paid: "",
        lr_paid: "",
        lr_sub_data:"",

    });

    const validateOnlyDigits = (inputtxt) => {
        var phoneno = /^\d+$/;
        if(inputtxt.match(phoneno) || inputtxt.length==0){
            return true;
        }else{
            return false;
        }
    }

    const validateOnlyNumber = (inputtxt) => {
        var phoneno = /^\d*\.?\d*$/;
        if(inputtxt.match(phoneno) || inputtxt.length==0){
          return true;
        }else{
            return false;
        }
    }

    const onInputChange = (e) => {
        setLR({
            ...lr,
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

    

    const onUpdate = (e) => {
      
        let data = {
            
            lr_date: lr.lr_date,
            lr_inv_no: lr.lr_inv_no,
            lr_ewb_no: lr.lr_ewb_no ,
            consignee_name: lr.consignee_name,
            consignee_address: lr.consignee_address,
            lr_packing: lr.lr_packing,
            lr_remarks: lr.lr_remarks,
            lr_weight: lr.lr_weight,
            lr_value: lr.lr_value,
            lr_pay: lr.lr_pay,
            lr_to_be_paid: lr.lr_to_be_paid,
            lr_paid: lr.lr_paid,
            lr_no_of_sub: lr.lr_no_of_sub,
            lr_sub_data: users
        };
        e.preventDefault();
        var v = document.getElementById("addIndiv").checkValidity();
        var v = document.getElementById("addIndiv").reportValidity();
        if (v) {
        setIsButtonDisabled(true)
        axios({
            url: baseURL+"/web-update-lr/"+ params.id,
            method: "PUT",
            data,
            headers: {
            Authorization: `Bearer ${localStorage.getItem("login")}`,
            },
        }).then((res) => {
            if(res.data.code == '200'){
                NotificationManager.success("LR Update Sucessfully");
                history.push("/lr");
            }else{
                NotificationManager.error("Duplicate Entry");
            }
            
        });
    }
    };

    return(
        <div>
            <div className="page-header">
                <h3 className="page-title"> Edit LR </h3>
            </div>
            <div className="row">
                <div className="col-md-12 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <form id="addIndiv" autoComplete="off">
                                <div className="row icons-list">
                                    <div className="col-sm-6 col-md-4 col-lg-3">
                                        <span>Booking No :  <b>{booking.booking_no}</b> </span>
                                    </div>
                                    <div className="col-sm-6 col-md-4 col-lg-3">
                                        <span>Vehicle No :  <b>{booking.vehicle_no}</b> </span>
                                    </div>
                                    <div className="col-sm-6 col-md-4 col-lg-3">
                                        <span>From :  <b>{booking.place_from}</b> </span>
                                    </div> 
                                    <div className="col-sm-6 col-md-4 col-lg-3">
                                        <span>To :  <b>{booking.place_to}</b> </span>
                                    </div> 
                                </div>
                                <div className="row icons-list">
                                    <div className="col-sm-6 col-md-4 col-lg-3">
                                        <span>Truck Type :  <b>{booking.vehicle_type}</b> </span>
                                    </div>
                                    <div className="col-sm-6 col-md-4 col-lg-3">
                                        <span>Consignor' s Name :  <b>{booking.buyer_name}</b> </span>
                                    </div>
                                    <div className="col-sm-6 col-md-4 col-lg-3">
                                        <span>Departure Date :  <b>{Moment(booking.order_date).format('DD-MM-YYYY')}</b> </span>
                                    </div> 
                                    <div className="col-sm-6 col-md-4 col-lg-3">
                                        <span>Driver No :  <b>{booking.driver_no}</b> </span>
                                    </div> 
                                </div>
                                <div className="row mt-4">
                                    <div className="col-sm-12 col-md-12 col-xl-3">
                                        <div className="form-group">
                                        <TextField
                                            fullWidth
                                            required
                                            type="date"
                                            label="LR Date"
                                            autoComplete="Name"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            name="lr_date"
                                            value={lr.lr_date}
                                            onChange={(e) => onInputChange(e)}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-12 col-xl-3">
                                        <div className="form-group">
                                            <TextField
                                            fullWidth
                                            required
                                            label="INV No"
                                            autoComplete="Name"
                                            name="lr_inv_no"
                                            value={lr.lr_inv_no}
                                            onChange={(e) => onInputChange(e)}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-12 col-xl-3">
                                        <div className="form-group">
                                            <TextField
                                            fullWidth
                                            required
                                            label="EWB No"
                                            autoComplete="Name"
                                            name="lr_ewb_no"
                                            value={lr.lr_ewb_no}
                                            onChange={(e) => onInputChange(e)}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-12 col-xl-3">
                                        <div className="form-group">
                                            <TextField
                                            fullWidth
                                            required
                                            label="Weight"
                                            autoComplete="Name"
                                            name="lr_weight"
                                            value={lr.lr_weight}
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
                                            label="Consignee's Name"
                                            autoComplete="Name"
                                            name="consignee_name"
                                            value={lr.consignee_name}
                                            onChange={(e) => onInputChange(e)}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-12 col-xl-8">
                                        <div className="form-group">
                                            <TextField
                                            fullWidth
                                            required
                                            label="Address"
                                            autoComplete="Name"
                                            name="consignee_address"
                                            value={lr.consignee_address}
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
                                            label="Packing"
                                            autoComplete="Name"
                                            name="lr_packing"
                                            value={lr.lr_packing}
                                            onChange={(e) => onInputChange(e)}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-12 col-xl-3">
                                        <div className="form-group">
                                            <TextField
                                            fullWidth
                                            required
                                            label="Value"
                                            autoComplete="Name"
                                            name="lr_value"
                                            value={lr.lr_value}
                                            onChange={(e) => onInputChange(e)}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-12 col-xl-2">
                                        <div className="form-group">
                                            <TextField
                                            fullWidth
                                            type="checkbox"
                                            label="To Pay"
                                            autoComplete="Name"
                                            name="lr_pay"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            checked={ lr.lr_pay == 'Yes' ? 'defaultChecked' : ''}
                                            value={lr.lr_pay}
                                            onChange={(e) => onInputChange(e)}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-12 col-xl-2">
                                        <div className="form-group">
                                            <TextField
                                            fullWidth
                                            type="checkbox"
                                            label="To be Paid"
                                            autoComplete="Name"
                                            name="lr_to_be_paid"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            checked={ lr.lr_to_be_paid == 'Yes' ? 'defaultChecked' : ''}
                                            value={lr.lr_to_be_paid}
                                            onChange={(e) => onInputChange(e)}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-12 col-xl-2">
                                        <div className="form-group">
                                            <TextField
                                            fullWidth
                                            type="checkbox"
                                            label="Paid"
                                            autoComplete="Name"
                                            name="lr_paid"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            checked={ lr.lr_paid == 'Yes' ? 'defaultChecked' : ''}
                                            value={lr.lr_paid}
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
                                            label="Remarks"
                                            autoComplete="Name"
                                            name="lr_remarks"
                                            value={lr.lr_remarks}
                                            onChange={(e) => onInputChange(e)}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <hr/>
                                {
                                    users.map((user, index)=> (
                                        <div className="row" key={index}>
                                            <div className="col-sm-12 col-md-12 col-xl-9">
                                                <div className="form-group">
                                                    <TextField
                                                    fullWidth
                                                    label="Description"
                                                    autoComplete="Name"
                                                    name="lr_sub_description"
                                                    value={user.lr_sub_description}
                                                    onChange={e => onChange(e, index)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-sm-12 col-md-12 col-xl-3">
                                                <div className="form-group">
                                                    <TextField
                                                    fullWidth
                                                    label="Quantity"
                                                    autoComplete="Name"
                                                    name="lr_sub_quantity"
                                                    value={user.lr_sub_quantity}
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

export default EditLR;