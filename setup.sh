#!/bin/bash
# Script must be executable and run as sudo

dnf install ansible -y

echo "ansible-playbook $(pwd)/fedora38-workstation.yml --ask-become-pass"
ansible-playbook \
    $(pwd)/fedora38-workstation.yml \
    --ask-become-pass