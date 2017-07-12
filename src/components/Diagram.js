import React, { Component } from 'react';
import { chordData, frets, chromatic, getNotesFromFormula, arrNextInt } from '../helpers';
import String from './String.js';
import StepInput from './StepInput.js';
import '../css/Diagram.css';

class Diagram extends Component {

  // Notes
  // -----
  // Returns an array of unique, selected notes.
  //
  // 01. Use parseInt() after the condition so we can check for null.

  selectedNotes() {

    let theNotes  = [];
    let thisStart = parseInt(this.props.fretStart, 10);
    let thisNote;

    for (let i = 0; i < this.props.strings.length; i++) {
      if ( this.props.strings[i].selectedNote !== null ) {
        thisNote = parseInt(this.props.strings[i].selectedNote, 10); // 01
        if ( thisNote === 0 ) {
          theNotes.push(this.props.strings[i].tuning);
        } else {
          theNotes.push(arrNextInt(chromatic(this.props.useSharps), this.props.strings[i].tuning, thisStart + (thisNote - 1)));
        }
      }
    }

    theNotes = theNotes.filter((el, i, arr) => { return arr.indexOf(el) === i });

    return theNotes;

  }


  // Notes
  // -----
  // 01. Gathers selected notes and sorts them for equality check later on.
  // 02. Loop through each chord from chordData() and use our current "root"
  //     to get notes for each chord based off its formula (theCurrentNotes).
  // 03. theCurrentNotes is sorted to be used for equality check.
  // 04. Compare theSelectedNotes with theCurrentNotes. If array lengths are
  //     the same and every item inside is equal, we have a match and the
  //     chordData() for that chord is pushed to our output along with some
  //     additional information to be used later.
  //
  // E.G. 1 note is selected ("E"):
  // return []
  //
  // E.G. 3 notes are selected ("E", "G♯" "B"):
  // return  [{noteRoot : "E", name : "Major", ...}]

  selectedChords() {

    let theChords        = [];
    let theSelectedNotes = this.selectedNotes().sort(); // 01

    theSelectedNotes.forEach((note, iNote) => {
      chordData().forEach((chord, iChord) => { // 02
        let theCurrentNotes = getNotesFromFormula(note, chord.formula, this.props.useSharps).sort(); // 03
        if ( theCurrentNotes.length === theSelectedNotes.length && theCurrentNotes.every((el, i, arr) => { return el === theSelectedNotes[i] }) ) { // 04
          let theChordData         = chordData()[iChord];
          theChordData.noteRoot    = note;
          theChordData.noteLowest  = this.selectedNotes()[0];
          theChordData.isInversion = theChordData.noteRoot !== theChordData.noteLowest;
          theChords.push(theChordData);
        }
      });
    });

    return theChords;

  }


  // Notes
  // -----
  // Returns the current chord match on the chart.

  currentChord() {

    let theChords = this.selectedChords();

    if ( theChords.length === 0 ) {

      return null;

    } else {

      let firstNonInversionIndex = theChords.findIndex((el, i, arr) => { return el.isInversion === false });
      let firstChordIndex        = ( firstNonInversionIndex === -1 ) ? 0 : firstNonInversionIndex;

      return theChords[firstChordIndex];

    }

  }


  // Notes
  // -----
  // Renders the diagram header, which outputs chord matches and meta data.

  renderHeader() {

    let theChord = this.currentChord();

    if ( theChord === null ) {

      return <h2 className="Diagram-Headline">
               <span>
                 <strong>Click Below</strong>
                 <small>There Are Currently No Matches</small>
               </span>
             </h2>;

    } else {

      let outputSymbol  = ( theChord.isInversion ) ? `${theChord.noteRoot + theChord.symbol} / ${theChord.noteLowest}` : `${theChord.noteRoot + theChord.symbol}`;
      let outputName    = ( theChord.isInversion ) ? `${theChord.noteRoot} ${theChord.name} over ${theChord.noteLowest}` : `${theChord.noteRoot} ${theChord.name}`;
      let outputFormula = `Interval Formula: ${theChord.formulaSymbol}`;

      return <h2 className="Diagram-Headline">
               <span>
                 <abbr title={outputName + ' (' + outputFormula + ')'}>{outputSymbol}</abbr>
                 <small>{outputFormula}</small>
               </span>
             </h2>;

    }

  }


  // Notes
  // -----
  // Renders the chart of the diagram, which is used to select notes.

  renderChart() {
    let theStrings = [], stringID;
    for (let i = 0; i < this.props.strings.length; i++) {
      stringID = i;
      theStrings.push(<String
                        useSharps={this.props.useSharps}
                        frets={this.props.frets}
                        fretStart={this.props.fretStart}
                        strings={this.props.strings}
                        updateTuning={(e) => this.props.updateTuning(e)}
                        updateSelectedNote={(e) => this.props.updateSelectedNote(e)}
                        selectedChords={() => this.selectedChords()}
                        currentChord={() => this.currentChord()}
                        id={stringID}
                        key={stringID}
                      />);
    }
    return <div className="Diagram-Chart">{theStrings}</div>;
  }


  // Notes
  // -----
  // Renders the StepInput to adjust the base fret number and displays the
  // fret number of each successive fret.

  renderSidebarLeft() {

    let nextFretNumbers = [];

    for (let i = 1; i < this.props.frets; i++) {
      nextFretNumbers.push(<div key={i}>{parseInt(this.props.fretStart, 10) + i}</div>);
    }

    return <div className="Diagram-Sidebar-Left">
             <StepInput
               value={this.props.fretStart}
               values={frets()}
               updateValue={(e) => this.props.updateFretStart(e)}
             />
             {nextFretNumbers}
           </div>;

  }


  // Notes
  // -----
  // A sidebar for additional controls directly related to interacting with
  // the diagram.

  renderSidebarRight() {

    let disabledValue = ( this.selectedNotes().length === 0 ) ? true : false;

    return <div className="Diagram-Sidebar-Right">
             <div><button onClick={() => this.props.clearSelectedNotes()} disabled={disabledValue}>↺</button></div>
           </div>;

  }

  render() {
    return (
      <div className="Diagram-Canvas">
        <div className={"Diagram Diagram-Chart-Strings-" + this.props.strings.length + " Diagram-Chart-Frets-" + this.props.frets}>
          {this.renderHeader()}
          {this.renderSidebarLeft()}
          {this.renderChart()}
          {this.renderSidebarRight()}
        </div>
      </div>
    );
  }

}

export default Diagram;