import React, { Component } from 'react';
import Masthead from './Masthead.js';
import Diagram from './Diagram.js';
import { cleanAccidental } from '../helpers';
import '../css/Arpeggio.css';

class Arpeggio extends Component {

  constructor() {
    super();
    this.state = {
      accidentals      : '♯',
      diagramFretStart : 1,
      diagramFrets     : 4,
      diagramStrings   : [{ tuning : 'E', selectedNote : null },
                          { tuning : 'A', selectedNote : null },
                          { tuning : 'D', selectedNote : null },
                          { tuning : 'G', selectedNote : null },
                          { tuning : 'B', selectedNote : null },
                          { tuning : 'E', selectedNote : null }]
    };
  }


  // Notes
  // -----
  // Updates the starting fret for the entire diagram.

  updateFretStart(e) {
    this.setState({diagramFretStart : parseInt(e.target.value, 10)});
  }


  // Notes
  // -----
  // Updates the tuning of an individual string.
  //
  // 01. Associative ID of string is passed to StepInput via props.
  // 02. Make a copy of our diagramStrings object to work.
  // 03. Pass updated copy back into setState().

  updateTuning(e) {

    let newTuning = e.target.value;
    let stringID  = e.target.attributes['data-associative-id'].value; // 01

    let currentStrings = this.state.diagramStrings; // 02

    currentStrings[stringID].tuning = newTuning;

    this.setState({diagramStrings : currentStrings}); // 03

  }


  // Notes
  // -----
  // Stores the physical location of the selected note, not the note itself.
  // (i.e. fret "3", not note "G"). Triggered onClick from individual notes.
  //
  // 01. Make a copy of our diagramStrings object to work.
  // 02. Reset to null if previous note (currentNote) matches new selection.
  // 03. Pass updated copy back into setState().

  updateSelectedNote(e) {

    let noteID         = e.target.id;
    let stringID       = e.target.attributes['data-string-id'].value;

    let currentStrings = this.state.diagramStrings; // 01
    let currentNote    = currentStrings[stringID].selectedNote;

    currentStrings[stringID].selectedNote = ( currentNote === noteID ) ? null : noteID; // 02

    this.setState({diagramStrings : currentStrings}); // 03

  }


  // Notes
  // -----
  // Stores the physical location of the selected note, not the note itself.
  // (i.e. fret "3", not note "G"). Triggered onClick from individual notes.
  //
  // 01. Make a copy of our diagramStrings object to work.
  // 02. Reset to null if previous note (currentNote) matches new selection.
  // 03. Pass updated copy back into setState().

  updateSelectedNotes(e) {

    let noteID         = e.target.id;
    let stringID       = e.target.attributes['data-string-id'].value;

    let currentStrings = this.state.diagramStrings; // 01
    let currentNote    = currentStrings[stringID].selectedNote;

    currentStrings[stringID].selectedNote = ( currentNote === noteID ) ? null : noteID; // 02

    this.setState({diagramStrings : currentStrings}); // 03

  }


  // Notes
  // -----
  // Update state of using sharps or flats for display purposes and make sure
  // to clean this.state.diagramStrings.tuning for each string when necessary.
  //
  // 01. Make a copy of our diagramStrings object to work.
  // 02. Clean our flat/sharp notes to reflect proper values.

  updateAccidentals(e) {

    this.setState({accidentals : e.target.value});

    let currentStrings = this.state.diagramStrings; // 01

    currentStrings.forEach((el, i, arr) => {
      currentStrings[i].tuning = cleanAccidental(currentStrings[i].tuning); // 02
    });

    this.setState({diagramStrings : currentStrings});

  }


  // Notes
  // -----
  // Update number of frets displayed in the diagram.

  updateDiagramFrets(e) {
    this.setState({diagramFrets : parseInt(e.target.value, 10)});
  }


  // Notes
  // -----
  // Removes all current selections from the diagram.
  //
  // 01. Make a copy of our diagramStrings object to work.
  // 02. Set all selections back to null to remove current notes.

  clearSelectedNotes() {

    let currentStrings = this.state.diagramStrings; // 01

    currentStrings.forEach((el, i, arr) => {
      currentStrings[i].selectedNote = null; // 02
    });

    this.setState({diagramStrings : currentStrings});
  }

  render() {
    return (
      <div className="Arpeggio">
        <Masthead
          state={this.state}
          updateAccidentals={(e) => this.updateAccidentals(e)}
          updateDiagramFrets={(e) => this.updateDiagramFrets(e)}
        />
        <Diagram
          state={this.state}
          updateFretStart={(e) => this.updateFretStart(e)}
          updateTuning={(e) => this.updateTuning(e)}
          updateSelectedNote={(e) => this.updateSelectedNote(e)}
          clearSelectedNotes={() => this.clearSelectedNotes()}
        />
      </div>
    );
  }

}

export default Arpeggio;