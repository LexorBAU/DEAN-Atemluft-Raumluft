/* ===================== WIDGETS: Skizzeneditor, Teilchenanimation, Stoppuhr, Stahlwolle ===================== */
const INK='#233';
/* ---- Geräteteile (gezeichnet entlang der x-Achse, Ursprung = Mitte) ---- */
const PARTS={
 ballon:{k:'mat.ballon',ports:{neck:[70,0,'big']},draw:()=>`<ellipse cx="-12" cy="0" rx="62" ry="44" fill="#f48fb1" stroke="#7a2d4b" stroke-width="3"/><path d="M40 -9 L62 -13 V13 L40 9Z" fill="#f48fb1" stroke="#7a2d4b" stroke-width="3"/><rect x="62" y="-17" width="8" height="34" rx="4" fill="#e0709a" stroke="#7a2d4b" stroke-width="3"/><ellipse cx="-30" cy="-16" rx="14" ry="8" fill="#fff" opacity=".35"/>`},
 spritze:{k:'mat.spritze',ports:{back:[-80,0,'big'],tip:[70,0,'luer']},draw:()=>`<rect x="-80" y="-16" width="124" height="32" rx="3" fill="#e8f3f8" fill-opacity=".85" stroke="${INK}" stroke-width="3"/><rect x="-86" y="-27" width="8" height="54" rx="3" fill="#dbe9f0" stroke="${INK}" stroke-width="3"/><path d="M44 -6 H70 V6 H44" fill="#e8f3f8" stroke="${INK}" stroke-width="3"/>${[-60,-40,-20,0,20].map(x=>`<path d="M${x} -16 v10" stroke="${INK}" stroke-width="2"/>`).join('')}`},
 hahn:{k:'mat.hahn',ports:{p1:[-32,0,'luer'],p2:[32,0,'luer'],p3:[0,-32,'luer']},draw:()=>`<rect x="-32" y="-5" width="64" height="10" rx="2" fill="#eef5f8" stroke="${INK}" stroke-width="3"/><rect x="-5" y="-32" width="10" height="24" rx="2" fill="#eef5f8" stroke="${INK}" stroke-width="3"/><circle cx="0" cy="0" r="13" fill="#fff" stroke="${INK}" stroke-width="3"/><path d="M-20 0 H20 M0 0 V-20" stroke="#7a1010" stroke-width="10" stroke-linecap="round"/><path d="M-20 0 H20 M0 0 V-20" stroke="#d8262a" stroke-width="6" stroke-linecap="round"/>`},
 schlauch:{k:'mat.schlauch',ports:{a:[-32,0,'tube'],b:[32,0,'tube']},draw:()=>`<rect x="-32" y="-12" width="64" height="24" rx="8" fill="#eaf0f2" stroke="${INK}" stroke-width="3"/><path d="M-20 -12 v24 M20 -12 v24" stroke="${INK}" stroke-width="2" opacity=".5"/>`},
 glasrohr:{k:'mat.glasrohr',ports:{top:[-114,0,'glass']},draw:()=>`<rect x="-114" y="-9" width="228" height="18" rx="3" fill="#dff3fb" fill-opacity=".8" stroke="${INK}" stroke-width="3"/><path d="M-110 -3 H100" stroke="#fff" stroke-width="3" opacity=".7"/>`},
 rg:{k:'mat.rg',ports:{hold:[0,0,'hold']},draw:(it)=>`<path d="M-20 -70 V45 A20 20 0 0 0 20 45 V-70" fill="#f4fbff" fill-opacity=".5" stroke="${INK}" stroke-width="3"/>${it.liquid==='kalk'?`<path d="M-18 10 V45 A18 18 0 0 0 18 45 V10Z" fill="#a9d9ee" fill-opacity=".8"/><path d="M-18 10 H18" stroke="#3a8fb7" stroke-width="2"/>`:''}<path d="M-24 -70 H24" stroke="${INK}" stroke-width="4"/>`},
 staender:{k:'mat.staender',ports:{slot:[0,-40,'slot']},draw:()=>`<rect x="-80" y="-24" width="62" height="10" fill="#c99a62" stroke="${INK}" stroke-width="2.5"/><rect x="18" y="-24" width="62" height="10" fill="#c99a62" stroke="${INK}" stroke-width="2.5"/><rect x="-80" y="38" width="160" height="10" fill="#c99a62" stroke="${INK}" stroke-width="2.5"/><rect x="-80" y="-24" width="9" height="72" fill="#b78650" stroke="${INK}" stroke-width="2.5"/><rect x="71" y="-24" width="9" height="72" fill="#b78650" stroke="${INK}" stroke-width="2.5"/>`},
 becher:{k:'mat.becher',ports:{},draw:()=>`<path d="M-45 -50 V50 H45 V-50" fill="#f4fbff" fill-opacity=".5" stroke="${INK}" stroke-width="3"/><path d="M-50 -50 H50" stroke="${INK}" stroke-width="4"/>`},
 erlen:{k:'mat.erlen',ports:{},draw:(it)=>`<path d="M-14 -60 V-20 L-52 45 Q-56 54 -46 54 H46 Q56 54 52 45 L14 -20 V-60" fill="#f4fbff" fill-opacity=".5" stroke="${INK}" stroke-width="3"/>${it.liquid==='kalk'?`<path d="M-31 8 L-50 44 Q-53 51 -45 51 H45 Q53 51 50 44 L31 8Z" fill="#a9d9ee" fill-opacity=".85"/><path d="M-31 8 H31" stroke="#3a8fb7" stroke-width="2"/>`:''}<path d="M-18 -60 H18" stroke="${INK}" stroke-width="4"/>`},
 teelicht:{k:'mat.teelicht',ports:{},draw:()=>`<path d="M-24 0 H24 L20 22 H-20Z" fill="#dcdcdc" stroke="${INK}" stroke-width="3"/><path d="M0 -26 Q10 -10 0 0 Q-10 -10 0 -26Z" fill="#ffb02e" stroke="#c46a00" stroke-width="2"/>`},
 feuerzeug:{k:'mat.feuerzeug',ports:{},draw:()=>`<rect x="-14" y="-30" width="28" height="60" rx="5" fill="#3b82c4" stroke="${INK}" stroke-width="3"/><rect x="-10" y="-40" width="20" height="12" fill="#bbb" stroke="${INK}" stroke-width="3"/>`},
 span:{k:'mat.span',ports:{},draw:()=>`<rect x="-60" y="-4" width="116" height="8" rx="2" fill="#b98b52" stroke="#6b4a22" stroke-width="2"/><circle cx="58" cy="0" r="7" fill="#ff8a1e" stroke="#c43b00" stroke-width="2"/>`}
};
const KINDOK=(a,b)=>{const k=[a,b].sort().join('+');return ['big+big','luer+luer','luer+tube','glass+tube','tube+tube','hold+slot'].includes(k)};
const VESSELS=['rg','erlen'];
const SINGLES=['ballon','spritze','hahn','schlauch','glasrohr'];
const EXTRAS=['becher','teelicht','feuerzeug','span'];
const PALETTE_ALL=['rg','erlen','becher','ballon','teelicht','spritze','hahn','schlauch','feuerzeug','glasrohr','staender','span'];
function palette(){return PALETTE_ALL.filter(k=>{const m=S.mat[k];return m==='kw'||m==='both'})}
const rad=d=>d*Math.PI/180;
function wp(it,p){const c=Math.cos(rad(it.rot||0)),s=Math.sin(rad(it.rot||0));return[it.x+p[0]*c-p[1]*s,it.y+p[0]*s+p[1]*c]}
function toLocal(it,x,y){const c=Math.cos(rad(it.rot||0)),s=Math.sin(rad(it.rot||0));const dx=x-it.x,dy=y-it.y;return[dx*c+dy*s,-dx*s+dy*c]}
const HIT={staender:[-80,-24,160,72],glasrohr:[-114,-14,228,28],span:[-60,-12,120,24],schlauch:[-32,-16,64,32],hahn:[-34,-34,68,48]};
function itemSVG(it,ui){const P=PARTS[it.type];const ht=HIT[it.type];return `<g class="it" data-id="${it.id}" transform="translate(${it.x} ${it.y}) rotate(${it.rot||0})">${ht?`<rect x="${ht[0]}" y="${ht[1]}" width="${ht[2]}" height="${ht[3]}" fill="rgba(0,0,0,0.001)"/>`:''}${P.draw(it)}${ui&&ui.sel===it.id?'<rect x="-120" y="-80" width="240" height="160" fill="none" stroke="#e6b729" stroke-width="2" stroke-dasharray="6 5" opacity=".0"/>':''}</g>${(it.label||(S.sketch&&S.sketch.showLabels))?`<text x="${it.x}" y="${it.y+({rg:-84,erlen:-72,glasrohr:28,staender:50,ballon:62,spritze:44,hahn:50,schlauch:34,span:-76}[it.type]||50)}" text-anchor="middle" font-size="15" font-weight="700" fill="#14181c" stroke="#fff" stroke-width="4" paint-order="stroke" style="pointer-events:none">${esc(it.label||t(PARTS[it.type].k))}</text>`:''}`}
function sketchSVGString(items,w,hgt){return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w||900} ${hgt||560}" width="100%" style="background:#fff">${items.map(it=>itemSVG(it)).join('')}</svg>`}

