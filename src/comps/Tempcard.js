import React from 'react';
import {
   Image,
} from 'semantic-ui-react';

function Tempcard(props) {
  if (props.cardData !== null) {
    return (
      <div className="card top">
        <Image src={props.cardData.isDayTime} />
        <div className="card-content">
          <div className="card-icon">
            <div>
              <Image src={props.cardData.weatherIcon+'.svg'} />
            </div>
          </div>
          <div className="card-city"><span>{props.cardData.cityName}</span></div>
          <div className="card-weather"><span>{props.cardData.weatherText}</span></div>
          <div className="card-temperature"><span>{props.cardData.temperature} &deg;C</span></div>
        </div>
      </div>
    );
  } else {
    return null;
  }
}




export default Tempcard;
