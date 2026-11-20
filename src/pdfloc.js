/* ===================== PDF in Persisch/Türkisch: Seiten werden mit dem Browser gesetzt (Schrift, Schreibrichtung) und als Bild in das PDF eingebettet ===================== */
const PT={
 title:["Versuchsprotokoll: Raumluft und Atemluft im Vergleich","گزارش آزمایش: مقایسهٔ هوای اتاق (Raumluft) و هوای بازدم (Atemluft)","Deney raporu: Oda havası (Raumluft) ve soluk havası (Atemluft) karşılaştırması"],
 foot:["Protokoll Raumluft und Atemluft – ","گزارش: هوای اتاق و هوای بازدم – ","Rapor: Oda havası ve soluk havası – "],
 names:["Name(n): ","نام(ها): ","Ad(lar): "],date:["Datum: ","تاریخ: ","Tarih: "],
 frage:["Fragestellung","پرسش","Soru"],hyp:["Hypothese","فرضیه","Hipotez"],
 gases:["Gase, die ich kenne und nachweisen kann:","گازهایی که می‌شناسم و می‌توانم اثبات کنم:","Tanıdığım ve kanıtlayabildiğim gazlar:"],
 myhyp:["Meine Hypothese:","فرضیهٔ من:","Hipotezim:"],
 matdur:["Material und Durchführung","مواد و روش اجرا","Malzeme ve uygulama"],
 chosen:["Gewählte Gasnachweise: ","آزمون‌های گاز انتخاب‌شده: ","Seçilen gaz kanıtlama deneyleri: "],
 matkw:["Material Kalkwasserprobe: ","مواد آزمون آب آهک: ","Kireç suyu deneyi malzemesi: "],
 matgs:["Material Glimmspanprobe: ","مواد آزمون چوب شعله‌ور: ","Közlü çıra deneyi malzemesi: "],
 ziel:["Ziel: ","هدف: ","Amaç: "],
 A_ziel:["Nachweis von Kohlenstoffdioxid mit Kalkwasser in Raumluft und Atemluft.","اثبات دی‌اکسید کربن با آب آهک در هوای اتاق و هوای بازدم.","Oda havasında ve soluk havasında kireç suyu ile karbondioksit kanıtlama."],
 A_chem:["Chemikalie: Kalkwasser (Calciumhydroxid-Lösung).","ماده شیمیایی: آب آهک (محلول هیدروکسید کلسیم).","Kimyasal: Kireç suyu (kalsiyum hidroksit çözeltisi)."],
 B_ziel:["Prüfung von Raumluft und Atemluft mit dem glimmenden Span (Sauerstoffnachweis).","بررسی هوای اتاق و هوای بازدم با چوب شعله‌ور (اثبات اکسیژن).","Oda havasının ve soluk havasının közlü çıra ile incelenmesi (oksijen kanıtı)."],
 C_ziel:["Vergleich der Brenndauer einer Kerze unter einem Becherglas mit Raumluft und Atemluft (quasi quantitativ, ungenau aber real).","مقایسهٔ مدت سوختن یک شمع زیر بشر با هوای اتاق و هوای بازدم (تقریباً کمّی، نادقیق اما واقعی).","Beher altındaki bir mumun oda havası ve soluk havasıyla yanma süresinin karşılaştırılması (yaklaşık nicel, kesin değil ama gerçek)."],
 D_ziel:["Bestimmung des Sauerstoffanteils der Luft mit Stahlwolle und zwei Kolbenprobern (digitale Animation, nach Chemie aber sicher Nr. 2326).","تعیین سهم اکسیژن هوا با پشم فولاد و دو سرنگ گازی (انیمیشن دیجیتال، طبق «Chemie aber sicher» شمارهٔ ۲۳۲۶).","Çelik yünü ve iki gaz enjektörü ile havanın oksijen oranının belirlenmesi (dijital animasyon, Chemie aber sicher no. 2326’ya göre)."],
 aufb:["Aufbau","چیدمان","Düzenek"],durch:["Durchführung","اجرا","Uygulama"],
 aufbdesc:["Aufbau (meine Beschreibung):","چیدمان (توصیف من):","Düzenek (kendi açıklamam):"],
 mydesc:["Meine Beschreibung:","توصیف من:","Kendi açıklamam:"],
 C_aufb:["Becherglas, Kerze, Stoppuhr","بشر، شمع، کرنومتر","Beher, mum, kronometre"],
 D_aufb:["Stahlwolle, zwei Kolbenprober, Brenner (Animation)","پشم فولاد، دو سرنگ گازی، مشعل (انیمیشن)","Çelik yünü, iki gaz enjektörü, brülör (animasyon)"],
 beob:["Beobachtung","مشاهده","Gözlem"],
 turb:["Trübung","کدر شدن","Bulanıklık"],span:["Glimmspan","چوب شعله‌ور","Közlü çıra"],
 meas:["Messung","اندازه‌گیری","Ölçüm"],roomS:["Raumluft in s","هوای اتاق (ثانیه)","Oda havası (sn)"],airS:["Atemluft in s","هوای بازدم (ثانیه)","Soluk havası (sn)"],mean:["Mittelwert","میانگین","Ortalama"],
 vol:["Anfangsvolumen {a} ml, Endvolumen {b} ml","حجم اولیه {a} میلی‌لیتر، حجم نهایی {b} میلی‌لیتر","Başlangıç hacmi {a} ml, son hacim {b} ml"],
 deut:["Deutung / Erklärung","تفسیر / توضیح","Yorum / açıklama"],
 hypchk:["Hypothese überprüfen","بررسی فرضیه","Hipotezin kontrolü"],hypis:["Meine Hypothese ist: ","فرضیهٔ من: ","Hipotezim: "],
 fazit:["Fazit","نتیجه‌گیری","Sonuç"],answer:["Antwort auf die Fragestellung:","پاسخ به پرسش:","Soruya yanıt:"],
 real:["Abgleich mit der Realität","مقایسه با واقعیت","Gerçekle karşılaştırma"],
 realis:["Mein Fazit stimmt mit den Angaben im Infotext: ","نتیجه‌گیری من با اطلاعات متن اطلاعاتی: ","Sonucum bilgi metnindeki verilerle: "],
 yes:["überein","مطابقت دارد","uyuşuyor"],part:["teilweise überein","تا حدی مطابقت دارد","kısmen uyuşuyor"],no:["nicht überein","مطابقت ندارد","uyuşmuyor"],
 dev:["Vermutungen zu Abweichungen:","حدس‌ها دربارهٔ تفاوت‌ها:","Farklılıklar hakkında tahminler:"],
 made:["Erstellt mit dem digitalen Experimentierassistenten (DEAN), Entwurfsversion.","تهیه‌شده با دستیار دیجیتال آزمایش (DEAN)، نسخهٔ پیش‌نویس.","Dijital deney asistanı (DEAN) ile hazırlandı, taslak sürüm."],
 page:["Seite {i} von {n}","صفحهٔ {i} از {n}","Sayfa {i} / {n}"]};
