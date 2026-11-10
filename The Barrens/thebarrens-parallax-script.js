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
    var parallaxBgs = document.querySelectorAll('.parallax-bg, .hero-background-video');
    var revealElements = document.querySelectorAll('.section-content');
    var homeLinkSections = document.querySelectorAll('.home-link-section');
    var footerRevealElements = document.querySelectorAll('#templatemo-footer .footer-inner > *');
    var footer = document.getElementById('templatemo-footer');
    var heroVideo = document.querySelector('.hero-background-video');

    if (heroVideo) {
        heroVideo.defaultMuted = true;
        heroVideo.muted = true;
        heroVideo.playsInline = true;

        function startHeroVideo() {
            if (heroVideo.paused) {
                var playAttempt = heroVideo.play();
                if (playAttempt) {
                    playAttempt.catch(function () {});
                }
            }
        }

        heroVideo.addEventListener('canplay', startHeroVideo);
        window.addEventListener('pageshow', startHeroVideo);
        document.addEventListener('visibilitychange', function () {
            if (!document.hidden) {
                startHeroVideo();
            }
        });
        document.addEventListener('touchstart', startHeroVideo, { passive: true, once: true });
        startHeroVideo();
    }

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

    function setRevealProgress(element, progress, distance) {
        var clampedProgress = Math.max(0, Math.min(1, progress));
        element.style.opacity = clampedProgress.toFixed(3);
        element.style.transform = 'translate3d(0,' + ((1 - clampedProgress) * distance).toFixed(1) + 'px,0)';
    }

    function updateHomePageTransitions() {
        var windowHeight = window.innerHeight;
        var revealDistance = windowHeight * (isMobile ? 0.18 : 0.45);
        var hero = document.querySelector('.hero-brand-section');
        var visionSection = document.querySelector('.home-link-vision');

        if (hero) {
            hero.style.setProperty('--scroll-cue-opacity', Math.max(0, 1 - (window.pageYOffset / 80)).toFixed(3));
        }

        if (visionSection) {
            var visionParallaxProgress = Math.max(0, Math.min(1, window.pageYOffset / (windowHeight * 0.35)));
            var visionParallaxDistance = isMobile ? 32 : 64;
            visionSection.style.setProperty('--vision-parallax-offset', (-visionParallaxProgress * visionParallaxDistance).toFixed(1) + 'px');
        }

        homeLinkSections.forEach(function (section) {
            var sectionTop = section.getBoundingClientRect().top;
            var card = section.querySelector('.home-link-card');
            var isVision = section.classList.contains('home-link-vision');
            var progress = (windowHeight - sectionTop) / revealDistance;
            var clampedProgress = Math.max(0, Math.min(1, progress));
            var scale = 0.985 + (clampedProgress * 0.015);
            var clip = (1 - clampedProgress) * 12;

            card.style.opacity = isVision ? '1' : clampedProgress.toFixed(3);
            card.style.transform = 'translate3d(0,' + ((1 - clampedProgress) * 140).toFixed(1) + 'px,0) scale(' + scale.toFixed(3) + ')';
            card.style.clipPath = 'inset(' + clip.toFixed(2) + '% 0 0)';

            setRevealProgress(section.querySelector('.home-link-number'), (clampedProgress - 0.12) / 0.38, 24);
            setRevealProgress(section.querySelector('h2'), (clampedProgress - 0.22) / 0.42, 24);
            setRevealProgress(section.querySelector('.home-link-action'), (clampedProgress - 0.34) / 0.46, 24);

            if (isVision) {
                section.querySelector('.home-link-number').style.opacity = '1';
                section.querySelector('h2').style.opacity = '1';
                section.querySelector('.home-link-action').style.opacity = '1';
            }
        });
    }

    function updateParallax() {
        updateHomePageTransitions();

        if (isMobile) {
            ticking = false;
            return;
        }

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

    window.addEventListener('scroll', onScroll, { passive: true });

    if (!isMobile) {
        updateParallax();
    } else {
        updateHomePageTransitions();
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

    homeLinkSections.forEach(function (section) {
        section.classList.add('home-scroll-reveal');
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
    updateHomePageTransitions();

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

    // --- Agritourism Notice Reveal ---
    var detailNotice = document.querySelector('.detail-notice');
    if (detailNotice) {
        var detailNoticeSummary = detailNotice.querySelector('summary');
        var detailNoticeReveal = detailNotice.querySelector('.detail-notice-reveal');
        var detailNoticeAnimation = null;
        var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

        if (detailNoticeSummary && detailNoticeReveal) {
            detailNoticeSummary.addEventListener('click', function (event) {
                event.preventDefault();

                if (detailNoticeAnimation) {
                    detailNoticeAnimation.cancel();
                    detailNoticeAnimation = null;
                }

                if (reduceMotion.matches) {
                    detailNotice.open = !detailNotice.open;
                    return;
                }

                if (!detailNotice.open) {
                    detailNotice.open = true;
                    detailNoticeAnimation = detailNoticeReveal.animate([
                        { height: '0px', opacity: 0, transform: 'translateY(-12px)' },
                        { height: detailNoticeReveal.scrollHeight + 'px', opacity: 1, transform: 'translateY(0)' }
                    ], {
                        duration: 420,
                        easing: 'cubic-bezier(0.22, 1, 0.36, 1)'
                    });
                } else {
                    detailNoticeAnimation = detailNoticeReveal.animate([
                        { height: detailNoticeReveal.offsetHeight + 'px', opacity: 1, transform: 'translateY(0)' },
                        { height: '0px', opacity: 0, transform: 'translateY(-12px)' }
                    ], {
                        duration: 300,
                        easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
                    });
                    detailNoticeAnimation.addEventListener('finish', function () {
                        detailNotice.open = false;
                    }, { once: true });
                }

                detailNoticeAnimation.addEventListener('finish', function () {
                    detailNoticeAnimation = null;
                }, { once: true });
            });
        }
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

    // --- U Pick booking preview ---
    var bookingForm = document.getElementById('upickBookingForm');
    if (bookingForm) {
        var bookingState = {
            type: 'standard',
            day: null,
            time: null,
            adults: 1,
            children: 0
        };
        var standardTimes = [
            '6:00 AM', '6:10 AM', '6:20 AM', '6:30 AM',
            '9:00 AM', '9:10 AM', '9:20 AM', '9:30 AM',
            '12:00 PM', '12:10 PM', '12:20 PM', '12:30 PM',
            '3:00 PM', '3:10 PM', '3:20 PM', '3:30 PM',
            '6:00 PM', '6:10 PM'
        ];
        var privateTimes = ['6:00 AM', '9:00 AM', '12:00 PM', '3:00 PM', '6:00 PM'];
        var calendarDays = document.getElementById('bookingCalendarDays');
        var timeFieldset = bookingForm.querySelector('.booking-times-fieldset');
        var timeGrid = document.getElementById('bookingTimeGrid');
        var timePrompt = document.getElementById('bookingTimePrompt');
        var experienceButtons = bookingForm.querySelectorAll('[data-booking-type]');
        var counterButtons = bookingForm.querySelectorAll('[data-counter]');
        var adultsOutput = document.getElementById('bookingAdults');
        var childrenOutput = document.getElementById('bookingChildren');
        var adultRate = document.getElementById('bookingAdultRate');
        var reviewExperience = document.getElementById('bookingReviewExperience');
        var reviewDate = document.getElementById('bookingReviewDate');
        var reviewTime = document.getElementById('bookingReviewTime');
        var reviewParty = document.getElementById('bookingReviewParty');
        var reviewTotal = document.getElementById('bookingReviewTotal');
        var previewSubmit = document.getElementById('bookingPreviewSubmit');
        var previewMessage = document.getElementById('bookingPreviewMessage');
        var bookingModal = document.getElementById('reserve');
        var bookingLaunchButtons = document.querySelectorAll('[data-booking-open]');
        var bookingCloseButton = bookingModal.querySelector('[data-booking-close]');
        var lastBookingTrigger = null;
        var bookingCloseTimer = null;

        function pluralize(count, singular, plural) {
            return count + ' ' + (count === 1 ? singular : plural);
        }

        function formatBookingDate(day) {
            return new Date(2027, 7, day).toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric'
            });
        }

        function updateCounterButtons() {
            var totalGuests = bookingState.adults + bookingState.children;

            counterButtons.forEach(function (button) {
                var counter = button.getAttribute('data-counter');
                var direction = button.getAttribute('data-direction');
                var count = bookingState[counter];
                button.disabled = (direction === 'decrease' && count <= (counter === 'adults' ? 1 : 0))
                    || (direction === 'increase' && totalGuests >= 5);
            });
        }

        function updateBookingReview() {
            var partyParts = [pluralize(bookingState.adults, 'adult', 'adults')];
            if (bookingState.children > 0) {
                partyParts.push(pluralize(bookingState.children, 'child', 'children'));
            }

            adultsOutput.textContent = bookingState.adults;
            childrenOutput.textContent = bookingState.children;
            adultRate.textContent = bookingState.type === 'private' ? '/ included' : '/ $15 each';
            reviewExperience.textContent = bookingState.type === 'private'
                ? 'Private Barrens Pass'
                : 'Standard field reservation';
            reviewDate.textContent = bookingState.day ? formatBookingDate(bookingState.day) : 'Choose a date';
            reviewTime.textContent = bookingState.time || 'Choose a time';
            reviewParty.textContent = partyParts.join(', ');
            reviewTotal.textContent = bookingState.type === 'private'
                ? '$300'
                : '$' + (bookingState.adults * 15);
            previewSubmit.disabled = !(bookingState.day && bookingState.time);
            updateCounterButtons();
        }

        function isSampleTimeSoldOut(day, index) {
            if (bookingState.type === 'private') {
                return (day + (index * 2)) % 9 === 0;
            }
            return (day + index) % 7 === 0;
        }

        function renderBookingTimes() {
            var times = bookingState.type === 'private' ? privateTimes : standardTimes;
            timeGrid.innerHTML = '';

            if (!bookingState.day) {
                timeFieldset.disabled = true;
                timePrompt.textContent = 'Select an available date to see arrival times.';
                return;
            }

            timeFieldset.disabled = false;
            timePrompt.textContent = bookingState.type === 'private'
                ? 'Private Pass times reserve the entire two-hour wave.'
                : 'Each arrival time holds one vehicle for a two-hour reservation.';

            times.forEach(function (time, index) {
                var timeButton = document.createElement('button');
                var soldOut = isSampleTimeSoldOut(bookingState.day, index);
                timeButton.type = 'button';
                timeButton.className = 'booking-time-option';
                timeButton.textContent = time;
                timeButton.disabled = soldOut;
                timeButton.title = soldOut ? time + ' is sold out in this preview' : 'Choose ' + time;

                if (time === bookingState.time) {
                    timeButton.classList.add('is-selected');
                    timeButton.setAttribute('aria-pressed', 'true');
                } else {
                    timeButton.setAttribute('aria-pressed', 'false');
                }

                timeButton.addEventListener('click', function () {
                    bookingState.time = time;
                    previewMessage.textContent = '';
                    renderBookingTimes();
                    updateBookingReview();
                });
                timeGrid.appendChild(timeButton);
            });
        }

        function selectBookingDay(day, button) {
            bookingState.day = day;
            bookingState.time = null;
            previewMessage.textContent = '';
            calendarDays.querySelectorAll('.booking-calendar-day').forEach(function (dayButton) {
                var isSelected = dayButton === button;
                dayButton.classList.toggle('is-selected', isSelected);
                dayButton.setAttribute('aria-pressed', isSelected ? 'true' : 'false');
            });
            renderBookingTimes();
            updateBookingReview();
        }

        for (var day = 1; day <= 31; day += 1) {
            var date = new Date(2027, 7, day);
            var dateButton = document.createElement('button');
            dateButton.type = 'button';
            dateButton.className = 'booking-calendar-day';
            dateButton.textContent = day;
            dateButton.disabled = date.getDay() === 0;
            dateButton.setAttribute('aria-label', formatBookingDate(day) + (dateButton.disabled ? ', closed' : ', available'));
            dateButton.setAttribute('aria-pressed', 'false');

            (function (bookingDay, bookingDayButton) {
                bookingDayButton.addEventListener('click', function () {
                    selectBookingDay(bookingDay, bookingDayButton);
                });
            }(day, dateButton));

            calendarDays.appendChild(dateButton);
        }

        experienceButtons.forEach(function (button) {
            button.addEventListener('click', function () {
                bookingState.type = button.getAttribute('data-booking-type');
                bookingState.time = null;
                previewMessage.textContent = '';
                experienceButtons.forEach(function (option) {
                    var isSelected = option === button;
                    option.classList.toggle('is-selected', isSelected);
                    option.setAttribute('aria-pressed', isSelected ? 'true' : 'false');
                });
                renderBookingTimes();
                updateBookingReview();
            });
        });

        counterButtons.forEach(function (button) {
            button.addEventListener('click', function () {
                var counter = button.getAttribute('data-counter');
                var direction = button.getAttribute('data-direction');
                bookingState[counter] += direction === 'increase' ? 1 : -1;
                previewMessage.textContent = '';
                updateBookingReview();
            });
        });

        bookingForm.addEventListener('submit', function (event) {
            event.preventDefault();
            previewMessage.textContent = 'Preview complete. Live checkout will open here once secure booking is connected.';
        });

        function openBookingModal(trigger) {
            var requestedType = trigger.getAttribute('data-booking-open') || 'standard';
            var requestedOption = bookingForm.querySelector('[data-booking-type="' + requestedType + '"]');
            lastBookingTrigger = trigger;
            clearTimeout(bookingCloseTimer);

            if (requestedOption) {
                requestedOption.click();
            }

            bookingModal.hidden = false;
            bookingModal.scrollTop = 0;
            document.body.classList.add('booking-modal-open');
            requestAnimationFrame(function () {
                requestAnimationFrame(function () {
                    bookingModal.classList.add('is-visible');
                    bookingCloseButton.focus();
                });
            });
        }

        function closeBookingModal() {
            bookingModal.classList.remove('is-visible');
            document.body.classList.remove('booking-modal-open');
            bookingCloseTimer = setTimeout(function () {
                bookingModal.hidden = true;
                if (lastBookingTrigger) {
                    lastBookingTrigger.focus();
                }
            }, 220);
        }

        bookingLaunchButtons.forEach(function (button) {
            button.addEventListener('click', function () {
                openBookingModal(button);
            });
        });

        bookingCloseButton.addEventListener('click', closeBookingModal);

        bookingModal.addEventListener('click', function (event) {
            if (event.target === bookingModal) {
                closeBookingModal();
            }
        });

        document.addEventListener('keydown', function (event) {
            if (bookingModal.hidden) {
                return;
            }

            if (event.key === 'Escape') {
                event.preventDefault();
                closeBookingModal();
                return;
            }

            if (event.key === 'Tab') {
                var focusableElements = bookingModal.querySelectorAll('button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])');
                var firstFocusable = focusableElements[0];
                var lastFocusable = focusableElements[focusableElements.length - 1];

                if (event.shiftKey && document.activeElement === firstFocusable) {
                    event.preventDefault();
                    lastFocusable.focus();
                } else if (!event.shiftKey && document.activeElement === lastFocusable) {
                    event.preventDefault();
                    firstFocusable.focus();
                }
            }
        });

        renderBookingTimes();
        updateBookingReview();
    }

    // --- Get Updates Popup ---
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

        var forceShowPopup = function () {
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
            } else if (document.querySelector('.contact-page-shell')) {
                setTimeout(showPopup, 1000);
            }
        }

        document.querySelectorAll('.js-open-follow-popup').forEach(function (trigger) {
            trigger.addEventListener('click', forceShowPopup);
        });

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
            var mlScriptUrl = 'https://script.google.com/macros/s/AKfycbzx_RPxwXVqqibnEF9v4IZ62XPFJW2Fb9EE7XU53fIEIBX-_q5p9neXBFmNfSY7yboF/exec';

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
                    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
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
