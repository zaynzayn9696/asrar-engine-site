import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./EnterprisePage.css";

// Translations - Levantine Street Dialect
const translations = {
  en: {
    nav: {
      capabilities: "Capabilities",
      industries: "Industries",
      pricing: "Pricing",
      contact: "Contact",
      scheduleDemo: "Schedule Demo",
    },
    hero: {
      eyebrow: "Enterprise Intelligence Solutions",
      title1: "Conversational AI",
      title2: "Years Ahead",
      subtitle: "The only AI engine that <strong>actually remembers</strong> your customers. 13 Arabic dialects. Zero hallucinations. Built for enterprises who refuse to settle.",
      cta: "Schedule Demo",
      explore: "Explore Capabilities",
      trust: "AES-256 Encryption • Secure API • Proprietary Technology (Patent Pending)",
    },
    stats: {
      accuracy: "Accuracy Score",
      tokens: "Tokens Tested",
      dialects: "Arabic Dialects",
      audits: "Audits Passed",
      response: "Response Time",
    },
    problem: {
      title: "The Problem with Current AI",
      subtitle: "Every major AI chatbot suffers from the same fatal flaws",
      problems: [
        { icon: "🧠", title: "No Memory", desc: "Forgets everything after each session" },
        { icon: "🌐", title: "Generic Arabic", desc: "Sounds robotic and culturally deaf" },
        { icon: "🎭", title: "Personality Drift", desc: "Breaks character under pressure" },
        { icon: "📉", title: "No Business Logic", desc: "Can't upsell or convert" },
      ],
      solution: "ASRAR Intelligence Engine",
      solutionDesc: "We built what enterprise actually needs",
    },
    capabilities: {
      title: "ASRAR Intelligence Engine",
      subtitle: "We built what enterprise actually needs",
      items: [
        { title: "Memory Intelligence", score: "99%", desc: "Cross-session memory with semantic retrieval" },
        { title: "Dialect Purity", score: "98%", desc: "13 Arabic dialects with zero contamination" },
        { title: "Behavioral Detection", score: "99%", desc: "Pattern analysis and contradiction surfacing" },
        { title: "Self-Learning Engine", score: "97%", desc: "Adaptive personalization per customer" },
        { title: "Response Latency", score: "<2s", desc: "Enterprise-grade performance" },
        { title: "Upselling Intelligence", score: "99.5%", desc: "Context-aware product recommendations" },
      ],
    },
    industries: {
      title: "Industry Applications",
      subtitle: "Projected ROI across verticals based on industry research and benchmarks",
      disclaimer: "*Projections based on industry data and internal testing metrics",
      items: [
        { icon: "🍽️", title: "Food & Beverage", desc: "Remember customer preferences, dietary restrictions, and past orders. Upsell naturally based on history.", stats: [{ value: "+35%", label: "Repeat Orders" }, { value: "+25%", label: "AOV Increase" }] },
        { icon: "🏨", title: "Hospitality", desc: "Guest preference memory across properties. Special occasion tracking and VIP recognition.", stats: [{ value: "+45%", label: "Direct Bookings" }, { value: "+30%", label: "Guest Satisfaction" }] },
        { icon: "👗", title: "Retail & Fashion", desc: "Style preference memory, size history, and event-based recommendations that convert.", stats: [{ value: "+40%", label: "Conversion Rate" }, { value: "-30%", label: "Return Rate" }] },
        { icon: "💎", title: "Luxury & Jewelry", desc: "Gift recipient memory, occasion tracking, and discrete high-touch conversations.", stats: [{ value: "+60%", label: "Repeat Purchases" }, { value: "+45%", label: "Transaction Value" }] },
        { icon: "🏥", title: "Healthcare", desc: "Appointment scheduling with history awareness. Symptom tracking and follow-up reminders.", stats: [{ value: "-50%", label: "No-Shows" }, { value: "+35%", label: "Adherence" }] },
        { icon: "🏦", title: "Financial Services", desc: "Customer intent detection, objection handling, and personalized financial guidance.", stats: [{ value: "+55%", label: "Lead Conversion" }, { value: "-40%", label: "Support Tickets" }] },
      ],
    },
    architecture: {
      title: "Technical Architecture",
      subtitle: "Enterprise-grade infrastructure built for scale",
      stack: [
        { layer: "Frontend", tech: "React + Vite", color: "#61dafb" },
        { layer: "API Layer", tech: "Node.js + Express", color: "#68a063" },
        { layer: "AI Engine", tech: "GPT-4o + Custom", color: "#a855f7" },
        { layer: "Database", tech: "PostgreSQL + Prisma", color: "#336791" },
        { layer: "Memory", tech: "Vector Embeddings", color: "#00f0ff" },
        { layer: "Security", tech: "AES-256 + TLS 1.3", color: "#10b981" },
      ],
    },
    pricing: {
      title: "Partnership Tiers",
      subtitle: "Flexible pricing designed for enterprise scale",
      note: "All plans include: API documentation • Integration support • Dedicated onboarding",
      ip: "🔒 Proprietary Technology",
      tiers: [
        { tier: "Starter", price: "499", period: "/month", cta: "Schedule Demo", features: ["10,000 API calls/month", "Basic memory (30-day retention)", "3 Arabic dialects + English", "Email support", "Basic analytics", { text: "Contradiction detection", included: false }, { text: "Custom persona training", included: false }, { text: "White-label option", included: false }] },
        { tier: "Professional", price: "1,499", period: "/month", popular: true, cta: "Schedule Demo", features: ["50,000 API calls/month", "Full memory (unlimited retention)", "All 13 Arabic dialects + English", "Priority support (24hr)", "Advanced analytics + insights", "Contradiction & loop detection", "Custom persona training", { text: "White-label option", included: false }] },
        { tier: "Enterprise", price: "Custom", period: "", cta: "Contact Sales", features: ["Unlimited API calls", "Full memory + cross-property sync", "All dialects + custom training", "Dedicated success manager", "SLA + uptime guarantee", "All behavioral features", "White-label option", "On-premise deployment"] },
      ],
    },
    security: {
      title: "Enterprise Security",
      subtitle: "Built with security-first architecture",
      items: [
        { icon: "🔐", title: "End-to-End Encryption", desc: "AES-256 encryption at rest, TLS 1.3 in transit" },
        { icon: "🛡️", title: "Secure Infrastructure", desc: "Isolated environments, encrypted databases" },
        { icon: "🔑", title: "API Security", desc: "Token-based auth, rate limiting, request validation" },
        { icon: "📜", title: "Proprietary IP", desc: "Patent technology, protected algorithms" },
      ],
    },
    contact: {
      title: "Let's Partner",
      desc: "Ready to transform your customer experience with AI that actually remembers? Schedule a personalized demo and see the difference.",
      benefits: [
        { icon: "⚡", text: "Live demo within 24 hours" },
        { icon: "📋", text: "Custom proposal based on your needs" },
        { icon: "🚀", text: "2-4 week implementation timeline" },
      ],
      ready: "Ready to partner?",
      response: "We typically respond within 24 hours",
    },
    footer: {
      tagline: '"Years Ahead" Conversational Intelligence',
      tokens: "Tokens Tested",
      accuracy: "Accuracy",
      dialects: "Arabic Dialects",
      audits: "Audits Passed",
      policy: "Privacy Policy",
      consumer: "Consumer App",
      copyright: "All rights reserved. Made with ❤️ in Jordan 🇯🇴",
    },
  },
  ar: {
    nav: {
      capabilities: "القدرات",
      industries: "القطاعات",
      pricing: "الأسعار",
      contact: "تواصل معنا",
      scheduleDemo: "احجز عرض",
    },
    hero: {
      eyebrow: "حلول ذكاء المؤسسات",
      title1: "ذكاء اصطناعي",
      title2: "سنين قدام",
      subtitle: "المحرك الوحيد اللي <strong>بتذكر زبائنك فعلياً</strong>. ١٣ لهجة عربية. صفر أخطاء. مبني للشركات اللي ما بترضى بالعادي.",
      cta: "احجز عرض",
      explore: "اكتشف القدرات",
      trust: "تشفير AES-256 • API آمن • تقنية محمية (براءة اختراع قيد التسجيل)",
    },
    stats: {
      accuracy: "نسبة الدقة",
      tokens: "توكن تم اختبارها",
      dialects: "لهجة عربية",
      audits: "فحص ناجح",
      response: "وقت الاستجابة",
    },
    problem: {
      title: "مشكلة الذكاء الاصطناعي الحالي",
      subtitle: "كل الشات بوتات الكبيرة عندها نفس المشاكل",
      problems: [
        { icon: "🧠", title: "ما بتذكر", desc: "بتنسى كل شي بعد كل جلسة" },
        { icon: "🌐", title: "عربي عام", desc: "صوت روبوتي وما بفهم الثقافة" },
        { icon: "🎭", title: "شخصية متقلبة", desc: "بتخرب تحت الضغط" },
        { icon: "📉", title: "بدون منطق تجاري", desc: "ما بتعرف تبيع أو تحول" },
      ],
      solution: "محرك أسرار الذكي",
      solutionDesc: "بنينا اللي الشركات فعلياً بتحتاجه",
    },
    capabilities: {
      title: "محرك أسرار الذكي",
      subtitle: "بنينا اللي الشركات فعلياً بتحتاجه",
      items: [
        { title: "ذكاء الذاكرة", score: "99%", desc: "ذاكرة عبر الجلسات مع استرجاع ذكي" },
        { title: "نقاء اللهجة", score: "98%", desc: "١٣ لهجة عربية بدون خلط" },
        { title: "كشف السلوك", score: "99%", desc: "تحليل الأنماط وكشف التناقضات" },
        { title: "تعلم ذاتي", score: "97%", desc: "تخصيص تلقائي لكل زبون" },
        { title: "سرعة الرد", score: "<2 ثانية", desc: "أداء بمستوى المؤسسات" },
        { title: "ذكاء البيع", score: "99.5%", desc: "توصيات منتجات حسب السياق" },
      ],
    },
    industries: {
      title: "تطبيقات القطاعات",
      subtitle: "عائد استثمار متوقع بناءً على أبحاث السوق",
      disclaimer: "*توقعات مبنية على بيانات السوق واختباراتنا الداخلية",
      items: [
        { icon: "🍽️", title: "مطاعم ومشروبات", desc: "تذكر تفضيلات الزبون، الحساسية الغذائية، والطلبات السابقة. بيع إضافي طبيعي.", stats: [{ value: "+35%", label: "طلبات متكررة" }, { value: "+25%", label: "زيادة متوسط الطلب" }] },
        { icon: "🏨", title: "ضيافة وفنادق", desc: "ذاكرة تفضيلات الضيوف عبر الفروع. تتبع المناسبات والتعرف على الـ VIP.", stats: [{ value: "+45%", label: "حجوزات مباشرة" }, { value: "+30%", label: "رضا الضيوف" }] },
        { icon: "👗", title: "تجزئة وأزياء", desc: "ذاكرة تفضيلات الستايل، تاريخ المقاسات، وتوصيات حسب المناسبات.", stats: [{ value: "+40%", label: "نسبة التحويل" }, { value: "-30%", label: "نسبة الإرجاع" }] },
        { icon: "💎", title: "فخامة ومجوهرات", desc: "ذاكرة مستلمي الهدايا، تتبع المناسبات، ومحادثات راقية وخاصة.", stats: [{ value: "+60%", label: "مشتريات متكررة" }, { value: "+45%", label: "قيمة المعاملة" }] },
        { icon: "🏥", title: "رعاية صحية", desc: "جدولة مواعيد مع وعي بالتاريخ. تتبع الأعراض وتذكيرات المتابعة.", stats: [{ value: "-50%", label: "عدم الحضور" }, { value: "+35%", label: "الالتزام" }] },
        { icon: "🏦", title: "خدمات مالية", desc: "كشف نية العميل، معالجة الاعتراضات، وإرشاد مالي مخصص.", stats: [{ value: "+55%", label: "تحويل العملاء" }, { value: "-40%", label: "تذاكر الدعم" }] },
      ],
    },
    architecture: {
      title: "البنية التقنية",
      subtitle: "بنية تحتية بمستوى المؤسسات مبنية للتوسع",
      stack: [
        { layer: "الواجهة", tech: "React + Vite", color: "#61dafb" },
        { layer: "طبقة API", tech: "Node.js + Express", color: "#68a063" },
        { layer: "محرك الذكاء", tech: "GPT-4o + مخصص", color: "#a855f7" },
        { layer: "قاعدة البيانات", tech: "PostgreSQL + Prisma", color: "#336791" },
        { layer: "الذاكرة", tech: "Vector Embeddings", color: "#00f0ff" },
        { layer: "الأمان", tech: "AES-256 + TLS 1.3", color: "#10b981" },
      ],
    },
    pricing: {
      title: "باقات الشراكة",
      subtitle: "أسعار مرنة مصممة للشركات",
      note: "كل الباقات تشمل: توثيق API • دعم التكامل • تهيئة مخصصة",
      ip: "🔒 تقنية محمية",
      tiers: [
        { tier: "المبتدئ", price: "499", period: "/شهرياً", cta: "احجز عرض", features: ["10,000 طلب API/شهرياً", "ذاكرة أساسية (30 يوم)", "3 لهجات عربية + إنجليزي", "دعم بالإيميل", "تحليلات أساسية", { text: "كشف التناقضات", included: false }, { text: "تدريب شخصية مخصصة", included: false }, { text: "وايت ليبل", included: false }] },
        { tier: "المحترف", price: "1,499", period: "/شهرياً", popular: true, cta: "احجز عرض", features: ["50,000 طلب API/شهرياً", "ذاكرة كاملة (بدون حد)", "كل الـ13 لهجة + إنجليزي", "دعم أولوية (24 ساعة)", "تحليلات متقدمة", "كشف التناقضات والتكرار", "تدريب شخصية مخصصة", { text: "وايت ليبل", included: false }] },
        { tier: "المؤسسات", price: "مخصص", period: "", cta: "تواصل معنا", features: ["طلبات API غير محدودة", "ذاكرة كاملة + مزامنة الفروع", "كل اللهجات + تدريب مخصص", "مدير نجاح مخصص", "ضمان SLA + وقت التشغيل", "كل ميزات السلوك", "وايت ليبل", "تثبيت داخلي"] },
      ],
    },
    security: {
      title: "أمان المؤسسات",
      subtitle: "مبني بنهج الأمان أولاً",
      items: [
        { icon: "🔐", title: "تشفير من طرف لطرف", desc: "تشفير AES-256 في الراحة، TLS 1.3 أثناء النقل" },
        { icon: "🛡️", title: "بنية تحتية آمنة", desc: "بيئات معزولة، قواعد بيانات مشفرة" },
        { icon: "🔑", title: "أمان API", desc: "مصادقة بالتوكن، تحديد المعدل، فحص الطلبات" },
        { icon: "📜", title: "ملكية فكرية محمية", desc: "تقنية مسجلة، خوارزميات محمية" },
      ],
    },
    contact: {
      title: "خلينا نتشارك",
      desc: "جاهز تحول تجربة زبائنك مع ذكاء اصطناعي بتذكر فعلياً؟ احجز عرض مخصص وشوف الفرق.",
      benefits: [
        { icon: "⚡", text: "عرض حي خلال 24 ساعة" },
        { icon: "📋", text: "عرض مخصص حسب احتياجاتك" },
        { icon: "🚀", text: "تنفيذ خلال 2-4 أسابيع" },
      ],
      ready: "جاهز للشراكة؟",
      response: "عادةً بنرد خلال 24 ساعة",
    },
    footer: {
      tagline: '"سنين قدام" في الذكاء الاصطناعي',
      tokens: "توكن تم اختبارها",
      accuracy: "الدقة",
      dialects: "لهجة عربية",
      audits: "فحص ناجح",
      policy: "سياسة الخصوصية",
      consumer: "تطبيق المستهلك",
      copyright: "جميع الحقوق محفوظة. صُنع بـ ❤️ في الأردن 🇯🇴",
    },
  },
};

