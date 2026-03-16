// ── PARTICLES ──
(function(){
  const p = document.getElementById('particles');
  for(let i=0;i<40;i++){
    const s=document.createElement('span');
    const x=Math.random()*100, delay=Math.random()*15, dur=8+Math.random()*12, size=1+Math.random()*2;
    s.style.cssText=`left:${x}%;bottom:-10px;width:${size}px;height:${size}px;animation-delay:${delay}s;animation-duration:${dur}s;opacity:${0.3+Math.random()*.7}`;
    p.appendChild(s);
  }
})();

// ── CURSOR ──
const cur=document.getElementById('cur'), cur2=document.getElementById('cur2');
let mx=0,my=0,cx=0,cy=0;
document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;cur.style.left=mx+'px';cur.style.top=my+'px';});
(function loop(){cx+=(mx-cx)*.12;cy+=(my-cy)*.12;cur2.style.left=cx+'px';cur2.style.top=cy+'px';requestAnimationFrame(loop);})();

// ── REVEAL ON SCROLL ──
const rvEls=document.querySelectorAll('.rv');
const rvObs=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('vis');rvObs.unobserve(e.target);}}),{threshold:.1});
rvEls.forEach(el=>rvObs.observe(el));

// ── STATS & RECORDS ──
function animateCount(el,target,suffix,duration=1800){
  const isFloat=target%1!==0;
  const step=target/(duration/16);
  let cur=0;
  const t=setInterval(()=>{
    cur=Math.min(cur+step,target);
    el.textContent=(isFloat?cur.toFixed(1):Math.floor(cur))+suffix;
    if(cur>=target)clearInterval(t);
  },16);
}

function buildBigStats(){
  const data=[
    {num:650,suffix:"M+",unit:"joueurs",label:"Comptes créés depuis 2017"},
    {num:125,suffix:"M",unit:"pic",label:"Joueurs actifs en 2018"},
    {num:3.4,suffix:"Md$",unit:"revenus",label:"Record de revenus annuels"},
    {num:4300,suffix:"+",unit:"skins",label:"Cosmétiques disponibles"},
    {num:100,suffix:"M",unit:"parties/j",label:"Parties jouées chaque jour"},
    {num:7,suffix:"",unit:"chapitres",label:"Chapitres et saisons depuis 2017"},
  ];
  document.getElementById('bigStats').innerHTML=data.map((d,i)=>
    `<div class="stat-num-card">
      <div class="stat-num" data-target="${d.num}" data-suffix="${d.suffix}">${d.num}${d.suffix}</div>
      <div class="stat-unit">${d.unit}</div>
      <div class="stat-label">${d.label}</div>
    </div>`
  ).join('');
}

function buildBarChart(id,data,maxVal,color){
  document.getElementById(id).innerHTML=data.map(d=>`
    <div class="bc-row">
      <span class="bc-label">${d.label}</span>
      <div class="bc-track"><div class="bc-fill" data-w="${(d.val/maxVal*100).toFixed(1)}" style="background:${color||'var(--y)'};"></div></div>
      <span class="bc-val">${d.val}</span>
    </div>`).join('');
}

function buildRecords(){
  const recs=[
    {icon:"🏆",val:"3 770 000 $",name:"Gains record — Bugha",desc:"Kyle Giersdorf remporte la Fortnite World Cup 2019. Le plus grand prize pool esport solo de l'histoire à l'époque."},
    {icon:"🎵",val:"12,3 M",name:"Spectateurs — Concert Travis Scott",desc:"12,3 millions de joueurs ont assisté en simultané au concert Astronomical de Travis Scott en avril 2020."},
    {icon:"🌍",val:"44 M",name:"Joueurs — Event The End",desc:"44 millions de joueurs ont regardé ou participé à l'événement 'The End' (Chapitre 1) en octobre 2019."},
    {icon:"💰",val:"9 Md$",name:"Valorisation Epic Games",desc:"Epic Games a été valorisé à 28,7 milliards de dollars en 2021, porté principalement par les revenus Fortnite."},
    {icon:"⏱️",val:"3,5 min",name:"Durée de partie la plus courte",desc:"Victoire Royale en moins de 3 minutes 30 enregistrée en compétition — record de rapidité sur une île pleine."},
    {icon:"🎮",val:"1 000+",name:"Collaborations officielles",desc:"Plus de 1 000 personnages et franchises ont eu une collaboration officielle avec Fortnite depuis 2018."},
    {icon:"📱",val:"350 M$",name:"Revenus iOS en 1 an",desc:"Fortnite Mobile a généré 350 millions de dollars sur iOS en moins d'un an avant son retrait de l'App Store."},
    {icon:"🔫",val:"1 200+",name:"Armes disponibles",desc:"Plus de 1 200 variantes d'armes ont été introduites dans Fortnite Battle Royale depuis le début du jeu."},
  ];
  document.getElementById('recordsGrid').innerHTML=recs.map(r=>`
    <div class="rec-card">
      <div class="rec-icon">${r.icon}</div>
      <div>
        <div class="rec-val">${r.val}</div>
        <div class="rec-name">${r.name}</div>
        <div class="rec-desc">${r.desc}</div>
      </div>
    </div>`).join('');
}

function buildDonut(){
  const slices=[
    {label:"Battle Royale",pct:58,color:"#FFD700"},
    {label:"Zéro Build",pct:24,color:"#00C3FF"},
    {label:"Créatif / UEFN",pct:14,color:"#9B59B6"},
    {label:"Sauver le Monde",pct:4,color:"#00FF88"},
  ];
  const svg=document.getElementById('donut');
  const cx=100,cy=100,r=70,stroke=28;
  let offset=0;
  const circ=2*Math.PI*r;
  svg.innerHTML=slices.map(s=>{
    const dash=(s.pct/100)*circ;
    const gap=circ-dash;
    const el=`<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${s.color}"
      stroke-width="${stroke}" stroke-dasharray="${dash} ${gap}"
      stroke-dashoffset="${-offset}" transform="rotate(-90 ${cx} ${cy})" opacity=".9"/>`;
    offset+=dash;
    return el;
  }).join('')+`<circle cx="${cx}" cy="${cy}" r="${r-stroke/2-2}" fill="var(--card)"/>
    <text x="${cx}" y="${cy-6}" text-anchor="middle" font-family="Bebas Neue,sans-serif" font-size="22" fill="#FFD700">58%</text>
    <text x="${cx}" y="${cy+14}" text-anchor="middle" font-family="Share Tech Mono,monospace" font-size="9" fill="#B8C0D8">BATTLE ROYALE</text>`;
  document.getElementById('donutLegend').innerHTML=slices.map(s=>`
    <div class="dl-item"><div class="dl-dot" style="background:${s.color};"></div>${s.label} — ${s.pct}%</div>`).join('');
}

