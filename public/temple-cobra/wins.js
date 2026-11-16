import { createImpact } from './impact.js';
export function createWinDirector({stage, reels, texts, money, tone, thump}) {
  const overlay = document.createElement('div');
  overlay.className = 'win-scene';
  overlay.hidden = true;
  overlay.innerHTML = `<div class="win-rays"></div><div class="coin-field"></div><div class="win-card"><div class="win-crest"><img src="assets/spin_ring.png" alt=""><span>◆</span></div><div class="win-eyebrow">THE COBRA'S TREASURE</div><h2 class="win-title">BIG WIN</h2><div class="win-amount">0.00</div><p class="win-detail"></p><button class="collect-win">COLLECT & CONTINUE <span>↵</span></button></div>`;
  stage.append(overlay);
  const lines = document.createElement('div');
  lines.className='paylines';
  stage.append(lines);
  let busy = false, finishCurrent;
  const impact = createImpact({stage,reels,thump});
  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
  const finish = () => finishCurrent?.();
  overlay.querySelector('.collect-win').onclick=finish;
  addEventListener('keydown', e => {if(busy && ['Enter','Space','Escape'].includes(e.code)){e.preventDefault();e.stopImmediatePropagation();finish()}},true);
  async function celebrate({amount, bet, wins, preview=false}) {
    if(busy) return;
    busy=true;
    stage.classList.add('win-light');
    impact(amount/bet>=50?'epic':amount/bet>=10?'big':'small');
    for(const {row,count,payout} of wins){
      const line=document.createElement('div');
      line.className='payline';line.hidden=true;
      Object.assign(line.style,{top:(317+row*151+75)+'px',width:((count-1)*188+160)+'px'});
      line.innerHTML=`<span>LINE ${row+1} · +${money(payout)}</span>`;
      lines.append(line);
      for(let i=0;i<count;i++)reels[i].querySelectorAll('.symbol')[row]?.classList.add('symbol-win');
    }
    const ratio=amount/bet;
    const big=ratio>=10;
    const title=ratio>=50?'EPIC WIN':ratio>=25?'MEGA WIN':big?'BIG WIN':wins.length>1?'MULTI WIN':'NICE WIN';
    overlay.classList.toggle('small-win',!big);
    overlay.dataset.tier=ratio>=50?'epic':ratio>=25?'mega':big?'big':'normal';
    overlay.querySelector('.win-title').textContent=title;
    overlay.querySelector('.win-detail').textContent=`${preview?'EFFECT PREVIEW · ':''}${wins.length} WINNING ${wins.length===1?'LINE':'LINES'} · ${ratio.toFixed(1)}× YOUR BET`;
    overlay.querySelector('.win-amount').textContent='0.00';
    for(const line of lines.children){line.hidden=false;tone(659,.16);await sleep(450)}
    await sleep(350);
    overlay.hidden=false;
    if(big)impact(ratio>=50?'epic':'big');
    let finished=false,raf;
    const started=performance.now(), duration=big?2200:850;
    function count(now){const progress=Math.min(1,(now-started)/duration);const value=amount*(1-Math.pow(1-progress,3));overlay.querySelector('.win-amount').textContent=money(value);texts.win_value.textContent=money(value);if(progress<1&&!finished)raf=requestAnimationFrame(count)}
    raf=requestAnimationFrame(count);
    const notes=big?[262,392,523,659,784,1047,1319,1568]:[659,784,1047];
    notes.forEach((note,i)=>setTimeout(()=>{if(!finished)tone(note,.22)},i*170));
    const field=overlay.querySelector('.coin-field');
    field.replaceChildren();
    for(let i=0;i<(big?65:16);i++){
      const coin=document.createElement('img');coin.src='assets/treasure-coin.svg';coin.alt='';coin.className='falling-coin';
      coin.style.cssText=`--x:${Math.random()*100}%;--delay:${Math.random()*2.5}s;--duration:${2+Math.random()*2}s;--size:${22+Math.random()*42}px;--drift:${Math.random()*300-150}px;--angle:${Math.random()*720}deg`;
      field.append(coin);
    }
    await new Promise(resolve=>{let timeout;finishCurrent=()=>{if(finished)return;finished=true;clearTimeout(timeout);cancelAnimationFrame(raf);overlay.querySelector('.win-amount').textContent=money(amount);texts.win_value.textContent=money(amount);resolve()};timeout=setTimeout(finishCurrent,big?6500:2400)});
    overlay.classList.add('leaving');
    await sleep(350);
    overlay.hidden=true;overlay.classList.remove('leaving');
    stage.classList.remove('win-light');lines.replaceChildren();field.replaceChildren();
    reels.forEach(r=>r.querySelectorAll('.symbol-win').forEach(s=>s.classList.remove('symbol-win')));
    busy=false;finishCurrent=undefined;
  }
  return {celebrate,impact,get busy(){return busy},finish};
}
