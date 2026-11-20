/* ===================== SEITEN ===================== */
const MATERIAL=[
 {id:'ballon',ok:['both']},{id:'pumpe',ok:['both']},{id:'spritze',ok:['both']},{id:'hahn',ok:['both']},{id:'schlauch',ok:['both']},{id:'glasrohr',ok:['both']},
 {id:'rg',ok:['both']},{id:'staender',ok:['kw','both']},{id:'kalk',ok:['kw']},{id:'span',ok:['gs']},
 {id:'feuerzeug',ok:['gs']},/* Feuerzeug zündet das Teelicht, das Teelicht dient als Zündquelle für den Glimmspan */ {id:'teelicht',ok:['gs','none']},{id:'becher',ok:['none']},{id:'erlen',ok:['none']}];
const matLbl=id=>t('mat.'+id);
function okSet(m){const ek=S.mat.erlen==='kw';if(m.id==='rg')return ek?['gs']:['both'];if(m.id==='staender')return ek?['gs','none']:['kw','both'];if(m.id==='erlen')return['kw','none'];return m.ok}
let _lastRendered=null,_fill;
function render(){const c=$('#content');if(!c)return;const sp=(_lastRendered===S.page)?c.scrollTop:0;c.innerHTML='';const p=S.page;const fn=PAGES[p]||PAGES.lang;c.append(fn());const nv=c.querySelector('.nav'),ft=$('#foot');ft.innerHTML='';if(nv)ft.append(nv);ft.style.display=nv?'':'none';c.scrollTop=sp;updateWheel();
  $('#sub').textContent=PAGE_EXP[p]?t('ex.'+PAGE_EXP[p]):'';document.documentElement.dir=S.lang==='fa'?'rtl':'ltr';
  const hb=$('#helpbtn');if(hb)hb.style.display=(p==='uebersicht')?'none':'';
  if(_lastRendered!==p){Bunsi.intro();_lastRendered=p}}
const pg=(...k)=>h('div',{class:'page'},...k);
function warnBanner(key){return h('div',{class:'card',style:{background:'#fff0ee',borderInlineStart:'8px solid var(--red)',display:'flex',gap:'12px',alignItems:'center'}},h('img',{src:bunsiSrc('warning'),style:{height:'86px'}}),h('div',{html:markHTML(t(key))}))}
function tipCards(){return[h('div',{class:'card',style:{background:'#eaf7f1'}},h('b',{},'🎈 '),h('span',{html:markHTML(t('b.balloons'))})),h('div',{class:'card',style:{background:'#eaf7f1'}},h('b',{},'⚖ '),h('span',{html:markHTML(t('b.same'))}))]}
function airRow(cur,on){return h('div',{class:'airrow'},['r','a'].map(v=>h('button',{class:'airb air-'+v+(cur===v?' sel':''),onclick:()=>on(v)},(v==='r'?'🏠 ':'🫁 ')+t(v==='r'?'ui.room':'ui.breath'))))}
function radioRow(vals,cur,onSel){return h('div',{style:{display:'flex',gap:'8px',flexWrap:'wrap',margin:'6px 0'}},vals.map(([v,l])=>h('button',{class:'small '+(cur===v?'':'sec'),onclick:()=>onSel(v)},l)))}
function finishExp(e){S.done[e]=true;S.lastExp=e;save();
  if(e==='A'||e==='B'){if(S.done.A&&S.done.B&&!S.hypSeen){Bunsi.say('proud',t('b.hypfenster'));go('hypfenster')}else{go('uebersicht')}}else go('fazit')}

const PAGES={};
PAGES.lang=()=>pg(h('h1',{style:{textAlign:'center'}},'🔥 DEAN'),h('div',{class:'card'},h('h2',{style:{textAlign:'center',marginTop:0}},T['ui.langTitle'][0]),
  [['de','Deutsch'],['fa','فارسی (Persisch)'],['tr','Türkçe (Türkisch)']].map(([l,n])=>h('button',{class:'langbtn',onclick:()=>{setLang(l);buildChrome();go('intro')}},n)),
  h('p',{class:'note',html:markHTML(T['ui.langNote'][0])}),h('p',{class:'note',style:{direction:'rtl'},html:markHTML(T['ui.langNote'][1])}),h('p',{class:'note',html:markHTML(T['ui.langNote'][2])})));

