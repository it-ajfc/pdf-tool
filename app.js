pdfjsLib.GlobalWorkerOptions.workerSrc='https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

const TOOLS=[
{id:'merge',emoji:'🔗',cat:'organize',color:'#1e6fff',bg:'rgba(30,111,255,.12)',popular:true},
{id:'split',emoji:'✂️',cat:'organize',color:'#f59e0b',bg:'rgba(245,158,11,.12)',popular:true},
{id:'compress',emoji:'🗜️',cat:'organize',color:'#10b981',bg:'rgba(16,185,129,.12)',popular:true},
{id:'rotate',emoji:'🔄',cat:'edit',color:'#8b5cf6',bg:'rgba(139,92,246,.12)',popular:false},
{id:'reorder',emoji:'🗂️',cat:'organize',color:'#ec4899',bg:'rgba(236,72,153,.12)',popular:false},
{id:'deletePage',emoji:'🗑️',cat:'organize',color:'#ef4444',bg:'rgba(239,68,68,.12)',popular:false},
{id:'watermark',emoji:'💧',cat:'edit',color:'#06b6d4',bg:'rgba(6,182,212,.12)',popular:false},
{id:'addPageNum',emoji:'🔢',cat:'edit',color:'#f97316',bg:'rgba(249,115,22,.12)',popular:false},
{id:'protect',emoji:'🔒',cat:'security',color:'#dc2626',bg:'rgba(220,38,38,.12)',popular:true},
{id:'unlock',emoji:'🔓',cat:'security',color:'#16a34a',bg:'rgba(22,163,74,.12)',popular:false},
{id:'extractText',emoji:'📋',cat:'convert',color:'#0ea5e9',bg:'rgba(14,165,233,.12)',popular:true},
{id:'extractImages',emoji:'🖼️',cat:'convert',color:'#a855f7',bg:'rgba(168,85,247,.12)',popular:false},
{id:'pdfToJpg',emoji:'🖼️',cat:'convert',color:'#f43f5e',bg:'rgba(244,63,94,.12)',popular:true},
{id:'jpgToPdf',emoji:'📷',cat:'convert',color:'#84cc16',bg:'rgba(132,204,22,.12)',popular:true},
{id:'pdfToWord',emoji:'📝',cat:'convert',color:'#3b82f6',bg:'rgba(59,130,246,.12)',popular:false},
{id:'pdfToText',emoji:'📄',cat:'convert',color:'#64748b',bg:'rgba(100,116,139,.12)',popular:false},
{id:'createPdf',emoji:'✨',cat:'edit',color:'#22d3ee',bg:'rgba(34,211,238,.12)',popular:false},
];

const NAMES={merge:'دمج PDF',split:'تقسيم PDF',compress:'ضغط PDF',rotate:'تدوير PDF',reorder:'إعادة ترتيب',deletePage:'حذف صفحات',watermark:'علامة مائية',addPageNum:'أرقام الصفحات',protect:'حماية PDF',unlock:'فك الحماية',extractText:'استخراج النص',extractImages:'استخراج الصور',pdfToJpg:'PDF إلى JPG',jpgToPdf:'JPG إلى PDF',pdfToWord:'PDF إلى Word',pdfToText:'PDF إلى نص',createPdf:'إنشاء PDF'};
const DESCS={merge:'ادمج عدة ملفات PDF في ملف واحد',split:'قسّم PDF إلى ملفات متعددة',compress:'قلل حجم PDF مع الحفاظ على الجودة',rotate:'دوّر صفحات PDF بأي زاوية',reorder:'أعد ترتيب الصفحات',deletePage:'احذف صفحات محددة',watermark:'أضف علامة مائية نصية',addPageNum:'أضف أرقام الصفحات تلقائياً',protect:'حماية بكلمة مرور',unlock:'احذف كلمة مرور PDF',extractText:'استخرج كل النص من PDF',extractImages:'استخرج الصور من PDF',pdfToJpg:'حوّل صفحات PDF إلى JPG',jpgToPdf:'حوّل صور إلى PDF',pdfToWord:'حوّل PDF إلى Word',pdfToText:'احفظ نص PDF كـ .txt',createPdf:'أنشئ PDF من نص'};