function buildPlatforms(){
  const platforms=[
    {label:"PC / Mac",pct:34,color:"#00C3FF"},
    {label:"PlayStation",pct:28,color:"#003087"},
    {label:"Xbox",pct:18,color:"#107C10"},
    {label:"Mobile",pct:12,color:"#FFD700"},
    {label:"Nintendo Switch",pct:8,color:"#E4000F"},
  ];
  document.getElementById('platformChart').innerHTML=platforms.map(p=>`
    <div class="hb-row">
      <div class="hb-top"><span class="hb-label">${p.label}</span><span class="hb-pct">${p.pct}%</span></div>
      <div class="hb-track"><div class="hb-fill" data-w="${p.pct}" style="background:${p.color};"></div></div>
    </div>`).join('');
}

// Build everything
buildBigStats();
buildBarChart('barChart',[
  {label:"2017",val:"10M"},{label:"2018",val:"125M"},{label:"2019",val:"250M"},
  {label:"2020",val:"350M"},{label:"2021",val:"400M"},{label:"2022",val:"500M"},
  {label:"2023",val:"600M"},{label:"2024",val:"625M"},{label:"2026",val:"650M"},
],125,'var(--b)');
buildBarChart('revenueChart',[
  {label:"2017",val:"$0.1Md"},{label:"2018",val:"$3.4Md"},{label:"2019",val:"$1.8Md"},
  {label:"2020",val:"$2.0Md"},{label:"2021",val:"$1.2Md"},{label:"2022",val:"$0.9Md"},
  {label:"2023",val:"$1.0Md"},{label:"2024",val:"$1.1Md"},{label:"2026",val:"$1.2Md"},
],3.4,'var(--y)');
buildRecords();
buildDonut();
buildPlatforms();

// Animate bars when section scrolls into view
const statsObs=new IntersectionObserver(entries=>entries.forEach(e=>{
  if(!e.isIntersecting)return;
  e.target.querySelectorAll('.bc-fill,.hb-fill').forEach(el=>{
    el.style.width=el.dataset.w+'%';
  });
  e.target.querySelectorAll('.stat-num[data-target]').forEach(el=>{
    animateCount(el,parseFloat(el.dataset.target),el.dataset.suffix);
  });
  statsObs.unobserve(e.target);
}),{threshold:.2});
document.getElementById('stats')&&statsObs.observe(document.getElementById('stats'));

// ── ROADMAP ──
const roadmap=[
  {v:"v40.00",date:"19 mars 2026",label:"🆕 C7 Saison 2 — Showdown",st:"upcoming"},
  {v:"v40.10",date:"2 avril 2026",label:"MAJ Saison 2 — Semaine 2",st:"future"},
  {v:"v40.20",date:"16 avril 2026",label:"MAJ + STW Free-to-Play",st:"future"},
  {v:"v40.30",date:"30 avril 2026",label:"MAJ Saison 2 — Semaine 4",st:"future"},
  {v:"v41.00",date:"Mai 2026",label:"C7 Saison 3 — Début",st:"future"},
  {v:"—",date:"19 juin – 15 juil.",label:"☀️ Pause estivale Epic Games",st:"break"},
  {v:"v42.00",date:"Juillet 2026",label:"C7 Saison 3 — Suite",st:"future"},
  {v:"v43.00",date:"Septembre 2026",label:"C7 Saison 3 — Fin / FNCS Major 3",st:"future"},
  {v:"v44.XX",date:"Novembre 2026",label:"🏆 Global Championship + Teaser C8",st:"future"},
  {v:"v45.00",date:"10 déc. 2026",label:"❄️ Winterfest — Fin d'année",st:"future"},
];
const stStyle={upcoming:"color:var(--g);font-weight:700;",future:"color:var(--text);opacity:.6;",break:"color:#ff9b3f;font-weight:700;"};
const stLabel={upcoming:"🔜 Dans 3 jours",future:"À venir",break:"⛔ Pause"};
document.getElementById('roadmapBody').innerHTML=roadmap.map(r=>`<tr><td>${r.v}</td><td style="font-family:var(--font-mono);font-size:.8rem;">${r.date}</td><td>${r.label}</td><td style="${stStyle[r.st]||''};font-family:var(--font-mono);font-size:.75rem;">${stLabel[r.st]||''}</td></tr>`).join('');