PAGES.intro=()=>pg(h('h1',{},t('ui.title')),h('div',{class:'card'},htmlP(t('b.intro2'))),
  h('div',{class:'card stepwheelbig'},h('div',{html:ASSETS.radBig}),h('ol',{class:'steplist'},[0,1,2,3,4].map(i=>h('li',{},h('b',{},t('step.'+i)),h('div',{class:'small'},t('stepd.'+i)))))),
  h('p',{class:'note'},'(Schulbuch Chemie Bayern 8 NTG, Buchner, Kap. 2.5, Erkenntnisweg S. 22/23; orientiert am Experimentierkreislauf, vgl. Kremer et al., 2019)'),
  navBar('frage',{noBack:true}));

PAGES.frage=()=>pg(h('h1',{},t('p.frageTitle')),h('div',{class:'card big-q'},frage()),navBar('hyp'));

function showHypInfo(){modal(t('hyp.def.title'),h('div',{},h('p',{},t('hyp.def')),
  [[ 'hyp.ex1q','hyp.ex1h'],['hyp.ex2q','hyp.ex2h']].map(([q,hy])=>h('div',{class:'card',style:{background:'#f4f8f7'}},h('div',{},h('b',{},t('hyp.exq')+': '),t(q)),h('div',{style:{marginTop:'6px'}},h('b',{},t('hyp.exh')+': '),t(hy))))))}
PAGES.hyp=()=>pg(h('h1',{},t('p.hypTitle')),h('div',{class:'card',style:{background:'#e9f3d9',fontWeight:700,padding:'10px 16px'}},h('span',{class:'small'},t('hyp.exq')+': '),frage()),
   h('div',{class:'card',style:{padding:'10px 16px'}},h('div',{style:{display:'flex',gap:'10px',flexWrap:'wrap',alignItems:'center'}},h('b',{},'🔎 '+t('p.research')+':'),h('button',{class:'ibtn',onclick:()=>go('info_luft')},t('p.infoLuft')),h('button',{class:'ibtn',onclick:()=>go('info_stoff')},t('p.infoStoff')),h('button',{class:'ibtn',onclick:showHypInfo},t('hyp.def.btn')))),
   aufgabe('hyp'),h('div',{class:'card'},h('h3',{},t('p.gasesQ')),writeField('gases',{rows:2,ph2:150})),
   h('div',{class:'card'},h('h3',{},t('p.myhypText')),writeField('hyp',{rows:4,ph2:300})),navBar('plan'));

function teilchenbild(){let s='';let i=0;const cols=10;const kinds=[];for(let k=0;k<78;k++)kinds.push('N');for(let k=0;k<21;k++)kinds.push('O');kinds.push('X');
  const order=kinds.map((k,ix)=>[((ix*37)%100),k]).sort((a,b)=>a[0]-b[0]).map(x=>x[1]);
  order.forEach((k,ix)=>{const cx=24+(ix%cols)*34,cy=24+Math.floor(ix/cols)*34;const f=k==='N'?'#9aa3a8':k==='O'?'#d63a3a':'#fff';s+=`<circle cx="${cx}" cy="${cy}" r="12" fill="${f}" stroke="#333" stroke-width="2" ${k==='X'?'stroke-dasharray="3 3"':''}/>`});
  return `<svg viewBox="0 0 350 350" style="max-width:300px;width:100%">${s}</svg>`}
PAGES.info_luft=()=>pg(h('h1',{},t('info.luft.title')),h('div',{class:'card'},htmlP(t('info.luft.p1')),htmlP(t('info.luft.p2')),htmlP(t('info.luft.p3')),h('div',{style:{display:'flex',gap:'20px',alignItems:'center',flexWrap:'wrap'}},h('div',{html:teilchenbild()}),h('div',{class:'small'},h('div',{},'⬤ ',h('span',{style:{color:'#9aa3a8'}},'Stickstoff (78)')),h('div',{},'⬤ ',h('span',{style:{color:'#d63a3a'}},'Sauerstoff (21)')),h('div',{},'◯ ',S.lang==='de'?'übrige Gase (1)':'1')))),htmlP(t('info.luft.src'),'note'),navBar(null,{onNext:()=>go('hyp'),label:t('ui.close')}));
PAGES.info_stoff=()=>pg(h('h1',{},t('info.stoff.title')),h('div',{class:'card'},htmlP(t('info.stoff.p1')),htmlP(t('info.stoff.p2')),h('div',{class:'card',style:{background:'#fffbe6',fontWeight:700,textAlign:'center'}},t('info.stoff.p3')),htmlP(t('info.stoff.p4'))),htmlP(t('info.stoff.src'),'note'),navBar(null,{onNext:()=>go('hyp'),label:t('ui.close')}));

