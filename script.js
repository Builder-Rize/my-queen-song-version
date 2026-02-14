// ===== DEBUG & ERROR HANDLING =====
window.onerror = function(msg, url, line) {
    console.error(`[HATA] ${msg} | Satır: ${line}`);
    return false;
};

function debugLog(action, data) {
    console.log(`[DEBUG] ${action}:`, data);
}

// ===== CARD DATA =====
const cardsData = [
    {
        id: 1,
        title: "Pembe Dünya",
        image: "./assets/images/photo-1.jpg",
        text: "Kraliçem… bu fotoğrafa baktığımda aklıma tek bir şey geliyor: huzur. Çünkü sen neredeysen, dünya daha yumuşak renklerle çiziliyor sanki… Gökyüzü daha açık, rüzgar daha sakin… ve hayat daha anlamlı. Ben bazen geleceği düşünürken korkuyorum ama sonra seni hatırlıyorum… Çünkü sen, benim geleceğimin en güzel ihtimalisin. Bu dünyada bin tane yer gezsem bile, en güzel manzara yine senin varlığın olur. Sen benim şansım değil… sen benim mucizemsin.",
        signature: "- Senin Enes'in 🤍",
        theme: "pink",
        unlockTime: 0
    },
    {
        id: 2,
        title: "Çiçek ve Sen",
        image: "./assets/images/photo-2.jpg",
        text: "Biliyor musun… bazen sana bakınca dünyanın bütün gürültüsü susuyor. Sanki herkes konuşmayı bırakıyor da, sadece kalbim konuşuyor. Bu fotoğrafta elinde bir çiçek var ama asıl çiçek sensin Azra… Çünkü güzellik sadece dışarıda değil, senin ruhunun içinde. Sen gülünce içimde bir şeyler düzeliyor, sanki hayatın kırık yerleri senin sesinle onarılıyor. Ben seni sevmeyi bir alışkanlık gibi değil… bir kader gibi yaşıyorum. Ve her gün yeniden seçiyorum seni… çünkü seni seçmek, doğru olan tek şey.",
        signature: "- Kraliçenin delisi 🤍",
        theme: "green",
        unlockTime: 20
    },
    {
        id: 3,
        title: "Gün Batımı",
        image: "./assets/images/photo-3.jpg",
        text: "Bu fotoğraf var ya… tam bizim hikayemiz gibi. Bir gün batımı kadar güzel, ama aynı zamanda bir ömür kadar derin. Yanında duran o kurtlar bile sanki seni korumak için orada… çünkü senin varlığın bile değerli, senin gülüşün bile kutsal gibi geliyor bana. Ben seni sadece 'seviyorum' demiyorum… Ben seni içimde bir ev gibi taşıyorum. Bazen hayat zorlaşıyor ama sonra aklıma sen geliyorsun, ve ben tekrar güçlü oluyorum… çünkü benim kalbimde sen varsın. Sen benim en güzel motivasyonumsun Azra… en tatlı huzurum, en gerçek mutluluğumsun.",
        signature: "- Enes 🤍",
        theme: "gold",
        unlockTime: 40
    },
    {
        id: 4,
        title: "Gözlerin",
        image: "./assets/images/photo-4.jpg",
        text: "Azra… bu fotoğrafa her baktığımda içimde bir şey duruyor. Sanki kalbim, 'işte' diyor… 'aradığım şey bu.' Gözlerin öyle bir bakıyor ki, insan kendini kaybetmek istiyor. Çünkü senin gözlerin bir bakış değil… bir dünya. Ben bazen düşünüyorum… bu kadar güzel bir insan nasıl benim hayatıma girdi diye. Senin yüzüne baktığımda sadece güzellik görmüyorum, ben orada bir iyilik görüyorum… bir masumluk… bir zarafet… ve en önemlisi, benim en büyük şansımı görüyorum. Ben seni sevmeyi öğrenmedim… ben seni görünce zaten içgüdüsel olarak sevdim. Çünkü bazı aşklar açıklanmaz… yaşanır. Ve sen benim yaşadığım en güzel şeysin kraliçem.",
        signature: "- Senin Enes'in, sonsuza kadar… 🤍",
        theme: "blue",
        unlockTime: 60
    },
    {
        id: 5,
        title: "🌸 Gizli Kart",
        image: "./assets/images/photo-5.jpg",
        text: "Kraliçem… bazen sana ne yazsam eksik kalıyor gibi hissediyorum. Çünkü senin güzelliğin sadece yüzünde değil… senin güzelliğin kalbinde. Bu çiçek küçük görünüyor olabilir ama aslında benim sana veremediğim her şeyi temsil ediyor. Sana her gün 'iyi ki varsın' demek istiyorum, her gün seni daha fazla sevmek istiyorum… çünkü sen benim hayatımın en tatlı gerçeğisin. Seninle konuşmak bile bana huzur veriyor, senin adını düşünmek bile içimde bir ışık yakıyor. Ben seni sadece sevmedim Azra… ben seni kendime dua gibi yazdım. Ve bil ki, dünyada her şey değişse bile… benim kalbimdeki yerin asla değişmeyecek. Çünkü sen benim en güzel alışkanlığım değil… sen benim en güzel kaderimsin.",
        signature: "- Sonsuza kadar senin Enes'in 🤍🌸",
        theme: "sakura",
        unlockTime: 90
    }
];

