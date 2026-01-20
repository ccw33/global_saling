---
name: git-worktrees
description: "Git worktrees management for parallel development with Claude Code. Use when Claude needs to: (1) Create multiple isolated worktrees for parallel feature development, (2) Manage and organize concurrent development environments, (3) Clean up completed worktrees after merging, (4) Setup development environments with automatic configuration, (5) Work on multiple branches simultaneously without context switching, (6) Handle urgent bug fixes while preserving ongoing work, (7) Review multiple pull requests in isolation"
---

# Git Worktrees

Enable parallel development by creating multiple isolated working trees for the same repository, each with its own branch, file system, and Claude Code context.

## Overview

Git worktrees allow you to check out multiple branches simultaneously into different directories, sharing the same Git repository data but maintaining separate working files. This is especially powerful with Claude Code, enabling multiple AI agents to work on different features in parallel without context switching conflicts.

**Key Benefits:**
- No context switching between features
- Isolated development environments
- Parallel Claude Code sessions
- Seamless urgent bug fixes
- Independent testing on different ports

## Quick Start

Create a worktree for a new feature:

```bash
# Using the script (recommended)
python3 .claude/skills/git-worktrees/scripts/create_worktree.py feature/new-feature

# Or use git directly
git worktree add -b feature/new-feature ../project-new-feature
```

List all worktrees:

```bash
python3 .claude/skills/git-worktrees/scripts/list_worktrees.py -v
```

Clean up after merging:

```bash
python3 .claude/skills/git-worktrees/scripts/cleanup_worktree.py --all-merged
```

## Core Workflows

### Creating Worktrees

When the user requests creating a new worktree:

1. **Determine branch name and type**
   - Ask for branch name if not provided
   - Identify type: feature/bugfix/hotfix/refactor
   - Use proper naming: `feature/feature-name`, `bugfix/description`, etc.

2. **Create the worktree**
   ```bash
   python3 scripts/create_worktree.py <branch-name>
   ```
   The script automatically:
   - Creates worktree at `../project-<branch-name>`
   - Copies environment files (.env.local, .envrc)
   - Detects project type (Node.js, Python)
   - Provides setup instructions

3. **Setup development environment**
   - Install dependencies: `npm install` or `pip install -r requirements.txt`
   - Run `direnv allow` if using .envrc
   - Run `mise trust` if using .tool-versions
   - Configure unique dev server port (3001, 3002, 3003...)

4. **Start Claude Code in the worktree**
   - Open new terminal tab
   - Navigate to worktree: `cd ../project-<branch-name>`
   - Start Claude: `claude`

**Example user requests:**
- "Create a worktree for the search feature"
- "I need to work on dark mode and search simultaneously"
- "Set up parallel development for these three features"

### Parallel Development

When working on multiple features simultaneously:

1. **Create separate worktree for each feature**
   ```bash
   python3 scripts/create_worktree.py feature/dark-mode
   python3 scripts/create_worktree.py feature/search
   python3 scripts/create_worktree.py feature/filters
   ```

2. **Start Claude Code in each worktree**
   - Use separate terminal tabs/tmux sessions
   - Each session has isolated context
   - No file conflicts or context mixing

3. **Assign unique ports to each worktree**
   - Main project: 3000
   - Feature A: 3001
   - Feature B: 3002
   - Bug fix: 3003

4. **Test each feature independently**
   - Start dev servers in parallel
   - Test at localhost:3001, localhost:3002, etc.

**Example user requests:**
- "I want to develop dark mode, search, and filters in parallel"
- "Set up three worktrees for simultaneous feature development"
- "Help me work on multiple features at once"

### Urgent Bug Fixes

When urgent bug fix is needed during ongoing work:

1. **Assess current state**
   - Check if current worktree has uncommitted changes
   - Don't commit unfinished work

2. **Create emergency worktree**
   ```bash
   python3 scripts/create_worktree.py hotfix/critical-bug
   ```

3. **Fix and test the bug**
   - Work in isolation from ongoing changes
   - Test on different port (3100+)
   - Deploy hotfix

4. **Return to original work**
   - Original worktree untouched
   - Resume where you left off

**Example user requests:**
- "I need to fix a critical production bug but I'm in the middle of refactoring"
- "Emergency bug fix needed, don't touch my current work"
- "Create a hotfix branch while preserving my uncommitted changes"

### Cleaning Up Worktrees

When work is complete and branches are merged:

1. **List all worktrees**
   ```bash
   python3 scripts/list_worktrees.py -v
   ```

2. **Identify merged branches**
   ```bash
   git branch --merged main
   ```

3. **Cleanup specific worktree**
   ```bash
   python3 scripts/cleanup_worktree.py ../project-feature-x --branch feature/x
   ```

4. **Cleanup all merged worktrees**
   ```bash
   python3 scripts/cleanup_worktree.py --all-merged
   ```

5. **Prune stale references**
   ```bash
   git worktree prune
   ```

**Example user requests:**
- "Clean up the dark mode worktree, it's been merged"
- "Remove all merged worktrees"
- "These features are done, cleanup the worktrees"

### Code Review

When reviewing multiple pull requests:

1. **Create worktree for each PR**
   ```bash
   git worktree add ../project-pr-123 origin/pr/123
   git worktree add ../project-pr-124 origin/pr/124
   ```

2. **Test each PR in isolation**
   - Different ports for each PR (3201, 3202...)
   - No context mixing between reviews

3. **Leave feedback and approve**
   - Use `gh pr review` or browser
   - Test thoroughly before approval

4. **Cleanup after review**
   - Remove PR worktrees
   - Prune references

**Example user requests:**
- "I need to review PRs #123, #124, and #125"
- "Create worktrees to test these PRs locally"
- "Set up isolated environments for PR review"

