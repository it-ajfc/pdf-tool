pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

const TOOLS = [
  {id:'merge',emoji:'🔗',cat:'organize',color:'#1e6fff',bg:'rgba(30,111,255,.12)',popular:true},
  {id:'split',emoji:'✂️',cat:'organize',color:'#f59e0b',bg:'rgba(245,158,11,.12)',popular:true},
  {id:'compress',emoji:'🗜️',cat:'organize',color:'#10b981',bg:'rgba(16,185,129,.12)',popular:true},
  {id:'rotate',emoji:'🔄',cat:'edit',color:'#8b5cf6',bg:'rgba(139,92,246,.12)',popular:false},
  {id:'reorder',emoji:'🗂️',cat:'organize',color:'#ec4899',bg:'rgba(236,72,153,.12)',popular:false},
  {id:'deletePage',emoji:'🗑️',cat:'organize',color:'#ef4444',bg:'rgba(239,68,68,.12)',popular:false},
  {id:'watermark',emoji:'💧',cat:'edit',color:'#06b6d4',bg:'rgba(6,182,212,.12)',popular:false},
  {id:'addPageNum',emoji:'🔢',cat:'edit',color:'#f97316',bg:'rgba(249,115,22,.12)',popular:false},
  {id:'extractText',emoji:'📋',cat:'convert',color:'#0ea5e9',bg:'rgba(14,165,233,.12)',popular:true},
  {id:'extractImages',emoji:'🖼️',cat:'convert',color:'#a855f7',bg:'rgba(168,85,247,.12)',popular:false},
  {id:'pdfToJpg',emoji:'🖼️',cat:'convert',color:'#f43f5e',bg:'rgba(244,63,94,.12)',popular:true},
  {id:'jpgToPdf',emoji:'📷',cat:'convert',color:'#84cc16',bg:'rgba(132,204,22,.12)',popular:true},
  {id:'pdfToWord',emoji:'📝',cat:'convert',color:'#3b82f6',bg:'rgba(59,130,246,.12)',popular:true},
  {id:'pdfToText',emoji:'📄',cat:'convert',color:'#64748b',bg:'rgba(100,116,139,.12)',popular:false},
  {id:'createPdf',emoji:'✨',cat:'edit',color:'#22d3ee',bg:'rgba(34,211,238,.12)',popular:false},
];