// ===== STATE =====
const state = {
    currentCardIndex: 0,
    isFlipped: false,
    musicStarted: false,
    isMuted: false,
    unlockedCards: [1],
    chorusTriggered: {},
    isGiftOpened: false,
    isFinalCardFlipped: false,
    isCardModalOpen: false,
    isGiftModalOpen: false,
    loveStartTime: null,
    typingInterval: null,
    lastCheckedTime: -1
};

// ===== SOUND MANAGEMENT (FIXED) =====
const sounds = {};

function loadSounds() {
    const soundFiles = {
        flip: './assets/audio/flip.mp3',
        unlock: './assets/audio/unlock-chime.mp3',
        complete: './assets/audio/beat-pulse.mp3',
        heartbeat: './assets/audio/heartbeat.mp3',
        click: './assets/audio/click-soft.mp3'
    };
    
    Object.entries(soundFiles).forEach(([name, src]) => {
        sounds[name] = new Audio(src);
        sounds[name].load();
        // Ses yüklenme durumunu kontrol et
        sounds[name].addEventListener('canplaythrough', () => {
            debugLog(`Ses hazır: ${name}`, src);
        });
        sounds[name].addEventListener('error', () => {
            debugLog(`Ses yüklenemedi: ${name}`, src);
        });
    });
    debugLog('Sesler yükleniyor...', Object.keys(sounds));
}

function playSound(name) {
    if (state.isMuted || !sounds[name]) return;
    
    const sound = sounds[name];
    sound.currentTime = 0;
    // Ses seviyeleri: unlock en yüksek, heartbeat düşük, diğerleri normal
    sound.volume = name === 'heartbeat' ? 0.3 : (name === 'unlock' ? 1.0 : 0.5);
    
    debugLog('Ses çalınıyor', name);
    
    // Direkt çalmaya dene, hata olursa bekle
    const playPromise = sound.play();
    if (playPromise !== undefined) {
        playPromise.catch(e => {
            debugLog('Ses hatası, tekrar deneniyor', e.message);
            // Kullanıcı etkileşimi sonrası tekrar dene
            sound.addEventListener('canplaythrough', () => {
                sound.play().catch(err => debugLog('Ses tekrar hatası', err.message));
            }, { once: true });
        });
    }
}

// ===== DOM ELEMENTS =====
const elements = {
    startScreen: document.getElementById('startScreen'),
    startBtn: document.getElementById('startBtn'),
    appContainer: document.getElementById('appContainer'),
    cardsTrack: document.getElementById('cardsTrack'),
    prevBtn: document.getElementById('prevBtn'),
    nextBtn: document.getElementById('nextBtn'),
    indicators: document.querySelectorAll('.indicator'),
    giftSection: document.getElementById('giftSection'),
    giftBox: document.getElementById('giftBox'),
    giftModal: document.getElementById('giftModal'),
    giftConfettiBurst: document.getElementById('giftConfettiBurst'),
    finalCard: document.getElementById('finalCard'),
    giftFlipBtn: document.getElementById('giftFlipBtn'),
    giftCloseBtn: document.getElementById('giftCloseBtn'),
    cardModal: document.getElementById('cardModal'),
    modalCard: document.getElementById('modalCard'),
    modalImage: document.getElementById('modalImage'),
    modalText: document.getElementById('modalText'),
    modalSignature: document.getElementById('modalSignature'),
    flipBtn: document.getElementById('flipBtn'),
    closeBtn: document.getElementById('closeBtn'),
    playBtn: document.getElementById('playBtn'),
    muteBtn: document.getElementById('muteBtn'),
    replayBtn: document.getElementById('replayBtn'),
    statusText: document.getElementById('statusText'),
    progressFill: document.getElementById('progressFill'),
    visualizer: document.getElementById('visualizer'),
    effectsContainer: document.getElementById('effectsContainer'),
    romanticQuote: document.getElementById('romanticQuote'),
    timeGreeting: document.getElementById('timeGreeting'),
    lyricsDisplay: document.getElementById('lyricsDisplay'),
    loveCounter: document.getElementById('loveCounter'),
    clickHearts: document.getElementById('clickHearts'),
    bgMusic: new Audio('./assets/audio/love-you-like-a-love-song.mp3')
};

elements.bgMusic.volume = 0.7;

// ===== INIT =====
function init() {
    debugLog('Init başlıyor', {});
    loadSounds();
    createFloatingHearts();
    createStars();
    createRomanticParticles();
    setRandomQuote();
    setTimeGreeting();
    rotateRomanticMessages();
    renderCards();
    updateCarousel();
    setupNavigation();
    createVisualizer();
    setupEventListeners();
    setupClickHearts();
    setupParallax();
    debugLog('Init tamamlandı', {});
}

// ===== FLOATING ELEMENTS =====
function createFloatingHearts() {
    const container = document.getElementById('floatingHearts');
    if (!container) return;
    
    for (let i = 0; i < 20; i++) {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.innerHTML = '♥';
        heart.style.left = `${Math.random() * 100}%`;
        heart.style.animationDelay = `${Math.random() * 15}s`;
        heart.style.animationDuration = `${10 + Math.random() * 10}s`;
        heart.style.fontSize = `${15 + Math.random() * 20}px`;
        container.appendChild(heart);
    }
}

function createStars() {
    const container = document.getElementById('starsContainer');
    if (!container) return;
    
    for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.animationDelay = `${Math.random() * 3}s`;
        container.appendChild(star);
    }
}

// ===== UTILITIES =====
const romanticQuotes = [
    "Seni gördüğüm ilk andan beri kalbim seninle atıyor...",
    "Her şarkının ardında sen varsın...",
    "Gözlerinde kaybolmak istediğim bir ömür...",
    "Sen benim en güzel tesadüfümsün...",
    "Kalbimde sadece sen varsın..."
];

