# Setup Arm toolchain

This is a GitHub action to setup an Arm GNU toolchain.

In actions.yml:

```
steps:
  - uses: numworks/setup-arm-toolchain@2020-q2
```

## How to update this action

- Create a new branch from master, and name it after the Arm toochain release (e.g. `2020-q2`)
- Create a new GitHub release, and name it after the branch with an "assets" suffix (e.g. `2020-q2-assets`)
- Attach all tarballs from Arm to this release (serves as a mirror for future GitHub action runs), and note their final URL
- Update the first three constants in `index.js` to point to the right data
- Remove your local `node_modules` directory if any
- Run `npm install` and add the `node_modules` folder to the repository
- Commit and push said branch to GitHub. Voilà!
