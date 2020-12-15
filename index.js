const core = require('@actions/core');
const tc = require('@actions/tool-cache');
const path = require('path');

async function run() {
  try {
    const downloadUrl = "https://github.com/numworks/setup-arm-toolchain/releases/download/2020-q4-assets/gcc-arm-none-eabi-10-2020-q4-major-x86_64-linux.tar.bz2";
    const gccTarPath = await tc.downloadTool(downloadUrl);
    const gccPath = await tc.extractTar(gccTarPath, null, 'xj');
    const binPath = path.join(gccPath, 'gcc-arm-none-eabi-10-2020-q4-major', 'bin');
    core.addPath(binPath);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run()