function setRandomQuote() {
    if (!elements.romanticQuote) return;
    const quote = romanticQuotes[Math.floor(Math.random() * romanticQuotes.length)];
    elements.romanticQuote.textContent = `"${quote}"`;
}

function setTimeGreeting() {
    if (!elements.timeGreeting) return;
    const hour = new Date().getHours();
    let greeting = '';
    if (hour >= 5 && hour < 12) greeting = 'Günaydın güzelliğim ☀️';
    else if (hour >= 12 && hour < 17) greeting = 'İyi öğlenler aşkım 🌸';
    else if (hour >= 17 && hour < 21) greeting = 'İyi akşamlar prensesim 🌅';
    else greeting = 'İyi geceler yıldızım 🌙';
    elements.timeGreeting.textContent = greeting;
}

function startLoveCounter() {
    state.loveStartTime = Date.now();
    const countEl = elements.loveCounter?.querySelector('.count');
    if (!countEl) return;
    
    let lastCelebratedMinute = 0;
    
    setInterval(() => {
        const seconds = Math.floor((Date.now() - state.loveStartTime) / 1000);
        countEl.textContent = seconds;
        
        // Her dakika romantik kutlama
        const currentMinute = Math.floor(seconds / 60);
        if (currentMinute > lastCelebratedMinute && currentMinute > 0) {
            lastCelebratedMinute = currentMinute;
            celebrateLoveMilestone(seconds);
            
            // Özel mesajlar her dakika
            const specialMessages = [
                "1 dakika! Seni seviyorum! 💕",
                "2 dakika! Kalbim seninle atıyor... 💓",
                "3 dakika! Her saniye daha çok seviyorum! 💖",
                "4 dakika! Sonsuza dek... 💗",
                "5 dakika! Aşkımız büyüyor... 💘"
            ];
            
            if (currentMinute <= 5 && elements.statusText) {
                elements.statusText.textContent = specialMessages[currentMinute - 1];
                elements.statusText.style.color = '#ec4899';
                setTimeout(() => {
                    elements.statusText.style.color = '';
                }, 3000);
            }
        }
    }, 1000);
}

// ===== START EXPERIENCE =====
function startExperience() {
    playSound('click');
    elements.startScreen?.classList.add('hidden');
    
    setTimeout(() => {
        elements.appContainer?.classList.add('visible');
        startMusic();
        startLoveCounter();
    }, 300);
}

// ===== MUSIC =====
function startMusic() {
    elements.bgMusic.play().then(() => {
        state.musicStarted = true;
        if (elements.playBtn) elements.playBtn.textContent = '⏸';
        if (elements.statusText) elements.statusText.textContent = '♪ Senin için çalıyor...';
        startUnlockTimer();
        debugLog('Müzik başladı', {});
    }).catch(e => {
        debugLog('Müzik hatası', e.message);
        if (elements.statusText) elements.statusText.textContent = 'Müziği başlatmak için tıkla';
    });
}

function toggleMusic() {
    playSound('click');
    if (!state.musicStarted) {
        startMusic();
        return;
    }
    
    if (elements.bgMusic.paused) {
        elements.bgMusic.play();
        if (elements.playBtn) elements.playBtn.textContent = '⏸';
    } else {
        elements.bgMusic.pause();
        if (elements.playBtn) elements.playBtn.textContent = '▶';
    }
}

function toggleMute() {
    playSound('click');
    state.isMuted = !state.isMuted;
    elements.bgMusic.muted = state.isMuted;
    if (elements.muteBtn) elements.muteBtn.textContent = state.isMuted ? '🔇' : '🔊';
}

function replayMusic() {
    playSound('click');
    elements.bgMusic.currentTime = 0;
    state.chorusTriggered = {};
    elements.bgMusic.play();
    if (elements.playBtn) elements.playBtn.textContent = '⏸';
}

// ===== RENDER CARDS =====
function renderCards() {
    if (!elements.cardsTrack) return;
    
    elements.cardsTrack.innerHTML = '';
    debugLog('Kartlar render ediliyor', state.unlockedCards);
    
    cardsData.forEach((card, index) => {
        const isUnlocked = state.unlockedCards.includes(card.id);
        const cardEl = document.createElement('div');
        cardEl.className = 'card-wrapper';
        cardEl.dataset.id = card.id;
        cardEl.dataset.index = index;
        
        cardEl.innerHTML = `
            <div class="card-small ${isUnlocked ? 'unlocked theme-' + card.theme : 'locked'}">
                ${isUnlocked 
                    ? '<span class="unlocked-badge">AÇILDI ♥</span>' 
                    : '<span class="lock-icon">🔒</span>'
                }
                <img src="${card.image}" alt="${card.title}" class="card-image" onerror="this.style.display='none'">
                <div class="card-info">
                    <h3 class="card-title">${card.title}</h3>
                    <span class="card-time">0:${card.unlockTime.toString().padStart(2, '0')}</span>
                </div>
            </div>
        `;
        
        if (isUnlocked) {
            cardEl.addEventListener('click', () => openCardModal(card));
        }
        
        elements.cardsTrack.appendChild(cardEl);
    });
    
    if (elements.progressFill) {
        elements.progressFill.style.width = `${(state.unlockedCards.length / 5) * 100}%`;
    }
}

