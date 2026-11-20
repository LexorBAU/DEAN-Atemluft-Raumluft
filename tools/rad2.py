import math
from rad import STEPS as _S, ICONS, INK, pol, seg
STEPS=[("Fragestellung",["Fragestellung"],"#F9A590"),("Hypothese",["Hypothese"],"#FBF29B"),("Planung und Durchführung",["Planung und","Durchführung"],"#9CEFC9"),("Beobachtung",["Beobachtung"],"#7DDDF0"),("Auswertung",["Auswertung"],"#EBB0F1")]
FONT="font-family=\"'Century Gothic','Avenir Next',Arial,sans-serif\""
def full(active=None,dim=0.3):
    o=[f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" {FONT}>']
    for i,(n,lines,col) in enumerate(STEPS):
        op=1 if active is None or active==i else dim
        cx,cy=pol(134,-90+72*i)
        o.append(f'<g opacity="{op}"><path d="{seg(i)}" fill="{col}" stroke="{col}" stroke-width="10" stroke-linejoin="round"/>')
        o.append(f'<g transform="translate({cx:.1f} {cy-20:.1f}) scale(.8)">{ICONS[i]}</g>')
        for k,l in enumerate(lines):
            fs=12 if len(l)>11 else 14.5
            tl=min(len(l)*fs*0.56,112)
            o.append(f'<text x="{cx:.1f}" y="{cy+22+k*16:.1f}" text-anchor="middle" font-size="{fs}" font-weight="700" fill="{INK}" textLength="{tl:.0f}" lengthAdjust="spacingAndGlyphs">{l}</text>')
        o.append('</g>')
    o.append('</svg>');return ''.join(o)
def corner():
    o=['<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><circle cx="200" cy="200" r="194" fill="#fff"/>']
    for i,(n,lines,col) in enumerate(STEPS):
        cx,cy=pol(134,-90+72*i)
        o.append(f'<g class="seg s{i}"><path d="{seg(i)}" fill="{col}" stroke="{col}" stroke-width="10" stroke-linejoin="round"/></g>')
        o.append(f'<g transform="translate({cx:.1f} {cy:.1f})"><g class="ico ico{i}"><g transform="scale(1.45)">{ICONS[i]}</g></g></g>')
    o.append('</svg>');return ''.join(o)
if __name__=="__main__":
    open('wheel/rad_corner.svg','w').write(corner())
    for i in range(5): open(f'wheel/rad_full{i}.svg','w').write(full(i))
    open('wheel/rad_big2.svg','w').write(full())
