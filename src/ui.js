/* ===================== UI: Kopf, Rad, Bunsi, Menü, Dialoge ===================== */
let curRot=0,lastAct=Date.now();
function setLang(l){S.lang=l;document.documentElement.lang=l;document.documentElement.dir=l==='fa'?'rtl':'ltr';save()}
function updateWheel(){const w=$('#wheelc');if(!w)return;const st=STEP_OF[S.page];const rot=w.querySelector('.rot');
  if(st==null||st===undefined){w.style.display='none';$('#stepname').style.visibility='hidden';return}
  w.style.display='';w.setAttribute('data-a',st);const tgt=-135-72*st;let d=((tgt-curRot)%360+540)%360-180;curRot+=d;rot.style.transform='rotate('+curRot+'deg)';w.style.setProperty('--cr',-curRot);
  const sn=$('#stepname');sn.style.visibility='visible';sn.textContent=(st+1)+' · '+t('step.'+st)}
function buildChrome(){const app=$('#app');app.innerHTML='';
  const hd=h('header',{},h('div',{class:'ttl'},h('span',{id:'ttl'},t('ui.title')),h('small',{id:'sub'},'')),h('div',{id:'stepname'},''));
  const wc=h('button',{id:'wheelc',title:t('ui.menu'),onclick:openMenu,'aria-label':t('ui.menu')},h('div',{class:'rot',html:ASSETS.radCorner}));
  const side=h('div',{id:'side'},h('div',{id:'bubble',onclick:e=>{if(e.target.closest('button'))return;$('#bubble').classList.toggle('min')}}),h('div',{id:'bunsi'},h('img',{alt:'Bunsi',src:bunsiSrc('neutral')})),
   h('button',{class:'hbtn sec',id:'helpbtn',onclick:()=>Bunsi.help()},'💡 ',t('ui.help')));
  app.append(hd,wc,h('main',{},side,h('div',{id:'frame'},h('div',{id:'content'}),h('div',{id:'foot'}))))}

/* ---------- Bunsi ---------- */
const Bunsi={expr:'neutral',blink:false,
  img(){const k=(this.blink&&ASSETS.bunsi[this.expr+'_blink'])?this.expr+'_blink':this.expr;const im=$('#bunsi img');if(im)im.src=bunsiSrc(k)},
  say(expr,text,btns){this.expr=ASSETS.bunsi[expr]?expr:'neutral';this.blink=false;this.img();const b=$('#bubble');if(!b)return;b.innerHTML='';b.style.display=text?'':'none';
    b.classList.remove('min');b.classList.toggle('wide',text.length>110||!!(btns&&btns.length));b.classList.remove('flash');void b.offsetWidth;b.classList.add('flash');b.append(h('div',{html:markHTML(text)}));if(btns&&btns.length)b.append(h('div',{class:'btns'},btns.map(x=>h('button',{class:'small '+(x.cls||''),onclick:x.fn},x.label))));
    const hb=$('#helpbtn');if(hb)hb.textContent='💡 '+t('ui.help')},
  help(){const p=S.page;const c=HELP(p);if(!c){this.say('explain',t(INTRO[p]?INTRO[p][1]:'b.idle'));return}
    const n=S.helpStep[c.id]||0;
    if(n<c.h.length){S.helpStep[c.id]=n+1;save();this.say('thinking',t(c.h[n]),[{label:t('ui.help')+' ›',fn:()=>this.help()}])}
    else if(c.sol){this.say('wink',t('ui.askSol'),[{label:t('ui.yes'),cls:'ok',fn:()=>{S.helpStep[c.id]=0;save();if(Array.isArray(c.sol)){this.say('explain',t(c.sol[0]),[{label:t('sf.next')+' ›',cls:'ok',fn:()=>this.say('explain',t(c.sol[1]))}])}else this.say('explain',t(c.sol));if(c.act)c.act()}},{label:t('ui.no'),cls:'sec',fn:()=>{S.helpStep[c.id]=0;save();this.help()}}])}
    else this.say('neutral',t('b.idle'))},
  intro(){const p=S.page;if(p==='lang'&&!window._jumped){window._jumped=1;bunsiJump();return}let it=INTRO[p];if(typeof it==='function')it=it();if(!it)return;this.say(it[0],t(it[1]))}};
const INTRO={abgleich:['thinking','b.abgleich'],lang:['neutral','b.lang'],intro:['explain','b.intro2'],frage:['thinking','b.frage'],hyp:['explain','b.hyp'],
 info_luft:['explain','b.hyp'],info_stoff:['explain','b.hyp'],
 plan:()=>S.planOK?['happy','b.planOK']:['thinking','b.plan'],uebersicht:()=>(S.hypSeen&&expUnlockedCD())?['happy','f.cdUnlock']:['happy','b.uebersicht'],
 A_skizze:['explain','b.A_skizze'],A_ok:()=>S.okA?['happy','p.okGiven']:['happy','b.A_ok'],A_durch:['warning','b.A_warn'],A_beob:['explain','b.beob'],A_deut:['thinking','b.deut'],
 B_durch:['warning','b.B_warn'],B_beob:['explain','b.beob'],B_deut:['thinking','b.deut'],hypfenster:['proud','b.hypfenster'],
 C_idee:['thinking','b.C_idee'],C_durch:['warning','b.C_durch'],C_beob:['explain','b.beob'],C_deut:['thinking','b.deut'],
 D_aufbau:['explain','b.D_aufbau'],D_durch:['explain','b.D_durch'],D_deut:['thinking','b.deut'],fazit:['proud','b.fazit']};
