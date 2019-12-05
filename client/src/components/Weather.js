import React, {Component} from 'react'
import {weatherApi} from '../utils'
import './App.css';

class Weather extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      loaded: false
    };
  }

  getWeather(query) {

    this.setState({
      error: null,
      loaded: true
    });
    weatherApi(query)
      .then(response => {
        if (response.cod!==200) {
          this.setState({
            error: 'Unable to get weather. Please try again.'
          })
        } else {
          let current = response.main;
          this.setState({
            temp: current.temp,
            location: response.sys.id,
            icon_url: response.weather[0].icon,
            weather: response.weather[0].main,
          });
        }
        this.setState({ loaded: false });
      });
  }

  renderError() {
    return (
      <div className="center-block">
        <p className="text-danger">{this.state.error}</p>
      </div>
    )
  }

  renderForm() {
    return(
      <div className="row">
        <div className="col-md-5 offset-md-3">
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="zipcode"
              placeholder="Enter zipcode"
              onChange={event => this.setState({zipcode: event.target.value})}/>
          </div>
        </div>
        <div className="col-md-1">
          <button
            type="submit"
            className="btn btn-primary"
            onClick={() => this.getWeather(this.state.zipcode)}>
            Submit
          </button>
        </div>
      </div>
    )
  }

  renderWeather() {
    return (
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-block">
              <h4 className="card-title">{this.state.location}</h4>
              <h4 className="card-title">{this.state.weather}</h4>
              <p className="card-text">
                {this.state.weather}<br/>
                <img src={this.state.icon_url} alt={this.state.icon_url}/>
              </p>
              <h4>{this.state.temp}&deg;</h4>
            </div>
          </div>
        </div>
      </div>
    )
  }


  render() {
    if (!this.state.loaded) {
      return (
        <div>
          {this.renderError()}
          {this.renderForm()}
          {this.renderWeather()}
        </div>
      )
    } else {
      return (
        <div className="center-block"><img src={require('../img/loading.gif')} alt="loading"/></div>
      )
    }
  }
}

export default Weather;