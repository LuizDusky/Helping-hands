# GitFlow workflow

Version control starts with the existing SPA baseline; earlier implementation work has no Git history.

- `main`: release snapshots. The baseline and v1.0.0 are recorded here.
- `develop`: integration branch for ongoing work; the default working branch locally.
- `feature/<name>`: created from `develop`, used for a focused change, and merged back with `--no-ff`. `feature/gitflow-documentation` records the workflow documentation.
- `release/<version>`: created from `develop` to prepare a release, then merged into `main` and back into `develop`. `release/1.0.0` prepares the first versioned delivery.
- `hotfix/<name>`: when an urgent released defect occurs, create this branch from `main` and merge the fix into both `main` and `develop`. No hotfix was needed in this stage.

Completed feature and release branches are retained locally for review. No remote repository or publication is configured.
