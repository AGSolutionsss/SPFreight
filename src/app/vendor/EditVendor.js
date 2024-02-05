import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import {baseURL} from '../../api';
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import {  NotificationManager } from "react-notifications";
import MenuItem from "@material-ui/core/MenuItem";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";
import { Select, Chip,InputLabel, FormControl } from '@material-ui/core';

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

const tds = [
    {
      value: "Yes",
      label: "Yes",
    },
    {
      value: "No",
      label: "No",
    },
];

const EditVendor = (props) => {

    let history = useHistory();

    const params = useParams();

    const [selected, setSelected] = useState([]);

    useEffect(() => {
        var isLoggedIn = localStorage.getItem("user_type_id");
        if(!isLoggedIn){

        window.location = "/signin";
        
        }else{

        }

        axios({
            url: baseURL+"/web-fetch-vendor-by-id/" + params.id,
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("login")}`,
            },
          }).then((res) => {
            
            setVendor(res.data.vendor);
            localStorage.setItem("selectedVehicle", res.data.vendor.vehicle_type+'');
            var test = [];
            test = res.data.vendor.vehicle_type.split(",");
            setSelected(test);
          });
        }, []);

        

        const selectionChangeHandler = (event) => {
            var new_id=[];
            setSelected(event.target.value);
            new_id = selected
            new_id = event.target.value
            localStorage.setItem("selectedVehicle", new_id+'');
        };

    const [vendor, setVendor] = useState({
        vendor_prefix: "",
        vendor_company: "",
        vendor_contact_name: "",
        vendor_mobile: "",
        vendor_email: "",
        vendor_landline: "",
        vendor_address: "",
        vendor_gst: "",
        vendor_pan: "",
        vendor_aadhar_card: "",
        vehicle_type: "",
        vendor_tds: "",
        vendor_tds_image: "",
        vendor_status: ""
    });

    const [selectedFile, setSelectedFile] = React.useState(null);

    const validateOnlyDigits = (inputtxt) => {
        var phoneno = /^\d+$/;
        if(inputtxt.match(phoneno) || inputtxt.length==0){
            return true;
        }else{
            return false;
        }
    }

    const onInputChange = (e) => {
        if(e.target.name=="vendor_mobile"){
            if(validateOnlyDigits(e.target.value)){
                setVendor({
                  ...vendor,
                  [e.target.name]: e.target.value,
                });
            }
        }else{
            setVendor({
                ...vendor,
                [e.target.name]: e.target.value,
            });
        }
    };

    const [vehicleType, setVehicleType] = useState([]);

    useEffect(() => {
        axios({
            url: baseURL+"/web-fetch-vehicle-type",
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("login")}`,
            },
          }).then((res) => {
            
            setVehicleType(res.data.vehicleType)
      
          });
    }, []);

    const [isButtonDisabled, setIsButtonDisabled] = React.useState(false);

    useEffect(() => {
        var isLoggedIn = localStorage.getItem("user_type_id");
        if(!isLoggedIn){

        window.location = "/login";
        
        }else{

        }
        
    });

    const onUpdate = (e) => {
      
        const data = new FormData();
        data.append("vendor_prefix",vendor.vendor_prefix);
        data.append("vendor_company",vendor.vendor_company);
        data.append("vendor_contact_name",vendor.vendor_contact_name);
        data.append("vendor_mobile",vendor.vendor_mobile);
        data.append("vendor_email",vendor.vendor_email);
        data.append("vendor_landline",vendor.vendor_landline);
        data.append("vendor_address",vendor.vendor_address);
        data.append("vendor_gst",vendor.vendor_gst);
        data.append("vendor_pan",vendor.vendor_pan);
        data.append("vendor_aadhar_card",vendor.vendor_aadhar_card);
        data.append("vehicle_type",localStorage.getItem("selectedVehicle"));
        data.append("vendor_tds",vendor.vendor_tds);
        data.append("vendor_tds_image",selectedFile);
        data.append("vendor_status",vendor.vendor_status);

        e.preventDefault();
        var v = document.getElementById("addIndiv").checkValidity();
        var v = document.getElementById("addIndiv").reportValidity();
        if (v) {
        setIsButtonDisabled(true)
        axios({
            url: baseURL+"/web-update-vendor/"+ params.id+'?_method=PUT',
            method: "POST",
            data,
            headers: {
            Authorization: `Bearer ${localStorage.getItem("login")}`,
            },
        }).then((res) => {
            if(res.data.code == '200'){
                NotificationManager.success("Vendor Updated Sucessfully");
                history.push("/vendor");
            }else{
                NotificationManager.error("Duplicate Entry");
            }
            
        });
    }
    };

    return(
        <div>
            <div className="page-header">
                <h3 className="page-title"> Edit Vendor </h3>
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
                                            label="Sort Name"
                                            autoComplete="Name"
                                            name="vendor_prefix"
                                            value={vendor.vendor_prefix}
                                            onChange={(e) => onInputChange(e)}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-12 col-xl-4">
                                        <div className="form-group">
                                            <TextField
                                            fullWidth
                                            required
                                            label="Vendor Name"
                                            autoComplete="Name"
                                            name="vendor_company"
                                            value={vendor.vendor_company}
                                            onChange={(e) => onInputChange(e)}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-12 col-xl-4">
                                        <div className="form-group">
                                            <TextField
                                            fullWidth
                                            label="Contact Name"
                                            autoComplete="Name"
                                            name="vendor_contact_name"
                                            value={vendor.vendor_contact_name}
                                            onChange={(e) => onInputChange(e)}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-12 col-md-12 col-xl-4">
                                        <div className="form-group">
                                            <TextField
                                            fullWidth
                                            label="Mobile No"
                                            autoComplete="Name"
                                            name="vendor_mobile"
                                            value={vendor.vendor_mobile}
                                            onChange={(e) => onInputChange(e)}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-12 col-xl-4">
                                        <div className="form-group">
                                            <TextField
                                            fullWidth
                                            type="email"
                                            label="Email"
                                            autoComplete="Name"
                                            name="vendor_email"
                                            value={vendor.vendor_email}
                                            onChange={(e) => onInputChange(e)}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-12 col-xl-4">
                                        <div className="form-group">
                                            <TextField
                                            fullWidth
                                            label="Landline"
                                            autoComplete="Name"
                                            name="vendor_landline"
                                            value={vendor.vendor_landline}
                                            onChange={(e) => onInputChange(e)}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-12 col-md-12 col-xl-12">
                                        <div className="form-group">
                                            <TextField
                                            fullWidth
                                            label="Address"
                                            autoComplete="Name"
                                            name="vendor_address"
                                            value={vendor.vendor_address}
                                            onChange={(e) => onInputChange(e)}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-12 col-md-12 col-xl-4">
                                        <div className="form-group">
                                            <TextField
                                            fullWidth
                                            label="GST"
                                            autoComplete="Name"
                                            name="vendor_gst"
                                            value={vendor.vendor_gst}
                                            onChange={(e) => onInputChange(e)}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-12 col-xl-4">
                                        <div className="form-group">
                                            <TextField
                                            fullWidth
                                            label="Pan No"
                                            autoComplete="Name"
                                            name="vendor_pan"
                                            value={vendor.vendor_landline}
                                            onChange={(e) => onInputChange(e)}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-12 col-xl-4">
                                        <div className="form-group">
                                            <TextField
                                            fullWidth
                                            label="Aadhar Card No"
                                            autoComplete="Name"
                                            name="vendor_aadhar_card"
                                            value={vendor.vendor_aadhar_card}
                                            onChange={(e) => onInputChange(e)}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-12 col-md-12 col-xl-4">
                                        <div className="form-group">
                                            <FormControl fullWidth>
                                                <InputLabel>Vehicle Type</InputLabel>
                                                <Select
                                                    label="Vehicle Type"
                                                    multiple
                                                    value={selected}
                                                    fullWidth
                                                    required
                                                    onChange={selectionChangeHandler}
                                                    renderValue={(selected) => (
                                                    <div>
                                                        {selected.map((value) => (
                                                        <Chip key={value} label={value} />
                                                        ))}
                                                    </div>
                                                    )}
                                                >
                                                    {vehicleType.map((vehicle, key) => (
                                                        <MenuItem key={key} value={vehicle.vehicle_type}>
                                                            {vehicle.vehicle_type}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-12 col-xl-4">
                                        <div className="form-group">
                                            <TextField
                                            fullWidth
                                            label="TDS"
                                            autoComplete="Name"
                                            name="vendor_tds"
                                            SelectProps={{
                                                MenuProps: {},
                                            }}
                                            select
                                            value={vendor.vendor_tds}
                                            onChange={(e) => onInputChange(e)}
                                            >
                                                {tds.map((fabric, key) => (
                                                <MenuItem key={fabric.value} value={fabric.value}>
                                                    {fabric.label}
                                                </MenuItem>
                                                ))}
                                            </TextField>
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-12 col-xl-4">
                                        <div className="form-group">
                                            <TextField
                                            fullWidth
                                            label="TDS Document"
                                            type="file"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            autoComplete="Name"
                                            name="vendor_tds_image"
                                            onChange={(e) => setSelectedFile(e.target.files[0])}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-12 col-md-12 col-xl-4">
                                        <div className="form-group">
                                            <TextField
                                            fullWidth
                                            label="Status"
                                            autoComplete="Name"
                                            name="vendor_status"
                                            SelectProps={{
                                                MenuProps: {},
                                            }}
                                            select
                                            value={vendor.vendor_status}
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
                                </div>
                                <Button
                                    type="submit"
                                    className="btn btn-gradient-primary mr-2"
                                    color="primary"
                                    onClick={(e) => onUpdate(e)}
                                    disabled={isButtonDisabled}
                                    >
                                    Update
                                    </Button>
                                    <Link to="../vendor">
                                    <Button className="btn btn-light" color="success">
                                    Cancel
                                    </Button>
                                    </Link>               
                  
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default EditVendor;