/* ---- Skizzeneditor (Kalkwasser) ---- */
function sketchEditor(onChange){
  const sk=S.sketch;const W=900,H=520;let sel=null,drag=null,msg=null;
  const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');svg.setAttribute('viewBox',`0 0 ${W} ${H}`);svg.setAttribute('class','sketchbox');svg.style.width='100%';svg.style.maxHeight='calc(100dvh - 430px)';svg.style.minHeight='260px';svg.style.touchAction='none';
  const wrap=h('div',{});const tool=h('div',{class:'sktool'});const fb=h('div',{class:'note'});
  function comp(id){const seen=new Set([id]),q=[id];while(q.length){const c=q.pop();sk.links.forEach(l=>{const o=l.a===c?l.b:(l.b===c?l.a:null);if(o&&!seen.has(o)){seen.add(o);q.push(o)}})}return seen}
  function draw(){let s='<defs><pattern id="gr" width="30" height="30" patternUnits="userSpaceOnUse"><path d="M30 0H0V30" fill="none" stroke="#e6efed" stroke-width="1"/></pattern></defs><rect width="900" height="520" fill="url(#gr)"/>';
    sk.items.forEach(it=>{s+=itemSVG(it,{sel});if(sel===it.id){const P=PARTS[it.type];s+=`<circle cx="${it.x}" cy="${it.y}" r="6" fill="#e6b729" stroke="#233" stroke-width="2" style="pointer-events:none"/>`}});
    sk.items.forEach(it=>Object.keys(PARTS[it.type].ports).forEach(pn=>{if(sk.links.some(l=>(l.a===it.id&&l.pa===pn)||(l.b===it.id&&l.pb===pn)))return;const p=wp(it,PARTS[it.type].ports[pn]);s+=`<circle cx="${p[0]}" cy="${p[1]}" r="4.5" fill="none" stroke="#8aa" stroke-width="1.5" stroke-dasharray="2 2" style="pointer-events:none"/>`}));
    sk.links.forEach((l,ix)=>{const A=sk.items.find(i=>i.id===l.a);if(A){const p=wp(A,PARTS[A.type].ports[l.pa]);s+=`<circle class="lk" data-ix="${ix}" cx="${p[0]}" cy="${p[1]}" r="7" fill="#6aac90" stroke="#233" stroke-width="2" style="cursor:pointer"/><circle cx="${p[0]}" cy="${p[1]}" r="16" fill="rgba(0,0,0,.001)" class="lk" data-ix="${ix}"/>`}});
    svg.innerHTML=s;toolbar()}
  function toolbar(){tool.innerHTML='';const it=sk.items.find(i=>i.id===sel);if(!it){tool.append(h('span',{class:'note'},'👆 '+t('p.parts')))}else{
    tool.append(h('b',{},t(PARTS[it.type].k)),h('button',{class:'ok',onclick:()=>rot(it)},'⟳ ',t('p.rotate')),h('button',{class:'small sec',onclick:()=>del(it)},'🗑 ',t('p.delete')));
    if(it.type==='rg'||it.type==='erlen')tool.append(h('select',{onchange:e=>{it.liquid=e.target.value;change();draw()}},h('option',{value:'',selected:!it.liquid},t('p.content')+': '+t('p.empty')),h('option',{value:'kalk',selected:it.liquid==='kalk'},t('p.content')+': '+t('p.limewater'))))}}
  function soft(){const keep=document.activeElement;draw();}
  function change(){sk.ok=false;save();onChange&&onChange()}
  function rot(it){sk.links=sk.links.filter(l=>l.a!==it.id&&l.b!==it.id);it.rot=((it.rot||0)+90)%360;trySnap(new Set([it.id]));change();draw()}
  function del(it){sk.links=sk.links.filter(l=>l.a!==it.id&&l.b!==it.id);sk.items=sk.items.filter(i=>i.id!==it.id);sel=null;change();draw()}
  function trySnap(C){let best=null;sk.items.forEach(i=>{if(!C.has(i.id))return;const Pi=PARTS[i.type];Object.keys(Pi.ports).forEach(pa=>{
      if(sk.links.some(l=>(l.a===i.id&&l.pa===pa)||(l.b===i.id&&l.pb===pa)))return;const A=wp(i,Pi.ports[pa]);
      sk.items.forEach(j=>{if(C.has(j.id))return;const Pj=PARTS[j.type];Object.keys(Pj.ports).forEach(pb=>{
        if(!KINDOK(Pi.ports[pa][2],Pj.ports[pb][2]))return;if(Pi.ports[pa][2]==='hold'&&(i.rot||0)%360!==0)return;if(Pj.ports[pb][2]==='hold'&&(j.rot||0)%360!==0)return;
        if(sk.links.some(l=>(l.a===j.id&&l.pa===pb)||(l.b===j.id&&l.pb===pb)))return;
        const B=wp(j,Pj.ports[pb]);const d=Math.hypot(A[0]-B[0],A[1]-B[1]);if(d<34&&(!best||d<best.d))best={d,i,pa,j,pb,dx:B[0]-A[0],dy:B[1]-A[1]}})})})});
    if(best){C.forEach(id=>{const it=sk.items.find(x=>x.id===id);it.x+=best.dx;it.y+=best.dy});sk.links.push({a:best.i.id,pa:best.pa,b:best.j.id,pb:best.pb})}}
  const pt=e=>{const p=svg.createSVGPoint();p.x=e.clientX;p.y=e.clientY;const m=svg.getScreenCTM().inverse();const q=p.matrixTransform(m);return[q.x,q.y]};
  svg.addEventListener('pointerdown',e=>{const lk=e.target.closest&&e.target.closest('.lk');if(lk){e.preventDefault();sk.links.splice(+lk.dataset.ix,1);change();draw();return}const g=e.target.closest('.it');if(!g){sel=null;draw();return}const id=+g.dataset.id;sel=id;const it=sk.items.find(i=>i.id===id);
    sk.items.splice(sk.items.indexOf(it),1);sk.items.push(it);const C=comp(id);const[x,y]=pt(e);drag={C,x,y,moved:false};svg.setPointerCapture(e.pointerId);
    // Verbindung der gezogenen Gruppe nach außen lösen
    sk.links=sk.links.filter(l=>C.has(l.a)===C.has(l.b));draw()});
  svg.addEventListener('pointermove',e=>{if(!drag)return;const[x,y]=pt(e);const dx=x-drag.x,dy=y-drag.y;if(Math.abs(dx)+Math.abs(dy)<1)return;drag.moved=true;drag.x=x;drag.y=y;
    drag.C.forEach(id=>{const it=sk.items.find(i=>i.id===id);it.x=Math.max(10,Math.min(W-10,it.x+dx));it.y=Math.max(10,Math.min(H-10,it.y+dy))});draw()});
  const end=()=>{if(!drag)return;if(drag.moved){trySnap(drag.C);change()}drag=null;draw()};
  svg.addEventListener('pointerup',end);svg.addEventListener('pointercancel',end);
  const RAD={glasrohr:118,staender:84,ballon:72,spritze:88,rg:52,hahn:40,schlauch:42,becher:56,erlen:60,teelicht:36,feuerzeug:40,span:62};
  function freeSpot(k){const rn=RAD[k]||45;for(let y=70;y<=470;y+=45)for(let x=110;x<=800;x+=45){if(sk.items.every(i=>Math.hypot(i.x-x,i.y-y)>=rn+(RAD[i.type]||45)))return[x,y]}return[100+Math.random()*700,80+Math.random()*350]}
  const lb=h('button',{class:'small sec',onclick:()=>{sk.showLabels=!sk.showLabels;change();draw();lb.classList.toggle('on',!!sk.showLabels)}},'🏷 ',t('p.labelToggle'));lb.classList.toggle('on',!!sk.showLabels);
  const pal=h('div',{class:'palette'},lb,palette().map(k=>h('button',{onclick:()=>{const sp=freeSpot(k);sk.items.push({id:sk.seq++,type:k,x:sp[0],y:sp[1],rot:0,label:'',liquid:''});sel=sk.items[sk.items.length-1].id;change();draw()}},'+ ',t(PARTS[k].k))));
  wrap.append(pal,tool,svg,fb);draw();
  return{el:wrap,check(){return checkSketch()},setMsg(m){fb.textContent=m||''}}}