PAGES.plan=()=>{const sel=S.nw;const nw=['kw','gs','kg'];
  const part1=h('div',{class:'card'},h('h3',{},t('p.nachweise')),nw.map(k=>h('label',{class:'opt'+(sel.includes(k)?' sel':'')},h('input',{type:'checkbox',checked:sel.includes(k),onchange:e=>{S.nw=S.nw.filter(x=>x!==k);if(e.target.checked)S.nw.push(k);S.planOK=false;S.matOK=false;save();render()}}),t('nw.'+k))),
    h('button',{onclick:checkPlan},t('ui.check')));
  const out=[h('h1',{},t('p.planTitle')),aufgabe('plan'),part1];
  if(S.planOK)out.push(...planMaterial());
  return pg(...out,navBar('uebersicht',{disabled:!(S.planOK&&S.matOK)}))};
function checkPlan(){const s=S.nw;
  if(!s.length){Bunsi.say('thinking',t('f.none'));return}
  if(s.includes('kg')){if(!S.knallAsked){Bunsi.say('thinking',t('f.knallQ'),[['o2'],['co2'],['h2']].map(([g])=>({label:t('gas.'+g).split(' (')[0],fn:()=>{if(g==='h2'){S.knallAsked=true;save();Bunsi.say('happy',t('f.knallRight'))}else Bunsi.say('oops',t('f.knallWrong'))}})))}
    else Bunsi.say('happy',t('f.knallRight'));return}
  if(s.includes('kw')&&s.includes('gs')){S.planOK=true;save();Bunsi.say('happy',t('f.planOK'));render();return}
  Bunsi.say('thinking',t('f.onlyOne'))}
function planMaterial(){const rows=MATERIAL.map(m=>{const cur=S.mat[m.id];const bad=S.matChecked&&(!cur||!okSet(m).includes(cur));const good=S.matChecked&&!bad;
    return h('div',{class:'matrow'+(bad?' bad':'')+(good?' good':'')},h('b',{},matLbl(m.id)),['kw','gs','both','none'].map(v=>h('button',{class:cur===v?'on':'',onclick:()=>{S.mat[m.id]=v;S.matChecked=false;S.matOK=false;save();render()}},t('mat.'+v))))});
  return[h('div',{class:'card'},h('h3',{},t('p.materialTitle')),h('div',{style:{display:'flex',gap:'16px',flexWrap:'wrap',alignItems:'flex-start'}},h('div',{style:{width:'180px'}},h('img',{class:'photo',src:ASSETS.photo.einzel,style:{width:'100%',cursor:'pointer'},onclick:()=>showPhoto('einzel')}),h('div',{class:'note'},t('p.photoParts'))),h('div',{style:{flex:1,minWidth:'320px'}},rows)),h('button',{style:{marginTop:'10px'},onclick:checkMaterial},t('ui.check'))),...tipCards()]}
function checkMaterial(){S.matChecked=true;let n=0;const missing=new Set();
  MATERIAL.forEach(m=>{const cur=S.mat[m.id];const ok=okSet(m);if(!cur||!ok.includes(cur)){n++;if(ok.includes('both')||ok.includes('kw')){if(!cur||cur==='gs'||cur==='none')missing.add('kw')}if(ok.includes('both')||ok.includes('gs')){if(!cur||cur==='kw'||cur==='none')missing.add('gs')}}});
  S.matOK=n===0;save();
  if(n===0)Bunsi.say('proud',t('f.matOK'));else{let tx=t('f.matWrong',{n});if(missing.size)tx+=' '+t('f.matMissing',{v:[...missing].map(x=>t('mat.'+x)).join(' & ')});Bunsi.say('oops',tx,[{label:t('ui.help'),fn:()=>Bunsi.help()}])}
  render()}

