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
    FR: "https://commons.wikimedia.org/wiki/Special:FilePath/Wappen%20Freiburg%20matt.svg"
};

const CANTONS = [
    { title: "Aargau", code: "AG" },
    { title: "Basel-Landschaft", code: "BL" },
    { title: "Basel-Stadt", code: "BS" },
    { title: "Bern", code: "BE" },
    { title: "Freiburg", code: "FR" },
    { title: "Graubünden", code: "GR" },
    { title: "Obwalden", code: "OW" },
    { title: "Schwyz", code: "SZ" },
    { title: "Solothurn", code: "SO" },
    { title: "St. Gallen", code: "SG" },
    { title: "Thurgau", code: "TG" },
    { title: "Zug", code: "ZG" },
    { title: "Zürich", code: "ZH" }
];

const LOCAL_BY_CANTON = {
    ZH: ["Sechseläuten", "Knabenschiessen"],
    AG: ["Rüeblimärt Aarau", "Bettagsmontag (regional)"],
    BS: ["Basler Fasnacht"],
    BL: ["Fasnacht (Baselbiet)", "Fasnachtsmittwoch (Baselbiet)", "Banntag Liestal"],
    SG: ["Gallustag"],
    BE: ["Zibelemärit Bern"],
    FR: [],
    GR: [],
    OW: [],
    SZ: [],
    SO: [],
    TG: [],
    ZG: []
};


function easterSunday(y) {
    const a = y % 19, b = Math.floor(y / 100), c = y % 100;
    const d = Math.floor(b / 4), e = b % 4, f = Math.floor((b + 8) / 25);
    const g = Math.floor((b - f + 1) / 3), h = (19 * a + b - d - g + 15) % 30;
    const i = Math.floor(c / 4), k = c % 4, l = (32 + 2 * e + 2 * i - h - k) % 7;
    const m = Math.floor((a + 11 * h + 22 * l) / 451);
    const mo = Math.floor((h + l - 7 * m + 114) / 31);
    const da = ((h + l - 7 * m + 114) % 31) + 1;
    return new Date(Date.UTC(y, mo - 1, da));
}
function addDays(d, n) { const x = new Date(d); x.setUTCDate(x.getUTCDate() + n); return x; }
function fmt(d) {
    return d.toLocaleDateString("de-CH", { timeZone: "UTC", day: "2-digit", month: "2-digit", year: "numeric" });
}
function cleanName(s) { return String(s).replace(/\s*\([^)]*\)/g, ""); }
function toSpan(v) {
    if (!v) return null;
    if (v instanceof Date) return { start: v, end: v };
    if (v.start || v.end) return { start: v.start, end: v.end || v.start };
    return null;
}


function thirdMondayOfApril(y) {
    const d = new Date(Date.UTC(y, 3, 1));
    let c = 0;
    for (let i = 1; i <= 30; i++) {
        d.setUTCDate(i);
        if (d.getUTCDay() === 1) { c++; if (c === 3) return new Date(d); }
    }
    return null;
}
function sechselauten(y) {
    const t = thirdMondayOfApril(y);
    const em = addDays(easterSunday(y), 1);
    if (t && t.getTime() === em.getTime()) return addDays(t, 7);
    return t;
}
function mondayAfterSecondSundaySeptember(y) {
    const d = new Date(Date.UTC(y, 8, 1));
    let s = 0;
    for (let i = 1; i <= 30; i++) {
        d.setUTCDate(i);
        if (d.getUTCDay() === 0) { s++; if (s === 2) return addDays(new Date(d), 1); }
    }
    return null;
}
function ashWednesday(y) { return addDays(easterSunday(y), -46); }
function baslerFasnachtRange(y) {
    const start = addDays(ashWednesday(y), 5);
    const end = addDays(start, 2);
    return { start, end };
}
function baselbietFasnachtMon(y) { return addDays(ashWednesday(y), 5); }
function baselbietFasnachtsMittwoch(y) { return addDays(ashWednesday(y), 7); }
function banntagLiestal(y) { return addDays(easterSunday(y), 36); }
function lastMondayOfNovember(y) { const d = new Date(Date.UTC(y, 10, 30)); while (d.getUTCDay() !== 1) d.setUTCDate(d.getUTCDate() - 1); return d; }
function zibelemaerit(y) { return lastMondayOfNovember(y); }
function firstWednesdayOfNovember(y) { const d = new Date(Date.UTC(y, 10, 1)); while (d.getUTCDay() !== 3) d.setUTCDate(d.getUTCDate() + 1); return d; }
function rueblimaertAarau(y) { return firstWednesdayOfNovember(y); }
function bettagsmontagRegional(y) {
    const d = new Date(Date.UTC(y, 8, 1));
    let suns = 0;
    for (let i = 1; i <= 30; i++) {
        d.setUTCDate(i);
        if (d.getUTCDay() === 0) { suns++; if (suns === 3) return addDays(new Date(d), 1); }
    }
    return null;
}
function gallustag(y) { return new Date(Date.UTC(y, 9, 16)); }