function HELP(p){
  if(p==='hyp'||p==='info_luft'||p==='info_stoff')return{id:'hyp',h:['h.hyp.1','h.hyp.2'],sol:['s.hyp.gas','s.hyp.hyp']};
  if(p==='plan')return S.planOK?{id:'mat',h:['h.mat.1','h.mat.2'],sol:'s.mat',act:()=>showPhoto('einzel')}:{id:'plan',h:['h.plan.1','h.plan.2'],sol:'s.plan'};
  if(p==='A_skizze')return{id:'A_skizze',h:['h.A_skizze.1','h.A_skizze.2'],sol:'s.A_skizze',act:()=>showPhoto('aufgebaut')};
  if(p==='A_durch')return{id:'A_durch',h:['h.A_durch.1','h.A_durch.2'],sol:'s.A_durch',act:()=>showVideo('ballon')};
  if(p==='B_durch')return{id:'B_durch',h:['h.B_durch.1','h.B_durch.2'],sol:'s.B_durch',act:()=>showVideo('glimm')};
  if(p==='C_idee')return{id:'C_idee',h:['h.C_idee.1','h.C_idee.2'],sol:'s.C_idee'};
  if(p==='D_durch')return{id:'D_durch',h:['h.D_durch.1','h.D_durch.2'],sol:'s.D_durch'};
  if(/_beob$/.test(p))return{id:'beob_'+p,h:['h.beob.1','h.beob.2'],sol:'s.beob'};
  if(/_deut$/.test(p))return{id:'deut_'+p,h:['h.deut.1','h.deut.2'],sol:'s.deut'};
  return null}
function blinkLoop(){setTimeout(()=>{if(!ASSETS.bunsi[Bunsi.expr+'_blink']){blinkLoop();return}
  Bunsi.blink=true;Bunsi.img();setTimeout(()=>{Bunsi.blink=false;Bunsi.img();
    if(Math.random()<.12)setTimeout(()=>{Bunsi.blink=true;Bunsi.img();setTimeout(()=>{Bunsi.blink=false;Bunsi.img()},120)},180)},140);blinkLoop()},2200+Math.random()*5200)}
function idleLoop(){const bump=()=>{lastAct=Date.now()};['pointerdown','keydown','touchstart'].forEach(e=>document.addEventListener(e,bump,{passive:true}));
  setInterval(()=>{if(NOIDLE[S.page]||document.querySelector('.overlay'))return;if(Date.now()-lastAct>CFG.IDLE_SEKUNDEN*1000){lastAct=Date.now();
    Bunsi.say('wink',t('b.idle'),[{label:t('ui.idleBtn'),cls:'ok',fn:()=>Bunsi.help()},{label:t('ui.noThanks'),cls:'sec',fn:()=>Bunsi.intro()}])}},5000)}

/* ---------- Dialoge ---------- */
function closeModal(){document.querySelectorAll('.overlay').forEach(o=>o.remove())}
function modal(title,body,opt){opt=opt||{};closeModal();const m=h('div',{class:'modal'},title?h('h2',{},title):null,body,h('div',{style:{marginTop:'14px',textAlign:'end'}},h('button',{onclick:()=>{closeModal();opt.onClose&&opt.onClose()}},t('ui.close'))));
  const o=h('div',{class:'overlay',onclick:e=>{if(e.target===o)closeModal()}},m);document.body.append(o);return m}
function askPw(onOK,msgKey){const inp=h('input',{type:'password',placeholder:t('ui.pw'),autocomplete:'off'});const msg=h('div',{class:'note'},'');
  const m=modal(t('ui.teacher'),h('div',{},inp,' ',h('button',{onclick:()=>{if(inp.value===CFG.LEHRER_PASSWORT){closeModal();onOK()}else msg.textContent=t('f.pwWrong')}},t('ui.unlock')),msg));setTimeout(()=>inp.focus(),50)}
function showPhoto(k){modal(t('ui.photo'),h('div',{style:{textAlign:'center'}},h('img',{class:'photo',src:ASSETS.photo[k],style:{maxHeight:'68vh'}})))}
const _urls={};
function showVideo(k){const v=h('video',{controls:true,playsinline:true,preload:'none'});
  if(!_urls[k]){const bin=atob(ASSETS.video[k]);const a=new Uint8Array(bin.length);for(let i=0;i<bin.length;i++)a[i]=bin.charCodeAt(i);_urls[k]=URL.createObjectURL(new Blob([a],{type:'video/mp4'}))}
  v.src=_urls[k];modal(t('ui.video'),h('div',{class:'vidwrap'},v))}