function exStatus(e){return S.done[e]?'done':(((e==='C'||e==='D')&&!expUnlockedCD())?'lock':'open')}
PAGES.uebersicht=()=>{const cards=[['A','kw','must'],['B','gs','must'],['C','','pf'],['D','','pf']].map(([e,_,k])=>{const st=exStatus(e);const locked=st==='lock';
  return h('div',{class:'card excard '+st+(locked?' locked':''),onclick:()=>{if(locked)return;S.lastExp=e;const pp=S.expLast&&S.expLast[e];go(pp||EXP_PAGES[e][0])}},
   h('div',{style:{display:'flex',gap:'6px',flexWrap:'wrap'}},h('span',{class:'tag '+(k==='must'?'must':'pf')},t(k==='must'?'ui.must':'ui.puffer')),h('span',{class:'tag '+(st==='done'?'done':st==='lock'?'lock':'')},st==='done'?'✓ '+t('ui.done'):st==='lock'?'🔒 '+t('ui.locked'):t('ui.open'))),
   h('h3',{},t('ex.'+e)),e==='A'?h('div',{class:'small'},t('ex.gasKW')):e==='B'?h('div',{class:'small'},t('ex.gasGS')):h('div',{class:'small'},t('ex.'+e+'sub')),
   '')});
  const o=[h('h1',{},t('p.overview')),h('div',{class:'grid g2'},cards)];
  o.push(h('div',{style:{marginTop:'10px'}},h('button',{class:'small sec',onclick:()=>askPw(()=>{S.teacher=true;save();Bunsi.say('happy',t('f.unlocked'));render()})},'🔑 ',t('ui.teacher'))));
  const nv=[];if(S.done.A&&S.done.B)nv.push(h('button',{class:'sec',onclick:()=>go('hypfenster')},t('hf.title')));if(S.done.A||S.done.B||S.done.C||S.done.D)nv.push(h('button',{class:'ok',onclick:()=>go('fazit')},t('fz.title')+' →'));
  return pg(...o,h('div',{class:'nav'},h('button',{class:'sec',onclick:()=>go('plan')},'← '+t('p.planTitle')),...nv))};

/* ---------- Sicherheit ---------- */
const GHS05=`<svg viewBox="0 0 120 120" style="width:120px;height:120px;flex:none"><rect x="22" y="22" width="76" height="76" transform="rotate(45 60 60)" fill="#fff" stroke="#d6231e" stroke-width="9"/><g fill="#111" stroke="#111"><path d="M38 34 l16 -2 l2 8 l-16 2z"/><path d="M62 36 l16 -4 l2 8 l-16 4z"/><path d="M50 46 q-3 7 0 10 q3 -3 0 -10z M70 48 q-3 7 0 10 q3 -3 0 -10z" /><path d="M32 74 h22 v-4 h-22z" /><path d="M64 74 h24 v-3 h-24z"/><path d="M34 68 q2 -8 7 -8 q2 -6 6 -3 q2 -5 6 -2 l2 10 q-2 3 -8 3z" fill="#111"/></g></svg>`;
function safetySeq(kinds,then){let i=0;
  const next=()=>{if(i>=kinds.length){then&&then();return}const k=kinds[i++];
    const body=k==='kw'?h('div',{style:{display:'flex',gap:'16px',alignItems:'center'}},h('img',{src:ASSETS.ghs05,alt:'GHS05',style:{width:'110px',height:'110px',flex:'none'}}),h('p',{style:{fontSize:'1.15em'}},t('sf.kw'))):h('div',{},h('p',{style:{fontSize:'1.25em',fontWeight:700}},t(k==='ready'?'sf.ready':'sf.brille')),k==='brille'?h('p',{},t('sf.hair')):null);
    modal(t(k==='ready'?'sf.titleR':'sf.title'),body,{onClose:next})}
  next()}
