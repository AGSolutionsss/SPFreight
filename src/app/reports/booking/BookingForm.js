import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import {baseURL} from '../../../api';
import { useHistory } from "react-router-dom";
import axios from "axios";
import {  NotificationManager,} from "react-notifications";
import { Button } from "reactstrap";
import MenuItem from "@material-ui/core/MenuItem";

const BookingForm = (props) => {

    let history = useHistory();

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0");
    var yyyy = today.getFullYear();

    today = mm + "/" + dd + "/" + yyyy;
    var todayback = yyyy + "-" + mm + "-" + dd;

    const [bookingDownload, setBookingDownload] = useState({
        booking_from_date: "2023-04-01",
        booking_to_date: todayback,
        booking_vendor: "",
        booking_buyer: "",
        booking_status: "",
    });

    const [buyer, setBuyer] = useState([]);

    useEffect(() => {
        axios({
            url: baseURL+"/web-fetch-buyer",
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("login")}`,
            },
          }).then((res) => {
            
            setBuyer(res.data.buyer)
      
          });
    }, []);

    const [vendor, setVendor] = useState([]);
    useEffect(() => {
        var theLoginToken = localStorage.getItem('login');       
        const requestOptions = {
              method: 'GET', 
              headers: {
                 'Authorization': 'Bearer '+theLoginToken,
              }             
        };     
  
  
      fetch(baseURL+'/web-fetch-vendor', requestOptions)
      .then(response => response.json())
      .then(data => setVendor(data.vendor)); 
    }, []);

    const [status, setStatus] = useState([]);
    useEffect(() => {
        var theLoginToken = localStorage.getItem('login');       
        const requestOptions = {
              method: 'GET', 
              headers: {
                 'Authorization': 'Bearer '+theLoginToken,
              }             
        };     
  
  
      fetch(baseURL+'/web-fetch-status', requestOptions)
      .then(response => response.json())
      .then(data => setStatus(data.status)); 
    }, []);

    const onInputChange = (e) => {
        
        setBookingDownload({
        ...bookingDownload,
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

    const onSubmit = (e) => {
      
        let data = {
            booking_from_date: bookingDownload.booking_from_date,
            booking_to_date: bookingDownload.booking_to_date,
            booking_buyer: bookingDownload.booking_buyer,
            booking_vendor: bookingDownload.booking_vendor,
            booking_status: bookingDownload.booking_status,
        };
        e.preventDefault();
        var v = document.getElementById("addIndiv").checkValidity();
        var v = document.getElementById("addIndiv").reportValidity();
        if (v) {
        setIsButtonDisabled(true)
        axios({
            url: baseURL+"/download-booking-report",
            method: "POST",
            data,
            headers: {
            Authorization: `Bearer ${localStorage.getItem("login")}`,
            },
        }).then((res) => {
            const url = window.URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'booking_list.csv');
            document.body.appendChild(link);
            link.click();
            NotificationManager.success("Booking Report is Downloaded Successfully");
            setIsButtonDisabled(false)
            
        }).catch((err) =>{
            NotificationManager.error("Booking Report is Not Downloaded");
            setIsButtonDisabled(false)
        });
    }
    };

    const onReportView = (e) => {
        e.preventDefault();

        localStorage.setItem('booking_from_date',bookingDownload.booking_from_date);
        localStorage.setItem('booking_to_date',bookingDownload.booking_to_date);
        localStorage.setItem('booking_vendor',bookingDownload.booking_vendor);
        localStorage.setItem('booking_buyer',bookingDownload.booking_buyer);
        localStorage.setItem('booking_status',bookingDownload.booking_status);
        history.push("/booksReport");
        
    }

    return(
        <div>
            <div className="page-header">
                <h3 className="page-title"> Booking Report </h3>
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
                                            label="From Date"
                                            type="date"
                                            InputLabelProps={{ shrink: true }}
                                            autoComplete="Name"
                                            name="booking_from_date"
                                            value={bookingDownload.booking_from_date}
                                            onChange={(e) => onInputChange(e)}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-12 col-xl-4">
                                        <div className="form-group">
                                            <TextField
                                            fullWidth
                                            required
                                            label="To Date"
                                            type="date"
                                            InputLabelProps={{ shrink: true }}
                                            autoComplete="Name"
                                            name="booking_to_date"
                                            value={bookingDownload.booking_to_date}
                                            onChange={(e) => onInputChange(e)}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-12 col-xl-4">
                                        <div className="form-group">
                                            <TextField
                                            fullWidth
                                            label="Buyer Name"
                                            autoComplete="Name"
                                            SelectProps={{
                                                MenuProps: {},
                                            }}
                                            select
                                            name="booking_buyer"
                                            value={bookingDownload.booking_buyer}
                                            onChange={(e) => onInputChange(e)}
                                            >
                                                {buyer.map((buyers, key) => (
                                                    <MenuItem key={key} value={buyers.buyer_name}>
                                                        {buyers.buyer_name}
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-12 col-xl-4">
                                        <div className="form-group">
                                            <TextField
                                            fullWidth
                                            label="Vendor Name"
                                            autoComplete="Name"
                                            SelectProps={{
                                                MenuProps: {},
                                            }}
                                            select
                                            name="booking_vendor"
                                            value={bookingDownload.booking_vendor}
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
                                    <div className="col-sm-12 col-md-12 col-xl-4">
                                        <div className="form-group">
                                            <TextField
                                            fullWidth
                                            label="Status"
                                            autoComplete="Name"
                                            SelectProps={{
                                                MenuProps: {},
                                            }}
                                            select
                                            name="booking_status"
                                            value={bookingDownload.booking_status}
                                            onChange={(e) => onInputChange(e)}
                                            >
                                            {status.map((statusName, key) => (
                                                    <MenuItem key={key} value={statusName.status_name}>
                                                        {statusName.status_name}
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-12 col-xl-12">
                                        <div className="form-group">
                                        <Button
                                            type="submit"
                                            className="btn btn-gradient-primary mr-2"
                                            color="primary"
                                            onClick={(e) => onSubmit(e)}
                                            disabled={isButtonDisabled}
                                            >
                                            Download
                                            </Button>
                                            <Button
                                            
                                            className="btn btn-gradient-primary mr-2"
                                            color="primary"
                                            onClick={(e) => onReportView(e)}
                                            disabled={isButtonDisabled}
                                            >
                                            View
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default BookingForm;