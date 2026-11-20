/* ===================== eigener PDF-Generator (ohne Bibliothek) ===================== */
const PDF=(()=>{
const WR='278 278 355 556 556 889 667 191 333 333 389 584 278 333 278 278 556 556 556 556 556 556 556 556 556 556 278 278 584 584 584 556 1015 667 667 722 722 667 611 778 722 278 500 667 556 833 722 778 667 778 722 667 611 722 667 944 667 667 611 278 278 278 469 556 333 556 556 500 556 556 278 556 556 222 222 500 222 833 556 556 556 556 333 500 278 556 500 722 500 500 500 334 260 334 584'.split(' ').map(Number);
const WB='278 333 474 556 556 889 722 238 333 333 389 584 278 333 278 278 556 556 556 556 556 556 556 556 556 556 333 333 584 584 584 611 975 722 722 722 722 667 611 778 722 278 556 722 611 833 722 778 667 778 722 667 611 722 667 944 667 667 611 333 278 333 584 556 333 556 611 556 611 556 333 611 611 278 278 556 278 889 611 611 611 611 389 556 333 611 556 778 556 556 500 389 280 389 584'.split(' ').map(Number);
const MAP={'₂':'2','₃':'3','≈':'ca.','→':'->','←':'<-','Δ':'Delta','–':'\u0096','—':'\u0097','„':'\u0084','“':'\u0093','”':'\u0094','‘':'\u0091','’':'\u0092','•':'\u0095','€':'\u0080','…':'\u0085','×':'\u00d7','·':'\u00b7','⬤':'','✓':''};
function enc(s){let o='';for(const ch of String(s)){if(MAP[ch]!==undefined){o+=MAP[ch];continue}const c=ch.codePointAt(0);if(c<256&&(c>=32||c===10))o+=ch;else if(c===9)o+=' ';else if(c>0x2000||c>255)o+=(c>=0x1F000||(c>=0x2600&&c<=0x27BF)||c===0xFE0F||c===0x200D)?'':'?'}return o}
function wch(c,b){const k=c.charCodeAt(0);if(k>=32&&k<=126)return(b?WB:WR)[k-32];if(k>=192&&k<=255){const base='AAAAAAACEEEEIIIIDNOOOOO*OUUUUYPsaaaaaaaceeeeiiiionooooo/ouuuuypy'[k-192];const kk=base.charCodeAt(0);return(kk>=32&&kk<=126)?(b?WB:WR)[kk-32]:556}return 556}
function tw(s,sz,b){let w=0;for(const c of s)w+=wch(c,b);return w*sz/1000}
function wrap(s,sz,b,maxw){const out=[];String(s).split('\n').forEach(par=>{const words=par.split(' ');let line='';words.forEach(wd=>{const t=line?line+' '+wd:wd;if(tw(t,sz,b)<=maxw||!line)line=t;else{out.push(line);line=wd}});out.push(line)});return out}
const esc=s=>s.replace(/\\/g,'\\\\').replace(/\(/g,'\\(').replace(/\)/g,'\\)').replace(/[\u0080-\u00ff]/g,c=>'\\'+c.charCodeAt(0).toString(8).padStart(3,'0'));
const f2=n=>(Math.round(n*100)/100).toString();
function rgb(h){return [1,3,5].map(i=>f2(parseInt(h.substr(i,2),16)/255)).join(' ')}
class Doc{constructor(){this.W=595.28;this.H=841.89;this.M=56;this.pages=[];this.imgs=[];this.newPage()}
 newPage(){this.cur=[];this.pages.push(this.cur);this.y=this.M+4}
 get cw(){return this.W-2*this.M}
 ensure(h){if(this.y+h>this.H-this.M-14)this.newPage()}
 raw(s){this.cur.push(s)}
 text(x,yTop,s,sz,b,col){this.raw(`BT ${rgb(col||'#000000')} rg /F${b?2:1} ${sz} Tf ${f2(x)} ${f2(this.H-yTop-sz*0.8)} Td (${esc(enc(s))}) Tj ET`)}
 rect(x,yTop,w,h,fill,stroke,lw){this.raw(`${lw||0.7} w ${fill?rgb(fill)+' rg ':''}${stroke?rgb(stroke)+' RG ':''}${f2(x)} ${f2(this.H-yTop-h)} ${f2(w)} ${f2(h)} re ${fill&&stroke?'B':fill?'f':'S'}`)}
 line(x1,y1,x2,y2,col,lw){this.raw(`${lw||0.7} w ${rgb(col||'#000000')} RG ${f2(x1)} ${f2(this.H-y1)} m ${f2(x2)} ${f2(this.H-y2)} l S`)}
 para(s,o){o=o||{};const sz=o.sz||12,b=o.b,lh=sz*1.35,x=o.x==null?this.M:o.x,mw=o.w||this.cw-(x-this.M);const lines=wrap(enc(s),sz,b,mw);lines.forEach(l=>{this.ensure(lh);this.text(x,this.y,l,sz,b,o.col);this.y+=lh});this.y+=o.after==null?4:o.after}
 h1(s){this.para(s,{sz:19,b:1,after:2,col:'#103746'});this.line(this.M,this.y,this.W-this.M,this.y,'#E6B729',2);this.y+=10}
 h2(s){this.ensure(46);this.y+=8;this.rect(this.M,this.y,this.cw,20,'#DCEBE7',null);this.rect(this.M,this.y,4,20,'#1E5155',null);this.text(this.M+11,this.y+4,enc(s),13,1,'#103746');this.y+=28}
 h3(s){this.ensure(30);this.para(s,{sz:12,b:1,after:2,col:'#1E5155'})}
 table(head,rows,cw){const sz=11,pad=4,n=head.length;const ws=cw?cw.map(f=>f*this.cw):head.map(()=>this.cw/n);const draw=(cells,b,fill)=>{const ls=cells.map((c,i)=>wrap(enc(c),sz,b,ws[i]-2*pad));const rh=Math.max(...ls.map(l=>l.length))*sz*1.3+2*pad;this.ensure(rh);let x=this.M;cells.forEach((c,i)=>{this.rect(x,this.y,ws[i],rh,fill,'#555555',0.6);ls[i].forEach((l,k)=>this.text(x+pad,this.y+pad+k*sz*1.3,l,sz,b));x+=ws[i]});this.y+=rh};draw(head,1,'#DCEBE7');rows.forEach(r=>draw(r.map(String),0,null));this.y+=8}
 image(im,maxw,maxh){let w=im.w,h=im.h;const s=Math.min(maxw/w,maxh/h,1.6);w*=s;h*=s;this.ensure(h+6);const id=this.imgs.push(im);this.raw(`q ${f2(w)} 0 0 ${f2(h)} ${f2(this.M)} ${f2(this.H-this.y-h)} cm /Im${id} Do Q`);this.raw(`0.6 w ${rgb('#999999')} RG ${f2(this.M)} ${f2(this.H-this.y-h)} ${f2(w)} ${f2(h)} re S`);this.y+=h+8}
 build(footer,raw){const n=this.pages.length;if(!raw)this.pages.forEach((p,i)=>{this.cur=p;this.line(this.M,this.H-this.M+14,this.W-this.M,this.H-this.M+14,'#999999',0.5);this.raw(`BT ${rgb('#000000')} rg /F1 9 Tf ${f2(this.M)} ${f2(this.M-26)} Td (${esc(enc(footer))}) Tj ET`);const pt='Seite '+(i+1)+' von '+n;this.raw(`BT ${rgb('#000000')} rg /F1 9 Tf ${f2(this.W-this.M-tw(pt,9,0))} ${f2(this.M-26)} Td (${esc(enc(pt))}) Tj ET`)});
  const objs=[];const add=s=>objs.push(s)-1+1;
  add('<< /Type /Catalog /Pages 2 0 R >>');add('PAGES');add('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>');add('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>');
  const imgIds=this.imgs.map(im=>add({dict:`<< /Type /XObject /Subtype /Image /Width ${im.w} /Height ${im.h} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${im.data.length} >>`,data:im.data}));
  const kids=[];this.pages.forEach(p=>{const c=p.join('\n');const cid=add({dict:`<< /Length ${c.length} >>`,data:c});const pid=add(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${f2(this.W)} ${f2(this.H)}] /Resources << /Font << /F1 3 0 R /F2 4 0 R >> /XObject << ${imgIds.map((id,i)=>`/Im${i+1} ${id} 0 R`).join(' ')} >> >> /Contents ${cid} 0 R >>`);kids.push(pid)});
  objs[1]=`<< /Type /Pages /Kids [${kids.map(k=>k+' 0 R').join(' ')}] /Count ${kids.length} >>`;
  let out='%PDF-1.4\n%\u00e2\u00e3\u00cf\u00d3\n';const offs=[];objs.forEach((o,i)=>{offs.push(out.length);out+=`${i+1} 0 obj\n`+(typeof o==='string'?o:o.dict+'\nstream\n'+o.data+'\nendstream')+'\nendobj\n'});
  const xr=out.length;out+=`xref\n0 ${objs.length+1}\n0000000000 65535 f \n`+offs.map(o=>String(o).padStart(10,'0')+' 00000 n \n').join('')+`trailer\n<< /Size ${objs.length+1} /Root 1 0 R >>\nstartxref\n${xr}\n%%EOF`;
  const u=new Uint8Array(out.length);for(let i=0;i<out.length;i++)u[i]=out.charCodeAt(i)&255;return new Blob([u],{type:'application/pdf'})}}
function toJpeg(drawFn,w,h,sc){const c=document.createElement('canvas');c.width=Math.round(w*sc);c.height=Math.round(h*sc);const g=c.getContext('2d');g.fillStyle='#fff';g.fillRect(0,0,c.width,c.height);return drawFn(g,c).then(()=>{const b=atob(c.toDataURL('image/jpeg',0.9).split(',')[1]);return{w:c.width,h:c.height,data:b}})}
function loadImg(src){return new Promise((res,rej)=>{const i=new Image();i.onload=()=>res(i);i.onerror=rej;i.src=src})}
function fromDataURL(u){return loadImg(u).then(im=>toJpeg(g=>{g.drawImage(im,0,0,g.canvas.width,g.canvas.height);return Promise.resolve()},im.naturalWidth,im.naturalHeight,1))}
function fromSVG(svg){const m=svg.match(/viewBox="0 0 (\d+) (\d+)"/);const w=m?+m[1]:900,h=m?+m[2]:560;svg=svg.replace(/width="100%"/,'').replace(/<svg /,`<svg width="${w}" height="${h}" `);const url=URL.createObjectURL(new Blob([svg],{type:'image/svg+xml'}));return loadImg(url).then(im=>toJpeg(g=>{g.drawImage(im,0,0,g.canvas.width,g.canvas.height);URL.revokeObjectURL(url);return Promise.resolve()},w,h,1.6))}
return{Doc,fromDataURL,fromSVG}})();
