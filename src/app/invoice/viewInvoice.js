import React, { useEffect, useState, useRef } from "react";
import {baseURL} from '../../api';
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Moment from 'moment';
import { Button } from "reactstrap";
import { savePDF } from '@progress/kendo-react-pdf';
import ReactToPrint from "react-to-print";
import './view.css';
import numWords from "num-words";

const table_label = {
    border:'1px solid #ebedf2',
    width: '40px',
    fontSize:'13px',
    padding:'10px',
}
const table_label1 = {
    border:'1px solid #ebedf2',
    width: '40px',
    fontSize:'13px',
    padding:'10px',
    textAlign:'center',
}
const table_label2 = {
    border:'1px solid #ebedf2',
    width: '100px',
    fontSize:'13px',
    padding:'10px',
}
const table_comb = {
    border:'1px solid #ebedf2',
    width: '135px',
    textAlign:'center',
    fontSize:'13px',
    padding:'10px',
}
const table_comb_2 = {
    border:'1px solid #ebedf2',
    width: '135px',
    fontSize:'13px',
    verticalAlign:'top',
    whiteSpace: 'pre-wrap',
    overflowWrap:'break-word',
    padding:'10px',
}
const table_comb3 = {
    border:'1px solid #ebedf2',
    width: '135px',
    verticalAlign:'top',
    fontSize:'13px',
    whiteSpace: 'pre-wrap',
    overflowWrap:'break-word',
    padding:'10px',
}

const table_terms = {
    border:'1px solid #ebedf2',
    fontSize:'11px',
    whiteSpace: 'pre-wrap',
    overflowWrap:'break-word',
    textAlign:'justify',
    lineHeight:'1.2',
    with:'80%',
    padding:'10px',
}
const table_terms_no = {
    border:'1px solid #ebedf2',
    fontSize:'11px',
    padding:'10px',
}
const table_comb1 = {
    border:'1px solid #ebedf2',
    width: '135px',
    fontSize:'12px',
    padding:'10px',
}
const table_combLast = {
    border:'1px solid #ebedf2',
    width: '135px',
    textAlign:'center',
    fontSize:'13px',
    padding:'0px',
}
const table21 = {
    border:'1px solid #ebedf2',
    padding:'10px',
    fontSize:'10px',
}

const table_app = {
    border:'1px solid #ebedf2',
    width: '1px',
    textAlign:'center',
    fontSize:'13px',
    padding:'10px',
}

