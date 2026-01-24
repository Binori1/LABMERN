
>Basic Git command

```
git status - to check current status 
git init - to initialized empty git repository
git add <file name> - eg git add FundamentalOfGit.md - add file to staging
git add . - add all files/directories in current dir to staging.
git commit -m <"Commit message"> - commit a file 
git restore <file name> - to restore a deleted git file 
git checkout <file name> - to undo changes since last staging or commit
git checckout -b <branch name> - to create a new branch
git merge <branch name> - to merge branch into current branch
git push -to push the changes to remote repo
git remote add origin <github REPO URL> - Connecting local repo to remote repo
git push -u origin master  - do this only once - linking the master or local repo to master of remote repo
git pull - pull the changes from upstream
git clone <repo URL>
git remote -v - View your current remotes
git remote remove origin - remove the remote

```

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

>Difference between Git and github

```
Git is a version control software or system

Github is the cloud repo.
```