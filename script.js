const COA = {
    ZH: "https://commons.wikimedia.org/wiki/Special:FilePath/Wappen%20Z%C3%BCrich%20matt.svg",
    BE: "https://commons.wikimedia.org/wiki/Special:FilePath/Coa_Switzerland_Town_Bern.svg",
    SG: "https://commons.wikimedia.org/wiki/Special:FilePath/St.Gallen-coat%20of%20arms.svg",
    TG: "https://commons.wikimedia.org/wiki/Special:FilePath/Wappen%20Thurgau%20matt.svg",
    AG: "https://commons.wikimedia.org/wiki/Special:FilePath/Wappen%20Aargau%20matt.svg",
    ZG: "https://commons.wikimedia.org/wiki/Special:FilePath/Wappen%20Zug%20matt.svg",
    BS: "https://commons.wikimedia.org/wiki/Special:FilePath/Wappen%20Basel-Stadt%20matt.svg",
    BL: "https://commons.wikimedia.org/wiki/Special:FilePath/Wappen%20Basel-Landschaft%20matt.svg",
    SO: "https://commons.wikimedia.org/wiki/Special:FilePath/Wappen%20Solothurn%20matt.svg",
    SZ: "https://commons.wikimedia.org/wiki/Special:FilePath/Wappen%20Schwyz%20matt.svg",
    OW: "https://commons.wikimedia.org/wiki/Special:FilePath/Wappen%20Obwalden%20matt.svg",
    GR: "https://commons.wikimedia.org/wiki/Special:FilePath/Wappen%20Graub%C3%BCnden%20matt.svg",
    FR: "https://commons.wikimedia.org/wiki/Special:FilePath/Wappen%20Freiburg%20matt.svg",
};

