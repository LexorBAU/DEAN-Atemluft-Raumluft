'use strict';
/* ===================== KERN: Zustand, Hilfsfunktionen, Navigation ===================== */
const LANGIDX={de:0,fa:1,tr:2};
const LS_KEY='dean_raumluft_entwurf_v1';
function DEF(){return{lang:'de',page:'lang',hist:[],fields:{},gases:[],nw:[],knallAsked:false,planOK:false,mat:{},matOK:false,
 done:{A:false,B:false,C:false,D:false},teacher:false,okA:false,sketch:{items:[],links:[],seq:1,ok:false},hypSeen:false,cdShown:false,
 obs:{turbR:'',turbA:'',spanR:'',spanA:'',condR:'',condA:''},kerze:{r:['','',''],a:['','','']},sw:{air:'r',r:{v0:'',v1:''},a:{v0:'',v1:''}},
 helpStep:{},hypRes:'',fzRes:'',names:'',started:{},expLast:{},realRes:'',matChecked:false,lastExp:null}}
let S=DEF();
function load(){try{const j=localStorage.getItem(LS_KEY);if(j){S=Object.assign(DEF(),JSON.parse(j));}}catch(e){}}
function flushSave(){try{localStorage.setItem(LS_KEY,JSON.stringify(S))}catch(e){}}
addEventListener('pagehide',flushSave);document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='hidden')flushSave()});
let _st;function save(){clearTimeout(_st);_st=setTimeout(()=>{try{localStorage.setItem(LS_KEY,JSON.stringify(S))}catch(e){}},250)}
function t(k,v){const a=T[k];if(!a)return '⟦'+k+'⟧';let s=a[LANGIDX[S.lang]]||a[0];if(v)for(const x in v)s=s.replace('{'+x+'}',v[x]);return s}
function frage(){return FRAGESTELLUNG[LANGIDX[S.lang]]||FRAGESTELLUNG[0]}
function esc(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}
function markHTML(s){return esc(s).replace(/\[PLATZHALTER\]/g,'<span class="ph-mark">[PLATZHALTER]</span>').replace(/\[PRÜFEN([^\]]*)\]/g,'<span class="pm">[PRÜFEN$1]</span>')}
function h(tag,attrs,...kids){const e=document.createElement(tag);for(const k in(attrs||{})){const v=attrs[k];if(v===false||v==null)continue;
  if(k==='class')e.className=v;else if(k==='html')e.innerHTML=v;else if(k==='style'&&typeof v==='object')Object.assign(e.style,v);
  else if(k.slice(0,2)==='on')e.addEventListener(k.slice(2),v);else e.setAttribute(k,v===true?'':v)}
 kids.flat(Infinity).forEach(c=>{if(c==null||c===false)return;e.append(c.nodeType?c:document.createTextNode(c))});return e}
const $=s=>document.querySelector(s);
function htmlP(s,cls){return h('p',{class:cls||'',html:markHTML(s)})}
function aufgabe(key){const txt=AUFG[key];if(!txt)return null;return h('div',{class:'card task'+(/\[PLATZHALTER\]/.test(txt)?' ph':'')},h('div',{style:{fontWeight:800,marginBottom:'4px'}},t('ui.task')),h('div',{html:markHTML(txt)}))}

/* ---------- Seiten-Konfiguration: Zuordnung zu den fünf Schritten (Rad) ----------
   0 Fragestellung · 1 Hypothese · 2 Durchführung · 3 Beobachtung · 4 Auswertung
   Planung und Versuchsübersicht gehören zu Schritt 2 (Planung und Durchführung). */
const STEP_OF={lang:null,intro:null,frage:0,hyp:1,info_luft:1,info_stoff:1,plan:2,uebersicht:2,
 A_skizze:2,A_ok:2,A_durch:2,A_beob:3,A_deut:4,B_durch:2,B_beob:3,B_deut:4,hypfenster:4,
 C_idee:2,C_durch:2,C_beob:3,C_deut:4,D_aufbau:2,D_durch:2,D_deut:4,fazit:4,abgleich:4};
const EXP_PAGES={A:['A_skizze','A_ok','A_durch','A_beob','A_deut'],B:['B_durch','B_beob','B_deut'],C:['C_idee','C_durch','C_beob','C_deut'],D:['D_aufbau','D_durch','D_deut']};
const PAGE_EXP={};for(const e in EXP_PAGES)EXP_PAGES[e].forEach(p=>PAGE_EXP[p]=e);
const PAGE_LABEL={A_skizze:'Aufbau',A_ok:'OK',A_durch:'Durchführung',A_beob:'Beobachtung',A_deut:'Deutung',B_durch:'Aufbau & Durchführung',B_beob:'Beobachtung',B_deut:'Deutung',C_idee:'Idee',C_durch:'Durchführung',C_beob:'Beobachtung',C_deut:'Deutung',D_aufbau:'Aufbau',D_durch:'Durchführung',D_deut:'Deutung'};
const PAGE_LABEL_T={Aufbau:['Aufbau','چیدمان','Düzenek'],OK:['OK der Lehrkraft','تأیید معلم','Öğretmen onayı'],Durchführung:['Durchführung','اجرا','Uygulama'],Beobachtung:['Beobachtung','مشاهده','Gözlem'],Deutung:['Deutung','تفسیر','Yorum'],Idee:['Idee','ایده','Fikir'],'Aufbau & Durchführung':['Aufbau & Durchführung','چیدمان و اجرا','Düzenek ve uygulama']};
function plabel(p){const a=PAGE_LABEL_T[PAGE_LABEL[p]];return a?(a[LANGIDX[S.lang]]||a[0]):p}
const NOIDLE={uebersicht:1,lang:1,A_durch:1,B_durch:1,C_durch:1,D_durch:1};

