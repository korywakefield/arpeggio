import React, { Component } from 'react';
import { arrPrevInt, arrNextInt, textifyAccidental } from '../helpers';
import '../css/StepInput.css';

class StepInput extends Component {

  constructor() {
    super();
    this.state = {
      showAdjust : false,
    };
  }

  show(e) {
    this.setState({showAdjust : true});
  }

  hide(e) {
    this.setState({showAdjust : false});
  }

  buttonOnClick(e) {
    this.props.updateValue(e);
    this.show(e);
  }

  render() {
    return (
      <div
        className={this.state.showAdjust ? 'StepInput Active' : 'StepInput'}
        onFocus={(e) => this.show(e)}
        onBlur={(e) => this.hide(e)}
        onMouseEnter={(e) => this.show(e)}
        onMouseLeave={(e) => this.hide(e)}
        tabIndex="0"
      >
        <div className="StepInput-Value">{textifyAccidental(this.props.value)}</div>
        <div className="StepInput-Adjust">
          <button
            className="StepInput-Up"
            value={arrNextInt(this.props.values, this.props.value, 1)}
            onClick={(e) => this.buttonOnClick(e)}
            onFocus={(e) => this.show(e)}
            onBlur={(e) => this.hide(e)}
            { ... ( this.props.hasOwnProperty('associativeID') ) ? { 'data-associative-ID' : this.props.associativeID } : {} }
          >
            <span>&#x2b;{/* Plus Sign */}</span>
          </button>
          <button
            className="StepInput-Down"
            value={arrPrevInt(this.props.values, this.props.value, 1)}
            onClick={(e) => this.buttonOnClick(e)}
            onFocus={(e) => this.show(e)}
            onBlur={(e) => this.hide(e)}
            { ... ( this.props.hasOwnProperty('associativeID') ) ? { 'data-associative-ID' : this.props.associativeID } : {} }
          >
            <span>&#x2212;{/* Minus Sign */}</span>
          </button>
        </div>
      </div>
    );
  }

}

export default StepInput;