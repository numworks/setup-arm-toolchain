const core = require('@actions/core');
const tc = require('@actions/tool-cache');
const path = require('path');

async function run() {
  try {
    // Change the three following constants when updating GCC version
    const downloadUrl = 'https://github.com/numworks/setup-arm-toolchain/releases/download/2020-q2/gcc-arm-none-eabi-9-2020-q2-update-x86_64-linux.tar.bz2';
    const versionTag = '2020.2.0'; // tool-cache expects this to follow semver.org
    const binPath = ['gcc-arm-none-eabi-9-2020-q2-update', 'bin']; // Path to the binary folder in the tarball

    const cacheKey = 'gcc-arm-none-eabi';
    let cachedGCCPath = tc.find(cacheKey, versionTag);
    if (cachedGCCPath) {
      core.info(`Using cached version ${cacheKey}`);
    } else {
      core.info(`Downloading version ${cacheKey} from ${downloadUrl}`);
      const downloadGCCTarPath = await tc.downloadTool(downloadUrl);
      core.info(`Extracting version ${cacheKey}`);
      const downloadGCCPath = await tc.extractTar(downloadGCCTarPath, null, 'xj');
      core.info(`Caching version ${cacheKey}`);
      cachedGCCPath = await tc.cacheDir(downloadGCCPath, cacheKey, versionTag);
    }
    core.addPath(path.join(cachedGCCPath, ...binPath));
  } catch (error) {
    core.setFailed(error.message);
  }
}

run()
