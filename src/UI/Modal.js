import React from 'react';
import Backdrop from './Backdrop';
import classes from './Modal.module.css';
const Modal = (props) =>{
    return(
        <div>
            <Backdrop show={props.show} modalclosed={props.modalclosed} />
             <div className={classes.Modal}
        style={{
            transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: props.show ? '1' : '0',
            backgroundColor: 'black'
        }}>
           <h1>{props.children}</h1>
        </div>
        </div>
    )
}
export default Modal;