// ===== NAVIGATION - MOBİL UYUMLU =====
function setupNavigation() {
    // Prev/Next buttons
    elements.prevBtn?.addEventListener('click', () => changeCard(-1));
    elements.nextBtn?.addEventListener('click', () => changeCard(1));
    
    // Indicators
    elements.indicators?.forEach((ind, index) => {
        ind.addEventListener('click', () => {
            state.currentCardIndex = index;
            updateCarousel();
            playSound('click');
        });
    });
    
    // Touch swipe with threshold - mobil için geliştirilmiş
    let touchStartX = 0;
    let touchStartY = 0;
    let isSwiping = false;
    const SWIPE_THRESHOLD = 50;
    const VERTICAL_THRESHOLD = 100;
    
    elements.cardsTrack?.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
        isSwiping = true;
    }, { passive: true });

    elements.cardsTrack?.addEventListener('touchmove', (e) => {
        if (!isSwiping) return;
        
        const touchX = e.changedTouches[0].screenX;
        const touchY = e.changedTouches[0].screenY;
        const diffX = touchStartX - touchX;
        const diffY = Math.abs(touchStartY - touchY);
        
        // Dikey kaydırma daha fazlaysa, yatay swipe'ı iptal et
        if (diffY > VERTICAL_THRESHOLD) {
            isSwiping = false;
            return;
        }
        
        // Yatay kaydırma için default davranışı engelle
        if (Math.abs(diffX) > 10) {
            e.preventDefault();
        }
    }, { passive: false });

    elements.cardsTrack?.addEventListener('touchend', (e) => {
        if (!isSwiping) return;
        isSwiping = false;
        
        const touchEndX = e.changedTouches[0].screenX;
        const touchEndY = e.changedTouches[0].screenY;
        const diffX = touchStartX - touchEndX;
        const diffY = Math.abs(touchStartY - touchEndY);
        
        // Dikey kaydırma kontrolü
        if (diffY > VERTICAL_THRESHOLD) return;
        
        if (Math.abs(diffX) > SWIPE_THRESHOLD) {
            if (diffX > 0) changeCard(1);
            else changeCard(-1);
        }
    }, { passive: true });
    
    // Mobil için butonları dokunmatik hale getir
    elements.prevBtn?.addEventListener('touchstart', (e) => {
        e.preventDefault();
        changeCard(-1);
    }, { passive: false });
    
    elements.nextBtn?.addEventListener('touchstart', (e) => {
        e.preventDefault();
        changeCard(1);
    }, { passive: false });
}

function changeCard(direction) {
    const newIndex = state.currentCardIndex + direction;
    if (newIndex >= 0 && newIndex < 5) {
        state.currentCardIndex = newIndex;
        updateCarousel();
        playSound('click');
        debugLog('Kart değiştirildi', { index: newIndex });
    }
}

function updateCarousel() {
    const cardWidth = window.innerWidth <= 480 ? 240 : 280;
    if (elements.cardsTrack) {
        elements.cardsTrack.style.transform = `translateX(-${state.currentCardIndex * cardWidth}px)`;
    }
    
    // Update card classes
    document.querySelectorAll('.card-wrapper').forEach((card, index) => {
        card.classList.remove('active', 'inactive');
        if (index === state.currentCardIndex) {
            card.classList.add('active');
        } else {
            card.classList.add('inactive');
        }
    });
    
    // Update indicators
    elements.indicators?.forEach((ind, index) => {
        ind.classList.toggle('active', index === state.currentCardIndex);
    });
    
    // Update arrows
    if (elements.prevBtn) elements.prevBtn.disabled = state.currentCardIndex === 0;
    if (elements.nextBtn) elements.nextBtn.disabled = state.currentCardIndex === 4;
}

// ===== UNLOCK TIMER (FIXED) =====
function startUnlockTimer() {
    elements.bgMusic.addEventListener('timeupdate', checkCardUnlocks);
}

function checkCardUnlocks() {
    if (!state.musicStarted || elements.bgMusic.paused) return;
    
    const currentTime = Math.floor(elements.bgMusic.currentTime);
    if (currentTime === state.lastCheckedTime) return;
    state.lastCheckedTime = currentTime;
    
    checkChorus(currentTime);
    
    cardsData.forEach(card => {
        if (state.unlockedCards.includes(card.id)) return;
        
        // Tolerance: ±1 second
        if (currentTime >= card.unlockTime && currentTime <= card.unlockTime + 1) {
            debugLog('Kart açılıyor', { title: card.title, time: currentTime });
            unlockCard(card);
        }
    });
}

function unlockCard(card) {
    if (state.unlockedCards.includes(card.id)) return;
    
    state.unlockedCards.push(card.id);
    debugLog('🔓 KART AÇILIYOR - Ses çalınacak', { id: card.id, title: card.title });
    
    // 🔊 Kilit açılma sesi - HEMEN çal
    playSound('unlock');
    
    // 💓 Kalp atışı sesi (son kartlar için)
    if (card.id >= 3) {
        setTimeout(() => playSound('heartbeat'), 300);
    }
    
    const cardEl = document.querySelector(`[data-id="${card.id}"]`);
    if (cardEl) {
        const cardSmall = cardEl.querySelector('.card-small');
        const lockIcon = cardEl.querySelector('.lock-icon');
        
        cardSmall?.classList.add('unlocking');
        if (lockIcon) {
            lockIcon.classList.add('lock-break');
            setTimeout(() => lockIcon.textContent = '🔓', 200);
        }
        
        createConfetti(cardEl);
        
        if (card.id > 1) {
            state.currentCardIndex = card.id - 1;
            updateCarousel();
        }
    }
    
    if (elements.statusText) {
        elements.statusText.textContent = `✨ ${card.title} açıldı!`;
    }
    
    setTimeout(() => renderCards(), 600);
    checkAllCardsUnlocked();
}

