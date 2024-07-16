#!/usr/bin/python

import argparse
import subprocess
from pathlib import Path

def main():
    yaml_path = str(Path.cwd()) + "/fedora40-workstation.yml"

    # Initialize parser
    parser = argparse.ArgumentParser()

    # Add optional argument
    parser.add_argument("-u", "--git-user", help = "git config setting for user.name")
    parser.add_argument("-e", "--git-email", help = "git config setting for user.email")
    parser.add_argument("-n", "--hostname", help = "hostname to pass into hostnamectl")

    # Read arguments from command line
    args = parser.parse_args()

    # Make these two options tied together
    if args.git_user and args.git_email is None:
        parser.error("-u or --git-user requires -e or --git-email")

    if args.git_email and args.git_user is None:
        parser.error("-e or --git-email requires -u or --git-user")

    # Make sure Ansible is installed before trying to execute a playbook
    print("\nInstalling Ansible...\n")
    subprocess.run(["sudo", "dnf", "install", "ansible", "-y"])

    # Pass appropriate option variables to Ansible playbook
    if args.git_user is not None and args.hostname is not None:
        #print("execute playbook with all extra vars")
        print(f'\nCommand being executed is:\nansible-playbook {yaml_path} --extra-vars "git_user={args.git_user} git_email={args.git_email} system_hostname={args.hostname}" --ask-become-pass\n')
        subprocess.run(["ansible-playbook", f"{yaml_path}", "--extra-vars", f"git_user={args.git_user} git_email={args.git_email} system_hostname={args.hostname}", "--ask-become-pass"])

    elif args.git_user is not None and args.hostname is None:
        #print("execute playbook only with git extra vars")
        print(f'\nCommand being executed is:\nansible-playbook {yaml_path} --extra-vars "git_user={args.git_user} git_email={args.git_email}" --ask-become-pass\n')
        subprocess.run(["ansible-playbook", f"{yaml_path}", "--extra-vars", f"git_user={args.git_user} git_email={args.git_email}", "--ask-become-pass"])

    elif args.git_user is None and args.hostname is not None:
        #print("execute playbook only with hostname extra var")
        print(f'\nCommand being executed is:\nansible-playbook {yaml_path} --extra-vars "system_hostname={args.hostname}" --ask-become-pass\n')
        subprocess.run(["ansible-playbook", f"{yaml_path}", "--extra-vars", f"system_hostname={args.hostname}", "--ask-become-pass"])

    else:
        #print("execute playbook only with no extra vars (default)")
        print(f"\nCommand being executed is:\nansible-playbook {yaml_path} --ask-become-pass\n")
        subprocess.run(["ansible-playbook", f"{yaml_path}", "--ask-become-pass"])

if __name__ == "__main__":
    main()