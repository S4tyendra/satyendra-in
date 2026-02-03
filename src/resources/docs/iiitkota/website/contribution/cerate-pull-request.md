TL;DR:

  * **Workflow:** Commit → Push to Fork → Open PR on GitHub → Request Review.
  * **Standard:** Use "Conventional Commits" (e.g., `feat:`, `fix:`).
  * **Automation:** GitHub Actions will generate a preview URL automatically.
  * **Credentials:** Preview site is password-protected (`iiitkota` / `******`).

-----

# 🚀 Submitting Your Contribution (Pull Request)

Once you have finished your changes locally, follow these steps to submit them for review.

## 1\. Commit and Push Changes

### Commit with Proper Standards

We follow **Conventional Commits**. Your commit message should be clear and descriptive.

  * `feat:` for new features (e.g., `feat: added hackathons page`)
  * `fix:` for bug fixes (e.g., `fix: corrected navbar alignment`)
  * `docs:` for documentation changes
  * `chore:` for maintenance (e.g., `chore: updated dependencies`)

<!-- end list -->

```bash
git add .
git commit -m "feat: added new hackathons page with responsive grid"
```

### Verify Remote & Push

Ensure you are pushing to **your fork** (`origin`), not the upstream repository.

Check your remotes:

```bash
git remote -v
# Output should look like:
# origin  https://github.com/<your-username>/iiitkota.ac.in.git (fetch)
# origin  https://github.com/<your-username>/iiitkota.ac.in.git (push)
```

Push your branch:

```bash
git push origin main
# Or if you are working on a specific branch:
# git push origin <your-branch-name>
```

-----

## 2\. Create Pull Request (PR)

1.  Go to your fork on GitHub: `https://github.com/<your-username>/iiitkota.ac.in`.
2.  You should see a banner saying **"This branch is ahead of iiitkota:main"**.
3.  Click the **Compare & pull request** button.

![Create pull request image](https://iiitkdocsinternalcontent.iiitkota.ac.in/image_MJ6UZ270.png)

### Fill PR Details

  * **Title:** Concise summary of changes (e.g., "Feat: Added Hackathons Section").
  * **Description:** Explain *what* you changed and *why*.
  * **Reviewers:** On the right sidebar, click **Reviewers** and select a senior maintainer (e.g., `@s4tyendra`).

Click **Create Pull Request**.

-----

## 3\. Automated Preview & Review

Once your PR is created, **GitHub Actions** will automatically trigger a build.

### 🤖 The Deploy Bot

  * Wait for the bot to comment on your PR.
  * It will provide a **Preview URL** (e.g., `https://hash-beta.iiitkota.ac.in`).
  * This allows maintainers to test your changes in a live environment without merging code.

### 🔐 Preview Access

The preview environment is protected to prevent public access to unfinished work.

  * **Username:** `iiitkota`
  * **Password:** *(Shared separately in the internal group, ask if you dont know it.)*

### Final Review

  * If the reviewer requests changes, make them locally, commit, and push again. The PR will update automatically.
  * Once approved, a maintainer will merge your code into the main repository.
