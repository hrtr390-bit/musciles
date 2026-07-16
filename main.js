const see = document.querySelector(".see");
const mark = document.querySelector(".mark");
const overlay = document.querySelector(".overlay");

see.onclick = () => {
    overlay.classList.add("active");

    see.style.display = "none";
    mark.style.display = "block";
};

mark.onclick = () => {
    overlay.classList.remove("active");

    mark.style.display = "none";
    see.style.display = "block";
};
window.onload = function(){
    mark.style.display =' none';
}

const lookOut = document.getElementById("look-out");

const restartbtn = document.getElementById("restartBtn");

restartbtn.addEventListener("click", function () {

    // إغلاق نافذة النتائج
     window.open(
        "https://wa.me/201113385257",
        "_blank"
    );
});




lookOut.addEventListener("click", function () {

    resultOverlay.classList.remove("active");

});





document.querySelectorAll(".overlay .dropdown > a").forEach(item=>{

    item.addEventListener("click",(e)=>{

        e.preventDefault();

        item.parentElement.classList.toggle("open");

    });

});



// الواجهه
const texts = [

"نساعدك على استعادة الحركة والتخلص من الألم من خلال أحدث تقنيات علاج العظام والمفاصل، بخطة علاج تناسب حالتك.",

"تشمل خدماتنا علاج آلام الركبة والمفاصل، وإصابات الملاعب، والكسور، والعمود الفقري، مع متابعة دقيقة حتى التعافي."

];

const element = document.getElementById("typing-text");

let textIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect(){

    const currentText = texts[textIndex];

    if(!deleting){

        element.textContent =
        currentText.substring(0,charIndex++);

        if(charIndex > currentText.length){

            deleting = true;

            setTimeout(typeEffect,2500);

            return;
        }

    }else{

        element.textContent =
        currentText.substring(0,charIndex--);

        if(charIndex < 0){

            deleting = false;

            textIndex =
            (textIndex + 1) % texts.length;
        }

    }

    setTimeout(typeEffect,
    deleting ? 20 : 40);
}

typeEffect();

// vedio
const cards = document.querySelectorAll(".service-card");

const observer = new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
        if(entry.isIntersecting){
            entry.target.classList.add("show");
        }
    });
},{
    threshold:0.2
});

cards.forEach(card=>{
    observer.observe(card);
});




// عن المركز
const aboutSection =
document.querySelector(".about-center");

const typingTitle =
document.querySelector(".typing-title");

const typingParagraph =
document.querySelector(".typing-paragraph");

const titleText =
"مركز بدر لجراحة العظام والمفاصل";

const paragraphText =
"نقدم خدمات تشخيص وعلاج أمراض العظام والمفاصل والعمود الفقري وفق أحدث المعايير الطبية، مع توفير رعاية متكاملة باستخدام التقنيات الحديثة، وخطة علاج تناسب كل مريض لمساعدته على استعادة الحركة والتخلص من الألم بأمان.";
let aboutStarted = false;

function typeText(element,text,speed){

    let i = 0;

    element.textContent = "";

    const typing = setInterval(()=>{

        element.textContent += text.charAt(i);

        i++;

        if(i >= text.length){

            clearInterval(typing);

        }

    },speed);

}

const aboutObserver =
new IntersectionObserver((entries)=>{

    if(entries[0].isIntersecting && !aboutStarted){

        aboutStarted = true;

        typeText(
            typingTitle,
            titleText,
            50
        );

        setTimeout(()=>{

            typeText(
                typingParagraph,
                paragraphText,
                15
            );

        },2000);

    }

},{
    threshold:.3
});

aboutObserver.observe(aboutSection);






const counters =
document.querySelectorAll(".counter");

let counterStarted = false;

const counterObserver =
new IntersectionObserver((entries)=>{

    if(entries[0].isIntersecting && !counterStarted){

        counterStarted = true;

        counters.forEach(counter=>{

            const target =
            +counter.dataset.target;

            let current = 0;

            const increment =
            Math.ceil(target / 100);

            function updateCounter(){

                current += increment;

                if(current >= target){

                    counter.textContent =
                    target + "+";

                    return;
                }

                counter.textContent =
                current;

                requestAnimationFrame(
                    updateCounter
                );

            }

            updateCounter();

        });

    }

},{
    threshold:.3
});

counterObserver.observe(
document.querySelector(".about-stats")
);
// review
const REV = document.querySelectorAll(".review-slide");
const REVDOTS = document.querySelector(".review-dots");

let RI = 0;

// create dots
REV.forEach((_, i) => {

    const d = document.createElement("span");
    d.classList.add("dot");

    if(i === 0) d.classList.add("active");

    d.addEventListener("click", () => {
        RI = i;
        showReview(RI);
    });

    REVDOTS.appendChild(d);
});

const dots = document.querySelectorAll(".review-dots .dot");

function showReview(i){

    REV.forEach(s => s.classList.remove("active"));
    dots.forEach(d => d.classList.remove("active"));

    REV[i].classList.add("active");
    dots[i].classList.add("active");
}

setInterval(() => {
    RI = (RI + 1) % REV.length;
    showReview(RI);
}, 5000);
// doctor
const doctorSlides = document.querySelectorAll(".doctor-slide");
const doctorDotsContainer = document.querySelector(".doctor-dots");

let doctorCurrent = 0;

// إنشاء النقط
doctorSlides.forEach((_, index) => {

    const dot = document.createElement("span");

    dot.classList.add("doctor-dot");

    if(index === 0){
        dot.classList.add("active");
    }

    dot.addEventListener("click", () => {
        doctorCurrent = index;
        updateDoctors();
    });

    doctorDotsContainer.appendChild(dot);

});

const doctorDots = document.querySelectorAll(".doctor-dot");

function updateDoctors(){

    doctorSlides.forEach(slide => {

        slide.classList.remove(
            "active",
            "prev",
            "next"
        );

    });

    doctorDots.forEach(dot => {
        dot.classList.remove("active");
    });

    const prev =
    (doctorCurrent - 1 + doctorSlides.length)
    % doctorSlides.length;

    const next =
    (doctorCurrent + 1)
    % doctorSlides.length;

    doctorSlides[doctorCurrent].classList.add("active");
    doctorSlides[prev].classList.add("prev");
    doctorSlides[next].classList.add("next");

    doctorDots[doctorCurrent].classList.add("active");

}

updateDoctors();

// Auto Slide

