import React, { Component } from 'react';
import { chordData, frets, chromatic, getNoteInfoFromFormula, arrNextInt, textifyAccidental } from '../helpers';
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
    let thisStart = parseInt(this.props.state.diagramFretStart, 10);
    let thisNote;

    for (let i = 0; i < this.props.state.diagramStrings.length; i++) {
      if ( this.props.state.diagramStrings[i].selectedNote !== null ) {
        thisNote = parseInt(this.props.state.diagramStrings[i].selectedNote, 10); // 01
        if ( thisNote === 0 ) {
          theNotes.push(this.props.state.diagramStrings[i].tuning);
        } else {
          theNotes.push(arrNextInt(chromatic(this.props.state.accidentals), this.props.state.diagramStrings[i].tuning, thisStart + (thisNote - 1)));
        }
      }
    }

    theNotes = theNotes.filter((el, i, arr) => { return arr.indexOf(el) === i });

    return theNotes;

  }


  // Notes
  // -----
  // 01. Gathers selected notes and sorts them for equality check later on.
  // 02. chordNotesFull contains every possible note in a chord's formula.
  // 03. chordNotesCore eliminates unnecessary notes from chordNotesFull and
  //     gives us the bare essential notes to represent a chord's tonality.
  // 04. The first line of the match checks every selected note to see if it is
  //     included within chordNotesFull. This keeps out false matches such as
  //     chords with lesser notes in their formula than what is currently
  //     selected (e.g. "E" when the notes of an "E7" are selected), or times
  //     where a "core" match might exist, but the selected notes contain notes
  //     outside of the chord's "full" formula (e.g. selecting the notes
  //     "E", "D", "G♯", and "C♯" match an "E6" chord's core formula, but the
  //     "D" is a ♭7 in relation to the "E", making the chord truly an "E13").
  // 05. The second line of the match checks that all core notes to a chord
  //     are present in the current selected notes.
  //
  // E.G. 1 note is selected ("E"):
  // return []
  //
  // E.G. 3 notes are selected ("E", "G♯" "B"):
  // return  [{noteRoot : "E", name : "Major", ...}]

  selectedChords() {

    let theChords        = [];
    let theSelectedNotes = this.selectedNotes().sort(); // 01

    chordData().forEach((chord, iChord) => {
      theSelectedNotes.forEach((note, iNote) => {

        let chordNotesInfo = getNoteInfoFromFormula(note, chord.formula, chord.formulaSymbol, this.props.state.accidentals); // 02
        let chordNotesFull = Object.keys(chordNotesInfo);
        let chordNotesCore = chordNotesFull.filter((el, i, arr) => { return chord.formulaOptInd.indexOf(i) < 0 }); // 03
        let isMatch        = theSelectedNotes.every((el, i, arr) => { return chordNotesFull.includes(el) }) // 04
                          && chordNotesCore.every((el, i, arr) => { return theSelectedNotes.includes(el) }); // 05

        if ( isMatch ) { 
          chord.chordMap    = chordNotesInfo;
          chord.noteRoot    = note;
          chord.noteLowest  = this.selectedNotes()[0];
          chord.isInversion = chord.noteRoot !== chord.noteLowest;
          chord.isPartial   = chord.formula.length > theSelectedNotes.length;
          theChords.push(chord);
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

      let theSelectedNotes = this.selectedNotes();
      let theChordNotes    = Object.keys(theChord.chordMap);

      let outputSymbol     = ( theChord.isInversion ) ? textifyAccidental(`${theChord.noteRoot + theChord.symbol} / ${theChord.noteLowest}`) : textifyAccidental(`${theChord.noteRoot + theChord.symbol}`);
      let outputName       = ( theChord.isInversion ) ? textifyAccidental(`${theChord.noteRoot} ${theChord.name} over ${theChord.noteLowest}`) : textifyAccidental(`${theChord.noteRoot} ${theChord.name}`);
      let outputFormula    = theChordNotes.map((el, i, arr) => { return <span key={i}><i className={theSelectedNotes.includes(el) ? 'Active' : ''}>{textifyAccidental(theChord.chordMap[el])}</i></span>; });

      return <h2 className="Diagram-Headline">
               <span>
                 <abbr title={outputName}>{outputSymbol}</abbr>
                 <small>Formula: {outputFormula}</small>
               </span>
             </h2>;

    }

  }


  // Notes
  // -----
  // Renders the chart of the diagram, which is used to select notes.

  renderChart() {
    let theStrings = [], stringID;
    for (let i = 0; i < this.props.state.diagramStrings.length; i++) {
      stringID = i;
      theStrings.push(<String
                        state={this.props.state}
                        updateTuning={(e) => this.props.updateTuning(e)}
                        updateSelectedNote={(e) => this.props.updateSelectedNote(e)}
                        selectedNotes={() => this.selectedNotes()}
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
  // Renders the StepInput to adjust the base fret number and displays the fret
  // number of each successive fret.

  renderSidebarLeft() {

    let nextFretNumbers = [];

    for (let i = 1; i < this.props.state.diagramFrets; i++) {
      nextFretNumbers.push(<div key={i}>{parseInt(this.props.state.diagramFretStart, 10) + i}</div>);
    }

    return <div className="Diagram-Sidebar-Left">
             <StepInput
               value={this.props.state.diagramFretStart}
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
        <div className={"Diagram Diagram-Chart-Strings-" + this.props.state.diagramStrings.length + " Diagram-Chart-Frets-" + this.props.state.diagramFrets}>
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