import React, { Component } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar'
import { textifyAccidental } from '../helpers';
import '../css/Masthead.css';
import 'react-perfect-scrollbar/dist/css/styles.css';

class Masthead extends Component {

  constructor() {
    super();
    this.state = {
      opened : false
    }
  }

  mastheadToggle() {
    ( this.state.opened === false ) ? this.setState({opened : true}) : this.setState({opened : false});
  }

  render() {
    return (
      <header className={this.state.opened === true ? "Masthead Active" : "Masthead"} role="banner">
        <div className="Masthead-BG" onClick={() => this.mastheadToggle()}></div>
        <button className="Masthead-Toggle" onClick={() => this.mastheadToggle()}><i></i><i></i><i></i></button>
        <PerfectScrollbar option={{suppressScrollX : false}}>
          <div className="Masthead-Sections">
            <section>
              <h1>Arpeggio</h1>
              <p>A web application specializing in the identification of chromatic polyphony (i.e. it names yer guitar chords 'n' stuff).</p>
            </section>
            <section>
              <label>Accidentals</label>
              <div className="Input">
                <button
                  onClick={(e) => this.props.updateAccidentals(e)}
                  className={this.props.state.accidentals === '♯' ? 'Active' : ''}
                  value="♯">{textifyAccidental('♯')}
                </button>
                <button
                  onClick={(e) => this.props.updateAccidentals(e)}
                  className={this.props.state.accidentals === '♭' ? 'Active' : ''}
                  value="♭">{textifyAccidental('♭')}
                </button>
              </div>
            </section>
            <section>
              <label>Frets</label>
              <div className="Input">
                <button
                  onClick={(e) => this.props.updateDiagramFrets(e)}
                  className={this.props.state.diagramFrets === 4 ? 'Active' : ''}
                  value={4}>4
                </button>
                <button
                  onClick={(e) => this.props.updateDiagramFrets(e)}
                  className={this.props.state.diagramFrets === 5 ? 'Active' : ''}
                  value={5}>5
                </button>
              </div>
            </section>
            <section>
              <p>Found a bug? Got a feature idea? Let me know on <a href="https://github.com/korywakefield/arpeggio">GitHub</a>.</p>
            </section>
          </div>
        </PerfectScrollbar>
      </header>
    );
  }

}

export default Masthead;