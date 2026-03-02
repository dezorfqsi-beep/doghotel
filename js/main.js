/* ============================================
   فندق الكلاب الفاخر - هونغ كونغ
   الوظائف التفاعلية الرئيسية
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    // تهيئة جميع الوظائف
    initHeader();
    initMobileMenu();
    initScrollReveal();
    initSmoothScroll();
    initFormValidation();
    initAnimations();
});

/* ============================================
   الهيدر التفاعلي
   ============================================ */
function initHeader() {
    const header = document.querySelector('.header');
    
    if (!header) return;

    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // تغيير لون الهيدر عند التمرير
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        window.addEventListener('scroll', function() {
            const heroHeight = heroSection.offsetHeight;
            if (window.scrollY > heroHeight / 2) {
                header.style.background = 'rgba(255, 255, 255, 0.98)';
            } else {
                header.style.background = 'rgba(255, 255, 255, 0.95)';
            }
        });
    }
}

/* ============================================
   القائمة المتنقلة (الموبايل)
   ============================================ */
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!menuToggle || !navMenu) return;

    // فتح/إغلاق القائمة
    menuToggle.addEventListener('click', function() {
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // إغلاق القائمة عند النقر على رابط
    navLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // إغلاق القائمة عند النقر خارجها
    document.addEventListener('click', function(e) {
        if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

/* ============================================
   تأثيرات الكشف عند التمرير
   ============================================ */
function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');

    if (reveals.length === 0) return;

    const revealOnScroll = function() {
        reveals.forEach(function(element) {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            const revealPoint = 150;

            if (elementTop < windowHeight - revealPoint) {
                element.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // تشغيل مرة واحدة عند التحميل
}

/* ============================================
   التمرير السلس
   ============================================ */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(function(link) {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#') return;

            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                
                const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* ============================================
   التحقق من صحة النموذج
   ============================================ */
function initFormValidation() {
    const forms = document.querySelectorAll('.contact-form');

    forms.forEach(function(form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = form.querySelector('input[name="name"]');
            const phone = form.querySelector('input[name="phone"]');
            const email = form.querySelector('input[name="email"]');
            const message = form.querySelector('textarea[name="message"]');

            let isValid = true;
            let errors = [];

            // التحقق من الاسم
            if (name && name.value.trim() === '') {
                isValid = false;
                errors.push('الرجاء إدخال الاسم');
                name.style.borderColor = '#e74c3c';
            } else if (name) {
                name.style.borderColor = '#e8e8e8';
            }

            // التحقق من رقم الهاتف
            if (phone && phone.value.trim() === '') {
                isValid = false;
                errors.push('الرجاء إدخال رقم الهاتف');
                phone.style.borderColor = '#e74c3c';
            } else if (phone && !/^[\d\s\+\-\(\)]+$/.test(phone.value)) {
                isValid = false;
                errors.push('الرجاء إدخال رقم هاتف صحيح');
                phone.style.borderColor = '#e74c3c';
            } else if (phone) {
                phone.style.borderColor = '#e8e8e8';
            }

            // التحقق من البريد الإلكتروني
            if (email && email.value.trim() === '') {
                isValid = false;
                errors.push('الرجاء إدخال البريد الإلكتروني');
                email.style.borderColor = '#e74c3c';
            } else if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
                isValid = false;
                errors.push('الرجاء إدخال بريد إلكتروني صحيح');
                email.style.borderColor = '#e74c3c';
            } else if (email) {
                email.style.borderColor = '#e8e8e8';
            }

            // التحقق من الرسالة
            if (message && message.value.trim() === '') {
                isValid = false;
                errors.push('الرجاء إدخال الرسالة');
                message.style.borderColor = '#e74c3c';
            } else if (message) {
                message.style.borderColor = '#e8e8e8';
            }

            if (isValid) {
                // عرض رسالة النجاح
                showNotification('شكراً لك! تم إرسال رسالتك بنجاح.', 'success');
                form.reset();
            } else {
                // عرض رسالة الخطأ
                showNotification(errors[0], 'error');
            }
        });
    });
}

/* ============================================
   إظهار الإشعارات
   ============================================ */
function showNotification(message, type) {
    // إزالة إشعار قديم
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // إنشاء الإشعار
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span class="notification-icon">
            ${type === 'success' ? '✓' : '✕'}
        </span>
        <span class="notification-message">${message}</span>
    `;

    // إضافة الأنماط
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        left: 50%;
        transform: translateX(-50%);
        padding: 15px 30px;
        border-radius: 10px;
        color: white;
        font-weight: 600;
        z-index: 10000;
        animation: fadeInDown 0.3s ease;
        background: ${type === 'success' ? '#27ae60' : '#e74c3c'};
        box-shadow: 0 5px 20px rgba(0,0,0,0.2);
    `;

    document.body.appendChild(notification);

    // إخفاء الإشعار بعد 3 ثوانٍ
    setTimeout(function() {
        notification.style.animation = 'fadeInUp 0.3s ease';
        setTimeout(function() {
            notification.remove();
        }, 300);
    }, 3000);
}

/* ============================================
   الوظائف الإضافية للتأثيرات
   ============================================ */
function initAnimations() {
    // تأثير hover على البطاقات
    const cards = document.querySelectorAll('.service-card, .package-card, .about-feature');
    
    cards.forEach(function(card) {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // تأثير العدادات
    initCounters();

    // تأثير القائمة النشطة
    initActiveNavLink();
}

/* ============================================
   العدادات
   ============================================ */
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    if (counters.length === 0) return;

    const animateCounter = function(counter) {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const updateCounter = function() {
            current += step;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };

        updateCounter();
    };

    // تشغيل العدادات عند ظهورها
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(function(counter) {
        observer.observe(counter);
    });
}

/* ============================================
   الرابط النشط في القائمة
   ============================================ */
function initActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    if (sections.length === 0 || navLinks.length === 0) return;

    window.addEventListener('scroll', function() {
        let current = '';

        sections.forEach(function(section) {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(function(link) {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

/* ============================================
   دعم اللغة العربية (RTL)
   ============================================ */
function initRTLSupport() {
    const isRTL = document.documentElement.getAttribute('dir') === 'rtl';
    
    if (isRTL) {
        // تعديل المواقع للعربية
        const heroOverlay = document.querySelector('.hero-overlay');
        if (heroOverlay) {
            heroOverlay.style.left = '0';
            heroOverlay.style.right = 'auto';
            heroOverlay.style.background = 'linear-gradient(to right, rgba(26, 26, 46, 0.9), transparent)';
        }
    }
}

/* ============================================
   تحميل الصور البطيئة
   ============================================ */
function initLazyLoad() {
    const images = document.querySelectorAll('img[data-src]');
    
    if (images.length === 0) return;

    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(function(img) {
        imageObserver.observe(img);
    });
}

/* ============================================
   إضافة الوظائف العامة
   ============================================ */
window.addEventListener('load', function() {
    // إزالة شاشة التحميل
    const loader = document.querySelector('.loader-wrapper');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(function() {
            loader.remove();
        }, 500);
    }
});

// دالة للتمرير إلى قسم معين
function scrollToSection(sectionId) {
    const section = document.querySelector(sectionId);
    if (section) {
        const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
        const sectionTop = section.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        
        window.scrollTo({
            top: sectionTop,
            behavior: 'smooth'
        });
    }
}

// دالة لفتح نموذج الحجز
function openBookingModal() {
    const modal = document.querySelector('.booking-modal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

// دالة لإغلاق نموذج الحجز
function closeBookingModal() {
    const modal = document.querySelector('.booking-modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// تصدير الدوال للاستخدام العام
window.scrollToSection = scrollToSection;
window.openBookingModal = openBookingModal;
window.closeBookingModal = closeBookingModal;
