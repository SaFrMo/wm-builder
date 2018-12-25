# Hacking

When a player selects a mural to hack, they've started a new _Level_.

A Level builds itself up from the **GameManager**. The GameManager is responsible for just about everything in a Level (and is accessible through the `gameManager` property in most classes).

A GameManager needs to keep track of:

-   the current Board
-   the game's available Prefabs
-   the game's current Items

It does so using the following structure:

![Diagram of the organization of a level](./organization.png)

[View/edit this diagram](https://drive.google.com/file/d/1al9U62D99-xpSG9BzH-doIMkg5y4Am4t/view?usp=sharing)

## Construction

Take a look at the GameManager's `Start` function to see how it populates a Level. It'll probably run through a sequence like this:

1.  Load all prefabs in the game using the `prefabManager`
1.  Instantiate each Partition in the level.
1.  For each Partition…
    -   ...instantiate each Cell.
1.  Instantiate each Item in the level.
    -   In a new level, Items only exist in the player's inventory and the level's design.
    -   When loading from a save file, the GameManager will instantiate whatever Items exist in the save file.

## Examples

Let's take a look at a few examples.

### Creating New Items

## TODO: continue