// ── RANKINGS ──
const players=[
  {rank:1,name:"Peterbot",sub:"NA — Indépendant",desc:"Considéré comme le meilleur joueur du monde 2025-2026. Mécanique exceptionnelle, aim irréprochable. Multiples Cash Cup wins.",stat:"#1 Mondial",cls:"n1 g"},
  {rank:2,name:"Pixie",sub:"EU — Accolades Comp.",desc:"2ème au Global Championship 2025, vainqueur du Major 2. Parmi les plus constants d'Europe.",stat:"2nd Globals 2025",cls:"n2 s"},
  {rank:3,name:"Acorn",sub:"EU — Dignitas",desc:"Abdullah Akhras. Vainqueur FNCS Major 1 en 2024 et 2025. Définition de la régularité compétitive.",stat:"+$1M earnings",cls:"n3 b"},
  {rank:4,name:"Ajerss",sub:"NA — Gen.G",desc:"Aidan Bernero. Vainqueur Major 1 2025 et top 2 Major 3 LAN. Montée en puissance impressionnante.",stat:"Major 1 winner",cls:"nx"},
  {rank:5,name:"Veno",sub:"EU — Trio Vic0/Flickzy",desc:"Harry Pearson. Premier FNCS win dès le Chapitre 3. Plus d'1M$ de gains. IGL et fragger du trio.",stat:"+$1M earnings",cls:"nx"},
  {rank:6,name:"Cold",sub:"EU — Twisted Minds",desc:"Joshua Butler. Signé Twisted Minds. Plusieurs wins en Cash Cup C6. Top duo EU en FNCS 2026.",stat:"Top EU Duo",cls:"nx"},
  {rank:7,name:"Flickzy",sub:"EU — Indépendant",desc:"Felix G. Deux FNCS wins. Parmi les meilleurs EU depuis 2022. Régularité remarquable sur plusieurs saisons.",stat:"2x FNCS winner",cls:"nx"},
  {rank:8,name:"Bugha",sub:"NA — Solo Career",desc:"Kyle Giersdorf. Champion du monde 2019 (3,77M$). Toujours actif et compétitif. Icône absolue.",stat:"$3.77M career",cls:"nx"},
  {rank:9,name:"Clix",sub:"NA — Streamer/Pro",desc:"Nolan Ostman. Un des joueurs NA les plus constants. Régulier en finale FNCS. Stream et tournois.",stat:"Top NA Regular",cls:"nx"},
  {rank:10,name:"Vic0",sub:"EU — Trio Veno/Flickzy",desc:"Trio emblématique avec Veno et Flickzy. Régularité remarquable sur plusieurs saisons EU.",stat:"Top EU Trio",cls:"nx"},
];
const teams=[
  {rank:1,name:"Dignitas",sub:"EU / International",desc:"Acorn (Abdullah Akhras) — vainqueur FNCS Major 1 en 2024 & 2025. L'équipe la plus régulière du circuit.",stat:"2x Major Winner",cls:"n1 g"},
  {rank:2,name:"Gen.G",sub:"NA / International",desc:"Ajerss & Pollo — Major 1 winner 2025, top 2 Major 3 LAN. Montée en puissance impressionnante en 2025.",stat:"Major 1 2025",cls:"n2 s"},
  {rank:3,name:"Twisted Minds",sub:"EU",desc:"Cold & Vic0/Flickzy — Multiple Cash Cup wins. Finales FNCS régulières. Organisation EU en plein essor.",stat:"Top EU Org",cls:"n3 b"},
  {rank:4,name:"Team Liquid",sub:"International",desc:"Roster multi-régions solide. Présents depuis les débuts du compétitif avec des résultats constants.",stat:"Historic Org",cls:"nx"},
  {rank:5,name:"NRG Esports",sub:"NA Central",desc:"Powerhouse nord-américain. Ont signé plusieurs des meilleurs joueurs NA depuis le World Cup.",stat:"Top NA Org",cls:"nx"},
  {rank:6,name:"FaZe Clan",sub:"International",desc:"Organisation iconique. Style de jeu agressif et large base de fans. Roster actif sur plusieurs régions.",stat:"Top Org",cls:"nx"},
  {rank:7,name:"G2 Esports",sub:"EU",desc:"Géant européen. Régulièrement dans les top 10 des FNCS Majors EU. Forte image de marque.",stat:"EU Top 10",cls:"nx"},
  {rank:8,name:"Fnatic",sub:"EU",desc:"Institution de l'esport depuis 2004. Expérience et structure solide pour leurs joueurs Fortnite.",stat:"Historic Org",cls:"nx"},
];
function renderRank(data,id){
  document.getElementById(id).innerHTML=data.map(p=>`
    <div class="rank-row ${p.cls.includes('g')?'g':p.cls.includes('s')?'s':p.cls.includes('b')?'b':''}">
      <div class="rank-num ${p.cls.split(' ')[0]}">${p.rank}</div>
      <div><div class="rank-name">${p.name}</div><div class="rank-sub">${p.sub}</div><div class="rank-desc">${p.desc}</div></div>
      <div><div class="rank-stat-val">${p.stat}</div><div class="rank-stat-lbl">Accolade</div></div>
    </div>`).join('');
}
renderRank(players,'playerRanking');
renderRank(teams,'teamRanking');

