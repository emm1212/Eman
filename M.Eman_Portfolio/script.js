const portfolioItems = [
  {
    title: "لوحة تحكم مكتب الرحلات",
    description: "Dashboard لإدارة الحجوزات والعملاء والرحلات والإيرادات والتنبيهات مع رسوم وإحصائيات واضحة.",
    category: "dashboard",
    categoryLabel: "لوحات تحكم",
    year: "2026",
    code: "TR",
    image: "assets/projects/travel-dashboard.png"
  },
  {
    title: "لوحة تحكم مركز تبارك",
    description: "واجهة إدارة متجر سوبر ماركت تشمل المنتجات والأقسام والطلبات والعملاء والمندوبين والتقارير.",
    category: "dashboard",
    categoryLabel: "لوحات تحكم",
    year: "2026",
    code: "AD",
    image: "assets/projects/tabarak-admin-dashboard.png"
  },
  {
    title: "تطبيق حجز الصالات",
    description: "واجهات تطبيق لحجز الصالات تشمل تسجيل الدخول، البحث، تفاصيل القاعة، التقويم، الدفع، والحجوزات.",
    category: "booking",
    categoryLabel: "حجوزات",
    year: "2026",
    code: "HA",
    image: "assets/projects/hall-booking-app.png"
  },
  {
    title: "تطبيق مندوبين مركز تبارك",
    description: "تطبيق للمندوبين يعرض الطلبات، تفاصيل التوصيل، الخريطة، حالة الطلب، وسجل الطلبات المكتملة.",
    category: "app",
    categoryLabel: "تطبيقات",
    year: "2026",
    code: "DR",
    image: "assets/projects/tabarak-driver-app.png"
  },
  {
    title: "تطبيق مستخدم سوبر ماركت تبارك",
    description: "واجهة مستخدم للطلب من السوبر ماركت تشمل البحث، اختيار المنطقة، العروض، الأقسام، والسلة.",
    category: "store",
    categoryLabel: "متاجر",
    year: "2026",
    code: "SM",
    image: "assets/projects/tabarak-customer-app.png"
  },
  {
    title: "لوحة إدارة حجز الصالات",
    description: "لوحة تحكم لإدارة الصالات والحجوزات والمستخدمين والأرباح والمدفوعات والتقارير.",
    category: "dashboard",
    categoryLabel: "لوحات تحكم",
    year: "2026",
    code: "HD",
    image: "assets/projects/hall-admin-dashboard.png"
  },
  {
    title: "تطبيق رحلاتك للسفر والسياحة",
    description: "تطبيق سفر وسياحة للحجوزات والخدمات يشمل الطيران والفنادق والتأشيرات والباقات ورحلات المستخدم.",
    category: "travel",
    categoryLabel: "سفر",
    year: "2026",
    code: "RA",
    image: "assets/projects/rahlatak-travel-app.png"
  }
];

const worksGrid = document.getElementById("works-grid");
const filterButtons = document.querySelectorAll(".filter-btn");
const projectsCount = document.getElementById("projects-count");
const year = document.getElementById("year");
const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.getElementById("nav-menu");
const contactForm = document.getElementById("contact-form");
const formNote = document.getElementById("form-note");

function renderWorks(filter = "all") {
  const items = filter === "all"
    ? portfolioItems
    : portfolioItems.filter((item) => item.category === filter);

  worksGrid.innerHTML = items.map((item) => `
    <article class="work-card">
      <div class="work-visual">
        <img src="${item.image}" alt="${item.title}" loading="lazy" />
        <span class="work-code">${item.code}</span>
      </div>
      <div class="work-body">
        <h3>${item.title}</h3>
        <p>${item.description}</p>
        <div class="work-meta">
          <span class="work-tag">${item.categoryLabel}</span>
          <span class="work-tag">${item.year}</span>
        </div>
      </div>
    </article>
  `).join("");

  projectsCount.textContent = portfolioItems.length.toString();
}

function setActiveFilter(button) {
  filterButtons.forEach((btn) => btn.classList.remove("active"));
  button.classList.add("active");
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setActiveFilter(button);
    renderWorks(button.dataset.filter);
  });
});

navToggle.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

navMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(contactForm);
  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const message = String(formData.get("message") || "").trim();
  const subject = encodeURIComponent(`رسالة من موقع M.Eman - ${name}`);
  const body = encodeURIComponent(`الاسم: ${name}\nالبريد: ${email}\n\nالرسالة:\n${message}`);

  window.location.href = `mailto:hello@m-eman.com?subject=${subject}&body=${body}`;
  formNote.textContent = "سيتم فتح تطبيق البريد لإرسال الرسالة. يمكن تغيير البريد من ملف script.js.";
  contactForm.reset();
});

year.textContent = new Date().getFullYear().toString();
renderWorks();
