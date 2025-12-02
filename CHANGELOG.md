# Fedora 43 changes
- Added dnf.conf parallel download setting to increase performance 

- Added the enablement of RPM Fusion appstream data
  - This is the equivalent of running the "sudo dnf group upgrade core" step from the docs 

- Removed some packages that were either already installed by default now or obsolete
  - This included the fuse-exfat package which was used in the past for interacting with exFAT filesystems, but that capability was apparently merged in kernel v5.4

- Changed how firmware packages are installed
  - Removed the wildcard "*-firmware" package which retrieved dozens of random packages
  - After researching all packages pulled by that wildcard, I added only ones I felt were relevant for most common devices
  - Created a separate variable for these firmware packages so that it is more obvious if they cause a failure in the overall run

- Fixed Flathub repo setup

- Power settings
  - See "known issues" section for more information about certain settings and the GUI
  - Fixed lock screen / idle timeout setting (syntax error)
  - Set power profiles based on the type of installation (VM, laptop, desktop)
    - This is now managed via the tuned daemon starting with Fedora 42
    - Ansible does not have a module for tuned at this time, must use the tuned-adm command
    - The current power profile is set in this file: /etc/tuned/active_profile
  - Fixed laptop lid close power settings

- Removed fractional scaling as an experimental GNOME setting because GNOME 49 flipped it to production (non-experimental) and enabled by default

- Screenshotting has changed significantly
  - The deprecated gnome-screenshot standalone-rpm tool has finally broken in GNOME 49 and since it is unmaintained it will not be fixed
  - The native screenshot tool is lacking features, namely a timer option, and also cannot be pinned to the dock because it is part of the shell (like the power options menu for example)
  - At this time, I have found no good substitute because pretty much all screenshot tools do not work well with Wayland - this has something to do with security features implemented by Wayland
  - So the only way to do screenshots currently is to use the PrtScn button on your keyboard, which is using the new built-in screenshot tool


## Known issues
- A firmware package called "ipu6-camera-bins" was causing install failures on AMD desktop
  - This is used for some integrated webcams in laptops that use Intel Tiger Lake, Alder Lake, Raptor Lake and Meteor Lake
  - Since this was tested the day of F43 release, it's likely the package will be fixed in the future

- Not all power settings are reflected in the GUI
  - The "Automatic Suspend" settings that used to show up under Power --> Power Saving are gone, I believe this is a bug
  - This means if you want to disable sleep while on AC power, you'll need to modify "/org/gnome/settings-daemon/plugins/power/sleep-inactive-ac-type" to the value of "nothing"
  - Suspect some combination of the ppd --> tuned migration (Fedora 42) and the forcing of Wayland-only (Fedora 43) caused this (this was not an issue in Fedora 42)
  - Back in Fedora 42 the GUI options only went up to "2 hours", so to test for fix in the future, may need to modify "sleep-inactive-ac-timeout" to a value in seconds at or below that

- If a VM, something is resetting the Power Profile from "virtual-guest" back to "balanced" upon reboot

- Apps that currently utilize deprecated GTK3 and therefore have color/drawing issues with themes
  - Virtual Machine Manager
  - Fedora Media Writer
  - Terminator

## Future enhancements
- Review browser settings

- Review mimeapps defaults

- Laptop conditionals
  - nouveau-firmware conditional
  - displaylink conditional
  - laptop power vs battery profile switching

- Clean out old irrelevant branches (after documenting RHEL forking)

- Start using github issues against the project to track features and bugs instead of in here

- Review Discord default settings

- Replace "HighContrastInverse" for legacy apps with 3rd party GTK theme

#
# Previous versions
## Fedora 42 changes
- Disabled logind settings
    - Lost track of reason why, review in future release

- Disabled DisplayLink setup
    - Not testing with this currently; needs to be moved into a future separate laptop setup task list

- Removed Microsoft Teams and PowerShell
    - Microsoft Apps in general have migrated to Progressive Web Apps and are no longer supported Linux-native
    - This included repos, package lists, and env variables

- 01-gnome-settings file
    - Sorted for easier troubleshooting and removed duplicate entries
    - Removed gtk4 file-chooser settings; don't apply to Nautilus - will monitor for changes
    - Marked power related settings with comments for future review
    - Added fractional scaling (experimental in GNOME 48)
    - Fixed Firefox not pinning to dock

- Moved Visual Studio Code window buttons to the left, including for tabs within VSCode

- Reviewed package variable lists
    - Removed native apps that no longer exist
    - Removed some installation packages no longer used
    - Added Discord to install list


### Known issues
- The "*-firmware" package installation is actually installing quite a bit of stuff we probably don't need at all, potentially causing slower run times and bloat

- There are multiple power related settings currently not working, due to the migration to the tuned daemon. Target potentially updating these for F43


### Future enhancements
Note: items listed here are either planned future changes or ideas to experiment with in the next Fedora release

- Install a 3rd party legacy GTK theme in order to get more options
    - Currently stuck with "HighContrastInverse" which can cause funky issues with apps like Virtual Machine Manager (buttons being drawn with colors too close together and hard to see), or VSCode which requires a user-space override to not look bad

- Test if using laptop, and if so adjust related power settings / lid close action / active DisplayLink, etc

- Why is default display refresh rate so low? Can we detect highest possibility and set a custom refresh rate?

- Add dnf.conf customizations for faster performance
    - See "max_parallel_downloads=10"
    - Do not use fastest mirror setting, can cause issues and only seeks lowest latency, not fastest throughput

- RPMFusion docs mention a "group upgrade core" command needed after installing

- Evaluate if Discord has a file to edit for preferences such as close instantly (don't run in background)

- Consider leaving VSCode tab X button to right with window buttons to left

- Track RHEL-branching in CHANGELOG and retroactively mark which versions of Fedora RHEL has been forked from

#
## Fedora 41 changes
- Few changes to this project for Fedora 41 other than compatibility tweaks

- Removed setting power profile (see known issues below)

- Removed right-click context menu for launching custom terminal due to further instability with Nautilus and this feature in Fedora 41 and no updates to the GitHub project


### Known issues

- Fedora 41 switched from power-profiles-daemon (powerprofilesctl) to tuned for power management
    - https://docs.fedoraproject.org/en-US/fedora/latest/release-notes/sysadmin/#tuned-def-pwr-mgmt-daemon
    - https://docs.redhat.com/en/documentation/red_hat_enterprise_linux/9/html/monitoring_and_managing_system_status_and_performance/getting-started-with-tuned_monitoring-and-managing-system-status-and-performance
    - Modifying tuned profiles does not work for me at this time. I can successfully change them using the "tuned-adm" command but reboot always reverts to the previous working profile and logs at /var/log/tuned directory show various issues such as "unknown profile" even when setting to a preset good profile, and "FATAL: Module cpufreq_conservative is builtin"
    - tuned is a new change starting in Fedora 41 so I am assuming this is a bug as I've found various hints around the internet of other people having issues with it. For this reason I've just removed automating the power profiles for now.

- Leaving a Smart Card in the reader causes performance issues with the browser and OpenSC. The issue appears to have gotten slightly better in Fedora 41 but still exists.