function videoBtn(k,label){return h('button',{class:'sec',onclick:()=>showVideo(k)},'▶ ',label||t('ui.video'))}

/* ---------- Menü (Tipp aufs Rad) ---------- */
function openMenu(){
  const hy=(S.fields.hyp&&(S.fields.hyp.text||S.fields.hyp.img))?S.fields.hyp:null;
  const toc=h('div',{class:'toc'});const st0=(STEP_OF[S.page]!=null)?STEP_OF[S.page]:0;
  toc.append(h('div',{html:ASSETS.radFull[st0],style:{width:'min(100%,320px)',margin:'0 auto 10px'}}));
  toc.append(h('div',{class:'hyp'},h('b',{},t('ui.myhyp')),h('div',{},hy?(hy.text?hy.text:h('img',{src:hy.img,style:{maxWidth:'100%',maxHeight:'90px'}})):h('i',{},t('ui.nohyp')))));
  const lk=(id,label,cls)=>h('a',{class:(cls||'')+(S.page===id?' cur':''),onclick:()=>{closeModal();go(id)}},label);
  toc.append(lk('intro','🎡 '+t('ui.way')));
  toc.append(lk('frage',t('p.frageTitle')),lk('hyp',t('p.hypTitle')),lk('plan',t('p.planTitle')));
  if(S.planOK)toc.append(lk('uebersicht','▦ '+t('ui.choice')));
  const ex=PAGE_EXP[S.page]||S.lastExp;
  if(ex&&S.planOK){toc.append(h('div',{class:'small',style:{margin:'8px 0 0'}},t('ex.'+ex)));EXP_PAGES[ex].forEach(p=>toc.append(lk(p,plabel(p),'sub')))}
  if(S.hypSeen||(S.done.A&&S.done.B))toc.append(lk('hypfenster',t('hf.title')));
  if(S.done.A||S.done.B||S.done.C||S.done.D){toc.append(lk('fazit',t('fz.title')));toc.append(lk('abgleich',t('ab.title')))}
  const langs=h('div',{style:{display:'flex',gap:'8px',flexWrap:'wrap',margin:'10px 0'}},['de','fa','tr'].map(l=>h('button',{class:S.lang===l?'':'sec',onclick:()=>{setLang(l);closeModal();buildChrome();render();openMenu()}},{de:'Deutsch',fa:'فارسی',tr:'Türkçe'}[l])));
  const tools=h('div',{style:{display:'flex',gap:'8px',flexWrap:'wrap',marginTop:'10px'}},
    h('button',{class:'ok',onclick:()=>{closeModal();openExport()}},'📄 ',t('ui.export')),
    h('button',{class:'sec',onclick:()=>askPw(()=>{S.teacher=true;save();closeModal();Bunsi.say('happy',t('f.unlocked'));render()})},'🔑 ',t('ui.teacher')+(S.teacher?' ✓':'')),
    h('button',{class:'sec warn',style:{color:'#fff'},onclick:()=>{if(confirm(t('ui.resetq'))){try{localStorage.removeItem(LS_KEY)}catch(e){}S=DEF();closeModal();buildChrome();render()}}},t('ui.reset')));
  modal(t('ui.menu'),h('div',{},h('h3',{},t('ui.toc')),toc,h('h3',{},t('ui.lang')),langs,tools))}

/* Einsprung: Bunsi hüpft wie die Pixar-Lampe von links ins Bild, winkt, stellt sich vor und geht dann an seinen Platz */
function bunsiJump(){const side=$('#bunsi img');const ov=h('div',{id:'jump'},h('div',{class:'jb'},t('b.intro1')),h('img',{src:bunsiSrc('neutral')}));document.body.append(ov);
  const im=ov.querySelector('img');const sideBox=side?side.getBoundingClientRect():null;if(side)side.style.visibility='hidden';
  let n=0,wv=null,done=false,tm=[];
  tm.push(setTimeout(()=>{im.src=bunsiSrc('happy');wv=setInterval(()=>{n++;im.src=bunsiSrc(n%2?'wave':'wave2')},300)},2500));
  function finish(){if(done)return;done=true;tm.forEach(clearTimeout);clearInterval(wv);im.src=bunsiSrc('happy');ov.classList.add('leave');
    if(sideBox){const r=im.getBoundingClientRect();const sc=sideBox.height/r.height;im.style.animation='none';im.style.transition='transform .9s ease-in-out';im.style.transform=`translate(${sideBox.left+sideBox.width/2-(r.left+r.width/2)}px,${sideBox.top+sideBox.height/2-(r.top+r.height/2)}px) scale(${sc})`}
    ov.querySelector('.jb').style.opacity=0;
    setTimeout(()=>{ov.remove();if(side)side.style.visibility='';Bunsi.say('neutral',t('b.lang'))},1000)}
  tm.push(setTimeout(finish,9500));ov.addEventListener('click',finish)}
