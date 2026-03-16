# PrismModlistDiff
A web tool to compare modlists as exported from Prism Launcher.
## How do I use this?
The site at https://boniondev.github.io/PrismModlistDiff/ will require the target mod list first, which is the modlist you want to match. The second modlist is the one that is (presumably) different. The later screen will show the changes you must do to the **second** modlist to match the first. Missing mods must be added, mismatched mods need their version changed to the one on the right, and extra mods must be removed.
### It tells me to paste and not type and it flashes red
To make sure there are no typos, the page will refuse any input that is not pasted in. You must go to Prism Launcher, select your modpack, press "Edit", go in the "Mods" tab, click "Export List", change the format from HTML to CSV, and enable **all** optional info. This must be done for both modlists.
> [!CAUTION]
> This branch is the absolute latest version, not the latest **stable** version. If you want the latest version that works, check the releases. If you just want to use this tool, visit the site instead.
