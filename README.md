![Arpeggio](https://github.com/korywakefield/arpeggio/blob/master/public/og.png)

# [Arpeggio](http://korywakefield.com/arpeggio/)

[ahr-**pej**-ee-oh] noun

1. The sounding of the notes of a chord in rapid succession instead of simultaneously.
2. A web application specializing in the identification of chromatic polyphony **(i.e. it names yer guitar chords 'n'&nbsp;stuff).**

## About

Arpeggio is a little weekend endeavor built with ❤️. Just kidding, it was built with a computer...and React. This is my first project working with React and I wanted it to be something that I'd find genuinely useful and interesting to explore. Inspired by some of the tools (read: Java applets) I would find online while learning guitar as a kiddo, Arpeggio is meant to be a fun way to help with chord discovery.

## Usage

Instead of writing charts by hand or figuring out chords manually, Arpeggio will calculate the closest match based on the points plotted on the diagram. In addition to that, you can also:

- **Adjust the starting fret** using the highlighted number to the left of the chart
- **Tune each string individually** at the bottom of the chart to suit your preferences
- **Specify chart display options** in the sidebar, such as how to display accidentals (**♭** or **♯**) and the total frets available on the chart

It's a great way to see the relationships between notes and their finger position, as well as how manipulating individual notes can result in new chords. One cool thing to do is pick a common shape and increment the starting fret to see what chords are created from moving it up the neck.

## Planned Improvements

Arpeggio does most of what I initially set out for it to do, but there are certainly a few improvements I have planned at the moment:

- [ ] **Partial Matches** &ndash; Chord results are currently calculated by comparing for exact matches in note values between your selected notes and the formula of a chord. This means that if you were wanting to display a match for an **A7** chord, you would need to make sure all four notes it contains (**A**, **C♯**, **E**, **G**) are selected at least once on the chart. However, having at least the 1 (**A**), 3 (**C♯**), and ♭7 (**G**) selected should be sufficient for us to determine what chord we're going for. I plan on finding a way for partial matches like these to yield results when applicable.
- [ ] **Multiple Matches** &ndash; Sometimes the notes of our chord can be looked at in multiple ways. An **Em7** (**E**, **G**, **B**, **D**) with a **G** in the bass could be viewed as either an **Em7/G** inversion or a **G6.** Both are correct values, but depending on how you are thinking about the music as a whole, you may view them differently. Ideally there will be a way to reflect these multiple matches in the application and allow users to cycle through them.

## Contributing

If you've found a bug or have an idea for a potential feature, let me know! This project has been a really fun way to start understanding React better and I'd love to try and implement anything that might improve the overall experience of using the tool.