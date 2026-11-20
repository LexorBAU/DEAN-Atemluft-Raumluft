import math, sys, os
OUT=sys.argv[1]
INK="#14181c"

def flame(kind):
    outer="M210 130 C172 120 166 84 188 54 C195 72 203 76 208 72 C203 50 214 30 227 6 C233 40 257 62 251 97 C248 116 232 128 210 130 Z"
    inner="M210 126 C191 118 190 96 204 80 C208 92 214 94 218 86 C227 100 232 112 225 121 C221 125 215 127 210 126 Z"
    if kind=="blue":   g=("#1f6fe0","#7fe3ff","#e8fbff"); tr=""
    elif kind=="yellow": g=("#ff7a00","#ffc83a","#fff6b8"); tr=""
    elif kind=="big":  g=("#1f6fe0","#7fe3ff","#e8fbff"); tr="translate(210 130) scale(1.12 1.28) translate(-210 -130)"
    elif kind=="small": g=("#3b7fd6","#9fdcf5","#eefaff"); tr="translate(210 130) scale(0.62 0.5) translate(-210 -130)"
    elif kind=="spike": g=("#1f6fe0","#7fe3ff","#e8fbff"); tr="translate(210 130) scale(0.9 1.5) translate(-210 -130)"
    base="translate(210 130) scale(1.45) translate(-210 -130)"
    tr=(base+" "+tr).strip()
    return f'''<g transform="{tr}"><path d="{outer}" fill="url(#fl_{g[0][1:]})" stroke="{INK}" stroke-width="5" stroke-linejoin="round"/>
<path d="{inner}" fill="{g[2]}" opacity=".95"/></g>''', g

def defs(gs):
    s=['''<linearGradient id="body" x1="0" x2="1"><stop offset="0" stop-color="#ffffff"/><stop offset=".55" stop-color="#e9edf1"/><stop offset="1" stop-color="#bcc5cd"/></linearGradient>
<linearGradient id="baseTop" x1="0" x2="1"><stop offset="0" stop-color="#3a3f45"/><stop offset="1" stop-color="#1b1e22"/></linearGradient>
<radialGradient id="eyew" cx=".4" cy=".35" r=".8"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#eef1f4"/></radialGradient>''']
    for g in gs:
        s.append(f'<linearGradient id="fl_{g[0][1:]}" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="{g[0]}"/><stop offset="1" stop-color="{g[1]}"/></linearGradient>')
    return "\n".join(s)

def eye(cx,cy,kind="n",dx=0,dy=0,lid=None,rx=40,ry=46,pr=(15,19)):
    if kind=="happy":
        return f'<path d="M{cx-32} {cy+10} Q{cx} {cy-34} {cx+32} {cy+10}" fill="none" stroke="{INK}" stroke-width="12" stroke-linecap="round"/>'
    if kind=="wink":
        return f'<path d="M{cx-32} {cy-4} Q{cx} {cy+26} {cx+32} {cy-4}" fill="none" stroke="{INK}" stroke-width="10" stroke-linecap="round"/>'
    s=f'<ellipse cx="{cx}" cy="{cy}" rx="{rx}" ry="{ry}" fill="url(#eyew)" stroke="{INK}" stroke-width="6"/>'
    px,py=cx+dx,cy+dy
    s+=f'<ellipse cx="{px}" cy="{py}" rx="{pr[0]}" ry="{pr[1]}" fill="{INK}"/><circle cx="{px-5}" cy="{py-7}" r="5" fill="#fff"/>'
    if lid is not None:  # lid = tilt (px): halb geschlossenes Lid
        y0=cy-ry*0.15
        poly=f'M{cx-rx-4} {cy-ry-6} L{cx+rx+4} {cy-ry-6} L{cx+rx+4} {y0-lid} L{cx-rx-4} {y0+lid} Z'
        cid=f"c{cx}{cy}"
        s+=f'<clipPath id="{cid}"><ellipse cx="{cx}" cy="{cy}" rx="{rx}" ry="{ry}"/></clipPath><path d="{poly}" fill="#d5dbe1" clip-path="url(#{cid})"/>'
        s+=f'<path d="M{cx-rx} {y0+lid} L{cx+rx} {y0-lid}" stroke="{INK}" stroke-width="6" stroke-linecap="round" clip-path="url(#{cid})"/>'
        s+=f'<ellipse cx="{cx}" cy="{cy}" rx="{rx}" ry="{ry}" fill="none" stroke="{INK}" stroke-width="6"/>'
    return s

def brow(x1,y1,cxp,cyp,x2,y2):
    return f'<path d="M{x1} {y1} Q{cxp} {cyp} {x2} {y2}" fill="none" stroke="{INK}" stroke-width="10" stroke-linecap="round"/>'