const TEXTS = {
  ar: {
    names: {
      merge:'دمج PDF',
      split:'تقسيم PDF',
      compress:'ضغط PDF',
      rotate:'تدوير PDF',
      reorder:'إعادة ترتيب',
      deletePage:'حذف صفحات',
      watermark:'علامة مائية',
      addPageNum:'أرقام الصفحات',
      extractText:'استخراج النص',
      extractImages:'استخراج الصور',
      pdfToJpg:'PDF إلى JPG',
      jpgToPdf:'JPG إلى PDF',
      pdfToWord:'PDF إلى Word',
      pdfToText:'PDF إلى نص',
      createPdf:'إنشاء PDF'
    },
    descs: {
      merge:'ادمج عدة ملفات PDF في ملف واحد',
      split:'قسّم PDF إلى ملفات متعددة',
      compress:'قلل الحجم بإعادة حفظ وتحسين البيانات الوصفية',
      rotate:'دوّر صفحات PDF بأي زاوية',
      reorder:'أعد ترتيب الصفحات',
      deletePage:'احذف صفحات محددة',
      watermark:'أضف علامة مائية نصية',
      addPageNum:'أضف أرقام الصفحات تلقائياً',
      extractText:'استخرج كل النص من PDF',
      extractImages:'حوّل صفحات PDF إلى صور',
      pdfToJpg:'حوّل صفحات PDF إلى JPG',
      jpgToPdf:'حوّل صور إلى PDF',
      pdfToWord:'صدّر نص PDF إلى ملف Word قابل للتحرير',
      pdfToText:'احفظ نص PDF كملف TXT',
      createPdf:'أنشئ PDF من نص'
    },
    ui: {
      navTitle:'أدوات PDF',
      navBadge:'محلي 100%',
      privacy1:'ملفاتك لا تُرفع إلى أي خادم',
      privacy2:'المعالجة 100% في متصفحك',
      privacy3:'لا تسجيل ولا بيانات تُحفظ',
      privacy4:'مجاني بلا قيود',
      heroTag:'خصوصية تامة — بدون رفع ملفات أبداً',
      heroTitle:'جميع أدوات PDF التي تحتاجها',
      heroSub:'دمج، تقسيم، تدوير، حذف صفحات، علامة مائية، استخراج نص، PDF إلى JPG، JPG إلى PDF، وWord نصّي — مجاناً. ملفاتك لا تغادر جهازك أبداً.',
      searchPlaceholder:'ابحث عن أداة...',
      tabs:{all:'الكل',popular:'شائع',organize:'تنظيم',convert:'تحويل',edit:'تحرير'},
      wsPrivacy:'ملفك آمن — لا يُرفع إلى الإنترنت',
      dzTitle:'أفلت الملف هنا',
      dzSub:'أو انقر للاختيار',
      btnProcess:'معالجة وتنزيل',
      btnBusy:'جارٍ المعالجة...',
      addMore:'➕ إضافة المزيد',
      empty:'🔍 لا توجد أدوات مطابقة',
      copy:'📋 نسخ النص',
      copied:'✅ تم النسخ',
      footer:'جميع العمليات تتم داخل متصفحك · مجاني © 2026',
      noFile:'أضف ملفاً أولاً',
      done:'✅ تمت المعالجة! جارٍ التنزيل...',
      deletePagesHint:'أدخل أرقام الصفحات للحذف (مثال: 1,3,5)',
      watermarkText:'نص العلامة',
      watermarkOpacity:'الشفافية %',
      color:'اللون',
      rotate:'الدوران',
      applyTo:'تطبيق على',
      splitMode:'طريقة التقسيم',
      splitFrom:'من الصفحة',
      splitTo:'إلى الصفحة',
      everyN:'كل كم صفحة',
      compression:'مستوى الضغط',
      removeMeta:'حذف البيانات الوصفية',
      pagePosition:'الموضع',
      pages:'الصفحات',
      title:'العنوان',
      fontSize:'حجم الخط',
      pageSize:'حجم الصفحة',
      content:'المحتوى',
      contentPlaceholder:'اكتب هنا... استخدم --- لفصل الصفحات',
      singlePage:'كل صفحة على حدة',
      range:'نطاق محدد',
      everyPages:'كل N صفحات',
      low:'منخفض — أفضل جودة',
      medium:'متوسط — متوازن',
      high:'عالٍ — أصغر حجم',
      centerBottom:'وسط أسفل',
      cornerBottom:'زاوية أسفل',
      allPages:'جميع الصفحات',
      oddPages:'الفردية',
      evenPages:'الزوجية',
      firstPage:'الأولى',
      lastPage:'الأخيرة',
      cannotDeleteAll:'لا يمكن حذف جميع الصفحات',
      textOnlyWord:'ملف Word الناتج يعتمد على النص المستخرج محليًا، وليس تحويلًا مطابقًا لتخطيط PDF.',
      wordReady:'✅ تم إنشاء ملف Word بصيغة DOCX من النص المستخرج.',
      outputFileName:'اسم الملف الجديد',
      outputBaseName:'الاسم الأساسي للملفات',
      outputPlaceholder:'اكتب اسم الملف',
      outputBasePlaceholder:'اكتب الاسم الأساسي',
      workerNote:'إذا لم يعمل الملف عند فتحه مباشرة من الجهاز، انشره عبر GitHub Pages بدل file://'
    }
  },
  en: {
    names: {
      merge:'Merge PDF',
      split:'Split PDF',
      compress:'Compress PDF',
      rotate:'Rotate PDF',
      reorder:'Reorder Pages',
      deletePage:'Delete Pages',
      watermark:'Watermark',
      addPageNum:'Page Numbers',
      extractText:'Extract Text',
      extractImages:'Export as Images',
      pdfToJpg:'PDF to JPG',
      jpgToPdf:'JPG to PDF',
      pdfToWord:'PDF to Word',
      pdfToText:'PDF to Text',
      createPdf:'Create PDF'
    },
    descs: {
      merge:'Merge multiple PDF files into one',
      split:'Split a PDF into separate files',
      compress:'Reduce size by resaving and cleaning metadata',
      rotate:'Rotate PDF pages by any angle',
      reorder:'Reorder pages',
      deletePage:'Delete selected pages',
      watermark:'Add a text watermark',
      addPageNum:'Add page numbers automatically',
      extractText:'Extract all text from PDF',
      extractImages:'Convert PDF pages into images',
      pdfToJpg:'Convert PDF pages to JPG',
      jpgToPdf:'Convert images to PDF',
      pdfToWord:'Export PDF text to editable Word document',
      pdfToText:'Save PDF text as TXT',
      createPdf:'Create a PDF from text'
    },
    ui: {
      navTitle:'PDF Tools',
      navBadge:'100% Local',
      privacy1:'Your files are never uploaded',
      privacy2:'Processing happens fully in your browser',
      privacy3:'No sign-up and no saved data',
      privacy4:'Free with no limits',
      heroTag:'Full privacy — no file uploads ever',
      heroTitle:'All PDF tools you need',
      heroSub:'Merge, split, rotate, delete pages, watermark, extract text, PDF to JPG, JPG to PDF, and text-based Word export — free. Your files never leave your device.',
      searchPlaceholder:'Search for a tool...',
      tabs:{all:'All',popular:'Popular',organize:'Organize',convert:'Convert',edit:'Edit'},
      wsPrivacy:'Your file is safe — never uploaded',
      dzTitle:'Drop your file here',
      dzSub:'or click to browse',
      btnProcess:'Process & Download',
      btnBusy:'Processing...',
      addMore:'➕ Add more',
      empty:'🔍 No matching tools found',
      copy:'📋 Copy text',
      copied:'✅ Copied',
      footer:'All processing happens in your browser · Free © 2026',
      noFile:'Add a file first',
      done:'✅ Done! Download starting...',
      deletePagesHint:'Enter page numbers to delete (example: 1,3,5)',
      watermarkText:'Watermark Text',
      watermarkOpacity:'Opacity %',
      color:'Color',
      rotate:'Rotation',
      applyTo:'Apply To',
      splitMode:'Split Mode',
      splitFrom:'From Page',
      splitTo:'To Page',
      everyN:'Every N Pages',
      compression:'Compression',
      removeMeta:'Remove metadata',
      pagePosition:'Position',
      pages:'Pages',
      title:'Title',
      fontSize:'Font Size',
      pageSize:'Page Size',
      content:'Content',
      contentPlaceholder:'Type here... use --- to separate pages',
      singlePage:'One file per page',
      range:'Specific range',
      everyPages:'Every N pages',
      low:'Low — Best quality',
      medium:'Medium — Balanced',
      high:'High — Smallest size',
      centerBottom:'Bottom center',
      cornerBottom:'Bottom corner',
      allPages:'All pages',
      oddPages:'Odd pages',
      evenPages:'Even pages',
      firstPage:'First page',
      lastPage:'Last page',
      cannotDeleteAll:'Cannot delete all pages',
      textOnlyWord:'The generated Word file is based on extracted text, not full PDF layout conversion.',
      wordReady:'✅ DOCX Word file created from extracted text.',
      outputFileName:'Output File Name',
      outputBaseName:'Base File Name',
      outputPlaceholder:'Enter file name',
      outputBasePlaceholder:'Enter base name',
      workerNote:'If this does not work from a local file, publish it on GitHub Pages instead of opening via file://'
    }
  }
};