function checkSketch(){const sk=S.sketch,out=[];const by=ty=>sk.items.filter(i=>i.type===ty);const nm=k=>t(PARTS[k].k);
  const missing=SINGLES.filter(k=>!by(k).length).map(nm);
  const ves=[...by('rg'),...by('erlen')];if(!ves.length)missing.push(nm('rg')+' / '+nm('erlen'));
  if(by('rg').length&&!by('staender').length)missing.push(nm('staender'));
  if(missing.length)out.push(t('sk.missing',{x:missing.join(', ')}));
  const extra=EXTRAS.filter(k=>by(k).length).map(nm);if(by('staender').length&&by('erlen').length&&!by('rg').length)extra.push(nm('staender'));
  if(extra.length)out.push(t('sk.extra',{x:extra.join(', ')}));
  const dup=SINGLES.filter(k=>by(k).length>1).map(nm);if(dup.length)out.push(t('sk.extra',{x:dup.join(', ')+' (×2)'}));
  if(!missing.length){
    const has=(a,b)=>sk.links.some(l=>{const A=sk.items.find(i=>i.id===l.a),B=sk.items.find(i=>i.id===l.b);return A&&B&&((A.type===a&&B.type===b)||(A.type===b&&B.type===a))});
    if(!(has('ballon','spritze')&&has('spritze','hahn')&&has('hahn','schlauch')&&has('schlauch','glasrohr')))out.push(t('sk.chain'));
    if(!ves.some(v=>v.liquid==='kalk'))out.push(t('sk.liquid'));
    if(by('rg').some(r=>!sk.links.some(l=>(l.a===r.id||l.b===r.id)&&[l.a,l.b].some(id=>(sk.items.find(i=>i.id===id)||{}).type==='staender'))))out.push(t('sk.stand'));
    const gl=by('glasrohr')[0];const tip=wp(gl,[114,0]);const vert=Math.abs(Math.cos(rad(gl.rot||0)))<.35;
    const dips=ves.some(v=>{const lp=toLocal(v,tip[0],tip[1]);return (v.rot||0)%360===0&&Math.abs(lp[0])<(v.type==='rg'?17:12)&&lp[1]>(v.type==='rg'?10:-10)&&lp[1]<64});
    if(!(vert&&dips))out.push(t('sk.dip'))}
  return out}

