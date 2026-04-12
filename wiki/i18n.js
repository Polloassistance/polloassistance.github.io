/* ============================================================
   POLLO ASSISTANCE - i18n SYSTEM (auto-detect + auto-translate)
   - Detects browser language on first visit (es-* => Spanish, else English)
   - Stores user choice in localStorage 'pollo_lang'
   - Translates [data-i18n] / [data-i18n-placeholder] / [data-i18n-title]
   - ALSO does a bulk text replacement (ES <-> EN) on the page so pages
     without explicit data-i18n are still translated.
   ============================================================ */
(function () {
    'use strict';

    // ---------------- KEY-BASED TRANSLATIONS ----------------
    const TRANSLATIONS = {
        en: {
            'app.name': 'Pollo Assistance',
            'app.tagline': 'All-in-one AI assistant',
            'common.back': '← Back',
            'common.save': 'Save changes',
            'common.cancel': 'Cancel',
            'common.delete': 'Delete',
            'common.loading': 'Loading...',
            'common.saved': 'Changes saved',
            'common.error': 'An error occurred',
            'common.continue': 'Continue',
            'common.close': 'Close',
            'common.send': 'Send',
            'common.search': 'Search',
            'common.new_chat': 'New chat',
            'common.settings': 'Settings',
            'common.logout': 'Log out',
            'common.login': 'Log in',
            'common.signup': 'Sign up',
            'common.email': 'Email',
            'common.password': 'Password',
            'common.username': 'Username',
            'common.free': 'FREE',
            'common.premium': 'PREMIUM',
            'common.maintenance': 'Under maintenance',

            'nav.home': 'Home',
            'nav.wiki': 'Wiki',
            'nav.open_app': 'Open app',
            'nav.features': 'Features',
            'nav.modules': 'Modules',
            'nav.pricing': 'Pricing',
            'nav.start': 'Get started',

            'settings.title': 'Settings',
            'settings.profile': 'Profile',
            'settings.change_photo': 'Change photo',
            'settings.username': 'Username',
            'settings.username_desc': 'How Pollo Assistance addresses you',
            'settings.ai_prefs': 'AI Preferences',
            'settings.default_model': 'Default model',
            'settings.default_model_desc': 'Model selected when creating a new chat',
            'settings.chat_memory': 'Remember previous chats',
            'settings.chat_memory_desc': 'AI looks at your previous chats for relevant context',
            'settings.tts': 'Read aloud',
            'settings.tts_desc': 'AI reads its responses automatically',
            'settings.custom_instructions': 'Custom instructions',
            'settings.custom_instructions_desc': 'Tell the AI how you want it to respond (tone, language, level of detail, etc.)',
            'settings.appearance': 'Appearance',
            'settings.theme': 'Theme',
            'settings.theme_desc': 'Visual look of the application',
            'settings.theme_default': 'Default',
            'settings.theme_dark': 'Dark',
            'settings.theme_light': 'Light',
            'settings.theme_orange': 'Orange',
            'settings.text_size': 'Text size',
            'settings.text_size_desc': 'Size of text in chat messages',
            'settings.size_small': 'Small',
            'settings.size_medium': 'Normal',
            'settings.size_large': 'Large',
            'settings.language': 'Language',
            'settings.language_desc': 'Interface language',
            'settings.lang_en': 'English',
            'settings.lang_es': 'Spanish',
            'settings.privacy': 'Privacy',
            'settings.moderation': 'Content moderation',
            'settings.moderation_desc': 'Filter inappropriate content before sending it to the AI',
            'settings.account': 'Account',
            'settings.current_plan': 'Current plan',
            'settings.upgrade': 'Upgrade plan',
            'settings.free_plan_desc': 'Free plan - 20 messages every 6 hours',
            'settings.premium_plan_desc': 'Premium plan - Unlimited messages, lifetime',
            'settings.clear_cache': 'Clear cache',
            'settings.clear_cache_desc': 'Reset local storage space',
            'settings.logout_desc': 'Sign out on this device',

            'premium.title': 'Pollo Assistance Premium',
            'premium.maintenance_title': 'Payments temporarily unavailable',
            'premium.maintenance_desc': 'Card payments are under maintenance. You can still redeem gift cards below.',

            'chat.placeholder': 'Send a message to Pollo...',
            'chat.thinking': 'Pollo Assistance is thinking...',
            'chat.searching': 'Searching...',
            'chat.sources': 'Sources',
            'chat.regenerate': 'Regenerate',
            'chat.copy': 'Copy',

            'toast.saved': 'Changes saved successfully',
            'toast.error_save': 'Error saving changes',
            'toast.cache_cleared': 'Cache cleared successfully',

            // Welcome screen
            'welcome.storage_tip': 'Upgrade to Premium for 10 MB',
            'welcome.new_chat_desc': 'Start a conversation with Pollo Assistance',
            'welcome.my_chats': 'My chats',
            'welcome.my_chats_desc': 'Open your previous conversations',
            'welcome.gift_card': 'Gift card',
            'welcome.gift_card_desc': 'Redeem a code to get premium',
            'welcome.get_premium': 'Get Premium',
            'welcome.get_premium_desc': 'Unlimited messages for $25, one-time payment',
            'welcome.modules': 'Modules',
            'welcome.mod_study': 'Academic assistant',
            'welcome.mod_code': 'Code editor',
            'welcome.mod_files': 'Document analysis',
            'welcome.mod_ext_name': 'Extensions',
            'welcome.mod_ext': 'Extend features',
            'welcome.footer_copy': '© 2024-2026 Pollo Assistance Studios · One-time payment, no subscriptions.',
            'welcome.official_web': 'Official website',
            'welcome.exit': 'Log out',
            'welcome.level': 'Level:',

            // Panel (in-app settings)
            'panel.title': '⚙️ Options',
            'panel.theme_title': '🎨 Visual theme',
            'panel.theme_desc': 'Change the interface appearance',
            'panel.theme_default': 'Purple (Default)',
            'panel.theme_dark': 'Dark',
            'panel.theme_light': 'Light',
            'panel.theme_orange': 'Chicken Orange',
            'panel.memory_title': '🧠 Previous chat memory',
            'panel.memory_desc': 'Allow Pollo to remember previous conversations',
            'panel.memory_note': '✅ FREE - "chats" collection only',
            'panel.integration_title': '🔗 Full tool integration',
            'panel.integration_desc': 'Pollo can edit FILES, CODE, GO and access all your collections',
            'panel.integration_note_premium': '⭐ PREMIUM - Unlock all capabilities',
            'panel.integration_note_enabled': '✅ PREMIUM - Feature enabled',
            'panel.upgrade_btn': '⭐ Upgrade to Premium - $25',
            'panel.more_settings': 'More settings →',

            // Limit modal
            'limit.title': '🐔 Message limit reached',
            'limit.desc_html': 'Free users can send up to 20 messages every 6 hours.',
            'limit.timer_label': '⏰ You can chat again in:',
            'limit.premium_title': '⭐ Upgrade to Premium',
            'limit.feature1': '✅ Unlimited messages',
            'limit.feature2': '✅ No time restrictions',
            'limit.feature3': '✅ 10 MB storage',
            'limit.feature4': '✅ Access to all extensions',
            'limit.feature5': '✅ Pollo Assistance CODE',
            'limit.upgrade_btn': '🏆 Get Premium - $25',
            'limit.footer': 'One-time payment. No subscriptions. Lifetime access.',

            // Chess
            'chess.analyzing': 'Analyzing game...'
        },
        es: {
            'app.name': 'Pollo Assistance',
            'app.tagline': 'Tu asistente IA todo en uno',
            'common.back': '← Volver',
            'common.save': 'Guardar cambios',
            'common.cancel': 'Cancelar',
            'common.delete': 'Borrar',
            'common.loading': 'Cargando...',
            'common.saved': 'Cambios guardados',
            'common.error': 'Ha ocurrido un error',
            'common.continue': 'Continuar',
            'common.close': 'Cerrar',
            'common.send': 'Enviar',
            'common.search': 'Buscar',
            'common.new_chat': 'Nuevo chat',
            'common.settings': 'Configuración',
            'common.logout': 'Cerrar sesión',
            'common.login': 'Iniciar sesión',
            'common.signup': 'Registrarse',
            'common.email': 'Correo',
            'common.password': 'Contraseña',
            'common.username': 'Nombre de usuario',
            'common.free': 'GRATIS',
            'common.premium': 'PREMIUM',
            'common.maintenance': 'En mantenimiento',

            'nav.home': 'Inicio',
            'nav.wiki': 'Wiki',
            'nav.open_app': 'Abrir app',
            'nav.features': 'Funciones',
            'nav.modules': 'Módulos',
            'nav.pricing': 'Precios',
            'nav.start': 'Empezar',

            'settings.title': 'Configuración',
            'settings.profile': 'Perfil',
            'settings.change_photo': 'Cambiar foto',
            'settings.username': 'Nombre de usuario',
            'settings.username_desc': 'Cómo te llama Pollo Assistance',
            'settings.ai_prefs': 'Preferencias de IA',
            'settings.default_model': 'Modelo predeterminado',
            'settings.default_model_desc': 'Modelo que se selecciona al crear un chat nuevo',
            'settings.chat_memory': 'Recordar chats anteriores',
            'settings.chat_memory_desc': 'La IA busca en tus chats anteriores para darte contexto relevante',
            'settings.tts': 'Lectura en voz alta',
            'settings.tts_desc': 'La IA lee sus respuestas automáticamente',
            'settings.custom_instructions': 'Instrucciones personalizadas',
            'settings.custom_instructions_desc': 'Dale instrucciones a la IA sobre cómo quieres que te responda (tono, idioma, nivel de detalle, etc.)',
            'settings.appearance': 'Apariencia',
            'settings.theme': 'Tema',
            'settings.theme_desc': 'Aspecto visual de la aplicación',
            'settings.theme_default': 'Predeterminado',
            'settings.theme_dark': 'Oscuro',
            'settings.theme_light': 'Claro',
            'settings.theme_orange': 'Naranja',
            'settings.text_size': 'Tamaño de texto',
            'settings.text_size_desc': 'Tamaño del texto en los mensajes del chat',
            'settings.size_small': 'Pequeño',
            'settings.size_medium': 'Normal',
            'settings.size_large': 'Grande',
            'settings.language': 'Idioma',
            'settings.language_desc': 'Idioma de la interfaz',
            'settings.lang_en': 'Inglés',
            'settings.lang_es': 'Español',
            'settings.privacy': 'Privacidad',
            'settings.moderation': 'Moderación de contenido',
            'settings.moderation_desc': 'Filtra contenido inapropiado antes de enviarlo a la IA',
            'settings.account': 'Cuenta',
            'settings.current_plan': 'Plan actual',
            'settings.upgrade': 'Mejorar plan',
            'settings.free_plan_desc': 'Plan gratuito - 20 mensajes cada 6 horas',
            'settings.premium_plan_desc': 'Plan premium - Mensajes ilimitados, de por vida',
            'settings.clear_cache': 'Borrar caché',
            'settings.clear_cache_desc': 'Reinicia el espacio de almacenamiento local',
            'settings.logout_desc': 'Cierra tu sesión en este dispositivo',

            'premium.title': 'Pollo Assistance Premium',
            'premium.maintenance_title': 'Pagos temporalmente no disponibles',
            'premium.maintenance_desc': 'El pago con tarjeta está en mantenimiento. Aún puedes canjear tarjetas regalo abajo.',

            'chat.placeholder': 'Envía un mensaje a Pollo...',
            'chat.thinking': 'Pollo Assistance está pensando...',
            'chat.searching': 'Buscando...',
            'chat.sources': 'Fuentes',
            'chat.regenerate': 'Regenerar',
            'chat.copy': 'Copiar',

            'toast.saved': 'Cambios guardados correctamente',
            'toast.error_save': 'Error al guardar los cambios',
            'toast.cache_cleared': 'Caché borrada correctamente',

            // Welcome screen
            'welcome.storage_tip': 'Actualiza a Premium para obtener 10 MB',
            'welcome.new_chat_desc': 'Empieza una conversación con Pollo Assistance',
            'welcome.my_chats': 'Mis chats',
            'welcome.my_chats_desc': 'Abre tus conversaciones anteriores',
            'welcome.gift_card': 'Tarjeta regalo',
            'welcome.gift_card_desc': 'Canjea un código para obtener premium',
            'welcome.get_premium': 'Obtener Premium',
            'welcome.get_premium_desc': 'Mensajes ilimitados por $25, pago único',
            'welcome.modules': 'Módulos',
            'welcome.mod_study': 'Asistente académico',
            'welcome.mod_code': 'Editor de código',
            'welcome.mod_files': 'Análisis de documentos',
            'welcome.mod_ext_name': 'Extensiones',
            'welcome.mod_ext': 'Ampliar funciones',
            'welcome.footer_copy': '© 2024-2026 Pollo Assistance Studios · Pago único, sin suscripciones.',
            'welcome.official_web': 'Web oficial',
            'welcome.exit': 'Salir',
            'welcome.level': 'Nivel:',

            // Panel (in-app settings)
            'panel.title': '⚙️ Opciones',
            'panel.theme_title': '🎨 Tema visual',
            'panel.theme_desc': 'Cambia la apariencia de la interfaz',
            'panel.theme_default': 'Morado (Predeterminado)',
            'panel.theme_dark': 'Oscuro',
            'panel.theme_light': 'Claro',
            'panel.theme_orange': 'Naranja Pollo',
            'panel.memory_title': '🧠 Memoria de chats anteriores',
            'panel.memory_desc': 'Permite a Pollo recordar conversaciones anteriores',
            'panel.memory_note': '✅ GRATIS - Solo colección "chats"',
            'panel.integration_title': '🔗 Integración completa de herramientas',
            'panel.integration_desc': 'Pollo puede editar ARCHIVOS, CÓDIGO, GO y acceder a todas tus colecciones',
            'panel.integration_note_premium': '⭐ PREMIUM - Desbloquea todas las capacidades',
            'panel.integration_note_enabled': '✅ PREMIUM - Función activada',
            'panel.upgrade_btn': '⭐ Mejorar a Premium - $25',
            'panel.more_settings': 'Más opciones →',

            // Limit modal
            'limit.title': '🐔 Límite de mensajes alcanzado',
            'limit.desc_html': 'Los usuarios gratuitos pueden enviar hasta 20 mensajes cada 6 horas.',
            'limit.timer_label': '⏰ Podrás chatear de nuevo en:',
            'limit.premium_title': '⭐ Mejora a Premium',
            'limit.feature1': '✅ Mensajes ilimitados',
            'limit.feature2': '✅ Sin restricciones de tiempo',
            'limit.feature3': '✅ 10 MB de almacenamiento',
            'limit.feature4': '✅ Acceso a todas las extensiones',
            'limit.feature5': '✅ Pollo Assistance CODE',
            'limit.upgrade_btn': '🏆 Obtener Premium - $25',
            'limit.footer': 'Pago único. Sin suscripciones. Acceso de por vida.',

            // Chess
            'chess.analyzing': 'Analizando partida...'
        }
    };

    // ---------------- BULK PHRASE DICTIONARY (ES <-> EN) ----------------
    // Used to auto-translate text in pages without explicit data-i18n.
    // Order matters: longer phrases first to avoid partial overlaps.
    const PHRASES_ES_EN = [
        // Navigation
        ['Abrir app', 'Open app'],
        ['Empezar gratis', 'Start free'],
        ['Descubrir más', 'Discover more'],
        ['Descubrir mas', 'Discover more'],
        ['Funciones', 'Features'],
        ['Módulos', 'Modules'],
        ['Modulos', 'Modules'],
        ['Precios', 'Pricing'],
        ['Empezar', 'Get started'],
        ['Inicio', 'Home'],

        // Hero / landing
        ['Ecosistema de IA todo en uno', 'All-in-one AI ecosystem'],
        ['Tu asistente inteligente.', 'Your smart assistant.'],
        ['Un solo pago. Para siempre.', 'One payment. Forever.'],
        ['Chat con IA, generación de imágenes, herramientas de estudio, editor de código', 'AI chat, image generation, study tools, code editor'],
        ['Chat con IA, generacion de imagenes, herramientas de estudio, editor de codigo', 'AI chat, image generation, study tools, code editor'],
        ['y mucho más. Todo en una sola plataforma, sin suscripciones.', 'and much more. All on one platform, no subscriptions.'],
        ['y mucho mas. Todo en una sola plataforma, sin suscripciones.', 'and much more. All on one platform, no subscriptions.'],
        ['20 mensajes gratis cada 6 horas. Sin tarjeta de crédito.', '20 free messages every 6 hours. No credit card required.'],
        ['20 mensajes gratis cada 6 horas. Sin tarjeta de credito.', '20 free messages every 6 hours. No credit card required.'],
        ['Todo lo que necesitas en un solo lugar', 'Everything you need in one place'],
        ['Pollo Assistance reúne las herramientas de IA más útiles en una plataforma unificada.', 'Pollo Assistance brings together the most useful AI tools on a unified platform.'],
        ['Pollo Assistance reune las herramientas de IA mas utiles en una plataforma unificada.', 'Pollo Assistance brings together the most useful AI tools on a unified platform.'],

        // Generic
        ['Iniciar sesión', 'Log in'],
        ['Iniciar sesion', 'Log in'],
        ['Cerrar sesión', 'Log out'],
        ['Cerrar sesion', 'Log out'],
        ['Registrarse', 'Sign up'],
        ['Cancelar', 'Cancel'],
        ['Cerrar', 'Close'],
        ['Guardar cambios', 'Save changes'],
        ['Guardar', 'Save'],
        ['Borrar', 'Delete'],
        ['Continuar', 'Continue'],
        ['Cargando...', 'Loading...'],
        ['Volver', 'Back'],
        ['Configuración', 'Settings'],
        ['Configuracion', 'Settings'],
        ['Buscar', 'Search'],
        ['Enviar', 'Send'],
        ['Nuevo chat', 'New chat'],
        ['Mensaje', 'Message'],
        ['Correo electrónico', 'Email'],
        ['Correo electronico', 'Email'],
        ['Correo', 'Email'],
        ['Contraseña', 'Password'],
        ['Nombre de usuario', 'Username'],
        ['Nombre', 'Name'],
        ['Pago único, sin suscripciones', 'One-time payment, no subscriptions'],
        ['Pago unico, sin suscripciones', 'One-time payment, no subscriptions'],
        ['Todos los derechos reservados.', 'All rights reserved.'],
        ['Preguntas frecuentes', 'FAQ'],

        // Wiki - structure
        ['Documentación oficial de Pollo Assistance', 'Official Pollo Assistance documentation'],
        ['Documentacion oficial de Pollo Assistance', 'Official Pollo Assistance documentation'],
        ['Bienvenido a la Wiki', 'Welcome to the Wiki'],
        ['General', 'General'],
        ['Plataforma', 'Platform'],
        ['Ayuda', 'Help'],
        ['Modelos de IA', 'AI Models'],
        ['Precios y Premium', 'Pricing and Premium'],
        ['Primeros pasos', 'Getting started'],
        ['Respuestas a las dudas más comunes sobre la plataforma.', 'Answers to the most common questions about the platform.'],
        ['Respuestas a las dudas mas comunes sobre la plataforma.', 'Answers to the most common questions about the platform.'],

        // Wiki sidebar & headings
        ['Módulos', 'Modules'],
        ['Preguntas frecuentes', 'FAQ'],

        // Wiki index
        ['Wiki de Pollo Assistance', 'Pollo Assistance Wiki'],
        ['Documentación oficial del ecosistema de inteligencia artificial.', 'Official documentation of the artificial intelligence ecosystem.'],
        ['Bienvenido a la wiki oficial de', 'Welcome to the official'],
        ['Aquí encontrarás toda la información sobre la plataforma', 'Here you will find all the information about the platform'],
        ['Qué es Pollo Assistance', 'What is Pollo Assistance'],
        ['Un ecosistema de inteligencia artificial todo en uno', 'An all-in-one artificial intelligence ecosystem'],
        ['generación de imágenes', 'image generation'],
        ['herramientas de estudio', 'study tools'],
        ['editor de código', 'code editor'],
        ['análisis de documentos', 'document analysis'],
        ['pago único', 'one-time payment'],
        ['sin suscripciones mensuales', 'no monthly subscriptions'],
        ['El asistente principal', 'The main assistant'],
        ['chat con IA', 'AI chat'],
        ['búsqueda web', 'web search'],
        ['imágenes', 'images'],
        ['voz', 'voice'],
        ['Asistente académico para estudiantes', 'Academic assistant for students'],
        ['Entorno de programación con IA', 'AI-powered programming environment'],
        ['Análisis de documentos y PDFs', 'Document and PDF analysis'],
        ['Utilidades rápidas y navegación inteligente', 'Quick utilities and smart navigation'],
        ['Todos los derechos reservados', 'All rights reserved'],

        // Wiki modelos-ia
        ['Los tres niveles de IA de Pollo Assistance', 'The three AI tiers of Pollo Assistance'],
        ['Cómo funciona: el Cerebro Orquestador', 'How it works: the Brain Orchestrator'],
        ['IAs disponibles en el Pool', 'Available AIs in the Pool'],
        ['Cerebro orquestador', 'Brain orchestrator'],
        ['Modelo cerebro', 'Brain model'],
        ['Pool de IAs', 'AI pool'],
        ['Disponibilidad', 'Availability'],
        ['Máx. tokens', 'Max tokens'],
        ['por respuesta', 'per response'],
        ['Transmisión', 'Streaming'],
        ['Características', 'Features'],
        ['Mejor para', 'Best for'],
        ['Respuestas rápidas y preguntas simples', 'Quick responses and simple questions'],
        ['Uso diario, conversaciones normales', 'Daily use, normal conversations'],
        ['Análisis profundo, tareas complejas', 'Deep analysis, complex tasks'],
        ['Comparación de niveles', 'Tier Comparison'],
        ['Tamaño del pool', 'AI pool size'],
        ['Modo pensar', 'Think mode'],
        ['Búsqueda web', 'Web search'],
        ['Generación de imágenes', 'Image generation'],
        ['Visión (análisis de imágenes)', 'Vision (image analysis)'],
        ['Ajedrez', 'Chess'],
        ['Análisis de archivos', 'File analysis'],
        ['Memoria de chat', 'Chat memory'],
        ['Cuál elegir', 'Which one to choose'],
        ['si necesitas algo rápido y simple', 'if you need something fast and simple'],
        ['para uso diario', 'for daily use'],
        ['la opción recomendada', 'the recommended option'],
        ['cuando necesitas profundidad y potencia máxima', 'when you need maximum depth and power'],
        ['requiere premium', 'requires premium'],
        ['Solo Premium', 'Premium only'],
        ['Gratuito', 'Free'],
        ['Gratis', 'Free'],
        ['Sí', 'Yes'],
        ['No', 'No'],
        ['Muy rápido', 'Very fast'],
        ['Rápido', 'Fast'],
        ['Más lento', 'Slower'],
        ['Medio', 'Medium'],
        ['Velocidad', 'Speed'],
        ['Proveedor', 'Provider'],
        ['Parámetros', 'Parameters'],

        // Wiki pollo-assistance
        ['Tipo', 'Type'],
        ['Desarrollador', 'Developer'],
        ['Idioma principal', 'Main language'],
        ['Estado', 'Status'],
        ['Activo', 'Active'],
        ['Sitio web oficial', 'Official website'],
        ['Asistente de inteligencia artificial', 'Artificial intelligence assistant'],
        ['Funciones principales', 'Main features'],
        ['Chat IA', 'AI Chat'],
        ['Generación de imágenes', 'Image generation'],
        ['Análisis de imágenes', 'Image analysis'],
        ['Búsqueda web', 'Web search'],
        ['Voz', 'Voice'],
        ['Análisis de ajedrez', 'Chess analysis'],
        ['Diagramas interactivos', 'Interactive diagrams'],
        ['Memoria de chats', 'Chat memory'],
        ['Módulos del ecosistema', 'Ecosystem modules'],
        ['Plataformas disponibles', 'Available platforms'],
        ['Tecnología', 'Technology'],
        ['Integración con AuraEON', 'Integration with AuraEON'],

        // Common wiki phrases
        ['Todos los derechos reservados.', 'All rights reserved.'],

        // Settings
        ['Perfil', 'Profile'],
        ['Tema', 'Theme'],
        ['Idioma', 'Language'],
        ['Apariencia', 'Appearance'],
        ['Privacidad', 'Privacy'],
        ['Cuenta', 'Account'],
        ['Plan actual', 'Current plan'],
        ['Mejorar plan', 'Upgrade plan'],
        ['Borrar caché', 'Clear cache'],
        ['Borrar cache', 'Clear cache'],
        ['Predeterminado', 'Default'],
        ['Oscuro', 'Dark'],
        ['Claro', 'Light'],
        ['Naranja', 'Orange'],
        ['Pequeño', 'Small'],
        ['Pequeno', 'Small'],
        ['Grande', 'Large'],
        ['Inglés', 'English'],
        ['Ingles', 'English'],
        ['Español', 'Spanish'],
        ['Espanol', 'Spanish']
    ];

    // EN -> ES (used when switching from default English to Spanish for elements
    // that don't have data-i18n). We invert the dictionary.
    const PHRASES_EN_ES = PHRASES_ES_EN.map(function (p) { return [p[1], p[0]]; });

    // ---------------- LANGUAGE DETECTION ----------------
    const STORAGE_KEY = 'pollo_lang';

    function detectLang() {
        // 1. Stored choice wins
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored && TRANSLATIONS[stored]) return stored;
        } catch (e) {}
        // 2. Browser language: es-* => Spanish, else English
        try {
            const nav = (navigator.language || navigator.userLanguage || 'en').toLowerCase();
            if (nav.indexOf('es') === 0) return 'es';
        } catch (e) {}
        // 3. Default English
        return 'en';
    }

    let currentLang = detectLang();
    // Persist the auto-detected choice so settings.html shows the right value
    try {
        if (!localStorage.getItem(STORAGE_KEY)) localStorage.setItem(STORAGE_KEY, currentLang);
    } catch (e) {}

    // ---------------- KEY TRANSLATION ----------------
    function t(key, fallback) {
        const dict = TRANSLATIONS[currentLang] || TRANSLATIONS.en;
        if (dict[key] != null) return dict[key];
        if (TRANSLATIONS.en[key] != null) return TRANSLATIONS.en[key];
        return fallback != null ? fallback : key;
    }

    function applyKeyTranslations(root) {
        root = root || document;
        root.querySelectorAll('[data-i18n]').forEach(function (el) {
            const key = el.getAttribute('data-i18n');
            const val = t(key);
            if (val != null) el.textContent = val;
        });
        root.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
            const key = el.getAttribute('data-i18n-placeholder');
            const val = t(key);
            if (val != null) el.setAttribute('placeholder', val);
        });
        root.querySelectorAll('[data-i18n-title]').forEach(function (el) {
            const key = el.getAttribute('data-i18n-title');
            const val = t(key);
            if (val != null) el.setAttribute('title', val);
        });
        root.querySelectorAll('[data-i18n-value]').forEach(function (el) {
            const key = el.getAttribute('data-i18n-value');
            const val = t(key);
            if (val != null) el.value = val;
        });
    }

    // ---------------- BULK PHRASE TRANSLATION ----------------
    // Walks all visible text nodes and replaces phrases by dictionary.
    // Skipped tags: SCRIPT, STYLE, NOSCRIPT, CODE, PRE, TEXTAREA, INPUT
    // Only runs once per page load to avoid feedback loops.
    const SKIP_TAGS = { SCRIPT:1, STYLE:1, NOSCRIPT:1, CODE:1, PRE:1, TEXTAREA:1, INPUT:1, IFRAME:1 };

    function bulkTranslate(direction) {
        // direction: 'to_en' or 'to_es'
        const phrases = direction === 'to_en' ? PHRASES_ES_EN : PHRASES_EN_ES;
        if (!document.body) return;
        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
            acceptNode: function (node) {
                if (!node.nodeValue || !node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
                let p = node.parentNode;
                while (p && p.nodeType === 1) {
                    if (SKIP_TAGS[p.tagName]) return NodeFilter.FILTER_REJECT;
                    if (p.hasAttribute && p.hasAttribute('data-i18n-skip')) return NodeFilter.FILTER_REJECT;
                    p = p.parentNode;
                }
                return NodeFilter.FILTER_ACCEPT;
            }
        });
        const nodes = [];
        let n;
        while ((n = walker.nextNode())) nodes.push(n);
        nodes.forEach(function (node) {
            let txt = node.nodeValue;
            for (let i = 0; i < phrases.length; i++) {
                const from = phrases[i][0], to = phrases[i][1];
                if (txt.indexOf(from) !== -1) {
                    txt = txt.split(from).join(to);
                }
            }
            if (txt !== node.nodeValue) node.nodeValue = txt;
        });

        // Also translate placeholders / titles / alt that don't have data-i18n
        const attrs = ['placeholder', 'title', 'aria-label'];
        document.querySelectorAll('[' + attrs.join('],[') + ']').forEach(function (el) {
            attrs.forEach(function (a) {
                if (!el.hasAttribute(a)) return;
                let v = el.getAttribute(a);
                let changed = false;
                for (let i = 0; i < phrases.length; i++) {
                    if (v.indexOf(phrases[i][0]) !== -1) { v = v.split(phrases[i][0]).join(phrases[i][1]); changed = true; }
                }
                if (changed) el.setAttribute(a, v);
            });
        });
    }

    let bulkAppliedFor = null;
    function applyTranslations(root) {
        applyKeyTranslations(root);
        // Bulk translate only once per language load
        if (bulkAppliedFor !== currentLang) {
            bulkTranslate(currentLang === 'en' ? 'to_en' : 'to_es');
            bulkAppliedFor = currentLang;
        }
        try { document.documentElement.lang = currentLang; } catch (e) {}
    }

    function setLang(lang) {
        if (!TRANSLATIONS[lang]) lang = 'en';
        if (lang === currentLang) return;
        // Switching language at runtime requires reload to undo bulk replacements
        // (otherwise we'd need to track every replacement). Persist + reload.
        try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}
        currentLang = lang;
        try { location.reload(); } catch (e) { applyTranslations(); }
    }

    function getLang() { return currentLang; }

    // Auto-apply on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () { applyTranslations(); });
    } else {
        applyTranslations();
    }

    window.PolloI18n = {
        t: t,
        setLang: setLang,
        getLang: getLang,
        apply: applyTranslations,
        translations: TRANSLATIONS
    };
})();
