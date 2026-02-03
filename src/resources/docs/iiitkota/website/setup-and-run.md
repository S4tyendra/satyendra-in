TL;DR:

  * **OS:** WSL (Windows Subsystem for Linux) or Native Linux is mandatory.
  * **Tools:** Git, Curl, Unzip, Bun (Runtime).
  * **Process:** Fork -\> Clone -\> Install Deps -\> Run Dev Server.
  * **Constraint:** Don't use Windows CMD/PowerShell directly, use WSL.

-----

# Local Development Guide

## Prerequisites

Before starting, ensure you have the following ready:

  * **Access:** Read access to [github.com/iiitkota/iiitkota.ac.in](https://github.com/iiitkota/iiitkota.ac.in).
  * **OS:** A **WSL** or **Linux** environment.
      * *Windows Users:* You **must** use WSL (Windows Subsystem for Linux). Read the [WSL setup guide](/prerequisites/wsl) before proceeding.
  * **GitHub:** A valid GitHub account for forking the repository with access.

-----

## 1\. System Environment Setup

### Install Core Utilities

Open your terminal and install the essential command-line tools.

```sh
sudo apt update && sudo apt install curl unzip git -y
```

**Why do we need these?**

  * **`curl`**: Required to download the Bun installer script from the remote server.
  * **`unzip`**: Required to extract compressed archives during package installation.
  * **`git`**: The version control system used to manage the codebase and track changes.

### Install Bun Runtime

This project uses **Bun** instead of Node.js for significantly faster package installation and script execution.

```sh
curl -fsSL https://bun.sh/install | bash
```

**Post-Installation:**
After the script finishes, your shell needs to know where Bun is located. Restart your terminal or reload your configuration file manually:

```sh
source ~/.bashrc
# OR if you use Zsh:
# source ~/.zshrc
```

-----

## 2\. Repository Configuration

### Forking

1.  Navigate to [https://github.com/iiitkota/iiitkota.ac.in/fork](https://github.com/iiitkota/iiitkota.ac.in/fork).
2.  Create a fork under your personal GitHub account.

### Cloning the Repository

Set up a clean workspace and clone your specific fork.

```sh
# Create a dedicated directory
mkdir -p ~/Documents/IIIT && cd ~/Documents/IIIT

# Clone your fork
git clone https://github.com/<your github username>/iiitkota.ac.in.git --depth=1 --single-branch

# Enter the project directory
cd iiitkota.ac.in
```

**Understanding the flags:**

  * `--depth=1`: Performs a "shallow clone," downloading only the most recent commit history. This saves time and disk space.
  * `--single-branch`: Downloads only the default branch (usually `main`), ignoring other branches to speed up the process.

-----

## 3\. Development Workflow

### Install Dependencies

Fetch and install all project libraries defined in `package.json`.

```sh
bun install
```

### Start the Development Server

Launch the local server to view the website in real-time.

```sh
bun run dev
```

 - **URL:** The site will be available at [http://localhost:5173](https://www.google.com/search?q=http://localhost:5173).


### IDE Setup

Open the project in your code editor of choice.

**VS Code:**

```sh
code .
```

**WebStorm:**

```sh
webstorm . &
```

*Note: The `&` symbol runs WebStorm in the background, freeing up your terminal for other commands.*

-----

## 4\. Build & Deployment Checks

Before submitting a Pull Request (PR), you must verify that your changes do not break the build.

### Quick Build Test (Vite)

Run this to check for syntax errors or Vite-specific configuration issues. It compiles the code but doesn't generate the full static site structure.

```sh
bunx vite build
```

### Full Production Build

Run this to simulate the exact process used in production. This generates the sitemap, static HTML pages, and optimized assets.

```sh
bun run build
```

*Always run this step if you have modified core configurations or added new pages.*