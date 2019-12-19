const core = require('@actions/core');
const tc = require('@actions/tool-cache');
const path = require('path');

async function run() {
  try {
    const downloadUrl = "https://github.com/numworks/setup-arm-toolchain/releases/download/2019-q4/gcc-arm-none-eabi-9-2019-q4-major-x86_64-linux.tar.bz2";
    const gccTarPath = await tc.downloadTool(downloadUrl);
    const gccPath = await tc.extractTar(gccTarPath);
    const binPath = path.join(gccPath, 'bin');
    core.addPath(binPath);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run()