const RULES = {
    "Neujahr": y => new Date(Date.UTC(y, 0, 1)),
    "Berchtoldstag": y => new Date(Date.UTC(y, 0, 2)),
    "Karfreitag": y => addDays(easterSunday(y), -2),
    "Ostermontag": y => addDays(easterSunday(y), 1),
    "Auffahrt": y => addDays(easterSunday(y), 39),
    "Pfingstmontag": y => addDays(easterSunday(y), 50),
    "Fronleichnam": y => addDays(easterSunday(y), 60),
    "Nationalfeiertag Schweiz": y => new Date(Date.UTC(y, 7, 1)),
    "Weihnachten": y => new Date(Date.UTC(y, 11, 25)),
    "Stephanstag": y => new Date(Date.UTC(y, 11, 26)),
    "Tag der Arbeit": y => new Date(Date.UTC(y, 4, 1)),
    "Mariä Himmelfahrt": y => new Date(Date.UTC(y, 7, 15)),
    "Allerheiligen": y => new Date(Date.UTC(y, 10, 1)),
    "Mariä Empfängnis": y => new Date(Date.UTC(y, 11, 8)),
    "Heilige drei Könige": y => new Date(Date.UTC(y, 0, 6)),
    "St. Josef": y => new Date(Date.UTC(y, 2, 19)),
    "St. Benediktstag": y => new Date(Date.UTC(y, 2, 21)),
    "St. Niklaus von Flüe": y => new Date(Date.UTC(y, 8, 25)),
    "Heiligkreuztag": y => new Date(Date.UTC(y, 8, 14)),
    "St. Antoniustag": y => new Date(Date.UTC(y, 0, 17)),
    "St. Meinradstag": y => new Date(Date.UTC(y, 0, 21)),
    "St. Agatha": y => new Date(Date.UTC(y, 1, 5)),
    "Heiliger Sigismund": y => new Date(Date.UTC(y, 4, 1)),
    "Engelweihe": y => new Date(Date.UTC(y, 8, 14)),
    "St. Martin": y => new Date(Date.UTC(y, 10, 11)),
    "St. Blasius": y => new Date(Date.UTC(y, 1, 3)),
    "St. Germanstag": y => new Date(Date.UTC(y, 1, 21)),
    "Fridolinstag": y => new Date(Date.UTC(y, 2, 6)),
    "St. Peter und Paul": y => new Date(Date.UTC(y, 5, 29)),
    "St. Ulrich": y => new Date(Date.UTC(y, 6, 4)),
    "St. Mauritiustag": y => new Date(Date.UTC(y, 8, 22)),
    "St. Urs und Viktor": y => new Date(Date.UTC(y, 8, 30)),
    "Wendelinstag": y => new Date(Date.UTC(y, 9, 20)),
    "Gallustag": y => new Date(Date.UTC(y, 9, 16)),
    "St. Lukas": y => new Date(Date.UTC(y, 9, 18)),
    "Mariä Geburt": y => new Date(Date.UTC(y, 8, 8)),
    "St. Burkard": y => new Date(Date.UTC(y, 5, 2)),
    "Germanstag": y => new Date(Date.UTC(y, 6, 2)),
    "Verenatag": y => new Date(Date.UTC(y, 8, 1)),
    "St. Michael": y => new Date(Date.UTC(y, 8, 29)),
    "Sechseläuten": y => sechselauten(y),
    "Knabenschiessen": y => mondayAfterSecondSundaySeptember(y),
    "Basler Fasnacht": y => baslerFasnachtRange(y),
    "Fasnacht (Baselbiet)": y => baselbietFasnachtMon(y),
    "Fasnachtsmittwoch (Baselbiet)": y => baselbietFasnachtsMittwoch(y),
    "Banntag Liestal": y => banntagLiestal(y),
    "Zibelemärit Bern": y => zibelemaerit(y),
    "Rüeblimärt Aarau": y => rueblimaertAarau(y),
    "Bettagsmontag (regional)": y => bettagsmontagRegional(y)
};