const DEFAULT_OUTPUT_NAMES = {
  merge: 'merged',
  split: 'split',
  compress: 'compressed',
  rotate: 'rotated',
  reorder: 'reordered',
  deletePage: 'deleted_pages',
  watermark: 'watermarked',
  addPageNum: 'numbered',
  extractImages: 'page',
  pdfToJpg: 'page',
  jpgToPdf: 'images_to_pdf',
  pdfToWord: 'converted',
  pdfToText: 'extracted',
  createPdf: 'document'
};

let lang = 'ar';
let dark = false;
let activeTab = 'all';
let activeTool = null;
let wsFiles = [];

const g = id => document.getElementById(id);
const t = () => TEXTS[lang];
const gv = (id, d='') => {
  const e = g(id);
  return e ? e.value : d;
};
const gc = (id, d=false) => {
  const e = g(id);
  return e ? e.checked : d;
};

function updateStaticText() {
  const ui = t().ui;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  document.title = lang === 'ar' ? 'أدوات PDF — معالجة محلية 100%' : 'PDF Tools — 100% Local Processing';

  g('nav-title').textContent = ui.navTitle;
  g('nav-badge').textContent = ui.navBadge;
  g('pb1').textContent = ui.privacy1;
  g('pb2').textContent = ui.privacy2;
  g('pb3').textContent = ui.privacy3;
  g('pb4').textContent = ui.privacy4;
  g('hero-tag-text').textContent = ui.heroTag;
  g('hero-h1').innerHTML = lang === 'ar' ? 'جميع أدوات <em>PDF</em> التي تحتاجها' : 'All <em>PDF</em> tools you need';
  g('hero-sub').textContent = ui.heroSub;
  g('search-input').placeholder = ui.searchPlaceholder;
  g('ws-privacy-text').textContent = ui.wsPrivacy;
  g('btn-add-more').textContent = ui.addMore;
  g('btn-copy-text').innerHTML = ui.copy;
  g('footer').innerHTML = `<strong>🔒 ${lang === 'ar' ? 'خصوصية تامة' : 'Full Privacy'}</strong> — ${ui.footer}`;
  g('lang-label').textContent = lang === 'ar' ? 'EN' : 'عربي';

  const tabButtons = document.querySelectorAll('.tab-btn');
  tabButtons.forEach(btn => {
    const cat = btn.dataset.cat;
    if (cat === 'all') btn.textContent = ui.tabs.all;
    if (cat === 'popular') btn.textContent = ui.tabs.popular;
    if (cat === 'organize') btn.textContent = ui.tabs.organize;
    if (cat === 'convert') btn.textContent = ui.tabs.convert;
    if (cat === 'edit') btn.textContent = ui.tabs.edit;
  });
}

function renderTools() {
  const query = g('search-input').value.toLowerCase();
  const grid = g('tools-grid');
  const names = t().names;
  const descs = t().descs;
  const ui = t().ui;

  const filtered = TOOLS.filter(tool => {
    const catOk = activeTab === 'all' ? true : activeTab === 'popular' ? tool.popular : tool.cat === activeTab;
    if (!catOk) return false;
    if (query) {
      return (names[tool.id] || '').toLowerCase().includes(query) || (descs[tool.id] || '').toLowerCase().includes(query);
    }
    return true;
  });

  if (!filtered.length) {
    grid.innerHTML = `<div class="empty-state">${ui.empty}</div>`;
    return;
  }

  grid.innerHTML = filtered.map(tool => `
    <div class="tool-card"
         onclick="openTool('${tool.id}')"
         onmouseover="this.style.borderColor='${tool.color}55';this.querySelector('.tool-card-icon').style.background='${tool.bg}'"
         onmouseout="this.style.borderColor='var(--border)';this.querySelector('.tool-card-icon').style.background='var(--surface2)'">
      ${tool.popular ? `<div class="tool-card-badge">${lang === 'ar' ? 'شائع' : 'Popular'}</div>` : ''}
      <div class="tool-card-icon">${tool.emoji}</div>
      <div class="tool-card-name">${names[tool.id]}</div>
      <div class="tool-card-desc">${descs[tool.id]}</div>
    </div>
  `).join('');
}

function setTab(el) {
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  el.classList.add('active');
  activeTab = el.dataset.cat;
  renderTools();
}

