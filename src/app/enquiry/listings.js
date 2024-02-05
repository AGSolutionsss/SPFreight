import React, { Component } from 'react'
import MUIDataTable from "mui-datatables";
import {baseURL} from '../../api';
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import axios from "axios";
import { Link } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import Moment from 'moment';
import {  NotificationManager,} from "react-notifications";

const option = {
  filterType: "dropDown",
  selectableRows: false,
  viewColumns : false,
};
export default class NewListEnquiry  extends Component {
  state = {
    loader: true,
    users: [],
    enquiryData: [],
    columnData: [
      
      "Enq Date",
      "Buyer",
      "Departure Date",
      "Vehicle",
      "Place",
      "Charges",
      "Status",
      {
        name: "Actions",
        options: {
          filter: false,
          print:false,
          download:false,
          customBodyRender: (value) => {
            return (
              <div style={{ minWidth: "150px" , fontWeight: 800}}>
                <Tooltip title="Edit" placement="top">
                  <IconButton
                    aria-label="Edit"
                    style={{
                      display:
                        localStorage.getItem("user_type_id") == 1
                        ? "none" : "",
                    }}
                  >
                    <Link to={"enquiryEdit/" + value.substr(value.indexOf("#")+1, value.length-1)}>
                      <i class=" mdi mdi-brush"></i>
                    </Link>
                  </IconButton>
                </Tooltip>
                {!value.startsWith('Cancel') &&
                <Tooltip title="Create Booking" placement="top">
                  <IconButton
                    aria-label="Create Booking"
                    style={{
                      display:
                        localStorage.getItem("user_type_id") == 1
                        ? "none" : "",
                    }}
                  >
                    
                    <a style={{color: 'rgba(13, 126, 247, 0.54)'}} onClick={this.sendEmail.bind(this,value.substr(value.indexOf("#")+1, value.length-1))}>
                      <i class=" mdi  mdi mdi-border-color"></i>
                    </a>
                    
                  </IconButton>
                </Tooltip>
                }
              </div>
            );
          },
        },
      },
    ],
  };

  getData = () => {
    axios({
      url: baseURL+"/web-fetch-enquiry-list",
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("login")}`,
      },
    })
      .then((res) => {
      
        let response = res.data.enquiry;
        let tempRows = [];
        for (let i = 0; i < response.length; i++) {
          
            tempRows.push([
              Moment(response[i]["enq_date"]).format('DD-MM-YYYY'),
              response[i]["buyer_name"],
              Moment(response[i]["order_date"]).format('DD-MM-YYYY'),
              response[i]["vehicle_type"],
              response[i]["place_from"]+" - "+response[i]["place_to"],
              response[i]["charges_from"]+" - "+response[i]["charges_to"],
              response[i]["enq_status"] === 'Booked' ? <label className="badge badge-gradient-success">{response[i]["enq_status"]}</label> : response[i]["enq_status"] === 'Enquiry' ? <label className="badge badge-gradient-info">{response[i]["enq_status"]}</label> : <label className="badge badge-gradient-danger">{response[i]["enq_status"]}</label>,
              response[i]["enq_status"]+'#'+response[i]["id"]
            ]);
          
        }
        this.setState({ enquiryData: tempRows, loader: false });
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

  sendEmail = (value) => {
    
    axios({
      url: baseURL+"/web-create-booking/"+value,
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("login")}`,
      },
    }).then((res) => {
        
        this.getData();
        NotificationManager.success("Booking Created Sucessfully");
      
    })
  };
  
  render() {
    const { loader } = this.state;
    let usertype = localStorage.getItem("user_type_id");
    
    return (
      <div>
        <div className="page-header">
          <h3 className="page-title"> Enquiry </h3>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
              <Link className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" to="addEnquiry" style={{ display: usertype == 1 ? "none" : "inline-block" }}>
              + Add Enquiry
              </Link>
              </ol>
            </nav>
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
                  {this.state.enquiryData.length > 0 && (
                    <MUIDataTable
                      data={this.state.enquiryData}
                      columns={this.state.columnData}
                      options={option}
                    />
                    )}
                    {this.state.enquiryData.length <= 0 && (
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