const LEGAL_BY_CANTON = {
    AG: ["Neujahr","Berchtoldstag","Karfreitag","Ostermontag","Auffahrt","St. Burkard","Pfingstmontag","Fronleichnam","Germanstag","Nationalfeiertag Schweiz","Mariä Himmelfahrt","Verenatag","St. Michael","Allerheiligen","Mariä Empfängnis","Weihnachten","Stephanstag"],
    BL: ["Neujahr","Fasnacht (Baselbiet)","Fasnachtsmittwoch (Baselbiet)","Karfreitag","Ostermontag","Tag der Arbeit","Auffahrt","Pfingstmontag","Nationalfeiertag Schweiz","Allerheiligen","Weihnachten","Stephanstag"],
    BS: ["Neujahr","Karfreitag","Ostermontag","Tag der Arbeit","Auffahrt","Pfingstmontag","Nationalfeiertag Schweiz","Weihnachten","Stephanstag"],
    BE: ["Neujahr","Berchtoldstag","Karfreitag","Ostermontag","Auffahrt","Pfingstmontag","Nationalfeiertag Schweiz","Weihnachten","Stephanstag"],
    FR: ["Neujahr","Berchtoldstag","Karfreitag","Ostermontag","Auffahrt","Pfingstmontag","Fronleichnam","Nationalfeiertag Schweiz","Mariä Himmelfahrt","Allerheiligen","Mariä Empfängnis","Weihnachten","Stephanstag"],
    GR: ["Neujahr","Heilige drei Könige","Fest des hl. Sebastian","St. Josef","Karfreitag","Ostermontag","Auffahrt","Pfingstmontag","Fronleichnam","St. Peter und Paul","St. Jakob","Nationalfeiertag Schweiz","Mariä Himmelfahrt","Allerheiligen","Mariä Empfängnis","Weihnachten","Stephanstag"],
    OW: ["Neujahr","St. Benediktstag","Karfreitag","Auffahrt","Fronleichnam","Nationalfeiertag Schweiz","Mariä Himmelfahrt","St. Niklaus von Flüe","Allerheiligen","Mariä Empfängnis","Weihnachten"],
    SZ: ["Neujahr","Heilige drei Könige","St. Antoniustag","St. Meinradstag","St. Agatha","St. Josef","Karfreitag","Ostermontag","Kirchenfeiertag","Heiliger Sigismund","Auffahrt","Pfingstmontag","Fronleichnam","Nationalfeiertag Schweiz","Mariä Himmelfahrt","Engelweihe","Gallustag","Allerheiligen","St. Martin","Mariä Empfängnis","Weihnachten","Stephanstag"],
    SO: ["Neujahr","Fest des hl. Sebastian","St. Blasius","St. Agatha","St. Germanstag","Fridolinstag","St. Josef","Tag der Arbeit","Auffahrt","Fronleichnam","St. Peter und Paul","St. Ulrich","Nationalfeiertag Schweiz","Mariä Himmelfahrt","St. Mauritiustag","St. Urs und Viktor","Gallustag","St. Lukas","Wendelinstag","Allerheiligen","St. Martin","Weihnachten","Stephanstag"],
    SG: ["Neujahr","St. Antoniustag","Karfreitag","Ostermontag","Auffahrt","Pfingstmontag","Nationalfeiertag Schweiz","Heiligkreuztag","Allerheiligen","Weihnachten","Stephanstag"],
    TG: ["Neujahr","Berchtoldstag","Karfreitag","Ostermontag","Tag der Arbeit","Auffahrt","Pfingstmontag","Nationalfeiertag Schweiz","Weihnachten","Stephanstag"],
    ZG: ["Neujahr","Karfreitag","Auffahrt","Fronleichnam","Nationalfeiertag Schweiz","Mariä Himmelfahrt","Mariä Geburt","Allerheiligen","Mariä Empfängnis","Weihnachten"],
    ZH: ["Neujahr","Karfreitag","Ostermontag","Tag der Arbeit","Auffahrt","Pfingstmontag","Nationalfeiertag Schweiz","Weihnachten","Stephanstag"]
};