let doctorAuto = setInterval(() => {

    doctorCurrent++;

    if(doctorCurrent >= doctorSlides.length){
        doctorCurrent = 0;
    }

    updateDoctors();

}, 4000);

// حجز

const openBooking = document.getElementById("openBooking");
const modal = document.getElementById("bookingModal");
const closeBooking = document.getElementById("closeBooking");

// فتح المودال
openBooking.addEventListener("click", (e) => {
  e.preventDefault();
  modal.classList.add("active");
});

// قفل بالمفتاح X
closeBooking.addEventListener("click", () => {
  modal.classList.remove("active");
});

// قفل لما تدوس برا الكارت
modal.addEventListener("click", (e) => {
  if(e.target === modal){
    modal.classList.remove("active");
  }
});



// submit
document.querySelector(".booking-form").addEventListener("submit", (e)=>{
  e.preventDefault();
  alert("تم الحجز بنجاح ✅");
  modal.classList.remove("active");
});
// موعد
const scheduleModal = document.getElementById("scheduleModal");
const openSchedule = document.getElementById("selectedTime");
const closeSchedule = document.getElementById("closeSchedule");

// open
openSchedule.addEventListener("click", (e) => {
  e.preventDefault();
  scheduleModal.classList.add("active");
});

// close
closeSchedule.addEventListener("click", () => {
  scheduleModal.classList.remove("active");
});

// close when click outside card
scheduleModal.addEventListener("click", (e) => {
  if(e.target === scheduleModal){
    scheduleModal.classList.remove("active");
  }
});
// price
const priceModal = document.getElementById("priceModal");
const closePrice = document.getElementById("closePrice");
const openPrice = document.getElementById("openPrice");

const priceItems = document.querySelectorAll(".price-item");
const priceDetails = document.getElementById("priceDetails");
const priceCategories = document.getElementById("priceCategories");
const priceContent = document.getElementById("priceContent");
const backBtn = document.getElementById("backToCategories");

// OPEN
if(openPrice){
  openPrice.addEventListener("click", (e)=>{
    e.preventDefault();
    priceModal.classList.add("active");
  });
}

// CLOSE
if(closePrice){
  closePrice.addEventListener("click", ()=>{
    priceModal.classList.remove("active");
  });
}

// BACK
if(backBtn){
  backBtn.addEventListener("click", ()=>{
    priceCategories.style.display = "grid";
    priceDetails.classList.remove("active");
    priceContent.innerHTML = "";
  });
}

// ITEMS
priceItems.forEach(item => {

  item.addEventListener("click", () => {

    const type = item.dataset.type;

    priceCategories.style.display = "none";
    priceDetails.classList.add("active");

    let html = "";

    if(type === "spine"){

      html = `
        <div class="price-box">كشف العمود الفقري — يبدأ من 250 ريال</div>
        <div class="price-box">متابعة العمود الفقري — تبدأ من 200 ريال</div>
      `;

    }

    if(type === "joints"){

      html = `
        <div class="price-box">كشف المفاصل — يبدأ من 250 ريال</div>
        <div class="price-box">حقن المفاصل — تبدأ من 700 ريال</div>
        <div class="price-box">متابعة علاج المفاصل — تبدأ من 200 ريال</div>
      `;

    }

    if(type === "sports"){

      html = `
        <div class="price-box">كشف إصابات الملاعب — يبدأ من 300 ريال</div>
        <div class="price-box">برنامج التأهيل الرياضي — حسب الحالة</div>
      `;

    }

    if(type === "fractures"){

      html = `
        <div class="price-box">علاج الكسور والجبائر — حسب نوع الإصابة</div>
        <div class="price-box">متابعة بعد الجبس — تبدأ من 200 ريال</div>
      `;

    }

    priceContent.innerHTML = html;

  });

});
// الفروع
const openWa = document.getElementById("openWhatsApp");
const waModal = document.getElementById("waModal");
const closeWa = document.getElementById("closeWa");

openWa.addEventListener("click", ()=>{
  waModal.classList.add("active");
});

closeWa.addEventListener("click", ()=>{
  waModal.classList.remove("active");
});

// غلق لما تضغط بره
waModal.addEventListener("click", (e)=>{
  if(e.target === waModal){
    waModal.classList.remove("active");
  }
});














const BAA = document.querySelectorAll(".baa-slide");
const BAADOTS = document.querySelectorAll(".baa-dot");

let BA = 0;

function showBA(i){

    if(BAA.length === 0 || BAADOTS.length === 0) return;

    BAA.forEach(s=>s.classList.remove("active"));
    BAADOTS.forEach(d=>d.classList.remove("active"));

    BAA[i].classList.add("active");
    BAADOTS[i].classList.add("active");

}

if(BAA.length > 0){

    setInterval(()=>{

        BA = (BA + 1) % BAA.length;

        showBA(BA);

    },5000);

}

BAADOTS.forEach((dot,i)=>{

    dot.addEventListener("click",()=>{

        BA = i;

        showBA(BA);

    });

});





const resultOverlay = document.getElementById("resultOverlay");

const confidencePercent = document.getElementById("confidencePercent");

const confidenceFill = document.querySelector(".confidence-fill");

const exitResult = document.querySelector(".restart-btn");

const bookAppointment = document.querySelector(".book-btn");

const revealElements = document.querySelectorAll(".reveal");

/* Reveal Observer (ممنوع يتكرر في أي مكان تاني بنفس الاسم) */
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
}, {
    threshold: 0.15
});

/* Observe all elements */
revealElements.forEach(el => {
    revealObserver.observe(el);
});






const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item => {
    const question = item.querySelector(".faq-question");

    question.addEventListener("click", () => {

        faqItems.forEach(el => {
            if(el !== item){
                el.classList.remove("active");
            }
        });

        item.classList.toggle("active");
    });
});
const openBranches = document.getElementById("openBranches");
const branchesPopup = document.getElementById("branchesPopup");
const closeBranches = document.getElementById("closeBranches");

openBranches.addEventListener("click", (e) => {
    e.preventDefault();
    branchesPopup.classList.add("active");
});

closeBranches.addEventListener("click", () => {
    branchesPopup.classList.remove("active");
});

branchesPopup.addEventListener("click", (e) => {
    if (e.target === branchesPopup) {
        branchesPopup.classList.remove("active");
    }
});











let n = document.querySelectorAll(".n");

let run = (el) => {
  let t = +el.dataset.t;
  let c = 0;

  let x = setInterval(() => {
    c += Math.ceil(t / 60);

    if (c >= t) {
      c = t;
      clearInterval(x);
    }

    el.textContent = c + (t === 95 ? "%" : "+");

  }, 20);
};