## Scripts Reference

### create_worktree.py

Creates a new git worktree with environment setup.

**Usage:**
```bash
python3 scripts/create_worktree.py <branch-name> [options]
```

**Options:**
- `--base-dir`: Base directory for worktree (default: ../)
- `--project-name`: Project name (auto-detected if not provided)
- `--commit-ish`: Starting commit/branch (default: HEAD)

**What it does:**
- Creates worktree at `../project-<branch-name>`
- Copies .env.local, .envrc, and other environment files
- Detects project type (Node.js, Python, etc.)
- Provides setup instructions for dependencies

**Example:**
```bash
python3 scripts/create_worktree.py feature/dark-mode --base-dir ..
```

### cleanup_worktree.py

Removes worktrees and optionally deletes branches.

**Usage:**
```bash
python3 scripts/cleanup_worktree.py <worktree-path> [options]
python3 scripts/cleanup_worktree.py --all-merged [options]
```

**Options:**
- `--branch <name>`: Branch name to delete after removing worktree
- `--all-merged`: Cleanup all worktrees for merged branches
- `--merged-into <branch>`: Branch to check merges against (default: main)
- `--force`: Force removal even if worktree has uncommitted changes
- `--no-delete-branch`: Don't delete the branch after removing worktree

**What it does:**
- Verifies worktree is clean (unless --force)
- Removes worktree using `git worktree remove`
- Deletes local branch (if requested)
- Verifies cleanup completed

**Examples:**
```bash
# Cleanup specific worktree
python3 scripts/cleanup_worktree.py ../project-feature-x --branch feature/x

# Cleanup all merged worktrees
python3 scripts/cleanup_worktree.py --all-merged

# Force cleanup dirty worktree
python3 scripts/cleanup_worktree.py ../project-feature-x --force
```

### list_worktrees.py

Lists all worktrees with detailed information.

**Usage:**
```bash
python3 scripts/list_worktrees.py [options]
```

**Options:**
- `-v, --verbose`: Show detailed information including status
- `-t, --table`: Show output as a compact table
- `--json`: Output in JSON format

**What it does:**
- Lists all worktrees with paths and branches
- Shows worktree status (clean/dirty)
- Displays current commit information
- Formats output for readability

**Examples:**
```bash
# Verbose list
python3 scripts/list_worktrees.py -v

# Table format
python3 scripts/list_worktrees.py -t

# JSON output
python3 scripts/list_worktrees.py --json
```

## Best Practices

### Naming Conventions

- Branches: `feature/name`, `bugfix/description`, `hotfix/critical-issue`
- Worktrees: `../project-feature-name`, `../project-bugfix-description`

### Port Allocation

- Main: 3000
- Features: 3001-3099
- Bug fixes: 3100-3199
- Hot fixes: 3200-3299
- PR review: 3300-3399

### Environment Setup

Always copy these files:
- `.env.local` - Local environment variables
- `.envrc` - direnv configuration
- `.tool-versions` - mise tool versions

### Cleanup Habits

- Clean up worktrees promptly after merging
- Run `git worktree prune` regularly
- Use `--all-merged` for batch cleanup
- Don't leave stale worktrees for weeks

## Common Issues

**"branch is already checked out"**
- Branch is already in another worktree
- Use `git worktree list` to find it
- Either use existing worktree or create new branch

**"cannot remove worktree: has uncommitted changes"**
- Commit or stash changes first
- Or use `--force` flag with cleanup script

**Worktree directory deleted but git still references it**
- Run `git worktree prune` to clean up
- Or run `git worktree repair` to fix metadata

For detailed troubleshooting, see [references/troubleshooting.md](references/troubleshooting.md).

## Advanced Scenarios

### Experimenting with Multiple Approaches

Create parallel worktrees to test different implementations:

```bash
python3 scripts/create_worktree.py experiment/approach-a
python3 scripts/create_worktree.py experiment/approach-b
python3 scripts/create_worktree.py experiment/approach-c
```

Test and compare, then keep the best approach.

### Long-Lived Feature Branches

For features that take weeks or months:

```bash
python3 scripts/create_worktree.py feature/new-api
```

Keep worktree for entire development cycle, regularly merge main:

```bash
cd ../project-feature-new-api
git merge main
```

### Release Management

Prepare releases in isolation:

```bash
python3 scripts/create_worktree.py release/v1.2.0
```

Finalize release notes, run tests, tag release, then cleanup.

## Resources

### scripts/

- **create_worktree.py**: Create worktree with automatic environment setup
- **cleanup_worktree.py**: Remove worktrees and clean up branches
- **list_worktrees.py**: List all worktrees with detailed information

### references/

- **[best-practices.md](references/best-practices.md)**: Comprehensive best practices guide including naming conventions, directory organization, port allocation, and environment configuration
- **[troubleshooting.md](references/troubleshooting.md)**: Common issues, error messages, recovery procedures, and platform-specific problems
- **[workflows.md](references/workflows.md)**: Detailed workflows for parallel development, emergency fixes, code review, and maintenance

Load these reference files when needed for detailed guidance on specific topics.

## Integration with Claude Code

Git worktrees excel with Claude Code because:

1. **Isolated Context**: Each Claude Code session in a worktree has completely isolated context - no mixing of conversations or file references
2. **Parallel Sessions**: Run multiple Claude Code instances simultaneously, each working on a different feature
3. **No Context Switching**: Never need to stashing or commit unfinished work to switch tasks
4. **Independent Testing**: Test each feature on different ports without conflicts

**Recommended workflow:**

1. Create worktree for feature
2. Open new terminal tab
3. `cd` to worktree
4. Start `claude`
5. Work with focused context
6. Test in isolation
7. Commit and push
8. Cleanup after merge
