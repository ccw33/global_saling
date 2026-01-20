# Git Worktrees Workflows

Detailed workflows for common scenarios using git worktrees with Claude Code.

## Table of Contents

1. [Parallel Feature Development](#parallel-feature-development)
2. [Emergency Bug Fix](#emergency-bug-fix)
3. [Code Review Workflow](#code-review-workflow)
4. [Cleanup and Maintenance](#cleanup-and-maintenance)
5. [Claude Code Integration](#claude-code-integration)

## Parallel Feature Development

### Scenario

You need to develop multiple features simultaneously without context switching.

### Workflow

#### Step 1: Prepare Main Project

```bash
# Start in main worktree
cd ~/projects/my-app

# Ensure main is up to date
git checkout main
git pull origin main

# Verify no uncommitted changes
git status
```

#### Step 2: Create Worktrees

```bash
# Option A: Use the create_worktree.py script
python3 .claude/skills/git-worktrees/scripts/create_worktree.py feature/dark-mode
python3 .claude/skills/git-worktrees/scripts/create_worktree.py feature/search
python3 .claude/skills/git-worktrees/scripts/create_worktree.py feature/filters

# Option B: Use git worktree directly
git worktree add -b feature/dark-mode ../my-app-dark-mode
git worktree add -b feature/search ../my-app-search
git worktree add -b feature/filters ../my-app-filters
```

#### Step 3: Setup Each Worktree

```bash
# Worktree 1: Dark Mode
cd ~/projects/my-app-dark-mode
npm install
# Configure port 3001

# Worktree 2: Search
cd ~/projects/my-app-search
npm install
# Configure port 3002

# Worktree 3: Filters
cd ~/projects/my-app-filters
npm install
# Configure port 3003
```

#### Step 4: Start Claude Code Sessions

Open multiple terminal tabs and start Claude Code in each:

```bash
# Terminal Tab 1
cd ~/projects/my-app-dark-mode
claude
# Prompt: "Add dark mode support with Tailwind CSS"

# Terminal Tab 2
cd ~/projects/my-app-search
claude
# Prompt: "Implement real-time search functionality"

# Terminal Tab 3
cd ~/projects/my-app-filters
claude
# Prompt: "Add category and price filters"
```

#### Step 5: Test Each Feature

```bash
# Terminal 1 - Test Dark Mode
cd ~/projects/my-app-dark-mode
npm run dev -- -p 3001
# Open http://localhost:3001

# Terminal 2 - Test Search
cd ~/projects/my-app-search
npm run dev -- -p 3002
# Open http://localhost:3002

# Terminal 3 - Test Filters
cd ~/projects/my-app-filters
npm run dev -- -p 3003
# Open http://localhost:3003
```

#### Step 6: Commit and Push

```bash
# Worktree 1
cd ~/projects/my-app-dark-mode
git add .
git commit -m "feat: add dark mode with theme toggle"
git push origin feature/dark-mode

# Worktree 2
cd ~/projects/my-app-search
git add .
git commit -m "feat: implement real-time search"
git push origin feature/search

# Worktree 3
cd ~/projects/my-app-filters
git add .
git commit -m "feat: add category and price filters"
git push origin feature/filters
```

#### Step 7: Create Pull Requests

```bash
# Use GitHub CLI or create PRs in browser
gh pr create --title "Add dark mode support" --base main

# Or visit: https://github.com/username/my-app/compare/feature/dark-mode
```

#### Step 8: Cleanup After Merge

```bash
# After PRs are merged, return to main project
cd ~/projects/my-app
git pull origin main

# Clean up all merged worktrees
python3 .claude/skills/git-worktrees/scripts/cleanup_worktree.py --all-merged
```

---

## Emergency Bug Fix

### Scenario

You're in the middle of refactoring when a critical bug is reported in production.

### Workflow

#### Step 1: Assess Current State

```bash
# Check current work
cd ~/projects/my-app
git status
# You have uncommitted refactoring changes
```

#### Step 2: Create Emergency Worktree

```bash
# Create worktree for hotfix
git worktree add -b hotfix/critical-bug ../my-app-hotfix

# Or use the script
python3 .claude/skills/git-worktrees/scripts/create_worktree.py hotfix/critical-bug
```

#### Step 3: Fix the Bug

```bash
cd ~/projects/my-app-hotfix

# Start Claude Code
claude
# Prompt: "Critical bug in production: [describe bug]. Fix and add tests."
```

#### Step 4: Test the Fix

```bash
# Install dependencies if needed
npm install

# Start dev server on different port
npm run dev -- -p 3100
# Open http://localhost:3100

# Run tests
npm test
```

#### Step 5: Deploy Hotfix

```bash
# Commit changes
git add .
git commit -m "hotfix: fix critical bug affecting production"

# Push and create PR
git push origin hotfix/critical-bug
gh pr create --title "Hotfix: Fix critical bug" --label priority,critical

# Request expedited review
gh pr merge 123 --merge --delete-branch
```

#### Step 6: Return to Original Work

```bash
# Your refactoring work is untouched
cd ~/projects/my-app
git status
# All your uncommitted changes are still there

# Resume refactoring
```

#### Step 7: Cleanup

```bash
# After hotfix is deployed
cd ~/projects/my-app

# Remove hotfix worktree
python3 .claude/skills/git-worktrees/scripts/cleanup_worktree.py \
    ../my-app-hotfix \
    --branch hotfix/critical-bug
```

---

## Code Review Workflow

### Scenario

You need to review multiple pull requests in isolation.

### Workflow

#### Step 1: List Open PRs

```bash
gh pr list
# Output:
# #123  Feature: Add dark mode        feature/dark-mode
# #124  Feature: Implement search     feature/search
# #125  Fix: Delete button bug        bugfix/delete-button
```

#### Step 2: Create Worktrees for Each PR

```bash
# PR #123
git worktree add ../my-app-pr-123 origin/pr/123

# PR #124
git worktree add ../my-app-pr-124 origin/pr/124

# PR #125
git worktree add ../my-app-pr-125 origin/pr/125
```

#### Step 3: Review Each PR

```bash
# Review PR #123
cd ~/projects/my-app-pr-123
npm install
npm run dev -- -p 3201
# Open http://localhost:3201 and test

# Review PR #124
cd ~/projects/my-app-pr-124
npm install
npm run dev -- -p 3202
# Open http://localhost:3202 and test

# Review PR #125
cd ~/projects/my-app-pr-125
npm install
npm run dev -- -p 3203
# Open http://localhost:3203 and test
```

#### Step 4: Leave Review Comments

```bash
# Use GitHub CLI
gh pr review 123 --comment --body "Looks good! Minor suggestion on line 42."

# Or review in browser
gh pr view 123 --web
```

#### Step 5: Approve and Request Changes

```bash
# Approve PR
gh pr review 123 --approve

# Request changes
gh pr review 124 --request-changes --body "Tests are failing, please fix."
```

#### Step 6: Cleanup After Review

```bash
# After all PRs are reviewed
cd ~/projects/my-app

# Remove all PR worktrees
git worktree remove ../my-app-pr-123
git worktree remove ../my-app-pr-124
git worktree remove ../my-app-pr-125
```

---

## Cleanup and Maintenance

### Scenario

Your project has accumulated many old worktrees.

### Workflow

#### Step 1: List All Worktrees

```bash
# Use the list script
python3 .claude/skills/git-worktrees/scripts/list_worktrees.py -v

# Or use git directly
git worktree list -v
```

#### Step 2: Identify Merged Branches

```bash
# Check which branches are merged
git branch --merged main

# Output:
#   feature/dark-mode
#   bugfix/delete-button
#   feature/search
```

#### Step 3: Cleanup Merged Worktrees

```bash
# Option A: Cleanup all merged automatically
python3 .claude/skills/git-worktrees/scripts/cleanup_worktree.py --all-merged

# Option B: Cleanup specific worktree
python3 .claude/skills/git-worktrees/scripts/cleanup_worktree.py \
    ../my-app-dark-mode \
    --branch feature/dark-mode
```

#### Step 4: Prune Stale References

```bash
# Clean up any stale worktree metadata
git worktree prune

# Verify
git worktree list
```

#### Step 5: Regular Maintenance Schedule

Set up a weekly maintenance routine:

```bash
#!/bin/bash
# maintenance.sh - Weekly worktree maintenance

echo "🧹 Starting worktree maintenance..."

# List all worktrees
git worktree list

# Prune stale references
git worktree prune

# Cleanup merged branches
python3 .claude/skills/git-worktrees/scripts/cleanup_worktree.py --all-merged

echo "✅ Maintenance complete!"
```

---

## Claude Code Integration

### Starting Claude Code in Worktrees

#### Method 1: Direct Terminal

```bash
cd ~/projects/my-app-feature
claude
```

#### Method 2: New Terminal Tab (macOS)

```bash
# Open new terminal tab and start Claude Code
osascript -e 'tell application "Terminal" to activate' \
          -e 'tell application "System Events" to keystroke "t" using command down' \
          -e 'tell application "Terminal" to do script "cd ~/projects/my-app-feature && claude" in selected tab of front window'
```

#### Method 3: Tmux Split

```bash
# Create new tmux window and start Claude Code
tmux new-window -n "feature" "cd ~/projects/my-app-feature && claude"
```

### Coordinating Multiple Claude Code Sessions

#### Session 1: Feature Development

```bash
cd ~/projects/my-app-dark-mode
claude
```

**Prompt**:
```
I'm working on the dark mode feature for this Next.js app.

Requirements:
1. Add dark mode toggle button in header
2. Use Tailwind CSS dark: prefix for styles
3. Persist theme preference in localStorage
4. Ensure all components support dark mode

Start by analyzing the current theme structure.
```

#### Session 2: Bug Fix

```bash
cd ~/projects/my-app-bugfix
claude
```

**Prompt**:
```
There's a bug with the delete button not working.

Steps to reproduce:
1. Open the app
2. Create a todo item
3. Click delete button
4. Nothing happens

Please:
1. Find the delete button code
2. Diagnose the issue
3. Fix the bug
4. Add a test to prevent regression
```

#### Session 3: Code Review

```bash
cd ~/projects/my-app-pr-123
claude
```

**Prompt**:
```
Review this pull request for the search feature.

Check for:
1. Code quality and best practices
2. Security vulnerabilities
3. Performance issues
4. Test coverage
5. Documentation

Provide specific feedback and suggestions.
```

### Context Isolation Benefits

Each Claude Code session has:
- **Isolated file system**: Changes don't affect other sessions
- **Separate git history**: Independent commits and branches
- **Unique context**: No conversation mixing
- **Dedicated ports**: No server conflicts

### Best Practices

1. **One Task Per Session**: Focus Claude Code on one task per worktree
2. **Clear Prompts**: Provide specific requirements for each session
3. **Document Progress**: Keep notes in each worktree
4. **Test Thoroughly**: Validate each feature independently
5. **Clean Up Regularly**: Remove completed worktrees promptly

---

## Advanced Workflows

### Experimenting with Multiple Approaches

```bash
# Try different implementations in parallel
git worktree add -b experiment/approach-a ../my-app-experiment-a
git worktree add -b experiment/approach-b ../my-app-experiment-b
git worktree add -b experiment/approach-c ../my-app-experiment-c

# Develop each approach
# Test performance
# Compare results
# Choose best approach
# Delete others
```

### Long-Lived Feature Branches

```bash
# For features that take weeks/months
git worktree add -b feature/new-api ../my-app-new-api

# Keep worktree for entire development cycle
# Regularly merge main into feature branch
cd ~/projects/my-app-new-api
git merge main
# Continue development
```

### Release Management

```bash
# Prepare release in isolation
git worktree add -b release/v1.2.0 ../my-app-release

# Finalize release notes
# Run full test suite
# Tag release
git tag -a v1.2.0 -m "Release v1.2.0"

# Push and cleanup
git push origin main --tags
git worktree remove ../my-app-release
```

---

## Quick Reference

### Essential Commands

```bash
# Create worktree
git worktree add -b branch-name ../worktree-path

# List worktrees
git worktree list

# Remove worktree
git worktree remove ../worktree-path

# Prune stale references
git worktree prune

# Move worktree
git worktree move ../old-path ../new-path
```

### Using the Scripts

```bash
# Create worktree with environment setup
python3 .claude/skills/git-worktrees/scripts/create_worktree.py feature/name

# List worktrees with details
python3 .claude/skills/git-worktrees/scripts/list_worktrees.py -v

# Cleanup merged worktrees
python3 .claude/skills/git-worktrees/scripts/cleanup_worktree.py --all-merged
```

### Claude Code Commands

```bash
# Start Claude Code
claude

# Start with plan mode
claude --permission-mode plan

# Continue previous session
claude --continue

# Start with specific model
claude --model opus
```
