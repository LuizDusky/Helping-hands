import {build} from 'esbuild';
import {minify} from 'html-minifier-terser';
import {readFile,writeFile,mkdir,rm,cp,stat} from 'node:fs/promises';
const scripts=['datas','templates','navegacao','armazenamento','eventos','app'];
const pages=['index.html','html/index.html','html/projects.html','html/registration.html'];
await rm('dist',{recursive:true,force:true});
await mkdir('dist/html',{recursive:true});
await mkdir('dist/css',{recursive:true});
await mkdir('dist/js',{recursive:true});
await cp('images','dist/images',{recursive:true});
await cp('js/vendor','dist/js/vendor',{recursive:true});
// Bundle application scripts in the same dependency order used in development.
await build({stdin:{contents:scripts.map(n=>`import './js/${n}.js';`).join('\n'),resolveDir:process.cwd()},bundle:true,format:'iife',platform:'browser',target:'es2022',minify:true,outfile:'dist/js/application.js'});
await build({entryPoints:['css/style.css'],minify:true,outfile:'dist/css/style.css'});
for(const page of pages){let html=await readFile(page,'utf8');
 if(page.startsWith('html/')) html=html.replace(/\s*<script src="\.\.\/js\/(?:datas|templates|navegacao|armazenamento|eventos|app)\.js" defer><\/script>/g,'').replace('</head>','<script src="../js/application.js" defer></script></head>');
 await writeFile('dist/'+page,await minify(html,{collapseWhitespace:true,removeComments:true}));
}
const groups={HTML:pages,CSS:['css/style.css'],JavaScript:scripts.map(n=>`js/${n}.js`)};
const report={};
for(const [type,files] of Object.entries(groups)){
 const before=(await Promise.all(files.map(async f=>(await stat(f)).size))).reduce((a,b)=>a+b,0);
 const output=type==='JavaScript'?['js/application.js']:files;
 const after=(await Promise.all(output.map(async f=>(await stat('dist/'+f)).size))).reduce((a,b)=>a+b,0);
 report[type]={before,after,reductionPercent:+((1-after/before)*100).toFixed(2)};
}
const before=Object.values(report).reduce((a,x)=>a+x.before,0),after=Object.values(report).reduce((a,x)=>a+x.after,0);
report.total={before,after,reductionPercent:+((1-after/before)*100).toFixed(2)};
await writeFile('dist/build-report.json',JSON.stringify(report,null,2));console.log(report);