const ViewInvoice = (props) => {

   const componentRef = useRef();

    const params = useParams();

    const [invoice, setInvoice] = useState([]);
    const [invoiceSub, setInvoiceSub] = useState([]);
    const [invoiceSubFooter, setInvoiceSubFooter] = useState([]);
    const [invoiceSubBank, setInvoiceSubBank] = useState([]);

    useEffect(() => {
        var isLoggedIn = localStorage.getItem("user_type_id");
        if(!isLoggedIn){

        window.location = "/signin";
        
        }else{

        }

        axios({
            url: baseURL+"/web-fetch-invoice-by-id/" + params.id,
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("login")}`,
            },
          }).then((res) => {
            
            setInvoice(res.data.invoice)
            setInvoiceSub(res.data.invoicesub)
            setInvoiceSubFooter(res.data.invoiceSubFooter)
            setInvoiceSubBank(res.data.invoice_bank)
      
          });
        }, []);

        const  handleExportWithFunction  = (e) => {
            savePDF(componentRef.current, { 
               paperSize:  "A4", 
               orientation: "vertical",
               scale: 0.8,
            });
         }

    return(
        <div>
            <div className="page-header">
                <h3 className="page-title"> View Invoice </h3>
            </div>
            <div className="row">
                <div className="col-md-12 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                        <div className="row icons-list">
                                <div className="col-sm-6 col-md-6 col-lg-6" style={{justifyContent:'center'}}>
                                    <a className="btn btn-gradient-primary" onClick={(e) => handleExportWithFunction(e)}>
                                        <i className=" mdi mdi-file" style={{color:'white'}}></i> PDF
                                    </a>
                                </div>
                                
                                <div className="col-sm-6 col-md-6 col-lg-6" style={{justifyContent:'center'}}>
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
                           <div className="row" ref={componentRef}>
                              <div className="table-responsive">
                                <table className="table" style={{tableLayout: 'fixed',textAlign:'center'}}>
                                    <tr>
                                        <td style={{paddingBottom:'0px',border:'none'}}><h1>SP FREIGHT SYSTEMS PRIVATE LIMITED</h1></td>
                                    </tr>
                                    <tr>
                                        <td style={{border:'none',paddingTop:'0px',paddingBottom:'0px'}}><small>#116, GS Towers, 3rd Floor, R.R.Layout, BTM 4th Stage, Near Sai Baba Temple, Arekere, Bengaluru</small></td>
                                    </tr>
                                    <tr>
                                        <td style={{border:'none',paddingTop:'0px'}}><small>Email : sales@spfreightsystem.com Website : www.spfreightsystem.com PAN : ABHCS3943B GST No : 29ABHCS3943B1ZB</small></td>
                                    </tr>
                                </table>
                                 <table className="table" style={{border:'1px solid #ebedf2', tableLayout: 'fixed',marginLeft:'20px',marginRight:'20px', width:'96%'}}>
                                    <tr>
                                        <td style={table_comb_2} rowSpan={3} colSpan={3}>
                                            <b>{invoice.inv_buyer_name}</b><br/><br/>
                                            <b>{invoice.inv_buyer_address}</b>
                                       </td>
                                       <td style={table_label}>Invoice No</td>
                                       <td style={table_app}>:</td>
                                       <td style={table_label2}><b>{invoice.inv_ref}</b></td>
                                       <td colSpan={3} style={table_comb}>{invoice.inv_place}</td>
                                    </tr>
                                    <tr>
                                        
                                        <td style={table_label}>Invoice Date</td>
                                       <td style={table_app}>:</td>
                                       <td style={table_label2}><b>{Moment(invoice.inv_date).format('DD-MM-YYYY')}</b></td>
                                       <td style={table_label}>Period From</td>
                                       <td style={table_app}>:</td>
                                       <td style={table_label2}><b>{Moment(invoice.inv_period_from).format('DD-MM-YYYY')}</b></td>
                                    </tr>
                                    <tr>
                                       
                                       <td style={table_label}>GST</td>
                                       <td style={table_app}>:</td>
                                       <td style={table_label2}><b>{invoice.inv_buyer_gst}</b></td>
                                       <td style={table_label}>Period To</td>
                                       <td style={table_app}>:</td>
                                       <td style={table_label2}><b>{Moment(invoice.inv_period_to).format('DD-MM-YYYY')}</b></td>
                                    </tr>
                                    
                                    <tr>
                                        <td style={table_combLast}  colSpan={9}> 
                                            <table style={{width:'100%'}}>
                                                <thead>
                                                    <tr>
                                                        <th style={table21}>Date of <br/>Reporting</th>
                                                        <th style={table21}>LR <br/>No</th>
                                                        <th style={table21}>LR <br/>Date</th>
                                                        <th style={table21}>INV/DC <br/>No</th>
                                                        <th style={table21}>Destination</th>
                                                        <th style={table21}>Truck <br/>No</th>
                                                        <th style={table21}>Truck <br/>Type</th>
                                                        <th style={table21}>Date of <br/>Unloading</th>
                                                        <th style={table21}>Freight <br/>Charges</th>
                                                        <th style={table21}>Unloading <br/>Charges</th>
                                                        <th style={table21}>Halt <br/>Charges</th>
                                                        <th style={table21}>Other <br/>Charges</th>
                                                        <th style={table21}>Amount</th>
                                                    </tr>
                                                </thead>
                                               <tbody>
                                                {invoiceSub.map((subData, index) => (
                                                    <tr key={index}>
                                                        <td style={{border:'1px solid rgb(235, 237, 242)',fontSize:'10px'}}>
                                                            <b>{Moment(subData.inv_sub_reporting_date).format('DD-MM-YYYY')}</b>
                                                        </td>
                                                        <td style={{border:'1px solid rgb(235, 237, 242)',fontSize:'10px'}}>
                                                            <b>{subData.inv_sub_lr_no}</b>
                                                        </td>
                                                        <td style={{border:'1px solid rgb(235, 237, 242)',fontSize:'10px'}}>
                                                            <b>{Moment(subData.inv_sub_lr_date).format('DD-MM-YYYY')}</b>
                                                        </td>
                                                        <td style={{border:'1px solid rgb(235, 237, 242)',fontSize:'10px'}}>
                                                            <b>{subData.inv_sub_dc_no}</b>
                                                        </td>
                                                        <td style={{border:'1px solid rgb(235, 237, 242)',fontSize:'10px'}}>
                                                            <b>{subData.inv_sub_destination}</b>
                                                        </td>
                                                        <td style={{border:'1px solid rgb(235, 237, 242)',fontSize:'10px'}}>
                                                            <b>{subData.inv_sub_truck_no}</b>
                                                        </td>
                                                        <td style={{border:'1px solid rgb(235, 237, 242)',fontSize:'10px'}}>
                                                            <b>{subData.inv_sub_truck_type}</b>
                                                        </td>
                                                        <td style={{border:'1px solid rgb(235, 237, 242)',fontSize:'10px'}}>
                                                            <b>{Moment(subData.inv_sub_date_unload).format('DD-MM-YYYY')}</b>
                                                        </td>
                                                        <td style={{border:'1px solid rgb(235, 237, 242)',fontSize:'10px'}}>
                                                            <b>{subData.inv_sub_freight_charges}</b>
                                                        </td>
                                                        <td style={{border:'1px solid rgb(235, 237, 242)',fontSize:'10px'}}>
                                                            <b>{subData.inv_sub_unloading_charges}</b>
                                                        </td>
                                                        <td style={{border:'1px solid rgb(235, 237, 242)',fontSize:'10px'}}>
                                                            <b>{subData.inv_sub_halt_charges}</b>
                                                        </td>
                                                        <td style={{border:'1px solid rgb(235, 237, 242)',fontSize:'10px'}}>
                                                            <b>{subData.inv_sub_other_charges}</b>
                                                        </td>
                                                        <td style={{border:'1px solid rgb(235, 237, 242)',fontSize:'10px'}}>
                                                            <b>{parseInt(subData.inv_sub_other_charges) + parseInt(subData.inv_sub_freight_charges) + parseInt(subData.inv_sub_unloading_charges) + parseInt(subData.inv_sub_halt_charges)}</b>
                                                        </td>
                                                    </tr>
                                                ))}
                                                
                                               </tbody>
                                               <tfoot>
                                                <tr>
                                                    <td colSpan={8} style={{border:'1px solid rgb(235, 237, 242)',fontSize:'12px'}}>
                                                        <b>Rupees in Words : {numWords(invoiceSubFooter.inv_sub_freight_charges + invoiceSubFooter.inv_sub_unloading_charges + invoiceSubFooter.inv_sub_halt_charges + invoiceSubFooter.inv_sub_other_charges)} Only</b>
                                                    </td>
                                                    <td style={{border:'1px solid rgb(235, 237, 242)',fontSize:'10px'}}>
                                                        <b>{invoiceSubFooter.inv_sub_freight_charges}</b>
                                                    </td>
                                                    <td style={{border:'1px solid rgb(235, 237, 242)',fontSize:'10px'}}>
                                                        <b>{invoiceSubFooter.inv_sub_unloading_charges}</b>
                                                    </td>
                                                    <td style={{border:'1px solid rgb(235, 237, 242)',fontSize:'10px'}}>
                                                        <b>{invoiceSubFooter.inv_sub_halt_charges}</b>
                                                    </td>
                                                    <td style={{border:'1px solid rgb(235, 237, 242)',fontSize:'10px'}}>
                                                        <b>{invoiceSubFooter.inv_sub_other_charges}</b>
                                                    </td>
                                                    <td style={{border:'1px solid rgb(235, 237, 242)',fontSize:'10px'}}>
                                                        <b>{invoiceSubFooter.inv_sub_freight_charges + invoiceSubFooter.inv_sub_unloading_charges + invoiceSubFooter.inv_sub_halt_charges + invoiceSubFooter.inv_sub_other_charges}</b>
                                                    </td>
                                                </tr>
                                               </tfoot>
                                            </table>
                                        </td>
                                        
                                    </tr>
                                    <tr>
                                        <td style={table_label}>Declaration</td>
                                       <td style={table_app}>:</td>
                                       <td colSpan={7} style={table_label2}><b>{invoice.inv_declaration}</b></td>
                                    </tr>
                                    <tr>
                                        <td colSpan={3} style={table_label}>Bank Details</td>
                                        <td colSpan={3} rowSpan={4} style={table_label}><label style={{fontSize:'12px',textAlign:"justify",lineHeight:'1.5',width:'100%',overflow:'clip',whiteSpace: 'pre-wrap',overflowWrap: 'break-word'}}>All payments should be made by a/c payee cheque/DD and NEFT/RTGS Only</label></td>
                                        <td colSpan={3} rowSpan={4} style={table_label1}>For <b>SP FREIGHT SYSTEMS PRIVATE LIMITED</b><br/><br/><br/><br/><br/><br/><b>Authorised Signatory</b></td>
                                    </tr>
                                    <tr>
                                        <td style={table_label}>BANK</td>
                                        <td style={table_app}>:</td>
                                        <td style={table_label2}><b>{invoiceSubBank.bank_name}</b></td>
                                    </tr>
                                    <tr>
                                        <td style={table_label}>AccNo</td>
                                        <td style={table_app}>:</td>
                                        <td style={table_label2}><b>{invoiceSubBank.bank_acc_no}</b></td>
                                    </tr>
                                    <tr>
                                        <td style={table_label}>BANK IFSC</td>
                                        <td style={table_app}>:</td>
                                        <td style={table_label2}><b>{invoiceSubBank.bank_ifsc}</b></td>
                                    </tr>
                                 </table>
                              </div>
                            </div>
                            
                           
                            <Link to="../invoice">
                                <Button className="btn btn-gradient-primary mr-2 mt-4" color="success">
                                    Back
                                </Button>
                            </Link> 
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default ViewInvoice;