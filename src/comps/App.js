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



class App extends React.Component {
  search = React.createRef();
  state = {searchVal: '', timeout: null};

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
    console.log(response.data);
};

  handleSearchChange = async () => {
    this.setState({searchVal: this.search.current.value});
    if (this.state.searchVal.length >= 0) {
      this.debounce(this.apiCall, 3000);
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
            <li tabindex="0" className="suggestions-list__item">Algiers</li>
            <li tabindex="0" className="suggestions-list__item">Aleppo</li>
            <li tabindex="0" className="suggestions-list__item">Aquinox</li>
          </ul>
        </div>
        <Tempcard />
      </section>
    );
  }
}

export default App;