function checkChorus(currentTime) {
    const chorusTimes = [40, 80, 120];
    chorusTimes.forEach(time => {
        if (currentTime === time && !state.chorusTriggered[time]) {
            state.chorusTriggered[time] = true;
            playSound('heartbeat');
            if (elements.statusText) elements.statusText.textContent = '♪ Seni seviyorum! ♪';
        }
    });
}

function checkAllCardsUnlocked() {
    if (state.unlockedCards.length === 5 && !state.isGiftOpened) {
        setTimeout(() => {
            elements.giftSection?.classList.add('visible');
            playSound('complete');
            if (elements.statusText) {
                elements.statusText.textContent = '🎁 Sana özel bir sürprizim var aşkım!';
                elements.statusText.style.color = '#eab308';
            }
        }, 1500);
    }
}

// ===== CONFETTI (FIXED) =====
function createConfetti(element) {
    const rect = element.getBoundingClientRect();
    const colors = ['#ec4899', '#8b5cf6', '#eab308', '#ff006e', '#9d4edd'];
    
    for (let i = 0; i < 40; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.cssText = `
            left: ${rect.left + rect.width / 2}px;
            top: ${rect.top + rect.height / 2}px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
        `;
        elements.effectsContainer?.appendChild(confetti);
        
        const angle = (Math.PI * 2 * i) / 40;
        const velocity = 100 + Math.random() * 150;
        let vx = Math.cos(angle) * velocity;
        let vy = Math.sin(angle) * velocity;
        let x = rect.left + rect.width / 2;
        let y = rect.top + rect.height / 2;
        let opacity = 1;
        
        const animate = () => {
            x += vx * 0.02;
            y += vy * 0.02 + 2;
            vx *= 0.98;
            vy *= 0.98;
            opacity -= 0.012;
            confetti.style.left = `${x}px`;
            confetti.style.top = `${y}px`;
            confetti.style.opacity = opacity;
            if (opacity > 0) requestAnimationFrame(animate);
            else confetti.remove();
        };
        requestAnimationFrame(animate);
    }
}

// ===== GIFT BOX - MOBİL UYUMLU =====
function setupGiftBox() {
    console.log('[DEBUG] Gift box setup');
    
    if (!elements.giftBox) return;
    
    // Click event
    elements.giftBox.addEventListener('click', (e) => {
        e.stopPropagation();
        e.preventDefault();
        console.log('[DEBUG] Gift box tıklandı');
        
        if (!state.isGiftModalOpen) {
            openGiftModal();
        }
    });
    
    // Mobil için touch event - daha iyi dokunmatik deneyimi
    let touchStarted = false;
    
    elements.giftBox.addEventListener('touchstart', () => {
        touchStarted = true;
    }, { passive: true });
    
    elements.giftBox.addEventListener('touchend', (e) => {
        e.stopPropagation();
        e.preventDefault();
        
        if (touchStarted && !state.isGiftModalOpen) {
            console.log('[DEBUG] Gift box touch');
            openGiftModal();
        }
        touchStarted = false;
    }, { passive: false });
}

function openGiftModal() {
    console.log('[DEBUG] Hediye modali açılıyor');
    
    if (state.isGiftModalOpen) {
        console.log('[DEBUG] Zaten açık');
        return;
    }
    
    playSound('click');
    state.isGiftModalOpen = true;
    state.isGiftOpened = true;
    
    // Reset card flip
    state.isFinalCardFlipped = false;
    elements.finalCard?.classList.remove('flipped');
    
    // Modalı göster
    elements.giftModal?.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    console.log('[DEBUG] Hediye modali açıldı');
    
    // Animasyon zamanlamaları
    setTimeout(() => {
        createGiftConfetti();
        playSound('unlock');
    }, 1500);
    
    setTimeout(() => {
        playSound('flip');
        startTypingAnimation();
    }, 2200);
}

function createGiftConfetti() {
    console.log('[DEBUG] Konfeti oluşturuluyor');
    
    if (!elements.giftConfettiBurst) return;
    
    elements.giftConfettiBurst.innerHTML = '';
    const colors = ['#ec4899', '#8b5cf6', '#eab308', '#ff006e', '#f472b6', '#ffffff'];
    
    // Daha az konfeti mobil için
    const count = window.innerWidth < 768 ? 40 : 60;
    
    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.className = 'confetti-particle';
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        
        const angle = (Math.PI * 2 * i) / count;
        const distance = 100 + Math.random() * 200;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;
        
        particle.style.setProperty('--tx', `${tx}px`);
        particle.style.setProperty('--ty', `${ty}px`);
        
        elements.giftConfettiBurst.appendChild(particle);
        setTimeout(() => particle.remove(), 1200);
    }
}

function startTypingAnimation() {
    console.log('[DEBUG] Yazı animasyonu başlıyor');
    
    const typingElement = document.getElementById('typingText');
    if (!typingElement) return;
    
    const text = `İyikiii doğdunnn benim güzellerrr güzelliii kraliçemm!!! 
Seni çok ama çok seviyorum bu göreceğin en uğraştığım sitelerden biri oluyor 
ve evet bundan sonra ise birkaç site daha var onlarda minik minik hediyelerr olucakkk!!! 
Hazırsındırr umarımmm!! 
O zaman hazırsan diğer sitelerede bakabilirsin!!!`;
    
    typingElement.innerHTML = '';
    let i = 0;
    
    if (state.typingInterval) clearInterval(state.typingInterval);
    
    state.typingInterval = setInterval(() => {
        if (i < text.length) {
            typingElement.innerHTML += text.charAt(i);
            i++;
        } else {
            clearInterval(state.typingInterval);
        }
    }, 25);
}