/* ---- Teilchenanimation (Reagenzglas / Becherglas füllen) ---- */
function fillAnim(wide){const W=620,H=380;const cv=h('canvas',{width:W,height:H,style:{width:'100%',maxWidth:'620px',background:'#fff',border:'2px solid #b8cfca',borderRadius:'12px'}});const ctx=cv.getContext('2d');
  /* Gefäß steht immer umgekehrt: geschlossenes Ende oben, Öffnung unten */
  const box=wide?{x:190,y:40,w:240,h:170}:{x:270,y:30,w:80,h:230};const CAP=wide?70:48;const OPEN=box.y+box.h;let mode='press',P=[],tt=0,acc=0,amb=0,run=true,raf,out=0;
  const mk=(isNew,x,y,vx,vy)=>({x,y,vx:vx!=null?vx:(Math.random()-.5)*40,vy:vy||0,c:Math.random()<.79?'#9aa3a8':'#d63a3a',n:isNew});
  function reset(m){mode=m;P=[];tt=0;acc=0;amb=0;out=0;for(let i=0;i<CAP;i++)P.push(mk(false,box.x+8+Math.random()*(box.w-16),box.y+8+Math.random()*(box.h-16)));setHint()}
  const bar=h('i',{});const lab=h('b',{},'0 %');const hint=h('div',{class:'note'},'');
  function setHint(){hint.textContent=t(mode==='slow'?'an.hintSlow':mode==='top'?'an.hintTop':'an.hintPress')}
  const tipY=()=>mode==='top'?OPEN-6:box.y+(wide?24:20);
  function step(dt){tt+=dt;
    const rate=mode==='press'?(wide?17:14):mode==='slow'?2.4:3;acc+=rate*dt;
    while(acc>=1){acc-=1;const sp=mode==='press'?-110:-34;P.push(mk(true,box.x+box.w/2+(Math.random()-.5)*8,tipY(),(Math.random()-.5)*50,mode==='top'?-40:sp))}
    if(mode==='top'){amb+=rate*1.6*dt;while(amb>=1){amb-=1;const side=Math.random()<.5?-1:1;P.push(mk(false,box.x+box.w/2+side*(box.w/2-14-Math.random()*10),OPEN+6,-side*14,-48))}}
    const mx=mode==='press'?(wide?80:88):46;
    P.forEach(p=>{p.vx+=(Math.random()-.5)*90*dt;p.vy+=(Math.random()-.5)*90*dt;if(mode==='press')p.vy+=34*dt;const sp=Math.hypot(p.vx,p.vy);if(sp>mx){p.vx*=mx/sp;p.vy*=mx/sp}
      p.x+=p.vx*dt;p.y+=p.vy*dt;
      if(p.x<box.x+6){p.x=box.x+6;p.vx=Math.abs(p.vx)}if(p.x>box.x+box.w-6){p.x=box.x+box.w-6;p.vx=-Math.abs(p.vx)}
      if(p.y<box.y+6){p.y=box.y+6;p.vy=Math.abs(p.vy)*.6}
      if(!p.in&&p.y<OPEN-4)p.in=true;});
    /* Teilchen, die durch die Öffnung nach unten austreten, verschwinden */
    P=P.filter(p=>{if(p.y>OPEN+26&&(p.in||!p.n)){out++;return false}return true});
    while(P.length<CAP*.5&&mode!=='top')P.push(mk(false,box.x+box.w/2,box.y+10));
    while(P.length>CAP*1.6){let k=0;for(let i=1;i<P.length;i++)if(P[i].y>P[k].y)k=i;P.splice(k,1)}
    const inside=P.filter(p=>p.y<OPEN);const nn=inside.filter(p=>p.n).length;const pc=Math.round(100*nn/Math.max(1,inside.length));bar.style.width=pc+'%';lab.textContent=pc+' %'}
  function paint(){ctx.clearRect(0,0,W,H);ctx.lineWidth=4;ctx.strokeStyle='#233';ctx.fillStyle='rgba(223,243,251,.35)';
    const r=wide?20:box.w/2;ctx.beginPath();
    if(wide){ctx.moveTo(box.x,OPEN);ctx.lineTo(box.x,box.y+r);ctx.quadraticCurveTo(box.x,box.y,box.x+r,box.y);ctx.lineTo(box.x+box.w-r,box.y);ctx.quadraticCurveTo(box.x+box.w,box.y,box.x+box.w,box.y+r);ctx.lineTo(box.x+box.w,OPEN)}
    else{ctx.moveTo(box.x,OPEN);ctx.lineTo(box.x,box.y+r);ctx.arc(box.x+box.w/2,box.y+r,r,Math.PI,0,false);ctx.lineTo(box.x+box.w,OPEN)}
    ctx.fill();ctx.stroke();
    /* Glasrand (Wulst) an der Öffnung */
    ctx.lineWidth=5;ctx.beginPath();ctx.moveTo(box.x-9,OPEN);ctx.lineTo(box.x+7,OPEN);ctx.moveTo(box.x+box.w-7,OPEN);ctx.lineTo(box.x+box.w+9,OPEN);ctx.stroke();
    /* Glanz und Skala */
    ctx.save();ctx.strokeStyle='rgba(255,255,255,.9)';ctx.lineWidth=5;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(box.x+9,box.y+r+8);ctx.lineTo(box.x+9,OPEN-18);ctx.stroke();ctx.restore();
    if(wide){ctx.save();ctx.strokeStyle='#5b7f8f';ctx.lineWidth=2;ctx.font='11px sans-serif';ctx.fillStyle='#5b7f8f';for(let k=1;k<=4;k++){const y=OPEN-k*34;ctx.beginPath();ctx.moveTo(box.x+box.w-2,y);ctx.lineTo(box.x+box.w-(k%2?16:26),y);ctx.stroke()}ctx.restore()}
    ctx.lineWidth=4;ctx.strokeStyle='#233';
    /* Zuleitung (Glasrohr) von unten */
    const ty=tipY();ctx.fillStyle='#dff3fb';ctx.strokeStyle='#233';ctx.lineWidth=3;ctx.beginPath();ctx.rect(box.x+box.w/2-6,ty,12,H-ty);ctx.fill();ctx.stroke();
    P.forEach(p=>{ctx.beginPath();ctx.arc(p.x,p.y,5.2,0,6.3);ctx.fillStyle=p.c;ctx.fill();ctx.lineWidth=p.n?3:1;ctx.strokeStyle=p.n?'#2fa84f':'#333';ctx.stroke()});
    ctx.fillStyle='#233';ctx.font='16px sans-serif';ctx.fillText('↑',box.x+box.w/2-5,H-6)}
  let last=0;function loop(ts){if(!cv.isConnected){return}const dt=Math.min(.05,(ts-last)/1000||0.016);last=ts;if(run)step(dt);paint();raf=requestAnimationFrame(loop)}
  const mb=(m,k)=>h('button',{class:'small sec',onclick:()=>reset(m)},t(k));
  reset('press');requestAnimationFrame(loop);
  return h('div',{class:'card'},h('h3',{},t(wide?'p.fillTitleC':'p.fillTitle')),h('div',{class:'palette'},mb('slow','an.slow'),mb('top','an.top'),mb('press','an.press'),h('button',{class:'small',onclick:()=>reset(mode)},'↻ ',t('an.start'))),cv,
    h('div',{style:{display:'flex',gap:'10px',alignItems:'center',margin:'8px 0'}},h('span',{class:'small'},t('an.share')),h('div',{class:'bar',style:{flex:1}},bar),lab),hint,h('div',{class:'note'},t('an.legend')))}