function needSafety(exp,kinds){S.safe=S.safe||{};if(S.safe[exp])return;S.safe[exp]=true;save();setTimeout(()=>safetySeq(kinds),150)}
/* ---------- Versuch A ---------- */
let _skEd=null;
PAGES.A_skizze=()=>{const msg=h('div',{class:'card',style:{display:'none'}});
  _skEd=sketchEditor(()=>{S.sketch.ok=false;nextB.disabled=true});
  const nextB=h('button',{disabled:!S.sketch.ok,onclick:()=>go('A_ok')},t('ui.next')+(S.lang==='fa'?' ←':' →'));
  const chk=h('button',{onclick:()=>{const r=checkSketch();if(!r.length){S.sketch.ok=true;save();nextB.disabled=false;Bunsi.say('happy',t('f.sketchOK'))}else{S.sketch.ok=false;nextB.disabled=true;Bunsi.say('thinking',r.slice(0,2).join(' '),[{label:t('ui.help'),fn:()=>Bunsi.help()}])}}},'✔ ',t('ui.check'));
  return pg(h('h1',{},t('p.sketchTitle')),aufgabe('A_skizze'),h('div',{class:'card'},h('div',{style:{display:'flex',gap:'8px',margin:'0 0 8px',flexWrap:'wrap'}},h('button',{class:'small sec',onclick:()=>showPhoto('einzel')},'📷 '+t('p.photoParts'))),_skEd.el,h('div',{style:{marginTop:'10px'}},chk)),
   h('div',{class:'nav'},h('button',{class:'sec',onclick:back},'← '+t('ui.back')),nextB))};
PAGES.A_ok=()=>{needSafety('A',['kw','brille']);return pg(h('h1',{},t('p.teacherOK')),aufgabe('A_ok'),h('div',{class:'card'},S.okA?h('b',{style:{color:'var(--teal)'}},'✓ '+t('p.okGiven')):h('div',{},h('p',{},t('p.teacherOKhint2')),h('button',{class:'ok',onclick:()=>{S.okA=true;save();Bunsi.say('happy',t('p.okGiven'));render()}},'✔ '+t('p.okBtn')))),
  warnBanner('b.A_warn'),navBar('A_durch',{disabled:!S.okA}))};
PAGES.A_durch=()=>pg(h('h1',{},t('ex.A')),warnBanner('b.A_warn'),aufgabe('A_durch'),...tipCards(),h('div',{class:'card'},h('b',{},t('p.descDurch')),writeField('A_durchb',{rows:3,ph2:220})),navBar('A_beob'));
const lufts=[['R','ui.room'],['A','ui.breath']];
PAGES.A_beob=()=>pg(h('h1',{},t('ex.A')),aufgabe('A_beob'),lufts.map(([k,l])=>h('div',{class:'card'},h('h3',{},t(l)),h('div',{class:'small'},t('o.turb')),
   radioRow([['yes',t('o.turbYes')],['no',t('o.turbNo')]],S.obs['turb'+k],v=>{S.obs['turb'+k]=v;save();render()}),writeField('A_beob_'+k,{rows:3,ph2:220}))),navBar('A_deut'));
PAGES.A_deut=()=>pg(h('h1',{},t('ex.A')),aufgabe('A_deut'),h('div',{class:'card'},writeField('A_deut',{rows:5,ph2:340})),navBar(null,{onNext:()=>finishExp('A'),label:t('ui.done'),cls:'ok'}));

/* ---------- Versuch B ---------- */
function sceneB(kind){const items=[];let id=1;const add=(type,x,y,rot,extra)=>items.push(Object.assign({id:id++,type,x,y,rot:rot||0},extra||{}));
  const by=130,bx=120;add('ballon',bx,by,0);add('spritze',bx+150,by,0);add('hahn',bx+252,by,0);add('schlauch',bx+316,by,0);add('glasrohr',bx+348,by+114,90);
  add('staender',bx+348,by+264,0);add('rg',bx+348,by+224,0,{label:''});
  if(kind==='test'){items.length=0;id=1;add('staender',450,300,0);add('rg',450,270,0);add('span',450,210,90,{label:'Glimmspan'})}
  return sketchSVGString(items,720,520)}
PAGES.B_durch=()=>pg(h('h1',{},t('ex.B')),warnBanner('b.B_warn'),aufgabe('B_durch'),h('div',{class:'card'},h('b',{},t('p.descDurch')),writeField('B_durchb',{rows:3,ph2:220})),
  h('div',{class:'card'},h('div',{class:'grid g2'},h('div',{},h('div',{class:'small'},'1 · '+t('p.fillTitle').split(':')[0]),h('div',{html:sceneB('fill')})),h('div',{},h('div',{class:'small'},'2 · '+t('nw.gs')),h('div',{html:sceneB('test')})))),
  fillAnim(false),...tipCards(),navBar('B_beob'));
