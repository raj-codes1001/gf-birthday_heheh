/**
 * Mimi's Cat Birthday Website
 * 100% Silent & Audio-Free Delight
 * Features: Candle blowout, Cat Petting Lounge, Flip Cards, Gift Unboxing, Love Letter, Polaroid Wall
 */

(function () {
  'use strict';

  // --- State & Storage ---
  const state = {
    mimiName: localStorage.getItem('mimi_name') || 'Mimi',
    senderName: localStorage.getItem('mimi_sender') || 'Your Favorite Human ❤️',
    specialNote: localStorage.getItem('mimi_note') || 'You make every single day brighter, softer, and so much happier. Happy Birthday to the sweetest girl!',
    candlesBlown: 0,
    totalCandles: 3,
    petCount: parseInt(localStorage.getItem('mimi_pet_count') || '0', 10),
    unboxedGifts: new Set(),
    isLetterOpen: false,
    photos: JSON.parse(localStorage.getItem('mimi_polaroids') || '{}'),
  };

  // --- DOM Elements ---
  const el = {
    heroName: document.getElementById('hero-mimi-name'),
    footerName: document.getElementById('footer-mimi-name'),
    letterRecipient: document.getElementById('letter-recipient'),
    letterBody: document.getElementById('letter-body'),
    letterSignoff: document.getElementById('letter-signoff'),
    petCounterBadge: document.getElementById('pet-counter-badge'),
    candles: document.querySelectorAll('.candle-flame'),
    blowBtn: document.getElementById('btn-blow-candles'),
    relightBtn: document.getElementById('btn-relight-candles'),
    wishBanner: document.getElementById('wish-banner'),
    envelope: document.getElementById('love-envelope'),
    envelopeSeal: document.getElementById('envelope-seal'),
    confettiBtn: document.getElementById('btn-paw-confetti'),
    fortuneBtn: document.getElementById('btn-cat-fortune'),
    fortuneText: document.getElementById('cat-fortune-text'),
    fortuneCard: document.getElementById('cat-fortune-card'),
    feedTreatBtn: document.getElementById('btn-feed-treats'),
    treatTray: document.getElementById('treat-tray'),
    // Personalize modal
    personalizeBtn: document.getElementById('btn-open-personalize'),
    personalizeModal: document.getElementById('personalize-modal'),
    closePersonalizeBtn: document.getElementById('btn-close-personalize'),
    savePersonalizeBtn: document.getElementById('btn-save-personalize'),
    inputMimiName: document.getElementById('input-mimi-name'),
    inputSenderName: document.getElementById('input-sender-name'),
    inputSpecialNote: document.getElementById('input-special-note'),
  };

  // --- Confetti & Visual Sparkles (Audio-Free) ---
  function triggerConfetti(originX = 0.5, originY = 0.6) {
    if (typeof confetti === 'function') {
      // Gentle pastel celebration palette
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { x: originX, y: originY },
        colors: ['#ff85a2', '#fbb1bd', '#fed7e2', '#d8b4fe', '#fde047', '#a7f3d0'],
        shapes: ['circle', 'square'],
        disableForReducedMotion: true,
      });
    }
  }

  function triggerBigCelebration() {
    if (typeof confetti === 'function') {
      const end = Date.now() + 1.2 * 1000;
      const colors = ['#ff85a2', '#fbb1bd', '#fed7e2', '#d8b4fe', '#fde047'];

      (function frame() {
        confetti({
          particleCount: 4,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: colors
        });
        confetti({
          particleCount: 4,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: colors
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      }());
    }
  }

  // --- Floating Paw Trail on Click ---
  function initClickPaws() {
    const symbols = ['🐾', '💖', '✨', '🌸', '🐱', '⭐'];
    document.addEventListener('pointerdown', (e) => {
      // Don't trigger if clicked on an input or button
      if (['INPUT', 'TEXTAREA', 'BUTTON', 'A'].includes(e.target.tagName)) return;

      const ripple = document.createElement('div');
      ripple.className = 'paw-ripple select-none';
      ripple.style.left = `${e.clientX}px`;
      ripple.style.top = `${e.clientY}px`;
      ripple.textContent = symbols[Math.floor(Math.random() * symbols.length)];
      document.body.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 900);
    });
  }

  // --- Candle Blowout System ---
  function blowCandle(candleEl, fromUser = true) {
    if (candleEl.classList.contains('blown-out')) return;

    candleEl.classList.add('blown-out');
    state.candlesBlown++;

    // Add cute smoke puff
    const puff = document.createElement('div');
    puff.className = 'smoke-puff';
    candleEl.parentElement.appendChild(puff);
    setTimeout(() => puff.remove(), 1200);

    const rect = candleEl.getBoundingClientRect();
    triggerConfetti(rect.left / window.innerWidth, rect.top / window.innerHeight);

    if (state.candlesBlown >= state.totalCandles && fromUser) {
      setTimeout(() => {
        triggerBigCelebration();
        if (el.wishBanner) {
          el.wishBanner.classList.remove('hidden');
          el.wishBanner.classList.add('flex');
        }
        if (el.blowBtn) el.blowBtn.classList.add('hidden');
        if (el.relightBtn) el.relightBtn.classList.remove('hidden');
      }, 400);
    }
  }

  function blowAllCandles() {
    el.candles.forEach((candle, index) => {
      setTimeout(() => {
        blowCandle(candle, true);
      }, index * 200);
    });
  }

  function relightCandles() {
    state.candlesBlown = 0;
    el.candles.forEach(candle => {
      candle.classList.remove('blown-out');
    });
    if (el.wishBanner) {
      el.wishBanner.classList.add('hidden');
      el.wishBanner.classList.remove('flex');
    }
    if (el.blowBtn) el.blowBtn.classList.remove('hidden');
    if (el.relightBtn) el.relightBtn.classList.add('hidden');
    triggerConfetti(0.5, 0.4);
  }

  function initCake() {
    el.candles.forEach(candle => {
      candle.addEventListener('click', () => blowCandle(candle, true));
    });

    if (el.blowBtn) {
      el.blowBtn.addEventListener('click', blowAllCandles);
    }

    if (el.relightBtn) {
      el.relightBtn.addEventListener('click', relightCandles);
    }
  }

  // --- Cat Petting Lounge ---
  const purrLines = {
    mochi: ['*purrrrrr* 💕', 'Mimi is my favorite! 🌸', '*happy kneads* 🐾', '*slow blinks sweetly* 🐱', 'Warm cuddles for Mimi! ✨'],
    boba: ['*purr purr purr* 💖', 'Happy birthday, Mimi! 🎂', '*rubs soft head on you* 🐾', '*curls into a warm bun* 🥐', '*soft tiny squeak* 💕'],
    latte: ['*loud purrs* 💤', 'Mimi, you are the best! 🧶', '*rolls over for belly tickles* 🐾', '*playful tail swish* 🐱', 'More treats for Mimi! 🐟'],
  };

  function showPurrBubble(catContainer, catId) {
    const quotes = purrLines[catId] || purrLines.mochi;
    const text = quotes[Math.floor(Math.random() * quotes.length)];

    const bubble = document.createElement('div');
    bubble.className = 'purr-bubble bg-white/95 text-pink-700 px-3 py-1.5 rounded-2xl text-xs sm:text-sm font-bold shadow-md border border-pink-200';
    bubble.style.top = '-20px';
    bubble.style.left = `${Math.random() * 40 + 20}%`;
    bubble.textContent = text;

    catContainer.appendChild(bubble);

    setTimeout(() => {
      bubble.remove();
    }, 1800);
  }

  function updatePetCount() {
    state.petCount++;
    localStorage.setItem('mimi_pet_count', state.petCount);
    if (el.petCounterBadge) {
      el.petCounterBadge.textContent = `${state.petCount} Cat Hugs & Pets`;
    }
  }

  function initCatLounge() {
    const cats = document.querySelectorAll('.interactive-cat');
    cats.forEach(cat => {
      const catId = cat.dataset.cat;

      cat.addEventListener('click', (e) => {
        updatePetCount();
        showPurrBubble(cat, catId);

        // Visual bounce
        cat.classList.add('scale-105');
        setTimeout(() => cat.classList.remove('scale-105'), 200);

        // Micro heart burst
        const rect = cat.getBoundingClientRect();
        triggerConfetti((rect.left + rect.width / 2) / window.innerWidth, (rect.top + 20) / window.innerHeight);
      });
    });

    if (el.petCounterBadge) {
      el.petCounterBadge.textContent = `${state.petCount} Cat Hugs & Pets`;
    }

    if (el.feedTreatBtn && el.treatTray) {
      el.feedTreatBtn.addEventListener('click', () => {
        updatePetCount();
        const treats = ['🐟', '🍤', '🥛', '🍪', '🍗'];
        const randomTreat = treats[Math.floor(Math.random() * treats.length)];

        const treatEl = document.createElement('span');
        treatEl.className = 'text-2xl animate-bounce inline-block transition-transform duration-500';
        treatEl.textContent = randomTreat;
        el.treatTray.appendChild(treatEl);

        // Cats react to treats
        cats.forEach((cat, idx) => {
          setTimeout(() => {
            showPurrBubble(cat, cat.dataset.cat);
          }, (idx + 1) * 250);
        });

        setTimeout(() => {
          treatEl.classList.add('opacity-0', 'scale-50');
          setTimeout(() => treatEl.remove(), 600);
        }, 3000);
      });
    }
  }

  // --- "Why Mimi is Purr-fect" Flip Cards ---
  function initFlipCards() {
    const cards = document.querySelectorAll('.flip-card');
    cards.forEach(card => {
      card.addEventListener('click', () => {
        card.classList.toggle('is-flipped');
        if (card.classList.contains('is-flipped')) {
          const rect = card.getBoundingClientRect();
          triggerConfetti((rect.left + rect.width / 2) / window.innerWidth, (rect.top + rect.height / 2) / window.innerHeight);
        }
      });
    });

    const flipAllBtn = document.getElementById('btn-flip-all-cards');
    if (flipAllBtn) {
      let allFlipped = false;
      flipAllBtn.addEventListener('click', () => {
        allFlipped = !allFlipped;
        cards.forEach((card, i) => {
          setTimeout(() => {
            if (allFlipped) {
              card.classList.add('is-flipped');
            } else {
              card.classList.remove('is-flipped');
            }
          }, i * 80);
        });
        flipAllBtn.textContent = allFlipped ? '🔄 Unflip All Cards' : '✨ Flip All Cards';
        triggerConfetti(0.5, 0.5);
      });
    }
  }

  // --- Mystery Cat Gift Unboxing ---
  function initGiftUnboxing() {
    const giftBoxes = document.querySelectorAll('.gift-box');
    giftBoxes.forEach(box => {
      box.addEventListener('click', () => {
        const giftId = box.dataset.gift;
        const unopened = box.querySelector('.gift-unopened');
        const opened = box.querySelector('.gift-opened');

        if (!state.unboxedGifts.has(giftId)) {
          state.unboxedGifts.add(giftId);
          unopened.classList.add('hidden');
          opened.classList.remove('hidden');
          opened.classList.add('animate-pulse');
          setTimeout(() => opened.classList.remove('animate-pulse'), 800);

          const rect = box.getBoundingClientRect();
          triggerConfetti((rect.left + rect.width / 2) / window.innerWidth, (rect.top + rect.height / 2) / window.innerHeight);
        }
      });
    });
  }

  // --- Cat-Paw Wax Sealed Love Letter ---
  function initLoveLetter() {
    if (!el.envelope || !el.envelopeSeal) return;

    el.envelopeSeal.addEventListener('click', () => {
      state.isLetterOpen = !state.isLetterOpen;
      if (state.isLetterOpen) {
        el.envelope.classList.add('open');
        el.envelopeSeal.textContent = '🐾 Sealed with Love';
        triggerConfetti(0.5, 0.7);
      } else {
        el.envelope.classList.remove('open');
        el.envelopeSeal.textContent = '🐾 Tap to Open';
      }
    });
  }

  // --- Daily Whisker Fortune / Cat Paw Oracle ---
  const fortunes = [
    "🐾 Mimi's aura is 100% pure sunshine today. An abundance of warm cuddles is heading your way!",
    "🐱 The wise kittens predict that every single wish you make when blowing your candles will come true!",
    "🌸 Destiny says: You will be loved today, tomorrow, and for all the countless days to come.",
    "💖 Lucky Cat Blessing: You are destined for unlimited forehead kisses, sweet snacks, and sweet adventures!",
    "✨ Whisker Wisdom: You make the world a gentler, more beautiful place just by existing as you.",
    "🧶 Forecast: A cozy blanket, peaceful thoughts, and the deepest affection from your boyfriend!",
    "🎂 Special Birthday Fortune: Today is the beginning of the happiest, most magical chapter of your life, Mimi!",
    "🍓 Cosmic Meow: You are officially the prettiest, cutest, most cherished girlfriend in the universe."
  ];

  function drawFortune() {
    if (!el.fortuneCard || !el.fortuneText) return;

    el.fortuneCard.classList.add('scale-95', 'opacity-70');
    setTimeout(() => {
      const randomMsg = fortunes[Math.floor(Math.random() * fortunes.length)];
      el.fortuneText.textContent = randomMsg;
      el.fortuneCard.classList.remove('scale-95', 'opacity-70');
      el.fortuneCard.classList.add('scale-105');
      setTimeout(() => el.fortuneCard.classList.remove('scale-105'), 200);
      triggerConfetti(0.5, 0.6);
    }, 250);
  }

  function initFortuneOracle() {
    if (el.fortuneBtn) {
      el.fortuneBtn.addEventListener('click', drawFortune);
    }
  }

  // --- Polaroid Wall & Custom Photo Upload ---
  function initPolaroidWall() {
    const polaroidWrappers = document.querySelectorAll('.polaroid-item');

    polaroidWrappers.forEach((item, index) => {
      const img = item.querySelector('.polaroid-img');
      const fileInput = item.querySelector('.polaroid-file-input');
      const uploadBtn = item.querySelector('.btn-change-photo');

      // Check saved custom photo
      const savedPhoto = state.photos[`photo_${index}`];
      if (savedPhoto && img) {
        img.src = savedPhoto;
      }

      if (uploadBtn && fileInput) {
        uploadBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          fileInput.click();
        });

        fileInput.addEventListener('change', (e) => {
          const file = e.target.files[0];
          if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
              const result = event.target.result;
              img.src = result;
              state.photos[`photo_${index}`] = result;
              try {
                localStorage.setItem('mimi_polaroids', JSON.stringify(state.photos));
              } catch (err) {
                console.warn('Storage quota reached for local photos, displaying preview.');
              }
              triggerConfetti(0.5, 0.5);
            };
            reader.readAsDataURL(file);
          }
        });
      }
    });
  }

  // --- Personalization Engine ---
  function applyPersonalization() {
    if (el.heroName) el.heroName.textContent = state.mimiName;
    if (el.footerName) el.footerName.textContent = state.mimiName;
    if (el.letterRecipient) el.letterRecipient.textContent = `Dearest ${state.mimiName},`;
    if (el.letterBody) el.letterBody.textContent = state.specialNote;
    if (el.letterSignoff) el.letterSignoff.textContent = `Forever & always,\n${state.senderName}`;

    // Update document title
    document.title = `Happy Birthday ${state.mimiName}! 🐾🎂`;
  }

  function initPersonalizeModal() {
    if (!el.personalizeBtn || !el.personalizeModal) return;

    el.personalizeBtn.addEventListener('click', () => {
      el.inputMimiName.value = state.mimiName;
      el.inputSenderName.value = state.senderName;
      el.inputSpecialNote.value = state.specialNote;
      el.personalizeModal.classList.remove('hidden');
      el.personalizeModal.classList.add('flex');
    });

    const closeModal = () => {
      el.personalizeModal.classList.add('hidden');
      el.personalizeModal.classList.remove('flex');
    };

    if (el.closePersonalizeBtn) {
      el.closePersonalizeBtn.addEventListener('click', closeModal);
    }

    el.personalizeModal.addEventListener('click', (e) => {
      if (e.target === el.personalizeModal) closeModal();
    });

    if (el.savePersonalizeBtn) {
      el.savePersonalizeBtn.addEventListener('click', () => {
        state.mimiName = el.inputMimiName.value.trim() || 'Mimi';
        state.senderName = el.inputSenderName.value.trim() || 'Your Boyfriend ❤️';
        state.specialNote = el.inputSpecialNote.value.trim() || 'You make every day wonderful. Happy Birthday!';

        localStorage.setItem('mimi_name', state.mimiName);
        localStorage.setItem('mimi_sender', state.senderName);
        localStorage.setItem('mimi_note', state.specialNote);

        applyPersonalization();
        closeModal();
        triggerConfetti(0.5, 0.5);
      });
    }
  }

  // --- Initialization ---
  function init() {
    applyPersonalization();
    initCake();
    initCatLounge();
    initFlipCards();
    initGiftUnboxing();
    initLoveLetter();
    initFortuneOracle();
    initPolaroidWall();
    initPersonalizeModal();
    initClickPaws();

    if (el.confettiBtn) {
      el.confettiBtn.addEventListener('click', () => {
        triggerBigCelebration();
      });
    }

    // Gentle welcome confetti
    setTimeout(() => {
      triggerConfetti(0.5, 0.4);
    }, 500);
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
