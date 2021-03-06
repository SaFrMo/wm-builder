# Building Levels

The [level builder](https://white-mask.com/builder) is designed to make creating White Mask (WM) levels as easy as possible. Let's get started creating our own stages!

## Layout

When you load the builder, you'll see something like this:

![Layout of the White Mask level builder](./layout-blank.png)

The WM Builder is divided into three sections: **meta**, **map**, and **actions**.

![Version of the image above with the main sections labelled](./layout-labelled.png)

**Meta** controls information about the board. Think flavor text, board title, etc.

**Map** displays the way the map actually appears at any given point.

**Actions** control the way a board arranges its Map.

Let's go through these one at a time.

## Meta

"Meta" in this case refers to extra information about the board - the board's name and any arbitrary information that should be attached to it.

We're going to set the board's name first. This is what will appear when we select the board in the main menu. Click "Board" in the upper left hand corner and change the text to "Mona Lisa."

![Animated gif showing the board being renamed "Mona Lisa"](./naming-board.gif)

Now, let's add some arbitrary information to this board - for example, the fact that it was painted in the early 16th century.

Any arbitrary information needs a _key_ which it will be stored under, as well as a _value_ which contains the information itself. Click "Add More Info" and enter "Trivia" as the key and "Painted in the early 16th century" as the value.

![Animated gif showing this information being entered](./adding-meta.gif)

Anything marked "Trivia" (or "trivia," or "tRiViA," and so on - this particular key is case-insensitive) will display on loading screens and in "more info" lists in the level selection.

This is a great start! We can add information that will be displayed to the player in this meta section, as well as information relevant only to the developer - whatever we want.

The board is autosaved every few seconds in your browser, too, so you don't need to worry about constantly keeping your data up to date. (We'll cover exporting data a little later, once we've got more to export.)

Let's jump over to the Map and keep going.

## Map

The first thing you'll see in the Map is the large blue rectangle in the center:

![The square in the center of the map](./map-starting.png)

This is a **Partition** - a section of the game board that can move and react to its environment.

Let's take a look at the controls available on a Partition:

![A single Partition labeled with the numbers described below](./partition-labeled.png)

1.  The **Control Bar** is available on each edge of a Partition. Click the arrow to move the entire Partition in the indicated direction. You can also click the plus or minus signs to expand or shrink the Partition in the desired direction.
2.  A **single Cell** contains:
    -   The Cell's coordinates
    -   The min, current, and max HP of that Cell (each editable as a text field)
    -   A slider indicated the current HP percentage
3.  A green-highlighted **pivot point**, the Cell around which the entire Partition will pivot
4.  A button to add in **more info** about the Partition

## TODO: Continue
