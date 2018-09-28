# Turns

The White Mask takes place in Turns. A Turn is built up of Segments, with each Segment representing a player- or computer-controlled character.

## Basic Turn

The most basic single Turn looks like this:

| Segment Number | Actor    | Ending Trigger                       |
| -------------- | -------- | ------------------------------------ |
| 1              | Player   | Presses "Turn Complete" button       |
| 2              | Computer | Notified by AI that turn is complete |

Most Turns in the game will look like this. If there are multiple PCs or NPCs, though, a Turn could look like this:

| Segment Number | Actor              | Ending Trigger                       |
| -------------- | ------------------ | ------------------------------------ |
| 1              | Player             | Presses "Turn Complete" button       |
| 2              | Computer Faction 1 | Notified by AI that turn is complete |
| 3              | Player 2           | Presses "Turn Complete" button       |
| 4              | Computer Faction 2 | Notified by AI that turn is complete |

Segments alternate between player- and computer-controlled characters.

## Events

Segments and Turns all come with their own associated events, triggered in the main `GameManager` instance.

(TODO: continue here)