function closeGiftModal() {
    console.log('[DEBUG] Hediye modali kapanıyor');
    
    if (!state.isGiftModalOpen) return;
    
    elements.giftModal?.classList.remove('active');
    document.body.style.overflow = '';
    state.isGiftModalOpen = false;
    state.isFinalCardFlipped = false;
    
    // Flip'i sıfırla
    setTimeout(() => {
        elements.finalCard?.classList.remove('flipped');
    }, 300);
    
    if (state.typingInterval) clearInterval(state.typingInterval);
}

function toggleFinalCard() {
    console.log('[DEBUG] Final card flip toggle');
    
    state.isFinalCardFlipped = !state.isFinalCardFlipped;
    elements.finalCard?.classList.toggle('flipped');
    playSound('flip');
    
    console.log('[DEBUG] Flipped:', state.isFinalCardFlipped);
}

// ===== CARD MODAL - MOBİL UYUMLU =====
function openCardModal(card) {
    console.log('[DEBUG] Kart modali açılıyor:', card.title);
    
    if (state.isCardModalOpen) {
        console.log('[DEBUG] Zaten açık, iptal');
        return;
    }
    
    // Reset flip state
    state.isFlipped = false;
    state.isCardModalOpen = true;
    
    // Önce içeriği doldur
    if (elements.modalImage) {
        elements.modalImage.src = card.image;
        elements.modalImage.alt = card.title;
        elements.modalImage.onerror = function() {
            this.style.display = 'none';
        };
    }
    if (elements.modalText) {
        elements.modalText.textContent = card.text;
    }
    if (elements.modalSignature) {
        elements.modalSignature.textContent = card.signature;
    }
    
    // Flip'i kaldır (ön yüz göster)
    if (elements.modalCard) {
        elements.modalCard.classList.remove('flipped');
    }
    
    // Modali göster
    if (elements.cardModal) {
        elements.cardModal.classList.add('active');
        elements.cardModal.style.display = 'flex';
    }
    
    document.body.style.overflow = 'hidden';
    
    console.log('[DEBUG] Modal açıldı');
    
    playSound('flip');
    
    if (card.id >= 4) {
        setTimeout(() => playSound('heartbeat'), 600);
    }
}

function closeCardModal() {
    console.log('[DEBUG] Kart modali kapanıyor');
    
    if (!state.isCardModalOpen) return;
    
    if (elements.cardModal) {
        elements.cardModal.classList.remove('active');
        elements.cardModal.style.display = '';
    }
    
    document.body.style.overflow = '';
    state.isCardModalOpen = false;
    state.isFlipped = false;
    
    // Flip'i sıfırla
    setTimeout(() => {
        elements.modalCard?.classList.remove('flipped');
    }, 300);
}

function toggleCardFlip() {
    console.log('[DEBUG] Flip toggle');
    
    state.isFlipped = !state.isFlipped;
    
    if (elements.modalCard) {
        elements.modalCard.classList.toggle('flipped');
    }
    
    playSound('flip');
}

// ===== EVENT LISTENERS - MOBİL UYUMLU =====
function setupEventListeners() {
    console.log('[DEBUG] Event listenerlar ayarlanıyor');
    
    // Start - hem click hem touch
    elements.startBtn?.addEventListener('click', startExperience);
    elements.startBtn?.addEventListener('touchend', (e) => {
        e.preventDefault();
        startExperience();
    }, { passive: false });
    
    // Gift box
    setupGiftBox();
    
    // CARD MODAL EVENTS - MOBİL UYUMLU
    // Kartın kendisine tıklayınca flip
    elements.modalCard?.addEventListener('click', (e) => {
        if (e.target.closest('.modal-controls')) return;
        toggleCardFlip();
    });
    
    // Touch için
    elements.modalCard?.addEventListener('touchend', (e) => {
        if (e.target.closest('.modal-controls')) return;
        e.preventDefault();
        toggleCardFlip();
    }, { passive: false });
    
    // Döndür butonu - hem click hem touch
    elements.flipBtn?.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleCardFlip();
    });
    
    elements.flipBtn?.addEventListener('touchend', (e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleCardFlip();
    }, { passive: false });
    
    // Geri butonu - hem click hem touch
    elements.closeBtn?.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        closeCardModal();
    });
    
    elements.closeBtn?.addEventListener('touchend', (e) => {
        e.preventDefault();
        e.stopPropagation();
        closeCardModal();
    }, { passive: false });
    
    // Backdrop'a tıklayınca kapat
    document.querySelector('.modal-backdrop')?.addEventListener('click', (e) => {
        if (e.target === e.currentTarget) {
            closeCardModal();
        }
    });
    
    // GIFT MODAL EVENTS - MOBİL UYUMLU
    elements.finalCard?.addEventListener('click', (e) => {
        if (e.target.closest('.gift-controls')) return;
        toggleFinalCard();
    });
    
    elements.finalCard?.addEventListener('touchend', (e) => {
        if (e.target.closest('.gift-controls')) return;
        e.preventDefault();
        toggleFinalCard();
    }, { passive: false });
    
    // Gift flip butonu
    elements.giftFlipBtn?.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFinalCard();
    });
    
    elements.giftFlipBtn?.addEventListener('touchend', (e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFinalCard();
    }, { passive: false });
    
    // Gift close butonu
    elements.giftCloseBtn?.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        closeGiftModal();
    });
    
    elements.giftCloseBtn?.addEventListener('touchend', (e) => {
        e.preventDefault();
        e.stopPropagation();
        closeGiftModal();
    }, { passive: false });
    
    document.querySelector('.gift-modal-backdrop')?.addEventListener('click', (e) => {
        if (e.target === e.currentTarget) {
            closeGiftModal();
        }
    });
    
    // Keyboard
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (state.isGiftModalOpen) closeGiftModal();
            else if (state.isCardModalOpen) closeCardModal();
        }
    });
    
    // Music controls - mobil için touch desteği
    elements.playBtn?.addEventListener('click', toggleMusic);
    elements.playBtn?.addEventListener('touchend', (e) => {
        e.preventDefault();
        toggleMusic();
    }, { passive: false });
    
    elements.muteBtn?.addEventListener('click', toggleMute);
    elements.muteBtn?.addEventListener('touchend', (e) => {
        e.preventDefault();
        toggleMute();
    }, { passive: false });
    
    elements.replayBtn?.addEventListener('click', replayMusic);
    elements.replayBtn?.addEventListener('touchend', (e) => {
        e.preventDefault();
        replayMusic();
    }, { passive: false });
    
    console.log('[DEBUG] Event listenerlar ayarlandı');
}

