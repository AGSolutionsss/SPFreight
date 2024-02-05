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

const AddExpenses = (props) => {

    let history = useHistory();

    const params = useParams();

    

    const [expenses, setExpenses] = useState({
        
        lr_freight: "",
        lr_unload: "",
        lr_halt: "",
        lr_other: "",

    });

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
            setExpenses(res.data.booking)
      
        });
    }, []);

    const validateOnlyNumber = (inputtxt) => {
        var phoneno = /^\d*\.?\d*$/;
        if(inputtxt.match(phoneno) || inputtxt.length==0){
          return true;
        }else{
            return false;
        }
    }

    const onInputChange = (e) => {
        if(e.target.name=="lr_freight"){
            if(validateOnlyNumber(e.target.value)){
                setExpenses({
                  ...expenses,
                  [e.target.name]: e.target.value,
                });
            }
        }else if(e.target.name=="lr_unload"){
            if(validateOnlyNumber(e.target.value)){
                setExpenses({
                  ...expenses,
                  [e.target.name]: e.target.value,
                });
            }
        }else if(e.target.name=="lr_halt"){
            if(validateOnlyNumber(e.target.value)){
                setExpenses({
                  ...expenses,
                  [e.target.name]: e.target.value,
                });
            }
        }else if(e.target.name=="lr_other"){
            if(validateOnlyNumber(e.target.value)){
                setExpenses({
                  ...expenses,
                  [e.target.name]: e.target.value,
                });
            }
        }else{
            setExpenses({
                ...expenses,
                [e.target.name]: e.target.value,
            });
        }
        
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
            
            lr_freight: expenses.lr_freight,
            lr_unload: expenses.lr_unload,
            lr_halt: expenses.lr_halt ,
            lr_other: expenses.lr_other,
        };
        e.preventDefault();
        var v = document.getElementById("addIndiv").checkValidity();
        var v = document.getElementById("addIndiv").reportValidity();
        if (v) {
        setIsButtonDisabled(true)
        axios({
            url: baseURL+"/web-update-expenses/"+ params.id,
            method: "PUT",
            data,
            headers: {
            Authorization: `Bearer ${localStorage.getItem("login")}`,
            },
        }).then((res) => {
            if(res.data.code == '200'){
                NotificationManager.success("Expenses Update Sucessfully");
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
                <h3 className="page-title"> Add Expenses </h3>
            </div>
            <div className="row">
                <div className="col-md-12 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <form id="addIndiv" autoComplete="off">
                                <div className="row icons-list">
                                    <div className="col-sm-6 col-md-4 col-lg-3">
                                        <span>Booking No :  <b>{expenses.booking_no}</b> </span>
                                    </div>
                                    <div className="col-sm-6 col-md-4 col-lg-3">
                                        <span>Vehicle No :  <b>{expenses.vehicle_no}</b> </span>
                                    </div>
                                    <div className="col-sm-6 col-md-4 col-lg-3">
                                        <span>From :  <b>{expenses.place_from}</b> </span>
                                    </div> 
                                    <div className="col-sm-6 col-md-4 col-lg-3">
                                        <span>To :  <b>{expenses.place_to}</b> </span>
                                    </div> 
                                </div>
                                <div className="row icons-list">
                                    <div className="col-sm-6 col-md-4 col-lg-3">
                                        <span>Truck Type :  <b>{expenses.vehicle_type}</b> </span>
                                    </div>
                                    <div className="col-sm-6 col-md-4 col-lg-3">
                                        <span>Consignor' s Name :  <b>{expenses.buyer_name}</b> </span>
                                    </div>
                                    <div className="col-sm-6 col-md-4 col-lg-3">
                                        <span>Departure Date :  <b>{Moment(expenses.order_date).format('DD-MM-YYYY')}</b> </span>
                                    </div> 
                                    <div className="col-sm-6 col-md-4 col-lg-3">
                                        <span>Driver No :  <b>{expenses.driver_no}</b> </span>
                                    </div> 
                                </div>
                                <div className="row mt-4">
                                    <div className="col-sm-12 col-md-12 col-xl-3">
                                        <div className="form-group">
                                        <TextField
                                            fullWidth
                                            label="Freight Charges"
                                            autoComplete="Name"
                                            name="lr_freight"
                                            value={expenses.lr_freight}
                                            onChange={(e) => onInputChange(e)}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-12 col-xl-3">
                                        <div className="form-group">
                                            <TextField
                                            fullWidth
                                            
                                            label="Unload Charges"
                                            autoComplete="Name"
                                            name="lr_unload"
                                            value={expenses.lr_unload}
                                            onChange={(e) => onInputChange(e)}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-12 col-xl-3">
                                        <div className="form-group">
                                            <TextField
                                            fullWidth
                                            label="Halt Charges"
                                            autoComplete="Name"
                                            name="lr_halt"
                                            value={expenses.lr_halt}
                                            onChange={(e) => onInputChange(e)}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-12 col-xl-3">
                                        <div className="form-group">
                                            <TextField
                                            fullWidth
                                            required
                                            label="Other Charges"
                                            autoComplete="Name"
                                            name="lr_other"
                                            value={expenses.lr_other}
                                            onChange={(e) => onInputChange(e)}
                                            />
                                        </div>
                                    </div>
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
                                    <Link to="../lr">
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

export default AddExpenses;