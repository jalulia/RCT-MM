"""Encode original rendered frames, with one fixed palette and nearest-neighbour scaling."""
from pathlib import Path
import json
from collections import Counter
from PIL import Image, ImageChops, GifImagePlugin
import numpy as np
root=Path(__file__).resolve().parent
spec=json.loads((root/'sprite-render-input.json').read_text())
out=Path(spec['output']); report=[]
for kind,name,scale in [('street','boerum-street-loop.gif',3),('close','boerum-closeup-loop.gif',1)]:
    files=sorted((Path(spec['temp'])/kind).glob('*.png'))
    assert len(files)==360
    counts=Counter()
    for file in files:
        with Image.open(file) as im:
            counts.update({color:n for n,color in im.convert('RGB').getcolors(im.width*im.height)})
    colors=list(counts)
    pal=Image.new('P',(1,1))
    if len(colors)<=256:
        palette=[v for color in colors for v in color]+[0]*(768-len(colors)*3)
    else:
        reserved=set(color for color,n in counts.most_common(32))
        for file in files[::30]:
            with Image.open(file) as im:
                reserved.update(color for n,color in im.convert('RGB').crop((0,54,960,246)).getcolors(960*192))
        reserve=list(reserved);remaining=[c for c in colors if c not in reserved]
        swatch=Image.new('RGB',(len(remaining),1));swatch.putdata(remaining)
        rest=swatch.quantize(colors=256-len(reserve),method=Image.Quantize.MEDIANCUT).getpalette()
        palette=[v for c in reserve for v in c]+rest[:(256-len(reserve))*3]
    pal.putpalette(palette)
    # Exact lookup avoids Pillow's palette-cache approximation changing source pixels.
    palette_rgb=np.array(palette,dtype=np.int32).reshape(-1,3)
    lookup=np.empty(1<<24,dtype=np.uint8)
    for color in colors:
        best=int(np.argmin(np.sum((palette_rgb-np.array(color,dtype=np.int32))**2,axis=1)))
        lookup[(color[0]<<16)|(color[1]<<8)|color[2]]=best
    previous=None;sample_expected={}
    def convert(file):
        with Image.open(file) as original:
            rgb=np.asarray(original.convert('RGB'),dtype=np.uint32)
            indices=lookup[(rgb[:,:,0]<<16)|(rgb[:,:,1]<<8)|rgb[:,:,2]]
            image=Image.frombytes('P',original.size,indices.tobytes());image.putpalette(palette)
        if scale!=1: image=image.resize((image.width*scale,image.height*scale),Image.Resampling.NEAREST)
        return image
    target=out/'previews'/name
    with target.open('wb') as fp:
        for i,file in enumerate(files):
            image=convert(file)
            if previous is None:
                for block in GifImagePlugin._get_global_header(image,{'loop':0,'duration':100,'background':0}):fp.write(block)
                frame=image;offset=(0,0)
            else:
                box=ImageChops.difference(image,previous).getbbox()
                if box is None:box=(0,0,1,1)
                frame=image.crop(box);offset=box[:2]
            GifImagePlugin._write_frame_data(fp,frame,offset,{'duration':100,'disposal':1})
            previous=image
            if i in [0,53,59,60,120,151,179,180,240,300,335,359]:sample_expected[i]=image.convert('RGB')
        fp.write(b';')
    with Image.open(target) as gif:
        assert gif.n_frames==360,(name,gif.n_frames)
        duration=0
        for i in range(gif.n_frames):
            gif.seek(i);duration+=gif.info.get('duration',0)
            if i in sample_expected:
                assert not ImageChops.difference(gif.convert('RGB'),sample_expected[i]).getbbox(),(name,i,'decoded pixels differ')
                if kind=='close':
                    with Image.open(files[i]) as source:
                        assert not ImageChops.difference(gif.convert('RGB').crop((0,54,960,246)),source.convert('RGB').crop((0,54,960,246))).getbbox(),(name,i,'actor palette changed')
        assert duration==36000
        report.append({'file':name,'dimensions':gif.size,'frames':gif.n_frames,'durationMs':duration,'loop':gif.info.get('loop'),'sourceColors':len(colors),'paletteColors':min(256,len(colors)),'decodedSamplesMatch':len(sample_expected),'bytes':target.stat().st_size})
(root.parent/'qa').mkdir(exist_ok=True)
(root.parent/'qa/sprite-gif-checks.json').write_text(json.dumps(report,indent=2)+'\n')
print(json.dumps(report))