let obs = new IntersectionObserver((e)=>{
  e.forEach(i=>{
    if(i.isIntersecting){
      run(i.target);
      obs.unobserve(i.target);
    }
  });
});

n.forEach(i=>obs.observe(i));









const openAssessment = document.getElementById("openAssessment");
const assessmentOverlay = document.getElementById("assessmentOverlay");
const assessmentClose = document.querySelector(".assessment-close");

// فتح النافذة
openAssessment.addEventListener("click", function (e) {

    e.preventDefault();

    assessmentOverlay.classList.add("active");

});

// غلق بزر ×
assessmentClose.addEventListener("click", function () {

    assessmentOverlay.classList.remove("active");

});

// غلق عند الضغط خارج النافذة
assessmentOverlay.addEventListener("click", function (e) {

    if (e.target === assessmentOverlay) {

        assessmentOverlay.classList.remove("active");

    }

});

const startAssessment = document.querySelector(".assessment-start");



const loadingScreen = document.getElementById("loadingScreen");

const questionOverlay = document.getElementById("questionOverlay");

const progressCircle = loadingScreen.querySelector(".progress");

const progressText = document.getElementById("progressText");

const loadingTitle = document.getElementById("loadingTitle");

const circumference = 345;


startAssessment.addEventListener("click", function () {

    // إغلاق نافذة الترحيب
    assessmentOverlay.classList.remove("active");

    // إظهار شاشة التحميل
    loadingScreen.classList.add("active");

    // بدء التحميل
    startLoading();

});




function startLoading() {

    let percent = 0;

    progressCircle.style.strokeDashoffset = circumference;

    progressText.textContent = "0%";

    const timer = setInterval(function () {

        percent++;

        progressText.textContent = percent + "%";

        progressCircle.style.strokeDashoffset =
            circumference - (circumference * percent / 100);

        if (percent <= 20) {

            loadingTitle.textContent = "جارٍ تهيئة النظام...";

        }

        else if (percent <= 40) {

            loadingTitle.textContent = "تحليل البيانات الأولية...";

        }

        else if (percent <= 60) {

            loadingTitle.textContent = "تحديد مسار الأسئلة...";

        }

        else if (percent <= 80) {

            loadingTitle.textContent = "تجهيز الفحص الذكي...";

        }

        else if (percent < 100) {

            loadingTitle.textContent = "الانتهاء من التجهيز...";

        }

        else {

            loadingTitle.textContent = "تم تجهيز الأسئلة";

        }

        if (percent >= 100) {

            clearInterval(timer);

            setTimeout(function () {

                // إخفاء شاشة التحميل
                loadingScreen.classList.remove("active");

                // إظهار نافذة الأسئلة
                questionOverlay.classList.add("active");

                // هنحط هنا بعدين أول سؤال
                // renderQuestion();

            }, 500);

        }

    }, 35);

}









const questionTitle = document.getElementById("questionTitle");
const questionDescription = document.getElementById("questionDescription");
const progressFill = document.getElementById("progressFill");
const stepText = document.getElementById("stepText");
const answersContainer = document.getElementById("answersContainer");
const nextBtn = document.getElementById("nextBtn");
























function startLoading() {

    let percent = 0;

    progressCircle.style.strokeDashoffset = circumference;

    const timer = setInterval(function () {

        percent++;

        progressText.textContent = percent + "%";

        progressCircle.style.strokeDashoffset =
            circumference - (circumference * percent / 100);

        if (percent <= 20) {

            loadingTitle.textContent = "جاري تجهيز النظام...";

        }

        else if (percent <= 40) {

            loadingTitle.textContent = "فحص البيانات الأولية...";

        }

        else if (percent <= 60) {

            loadingTitle.textContent = "تجهيز نموذج التقييم...";

        }

        else if (percent <= 80) {

            loadingTitle.textContent = "إعداد الأسئلة المناسبة...";

        }

        else if (percent < 100) {

            loadingTitle.textContent = "الانتهاء من التجهيز...";

        }

        else {

            loadingTitle.textContent = "تم تجهيز الأسئلة";

        }

        if (percent >= 100) {

            clearInterval(timer);

            setTimeout(function () {

                loadingScreen.classList.remove("active");









    // إظهار نافذة الأسئلة
    questionOverlay.classList.add("active");
    currentPath = "start";
currentQuestionIndex = 0;

renderQuestion();

            }, 500);

        }

    }, 40);

}







let currentPath = "";
let currentQuestionIndex = 0;
let selectedAnswer = null;





nextBtn.addEventListener("click", function () {

    // لازم المستخدم يختار إجابة
    if (!selectedAnswer) return;

    // حفظ الإجابة
    state.answers.push({

        id: questions[currentPath][currentQuestionIndex].id,

        answer: selectedAnswer.text

    });

    // حفظ العمر
    if (currentPath === "age") {

        state.ageGroup = selectedAnswer.text;

    }

    // حفظ المشكلة الأساسية
    if (currentPath === "start") {

        state.selectedProblem = selectedAnswer.text;

    }

    // إضافة النقاط
    for (let key in selectedAnswer.score) {

        state.score[key] += selectedAnswer.score[key];

    }

    console.log(state.score);

    // أول سؤال (اختيار نوع المشكلة)
    if (currentPath === "start") {

        // نحفظ المسار الذى سيذهب إليه المستخدم
        state.selectedPath = selectedAnswer.next;

        // ننتقل لسؤال العمر
        currentPath = "age";
        currentQuestionIndex = 0;

        renderQuestion();
        return;

    }

    // بعد سؤال العمر
    if (currentPath === "age") {

        // نرجع للمسار الذى اختاره المستخدم
        currentPath = state.selectedPath;
        currentQuestionIndex = 0;

        renderQuestion();
        return;

    }

    // الانتقال للسؤال التالي
    currentQuestionIndex++;

    // إذا انتهى المسار
    if (currentQuestionIndex >= questions[currentPath].length) {

        // إغلاق نافذة الأسئلة
        questionOverlay.classList.remove("active");

        // فتح شاشة التحليل
        startResultLoading();

        return;

    }

    // عرض السؤال التالي
    renderQuestion();

});








