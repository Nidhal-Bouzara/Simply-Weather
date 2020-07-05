import React from 'react';

class Suggestions extends React.Component {
  state = {items: null};

  componentDidUpdate (prevProps) {
    console.log('Suggestions did update');
    if (this.props.results !== prevProps.results && this.props.results !== null) {
      console.log('how many times');
      let items = [];
      this.props.results.forEach(item => {
        items.push(<li tabIndex="0" key={item.key} data-key={item.key} data-city={item.city} className="suggestions-list__item">{item.city}</li>)
      })
      this.setState({items: items});
    } else if (this.props.results !== prevProps.results && this.props.results === null) {
      this.setState({items: null});
    }
  }
  render() {
  if (this.props.results !== null) {
    let items = [];
    this.props.results.forEach((item, i) => {
      items.push(<li tabIndex="0" data-key={item.key} data-city={item.city} className="suggestions-list__item">{item.city}</li>)
    });

    return  (
      <div className="suggestions">
        <ul className="suggestions-list" onClick={this.props.handleListClick}>
          {this.state.items}
        </ul>
      </div>
    )
  } else {
    return null;
  }
  }
}

export default Suggestions;
