# Inventory

Every item in the player's inventory needs to have some representation in their [home base](/home-base/), giving the play the opportunity to view, interact, and improve it.

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
