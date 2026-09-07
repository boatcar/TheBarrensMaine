/* ==========================================================================
   Parallax Starter - Free HTML CSS Template

TemplateMo 612 Parallax Starter

https://templatemo.com/tm-612-parallax-starter

   ========================================================================== */

(function () {
    'use strict';

    // --- Elements ---
    var nav = document.getElementById('templatemo-nav');
    var navToggle = document.getElementById('navToggle');
    var navLinks = document.getElementById('navLinks');
    var navItems = document.querySelectorAll('.nav-links a');
    var sections = document.querySelectorAll('.parallax-section');
    var parallaxBgs = document.querySelectorAll('.parallax-bg');
    var revealElements = document.querySelectorAll('.section-content');
    var footerRevealElements = document.querySelectorAll('#templatemo-footer .footer-inner > *');
    var footer = document.getElementById('templatemo-footer');

    if (footer) {
        var footerInner = footer.querySelector('.footer-inner');
        if (footerInner && !footerInner.querySelector('.footer-stay-wild')) {
            var svgNamespace = 'http://www.w3.org/2000/svg';
            var stayWildMark = document.createElementNS(svgNamespace, 'svg');
            var arcPath = document.createElementNS(svgNamespace, 'path');
            var arcText = document.createElementNS(svgNamespace, 'text');
            var arcTextPath = document.createElementNS(svgNamespace, 'textPath');
            var subtitle = document.createElementNS(svgNamespace, 'text');

            stayWildMark.setAttribute('class', 'footer-stay-wild');
            stayWildMark.setAttribute('viewBox', '0 0 220 80');
            stayWildMark.setAttribute('role', 'img');
            stayWildMark.setAttribute('aria-label', 'Stay Wild');
            arcPath.setAttribute('id', 'footerStayWildArc');
            arcPath.setAttribute('d', 'M 18 64 Q 110 8 202 64');
            arcPath.setAttribute('fill', 'none');
            arcTextPath.setAttribute('href', '#footerStayWildArc');
            arcTextPath.setAttribute('startOffset', '50%');
            arcTextPath.setAttribute('text-anchor', 'middle');
            arcTextPath.textContent = 'STAY WILD';
            subtitle.setAttribute('class', 'footer-stay-wild-subtitle');
            subtitle.setAttribute('x', '110');
            subtitle.setAttribute('y', '76.2');
            subtitle.setAttribute('text-anchor', 'middle');
            subtitle.textContent = 'MAINE BLUEBERRIES';

            arcText.appendChild(arcTextPath);
            stayWildMark.appendChild(arcPath);
            stayWildMark.appendChild(arcText);
            stayWildMark.appendChild(subtitle);
            footerInner.appendChild(stayWildMark);
        }
    }

    footerRevealElements = document.querySelectorAll('#templatemo-footer .footer-inner > *');

    // --- Detect mobile ---
    var isMobile = /Android|iPhone|iPad|iPod|webOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
                   || window.innerWidth <= 768;

    // =============================================
    // Smooth Parallax Engine
    // =============================================
    // How it works:
    // - Each .parallax-bg is 200% the height of the viewport
    //   and offset by -50% so there's plenty of image above
    //   and below to translate into.
    // - As the user scrolls, we calculate how far the section
    //   midpoint is from the viewport center (a value from -1 to +1).
    // - We multiply that by a large pixel range (half the viewport height)
    //   so the background shifts dramatically relative to the content.
    // - data-speed controls intensity: 0.5 = half viewport travel range.

    var ticking = false;

    function updateParallax() {
        if (isMobile) return;

        var scrollTop = window.pageYOffset;
        var windowHeight = window.innerHeight;

        parallaxBgs.forEach(function (bg) {
            var section = bg.parentElement;
            var rect = section.getBoundingClientRect();

            // Skip sections far outside viewport
            if (rect.bottom < -300 || rect.top > windowHeight + 300) {
                return;
            }

            var speed = parseFloat(bg.getAttribute('data-speed')) || 0.5;

            // How far is the section center from the viewport center?
            // sectionCenterY: vertical center of the section in viewport coords
            var sectionCenterY = rect.top + rect.height / 2;
            var viewportCenterY = windowHeight / 2;

            // offset: negative when section center is above viewport center (scrolled past)
            //         positive when section center is below viewport center (not yet reached)
            var offset = sectionCenterY - viewportCenterY;

            // Normalize to a -1 to +1 range based on how far through the viewport
            // the section has traveled. Using windowHeight + section height as the
            // total travel distance ensures full range coverage.
            var totalTravel = windowHeight + rect.height;
            var normalized = offset / (totalTravel / 2); // -1 to +1

            // Clamp
            normalized = Math.max(-1, Math.min(1, normalized));

            // The maximum pixel displacement — large value for visible effect
            // speed=0.5 means the bg can travel up to 50% of the viewport height
            var maxShift = windowHeight * speed;

            // Apply translation — bg moves in the SAME direction as the offset
            // which means it moves SLOWER than the scroll (parallax lag)
            var translateY = normalized * maxShift;

            bg.style.transform = 'translate3d(0,' + translateY.toFixed(1) + 'px,0)';
        });

        ticking = false;
    }

    function onScroll() {
        if (!ticking) {
            window.requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }

    if (!isMobile) {
        window.addEventListener('scroll', onScroll, { passive: true });
        updateParallax();
    }

    // Recalculate on resize
    window.addEventListener('resize', function () {
        isMobile = window.innerWidth <= 768;
        if (!isMobile) {
            updateParallax();
        } else {
            parallaxBgs.forEach(function (bg) {
                bg.style.transform = 'translate3d(0,0,0)';
            });
        }
    });

    // --- Navigation Scroll Effect ---
    function handleNavScroll() {
        if (window.scrollY > 80) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleNavScroll, { passive: true });
    handleNavScroll();

    // --- Mobile Toggle ---
    navToggle.addEventListener('click', function () {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('open');
    });

    navItems.forEach(function (link) {
        link.addEventListener('click', function () {
            navToggle.classList.remove('active');
            navLinks.classList.remove('open');
        });
    });

    // --- Active Link on Scroll ---
    function updateActiveLink() {
        var scrollPos = window.scrollY + window.innerHeight / 3;

        sections.forEach(function (section) {
            var top = section.offsetTop;
            var height = section.offsetHeight;
            var id = section.getAttribute('id');

            if (scrollPos >= top && scrollPos < top + height) {
                navItems.forEach(function (link) {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveLink, { passive: true });
    updateActiveLink();

    // --- Scroll Reveal ---
    revealElements.forEach(function (el) {
        el.classList.add('reveal');
    });

    footerRevealElements.forEach(function (el) {
        el.classList.add('reveal');
    });

    function checkReveal() {
        var windowHeight = window.innerHeight;
        var revealPoint = 120;

        revealElements.forEach(function (el) {
            var elementTop = el.getBoundingClientRect().top;
            if (elementTop < windowHeight - revealPoint) {
                el.classList.add('visible');
            }
        });

        footerRevealElements.forEach(function (el) {
            var elementTop = el.getBoundingClientRect().top;
            if (elementTop < windowHeight - 12) {
                el.classList.add('visible');
            }
        });
    }

    window.addEventListener('scroll', checkReveal, { passive: true });
    checkReveal();

    // --- Before / After Image Slider ---
    var compareSliders = document.querySelectorAll('.image-slider-container');
    compareSliders.forEach(function (compareSlider) {
        var compareRange = compareSlider.querySelector('.slider-input');
        var beforeImage = compareSlider.querySelector('.image-before');
        var sliderDivider = compareSlider.querySelector('.slider-divider');

        if (!compareRange || !beforeImage || !sliderDivider) {
            return;
        }

        function updateCompareSlider(value) {
            var percent = Math.min(Math.max(Number(value) || 0, 0), 100);
            beforeImage.style.clipPath = 'inset(0 0 0 ' + percent + '%)';
            beforeImage.style.webkitClipPath = 'inset(0 0 0 ' + percent + '%)';
            sliderDivider.style.left = percent + '%';
            compareRange.value = String(percent);
        }

        function setFromPointer(event) {
            var rect = compareSlider.getBoundingClientRect();
            var x = (event.clientX || (event.touches && event.touches[0] && event.touches[0].clientX) || rect.left) - rect.left;
            var percent = ((x / rect.width) * 100);
            updateCompareSlider(percent);
        }

        compareRange.addEventListener('input', function (event) {
            updateCompareSlider(event.target.value);
        });

        compareSlider.addEventListener('pointerdown', function (event) {
            setFromPointer(event);
        });

        compareSlider.addEventListener('pointermove', function (event) {
            if (event.pressure > 0 || event.buttons === 1 || event.pointerType === 'touch') {
                setFromPointer(event);
            }
        });

        compareSlider.addEventListener('touchstart', function (event) {
            setFromPointer(event.touches[0]);
        }, { passive: true });

        compareSlider.addEventListener('touchmove', function (event) {
            event.preventDefault();
            setFromPointer(event.touches[0]);
        }, { passive: false });

        updateCompareSlider(compareRange.value);
    });

    // --- Vision Intro Note Toggle ---
    var visionToggle = document.querySelector('.vision-intro-toggle');
    if (visionToggle) {
        var visionAnswer = visionToggle.nextElementSibling;

        if (visionAnswer && visionAnswer.classList.contains('vision-note-answer')) {
            visionAnswer.style.maxHeight = '0px';
            visionAnswer.style.opacity = '0';
        }

        visionToggle.addEventListener('click', function () {
            var isOpen = visionToggle.getAttribute('aria-expanded') === 'true';

            if (visionAnswer && visionAnswer.classList.contains('vision-note-answer')) {
                if (!isOpen) {
                    visionToggle.setAttribute('aria-expanded', 'true');
                    visionAnswer.style.maxHeight = visionAnswer.scrollHeight + 'px';
                    visionAnswer.style.opacity = '1';
                } else {
                    visionToggle.setAttribute('aria-expanded', 'false');
                    visionAnswer.style.maxHeight = '0px';
                    visionAnswer.style.opacity = '0';
                }
            }
        });
    }

    // --- FAQ Accordion ---
    var faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(function (question) {
        var answer = question.nextElementSibling;

        if (answer && answer.classList.contains('faq-answer')) {
            answer.style.maxHeight = '0px';
            answer.style.opacity = '0';
        }

        question.addEventListener('click', function () {
            var isOpen = question.getAttribute('aria-expanded') === 'true';

            faqQuestions.forEach(function (item) {
                item.setAttribute('aria-expanded', 'false');

                var itemAnswer = item.nextElementSibling;
                if (itemAnswer && itemAnswer.classList.contains('faq-answer')) {
                    itemAnswer.style.maxHeight = '0px';
                    itemAnswer.style.opacity = '0';
                }
            });

            if (!isOpen) {
                question.setAttribute('aria-expanded', 'true');
                if (answer && answer.classList.contains('faq-answer')) {
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                    answer.style.opacity = '1';
                }
            } else if (answer && answer.classList.contains('faq-answer')) {
                answer.style.maxHeight = '0px';
                answer.style.opacity = '0';
            }
        });
    });

    // --- Contact Form ---
    var contactForm = document.getElementById('contactForm');
    if (contactForm) {
        var contactScriptUrl = 'https://script.google.com/macros/s/AKfycbwVhNBALd6s23vJPhJRHOZBdpwHVKOOpbOh_vzUWMk-dSN1cfOtu29ynyyGnUQ8LuOH/exec';
        var contactSubmitBtn = contactForm.querySelector('button[type="submit"]');

        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            var nameField = document.getElementById('contact-name');
            var emailField = document.getElementById('contact-email');
            var messageField = document.getElementById('contact-message');

            var payload = {
                name: nameField ? nameField.value.trim() : '',
                email: emailField ? emailField.value.trim() : '',
                message: messageField ? messageField.value.trim() : ''
            };

            if (contactSubmitBtn) {
                contactSubmitBtn.disabled = true;
            }

            fetch(contactScriptUrl, {
                method: 'POST',
                mode: 'no-cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            })
                .then(function () {
                    alert('Thank you for your message! We will get back to you soon.');
                    contactForm.reset();
                })
                .catch(function () {
                    alert('Something went wrong sending your message. Please try again.');
                })
                .finally(function () {
                    if (contactSubmitBtn) {
                        contactSubmitBtn.disabled = false;
                    }
                });
        });
    }

    // --- Follow the Build Popup ---
    var popupOverlay = document.getElementById('followBuildPopup');
    if (popupOverlay) {
        var popupForm = document.getElementById('popupForm');
        var popupClose = document.getElementById('popupClose');
        var popupShown = sessionStorage.getItem('followBuildPopupShown') === 'true';

        var showPopup = function () {
            if (popupShown) {
                return;
            }
            popupShown = true;
            sessionStorage.setItem('followBuildPopupShown', 'true');
            popupOverlay.hidden = false;
            requestAnimationFrame(function () {
                requestAnimationFrame(function () {
                    popupOverlay.classList.add('is-visible');
                });
            });
        };

        var hidePopup = function () {
            popupOverlay.classList.remove('is-visible');
            setTimeout(function () {
                popupOverlay.hidden = true;
            }, 300);
        };

        if (!popupShown) {
            if (document.body.classList.contains('home-page-body')) {
                window.addEventListener('scroll', function onFirstScroll() {
                    window.removeEventListener('scroll', onFirstScroll);
                    showPopup();
                }, { once: true, passive: true });
            } else {
                setTimeout(showPopup, 1000);
            }
        }

        if (popupClose) {
            popupClose.addEventListener('click', hidePopup);
        }

        popupOverlay.addEventListener('click', function (e) {
            if (e.target === popupOverlay) {
                hidePopup();
            }
        });

        if (popupForm) {
            var popupSignup = document.getElementById('popupSignup');
            var popupSuccess = document.getElementById('popupSuccess');
            var popupEmailInput = document.getElementById('popup-email');
            var popupNameInput = document.getElementById('popup-name');
            var popupJoinBtn = popupForm.querySelector('.popup-join-btn');
            var mlScriptUrl = 'https://script.google.com/macros/s/AKfycbzAM-TQdeUNj7VB4Rqh8PYVdOXUNkw2dRpvgwoesKzwM-zAk9BY8AjniLg788Dnq9B4/exec';

            popupForm.addEventListener('submit', function (e) {
                e.preventDefault();

                var email = popupEmailInput ? popupEmailInput.value.trim() : '';
                var name = popupNameInput ? popupNameInput.value.trim() : '';
                if (!email) {
                    return;
                }

                if (popupJoinBtn) {
                    popupJoinBtn.disabled = true;
                }

                fetch(mlScriptUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ type: 'newsletter', email: email, name: name })
                })
                    .then(function (response) {
                        return response.json();
                    })
                    .then(function (result) {
                        if (popupJoinBtn) {
                            popupJoinBtn.disabled = false;
                        }
                        if (!result || !result.success) {
                            alert('Something went wrong signing you up. Please try again.');
                            return;
                        }
                        popupForm.reset();
                        if (popupSignup && popupSuccess) {
                            popupSignup.hidden = true;
                            popupSuccess.hidden = false;
                            requestAnimationFrame(function () {
                                popupSuccess.classList.add('is-visible');
                            });
                        }
                    })
                    .catch(function () {
                        if (popupJoinBtn) {
                            popupJoinBtn.disabled = false;
                        }
                        alert('Something went wrong signing you up. Please try again.');
                    });
            });
        }
    }

})();
