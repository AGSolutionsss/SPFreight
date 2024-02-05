import React, { useEffect, useState } from "react";
import {baseURL} from '../../api';
import { Link, useParams, useHistory } from "react-router-dom";
import axios from "axios";
import Moment from 'moment';
import { Button } from "reactstrap";
import TextField from "@material-ui/core/TextField";
import {  NotificationManager } from "react-notifications";

const Editpay = (props) => {

    const params = useParams();

    let history = useHistory();

    const [booking, setBooking] = useState([]);

    const [bookings, setBookings] = useState({
        advance_to_pay: "",
        enquiry_pay: "",
        enquiry_pay_date: "",
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
            
            setBooking(res.data.booking);
            setBookings(res.data.booking);
          });
        }, []);

    const [isButtonDisabled, setIsButtonDisabled] = React.useState(false);

    const onInputChange = (e) => {
        
        setBookings({
            ...bookings,
            [e.target.name]: e.target.value,
        });
        
    };

    const onUpdate = (e) => {
      
        let data = {
            enquiry_pay: bookings.enquiry_pay,
            advance_to_pay: bookings.advance_to_pay,
            enquiry_pay_date: bookings.enquiry_pay_date,
        };
        e.preventDefault();
        var v = document.getElementById("addIndiv").checkValidity();
        var v = document.getElementById("addIndiv").reportValidity();
        if (v) {
        setIsButtonDisabled(true)
        axios({
            url: baseURL+"/web-update-payable/"+ params.id,
            method: "PUT",
            data,
            headers: {
            Authorization: `Bearer ${localStorage.getItem("login")}`,
            },
        }).then((res) => {
            if(res.data.code == '200'){
                NotificationManager.success("Payable Updated Sucessfully");
                history.push("/topay");
            }else{
                NotificationManager.error("Duplicate Entry");
            }
            
        });
    }
    };

    return(
        <div>
            <div className="page-header">
                <h3 className="page-title"> Update Payment </h3>
            </div>
            <div className="row">
                <div className="col-md-12 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <div className="row icons-list">
                                <div className="col-sm-6 col-md-4 col-lg-3">
                                   <span>Enquiry Date :  <b>{Moment(booking.enq_date).format('DD-MM-YYYY')}</b> </span>
                                </div>
                                <div className="col-sm-6 col-md-4 col-lg-3">
                                   <span>Booking No :  <b>{booking.booking_no}</b> </span>
                                </div>
                                <div className="col-sm-6 col-md-4 col-lg-3">
                                   <span>Booking Date :  <b>{Moment(booking.booking_date).format('DD-MM-YYYY')}</b> </span>
                                </div> 
                                <div className="col-sm-6 col-md-4 col-lg-3">
                                   <span>Vehicle :  <b>{booking.vehicle_type}</b> </span>
                                </div> 
                            </div>
                            <div className="row icons-list">
                                <div className="col-sm-6 col-md-4 col-lg-3">
                                   <span>Place From :  <b>{booking.place_from}</b> </span>
                                </div> 
                                <div className="col-sm-6 col-md-4 col-lg-3">
                                   <span>Place To :  <b>{booking.place_to}</b> </span>
                                </div> 
                                <div className="col-sm-6 col-md-4 col-lg-3">
                                   <span>Charges From :  <b>{booking.charges_from}</b> </span>
                                </div> 
                                <div className="col-sm-6 col-md-4 col-lg-3">
                                   <span>Charges To :  <b>{booking.charges_to}</b> </span>
                                </div> 
                            </div>
                            <div className="row icons-list">
                                <div className="col-sm-6 col-md-4 col-lg-3">
                                   <span>Departure Date :  <b>{Moment(booking.order_date).format('DD-MM-YYYY')}</b> </span>
                                </div>
                                <div className="col-sm-6 col-md-4 col-lg-3">
                                   <span>Buyer Name :  <b>{booking.buyer_name}</b> </span>
                                </div>
                                <div className="col-sm-6 col-md-4 col-lg-3">
                                   <span>Vendor Name :  <b>{booking.vendor_name}</b> </span>
                                </div>
                                <div className="col-sm-6 col-md-4 col-lg-3">
                                   <span>Vehicle No :  <b>{booking.vehicle_no}</b> </span>
                                </div>
                            </div>
                            <div className="row icons-list">
                                <div className="col-sm-6 col-md-4 col-lg-3">
                                   <span>Driver No :  <b>{booking.driver_no}</b> </span>
                                </div>
                                <div className="col-sm-6 col-md-4 col-lg-3">
                                   <span>Hired Charges :  <b>{booking.hired_charges}</b> </span>
                                </div>
                                <div className="col-sm-6 col-md-4 col-lg-3">
                                   <span>TDS Charges :  <b>{booking.tds_charges}</b> </span>
                                </div>
                                <div className="col-sm-6 col-md-4 col-lg-3">
                                   <span>Daily Charges :  <b>{booking.daily_charges}</b> </span>
                                </div>
                            </div>
                            <div className="row icons-list">
                                <div className="col-sm-6 col-md-4 col-lg-3">
                                   <span>Advance to Pay :  <b>{booking.advance_to_pay}</b> </span>
                                </div>
                                <div className="col-sm-6 col-md-4 col-lg-3">
                                   <span>Freight Charges :  <b>{booking.freight_charges}</b> </span>
                                </div>
                            </div>
                            <div className="row icons-list">
                                 <div className="col-sm-6 col-md-4 col-lg-3">
                                   <span>Reached :  <b> {booking.v_reached_date != null ? Moment(booking.v_reached_date).format('DD-MM-YYYY') : ''} {booking.v_reached_time}</b> </span>
                                </div> 
                                
                                <div className="col-sm-6 col-md-4 col-lg-3">
                                    <span>Loading :  <b> {booking.v_loading_date != null ? Moment(booking.v_loading_date).format('DD-MM-YYYY') : ''} {booking.v_loading_time}</b> </span>
                                </div>
                                
                                <div className="col-sm-6 col-md-4 col-lg-3">
                                    <span>Vehicle Left :  <b> {booking.v_on_way_date != null ? Moment(booking.v_on_way_date).format('DD-MM-YYYY') : ''} {booking.v_on_way_time}</b> </span>
                                </div>
                                
                                <div className="col-sm-6 col-md-4 col-lg-3">
                                    <span>Destination :  <b> {booking.v_reach_destination_date != null ? Moment(booking.v_reach_destination_date).format('DD-MM-YYYY') : ''} {booking.v_reach_destination_time}</b> </span>
                                </div>
                            
                                
                                <div className="col-sm-6 col-md-4 col-lg-3">
                                    <span>Unload :  <b> {booking.v_unload_date != null ? Moment(booking.v_unload_date).format('DD-MM-YYYY') : ''} {booking.v_unload_time}</b> </span>
                                </div>
                                
                                <div className="col-sm-6 col-md-4 col-lg-3">
                                    <span>Release :  <b> {booking.v_vehicle_release_date != null ? Moment(booking.v_vehicle_release_date).format('DD-MM-YYYY') : ''} {booking.v_vehicle_release_time}</b> </span>
                                </div>
                                
                                <div className="col-sm-6 col-md-4 col-lg-3">
                                    <span>Finish :  <b>{booking.v_vehicle_finish}</b> </span>
                                </div>
                                <div className="col-sm-6 col-md-4 col-lg-3">
                                    <span>Status :  <b>{booking.booking_status}</b> </span>
                                </div>
                            </div>
                            
                            <form id="addIndiv" autoComplete="off" className="mt-4">
                            
                                <div className="row">
                                    <div className="col-sm-12 col-md-12 col-xl-4">
                                        <TextField
                                            fullWidth
                                            required
                                            label="Advance To Pay"
                                            autoComplete="Name"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            name="advance_to_pay"
                                            value={bookings.advance_to_pay}
                                            onChange={(e) => onInputChange(e)}
                                            />
                                    </div>
                                    <div className="col-sm-12 col-md-12 col-xl-4">
                                        <TextField
                                            fullWidth
                                            label="Paid"
                                            required
                                            autoComplete="Name"
                                            type="checkbox"
                                            name="enquiry_pay"
                                            value="Yes"
                                            onChange={(e) => onInputChange(e)}
                                            />
                                    </div>
                                    <div className="col-sm-12 col-md-12 col-xl-4">
                                        <TextField
                                            fullWidth
                                            label="Date"
                                            type="date"
                                            required
                                            autoComplete="Name"
                                            name="enquiry_pay_date"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            value={bookings.enquiry_pay_date}
                                            onChange={(e) => onInputChange(e)}
                                            />
                                    </div>
                                    
                                </div>
                                
                            </form>
                            <Button
                                type="submit"
                                className="btn btn-gradient-primary mr-2 mt-4"
                                color="primary"
                                onClick={(e) => onUpdate(e)}
                                disabled={isButtonDisabled}
                                >
                                Update
                            </Button>
                            <Link to="../topay">
                                <Button className="btn btn-light mr-2 mt-4" color="success">
                                    Cancel
                                </Button>
                            </Link> 
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default Editpay;