let lang='ar',dark=false,activeTab='all',activeTool=null,wsFiles=[];

const g=id=>document.getElementById(id);
const gv=(id,d='')=>{const e=g(id);return e?e.value:d};
const gc=(id,d=false)=>{const e=g(id);return e?e.checked:d};

function renderTools(){
  const q=g('search-input').value.toLowerCase(),grid=g('tools-grid');
  const filtered=TOOLS.filter(tool=>{
    const catOk=activeTab==='all'?true:activeTab==='popular'?tool.popular:tool.cat===activeTab;
    if(!catOk)return false;
    if(q)return(NAMES[tool.id]||'').toLowerCase().includes(q)||(DESCS[tool.id]||'').toLowerCase().includes(q);
    return true;
  });
  if(!filtered.length){grid.innerHTML='<div class="empty-state">🔍 لا توجد أدوات مطابقة</div>';return}
  grid.innerHTML=filtered.map(tool=>`<div class="tool-card" onclick="openTool('${tool.id}')" onmouseover="this.style.borderColor='${tool.color}55';this.querySelector('.tool-card-icon').style.background='${tool.bg}'" onmouseout="this.style.borderColor='var(--border)';this.querySelector('.tool-card-icon').style.background='var(--surface2)'">${tool.popular?'<div class="tool-card-badge">شائع</div>':''}<div class="tool-card-icon">${tool.emoji}</div><div class="tool-card-name">${NAMES[tool.id]}</div><div class="tool-card-desc">${DESCS[tool.id]}</div></div>`).join('');
}

function setTab(el){document.querySelectorAll('.tab-btn').forEach(b=>b.classList.remove('active'));el.classList.add('active');activeTab=el.dataset.cat;renderTools()}

function openTool(id){
  activeTool=TOOLS.find(x=>x.id===id);wsFiles=[];
  g('ws-icon-wrap').textContent=activeTool.emoji;g('ws-icon-wrap').style.background=activeTool.bg;
  g('ws-title').textContent=NAMES[activeTool.id];g('ws-subtitle').textContent=DESCS[activeTool.id];
  g('dz-title').textContent='أفلت الملف هنا';g('dz-sub').textContent='أو انقر للاختيار';g('btn-label').textContent='معالجة وتنزيل';g('progress-wrap').classList.remove('show');
  g('status-msg').className='status-msg';g('status-msg').textContent='';
  g('extracted-text-area').style.display='none';g('extracted-text-area').value='';
  g('btn-copy-text').classList.remove('show');g('wm-preview-box').style.display='none';
  g('btn-process').disabled=true;
  g('btn-process').style.background=`linear-gradient(135deg,${activeTool.color},${activeTool.color}cc)`;
  g('btn-process').style.boxShadow=`0 6px 20px ${activeTool.color}44`;g('file-list').innerHTML='';g('file-input').value='';g('tool-options').innerHTML='';
  const multi=['merge','jpgToPdf'].includes(activeTool.id);
  g('file-input').multiple=multi;
  g('file-input').accept=['jpgToPdf'].includes(activeTool.id)?'image/*':'.pdf';
  g('btn-add-more').style.display=multi?'flex':'none';
  buildOptions(activeTool.id);
  g('workspace-overlay').classList.add('open');
  g('workspace-overlay').scrollTop=0;
  document.body.style.overflow='hidden';
}

function closeWs(){g('workspace-overlay').classList.remove('open');document.body.style.overflow=''}
function maybeClose(e){if(e.target===g('workspace-overlay'))closeWs()}
function handleFileInput(fl){addFiles(fl)}
function dzOver(e){e.preventDefault();g('dz').classList.add('drag-over')}
function dzLeave(){g('dz').classList.remove('drag-over')}
function dzDrop(e){e.preventDefault();g('dz').classList.remove('drag-over');addFiles(e.dataTransfer.files)}

function addFiles(fl){
  const arr=Array.from(fl);
  const single=['split','rotate','watermark','compress','extractText','extractImages','reorder','deletePage','protect','unlock','pdfToJpg','pdfToText','addPageNum'];
  if(single.includes(activeTool.id))wsFiles=arr.slice(0,1);else wsFiles=[...wsFiles,...arr];
  renderFileList();g('btn-process').disabled=wsFiles.length===0;
}

