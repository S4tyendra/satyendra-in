# Local Development Guide

## Prerequisites

Before starting, make sure you have:

- Access: read access to `github.com/iiitkota/iiitkota.ac.in`.
- OS: WSL or Linux.
- Windows users must use WSL. Read the WSL setup guide at [wsl-installation](/docs/iiitkota/prerequisites/wsl-installation).
- GitHub: a valid account for forking the repository.

## 1. System Environment Setup

### Install Core Utilities

```sh
sudo apt update && sudo apt install curl unzip git -y
```

Why these are needed:

- `curl`: downloads the Bun installer.
- `unzip`: extracts compressed archives during installs.
- `git`: version control for the codebase.

### Install Bun Runtime

This project uses Bun instead of Node.js.

```sh
curl -fsSL https://bun.sh/install | bash
```

Post-installation:
Restart your terminal or reload your shell config so Bun is available.


```sh
source ~/.bashrc
# OR if you use Zsh:
# source ~/.zshrc
```

[Click here to know what shell you are using.](https://gemini.google.com/share/353a3ac180e1)

## 2. Repository Configuration

### Forking

1. Go to `https://github.com/iiitkota/iiitkota.ac.in/fork`.
2. Create a fork under your personal GitHub account.

### Cloning the Repository

```sh
# Create a dedicated directory
mkdir -p ~/Documents/IIIT && cd ~/Documents/IIIT

# Clone your fork
git clone https://github.com/<your github username>/iiitkota.ac.in.git --depth=1 --single-branch

# Enter the project directory
cd iiitkota.ac.in
```

Flags:

- `--depth=1`: shallow clone with recent history only.
- `--single-branch`: downloads only the default branch.

## 3. Development Workflow

### Install Dependencies

```sh
bun install
```

### Start the Development Server

```sh
bun run dev
```

The site will be available at `http://localhost:5173`.

### IDE Setup

VS Code:

```sh
code .
```

WebStorm:

```sh
webstorm . &
```

Note: the `&` runs WebStorm in the background.

## 4. Build and Deployment Checks

Before submitting a PR, verify the build.

### Quick Build Test (Vite)

```sh
bunx vite build
```

### Full Production Build

```sh
bun run build
```

Always run this step if you modified core config or added new pages.
