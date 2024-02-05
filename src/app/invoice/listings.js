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
export default class NewListInvoice  extends Component {
  state = {
    loader: true,
    users: [],
    invoiceData: [],
    columnData: [
      {
        name: "#",
        options: {
          filter: false,
          print:false,
          download:false,
        }
      },
      "Invoice No",
      "Date",
      "Buyer",
      "Place",
      
      {
        name:"Status",
          options:{
            filter: false,
          },
      },
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
                    <Link to={"invoiceEdit/" + value}>
                      <i class=" mdi mdi-brush"></i>
                    </Link>
                  </IconButton>
                </Tooltip>
                <Tooltip title="View" placement="top">
                  <IconButton
                    aria-label="View"
                    style={{
                      display:
                        localStorage.getItem("user_type_id") === 1
                        ? "none" : "",
                    }}
                  >
                    <Link to={"invoiceView/" + value}>
                      <i class="mdi mdi-eye"></i>
                    </Link>
                  </IconButton>
                </Tooltip>
                
              </div>
            );
          },
        },
      },
    ],
  };

  getData = () => {
    axios({
      url: baseURL+"/web-fetch-invoice-list",
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("login")}`,
      },
    })
      .then((res) => {
      
        let response = res.data.invoice;
        let tempRows = [];
        for (let i = 0; i < response.length; i++) {
          
            tempRows.push([
              i + 1,
              
              response[i]["inv_no"],
              Moment(response[i]["inv_date"]).format('DD-MM-YYYY'),
              response[i]["inv_buyer_name"],
              response[i]["inv_place"],
              response[i]["inv_status"] === 'Open' ? <label className="badge badge-gradient-success">{response[i]["inv_status"]}</label> : <label className="badge badge-gradient-danger">{response[i]["inv_status"]}</label>,
              response[i]["id"],
            ]);
          
        }
        this.setState({ invoiceData: tempRows, loader: false });
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
    let usertype = localStorage.getItem("user_type_id");
    
    return (
      <div>
        <div className="page-header">
          <h3 className="page-title"> Invoice </h3>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
              <Link className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" to="addInvoice" style={{ display: usertype == 1 ? "none" : "inline-block" }}>
              + Add Invoice
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
                  {this.state.invoiceData.length > 0 && (
                    <MUIDataTable
                      data={this.state.invoiceData}
                      columns={this.state.columnData}
                      options={option}
                    />
                    )}
                    {this.state.invoiceData.length <= 0 && (
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
