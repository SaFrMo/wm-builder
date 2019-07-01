# Level Builder Documentation

The White Mask [level builder](https://white-mask.com/builder/ 'Level builder') is a tool for creating White Mask levels. The level builder is an in-browser tool that can export levels to be added to the Unity project and import levels for editing.

## Layout

![Level builder layout](./LevelBuilder-Layout.png 'Level builder layout')

### Level Information

![Level builder board info](./LevelBuilder-BoardInfo.png 'Level builder level info')

#### Board Name

The current board's name, which is used to name the exported file and on the level selection menu once the level is loaded into the Unity project.

#### Meta

Extra information about the board, such as descriptions or trivia.

### View Controls

![Level builder view controls](./LevelBuilder-ViewControls.png 'Level builder view controls')

#### View Movement

Control the movement of the view of the board. The keyboard arrow keys can also be used to move the view of the board.

#### Zoom

'+' Zooms in on the board
'-' Zooms out from the board

#### Recenter

Centers the view on the board origin and resets the zoom to default.

#### New Board

Clears all changes to and information on the board, resetting the level and builder back to its initial state.

### Exporting and Importing

![Level builder export and import](./LevelBuilder-ExportImport.png 'Level builder export and import')

#### Export Level

Export the level as a JSON file for use in Unity.

#### Import Level

Import a level for editing.

### The Board

![Level builder board](./LevelBuilder-Board.png 'Level builder board')

#### Origin

The origin, coordinates (0, 0), of the board is highlighted black.

#### Axes

The x and y axes and all multiples of five along them are highlighted red.

### Actions and Settings

![Level builder actions and settings](./LevelBuilder-ActionsSettings.png "Level builder actions and settings)

Each of these menus are used to set up the movement of the board and various options to change game play, such as goals and player items. Each will be covered in depth in their respective sections.

## Saving Progress

The level builder auto-saves your work to `localstorage` every five seconds. More information on `localstorage` can be found at this [reference](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage). In short, progress is saved frequently and will be persistent across browser sessions, so it will still be there even if the browser tab or window is closed.

## To be continued
