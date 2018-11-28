# Writing for the Game

Welcome to the White Mask writing team! Unless otherwise specified, you're being asked to write a 3-4 email thread for the game, with one in-game level for each email except the last one. [Here](https://docs.google.com/document/d/1PXk-j8lqiIqXtDO7lMKZaTPQQhEtvKFYJ1ddBHGMLe0/edit?usp=sharing) is a sample thread, including some of the basics available to you:

-   Emails to the player
-   Implied responses from the player
-   Media attachments to the emails
-   Implied gameplay goals/quirks for each level
-   Final email wrapping up the thread

## Setting and Rules

### Who

You're writing as anyone who would have (a) a reason and (b) the required money, social capital, or tech rewards to hire someone to hack a smart graffiti mural.

### What

A smart graffiti mural is analogous to a small phone app. Just about everyone's got an idea for one, but there's a steep learning curve when it comes to actually building it.

People tend to work in teams of 2-4 on a mural, with some focusing on programming and some focusing on art. If it's a single person creating a mural, either the art or the complexity of programmed animation tends to be the clear favorite.

Materials are expensive and the work is time-consuming, so artists tend to be freelancers (often with day jobs) commissioned by wealthier corporations or individuals.

Smart graffiti murals must:

-   Contain 1 or more "controllers," power centers that control enemies
-   Have some kind of motion, whether an animation loop or reaction
-   Have a winning condition

Smart graffiti murals can:

-   Play animation loops
-   React to different player positions
-   Contain different numbers and types of enemies
-   Continuously spawn enemies, or spawn enemies only at certain points
-   Upload and download information to and from the in-world internet
-   Have a secondary goal for the player

Smart graffiti murals cannot:

-   Move off the wall into 3D space

### When

The game takes place in the near future. Drones are more widespread, Silicon Valley is alive and well, and the more severe effects of climate change are starting to become facts of life.

### Where

Your mural can be located anywhere in the world. It can also be any size, from a multi-story piece to one tucked away in an alley.

### How

In order to hack a mural, you're implicitly providing credentials to the player - think the username and password for computer.

The player will ship a drone out to the mural and work on it remotely.

[TODO: Gameplay specifics]

## Checklist

Make sure your thread has:

-   A clear, self-contained story
-   Some kind of connection to the main story, especially in the form of a new player weapon, ability, or connection to the final level

## Format

Google Docs is preferred, but any format is acceptable. Please divide up the start of each separate email into its own page.

You can have simple conditional text and a player name placeholder in the emails:

> Dear {player},  
> I'm writing to tell you that your secondary objective was {if:secondary==true}a success. Well done.{else}a failure. Good try.{end}
>
> {if:secondary==true}I will only appear if the secondary objective succeeded.{end}
>
> Sincerely{if:secondary==false} and disappointedly, since the secondary objective failed{end},
>
> The Sender

Make sure you talk with Sander to confirm that your secondary goal is doable if you want to add one.
