import React, { useEffect, useState, useRef } from "react";
import {baseURL} from '../../../api';
import axios from "axios";
import Moment from 'moment';
import CircularProgress from '@material-ui/core/CircularProgress';
import ReactToPrint from "react-to-print";
import { NotificationManager,} from "react-notifications";
import { savePDF } from '@progress/kendo-react-pdf';

const table_head = {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: "12px"
};

const table_row = {
    fontSize: "11px"
};

const EnquiryReport = (props) => {

    const componentRef = useRef();

    const [loader, setLoader]= useState(true);

    const [enquiryDownload, setEnquiryDownload] = useState([]);

        useEffect(() => {
        var isLoggedIn = localStorage.getItem("user_type_id");
        if(!isLoggedIn){

        window.location = "/signin";
        
        }else{

        }

        let data = {
            enquiry_from_date:localStorage.getItem("enquiry_from_date"),
            enquiry_to_date: localStorage.getItem("enquiry_to_date"), 
            enquiry_buyer: localStorage.getItem("enquiry_buyer"),
            enquiry_status: localStorage.getItem("enquiry_status"),
        };

        axios({
            url: baseURL+"/web-fetch-enquiry-report-list",
            method: "POST",
            data,
            headers: {
              Authorization: `Bearer ${localStorage.getItem("login")}`,
            },
          }).then((res) => {
            
            setEnquiryDownload(res.data.enquiry);
            setLoader(false);

          });
        }, []);

        const onSubmit = (e) => {
      
            let data = {
                enquiry_from_date:localStorage.getItem("enquiry_from_date"),
                enquiry_to_date: localStorage.getItem("enquiry_to_date"), 
                enquiry_buyer: localStorage.getItem("enquiry_buyer"),
                enquiry_status: localStorage.getItem("enquiry_status"),
            };
            e.preventDefault();
            
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
                
                
            }).catch((err) =>{
                NotificationManager.error("Enquiry Report is Not Downloaded");
                
            });
        
        };

        const  handleExportWithFunction  = (e) => {
            savePDF(componentRef.current, { 
                paperSize:  "A4", 
                orientation: "vertical",
                scale: 0.8,
            });
        }

    return(
        <div>
            { loader && <CircularProgress disableShrink style={{marginLeft:"600px", marginTop:"300px", marginBottom:"300px"}} color="secondary" />}
            {!loader && 
            <>
            <div className="page-header">
                <h3 className="page-title"> Enquiry Report </h3>
            </div>
            <div className="row">
                <div className="col-md-12 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <div className="row icons-list">
                                <div className="col-sm-6 col-md-4 col-lg-4" style={{justifyContent:'center'}}>
                                    <a className="btn btn-gradient-primary" onClick={(e) => handleExportWithFunction(e)}>
                                        <i className=" mdi mdi-file" style={{color:'white'}}></i> PDF
                                    </a>
                                </div>
                                <div className="col-sm-6 col-md-4 col-lg-4" style={{justifyContent:'center'}}>
                                    <a className="btn btn-gradient-primary" onClick={(e) => onSubmit(e)}>
                                        <i className=" mdi mdi-download" style={{color:'white'}}></i> Download
                                    </a>
                                </div>
                                <div className="col-sm-6 col-md-4 col-lg-4" style={{justifyContent:'center'}}>
                                    <ReactToPrint
                                        trigger={() => (
                                            <a className="btn btn-gradient-primary">
                                                <i className=" mdi mdi-printer" style={{color:'white'}}></i> Print Letter
                                            </a>
                                        )}
                                        content={() => componentRef.current}
                                        
                                        />
                                </div> 
                            </div>
                            <div className="row mt-4" ref={componentRef}>
                                <div className="table-responsive" style={{margin:'10px'}}>
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th style={table_head}>Enq Date</th>
                                                <th style={table_head}>Buyer</th>
                                                <th style={table_head}>Departure Date</th>
                                                <th style={table_head}>Vehicle</th>
                                                <th style={table_head}>Place</th>
                                                <th style={table_head}>Charges</th>
                                                <th style={table_head}>Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {enquiryDownload.map((dataSumm, key)=>(
                                                <tr>
                                                    <td style={table_row}>{Moment(dataSumm.enq_date).format('DD-MM-YYYY')}</td>
                                                    <td style={table_row}>{dataSumm.buyer_name}</td>
                                                    <td style={table_row}>{Moment(dataSumm.order_date).format('DD-MM-YYYY')}</td>
                                                    <td style={table_row}>{dataSumm.vehicle_type}</td>
                                                    <td style={table_row}>{dataSumm.place_from} - {dataSumm.place_to}</td>
                                                    <td style={table_row}>{dataSumm.charges_from} - {dataSumm.charges_to}</td>
                                                    <td style={table_row}>{dataSumm.enq_status}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </>}
        </div>
    );

}

export default EnquiryReport;