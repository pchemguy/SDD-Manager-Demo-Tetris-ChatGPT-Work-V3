/** Optional Linux Chromium recovery: extract npm-packaged assets without chown. */
import { mkdir, chmod, writeFile } from 'node:fs/promises';
import { createReadStream, createWriteStream } from 'node:fs';
import { createBrotliDecompress } from 'node:zlib';
import { pipeline } from 'node:stream/promises';
import { resolve } from 'node:path';
import { execFileSync } from 'node:child_process';
import tar from 'tar-fs';
if(process.platform !== 'linux' || process.arch !== 'x64') throw Error('Packaged fallback requires Linux x64; use playwright install on other platforms.');
const out=resolve('.cache/browser');await mkdir(out,{recursive:true});
for(const name of ['chromium','fonts.tar','swiftshader.tar']) {
 await pipeline(createReadStream(`node_modules/@sparticuz/chromium/bin/${name}.br`),createBrotliDecompress(),name.endsWith('.tar')?tar.extract(name==='fonts.tar'?out+'/fonts':out,{chown:false}):createWriteStream(out+'/chromium'));
}
await chmod(out+'/chromium',0o700);
// The hosted filesystem needs an explicit executable-mode operation.
execFileSync('chmod',['700',out+'/chromium']);
await writeFile(out+'/fonts/fonts.conf',`<?xml version="1.0"?><!DOCTYPE fontconfig SYSTEM "fonts.dtd"><fontconfig><dir>${out}/fonts/fonts</dir><cachedir>${out}/font-cache</cachedir></fontconfig>`);
console.log('Packaged Chromium ready at '+out+'/chromium; browser tests use SDD_PACKAGED_CHROMIUM=1.');
