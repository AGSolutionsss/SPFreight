import React, { Component } from 'react'
import MUIDataTable from "mui-datatables";
import {baseURL} from '../../api';
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import axios from "axios";
import { Link } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";

const option = {
  filterType: "dropDown",
  selectableRows: false,
  viewColumns : false,
};
export default class NewListBuyer  extends Component {
  state = {
    loader: true,
    users: [],
    buyerData: [],
    columnData: [
      {
        name: "#",
        options: {
          filter: false,
          print:false,
          download:false,
        }
      },
      "Sort",
      "Buyer",
      "GST",
      "State",
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
                    <Link to={"buyerEdit/" + value}>
                      <i class=" mdi mdi-brush"></i>
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
      url: baseURL+"/web-fetch-buyer-list",
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("login")}`,
      },
    })
      .then((res) => {
      
        let response = res.data.buyer;
        let tempRows = [];
        for (let i = 0; i < response.length; i++) {
          
            tempRows.push([
              i + 1,
              
              response[i]["buyer_sort"],
              response[i]["buyer_name"],
              response[i]["buyer_gst"],
              response[i]["buyer_state"],
              response[i]["buyer_status"] === 'Active' ? <label className="badge badge-gradient-success">{response[i]["buyer_status"]}</label> : <label className="badge badge-gradient-danger">{response[i]["buyer_status"]}</label>,
              response[i]["id"],
            ]);
          
        }
        this.setState({ buyerData: tempRows, loader: false });
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
          <h3 className="page-title"> Buyer </h3>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
              <Link className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" to="addBuyer" style={{ display: usertype == 1 ? "none" : "inline-block" }}>
              + Add Buyer
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
                  {this.state.buyerData.length > 0 && (
                    <MUIDataTable
                      data={this.state.buyerData}
                      columns={this.state.columnData}
                      options={option}
                    />
                    )}
                    {this.state.buyerData.length <= 0 && (
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
