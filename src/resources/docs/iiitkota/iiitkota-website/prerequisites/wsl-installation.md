If you are already on native Linux, skip this guide. This is for Windows only.

Windows Subsystem for Linux (WSL) lets you run a Linux environment directly on Windows without a virtual machine or dual-boot.

## Prerequisites

You must be running Windows 10 version 2004 and higher (Build 19041 and higher) or Windows 11.

## Installation

### 1. Open PowerShell

Open PowerShell or Windows Command Prompt in administrator mode.

### 2. Run the Install Command

This command enables the required components, downloads the latest Linux kernel, sets WSL 2 as default, and installs Ubuntu.

```bash
wsl --install
```

### 3. Restart Your Machine

Restart your computer to complete the installation.

### 4. Set Up Linux Info

After reboot, continue setup and create a username and password for your Linux distribution.

## Troubleshooting

If you see help text instead of installing, WSL might already be installed.

- `wsl --list --online` to see available distros.
- `wsl --install -d <DistroName>` to install a specific distro.

## Official Documentation

[Official Microsoft Documentation](https://learn.microsoft.com/en-us/windows/wsl/install)
