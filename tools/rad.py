import math,sys
INK="#14181c"
STEPS=[("Fragestellung",["Fragestellung"],"#F9A590"),("Hypothese",["Hypothese"],"#FBF29B"),("Durchführung",["Durchführung"],"#9CEFC9"),("Beobachtung",["Beobachtung"],"#7DDDF0"),("Auswertung",["Auswertung"],"#EBB0F1")]
def pol(r,a): return (200+r*math.cos(math.radians(a)),200+r*math.sin(math.radians(a)))
def seg(i,R=188,r=80,gap=3.0):
    a0=-90+72*i-36+gap; a1=-90+72*i+36-gap
    p0=pol(R,a0);p1=pol(R,a1);p2=pol(r,a1);p3=pol(r,a0)
    return f"M{p0[0]:.1f} {p0[1]:.1f} A{R} {R} 0 0 1 {p1[0]:.1f} {p1[1]:.1f} L{p2[0]:.1f} {p2[1]:.1f} A{r} {r} 0 0 0 {p3[0]:.1f} {p3[1]:.1f} Z"
S=f'stroke="{INK}" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round" fill="none"'
ICONS=[
 f'<path d="M-22 -18 H22 Q26 -18 26 -14 V8 Q26 12 22 12 H4 L-8 24 V12 H-22 Q-26 12 -26 8 V-14 Q-26 -18 -22 -18Z" {S}/><path d="M-7 -8 Q-7 -15 0 -15 Q7 -15 7 -9 Q7 -4 0 -1 V3" {S}/><circle cx="0" cy="7.5" r="1.6" fill="{INK}"/>',
 f'<path d="M-9 14 V8 Q-20 2 -20 -8 A20 20 0 0 1 20 -8 Q20 2 9 8 V14Z" {S}/><path d="M-8 20 H8 M-5 25 H5" {S}/><path d="M0 -4 V8 M-5 -4 H5" {S}/><path d="M-30 -22 L-24 -17 M30 -22 L24 -17 M0 -36 V-30 M-35 -4 H-29 M35 -4 H29" {S}/>',
 f'<path d="M-7 -26 H7 M-5 -26 V-8 L-24 20 Q-27 27 -20 27 H20 Q27 27 24 20 L5 -8 V-26" {S}/><path d="M-15 8 H15" {S}/><circle cx="-4" cy="17" r="2.6" fill="{INK}"/><circle cx="6" cy="19" r="2" fill="{INK}"/><circle cx="2" cy="-34" r="2.4" fill="{INK}"/><circle cx="-6" cy="-31" r="1.6" fill="{INK}"/>',
 f'<circle cx="-5" cy="-6" r="17" {S}/><path d="M7 7 L24 24" stroke="{INK}" stroke-width="8" stroke-linecap="round"/><path d="M-14 -12 Q-10 -19 -3 -18" {S}/>',
 f'<path d="M-30 -22 H-4 Q0 -22 0 -18 V-4 Q0 0 -4 0 H-16 L-23 8 V0 H-30 Q-34 0 -34 -4 V-18 Q-34 -22 -30 -22Z" {S}/><path d="M-1 -4 H16 Q20 -4 20 0 V14 Q20 18 16 18 H12 V26 L5 18 H-2 Q-6 18 -6 14 V10" {S}/><circle cx="-26" cy="-11" r="1.8" fill="{INK}"/><circle cx="-18" cy="-11" r="1.8" fill="{INK}"/><circle cx="-10" cy="-11" r="1.8" fill="{INK}"/>',
]
def rad_svg(active=None,labels=True,dim=0.35):
    out=['<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400" font-family="\'Century Gothic\',\'Avenir Next\',Arial,sans-serif">']
    for i,(name,lines,col) in enumerate(STEPS):
        op=1 if (active is None or active==i) else dim
        out.append(f'<g opacity="{op}"><path d="{seg(i)}" fill="{col}" stroke="{col}" stroke-width="10" stroke-linejoin="round"/>')
        cx,cy=pol(138,-90+72*i)
        out.append(f'<g transform="translate({cx:.1f} {cy-14:.1f}) scale(.9)">{ICONS[i]}</g>')
        if labels:
            for k,l in enumerate(lines):
                out.append(f'<text x="{cx:.1f}" y="{cy+34+k*20:.1f}" text-anchor="middle" font-size="17" font-weight="700" fill="{INK}">{l}</text>')
        out.append('</g>')
    out.append('</svg>')
    return "".join(out)
if __name__=="__main__":
    open("rad_full.svg","w").write(rad_svg())
