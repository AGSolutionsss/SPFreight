import React, { useEffect, useState } from "react";
import {baseURL} from '../../api';
import { Link, useParams, useHistory } from "react-router-dom";
import axios from "axios";
import Moment from 'moment';
import { Button } from "reactstrap";
import TextField from "@material-ui/core/TextField";
import {  NotificationManager } from "react-notifications";

const UpdateBooking = (props) => {

    const params = useParams();

    let history = useHistory();

    const [booking, setBooking] = useState([]);

    const [bookings, setBookings] = useState({
        v_reached: "",
        v_reached_date: "",
        v_reached_time: "",
        v_loading: "",
        v_loading_date: "",
        v_loading_time: "",
        v_lr: "",
        v_on_way: "",
        v_on_way_date: "",
        v_on_way_time: "",
        v_reach_destination: "",
        v_reach_destination_date: "",
        v_reach_destination_time: "",
        v_unload: "",
        v_unload_date: "",
        v_unload_time: "",
        v_vehicle_release: "",
        v_vehicle_release_date: "",
        v_vehicle_release_time: "",
        v_vehicle_finish: "",
        booking_status: "",
        remarks: ""
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
            v_reached: bookings.v_reached,
            v_reached_date: bookings.v_reached_date,
            v_reached_time: bookings.v_reached_time,
            v_loading: bookings.v_loading,
            v_loading_date: bookings.v_loading_date,
            v_loading_time: bookings.v_loading_time,
            v_lr: bookings.v_lr,
            v_on_way: bookings.v_on_way,
            v_on_way_date: bookings.v_on_way_date,
            v_on_way_time: bookings.v_on_way_time,
            v_reach_destination: bookings.v_reach_destination,
            v_reach_destination_date: bookings.v_reach_destination_date,
            v_reach_destination_time: bookings.v_reach_destination_time,
            v_unload: bookings.v_unload,
            v_unload_date: bookings.v_unload_date,
            v_unload_time: bookings.v_unload_time,
            v_vehicle_release: bookings.v_vehicle_release,
            v_vehicle_release_date: bookings.v_vehicle_release_date,
            v_vehicle_release_time: bookings.v_vehicle_release_time,
            v_vehicle_finish: bookings.v_vehicle_finish,
            booking_status: bookings.booking_status,
            remarks: bookings.remarks
        };
        e.preventDefault();
        var v = document.getElementById("addIndiv").checkValidity();
        var v = document.getElementById("addIndiv").reportValidity();
        if (v) {
        setIsButtonDisabled(true)
        axios({
            url: baseURL+"/web-update-booking-details/"+ params.id,
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
                <h3 className="page-title"> Update Booking </h3>
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
                                { booking.v_reached === "Yes" ? <div className="col-sm-6 col-md-4 col-lg-3">
                                   <span>Reached :  <b> {booking.v_reached_date != null ? Moment(booking.v_reached_date).format('DD-MM-YYYY') : ''} {booking.v_reached_time}</b> </span>
                                </div> : '' }
                                { booking.v_loading === "Yes" ?
                                <div className="col-sm-6 col-md-4 col-lg-3">
                                    <span>Loading :  <b> {booking.v_loading_date != null ? Moment(booking.v_loading_date).format('DD-MM-YYYY') : ''} {booking.v_loading_time}</b> </span>
                                </div> : '' }
                                { booking.v_on_way === "Yes" ?
                                <div className="col-sm-6 col-md-4 col-lg-3">
                                    <span>Vehicle Left :  <b> {booking.v_on_way_date != null ? Moment(booking.v_on_way_date).format('DD-MM-YYYY') : ''} {booking.v_on_way_time}</b> </span>
                                </div> : '' }
                                { booking.v_reach_destination === "Yes" ?
                                <div className="col-sm-6 col-md-4 col-lg-3">
                                    <span>Destination :  <b> {booking.v_reach_destination_date != null ? Moment(booking.v_reach_destination_date).format('DD-MM-YYYY') : ''} {booking.v_reach_destination_time}</b> </span>
                                </div> : '' }
                            
                                { booking.v_unload === "Yes" ?
                                <div className="col-sm-6 col-md-4 col-lg-3">
                                    <span>Unload :  <b> {booking.v_unload_date != null ? Moment(booking.v_unload_date).format('DD-MM-YYYY') : ''} {booking.v_unload_time}</b> </span>
                                </div> : '' }
                                { booking.v_vehicle_release === "Yes" ?
                                <div className="col-sm-6 col-md-4 col-lg-3">
                                    <span>Release :  <b> {booking.v_vehicle_release_date != null ? Moment(booking.v_vehicle_release_date).format('DD-MM-YYYY') : ''} {booking.v_vehicle_release_time}</b> </span>
                                </div> : '' }
                                { booking.v_vehicle_finish === "Yes" ?
                                <div className="col-sm-6 col-md-4 col-lg-3">
                                    <span>Finish :  <b>{booking.v_vehicle_finish}</b> </span>
                                </div> : '' }
                                <div className="col-sm-6 col-md-4 col-lg-3">
                                    <span>Status :  <b>{booking.booking_status}</b> </span>
                                </div>
                            </div>
                            
                            <form id="addIndiv" autoComplete="off" className="mt-4">
                            { booking.booking_status === "Booked" ? 
                                <div className="row">
                                    <div className="col-sm-12 col-md-12 col-xl-4">
                                        <TextField
                                            fullWidth
                                            label="Reached"
                                            required
                                            autoComplete="Name"
                                            type="checkbox"
                                            name="v_reached"
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
                                            name="v_reached_date"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            value={bookings.v_reached_date}
                                            onChange={(e) => onInputChange(e)}
                                            />
                                    </div>
                                    <div className="col-sm-12 col-md-12 col-xl-4">
                                        <TextField
                                            fullWidth
                                            label="Time"
                                            type="time"
                                            required
                                            autoComplete="Name"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            name="v_reached_time"
                                            value={bookings.v_reached_time}
                                            onChange={(e) => onInputChange(e)}
                                            />
                                    </div>
                                </div>
                                : '' }
                                { booking.booking_status === "Reached" ? 
                                <div className="row">
                                    <div className="col-sm-12 col-md-12 col-xl-4">
                                        <TextField
                                            fullWidth
                                            label="Loading"
                                            required
                                            autoComplete="Name"
                                            type="checkbox"
                                            name="v_loading"
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
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            name="v_loading_date"
                                            value={bookings.v_loading_date}
                                            onChange={(e) => onInputChange(e)}
                                            />
                                    </div>
                                    <div className="col-sm-12 col-md-12 col-xl-4">
                                        <TextField
                                            fullWidth
                                            label="Time"
                                            type="time"
                                            required
                                            autoComplete="Name"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            name="v_loading_time"
                                            value={bookings.v_loading_time}
                                            onChange={(e) => onInputChange(e)}
                                            />
                                    </div>
                                </div>
                                : '' }
                                { booking.booking_status === "Loading" ? 
                                <div className="row">
                                    <div className="col-sm-12 col-md-12 col-xl-4">
                                        <TextField
                                            fullWidth
                                            label="LR"
                                            required
                                            autoComplete="Name"
                                            type="checkbox"
                                            name="v_lr"
                                            value="Yes"
                                            onChange={(e) => onInputChange(e)}
                                            />
                                    </div>
                                </div>
                                : '' }
                                { booking.booking_status === "LR" ? 
                                <div className="row">
                                    <div className="col-sm-12 col-md-12 col-xl-4">
                                        <TextField
                                            fullWidth
                                            label="On Way"
                                            required
                                            autoComplete="Name"
                                            type="checkbox"
                                            name="v_on_way"
                                            value="Yes"
                                            onChange={(e) => onInputChange(e)}
                                            />
                                    </div>
                                    <div className="col-sm-12 col-md-12 col-xl-4">
                                        <TextField
                                            fullWidth
                                            label="Date"
                                            type="date"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            required
                                            autoComplete="Name"
                                            name="v_on_way_date"
                                            value={bookings.v_on_way_date}
                                            onChange={(e) => onInputChange(e)}
                                            />
                                    </div>
                                    <div className="col-sm-12 col-md-12 col-xl-4">
                                        <TextField
                                            fullWidth
                                            label="Time"
                                            type="time"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            required
                                            autoComplete="Name"
                                            name="v_on_way_time"
                                            value={bookings.v_on_way_time}
                                            onChange={(e) => onInputChange(e)}
                                            />
                                    </div>
                                </div>
                                : '' }
                                { booking.booking_status === "On Way" ? 
                                <div className="row">
                                    <div className="col-sm-12 col-md-12 col-xl-4">
                                        <TextField
                                            fullWidth
                                            label="Reach Destination"
                                            required
                                            autoComplete="Name"
                                            type="checkbox"
                                            name="v_reach_destination"
                                            value="Yes"
                                            onChange={(e) => onInputChange(e)}
                                            />
                                    </div>
                                    <div className="col-sm-12 col-md-12 col-xl-4">
                                        <TextField
                                            fullWidth
                                            label="Date"
                                            type="date"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            required
                                            autoComplete="Name"
                                            name="v_reach_destination_date"
                                            value={bookings.v_reach_destination_date}
                                            onChange={(e) => onInputChange(e)}
                                            />
                                    </div>
                                    <div className="col-sm-12 col-md-12 col-xl-4">
                                        <TextField
                                            fullWidth
                                            label="Time"
                                            type="time"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            required
                                            autoComplete="Name"
                                            name="v_reach_destination_time"
                                            value={bookings.v_reach_destination_time}
                                            onChange={(e) => onInputChange(e)}
                                            />
                                    </div>
                                </div>
                                : '' }
                                { booking.booking_status === "Reach Destination" ? 
                                <div className="row">
                                    <div className="col-sm-12 col-md-12 col-xl-4">
                                        <TextField
                                            fullWidth
                                            label="Unload"
                                            required
                                            autoComplete="Name"
                                            type="checkbox"
                                            name="v_unload"
                                            value="Yes"
                                            onChange={(e) => onInputChange(e)}
                                            />
                                    </div>
                                    <div className="col-sm-12 col-md-12 col-xl-4">
                                        <TextField
                                            fullWidth
                                            label="Date"
                                            type="date"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            required
                                            autoComplete="Name"
                                            name="v_unload_date"
                                            value={bookings.v_unload_date}
                                            onChange={(e) => onInputChange(e)}
                                            />
                                    </div>
                                    <div className="col-sm-12 col-md-12 col-xl-4">
                                        <TextField
                                            fullWidth
                                            label="Time"
                                            type="time"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            required
                                            autoComplete="Name"
                                            name="v_unload_time"
                                            value={bookings.v_unload_time}
                                            onChange={(e) => onInputChange(e)}
                                            />
                                    </div>
                                </div>
                                : '' }
                                { booking.booking_status === "Unload" ? 
                                <div className="row">
                                    <div className="col-sm-12 col-md-12 col-xl-4">
                                        <TextField
                                            fullWidth
                                            label="Vehicle Release"
                                            required
                                            autoComplete="Name"
                                            type="checkbox"
                                            name="v_vehicle_release"
                                            value="Yes"
                                            onChange={(e) => onInputChange(e)}
                                            />
                                    </div>
                                    <div className="col-sm-12 col-md-12 col-xl-4">
                                        <TextField
                                            fullWidth
                                            label="Date"
                                            type="date"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            required
                                            autoComplete="Name"
                                            name="v_vehicle_release_date"
                                            value={bookings.v_vehicle_release_date}
                                            onChange={(e) => onInputChange(e)}
                                            />
                                    </div>
                                    <div className="col-sm-12 col-md-12 col-xl-4">
                                        <TextField
                                            fullWidth
                                            label="Time"
                                            type="time"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            required
                                            autoComplete="Name"
                                            name="v_vehicle_release_time"
                                            value={bookings.v_vehicle_release_time}
                                            onChange={(e) => onInputChange(e)}
                                            />
                                    </div>
                                </div>
                                : '' }
                                { booking.booking_status === "Release" ? 
                                <div className="row">
                                    <div className="col-sm-12 col-md-12 col-xl-4">
                                        <TextField
                                            fullWidth
                                            label="Finish"
                                            required
                                            autoComplete="Name"
                                            type="checkbox"
                                            name="v_vehicle_finish"
                                            value="Yes"
                                            onChange={(e) => onInputChange(e)}
                                            />
                                    </div>
                                </div>
                                : '' }
                                <div className="row">
                                    <div className="col-sm-12 col-md-12 col-xl-12">
                                        <TextField
                                            fullWidth
                                            label="Remarks"
                                            autoComplete="Name"
                                            name="remarks"
                                            value={bookings.remarks}
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
                            <Link to="../booking">
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

export default UpdateBooking;