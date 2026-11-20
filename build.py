import base64,json,glob,os
def b64(p): return base64.b64encode(open(p,'rb').read()).decode()
A={'bunsi':{},'photo':{},'video':{}}
for f in sorted(glob.glob('bunsi/svg/*.svg')):
    n=os.path.basename(f)[6:-4]; A['bunsi'][n]='data:image/svg+xml;base64,'+b64(f)
A['radCorner']=open('wheel/rad_corner.svg').read(); A['radBig']=open('wheel/rad_big2.svg').read(); A['radFull']=[open(f'wheel/rad_full{i}.svg').read() for i in range(5)]
A['photo']['einzel']='data:image/jpeg;base64,'+b64('assets/einzel.jpg'); A['photo']['aufgebaut']='data:image/jpeg;base64,'+b64('assets/aufgebaut.jpg')
A['ghs05']='data:image/png;base64,'+b64('assets/ghs05.png')
A['video']['ballon']=b64('assets/ballon.mp4'); A['video']['glimm']=b64('assets/glimm.mp4')
src=lambda n: open('src/'+n,encoding='utf-8').read()
html=f'''<!DOCTYPE html>
<html lang="de"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,viewport-fit=cover">
<meta name="apple-mobile-web-app-capable" content="yes"><meta name="mobile-web-app-capable" content="yes">
<title>DEAN Raumluft und Atemluft (Entwurf)</title>
<style>{src('app.css')}</style></head>
<body><div id="app"></div><div id="protokoll"></div>
<script>const ASSETS={json.dumps(A)};</script>
<script>{src('texts.js')}</script>
<script>{src('core.js')}</script>
<script>{src('ui.js')}</script>
<script>{src('widgets.js')}</script>
<script>{src('pages.js')}</script>
<script>{src('pdf.js')}</script>
<script>{src('pdfloc.js')}</script>
<script>{src('export.js')}</script>
</body></html>'''
open('index.html','w',encoding='utf-8').write(html)
print(len(html)/1e6,'MB')