function openTool(id) {
  const names = t().names;
  const descs = t().descs;
  const ui = t().ui;

  activeTool = TOOLS.find(x => x.id === id);
  wsFiles = [];

  g('ws-icon-wrap').textContent = activeTool.emoji;
  g('ws-icon-wrap').style.background = activeTool.bg;
  g('ws-title').textContent = names[activeTool.id];
  g('ws-subtitle').textContent = descs[activeTool.id];
  g('dz-title').textContent = ui.dzTitle;
  g('dz-sub').textContent = ui.dzSub;
  g('btn-label').textContent = ui.btnProcess;

  g('progress-wrap').classList.remove('show');
  g('status-msg').className = 'status-msg';
  g('status-msg').textContent = '';
  g('extracted-text-area').style.display = 'none';
  g('extracted-text-area').value = '';
  g('btn-copy-text').classList.remove('show');
  g('wm-preview-box').style.display = 'none';
  g('btn-process').disabled = true;
  g('btn-process').style.background = `linear-gradient(135deg,${activeTool.color},${activeTool.color}cc)`;
  g('btn-process').style.boxShadow = `0 6px 20px ${activeTool.color}44`;
  g('file-list').innerHTML = '';
  g('file-input').value = '';
  g('tool-options').innerHTML = '';

  const multi = ['merge', 'jpgToPdf'].includes(activeTool.id);
  g('file-input').multiple = multi;
  g('file-input').accept = activeTool.id === 'jpgToPdf' ? 'image/*' : '.pdf';
  g('btn-add-more').style.display = multi ? 'flex' : 'none';

  buildOptions(activeTool.id);
  g('workspace-overlay').classList.add('open');
  g('workspace-overlay').scrollTop = 0;
  document.body.style.overflow = 'hidden';
}

function closeWs() {
  g('workspace-overlay').classList.remove('open');
  document.body.style.overflow = '';
}

function maybeClose(e) {
  if (e.target === g('workspace-overlay')) closeWs();
}

function handleFileInput(fl) { addFiles(fl); }
function dzOver(e) { e.preventDefault(); g('dz').classList.add('drag-over'); }
function dzLeave() { g('dz').classList.remove('drag-over'); }
function dzDrop(e) {
  e.preventDefault();
  g('dz').classList.remove('drag-over');
  addFiles(e.dataTransfer.files);
}

function addFiles(fl) {
  const arr = Array.from(fl);
  const single = ['split','rotate','watermark','compress','extractText','extractImages','reorder','deletePage','pdfToJpg','pdfToText','pdfToWord','addPageNum'];
  if (single.includes(activeTool.id)) wsFiles = arr.slice(0, 1);
  else wsFiles = [...wsFiles, ...arr];
  renderFileList();
  g('btn-process').disabled = wsFiles.length === 0;
}

function fmtSz(b) {
  if (b < 1024) return b + ' B';
  if (b < 1048576) return (b / 1024).toFixed(1) + ' KB';
  return (b / 1048576).toFixed(1) + ' MB';
}

function renderFileList() {
  const list = g('file-list');
  list.innerHTML = '';
  const canMove = ['merge','jpgToPdf'].includes(activeTool.id);

  wsFiles.forEach((f, i) => {
    const item = document.createElement('div');
    item.className = 'file-item';
    item.innerHTML = `
      <div class="file-pdf-icon">${f.name.match(/\.(jpg|jpeg|png|webp)$/i) ? '🖼' : 'PDF'}</div>
      <div class="file-info">
        <div class="file-name">${f.name}</div>
        <div class="file-meta">${fmtSz(f.size)}</div>
      </div>
      ${canMove ? `
        <div class="file-move">
          <button onclick="moveFile(${i},-1)" ${i===0 ? 'disabled' : ''}>▲</button>
          <button onclick="moveFile(${i},1)" ${i===wsFiles.length-1 ? 'disabled' : ''}>▼</button>
        </div>
      ` : ''}
      <button class="file-remove" onclick="removeFile(${i})">✕</button>
    `;
    list.appendChild(item);
  });
}

function removeFile(i) {
  wsFiles.splice(i,1);
  renderFileList();
  g('btn-process').disabled = wsFiles.length === 0;
}

function moveFile(i, d) {
  const ni = i + d;
  if (ni < 0 || ni >= wsFiles.length) return;
  [wsFiles[i], wsFiles[ni]] = [wsFiles[ni], wsFiles[i]];
  renderFileList();
}

