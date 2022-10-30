import React, {Fragment} from 'react'

import { Switch, Route} from 'react-router-dom'


import {MDBContainer } from "mdbreact";
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Navbar from './components/Nav/Nav'

import SignIn from "./components/Auth/SignIn"
import SignUp from "./components/Auth/SignUp" 


import UserRoute from './components/Auth/UserRoute';
import Profile from "./components/Profile"
import Year from './components/Year';

import AdminRoute from './components/Admin/AdminRoute';
import AdminDashboard from './components/Admin/AdminDashboard';
import EmployeePage from './components/Admin/EmployeePage'



const routes = () =>  (
      <Fragment>
        <Navbar/>
        <ToastContainer/>
        <MDBContainer>
          <Switch>
            <Route path="/signup" exact component={SignUp} /> 
             <Route path="/" exact component={SignIn} />
            <UserRoute exact path="/user/:userId" component={Profile} />   
            <UserRoute exact path="/user/:userId/:year" component={Year}/> 
            <AdminRoute exact path="/admin/dashboard" component={AdminDashboard}/>
            <AdminRoute exact path="/admin/user/:userId" component={EmployeePage}/>
             
          </Switch>
        </MDBContainer>
      </Fragment>
    )





export default routes
