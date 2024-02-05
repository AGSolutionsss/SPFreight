import React, { useEffect, useState } from "react";
import {baseURL} from '../../api';
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Moment from 'moment';
import { Button } from "reactstrap";

const ViewBooking = (props) => {

    const params = useParams();

    const [booking, setBooking] = useState([]);

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

    return(
        <div>
            <div className="page-header">
                <h3 className="page-title"> View Booking </h3>
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
                            </div>
                            <div className="row icons-list">
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
                            <div className="row icons-list">
                                <div className="col-sm-12 col-md-12 col-lg-12">
                                   <span>Remarks :  <b>{booking.remarks}</b> </span>
                                </div>
                            </div>
                            <Link to="../booking">
                                <Button className="btn btn-gradient-primary mr-2 mt-4" color="success">
                                    Back
                                </Button>
                            </Link> 
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default ViewBooking;