function sanitizeBaseName(name, fallback='output') {
  const clean = String(name || '')
    .trim()
    .replace(/[\\/:*?"<>|]+/g, '')
    .replace(/\s+/g, '_')
    .replace(/\.+$/g, '');
  return clean || fallback;
}

function ensureExt(name, ext) {
  const base = sanitizeBaseName(name, 'output');
  return base.toLowerCase().endsWith(ext.toLowerCase()) ? base : `${base}${ext}`;
}

function getOutputName(toolId, ext='') {
  const fallback = DEFAULT_OUTPUT_NAMES[toolId] || 'output';
  const raw = gv('opt-output-name', fallback);
  return ext ? ensureExt(raw, ext) : sanitizeBaseName(raw, fallback);
}

function getOutputBaseName(toolId) {
  const fallback = DEFAULT_OUTPUT_NAMES[toolId] || 'output';
  return sanitizeBaseName(gv('opt-output-name', fallback), fallback);
}

function toolSupportsSingleOutputName(id) {
  return [
    'merge',
    'compress',
    'rotate',
    'reorder',
    'deletePage',
    'watermark',
    'addPageNum',
    'jpgToPdf',
    'pdfToWord',
    'pdfToText',
    'createPdf'
  ].includes(id);
}

function toolSupportsBaseOutputName(id) {
  return ['split','pdfToJpg','extractImages'].includes(id);
}

function buildOptions(id) {
  const c = g('tool-options');
  const ui = t().ui;

  function row(...ch) {
    const d = document.createElement('div');
    d.className = 'opts-row';
    ch.forEach(x => d.appendChild(x));
    c.appendChild(d);
  }

  function grp(label, el) {
    const gg = document.createElement('div');
    gg.className = 'opt-group';
    const l = document.createElement('div');
    l.className = 'opt-label';
    l.textContent = label;
    gg.appendChild(l);
    gg.appendChild(el);
    return gg;
  }

  function sel(id_, ...opts) {
    const s = document.createElement('select');
    s.id = id_;
    s.className = 'opt-select';
    opts.forEach(([v,l]) => {
      const o = document.createElement('option');
      o.value = v;
      o.textContent = l;
      s.appendChild(o);
    });
    return s;
  }

  function inp(id_, type='text', val='', ph='') {
    const i = document.createElement('input');
    i.type = type;
    i.value = val;
    i.placeholder = ph;
    i.id = id_;
    i.className = 'opt-input';
    return i;
  }

  function chk(id_, label, checked=false) {
    const l = document.createElement('label');
    l.className = 'opt-check';
    const cb = document.createElement('input');
    cb.type = 'checkbox';
    cb.id = id_;
    cb.checked = checked;
    l.appendChild(cb);
    l.appendChild(document.createTextNode(' ' + label));
    return l;
  }

  function note(text) {
    const n = document.createElement('div');
    n.className = 'note';
    n.textContent = text;
    c.appendChild(n);
  }

  if (toolSupportsSingleOutputName(id)) {
    row(
      grp(
        ui.outputFileName,
        inp('opt-output-name', 'text', DEFAULT_OUTPUT_NAMES[id] || 'output', ui.outputPlaceholder)
      )
    );
  }

  if (toolSupportsBaseOutputName(id)) {
    row(
      grp(
        ui.outputBaseName,
        inp('opt-output-name', 'text', DEFAULT_OUTPUT_NAMES[id] || 'output', ui.outputBasePlaceholder)
      )
    );
  }

  if (id === 'rotate') {
    row(
      grp(ui.rotate, sel('opt-rot',
        ['90', lang === 'ar' ? '90° مع عقارب الساعة' : '90° clockwise'],
        ['180', '180°'],
        ['270', lang === 'ar' ? '90° عكس عقارب الساعة' : '90° counter-clockwise']
      )),
      grp(ui.applyTo, sel('opt-apply',
        ['all', ui.allPages],
        ['odd', ui.oddPages],
        ['even', ui.evenPages],
        ['first', ui.firstPage],
        ['last', ui.lastPage]
      ))
    );
  }

  if (id === 'watermark') {
    const wi = inp('opt-wm-text','text','CONFIDENTIAL');
    wi.oninput = updateWmPreview;

    const oi = inp('opt-wm-op','number','20');
    oi.min = '5';
    oi.max = '90';
    oi.oninput = updateWmPreview;

    const ci = inp('opt-wm-color','color','#1e6fff');
    ci.style.height = '36px';
    ci.style.padding = '2px';
    ci.oninput = updateWmPreview;

    row(
      grp(ui.watermarkText, wi),
      grp(ui.watermarkOpacity, oi),
      grp(ui.color, ci)
    );

    g('wm-preview-box').style.display = 'flex';
    setTimeout(updateWmPreview, 50);
  }

  if (id === 'split') {
    const me = sel('opt-split-mode',
      ['all', ui.singlePage],
      ['range', ui.range],
      ['every', ui.everyPages]
    );

    const rr = document.createElement('div');
    rr.className = 'opts-row';
    rr.style.display = 'none';
    rr.appendChild(grp(ui.splitFrom, inp('opt-split-from','number','1')));
    rr.appendChild(grp(ui.splitTo, inp('opt-split-to','number','1')));

    const er = document.createElement('div');
    er.className = 'opts-row';
    er.style.display = 'none';
    er.appendChild(grp(ui.everyN, inp('opt-split-n','number','2')));

    me.onchange = () => {
      rr.style.display = me.value === 'range' ? 'flex' : 'none';
      er.style.display = me.value === 'every' ? 'flex' : 'none';
    };

    row(grp(ui.splitMode, me));
    c.appendChild(rr);
    c.appendChild(er);
  }

  if (id === 'compress') {
    row(
      grp(ui.compression, sel('opt-comp',
        ['low', ui.low],
        ['medium', ui.medium],
        ['high', ui.high]
      )),
      chk('opt-meta', ui.removeMeta, true)
    );
  }

  if (id === 'addPageNum') {
    row(
      grp(ui.pagePosition, sel('opt-num-pos',
        ['center', ui.centerBottom],
        ['corner', ui.cornerBottom]
      ))
    );
  }

  if (id === 'deletePage') {
    const n = document.createElement('div');
    n.style.cssText = 'font-size:.8rem;color:var(--muted);margin-top:10px;margin-bottom:4px';
    n.textContent = ui.deletePagesHint;
    c.appendChild(n);
    row(grp(ui.pages, inp('opt-del-pages','text','','1,3,5')));
  }

  if (id === 'createPdf') {
    row(grp(ui.title, inp('opt-doc-title','text')));
    const r2 = document.createElement('div');
    r2.className = 'opts-row';
    r2.appendChild(grp(ui.fontSize, sel('opt-fs',['10','10pt'],['12','12pt'],['14','14pt'],['16','16pt'])));
    r2.appendChild(grp(ui.pageSize, sel('opt-ps',['A4','A4'],['Letter','Letter'])));
    c.appendChild(r2);

    const gg = document.createElement('div');
    gg.className = 'opt-group';
    gg.style.marginTop = '10px';

    const ll = document.createElement('div');
    ll.className = 'opt-label';
    ll.textContent = ui.content;

    const ta = document.createElement('textarea');
    ta.id = 'opt-doc-content';
    ta.className = 'opt-input';
    ta.style.cssText = 'min-height:120px;resize:vertical;margin-top:2px';
    ta.placeholder = ui.contentPlaceholder;

    gg.appendChild(ll);
    gg.appendChild(ta);
    c.appendChild(gg);
  }

  if (id === 'pdfToWord') {
    note(ui.textOnlyWord);
  }
}

function updateWmPreview() {
  const txt = gv('opt-wm-text','WATERMARK');
  const op = (parseInt(gv('opt-wm-op','20')) || 20) / 100;
  const col = gv('opt-wm-color','#1e6fff');
  const el = g('wm-preview-text');
  if (el) {
    el.textContent = txt;
    el.style.opacity = op;
    el.style.color = col;
  }
}

function setProgress(pct) {
  const w = g('progress-wrap');
  const f = g('progress-fill');
  w.classList.add('show');
  f.style.width = pct + '%';
  if (pct >= 100) setTimeout(() => w.classList.remove('show'), 1000);
}

function showStatus(type, msg) {
  const e = g('status-msg');
  e.className = 'status-msg show ' + type;
  e.textContent = msg;
}

function setBusy(b) {
  const btn = g('btn-process');
  const ic = g('btn-icon');
  btn.disabled = b;
  ic.className = b ? 'spin' : '';
  ic.textContent = '⚙️';
  g('btn-label').textContent = b ? t().ui.btnBusy : t().ui.btnProcess;
}

function dlBlob(bytes, name, mime='application/pdf') {
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([bytes], {type:mime}));
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1500);
}