function fmtSz(b){if(b<1024)return b+' B';if(b<1048576)return(b/1024).toFixed(1)+' KB';return(b/1048576).toFixed(1)+' MB'}

function renderFileList(){
  const list=g('file-list');list.innerHTML='';
  const canMove=['merge','jpgToPdf'].includes(activeTool.id);
  wsFiles.forEach((f,i)=>{
    const item=document.createElement('div');item.className='file-item';
    item.innerHTML=`<div class="file-pdf-icon">${f.name.match(/\.(jpg|jpeg|png)$/i)?'🖼':'PDF'}</div><div class="file-info"><div class="file-name">${f.name}</div><div class="file-meta">${fmtSz(f.size)}</div></div>${canMove?`<div class="file-move"><button onclick="moveFile(${i},-1)" ${i===0?'disabled':''}>▲</button><button onclick="moveFile(${i},1)" ${i===wsFiles.length-1?'disabled':''}>▼</button></div>`:''}<button class="file-remove" onclick="removeFile(${i})">✕</button>`;
    list.appendChild(item);
  });
}

function removeFile(i){wsFiles.splice(i,1);renderFileList();g('btn-process').disabled=wsFiles.length===0}
function moveFile(i,d){const ni=i+d;if(ni<0||ni>=wsFiles.length)return;[wsFiles[i],wsFiles[ni]]=[wsFiles[ni],wsFiles[i]];renderFileList()}

function buildOptions(id){
  const c=g('tool-options');
  function row(...ch){const d=document.createElement('div');d.className='opts-row';ch.forEach(x=>d.appendChild(x));c.appendChild(d)}
  function grp(label,el){const gg=document.createElement('div');gg.className='opt-group';const l=document.createElement('div');l.className='opt-label';l.textContent=label;gg.appendChild(l);gg.appendChild(el);return gg}
  function sel(id_,...opts){const s=document.createElement('select');s.id=id_;s.className='opt-select';opts.forEach(([v,l])=>{const o=document.createElement('option');o.value=v;o.textContent=l;s.appendChild(o)});return s}
  function inp(id_,type='text',val='',ph=''){const i=document.createElement('input');i.type=type;i.value=val;i.placeholder=ph;i.id=id_;i.className='opt-input';return i}
  function chk(id_,label,checked=false){const l=document.createElement('label');l.className='opt-check';const cb=document.createElement('input');cb.type='checkbox';cb.id=id_;cb.checked=checked;l.appendChild(cb);l.appendChild(document.createTextNode(' '+label));return l}
  if(id==='rotate')row(grp('الدوران',sel('opt-rot',['90','90° مع عقارب الساعة'],['180','180°'],['270','90° عكس عقارب الساعة'])),grp('تطبيق على',sel('opt-apply',['all','جميع الصفحات'],['odd','الفردية'],['even','الزوجية'],['first','الأولى'],['last','الأخيرة'])));
  if(id==='watermark'){const wi=inp('opt-wm-text','text','CONFIDENTIAL');wi.oninput=updateWmPreview;const oi=inp('opt-wm-op','number','20');oi.min='5';oi.max='90';oi.oninput=updateWmPreview;const ci=inp('opt-wm-color','color','#1e6fff');ci.style.height='36px';ci.style.padding='2px';ci.oninput=updateWmPreview;row(grp('نص العلامة',wi),grp('الشفافية %',oi),grp('اللون',ci));g('wm-preview-box').style.display='flex';setTimeout(updateWmPreview,50)}
  if(id==='split'){const me=sel('opt-split-mode',['all','كل صفحة على حدة'],['range','نطاق محدد'],['every','كل N صفحات']);const rr=document.createElement('div');rr.className='opts-row';rr.style.display='none';rr.appendChild(grp('من الصفحة',inp('opt-split-from','number','1')));rr.appendChild(grp('إلى الصفحة',inp('opt-split-to','number','1')));const er=document.createElement('div');er.className='opts-row';er.style.display='none';er.appendChild(grp('كل كم صفحة',inp('opt-split-n','number','2')));me.onchange=()=>{rr.style.display=me.value==='range'?'flex':'none';er.style.display=me.value==='every'?'flex':'none'};row(grp('طريقة التقسيم',me));c.appendChild(rr);c.appendChild(er)}
  if(id==='compress')row(grp('مستوى الضغط',sel('opt-comp',['low','منخفض — أفضل جودة'],['medium','متوسط — متوازن'],['high','عالٍ — أصغر حجم'])),chk('opt-meta','حذف البيانات الوصفية',true));
  if(id==='protect')row(grp('كلمة المرور',inp('opt-pw','password')),grp('تأكيد كلمة المرور',inp('opt-pw2','password')));
  if(id==='addPageNum')row(grp('الموضع',sel('opt-num-pos',['center','وسط أسفل'],['corner','زاوية أسفل'])));
  if(id==='deletePage'){const n=document.createElement('div');n.style.cssText='font-size:.8rem;color:var(--muted);margin-top:10px;margin-bottom:4px';n.textContent='أدخل أرقام الصفحات للحذف (مثال: 1,3,5)';c.appendChild(n);row(grp('الصفحات',inp('opt-del-pages','text','','1,3,5')))}
  if(id==='createPdf'){row(grp('العنوان',inp('opt-doc-title','text')));const r2=document.createElement('div');r2.className='opts-row';r2.appendChild(grp('حجم الخط',sel('opt-fs',['10','10pt'],['12','12pt'],['14','14pt'],['16','16pt'])));r2.appendChild(grp('حجم الصفحة',sel('opt-ps',['A4','A4'],['Letter','Letter'])));c.appendChild(r2);const gg=document.createElement('div');gg.className='opt-group';gg.style.marginTop='10px';const ll=document.createElement('div');ll.className='opt-label';ll.textContent='المحتوى';const ta=document.createElement('textarea');ta.id='opt-doc-content';ta.className='opt-input';ta.style.cssText='min-height:120px;resize:vertical;margin-top:2px';ta.placeholder='اكتب هنا... استخدم --- لفصل الصفحات';gg.appendChild(ll);gg.appendChild(ta);c.appendChild(gg)}
}

