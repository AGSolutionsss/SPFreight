import React, { useEffect, useState } from "react";
import {baseURL} from '../../api';
import { useHistory } from "react-router-dom";
import axios from "axios";
import dateyear from "../dateyear";
import Moment from 'moment';

const Dashboard = (props) => {

    let history = useHistory();

    const [dashboard, setDashboard] = useState([]);

    const [recntEnquiry, setRecentEnquiry] = useState([]);

    useEffect(() => {
        var isLoggedIn = localStorage.getItem("user_type_id");
        if(!isLoggedIn){

        window.location = "/login";
        
        }else{

        }
        
    });

    useEffect(() => {
      axios({
          url: baseURL+"/web-fetch-dashboard/" + dateyear,
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("login")}`,
          },
        }).then((res) => {
          
          setDashboard(res.data);
          setRecentEnquiry(res.data.enquiry_recent);
    
        });
      }, []);

    return(
        <div>
            <div className="page-header">
                <h3 className="page-title">
                <span className="page-title-icon bg-gradient-primary text-white mr-2">
                <i className="mdi mdi-home"></i>
                </span> Dashboard </h3>
            </div>
            <div className="row">
                <div className="col-md-3 stretch-card grid-margin" style={{height:'150px'}}>
                    <div className="card bg-gradient-danger card-img-holder text-white">
                    <div className="card-body">
                        <img src={require("../../assets/images/dashboard/circle.svg")} className="card-img-absolute" alt="circle" />
                        <h4 className="font-weight-normal mb-3">Total Enquiry <i className="mdi mdi-chart-line mdi-24px float-right"></i>
                        </h4>
                        <h2 className="mb-5">{dashboard.enquiry_count}</h2>
                    </div>
                    </div>
                </div>
                <div className="col-md-3 stretch-card grid-margin" style={{height:'150px'}}>
                    <div className="card bg-gradient-info card-img-holder text-white">
                    <div className="card-body">
                        <img src={require("../../assets/images/dashboard/circle.svg")} className="card-img-absolute" alt="circle" />
                        <h4 className="font-weight-normal mb-3">Total Booking <i className="mdi mdi-bookmark-outline mdi-24px float-right"></i>
                        </h4>
                        <h2 className="mb-5">{dashboard.booking_count}</h2>
                    </div>
                    </div>
                </div>
                <div className="col-md-3 stretch-card grid-margin" style={{height:'150px'}}>
                    <div className="card bg-gradient-success card-img-holder text-white">
                    <div className="card-body">
                        <img src={require("../../assets/images/dashboard/circle.svg")} className="card-img-absolute" alt="circle" />
                        <h4 className="font-weight-normal mb-3">Total Process <i className="mdi mdi-diamond mdi-24px float-right"></i>
                        </h4>
                        <h2 className="mb-5">{dashboard.booking_process}</h2>
                    </div>
                    </div>
                </div>
                <div className="col-md-3 stretch-card grid-margin" style={{height:'150px'}}>
                    <div className="card bg-gradient-primary card-img-holder text-white">
                    <div className="card-body">
                        <img src={require("../../assets/images/dashboard/circle.svg")} className="card-img-absolute" alt="circle" />
                        <h4 className="font-weight-normal mb-3">Total Complete <i className="mdi mdi-cart mdi-24px float-right"></i>
                        </h4>
                        <h2 className="mb-5">{dashboard.booking_finish}</h2>
                    </div>
                    </div>
                </div>
            </div>
            <div className="row">
          <div className="col-12 grid-margin">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Recent Enquiry</h4>
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th> Enq Date </th>
                        <th> Buyer </th>
                        <th> Departure Date </th>
                        <th> Vehicle </th>
                        <th> Place</th>
                        <th> Charges</th>
                        <th> Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        recntEnquiry.map((item,i) => (
                          <tr key={i}>
                            <td>
                              {Moment(item.enq_date).format('DD-MM-YYYY')}
                            </td>
                            <td> {item.buyer_name} </td>
                            <td>
                              {Moment(item.order_date).format('DD-MM-YYYY')}
                            </td>
                            <td> {item.vehicle_type} </td>
                            <td> {item.place_from} - {item.place_to} </td>
                            <td> {item.charges_from} - {item.charges_to}</td>
                            <td> {item.enq_status === 'Booked' ? <label className="badge badge-gradient-success">{item.enq_status}</label> : item.enq_status === 'Enquiry' ? <label className="badge badge-gradient-info">{item.enq_status}</label> : <label className="badge badge-gradient-danger">{item.enq_status}</label> } </td>
                          </tr>
                        ))
                      }
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
    );

}

export default Dashboard;