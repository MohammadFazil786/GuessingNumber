import React,{Component} from 'react';
import Progressbar from '../UI/Progressbar';
import classes from './Main.module.css';
import Modal from '../UI/Modal';

class Main extends Component {
    state = {
        Times: [40],
        Max: 100,
        Ans: [''],
        ShowModal: false,
        RandomChoose: [40],
        Status: null,
        formIsValid: [false],
        disable: true,
        Total: [100]
    }
    onClickHandler = () =>{
        
        let MaxInc = this.state.Max + 100;
        let  init = Math.random() * (MaxInc - 1) + 1;
        init = Math.floor(init);
        let initRandom = this.state.RandomChoose;
        initRandom.push(init);
        let random = ((init)/MaxInc)*100;
        random = Math.floor(random);
        let time = this.state.Times;
        time.push(random);
        let ans = this.state.Ans;
        ans.push('');
        let validity = this.state.formIsValid;
        validity.push(false);
        let total = this.state.Total;
        total.push(MaxInc);
        this.setState({
            Times: time,
             Max: MaxInc,
             disable: true,
             Ans: ans,
             formIsValid: validity,
             RandomChoose: initRandom,
             Total: total
            });
    }
    onChangeHandler = (event,id) =>{
       let isValid = this.checkValidity(event.target.value);
       let ans = this.state.Ans;
       ans[id] = event.target.value;
       let validity = this.state.formIsValid;
       validity[id] = isValid
       this.setState({Ans: ans,formIsValid: validity});
       }
    onSubmitHandler = (id) =>{
        let status = null;
        let disable = true;
        let SubmittedAnswer = this.state.Ans[id];
        let Random = this.state.RandomChoose[id];
        let diff = Math.abs(SubmittedAnswer - Random);
            if(!diff){
                status = <p style={{color: 'lightgreen'}}>CORRECT!</p>
                disable = false || this.state.Total[id] !== this.state.Max
            }
            else if(diff >=1 && diff<=4){
              status = <p style={{color: 'Red'}}>HOT!!</p>
            }
            else if(diff >=5 && diff<=15){
              status = <p style={{color: 'yellow'}}>WARM</p>
            }
            else {
              status = <p style={{color: 'blue'}}>COLD</p>
            }
            
            this.setState({Status: status,disable: disable});
            this.ModalToggle();
    }
    ModalToggle = () =>{
        this.setState(prev =>{
            return {ShowModal: !prev.ShowModal}
        });
    }
    checkValidity = (value) =>{
        let isValid = true
        const pattern = /^\d+$/;
        isValid = pattern.test(value) && isValid;
        isValid = value<=this.state.Max && value>=0 && isValid;
        return isValid;
    }
    render(){
          let something = this.state.Times.map((data,id) =>{
                   return <Progressbar 
                           percentage={data} 
                           key={id}
                           Changed={(event) => this.onChangeHandler(event,id)}
                           valid = {this.state.formIsValid}
                           value= {this.state.Ans[id]}
                           show={this.state.formIsValid[id]}
                           total = {this.state.Total[id]}
                           submit = {() =>this.onSubmitHandler(id)}/>
                  });
              let showmodal = null;
              if(this.state.ShowModal){
                  showmodal =  <Modal show={true} modalclosed ={this.ModalToggle}>
                            {this.state.Status}
                            </Modal>
              }
        return(<div>
                   <p className={classes.Para1}>This is a No. Guessing Game.</p><br />
                   <p className={classes.Para2}>A Blue Disk Containing White Ring is Given To You And You Have To Guess
                   The Total Circumference Which White Ring Has Covered. Total Value Of Full Ring is Given Above Each Disk. 
                   </p>
                      {showmodal}
                    <div className={classes.Main}>
                   {something}
                   <button 
                   onClick = {this.onClickHandler}
                   disabled={this.state.disable}
                   style={{
                       width: '100px',
                       height: '40px'
                   }}>NEXT</button>
               </div>
             </div>
             );
    }
}
export default Main;