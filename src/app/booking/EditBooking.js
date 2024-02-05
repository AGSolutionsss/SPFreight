import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import {baseURL} from '../../api';
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import {  NotificationManager,} from "react-notifications";
import MenuItem from "@material-ui/core/MenuItem";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";

const EditBooking = (props) => {

    let history = useHistory();

    const params = useParams();

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

    const [booking, setBooking] = useState({
        vehicle_type: "",
        vendor_name: "",
        vehicle_no: "",
        driver_no: "",
        hired_charges: "",
        tds_charges: "",
        freight_charges: "",
        advance_to_pay: "",
        daily_charges: "",
        booking_status: ""
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
        if(e.target.name=="driver_no"){
            if(validateOnlyDigits(e.target.value)){
                setBooking({
                  ...booking,
                  [e.target.name]: e.target.value,
                });
            }
        }else if(e.target.name=="hired_charges"){
            if(validateOnlyNumber(e.target.value)){
                setBooking({
                  ...booking,
                  [e.target.name]: e.target.value,
                });
            }
        }else if(e.target.name=="tds_charges"){
            if(validateOnlyNumber(e.target.value)){
                setBooking({
                  ...booking,
                  [e.target.name]: e.target.value,
                });
            }
        }else if(e.target.name=="freight_charges"){
            if(validateOnlyNumber(e.target.value)){
                setBooking({
                  ...booking,
                  [e.target.name]: e.target.value,
                });
            }
        }else if(e.target.name=="daily_charges"){
            if(validateOnlyNumber(e.target.value)){
                setBooking({
                  ...booking,
                  [e.target.name]: e.target.value,
                });
            }
        }else if(e.target.name=="advance_to_pay"){
            if(validateOnlyNumber(e.target.value)){
                setBooking({
                  ...booking,
                  [e.target.name]: e.target.value,
                });
            }
        }else{
            setBooking({
                ...booking,
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

    const [vendor, setVendor] = useState([]);
    useEffect(() => {
        var theLoginToken = localStorage.getItem('login');       
        const requestOptions = {
              method: 'GET', 
              headers: {
                 'Authorization': 'Bearer '+theLoginToken,
              }             
        };     
  
  
      fetch(baseURL+'/web-fetch-vendors/'+booking.vehicle_type, requestOptions)
      .then(response => response.json())
      .then(data => setVendor(data.vendor)); 
    }, [booking.vehicle_type]);

    const onUpdate = (e) => {
      
        let data = {
            vehicle_type: booking.vehicle_type,
            vendor_name: booking.vendor_name,
            vehicle_no: booking.vehicle_no,
            driver_no: booking.driver_no ,
            hired_charges: booking.hired_charges,
            tds_charges: booking.tds_charges,
            freight_charges: booking.freight_charges,
            advance_to_pay: booking.advance_to_pay,
            daily_charges: booking.daily_charges,
            booking_status: booking.booking_status
        };
        e.preventDefault();
        var v = document.getElementById("addIndiv").checkValidity();
        var v = document.getElementById("addIndiv").reportValidity();
        if (v) {
        setIsButtonDisabled(true)
        axios({
            url: baseURL+"/web-update-booking/"+ params.id,
            method: "PUT",
            data,
            headers: {
            Authorization: `Bearer ${localStorage.getItem("login")}`,
            },
        }).then((res) => {
            if(res.data.code == '200'){
                NotificationManager.success("Booking Updated Sucessfully");
                history.push("/booking");
            }else{
                NotificationManager.error("Duplicate Entry");
            }
            
        });
    }
    };

    return(
        <div>
            <div className="page-header">
                <h3 className="page-title"> Edit Booking </h3>
            </div>
            <div className="row">
                <div className="col-md-12 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <form id="addIndiv" autoComplete="off">
                                <div className="row">
                                    <div className="col-sm-12 col-md-12 col-xl-6">
                                        <div className="form-group">
                                            <TextField
                                            fullWidth
                                            label="Vendor Name"
                                            autoComplete="Name"
                                            name="vendor_name"
                                            SelectProps={{
                                                MenuProps: {},
                                            }}
                                            select
                                            value={booking.vendor_name}
                                            onChange={(e) => onInputChange(e)}
                                            >
                                                {vendor.map((vendorName, key) => (
                                                <MenuItem key={key} value={vendorName.vendor_company}>
                                                    {vendorName.vendor_company}
                                                </MenuItem>
                                                ))}
                                            </TextField>
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-12 col-xl-3">
                                        <div className="form-group">
                                            <TextField
                                            fullWidth
                                            label="Vehicle No"
                                            autoComplete="Name"
                                            name="vehicle_no"
                                            value={booking.vehicle_no}
                                            onChange={(e) => onInputChange(e)}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-12 col-xl-3">
                                        <div className="form-group">
                                            <TextField
                                            fullWidth
                                            label="Driver No"
                                            autoComplete="Name"
                                            name="driver_no"
                                            value={booking.driver_no}
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
                                            label="Hired Charges"
                                            autoComplete="Name"
                                            name="hired_charges"
                                            value={booking.hired_charges}
                                            onChange={(e) => onInputChange(e)}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-12 col-xl-4">
                                        <div className="form-group">
                                            <TextField
                                            fullWidth
                                            label="TDS Charges"
                                            autoComplete="Name"
                                            name="tds_charges"
                                            value={booking.tds_charges}
                                            onChange={(e) => onInputChange(e)}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-12 col-xl-4">
                                        <div className="form-group">
                                            <TextField
                                            fullWidth
                                            label="Daily Charges"
                                            autoComplete="Name"
                                            name="daily_charges"
                                            value={booking.daily_charges}
                                            onChange={(e) => onInputChange(e)}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-12 col-xl-4">
                                        <div className="form-group">
                                            <TextField
                                            fullWidth
                                            label="Advance To Pay"
                                            autoComplete="Name"
                                            name="advance_to_pay"
                                            value={booking.advance_to_pay}
                                            onChange={(e) => onInputChange(e)}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-12 col-xl-4">
                                        <div className="form-group">
                                            <TextField
                                            fullWidth
                                            label="Freight Charges"
                                            autoComplete="Name"
                                            name="freight_charges"
                                            value={booking.freight_charges}
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

export default EditBooking;