// ===== CLICK HEARTS - MOBİL UYUMLU =====
function setupClickHearts() {
    // Desktop click
    document.addEventListener('click', (e) => {
        if (e.target.closest('button') || 
            e.target.closest('.card-wrapper') || 
            e.target.closest('.card-modal') ||
            e.target.closest('.gift-modal')) return;
        
        createClickHeart(e.clientX, e.clientY);
    });
    
    // Mobile touch
    document.addEventListener('touchstart', (e) => {
        if (e.target.closest('button') || 
            e.target.closest('.card-wrapper') || 
            e.target.closest('.card-modal') ||
            e.target.closest('.gift-modal')) return;
        
        const touch = e.touches[0];
        createClickHeart(touch.clientX, touch.clientY);
    }, { passive: true });
}

function createClickHeart(x, y) {
    const heart = document.createElement('div');
    heart.className = 'click-heart';
    heart.innerHTML = '♥';
    heart.style.left = `${x}px`;
    heart.style.top = `${y}px`;
    heart.style.color = ['#ec4899', '#ff006e', '#9d4edd'][Math.floor(Math.random() * 3)];
    elements.clickHearts?.appendChild(heart);
    
    setTimeout(() => heart.remove(), 1000);
}

// ===== PARALLAX =====
function setupParallax() {
    // Mobil'de parallax'i devre dışı bırak (performans için)
    if (window.innerWidth <= 768 || 'ontouchstart' in window) {
        debugLog('Parallax devre dışı (mobil)', {});
        return;
    }
    
    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 20;
        const y = (e.clientY / window.innerHeight - 0.5) * 20;
        
        document.querySelectorAll('.aurora').forEach((aurora, i) => {
            const factor = (i + 1) * 0.5;
            aurora.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
        });
    });
}

// ===== VISUALIZER =====
function createVisualizer() {
    if (!elements.visualizer) return;
    
    for (let i = 0; i < 20; i++) {
        const bar = document.createElement('div');
        bar.className = 'visualizer-bar';
        bar.style.height = '5px';
        elements.visualizer.appendChild(bar);
    }
    
    setInterval(() => {
        if (!state.musicStarted || elements.bgMusic.paused) {
            document.querySelectorAll('.visualizer-bar').forEach(bar => {
                bar.style.height = '5px';
            });
            return;
        }
        document.querySelectorAll('.visualizer-bar').forEach(bar => {
            bar.style.height = `${Math.random() * 40 + 10}px`;
        });
    }, 100);
}

// ===== START =====
document.addEventListener('DOMContentLoaded', init);

// ===== ROMANTIC FEATURES =====

// Create romantic floating particles
function createRomanticParticles() {
    const container = document.getElementById('romanticParticles');
    if (!container) return;
    
    // Mobil'de daha az partikül
    const isMobile = window.innerWidth <= 768;
    const particleCount = isMobile ? 8 : 15;
    
    const hearts = ['♥', '💕', '💗', '💖', '💘'];
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle-heart';
        particle.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.animationDelay = `${Math.random() * 20}s`;
        particle.style.animationDuration = `${15 + Math.random() * 10}s`;
        particle.style.fontSize = `${10 + Math.random() * 8}px`;
        container.appendChild(particle);
    }
    debugLog('Romantik partiküller oluşturuldu', { count: particleCount, mobile: isMobile });
}

// Rotating romantic messages
const romanticMessages = [
    "Sonsuza dek seninle...",
    "Kalbimde sadece sen varsın...",
    "Her anım seninle güzel...",
    "Seni düşünmek bile yetiyor...",
    "Aşkımız bir masal gibi...",
    "Sen benim en güzel şansımsın..."
];

