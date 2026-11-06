document.body.classList.add('js');
Array.prototype.forEach.call(document.querySelectorAll('main > *'),function(el,i){el.style.setProperty('--i',i);});

(function(){
  var KEY='beenTogether2', $=function(i){return document.getElementById(i)};
  var d=new Date(); d.setFullYear(d.getFullYear()-1);
  var start=d.toISOString().slice(0,10), na='HUO', nb='MOLY';
  try{var s=JSON.parse(localStorage.getItem(KEY)||'null'); if(s){start=s.start||start;na=s.a||na;nb=s.b||nb;}}catch(e){}
  $('date').value=start; $('a').value=na; $('b').value=nb;
  function save(){try{localStorage.setItem(KEY,JSON.stringify({start:$('date').value,a:$('a').value,b:$('b').value}))}catch(e){}}
  function pl(n,w){return n+' '+w+(n===1?'':'s')}
  var rm=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches, shown=false, counting=false, ready=!document.getElementById('intro');
  function countUp(t){
    counting=true; var st=null, dur=1800;
    function step(ts){
      if(st===null) st=ts;
      var p=Math.min((ts-st)/dur,1), e=1-Math.pow(1-p,3);
      $('days').textContent=Math.round(t*e).toLocaleString();
      if(p<1) requestAnimationFrame(step); else counting=false;
    }
    requestAnimationFrame(step);
  }
  document.addEventListener('ready',function(){ready=true;tick();});
  function tick(){
    var from=new Date(2026,0,16,2,0,0), now=new Date();
    if(from>now){$('days').textContent='0';$('ymd').textContent='Pick a date in the past.';return;}
    var diff=now-from, days=Math.floor(diff/864e5);
    if(!shown && !rm && ready){shown=true;countUp(days);}
    else if(!counting){$('days').textContent=days.toLocaleString();}
    $('h').textContent=Math.floor(diff/36e5).toLocaleString();
    $('m').textContent=Math.floor(diff/6e4).toLocaleString();
    $('s').textContent=Math.floor(diff/1e3).toLocaleString();
    $('w').textContent=Math.floor(days/7).toLocaleString();
    var y=now.getFullYear()-from.getFullYear(), mo=now.getMonth()-from.getMonth(), dd=now.getDate()-from.getDate();
    if(dd<0){mo--;dd+=new Date(now.getFullYear(),now.getMonth(),0).getDate();}
    if(mo<0){y--;mo+=12;}
    $('ymd').textContent=pl(y,'year')+', '+pl(mo,'month')+', '+pl(dd,'day');
    var next=100*(Math.floor(days/100)+1);
    $('ms').textContent=pl(next-days,'day')+' until day '+next.toLocaleString();
  }
  ['date','a','b'].forEach(function(i){$(i).addEventListener('input',function(){save();tick()})});
  /* ===== YOUR PHOTOS =====
   Put your pictures in assets/photos/ and keep the names photo1.jpg ... photo4.jpg,
   or change the src paths below. Edit the captions too.
   Add or remove lines to change how many photos show. */
var PHOTOS=[
  {src:'assets/photos/photo1.jpg',caption:'Birthday surprise'},
  {src:'assets/photos/photo2.jpg',caption:'Coffee date'},
  {src:'assets/photos/photo3.jpg',caption:'Evening walk'},
  {src:'assets/photos/photo4.jpg',caption:'Always close'}
];
  var box=$('photos');
  PHOTOS.forEach(function(p){
    var f=document.createElement('figure'); f.className='photo';
    var im=document.createElement('img'); im.src=p.src; im.alt=p.caption; im.loading='lazy';
    var c=document.createElement('figcaption'); c.textContent=p.caption;
    f.appendChild(im); f.appendChild(c); box.appendChild(f);
  });
  if(!rm){
    var hb=$('hearts');
    for(var i=0;i<14;i++){
      var h=document.createElement('span');
      h.textContent='♥';
      h.style.left=(Math.random()*100)+'%';
      h.style.fontSize=(14+Math.random()*22)+'px';
      h.style.animationDuration=(9+Math.random()*9)+'s';
      h.style.animationDelay=(-Math.random()*14)+'s';
      hb.appendChild(h);
    }
  }
  tick(); setInterval(tick,1000);
})();

/* ===== MUSIC + PASSWORD =====
   Password is set in PASSWORD below (6 digits). Note: this is a simple lock for fun,
   not real security, because anyone can read the code in the page source.
   Song file: assets/music/song.mp3 (replace it with any mp3 using the same name).
   The song starts when the correct password is entered. */
