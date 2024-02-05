import React, { Component } from 'react'
import MUIDataTable from "mui-datatables";
import {baseURL} from '../../api';
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import axios from "axios";
import { Link } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import {  NotificationManager } from "react-notifications";

const option = {
  filterType: "dropDown",
  selectableRows: false,
  viewColumns : false,
};
export default class NewListTeam  extends Component {
  state = {
    loader: true,
    users: [],
    userData: [],
    columnData: [
      {
        name: "#",
        options: {
          filter: false,
          print:false,
          download:false,
        }
      },
      "Full Name",
      "Username",
      "Email",
      "Mobile",
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
                    <a style={{color: 'rgba(13, 126, 247, 0.54)'}} onClick={(e) => this.updateValue(value)}>
                      <i class=" mdi mdi-brush"></i>
                    </a>
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
      url: baseURL+"/web-fetch-team-list",
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("login")}`,
      },
    })
      .then((res) => {
      
        let response = res.data.profile;
        let tempRows = [];
        for (let i = 0; i < response.length; i++) {
          
            tempRows.push([
              i + 1,
              
              response[i]["full_name"],
              response[i]["name"],
              response[i]["email"],
              response[i]["mobile"],
              response[i]["user_status"] === 'Active' ? <label className="badge badge-gradient-success">{response[i]["user_status"]}</label> : <label className="badge badge-gradient-danger">{response[i]["user_status"]}</label>,
              response[i]["id"],
            ]);
          
        }
        this.setState({ userData: tempRows, loader: false });
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

  updateValue = (value) =>{
    axios({
        url: baseURL+"/web-update-team/"+value,
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("login")}`,
        },
      }).then((res) => {
          
          this.getData();
          NotificationManager.success("Team Updated Sucessfully");
        
      })
  }
  
  render() {
    const { loader } = this.state;
    let usertype = localStorage.getItem("user_type_id");
    
    return (
      <div>
        <div className="page-header">
          <h3 className="page-title"> Team </h3>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
              <Link className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" to="addTeam" style={{ display: usertype == 1 ? "none" : "inline-block" }}>
              + Add Team
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
                  {this.state.userData.length > 0 && (
                    <MUIDataTable
                      data={this.state.userData}
                      columns={this.state.columnData}
                      options={option}
                    />
                    )}
                    {this.state.userData.length <= 0 && (
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