function rotateRomanticMessages() {
    const messageEl = document.getElementById('loveMessage');
    const miniQuoteEl = document.getElementById('romanticQuoteMini');
    const countdownEl = document.getElementById('romanticCountdown');
    
    let index = 0;
    
    setInterval(() => {
        index = (index + 1) % romanticMessages.length;
        
        if (messageEl) {
            messageEl.style.opacity = '0';
            setTimeout(() => {
                messageEl.textContent = romanticMessages[index];
                messageEl.style.opacity = '1';
            }, 300);
        }
    }, 5000);
    
    // Mini quote rotation (different timing)
    const miniQuotes = [
        "Kalbimde sadece sen varsın...",
        "Seni sevmek bir ayrıcalık...",
        "Gözlerinde kaybolmak istiyorum...",
        "Sen benim mucizemsin..."
    ];
    
    let miniIndex = 0;
    setInterval(() => {
        miniIndex = (miniIndex + 1) % miniQuotes.length;
        if (miniQuoteEl) {
            miniQuoteEl.style.opacity = '0';
            setTimeout(() => {
                miniQuoteEl.textContent = `"${miniQuotes[miniIndex]}"`;
                miniQuoteEl.style.opacity = '1';
            }, 500);
        }
    }, 7000);
    
    // Countdown messages
    const countdownMessages = [
        "Seninle geçen her saniye bir mucize...",
        "Geleceğim sensin...",
        "Hayatımın anlamısın...",
        "Seni seviyorum, sonsuza dek..."
    ];
    
    let countIndex = 0;
    setInterval(() => {
        countIndex = (countIndex + 1) % countdownMessages.length;
        if (countdownEl) {
            countdownEl.style.opacity = '0';
            setTimeout(() => {
                countdownEl.textContent = countdownMessages[countIndex];
                countdownEl.style.opacity = '1';
            }, 500);
        }
    }, 6000);
}

// Add sparkle effect on special moments
function addSparkleEffect(element) {
    if (!element) return;
    
    const sparkle = document.createElement('div');
    sparkle.innerHTML = '✨';
    sparkle.style.position = 'absolute';
    sparkle.style.fontSize = '20px';
    sparkle.style.pointerEvents = 'none';
    sparkle.style.animation = 'sparkle 1s ease-out forwards';
    sparkle.style.left = `${Math.random() * 100}%`;
    sparkle.style.top = `${Math.random() * 100}%`;
    
    element.style.position = 'relative';
    element.appendChild(sparkle);
    
    setTimeout(() => sparkle.remove(), 1000);
}

// Enhanced love counter with celebration
function celebrateLoveMilestone(seconds) {
    if (seconds % 60 === 0) { // Every minute
        createRomanticConfetti();
        playSound('heartbeat');
    }
}

function createRomanticConfetti() {
    // Mobil'de daha az konfeti
    const isMobile = window.innerWidth <= 768;
    const confettiCount = isMobile ? 15 : 30;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.innerHTML = ['♥', '✨', '💕'][Math.floor(Math.random() * 3)];
        confetti.style.position = 'fixed';
        confetti.style.left = `${50 + (Math.random() - 0.5) * 50}%`;
        confetti.style.top = '50%';
        confetti.style.fontSize = `${isMobile ? 12 : 15 + Math.random() * 15}px`;
        confetti.style.pointerEvents = 'none';
        confetti.style.zIndex = '9999';
        confetti.style.animation = `romanticConfettiFall ${2 + Math.random()}s ease-out forwards`;
        document.body.appendChild(confetti);
        
        setTimeout(() => confetti.remove(), 3000);
    }
}

// Add romantic confetti animation to CSS dynamically
const romanticStyle = document.createElement('style');
romanticStyle.textContent = `
    @keyframes romanticConfettiFall {
        0% { transform: translateY(0) rotate(0deg) scale(1); opacity: 1; }
        100% { transform: translateY(${window.innerHeight}px) rotate(720deg) scale(0.5); opacity: 0; }
    }
`;
document.head.appendChild(romanticStyle);


// ===== MOBILE RESIZE HANDLER =====
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        const isMobile = window.innerWidth <= 768;
        const isSmallMobile = window.innerWidth <= 480;
        
        debugLog('Ekran boyutu değişti', { 
            width: window.innerWidth, 
            mobile: isMobile, 
            smallMobile: isSmallMobile 
        });
        
        // Partikülleri güncelle
        const particleContainer = document.getElementById('romanticParticles');
        if (particleContainer) {
            const currentParticles = particleContainer.querySelectorAll('.particle-heart');
            const targetCount = isMobile ? (isSmallMobile ? 0 : 8) : 15;
            
            // Fazla partikülleri kaldır
            if (currentParticles.length > targetCount) {
                for (let i = targetCount; i < currentParticles.length; i++) {
                    currentParticles[i]?.remove();
                }
            }
            // Eksik partikülleri ekle
            else if (currentParticles.length < targetCount) {
                const hearts = ['♥', '💕', '💗', '💖', '💘'];
                for (let i = currentParticles.length; i < targetCount; i++) {
                    const particle = document.createElement('div');
                    particle.className = 'particle-heart';
                    particle.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
                    particle.style.left = `${Math.random() * 100}%`;
                    particle.style.animationDelay = `${Math.random() * 20}s`;
                    particle.style.animationDuration = `${15 + Math.random() * 10}s`;
                    particle.style.fontSize = `${10 + Math.random() * 8}px`;
                    particleContainer.appendChild(particle);
                }
            }
        }
        
        // Love glow overlay'i mobilde kapat
        const loveGlow = document.querySelector('.love-glow-overlay');
        if (loveGlow) {
            loveGlow.style.display = isSmallMobile ? 'none' : 'block';
        }
        
    }, 250);
});

// ===== ORIENTATION CHANGE HANDLER (Mobile) =====
window.addEventListener('orientationchange', () => {
    setTimeout(() => {
        debugLog('Yön değişti', { orientation: window.orientation });
        // Carousel'i yeniden hesapla
        updateCarousel();
    }, 300);
});