(function(){
  var PASSWORD='160126';
  var a=document.getElementById('song'), b=document.getElementById('music'), userPaused=false;
  var intro=document.getElementById('intro'), dots=document.getElementById('dots'), pad=document.getElementById('pad'), hint=document.getElementById('hint');
  var code='', locked=false;
  function ui(){
    if(!a||!b) return;
    var on=!a.paused;
    b.classList.toggle('on',on);
    b.innerHTML=on?'&#10074;&#10074;':'&#9834;';
    b.setAttribute('aria-label',on?'Pause music':'Play music');
  }
  function play(){ if(!a) return; var p=a.play(); if(p&&p.catch) p.catch(function(){}); }
  if(b&&a){
    b.addEventListener('click',function(){
      if(a.paused){userPaused=false;play();}else{userPaused=true;a.pause();}
    });
    a.addEventListener('play',ui); a.addEventListener('pause',ui);
  }
  function openIt(){
    if(!intro) return;
    intro.classList.add('hide');
    document.body.classList.add('ready');
    document.dispatchEvent(new Event('ready'));
    setTimeout(function(){intro.style.display='none';},1500);
  }
  var ih=document.getElementById('ihearts');
  if(ih&&!(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches)){
    for(var i=0;i<18;i++){
      var s=document.createElement('span'); s.textContent='\u2665';
      s.style.left=(Math.random()*100)+'%';
      s.style.fontSize=(14+Math.random()*24)+'px';
      s.style.animationDuration=(6+Math.random()*7)+'s';
      s.style.animationDelay=(-Math.random()*10)+'s';
      ih.appendChild(s);
    }
  }
  function refresh(){
    if(!dots) return;
    Array.prototype.forEach.call(dots.children,function(d,i){d.classList.toggle('on',i<code.length);});
  }
  function check(){
    if(code===PASSWORD){
      locked=true; userPaused=false; play(); openIt();
    }else{
      locked=true;
      dots.classList.add('err','shake');
      if(hint) hint.textContent='Try again';
      setTimeout(function(){
        code=''; refresh();
        dots.classList.remove('err','shake');
        if(hint) hint.textContent='Enter our date';
        locked=false;
      },600);
    }
  }
  function press(key){
    if(locked) return;
    if(key==='del'){code=code.slice(0,-1);refresh();return;}
    if(code.length>=PASSWORD.length) return;
    code+=key; refresh();
    if(code.length===PASSWORD.length) check();
  }
  if(!intro){ return; }
  if(pad) pad.addEventListener('click',function(e){
    var t=e.target.closest('button'); if(t&&t.dataset.k) press(t.dataset.k);
  });
  document.addEventListener('keydown',function(e){
    if(!intro||intro.style.display==='none'||intro.classList.contains('hide')) return;
    if(/^[0-9]$/.test(e.key)) press(e.key);
    else if(e.key==='Backspace') press('del');
  });
})();

/* ===== DATE, TIME AND TEMPERATURE =====
   Time uses Cambodia time. Temperatures come from the free Open-Meteo service
   (needs internet) and refresh every 10 minutes. */
(function(){
  var dDate=document.getElementById('dDate'), dTime=document.getElementById('dTime');
  var tSR=document.getElementById('tSR'), tPP=document.getElementById('tPP');
  var fd=new Intl.DateTimeFormat('en-GB',{timeZone:'Asia/Phnom_Penh',weekday:'short',day:'numeric',month:'short',year:'numeric'});
  var ft=new Intl.DateTimeFormat('en-US',{timeZone:'Asia/Phnom_Penh',hour:'numeric',minute:'2-digit',second:'2-digit'});
  function clock(){var n=new Date(); if(dDate) dDate.textContent=fd.format(n); if(dTime) dTime.textContent=ft.format(n);}
  clock(); setInterval(clock,1000);
  function show(el,v){ if(el) el.textContent=(typeof v==='number')?Math.round(v)+'\u00B0C':'--\u00B0C'; }
  function temps(){
    var url='https://api.open-meteo.com/v1/forecast?latitude=13.3671,11.5564&longitude=103.8448,104.9282&current=temperature_2m&timezone=auto';
    fetch(url).then(function(r){return r.json();}).then(function(d){
      var a=Array.isArray(d)?d:[d];
      show(tSR,a[0]&&a[0].current&&a[0].current.temperature_2m);
      show(tPP,a[1]&&a[1].current&&a[1].current.temperature_2m);
    }).catch(function(){});
  }
  temps(); setInterval(temps,600000);
})();
