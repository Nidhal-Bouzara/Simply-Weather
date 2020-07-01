import React from 'react';
import {
   Image,
} from 'semantic-ui-react';

function Tempcard() {
  return (
    <div className="card top">
      <Image src="night.svg" />
      <div className="card-content">
        <div className="card-icon">
          <div>
            <Image src="1.svg" />
          </div>
        </div>
        <div className="card-city"><span>Algiers</span></div>
        <div className="card-weather"><span>Sunny</span></div>
        <div className="card-temperature"><span>19 &deg;C</span></div>
      </div>
    </div>
  );
}




export default Tempcard;
