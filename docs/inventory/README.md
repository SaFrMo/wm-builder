# Inventory

Items and Inventory in WM are managed in two places:

-   First, with an lookup table loaded at runtime in the `KeepAlive` script. This table is a `List<Item>`. This is most useful when instantiating an item, since the items held here are archetypal Item types, not specific instances.
-   Second, with a `List<Item>` or a single `Item` reference anywhere one or more Items lives (for example, in the player's inventory or an Entity slot as a pickup). This `Item` can have variations and metadata, which are saved and loaded in an Item's `ToJson` and `FromJson`, respectively.

## Loading Item Lookup Table

When the player starts or resumes a game, the following process happens:

1.  The `KeepAlive` script runs `Start()`, which runs `RefreshDictionary()` on its `ItemLookup` instance.
1.  `RefreshDictionary()` does the following:
    1.  Loads all JSON files as TextAssets in the `resources/items` folder
    1.  Creates an array of Items from the loaded TextAssets using `Item.FromJson()`
    1.  Populates the item lookup table with the created Items, storing each under its GUID.

## An Item's Lifecycle

### Acquiring

When the player acquires a new item the game calls `KeepAlive.inventory.AddItem` to add the item to their inventory. Adding the item saves that item's base representation as well as a `List<KeyValuePair>` called `meta`.

### Storing

Every item in the player's inventory needs to have some representation in their [home base](/home-base/), giving the play the opportunity to view, interact, and improve it. (**TODO**: more info here on storage?)

### Using

When a player uses an item, its `useCount` increases, and it runs `Break` if that `useCount` passes the `useLimit` (and the `useLimit` is not -1).

### Breaking

**TODO**

## Items in Hacking Mode

## Items in Management Mode

Every Inventory item has a few basic characteristics:

-   Name
-   GUID
-   Description
-   Icon
-   Model
-   Value

## Storage

The Inventory will exist on the `KeepAlive` script as a `List` of `Items`. It will be loaded when the main game is loaded and modified through the `KeepAlive` script in Management mode and through the `InventoryManager` in Hacking.

Example flow:

-   A new game is created. The `KeepAlive` script creates an instance of the `Inventory`.
-   The player starts their first level, triggering an autosave. The Inventory is written to the main JSON save file.
-   The player modifies their inventory by playing the first level; it is held in-memory in the `KeepAlive` Inventory script and interacted with through the `GameManager.inventoryManager` script. Saving the level writes main JSON save file, as in the previous step.
-   The player completes the level, triggering another autosave; the main JSON save file is written as in the second step above.
-   The player modifies their Inventory more in the Management mode. It is held in-memory in the `KeepAlive` Inventory. (TODO: how to interact with?)

## Item Builder

<item-builder/>
