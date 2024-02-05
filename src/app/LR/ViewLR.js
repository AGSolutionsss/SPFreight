import React, { useEffect, useState, useRef } from "react";
import {baseURL} from '../../api';
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Moment from 'moment';
import { Button } from "reactstrap";
import { savePDF } from '@progress/kendo-react-pdf';
import ReactToPrint from "react-to-print";
import { NotificationManager,} from "react-notifications";
import './view.css';

const table_label = {
    border:'1px solid #ebedf2',
    width: '40px',
    fontSize:'13px',
    padding:'10px',
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
const table2 = {
    border:'1px solid #ebedf2',
    padding:'10px',
}
const table_app = {
    border:'1px solid #ebedf2',
    width: '1px',
    textAlign:'center',
    fontSize:'13px',
    padding:'10px',
}

const ViewLR = (props) => {

   const componentRef = useRef();

    const params = useParams();

    const [lr, setLR] = useState([]);
    const [lrSub, setLRSub] = useState([]);

    useEffect(() => {
        var isLoggedIn = localStorage.getItem("user_type_id");
        if(!isLoggedIn){

        window.location = "/signin";
        
        }else{

        }

        axios({
            url: baseURL+"/web-fetch-lr-by-id/" + params.id,
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("login")}`,
            },
          }).then((res) => {
            
            setLR(res.data.lr)
            setLRSub(res.data.lrsub)
      
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
                <h3 className="page-title"> View LR </h3>
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
                                       <td style={table_label}>Lorry No</td>
                                       <td style={table_app}>:</td>
                                       <td style={table_label2}><b>{lr.lr_vehicle_no}</b></td>
                                       <td colSpan={3} style={table_comb}>CONSIGNEE COPY</td>
                                       <td style={table_label}>GST</td>
                                       <td style={table_app}>:</td>
                                       <td style={table_label2}><b>29ABHCS3943B1ZB</b></td>
                                    </tr>
                                    <tr>
                                       <td colSpan={3} style={table_comb}>NOTICE</td>
                                       <td colSpan={3} style={table_comb}>AT CARRIER'S / OWNER'S RISK</td>
                                       <td style={table_label}>PAN No</td>
                                       <td style={table_app}>:</td>
                                       <td style={table_label2}><b>ABHCS3943B</b></td>
                                    </tr>
                                    <tr>
                                       <td colSpan={3} rowSpan={2} style={{width:'135px',paddingLeft: '10px',paddingRight: '10px',verticalAlign:'top'}}>
                                        <label style={{fontSize:'12px',textAlign:"justify",lineHeight:'1.2',width:'100%',overflow:'auto',whiteSpace: 'pre-wrap',overflowWrap: 'break-word'}}>The Consignment convered by this set is special lorry receipt from shall be stored at the destination under the control of transport poerator and shell be delivered to or to the order of the consignee bank whose name is mentioned in the lorry receipt it will under  no circumstance be delivered to any one without the written authority from the consignee bank or is order endrosed on the consignee copy or on aseparate letter of authority.</label></td>
                                       <td colSpan={3} style={table_comb}>INSURANCE</td>
                                       <td style={table_label}>CIN No</td>
                                       <td style={table_app}>:</td>
                                       <td style={table_label2}><b>U63030KA2021PTC154991</b></td>
                                    </tr>
                                    <tr>
                                        <td style={table_comb1} colSpan={3}>
                                            The Customer has started at
                                            <br/>
                                            <input type="checkbox" style={{marginTop:'5px'}}/>&nbsp;
                                            He has not insured the consignment OR 
                                            <br/>
                                            <input type="checkbox" style={{marginTop:'5px'}}/>&nbsp;
                                            He has insured the consignment<br/>
                                            <span style={{marginTop:'5px',fontSize:'11px',lineHeight:'1.5'}}>
                                            Company __________________________________<br/>
                                            Policy No _______________ Date _____________<br/>
                                            Amount ________________ Risk _______________</span>
                                        </td>
                                        <td style={table_comb_2} colSpan={3}>
                                            <span>Address of Delivery Office</span>
                                            <br/>
                                            <br/>
                                            <b>{lr.consignee_address}</b>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={table_label} colSpan={3}>Consignor's Name</td>
                                        <td style={table_label} colSpan={3}>Consignee's Name</td>
                                        <td style={table_label}>LR No</td>
                                        <td style={table_app}>:</td>
                                        <td style={table_label2}><b>{lr.lr_no}</b></td>
                                    </tr>
                                    <tr>
                                        <td style={table_comb3} rowSpan={3} colSpan={3}>
                                            <span><b>{lr.buyer_name}</b></span><br/><br/>
                                            <b>{lr.buyer_address}</b>
                                        </td>
                                        <td style={table_comb3} rowSpan={3} colSpan={3}>
                                            <span><b>{lr.consignee_name}</b></span><br/><br/>
                                            <b>{lr.consignee_address}</b>
                                        </td>
                                        <td style={table_label}>Date</td>
                                        <td style={table_app}>:</td>
                                        <td style={table_label2}><b>{lr.lr_date}</b></td>
                                    </tr>
                                    <tr>
                                        <td style={table_label}>From</td>
                                        <td style={table_app}>:</td>
                                        <td style={table_label2}><b>{lr.lr_from}</b></td>
                                    </tr>
                                    <tr>
                                        <td style={table_label}>To</td>
                                        <td style={table_app}>:</td>
                                        <td style={table_label2}><b>{lr.lr_to}</b></td>
                                    </tr>
                                    <tr>
                                        <td style={table_combLast}  colSpan={6}> 
                                            <table style={{width:'100%'}}>
                                                <thead>
                                                    <tr>
                                                        <th style={table2}>Quantity</th>
                                                        <th style={table2}>Particulars (Description)</th>
                                                    </tr>
                                                </thead>
                                               <tbody>
                                                {lrSub.map((subData, index) => (
                                                    <tr key={index}>
                                                        <td style={{border:'1px solid rgb(235, 237, 242)'}}>
                                                            <b>{subData.lr_sub_description}</b>
                                                        </td>
                                                        <td style={{border:'1px solid rgb(235, 237, 242)'}}>
                                                            <b>{subData.lr_sub_quantity}</b>
                                                        </td>
                                                    </tr>
                                                ))}
                                                
                                               </tbody>
                                            </table>
                                        </td>
                                        <td style={table_comb3} colSpan={3}>
                                            <span>Remarks</span><br/><br/>
                                            <b>{lr.lr_remarks}</b>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={table_label}>Value</td>
                                        <td style={table_app}>:</td>
                                        <td style={table_label2}><b>{lr.lr_value}</b></td>
                                        <td style={table_label}>EWB No</td>
                                        <td style={table_app}>:</td>
                                        <td style={table_label2}><b>{lr.lr_ewb_no}</b></td>
                                        <td style={table_label}>INV No</td>
                                        <td style={table_app}>:</td>
                                        <td style={table_label2}><b>{lr.lr_inv_no}</b></td>
                                    </tr>
                                    <tr>
                                        <td style={table_label}>To Pay</td>
                                        <td style={table_app}><input type="checkbox" checked={ lr.lr_pay == 'Yes' ? 'defaultChecked' : ''}/></td>
                                        <td style={table_label}>To be Billed</td>
                                        <td style={table_app}><input type="checkbox" checked={ lr.lr_to_be_paid == 'Yes' ? 'defaultChecked' : ''}/></td>
                                        <td style={table_label}>Paid</td>
                                        <td style={table_app}><input type="checkbox" checked={ lr.lr_paid == 'Yes' ? 'defaultChecked' : ''}/></td>
                                        <td style={table_comb} rowSpan={2} colSpan={3}>
                                            <br/>
                                            <br/>
                                            <br/>
                                            <b>Signature</b>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan={6} style={{fontSize:'11px'}}>
                                            Note : Not Responsible for Leakages, Breakage & Damages
                                        </td>
                                    </tr>
                                 </table>
                                 <hr/>
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
                                       <td style={table_label}>Lorry No</td>
                                       <td style={table_app}>:</td>
                                       <td style={table_label2}><b>{lr.lr_vehicle_no}</b></td>
                                       <td colSpan={3} style={table_comb}>CONSIGNOR COPY</td>
                                       <td style={table_label}>GST</td>
                                       <td style={table_app}>:</td>
                                       <td style={table_label2}><b>29ABHCS3943B1ZB</b></td>
                                    </tr>
                                    <tr>
                                       <td colSpan={3} style={table_comb}>NOTICE</td>
                                       <td colSpan={3} style={table_comb}>AT CARRIER'S / OWNER'S RISK</td>
                                       <td style={table_label}>PAN No</td>
                                       <td style={table_app}>:</td>
                                       <td style={table_label2}><b>ABHCS3943B</b></td>
                                    </tr>
                                    <tr>
                                       <td colSpan={3} rowSpan={2} style={{width:'135px',paddingLeft: '10px',paddingRight: '10px',verticalAlign:'top'}}>
                                        <label style={{fontSize:'12px',textAlign:"justify",lineHeight:'1.2',width:'100%',overflow:'auto',whiteSpace: 'pre-wrap',overflowWrap: 'break-word'}}>The Consignment convered by this set is special lorry receipt from shall be stored at the destination under the control of transport poerator and shell be delivered to or to the order of the consignee bank whose name is mentioned in the lorry receipt it will under  no circumstance be delivered to any one without the written authority from the consignee bank or is order endrosed on the consignee copy or on aseparate letter of authority.</label></td>
                                       <td colSpan={3} style={table_comb}>INSURANCE</td>
                                       <td style={table_label}>CIN No</td>
                                       <td style={table_app}>:</td>
                                       <td style={table_label2}><b>U63030KA2021PTC154991</b></td>
                                    </tr>
                                    <tr>
                                        <td style={table_comb1} colSpan={3}>
                                            The Customer has started at
                                            <br/>
                                            <input type="checkbox" style={{marginTop:'5px'}}/>&nbsp;
                                            He has not insured the consignment OR 
                                            <br/>
                                            <input type="checkbox" style={{marginTop:'5px'}}/>&nbsp;
                                            He has insured the consignment<br/>
                                            <span style={{marginTop:'5px',fontSize:'11px',lineHeight:'1.5'}}>
                                            Company __________________________________<br/>
                                            Policy No _______________ Date _____________<br/>
                                            Amount ________________ Risk _______________</span>
                                        </td>
                                        <td style={table_comb_2} colSpan={3}>
                                            <span>Address of Delivery Office</span>
                                            <br/>
                                            <br/>
                                            <b>{lr.consignee_address}</b>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={table_label} colSpan={3}>Consignor's Name</td>
                                        <td style={table_label} colSpan={3}>Consignee's Name</td>
                                        <td style={table_label}>LR No</td>
                                        <td style={table_app}>:</td>
                                        <td style={table_label2}><b>{lr.lr_no}</b></td>
                                    </tr>
                                    <tr>
                                        <td style={table_comb3} rowSpan={3} colSpan={3}>
                                            <span><b>{lr.buyer_name}</b></span><br/><br/>
                                            <b>{lr.buyer_address}</b>
                                        </td>
                                        <td style={table_comb3} rowSpan={3} colSpan={3}>
                                            <span><b>{lr.consignee_name}</b></span><br/><br/>
                                            <b>{lr.consignee_address}</b>
                                        </td>
                                        <td style={table_label}>Date</td>
                                        <td style={table_app}>:</td>
                                        <td style={table_label2}><b>{lr.lr_date}</b></td>
                                    </tr>
                                    <tr>
                                        <td style={table_label}>From</td>
                                        <td style={table_app}>:</td>
                                        <td style={table_label2}><b>{lr.lr_from}</b></td>
                                    </tr>
                                    <tr>
                                        <td style={table_label}>To</td>
                                        <td style={table_app}>:</td>
                                        <td style={table_label2}><b>{lr.lr_to}</b></td>
                                    </tr>
                                    <tr>
                                        <td style={table_combLast}  colSpan={6}> 
                                            <table style={{width:'100%'}}>
                                                <thead>
                                                    <tr>
                                                        <th style={table2}>Quantity</th>
                                                        <th style={table2}>Particulars (Description)</th>
                                                    </tr>
                                                </thead>
                                               <tbody>
                                                {lrSub.map((subData, index) => (
                                                    <tr key={index}>
                                                        <td style={{border:'1px solid rgb(235, 237, 242)'}}>
                                                            <b>{subData.lr_sub_description}</b>
                                                        </td>
                                                        <td style={{border:'1px solid rgb(235, 237, 242)'}}>
                                                            <b>{subData.lr_sub_quantity}</b>
                                                        </td>
                                                    </tr>
                                                ))}
                                                
                                               </tbody>
                                            </table>
                                        </td>
                                        <td style={table_comb3} colSpan={3}>
                                            <span>Remarks</span><br/><br/>
                                            <b>{lr.lr_remarks}</b>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={table_label}>Value</td>
                                        <td style={table_app}>:</td>
                                        <td style={table_label2}><b>{lr.lr_value}</b></td>
                                        <td style={table_label}>EWB No</td>
                                        <td style={table_app}>:</td>
                                        <td style={table_label2}><b>{lr.lr_ewb_no}</b></td>
                                        <td style={table_label}>INV No</td>
                                        <td style={table_app}>:</td>
                                        <td style={table_label2}><b>{lr.lr_inv_no}</b></td>
                                    </tr>
                                    <tr>
                                        <td style={table_label}>To Pay</td>
                                        <td style={table_app}><input type="checkbox" checked={ lr.lr_pay == 'Yes' ? 'defaultChecked' : ''}/></td>
                                        <td style={table_label}>To be Billed</td>
                                        <td style={table_app}><input type="checkbox" checked={ lr.lr_to_be_paid == 'Yes' ? 'defaultChecked' : ''}/></td>
                                        <td style={table_label}>Paid</td>
                                        <td style={table_app}><input type="checkbox" checked={ lr.lr_paid == 'Yes' ? 'defaultChecked' : ''}/></td>
                                        <td style={table_comb} rowSpan={2} colSpan={3}>
                                            <br/>
                                            <br/>
                                            <br/>
                                            <b>Signature</b>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan={6} style={{fontSize:'11px'}}>
                                            Note : Not Responsible for Leakages, Breakage & Damages
                                        </td>
                                    </tr>
                                 </table>
                                 <hr/>
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
                                       <td style={table_label}>Lorry No</td>
                                       <td style={table_app}>:</td>
                                       <td style={table_label2}><b>{lr.lr_vehicle_no}</b></td>
                                       <td colSpan={3} style={table_comb}>DRIVER COPY</td>
                                       <td style={table_label}>GST</td>
                                       <td style={table_app}>:</td>
                                       <td style={table_label2}><b>29ABHCS3943B1ZB</b></td>
                                    </tr>
                                    <tr>
                                       <td colSpan={3} style={table_comb}>NOTICE</td>
                                       <td colSpan={3} style={table_comb}>AT CARRIER'S / OWNER'S RISK</td>
                                       <td style={table_label}>PAN No</td>
                                       <td style={table_app}>:</td>
                                       <td style={table_label2}><b>ABHCS3943B</b></td>
                                    </tr>
                                    <tr>
                                       <td colSpan={3} rowSpan={2} style={{width:'135px',paddingLeft: '10px',paddingRight: '10px',verticalAlign:'top'}}>
                                        <label style={{fontSize:'12px',textAlign:"justify",lineHeight:'1.2',width:'100%',overflow:'auto',whiteSpace: 'pre-wrap',overflowWrap: 'break-word'}}>The Consignment convered by this set is special lorry receipt from shall be stored at the destination under the control of transport poerator and shell be delivered to or to the order of the consignee bank whose name is mentioned in the lorry receipt it will under  no circumstance be delivered to any one without the written authority from the consignee bank or is order endrosed on the consignee copy or on aseparate letter of authority.</label></td>
                                       <td colSpan={3} style={table_comb}>INSURANCE</td>
                                       <td style={table_label}>CIN No</td>
                                       <td style={table_app}>:</td>
                                       <td style={table_label2}><b>U63030KA2021PTC154991</b></td>
                                    </tr>
                                    <tr>
                                        <td style={table_comb1} colSpan={3}>
                                            The Customer has started at
                                            <br/>
                                            <input type="checkbox" style={{marginTop:'5px'}}/>&nbsp;
                                            He has not insured the consignment OR 
                                            <br/>
                                            <input type="checkbox" style={{marginTop:'5px'}}/>&nbsp;
                                            He has insured the consignment<br/>
                                            <span style={{marginTop:'5px',fontSize:'11px',lineHeight:'1.5'}}>
                                            Company __________________________________<br/>
                                            Policy No _______________ Date _____________<br/>
                                            Amount ________________ Risk _______________</span>
                                        </td>
                                        <td style={table_comb_2} colSpan={3}>
                                            <span>Address of Delivery Office</span>
                                            <br/>
                                            <br/>
                                            <b>{lr.consignee_address}</b>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={table_label} colSpan={3}>Consignor's Name</td>
                                        <td style={table_label} colSpan={3}>Consignee's Name</td>
                                        <td style={table_label}>LR No</td>
                                        <td style={table_app}>:</td>
                                        <td style={table_label2}><b>{lr.lr_no}</b></td>
                                    </tr>
                                    <tr>
                                        <td style={table_comb3} rowSpan={3} colSpan={3}>
                                            <span><b>{lr.buyer_name}</b></span><br/><br/>
                                            <b>{lr.buyer_address}</b>
                                        </td>
                                        <td style={table_comb3} rowSpan={3} colSpan={3}>
                                            <span><b>{lr.consignee_name}</b></span><br/><br/>
                                            <b>{lr.consignee_address}</b>
                                        </td>
                                        <td style={table_label}>Date</td>
                                        <td style={table_app}>:</td>
                                        <td style={table_label2}><b>{lr.lr_date}</b></td>
                                    </tr>
                                    <tr>
                                        <td style={table_label}>From</td>
                                        <td style={table_app}>:</td>
                                        <td style={table_label2}><b>{lr.lr_from}</b></td>
                                    </tr>
                                    <tr>
                                        <td style={table_label}>To</td>
                                        <td style={table_app}>:</td>
                                        <td style={table_label2}><b>{lr.lr_to}</b></td>
                                    </tr>
                                    <tr>
                                        <td style={table_combLast}  colSpan={6}> 
                                            <table style={{width:'100%'}}>
                                                <thead>
                                                    <tr>
                                                        <th style={table2}>Quantity</th>
                                                        <th style={table2}>Particulars (Description)</th>
                                                    </tr>
                                                </thead>
                                               <tbody>
                                                {lrSub.map((subData, index) => (
                                                    <tr key={index}>
                                                        <td style={{border:'1px solid rgb(235, 237, 242)'}}>
                                                            <b>{subData.lr_sub_description}</b>
                                                        </td>
                                                        <td style={{border:'1px solid rgb(235, 237, 242)'}}>
                                                            <b>{subData.lr_sub_quantity}</b>
                                                        </td>
                                                    </tr>
                                                ))}
                                                
                                               </tbody>
                                            </table>
                                        </td>
                                        <td style={table_comb3} colSpan={3}>
                                            <span>Remarks</span><br/><br/>
                                            <b>{lr.lr_remarks}</b>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={table_label}>Value</td>
                                        <td style={table_app}>:</td>
                                        <td style={table_label2}><b>{lr.lr_value}</b></td>
                                        <td style={table_label}>EWB No</td>
                                        <td style={table_app}>:</td>
                                        <td style={table_label2}><b>{lr.lr_ewb_no}</b></td>
                                        <td style={table_label}>INV No</td>
                                        <td style={table_app}>:</td>
                                        <td style={table_label2}><b>{lr.lr_inv_no}</b></td>
                                    </tr>
                                    <tr>
                                        <td style={table_label}>To Pay</td>
                                        <td style={table_app}><input type="checkbox" checked={ lr.lr_pay == 'Yes' ? 'defaultChecked' : ''}/></td>
                                        <td style={table_label}>To be Billed</td>
                                        <td style={table_app}><input type="checkbox" checked={ lr.lr_to_be_paid == 'Yes' ? 'defaultChecked' : ''}/></td>
                                        <td style={table_label}>Paid</td>
                                        <td style={table_app}><input type="checkbox" checked={ lr.lr_paid == 'Yes' ? 'defaultChecked' : ''}/></td>
                                        <td style={table_comb} rowSpan={2} colSpan={3}>
                                            <br/>
                                            <br/>
                                            <br/>
                                            <b>Signature</b>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan={6} style={{fontSize:'11px'}}>
                                            Note : Not Responsible for Leakages, Breakage & Damages
                                        </td>
                                    </tr>
                                 </table>
                                 <hr/>
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
                                       <td style={table_label}>Lorry No</td>
                                       <td style={table_app}>:</td>
                                       <td style={table_label2}><b>{lr.lr_vehicle_no}</b></td>
                                       <td colSpan={3} style={table_comb}>FILE COPY</td>
                                       <td style={table_label}>GST</td>
                                       <td style={table_app}>:</td>
                                       <td style={table_label2}><b>29ABHCS3943B1ZB</b></td>
                                    </tr>
                                    <tr>
                                       <td colSpan={3} style={table_comb}>NOTICE</td>
                                       <td colSpan={3} style={table_comb}>AT CARRIER'S / OWNER'S RISK</td>
                                       <td style={table_label}>PAN No</td>
                                       <td style={table_app}>:</td>
                                       <td style={table_label2}><b>ABHCS3943B</b></td>
                                    </tr>
                                    <tr>
                                       <td colSpan={3} rowSpan={2} style={{width:'135px',paddingLeft: '10px',paddingRight: '10px',verticalAlign:'top'}}>
                                        <label style={{fontSize:'12px',textAlign:"justify",lineHeight:'1.2',width:'100%',overflow:'auto',whiteSpace: 'pre-wrap',overflowWrap: 'break-word'}}>The Consignment convered by this set is special lorry receipt from shall be stored at the destination under the control of transport poerator and shell be delivered to or to the order of the consignee bank whose name is mentioned in the lorry receipt it will under  no circumstance be delivered to any one without the written authority from the consignee bank or is order endrosed on the consignee copy or on aseparate letter of authority.</label></td>
                                       <td colSpan={3} style={table_comb}>INSURANCE</td>
                                       <td style={table_label}>CIN No</td>
                                       <td style={table_app}>:</td>
                                       <td style={table_label2}><b>U63030KA2021PTC154991</b></td>
                                    </tr>
                                    <tr>
                                        <td style={table_comb1} colSpan={3}>
                                            The Customer has started at
                                            <br/>
                                            <input type="checkbox" style={{marginTop:'5px'}}/>&nbsp;
                                            He has not insured the consignment OR 
                                            <br/>
                                            <input type="checkbox" style={{marginTop:'5px'}}/>&nbsp;
                                            He has insured the consignment<br/>
                                            <span style={{marginTop:'5px',fontSize:'11px',lineHeight:'1.5'}}>
                                            Company __________________________________<br/>
                                            Policy No _______________ Date _____________<br/>
                                            Amount ________________ Risk _______________</span>
                                        </td>
                                        <td style={table_comb_2} colSpan={3}>
                                            <span>Address of Delivery Office</span>
                                            <br/>
                                            <br/>
                                            <b>{lr.consignee_address}</b>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={table_label} colSpan={3}>Consignor's Name</td>
                                        <td style={table_label} colSpan={3}>Consignee's Name</td>
                                        <td style={table_label}>LR No</td>
                                        <td style={table_app}>:</td>
                                        <td style={table_label2}><b>{lr.lr_no}</b></td>
                                    </tr>
                                    <tr>
                                        <td style={table_comb3} rowSpan={3} colSpan={3}>
                                            <span><b>{lr.buyer_name}</b></span><br/><br/>
                                            <b>{lr.buyer_address}</b>
                                        </td>
                                        <td style={table_comb3} rowSpan={3} colSpan={3}>
                                            <span><b>{lr.consignee_name}</b></span><br/><br/>
                                            <b>{lr.consignee_address}</b>
                                        </td>
                                        <td style={table_label}>Date</td>
                                        <td style={table_app}>:</td>
                                        <td style={table_label2}><b>{lr.lr_date}</b></td>
                                    </tr>
                                    <tr>
                                        <td style={table_label}>From</td>
                                        <td style={table_app}>:</td>
                                        <td style={table_label2}><b>{lr.lr_from}</b></td>
                                    </tr>
                                    <tr>
                                        <td style={table_label}>To</td>
                                        <td style={table_app}>:</td>
                                        <td style={table_label2}><b>{lr.lr_to}</b></td>
                                    </tr>
                                    <tr>
                                        <td style={table_combLast}  colSpan={6}> 
                                            <table style={{width:'100%'}}>
                                                <thead>
                                                    <tr>
                                                        <th style={table2}>Quantity</th>
                                                        <th style={table2}>Particulars (Description)</th>
                                                    </tr>
                                                </thead>
                                               <tbody>
                                                {lrSub.map((subData, index) => (
                                                    <tr key={index}>
                                                        <td style={{border:'1px solid rgb(235, 237, 242)'}}>
                                                            <b>{subData.lr_sub_description}</b>
                                                        </td>
                                                        <td style={{border:'1px solid rgb(235, 237, 242)'}}>
                                                            <b>{subData.lr_sub_quantity}</b>
                                                        </td>
                                                    </tr>
                                                ))}
                                                
                                               </tbody>
                                            </table>
                                        </td>
                                        <td style={table_comb3} colSpan={3}>
                                            <span>Remarks</span><br/><br/>
                                            <b>{lr.lr_remarks}</b>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={table_label}>Value</td>
                                        <td style={table_app}>:</td>
                                        <td style={table_label2}><b>{lr.lr_value}</b></td>
                                        <td style={table_label}>EWB No</td>
                                        <td style={table_app}>:</td>
                                        <td style={table_label2}><b>{lr.lr_ewb_no}</b></td>
                                        <td style={table_label}>INV No</td>
                                        <td style={table_app}>:</td>
                                        <td style={table_label2}><b>{lr.lr_inv_no}</b></td>
                                    </tr>
                                    <tr>
                                        <td style={table_label}>To Pay</td>
                                        <td style={table_app}><input type="checkbox" checked={ lr.lr_pay == 'Yes' ? 'defaultChecked' : ''}/></td>
                                        <td style={table_label}>To be Billed</td>
                                        <td style={table_app}><input type="checkbox" checked={ lr.lr_to_be_paid == 'Yes' ? 'defaultChecked' : ''}/></td>
                                        <td style={table_label}>Paid</td>
                                        <td style={table_app}><input type="checkbox" checked={ lr.lr_paid == 'Yes' ? 'defaultChecked' : ''}/></td>
                                        <td style={table_comb} rowSpan={2} colSpan={3}>
                                            <br/>
                                            <br/>
                                            <br/>
                                            <b>Signature</b>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan={6} style={{fontSize:'11px'}}>
                                            Note : Not Responsible for Leakages, Breakage & Damages
                                        </td>
                                    </tr>
                                 </table>
                                 <hr/>
                                 <table className="table" style={{textAlign:'center',border:'1px solid #ebedf2',marginLeft:'20px',marginRight:'20px', width:'96%'}}>
                                    <tr >
                                        <td colSpan={2} style={{border:'none'}}><h4>TERMS & CONDITIONS OF CARRIAGE OWNER'S RISK</h4></td>
                                    </tr>
                                    <tr>
                                        <td style={table_terms_no}>1.</td>
                                        <td style={table_terms}>
                                            <span>
                                            Where a Bank has agreed to accept this Lorry Receipt as a Consignee endorsee or holder there of or in any other capacity for the purpose of giving advances to and or collection or discounting bills of its customers whether before or a after the entrustment of the good the Transport Operator for carriage the Transport Operators hereby agree in consideration of the some, to hold themselves liable and shall be deemed to have held themselves liable at the material times directly to the Bank concerned, as if the Bank were a party to the contract herein contained with the right of recourse against the Transport Contractor to the extend of the full value of the goods handed over to the Transport Operator for carriage, storage and delivery.
                                            </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={table_terms_no}>2.</td>
                                        <td style={table_terms}>
                                            <span>
                                            The Transport Operator undertakes to and shall deliver the goods in the like order and conditions as received subject to any deterioration in condition of goods resulting from natural causes like effect of temperatures, whether condition etc. to the consignee Bank or to his order of his assigns on relative receipt being surrendered to the Transport Operator duly discharged by the holder of the receipt along with a letter from such bank authorizing delivery of the goods and only the Bank and the holder of the receipt entitled to delivery as aforesaid shall have right or recourse against the Transport Operator for all claims arising thereon
                                            </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={table_terms_no}>3.</td>
                                        <td style={table_terms}>
                                            <span>
                                            The Transport Operator shall have the right to entrust the goods to any other lorry service for Transport in the event of the goods being so entrusted by the Transport Operator to another carrier the other carrier shall as between the consignor, the consignee Bank and Transport Operator be deemed to the Transport Operator's agent so that the Transport Operator shall, notwithstanding the delivery of the goods to the carrier continue to be responsible for the safety to the goods and for their delivery at the destination.
                                            </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={table_terms_no}>4.</td>
                                        <td style={table_terms}>
                                            <span>
                                            The consignor shall be primarily liable to pay the Transport charges and all other incidental charges if any at the Head Office of the Transport Operator in BANGALORE or at any other agreed place.
                                            </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={table_terms_no}>5.</td>
                                        <td style={table_terms}>
                                            <span>
                                            The Transport Operator shall have the right to dispose of perishable lying undelivered after 48 hours of arrival without any notice.
                                            </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={table_terms_no}>6.</td>
                                        <td style={table_terms}>
                                            <span>
                                            The Transport Operator shall have the right to dispose of other goods after 30 days of arrival after notice in writing to the Consignor the Consignee Bank and the holder interested (Including the Banker under clause L above).
                                            </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={table_terms_no}>7.</td>
                                        <td style={table_terms}>
                                            <span>
                                            In either case that Bank or clamant with Bank's authority shall be entitled the proceeds. Less freight and demurrage and the Transport Operator shall render full accounts to him immediately after safe.
                                            </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={table_terms_no}>8.</td>
                                        <td style={table_terms}>
                                            <span>
                                            Consignee Bank accepting Lorry Receipt under clause I above will not be liable for payment of any charges arising out of any lien of the Transport Operator against the consignor or the buyer. Where it becomes necessary for any bank to obtain delivery of the consignment from the Transport Operator shall deliver the goods unconditionally to the Bank on payment of the normal freight and storage charges only in connection with consignment in question without claiming any lien on the goods in respect of any monies due by the consignor or the consignee to the Transport Operator or any other account whatsoever.
                                            </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={table_terms_no}>9.</td>
                                        <td style={table_terms}>
                                            <span>
                                            Notwithstanding any statement made in this Lorry Receipt any circumstances surrounding the issue of this Lorry Receipt the Transport Operator shall at all times ob serve its obligation to the goods or consignment that aries as a result or negligence detent failure or take reasonable precautions male field or criminal or fraudulent actions of the Transport Operator or aby of its managers, Agents, Employees, Partners, Directors or business associates, branches etc.
                                            </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={table_terms_no}>10.</td>
                                        <td style={table_terms}>
                                            <span>
                                            The consignor is responsible for all consequences of any incorrect or false declaration
                                            </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={table_terms_no}>11.</td>
                                        <td style={table_terms}>
                                            <span>
                                            Where the goods have been lost, destroyed, damaged or have deteriorated, the compensation payable by the Transport Operator shall not exceed the value declared.
                                            </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={table_terms_no}>12.</td>
                                        <td style={table_terms}>
                                            <span>
                                            POD shall be returned within 20 days of delivery otherwise Rs. 50/- will be deducted per day.
                                            </span>
                                        </td>
                                    </tr>
                                </table>
                              </div>
                            </div>
                            
                           
                            <Link to="../lr">
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

export default ViewLR;