const backbtn = document.getElementById("backbtn");
backbtn.addEventListener("click", function () {

    // لو احنا فى أول سؤال خالص
    if (currentPath === "start") {

        questionOverlay.classList.remove("active");

        return;

    }

    // لو فى أول سؤال داخل المسار
    if (currentQuestionIndex === 0) {

        currentPath = "start";

        currentQuestionIndex = 0;

        renderQuestion();

        return;

    }

    // يرجع سؤال واحد للخلف
    currentQuestionIndex--;

    renderQuestion();

});









const questionClose = document.querySelector(".question-close");


questionClose.addEventListener("click", function () {

    questionOverlay.classList.remove("active");

    // إعادة ضبط الفحص
    currentPath = "";
    currentQuestionIndex = 0;
    selectedAnswer = null;
    nextBtn.disabled = true;

});







const resultLoadingScreen = document.getElementById("resultLoadingScreen");

const resultProgress = resultLoadingScreen.querySelector(".progress");

const resultProgressText = document.getElementById("resultProgressText");

const resultLoadingTitle = document.getElementById("resultLoadingTitle");

const resultCircumference = 345;
function startResultLoading() {

    let percent = 0;

    resultProgress.style.strokeDashoffset = resultCircumference;

    resultProgressText.textContent = "0%";

    resultLoadingScreen.classList.add("active");

    const timer = setInterval(function () {

        percent++;

        resultProgressText.textContent = percent + "%";

        resultProgress.style.strokeDashoffset =
            resultCircumference -
            (resultCircumference * percent / 100);

        if (percent <= 15) {

            resultLoadingTitle.textContent =
                "جارٍ تحليل إجاباتك...";

        }

        else if (percent <= 35) {

            resultLoadingTitle.textContent =
                "مقارنة الأعراض بالحالات المشابهة...";

        }

        else if (percent <= 55) {

            resultLoadingTitle.textContent =
                "تحديد العلاج الأكثر احتمالًا...";

        }

        else if (percent <= 75) {

            resultLoadingTitle.textContent =
                "حساب نسبة توافق كل علاج...";

        }

        else if (percent <= 95) {

            resultLoadingTitle.textContent =
                "إعداد التقرير النهائي...";

        }

        else {

            resultLoadingTitle.textContent =
                "تم الانتهاء من التحليل";

        }

        if (percent >= 100) {
        console.log("وصلنا 100");
    clearInterval(timer);

    setTimeout(function () {

        // إخفاء شاشة التحليل
        resultLoadingScreen.classList.remove("active");

// تجهيز البيانات
renderResult();

// إظهار نافذة النتائج
resultOverlay.classList.add("active");

    }, 600);



        }

    }, 90);

}