def mouth(kind):
    cx,cy=210,438
    if kind=="smile":
        return f'<path d="M{cx-26} {cy-4} Q{cx} {cy+22} {cx+26} {cy-4}" fill="none" stroke="{INK}" stroke-width="6" stroke-linecap="round"/>'
    if kind=="grin":
        return (f'<path d="M{cx-38} {cy-10} Q{cx} {cy+44} {cx+38} {cy-10} Z" fill="#6a1b1b" stroke="{INK}" stroke-width="6" stroke-linejoin="round"/>'
                f'<path d="M{cx-22} {cy+12} Q{cx} {cy+4} {cx+22} {cy+12} Q{cx} {cy+30} {cx-22} {cy+12} Z" fill="#ff8f9f"/>')
    if kind=="o":
        return f'<ellipse cx="{cx}" cy="{cy+4}" rx="11" ry="16" fill="#6a1b1b" stroke="{INK}" stroke-width="6"/>'
    if kind=="gritted":
        t="".join(f'<path d="M{cx-27+i*9} {cy-6} v18" stroke="{INK}" stroke-width="3"/>' for i in range(1,6))
        return f'<rect x="{cx-30}" y="{cy-8}" width="60" height="22" rx="8" fill="#fff" stroke="{INK}" stroke-width="6"/>{t}<path d="M{cx-30} {cy+3} H{cx+30}" stroke="{INK}" stroke-width="3"/>'
    if kind=="frown":
        return f'<path d="M{cx-24} {cy+12} Q{cx} {cy-12} {cx+24} {cy+12}" fill="none" stroke="{INK}" stroke-width="6" stroke-linecap="round"/>'
    if kind=="wavy":
        return f'<path d="M{cx-20} {cy+4} q8 -10 16 0 t16 0 t16 0" fill="none" stroke="{INK}" stroke-width="6" stroke-linecap="round" transform="translate(6 0)"/>'

def star(x,y,r,c="#ffc83a"):
    pts=[]
    for i in range(8):
        a=math.pi/4*i - math.pi/2; rr=r if i%2==0 else r*0.38
        pts.append(f"{x+rr*math.cos(a):.1f},{y+rr*math.sin(a):.1f}")
    return f'<polygon points="{" ".join(pts)}" fill="{c}" stroke="{INK}" stroke-width="3" stroke-linejoin="round"/>'


def glove(x,y,rot=0,sc=1.0,mirror=False):
    m=-1 if mirror else 1
    return f'''<g transform="translate({x} {y}) rotate({rot}) scale({sc*m*1.35} {sc*1.35})" stroke="{INK}" stroke-width="6" stroke-linejoin="round" stroke-linecap="round" fill="#fff">
<path d="M-20 12 Q-30 -6 -22 -22 Q-16 -30 -9 -22 L-9 -34 Q-1 -42 6 -34 L6 -30 Q13 -38 19 -30 L19 -22 Q27 -28 31 -18 Q34 2 22 16 Q8 30 -10 26 Q-18 22 -20 12 Z"/>
<path d="M-9 -22 v14 M6 -30 v14 M19 -22 v12" fill="none" stroke-width="3.5"/></g>'''
def arm(path):
    return f'<path d="{path}" fill="none" stroke="{INK}" stroke-width="19" stroke-linecap="round"/><path d="{path}" fill="none" stroke="#f4f6f8" stroke-width="7" stroke-linecap="round"/>'
POSE={
 "down":   lambda: arm("M148 446 Q88 462 84 516")+glove(86,534,6,.85)+arm("M272 446 Q332 462 336 516")+glove(334,534,-6,.85,True),
 "cheer":  lambda: arm("M148 440 Q80 420 74 340")+glove(74,318,-8,1)+arm("M272 440 Q340 420 346 340")+glove(346,318,8,1,True),
 "wave2":  lambda: arm("M148 450 Q96 470 92 524")+glove(92,540,0,.9)+arm("M272 440 Q340 420 338 332")+glove(334,304,-16,1.05,True),
 "wave":   lambda: arm("M148 450 Q96 470 92 524")+glove(92,540,0,.9)+arm("M272 440 Q352 430 356 340")+glove(356,312,14,1.05,True),
 "stop":   lambda: arm("M148 450 Q96 470 92 524")+glove(92,540,0,.9)+arm("M272 440 Q340 430 344 360")+glove(344,336,6,1.05,True),
 "chin":   lambda: arm("M148 450 Q96 470 92 524")+glove(92,540,0,.9)+arm("M272 450 Q352 470 330 400")+glove(318,382,-20,.9,True),
 "hips":   lambda: arm("M148 450 Q84 450 112 496")+glove(130,498,40,.8)+arm("M272 450 Q336 450 308 496")+glove(290,498,-40,.8,True),
 "open":   lambda: arm("M148 450 Q86 470 66 430")+glove(58,412,-20,.95)+arm("M272 450 Q334 470 354 430")+glove(362,412,20,.95,True),
 "point":  lambda: arm("M148 450 Q96 470 92 524")+glove(92,540,0,.9),
}