const CANTONS = [
    { title: "Aargau", code: "AG",
        legal: ["Neujahrstag (1. Januar)","Berchtoldstag (2. Januar)","Karfreitag","Ostermontag","Tag der Arbeit (1. Mai)","Auffahrt","Pfingstmontag","Fronleichnam","Mariä Himmelfahrt (15. August)","Allerheiligen (1. November)","Mariä Empfängnis (8. Dezember)","Weihnachtstag (25. Dezember)","Stephanstag (26. Dezember)"],
        treated: [], notes: "" },
    { title: "Basel-Landschaft", code: "BL",
        legal: ["Neujahrstag (1. Januar)","Karfreitag","Ostermontag","Tag der Arbeit (1. Mai)","Auffahrt","Pfingstmontag","Weihnachtstag (25. Dezember)","Stephanstag (26. Dezember)"],
        treated: [], notes: "" },
    { title: "Basel-Stadt", code: "BS",
        legal: ["Neujahrstag (1. Januar)","Karfreitag","Ostermontag","Tag der Arbeit (1. Mai)","Auffahrt","Pfingstmontag","Weihnachtstag (25. Dezember)","Stephanstag (26. Dezember)"],
        treated: [], notes: "" },
    { title: "Bern", code: "BE",
        legal: ["Neujahrstag (1. Januar)","Berchtoldstag (2. Januar)","Karfreitag","Ostermontag","Auffahrt","Pfingstmontag","Weihnachtstag (25. Dezember)","Stephanstag (26. Dezember)"],
        treated: [], notes: "" },
    { title: "Freiburg", code: "FR",
        legal: ["Neujahrstag (1. Januar)","Karfreitag","Auffahrt","Fronleichnam","Mariä Himmelfahrt (15. August)","Allerheiligen (1. November)","Mariä Empfängnis (8. Dezember)","Weihnachtstag (25. Dezember)"],
        treated: ["Berchtoldstag (2. Januar)","Ostermontag","Pfingstmontag","Stephanstag (26. Dezember)"],
        notes: "Ausnahmen im Bezirk See (mehrere Gemeinden)." },
    { title: "Graubünden", code: "GR",
        legal: ["Neujahrstag (1. Januar)","Ostermontag","Auffahrt","Pfingstmontag","Weihnachtstag (25. Dezember)","Stephanstag (26. Dezember)"],
        treated: ["Karfreitag"], notes: "" },
    { title: "Obwalden", code: "OW",
        legal: ["Neujahrstag (1. Januar)","Karfreitag","Auffahrt","Fronleichnam","Mariä Himmelfahrt (15. August)","Bruderklausenfest (25. September)","Allerheiligen (1. November)","Mariä Empfängnis (8. Dezember)","Weihnachtstag (25. Dezember)"],
        treated: ["Berchtoldstag (2. Januar)","Ostermontag","Pfingstmontag","Stephanstag (26. Dezember)"], notes: "" },
    { title: "Schwyz", code: "SZ",
        legal: ["Neujahrstag (1. Januar)","Dreikönigstag (6. Januar)","Josephstag (19. März)","Karfreitag","Ostermontag","Auffahrt","Pfingstmontag","Fronleichnam","Mariä Himmelfahrt (15. August)","Allerheiligen (1. November)","Mariä Empfängnis (8. Dezember)","Weihnachtstag (25. Dezember)","Stephanstag (26. Dezember)"],
        treated: [], notes: "" },
    { title: "Solothurn", code: "SO",
        legal: ["Neujahrstag (1. Januar)","Josephstag (19. März, teilw.)","Karfreitag","Tag der Arbeit (1. Mai, ab 12:00)","Auffahrt","Fronleichnam","Mariä Himmelfahrt (15. August)","Allerheiligen (1. November)","Weihnachtstag (25. Dezember)"],
        treated: ["Berchtoldstag (2. Januar)","Ostermontag","Pfingstmontag","Fronleichnam (Bezirk Bucheggberg: wie gesetzlich)","Mariä Himmelfahrt (Bezirk Bucheggberg: wie gesetzlich)","Allerheiligen (Bezirk Bucheggberg: wie gesetzlich)","Stephanstag (26. Dezember)"],
        notes: "Viele lokale Patroziniumsfeste; Bucheggberg hat abweichende Regelungen." },
    { title: "St. Gallen", code: "SG",
        legal: ["Neujahrstag (1. Januar)","Karfreitag","Ostermontag","Auffahrt","Pfingstmontag","Allerheiligen (1. November)","Weihnachtstag (25. Dezember)","Stephanstag (26. Dezember)"],
        treated: ["Berchtoldstag (2. Januar)"], notes: "" },
    { title: "Thurgau", code: "TG",
        legal: ["Neujahrstag (1. Januar)","Berchtoldstag (2. Januar)","Karfreitag","Ostermontag","Tag der Arbeit (1. Mai)","Auffahrt","Pfingstmontag","Weihnachtstag (25. Dezember)","Stephanstag (26. Dezember)"],
        treated: [], notes: "" },
    { title: "Zug", code: "ZG",
        legal: ["Neujahrstag (1. Januar)","Karfreitag","Auffahrt","Fronleichnam","Mariä Himmelfahrt (15. August)","Allerheiligen (1. November)","Mariä Empfängnis (8. Dezember)","Weihnachtstag (25. Dezember)"],
        treated: ["Berchtoldstag (2. Januar)","Ostermontag","Pfingstmontag","Stephanstag (26. Dezember)"], notes: "" },
    { title: "Zürich", code: "ZH",
        legal: ["Neujahrstag (1. Januar)","Berchtoldstag (2. Januar)","Karfreitag","Ostermontag","Tag der Arbeit (1. Mai)","Auffahrt","Pfingstmontag","Weihnachtstag (25. Dezember)","Stephanstag (26. Dezember)"],
        treated: [], notes: "" },
];

function easterSunday(year){
    const a = year % 19, b = Math.floor(year/100), c = year % 100;
    const d = Math.floor(b/4), e = b % 4, f = Math.floor((b+8)/25);
    const g = Math.floor((b - f + 1)/3), h = (19*a + b - d - g + 15) % 30;
    const i = Math.floor(c/4), k = c % 4, l = (32 + 2*e + 2*i - h - k) % 7;
    const m = Math.floor((a + 11*h + 22*l)/451);
    const month = Math.floor((h + l - 7*m + 114)/31);
    const day = ((h + l - 7*m + 114) % 31) + 1;
    return new Date(Date.UTC(year, month-1, day));
}
function addDays(date, days){ const d=new Date(date); d.setUTCDate(d.getUTCDate()+days); return d; }
function fmt(d){ return d.toLocaleDateString("de-CH",{timeZone:"UTC", day:"2-digit", month:"2-digit", year:"numeric"}); }

