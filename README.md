# fedora-workstation
Ansible role for Fedora Workstation

# Notes

## install_packages.yml

Package lists
----------------
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
    "No package ['darktable' available."
    "No package 'google-chrome-stable'] available."

Therefore all packages must be in a single variable list and passed to the name parameter on the same line.

### Multimedia
The "multimedia" package group install must be its own task due to the requirements of "install_weak_deps: False" and "allowerasing: True"
Fedora comes packages with free versions of some codecs but these need to be replaced by the nonfree versions, which causes a conflict during a normal install operation.

Removed the "sound-and-video" package group installation. Discovered that without --with-optional it actually does nothing.
Since I've been using it this way for years and never had an issue with multimedia, I obviously don't need it.

### Virtualization group
The ansible.builtin.dnf module does not currently support using the group install option "--with-optional" that is needed.
There's an open bug report but it appears to have no traction: https://github.com/ansible/ansible/issues/67187