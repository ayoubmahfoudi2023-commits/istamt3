let points = localStorage.getItem("points") ? parseInt(localStorage.getItem("points")) : 0;
let level = localStorage.getItem("level") ? parseInt(localStorage.getItem("level")) : 1;

const menu = document.getElementById("menu");
const content = document.getElementById("content");
const intro = document.getElementById("intro");
const mainSite = document.getElementById("mainSite");
const startBtn = document.getElementById("startBtn");
const bgName = document.getElementById("bgName");

const clickSound = document.getElementById("clickSound");
const successSound = document.getElementById("successSound");
const errorSound = document.getElementById("errorSound");
const welcomeSound = document.getElementById("welcomeSound");

const particleCanvas = document.getElementById("particleCanvas");
const ctx = particleCanvas.getContext("2d");
particleCanvas.width = window.innerWidth;
particleCanvas.height = window.innerHeight;

let particles = [];
for (let i = 0; i < 150; i++) {
    particles.push({x:Math.random()*particleCanvas.width,y:Math.random()*particleCanvas.height,r:Math.random()*3+1,d:Math.random()*1,type:["✦","✧","❤","💫","🌟","✨"][Math.floor(Math.random()*6)]});
}
function drawParticles(){
    ctx.clearRect(0,0,particleCanvas.width,particleCanvas.height);
    ctx.font="20px Poppins";
    for(let p of particles){
        ctx.fillStyle="rgba(255,255,255,0.4)";
        ctx.fillText(p.type,p.x,p.y);
        p.y+=Math.cos(p.d)+0.5;
        p.x+=Math.sin(p.d);
        if(p.y>particleCanvas.height)p.y=0;
        if(p.x>particleCanvas.width)p.x=0;
        if(p.x<0)p.x=particleCanvas.width;
    }
    requestAnimationFrame(drawParticles);
}
drawParticles();

startBtn.addEventListener("click",()=>{
    clickSound.play();
    intro.style.display="none";
    mainSite.style.display="block";
    welcomeSound.play();
    animateBgName();
});

function animateBgName(){
    let pos=0;
    setInterval(()=>{
        pos=(pos+0.2)%window.innerHeight;
        bgName.style.transform=`translate(-50%,calc(-50% + ${pos}px))`;
    },50);
}

function addPoints(p){
    points+=p;
    if(points>=level*15){
        level++;
        successSound.play();
        confetti();
        alert("⭐ تهانينا! ارتفع مستواك إلى "+level);
    }
}

function saveProgress(){
    localStorage.setItem("points",points);
    localStorage.setItem("level",level);
    clickSound.play();
    alert("💾 تم حفظ تقدمك بنجاح!");
}

function toggleMenu(){ clickSound.play(); menu.style.right=(menu.style.right=="0px")?"-280px":"0px"; }
function closeMenu(){ menu.style.right="-280px"; }
function toggleMode(){document.body.classList.toggle("light"); clickSound.play();}

function home(){ closeMenu(); content.innerHTML=`<h2>🏠 الرئيسية</h2><p>مرحبًا بك 💪</p><p>مستواك الحالي: <b>${level}</b></p>`; }