const RULES = {
    "Neujahrstag (1. Januar)": y => new Date(Date.UTC(y,0,1)),
    "Berchtoldstag (2. Januar)": y => new Date(Date.UTC(y,0,2)),
    "Dreikönigstag (6. Januar)": y => new Date(Date.UTC(y,0,6)),
    "Josephstag (19. März)": y => new Date(Date.UTC(y,2,19)),
    "Karfreitag": y => addDays(easterSunday(y), -2),
    "Ostermontag": y => addDays(easterSunday(y), +1),
    "Tag der Arbeit (1. Mai)": y => new Date(Date.UTC(y,4,1)),
    "Auffahrt": y => addDays(easterSunday(y), +39),
    "Pfingstmontag": y => addDays(easterSunday(y), +50),
    "Fronleichnam": y => addDays(easterSunday(y), +60),
    "Mariä Himmelfahrt (15. August)": y => new Date(Date.UTC(y,7,15)),
    "Allerheiligen (1. November)": y => new Date(Date.UTC(y,10,1)),
    "Mariä Empfängnis (8. Dezember)": y => new Date(Date.UTC(y,11,8)),
    "Weihnachtstag (25. Dezember)": y => new Date(Date.UTC(y,11,25)),
    "Stephanstag (26. Dezember)": y => new Date(Date.UTC(y,11,26)),
    "Bruderklausenfest (25. September)": y => new Date(Date.UTC(y,8,25)),
    "Josephstag (19. März, teilw.)": y => new Date(Date.UTC(y,2,19)),
};

const elList = document.getElementById("cantons");
function renderList(){
    const items = CANTONS.slice().sort((a,b)=>a.title.localeCompare(b.title,"de"));
    elList.innerHTML = "";
    items.forEach(c => {
        const card = document.createElement("button");
        card.className = "card"; card.type="button"; card.setAttribute("aria-label", `${c.title} oeffnen`);
        card.innerHTML = `
      <img class="coa" alt="Wappen ${c.title}" src="${COA[c.code]}"/>
      <div><h2>${c.title}</h2></div>
      <span class="chev" aria-hidden="true">
        <svg width="20" height="20" viewBox="0 0 24 24"><path d="M9 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </span>`;
        card.addEventListener("click", ()=> openModal(c.code));
        elList.appendChild(card);
    });
}

const modal = document.getElementById("modal");
const elTitle = document.getElementById("modalTitle");
const elCoa = document.getElementById("modalCoa");
const elYear = document.getElementById("year");
const elColumns = document.getElementById("modalColumns");
const btnIcs = document.getElementById("downloadIcs");

function yearsRange(){
    const y = new Date().getUTCFullYear();
    const count = 9; // y .. y+8
    return Array.from({length: count}, (_,i)=> y + i);
}
function fillYears(sel){
    sel.innerHTML = "";
    yearsRange().forEach(y=>{
        const o = document.createElement("option");
        o.value = y; o.textContent = y;
        if(y===new Date().getUTCFullYear()) o.selected = true;
        sel.appendChild(o);
    });
}

function computeList(names, year){
    return names.map(n=>{
        const rule = RULES[n] || RULES[n.replace(", teilw.","")];
        if(!rule){ return { name:n, date:null }; }
        const d = rule(year);
        return { name:n, date:d };
    });
}
function fmtList(items){
    const ul = document.createElement("ul");
    ul.className = "list";
    items.forEach(({name,date})=>{
        const li = document.createElement("li");
        li.textContent = date ? `${name} – ${fmt(date)}` : name;
        ul.appendChild(li);
    });
    return ul;
}

