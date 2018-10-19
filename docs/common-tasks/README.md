# Common Tasks

## Segment and Turn Events

```cs
void MyListener() {
    // ...
}

// add the listener wherever it makes sense to do so:
gameManager.turnManager.OnTurnStart += MyListener

// and make sure to remove the listener when the host is destroyed:
gameManager.turnManager.OnTurnStart -= MyListener
```

Available events:

-   OnTurnStart
-   OnSegmentStart
-   OnSegmentEnd
-   OnTurnEnd