const factsList = ["الأخطبوط لديه ثلاثة قلوب 🐙","العسل لا يفسد أبدًا 🍯","الضوء يصل للأرض خلال 8 دقائق ☀️","القلب ينبض أكثر من 100 ألف مرة يوميًا ❤️","الفيلة لا تستطيع القفز 🐘"];
const funList = ["ابتسم الآن 😊","خذ نفسًا عميقًا 🌬️","الضحك يحسن التركيز 😄","ارقص قليلاً 💃","اشرب كوب ماء 💧"];
const quizList = [
{q:"ما هو أسرع حيوان بري؟",a:["الفهد","الأسد","الحصان"],c:0},
{q:"كم عدد كواكب المجموعة الشمسية؟",a:["7","8","9"],c:1},
{q:"ما هو أكبر محيط؟",a:["الهادئ","الأطلسي","الهندي"],c:0},
{q:"أين تقع أهرامات الجيزة؟",a:["مصر","العراق","المغرب"],c:0},
{q:"ما هو أطول نهر؟",a:["النيل","الأمازون","المسيسيبي"],c:0},
{q:"أي عنصر غازي نبيل؟",a:["الأكسجين","الهيليوم","الهيدروجين"],c:1},
{q:"أيهما أكبر كوكب؟",a:["الأرض","المشتري","زحل"],c:1},
{q:"من هو مخترع المصباح الكهربائي؟",a:["توماس إديسون","نيوتن","أينشتاين"],c:0},
{q:"ما لون دم الأخطبوط؟",a:["أزرق","أحمر","أخضر"],c:0},
{q:"ما الحيوان الذي لا ينام أبداً؟",a:["سمك القرش","القط","العقاب"],c:0}
];

function facts(){ closeMenu(); addPoints(1); let r=Math.floor(Math.random()*factsList.length); let symbol=["✦","✧","❤","💫","🌟","✨"]; content.innerHTML=`<h2>🧠 معلومة</h2><div class="fact">${factsList[r]} ${symbol[Math.floor(Math.random()*symbol.length)]}</div><button class="action dark" onclick="facts()">🔄 أخرى</button>`; successSound.play(); }

function fun(){ closeMenu(); addPoints(1); let r=Math.floor(Math.random()*funList.length); let symbol=["✨","💫","🌟","😂","❤"]; content.innerHTML=`<h2>🎲 تسلية</h2><div class="fact">${funList[r]} ${symbol[Math.floor(Math.random()*symbol.length)]}</div><button class="action gold" onclick="fun()">🔁 مرة أخرى</button>`; successSound.play(); }

function game(){ closeMenu(); loadQuestion(); }
function loadQuestion(){ let r=Math.floor(Math.random()*quizList.length); let q=quizList[r]; content.innerHTML=`<h2>🎮 ${q.q}</h2>`; for(let i=0;i<3;i++){content.innerHTML+=`<button class="action dark" onclick="checkAnswer(${i},${q.c})">${q.a[i]}</button>`;} }
function checkAnswer(selected,correct){ if(selected===correct){addPoints(3);successSound.play();confetti();alert("🎉 صحيح! +3 نقاط");} else{errorSound.play();alert("❌ خطأ!");} loadQuestion(); }

function progress(){ closeMenu(); content.innerHTML=`<h2>⭐ مستواك</h2><p>المستوى: <b>${level}</b></p><p>النقاط: <b>${points}</b></p><button class="action gold" onclick="saveProgress()">💾 حفظ التقدم</button>`; }

function share(){ closeMenu(); clickSound.play(); navigator.clipboard.writeText("جرب موقع معلومة في 30 ثانية | محفوظي"); alert("📤 تم نسخ رابط المشاركة!"); }

function about(){ closeMenu(); content.innerHTML=`<h2>ℹ️ عن الموقع</h2><p>موقع معلومات وتسلية ممتع</p><p>صُنع بواسطة <b>محفوظي</b> 💙</p>`; }

window.addEventListener("resize",()=>{particleCanvas.width=window.innerWidth; particleCanvas.height=window.innerHeight;});

// Confetti effect
function confetti(){for(let i=0;i<100;i++){let conf=document.createElement("div");conf.innerText="🎉";conf.style.position="fixed";conf.style.left=Math.random()*window.innerWidth+"px";conf.style.top="-30px";conf.style.fontSize=(10+Math.random()*20)+"px";conf.style.zIndex=20;conf.style.opacity=0.8;document.body.appendChild(conf);let fall=setInterval(()=>{let top=parseFloat(conf.style.top);conf.style.top=top+3+"px";if(top>window.innerHeight){conf.remove();clearInterval(fall);}},20);}}
