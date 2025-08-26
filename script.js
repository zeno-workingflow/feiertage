const COA = {
    ZH:"https://commons.wikimedia.org/wiki/Special:FilePath/Wappen%20Z%C3%BCrich%20matt.svg",
    BE:"https://commons.wikimedia.org/wiki/Special:FilePath/Coa_Switzerland_Town_Bern.svg",
    SG:"https://commons.wikimedia.org/wiki/Special:FilePath/St.Gallen-coat%20of%20arms.svg",
    TG:"https://commons.wikimedia.org/wiki/Special:FilePath/Wappen%20Thurgau%20matt.svg",
    AG:"https://commons.wikimedia.org/wiki/Special:FilePath/Wappen%20Aargau%20matt.svg",
    ZG:"https://commons.wikimedia.org/wiki/Special:FilePath/Wappen%20Zug%20matt.svg",
    BS:"https://commons.wikimedia.org/wiki/Special:FilePath/Wappen%20Basel-Stadt%20matt.svg",
    BL:"https://commons.wikimedia.org/wiki/Special:FilePath/Wappen%20Basel-Landschaft%20matt.svg",
    SO:"https://commons.wikimedia.org/wiki/Special:FilePath/Wappen%20Solothurn%20matt.svg",
    SZ:"https://commons.wikimedia.org/wiki/Special:FilePath/Wappen%20Schwyz%20matt.svg",
    OW:"https://commons.wikimedia.org/wiki/Special:FilePath/Wappen%20Obwalden%20matt.svg",
    GR:"https://commons.wikimedia.org/wiki/Special:FilePath/Wappen%20Graub%C3%BCnden%20matt.svg",
    FR:"https://commons.wikimedia.org/wiki/Special:FilePath/Wappen%20Freiburg%20matt.svg"
};

const CANTONS=[
    {title:"Aargau",code:"AG"},
    {title:"Basel-Landschaft",code:"BL"},
    {title:"Basel-Stadt",code:"BS"},
    {title:"Bern",code:"BE"},
    {title:"Freiburg",code:"FR"},
    {title:"Graubünden",code:"GR"},
    {title:"Obwalden",code:"OW"},
    {title:"Schwyz",code:"SZ"},
    {title:"Solothurn",code:"SO"},
    {title:"St. Gallen",code:"SG"},
    {title:"Thurgau",code:"TG"},
    {title:"Zug",code:"ZG"},
    {title:"Zürich",code:"ZH"}
];

const STANDARD_LEGAL=[
    "Neujahrstag","Berchtoldstag","Karfreitag","Ostern","Ostermontag","Tag der Arbeit","Auffahrt","Pfingsten","Pfingstmontag","Fronleichnam","Nationalfeiertag","Mariä Himmelfahrt","Allerheiligen","Mariä Empfängnis","Heiligabend","Weihnachtstag","Stephanstag","Silvester"
];

const LOCAL_BY_CANTON={
    ZH:["Sechseläuten","Knabenschiessen"],
    AG:["Rüeblimärt Aarau","Bettagsmontag (regional)"],
    BS:["Basler Fasnacht"],
    BL:["Banntag Liestal"],
    SG:["Gallustag"],
    BE:["Zibelemärit Bern"],
    FR:[],
    GR:[],
    OW:[],
    SZ:[],
    SO:[],
    TG:[],
    ZG:[]
};

function easterSunday(year){
    const a=year%19,b=Math.floor(year/100),c=year%100;
    const d=Math.floor(b/4),e=b%4,f=Math.floor((b+8)/25);
    const g=Math.floor((b-f+1)/3),h=(19*a+b-d-g+15)%30;
    const i=Math.floor(c/4),k=c%4,l=(32+2*e+2*i-h-k)%7;
    const m=Math.floor((a+11*h+22*l)/451);
    const month=Math.floor((h+l-7*m+114)/31);
    const day=((h+l-7*m+114)%31)+1;
    return new Date(Date.UTC(year,month-1,day));
}
function addDays(date,days){const d=new Date(date);d.setUTCDate(d.getUTCDate()+days);return d;}
function fmt(d){return d.toLocaleDateString("de-CH",{timeZone:"UTC",day:"2-digit",month:"2-digit",year:"numeric"});}
function cleanName(s){return String(s).replace(/\s*\([^)]*\)/g,"");}

