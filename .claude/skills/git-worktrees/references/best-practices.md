# Git Worktrees Best Practices

This guide covers best practices for using git worktrees effectively with Claude Code.

## Table of Contents

1. [Naming Conventions](#naming-conventions)
2. [Directory Organization](#directory-organization)
3. [Port Allocation Strategy](#port-allocation-strategy)
4. [Environment Configuration](#environment-configuration)
5. [Parallel Development Workflows](#parallel-development-workflows)
6. [Cleanup and Maintenance](#cleanup-and-maintenance)
7. [Performance Considerations](#performance-considerations)

## Naming Conventions

### Branch Naming

Use consistent branch naming patterns:

- `feature/feature-name` - New features
- `bugfix/bug-description` - Bug fixes
- `hotfix/critical-issue` - Urgent production fixes
- `refactor/component-name` - Code refactoring
- `docs/documentation-update` - Documentation changes
- `test/test-improvement` - Test improvements

### Worktree Directory Naming

When creating worktrees, use descriptive names:

```
../project-feature-dark-mode
../project-bugfix-delete-button
../project-refactor-api-cleanup
```

**Pattern**: `{project-name}-{branch-name-with-slashes-replaced-by-dashes}`

This makes it easy to identify worktrees at a glance.

## Directory Organization

### Recommended Structure

```
~/projects/
├── my-project/              # Main worktree (main branch)
├── my-project-feature-a/    # Feature A worktree
├── my-project-feature-b/    # Feature B worktree
└── my-project-bugfix-x/     # Bug fix worktree
```

### Benefits

- All worktrees at the same level
- Easy to switch between projects
- Clear visual separation
- Simple to clean up

### What to Avoid

```
~/projects/my-project/
└── worktrees/               # ❌ Don't nest worktrees inside main project
    ├── feature-a/
    └── feature-b/
```

This can cause confusion and makes cleanup harder.

## Port Allocation Strategy

### Development Server Ports

Assign unique ports to each worktree to avoid conflicts:

| Worktree | Port | Use Case |
|----------|------|----------|
| Main project | 3000 | Primary development |
| Feature A | 3001 | Feature development |
| Feature B | 3002 | Feature development |
| Bug fix | 3003 | Bug testing |
| Hotfix | 3004 | Production fixes |

### Port Management Tips

1. **Document ports**: Keep a README in each worktree noting the port
2. **Use port ranges**: Assign specific ranges for different types (3000-3099 for features, 3100-3199 for bugfixes)
3. **Kill processes**: Always stop dev servers before cleaning up worktrees

### Starting Dev Servers

```bash
# Main worktree
npm run dev -- -p 3000

# Feature A worktree
cd ../my-project-feature-a
npm run dev -- -p 3001

# Feature B worktree
cd ../my-project-feature-b
npm run dev -- -p 3002
```

## Environment Configuration

### Essential Files to Copy

Always copy these files when creating worktrees:

1. **`.env.local`** - Local environment variables
2. **`.envrc`** - direnv configuration
3. **`.tool-versions`** - mise tool versions

### Automatic Setup

The `create_worktree.py` script automatically:
- Copies environment files
- Detects project type (Node.js, Python, etc.)
- Provides setup instructions

### Manual Setup Checklist

After creating a worktree:

- [ ] Copy `.env.local` or equivalent
- [ ] Run `npm install` / `pip install -r requirements.txt`
- [ ] Run `direnv allow` if using direnv
- [ ] Run `mise trust` if using mise
- [ ] Verify development server starts on assigned port

## Parallel Development Workflows

### Scenario 1: Multiple Features

```
1. Create worktree for Feature A
   git worktree add -b feature/a ../project-feature-a

2. Create worktree for Feature B
   git worktree add -b feature/b ../project-feature-b

3. Open separate terminal tabs for each worktree

4. Start Claude Code in each worktree
   cd ../project-feature-a && claude
   cd ../project-feature-b && claude

5. Work on features in parallel
```

### Scenario 2: Urgent Bug Fix

```
1. Current work is in progress in main worktree
2. Create temporary worktree for bug fix
   git worktree add -b hotfix/critical-bug ../project-hotfix

3. Fix bug in isolated environment
   cd ../project-hotfix
   # Fix and test

4. Commit, push, and create PR
5. Cleanup after merge
   git worktree remove ../project-hotfix
```

### Scenario 3: Code Review

```
1. Create worktree for each PR to review
   git worktree add -b pr/123 ../project-pr-123 origin/pr/123

2. Test each PR in isolation
3. Leave comments
4. Cleanup after review
```

## Cleanup and Maintenance

### When to Cleanup

Clean up worktrees when:
- Branch is merged to main
- PR is closed/merged
- Feature is cancelled
- Bug fix is deployed
- Code review is complete

### Cleanup Workflow

```bash
# Option 1: Cleanup specific worktree
python3 .claude/skills/git-worktrees/scripts/cleanup_worktree.py \
    ../project-feature-x \
    --branch feature/x

# Option 2: Cleanup all merged branches
python3 .claude/skills/git-worktrees/scripts/cleanup_worktree.py \
    --all-merged

# Option 3: Force cleanup (if worktree has changes)
python3 .claude/skills/git-worktrees/scripts/cleanup_worktree.py \
    ../project-feature-x \
    --branch feature/x \
    --force
```

### Regular Maintenance

Perform regular maintenance:

```bash
# List all worktrees
git worktree list

# Prune stale worktree information
git worktree prune

# Cleanup all merged worktrees
python3 .claude/skills/git-worktrees/scripts/cleanup_worktree.py --all-merged
```

## Performance Considerations

### Disk Space

Worktrees share the `.git` directory but have separate working directories. Each worktree typically uses:

- ~10-50 MB for small projects
- ~100-500 MB for medium projects
- ~1+ GB for large projects (node_modules, etc.)

### Optimization Tips

1. **Limit active worktrees**: Keep only 2-3 active at a time
2. **Clean up promptly**: Remove worktrees after merging
3. **Use `git worktree prune`**: Clean up stale references
4. **Monitor disk usage**: `du -sh ../project-*`

### Performance Impact

- **Git operations**: Slightly slower due to shared git database
- **Disk I/O**: Minimal impact on most systems
- **IDE performance**: May slow down with many worktrees open

### When to Use Alternatives

Consider alternatives when:
- Working with very large repositories (>5GB)
- Limited disk space
- Need completely isolated git histories

Alternatives:
- Git clones (full isolation, more disk space)
- Stashing (quick context switches)
- Feature flags (avoid branching)

## Common Pitfalls

### Don'ts

❌ Create worktrees inside the main project directory
❌ Use same port for multiple worktrees
❌ Forget to copy environment files
❌ Leave stale worktrees for too long
❌ Commit sensitive data in worktree-specific `.env` files

### Dos

✅ Use consistent naming conventions
✅ Document port assignments
✅ Clean up worktrees promptly
✅ Use scripts for automation
✅ Test in isolated environments

## Claude Code Integration

### Best Practices with Claude Code

1. **One worktree per Claude Code session**
   - Each session gets isolated context
   - No file conflicts
   - Clear separation of concerns

2. **Use descriptive terminal titles**
   ```bash
   # Set terminal tab title
   echo -ne "\033]0;Feature: Dark Mode\007"
   ```

3. **Document worktree purpose**
   - Create a `WORKTREE.md` file
   - Note the feature being developed
   - List any special instructions

4. **Coordinate across worktrees**
   - Wait for dependent features to merge
   - Communicate API changes
   - Share design decisions

5. **Review before merging**
   - Test all worktrees locally
   - Ensure no port conflicts
   - Verify environment configuration