def body():
    return f'''
<!-- Sockel -->
<path d="M70 622 V646 Q70 676 210 676 Q350 676 350 646 V622 Z" fill="#101316"/>
<ellipse cx="210" cy="622" rx="140" ry="28" fill="url(#baseTop)" stroke="{INK}" stroke-width="6"/>
<path d="M104 636 Q150 654 210 656" fill="none" stroke="#7a838c" stroke-width="4" stroke-linecap="round" opacity=".7"/>
<!-- Gaszufuhr -->
<rect x="92" y="548" width="236" height="32" rx="10" fill="url(#body)" stroke="{INK}" stroke-width="6"/>
<g fill="url(#body)" stroke="{INK}" stroke-width="6" stroke-linejoin="round">
<rect x="34" y="552" width="62" height="24" rx="6"/>
<path d="M50 552 v24 M64 552 v24 M78 552 v24" fill="none" stroke-width="4"/>
</g>
<rect x="324" y="560" width="22" height="8" fill="url(#body)" stroke="{INK}" stroke-width="5"/>
<rect x="344" y="532" width="18" height="64" rx="8" fill="url(#body)" stroke="{INK}" stroke-width="6"/>
<!-- Fuss und Rohr -->
<path d="M168 584 L168 540 H252 V584 Z" fill="url(#body)" stroke="{INK}" stroke-width="6" stroke-linejoin="round"/>
<rect x="158" y="500" width="104" height="40" rx="8" fill="url(#body)" stroke="{INK}" stroke-width="6"/>
<rect x="146" y="398" width="128" height="104" rx="14" fill="url(#body)" stroke="{INK}" stroke-width="6"/>
<path d="M146 470 H274" stroke="{INK}" stroke-width="4" opacity=".6"/>
<path d="M170 134 V400 H250 V134" fill="url(#body)" stroke="{INK}" stroke-width="6" stroke-linejoin="round"/>
<ellipse cx="210" cy="134" rx="40" ry="10" fill="#c3ccd4" stroke="{INK}" stroke-width="6"/>
<path d="M184 150 V380" stroke="#fff" stroke-width="7" stroke-linecap="round" opacity=".85"/>
'''

POSES={'neutral': 'down', 'happy': 'cheer', 'thinking': 'chin', 'surprised': 'open', 'warning': 'stop', 'oops': 'open', 'wink': 'down', 'explain': 'point', 'proud': 'hips'}
EXPR={
 "neutral": dict(flame="blue", eyes=("n","n",(0,2),(0,2),None), brows=((-52,-62,-34,-74,-14,-60),(52,-62,34,-74,14,-60)), mouth="smile", extra=""),
 "happy":   dict(flame="big", eyes=("n","n",(0,2),(0,2),None), brows=((-54,-66,-34,-86,-10,-72),(54,-66,34,-86,10,-72)), mouth="grin", extra='<circle cx="168" cy="448" r="11" fill="#ff9aa8" opacity=".6"/><circle cx="252" cy="448" r="11" fill="#ff9aa8" opacity=".6"/>'),
 "thinking":dict(flame="blue", eyes=("n","n",(14,-14),(14,-14),None), brows=((-52,-64,-34,-72,-14,-66),(52,-84,34,-96,14,-80)), mouth="wavy", extra=None),
 "surprised":dict(flame="spike", eyes=("s","s",(0,0),(0,0),None), brows=((-56,-80,-36,-96,-12,-84),(56,-80,36,-96,12,-84)), mouth="o", extra=None),
 "warning": dict(flame="yellow", eyes=("n","n",(0,6),(0,6),12), brows=((-54,-56,-34,-52,-10,-36),(54,-56,34,-52,10,-36)), mouth="gritted", extra=None),
 "oops":    dict(flame="small", eyes=("n","n",(-6,12),(-6,12),None), brows=((-52,-52,-34,-70,-12,-78),(52,-52,34,-70,12,-78)), mouth="frown", extra=None),
 "wink":    dict(flame="big", eyes=("n","wink",(6,2),(0,0),None), brows=((-54,-66,-34,-86,-10,-72),(54,-56,34,-70,10,-58)), mouth="grin", extra=None),
 "explain": dict(flame="blue", eyes=("n","n",(12,-6),(12,-6),None), brows=((-54,-70,-34,-88,-10,-76),(54,-62,34,-72,10,-64)), mouth="grin", extra=None),
 "proud":   dict(flame="big", eyes=("n","n",(8,-8),(8,-8),None), brows=((-54,-72,-34,-86,-10,-74),(54,-72,34,-86,10,-74)), mouth="grin", extra=None),
}

