# Git Worktrees Troubleshooting

Common issues and solutions when working with git worktrees.

## Table of Contents

1. [Common Errors](#common-errors)
2. [Worktree Limitations](#worktree-limitations)
3. [Recovery Procedures](#recovery-procedures)
4. [Performance Issues](#performance-issues)
5. [Platform-Specific Issues](#platform-specific-issues)

## Common Errors

### "worktree already exists"

**Error Message**:
```
fatal: '/path/to/worktree' already exists
```

**Cause**: Trying to create a worktree in a directory that already exists.

**Solutions**:

1. **Remove the existing directory** (if it's safe to do so):
   ```bash
   rm -rf /path/to/worktree
   git worktree add -b branch-name /path/to/worktree
   ```

2. **Use a different path**:
   ```bash
   git worktree add -b branch-name /path/to/new-worktree
   ```

3. **Force creation** (if directory is empty):
   ```bash
   git worktree add -f -b branch-name /path/to/worktree
   ```

---

### "branch is already checked out"

**Error Message**:
```
fatal: branch 'feature-name' is already checked out at '/path/to/worktree'
```

**Cause**: The branch is already checked out in another worktree.

**Solutions**:

1. **List worktrees to find the conflict**:
   ```bash
   git worktree list
   ```

2. **Use the existing worktree**:
   ```bash
   cd /path/to/existing-worktree
   ```

3. **Create a new branch instead**:
   ```bash
   git worktree add -b feature-name-variant /path/to/worktree
   ```

---

### "cannot remove worktree"

**Error Message**:
```
fatal: cannot remove worktree: '/path/to/worktree' has uncommitted changes
```

**Cause**: Worktree has uncommitted changes.

**Solutions**:

1. **Commit or stash changes**:
   ```bash
   cd /path/to/worktree
   git commit -am "Save work"
   # or
   git stash
   ```

2. **Force removal** (if you're sure):
   ```bash
   git worktree remove -f /path/to/worktree
   ```

3. **Use the cleanup script with force flag**:
   ```bash
   python3 .claude/skills/git-worktrees/scripts/cleanup_worktree.py \
       /path/to/worktree \
       --force
   ```

---

### "failed to stat worktree"

**Error Message**:
```
fatal: failed to stat '/path/to/worktree': No such file or directory
```

**Cause**: Worktree directory was deleted but git still references it.

**Solutions**:

1. **Prune stale worktrees**:
   ```bash
   git worktree prune
   ```

2. **Verify with list**:
   ```bash
   git worktree list
   ```

3. **Repair if necessary**:
   ```bash
   git worktree repair
   ```

---

### ".git file points to non-existent location"

**Error Message**:
```
fatal: '../.git/worktrees/xxx' does not exist
```

**Cause**: Worktree metadata is corrupted or out of sync.

**Solutions**:

1. **Repair worktrees**:
   ```bash
   git worktree repair
   ```

2. **Manual cleanup** (if repair doesn't work):
   ```bash
   # Remove the broken worktree reference
   rm -rf .git/worktrees/xxx

   # Prune to clean up
   git worktree prune
   ```

---

## Worktree Limitations

### Submodules

**Issue**: Worktrees with submodules have limitations:
- Cannot move worktrees with submodules using `git worktree move`
- Submodule updates may affect all worktrees

**Workarounds**:

1. **Update submodules in main worktree only**:
   ```bash
   cd main-project
   git submodule update --remote
   ```

2. **Manually move worktree** (if needed):
   ```bash
   mv /old/path /new/path
   git worktree repair
   ```

---

### Large Binary Files (Git LFS)

**Issue**: Git LFS files may be checked out differently in each worktree.

**Solutions**:

1. **Run `git lfs pull` in each worktree**:
   ```bash
   cd worktree-path
   git lfs pull
   ```

2. **Use shared LFS cache** (configured in `.gitconfig`):
   ```ini
   [lfs]
       sharedcache = true
   ```

---

### Performance with Many Worktrees

**Issue**: Having many worktrees (10+) can slow down git operations.

**Solutions**:

1. **Limit active worktrees to 2-3**
2. **Clean up old worktrees regularly**:
   ```bash
   python3 .claude/skills/git-worktrees/scripts/cleanup_worktree.py --all-merged
   ```
3. **Use `git worktree prune` frequently**

---

## Recovery Procedures

### Recovering from Manual Directory Deletion

If you manually deleted a worktree directory:

```bash
# 1. Prune stale references
git worktree prune

# 2. Verify cleanup
git worktree list

# 3. If branch still exists and needs cleanup
git branch -D branch-name
```

---

### Recovering After Accidentally Deleting .git/worktrees

If the `.git/worktrees` directory was deleted:

```bash
# 1. Recreate worktree metadata
git worktree repair

# 2. If repair doesn't work, manually recreate
# For each worktree:
cd /path/to/worktree
git worktree add --orphan temp-branch
git checkout original-branch
git branch -D temp-branch
```

---

### Moving Main Worktree

If you moved the main worktree directory:

```bash
# 1. Update worktree locations
git worktree repair /new/path/to/main

# 2. Verify
git worktree list

# 3. Prune old references
git worktree prune
```

---

### Detached HEAD State

If a worktree is in detached HEAD state:

```bash
# 1. Navigate to worktree
cd /path/to/worktree

# 2. Create or checkout branch
git checkout -b new-branch-name
# or
git checkout existing-branch

# 3. Verify
git status
git worktree list
```

---

## Performance Issues

### Slow Git Operations

**Symptoms**: Git commands are slow across all worktrees.

**Solutions**:

1. **Run `git gc` to garbage collect**:
   ```bash
   git gc --aggressive --prune=now
   ```

2. **Prune worktrees**:
   ```bash
   git worktree prune
   ```

3. **Check for large files**:
   ```bash
   du -sh .git
   ```

---

### High Disk Usage

**Symptoms**: Worktrees using excessive disk space.

**Solutions**:

1. **Check disk usage**:
   ```bash
   du -sh ../project-*
   ```

2. **Clean up node_modules/.venv**:
   ```bash
   rm -rf /path/to/worktree/node_modules
   # Reinstall if needed
   cd /path/to/worktree
   npm install
   ```

3. **Remove old worktrees**:
   ```bash
   python3 .claude/skills/git-worktrees/scripts/cleanup_worktree.py --all-merged
   ```

---

## Platform-Specific Issues

### Windows

#### Path Length Issues

**Issue**: Windows has a 260 character path limit.

**Solutions**:

1. **Use shorter paths**:
   ```bash
   git worktree add -b feature/x C:/proj/feat-x
   ```

2. **Enable long path support** (requires admin):
   - Registry: `HKLM\SYSTEM\CurrentControlSet\Control\FileSystem`
   - Key: `LongPathsEnabled` = 1

#### Symlink Issues

**Issue**: Git worktrees use `.git` files that act as symlinks.

**Solutions**:

1. **Enable Developer Mode** (Windows 10+):
   - Settings → Update & Security → For developers
   - Enable "Developer Mode"

2. **Use Git Bash** instead of Command Prompt

---

### macOS

#### Case Sensitivity

**Issue**: macOS filesystem is case-insensitive by default.

**Solution**: Be aware that `MyWorktree` and `myworktree` are the same.

#### File Locking

**Issue**: Files may be locked by applications (Xcode, etc.).

**Solution**: Close applications before removing worktrees.

---

### Linux

#### Permission Issues

**Issue**: Permission denied errors when creating worktrees.

**Solutions**:

1. **Check directory permissions**:
   ```bash
   ls -la /path/to/parent/dir
   ```

2. **Fix permissions**:
   ```bash
   chmod 755 /path/to/parent/dir
   ```

3. **Use sudo** (if necessary):
   ```bash
   sudo git worktree add -b branch /path/to/worktree
   ```

---

## Getting Help

If you encounter issues not covered here:

1. **Check Git documentation**:
   ```bash
   git worktree --help
   ```

2. **List worktrees for debugging**:
   ```bash
   git worktree list -v
   ```

3. **Check worktree metadata**:
   ```bash
   cat .git/worktrees/<name>/gitdir
   cat .git/worktrees/<name>/commondir
   ```

4. **Use verbose flag**:
   ```bash
   git worktree prune -v
   ```

5. **Report bugs**: https://github.com/git/git/issues

---

## Quick Reference Checklist

Before creating an issue, check:

- [ ] Ran `git worktree prune`
- [ ] Ran `git worktree repair`
- [ ] Verified with `git worktree list -v`
- [ ] Checked disk space
- [ ] Closed any applications using the worktree
- [ ] Verified directory permissions
- [ ] Checked for submodules/LFS
- [ ] Reviewed error message carefully