/* ---- Kerze unter dem Becherglas ---- */
function candleAnim(){const W=620,H=300;const cv=h('canvas',{width:W,height:H,style:{width:'100%',maxWidth:'620px',background:'#fff',border:'2px solid #b8cfca',borderRadius:'12px'}});const ctx=cv.getContext('2d');
  let ph=0,t0=0,state='idle';const DUR=8;
  function paint(ts){ctx.clearRect(0,0,W,H);const gx=310;
    /* Tisch */ctx.fillStyle='#d8c3a0';ctx.fillRect(40,250,540,14);ctx.strokeStyle='#233';ctx.lineWidth=3;ctx.strokeRect(40,250,540,14);
    /* Kerze */ctx.fillStyle='#fff4c9';ctx.fillRect(gx-16,196,32,54);ctx.strokeRect(gx-16,196,32,54);ctx.beginPath();ctx.moveTo(gx,196);ctx.lineTo(gx,186);ctx.stroke();
    let lift=0;if(state==='down'){const k=Math.min(1,(ts-t0)/1100);lift=(1-k)*150;if(k>=1){state='burn';t0=ts}}
    let fl=1;if(state==='burn'){const k=Math.min(1,(ts-t0)/(DUR*1000));fl=1-k*k;if(k>=1)state='out'}if(state==='out')fl=0;if(state==='idle'||state==='down')fl=1;
    if(fl>0.03){ctx.fillStyle='#ffb000';ctx.beginPath();ctx.ellipse(gx,172,9*fl+2,26*fl+2,0,0,6.3);ctx.fill();ctx.fillStyle='#fff3b0';ctx.beginPath();ctx.ellipse(gx,176,4*fl,12*fl,0,0,6.3);ctx.fill()}
    /* Becherglas umgekehrt (Öffnung unten) */
    const bx=gx-78,by=90-lift;ctx.fillStyle='rgba(223,243,251,.4)';ctx.strokeStyle='#233';ctx.lineWidth=4;ctx.beginPath();ctx.moveTo(bx,by+160);ctx.lineTo(bx,by);ctx.lineTo(bx+156,by);ctx.lineTo(bx+156,by+160);ctx.fill();ctx.stroke();
    ctx.save();ctx.setLineDash([6,5]);ctx.strokeStyle='#d63a3a';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(bx,by+160);ctx.lineTo(bx+156,by+160);ctx.stroke();ctx.restore();
    /* Stoppuhr-Symbol */
    const sx=520,sy=70;ctx.strokeStyle='#233';ctx.lineWidth=4;ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(sx,sy,30,0,6.3);ctx.fill();ctx.stroke();ctx.fillRect(sx-6,sy-42,12,8);ctx.strokeRect(sx-6,sy-42,12,8);
    const el=state==='burn'?(ts-t0)/1000/DUR*20:state==='out'?20:0;ctx.beginPath();ctx.moveTo(sx,sy);ctx.lineTo(sx+22*Math.sin(el/60*6.2832),sy-22*Math.cos(el/60*6.2832));ctx.stroke();ctx.font='bold 14px sans-serif';ctx.fillStyle='#233';ctx.fillText(Math.round(el)+' s',sx-14,sy+50);
    
    if(cv.isConnected)requestAnimationFrame(paint)}
  const go1=h('button',{onclick:()=>{state='down';t0=performance.now()}},'▶ ',t('an.candle'));
  requestAnimationFrame(ts=>{t0=ts;paint(ts)});
  return h('div',{class:'card'},h('h3',{},t('an.candleTitle')),h('div',{class:'palette'},go1,h('button',{class:'small sec',onclick:()=>{state='idle'}},'↻ ',t('an.start'))),cv,h('div',{class:'note'},t('an.candleNote')))}

