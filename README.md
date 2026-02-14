# 🎵 AZRA - Happy Birthday Love Card

> "I love you like a love song... forever" ♥

A romantic birthday card experience with synchronized music and 5 unlockable cards.

---

## 📁 Correct File Structure

```
AZRA'NIN DOGUM GUNU/
├── index.html          # Main website (single file)
├── README.md           # This file
└── assets/
    ├── audio/          # Audio files (YOU MUST ADD THESE)
    │   ├── love-you-like-a-love-song.mp3  # Main song
    │   ├── flip.mp3                         # Card flip sound
    │   ├── unlock-chime.mp3                 # Card unlock sound
    │   ├── heartbeat.mp3                    # Heartbeat for cards 4 & 5
    │   ├── click-soft.mp3                   # Button click sound
    │   └── beat-pulse.mp3                   # Beat pulse (bonus)
    │
    └── images/         # Photos (YOU MUST ADD THESE)
        ├── photo-1.jpg  # Pembe Dünya
        ├── photo-2.jpg  # Çiçek ve Sen
        ├── photo-3.jpg  # Gün Batımı
        ├── photo-4.jpg  # Gözlerin
        └── photo-5.jpg  # Gizli Kart
```

---

## 🚀 Setup Instructions

### Step 1: Add the Music

Place **"Love You Like A Love Song" by Selena Gomez** in:
```
assets/audio/love-you-like-a-love-song.mp3
```

### Step 2: Add Sound Effects (Optional but recommended)

Download or create these short sound effects:
- `flip.mp3` - A card flipping sound (~0.3 seconds)
- `unlock-chime.mp3` - A magical unlock chime (~0.5 seconds)
- `heartbeat.mp3` - A heartbeat sound (~1 second)
- `click-soft.mp3` - A soft button click (~0.1 seconds)
- `beat-pulse.mp3` - Beat pulse sound (bonus)

If you don't add these, the website will still work - it just won't play sound effects.

### Step 3: Add Your Photos

Place 5 photos in `assets/images/`:

| File | Card | Description |
|------|------|-------------|
| `photo-1.jpg` | Card 1 | Pembe Dünya - Pink/soft scene |
| `photo-2.jpg` | Card 2 | Çiçek ve Sen - Flower photo |
| `photo-3.jpg` | Card 3 | Gün Batımı - Sunset scene |
| `photo-4.jpg` | Card 4 | Gözlerin - Azra's photo |
| `photo-5.jpg` | Card 5 | Gizli Kart - Chibi/flower aesthetic |

**Note:** If images are missing, emoji placeholders will show instead.

### Step 4: Open in Browser

Simply open `index.html` in any modern web browser.

**Recommended:** Use a local server for best experience:
```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve

# Using PHP
php -S localhost:8000
```

Then visit `http://localhost:8000`

---

## 🎮 How It Works

### 1. Start Screen
- Click/tap anywhere to start
- This is **required** - browsers block autoplay without user interaction

### 2. Cards Unlock Automatically
| Time | Card | Event |
|------|------|-------|
| 0:00 | Card 1 | Unlocks immediately |
| 0:20 | Card 2 | Shake + unlock sound |
| 0:40 | Card 3 | **CHORUS EXPLOSION** + confetti |
| 1:00 | Card 4 | Dreamy unlock + heartbeat |
| 1:30 | Card 5 | **ULTIMATE**: White flash + sakura storm |

### 3. Interactions
- **Tap card** to flip and read the message
- **Play/Pause** button to control music
- **Mute** button to toggle sound
- **Replay** button to restart

### 4. Final Screen
When the song ends (~2:30), a final birthday message appears with options to replay or view all cards.

---

## 🎵 Audio Features Fixed

✅ **Autoplay Fix**: Music starts on first user click (browser requirement)
✅ **Correct Paths**: Uses `"./assets/audio/"` relative paths
✅ **Error Handling**: Gracefully handles missing audio files
✅ **Flip Sound**: Plays when flipping cards
✅ **Volume Control**: 70% default volume

---

## 📱 Mobile Support

- Touch-friendly card interactions
- Swipe to scroll between cards
- Haptic feedback on unlocks (if supported)
- Responsive design for all screen sizes

---

## 🎨 Card Themes

| Card | Color | Glow |
|------|-------|------|
| 1 - Pembe Dünya | Pink | Soft pink |
| 2 - Çiçek ve Sen | Green | Nature green |
| 3 - Gün Batımı ⭐ | Gold | **Animated gold** |
| 4 - Gözlerin | Blue | Dreamy blue |
| 5 - Gizli Kart | White/Pink | **Animated white** |

---

## 🔧 Troubleshooting

### "Audio file not found" error
- Check that `love-you-like-a-love-song.mp3` is in `assets/audio/`
- Check the filename matches exactly (case-sensitive on some systems)
- Ensure no double extension like `.mp3.mp3`

### Music doesn't play
- You MUST click/tap the start screen first (browser requirement)
- Check that your audio file isn't corrupted
- Try a different browser (Chrome recommended)

### Images don't show
- Check that photos are in `assets/images/`
- Supported formats: `.jpg`, `.jpeg`, `.png`
- If missing, emoji placeholders will appear

### Sound effects not playing
- Sound effects are optional - website works without them
- Add `flip.mp3`, `unlock-chime.mp3`, etc. to `assets/audio/` for full experience

---

## 💾 Progress Saving

The website saves:
- Which cards you've unlocked
- Which cards you've flipped
- Automatically saved to browser storage

---

## 🎁 For Azra

Every card contains a romantic message from Enes. The experience is timed to "Love You Like A Love Song" to create an unforgettable birthday surprise.

> "Sen benim en güzel kaderimsin." 💕

---

Made with ♥ for Azra's Birthday