// Animated counter hook
function useCountUp(end, duration = 2000, startOnView = true) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(!startOnView);
  const ref = useRef(null);

  useEffect(() => {
    if (!startOnView) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [startOnView, hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;
    let startTime;
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [hasStarted, end, duration]);

  return { count, ref };
}

// Floating particles component
function FloatingParticles({ count = 50 }) {
  const particles = Array.from({ length: count }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 1,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5,
  }));

  return (
    <div className="ent-particles">
      {particles.map((p) => (
        <div
          key={p.id}
          className="ent-particle"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

// Morphing blob component
function MorphingBlob({ className }) {
  return (
    <div className={`ent-blob ${className}`}>
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <path
          fill="currentColor"
          d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,79.6,-45.8C87.4,-32.5,90,-16.3,88.5,-0.9C87,14.5,81.4,29,72.9,41.8C64.4,54.6,53,65.7,39.5,73.4C26,81.1,10.5,85.4,-4.7,85.6C-19.9,85.8,-39.8,82,-54.3,72.3C-68.8,62.6,-78,47,-82.7,30.2C-87.4,13.4,-87.6,-4.6,-83.3,-21.5C-79,-38.4,-70.2,-54.2,-57.4,-62.1C-44.6,-70,-27.8,-70,-12.4,-70.7C3,-71.4,30.6,-83.6,44.7,-76.4Z"
          transform="translate(100 100)"
        />
      </svg>
    </div>
  );
}

// Industry card component
function IndustryCard({ icon, title, description, stats, delay }) {
  return (
    <div className="ent-industry-card" style={{ animationDelay: `${delay}ms` }}>
      <div className="ent-industry-card-glow" />
      <div className="ent-industry-icon">{icon}</div>
      <h3 className="ent-industry-title">{title}</h3>
      <p className="ent-industry-desc">{description}</p>
      <div className="ent-industry-stats">
        {stats.map((stat, i) => (
          <div key={i} className="ent-industry-stat">
            <span className="ent-industry-stat-value">{stat.value}</span>
            <span className="ent-industry-stat-label">{stat.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Pricing tier component
function PricingTier({ tier, price, period, features, isPopular, ctaText, onCtaClick }) {
  return (
    <div className={`ent-pricing-card ${isPopular ? "ent-pricing-card--popular" : ""}`}>
      {isPopular && <div className="ent-pricing-badge">Most Popular</div>}
      <div className="ent-pricing-header">
        <h3 className="ent-pricing-tier">{tier}</h3>
        <div className="ent-pricing-price">
          <span className="ent-pricing-currency">$</span>
          <span className="ent-pricing-amount">{price}</span>
          <span className="ent-pricing-period">{period}</span>
        </div>
      </div>
      <ul className="ent-pricing-features">
        {features.map((f, i) => (
          <li key={i} className={f.included ? "" : "ent-pricing-feature--disabled"}>
            <span className="ent-pricing-check">{f.included ? "✓" : "×"}</span>
            {f.text}
          </li>
        ))}
      </ul>
      <button className="ent-pricing-cta" onClick={onCtaClick}>{ctaText}</button>
    </div>
  );
}

export default function EnterprisePage() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCapability, setActiveCapability] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [language, setLanguage] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("asrar-ent-lang") || "en";
    }
    return "en";
  });

  const t = translations[language];
  const isAr = language === "ar";

  const tokensCounter = useCountUp(12000000, 2500);
  const accuracyCounter = useCountUp(99, 2000);
  const dialectsCounter = useCountUp(13, 1500);
  const auditsCounter = useCountUp(50000, 2200);

  const handleLanguageSwitch = (lang) => {
    if (lang === language) return;
    setLanguage(lang);
    if (typeof window !== "undefined") {
      localStorage.setItem("asrar-ent-lang", lang);
    }
  };

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setActiveCapability((prev) => (prev + 1) % 6);
    }, 3000);
    
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const element = document.querySelector(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const industries = t.industries.items.map((item) => ({
    icon: item.icon,
    title: item.title,
    description: item.desc,
    stats: item.stats,
  }));

  return (
    <div className={`ent-page ${isVisible ? "ent-page--visible" : ""} ${isAr ? "ent-page--rtl" : ""}`} dir={isAr ? "rtl" : "ltr"}>
      {/* Animated Background */}
      <div className="ent-bg">
        <FloatingParticles count={60} />
        <MorphingBlob className="ent-blob--1" />
        <MorphingBlob className="ent-blob--2" />
        <MorphingBlob className="ent-blob--3" />
        <div className="ent-grid-overlay" />
      </div>

      {/* Header */}
      <header className="ent-header">
        <div className="ent-header-inner">
          <Link to="/" className="ent-logo">
            <span className="ent-logo-text">ASRAR AI</span>
            <span className="ent-logo-badge">{isAr ? 'مؤسسات' : 'Enterprise'}</span>
          </Link>
          <nav className="ent-nav">
            <a href="#capabilities" onClick={(e) => handleNavClick(e, '#capabilities')} className="ent-nav-link">{t.nav.capabilities}</a>
            <a href="#industries" onClick={(e) => handleNavClick(e, '#industries')} className="ent-nav-link">{t.nav.industries}</a>
            <a href="#pricing" onClick={(e) => handleNavClick(e, '#pricing')} className="ent-nav-link">{t.nav.pricing}</a>
            <a href="#contact" onClick={(e) => handleNavClick(e, '#contact')} className="ent-nav-link">{t.nav.contact}</a>
          </nav>
          <a href="#contact" onClick={(e) => handleNavClick(e, '#contact')} className="ent-header-cta">
            {t.nav.scheduleDemo}
          </a>
          <button
            className={`ent-mobile-toggle ${isMobileMenuOpen ? 'ent-mobile-toggle--open' : ''}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>

      {/* Mobile Navigation */}
      <div className={`ent-mobile-nav ${isMobileMenuOpen ? 'ent-mobile-nav--open' : ''}`}>
        <div className="ent-mobile-nav-overlay" onClick={() => setIsMobileMenuOpen(false)} />
        <nav className="ent-mobile-nav-content">
          <a href="#capabilities" onClick={(e) => handleNavClick(e, '#capabilities')} className="ent-mobile-nav-link">{t.nav.capabilities}</a>
          <a href="#industries" onClick={(e) => handleNavClick(e, '#industries')} className="ent-mobile-nav-link">{t.nav.industries}</a>
          <a href="#pricing" onClick={(e) => handleNavClick(e, '#pricing')} className="ent-mobile-nav-link">{t.nav.pricing}</a>
          <a href="#contact" onClick={(e) => handleNavClick(e, '#contact')} className="ent-mobile-nav-link">{t.nav.contact}</a>
          <a href="#contact" onClick={(e) => handleNavClick(e, '#contact')} className="ent-mobile-nav-cta">{t.nav.scheduleDemo}</a>
        </nav>
      </div>

      {/* Hero Section */}
      <section className="ent-hero">
        <div className="ent-hero-content">
          <div className="ent-hero-eyebrow">
            <span className="ent-hero-eyebrow-line" />
            <span>{t.hero.eyebrow}</span>
            <span className="ent-hero-eyebrow-line" />
          </div>
          <h1 className="ent-hero-title">
            <span className="ent-hero-title-line">{t.hero.title1}</span>
            <span className="ent-hero-title-line ent-hero-title-accent">{t.hero.title2}</span>
          </h1>
          <p className="ent-hero-subtitle" dangerouslySetInnerHTML={{ __html: t.hero.subtitle }} />
          <div className="ent-hero-ctas">
            <a href="#contact" onClick={(e) => handleNavClick(e, '#contact')} className="ent-btn ent-btn--primary">
              <span>{t.hero.cta}</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
            <a href="#capabilities" onClick={(e) => handleNavClick(e, '#capabilities')} className="ent-btn ent-btn--ghost">
              <span>{t.hero.explore}</span>
            </a>
          </div>
          <div className="ent-hero-trust">
            <span className="ent-hero-trust-icon">🔒</span>
            <span>{t.hero.trust}</span>
          </div>
        </div>
        
        {/* Animated Stats Ring */}
        <div className="ent-hero-visual">
          <div className="ent-stats-ring">
            <div className="ent-stats-ring-inner">
              <div className="ent-stats-center">
                <span className="ent-stats-center-value">99%</span>
                <span className="ent-stats-center-label">{t.stats.accuracy}</span>
              </div>
            </div>
            <div className="ent-stats-orbit">
              <div className="ent-stats-orbit-item" style={{ "--angle": "0deg" }}>
                <span className="ent-orbit-value" ref={tokensCounter.ref}>{tokensCounter.count.toLocaleString()}</span>
                <span className="ent-orbit-label">{t.stats.tokens}</span>
              </div>
              <div className="ent-stats-orbit-item" style={{ "--angle": "90deg" }}>
                <span className="ent-orbit-value" ref={dialectsCounter.ref}>{dialectsCounter.count}</span>
                <span className="ent-orbit-label">{t.stats.dialects}</span>
              </div>
              <div className="ent-stats-orbit-item" style={{ "--angle": "180deg" }}>
                <span className="ent-orbit-value" ref={auditsCounter.ref}>{auditsCounter.count.toLocaleString()}+</span>
                <span className="ent-orbit-label">{t.stats.audits}</span>
              </div>
              <div className="ent-stats-orbit-item" style={{ "--angle": "270deg" }}>
                <span className="ent-orbit-value">&lt;2s</span>
                <span className="ent-orbit-label">{t.stats.response}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem/Solution Section */}
      <section className="ent-problem">
        <div className="ent-problem-inner">
          <div className="ent-problem-header">
            <h2 className="ent-section-title">{t.problem.title}</h2>
            <p className="ent-section-subtitle">{t.problem.subtitle}</p>
          </div>
          <div className="ent-problem-grid">
            {t.problem.problems.map((prob, i) => (
              <div key={i} className="ent-problem-card ent-problem-card--bad">
                <div className="ent-problem-icon">{prob.icon}</div>
                <h3>{prob.title}</h3>
                <p>{prob.desc}</p>
              </div>
            ))}
          </div>
          <div className="ent-solution-arrow">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </div>
          <div className="ent-solution-card">
            <div className="ent-solution-glow" />
            <h3 className="ent-solution-title">The ASRAR Solution</h3>
            <div className="ent-solution-features">
              <div className="ent-solution-feature">
                <span className="ent-solution-check">✓</span>
                <span><strong>99% Memory Recall</strong> — Cross-session memory with semantic retrieval</span>
              </div>
              <div className="ent-solution-feature">
                <span className="ent-solution-check">✓</span>
                <span><strong>13 Pure Arabic Dialects</strong> — Zero MSA contamination, 98% accuracy</span>
              </div>
              <div className="ent-solution-feature">
                <span className="ent-solution-check">✓</span>
                <span><strong>Self-Learning Engine</strong> — Improves with every conversation automatically</span>
              </div>
              <div className="ent-solution-feature">
                <span className="ent-solution-check">✓</span>
                <span><strong>Upselling Intelligence</strong> — Context-aware product recommendations</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section id="capabilities" className="ent-capabilities">
        <div className="ent-capabilities-inner">
          <div className="ent-capabilities-header">
            <h2 className="ent-section-title">{t.capabilities.title}</h2>
            <p className="ent-section-subtitle">{t.capabilities.subtitle}</p>
          </div>
          
          <div className="ent-capabilities-showcase">
            <div className="ent-capabilities-list">
              {t.capabilities.items.map((cap, i) => (
                <div
                  key={i}
                  className={`ent-capability-item ${activeCapability === i ? "ent-capability-item--active" : ""}`}
                  onClick={() => setActiveCapability(i)}
                >
                  <div className="ent-capability-score">{cap.score}</div>
                  <div className="ent-capability-info">
                    <h4>{cap.title}</h4>
                    <p>{cap.desc}</p>
                  </div>
                  <div className="ent-capability-bar">
                    <div
                      className="ent-capability-bar-fill"
                      style={{ width: activeCapability === i ? "100%" : "0%" }}
                    />
                  </div>
                </div>
              ))}
            </div>
            
            <div className="ent-capabilities-visual">
              <div className="ent-capability-display">
                <div className="ent-capability-display-ring" />
                <div className="ent-capability-display-content">
                  <span className="ent-capability-display-score">
                    {t.capabilities.items[activeCapability].score}
                  </span>
                  <span className="ent-capability-display-title">
                    {t.capabilities.items[activeCapability].title}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Competitor Comparison */}
          <div className="ent-comparison">
            <h3 className="ent-comparison-title">How We Compare</h3>
            <div className="ent-comparison-table">
              <div className="ent-comparison-header">
                <div className="ent-comparison-cell">Feature</div>
                <div className="ent-comparison-cell">ChatGPT/GPT-4</div>
                <div className="ent-comparison-cell">Other Chatbots</div>
                <div className="ent-comparison-cell ent-comparison-cell--highlight">ASRAR AI</div>
              </div>
              <div className="ent-comparison-row">
                <div className="ent-comparison-cell">Cross-session Memory</div>
                <div className="ent-comparison-cell ent-comparison-cell--bad">❌ No</div>
                <div className="ent-comparison-cell ent-comparison-cell--meh">⚠️ Basic</div>
                <div className="ent-comparison-cell ent-comparison-cell--good">✅ 97% Accuracy</div>
              </div>
              <div className="ent-comparison-row">
                <div className="ent-comparison-cell">Arabic Dialect Support</div>
                <div className="ent-comparison-cell ent-comparison-cell--meh">⚠️ MSA Only</div>
                <div className="ent-comparison-cell ent-comparison-cell--bad">❌ Poor</div>
                <div className="ent-comparison-cell ent-comparison-cell--good">✅ 13 Pure Dialects</div>
              </div>
              <div className="ent-comparison-row">
                <div className="ent-comparison-cell">Behavioral Detection</div>
                <div className="ent-comparison-cell ent-comparison-cell--bad">❌ No</div>
                <div className="ent-comparison-cell ent-comparison-cell--bad">❌ No</div>
                <div className="ent-comparison-cell ent-comparison-cell--good">✅ Pattern Analysis</div>
              </div>
              <div className="ent-comparison-row">
                <div className="ent-comparison-cell">Contradiction Detection</div>
                <div className="ent-comparison-cell ent-comparison-cell--bad">❌ No</div>
                <div className="ent-comparison-cell ent-comparison-cell--bad">❌ No</div>
                <div className="ent-comparison-cell ent-comparison-cell--good">✅ 94% Detection</div>
              </div>
              <div className="ent-comparison-row">
                <div className="ent-comparison-cell">Self-Learning</div>
                <div className="ent-comparison-cell ent-comparison-cell--bad">❌ No</div>
                <div className="ent-comparison-cell ent-comparison-cell--meh">⚠️ Limited</div>
                <div className="ent-comparison-cell ent-comparison-cell--good">✅ Advanced Engine</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section id="industries" className="ent-industries">
        <div className="ent-industries-inner">
          <div className="ent-industries-header">
            <h2 className="ent-section-title">{t.industries.title}</h2>
            <p className="ent-section-subtitle">{t.industries.subtitle}</p>
            <p className="ent-industries-disclaimer">{t.industries.disclaimer}</p>
          </div>
          <div className="ent-industries-grid">
            {industries.map((industry, i) => (
              <IndustryCard key={i} {...industry} delay={i * 100} />
            ))}
          </div>
        </div>
      </section>

      {/* Architecture Section */}
      <section className="ent-architecture">
        <div className="ent-architecture-inner">
          <div className="ent-architecture-header">
            <h2 className="ent-section-title">{t.architecture.title}</h2>
            <p className="ent-section-subtitle">{t.architecture.subtitle}</p>
          </div>
          <div className="ent-architecture-diagram">
            <div className="ent-arch-layer ent-arch-layer--1">
              <div className="ent-arch-label">Your Application</div>
              <div className="ent-arch-items">
                <span>Mobile App</span>
                <span>Website</span>
                <span>WhatsApp</span>
                <span>CRM</span>
                <span>POS</span>
              </div>
            </div>
            <div className="ent-arch-connector">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 5v14M5 12l7 7 7-7" />
              </svg>
            </div>
            <div className="ent-arch-layer ent-arch-layer--2">
              <div className="ent-arch-label">ASRAR API Gateway</div>
              <div className="ent-arch-items">
                <span>Authentication</span>
                <span>Rate Limiting</span>
                <span>Request Validation</span>
                <span>Usage Tracking</span>
              </div>
            </div>
            <div className="ent-arch-connector">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 5v14M5 12l7 7 7-7" />
              </svg>
            </div>
            <div className="ent-arch-layer ent-arch-layer--3">
              <div className="ent-arch-label">ASRAR Intelligence Engine</div>
              <div className="ent-arch-modules">
                <div className="ent-arch-module">
                  <span className="ent-arch-module-icon">🧠</span>
                  <span>Memory System</span>
                </div>
                <div className="ent-arch-module">
                  <span className="ent-arch-module-icon">📊</span>
                  <span>Behavioral Detection</span>
                </div>
                <div className="ent-arch-module">
                  <span className="ent-arch-module-icon">📈</span>
                  <span>Learning Engine</span>
                </div>
                <div className="ent-arch-module">
                  <span className="ent-arch-module-icon">🗣️</span>
                  <span>Dialect Engine</span>
                </div>
                <div className="ent-arch-module">
                  <span className="ent-arch-module-icon">💭</span>
                  <span>Emotional Analysis</span>
                </div>
                <div className="ent-arch-module">
                  <span className="ent-arch-module-icon">💰</span>
                  <span>Upselling Engine</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="ent-pricing">
        <div className="ent-pricing-inner">
          <div className="ent-pricing-header">
            <h2 className="ent-section-title">{t.pricing.title}</h2>
            <p className="ent-section-subtitle">{t.pricing.subtitle}</p>
          </div>
          <div className="ent-pricing-grid">
            <PricingTier
              tier="Starter"
              price="499"
              period="/month"
              features={[
                { text: "10,000 API calls/month", included: true },
                { text: "Basic memory (30-day retention)", included: true },
                { text: "3 Arabic dialects + English", included: true },
                { text: "Email support", included: true },
                { text: "Basic analytics", included: true },
                { text: "Contradiction detection", included: false },
                { text: "Custom persona training", included: false },
                { text: "White-label option", included: false },
              ]}
              ctaText="Schedule Demo"
              onCtaClick={() => document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' })}
            />
            <PricingTier
              tier="Professional"
              price="1,499"
              period="/month"
              isPopular
              features={[
                { text: "50,000 API calls/month", included: true },
                { text: "Full memory (unlimited retention)", included: true },
                { text: "All 13 Arabic dialects + English", included: true },
                { text: "Priority support (24hr)", included: true },
                { text: "Advanced analytics + insights", included: true },
                { text: "Contradiction & loop detection", included: true },
                { text: "Custom persona training", included: true },
                { text: "White-label option", included: false },
              ]}
              ctaText="Schedule Demo"
              onCtaClick={() => document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' })}
            />
            <PricingTier
              tier="Enterprise"
              price="Custom"
              period=""
              features={[
                { text: "Unlimited API calls", included: true },
                { text: "Full memory + cross-property sync", included: true },
                { text: "All dialects + custom training", included: true },
                { text: "Dedicated success manager", included: true },
                { text: "Custom SLA (99.9% uptime)", included: true },
                { text: "All behavioral features", included: true },
                { text: "White-label option", included: true },
                { text: "On-premise deployment", included: true },
              ]}
              ctaText="Contact Sales"
              onCtaClick={() => document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' })}
            />
          </div>
          <div className="ent-pricing-note">
            <p>{t.pricing.note}</p>
            <p className="ent-pricing-ip">{t.pricing.ip}</p>
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section className="ent-security">
        <div className="ent-security-inner">
          <div className="ent-security-header">
            <h2 className="ent-section-title">{t.security.title}</h2>
            <p className="ent-section-subtitle">{t.security.subtitle}</p>
          </div>
          <div className="ent-security-grid">
            {t.security.items.map((item, i) => (
              <div key={i} className="ent-security-card">
                <div className="ent-security-icon">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="ent-contact">
        <div className="ent-contact-inner">
          <div className="ent-contact-content">
            <div className="ent-contact-info">
              <h2 className="ent-section-title">{t.contact.title}</h2>
              <p className="ent-contact-desc">{t.contact.desc}</p>
              <div className="ent-contact-benefits">
                {t.contact.benefits.map((b, i) => (
                  <div key={i} className="ent-contact-benefit">
                    <span className="ent-contact-benefit-icon">{b.icon}</span>
                    <span>{b.text}</span>
                  </div>
                ))}
              </div>
              <div className="ent-contact-direct">
                <p><strong>{t.contact.ready}</strong></p>
                <a href="mailto:partners@asrarai.com" className="ent-contact-email-btn">
                  <span>📧</span> partners@asrarai.com
                </a>
                <p className="ent-contact-response">{t.contact.response}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="ent-footer">
        <div className="ent-footer-inner">
          <div className="ent-footer-brand">
            <span className="ent-footer-logo">ASRAR AI</span>
            <p className="ent-footer-tagline">{t.footer.tagline}</p>
          </div>
          <div className="ent-footer-stats">
            <div className="ent-footer-stat">
              <span className="ent-footer-stat-value">12M+</span>
              <span className="ent-footer-stat-label">{t.footer.tokens}</span>
            </div>
            <div className="ent-footer-stat">
              <span className="ent-footer-stat-value">99%</span>
              <span className="ent-footer-stat-label">{t.footer.accuracy}</span>
            </div>
            <div className="ent-footer-stat">
              <span className="ent-footer-stat-value">13</span>
              <span className="ent-footer-stat-label">{t.footer.dialects}</span>
            </div>
            <div className="ent-footer-stat">
              <span className="ent-footer-stat-value">50K+</span>
              <span className="ent-footer-stat-label">{t.footer.audits}</span>
            </div>
          </div>
          <div className="ent-footer-links">
            <a href="mailto:partners@asrarai.com">partners@asrarai.com</a>
            <span className="ent-footer-divider">•</span>
            <Link to="https://asrarai.com/policy">{t.footer.policy}</Link>
            <span className="ent-footer-divider">•</span>
            <Link to="https://asrarai.com">{t.footer.consumer}</Link>
          </div>
          <div className="ent-footer-copy">
            <p>© {new Date().getFullYear()} ASRAR AI. {t.footer.copyright}</p>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button className="ent-scroll-top" onClick={scrollToTop} aria-label="Scroll to top">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 19V5M5 12l7-7 7 7" />
          </svg>
        </button>
      )}
    </div>
  );
}
