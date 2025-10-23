# Fedora 43 changes


## Known issues


## Future enhancements

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