import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import {baseURL} from '../../api';
import { useHistory } from "react-router-dom";
import axios from "axios";
import {  NotificationManager,} from "react-notifications";
import MenuItem from "@material-ui/core/MenuItem";
import Autocomplete from '@mui/material/Autocomplete';
import { Button } from "reactstrap";
import { Link } from "react-router-dom";
import dateyear from "../dateyear";

const AddEnquiry = (props) => {

    let history = useHistory();

    const [enquiry, setEnquiry] = useState({
        enq_year: dateyear,
        vehicle_type: "",
        place_from: "",
        place_to: "",
        order_date: "",
        charges_from: "",
        charges_to: "",
        buyer_name: "",
        enq_remarks: ""
    });

    const [pfvalue, setPFValue] = useState([]);
    
    const [ptvalue, setPTValue] = useState([]);

    const validateOnlyDigits = (inputtxt) => {
        var phoneno = /^\d+$/;
        if(inputtxt.match(phoneno) || inputtxt.length==0){
            return true;
        }else{
            return false;
        }
    }

    const onInputChange = (e) => {
        if(e.target.name=="charges_from"){
            if(validateOnlyDigits(e.target.value)){
                setEnquiry({
                  ...enquiry,
                  [e.target.name]: e.target.value,
                });
            }
        }else if(e.target.name=="charges_to"){
            if(validateOnlyDigits(e.target.value)){
                setEnquiry({
                  ...enquiry,
                  [e.target.name]: e.target.value,
                });
            }
        }else{
            setEnquiry({
                ...enquiry,
                [e.target.name]: e.target.value,
            });
        }
    };

    const [isButtonDisabled, setIsButtonDisabled] = React.useState(false);

    useEffect(() => {
        var isLoggedIn = localStorage.getItem("user_type_id");
        if(!isLoggedIn){

        window.location = "/login";
        
        }else{

        }
        
    });

    const [buyer, setBuyer] = useState([]);

    useEffect(() => {
        axios({
            url: baseURL+"/web-fetch-buyer",
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("login")}`,
            },
          }).then((res) => {
            
            setBuyer(res.data.buyer)
      
          });
    }, []);

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

    const onSubmit = (e) => {

        let data = {
            enq_year: dateyear,
            vehicle_type: enquiry.vehicle_type,
            place_from: pfvalue ,
            place_to: ptvalue,
            order_date: enquiry.order_date,
            charges_from: enquiry.charges_from,
            charges_to: enquiry.charges_to, 
            buyer_name: enquiry.buyer_name, 
            enq_remarks: enquiry.enq_remarks, 
        };

        e.preventDefault();
        var v = document.getElementById("addIndiv").checkValidity();
        var v = document.getElementById("addIndiv").reportValidity();
        if (v) {
        setIsButtonDisabled(true)
        axios({
            url: baseURL+"/web-create-enquiry",
            method: "POST",
            data,
            headers: {
            Authorization: `Bearer ${localStorage.getItem("login")}`,
            },
        }).then((res) => {
            if(res.data.code == '200'){
                NotificationManager.success("Enquiry Created Sucessfully");
                history.push("enquiry");
            }else{
                NotificationManager.error("Duplicate Entry");
            }
            
        });
    }
    };

    const [placeFrom, setPlaceFrom] = useState([]);
    useEffect(() => {
    
        var theLoginToken = localStorage.getItem('login');       
         
       const requestOptions = {
             method: 'GET', 
             headers: {
                'Authorization': 'Bearer '+theLoginToken,
             }             
       };     
 
 
     fetch(baseURL+'/web-fetch-place-from', requestOptions)
     .then(response => response.json())
     .then(data => setPlaceFrom(data.placeFrom)); 
   }, []);

      
   const [placeTo, setPlaceTo] = useState([]);
    useEffect(() => {
    
        var theLoginToken = localStorage.getItem('login');       
         
       const requestOptions = {
             method: 'GET', 
             headers: {
                'Authorization': 'Bearer '+theLoginToken,
             }             
       };     
 
 
     fetch(baseURL+'/web-fetch-place-to', requestOptions)
     .then(response => response.json())
     .then(data => setPlaceTo(data.placeTo)); 
   }, []);
      

    return(
        <div>
            <div className="page-header">
                <h3 className="page-title"> Add Enquiry </h3>
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
                                            label="Buyer Name"
                                            autoComplete="Name"
                                            SelectProps={{
                                                MenuProps: {},
                                            }}
                                            select
                                            name="buyer_name"
                                            value={enquiry.buyer_name}
                                            onChange={(e) => onInputChange(e)}
                                            >
                                                {buyer.map((buyers, key) => (
                                                    <MenuItem key={key} value={buyers.buyer_name}>
                                                        {buyers.buyer_name}
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-12 col-xl-4">
                                        <div className="form-group">
                                        <TextField
                                            fullWidth
                                            required
                                            label="Vehicle Type"
                                            autoComplete="Name"
                                            name="vehicle_type"
                                            SelectProps={{
                                                MenuProps: {},
                                            }}
                                            select
                                            value={enquiry.vehicle_type}
                                            onChange={(e) => onInputChange(e)}
                                            >
                                                {vehicleType.map((vehicle, key) => (
                                                    <MenuItem key={key} value={vehicle.vehicle_type}>
                                                        {vehicle.vehicle_type}
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-12 col-xl-4">
                                        <div className="form-group">
                                            <TextField
                                            fullWidth
                                            required
                                            type="date"
                                            label="Departure Date"
                                            autoComplete="Name"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            name="order_date"
                                            value={enquiry.order_date}
                                            onChange={(e) => onInputChange(e)}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-12 col-md-12 col-xl-4">
                                        <div className="form-group">
                                            <Autocomplete
                                                onChange={(event, value) => setPFValue(value)}
                                                name="place_from"
                                                required
                                                getOptionLabel={(placeFrom) => `${placeFrom.place_from}`}
                                                options={placeFrom}
                                                isOptionEqualToValue={(option,value) =>
                                                    option.place_from === value.place_from
                                                }
                                                noOptionsText={"NO AVAILABLE DATA"}
                                                renderInput={(params) => <TextField {...params} required  label="Place From" />}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-12 col-xl-4">
                                        <div className="form-group">
                                            <Autocomplete
                                                onChange={(event, value) => setPTValue(value)}
                                                name="place_to"
                                                required
                                                getOptionLabel={(placeTo) => `${placeTo.place_to}`}
                                                options={placeTo}
                                                isOptionEqualToValue={(option,value) =>
                                                    option.place_to === value.place_to
                                                }
                                                noOptionsText={"NO AVAILABLE DATA"}
                                                renderInput={(params) => <TextField {...params} required  label="Place To" />}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-12 col-xl-2">
                                        <div className="form-group">
                                            <TextField
                                            fullWidth
                                            label="Charges From"
                                            autoComplete="Name"
                                            name="charges_from"
                                            value={enquiry.charges_from}
                                            onChange={(e) => onInputChange(e)}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-12 col-xl-2">
                                        <div className="form-group">
                                            <TextField
                                            fullWidth
                                            label="Charges To"
                                            autoComplete="Name"
                                            name="charges_to"
                                            value={enquiry.charges_to}
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
                                            label="Remarks"
                                            autoComplete="Name"
                                            name="enq_remarks"
                                            value={enquiry.enq_remarks}
                                            onChange={(e) => onInputChange(e)}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <Button
                                    type="submit"
                                    className="btn btn-gradient-primary mr-2"
                                    color="primary"
                                    onClick={(e) => onSubmit(e)}
                                    disabled={isButtonDisabled}
                                    >
                                    Submit
                                    </Button>
                                    <Link to="enquiry">
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

export default AddEnquiry;