PAGES.B_beob=()=>pg(h('h1',{},t('ex.B')),aufgabe('B_beob'),lufts.map(([k,l])=>h('div',{class:'card'},h('h3',{},t(l)),h('div',{class:'small'},t('o.span')),
   radioRow([['a',t('o.spanA')],['b',t('o.spanB')],['c',t('o.spanC')],['d',t('o.spanD')]],S.obs['span'+k],v=>{S.obs['span'+k]=v;save();render()}),writeField('B_beob_'+k,{rows:3,ph2:220}))),navBar('B_deut'));
PAGES.B_deut=()=>pg(h('h1',{},t('ex.B')),aufgabe('B_deut'),h('div',{class:'card'},writeField('B_deut',{rows:5,ph2:340})),navBar(null,{onNext:()=>finishExp('B'),label:t('ui.done'),cls:'ok'}));

/* ---------- Hypothesenfenster ---------- */
function obsText(k,ex){const o=S.obs;if(ex==='A')return{R:o.turbR?(o.turbR==='yes'?t('o.turbYes'):t('o.turbNo')):'–',A:o.turbA?(o.turbA==='yes'?t('o.turbYes'):t('o.turbNo')):'–'}[k];
  const sp=v=>({a:t('o.spanA'),b:t('o.spanB'),c:t('o.spanC'),d:t('o.spanD')}[v]||'–');const cd=v=>v==='stream'?t('o.stream'):v==='still'?t('o.still'):'';return k==='R'?sp(o.spanR)+(o.condR?' ('+cd(o.condR)+')':''):sp(o.spanA)+(o.condA?' ('+cd(o.condA)+')':'')}
function hypBox(){const f=S.fields.hyp||{};return h('div',{class:'card task'},h('b',{},t('hf.mine')+': '),(S.fields.gases&&S.fields.gases.text)?h('div',{class:'small'},S.fields.gases.text):'',f.text?h('div',{style:{whiteSpace:'pre-wrap'}},f.text):'',f.img?h('img',{src:f.img,style:{maxWidth:'100%',maxHeight:'140px',border:'1px solid #ccc',borderRadius:'8px'}}):'',(!f.text&&!f.img)?h('i',{},t('ui.nohyp')):'')}
PAGES.hypfenster=()=>pg(h('h1',{},t('hf.title')),aufgabe('hypfenster'),hypBox(),h('div',{class:'card'},h('h3',{},t('hf.res')),h('table',{class:'t'},h('tr',{},h('th',{},t('fz.test')),h('th',{},t('ui.room')),h('th',{},t('ui.breath'))),
   h('tr',{},h('td',{},t('nw.kw')),h('td',{},obsText('R','A')),h('td',{},obsText('A','A'))),h('tr',{},h('td',{},t('nw.gs')),h('td',{},obsText('R','B')),h('td',{},obsText('A','B'))))),
  h('div',{class:'card'},h('h3',{},t('hf.q')),radioRow([['yes',t('fz.confirmed')],['part',t('fz.partly')],['no',t('fz.notconf')],['unk',t('fz.unclear')]],S.hypRes,v=>{S.hypRes=v;save();render()}),writeField('hypfenster',{rows:4,ph2:260,label:t('fz.because')})),
  h('div',{class:'card',style:{background:'#fff0ee',display:'flex',gap:'12px',alignItems:'center',flexWrap:'wrap'}},h('b',{},'💾 '+t('hf.remind')),h('button',{class:'ok',onclick:openExport},t('ui.saveNow'))),
  navBar(null,{onNext:()=>{S.hypSeen=true;save();go('uebersicht');Bunsi.say('happy',t('f.cdUnlock'))},label:t('ui.toOverview')}));

/* ---------- Versuch C ---------- */
PAGES.C_idee=()=>pg(h('h1',{},t('ex.C')),h('div',{class:'card task'},htmlP(t('c.idee'))),h('div',{class:'card'},h('h3',{},t('c.ideaFill')),writeField('C_idee',{rows:4,ph2:260})),navBar('C_durch'));
let _cSeries='r';
PAGES.C_durch=()=>{const take=v=>{const arr=S.kerze[_cSeries];let i=arr.findIndex(x=>x===''||x==null);if(i<0)i=arr.length-1;arr[i]=v;save();render()};
  return pg(h('h1',{},t('ex.C')),warnBanner('b.C_durch'),aufgabe('C_durch'),fillAnim(true),helpToggle(t('an.candleHelp'),candleAnim),...tipCards(),h('div',{class:'card'},h('b',{},t('p.descDurch')),writeField('C_durchb',{rows:3,ph2:220})),navBar('C_beob'))};
