import{execFileSync}from'node:child_process';
import { build } from 'esbuild';
import { readFile,writeFile,mkdir } from 'node:fs/promises';
const result=await build({entryPoints:['src/main.js'],bundle:true,minify:true,format:'iife',write:false});
const html=await readFile('src/shell.html','utf8');
await mkdir('releases',{recursive:true});
await writeFile('Luma.html',html.replace('<!--GAME-->',()=>`<script>${result.outputFiles[0].text.replace(/<\/script/gi,'<\\/script')}</script>`));
console.log('Built standalone Luma.html');

execFileSync('python3',['scripts/package-release.py'],{stdio:'inherit'});
