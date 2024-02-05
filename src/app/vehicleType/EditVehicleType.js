import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import {baseURL} from '../../api';
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import {  NotificationManager,} from "react-notifications";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";
import MenuItem from "@material-ui/core/MenuItem";

const status = [
    {
      value: "Active",
      label: "Active",
    },
    {
      value: "Inactive",
      label: "Inactive",
    },
];

const EditVehicleType = (props) => {

    let history = useHistory();

    const params = useParams();

    const [vehicleType, setVehicleType] = useState({
        vehicle_type: "",
        vehicle_type_status: ""
    });

    useEffect(() => {
        var isLoggedIn = localStorage.getItem("user_type_id");
        if(!isLoggedIn){

        window.location = "/signin";
        
        }else{

        }

        axios({
            url: baseURL+"/web-fetch-vehicle-type-by-id/" + params.id,
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("login")}`,
            },
          }).then((res) => {
            
            setVehicleType(res.data.vehicleType)
      
          });
    }, []);

    const onInputChange = (e) => {
        
        setVehicleType({
        ...vehicleType,
        [e.target.name]: e.target.value,
        });
        
    };

    const [isButtonDisabled, setIsButtonDisabled] = React.useState(false);

    useEffect(() => {
        var isLoggedIn = localStorage.getItem("user_type_id");
        if(!isLoggedIn){

        window.location = "/login";
        
        }else{

        }
        
    });

    const onSubmit = (e) => {
      
        let data = {
            vehicle_type: vehicleType.vehicle_type,
            vehicle_type_status : vehicleType.vehicle_type_status,
        };
        e.preventDefault();
        var v = document.getElementById("addIndiv").checkValidity();
        var v = document.getElementById("addIndiv").reportValidity();
        if (v) {
        setIsButtonDisabled(true)
        axios({
            url: baseURL+"/web-update-vehicle-type/"+ params.id,
            method: "PUT",
            data,
            headers: {
            Authorization: `Bearer ${localStorage.getItem("login")}`,
            },
        }).then((res) => {
            if(res.data.code == '200'){
                NotificationManager.success("Vehicle Type Updated Sucessfully");
                history.push("/vehicleType");
            }else{
                NotificationManager.error("Duplicate Entry");
            }
            
        });
    }
    };

    return(
        <div>
            <div className="page-header">
                <h3 className="page-title"> Edit Vehicle Type </h3>
            </div>
            <div className="row">
                <div className="col-md-12 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <form id="addIndiv" autoComplete="off">
                                <div className="row">
                                    <div className="col-sm-12 col-md-12 col-xl-4">
                                        <div className="form-group">
                                            <TextField
                                            fullWidth
                                            required
                                            label="Vehicle Type"
                                            autoComplete="Name"
                                            name="vehicle_type"
                                            value={vehicleType.vehicle_type}
                                            onChange={(e) => onInputChange(e)}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-12 col-xl-4">
                                        <div className="form-group">
                                            <TextField
                                            fullWidth
                                            label="Status"
                                            autoComplete="Name"
                                            name="vehicle_type_status"
                                            SelectProps={{
                                                MenuProps: {},
                                            }}
                                            select
                                            value={vehicleType.vehicle_type_status}
                                            onChange={(e) => onInputChange(e)}
                                            >
                                                {status.map((fabric, key) => (
                                                <MenuItem key={fabric.value} value={fabric.value}>
                                                    {fabric.label}
                                                </MenuItem>
                                                ))}
                                            </TextField>
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-12 col-xl-4">
                                        <div className="form-group">
                                        <Button
                                            type="submit"
                                            className="btn btn-gradient-primary mr-2"
                                            color="primary"
                                            onClick={(e) => onSubmit(e)}
                                            disabled={isButtonDisabled}
                                            >
                                            Update
                                            </Button>
                                            <Link to="../vehicleType">
                                            <Button className="btn btn-light" color="success">
                                            Cancel
                                            </Button>
                                            </Link> 
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default EditVehicleType;