# Functional notes
Ansible Role for Fedora Workstation.   

## Use
The best way to execute this role is to use the included setup.py script. You can pass optional parameters to the script to have Ansible configure your git.user and git.email settings, as well as change the hostname.  
It accepts both short and long options, which can be seen using the -h or --help options at the command-line.  

For example:  
```
./setup.py
python setup.py -u my_git_username -e my_git_email -n my_hostname
python setup.py --git-user my_git_username --git-email my_git_email --hostname my_hostname
```  

Note: the Ansible playbook will schedule a reboot 2 minutes after completion.    

# Technical notes

VS Code default settings: https://code.visualstudio.com/docs/getstarted/settings#_default-settings
VS Code privacy settings: https://code.visualstudio.com/docs/supporting/FAQ

## Recent changes
Fedora 39 implemented an ugly PS1 shell prompt: https://fedoraproject.org/wiki/Changes/Color_Bash_Prompt
Fixed by adding custom PS1 to user .bashrc file

The transition to GNOME 45 in Fedora 39 broke theme settings (usually found in Tweaks). More here: https://release.gnome.org/45/developers/
Legacy applications and applications that use the latest versions of GTK4 now have different settings in the gnome file. See gnome_settings.yml section for more details.

## install_packages.yml

### Package lists
From: https://docs.ansible.com/ansible/latest/collections/ansible/builtin/dnf_module.html  
"When used with a loop: each package will be processed individually, it is much more efficient to pass the list directly to the name option."

This makes using loop: or with_items: pretty bad due to the number of packages this role handles.

Ran into an issue when attempting to specify a series of package list variables to install like this:

    ansible.builtin.dnf:
      name: 
        - "{{ foo_packages }}"
        - "{{ bar_packages }}"
      state: latest

While attempting to process multiple lists like this, Ansible will end up parsing the first and last package in the list with the list delimiting bracket, which can be seen by running the playbook in verbose mode:  
```
    "No package ['darktable' available."  
    "No package 'google-chrome-stable'] available."
```  
Therefore all packages must be in a single variable list and passed to the name parameter on the same line.

### Multimedia
The "multimedia" package group install must be its own task due to the requirements of "install_weak_deps: False" and "allowerasing: True"
Fedora comes packages with free versions of some codecs but these need to be replaced by the nonfree versions, which causes a conflict during a normal install operation.

### Virtualization group
The ansible.builtin.dnf module does not currently support using the group install option "--with-optional" that is needed.
There's an open bug report but it appears to have no traction: https://github.com/ansible/ansible/issues/67187

## gnome_settings.yml

To kill Nautilus, Ansible does not have a kill module, so had to run this one in a non-idempotent way. Hence we must ignore_errors here.

A dconf update is necessary to load the new dconf settings. Even rebooting the system will not do this.

Reference for logind settings: https://www.freedesktop.org/software/systemd/man/logind.conf.html

GNOME Power Mode setting:  
GNOME recently started using the power-profiles-daemon, but there is no dconf setting or ansible module to manage this right now.  
Note: in a VM, "performance" is not an option, so this task simply gets skipped.

Dark mode theme:  
In 01-gnome-settings file, 'color-scheme' coordinates with the UI Settings --> Appearance --> Style option, which applications using GTK4 will obey.  
Applications still using GTK3 will obey the gtk-theme setting, which coordinates to Tweaks --> Appearance --> Legacy Applications setting.

## cleanup.yml
The builtin hostname module fails with error:  
```
    err=Hint: static hostname is already set, so the specified transient hostname will not be used
```  
So I used the non-idempotent hostnamectl command instead

The builtin reboot module fails with error and is discussed why it won't be fixed here:  
https://github.com/ansible/ansible/issues/57874  

So used command module here also