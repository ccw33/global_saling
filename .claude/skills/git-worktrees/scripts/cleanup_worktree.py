#!/usr/bin/env python3
"""
Cleanup git worktrees after merging.

This script removes worktrees and optionally deletes local branches
after they have been merged.
"""

import argparse
import os
import subprocess
import sys


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


def list_worktrees():
    """List all worktrees."""
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

    if current:
        worktrees.append(current)

    return worktrees


def cleanup_worktree(worktree_path, branch_name=None, delete_branch=True, force=False):
    """
    Cleanup a worktree.

    Args:
        worktree_path: Path to the worktree
        branch_name: Name of the branch (optional)
        delete_branch: Whether to delete the branch
        force: Force removal even if worktree is dirty
    """
    print(f"🧹 Cleaning up worktree: {worktree_path}")

    # Verify worktree exists
    if not os.path.exists(worktree_path):
        print(f"❌ Error: Worktree path does not exist: {worktree_path}")
        sys.exit(1)

    # Check if worktree is clean (unless force is True)
    if not force:
        # Check for uncommitted changes
        result = run_command(f"cd {worktree_path} && git status --porcelain", check=False)
        if result.stdout.strip():
            print(f"⚠️  Worktree has uncommitted changes:")
            print(result.stdout)
            print(f"\nUse --force to remove anyway")
            sys.exit(1)

    # Remove the worktree
    force_flag = "-f " if force else ""
    cmd = f"git worktree remove {force_flag}{worktree_path}"
    result = run_command(cmd, check=False)

    if result.returncode != 0:
        print(f"❌ Failed to remove worktree")
        sys.exit(1)

    print(f"✅ Worktree removed")

    # Delete the branch if requested
    if delete_branch and branch_name:
        # Don't delete main/master branch
        if branch_name in ['main', 'master']:
            print(f"ℹ️  Skipping deletion of {branch_name} branch")
            return

        print(f"🗑️  Deleting branch: {branch_name}")
        cmd = f"git branch -D {branch_name}"
        result = run_command(cmd, check=False)

        if result.returncode != 0:
            print(f"⚠️  Could not delete branch (may not exist locally)")
        else:
            print(f"✅ Branch deleted")


def cleanup_all_merged(merged_into="main", force=False):
    """Cleanup all worktrees for branches that have been merged."""
    worktrees = list_worktrees()

    print(f"🔍 Checking for branches merged into {merged_into}...")

    # Get list of merged branches
    result = run_command(f"git branch --merged {merged_into}")
    merged_branches = set()
    for line in result.stdout.split('\n'):
        branch = line.strip().replace('* ', '').replace(' ', '')
        if branch and branch not in ['main', 'master', merged_into]:
            merged_branches.add(branch)

    if not merged_branches:
        print(f"ℹ️  No merged branches found")
        return

    print(f"Found {len(merged_branches)} merged branches")

    # Cleanup merged worktrees
    cleaned = 0
    for worktree in worktrees:
        branch = worktree.get('branch', '').replace('refs/heads/', '')
        path = worktree.get('path')

        # Skip main worktree
        if not branch or branch in ['main', 'master']:
            continue

        if branch in merged_branches:
            print(f"\n🧹 Cleaning up merged branch: {branch}")
            cleanup_worktree(path, branch, delete_branch=True, force=force)
            cleaned += 1

    if cleaned == 0:
        print(f"ℹ️  No worktrees to cleanup")
    else:
        print(f"\n✅ Cleaned up {cleaned} worktree(s)")


def main():
    """Main entry point."""
    parser = argparse.ArgumentParser(
        description="Cleanup git worktrees after merging"
    )
    parser.add_argument(
        "worktree_path",
        nargs="?",
        help="Path to the worktree (use with --branch)"
    )
    parser.add_argument(
        "--branch",
        help="Branch name (to delete after removing worktree)"
    )
    parser.add_argument(
        "--all-merged",
        action="store_true",
        help="Cleanup all worktrees for merged branches"
    )
    parser.add_argument(
        "--merged-into",
        default="main",
        help="Branch to check merges against (default: main)"
    )
    parser.add_argument(
        "--force",
        action="store_true",
        help="Force removal even if worktree has uncommitted changes"
    )
    parser.add_argument(
        "--no-delete-branch",
        action="store_true",
        help="Don't delete the branch after removing worktree"
    )

    args = parser.parse_args()

    # Verify we're in a git repository
    if not os.path.exists(".git"):
        print("❌ Error: Not in a git repository")
        sys.exit(1)

    # Handle --all-merged mode
    if args.all_merged:
        cleanup_all_merged(merged_into=args.merged_into, force=args.force)
        return

    # Handle single worktree mode
    if not args.worktree_path:
        print("❌ Error: worktree_path required (unless using --all-merged)")
        parser.print_help()
        sys.exit(1)

    cleanup_worktree(
        args.worktree_path,
        branch_name=args.branch,
        delete_branch=not args.no_delete_branch,
        force=args.force
    )

    print(f"\n✨ Cleanup completed!")


if __name__ == "__main__":
    main()