function thirdMondayOfApril(y){const d=new Date(Date.UTC(y,3,1));let c=0;for(let i=1;i<=30;i++){d.setUTCDate(i);if(d.getUTCDay()===1){c++;if(c===3)return new Date(d);}}return null;}
function sechselauten(y){const t=thirdMondayOfApril(y);const em=addDays(easterSunday(y),1);if(t&&t.getTime()===em.getTime())return addDays(t,7);return t;}
function mondayAfterSecondSundaySeptember(y){const d=new Date(Date.UTC(y,8,1));let s=0;for(let i=1;i<=30;i++){d.setUTCDate(i);if(d.getUTCDay()===0){s++;if(s===2)return addDays(new Date(d),1);}}return null;}
function baslerFasnacht(y){const start=addDays(easterSunday(y),-41);const end=addDays(start,2);return {start,end};}
function banntagLiestal(y){return addDays(easterSunday(y),36);}
function lastMondayOfNovember(y){const d=new Date(Date.UTC(y,10,30));while(d.getUTCDay()!==1)d.setUTCDate(d.getUTCDate()-1);return d;}
function zibelemaerit(y){return lastMondayOfNovember(y);}
function firstWeekdayOfMonth(y,m,weekday){const d=new Date(Date.UTC(y,m,1));while(d.getUTCDay()!==weekday)d.setUTCDate(d.getUTCDate()+1);return d;}
function rueblimaertAarau(y){return firstWeekdayOfMonth(y,10,3);}
function bettagsmontagRegional(y){const d=new Date(Date.UTC(y,8,1));let suns=0;for(let i=1;i<=30;i++){d.setUTCDate(i);if(d.getUTCDay()===0){suns++;if(suns===3)return addDays(new Date(d),1);}}return null;}
function gallustag(y){return new Date(Date.UTC(y,9,16));}

const RULES={
    "Neujahrstag":y=>new Date(Date.UTC(y,0,1)),
    "Berchtoldstag":y=>new Date(Date.UTC(y,0,2)),
    "Karfreitag":y=>addDays(easterSunday(y),-2),
    "Ostern":y=>easterSunday(y),
    "Ostermontag":y=>addDays(easterSunday(y),1),
    "Tag der Arbeit":y=>new Date(Date.UTC(y,4,1)),
    "Auffahrt":y=>addDays(easterSunday(y),39),
    "Pfingsten":y=>addDays(easterSunday(y),49),
    "Pfingstmontag":y=>addDays(easterSunday(y),50),
    "Fronleichnam":y=>addDays(easterSunday(y),60),
    "Nationalfeiertag":y=>new Date(Date.UTC(y,7,1)),
    "Mariä Himmelfahrt":y=>new Date(Date.UTC(y,7,15)),
    "Allerheiligen":y=>new Date(Date.UTC(y,10,1)),
    "Mariä Empfängnis":y=>new Date(Date.UTC(y,11,8)),
    "Heiligabend":y=>new Date(Date.UTC(y,11,24)),
    "Weihnachtstag":y=>new Date(Date.UTC(y,11,25)),
    "Stephanstag":y=>new Date(Date.UTC(y,11,26)),
    "Silvester":y=>new Date(Date.UTC(y,11,31)),
    "Sechseläuten":y=>sechselauten(y),
    "Knabenschiessen":y=>mondayAfterSecondSundaySeptember(y),
    "Basler Fasnacht":y=>baslerFasnacht(y),
    "Banntag Liestal":y=>banntagLiestal(y),
    "Gallustag":y=>gallustag(y),
    "Zibelemärit Bern":y=>zibelemaerit(y),
    "Rüeblimärt Aarau":y=>rueblimaertAarau(y),
    "Bettagsmontag (regional)":y=>bettagsmontagRegional(y)
};

