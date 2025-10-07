# Fedora 41 updates

- Few changes to this project for Fedora 41 other than compatibility tweaks

- Removed setting power profile (see known issues below)

- Removed right-click context menu for launching custom terminal due to further instability with Nautilus and this feature in Fedora 41 and no updates to the GitHub project


## Known issues

- Fedora 41 switched from power-profiles-daemon (powerprofilesctl) to tuned for power management
    - https://docs.fedoraproject.org/en-US/fedora/latest/release-notes/sysadmin/#tuned-def-pwr-mgmt-daemon
    - https://docs.redhat.com/en/documentation/red_hat_enterprise_linux/9/html/monitoring_and_managing_system_status_and_performance/getting-started-with-tuned_monitoring-and-managing-system-status-and-performance
    - Modifying tuned profiles does not work for me at this time. I can successfully change them using the "tuned-adm" command but reboot always reverts to the previous working profile and logs at /var/log/tuned directory show various issues such as "unknown profile" even when setting to a preset good profile, and "FATAL: Module cpufreq_conservative is builtin"
    - tuned is a new change starting in Fedora 41 so I am assuming this is a bug as I've found various hints around the internet of other people having issues with it. For this reason I've just removed automating the power profiles for now.

- Leaving a Smart Card in the reader causes performance issues with the browser and OpenSC. The issue appears to have gotten slightly better in Fedora 41 but still exists.