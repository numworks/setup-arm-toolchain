const core = require('@actions/core');
const tc = require('@actions/tool-cache');
const path = require('path');

async function run() {
  try {
    // Change the three following constants when updating GCC version
    const downloadUrl = 'https://github.com/numworks/setup-arm-toolchain/releases/download/2022-08/arm-gnu-toolchain-11.3.rel1-x86_64-arm-none-eabi.tar.xz';
    const versionTag = '2022.08.0'; // tool-cache expects this to follow semver.org
    const binPath = ['arm-gnu-toolchain-11.3.rel1-x86_64-arm-none-eabi', 'bin']; // Path to the binary folder in the tarball

    const cacheKey = 'gcc-arm-none-eabi';
    let cachedGCCPath = tc.find(cacheKey, versionTag);
    if (cachedGCCPath) {
      core.info(`Using cached version ${versionTag}`);
    } else {
      core.info(`Could not find cached version ${versionTag} in ${JSON.stringify(tc.findAllVersions(cacheKey))}`)
      core.info(`Downloading version ${versionTag} from ${downloadUrl}`);
      const downloadGCCTarPath = await tc.downloadTool(downloadUrl);
      core.info(`Extracting version ${versionTag}`);
      const downloadGCCPath = await tc.extractTar(downloadGCCTarPath, null, 'xJ');
      core.info(`Caching version ${versionTag}`);
      cachedGCCPath = await tc.cacheDir(downloadGCCPath, cacheKey, versionTag);
    }
    core.addPath(path.join(cachedGCCPath, ...binPath));
  } catch (error) {
    core.setFailed(error.message);
  }
}

run()
