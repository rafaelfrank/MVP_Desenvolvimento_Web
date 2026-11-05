// Interações e navegação da demonstração Vértice.
const datasets = window.VERTICE_DATASETS;
let companies = datasets['Restaurantes e cafeterias'].map((x,i)=>({id:'r'+i,name:x[0],district:x[1],website:x[2],icon:x[3],color:x[4]}));
let saved = [];
let foundCount = 248;
const $ = id => document.getElementById(id);
function toast(msg){const el=$('toast');el.textContent=msg;el.classList.add('show');clearTimeout(window.toastTimer);window.toastTimer=setTimeout(()=>el.classList.remove('show'),2300)}
function renderCompanies(){
 const term=$('filter').value.trim().toLocaleLowerCase('pt-BR');
 const prioritize=$('no-site').checked;
 let shown=companies.filter(c=>(c.name+' '+c.district).toLocaleLowerCase('pt-BR').includes(term));
 if(prioritize) shown=shown.filter(c=>c.website==='Sem site');
 $('company-list').innerHTML=shown.length?shown.map(c=>{const isSaved=saved.some(s=>s.id===c.id);return `<div class="company-row"><div class="company-info"><div class="company-icon" style="background:${c.color}">${c.icon}</div><div style="min-width:0"><div class="company-name">${c.name}</div><div class="company-place">${c.district} · ${$('city').value.split(',')[0]||'Região'}</div></div></div><div><span class="site-status ${c.website==='Sem site'?'no':'yes'}">${c.website}</span></div><button class="save-btn ${isSaved?'saved':''}" data-save="${c.id}">${isSaved?'✓ Salvo':'+ Salvar'}</button></div>`}).join(''):'<div class="empty">Nenhuma empresa encontrada com esse filtro.</div>';
 document.querySelectorAll('[data-save]').forEach(btn=>btn.addEventListener('click',()=>toggleSave(btn.dataset.save)));
}
function toggleSave(id){const company=companies.find(c=>c.id===id);if(!company)return;const index=saved.findIndex(c=>c.id===id);if(index>=0){saved.splice(index,1);toast('Lead removido dos salvos.')}else{saved.push({...company});toast('Empresa salva com sucesso!')}renderCompanies();renderSaved();updateStats()}
function renderSaved(){ $('nav-count').textContent=saved.length;$('saved-list').innerHTML=saved.length?saved.map(c=>`<div class="lead-row"><div><strong>${c.name}</strong><small>${c.district} · ${c.website}</small></div><button class="save-btn" data-remove="${c.id}">Remover</button></div>`).join(''):'<div class="empty">Você ainda não salvou empresas. Faça uma pesquisa e clique em “Salvar” para adicioná-las aqui.</div>';document.querySelectorAll('[data-remove]').forEach(b=>b.addEventListener('click',()=>toggleSave(b.dataset.remove)))}
function updateStats(){$('stat-leads').textContent=saved.length;$('report-leads').textContent=saved.length}
function runSearch(){const category=$('category').value;const source=datasets[category]||[];companies=source.map((x,i)=>({id:category.slice(0,2)+i,name:x[0],district:x[1],website:x[2],icon:x[3],color:x[4]}));foundCount=Math.min(Number($('limit').value),category==='Restaurantes e cafeterias'?248:source.length*31);$('total-pill').textContent=foundCount+' empresas';const without=companies.filter(c=>c.website==='Sem site').length;$('nosite-pill').textContent=Math.round(foundCount*(without/(companies.length||1)))+' sem site';$('filter').value='';renderCompanies();$('stat-found').textContent=foundCount;$('report-found').textContent=foundCount;toast('Pesquisa demonstrativa concluída!')}
function navigate(view){document.querySelectorAll('.view').forEach(v=>v.classList.remove('active'));$('view-'+view).classList.add('active');document.querySelectorAll('.nav button').forEach(b=>b.classList.toggle('active',b.dataset.view===view));if(view==='leads')renderSaved();}
document.querySelectorAll('.nav button').forEach(b=>b.addEventListener('click',()=>navigate(b.dataset.view)));
document.querySelectorAll('[data-goto]').forEach(b=>b.addEventListener('click',()=>navigate(b.dataset.goto)));
$('run-search').addEventListener('click',runSearch);$('filter').addEventListener('input',renderCompanies);$('no-site').addEventListener('change',renderCompanies);
renderCompanies();renderSaved();updateStats();