function toSpan(v){if(!v)return null; if(v instanceof Date){return {start:v,end:v};} if(v.start||v.end){return {start:v.start,end:v.end||v.start};} return null;}

function computeHolidayLists(canton,year){
    const legal=STANDARD_LEGAL.map(n=>{const r=RULES[n]||RULES[cleanName(n)];const s=toSpan(r?r(year):null);return s?{name:cleanName(n),start:s.start,end:s.end}:null;})
        .filter(Boolean).sort((a,b)=>a.start-b.start);
    const local=(LOCAL_BY_CANTON[canton.code]||[]).map(n=>{const r=RULES[n]||RULES[cleanName(n)];const s=toSpan(r?r(year):null);return s?{name:cleanName(n),start:s.start,end:s.end}:null;})
        .filter(Boolean).sort((a,b)=>a.start-b.start);
    return {legal,local};
}

const elList=document.getElementById("cantons");
function renderList(){
    const items=CANTONS.slice().sort((a,b)=>a.title.localeCompare(b.title,"de"));
    elList.innerHTML="";
    items.forEach(c=>{
        const card=document.createElement("button");
        card.className="card"; card.type="button"; card.setAttribute("aria-label",`${c.title} oeffnen`);
        card.innerHTML=`
      <img class="coa" alt="Wappen ${c.title}" src="${COA[c.code]}"/>
      <div><h2>${c.title}</h2></div>
      <span class="chev" aria-hidden="true">
        <svg width="20" height="20" viewBox="0 0 24 24"><path d="M9 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </span>`;
        card.addEventListener("click",()=>openModal(c.code));
        elList.appendChild(card);
    });
}

const modal=document.getElementById("modal");
const elTitle=document.getElementById("modalTitle");
const elCoa=document.getElementById("modalCoa");
const elYear=document.getElementById("year");
let elColumns=document.getElementById("modalColumns");
const btnIcs=document.getElementById("downloadIcs");

function yearsRange(){const y=new Date().getUTCFullYear();const count=9;return Array.from({length:count},(_,i)=>y+i);}
function fillYears(sel){sel.innerHTML="";yearsRange().forEach(y=>{const o=document.createElement("option");o.value=y;o.textContent=y;if(y===new Date().getUTCFullYear())o.selected=true;sel.appendChild(o);});}

function fmtRange(s,e){const same=s.getUTCFullYear()===e.getUTCFullYear()&&s.getUTCMonth()===e.getUTCMonth()&&s.getUTCDate()===e.getUTCDate();return same?fmt(s):fmt(s).replace(/\.\d{4}$/,"")+"–"+fmt(e);}
function fmtList(items){
    const ul=document.createElement("ul");
    ul.className="list";
    items.forEach(({name,start,end})=>{
        const li=document.createElement("li");
        li.textContent=`${name} – ${fmtRange(start,end)}`;
        ul.appendChild(li);
    });
    return ul;
}