class CanvasDoc{
 constructor(L){this.L=L;this.rtl=L===1;this.W=595.28;this.H=841.89;this.M=56;this.pages=[];this.imgs=[];this.mc=document.createElement('canvas').getContext('2d');this.newPage()}
 newPage(){this.cur=[];this.pages.push(this.cur);this.y=this.M+4}
 get cw(){return this.W-2*this.M}
 ensure(h){if(this.y+h>this.H-this.M-14)this.newPage()}
 font(sz,b){return (b?'700 ':'400 ')+sz+'px "Century Gothic","Segoe UI","Noto Sans","Noto Sans Arabic","Geeza Pro","Helvetica Neue",Arial,sans-serif'}
 tw(s,sz,b){this.mc.font=this.font(sz,b);return this.mc.measureText(s).width}
 wrap(s,sz,b,maxw){const out=[];String(s).split('\n').forEach(par=>{const words=par.split(' ');let line='';words.forEach(wd=>{const t=line?line+' '+wd:wd;if(this.tw(t,sz,b)<=maxw||!line)line=t;else{out.push(line);line=wd}});out.push(line)});return out}
 text(x,y,s,sz,b,col,al){this.cur.push({k:'t',x,y,s,sz,b,col:col||'#000000',al:al||(this.rtl?'r':'l')})}
 rect(x,y,w,h,fill,stroke,lw){this.cur.push({k:'r',x,y,w,h,fill,stroke,lw:lw||0.7})}
 line(x1,y1,x2,y2,col,lw){this.cur.push({k:'l',x1,y1,x2,y2,col:col||'#000000',lw:lw||0.7})}
 get edge(){return this.rtl?this.W-this.M:this.M}
 para(s,o){o=o||{};const sz=o.sz||12,b=o.b,lh=sz*1.4;const lines=this.wrap(s,sz,b,this.cw);lines.forEach(l=>{this.ensure(lh);this.text(this.edge,this.y,l,sz,b,o.col);this.y+=lh});this.y+=o.after==null?4:o.after}
 h1(s){this.para(s,{sz:19,b:1,after:2,col:'#103746'});this.line(this.M,this.y,this.W-this.M,this.y,'#E6B729',2);this.y+=10}
 h2(s){this.ensure(46);this.y+=8;this.rect(this.M,this.y,this.cw,20,'#DCEBE7',null);this.rect(this.rtl?this.W-this.M-4:this.M,this.y,4,20,'#1E5155',null);this.text(this.rtl?this.W-this.M-11:this.M+11,this.y+3,s,13,1,'#103746');this.y+=28}
 h3(s){this.ensure(30);this.para(s,{sz:12,b:1,after:2,col:'#1E5155'})}
 table(head,rows,cw){const sz=11,pad=4,n=head.length;const ws=cw?cw.map(f=>f*this.cw):head.map(()=>this.cw/n);
  const draw=(cells,b,fill)=>{const ls=cells.map((c,i)=>this.wrap(c,sz,b,ws[i]-2*pad));const rh=Math.max(...ls.map(l=>l.length))*sz*1.4+2*pad;this.ensure(rh);let x=this.rtl?this.W-this.M:this.M;
   cells.forEach((c,i)=>{const x0=this.rtl?x-ws[i]:x;this.rect(x0,this.y,ws[i],rh,fill,'#555555',0.6);ls[i].forEach((l,k)=>this.text(this.rtl?x0+ws[i]-pad:x0+pad,this.y+pad+k*sz*1.4,l,sz,b));x+=this.rtl?-ws[i]:ws[i]});this.y+=rh};
  draw(head,1,'#DCEBE7');rows.forEach(r=>draw(r.map(String),0,null));this.y+=8}
 image(im,maxw,maxh){let w=im.w,h=im.h;const s=Math.min(maxw/w,maxh/h,1.6);w*=s;h*=s;this.ensure(h+6);const x=this.rtl?this.W-this.M-w:this.M;this.cur.push({k:'i',im,x,y:this.y,w,h});this.cur.push({k:'r',x,y:this.y,w,h,fill:null,stroke:'#999999',lw:0.6});this.y+=h+8}
 async build(footer){const sc=2.5,n=this.pages.length,P=new PDF.Doc(),T0=T=>T;P.pages=[];P.imgs=[];
  const loaded=new Map();const load=im=>{if(!loaded.has(im))loaded.set(im,new Promise((res,rej)=>{const i=new Image();i.onload=()=>res(i);i.onerror=rej;i.src='data:image/jpeg;base64,'+btoa(im.data)}));return loaded.get(im)};
  for(let pi=0;pi<n;pi++){const c=document.createElement('canvas');c.width=Math.round(this.W*sc);c.height=Math.round(this.H*sc);const g=c.getContext('2d');g.fillStyle='#fff';g.fillRect(0,0,c.width,c.height);g.scale(sc,sc);g.textBaseline='top';
   const ops=this.pages[pi].slice();ops.push({k:'l',x1:this.M,y1:this.H-this.M+14,x2:this.W-this.M,y2:this.H-this.M+14,col:'#999999',lw:0.5});
   ops.push({k:'t',x:this.rtl?this.W-this.M:this.M,y:this.H-this.M+20,s:footer,sz:9,b:0,col:'#000000',al:this.rtl?'r':'l'});
   ops.push({k:'t',x:this.rtl?this.M:this.W-this.M,y:this.H-this.M+20,s:PT.page[this.L].replace('{i}',pi+1).replace('{n}',n),sz:9,b:0,col:'#000000',al:this.rtl?'l':'r'});
   for(const o of ops){
    if(o.k==='t'){g.font=this.font(o.sz,o.b);g.fillStyle=o.col;g.direction=this.rtl?'rtl':'ltr';g.textAlign=o.al==='r'?'right':'left';g.fillText(o.s,o.x,o.y)}
    else if(o.k==='r'){g.lineWidth=o.lw;if(o.fill){g.fillStyle=o.fill;g.fillRect(o.x,o.y,o.w,o.h)}if(o.stroke){g.strokeStyle=o.stroke;g.strokeRect(o.x,o.y,o.w,o.h)}}
    else if(o.k==='l'){g.lineWidth=o.lw;g.strokeStyle=o.col;g.beginPath();g.moveTo(o.x1,o.y1);g.lineTo(o.x2,o.y2);g.stroke()}
    else if(o.k==='i'){const im=await load(o.im);g.drawImage(im,o.x,o.y,o.w,o.h)}}
   const u=c.toDataURL('image/jpeg',0.88);P.imgs.push({w:c.width,h:c.height,data:atob(u.split(',')[1])});P.pages.push([`q ${P.W} 0 0 ${P.H} 0 0 cm /Im${pi+1} Do Q`])}
  return P.build('',true)}}