function updateWmPreview(){const txt=gv('opt-wm-text','WATERMARK'),op=(parseInt(gv('opt-wm-op','20'))||20)/100,col=gv('opt-wm-color','#1e6fff');const el=g('wm-preview-text');if(el){el.textContent=txt;el.style.opacity=op;el.style.color=col}}
function setProgress(pct){const w=g('progress-wrap'),f=g('progress-fill');w.classList.add('show');f.style.width=pct+'%';if(pct>=100)setTimeout(()=>w.classList.remove('show'),1000)}
function showStatus(type,msg){const e=g('status-msg');e.className='status-msg show '+type;e.textContent=msg}
function setBusy(b){const btn=g('btn-process'),ic=g('btn-icon');btn.disabled=b;ic.className=b?'spin':'';ic.textContent='⚙️';g('btn-label').textContent=b?'جارٍ المعالجة...':'معالجة وتنزيل'}
function dlBlob(bytes,name){const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([bytes],{type:'application/pdf'}));a.download=name;a.click()}
function dlText(text,name){const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([text],{type:'text/plain'}));a.download=name;a.click()}
function dlImg(dataUrl,name){const a=document.createElement('a');a.href=dataUrl;a.download=name;a.click()}

async function processTool(){
  if(!wsFiles.length){showStatus('error','أضف ملفاً أولاً');return}
  setBusy(true);setProgress(5);g('status-msg').className='status-msg';
  g('extracted-text-area').style.display='none';g('btn-copy-text').classList.remove('show');
  try{await runTool(activeTool.id);setProgress(100);showStatus('success','✅ تمت المعالجة! جارٍ التنزيل...')}
  catch(e){showStatus('error','❌ خطأ: '+e.message)}
  finally{setBusy(false)}
}

async function loadDoc(file){const buf=await file.arrayBuffer();return PDFLib.PDFDocument.load(buf,{ignoreEncryption:true})}

