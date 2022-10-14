# Setup Arm toolchain

This is a GitHub action to setup an Arm GNU toolchain.

In actions.yml:

```
steps:
  - uses: numworks/setup-arm-toolchain@latest
```

## How to update this action

1. Create a new GitHub release, and name it after the Arm toolchain release (e.g. `2022-08`). You will need to create a new git tag, just give it the same name.
2. Attach all tarballs from Arm to this release (serves as a mirror for future GitHub action runs), and note their final URL
3. Update the first three constants in `index.js` to point to the URL you just noted
4. Remove your local `node_modules` directory and run `npm install`
5. Commit `index.js` and your local `node_modules` folder, and push to master
7. Update the newly created tag (e.g. `2022-08`) as well as the `latest` tag to point to this commit
