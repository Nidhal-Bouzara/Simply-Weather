import React from 'react';
import {
  Icon
} from 'semantic-ui-react';
import axios from 'axios';
import '../styles/main.css';
import '../../public/day.svg';
import '../../public/night.svg';
import Tempcard from './Tempcard';
import Suggestions from './Suggestions'
import '../../public/7.svg';
require.context('../../public', false, /.svg$/);

class App extends React.Component {
  search = React.createRef();
  state = {searchVal: '', timeout: null, results: null, cardData: null};

  debounce = (func, delay) => {
    if(this.state.timeout) {
      clearTimeout(this.state.timeout);
    }
    this.setState({timeout: setTimeout(func, delay)});
  }

  // The API call that gets called by getData()
  apiCall = async() => {
    const response = await axios.get('http://dataservice.accuweather.com/locations/v1/cities/autocomplete', {
      params: {
        apikey: 'arHapOvYGT9zakNKqeGWjaOCSbcqCL3f',
        q: this.state.searchVal,
      }
    })

    return response;
  }

  // getting data for cities Suggestions
  getData = async() => {
    // Calling the API and waiting for response
    const response = await this.apiCall();

    // Parsing the data into a short three item list for use by suggestions menu
    let res = [];
    let i = 0;
    while (i < 3 && i < response.data.length) {
      res.push({
        city: response.data[i].LocalizedName,
        key: response.data[i].Key,
      });
      i++;
      }

    this.setState({results: res});
  }

  handleSearchChange = async (event) => {
    // Setting the value for the controlled input that called this function
    this.setState({searchVal: this.search.current.value});

    // Determining whether the value user entered is empty to either call the API or to close the suggestions menu (by setting the suggestions list to null)
    if (this.search.current.value !== '') {
      this.debounce(this.getData(), 500);
    } else if (this.search.current.value === '') {
      clearTimeout(this.state.timeout);
      this.setState({results: null});
    }
  };

  handleListClick = async (event) => {
    let cityName = event.target.dataset.city;
    // Clearing the search box and removing the suggestions as an indicator
    this.setState({
      searchVal: null,
      results: null,
    })

    // API request for getting the weather information.
    const response = await axios.get(`http://dataservice.accuweather.com/currentconditions/v1/${event.target.dataset.key}`, {
      params: {
        apikey: 'arHapOvYGT9zakNKqeGWjaOCSbcqCL3f',
      }
    })

    // Updating state with all the necessary information we need to pass to the card component.
    this.setState({
      cardData: {
        isDayTime: response.data[0].IsDayTime? 'day.svg':'night.svg',
        weatherIcon: response.data[0].WeatherIcon,
        cityName: cityName,
        weatherText: response.data[0].WeatherText,
        temperature: response.data[0].Temperature.Metric.Value,
      }
    })
  }


  render (){
    return (
      <section className="container">
        <div className="search-bar">
          <Icon id="search-icon" name='search' />
          <input  type="text" id="search" ref={this.search} onChange={this.handleSearchChange} value={this.state.searchVal}/>
        </div>
              <Suggestions results={this.state.results} handleListClick={this.handleListClick} />
        <Tempcard cardData={this.state.cardData}/>
      </section>
    );
  }
}

export default App;