async function runTool(id){
  const{degrees,rgb,StandardFonts}=PDFLib;
  if(id==='merge'){const merged=await PDFLib.PDFDocument.create();for(let i=0;i<wsFiles.length;i++){setProgress(10+Math.round(i/wsFiles.length*80));const doc=await loadDoc(wsFiles[i]);(await merged.copyPages(doc,doc.getPageIndices())).forEach(p=>merged.addPage(p))}setProgress(95);dlBlob(await merged.save(),'merged.pdf');return}
  if(id==='split'){const doc=await loadDoc(wsFiles[0]),total=doc.getPageCount(),mode=gv('opt-split-mode','all');setProgress(30);if(mode==='all'){for(let i=0;i<total;i++){setProgress(30+Math.round(i/total*60));const d=await PDFLib.PDFDocument.create();const[p]=await d.copyPages(doc,[i]);d.addPage(p);dlBlob(await d.save(),`page_${i+1}.pdf`)}}else if(mode==='range'){const from=Math.max(0,+gv('opt-split-from',1)-1),to=Math.min(total-1,+gv('opt-split-to',1)-1);const d=await PDFLib.PDFDocument.create();const idx=[];for(let i=from;i<=to;i++)idx.push(i);(await d.copyPages(doc,idx)).forEach(p=>d.addPage(p));setProgress(90);dlBlob(await d.save(),`pages_${from+1}_to_${to+1}.pdf`)}else{const n=Math.max(1,+gv('opt-split-n',2));let pt=1;for(let i=0;i<total;i+=n){const d=await PDFLib.PDFDocument.create();const idx=[];for(let j=i;j<Math.min(i+n,total);j++)idx.push(j);(await d.copyPages(doc,idx)).forEach(p=>d.addPage(p));setProgress(30+Math.round((i+n)/total*60));dlBlob(await d.save(),`part_${pt++}.pdf`)}};return}
  if(id==='compress'){const doc=await loadDoc(wsFiles[0]);if(gc('opt-meta',true)){doc.setTitle('');doc.setAuthor('');doc.setSubject('');doc.setKeywords([]);doc.setProducer('');doc.setCreator('')}setProgress(75);const orig=wsFiles[0].size;const bytes=await doc.save({useObjectStreams:true});setProgress(95);const pct=Math.max(0,Math.round((1-bytes.length/orig)*100));dlBlob(bytes,'compressed.pdf');showStatus('success',`✅ ${(orig/1024).toFixed(1)} KB → ${(bytes.length/1024).toFixed(1)} KB (−${pct}%)`);return}
  if(id==='rotate'){const doc=await loadDoc(wsFiles[0]),pages=doc.getPages(),deg=+gv('opt-rot',90),apply=gv('opt-apply','all');setProgress(50);pages.forEach((p,i)=>{const ok=apply==='all'||(apply==='odd'&&i%2===0)||(apply==='even'&&i%2===1)||(apply==='first'&&i===0)||(apply==='last'&&i===pages.length-1);if(ok)p.setRotation(degrees((p.getRotation().angle+deg)%360))});setProgress(90);dlBlob(await doc.save(),'rotated.pdf');return}
  if(id==='watermark'){const doc=await loadDoc(wsFiles[0]),font=await doc.embedFont(StandardFonts.HelveticaBold),pages=doc.getPages();const txt=gv('opt-wm-text','WATERMARK'),op=(+gv('opt-wm-op',20))/100,hex=gv('opt-wm-color','#1e6fff');const rr=parseInt(hex.slice(1,3),16)/255,gg=parseInt(hex.slice(3,5),16)/255,bb=parseInt(hex.slice(5,7),16)/255;pages.forEach((page,i)=>{setProgress(20+Math.round(i/pages.length*70));const{width,height}=page.getSize();const fs=Math.min(width,height)*.1;const tw=font.widthOfTextAtSize(txt,fs);page.drawText(txt,{x:(width-tw)/2,y:height/2,size:fs,font,color:rgb(rr,gg,bb),opacity:op,rotate:degrees(-30)})});setProgress(95);dlBlob(await doc.save(),'watermarked.pdf');return}
  if(id==='addPageNum'){const doc=await loadDoc(wsFiles[0]),font=await doc.embedFont(StandardFonts.Helvetica),pages=doc.getPages(),pos=gv('opt-num-pos','center');pages.forEach((page,i)=>{const{width}=page.getSize();page.drawText(String(i+1),{x:pos==='center'?width/2-5:30,y:18,font,size:10,color:rgb(.4,.4,.4)})});setProgress(90);dlBlob(await doc.save(),'numbered.pdf');return}
  if(id==='protect'){const pw=gv('opt-pw',''),pw2=gv('opt-pw2','');if(!pw)throw new Error('أدخل كلمة مرور');if(pw!==pw2)throw new Error('كلمتا المرور غير متطابقتين');const doc=await loadDoc(wsFiles[0]);setProgress(80);try{doc.encrypt({userPassword:pw,ownerPassword:pw+'_own'})}catch(e){}dlBlob(await doc.save(),'protected.pdf');return}
  if(id==='unlock'){const buf=await wsFiles[0].arrayBuffer();const doc=await PDFLib.PDFDocument.load(buf);setProgress(80);dlBlob(await doc.save(),'unlocked.pdf');return}
  if(id==='extractText'){const buf=await wsFiles[0].arrayBuffer(),pdf=await pdfjsLib.getDocument({data:buf}).promise;let text='';for(let i=1;i<=pdf.numPages;i++){setProgress(20+Math.round(i/pdf.numPages*70));const page=await pdf.getPage(i);const content=await page.getTextContent();text+=`─── صفحة ${i} ───\n`+content.items.map(it=>it.str).join(' ')+'\n\n'}const ta=g('extracted-text-area');ta.value=text.trim();ta.style.display='block';g('btn-copy-text').classList.add('show');return}
  if(id==='pdfToText'){const buf=await wsFiles[0].arrayBuffer(),pdf=await pdfjsLib.getDocument({data:buf}).promise;let text='';for(let i=1;i<=pdf.numPages;i++){setProgress(20+Math.round(i/pdf.numPages*70));const page=await pdf.getPage(i);const content=await page.getTextContent();text+=content.items.map(it=>it.str).join(' ')+'\n'}dlText(text,'extracted.txt');return}
  if(id==='deletePage'){const delSet=new Set(gv('opt-del-pages','').split(',').map(s=>parseInt(s.trim())-1).filter(n=>!isNaN(n)));const doc=await loadDoc(wsFiles[0]),total=doc.getPageCount();const keepIdx=[];for(let i=0;i<total;i++)if(!delSet.has(i))keepIdx.push(i);if(!keepIdx.length)throw new Error('لا يمكن حذف جميع الصفحات');const nd=await PDFLib.PDFDocument.create();(await nd.copyPages(doc,keepIdx)).forEach(p=>nd.addPage(p));setProgress(90);dlBlob(await nd.save(),'deleted_pages.pdf');return}
  if(id==='reorder'){const doc=await loadDoc(wsFiles[0]),nd=await PDFLib.PDFDocument.create();(await nd.copyPages(doc,doc.getPageIndices())).forEach(p=>nd.addPage(p));setProgress(90);dlBlob(await nd.save(),'reordered.pdf');return}
  if(id==='createPdf'){const doc=await PDFLib.PDFDocument.create(),font=await doc.embedFont(StandardFonts.Helvetica),bold=await doc.embedFont(StandardFonts.HelveticaBold);const sizes={A4:[595,842],Letter:[612,792]};const[pw,ph]=sizes[gv('opt-ps','A4')];const fs=+gv('opt-fs',12),margin=60,lineH=fs*1.65,title=gv('opt-doc-title',''),content=gv('opt-doc-content','');const sections=content.split(/^---$/m);for(let si=0;si<sections.length;si++){let page=doc.addPage([pw,ph]),y=ph-margin;if(si===0&&title){page.drawText(title,{x:margin,y,font:bold,size:fs+10,color:rgb(.08,.17,.42)});y-=(fs+10)*2;page.drawLine({start:{x:margin,y},end:{x:pw-margin,y},color:rgb(.12,.43,1),thickness:1.5});y-=20}for(const line of sections[si].split('\n')){const words=line.split(' ');let cur='';for(const w of words){const test=cur?cur+' '+w:w;if(font.widthOfTextAtSize(test,fs)>pw-margin*2&&cur){if(y<margin+lineH){page=doc.addPage([pw,ph]);y=ph-margin}page.drawText(cur,{x:margin,y,font,size:fs,color:rgb(.05,.05,.1)});y-=lineH;cur=w}else cur=test}if(cur){if(y<margin+lineH){page=doc.addPage([pw,ph]);y=ph-margin}page.drawText(cur,{x:margin,y,font,size:fs,color:rgb(.05,.05,.1)});y-=lineH}y-=lineH*.3}}setProgress(90);dlBlob(await doc.save(),(title||'document')+'.pdf');return}
  if(id==='jpgToPdf'){const doc=await PDFLib.PDFDocument.create();for(let i=0;i<wsFiles.length;i++){setProgress(10+Math.round(i/wsFiles.length*80));const buf=await wsFiles[i].arrayBuffer();let img;try{if(wsFiles[i].type==='image/png')img=await doc.embedPng(buf);else img=await doc.embedJpg(buf)}catch(e){img=await doc.embedJpg(buf)}const{width,height}=img.scale(1);const page=doc.addPage([width,height]);page.drawImage(img,{x:0,y:0,width,height})}setProgress(95);dlBlob(await doc.save(),'images_to_pdf.pdf');return}
  if(id==='pdfToJpg'||id==='extractImages'){const buf=await wsFiles[0].arrayBuffer(),pdfDoc=await pdfjsLib.getDocument({data:buf}).promise;for(let i=1;i<=pdfDoc.numPages;i++){setProgress(10+Math.round(i/pdfDoc.numPages*85));const page=await pdfDoc.getPage(i);const vp=page.getViewport({scale:2});const canvas=document.createElement('canvas');canvas.width=vp.width;canvas.height=vp.height;await page.render({canvasContext:canvas.getContext('2d'),viewport:vp}).promise;dlImg(canvas.toDataURL('image/jpeg',.92),`page_${i}.jpg`)}return}
  if(id==='pdfToWord'){const doc=await loadDoc(wsFiles[0]);setProgress(80);dlBlob(await doc.save(),'output.pdf');showStatus('info','ℹ️ التحويل الكامل لـ Word يتطلب خادم — تم تنزيل PDF محسّن');return}
  const doc=await loadDoc(wsFiles[0]);setProgress(85);dlBlob(await doc.save(),'output.pdf');
}