function expUnlockedCD(){return(S.done.A&&S.done.B)||S.teacher}
function go(id,opt){opt=opt||{};if(!opt.noHist&&S.page!==id)S.hist.push(S.page);if(PAGE_EXP[id]){S.expLast=S.expLast||{};S.expLast[PAGE_EXP[id]]=id}if(S.hist.length>60)S.hist.shift();S.page=id;
  if(PAGE_EXP[id])S.started[PAGE_EXP[id]]=true;save();render();$('#content').scrollTop=0}
function back(){const p=S.hist.pop();if(p){S.page=p;save();render();$('#content').scrollTop=0}}
function navBar(nextId,opts){opts=opts||{};
  return h('div',{class:'nav'},S.hist.length&&!opts.noBack?h('button',{class:'sec',onclick:back},S.lang==='fa'?'→ ':'← ',t('ui.back')):h('span'),
   opts.extra||null,nextId||opts.onNext?h('button',{class:opts.cls||'',disabled:opts.disabled,onclick:()=>{opts.onNext?opts.onNext():go(nextId)}},opts.label||t('ui.next'),S.lang==='fa'?' ←':' →'):h('span'))}

/* ---------- Schreibfeld: Tastatur + Stift (Bild wird gespeichert) ---------- */
function writeField(id,o){o=o||{};const f=S.fields[id]||(S.fields[id]={text:'',img:''});
  const wrap=h('div',{class:'wf'});const FA=S.lang==='fa';let mode=(FA||(f.img&&!f.text))?'pen':'kb',eraser=false;
  const ta=h('textarea',{rows:o.rows||4,placeholder:o.ph||'',oninput:()=>{f.text=ta.value;save()}});ta.value=f.text||'';
  const H=o.ph2||300;const cv=h('canvas',{width:1100,height:H,style:{aspectRatio:'1100/'+H}});const ctx=cv.getContext('2d');
  if(f.img){const im=new Image();im.onload=()=>ctx.drawImage(im,0,0);im.src=f.img}
  ctx.lineCap='round';ctx.lineJoin='round';
  let drawing=false,lx=0,ly=0;
  const pos=e=>{const r=cv.getBoundingClientRect();return[(e.clientX-r.left)*cv.width/r.width,(e.clientY-r.top)*cv.height/r.height]};
  cv.addEventListener('pointerdown',e=>{e.preventDefault();cv.setPointerCapture(e.pointerId);drawing=true;[lx,ly]=pos(e);ctx.beginPath();ctx.arc(lx,ly,1,0,6.3)});
  cv.addEventListener('pointermove',e=>{if(!drawing)return;e.preventDefault();const[x,y]=pos(e);ctx.globalCompositeOperation=eraser?'destination-out':'source-over';
    ctx.strokeStyle='#14181c';ctx.lineWidth=eraser?26:(e.pointerType==='pen'&&e.pressure?1.5+e.pressure*4:3.2);ctx.beginPath();ctx.moveTo(lx,ly);ctx.lineTo(x,y);ctx.stroke();lx=x;ly=y});
  const up=()=>{if(!drawing)return;drawing=false;ctx.globalCompositeOperation='source-over';f.img=cv.toDataURL('image/png');save()};
  cv.addEventListener('pointerup',up);cv.addEventListener('pointercancel',up);
  const bKb=h('button',{class:'small sec',onclick:()=>{mode='kb';upd()}},'⌨ ',t('ui.keyboard'));
  const bPen=h('button',{class:'small sec',onclick:()=>{mode='pen';upd()}},'✎ ',t('ui.pen'));
  const bEr=h('button',{class:'small sec',onclick:()=>{eraser=!eraser;upd()}},'⌫ ',t('ui.eraser'));
  const bCl=h('button',{class:'small sec',onclick:()=>{ctx.clearRect(0,0,cv.width,cv.height);f.img='';save()}},'🗑 ',t('ui.clear'));
  const tabs=h('div',{class:'tabs'},bKb,bPen,bEr,bCl);
  function upd(){bKb.style.display=bPen.style.display=FA?'none':'';ta.style.display=(mode==='kb'&&!FA)?'':'none';cv.style.display=mode==='pen'?'':'none';bEr.style.display=bCl.style.display=mode==='pen'?'':'none';
    bKb.style.background=mode==='kb'?'#dff3ee':'';bPen.style.background=mode==='pen'?'#dff3ee':'';bEr.style.background=eraser?'#ffe3a3':''}
  upd();wrap.append(o.label?h('div',{class:'small'},o.label):'',tabs,ta,cv);return wrap}

/* ---------- Bilder (eingebettet, siehe Assets) ---------- */
function bunsiSrc(name){return ASSETS.bunsi[name]||ASSETS.bunsi.neutral}

function SW(){if(!S.sw||!S.sw.r)S.sw={air:'r',r:{v0:(S.sw&&S.sw.v0)||'',v1:(S.sw&&S.sw.v1)||''},a:{v0:'',v1:''}};return S.sw}
