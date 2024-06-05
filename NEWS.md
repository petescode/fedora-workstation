# Fedora 40 updates

- Added this changelog file for better tracking of features
- Added more packages to install
- Removed more default GNOME packages
- Removed default GNOME terminal
- Added Nautilus Templates to give the right-click context menu options for creating files
- Installed Flathub repo by default to enable easier installation of Flatpaks
- Set default clock format to 24hrs
- Visual Studio Code:
    - Set a default color scheme to stop it from defaulting to high contrast (based on system theme settings)
    - Disabled independent update capability
    - Added custom font settings
- Added more privacy settings to Firefox
- Set custom PS1 variable to fix ugly default bash prompt
- Terminator:
    - Replaced right-click context menu option to now launch terminator
        - The officially supported method for adding functionality like this to Nautilus is by using Nautilus Python:
            - dnf install nautilus-python
            - https://wiki.gnome.org/Projects/NautilusPython
            - https://github.com/GNOME/nautilus-python
            - https://gnome.pages.gitlab.gnome.org/nautilus-python/
    - Fixed terminator config dirtectory path being created incorrectly
    - Set custom terminator color profiles
- Added Python shebang to setup.py to fix hanging issue when called without Python
- Added DisplayLink installation tasks

## Known issues

- Sometimes using the right-click context menu for launching terminal causes Nautilus to freeze
    - Closing and re-launching Nautilus fixes the issue and I can't reproduce again after this happens for the first time
- Firefox sporadically fails to launch/hangs as a background process