def build(name,blink=False):
    e=EXPR[name]; fsvg,g=flame(e["flame"])
    ex1,ex2,d1,d2,lid=e["eyes"]
    ecy=262; lx,rx_=138,282
    if ex1=="s":
        eyes=eye(lx,ecy,"n",*d1,rx=44,ry=52,pr=(8,10))+eye(rx_,ecy,"n",*d2,rx=44,ry=52,pr=(8,10))
    else:
        eyes=eye(lx,ecy,ex1,*d1,lid=lid)+eye(rx_,ecy,ex2,*d2,lid=lid)
    if blink:
        cl=lambda cx:f'<path d="M{cx-34} {ecy} Q{cx} {ecy+16} {cx+34} {ecy}" fill="none" stroke="{INK}" stroke-width="9" stroke-linecap="round"/>'
        eyes=cl(lx)+cl(rx_)
    (a,b)=e["brows"]
    br=brow(lx+a[0],ecy+a[1],lx+a[2],ecy+a[3],lx+a[4],ecy+a[5])+brow(rx_+b[0],ecy+b[1],rx_+b[2],ecy+b[3],rx_+b[4],ecy+b[5])
    ex=e["extra"] or ""
    if name=="thinking":
        ex+=f'<text x="332" y="150" font-family="Century Gothic, Arial, sans-serif" font-size="70" font-weight="700" fill="#2f7de1" stroke="{INK}" stroke-width="3">?</text>'
    if name=="surprised":
        ex+=f'<g stroke="{INK}" stroke-width="7" stroke-linecap="round"><path d="M70 110 l22 22 M350 110 l-22 22 M52 168 h26 M368 168 h-26"/></g>'
    if name=="warning":
        ex+=f'<g transform="translate(318 70)"><path d="M0 70 L40 0 L80 70 Z" fill="#ffc83a" stroke="{INK}" stroke-width="6" stroke-linejoin="round"/><path d="M40 22 v26" stroke="{INK}" stroke-width="8" stroke-linecap="round"/><circle cx="40" cy="60" r="4.5" fill="{INK}"/></g>'
    if name=="oops":
        ex+=f'<path d="M334 232 q-14 24 0 36 q14 -12 0 -36 Z" fill="#8fd8ff" stroke="{INK}" stroke-width="4" stroke-linejoin="round"/>'
    if name=="proud":
        ex+=star(86,120,22)+star(340,92,26)+star(358,196,15)+star(58,206,14,"#8fd8ff")
    if name=="wink":
        ex+=star(380,200,18)+star(398,152,11,"#8fd8ff")
    if name=="explain":
        ex+=f'''<path d="M276 440 Q330 450 342 398" fill="none" stroke="{INK}" stroke-width="19" stroke-linecap="round"/>
<path d="M276 440 Q330 450 342 398" fill="none" stroke="#f4f6f8" stroke-width="7" stroke-linecap="round"/>
<g transform="translate(346 380) rotate(18) scale(1.3)" stroke="{INK}" stroke-width="6" stroke-linejoin="round" fill="#fff">
<rect x="-6" y="-50" width="14" height="46" rx="7"/>
<rect x="-20" y="-12" width="40" height="40" rx="16"/>
<path d="M-18 4 Q-34 2 -30 -12 Q-24 -16 -18 -8" />
<path d="M-5 -4 v14 M4 -4 v14" fill="none" stroke-width="3"/></g>'''
    armsvg=POSE[POSES[name]]()
    svg=f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -170 420 870" width="420" height="870">
<defs>{defs([g])}</defs>
{body()}
{armsvg}
{fsvg}
{eyes}
{br}
{mouth(e["mouth"])}
{ex}
</svg>'''
    open(f"{OUT}/bunsi_{name}{'_blink' if blink else ''}.svg","w",encoding="utf-8").write(svg)
for n in EXPR:
    build(n)
    if n!="wink": build(n,True)
POSES["wave"]="wave";POSES["wave2"]="wave2"
EXPR["wave"]=dict(EXPR["happy"]);EXPR["wave"]["extra"]=""
EXPR["wave2"]=dict(EXPR["happy"]);EXPR["wave2"]["extra"]=""
build("wave");build("wave",True);build("wave2");build("wave2",True)
print("ok")
