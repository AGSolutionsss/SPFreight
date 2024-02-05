import React, { Component } from 'react'
import MUIDataTable from "mui-datatables";
import {baseURL} from '../../api';
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import axios from "axios";
import { Link } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import Moment from 'moment';

const option = {
  filterType: "dropDown",
  selectableRows: false,
  viewColumns : false,
};
export default class NewListToClear  extends Component {
  state = {
    loader: true,
    users: [],
    topayData: [],
    columnData: [
      "Booking No",
      "Booking Date",
      "From",
      "To",
      "Buyer",
      "Status",
      "Hired",
      "Advance",
      "Paid Date",
      
    ],
  };

  getData = () => {
    axios({
      url: baseURL+"/web-fetch-clear-list",
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("login")}`,
      },
    })
      .then((res) => {
      
        let response = res.data.booking;
        let tempRows = [];
        for (let i = 0; i < response.length; i++) {
          
            tempRows.push([
              response[i]["booking_no"],
              Moment(response[i]["booking_date"]).format('DD-MM-YYYY'),
              response[i]["place_from"],
              response[i]["place_to"],
              response[i]["buyer_name"],
              response[i]["booking_status"] === 'Booked' ? <label className="badge badge-gradient-success">{response[i]["booking_status"]}</label> : response[i]["booking_status"] === 'Reached' ? <label className="badge badge-gradient-info">{response[i]["booking_status"]}</label> : response[i]["booking_status"] === 'Loading' ? <label className="badge badge-gradient-danger">{response[i]["booking_status"]}</label> : response[i]["booking_status"] === 'LR' ? <label className="badge badge-gradient-secondary">{response[i]["booking_status"]}</label> : response[i]["booking_status"] === 'On Way' ? <label className="badge badge-gradient-primary">{response[i]["booking_status"]}</label> : response[i]["booking_status"] === 'Reach Destination' ? <label className="badge badge-gradient-dark">{response[i]["booking_status"]}</label> : response[i]["booking_status"] === 'Unload' ? <label className="badge badge-gradient-muted">{response[i]["booking_status"]}</label> : response[i]["booking_status"] === 'Release' ? <label className="badge badge-gradient-white">{response[i]["booking_status"]}</label> : <label className="badge badge-gradient-warning">{response[i]["booking_status"]}</label> ,
              response[i]["hired_charges"],
              response[i]["advance_to_pay"],
              Moment(response[i]["enquiry_pay_date"]).format('DD-MM-YYYY'),
              
            ]);
          
        }
        this.setState({ topayData: tempRows, loader: false });
      })
      .catch((res) => {
        this.setState({ loader: false });
      });
  };
  
  componentDidMount() {
    var isLoggedIn = localStorage.getItem("user_type_id");
    if(!isLoggedIn){

      window.location = "/login";
      
    }else{

    }
    
    this.getData();
  }
  
  render() {
    const { loader } = this.state;
    
    return (
      <div>
        <div className="page-header">
            <h3 className="page-title"> Clear </h3>
        </div>
        <div className="row">
          <div className="col-lg-12 grid-margin stretch-card">
            <div className="card">
              <div className="card-body" style={{background:'#f2edf3',padding:'0px'}}>
              {loader && (
                <CircularProgress
                  disableShrink
                  style={{
                    marginLeft: "600px",
                    marginTop: "100px",
                    marginBottom: "300px",
                  }}
                  color="secondary"
                />
              )}
              {!loader && (
              <>
                  {this.state.topayData.length > 0 && (
                    <MUIDataTable
                      data={this.state.topayData}
                      columns={this.state.columnData}
                      options={option}
                    />
                    )}
                    {this.state.topayData.length <= 0 && (
                    <MUIDataTable
                      columns={this.state.columnData}
                      options={option}
                    />
                    )}
              </>
              )}
              </div>
            </div>
          </div>
        </div>
       </div>
    );
  }
}
