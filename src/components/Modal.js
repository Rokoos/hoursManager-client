import React from 'react'
import {MDBModal } from 'mdbreact';

const Modal = ({children, toggle, modal, title})  => {

    return (
        <MDBModal
        isOpen={modal} toggle={toggle}>
         {children}
        </MDBModal>
      );
    }
  
  
  export default Modal;