function kerzeTable(){const mean=a=>{const v=a.filter(x=>x!==''&&!isNaN(+x)).map(Number);return v.length?(v.reduce((s,x)=>s+x,0)/v.length).toFixed(1):'–'};
  const cell=(k,i)=>h('td',{},h('input',{class:'num',type:'number',step:'0.1',value:S.kerze[k][i],onchange:e=>{S.kerze[k][i]=e.target.value;save();render()}}));
  return h('div',{class:'card'},h('table',{class:'t'},h('tr',{},h('th',{},t('p.measure')),h('th',{},t('ui.room')+' ('+t('p.seconds')+')'),h('th',{},t('ui.breath')+' ('+t('p.seconds')+')')),
   [0,1,2].map(i=>h('tr',{},h('td',{},i+1),cell('r',i),cell('a',i))),h('tr',{},h('th',{},t('p.mean')),h('th',{},mean(S.kerze.r)),h('th',{},mean(S.kerze.a)))))}
PAGES.C_beob=()=>{const take=v=>{const arr=S.kerze[_cSeries];let i=arr.findIndex(x=>x===''||x==null);if(i<0)i=arr.length-1;arr[i]=v;save();render()};return pg(h('h1',{},t('ex.C')),aufgabe('C_beob'),h('div',{class:'card'},airRow(_cSeries,v=>{_cSeries=v;render()})),h('div',{class:'airwrap '+(_cSeries==='r'?'wr':'wa')},stopwatch(take),kerzeTable()),h('div',{class:'card'},writeField('C_beob',{rows:4,ph2:260})),navBar('C_deut'))};
PAGES.C_deut=()=>pg(h('h1',{},t('ex.C')),aufgabe('C_deut'),h('div',{class:'card'},writeField('C_deut',{rows:5,ph2:340})),navBar(null,{onNext:()=>finishExp('C'),label:t('ui.done'),cls:'ok'}));

/* ---------- Versuch D ---------- */
PAGES.D_aufbau=()=>pg(h('h1',{},t('ex.D')),aufgabe('D_aufbau'),steelAnim({static:true}),h('div',{class:'card',style:{background:'#fffbe6'}},h('b',{},'ℹ️ '),htmlP(t('d.info'))),h('div',{class:'card'},writeField('D_aufbau',{rows:4,ph2:260})),navBar('D_durch'));
PAGES.D_durch=()=>{const air=SW().air;const sv=SW()[air];const vin=(k,lbl)=>h('label',{style:{fontWeight:700}},t(lbl)+' ',h('input',{class:'num',type:'number',step:'0.5',value:sv[k],onchange:e=>{sv[k]=e.target.value;save();render()}}));
  const vols=h('div',{style:{display:'flex',gap:'18px',flexWrap:'wrap',alignItems:'center',margin:'8px 0'}},vin('v0','d.v0'),vin('v1','d.v1'),h('b',{},swInfo(air)));
  return pg(h('h1',{},t('ex.D')),aufgabe('D_durch'),h('div',{class:'airwrap '+(air==='r'?'wr':'wa')},steelAnim({air,top:airRow(air,v=>{SW().air=v;save();render()}),vols})),
  h('div',{class:'card'},h('h3',{},t('p.keepObs')),writeField('D_beob',{rows:4,ph2:260})),h('div',{class:'card'},h('b',{},t('p.descDurch')),writeField('D_durchb',{rows:3,ph2:220})),navBar('D_deut'))};
function swInfo(air){air=air||SW().air;const a=parseFloat(SW()[air].v0),b=parseFloat(SW()[air].v1);if(isNaN(a)||isNaN(b)||a<=0)return '';const d=a-b;return `Δ = ${d.toFixed(1)} ml = ${(100*d/a).toFixed(0)} %`}
PAGES.D_deut=()=>pg(h('h1',{},t('ex.D')),aufgabe('D_deut'),h('div',{class:'card'},writeField('D_deut',{rows:5,ph2:340})),navBar(null,{onNext:()=>finishExp('D'),label:t('ui.done'),cls:'ok'}));