function pad(n){ return String(n).padStart(2,"0"); }
function yyyymmdd(d){
    return d.getUTCFullYear() + pad(d.getUTCMonth()+1) + pad(d.getUTCDate());
}
function yyyymmddNext(d){ return yyyymmdd(addDays(d,1)); }
function timestampUTC(){
    const now = new Date();
    return (
        now.getUTCFullYear() +
        pad(now.getUTCMonth()+1) +
        pad(now.getUTCDate()) + "T" +
        pad(now.getUTCHours()) +
        pad(now.getUTCMinutes()) +
        pad(now.getUTCSeconds()) + "Z"
    );
}
function icsEscape(s){
    return String(s)
        .replace(/\\/g,"\\\\")
        .replace(/;/g,"\\;")
        .replace(/,/g,"\\,")
        .replace(/\n/g,"\\n");
}
function buildIcs(canton, year, leg, tr){
    const lines = [];
    lines.push("BEGIN:VCALENDAR");
    lines.push("VERSION:2.0");
    lines.push("PRODID:-//Deine Firma//Feiertage//DE");
    lines.push("CALSCALE:GREGORIAN");
    lines.push("METHOD:PUBLISH");
    lines.push("X-WR-CALNAME:Feiertage – " + icsEscape(canton.title) + " " + year);

    const stamp = timestampUTC();

    function addEvent(name, date, category){
        if(!date) return;
        const dt = yyyymmdd(date);
        const dtEnd = yyyymmddNext(date);
        const uid = `${dt}-${canton.code}-${category}-${Math.random().toString(16).slice(2)}@feiertage`;
        lines.push("BEGIN:VEVENT");
        lines.push("UID:" + uid);
        lines.push("DTSTAMP:" + stamp);
        lines.push("DTSTART;VALUE=DATE:" + dt);
        lines.push("DTEND;VALUE=DATE:" + dtEnd);
        lines.push("SUMMARY:" + icsEscape(name));
        lines.push("CATEGORIES:" + icsEscape(category));
        lines.push("DESCRIPTION:" + icsEscape(`Kanton ${canton.title} – ${category}`));
        lines.push("END:VEVENT");
    }

    leg.forEach(({name,date}) => addEvent(name, date, "Gesetzlich"));
    tr.forEach(({name,date})  => addEvent(name, date, "Wie gesetzlich"));

    lines.push("END:VCALENDAR");
    return lines.join("\r\n");
}
function downloadIcsFile(filename, content){
    const blob = new Blob([content], { type: "text/calendar;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(a.href);
    a.remove();
}

function openModal(code){
    const canton = CANTONS.find(c=>c.code===code);
    if(!canton) return;

    document.body.classList.add("no-scroll");

    elTitle.textContent = canton.title;
    elCoa.src = COA[code]; elCoa.alt = `Wappen ${canton.title}`;
    fillYears(elYear);

    function update(){
        const y = parseInt(elYear.value,10);
        const leg = computeList(canton.legal, y);
        const tr  = computeList(canton.treated, y);

        elColumns.innerHTML = "";

        const sec1 = document.createElement("section");
        sec1.className = "section";
        sec1.innerHTML = `<h3>Gesetzlich anerkannte Feiertage</h3>`;
        sec1.appendChild(fmtList(leg));
        elColumns.appendChild(sec1);

        if(tr.length > 0){
            const sec2 = document.createElement("section");
            sec2.className = "section";
            sec2.innerHTML = `<h3>Tage, die wie gesetzliche Feiertage gelten</h3>`;
            sec2.appendChild(fmtList(tr));
            if(canton.notes){
                const p = document.createElement("p");
                p.className = "muted"; p.style.marginTop = "8px";
                p.textContent = `Hinweis: ${canton.notes}`;
                sec2.appendChild(p);
            }
            elColumns.appendChild(sec2);
        }

        if(btnIcs){
            btnIcs.onclick = () => {
                const ics = buildIcs(canton, y, leg, tr);
                const file = `Feiertage_${canton.title.replace(/\\s+/g,"")}_${y}.ics`;
                downloadIcsFile(file, ics);
            };
        }
    }
    elYear.onchange = update;
    update();

    modal.setAttribute("aria-hidden","false");
}
function closeModal(){
    modal.setAttribute("aria-hidden","true");
    document.body.classList.remove("no-scroll");
}
modal.addEventListener("click", e => { if(e.target.dataset.close!==undefined) closeModal(); });
const closeBtn = document.getElementById("closeBtn");
if(closeBtn) closeBtn.addEventListener("click", closeModal);

renderList();

document.getElementById("footerYear").textContent = new Date().getFullYear();