
>Basic Git command

1. `git status` - to check current status 
2. `git init` - to initialized empty git repository
3. `git add <file name>` - eg git add FundamentalOfGit.md - add file to staging
3.a `git add .` - add all files/directories in current dir to staging.
4. `git commit -m <"Commit message">` - commit a file 
5. `git restore <file name>` - to restore a deleted git file 
6. `git checkout <file name>` - to undo changes since last staging or commit
7. `git checckout -b <branch name>` - to create a new branch
8. `git merge <branch name>` - to merge branch into current branch
9. `git push` -to push the changes to remote repo
10. `git remote add origin <github REPO URL>` - Connecting local repo to remote repo
11. `git push -u origin master`  - do this only once - linking the master or local repo to master of remote repo
12. `git pull` - pull the changes from upstream
13. `git clone <repo URL>`
14. `git remote -v` - View your current remotes
15. `git remote remove origin` - remove the remote

>create a new repository on the command line
```
echo "# LABMERN" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/Binori1/LABMERN.git
git push -u origin main

```


>push an existing repository from the command line

```
git remote add origin https://github.com/Binori1/LABMERN.git
git branch -M main
git push -u origin main
```