/* ---------- Fazit ---------- */
function meanArr(a){const v=a.filter(x=>x!==''&&!isNaN(+x)).map(Number);return v.length?(v.reduce((s,x)=>s+x,0)/v.length).toFixed(1)+' s':'–'}
function fazitRows(){const r=[];const dn=e=>S.done[e];
  if(dn('A'))r.push([t('nw.kw'),obsText('R','A'),obsText('A','A')]);if(dn('B'))r.push([t('nw.gs'),obsText('R','B'),obsText('A','B')]);
  if(dn('C'))r.push([t('ex.C').replace(/^[^:]*: /,''),meanArr(S.kerze.r),meanArr(S.kerze.a)]);
  if(dn('D'))r.push([t('ex.D').replace(/^[^:]*: /,''),swInfo('r')||'–',swInfo('a')||'–']);return r}
PAGES.fazit=()=>{const n=['A','B','C','D'].filter(e=>S.done[e]).length;
  return pg(h('h1',{},t('fz.title')),h('div',{class:'card'},t('fz.done',{n}),' ',(n<4&&S.done.A&&S.done.B)?h('button',{class:'small sec',onclick:()=>go('uebersicht')},t('fz.moreEx')):''),aufgabe('fazit'),
  h('div',{class:'card'},h('h3',{},t('fz.table')),h('table',{class:'t'},h('tr',{},h('th',{},t('fz.test')),h('th',{},t('ui.room')),h('th',{},t('ui.breath'))),fazitRows().map(r=>h('tr',{},r.map(c=>h('td',{},c))))),
    h('p',{class:'note'},t('fz.note'))),hypBox(),
  h('div',{class:'card'},h('h3',{},t('fz.back')),radioRow([['yes',t('fz.confirmed')],['part',t('fz.partly')],['no',t('fz.notconf')],['unk',t('fz.unclear')]],S.hypRes,v=>{S.hypRes=v;save();render()}),h('h3',{},t('fz.answer')),writeField('fazit',{rows:6,ph2:380})),
  h('div',{class:'card',style:{background:'#fff0ee',display:'flex',gap:'12px',alignItems:'center',flexWrap:'wrap'}},h('b',{},'💾 '+t('fz.remind')),h('button',{class:'ok',onclick:openExport},'📄 '+t('ui.export'))),
  navBar('abgleich',{label:t('ab.toAb')}))};
PAGES.abgleich=()=>{const f=S.fields.fazit||{};const ref=[[t('ui.room'),'≈ 21 % O₂','≈ 0,04 % CO₂'],[t('ui.breath'),'≈ '+CFG.O2_ATEMLUFT+' O₂','≈ '+CFG.CO2_ATEMLUFT+' CO₂']];
  return pg(h('h1',{},t('ab.title')),aufgabe('abgleich'),h('div',{class:'card'},h('h3',{},t('ab.mine')),f.text?h('div',{style:{whiteSpace:'pre-wrap'}},f.text):h('p',{class:'note'},'–'),f.img?h('img',{src:f.img,style:{maxWidth:'100%',maxHeight:'200px'}}):''),
  h('div',{class:'card'},h('h3',{},t('ab.ref')),h('table',{class:'t'},h('tr',{},h('th',{},''),h('th',{},t('ab.o2')),h('th',{},t('ab.co2'))),ref.map(r=>h('tr',{},r.map(c=>h('td',{},c))))),h('p',{class:'note'},t('ab.src'))),
  h('div',{class:'card'},h('h3',{},t('ab.q')),radioRow([['yes',t('ab.yes')],['part',t('ab.part')],['no',t('ab.no')]],S.realRes,v=>{S.realRes=v;save();render()}),h('h3',{},t('ab.why')),writeField('abgleich',{rows:5,ph2:300})),
  h('div',{class:'card',style:{background:'#fff0ee',display:'flex',gap:'12px',alignItems:'center',flexWrap:'wrap'}},h('b',{},'💾 '+t('fz.remind')),h('button',{class:'ok',onclick:openExport},'📄 '+t('ui.export'))),
  navBar('uebersicht',{label:t('ui.toOverview')}))};

/* Sicherheits-Erinnerung (Schutzbrille/Haare) vor B, C, D */
['B_durch','C_durch'].forEach(id=>{const f=PAGES[id];if(!f)return;const ex=id[0];PAGES[id]=()=>{needSafety(ex,['brille']);return f()}});
{const f=PAGES.uebersicht;PAGES.uebersicht=()=>{needSafety('ready',['ready']);return f()}}