const questions = {
    age: [

{

    id: "age",

    title: "كم عمرك؟",

    description: "العمر يساعدنا على تقديم ترشيح أكثر دقة.",

    progress: 10,

    answers: [

        {

            text: "أقل من 18 سنة",

            icon: "fa-child",

            next: "start",

            score: {

                sensitivity: 10,
                filling: 10

            }

        },

        {

            text: "18 إلى 30 سنة",

            icon: "fa-user",

            next: "start",

            score: {

                rootCanal: 5,
                filling: 5,
                crown: 5

            }

        },

        {

            text: "31 إلى 45 سنة",

            icon: "fa-user-tie",

            next: "start",

            score: {

                crown: 10,
                rootCanal: 10,
                gum: 5

            }

        },

        {

            text: "46 إلى 60 سنة",

            icon: "fa-user-doctor",

            next: "start",

            score: {

                implant: 15,
                gum: 15,
                crown: 10

            }

        },

        {

            text: "أكثر من 60 سنة",

            icon: "fa-person-cane",

            next: "start",

            score: {

                implant: 20,
                gum: 20,
                crown: 15

            }

        }

    ]

}

],
    // البداية
    start: [

{

    id: "problem",

    title: "ما المشكلة الأساسية التي تعاني منها؟",

    description: "اختر الحالة الأقرب لما تشعر به.",

    progress: 20,

    answers: [

        {

            text: "ألم في العظام",

            icon: "fa-bone",

            next: "pain",

            score: {

                rootCanal: 15,
                filling: 15,
                crown: 10,
                sensitivity: 10

            }

        },

        {

            text: "كسر أو فقدان جزء من العظام",

            icon: "fa-bone",

            next: "implant",

            score: {

                implant: 20,
                bridge: 20,
                crown: 10

            }

        },

        {

            text: "شرخ أو تآكل بالعظام",

            icon: "fa-hammer",

            next: "broken",

            score: {

                crown: 20,
                filling: 15,
                rootCanal: 10,
                implant: 5

            }

        },

        {

            text: "التهاب أو مشاكل بالمفاصل والعظام",

            icon: "fa-heart-pulse",

            next: "gum",

            score: {

                gum: 20,
                sensitivity: 10

            }

        },

        {

            text: "حساسية أو ألم عند الحركة",

            icon: "fa-person-walking",

            next: "sensitive",

            score: {

                sensitivity: 20,
                filling: 10,
                gum: 5

            }

        }

    ]

}

],
    // العمر
    
    


    // =======================
    // مسار ألم الأسنان
    // =======================

   pain: [

{

    id: "painType",

    next: "painLevel",

    previous: "start",

    title: "كيف تصف الألم؟",

    description: "اختر الوصف الأقرب لما تشعر به.",

    progress: 40,

    answers: [

        {

            text: "ألم نابض ومستمر",

            icon: "fa-heart-pulse",

            score: {

                rootCanal: 25,
                filling: 10

            }

        },

        {

            text: "ألم فقط عند الحركة أو الضغط",

            icon: "fa-person-walking",

            score: {

                crown: 20,
                filling: 20,
                rootCanal: 10

            }

        },

        {

            text: "ألم يزداد مع البرد أو تغير الطقس",

            icon: "fa-temperature-half",

            score: {

                sensitivity: 25,
                filling: 15

            }

        },

        {

            text: "ألم يظهر ويختفي بدون سبب واضح",

            icon: "fa-bolt",

            score: {

                rootCanal: 15,
                filling: 10,
                sensitivity: 10

            }

        }

    ]

},

{

    id: "painLevel",

    next: "painSymptoms",

    previous: "painType",

    title: "ما شدة الألم؟",

    description: "اختر الدرجة الأقرب.",

    progress: 60,

    answers: [

        {

            text: "بسيط ويمكن تحمله",

            icon: "fa-face-smile",

            score: {

                filling: 15,
                sensitivity: 20

            }

        },

        {

            text: "متوسط",

            icon: "fa-face-meh",

            score: {

                filling: 20,
                rootCanal: 15

            }

        },

        {

            text: "شديد",

            icon: "fa-face-frown-open",

            score: {

                rootCanal: 25,
                crown: 10

            }

        },

        {

            text: "يمنعني من النوم",

            icon: "fa-bed",

            score: {

                rootCanal: 25,
                crown: 15

            }

        },

        {

            text: "يخف مع المسكنات ثم يعود",

            icon: "fa-pills",

            score: {

                rootCanal: 20,
                filling: 10

            }

        }

    ]

},

{

    id: "painSymptoms",

    next: "painDuration",

    previous: "painLevel",

    title: "هل توجد أعراض أخرى؟",

    description: "اختر العرض الأقرب.",

    progress: 80,

    answers: [

        {

            text: "تورم في المنطقة المصابة",

            icon: "fa-face-dizzy",

            score: {

                rootCanal: 25,
                gum: 15

            }

        },

        {

            text: "احمرار أو سخونة في المكان",

            icon: "fa-fire",

            score: {

                rootCanal: 20,
                gum: 15

            }

        },

        {

            text: "أشعر بوجود كسر أو شرخ",

            icon: "fa-bone",

            score: {

                crown: 20,
                filling: 15,
                rootCanal: 10

            }

        },

        {

            text: "لا توجد أعراض أخرى",

            icon: "fa-circle-check",

            score: {

                filling: 15,
                sensitivity: 10

            }

        }

    ]

},

{

    id: "painDuration",

    next: "result",

    previous: "painSymptoms",

    title: "منذ متى بدأ الألم؟",

    description: "حدد المدة التقريبية.",

    progress: 100,

    answers: [

        {

            text: "اليوم",

            icon: "fa-calendar-day",

            score: {

                filling: 10,
                sensitivity: 10

            }

        },

        {

            text: "من يوم إلى ثلاثة أيام",

            icon: "fa-calendar-days",

            score: {

                filling: 15,
                rootCanal: 10

            }

        },

        {

            text: "من أسبوع إلى شهر",

            icon: "fa-calendar-week",

            score: {

                rootCanal: 20,
                crown: 10

            }

        },

        {

            text: "أكثر من شهر",

            icon: "fa-calendar",

            score: {

                rootCanal: 25,
                crown: 15

            }

        },

        {

            text: "يختفي ثم يعود منذ فترة",

            icon: "fa-rotate",

            score: {

                rootCanal: 20,
                filling: 15

            }

        }

    ]

}

],

    // =======================
    // كسر او فقدان 
    // =======================

implant: [

{

    id: "missingCount",

    title: "ما نوع الإصابة أو المشكلة؟",

    description: "اختر الحالة الأقرب.",

    progress: 40,

    answers: [

        {

            text: "كسر بسيط",

            icon: "fa-bone",

            score:{

                implant:15,
                bridge:10

            }

        },

        {

            text: "كسر متوسط",

            icon: "fa-bone",

            score:{

                implant:20,
                bridge:15

            }

        },

        {

            text: "كسر في أكثر من موضع",

            icon: "fa-bone",

            score:{

                implant:25,
                bridge:10

            }

        },

        {

            text: "إصابة شديدة أو فقدان جزء من العظام",

            icon: "fa-bone",

            score:{

                implant:25,
                bridge:5

            }

        }

    ]

},

{

    id: "missingDuration",

    title: "منذ متى بدأت الإصابة؟",

    description: "حدد المدة التقريبية.",

    progress: 60,

    answers: [

        {

            text:"من أيام",

            icon:"fa-calendar-day",

            score:{

                implant:10

            }

        },

        {

            text:"من عدة أسابيع",

            icon:"fa-calendar",

            score:{

                implant:15

            }

        },

        {

            text:"من عدة أشهر",

            icon:"fa-clock-rotate-left",

            score:{

                implant:20

            }

        },

        {

            text:"لا أتذكر",

            icon:"fa-circle-question",

            score:{

                implant:10

            }

        }

    ]

},

{

    id:"boneStatus",

    title:"هل أخبرك طبيب من قبل بوجود ضعف في العظام؟",

    description:"إذا لم تكن تعرف، اختر لا أعلم.",

    progress:80,

    answers:[

        {

            text:"لا",

            icon:"fa-circle-check",

            score:{

                implant:20

            }

        },

        {

            text:"نعم",

            icon:"fa-triangle-exclamation",

            score:{

                implant:10

            }

        },

        {

            text:"لا أعلم",

            icon:"fa-circle-question",

            score:{

                implant:15

            }

        }

    ]

},

{

    id:"currentReplacement",

    title:"هل تستخدم أي وسيلة دعم أو تثبيت؟",

    description:"اختر الخيار المناسب.",

    progress:100,

    answers:[

        {

            text:"لا",

            icon:"fa-ban",

            score:{

                implant:20

            }

        },

        {

            text:"جبيرة أو مثبت",

            icon:"fa-link",

            score:{

                implant:15,
                bridge:10

            }

        },

        {

            text:"دعامة أو جهاز طبي",

            icon:"fa-screwdriver-wrench",

            score:{

                implant:25

            }

        },

        {

            text:"حل مؤقت",

            icon:"fa-toolbox",

            score:{

                implant:15

            }

        }

    ]

}

],

    // =======================
    // مسار السن المكسور
    // =======================

    broken: [

{

    id: "breakType",

    title: "ما نوع الإصابة؟",

    description: "اختر الوصف الأقرب لحالتك.",

    progress: 40,

    answers: [

        {

            text: "شرخ أو كسر بسيط",

            icon: "fa-bone",

            score: {

                filling: 15,
                crown: 10

            }

        },

        {

            text: "كسر متوسط",

            icon: "fa-hammer",

            score: {

                crown: 20,
                rootCanal: 10

            }

        },

        {

            text: "كسر شديد أو تهشم",

            icon: "fa-house-crack",

            score: {

                implant: 20,
                crown: 15,
                rootCanal: 10

            }

        },

        {

            text: "لست متأكدًا",

            icon: "fa-circle-question",

            score: {

                crown: 10,
                filling: 10

            }

        }

    ]

},

{

    id: "brokenPain",

    title: "هل تشعر بألم؟",

    description: "اختر الحالة الأقرب.",

    progress: 60,

    answers: [

        {

            text: "لا يوجد ألم",

            icon: "fa-face-smile",

            score: {

                filling: 10,
                crown: 10

            }

        },

        {

            text: "ألم عند الحركة أو الضغط",

            icon: "fa-person-walking",

            score: {

                crown: 20,
                rootCanal: 10

            }

        },

        {

            text: "ألم شديد ومستمر",

            icon: "fa-bolt",

            score: {

                rootCanal: 25,
                crown: 10

            }

        },

        {

            text: "يزداد الألم مع البرد أو تغير الطقس",

            icon: "fa-temperature-half",

            score: {

                rootCanal: 15,
                filling: 10

            }

        }

    ]

},

{

    id: "nerveExposure",

    title: "هل يوجد تورم أو كدمة واضحة؟",

    description: "إذا لم تكن متأكدًا اختر لا أعلم.",

    progress: 80,

    answers: [

        {

            text: "نعم",

            icon: "fa-droplet",

            score: {

                rootCanal: 25,
                crown: 10

            }

        },

        {

            text: "لا",

            icon: "fa-circle-check",

            score: {

                filling: 10,
                crown: 15

            }

        },

        {

            text: "لا أعلم",

            icon: "fa-circle-question",

            score: {

                crown: 10,
                rootCanal: 10

            }

        }

    ]

},

{

    id: "breakDuration",

    title: "متى حدثت الإصابة؟",

    description: "حدد المدة التقريبية.",

    progress: 100,

    answers: [

        {

            text: "اليوم",

            icon: "fa-calendar-day",

            score: {

                filling: 10,
                crown: 10

            }

        },

        {

            text: "من عدة أيام",

            icon: "fa-calendar-week",

            score: {

                crown: 15,
                rootCanal: 10

            }

        },

        {

            text: "من عدة أسابيع",

            icon: "fa-calendar",

            score: {

                crown: 20,
                rootCanal: 15

            }

        },

        {

            text: "من عدة أشهر أو أكثر",

            icon: "fa-clock-rotate-left",

            score: {

                rootCanal: 25,
                implant: 15,
                crown: 15

            }

        }

    ]

}

],

    // =======================
    // مسار اللثة
    // =======================

    gum: [

{

    id: "gumProblem",

    title: "ما المشكلة الأساسية في المفصل؟",

    description: "اختر العرض الأقرب لحالتك.",

    progress: 40,

    answers: [

        {

            text: "ألم عند الحركة",

            icon: "fa-person-walking",

            score: {

                gum: 20

            }

        },

        {

            text: "تورم أو التهاب بالمفصل",

            icon: "fa-fire",

            score: {

                gum: 20

            }

        },

        {

            text: "تيبس وصعوبة في الحركة",

            icon: "fa-person-cane",

            score: {

                gum: 20,
                sensitivity: 10

            }

        },

        {

            text: "طقطقة أو صوت بالمفصل",

            icon: "fa-bone",

            score: {

                gum: 15

            }

        }

    ]

},

{

    id: "gumBleeding",

    title: "متى يزداد الألم؟",

    description: "اختر الإجابة الأقرب.",

    progress: 60,

    answers: [

        {

            text: "مع الحركة فقط",

            icon: "fa-person-running",

            score: {

                gum: 10

            }

        },

        {

            text: "بعد المجهود",

            icon: "fa-dumbbell",

            score: {

                gum: 15

            }

        },

        {

            text: "حتى أثناء الراحة",

            icon: "fa-bed",

            score: {

                gum: 25

            }

        },

        {

            text: "لا يوجد ألم حاليًا",

            icon: "fa-circle-check",

            score: {

                gum: 5

            }

        }

    ]

},

{

    id: "gumSwelling",

    title: "هل توجد أعراض أخرى؟",

    description: "اختر العرض الأقرب.",

    progress: 80,

    answers: [

        {

            text: "تورم بالمفصل",

            icon: "fa-face-dizzy",

            score: {

                gum: 20

            }

        },

        {

            text: "احمرار أو سخونة بالمكان",

            icon: "fa-triangle-exclamation",

            score: {

                gum: 25

            }

        },

        {

            text: "صعوبة في تحريك المفصل",

            icon: "fa-person-cane",

            score: {

                gum: 20

            }

        },

        {

            text: "لا توجد أعراض أخرى",

            icon: "fa-circle-check",

            score: {

                gum: 5

            }

        }

    ]

},

{

    id: "gumDuration",

    title: "منذ متى بدأت المشكلة؟",

    description: "حدد المدة التقريبية.",

    progress: 100,

    answers: [

        {

            text: "من أيام",

            icon: "fa-calendar-day",

            score: {

                gum: 10

            }

        },

        {

            text: "من أسبوع إلى شهر",

            icon: "fa-calendar-week",

            score: {

                gum: 15

            }

        },

        {

            text: "من عدة أشهر",

            icon: "fa-calendar",

            score: {

                gum: 20

            }

        },

        {

            text: "من سنة أو أكثر",

            icon: "fa-clock-rotate-left",

            score: {

                gum: 25

            }

        }

    ]

}

],
    // =======================
    // مسار الحساسية
    // =======================

    sensitive: [

{

    id: "sensitivityReason",

    title: "متى تشعر بالألم أو الحساسية؟",

    description: "اختر الحالة الأقرب لما تشعر به.",

    progress: 40,

    answers: [

        {

            text: "عند بداية الحركة",

            icon: "fa-person-walking",

            score: {

                sensitivity: 20,
                filling: 10

            }

        },

        {

            text: "بعد المشي أو المجهود",

            icon: "fa-person-running",

            score: {

                sensitivity: 20,
                rootCanal: 10

            }

        },

        {

            text: "بعد الجلوس أو الراحة لفترة",

            icon: "fa-chair",

            score: {

                filling: 15,
                sensitivity: 15

            }

        },

        {

            text: "مع صعود أو نزول السلم",

            icon: "fa-stairs",

            score: {

                sensitivity: 20,
                gum: 10

            }

        }

    ]

},

{

    id: "sensitivityTime",

    title: "كم يستمر الألم؟",

    description: "اختر الإجابة الأقرب.",

    progress: 60,

    answers: [

        {

            text: "ثوانٍ ثم يختفي",

            icon: "fa-bolt",

            score: {

                sensitivity: 20

            }

        },

        {

            text: "عدة دقائق",

            icon: "fa-clock",

            score: {

                sensitivity: 15,
                filling: 10

            }

        },

        {

            text: "يستمر لفترة طويلة",

            icon: "fa-hourglass-half",

            score: {

                rootCanal: 20,
                filling: 10

            }

        },

        {

            text: "يختلف من مرة لأخرى",

            icon: "fa-arrows-rotate",

            score: {

                sensitivity: 15

            }

        }

    ]

},

{

    id: "sensitivityCount",

    title: "كم عدد المفاصل أو المناطق المصابة؟",

    description: "اختر العدد الأقرب.",

    progress: 80,

    answers: [

        {

            text: "مفصل واحد",

            icon: "fa-bone",

            score: {

                filling: 15,
                sensitivity: 15

            }

        },

        {

            text: "مفصلان أو ثلاثة",

            icon: "fa-bone",

            score: {

                sensitivity: 20

            }

        },

        {

            text: "عدة مفاصل",

            icon: "fa-person",

            score: {

                sensitivity: 25,
                gum: 10

            }

        },

        {

            text: "لا أستطيع تحديدها",

            icon: "fa-circle-question",

            score: {

                sensitivity: 10

            }

        }

    ]

},

{

    id: "sensitivityDuration",

    title: "منذ متى بدأت المشكلة؟",

    description: "حدد المدة التقريبية.",

    progress: 100,

    answers: [

        {

            text: "من أيام",

            icon: "fa-calendar-day",

            score: {

                sensitivity: 10

            }

        },

        {

            text: "من أسبوع إلى شهر",

            icon: "fa-calendar-week",

            score: {

                sensitivity: 15

            }

        },

        {

            text: "من عدة أشهر",

            icon: "fa-calendar",

            score: {

                sensitivity: 20,
                gum: 10

            }

        },

        {

            text: "من سنة أو أكثر",

            icon: "fa-clock-rotate-left",

            score: {

                sensitivity: 25,
                gum: 15

            }

        }

    ]

}

]
};