function dlText(text, name) {
  dlBlob(new TextEncoder().encode(text), name, 'text/plain;charset=utf-8');
}

function dlImg(dataUrl, name) {
  const a = document.createElement('a');
  a.href = dataUrl;
  a.download = name;
  a.click();
}

async function processTool() {
  if (!wsFiles.length) {
    showStatus('error', t().ui.noFile);
    return;
  }

  setBusy(true);
  setProgress(5);
  g('status-msg').className = 'status-msg';
  g('extracted-text-area').style.display = 'none';
  g('btn-copy-text').classList.remove('show');

  try {
    await runTool(activeTool.id);
    if (!g('status-msg').textContent) {
      setProgress(100);
      showStatus('success', t().ui.done);
    }
  } catch (e) {
    showStatus('error', '❌ ' + e.message);
  } finally {
    setBusy(false);
  }
}

async function loadDoc(file) {
  const buf = await file.arrayBuffer();
  return PDFLib.PDFDocument.load(buf);
}

async function extractPdfText(file, withPageHeaders = true) {
  const buf = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({data:buf}).promise;
  let text = '';

  for (let i = 1; i <= pdf.numPages; i++) {
    setProgress(20 + Math.round(i / pdf.numPages * 70));
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const line = content.items.map(it => it.str).join(' ').trim();
    if (withPageHeaders) {
      text += `${lang === 'ar' ? '─── صفحة' : '─── Page'} ${i} ───\n${line}\n\n`;
    } else {
      text += line + '\n\n';
    }
  }

  return text.trim();
}

async function buildDocxFromText(text, filenameBase='output') {
  if (!window.docx) throw new Error('DOCX library failed to load');

  const { Document, Packer, Paragraph, TextRun } = window.docx;

  const paragraphs = [];
  text.split(/\n{2,}/).forEach(block => {
    const clean = block.trim();
    if (!clean) return;
    paragraphs.push(
      new Paragraph({
        children: [new TextRun(clean)]
      })
    );
  });

  const doc = new Document({
    sections: [{
      properties: {},
      children: paragraphs.length ? paragraphs : [new Paragraph('')]
    }]
  });

  const blob = await Packer.toBlob(doc);
  dlBlob(
    await blob.arrayBuffer(),
    ensureExt(filenameBase, '.docx'),
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  );
}