function yearsRange() {
    const y = new Date().getUTCFullYear();
    return Array.from({ length: 9 }, (_, i) => y + i);
}
function fillYears(sel) {
    sel.innerHTML = "";
    yearsRange().forEach(y => {
        const o = document.createElement("option");
        o.value = y;
        o.textContent = y;
        if (y === new Date().getUTCFullYear()) o.selected = true;
        sel.appendChild(o);
    });
}
function fmtRange(s, e) {
    const same = s.getUTCFullYear() === e.getUTCFullYear() &&
        s.getUTCMonth() === e.getUTCMonth() &&
        s.getUTCDate() === e.getUTCDate();
    return same ? fmt(s) : fmt(s).replace(/\.\d{4}$/, "") + "–" + fmt(e);
}
function fmtList(items) {
    const ul = document.createElement("ul");
    ul.className = "list";
    items.forEach(({ name, start, end }) => {
        const li = document.createElement("li");
        li.textContent = `${fmtRange(start, end)} – ${name}`;
        ul.appendChild(li);
    });
    return ul;
}


function pad(n) { return String(n).padStart(2, "0"); }
function yyyymmdd(d) { return d.getUTCFullYear() + pad(d.getUTCMonth() + 1) + pad(d.getUTCDate()); }
function timestampUTC() {
    const n = new Date();
    return n.getUTCFullYear() + pad(n.getUTCMonth() + 1) + pad(n.getUTCDate()) + "T" +
        pad(n.getUTCHours()) + pad(n.getUTCMinutes()) + pad(n.getUTCSeconds()) + "Z";
}
function icsEscape(s) {
    return String(s)
        .replace(/\\/g, "\\\\")
        .replace(/;/g, "\\;")
        .replace(/,/g, "\\,")
        .replace(/\n/g, "\\n");
}
function buildIcs(canton, year, legal, local) {
    const CRLF = "\r\n";
    const lines = [];
    lines.push("BEGIN:VCALENDAR");
    lines.push("VERSION:2.0");
    lines.push("PRODID:-//Deine Firma//Feiertage//DE");
    lines.push("CALSCALE:GREGORIAN");
    lines.push("METHOD:PUBLISH");
    lines.push("X-WR-CALNAME:Feiertage – " + icsEscape(canton.title) + " " + year);

    const stamp = timestampUTC();

    function addEvent(name, start, end, category) {
        if (!start || !end) return;
        const dtStart = yyyymmdd(start);
        const dtEnd = yyyymmdd(addDays(end, 1)); // ganztägig: Ende +1 Tag
        const uid = `${dtStart}-${canton.code}-${category}-${Math.random().toString(16).slice(2)}@feiertage`;

        lines.push("BEGIN:VEVENT");
        lines.push("UID:" + uid);
        lines.push("DTSTAMP:" + stamp);
        lines.push("DTSTART;VALUE=DATE:" + dtStart);
        lines.push("DTEND;VALUE=DATE:" + dtEnd);
        lines.push("SUMMARY:" + icsEscape(cleanName(name)));
        lines.push("CATEGORIES:" + icsEscape(category));
        lines.push("DESCRIPTION:" + icsEscape(`Kanton ${canton.title} – ${category}`));
        lines.push("END:VEVENT");
    }

    legal.forEach(({ name, start, end }) => addEvent(name, start, end, "Gesetzlich"));
    local.forEach(({ name, start, end }) => addEvent(name, start, end, "Lokal"));

    lines.push("END:VCALENDAR");
    return lines.join(CRLF) + CRLF;
}
function downloadIcsFile(filename, content) {
    const blob = new Blob([content], { type: "text/calendar;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 0);
}


function computeHolidayLists(canton, year) {
    const legalNames = LEGAL_BY_CANTON[canton.code] || [];
    const localNames = LOCAL_BY_CANTON[canton.code] || [];

    const legal = legalNames
        .map(n => {
            const r = RULES[n] || RULES[cleanName(n)];
            const s = toSpan(r ? r(year) : null);
            return s ? { name: cleanName(n), start: s.start, end: s.end } : null;
        })
        .filter(Boolean)
        .sort((a, b) => a.start - b.start);

    const local = localNames
        .map(n => {
            const r = RULES[n] || RULES[cleanName(n)];
            const s = toSpan(r ? r(year) : null);
            return s ? { name: cleanName(n), start: s.start, end: s.end } : null;
        })
        .filter(Boolean)
        .sort((a, b) => a.start - b.start);

    return { legal, local };
}


function applyResponsiveColumns(container) {
    const isMobile = window.innerWidth < 768;
    container.style.display = "grid";
    container.style.gridTemplateColumns = isMobile ? "1fr" : "1fr 1fr";
    container.style.gap = "20px";
}


function bindIcs(canton, year, legal, local) {
    const btn = document.getElementById("downloadIcs");
    if (!btn) return;
    btn.onclick = (e) => {
        e.preventDefault();
        const ics = buildIcs(canton, year, legal, local);
        const file = `Feiertage_${canton.title.replace(/\s+/g, "")}_${year}.ics`;
        downloadIcsFile(file, ics);
    };
}


document.addEventListener("DOMContentLoaded", function () {
    const elList = document.getElementById("cantons");
    const modal = document.getElementById("modal");
    const elTitle = document.getElementById("modalTitle");
    const elCoa = document.getElementById("modalCoa");
    const elYear = document.getElementById("year");
    let elColumns = document.getElementById("modalColumns");

    function renderList() {
        const items = CANTONS.slice().sort((a, b) => a.title.localeCompare(b.title, "de"));
        elList.innerHTML = "";
        items.forEach(c => {
            const card = document.createElement("button");
            card.className = "card";
            card.type = "button";
            card.setAttribute("aria-label", `${c.title} oeffnen`);
            card.innerHTML = `
        <img class="coa" alt="Wappen ${c.title}" src="${COA[c.code]}" style="object-fit:contain;padding:6px;"/>
        <div><h2>${c.title}</h2></div>
        <span class="chev" aria-hidden="true">
          <svg width="20" height="20" viewBox="0 0 24 24">
            <path d="M9 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </span>`;
            card.addEventListener("click", () => openModal(c.code));
            elList.appendChild(card);
        });
    }

    function openModal(code) {
        const canton = CANTONS.find(c => c.code === code);
        if (!canton) return;

        document.body.classList.add("no-scroll");
        elTitle.textContent = canton.title;
        elCoa.src = COA[code];
        elCoa.alt = `Wappen ${canton.title}`;
        elCoa.style.objectFit = "contain";
        elCoa.style.padding = "6px";
        fillYears(elYear);

        function update() {
            const y = parseInt(elYear.value, 10);
            const { legal, local } = computeHolidayLists(canton, y);

            const grid = document.createElement("div");
            grid.className = "modal-columns";
            applyResponsiveColumns(grid);

            if (!local || local.length === 0) {
                grid.classList.add("single"); // volle Breite, wenn keine lokalen Feiertage
            }

            const sec1 = document.createElement("section");
            sec1.className = "section";
            sec1.innerHTML = `<h3>Gesetzliche Feiertage</h3>`;
            sec1.appendChild(fmtList(legal));

            const rightWrap = document.createElement("div");
            if (local && local.length > 0) {
                const secLoc = document.createElement("section");
                secLoc.className = "section";
                secLoc.innerHTML = `<h3>Lokale Feiertage</h3>`;
                secLoc.appendChild(fmtList(local));
                rightWrap.appendChild(secLoc);
            }

            grid.appendChild(sec1);
            const rightCol = document.createElement("div");
            rightCol.appendChild(rightWrap);
            grid.appendChild(rightCol);

            elColumns.replaceWith(grid);
            elColumns = grid;

            bindIcs(canton, y, legal, local);
        }

        window.addEventListener("resize", () => applyResponsiveColumns(elColumns));
        elYear.onchange = update;
        update();
        modal.setAttribute("aria-hidden", "false");
    }

    function closeModal() {
        modal.setAttribute("aria-hidden", "true");
        document.body.classList.remove("no-scroll");
    }

    modal.addEventListener("click", e => { if (e.target.dataset.close !== undefined) closeModal(); });
    const closeBtn = document.getElementById("closeBtn");
    if (closeBtn) closeBtn.addEventListener("click", closeModal);

    renderList();
    const fy = document.getElementById("footerYear");
    if (fy) fy.textContent = new Date().getFullYear();
});