/* ---- Stoppuhr ---- */
function stopwatch(onTake){let run=false,t0=0,acc=0,iv;const out=h('div',{style:{fontSize:'38px',fontWeight:700,fontVariantNumeric:'tabular-nums',minWidth:'150px'}},'0.0 s');
  const val=()=>(acc+(run?Date.now()-t0:0))/1000;const draw=()=>{out.textContent=val().toFixed(1)+' s'};
  const b1=h('button',{onclick:()=>{if(run){acc+=Date.now()-t0;run=false;clearInterval(iv)}else{t0=Date.now();run=true;iv=setInterval(()=>{if(!out.isConnected){clearInterval(iv);return}draw()},100)}draw()}},t('p.startstop'));
  return h('div',{class:'card',style:{display:'flex',gap:'12px',alignItems:'center',flexWrap:'wrap'}},h('b',{},t('p.stopwatch')),out,b1,h('button',{class:'sec',onclick:()=>{run=false;acc=0;clearInterval(iv);draw()}},t('p.resetw')),h('button',{class:'ok',onclick:()=>onTake(+val().toFixed(1))},'⇥ ',t('p.take')))}

/* ---- Stahlwolle-Animation (Sauerstoffanteil, vereinfacht) ---- */
function steelAnim(opt){opt=opt||{};const W=1150,Hh=380;const O2F=opt.air==='a'?(parseFloat(CFG.O2_ATEMLUFT)/100||0.16):CFG.O2_ANTEIL_ANIMATION;let v1=50,v2=0,o2=O2F*50,heat=0,glow=0,burner=false,consumed=0,pushed=0,asked=false,drag=null;const SC=200/60;
  const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');svg.setAttribute('viewBox',`-200 -44 ${W} ${Hh+44}`);svg.style.cssText='width:100%;background:#fff;border:2px solid #b8cfca;border-radius:12px;touch-action:none';
  let last=0;const cy=150;
  function transfer(dir,mag){/* dir>0: Gas von links nach rechts */
    const src=dir>0?v1:v2;const dV=Math.min(mag,src);if(dV<=0)return;const tot=v1+v2;
    if(dir>0){v1-=dV;v2+=dV}else{v2-=dV;v1+=dV}
    if(heat>.5&&o2>0.01){const frac=o2/tot;const use=Math.min(o2,0.85*dV*frac);o2-=use;consumed+=use;if(dir>0)v2-=use;else v1-=use;glow=Math.min(1,glow+.35)}
    pushed+=dV;if(!asked&&pushed>8&&!opt.static){asked=true;if(typeof Bunsi!=="undefined")Bunsi.say('thinking',t('d.firstq'))}}
  function syr(side,g){/* Spitze innen (Richtung Quarzrohr); Gas zwischen Kolben und Spitze */
    const L=side==='L';const tip=L?250:510;const dir=L?-1:1;const bx=L?tip-210:tip;/* Zylinder x..x+210 */
    const head=tip+dir*(g+10);const rod=head+dir*232;
    let s=`<rect x="${bx}" y="${cy-30}" width="210" height="60" fill="#f4fbff" stroke="#233" stroke-width="3"/>`;
    s+=`<rect x="${L?tip-g-10:tip+10}" y="${cy-27}" width="${g}" height="54" fill="#cfeaf6"/>`;
    for(let k=0;k<=6;k++){const x=L?tip-10-k*33.3:tip+10+k*33.3;s+=`<path d="M${x} ${cy-30} v${k%2?8:14}" stroke="#233" stroke-width="2"/>`}
    s+=`<rect x="${L?bx-8:bx+210}" y="${cy-44}" width="8" height="88" rx="3" fill="#e9eef0" stroke="#233" stroke-width="3"/>`;/* Fingerflansch */
    s+=`<rect x="${L?tip:tip-30}" y="${cy-9}" width="30" height="18" fill="#eaf0f2" stroke="#233" stroke-width="2"/>`;/* Düse */
    s+=`<rect x="${Math.min(head,rod)}" y="${cy-5}" width="${Math.abs(rod-head)}" height="10" fill="#ccd3d8" stroke="#233" stroke-width="2"/>`;/* Kolbenstange */
    s+=`<rect x="${L?head-10:head}" y="${cy-28}" width="10" height="56" rx="3" fill="#2a2f33" stroke="#233" stroke-width="2"/>`;/* Kolben */
    s+=`<rect class="hd" data-s="${side}" x="${rod-6}" y="${cy-30}" width="12" height="60" rx="5" fill="#e0709a" stroke="#233" stroke-width="3" style="cursor:ew-resize"/>`;
    return s}
  function paint(){const fl=Math.round(150+glow*105),wool=glow>0.05?`rgb(255,${Math.round(150-90*glow)},${Math.round(40-30*glow)})`:`hsl(0,0%,${Math.max(32,62-consumed*3.5)}%)`;
    const fh=burner?(.8+.2*Math.sin(performance.now()/90)):0;
    svg.innerHTML=`<defs><radialGradient id="gw"><stop offset="0" stop-color="#ffd27a" stop-opacity="${glow}"/><stop offset="1" stop-color="#ff6a00" stop-opacity="0"/></radialGradient></defs>
    ${syr('L',v1*SC)}${syr('R',v2*SC)}
    <rect x="250" y="${cy-24}" width="260" height="48" rx="6" fill="#e9f6ff" fill-opacity=".85" stroke="#233" stroke-width="3"/>
    <ellipse cx="380" cy="${cy}" rx="58" ry="15" fill="${wool}" stroke="#444" stroke-width="2"/><circle cx="380" cy="${cy}" r="${32+glow*24}" fill="url(#gw)"/>
    ${burner?`<g transform="translate(380 ${cy+118}) scale(1 ${fh}) translate(-380 ${-(cy+118)})"><path d="M380 ${cy+26} Q346 ${cy+62} 362 ${cy+106} Q380 ${cy+122} 398 ${cy+106} Q414 ${cy+62} 380 ${cy+26}Z" fill="#4aa8ff" stroke="#233" stroke-width="2"/><path d="M380 ${cy+60} Q366 ${cy+90} 372 ${cy+106} Q380 ${cy+114} 388 ${cy+106} Q394 ${cy+90} 380 ${cy+60}Z" fill="#dff3ff"/></g>`:''}
    <path d="M346 ${cy+196} V${cy+130} H414 V${cy+196}" fill="#d8dde1" stroke="#233" stroke-width="4"/><rect x="338" y="${cy+120}" width="84" height="16" rx="5" fill="#c3ccd4" stroke="#233" stroke-width="4"/><rect x="318" y="${cy+192}" width="124" height="16" rx="6" fill="#233"/>
    <text x="140" y="${cy-64}" text-anchor="middle" font-size="22" font-weight="700" fill="#233">${v1.toFixed(1)} ml</text><text x="620" y="${cy-64}" text-anchor="middle" font-size="22" font-weight="700" fill="#233">${v2.toFixed(1)} ml</text>
    <text x="380" y="${cy-34}" text-anchor="middle" font-size="16" fill="#233">${t('d.wool')}</text>
    <g font-size="16" font-weight="700" fill="#233"><text x="140" y="${cy+58}" text-anchor="middle">${t('d.lblSyr')}</text><text x="620" y="${cy+58}" text-anchor="middle">${t('d.lblSyr')}</text><text x="470" y="${cy+46}" text-anchor="start">${t('d.lblTube')}</text><text x="322" y="${cy+168}" text-anchor="end">${t('d.lblBurner')}</text></g>
    <path d="M466 ${cy+38} L440 ${cy+24}" stroke="#233" stroke-width="2" fill="none"/>`}
  const pt=e=>{const p=svg.createSVGPoint();p.x=e.clientX;p.y=e.clientY;return p.matrixTransform(svg.getScreenCTM().inverse()).x};
  if(!opt.static){
   svg.addEventListener('pointerdown',e=>{const hd=e.target.closest&&e.target.closest('.hd');if(!hd)return;drag={s:hd.dataset.s,x:pt(e)};svg.setPointerCapture(e.pointerId);e.preventDefault()});
   svg.addEventListener('pointermove',e=>{if(!drag)return;const x=pt(e);const dx=x-drag.x;drag.x=x;if(Math.abs(dx)<.01)return;const mag=Math.abs(dx)/SC;
     if(drag.s==='L'){transfer(dx>0?1:-1,mag)}else{transfer(dx<0?-1:1,mag)}});
   svg.addEventListener('pointerup',()=>{drag=null});svg.addEventListener('pointercancel',()=>{drag=null})}
  let moving=0;
  function frame(ts){if(!svg.isConnected)return;const dt=Math.min(.05,(ts-last)/1000||0.016);last=ts;
    heat=burner?Math.min(1,heat+dt/2):Math.max(0,heat-dt/4);
    if(moving!==0)transfer(moving,14*dt);
    glow=Math.max(0,glow-dt*(moving?.6:1.2));
    const sig=[v1.toFixed(2),v2.toFixed(2),glow.toFixed(2),heat.toFixed(2),burner?Math.floor(ts/90):0,consumed.toFixed(2)].join();if(sig!==_sig){_sig=sig;paint()}requestAnimationFrame(frame)}
  let _sig='';
  const btn=(l,f,c)=>h('button',{class:c||'',onclick:f},l);
  const reset=()=>{v1=50;v2=0;o2=O2F*50;heat=0;glow=0;burner=false;moving=0;consumed=0;pushed=0;asked=false;bb.textContent='🔥 '+t('d.burnerOff')};
  const bb=btn('🔥 '+t('d.burnerOff'),()=>{burner=!burner;bb.textContent='🔥 '+(burner?t('d.burnerOn'):t('d.burnerOff'))},'warn');
  requestAnimationFrame(frame);
  if(opt.static){burner=false;return h('div',{class:'card'},h('h3',{},'🧪 '+t('d.setup')),svg)}
  const rb=btn('↻ '+t('d.reset'),reset,'sec');rb.classList.add('small');rb.style.cssText='position:absolute;top:6px;right:6px;z-index:3';
  bb.style.cssText='position:absolute;left:calc(50% + 120px);top:68%;z-index:3';
  const wrap=h('div',{style:{position:'relative'}},svg,rb,bb);
  return h('div',{class:'card'},h('h3',{},'🧪 '+t('d.wool')),opt.top||'',opt.vols||'',wrap,h('div',{class:'note'},t('d.dragHint')),h('div',{class:'palette',style:{marginTop:'10px'}},
    btn('→ '+t('d.push')+' ('+t('d.left')+')',()=>{moving=1;setTimeout(()=>{moving=0},900)},'ok'),btn('← '+t('d.push')+' ('+t('d.right')+')',()=>{moving=-1;setTimeout(()=>{moving=0},900)},'ok')))}

function helpToggle(label,fn){let box=null;const host=h('div',{});const btn=h('button',{class:'sec',onclick:()=>{if(box){box.remove();box=null;btn.classList.remove('on');return}box=fn();host.append(box);btn.classList.add('on')}},'💡 '+label);host.append(btn);return host}
