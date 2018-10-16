# API

[[toc]]

## Format

Documentation for the in-game code should follow this format:

```md
## ClassName

Brief description.

### `property`

-   type
-   Brief summary.

### `FunctionName(parameters, [overloadParameters])`

-   return type
-   Brief summary.
```

# Actors

## Actor

One of the players of a given Level. Either player-controlled or computer-controlled. Should be declared before loading a Level.

### `name`

-   string
-   Human-readable name of this Actor.

# Builders

# Data

# Entities

## `Entity`

An entity on the board.  For example, a soldier or a wall.

### `location`

- Cell
- Cell in which this entity is located.

### `isSelected`

- bool
- Whether this entity is selected or not.

### `allegiance`

- Faction
- The faction to which this entity belongs.

### `Faction`

- enum
- Enumeration of factions to which entities can belong.

### `Teleport(Cell)`

- void
- Removes the entity from its current location and places it at the specified destination.

### `FactionResponse(Entity)`

- int
- Checks this entity's response to another based on respective factions.

### `Demolish()`

- void
- Destroys this entity and its containing game object.

### `MoveTo(Cell)`

- IEnumerator
- Moves the entity to the specified destination along a path determined by A* path-finding algorithm

### `GetPathTo(Cell)`

- `List<Cell>`
- Gets the path to the destination, as calculated by the A* path-finding algorithm.

## Soldier

A soldier entity with a hit point pool, capable taking actions.

### `maxHP`

- int
- Maximum possible hit points

### `maxAP`

- int
- Maximum possible action points

### `currentHP`

- int
- Current hit points.

### `currentAP`

- int
- Current action points.

### `ChangeAP(int)`

- bool
- Changes the current AP.

### `ChangeHP(int)`

- int
- Changes the current HP.

### `Kill()`

- void
- Destroys the soldier and its containing game object.


# Level

## BoardState

Data on a particular board state.

### `deltas`

- `List<BoardDelta>`
- List of deltas (differences) between this BoardState and the default BoardState for this Level.

### `id`

- string
- Unique ID of this BoardState

### `meta`

- `List<KeyValuePair>`
- Metadata for this BoardState.  Arbitrary string key-value pairs.

### `name`

- string
- Human-readable name of this BoardState

## Cell

### `x`

- int
- The x coordinate of the cell.

### `y`

- int
- The y coordinate of the cell.

### `OnInteract()`

- void
- Behavior when cell is interacted with.

## Level

A Level is exported from the Level Builder and loaded at runtime in Unity.

### `entities`

- `List<Entity>`
- All Entities present at the start of this level.

### `guid`

- string
- This level's GUID (globally unique identifier - can be random string or human-readable slug).

### `sequences`

- `List<BoardSequence>`
- All Sequences in this Level.

### `meta`

- `List<KeyValuePair>`
- Metadata for this level.  Arbitrary string key-value pairs.

### `name`

- string
- This level's name.

### `partitions`

- `List<Partition>`
- All Partitions that can exist in this level.

### `states`

- `List<BoardStates>`
- All possible BoardStates in this level.

### `version`

- string
- The version of the level editor used to create this level.  Should be a [semver](https://www.sitepoint.com/semantic-versioning-why-you-should-using/) number (x.x.x).

## Partition

### `cells`

- `Cell[,]`
- Reference to the Cells in this Partition.  Populated in-game.

### `guid`

- string
- This partitions' GUID (globally unique identifier - can be random string or human-readable slug).

### `height`

- int
- Height, in Cells, of this Partition.  Populated in level creation.

### `name`

- string
- The name of this Partition.

### `pivot`

- Cell
- The cell at the pivot point of this partition.

### `pivot`

- Vector2
- Pivot point of this Partition.  Populated in level creation.

### `pivotDistanceX`

- int
- The pivot's distance from the anchor on the x axis.

### `pivotDistanceY`

int
The pivot's distance from the anchor on the y axis.

### `position`

- Vector2
- The global position of this Partition.  Used with 'pivot' to determine this Partition's location.

### `width`

- int
- Width, in Cells, of this Partition.  Populated in level creation.

### `GetCell(int, int)`

- Cell
- Gets the cell at the specified coordinates

### `GetAdjacentCells(Cell, bool)`

- `List<Cell>`
- Gets the cells adjacent to the given cell.

### `ToPartitionX(int)`

- int
- Translates a scene-relative x coordinate to partition-relative.

### `ToPartitionY(int)`

- int
- Translates a scene-relative y coordinate to partition-relative.

### `ToSceneX(int)`

- int
- Translates a partition-relative x coordinate to scene-relative.

### `ToSceneY(int)`

- int
- Translates a partition-relative y coordinate to scene-relative.

# Managers

## BoardManager

Manages the partitions of the board.

### `partitions`

- `List<Partition>` 
- Reference to the Partitions on this board.  Populated from Level.partitions.

### `anchor`

- Transform
- Anchor point for this board.  Reference point for locations of Partitions.  Populated in Inspector.

### `BuildPartitions(List:PartitionData)`

- void
- Builds out the given PartitionData instances.  Instantiates prefabs and populates as described in each passed PartitionData.

## EntityManager

Manages the entities on the board and their interactions.

### `selected`

- Entity
- The currently selected Entity.

## EventManager

Holds utility items for game-wide events.

### `GenericEvent()`

-   delegate void
-   Generic signature for an event listener

## GameManager

Manages the other managers.

### `boardManager`

- BoardManager
- Reference to the level's BoardManager instance.  Populated in Inspector.

### `entityManager`

- EntityManager
- Reference to the level's EntityManager instance.  Populated in Inspector.

## TurnManager

Manages Turns, Segments, and the history of a single game.

Subscribe to events in [WhiteMaskBase](#whitemaskbase)-derived classes with:

```cs
void MyListener() {
    // ...
}

// add the listener wherever it makes sense to do so:
gameManager.turnManager.OnTurnStart += MyListener

// and make sure to remove the listener when the host is destroyed:
gameManager.turnManager.OnTurnStart -= MyListener
```

### `LATEST_TURN_NUMBER`

-   int
-   Latest actual in-game turn. Saved separately in case it needs to be modified by an unexpected source.

### `OnTurnStart`

-   [EventManager.GenericEvent](#genericevent)
-   Fired when a Turn starts.

### `OnSegmentStart`

-   [EventManager.GenericEvent](#genericevent)
-   Fired when a Segment starts.

### `OnSegmentEnd`

-   [EventManager.GenericEvent](#genericevent)
-   Fired when a Segment ends.

### `OnTurnEnd`

-   [EventManager.GenericEvent](#genericevent)
-   Fired when a Turn ends.

# Board

## BoardDelta

The amount a given Partition moves from its default state.

### `id`

-   string
-   ID of the Partition this BoardDelta controls.

### `x`

-   int
-   Difference between default state X and desired X position.

### `y`

-   int
-   Difference between default state X and desired X position.

# Turns

## TurnSummary

Summary of a given Turn. Populated as a Turn is played and savable/loadable afterwards.
