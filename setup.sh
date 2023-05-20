#!/bin/bash

# Script must be executable and run as sudo
if [[ $(id -u) -ne 0 ]]; then
    echo -e "\nScript must be run as root! Exiting..."
    exit 1
fi

# add an option to set hostname

# https://www.baeldung.com/linux/bash-parse-command-line-arguments
VALID_ARGS=$(getopt -o u:e: --long git-username:,git-email: -- "$@")

eval set -- "$VALID_ARGS"
while [ : ]; do
  case "$1" in
    -u | --git-username)
        git_username=$2
        #echo "Processing 'u' option. Input argument is '$2'"
        #echo $git_username
        shift 2
        ;;
    -e | --git-email)
        git_email=$2
        #echo "Processing 'e' option. Input argument is '$2'"
        #echo $git_email
        shift 2
        ;;
    --) shift;
        break
        ;;
  esac
done

echo -e "\nInstalling Ansible...\n"
dnf install ansible -y

if [[ -z $git_username  ]] || [[ -z $git_email ]]; then
    echo -e "\n========== NOTICE =========="
    echo -e "One or both command-line options for git configuration are missing.\nSkipping git config settings."
    echo -e "\nCommand being executed is:\nansible-playbook $(pwd)/fedora38-workstation.yml --ask-become-pass\n"

    ansible-playbook \
        $(pwd)/fedora38-workstation.yml \
        --ask-become-pass
else
    echo -e "\nCommand being executed is:\nansible-playbook $(pwd)/fedora38-workstation.yml --extra-vars "git_email=$git_email git_username=$git_username" --ask-become-pass\n"

    ansible-playbook \
        $(pwd)/fedora38-workstation.yml \
        --extra-vars "git_email=$git_email git_username=$git_username" \
        --ask-become-pass
fi