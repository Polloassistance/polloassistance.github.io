<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pollo Assistance - All-in-one AI assistant</title>
    <meta name="description" content="Pollo Assistance: all-in-one AI ecosystem. Chat, images, study, code and more. One-time payment, no subscriptions.">
    <meta property="og:image" content="https://polloassistance.github.io/logo.png">
    <meta name="twitter:image" content="https://polloassistance.github.io/logo.png">
    <link rel="apple-touch-icon" href="logo.png">
    <meta name="author" content="Pollo Assistance Studios">
    <meta name="keywords" content="pollo assistance, asistente IA, inteligencia artificial, chat IA, generador de imagenes, AI assistant, pago unico">

    <!-- Open Graph -->
    <meta property="og:title" content="Pollo Assistance - Your all-in-one AI assistant">
    <meta property="og:description" content="AI ecosystem with chat, images, study, code and more. One-time payment, no subscriptions.">
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://polloassistance.github.io">

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="Pollo Assistance - Your all-in-one AI assistant">
    <meta name="twitter:description" content="AI ecosystem with chat, images, study, code and more. One-time payment, no subscriptions.">

    <link rel="icon" type="image/png" href="logo.png">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="styles.css">
</head>
<body>

    <!-- ============================================================ -->
    <!-- NAVEGACION -->
    <!-- ============================================================ -->
    <nav class="navbar" id="navbar">
        <div class="nav-container">
            <a href="#" class="nav-logo"><img src="logo.png" alt="" class="nav-logo-img">Pollo Assistance</a>
            <div class="nav-links" id="navLinks">
                <a href="#funciones">Features</a>
                <a href="#modulos">Modules</a>
                <a href="#precios">Pricing</a>
                <a href="#empezar">Get started</a>
                <a href="wiki/">Wiki</a>
                <div class="nav-dropdown">
                    <button class="nav-dropdown-toggle">More Tools <span class="arrow">▾</span></button>
                    <div class="nav-dropdown-menu">
                        <a href="https://auraeon.es" target="_blank" rel="noopener" class="nav-dropdown-item">
                            <span class="nav-dropdown-item-name"><span class="tool-emoji">🌱</span> AuraEON</span>
                            <span class="tool-tag">Edu</span>
                        </a>
                    </div>
                </div>
            </div>
            <a href="https://pollo-assistance.web.app" class="nav-cta" data-i18n="nav.open_app">Open app</a>
            <div id="ghUserWidget" style="display:none; align-items:center; gap:10px; margin-left:10px;">
                <img id="ghUserAvatar" src="logo.png" alt="" style="width:34px; height:34px; border-radius:50%; object-fit:cover; border:2px solid #fff; box-shadow:0 1px 4px rgba(0,0,0,0.15);">
                <span id="ghUserName" style="font-weight:600; font-size:14px; color:#1a1a2e; max-width:150px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;"></span>
                <button id="ghLogoutBtn" style="background:none; border:1px solid #ddd; border-radius:8px; padding:4px 10px; cursor:pointer; font-size:12px;" title="Log out">↩</button>
            </div>
            <button id="ghLoginBtn" onclick="ghOpenLogin()" style="margin-left:10px; background:linear-gradient(135deg,#FF9800,#F57C00); color:white; border:none; padding:8px 16px; border-radius:8px; cursor:pointer; font-size:14px; font-weight:600;" data-i18n="common.login">Log in</button>
            <button class="nav-toggle" id="navToggle" aria-label="Menu">
                <span></span><span></span><span></span>
            </button>
        </div>
    </nav>

    <!-- ============================================================ -->
    <!-- HERO -->
    <!-- ============================================================ -->
    <section class="hero">
        <div class="hero-bg"></div>
        <div class="hero-content">
            <div class="hero-badge">All-in-one AI ecosystem</div>
            <h1>Your smart assistant.<br><span class="hero-accent">One payment. Forever.</span></h1>
            <p class="hero-subtitle">
                AI chat, image generation, study tools, code editor
                and much more. All on one platform, no subscriptions.
            </p>
            <div class="hero-actions">
                <a href="https://pollo-assistance.web.app" class="btn btn-primary">Start free</a>
                <a href="#funciones" class="btn btn-secondary">Discover more</a>
            </div>
            <p class="hero-note">20 free messages every 6 hours. No credit card required.</p>
        </div>
    </section>

    <!-- ============================================================ -->
    <!-- FUNCIONES PRINCIPALES -->
    <!-- ============================================================ -->
    <section class="features" id="funciones">
        <div class="container">
            <div class="section-header">
                <h2>Everything you need in one place</h2>
                <p>Pollo Assistance brings together the most useful AI tools on a unified platform.</p>
            </div>
            <div class="features-grid">
                <div class="feature-card">
                    <div class="feature-icon">💬</div>
                    <h3>Smart chat</h3>
                    <p>Natural conversations with context memory. The AI remembers your previous chats to give you more relevant responses.</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">🎨</div>
                    <h3>Image generation</h3>
                    <p>Create images from text directly in the chat. Describe what you imagine and the AI generates it instantly.</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">🔍</div>
                    <h3>Web search</h3>
                    <p>The AI searches for updated information on the internet when needed, always citing sources.</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">🎤</div>
                    <h3>Voice to text</h3>
                    <p>Speak instead of typing. Built-in voice recognition and text-to-speech for responses.</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">♟️</div>
                    <h3>Chess analysis</h3>
                    <p>Upload a game image or paste the PGN. The AI analyzes every move and gives you its evaluation.</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">📊</div>
                    <h3>Interactive diagrams</h3>
                    <p>Generate concept maps and visual diagrams from any text or topic.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- ============================================================ -->
    <!-- MODULOS -->
    <!-- ============================================================ -->
    <section class="modules" id="modulos">
        <div class="container">
            <div class="section-header">
                <h2>A complete ecosystem</h2>
                <p>Five specialized modules that cover everything you need.</p>
            </div>
            <div class="modules-list">

                <div class="module-card">
                    <div class="module-header">
                        <div class="module-name">
                            <span class="module-icon">🐔</span>
                            <h3>Pollo Assistance</h3>
                        </div>
                        <span class="module-tag">Core</span>
                    </div>
                    <p>The main assistant. AI chat, image generation and analysis, web search, voice, and all the platform's power in a clean and fast interface.</p>
                </div>

                <div class="module-card">
                    <div class="module-header">
                        <div class="module-name">
                            <span class="module-icon">📚</span>
                            <h3>Pollo STUDY</h3>
                        </div>
                        <span class="module-tag">Education</span>
                    </div>
                    <p>Your study companion. Generate summaries, prepare multiple-choice tests, explain complex concepts simply and create diagrams to organize your ideas.</p>
                </div>

                <div class="module-card">
                    <div class="module-header">
                        <div class="module-name">
                            <span class="module-icon">💻</span>
                            <h3>Pollo CODE</h3>
                        </div>
                        <span class="module-tag">Development</span>
                    </div>
                    <p>AI-powered programming environment. Generate code, debug errors, optimize functions and run code in the browser. Supports multiple languages.</p>
                </div>

                <div class="module-card">
                    <div class="module-header">
                        <div class="module-name">
                            <span class="module-icon">📄</span>
                            <h3>Pollo FILES</h3>
                        </div>
                        <span class="module-tag">Documents</span>
                    </div>
                    <p>Upload your documents and PDFs and ask anything about them. Deep file analysis up to 10 MB in premium.</p>
                </div>

                <div class="module-card">
                    <div class="module-header">
                        <div class="module-name">
                            <span class="module-icon">🚀</span>
                            <h3>Pollo GO</h3>
                        </div>
                        <span class="module-tag">Utilities</span>
                    </div>
                    <p>Quick access to tools and utilities. Navigate intelligently and reach key features without detours.</p>
                </div>

            </div>
        </div>
    </section>

    <!-- ============================================================ -->
    <!-- PRECIOS -->
    <!-- ============================================================ -->
    <section class="pricing" id="precios">
        <div class="container">
            <div class="section-header">
                <h2>Fair pricing, no surprises</h2>
                <p>No monthly subscriptions. Pay once and it's yours forever.</p>
            </div>
            <div class="pricing-grid">

                <div class="price-card">
                    <div class="price-tier">Free</div>
                    <div class="price-amount">$0</div>
                    <div class="price-period">forever</div>
                    <ul class="price-features">
                        <li>20 messages every 6 hours</li>
                        <li>2 MB storage</li>
                        <li>Palos and Luces models</li>
                        <li>Basic AI chat</li>
                        <li>Image generation</li>
                    </ul>
                    <a href="https://pollo-assistance.web.app" class="btn btn-outline">Start free</a>
                </div>

                <div class="price-card price-card-featured">
                    <div class="price-badge">Recommended</div>
                    <div class="price-tier">Premium</div>
                    <div class="price-amount">$25</div>
                    <div class="price-period">one-time payment - lifetime</div>
                    <ul class="price-features">
                        <li><strong>Unlimited messages</strong></li>
                        <li><strong>10 MB</strong> storage</li>
                        <li><strong>All models</strong> (includes Summum)</li>
                        <li>All features unlocked</li>
                        <li>Full integration with Files and Code</li>
                        <li>Deep document analysis</li>
                        <li>Priority support</li>
                    </ul>
                    <a href="https://pollo-assistance.web.app/premium.html" class="btn btn-primary">Get Premium</a>
                </div>

            </div>
            <p class="pricing-note">We also accept <strong>gift cards</strong>. Ask in the app chat.</p>
        </div>
    </section>

    <!-- ============================================================ -->
    <!-- COMO EMPEZAR -->
    <!-- ============================================================ -->
    <section class="getting-started" id="empezar">
        <div class="container">
            <div class="section-header">
                <h2>Get started in under a minute</h2>
            </div>
            <div class="steps-grid">
                <div class="step">
                    <div class="step-number">1</div>
                    <h3>Create your account</h3>
                    <p>Sign up with your email or Google. It's free and takes 10 seconds.</p>
                </div>
                <div class="step">
                    <div class="step-number">2</div>
                    <h3>Verify your email</h3>
                    <p>Check your inbox and confirm your email address.</p>
                </div>
                <div class="step">
                    <div class="step-number">3</div>
                    <h3>Start chatting</h3>
                    <p>Open a new chat and ask Pollo Assistance anything you want.</p>
                </div>
            </div>
            <div class="steps-cta">
                <a href="https://pollo-assistance.web.app" class="btn btn-primary btn-large">Open Pollo Assistance</a>
                <p>Available on web and as an Android app.</p>
            </div>
        </div>
    </section>

    <!-- ============================================================ -->
    <!-- AURAEON -->
    <!-- ============================================================ -->
    <section class="auraeon">
        <div class="container">
            <div class="auraeon-content">
                <div class="auraeon-text">
                    <div class="auraeon-badge">Education</div>
                    <h2>Integrated with AuraEON</h2>
                    <p>Pollo Assistance is the central account and AI system for <strong>AuraEON</strong>, an educational project designed for schools to manage student learning and participation.</p>
                    <a href="wiki/auraeon.html" class="btn btn-outline">Learn more</a>
                </div>
            </div>
        </div>
    </section>

    <!-- ============================================================ -->
    <!-- FOOTER -->
    <!-- ============================================================ -->
    <footer class="footer">
        <div class="container">
            <div class="footer-grid">
                <div class="footer-brand">
                    <img src="logo.png" alt="Pollo Assistance" class="footer-logo">
                    <h3>Pollo Assistance</h3>
                    <p>Independent AI ecosystem.<br>One-time payment, no subscriptions.</p>
                </div>
                <div class="footer-links">
                    <h4>Product</h4>
                    <a href="#funciones">Features</a>
                    <a href="#modulos">Modules</a>
                    <a href="#precios">Pricing</a>
                    <a href="https://pollo-assistance.web.app">Open app</a>
                </div>
                <div class="footer-links">
                    <h4>Resources</h4>
                    <a href="wiki/">Official Wiki</a>
                    <a href="https://github.com/cornypalomita2012-max/Pollo-assistance-docs_Official-Repo/">Documentation</a>
                    <a href="https://github.com/Polloassistance">GitHub</a>
                </div>
                <div class="footer-links">
                    <h4>Ecosystem</h4>
                    <a href="https://auraeon.es">AuraEON</a>
                    <a href="https://pollo-assistance.web.app">Pollo Assistance App</a>
                    <a href="wiki/preguntas-frecuentes.html">FAQ</a>
                </div>
            </div>
            <div class="footer-bottom">
                <div class="footer-social">
                    <a href="https://youtube.com/@polloassistance" target="_blank" rel="noopener" aria-label="YouTube" class="footer-social-icon">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                        </svg>
                    </a>
                    <a href="https://x.com/polloassistance" target="_blank" rel="noopener" aria-label="X" class="footer-social-icon">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                        </svg>
                    </a>
                </div>
                <p>&copy; 2024-2026 Pollo Assistance Studios. All rights reserved.</p>
            </div>
        </div>
    </footer>

    <script src="i18n.js"></script>
    <script src="script.js"></script>

    <!-- ============================================================ -->
    <!-- LOGIN MODAL + FIREBASE AUTH + i18n                         -->
    <!-- ============================================================ -->
    <div id="ghLoginModal" style="display:none; position:fixed; inset:0; background:rgba(0,0,0,0.5); z-index:9999; align-items:center; justify-content:center;">
        <div style="background:white; padding:32px; border-radius:18px; max-width:380px; width:90%; box-shadow:0 20px 60px rgba(0,0,0,0.3);">
            <div style="text-align:center; margin-bottom:20px;">
                <img src="logo.png" style="width:60px; height:60px; border-radius:14px; margin-bottom:10px;">
                <h2 style="font-size:22px; color:#1a1a2e; margin:0;" data-i18n="common.login">Log in</h2>
                <p style="font-size:13px; color:#888; margin-top:4px;">Pollo Assistance</p>
            </div>
            <input type="email" id="ghEmail" placeholder="Email" style="width:100%; padding:12px 14px; border:1px solid #ddd; border-radius:10px; font-size:14px; margin-bottom:10px;">
            <input type="password" id="ghPassword" placeholder="Password" style="width:100%; padding:12px 14px; border:1px solid #ddd; border-radius:10px; font-size:14px; margin-bottom:14px;">
            <button onclick="ghDoLogin()" style="width:100%; background:linear-gradient(135deg,#FF9800,#F57C00); color:white; border:none; padding:12px; border-radius:10px; font-size:15px; font-weight:600; cursor:pointer; margin-bottom:8px;" data-i18n="common.login">Log in</button>
            <button onclick="ghDoSignup()" style="width:100%; background:white; color:#FF9800; border:1px solid #FF9800; padding:12px; border-radius:10px; font-size:14px; font-weight:600; cursor:pointer; margin-bottom:8px;" data-i18n="common.signup">Sign up</button>
            <button onclick="document.getElementById('ghLoginModal').style.display='none'" style="width:100%; background:none; border:none; color:#999; padding:8px; font-size:13px; cursor:pointer;" data-i18n="common.close">Close</button>
            <p id="ghLoginError" style="color:#f44336; font-size:13px; text-align:center; margin-top:8px; min-height:18px;"></p>
        </div>
    </div>

    <script src="https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/10.7.1/firebase-auth-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore-compat.js"></script>
    <script>
    (function(){
        const firebaseConfig = {
            apiKey: "AIzaSyAF-Cnq56kTOZ8ltRfi2lmJNyaeronW0Zw",
            authDomain: "pollo-assistance.firebaseapp.com",
            projectId: "pollo-assistance",
            storageBucket: "pollo-assistance.firebasestorage.app",
            messagingSenderId: "823252162365",
            appId: "1:823252162365:web:abc123def456"
        };
        if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
        const auth = firebase.auth();
        const db = firebase.firestore();

        window.ghOpenLogin = function(){ document.getElementById('ghLoginModal').style.display='flex'; };
        window.ghDoLogin = function(){
            const e = document.getElementById('ghEmail').value;
            const p = document.getElementById('ghPassword').value;
            auth.signInWithEmailAndPassword(e, p).then(()=>{
                document.getElementById('ghLoginModal').style.display='none';
            }).catch(err => document.getElementById('ghLoginError').textContent = err.message);
        };
        window.ghDoSignup = function(){
            const e = document.getElementById('ghEmail').value;
            const p = document.getElementById('ghPassword').value;
            auth.createUserWithEmailAndPassword(e, p).then(u => {
                if (u.user) u.user.sendEmailVerification();
                document.getElementById('ghLoginModal').style.display='none';
            }).catch(err => document.getElementById('ghLoginError').textContent = err.message);
        };
        document.getElementById('ghLogoutBtn').onclick = function(){ auth.signOut(); };

        auth.onAuthStateChanged(async function(user){
            const widget = document.getElementById('ghUserWidget');
            const loginBtn = document.getElementById('ghLoginBtn');
            if (user) {
                widget.style.display = 'flex';
                loginBtn.style.display = 'none';
                let displayName = user.email;
                let avatarUrl = user.photoURL || 'logo.png';
                let userLang = null;
                try {
                    const doc = await db.collection('users').doc(user.uid).get();
                    if (doc.exists) {
                        const d = doc.data();
                        if (d.displayName) displayName = d.displayName;
                        if (d.avatarUrl) avatarUrl = d.avatarUrl;
                        if (d.settings && d.settings.language) userLang = d.settings.language;
                    }
                } catch(e){}
                document.getElementById('ghUserName').textContent = displayName;
                document.getElementById('ghUserAvatar').src = avatarUrl;
                if (!avatarUrl || avatarUrl === 'logo.png') {
                    // letter fallback
                    const letter = (displayName || 'P').charAt(0).toUpperCase();
                    document.getElementById('ghUserAvatar').src =
                        'data:image/svg+xml;utf8,' + encodeURIComponent(
                            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><circle cx="32" cy="32" r="32" fill="#FF9800"/><text x="32" y="42" font-family="Arial,sans-serif" font-size="32" font-weight="bold" fill="white" text-anchor="middle">'+letter+'</text></svg>'
                        );
                }
                if (userLang && window.PolloI18n) window.PolloI18n.setLang(userLang);
            } else {
                widget.style.display = 'none';
                loginBtn.style.display = '';
            }
        });
    })();
    </script>
    <script src="i18n.js"></script>
</body>
</html>
