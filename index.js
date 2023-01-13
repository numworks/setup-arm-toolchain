const core = require('@actions/core');
const tc = require('@actions/tool-cache');
const path = require('path');

async function run() {
  try {
    // Change the three following constants when updating GCC version
    const downloadUrl = 'https://github.com/numworks/setup-arm-toolchain/releases/download/2022-12/arm-gnu-toolchain-12.2.rel1-x86_64-arm-none-eabi.tar.xz';
    const versionTag = '2022.12.22'; // tool-cache expects this to follow semver.org
    // CAUTION: semver syntax is *giant* pain in the butt. For example,
    // "2022.08.0" is not compliant because of a leading zero in "08". When
    // updating this value, you should check in a node shell with this command
    // > require("semver").valid("2022.8.0")
    // and make sure it returns a non-null value

    const cacheKey = 'gcc-arm-none-eabi';
    let cachedGCCPath = tc.find(cacheKey, versionTag);
    if (cachedGCCPath) {
      core.info(`Using cached version ${versionTag}`);
    } else {
      core.info(`Could not find cached version ${versionTag} in ${JSON.stringify(tc.findAllVersions(cacheKey))}`)
      core.info(`Downloading version ${versionTag} from ${downloadUrl}`);
      const downloadGCCTarPath = await tc.downloadTool(downloadUrl);
      core.info(`Extracting version ${versionTag}`);
      const downloadGCCPath = await tc.extractTar(downloadGCCTarPath, null, ['-x', '--xz', '--strip-components=1']);
      core.info(`Caching version ${versionTag}`);
      cachedGCCPath = await tc.cacheDir(downloadGCCPath, cacheKey, versionTag);
    }
    core.addPath(path.join(cachedGCCPath, 'bin'));
  } catch (error) {
    core.setFailed(error.message);
  }
}

run()
