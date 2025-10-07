# Functional notes
Ansible Role for Fedora Workstation. Designed to be run immediately after installation.   

## Use
Execute this role using the included setup.py script.  
Optional parameters can be seen using the help function with -h or --help.  

Examples:  
```
./setup.py
python setup.py -u my_git_username -e my_git_email -n my_hostname
python setup.py --git-user my_git_username --git-email my_git_email --hostname my_hostname
```  

Note: A reboot is needed upon completion, but I have disabled the automated task for this so that you can review changes first if you wish.    

# Technical notes

## DisplayLink
DisplayLink is setup for docking stations that use it as a driver for the monitor.  
If SecureBoot is enabled in UEFI, the monitor will not work.  
Fix for this is here: https://github.com/displaylink-rpm/displaylink-rpm?tab=readme-ov-file#secure-boot-on-fedora

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

## cleanup.yml
The builtin hostname module fails with error:  
```
    err=Hint: static hostname is already set, so the specified transient hostname will not be used
```  
So I used the non-idempotent hostnamectl command instead

The builtin reboot module fails with error and is discussed why it won't be fixed here:  
https://github.com/ansible/ansible/issues/57874  

So used command module here also