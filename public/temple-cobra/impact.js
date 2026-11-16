// A damped camera spring preserves momentum between closely spaced reel hits.
// The camera sits inside the viewport, so the surrounding page stays still.
export function createImpact({stage, reels, thump}) {
  const viewport = stage.parentElement;
  const rig = document.createElement('div');
  rig.className = 'camera-rig';
  viewport.append(rig);
  rig.append(stage);
  const flash = document.createElement('div');
  flash.className = 'landing-flash';
  stage.append(flash);
  let x=0,y=0,vx=0,vy=0,angle=0,angularVelocity=0,zoom=0,zoomVelocity=0,previous=0,raf=0;
  let flashAnimation;
  const restingScale=1.018;

  function tick(now) {
    const dt=Math.min((now-previous)/1000 || 1/120,1/30);
    previous=now;
    // Substeps keep rapid Turbo impacts stable on slower displays.
    const steps=Math.ceil(dt/(1/120)),h=dt/steps;
    for(let i=0;i<steps;i++){
      vx+=(-720*x-31*vx)*h; x+=vx*h;
      vy+=(-720*y-31*vy)*h; y+=vy*h;
      angularVelocity+=(-850*angle-36*angularVelocity)*h; angle+=angularVelocity*h;
      zoomVelocity+=(-560*zoom-28*zoomVelocity)*h; zoom+=zoomVelocity*h;
    }
    const limitX=viewport.clientWidth*.007,limitY=viewport.clientHeight*.007;
    const clamp=(v,limit)=>Math.max(-limit,Math.min(limit,v));
    rig.style.transform=`translate3d(${clamp(x,limitX).toFixed(3)}px,${clamp(y,limitY).toFixed(3)}px,0) rotate(${angle.toFixed(4)}deg) scale(${(restingScale+Math.max(0,zoom)).toFixed(5)})`;
    if(Math.abs(x)+Math.abs(y)+Math.abs(angle)*10+Math.abs(zoom)*100+Math.abs(vx)+Math.abs(vy)+Math.abs(angularVelocity)<.08){
      x=y=vx=vy=angle=angularVelocity=zoom=zoomVelocity=0;
      rig.style.transform=`scale(${restingScale})`;raf=0;return;
    }
    raf=requestAnimationFrame(tick);
  }

  function impact(kind='stop', index=0){
    const reelHit=kind==='stop';
    const strength=reelHit?(index===4?1.55:.7+index*.12):kind==='epic'?3.7:kind==='big'?2.6:1.15;
    // Impulse -> hard downward contact -> short overshoot -> spring settle.
    // Alternating tiny lateral kicks keep the dominant movement vertical.
    vy+=155*strength;
    vx+=(index%2?1:-1)*34*strength;
    angularVelocity+=(index%2?1:-1)*1.15*strength;
    zoomVelocity+=.075*strength;
    if(!raf){previous=performance.now();raf=requestAnimationFrame(tick)}
    thump(strength,reelHit);
    if(reelHit){
      const strip=reels[index]?.querySelector('.strip');
      strip?.animate([
        {transform:'translateY(-19px)',offset:0},
        {transform:'translateY(7px) scaleY(.96)',offset:.18},
        {transform:'translateY(-4px) scaleY(1.015)',offset:.43},
        {transform:'translateY(1.5px)',offset:.68},
        {transform:'translateY(0)',offset:1}
      ],{duration:index===4?260:210,easing:'linear'});
      const w=reels[index];
      Object.assign(flash.style,{left:w.style.left,top:w.style.top,width:w.style.width,height:w.style.height});
      flashAnimation?.cancel();
      flashAnimation=flash.animate([{opacity:index===4?.7:.38},{opacity:0}],{duration:index===4?240:150,easing:'ease-out'});
    }
  }
  return impact;
}
