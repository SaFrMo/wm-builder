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

# Level

# Managers

## EventManager

Holds utility items for game-wide events.

### `GenericEvent()`

-   delegate void
-   Generic signature for an event listener

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