async function runTool(id) {
  const {degrees, rgb, StandardFonts} = PDFLib;

  if (id === 'merge') {
    const merged = await PDFLib.PDFDocument.create();
    for (let i = 0; i < wsFiles.length; i++) {
      setProgress(10 + Math.round(i / wsFiles.length * 80));
      const doc = await loadDoc(wsFiles[i]);
      const pages = await merged.copyPages(doc, doc.getPageIndices());
      pages.forEach(p => merged.addPage(p));
    }
    setProgress(100);
    dlBlob(await merged.save(), getOutputName('merge', '.pdf'));
    showStatus('success', t().ui.done);
    return;
  }

  if (id === 'split') {
    const doc = await loadDoc(wsFiles[0]);
    const total = doc.getPageCount();
    const mode = gv('opt-split-mode', 'all');
    const baseName = getOutputBaseName('split');
    setProgress(30);

    if (mode === 'all') {
      for (let i = 0; i < total; i++) {
        setProgress(30 + Math.round(i / total * 60));
        const d = await PDFLib.PDFDocument.create();
        const [p] = await d.copyPages(doc, [i]);
        d.addPage(p);
        dlBlob(await d.save(), `${baseName}_page_${i+1}.pdf`);
      }
    } else if (mode === 'range') {
      const from = Math.max(0, +gv('opt-split-from', 1) - 1);
      const to = Math.min(total - 1, +gv('opt-split-to', 1) - 1);
      const d = await PDFLib.PDFDocument.create();
      const idx = [];
      for (let i = from; i <= to; i++) idx.push(i);
      const pages = await d.copyPages(doc, idx);
      pages.forEach(p => d.addPage(p));
      dlBlob(await d.save(), `${baseName}_${from+1}_to_${to+1}.pdf`);
    } else {
      const n = Math.max(1, +gv('opt-split-n', 2));
      let part = 1;
      for (let i = 0; i < total; i += n) {
        const d = await PDFLib.PDFDocument.create();
        const idx = [];
        for (let j = i; j < Math.min(i+n, total); j++) idx.push(j);
        const pages = await d.copyPages(doc, idx);
        pages.forEach(p => d.addPage(p));
        setProgress(30 + Math.round((i+n) / total * 60));
        dlBlob(await d.save(), `${baseName}_part_${part++}.pdf`);
      }
    }

    setProgress(100);
    showStatus('success', t().ui.done);
    return;
  }

  if (id === 'compress') {
    const doc = await loadDoc(wsFiles[0]);
    if (gc('opt-meta', true)) {
      doc.setTitle('');
      doc.setAuthor('');
      doc.setSubject('');
      doc.setKeywords([]);
      doc.setProducer('');
      doc.setCreator('');
    }
    const orig = wsFiles[0].size;
    setProgress(75);
    const bytes = await doc.save({useObjectStreams:true});
    const pct = Math.max(0, Math.round((1 - bytes.length / orig) * 100));
    setProgress(100);
    dlBlob(bytes, getOutputName('compress', '.pdf'));
    showStatus('success', `✅ ${fmtSz(orig)} → ${fmtSz(bytes.length)} (${pct > 0 ? '-' + pct : '0'}%)`);
    return;
  }

  if (id === 'rotate') {
    const doc = await loadDoc(wsFiles[0]);
    const pages = doc.getPages();
    const deg = +gv('opt-rot', 90);
    const apply = gv('opt-apply', 'all');

    setProgress(50);
    pages.forEach((p, i) => {
      const ok =
        apply === 'all' ||
        (apply === 'odd' && i % 2 === 0) ||
        (apply === 'even' && i % 2 === 1) ||
        (apply === 'first' && i === 0) ||
        (apply === 'last' && i === pages.length - 1);

      if (ok) p.setRotation(degrees((p.getRotation().angle + deg) % 360));
    });

    setProgress(100);
    dlBlob(await doc.save(), getOutputName('rotate', '.pdf'));
    showStatus('success', t().ui.done);
    return;
  }

  if (id === 'watermark') {
    const doc = await loadDoc(wsFiles[0]);
    const font = await doc.embedFont(StandardFonts.HelveticaBold);
    const pages = doc.getPages();
    const txt = gv('opt-wm-text', 'WATERMARK');
    const op = (+gv('opt-wm-op', 20)) / 100;
    const hex = gv('opt-wm-color', '#1e6fff');
    const rr = parseInt(hex.slice(1,3),16) / 255;
    const gg = parseInt(hex.slice(3,5),16) / 255;
    const bb = parseInt(hex.slice(5,7),16) / 255;

    pages.forEach((page, i) => {
      setProgress(20 + Math.round(i / pages.length * 70));
      const {width, height} = page.getSize();
      const fs = Math.min(width, height) * .1;
      const tw = font.widthOfTextAtSize(txt, fs);
      page.drawText(txt, {
        x:(width - tw) / 2,
        y:height / 2,
        size:fs,
        font,
        color:rgb(rr, gg, bb),
        opacity:op,
        rotate:degrees(-30)
      });
    });

    setProgress(100);
    dlBlob(await doc.save(), getOutputName('watermark', '.pdf'));
    showStatus('success', t().ui.done);
    return;
  }

  if (id === 'addPageNum') {
    const doc = await loadDoc(wsFiles[0]);
    const font = await doc.embedFont(StandardFonts.Helvetica);
    const pages = doc.getPages();
    const pos = gv('opt-num-pos','center');

    pages.forEach((page, i) => {
      const {width} = page.getSize();
      page.drawText(String(i + 1), {
        x: pos === 'center' ? width / 2 - 5 : 30,
        y: 18,
        font,
        size: 10,
        color: rgb(.4,.4,.4)
      });
    });

    setProgress(100);
    dlBlob(await doc.save(), getOutputName('addPageNum', '.pdf'));
    showStatus('success', t().ui.done);
    return;
  }

  if (id === 'extractText') {
    const text = await extractPdfText(wsFiles[0], true);
    const ta = g('extracted-text-area');
    ta.value = text;
    ta.style.display = 'block';
    g('btn-copy-text').classList.add('show');
    setProgress(100);
    showStatus('success', t().ui.done);
    return;
  }

  if (id === 'pdfToText') {
    const text = await extractPdfText(wsFiles[0], false);
    setProgress(100);
    dlText(text, getOutputName('pdfToText', '.txt'));
    showStatus('success', t().ui.done);
    return;
  }

  if (id === 'pdfToWord') {
    const text = await extractPdfText(wsFiles[0], true);
    setProgress(92);
    await buildDocxFromText(text, getOutputName('pdfToWord'));
    setProgress(100);
    showStatus('warning', t().ui.wordReady + ' ' + t().ui.textOnlyWord);
    return;
  }

  if (id === 'deletePage') {
    const delSet = new Set(
      gv('opt-del-pages','')
        .split(',')
        .map(s => parseInt(s.trim()) - 1)
        .filter(n => !isNaN(n))
    );

    const doc = await loadDoc(wsFiles[0]);
    const total = doc.getPageCount();
    const keepIdx = [];

    for (let i = 0; i < total; i++) if (!delSet.has(i)) keepIdx.push(i);
    if (!keepIdx.length) throw new Error(t().ui.cannotDeleteAll);

    const nd = await PDFLib.PDFDocument.create();
    const pages = await nd.copyPages(doc, keepIdx);
    pages.forEach(p => nd.addPage(p));

    setProgress(100);
    dlBlob(await nd.save(), getOutputName('deletePage', '.pdf'));
    showStatus('success', t().ui.done);
    return;
  }

  if (id === 'reorder') {
    const doc = await loadDoc(wsFiles[0]);
    const nd = await PDFLib.PDFDocument.create();
    const pages = await nd.copyPages(doc, doc.getPageIndices());
    pages.forEach(p => nd.addPage(p));
    setProgress(100);
    dlBlob(await nd.save(), getOutputName('reorder', '.pdf'));
    showStatus('success', t().ui.done);
    return;
  }

  if (id === 'createPdf') {
    const doc = await PDFLib.PDFDocument.create();
    const font = await doc.embedFont(StandardFonts.Helvetica);
    const bold = await doc.embedFont(StandardFonts.HelveticaBold);

    const sizes = {A4:[595,842], Letter:[612,792]};
    const [pw, ph] = sizes[gv('opt-ps','A4')];
    const fs = +gv('opt-fs',12);
    const margin = 60;
    const lineH = fs * 1.65;
    const title = gv('opt-doc-title','');
    const content = gv('opt-doc-content','');
    const sections = content.split(/^---$/m);

    for (let si = 0; si < sections.length; si++) {
      let page = doc.addPage([pw, ph]);
      let y = ph - margin;

      if (si === 0 && title) {
        page.drawText(title, {
          x:margin,
          y,
          font:bold,
          size:fs + 10,
          color:rgb(.08,.17,.42)
        });
        y -= (fs + 10) * 2;
        page.drawLine({
          start:{x:margin,y},
          end:{x:pw-margin,y},
          color:rgb(.12,.43,1),
          thickness:1.5
        });
        y -= 20;
      }

      for (const line of sections[si].split('\n')) {
        const words = line.split(' ');
        let cur = '';

        for (const w of words) {
          const test = cur ? cur + ' ' + w : w;
          if (font.widthOfTextAtSize(test, fs) > pw - margin * 2 && cur) {
            if (y < margin + lineH) {
              page = doc.addPage([pw, ph]);
              y = ph - margin;
            }
            page.drawText(cur, {x:margin,y,font,size:fs,color:rgb(.05,.05,.1)});
            y -= lineH;
            cur = w;
          } else {
            cur = test;
          }
        }

        if (cur) {
          if (y < margin + lineH) {
            page = doc.addPage([pw, ph]);
            y = ph - margin;
          }
          page.drawText(cur, {x:margin,y,font,size:fs,color:rgb(.05,.05,.1)});
          y -= lineH;
        }

        y -= lineH * .3;
      }
    }

    setProgress(100);
    dlBlob(await doc.save(), getOutputName('createPdf', '.pdf'));
    showStatus('success', t().ui.done);
    return;
  }

  if (id === 'jpgToPdf') {
    const doc = await PDFLib.PDFDocument.create();

    for (let i = 0; i < wsFiles.length; i++) {
      setProgress(10 + Math.round(i / wsFiles.length * 80));
      const buf = await wsFiles[i].arrayBuffer();
      let img;

      try {
        if (wsFiles[i].type === 'image/png') img = await doc.embedPng(buf);
        else img = await doc.embedJpg(buf);
      } catch (e) {
        img = await doc.embedJpg(buf);
      }

      const {width, height} = img.scale(1);
      const page = doc.addPage([width, height]);
      page.drawImage(img, {x:0, y:0, width, height});
    }

    setProgress(100);
    dlBlob(await doc.save(), getOutputName('jpgToPdf', '.pdf'));
    showStatus('success', t().ui.done);
    return;
  }

  if (id === 'pdfToJpg' || id === 'extractImages') {
    const buf = await wsFiles[0].arrayBuffer();
    const pdfDoc = await pdfjsLib.getDocument({data:buf}).promise;
    const baseName = getOutputBaseName(id);

    for (let i = 1; i <= pdfDoc.numPages; i++) {
      setProgress(10 + Math.round(i / pdfDoc.numPages * 85));
      const page = await pdfDoc.getPage(i);
      const vp = page.getViewport({scale:2});
      const canvas = document.createElement('canvas');
      canvas.width = vp.width;
      canvas.height = vp.height;
      await page.render({canvasContext:canvas.getContext('2d'), viewport:vp}).promise;
      dlImg(canvas.toDataURL('image/jpeg', .92), `${baseName}_${i}.jpg`);
    }

    setProgress(100);
    showStatus('success', t().ui.done);
    return;
  }

  const doc = await loadDoc(wsFiles[0]);
  setProgress(100);
  dlBlob(await doc.save(), 'output.pdf');
  showStatus('success', t().ui.done);
}

function copyExtracted() {
  navigator.clipboard.writeText(g('extracted-text-area').value).then(() => {
    g('btn-copy-text').innerHTML = t().ui.copied;
    setTimeout(() => {
      g('btn-copy-text').innerHTML = t().ui.copy;
    }, 2500);
  });
}

function toggleTheme() {
  dark = !dark;
  document.documentElement.dataset.theme = dark ? 'dark' : '';
  g('theme-btn').textContent = dark ? '☀️' : '🌙';
}

function toggleLang() {
  lang = lang === 'ar' ? 'en' : 'ar';
  updateStaticText();
  renderTools();

  if (activeTool) {
    const currentId = activeTool.id;
    activeTool = null;
    openTool(currentId);
  }
}

updateStaticText();
renderTools();
