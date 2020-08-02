import React from 'react';
import { CircularProgressbar,buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
 const Progressbar = (props) =>{
     const percentage = props.percentage;
     return(
       <div style={{marginBottom: '40px'}}>
         <h4>In This, Full Ring Has Total Value = {props.total}</h4>
         <div style={{marginBottom: '40px'}}>
               <CircularProgressbar
        value={percentage}
        text={``}
        background
        backgroundPadding={6}
        styles={buildStyles({
          backgroundColor: "#3e98c7",
          textColor: "#fff",
          pathColor: "#fff",
          trailColor: "transparent"
        })}
      />
         </div>
         <input 
         type="text" 
         placeholder="Your Guess" 
         value={props.value}
         onChange={props.Changed}
         style={{height: '25px'}}/>
         <button 
         onClick={props.submit} 
         disabled={!props.show}
         style={{
          width: '80px',
          height: '30px',
          backgroundColor: 'orange'
      }}>SUBMIT</button>
         </div>
     )
 }
 export default Progressbar;