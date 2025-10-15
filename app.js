let DATA=null;
let selectedTrayIds=new Set();
let currentStep=0;

const trayListEl=document.getElementById('trayList');
const selectedTraysEl=document.getElementById('selectedTrays');
const stepNavEl=document.getElementById('stepNav');
const stepContentEl=document.getElementById('stepContent');
const procHeaderEl=document.getElementById('procedureHeader');

document.getElementById('loadDefault').addEventListener('click', async () => {
  const res = await fetch('procedure_tha_actis_demo.json');
  DATA = await res.json();
  initUI();
});

document.getElementById('datasetFile').addEventListener('change', async (e) => {
  const file = e.target.files[0];
  if(!file) return;
  const text = await file.text();
  DATA = JSON.parse(text);
  initUI();
});

function initUI(){
  selectedTrayIds.clear();
  currentStep=0;
  renderProcedureHeader();
  renderTrays();
  renderSelectedTrays();
  renderSteps();
  renderStepContent();
}

function renderProcedureHeader(){
  const p = DATA.procedure;
  procHeaderEl.innerHTML = `<h2>${p.name}</h2>
  <div><span class="badge">Approach: ${p.approach||'n/a'}</span>
  <span class="badge">Steps: ${p.steps.length}</span></div>`;
}

function renderTrays(){
  const trays = DATA.trays;
  trayListEl.innerHTML = '';
  trays.forEach(tr => {
    const div = document.createElement('div');
    div.className='tray';
    div.innerHTML = `<h4>${tr.name}</h4>
      <small>${tr.vendor||'Vendor'} • ${tr.system||''}</small>
      <div><button data-id="${tr.id}">${selectedTrayIds.has(tr.id)?'Remove':'Add'}</button></div>
      <details><summary>Instruments</summary><ul>${tr.instruments.map(i=>`<li>${i}</li>`).join('')}</ul></details>`;
    div.querySelector('button').addEventListener('click', (e)=>{
      const id=e.target.getAttribute('data-id');
      if(selectedTrayIds.has(id)){ selectedTrayIds.delete(id);} else { selectedTrayIds.add(id); }
      renderTrays(); renderSelectedTrays(); renderStepContent();
    });
    trayListEl.appendChild(div);
  });
}

function renderSelectedTrays(){
  const trays = DATA.trays.filter(t=>selectedTrayIds.has(t.id));
  selectedTraysEl.innerHTML = trays.map(t=>`<li>${t.name}</li>`).join('') || '<li><em>No trays selected</em></li>';
}

function renderSteps(){
  const steps = DATA.procedure.steps;
  stepNavEl.innerHTML = '';
  steps.forEach((s,idx)=>{
    const btn = document.createElement('button');
    btn.className = 'step-button'+(idx===currentStep?' active':'');
    btn.textContent = `${idx+1}. ${s.name}`;
    btn.addEventListener('click',()=>{ currentStep=idx; renderSteps(); renderStepContent(); });
    stepNavEl.appendChild(btn);
  });
}

function getSelectedInstruments(){
  const map = new Set();
  DATA.trays.filter(t=>selectedTrayIds.has(t.id))
            .forEach(t=>t.instruments.forEach(i=>map.add(i)));
  return map;
}

function renderStepContent(){
  const step = DATA.procedure.steps[currentStep];
  const have = getSelectedInstruments();
  const req = step.required_instruments || [];
  const opt = step.optional_instruments || [];

  const reqHtml = req.map(i=>{
    const ok = have.has(i);
    return `<div class="req ${ok?'ok':'miss'}"><div class="status"></div><div>${i}</div></div>`;
  }).join('');

  const optHtml = opt.map(i=>{
    const ok = have.has(i);
    return `<div class="req ${ok?'ok':'miss'}"><div class="status"></div><div>${i} <small>(optional)</small></div></div>`;
  }).join('');

  const coverage = req.filter(i=>have.has(i)).length + " / " + req.length;

  stepContentEl.innerHTML = `
    <h3>${step.name}</h3>
    <p>${step.description||''}</p>
    <p><strong>Coverage:</strong> ${coverage} required instruments covered</p>
    <div class="requirements"><h4>Required</h4>${reqHtml||'<em>None</em>'}</div>
    <div class="requirements"><h4>Optional</h4>${optHtml||'<em>None</em>'}</div>
  `;
}