// function loadQuestion(){

//     // هات السؤال الحالي
//     const question = questions[currentPath][currentQuestionIndex];

//     // غير العنوان
//     questionTitle.textContent = question.title;

//     // غير الوصف
//     questionDescription.textContent = question.description;

//     // حدث شريط التقدم
//     progressFill.style.width = question.progress + "%";

//     // حدث رقم الخطوة
//     progressStep.textContent =
//     `الخطوة ${currentQuestionIndex + 1} من ${questions[currentPath].length}`;
//     symptomsList.innerHTML = "";
// }

function renderQuestion() {

    const question = questions[currentPath][currentQuestionIndex];

    // عنوان السؤال
    questionTitle.textContent = question.title;

    // الوصف
    questionDescription.textContent = question.description;

    // شريط التقدم
    progressFill.style.width = question.progress + "%";

    
    
    stepText.textContent =
`الخطوة ${currentQuestionIndex + 1} من ${questions[currentPath].length}`;
    // مسح الاختيارات القديمة
    answersContainer.innerHTML = "";

    // إنشاء الاختيارات الجديدة
    question.answers.forEach(answer => {

        const button = document.createElement("button");

        button.className = "symptom-card";

        button.innerHTML = `
    ${answer.icon ? `<i class="fa-solid ${answer.icon}"></i>` : ""}
    <span>${answer.text}</span>
`;

        button.addEventListener("click", function(){

            document
            .querySelectorAll(".symptom-card")
            .forEach(card=>card.classList.remove("active"));

            this.classList.add("active");

            selectedAnswer = answer;

            nextBtn.disabled = false;

        });

        answersContainer.appendChild(button);

    });
    nextBtn.disabled = true;
selectedAnswer = null;

}



