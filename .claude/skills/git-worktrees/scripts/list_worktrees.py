#!/usr/bin/env python3
"""
List all git worktrees with detailed information.

This script lists all worktrees and shows their branch, status,
and other useful information.
"""

import argparse
import os
import subprocess
import sys
from pathlib import Path


def run_command(cmd, check=True, capture_output=True):
    """Run a shell command and return the result."""
    try:
        result = subprocess.run(
            cmd,
            shell=True,
            check=check,
            capture_output=capture_output,
            text=True
        )
        return result
    except subprocess.CalledProcessError as e:
        print(f"❌ Command failed: {cmd}")
        print(f"Error: {e.stderr}")
        sys.exit(1)


def list_worktrees(verbose=False):
    """
    List all worktrees with detailed information.

    Args:
        verbose: Show detailed information

    Returns:
        list: List of worktree information dictionaries
    """
    # Get worktree list
    result = run_command("git worktree list --porcelain")
    worktrees = []

    current = {}
    for line in result.stdout.split('\n'):
        if line.startswith('worktree '):
            if current:
                worktrees.append(current)
            current = {'path': line.split(' ', 1)[1]}
        elif line.startswith('branch '):
            current['branch'] = line.split(' ', 1)[1]
        elif line.startswith('HEAD '):
            current['head'] = line.split(' ', 1)[1]
        elif line.startswith('detached'):
            current['detached'] = True

    if current:
        worktrees.append(current)

    # Add status information if verbose
    if verbose:
        for worktree in worktrees:
            path = worktree['path']
            # Check if worktree is clean
            status_result = run_command(
                f"cd {path} && git status --porcelain",
                check=False
            )
            worktree['dirty'] = bool(status_result.stdout.strip())

            # Get current commit message
            if not worktree.get('detached'):
                branch = worktree.get('branch', '').replace('refs/heads/', '')
                log_result = run_command(
                    f"git log -1 --pretty=format:%s {branch}",
                    check=False
                )
                if log_result.returncode == 0:
                    worktree['last_commit'] = log_result.stdout.strip()

    return worktrees


def format_worktree_name(worktree, index):
    """Format worktree name for display."""
    path = worktree['path']
    branch = worktree.get('branch', '').replace('refs/heads/', '')

    # Check if this is the main worktree
    is_main = os.path.abspath(path) == os.path.abspath(os.getcwd())

    if is_main:
        return f"🏠 {path} (main)"
    elif branch:
        return f"🌳 {path}"
    else:
        return f"🌳 {path} (detached)"


def print_worktree_list(worktrees, verbose=False):
    """Print worktree list in a formatted way."""
    if not worktrees:
        print("ℹ️  No worktrees found")
        return

    print(f"\n{'='*80}")
    print(f"Git Worktrees ({len(worktrees)} total)")
    print(f"{'='*80}\n")

    for i, worktree in enumerate(worktrees, 1):
        path = worktree['path']
        branch = worktree.get('branch', '').replace('refs/heads/', '')
        head = worktree.get('head', '')[:7]
        detached = worktree.get('detached', False)

        # Determine worktree type
        is_main = os.path.abspath(path) == os.path.abspath(os.getcwd())

        # Print header
        if is_main:
            print(f"🏠 [{i}] Main Worktree")
        else:
            print(f"🌳 [{i}] Linked Worktree")

        print(f"    Path:   {path}")

        if branch and not detached:
            print(f"    Branch: {branch}")
        elif detached:
            print(f"    HEAD:   {head} (detached)")

        # Show status if verbose
        if verbose:
            if worktree.get('dirty'):
                print(f"    Status: ⚠️  Uncommitted changes")
            else:
                print(f"    Status: ✅ Clean")

            if worktree.get('last_commit'):
                print(f"    Last:   {worktree['last_commit']}")

        print()

    print(f"{'='*80}")


def print_worktree_table(worktrees):
    """Print worktree list as a compact table."""
    if not worktrees:
        print("ℹ️  No worktrees found")
        return

    # Find maximum path length
    max_path = max(len(w['path']) for w in worktrees)

    print(f"\n{'Path':<{max_path}}  {'Branch':<30}  {'HEAD':<10}  {'Status'}")
    print(f"{'-'*max_path}  {'-'*30}  {'-'*10}  {'-'*10}")

    for worktree in worktrees:
        path = worktree['path']
        branch = worktree.get('branch', '').replace('refs/heads/', '')
        head = worktree.get('head', '')[:7]
        detached = worktree.get('detached', False)
        dirty = worktree.get('dirty', False)

        # Truncate path if too long
        if len(path) > max_path:
            path = '...' + path[-(max_path-3):]

        # Truncate branch if too long
        if len(branch) > 30:
            branch = branch[:27] + '...'

        # Determine status
        if detached:
            status = "detached"
        elif dirty:
            status = "dirty"
        else:
            status = "clean"

        print(f"{path:<{max_path}}  {branch:<30}  {head:<10}  {status}")

    print()


def main():
    """Main entry point."""
    parser = argparse.ArgumentParser(
        description="List all git worktrees with detailed information"
    )
    parser.add_argument(
        "-v", "--verbose",
        action="store_true",
        help="Show detailed information including status"
    )
    parser.add_argument(
        "-t", "--table",
        action="store_true",
        help="Show output as a compact table"
    )
    parser.add_argument(
        "--json",
        action="store_true",
        help="Output in JSON format"
    )

    args = parser.parse_args()

    # Verify we're in a git repository
    if not os.path.exists(".git"):
        print("❌ Error: Not in a git repository")
        sys.exit(1)

    # Get worktree list
    worktrees = list_worktrees(verbose=args.verbose)

    # Output results
    if args.json:
        import json
        print(json.dumps(worktrees, indent=2))
    elif args.table:
        print_worktree_table(worktrees)
    else:
        print_worktree_list(worktrees, verbose=args.verbose)


if __name__ == "__main__":
    main()
