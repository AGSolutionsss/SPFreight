import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import {baseURL} from '../../../api';
import { useHistory } from "react-router-dom";
import axios from "axios";
import {  NotificationManager,} from "react-notifications";
import { Button } from "reactstrap";
import MenuItem from "@material-ui/core/MenuItem";

const status = [
    {
      value: "Booked",
      label: "Booked",
    },
    {
        value: "Enquiry",
        label: "Enquiry",
    },
    {
        value: "Cancel",
        label: "Cancel",
      },
 ];

const EnquiryForm = (props) => {

    let history = useHistory();

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0");
    var yyyy = today.getFullYear();

    today = mm + "/" + dd + "/" + yyyy;
    var todayback = yyyy + "-" + mm + "-" + dd;

    const [enquiryDownload, setEnquiryDownload] = useState({
        enquiry_from_date: "2023-04-01",
        enquiry_to_date: todayback,
        enquiry_buyer: "",
        enquiry_status: "",
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

    const onInputChange = (e) => {
        
        setEnquiryDownload({
        ...enquiryDownload,
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
            enquiry_from_date: enquiryDownload.enquiry_from_date,
            enquiry_to_date: enquiryDownload.enquiry_to_date,
            enquiry_buyer: enquiryDownload.enquiry_buyer,
            enquiry_status: enquiryDownload.enquiry_status,
        };
        e.preventDefault();
        var v = document.getElementById("addIndiv").checkValidity();
        var v = document.getElementById("addIndiv").reportValidity();
        if (v) {
        setIsButtonDisabled(true)
        axios({
            url: baseURL+"/download-enquiry-report",
            method: "POST",
            data,
            headers: {
            Authorization: `Bearer ${localStorage.getItem("login")}`,
            },
        }).then((res) => {
            const url = window.URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'enquiry_list.csv');
            document.body.appendChild(link);
            link.click();
            NotificationManager.success("Enquiry Report is Downloaded Successfully");
            setIsButtonDisabled(false)
            
        }).catch((err) =>{
            NotificationManager.error("Enquiry Report is Not Downloaded");
            setIsButtonDisabled(false)
        });
    }
    };

    const onReportView = (e) => {
        e.preventDefault();

        localStorage.setItem('enquiry_from_date',enquiryDownload.enquiry_from_date);
        localStorage.setItem('enquiry_to_date',enquiryDownload.enquiry_to_date);
        localStorage.setItem('enquiry_buyer',enquiryDownload.enquiry_buyer);
        localStorage.setItem('enquiry_status',enquiryDownload.enquiry_status);
        history.push("/enqsReport");
        
    }

    return(
        <div>
            <div className="page-header">
                <h3 className="page-title"> Enquiry Report </h3>
            </div>
            <div className="row">
                <div className="col-md-12 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <form id="addIndiv" autoComplete="off">
                                <div className="row">
                                    <div className="col-sm-12 col-md-12 col-xl-3">
                                        <div className="form-group">
                                            <TextField
                                            fullWidth
                                            required
                                            label="From Date"
                                            type="date"
                                            InputLabelProps={{ shrink: true }}
                                            autoComplete="Name"
                                            name="enquiry_from_date"
                                            value={enquiryDownload.enquiry_from_date}
                                            onChange={(e) => onInputChange(e)}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-12 col-xl-3">
                                        <div className="form-group">
                                            <TextField
                                            fullWidth
                                            required
                                            label="To Date"
                                            type="date"
                                            InputLabelProps={{ shrink: true }}
                                            autoComplete="Name"
                                            name="enquiry_to_date"
                                            value={enquiryDownload.enquiry_to_date}
                                            onChange={(e) => onInputChange(e)}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-12 col-xl-3">
                                        <div className="form-group">
                                            <TextField
                                            fullWidth
                                            label="Buyer Name"
                                            autoComplete="Name"
                                            SelectProps={{
                                                MenuProps: {},
                                            }}
                                            select
                                            name="enquiry_buyer"
                                            value={enquiryDownload.enquiry_buyer}
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
                                    <div className="col-sm-12 col-md-12 col-xl-3">
                                        <div className="form-group">
                                            <TextField
                                            fullWidth
                                            label="Status"
                                            autoComplete="Name"
                                            SelectProps={{
                                                MenuProps: {},
                                            }}
                                            select
                                            name="enquiry_status"
                                            value={enquiryDownload.enquiry_status}
                                            onChange={(e) => onInputChange(e)}
                                            >
                                            {status.map((option) => (
                                                <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                                </MenuItem>
                                            ))}
                                            </TextField>
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-12 col-xl-12">
                                        <div className="form-group">
                                        <Button
                                            type="submit"
                                            className="btn btn-gradient-primary mr-2"
                                            color="primary"
                                            onClick={(e) => onSubmit(e)}
                                            disabled={isButtonDisabled}
                                            >
                                            Download
                                            </Button>
                                            <Button
                                            
                                            className="btn btn-gradient-primary mr-2"
                                            color="primary"
                                            onClick={(e) => onReportView(e)}
                                            disabled={isButtonDisabled}
                                            >
                                            View
                                            </Button>
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

export default EnquiryForm;