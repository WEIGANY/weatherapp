import React, { Component }  from "react"
import ReactDOM from "react-dom"
import throttle from 'lodash/throttle';


function debounce(fn, ms) {
    let timeoutId
    return function () {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        fn.apply(this, arguments)
      }, ms)
    }
  }


export default class Test extends Component{
    constructor(){
        super()
        this.state = {
            value: "wzy"
        }
        // this.handleChange = throttle(this.handleChange, 1000);
        this.stateUpdate = debounce(this.stateUpdate, 1000)
    }

    handleSubmit = (e) => {
        this.stateUpdate(e.target.value);
    }
    // handleChange(e){
    //     if (e.target!=null){
    //     this.setState({
    //             value : e.target.value
    //         })}
    // }   
    stateUpdate(newvalue){
        this.setState({
            value : newvalue
        })
    }
    render(){
        return(
            <div>
                <input placeholder={this.state.value} onChange={this.handleSubmit}></input>
                <p>{this.state.value}</p>
            </div>
        )
    }
}
