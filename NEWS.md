## Fedora 40 updates ()

- Added this changelog file for better tracking of features
- Added more packages to install
- Removed more default GNOME packages
- Removed default GNOME terminal
- Replaced right-click context menu option to open GNOME terminal with a shortcut to terminator
    - The officially supported method for adding functionality like this to Nautilus is by using Nautilus Python:
        - dnf install nautilus-python
        - https://wiki.gnome.org/Projects/NautilusPython
        - https://github.com/GNOME/nautilus-python
        - https://gnome.pages.gitlab.gnome.org/nautilus-python/
- Added Nautilus Templates to give the right-click context menu options for creating files
- Installed Flathub repo by default to enable easier installation of Flatpaks
- Set default clock format to 24hrs
- Set default VS Code color scheme as the latest version started to set based on system theme which produced ugly results
- Added some more privacy settings to Firefox
- Re-enabled cleanup task

## Fedora 39 updates (16 Nov 2023)

- Added Chrome policies to set bookmarks
- Fixed GTK theme settings broken by GNOME 45