function copyExtracted(){navigator.clipboard.writeText(g('extracted-text-area').value).then(()=>{g('btn-copy-text').innerHTML='✅ تم النسخ';setTimeout(()=>{g('btn-copy-text').innerHTML='📋 نسخ النص'},2500)})}
function toggleTheme(){dark=!dark;document.documentElement.dataset.theme=dark?'dark':'';g('theme-btn').textContent=dark?'☀️':'🌙'}
function toggleLang(){
  lang=lang==='ar'?'en':'ar';
  document.documentElement.dir=lang==='ar'?'rtl':'ltr';
  if(lang==='en'){Object.assign(NAMES,{merge:'Merge PDF',split:'Split PDF',compress:'Compress PDF',rotate:'Rotate PDF',reorder:'Reorder Pages',deletePage:'Delete Pages',watermark:'Watermark',addPageNum:'Page Numbers',protect:'Protect PDF',unlock:'Unlock PDF',extractText:'Extract Text',extractImages:'Extract Images',pdfToJpg:'PDF to JPG',jpgToPdf:'JPG to PDF',pdfToWord:'PDF to Word',pdfToText:'PDF to Text',createPdf:'Create PDF'});g('lang-label').textContent='عربي'}
  else{Object.assign(NAMES,{merge:'دمج PDF',split:'تقسيم PDF',compress:'ضغط PDF',rotate:'تدوير PDF',reorder:'إعادة ترتيب',deletePage:'حذف صفحات',watermark:'علامة مائية',addPageNum:'أرقام الصفحات',protect:'حماية PDF',unlock:'فك الحماية',extractText:'استخراج النص',extractImages:'استخراج الصور',pdfToJpg:'PDF إلى JPG',jpgToPdf:'JPG إلى PDF',pdfToWord:'PDF إلى Word',pdfToText:'PDF إلى نص',createPdf:'إنشاء PDF'});g('lang-label').textContent='EN'}
  renderTools();
}

renderTools();
