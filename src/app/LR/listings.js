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
export default class NewListLR  extends Component {
  state = {
    loader: true,
    users: [],
    lrData: [],
    columnData: [
      "Booking No",
      "LR No",
      "LR Date",
      "Buyer",
      "Consignee",
      "No of Items",
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
                {!value.startsWith('Invoice') &&
                <Tooltip title="Edit" placement="top">
                  <IconButton
                    aria-label="Edit"
                    style={{
                      display:
                        localStorage.getItem("user_type_id") === 1
                        ? "none" : "",
                    }}
                  >
                    <Link to={"lrEdit/" + value.substr(value.indexOf("#")+1, value.length-1)}>
                      <i class=" mdi mdi-brush"></i>
                    </Link>
                  </IconButton>
                </Tooltip>
                }
                <Tooltip title="View" placement="top">
                  <IconButton
                    aria-label="View"
                    style={{
                      display:
                        localStorage.getItem("user_type_id") === 1
                        ? "none" : "",
                    }}
                  >
                    <Link to={"lrView/" + value.substr(value.indexOf("#")+1, value.length-1)}>
                      <i class="mdi mdi-eye"></i>
                    </Link>
                  </IconButton>
                </Tooltip>
                {!value.startsWith('Invoice') &&
                <Tooltip title="Expenses" placement="top">
                  <IconButton
                    aria-label="Expenses"
                    style={{
                      display:
                        localStorage.getItem("user_type_id") === 1
                        ? "none" : "",
                    }}
                  >
                    
                      <Link to={"lrExpenses/" + value.substr(value.indexOf("#")+1, value.length-1)}>
                        <i class="mdi mdi-lead-pencil"></i>
                      </Link>
                    
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
      url: baseURL+"/web-fetch-lr-list",
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("login")}`,
      },
    })
      .then((res) => {
      
        let response = res.data.lr;
        let tempRows = [];
        for (let i = 0; i < response.length; i++) {
          
            tempRows.push([
              response[i]["lr_booking_no"],
              response[i]["lr_no"],
              Moment(response[i]["lr_date"]).format('DD-MM-YYYY'),
              response[i]["buyer_name"],
              response[i]["consignee_name"],
              response[i]["lr_no_of_sub"],
              response[i]["lr_status"] === 'Pending' ? <label className="badge badge-gradient-success">{response[i]["lr_status"]}</label> : <label className="badge badge-gradient-info">{response[i]["lr_status"]}</label>,
              response[i]["lr_status"]+'#'+response[i]["id"]
            ]);
          
        }
        this.setState({ lrData: tempRows, loader: false });
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
            <h3 className="page-title"> LR </h3>
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
                  {this.state.lrData.length > 0 && (
                    <MUIDataTable
                      data={this.state.lrData}
                      columns={this.state.columnData}
                      options={option}
                    />
                    )}
                    {this.state.lrData.length <= 0 && (
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
