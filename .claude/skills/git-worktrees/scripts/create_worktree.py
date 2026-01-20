#!/usr/bin/env python3
"""
Create a new git worktree with environment setup.

This script creates a new git worktree, copies environment files,
and sets up the development environment.
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


def get_project_name():
    """Get the current project name from git remote or directory."""
    # Try to get from git remote
    result = run_command("git remote get-url origin", check=False)
    if result.returncode == 0:
        url = result.stdout.strip()
        # Extract project name from URL
        project_name = url.split('/')[-1].replace('.git', '')
        return project_name

    # Fallback to directory name
    return os.path.basename(os.getcwd())


def create_worktree(branch_name, base_dir=None, project_name=None, commit_ish=None):
    """
    Create a new git worktree.

    Args:
        branch_name: Name of the branch to create
        base_dir: Base directory for worktree (default: ../)
        project_name: Project name (auto-detected if not provided)
        commit_ish: Starting commit/branch (default: HEAD)

    Returns:
        dict: Information about the created worktree
    """
    # Detect project name if not provided
    if project_name is None:
        project_name = get_project_name()

    # Set base directory
    if base_dir is None:
        base_dir = ".."

    # Create worktree path
    worktree_path = os.path.join(base_dir, f"{project_name}-{branch_name.replace('/', '-')}")

    print(f"🌳 Creating worktree for branch: {branch_name}")
    print(f"   Path: {worktree_path}")

    # Build git worktree add command
    cmd = f"git worktree add -b {branch_name} {worktree_path}"
    if commit_ish:
        cmd += f" {commit_ish}"

    # Create the worktree
    result = run_command(cmd)
    if result.returncode == 0:
        print(f"✅ Worktree created successfully")
    else:
        print(f"❌ Failed to create worktree")
        sys.exit(1)

    # Copy environment files
    copy_environment_files(worktree_path)

    # Setup development environment
    setup_development_environment(worktree_path)

    # Return worktree info
    return {
        "path": os.path.abspath(worktree_path),
        "branch": branch_name,
        "project": project_name
    }


def copy_environment_files(worktree_path):
    """Copy environment configuration files to the new worktree."""
    print(f"\n📋 Copying environment files...")

    env_files = [".env.local", ".envrc", ".env"]
    copied = []

    for env_file in env_files:
        source = os.path.join(os.getcwd(), env_file)
        if os.path.exists(source):
            dest = os.path.join(worktree_path, env_file)
            run_command(f"cp {source} {dest}")
            copied.append(env_file)
            print(f"   ✓ Copied {env_file}")

    if not copied:
        print("   ℹ️  No environment files found to copy")


def setup_development_environment(worktree_path):
    """Setup development environment in the new worktree."""
    print(f"\n🔧 Setting up development environment...")

    # Check for package.json (Node.js)
    package_json = os.path.join(worktree_path, "package.json")
    if os.path.exists(package_json):
        print(f"   📦 Detected Node.js project")
        print(f"   ℹ️  Run 'cd {worktree_path} && npm install' to install dependencies")

    # Check for requirements.txt (Python)
    requirements_txt = os.path.join(worktree_path, "requirements.txt")
    if os.path.exists(requirements_txt):
        print(f"   📦 Detected Python project")
        print(f"   ℹ️  Run 'cd {worktree_path} && pip install -r requirements.txt' to install dependencies")

    # Check for .envrc (direnv)
    envrc = os.path.join(worktree_path, ".envrc")
    if os.path.exists(envrc):
        print(f"   🔐 Detected direnv configuration")
        print(f"   ℹ️  Run 'cd {worktree_path} && direnv allow' to enable direnv")

    # Check for .tool-versions (mise)
    tool_versions = os.path.join(worktree_path, ".tool-versions")
    if os.path.exists(tool_versions):
        print(f"   🛠️  Detected mise configuration")
        print(f"   ℹ️  Run 'cd {worktree_path} && mise trust' to trust the directory")


def main():
    """Main entry point."""
    parser = argparse.ArgumentParser(
        description="Create a new git worktree with environment setup"
    )
    parser.add_argument(
        "branch_name",
        help="Name of the branch to create (e.g., feature/new-feature)"
    )
    parser.add_argument(
        "--base-dir",
        default="..",
        help="Base directory for worktree (default: ../)"
    )
    parser.add_argument(
        "--project-name",
        help="Project name (auto-detected if not provided)"
    )
    parser.add_argument(
        "--commit-ish",
        help="Starting commit/branch (default: HEAD)"
    )

    args = parser.parse_args()

    # Verify we're in a git repository
    if not os.path.exists(".git"):
        print("❌ Error: Not in a git repository")
        sys.exit(1)

    # Create the worktree
    info = create_worktree(
        args.branch_name,
        base_dir=args.base_dir,
        project_name=args.project_name,
        commit_ish=args.commit-ish
    )

    # Print summary
    print(f"\n{'='*60}")
    print(f"✨ Worktree created successfully!")
    print(f"{'='*60}")
    print(f"Path:    {info['path']}")
    print(f"Branch:  {info['branch']}")
    print(f"Project: {info['project']}")
    print(f"\nNext steps:")
    print(f"  1. cd {info['path']}")
    print(f"  2. Install dependencies if needed")
    print(f"  3. Start your development server")
    print(f"  4. Open Claude Code: claude")
    print(f"{'='*60}")


if __name__ == "__main__":
    main()
