import React from 'react';
import {
  Icon
} from 'semantic-ui-react';
import axios from 'axios';
import '../styles/main.css';
import '../../public/1.svg';
import '../../public/day.svg';
import '../../public/night.svg';
import Tempcard from './Tempcard';

function Suggestions(props) {
  if (props.results !== null) {
    return <>
      <li tabIndex="0" data-key={props.results[0].key} className="suggestions-list__item">{props.results[0].city}</li>
      <li tabIndex="0" data-key={props.results[0].key} className="suggestions-list__item">{props.results[0].city}</li>
      <li tabIndex="0" data-key={props.results[2].key} className="suggestions-list__item">{props.results[2].city}</li>
    </>
  } else {
    return null;
  }
}

class App extends React.Component {
  search = React.createRef();
  state = {searchVal: '', timeout: null, results: null};

  debounce = (func, delay) => {
    if(this.state.timeout) {
      clearTimeout(this.state.timeout);
    }
    this.setState({timeout: setTimeout(func, delay)});
  };

  apiCall = async() => {
    const response = await axios.get('http://dataservice.accuweather.com/locations/v1/cities/autocomplete', {
      params: {
        apikey: 'arHapOvYGT9zakNKqeGWjaOCSbcqCL3f',
        q: this.state.searchVal,
      }
  })
  // console.log(response.data[0],response.data[1],response.data[2]);
    this.setState({
      results: [
        {
          city: response.data[0].LocalizedName,
          key: response.data[0].Key
        },
        {
          city: response.data[1].LocalizedName,
          key: response.data[1].Key
        },
        {
          city: response.data[2].LocalizedName,
          key: response.data[2].Key
        },
      ]});
      console.log(this.state);
};

  handleSearchChange = async (event) => {
    this.setState({searchVal: this.search.current.value});
    if (this.search.current.value !== '') {
      this.debounce(this.apiCall, 3000);
    } else if (this.search.current.value === '') {
      clearTimeout(this.state.timeout);
      this.setState({results: null});
      console.log('cleared results');
    }
  };


  render (){
    return (
      <section className="container">
        <div className="search-bar">
          <Icon id="search-icon" name='search' />
          <input  type="text" id="search" ref={this.search} onChange={this.handleSearchChange} value={this.state.searchVal}/>
        </div>
        <div className="suggestions">
          <ul className="suggestions-list">
            <Suggestions results={this.state.results} />
          </ul>
        </div>
        <Tempcard />
      </section>
    );
  }
}

export default App;
