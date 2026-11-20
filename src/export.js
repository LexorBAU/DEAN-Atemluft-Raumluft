/* ===================== EXPORT (PDF über Druckansicht) und START ===================== */
function abbr(){const m={A:'KW',B:'GS',C:'KQ',D:'SW'};return['A','B','C','D'].filter(e=>S.done[e]).map(e=>m[e]).join(' ')||'–'}
function dateStr(){const d=new Date();return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')}
function fileName(){return 'Protokoll Vergleich Raum-Atemluft '+dateStr()+' '+abbr()}
function openExport(){const ni=h('input',{type:'text',value:S.names||'',size:36,placeholder:t('ui.names'),oninput:e=>{S.names=e.target.value;save()}});
  const box=h('div',{});
  const start=()=>{box.innerHTML='';box.append(h('p',{},'⏳ '+t('export.working')));
    makePDF().then(blob=>{box.innerHTML='';const fn=fileName()+'.pdf';
      box.append(h('p',{style:{fontWeight:700}},'✅ '+fn),h('button',{class:'ok',onclick:()=>savePDF(blob,fn)},'💾 '+t('export.save')),' ',h('button',{class:'sec',onclick:()=>{const u=URL.createObjectURL(blob);window.open(u,'_blank')}},t('export.view')),h('p',{class:'note'},t('export.saveHint')))
    }).catch(e=>{box.innerHTML='';box.append(h('p',{},'⚠️ '+t('export.err')+' ('+e+')'),h('button',{onclick:start},t('export.go')))})};
  box.append(h('p',{},h('label',{},t('ui.names')+': ',ni)),h('p',{class:'small'},t('export.info')),h('p',{style:{fontWeight:700}},fileName()+'.pdf'),h('button',{class:'ok',onclick:start},'📄 '+t('export.go')),h('p',{class:'note'},t('export.saved')));
  modal(t('export.title'),box)}
function savePDF(blob,fn){const u=URL.createObjectURL(blob);const a=document.createElement('a');a.href=u;a.download=fn;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(u),30000)}
const HYPRES={yes:'bestätigt',part:'teilweise bestätigt',no:'nicht bestätigt',unk:'noch unklar'};
async function makePDF(){const L=LANGIDX[S.lang]||0;const X=k=>PT[k][L]||PT[k][0];const DE=k=>(T[k]&&(T[k][L]||T[k][0]));const D=L?new CanvasDoc(L):new PDF.Doc();const img={};
  const need=[];const fimg=id=>{const f=S.fields[id];if(f&&f.img)need.push(PDF.fromDataURL(f.img).then(r=>img[id]=r))};
  const ids=['gases','hyp','hypfenster','fazit','abgleich'];['A','B','C','D'].forEach(e=>{if(S.done[e]){if(e==='A'||e==='B'){ids.push(e+'_beob_R',e+'_beob_A')}else ids.push(e+'_beob');ids.push(e+'_deut')}});ids.forEach(fimg);
  if(S.done.A&&S.sketch.items.length)need.push(PDF.fromSVG(sketchSVGString(S.sketch.items)).then(r=>img.skA=r));
  if(S.done.B)need.push(PDF.fromSVG(sceneB('fill')).then(r=>img.skB=r));
  await Promise.all(need);
  const field=id=>{const f=S.fields[id];if(!f||(!f.text&&!f.img)){D.para('–');return}if(f.text)D.para(f.text);if(img[id])D.image(img[id],D.cw*0.8,230)};
  D.h1(X('title'));D.para(X('names')+(S.names||'______________________')+'          '+X('date')+dateStr(),{after:6});
  D.h2(X('frage'));D.para(FRAGESTELLUNG[L]||FRAGESTELLUNG[0]);
  D.h2(X('hyp'));D.para(X('gases'),{b:1,after:1});field('gases');D.para(X('myhyp'),{b:1,after:1});field('hyp');
  const mk=sel=>MATERIAL.filter(m=>S.mat[m.id]==='both'||S.mat[m.id]===sel).map(m=>DE('mat.'+m.id)).join(', ')||'–';
  D.h2(X('matdur'));D.para(X('chosen')+(S.nw.length?S.nw.map(k=>DE('nw.'+k)).join(', '):'–'));D.para(X('matkw')+mk('kw'));D.para(X('matgs')+mk('gs'));
  const aufb={A:()=>S.sketch.items.length&&img.skA?D.image(img.skA,D.cw*0.85,250):D.para('–'),B:()=>img.skB&&D.image(img.skB,D.cw*0.85,250),C:()=>D.para(X('C_aufb')),D:()=>D.para(X('D_aufb'))};
  const room=t('ui.room'),air=t('ui.breath');
  ['A','B','C','D'].forEach(e=>{if(!S.done[e])return;D.h2(DE('ex.'+e));D.para(X('ziel')+X(e+'_ziel'));if(e==='A')D.para(X('A_chem'));
    D.h3(X('aufb'));aufb[e]();D.h3(X('durch'));if(e==='D'){D.para(X('aufbdesc'),{b:1,after:1});field('D_aufbau')}D.para(X('mydesc'),{b:1,after:1});field(e+'_durchb');D.h3(X('beob'));
    if(e==='A'||e==='B'){D.table(['',room,air],[[e==='A'?X('turb'):X('span'),obsText('R',e),obsText('A',e)]],[0.28,0.36,0.36]);D.para(room+':',{b:1,after:1});field(e+'_beob_R');D.para(air+':',{b:1,after:1});field(e+'_beob_A')}
    if(e==='C'){D.table([X('meas'),X('roomS'),X('airS')],[0,1,2].map(i=>[String(i+1),S.kerze.r[i]||'–',S.kerze.a[i]||'–']).concat([[X('mean'),meanArr(S.kerze.r),meanArr(S.kerze.a)]]),[0.28,0.36,0.36]);field('C_beob')}
    if(e==='D'){['r','a'].forEach(a=>D.para((a==='r'?room:air)+': '+X('vol').replace('{a}',SW()[a].v0||'–').replace('{b}',SW()[a].v1||'–')+'  '+swInfo(a)));field('D_beob')}
    D.h3(X('deut'));field(e+'_deut')});
  const HR=L?{yes:t('fz.confirmed'),part:t('fz.partly'),no:t('fz.notconf'),unk:t('fz.unclear')}:HYPRES;
  D.h2(X('hypchk'));D.para(X('hypis')+(HR[S.hypRes]||'–'));field('hypfenster');
  const rows=fazitRows();D.h2(X('fazit'));if(rows.length)D.table([t('fz.test'),room,air],rows,[0.4,0.3,0.3]);D.para(X('answer'),{b:1,after:1});field('fazit');
  D.h2(X('real'));D.para(X('realis')+(({yes:X('yes'),part:X('part'),no:X('no')})[S.realRes]||'–'));D.para(X('dev'),{b:1,after:1});field('abgleich');
  D.para(X('made'),{sz:9,after:0});
  return await D.build(X('foot')+(S.names||''))}
/* ---------- START ---------- */
function boot(){load();document.documentElement.lang=S.lang;document.documentElement.dir=S.lang==='fa'?'rtl':'ltr';buildChrome();render();blinkLoop();idleLoop()}
window.addEventListener('DOMContentLoaded',boot);
