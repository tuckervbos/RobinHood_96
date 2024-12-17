### **GitHub Branch Management and Team Collaboration Commands**

In team collaboration, Git and GitHub provide powerful tools for managing code versions and branches. Below are commonly used Git commands and operations, focusing on creating branches and team collaboration.

---

### **1. Clone a Repository**
- Copy a remote repository to your local machine:
  ```bash
  git clone <repository-url>
  ```
  Example:
  ```bash
  git clone https://github.com/username/repo.git
  ```

---

### **2. View Branches**
- View the current branch:
  ```bash
  git branch
  ```
- View all local and remote branches:
  ```bash
  git branch -a
  ```

---

### **3. Create a Branch**
- Create a new branch (only locally):
  ```bash
  git branch <branch-name>
  ```
  Example:
  ```bash
  git branch feature/new-feature
  ```

- Switch to the new branch:
  ```bash
  git checkout <branch-name>
  ```
  Example:
  ```bash
  git checkout feature/new-feature
  ```

- Create and switch to a new branch simultaneously (recommended):
  ```bash
  git checkout -b <branch-name>
  ```
  Example:
  ```bash
  git checkout -b feature/new-feature
  ```

---

### **4. Push Branch to Remote Repository**
- Push the new branch to the remote repository:
  ```bash
  git push origin <branch-name>
  ```
  Example:
  ```bash
  git push origin feature/new-feature
  ```

---

### **5. Update a Branch**
- Pull the latest code from the remote repository:
  ```bash
  git pull origin <branch-name>
  ```
  Example:
  ```bash
  git pull origin main
  ```

- Merge another branch into the current branch:
  ```bash
  git merge <branch-name>
  ```
  Example:
  ```bash
  git merge main
  ```

---

### **6. Delete a Branch**
- Delete a local branch:
  ```bash
  git branch -d <branch-name>
  ```
  Example:
  ```bash
  git branch -d feature/old-feature
  ```

- Force delete a local branch (when it hasn’t been fully merged):
  ```bash
  git branch -D <branch-name>
  ```

- Delete a remote branch:
  ```bash
  git push origin --delete <branch-name>
  ```
  Example:
  ```bash
  git push origin --delete feature/old-feature
  ```

---

### **7. Create a Pull Request (PR)**
- **Via GitHub Website**:
  1. On the GitHub page, go to **Pull Requests**.
  2. Click **New Pull Request**.
  3. Select the branch to merge and the target branch.
  4. Add a description and submit the PR.

- **Using Command Line** (with GitHub CLI configured):
  ```bash
  gh pr create --base <target-branch> --head <source-branch>
  ```

---

### **8. Resolve Conflicts**
- When merging branches, conflicts may occur. Review the conflicting files and manually resolve them. Then mark the conflict as resolved:
  ```bash
  git add <file-name>
  ```

- Continue the merge:
  ```bash
  git merge --continue
  ```

---

### **9. Recommended Workflow**
1. **Create a New Branch**: Use a separate branch for each feature or bug fix.
   ```bash
   git checkout -b feature/new-feature
   ```

2. **Regularly Update the Main Branch**: Switch to the main branch and pull the latest code.
   ```bash
   git checkout main
   git pull origin main
   ```

3. **Merge the Main Branch into the Feature Branch**: Keep the feature branch in sync with the main branch.
   ```bash
   git checkout feature/new-feature
   git merge main
   ```

4. **Commit and Push Code**:
   ```bash
   git add .
   git commit -m "Completed new feature development"
   git push origin feature/new-feature
   ```

5. **Create a Pull Request (PR) and Request Code Review**.

---

### **10. Other Useful Commands**
- View commit history:
  ```bash
  git log
  ```

- Check the current status:
  ```bash
  git status
  ```

- Temporarily stash changes (save current work):
  ```bash
  git stash
  ```

- Restore stashed changes:
  ```bash
  git stash pop
  ```

---

### **Common Issues and Solutions**
1. **Branch Conflicts**: Resolve conflicts before pulling code. Use `git merge` or `git rebase` as needed.
2. **Missing Branch**: Ensure the branch is pushed to the remote repository. Recreate it with `git checkout -b`.

Effective branch management and adherence to collaboration practices significantly improve development efficiency. Teams are encouraged to standardize workflows and follow code review processes for smooth collaboration.