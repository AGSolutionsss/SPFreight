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
    fontSize: "10px"
};

const table_row = {
    fontSize: "9px"
};

const BookingReport = (props) => {

    const componentRef = useRef();

    const [loader, setLoader]= useState(true);

    const [bookingDownload, setBookingDownload] = useState([]);

        useEffect(() => {
        var isLoggedIn = localStorage.getItem("user_type_id");
        if(!isLoggedIn){

        window.location = "/signin";
        
        }else{

        }

        let data = {
            booking_from_date:localStorage.getItem("booking_from_date"),
            booking_to_date: localStorage.getItem("booking_to_date"), 
            booking_vendor: localStorage.getItem("booking_vendor"),
            booking_buyer: localStorage.getItem("booking_buyer"),
            booking_status: localStorage.getItem("booking_status"),
        };

        axios({
            url: baseURL+"/web-fetch-booking-report-list",
            method: "POST",
            data,
            headers: {
              Authorization: `Bearer ${localStorage.getItem("login")}`,
            },
          }).then((res) => {
            
            setBookingDownload(res.data.booking);
            setLoader(false);

          });
        }, []);

        const onSubmit = (e) => {
      
            let data = {
                booking_from_date:localStorage.getItem("booking_from_date"),
                booking_to_date: localStorage.getItem("booking_to_date"), 
                booking_vendor: localStorage.getItem("booking_vendor"),
                booking_buyer: localStorage.getItem("booking_buyer"),
                booking_status: localStorage.getItem("booking_status"),
            };
            e.preventDefault();
            
            axios({
                url: baseURL+"/download-booking-report",
                method: "POST",
                data,
                headers: {
                Authorization: `Bearer ${localStorage.getItem("login")}`,
                },
            }).then((res) => {
                const url = window.URL.createObjectURL(new Blob([res.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'booking_list.csv');
                document.body.appendChild(link);
                link.click();
                NotificationManager.success("Booking Report is Downloaded Successfully");
                
                
            }).catch((err) =>{
                NotificationManager.error("Booking Report is Not Downloaded");
                
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
                <h3 className="page-title"> Booking Report </h3>
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
                                                <th style={table_head}>Departure Date</th>
                                                <th style={table_head}>Booking No</th>
                                                <th style={table_head}>Booking Date</th>
                                                <th style={table_head}>Buyer</th>
                                                <th style={table_head}>Vendor</th>
                                                <th style={table_head}>Place</th>
                                                <th style={table_head}>Vehicle</th>
                                                <th style={table_head}>Charges</th>
                                                <th style={table_head}>Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {bookingDownload.map((dataSumm, key)=>(
                                                <tr>
                                                    <td style={table_row}>{Moment(dataSumm.enq_date).format('DD-MM-YYYY')}</td>
                                                    <td style={table_row}>{Moment(dataSumm.order_date).format('DD-MM-YYYY')}</td>
                                                    <td style={table_row}>{dataSumm.booking_no}</td>
                                                    <td style={table_row}>{Moment(dataSumm.booking_date).format('DD-MM-YYYY')}</td>
                                                    <td style={table_row}>{dataSumm.buyer_name}</td>
                                                    <td style={table_row}>{dataSumm.vendor_name}</td>
                                                    <td style={table_row}>{dataSumm.place_from} - {dataSumm.place_to}</td>
                                                    <td style={table_row}>{dataSumm.vehicle_type}</td>
                                                    <td style={table_row}>{dataSumm.charges_from} - {dataSumm.charges_to}</td>
                                                    <td style={table_row}>{dataSumm.booking_status}</td>
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

export default BookingReport;