const state = {

    answers: [],

    selectedPath: "",

    ageGroup: "",

    score: {

        implant: 0,
        bridge: 0,
        rootCanal: 0,
        filling: 0,
        crown: 0,
        gum: 0,
        sensitivity: 0

    }

};

function getResults() {

    const totalScore = Object.values(state.score)
        .reduce((sum, value) => sum + value, 0);

    const results = Object.entries(state.score)

        .map(([key, score]) => {

            return {

                key,

                score,

                percent: totalScore === 0
                    ? 0
                    : Math.round((score / totalScore) * 100)

            };

        })

        .sort((a, b) => b.score - a.score);

    return results;

}
const treatmentNames = {

    implant: "تقييم جراحي للعظام",

    bridge: "تثبيت أو دعامة للعظام",

    rootCanal: "إصابة عميقة",

    filling: "إصابة سطحية",

    crown: "إصابة تستدعي التثبيت",

    gum: "التهاب المفاصل",

    sensitivity: "حساسية أو ألم مع الحركة"

};
// const answerReasons = {

//     "ألم نابض ومستمر":
//         "الألم النابض غالبًا يرتبط بوصول التسوس إلى العصب.",

//     "يمنعني من النوم":
//         "الألم الليلي من أشهر علامات التهاب العصب.",

//     "تورم في اللثة أو الوجه":
//         "وجود تورم قد يدل على وجود التهاب يحتاج للفحص.",

//     "أكثر من شهر":
//         "استمرار الأعراض لفترة طويلة يزيد احتمال الحاجة للعلاج.",

//     "ألم فقط عند المضغ":
//         "الألم أثناء المضغ قد يدل على كسر أو مشكلة داخل السن.",

//     "أشعر بوجود ثقب أو كسر بالسن":
//         "وجود كسر أو ثقب يغير خطة العلاج المقترحة.",

//     "فقدت سنًا أو أكثر":
//         "فقدان الأسنان يجعل الزراعة أو الجسر من الخيارات المتوقعة.",

//     "سن واحد":
//         "فقدان سن واحد يناسبه غالبًا الزراعة أو الجسر.",

//     "فك كامل أو معظم الأسنان":
//         "فقدان عدد كبير من الأسنان يرفع احتمالية الزراعة الكاملة.",

//     "نزيف عند تنظيف الأسنان":
//         "نزيف اللثة يعد من أشهر علامات التهاب اللثة.",

//     "رائحة فم مستمرة":
//         "رائحة الفم قد تكون مرتبطة بمشاكل اللثة.",

//     "مع المشروبات الباردة":
//         "الحساسية مع البارد قد تشير إلى انكشاف طبقة العاج.",

//     "مع الحلويات":
//         "الألم مع الحلويات قد يكون بسبب وجود تسوس."
// };
function getBestTreatment() {

    const best = getResults()[0];

    return {

        key: best.key,

        title: treatmentNames[best.key],

        score: best.score,

        percent: best.percent

    };

}
console.log(getResults());

console.log(getBestTreatment());



const reasonList =
document.getElementById("reasonList");

const probabilityList =
document.getElementById("probabilityList");

const resultTitle = document.getElementById("resultTitle");

const resultDescription =
document.getElementById("resultDescription");

