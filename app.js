'use strict';
const serviceData=[
['الاستشارات المالية','Financial consultancy'],['الاستشارات الإدارية','Management Consultancy'],['الاستشارات الاقتصادية','Economic consultancy'],['الاستشارات التسويقية','Marketing consultancy'],['تقديم الاستشارات والأبحاث المالية','Consulting and financial research'],['الاستشارات المهنية','Professional consulting'],['استشارات التمويل والاستثمار','Finance and investment consultancy'],['إدارة الاستثمار','Investment management'],['الخدمات الإدارية','Administrative services'],['الوساطة المالية','Financial liaison'],['أنشطة تحصيل الديون','Debt collection activities'],['الاتصالات وتقنية المعلومات','Communications and information technology']];
let language='ar',toastTimer;
const $=id=>document.getElementById(id);
const say=(ar,en)=>language==='ar'?ar:en;
function notify(message){clearTimeout(toastTimer);$('toast').textContent=message;$('toast').classList.add('visible');toastTimer=setTimeout(()=>$('toast').classList.remove('visible'),3500);}
function renderServices(){const list=$('service-list');list.replaceChildren();serviceData.forEach((item,index)=>{const li=document.createElement('li'),number=document.createElement('span');number.textContent=String(index+1).padStart(2,'0');li.append(number,document.createTextNode(item[language==='ar'?0:1]));list.append(li);});}
function setLanguage(next){language=next;document.documentElement.lang=next;document.documentElement.dir=next==='ar'?'rtl':'ltr';document.querySelectorAll('[data-ar]').forEach(el=>el.textContent=el.dataset[next]);$('language').textContent=say('EN','ع');$('language').lang=say('en','ar');$('language').setAttribute('aria-label',say('Switch to English','التبديل إلى العربية'));$('share').setAttribute('aria-label',say('مشاركة البطاقة','Share card'));$('close').setAttribute('aria-label',say('إغلاق','Close'));document.querySelector('.card').setAttribute('aria-label',say('بطاقة مركز القرار','Decision Center business card'));document.querySelector('.actions').setAttribute('aria-label',say('وسائل التواصل','Contact options'));document.querySelector('.journey').setAttribute('aria-label',say('تحليل، رؤية، قرار','Analysis, insight, decision'));document.title=say('عبدالله الروشدي | مركز القرار','Abdullah Al Rushdi | Decision Center');renderServices();}
$('language').addEventListener('click',()=>setLanguage(language==='ar'?'en':'ar'));
const dialog=$('services-dialog');$('services').addEventListener('click',()=>dialog.showModal());$('close').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});dialog.addEventListener('close',()=>$('services').focus({preventScroll:true}));
function buildVCard(){return ['BEGIN:VCARD','VERSION:3.0','N:الروشدي;عبدالله;;;','FN:عبدالله الروشدي','ORG:Decision Center Financial & Economic Consulting S.P.C','TITLE:Founder & CEO / Financial & Economic Consultant','TEL;TYPE=CELL,WORK:+96896680001','EMAIL;TYPE=INTERNET,WORK:info@dcenterfe.com','URL:https://www.dcenterfe.com','ADR;TYPE=WORK:;;;Sohar;;;Sultanate of Oman','X-SOCIALPROFILE;TYPE=instagram:https://www.instagram.com/center.decision/','NOTE:عبدالله الروشدي - مركز القرار - مستشار مالي واقتصادي - مدرب معتمد في المواد التجارية - متخصص في قيادة الذكاء الاصطناعي وتوظيفه في إدارة المشاريع','END:VCARD',''].join('\r\n');}
$('save').addEventListener('click',()=>{try{const blob=new Blob([buildVCard()],{type:'text/vcard;charset=utf-8'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='Abdullah-Al-Rushdi.vcf';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),30000);notify(say('ملف الاتصال جاهز — افتحه لإضافته إلى هاتفك','Contact file ready — open it to add to your phone'));}catch{notify(say('تعذر إعداد الملف. يمكنك استخدام زر الاتصال.','Could not prepare the file. Please use the Call button.'));}});
async function copy(value){if(navigator.clipboard&&window.isSecureContext){await navigator.clipboard.writeText(value);return;}const input=document.createElement('textarea');input.value=value;input.style.cssText='position:fixed;top:0;opacity:0';document.body.append(input);input.select();const copied=document.execCommand('copy');input.remove();if(!copied)throw new Error('Clipboard unavailable');}
$('share').addEventListener('click',async()=>{const data={title:say('عبدالله الروشدي | مركز القرار','Abdullah Al Rushdi | Decision Center'),text:say('مركز القرار للاستشارات المالية والاقتصادية\n+968 96680001','Decision Center Financial & Economic Consulting\n+968 96680001'),url:location.href};try{if(navigator.share){await navigator.share(data);}else{await copy(data.title+'\n'+data.text+'\n'+data.url);notify(say('تم نسخ بيانات البطاقة ورابطها','Card details and link copied'));}}catch(error){if(error.name!=='AbortError')notify(say('تعذرت المشاركة. يمكنك نسخ الرابط من شريط العنوان.','Sharing unavailable. Copy the URL from your address bar.'));}});
function fitCard(){
 const card=document.querySelector('.card'),content=document.querySelector('.content');
 card.classList.remove('compact','micro');
 content.style.removeProperty('--card-fit');
 const availableHeight=window.visualViewport?window.visualViewport.height:window.innerHeight;
 document.documentElement.style.setProperty('--visible-height',availableHeight+'px');
 const box=getComputedStyle(card);
 const available=card.clientHeight-parseFloat(box.paddingTop)-parseFloat(box.paddingBottom);
 const needed=content.offsetHeight;
 const scale=Math.min(1,available/needed);
 content.style.setProperty('--card-fit',String(scale));
}
window.addEventListener('resize',()=>requestAnimationFrame(fitCard));
if(window.visualViewport)window.visualViewport.addEventListener('resize',()=>requestAnimationFrame(fitCard));
window.addEventListener('load',fitCard);
$('language').addEventListener('click',()=>requestAnimationFrame(fitCard));
if(document.fonts)document.fonts.ready.then(fitCard);
renderServices();
