:::alert{variant="success" title="Linux Users"}
If you are already running a native Linux OS, you can safely **skip this guide**. This is for the Windows crowd.
:::

Windows Subsystem for Linux (WSL) lets you run a Linux environment directly on Windows, unmodified, without the overhead of a traditional virtual machine or dual-boot setup.

## Prerequisites

You must be running **Windows 10** version 2004 and higher (Build 19041 and higher) or **Windows 11**.

## Installation

### 1. Open PowerShell

Open PowerShell or Windows Command Prompt in **administrator** mode by right-clicking and selecting "Run as administrator".

### 2. Run the Install Command

Enter the following command. This single command enables the required optional components, downloads the latest Linux kernel, sets WSL 2 as your default, and installs the Ubuntu distribution.

```bash
wsl --install
````

### 3\. Restart Your Machine

Restart your computer to complete the installation.

### 4\. Set Up Linux Info

Once your machine has finished rebooting, the installation will continue and you will be asked to create a username and password for your Linux distribution.

:::card{title="Troubleshooting" description="Common issues"}
If you see the help text instead of installing, you might already have WSL installed. Try running `wsl --list --online` to see available distros and `wsl --install -d <DistroName>` to install a specific one.
:::

::button[Official Microsoft Documentation]{variant="primary" href="https://learn.microsoft.com/en-us/windows/wsl/install" size="lg"}

