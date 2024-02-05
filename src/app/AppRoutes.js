import React, { Component,Suspense, lazy } from 'react';
import { Switch, Route } from 'react-router-dom';

import Spinner from '../app/shared/Spinner';

const Login = lazy(() => import('./login/Login'));
const ForgetPassword = lazy(() => import('./login/ForgetPassword'));
const ChangePassword = lazy(() => import('./login/ChangePassword'));
const NewListBuyer = lazy(() => import('./buyer/listings'));
const Dashboard = lazy(() => import('./dashboard/Dashboard.js'));
const AddBuyer = lazy(() => import('./buyer/AddBuyer'));
const EditBuyer = lazy(() => import('./buyer/EditBuyer'));
const NewListVendor = lazy(() => import('./vendor/listings'));
const AddVendor = lazy(() => import('./vendor/AddVendor'));
const EditVendor = lazy(() => import('./vendor/EditVendor'));
const NewListEnquiry = lazy(() => import('./enquiry/listings'));
const NewListVehicleType = lazy(() => import('./vehicleType/listings'));
const AddVehicleType = lazy(() => import('./vehicleType/AddVehicleType'));
const EditVehicleType = lazy(() => import('./vehicleType/EditVehicleType'));
const AddEnquiry = lazy(() => import('./enquiry/AddEnquiry'));
const EditEnquiry = lazy(() => import('./enquiry/EditEnquiry'));
const NewListBooking = lazy(() => import('./booking/listings'));
const EditBooking = lazy(() => import('./booking/EditBooking'));
const ViewBooking = lazy(() => import('./booking/ViewBooking'));
const UpdateBooking = lazy(() => import('./booking/UpdateBooking'));
const NewListTeam = lazy(() => import('./team/listings'));
const AddTeam = lazy(() => import('./team/AddTeam'));
const Error404 = lazy(() => import('./error/Error404'));
const EnquiryForm = lazy(() => import('./reports/enquiry/EnquiryForm'));
const EnquiryReport = lazy(() => import('./reports/enquiry/EnquiryReport'));
const BookingForm = lazy(() => import('./reports/booking/BookingForm'));
const BookingReport = lazy(() => import('./reports/booking/BookingReport'));
const BuyerReport = lazy(() => import('./reports/buyer/BuyerReport'));
const VendorReport = lazy(() => import('./reports/vendor/VendorReport'));
const AddLR = lazy(() => import('./LR/AddLR'));
const NewListLR = lazy(() => import('./LR/listings'));
const EditLR = lazy(() => import('./LR/EditLR'));
const ViewLR = lazy(() => import('./LR/ViewLR'));
const AddExpenses = lazy(() => import('./LR/AddExpenses'));
const NewListInvoice = lazy(() => import('./invoice/listings'));
const AddInvoice = lazy(() => import('./invoice/addInvoice'));
const EditInvoice = lazy(() => import('./invoice/editInvoice'));
const ViewInvoice = lazy(() => import('./invoice/viewInvoice'));
const NewListToPay = lazy(() => import('./payable/topay'));
const NewListToBalance = lazy(() => import('./payable/tobalance'));
const NewListToClear = lazy(() => import('./payable/toclear'));
const payEdit = lazy(() => import('./payable/topayEdit'));

class AppRoutes extends Component {
  render () {
    return (
      <Suspense fallback={<Spinner/>}>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/login" component={ Login } />
          <Route  path="/forget-password" component={ ForgetPassword } />
          <Route  path="/change-password" component={ ChangePassword } />
          <Route  path="/dashboard" component={ Dashboard } />
          <Route  path="/buyer" component={ NewListBuyer } />
          <Route  path="/addBuyer" component={ AddBuyer } />
          <Route  path="/buyerEdit/:id" component={ EditBuyer } />
          <Route  path="/vendor" component={ NewListVendor } />
          <Route  path="/addVendor" component={ AddVendor } />
          <Route  path="/vendorEdit/:id" component={ EditVendor } />
          <Route  path="/vehicleType" component={ NewListVehicleType } />
          <Route  path="/addVehicleType" component={ AddVehicleType } />
          <Route  path="/vehicleTypeEdit/:id" component={ EditVehicleType } />
          <Route  path="/enquiry" component={ NewListEnquiry } />
          <Route  path="/addEnquiry" component={ AddEnquiry } />
          <Route  path="/enquiryEdit/:id" component={ EditEnquiry } />
          <Route  path="/booking" component={ NewListBooking } />
          <Route  path="/bookingEdit/:id" component={ EditBooking } />
          <Route  path="/bookingView/:id" component={ ViewBooking } />
          <Route  path="/bookingUpdate/:id" component={ UpdateBooking } />
          <Route  path="/lrAdd/:id" component={ AddLR } />
          <Route  path="/lr" component={NewListLR}/>
          <Route  path="/lrEdit/:id" component={ EditLR } />
          <Route  path="/lrView/:id" component={ ViewLR } />
          <Route  path="/lrExpenses/:id" component={ AddExpenses } />
          <Route  path="/team" component={ NewListTeam } />
          <Route  path="/addTeam" component={ AddTeam } />
          <Route  path="/invoice" component={ NewListInvoice } />
          <Route  path="/addInvoice" component={ AddInvoice } />
          <Route  path="/invoiceEdit/:id" component={ EditInvoice } />
          <Route  path="/invoiceView/:id" component={ ViewInvoice }/>
          <Route  path="/topay" component={ NewListToPay } />
          <Route  path="/topayEdit/:id" component={ payEdit } />
          <Route  path="/tobalance" component={ NewListToBalance } />
          <Route  path="/toclear" component={ NewListToClear } />
          <Route  path="/enqsForm" component={ EnquiryForm } />
          <Route  path="/enqsReport" component={ EnquiryReport } />
          <Route  path="/booksForm" component={ BookingForm } />
          <Route  path="/booksReport" component={ BookingReport } />
          <Route  path="/buyReport" component={ BuyerReport } />
          <Route  path="/venReport" component={ VendorReport } />
          <Route  path="*" component={ Error404 } />
        </Switch>
      </Suspense>
    );
  }
}

export default AppRoutes;