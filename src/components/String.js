import React, { Component } from 'react';
import { chromatic, arrNextInt } from '../helpers';
import StepInput from './StepInput.js';
import '../css/String.css';

class String extends Component {

  // Notes
  // -----
  // Output the class names for each note to reflect type and state.

  renderNoteClassName(type, id, value) {

    let classNameArr = ['Note'];
    let selectedNote = parseInt(this.props.strings[this.props.id].selectedNote, 10);
    let currentChord = this.props.currentChord();

    classNameArr.push(type);

    if ( currentChord !== null && value === currentChord.noteRoot ) {
      classNameArr.push('Root');
    }

    if ( type === 'Open' ) {
      if ( ! isNaN(selectedNote) && selectedNote !== null && selectedNote !== 0 ) {
        classNameArr.push('Hide');
      }
    }

    if ( selectedNote === id ) {
      classNameArr.push('Active');
    }

    return classNameArr.join(' ');

  }


  // Notes
  // -----
  // 01. +1/-1 is to account for open string.

  renderNotes() {

    let theNotes = [], noteValue, noteType;

    for ( let i = 0; i < this.props.frets + 1; i++ ) { // 01

      noteValue = ( i === 0 ) ? this.props.strings[this.props.id].tuning : arrNextInt(chromatic(this.props.useSharps), this.props.strings[this.props.id].tuning, parseInt(this.props.fretStart, 10) + (i - 1)); // 01
      noteType  = ( i === 0 ) ? 'Open' : 'Fret';

      theNotes.push(<button
                      value={noteValue}
                      className={this.renderNoteClassName(noteType, i, noteValue)}
                      onClick={(e) => this.props.updateSelectedNote(e)}
                      onMouseEnter={(e) => { e.target.classList.value.includes('Active') ? e.target.classList.add('Remove') : ''; }}
                      onMouseOut={(e) => { e.target.classList.value.includes('Remove') ? e.target.classList.remove('Remove') : ''; }}
                      data-string-id={this.props.id}
                      id={i}
                      key={i}
                    ><i><span>{noteValue}</span></i></button>);

    }

    return theNotes;

  }

  render() {
    return (
      <section className="String" id={this.props.id}>
        {this.renderNotes()}
        <StepInput
          value={this.props.strings[this.props.id].tuning}
          values={chromatic(this.props.useSharps)}
          updateValue={(e) => this.props.updateTuning(e)}
          associativeID={this.props.id}
        />
      </section>
    );
  }

}

export default String;