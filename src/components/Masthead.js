import React, { Component } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar'
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
                  onClick={(e) => this.props.updateSharpsFlats(e)}
                  className={this.props.useSharps === true ? 'Active' : ''}
                  value="sharps">♯
                </button>
                <button
                  onClick={(e) => this.props.updateSharpsFlats(e)}
                  className={this.props.useSharps === false ? 'Active' : ''}
                  value="flats">♭
                </button>
              </div>
            </section>
            <section>
              <label>Frets</label>
              <div className="Input">
                <button
                  onClick={(e) => this.props.updateDiagramFrets(e)}
                  className={this.props.frets === 3 ? 'Active' : ''}
                  value={3}>3
                </button>
                <button
                  onClick={(e) => this.props.updateDiagramFrets(e)}
                  className={this.props.frets === 4 ? 'Active' : ''}
                  value={4}>4
                </button>
                <button
                  onClick={(e) => this.props.updateDiagramFrets(e)}
                  className={this.props.frets === 5 ? 'Active' : ''}
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