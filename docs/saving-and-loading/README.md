# Saving and Loading

Saving and loading are both done in the `KeepAlive` instance's `saveAndLoad` property.

## Format

`saveAndLoad` contains a struct called `SaveFile` that keeps track of the content to be saved and loaded.

`SaveFile` structure might change over time, so each iteration of `SaveFile` should have its own `version` string. This way, save games with older versions can still be loaded correctly.

<details>

<summary>More information on Versions</summary>

Version naming is done with the [Semantic Versioning](https://semver.org/), or _semver_, convention. Each version will have three numbers like this:

`1.0.0`

When you make a backwards-compatible bugfix in a save file format, increment the last number:

`1.0.1`

When you add backwards-compatible functionality to the save file format, increment the middle:

`1.1.0`

When you make a change that's not backwards-compatible - one that will break old files - increment the first:

`2.0.0`

</details>

<details>

<summary>Version changelog</summary>

This changelog

-   `1.0.0`
    -   Saving and loading is working!

</details>

## Saving

You can see any time by calling `saveAndLoad.Save()` on the `KeepAlive` instance. Passing no parameters will quicksave the current player, inventory, stats, board state, etc., but you can also pass an Actor, Inventory, and filename to save.

## Loading

Load and replace all current data by calling `saveAndLoad.Load()` on the `KeepAlive` instance any time. Passing no parameters will load the latest quicksave (ie, the last file saved by an empty `Save()` call [above](#saving)).

**TODO**: load a specific filename