function pad(n){return String(n).padStart(2,"0");}
function yyyymmdd(d){return d.getUTCFullYear()+pad(d.getUTCMonth()+1)+pad(d.getUTCDate());}
function timestampUTC(){const now=new Date();return now.getUTCFullYear()+pad(now.getUTCMonth()+1)+pad(now.getUTCDate())+"T"+pad(now.getUTCHours())+pad(now.getUTCMinutes())+pad(now.getUTCSeconds())+"Z";}
function icsEscape(s){return String(s).replace(/\\/g,"\\\\").replace(/;/g,"\\;").replace(/,/g,"\\,").replace(/\n/g,"\\n");}
function addOneDay(d){return addDays(d,1);}
function buildIcs(canton,year,legal,local){
    const lines=[];
    lines.push("BEGIN:VCALENDAR");
    lines.push("VERSION:2.0");
    lines.push("PRODID:-//Deine Firma//Feiertage//DE");
    lines.push("CALSCALE:GREGORIAN");
    lines.push("METHOD:PUBLISH");
    lines.push("X-WR-CALNAME:Feiertage – "+icsEscape(canton.title)+" "+year);
    const stamp=timestampUTC();
    function addEvent(name,start,end,category){
        if(!start||!end)return;
        const dt=yyyymmdd(start);
        const dtEnd=yyyymmdd(addOneDay(end));
        const uid=`${dt}-${canton.code}-${category}-${Math.random().toString(16).slice(2)}@feiertage`;
        lines.push("BEGIN:VEVENT");
        lines.push("UID:"+uid);
        lines.push("DTSTAMP:"+stamp);
        lines.push("DTSTART;VALUE=DATE:"+dt);
        lines.push("DTEND;VALUE=DATE:"+dtEnd);
        lines.push("SUMMARY:"+icsEscape(cleanName(name)));
        lines.push("CATEGORIES:"+icsEscape(category));
        lines.push("DESCRIPTION:"+icsEscape(`Kanton ${canton.title} – ${category}`));
        lines.push("END:VEVENT");
    }
    legal.forEach(({name,start,end})=>addEvent(name,start,end,"Gesetzlich"));
    local.forEach(({name,start,end})=>addEvent(name,start,end,"Lokal"));
    lines.push("END:VCALENDAR");
    return lines.join("\r\n");
}
function downloadIcsFile(filename,content){
    const blob=new Blob([content],{type:"text/calendar;charset=utf-8"});
    const a=document.createElement("a");
    a.href=URL.createObjectURL(blob);
    a.download=filename;
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(a.href);
    a.remove();
}

function openModal(code){
    const canton=CANTONS.find(c=>c.code===code);
    if(!canton)return;
    document.body.classList.add("no-scroll");
    elTitle.textContent=canton.title;
    elCoa.src=COA[code]; elCoa.alt=`Wappen ${canton.title}`;
    fillYears(elYear);

    function update(){
        const y=parseInt(elYear.value,10);
        const {legal,local}=computeHolidayLists(canton,y);

        const grid=document.createElement("div");
        grid.className="modal-columns";
        grid.style.display="grid";
        grid.style.gridTemplateColumns="1fr 1fr";
        grid.style.gap="20px";

        const sec1=document.createElement("section");
        sec1.className="section";
        sec1.innerHTML=`<h3>Gesetzliche Feiertage</h3>`;
        sec1.appendChild(fmtList(legal));

        const rightWrap=document.createElement("div");
        if(local.length>0){
            const secLoc=document.createElement("section");
            secLoc.className="section";
            secLoc.innerHTML=`<h3>Lokale Feiertage</h3>`;
            secLoc.appendChild(fmtList(local));
            rightWrap.appendChild(secLoc);
        }

        grid.appendChild(sec1);
        const rightCol=document.createElement("div"); rightCol.appendChild(rightWrap);
        grid.appendChild(rightCol);

        elColumns.replaceWith(grid);
        elColumns=grid;

        if(btnIcs){
            btnIcs.onclick=()=>{const ics=buildIcs(canton,y,legal,local);const file=`Feiertage_${canton.title.replace(/\s+/g,"")}_${y}.ics`;downloadIcsFile(file,ics);};
        }
    }
    elYear.onchange=update;
    update();
    modal.setAttribute("aria-hidden","false");
}
function closeModal(){modal.setAttribute("aria-hidden","true");document.body.classList.remove("no-scroll");}
modal.addEventListener("click",e=>{if(e.target.dataset.close!==undefined)closeModal();});
const closeBtn=document.getElementById("closeBtn"); if(closeBtn) closeBtn.addEventListener("click",closeModal);

renderList();
document.getElementById("footerYear").textContent=new Date().getFullYear();