const mainDiagnosis =
document.getElementById("mainDiagnosis");

const mainDiagnosisText =
document.getElementById("mainDiagnosisText");





const answerReasons = {

    painType: {
        "ألم نابض ومستمر":
        "وصفت الألم بأنه نابض ومستمر، وهو من العلامات الشائعة لوصول الالتهاب إلى عصب السن.",

        "ألم فقط عند المضغ":
        "ذكرت أن الألم يظهر عند المضغ، مما قد يشير إلى وجود مشكلة في بنية السن أو الحشو.",

        "ألم مع المشروبات الباردة أو الساخنة":
        "حساسية السن مع المشروبات من العلامات المهمة أثناء التشخيص.",

        "ألم يظهر ويختفي بدون سبب واضح":
        "الألم المتقطع قد يدل على بداية مشكلة تحتاج إلى فحص."
    },

    painLevel: {

        "بسيط ويمكن تحمله":
        "ذكرت أن الألم بسيط، وهذا قد يعني أن الحالة ما زالت في بدايتها.",

        "متوسط":
        "شدة الألم المتوسطة تساعد في تضييق الاحتمالات.",

        "شديد":
        "الألم الشديد يزيد من احتمال احتياج السن لعلاج متقدم.",

        "يمنعني من النوم":
        "الألم الليلي يعتبر من العلامات المهمة أثناء التقييم.",

        "يخف مع المسكنات ثم يعود":
        "رجوع الألم بعد المسكنات يدل على أن السبب ما زال موجودًا."
    },

    painSymptoms: {

        "تورم في اللثة أو الوجه":
        "وجود تورم يعتبر من أهم المؤشرات التي تستدعي سرعة الفحص.",

        "رائحة أو طعم غير طبيعي بالفم":
        "وجود رائحة أو طعم غير طبيعي قد يرتبط بوجود التهاب.",

        "أشعر بوجود ثقب أو كسر بالسن":
        "وجود كسر أو ثقب ظاهر يزيد احتمال احتياج السن للعلاج.",

        "لا توجد أعراض أخرى":
        "عدم وجود أعراض إضافية يساعد في تضييق الاحتمالات."
    }

};






function renderResult() {
    console.log("renderResult");

    const best = getBestTreatment();

    // عنوان النتيجة
    resultTitle.textContent = "اكتمل التحليل";

    // الوصف
    resultDescription.textContent =
        "اعتمادًا على إجاباتك، هذا هو الاحتمال الأقرب.";

    // الحالة الأقرب
    mainDiagnosis.textContent = best.title;

    // النسبة
    mainDiagnosisText.textContent =
"نسبة التطابق: " + best.percent + "%";
probabilityList.innerHTML = "";


state.answers.forEach(item => {

    const questionId = item.id;

    const answerText = item.answer;

    if (
        answerReasons[questionId] &&
        answerReasons[questionId][answerText]
    ) {

        

    }

});

const results = getResults();

results.forEach(item => {

    probabilityList.innerHTML += `

        <div class="probability-item">

            <span>${treatmentNames[item.key]}</span>

            <strong>${item.percent}%</strong>

        </div>

    `;

});

}
const restartBtn = document.getElementById("restartBtn");



console.log(probabilityList.innerHTML);












//============================
// Welcome Popup
//============================

const welcomePopup = document.getElementById("welcomeOverlay");

const assessmentPopup = document.getElementById("assessmentOverlay");

const closeWelcome =
document.getElementById("closePopup");

const startExperience =
document.getElementById("startExperience");

const browseWebsite =
document.getElementById("browseWebsite");

const closePopup = document.getElementById("closePopup");

closePopup.addEventListener("click", function () {

    welcomePopup.classList.remove("know");

});
//============================
// إظهار نافذة الترحيب
//============================

window.addEventListener("load",()=>{

    welcomePopup.classList.add("know");

});

//============================
// زر X
//============================

closeWelcome.onclick=()=>{

    welcomePopup.classList.remove("know");

}


//============================
// تصفح الموقع
//============================

browseWebsite.onclick=()=>{

    welcomePopup.classList.remove("know");

}


//============================
// ابدأ التجربة
//============================

startExperience.onclick=()=>{

    welcomePopup.classList.remove("know");

    setTimeout(()=>{

        assessmentPopup.classList.add("active");

    },250);

}






const doctorWhatsapp = "201113385257"; // بدون +

function buildWhatsappMessage() {

    const best = getBestTreatment();
    const results = getResults().slice(0, 3);

    let message = "";

    message += "🏥 *تقرير التقييم الذكي*\n";
    message += "━━━━━━━━━━━━━━━━━━━━━━\n\n";

    message += "👤 *العمر*\n";
    message += state.ageGroup + "\n\n";

    message += "🦴 *الشكوى الرئيسية*\n";
    message += state.selectedProblem + "\n\n";

    message += "━━━━━━━━━━━━━━━━━━━━━━\n";
    message += "📋 *بيانات الحالة*\n\n";

    state.answers.forEach(item => {

        let questionTitle = "";

        // نبحث عن عنوان السؤال
        for (const path in questions) {

            const question = questions[path].find(q => q.id === item.id);

            if (question) {
                questionTitle = question.title;
                break;
            }

        }

        message += `• ${questionTitle}\n`;
        message += `   ↳ ${item.answer}\n\n`;

    });

    message += "━━━━━━━━━━━━━━━━━━━━━━\n";
    message += "📊 *نتائج التحليل*\n\n";

    results.forEach((item, index) => {

        let medal = "🥉";

        if (index === 0) medal = "🥇";
        if (index === 1) medal = "🥈";

        message += `${medal} ${treatmentNames[item.key]}\n`;
        message += `نسبة التطابق: ${item.percent}%\n\n`;

    });

    message += "━━━━━━━━━━━━━━━━━━━━━━\n";

    message += "✅ *الاحتمال الأقرب*\n";
    message += `${best.title}\n\n`;

    message += "⚠️ هذا التقرير ناتج عن التقييم الذكي، وهو ترشيح أولي للمساعدة في تجهيز الحالة قبل الكشف، ولا يُعتبر تشخيصًا طبيًا نهائيًا.\n\n";

    message += "📅 أرغب في حجز موعد.";

    return message;

}






restartBtn.addEventListener("click", function () {

    const message = buildWhatsappMessage();

    const url =
        `https://wa.me/${doctorWhatsapp}?text=${encodeURIComponent(message)}`;

    window.location.href = url;

});