// ── I18N ──
const translations={
  fr:{
    "nav.histoire":"Histoire","nav.bases":"Bases","nav.modes":"Modes","nav.stats":"📊 Stats","nav.patch":"Patch Notes","nav.esport":"Esport","nav.tournois":"Tournois","nav.classements":"Classements","nav.reseaux":"Réseaux","nav.glossaire":"Glossaire",
    "hero.eyebrow":"Guide complet — 16 mars 2026","hero.sub":"Tout ce que tu dois savoir sur le Battle Royale le plus joué au monde : histoire, boutique du jour, esport, tournois et bien plus.","hero.cta1":"Commencer","hero.cta2":"📊 Stats & Records","hero.scroll":"Scroll",
    "section.01":"Chapitre 01","section.02":"Chapitre 02","section.03":"Chapitre 03","section.04":"Chapitre 04","section.05":"Chapitre 05","section.06":"Chapitre 06 — LIVE","section.07":"Chapitre 07","section.08":"Chapitre 08","section.09":"Chapitre 09","section.10":"Chapitre 10","section.11":"Chapitre 11","section.12":"Chapitre 12","section.13":"Chapitre 13","section.14":"Chapitre 14",
    "histoire.title":"L'<em>histoire</em> de Fortnite","histoire.desc":"D'un jeu de survie coopératif à un phénomène culturel mondial.",
    "bases.title":"Les <em>bases</em> du jeu","bases.desc":"100 joueurs tombent sur une île, le dernier survivant gagne. Voici les mécaniques fondamentales.",
    "modes.title":"Les <em>modes</em> de jeu","modes.desc":"Fortnite n'est pas qu'un seul jeu. Plusieurs modes coexistent avec des expériences radicalement différentes.",
    "rar.title":"Raretés des <em>armes</em>","rar.desc":"Chaque arme a une couleur de rareté. Plus elle est rare, meilleures sont ses statistiques.",
    "tips.title":"Conseils de <em>Pro</em>","tips.desc":"Tu veux accumuler les Victoires Royales ? Voici les 8 tips essentiels.",
    "shop.title":"🔥 Boutique du <em>Jour</em>","shop.desc":"Cosmétiques disponibles aujourd'hui dans la boutique Fortnite. Réinitialisation chaque jour à minuit UTC.","shop.live":"LIVE — Se renouvèle à minuit UTC",
    "cat.all":"Tout","cat.skin":"Tenues","cat.bundle":"Ensembles","cat.emote":"Emotes","cat.pickaxe":"Piochons","cat.glider":"Planeurs","cat.other":"Autres",
    "vb.title":"V-Bucks & <em>Prix</em>","vb.desc":"La monnaie de Fortnite. Les prix ont changé le 19 mars 2026.","vb.warn":"⚠️ <strong>Hausse de prix !</strong> Depuis le 19 mars 2026, Epic a réduit le nombre de V-Bucks par pack. Le Battle Pass coûte 800 V-Bucks — et tu en regagnes 800 en le terminant.",
    "esport.title":"Les <em>Teams</em> Esport","esport.desc":"Les organisations qui sponsorisent les meilleurs duos du monde pour le circuit FNCS 2026.",
    "tourn.title":"Les <em>Tournois</em> 2026","tourn.desc":"Le FNCS 2026 en format Duos avec plus de <strong style='color:var(--y)'>10 000 000 $</strong> de prize pool.",
    "rank.title":"Classements <em>Pro</em>","rank.desc":"Top joueurs mondiaux et top teams de la scène compétitive Fortnite 2026.","rank.players":"🏆 Top 10 Joueurs Mondiaux","rank.teams":"🏢 Top 8 Teams Esport",
    "patch.title":"Patch Notes & <em>MAJ</em>","patch.desc":"Toutes les mises à jour du Chapitre 7. Prochaine : v40.00 le 19 mars 2026.","patch.roadmap":"🗓️ Roadmap officielle 2026","rm.ver":"Version","rm.date":"Date","rm.content":"Contenu","rm.status":"Statut",
    "vids.title":"Vidéos <em>Incontournables</em>","vids.desc":"Les meilleures chaînes pour progresser et rester informé.",
    "soc.title":"Réseaux <em>Officiels</em>","soc.desc":"Suis Fortnite sur tous les réseaux.",
    "gloss.title":"Le <em>Glossaire</em>","gloss.desc":"Les termes que tout joueur Fortnite doit connaître.",
    "gl1":"Gagner une partie. Le dernier joueur ou la dernière équipe en vie remporte la Victoire Royale.","gl2":"Les objets, armes et ressources que tu ramasses pendant la partie.","gl3":"Être frustré ou énervé après une mort ou une erreur.","gl4":"Combat rapproché dans une structure construite. Technique avancée de fin de partie.","gl5":"Attaquer deux joueurs qui se battent déjà pour profiter de leur état affaibli.","gl6":"Joueur très compétitif et agressif. Souvent semi-péjoratif.","gl7":"Stratégie passive : se planquer, éviter tout combat, attendre que les autres s'éliminent.","gl8":"Se déplacer vers le prochain cercle de tempête de manière stratégique.","gl9":"Un joueur à 1 PV — il peut être éliminé d'un seul coup.","gl10":"L'action de sauter du bus de combat et d'atterrir sur la carte.","gl11":"Jouer très agressif en allant constamment vers les ennemis.","gl12":"Mécanisme de tournoi : les joueurs ayant le moins de dégâts perdent des PV si trop peu de joueurs sont éliminés.","gl13":"Modifier rapidement une structure construite pour surprendre l'adversaire.","gl14":"Joueur très mauvais, ou véritable IA insérée par le jeu pour les débutants.","gl15":"In-Game Leader — le joueur qui prend les décisions tactiques en tournoi.","gl16":"Mode créatif simulant les fins de partie en zone. Utilisé pour s'entraîner.",
    "tl1.name":"L'idée naît chez Epic Games","tl1.text":"Epic annonce Fortnite lors de la VGX comme un shooter de survie coopératif avec construction.","tl2.name":"Sortie de Sauver le Monde","tl2.text":"Le mode PvE payant sort en accès anticipé. Les joueurs affrontent des zombies et construisent des défenses.","tl3.name":"Battle Royale — Gratuit","tl3.text":"Epic lance Fortnite Battle Royale gratuitement. 10 millions de joueurs en 2 semaines.","tl4.name":"Phénomène culturel mondial","tl4.text":"125 millions de joueurs. Les danses Fortnite envahissent les cours d'école. 2,4 milliards de dollars de revenus.","tl5.name":"L'événement \"Fin\" — Chapitre 2","tl5.text":"Un trou noir engloutit l'île pendant 2 jours. Le monde entier regarde. Le Chapitre 2 révèle une nouvelle île.","tl6.name":"Collaborations & métavers","tl6.text":"Concerts d'Ariana Grande et Travis Scott. Crossovers Marvel, Star Wars, Squid Game, South Park, Solo Leveling…",
    "base1.t":"Le Bus de Combat","base1.d":"Le bus traverse l'île en début de partie. Tu choisis où sauter. L'atterrissage stratégique est crucial.","base2.t":"La Tempête","base2.d":"Un cercle toxique se rétrécit progressivement. Rester dans la tempête fait perdre des PV rapidement.","base3.t":"Les Armes","base3.d":"Tu peux porter 5 objets. Chaque arme a une rareté qui définit ses dégâts, précision et rechargement.","base4.t":"La Construction","base4.d":"La signature de Fortnite. Récolte des matériaux puis construis murs, planchers et rampes pour te protéger.","base5.t":"Santé & Bouclier","base5.d":"100 PV de santé + 100 PV de bouclier maximum. Soigne-toi après chaque combat avant d'en engager un autre.","base6.t":"Le Loot","base6.d":"Les coffres brillants contiennent de bonnes armes. Apprends les spots de loot dense sur la carte.",
    "mode1.t":"Battle Royale","mode1.d":"Solo, Duo ou Escouade. 100 joueurs, 1 seul gagnant. Le mode principal depuis 2017.","mode2.t":"Zéro Build","mode2.d":"Battle Royale sans construction. Le Survibouclier remplace les murs. Idéal pour les nouveaux joueurs.","mode3.t":"Sauver le Monde","mode3.d":"Mode PvE coopératif. Combats des zombies, construis des défenses. Free-to-play le 16 avril 2026.","mode4.t":"Créatif / UEFN","mode4.d":"Construis tes propres îles avec l'Unreal Editor. Des millions de maps communautaires disponibles.",
    "rar1":"Commun","rar1d":"Gris — Stats minimales. À remplacer dès que possible.","rar2":"Peu commun","rar2d":"Vert — Nette amélioration. Trouvé généralement dans les coffres en début de partie.","rar3":"Rare","rar3d":"Bleu — Bon niveau. La majorité des parties sérieuses se jouent avec des armes bleues minimum.","rar4":"Épique","rar4d":"Violet — Excellente arme. Dégâts élevés et très précise.","rar5":"Légendaire","rar5d":"Or — Stats maximales. Trouvée dans les coffres dorés rares ou en récompense de boss.","rar6":"Mythique","rar6d":"Arc-en-ciel — Une seule par partie. Liée à un boss. Puissance absolue.",
    "tip1.t":"Atterris loin du bus","tip1.d":"Sauter loin de la trajectoire = moins de monde. Idéal pour looter tranquillement.","tip2.t":"Joue avec un casque","tip2.d":"Les pas et tirs se repèrent à l'oreille. Un bon casque change radicalement l'expérience.","tip3.t":"Surveille la tempête","tip3.d":"Toujours vérifier le cercle sur la minimap. Se retrouver dans la tempête est l'erreur la plus fréquente.","tip4.t":"Construis sous les tirs","tip4.d":"Dès que tu prends des dégâts, pose un mur ! La construction réflexe peut te sauver la vie.","tip5.t":"Soigne-toi après chaque combat","tip5.d":"Ne passe jamais au combat suivant sans te soigner. 30 PV vs 100 PV, l'issue est prévisible.","tip6.t":"Patience en fin de partie","tip6.d":"Dans le top 10, la patience est plus payante que l'agression. Laisse les autres s'éliminer.","tip7.t":"Maîtrise 2–3 armes","tip7.d":"Pompe + AR + SMG ou sniper. Une combo efficace vaut mieux que 5 armes inconnues.","tip8.t":"Commence en Zéro Build","tip8.d":"Si la construction te semble complexe, Zéro Build est parfait pour apprendre sans pression.",
    "p1.t":"⚔️ Chapitre 7 Saison 2 — \"SHOWDOWN\"","p1.d":"La Saison 2 introduit un affrontement entre The Foundation et l'Ice King. Nouveau SMG. STW en free-to-play le 16 avril.","p2.t":"Wild Week 1 — Armes OG de retour","p2.d":"La Wild Week 1 remet en jeu des armes OG iconiques. Les skins Rick & Morty débarquent. Lantern Fest toujours actif.",
    "stats.title":"Stats & <em>Records</em>","stats.desc":"Fortnite en chiffres — les statistiques et records officiels qui font du jeu un phénomène mondial.","stat.players.title":"📈 Joueurs actifs par année","stat.revenue.title":"💰 Revenus Epic Games (Fortnite)","stat.records":"🏆 Records officiels","stat.modes.title":"🎮 Répartition des modes joués","stat.platforms.title":"🖥️ Plateformes des joueurs",
    "foot.credit":"Site conçu et développé par <span style='color:var(--y);font-family:var(--font-hero);letter-spacing:2px;'>RACHID</span> — Tous droits réservés © 2026","foot.cr":"Toute reproduction, même partielle, est interdite sans autorisation écrite du créateur.","foot.disc":"FORTPEDIA est non officiel et n'est pas affilié à Epic Games. Fortnite® est une marque déposée d'Epic Games, Inc."
  },
  en:{
    "nav.histoire":"History","nav.bases":"Basics","nav.modes":"Modes","nav.stats":"📊 Stats","nav.patch":"Patch Notes","nav.esport":"Esport","nav.tournois":"Tournaments","nav.classements":"Rankings","nav.reseaux":"Socials","nav.glossaire":"Glossary",
    "hero.eyebrow":"Complete guide — March 16, 2026","hero.sub":"Everything you need to know about the world's most played Battle Royale: history, daily shop, esport, tournaments and more.","hero.cta1":"Get Started","hero.cta2":"📊 Stats & Records","hero.scroll":"Scroll",
    "section.01":"Chapter 01","section.02":"Chapter 02","section.03":"Chapter 03","section.04":"Chapter 04","section.05":"Chapter 05","section.06":"Chapter 06 — LIVE","section.07":"Chapter 07","section.08":"Chapter 08","section.09":"Chapter 09","section.10":"Chapter 10","section.11":"Chapter 11","section.12":"Chapter 12","section.13":"Chapter 13","section.14":"Chapter 14",
    "histoire.title":"The <em>History</em> of Fortnite","histoire.desc":"From a cooperative survival game to a worldwide cultural phenomenon.",
    "bases.title":"The <em>Basics</em>","bases.desc":"100 players drop on an island, last one standing wins. Here are the core mechanics to master.",
    "modes.title":"Game <em>Modes</em>","modes.desc":"Fortnite is not just one game. Multiple modes coexist with radically different experiences.",
    "rar.title":"Weapon <em>Rarities</em>","rar.desc":"Each weapon has a rarity color. The rarer, the better the stats.",
    "tips.title":"Pro <em>Tips</em>","tips.desc":"Want to rack up Victory Royales? Here are the 8 essential tips from competitive players.",
    "shop.title":"🔥 Daily <em>Item Shop</em>","shop.desc":"Cosmetics available today in the Fortnite Item Shop. Resets every day at midnight UTC.","shop.live":"LIVE — Resets at midnight UTC",
    "cat.all":"All","cat.skin":"Outfits","cat.bundle":"Bundles","cat.emote":"Emotes","cat.pickaxe":"Pickaxes","cat.glider":"Gliders","cat.other":"Other",
    "vb.title":"V-Bucks & <em>Prices</em>","vb.desc":"Fortnite's currency. Prices changed on March 19, 2026 with Season 2.","vb.warn":"⚠️ <strong>Price increase!</strong> Since March 19, 2026, Epic reduced V-Buck amounts per pack. Battle Pass costs 800 V-Bucks — and you earn 800 back by completing it.",
    "esport.title":"Esport <em>Teams</em>","esport.desc":"Organizations sponsoring the world's best duos for the FNCS 2026 circuit.",
    "tourn.title":"2026 <em>Tournaments</em>","tourn.desc":"FNCS 2026 in Duos format with over <strong style='color:var(--y)'>$10,000,000</strong> in prize pool.",
    "rank.title":"Pro <em>Rankings</em>","rank.desc":"Top global players and top teams in the Fortnite 2026 competitive scene.","rank.players":"🏆 Top 10 Global Players","rank.teams":"🏢 Top 8 Esport Teams",
    "patch.title":"Patch Notes & <em>Updates</em>","patch.desc":"All Chapter 7 updates. Next: v40.00 on March 19, 2026.","patch.roadmap":"🗓️ Official 2026 Roadmap","rm.ver":"Version","rm.date":"Date","rm.content":"Content","rm.status":"Status",
    "vids.title":"Must-Watch <em>Videos</em>","vids.desc":"The best channels to improve and stay up to date on Fortnite news.",
    "soc.title":"Official <em>Socials</em>","soc.desc":"Follow Fortnite on all platforms.",
    "gloss.title":"The <em>Glossary</em>","gloss.desc":"Terms every Fortnite player should know.",
    "gl1":"Win a match. The last player or team alive claims the Victory Royale.","gl2":"Items, weapons and resources you pick up during a match.","gl3":"Being frustrated or tilted after a death or mistake.","gl4":"Close-range fight inside a built structure. Advanced end-game technique.","gl5":"Attacking two players already fighting to take advantage of their weakened state.","gl6":"A very competitive and aggressive player. Often used semi-negatively.","gl7":"Passive strategy: hiding, avoiding all fights, waiting for others to eliminate each other.","gl8":"Moving toward the next storm circle in a strategic and safe way.","gl9":"A player at 1 HP — can be eliminated in a single shot.","gl10":"The act of jumping from the Battle Bus and landing on the map.","gl11":"Playing very aggressively by constantly pushing toward enemies.","gl12":"Tournament mechanic: players with the least damage dealt lose HP if too few players are eliminated.","gl13":"Quickly editing a built structure to surprise the opponent. Key skill for sweats.","gl14":"Very bad player, or an actual AI bot inserted by the game for beginners.","gl15":"In-Game Leader — the player making tactical decisions during team tournaments.","gl16":"Creative mode simulating end-game zone scenarios. Used by competitive players to practice.",
    "tl1.name":"The idea is born at Epic Games","tl1.text":"Epic announces Fortnite at VGX as a cooperative survival shooter with building mechanics.","tl2.name":"Save the World launches","tl2.text":"The paid PvE mode launches in early access. Players fight zombie waves and build defenses.","tl3.name":"Battle Royale — Free to Play","tl3.text":"Epic launches Fortnite Battle Royale for free. 10 million players in 2 weeks.","tl4.name":"Global cultural phenomenon","tl4.text":"125 million players. Fortnite dances invade playgrounds. $2.4 billion in revenue.","tl5.name":"The End event — Chapter 2","tl5.text":"A black hole swallows the island for 2 days. The world watches. Chapter 2 reveals a brand new island.","tl6.name":"Collaborations & metaverse","tl6.text":"Ariana Grande and Travis Scott concerts. Marvel, Star Wars, Squid Game, South Park, Solo Leveling crossovers…",
    "base1.t":"The Battle Bus","base1.d":"The bus crosses the island at match start. You choose where to jump. Strategic landing is crucial.","base2.t":"The Storm","base2.d":"A toxic circle shrinks progressively. Staying in the storm drains your HP rapidly.","base3.t":"Weapons","base3.d":"You can carry 5 items. Each weapon has a rarity that defines its damage, accuracy and reload speed.","base4.t":"Building","base4.d":"Fortnite's signature mechanic. Harvest materials then build walls, floors and ramps to protect yourself.","base5.t":"Health & Shield","base5.d":"100 HP + 100 shield maximum. Always heal after each fight before engaging the next one.","base6.t":"Loot","base6.d":"Glowing chests contain good weapons. Learn the high-loot spots on the map.",
    "mode1.t":"Battle Royale","mode1.d":"Solo, Duo or Squad. 100 players, 1 winner. The main mode since 2017.","mode2.t":"Zero Build","mode2.d":"Battle Royale without building. The Overshield replaces walls. Perfect for new players.","mode3.t":"Save the World","mode3.d":"Co-op PvE mode. Fight zombies, build defenses. Goes free-to-play on April 16, 2026.","mode4.t":"Creative / UEFN","mode4.d":"Build your own islands with the Unreal Editor. Millions of community maps available.",
    "rar1":"Common","rar1d":"Grey — Minimum stats. Replace as soon as possible.","rar2":"Uncommon","rar2d":"Green — Clear improvement. Typically found in chests early game.","rar3":"Rare","rar3d":"Blue — Good level. Most serious matches are played with blue weapons minimum.","rar4":"Epic","rar4d":"Purple — Excellent weapon. High damage and very accurate.","rar5":"Legendary","rar5d":"Gold — Maximum stats. Found in rare golden chests or as boss rewards.","rar6":"Mythic","rar6d":"Rainbow — One per match. Tied to a boss or event. Absolute power.",
    "tip1.t":"Land away from the bus","tip1.d":"Jumping far from the path = fewer people around. Ideal for looting quietly.","tip2.t":"Play with headphones","tip2.d":"Footsteps and shots are tracked by ear. A good headset radically changes the experience.","tip3.t":"Watch the storm","tip3.d":"Always check the circle on the minimap. Getting caught in the storm is the most common beginner mistake.","tip4.t":"Build when taking fire","tip4.d":"The moment you take damage, place a wall! Reflex building can save your life.","tip5.t":"Heal after every fight","tip5.d":"Never go into the next fight without healing. 30 HP vs 100 HP — the outcome is predictable.","tip6.t":"Be patient late game","tip6.d":"In the top 10, patience beats aggression. Let others eliminate each other first.","tip7.t":"Master 2–3 weapons","tip7.d":"Shotgun + AR + SMG or sniper. An efficient combo beats 5 unknown weapons.","tip8.t":"Start in Zero Build","tip8.d":"If building feels complex, Zero Build is perfect for learning aim and positioning without pressure.",
    "p1.t":"⚔️ Chapter 7 Season 2 — \"SHOWDOWN\"","p1.d":"Season 2 introduces a clash between The Foundation and the Ice King. New SMG. Save the World goes free-to-play April 16.","p2.t":"Wild Week 1 — OG Weapons Return","p2.d":"Wild Week 1 unvaults iconic OG weapons. Rick & Morty skins hit the shop. Lantern Fest 2026 still active.",
    "stats.title":"Stats & <em>Records</em>","stats.desc":"Fortnite by the numbers — official statistics and records that make it a truly unique global phenomenon.","stat.players.title":"📈 Active players by year","stat.revenue.title":"💰 Epic Games revenue (Fortnite)","stat.records":"🏆 Official Records","stat.modes.title":"🎮 Breakdown of modes played","stat.platforms.title":"🖥️ Player platforms",
    "foot.credit":"Designed and developed by <span style='color:var(--y);font-family:var(--font-hero);letter-spacing:2px;'>RACHID</span> — All rights reserved © 2026","foot.cr":"Any reproduction, even partial, is prohibited without written authorization from the creator.","foot.disc":"FORTPEDIA is unofficial and not affiliated with Epic Games. Fortnite® is a registered trademark of Epic Games, Inc."
  },
  es:{
    "nav.histoire":"Historia","nav.bases":"Básicos","nav.modes":"Modos","nav.stats":"📊 Stats","nav.patch":"Notas de Parche","nav.esport":"Esport","nav.tournois":"Torneos","nav.classements":"Rankings","nav.reseaux":"Redes","nav.glossaire":"Glosario",
    "hero.eyebrow":"Guía completa — 16 de marzo de 2026","hero.sub":"Todo lo que necesitas saber sobre el Battle Royale más jugado del mundo: historia, tienda del día, esport, torneos y mucho más.","hero.cta1":"Empezar","hero.cta2":"📊 Stats & Récords","hero.scroll":"Scroll",
    "section.01":"Capítulo 01","section.02":"Capítulo 02","section.03":"Capítulo 03","section.04":"Capítulo 04","section.05":"Capítulo 05","section.06":"Capítulo 06 — EN VIVO","section.07":"Capítulo 07","section.08":"Capítulo 08","section.09":"Capítulo 09","section.10":"Capítulo 10","section.11":"Capítulo 11","section.12":"Capítulo 12","section.13":"Capítulo 13","section.14":"Capítulo 14",
    "histoire.title":"La <em>historia</em> de Fortnite","histoire.desc":"De un juego cooperativo de supervivencia a un fenómeno cultural mundial.",
    "bases.title":"Los <em>fundamentos</em>","bases.desc":"100 jugadores caen en una isla, el último en pie gana. Aquí las mecánicas fundamentales.",
    "modes.title":"Modos de <em>juego</em>","modes.desc":"Fortnite no es solo un juego. Múltiples modos coexisten con experiencias radicalmente distintas.",
    "rar.title":"Rareza de <em>armas</em>","rar.desc":"Cada arma tiene un color de rareza. Cuanto más rara, mejores sus estadísticas.",
    "tips.title":"Consejos <em>Pro</em>","tips.desc":"¿Quieres acumular Victorias Reales? Aquí los 8 consejos esenciales de los jugadores competitivos.",
    "shop.title":"🔥 Tienda del <em>Día</em>","shop.desc":"Cosméticos disponibles hoy en la tienda de Fortnite. Se renueva cada día a medianoche UTC.","shop.live":"EN VIVO — Se renueva a medianoche UTC",
    "cat.all":"Todo","cat.skin":"Atuendos","cat.bundle":"Paquetes","cat.emote":"Emotes","cat.pickaxe":"Picos","cat.glider":"Planeadores","cat.other":"Otros",
    "vb.title":"V-Bucks & <em>Precios</em>","vb.desc":"La moneda de Fortnite. Los precios cambiaron el 19 de marzo de 2026.","vb.warn":"⚠️ <strong>¡Aumento de precios!</strong> Desde el 19 de marzo de 2026, Epic redujo los V-Bucks por paquete. El Battle Pass cuesta 800 V-Bucks y recuperas 800 al completarlo.",
    "esport.title":"<em>Equipos</em> Esport","esport.desc":"Las organizaciones que patrocinan los mejores dúos del mundo para el circuito FNCS 2026.",
    "tourn.title":"Torneos <em>2026</em>","tourn.desc":"El FNCS 2026 en formato Dúos con más de <strong style='color:var(--y)'>$10.000.000</strong> en premios.",
    "rank.title":"Rankings <em>Pro</em>","rank.desc":"Mejores jugadores y equipos de la escena competitiva Fortnite 2026.","rank.players":"🏆 Top 10 Jugadores Mundiales","rank.teams":"🏢 Top 8 Equipos Esport",
    "patch.title":"Notas de Parche & <em>Actualizaciones</em>","patch.desc":"Todas las actualizaciones del Capítulo 7. Próxima: v40.00 el 19 de marzo de 2026.","patch.roadmap":"🗓️ Hoja de ruta oficial 2026","rm.ver":"Versión","rm.date":"Fecha","rm.content":"Contenido","rm.status":"Estado",
    "vids.title":"Vídeos <em>Imprescindibles</em>","vids.desc":"Los mejores canales para mejorar y estar al día con Fortnite.",
    "soc.title":"Redes <em>Oficiales</em>","soc.desc":"Sigue a Fortnite en todas las plataformas.",
    "gloss.title":"El <em>Glosario</em>","gloss.desc":"Términos que todo jugador de Fortnite debe conocer.",
    "gl1":"Ganar una partida. El último jugador o equipo con vida gana la Victoria Real.","gl2":"Los objetos, armas y recursos que recoges durante la partida.","gl3":"Estar frustrado o enojado después de una muerte o error.","gl4":"Combate cuerpo a cuerpo dentro de una estructura construida. Técnica avanzada de final de partida.","gl5":"Atacar a dos jugadores que ya están peleando para aprovechar su estado debilitado.","gl6":"Jugador muy competitivo y agresivo. Suele usarse de forma semi-peyorativa.","gl7":"Estrategia pasiva: esconderse, evitar todo combate, esperar que los demás se eliminen.","gl8":"Moverse hacia el próximo círculo de la tormenta de forma estratégica y segura.","gl9":"Un jugador con 1 PV — puede ser eliminado de un solo golpe.","gl10":"El acto de saltar del Bus de Batalla y aterrizar en el mapa.","gl11":"Jugar muy agresivamente yendo constantemente hacia los enemigos.","gl12":"Mecánica de torneo: los jugadores con menos daño pierden PV si pocos jugadores son eliminados.","gl13":"Modificar rápidamente una estructura construida para sorprender al oponente.","gl14":"Jugador muy malo, o un bot de IA insertado por el juego para principiantes.","gl15":"In-Game Leader — el jugador que toma las decisiones tácticas en los torneos.","gl16":"Modo creativo que simula el final de partida en zona. Usado por jugadores competitivos para entrenar.",
    "tl1.name":"La idea nace en Epic Games","tl1.text":"Epic anuncia Fortnite en los VGX como un shooter cooperativo de supervivencia con construcción.","tl2.name":"Lanzamiento de Salvar el Mundo","tl2.text":"El modo PvE de pago sale en acceso anticipado. Los jugadores luchan contra zombis y construyen defensas.","tl3.name":"Battle Royale — Gratis","tl3.text":"Epic lanza Fortnite Battle Royale gratis. 10 millones de jugadores en 2 semanas.","tl4.name":"Fenómeno cultural mundial","tl4.text":"125 millones de jugadores. Los bailes de Fortnite invaden los patios. 2.400 millones de dólares en ingresos.","tl5.name":"El evento \"Fin\" — Capítulo 2","tl5.text":"Un agujero negro engulle la isla durante 2 días. El mundo entero mira. El Capítulo 2 revela una nueva isla.","tl6.name":"Colaboraciones y metaverso","tl6.text":"Conciertos de Ariana Grande y Travis Scott. Crossovers con Marvel, Star Wars, Squid Game, South Park…",
    "base1.t":"El Bus de Batalla","base1.d":"El bus cruza la isla al inicio. Eliges dónde saltar. El aterrizaje estratégico es crucial.","base2.t":"La Tormenta","base2.d":"Un círculo tóxico se reduce progresivamente. Quedarte en la tormenta drena tus PV rápidamente.","base3.t":"Las Armas","base3.d":"Puedes llevar 5 objetos. Cada arma tiene una rareza que define su daño, precisión y recarga.","base4.t":"La Construcción","base4.d":"La firma de Fortnite. Recoge materiales y construye muros, suelos y rampas para protegerte.","base5.t":"Salud y Escudo","base5.d":"100 PV de salud + 100 PV de escudo máximo. Cúrate siempre después de cada combate.","base6.t":"El Botín","base6.d":"Los cofres brillantes contienen buenas armas. Aprende los puntos de botín denso en el mapa.",
    "mode1.t":"Battle Royale","mode1.d":"Solo, Dúo o Escuadra. 100 jugadores, 1 ganador. El modo principal desde 2017.","mode2.t":"Sin Construcción","mode2.d":"Battle Royale sin construcción. El Sobreescudo reemplaza los muros. Ideal para nuevos jugadores.","mode3.t":"Salvar el Mundo","mode3.d":"Modo PvE cooperativo. Lucha contra zombis y construye defensas. Free-to-play el 16 de abril de 2026.","mode4.t":"Creativo / UEFN","mode4.d":"Construye tus propias islas con el Unreal Editor. Millones de mapas de la comunidad disponibles.",
    "rar1":"Común","rar1d":"Gris — Estadísticas mínimas. Reemplazar lo antes posible.","rar2":"Poco común","rar2d":"Verde — Clara mejora. Generalmente encontrado en cofres al inicio.","rar3":"Raro","rar3d":"Azul — Buen nivel. La mayoría de partidas serias se juegan con armas azules como mínimo.","rar4":"Épico","rar4d":"Morado — Excelente arma. Daño alto y muy precisa.","rar5":"Legendario","rar5d":"Dorado — Estadísticas máximas. Encontrado en cofres dorados raros o como recompensa de jefes.","rar6":"Mítico","rar6d":"Arcoíris — Uno por partida. Vinculado a un jefe o evento. Poder absoluto.",
    "tip1.t":"Aterriza lejos del bus","tip1.d":"Saltar lejos de la trayectoria = menos gente cerca. Ideal para botinear tranquilo.","tip2.t":"Juega con auriculares","tip2.d":"Los pasos y disparos se detectan por el sonido. Unos buenos auriculares cambian la experiencia radicalmente.","tip3.t":"Vigila la tormenta","tip3.d":"Siempre revisa el círculo en el minimapa. Quedarse en la tormenta es el error más frecuente.","tip4.t":"Construye cuando recibas daño","tip4.d":"En cuanto recibas daño, pon un muro. La construcción refleja puede salvarte la vida.","tip5.t":"Cúrate después de cada combate","tip5.d":"Nunca vayas al siguiente combate sin curarte. 30 PV vs 100 PV — el resultado es predecible.","tip6.t":"Paciencia al final","tip6.d":"En el top 10, la paciencia supera a la agresión. Deja que los demás se eliminen entre sí.","tip7.t":"Domina 2–3 armas","tip7.d":"Escopeta + AR + SMG o francotirador. Una combinación eficaz vale más que 5 armas desconocidas.","tip8.t":"Empieza en Sin Construcción","tip8.d":"Si construir te parece complejo, Sin Construcción es perfecto para aprender sin presión.",
    "p1.t":"⚔️ Capítulo 7 Temporada 2 — \"SHOWDOWN\"","p1.d":"La Temporada 2 introduce el enfrentamiento entre The Foundation y el Ice King. Nuevo SMG. Salvar el Mundo gratis el 16 de abril.","p2.t":"Wild Week 1 — Armas OG de vuelta","p2.d":"La Wild Week 1 devuelve armas OG icónicas al loot pool. Los skins de Rick & Morty llegan a la tienda.",
    "stats.title":"Stats & <em>Récords</em>","stats.desc":"Fortnite en cifras — las estadísticas y récords oficiales que hacen del juego un fenómeno mundial único.","stat.players.title":"📈 Jugadores activos por año","stat.revenue.title":"💰 Ingresos de Epic Games (Fortnite)","stat.records":"🏆 Récords oficiales","stat.modes.title":"🎮 Distribución de modos jugados","stat.platforms.title":"🖥️ Plataformas de jugadores",
    "foot.credit":"Diseñado y desarrollado por <span style='color:var(--y);font-family:var(--font-hero);letter-spacing:2px;'>RACHID</span> — Todos los derechos reservados © 2026","foot.cr":"Cualquier reproducción, incluso parcial, está prohibida sin autorización escrita del creador.","foot.disc":"FORTPEDIA no es oficial y no está afiliado a Epic Games. Fortnite® es una marca registrada de Epic Games, Inc."
  }
};

let currentLang='fr';
function applyLang(lang){
  currentLang=lang;
  const t=translations[lang];
  document.documentElement.lang=lang;
  document.querySelectorAll('[data-i18n]').forEach(el=>{
    const key=el.getAttribute('data-i18n');
    if(t[key]!==undefined) el.innerHTML=t[key];
  });
  document.querySelectorAll('.lang-btn').forEach(b=>{b.classList.toggle('active',b.dataset.lang===lang);});
}
document.querySelectorAll('.lang-btn').forEach(btn=>{
  btn.addEventListener('click',()=>applyLang(btn.dataset.lang));
});