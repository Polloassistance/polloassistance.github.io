/* ============================================================
   POLLO ASSISTANCE - i18n SYSTEM
   Default language: English. User can switch to Spanish in settings.
   Usage:
     - Add data-i18n="key" to any element you want translated
     - Add data-i18n-placeholder="key" for input placeholders
     - Add data-i18n-title="key" for title attributes
     - Call window.PolloI18n.setLang('en'|'es') to switch
     - Call window.PolloI18n.t('key') from JS
   ============================================================ */
(function () {
    'use strict';

    const TRANSLATIONS = {
        en: {
            // generic
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

            // settings
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

            // premium
            'premium.title': 'Pollo Assistance Premium',
            'premium.maintenance_title': 'Payments temporarily unavailable',
            'premium.maintenance_desc': 'Card payments are under maintenance. You can still redeem gift cards below.',
            'premium.gift_card': 'Gift card',
            'premium.redeem': 'Redeem code',

            // chat
            'chat.placeholder': 'Send a message to Pollo...',
            'chat.thinking': 'Pollo Assistance is thinking...',
            'chat.searching': 'Searching...',
            'chat.sources': 'Sources',
            'chat.regenerate': 'Regenerate',
            'chat.copy': 'Copy',

            // toasts
            'toast.saved': 'Changes saved successfully',
            'toast.error_save': 'Error saving changes',
            'toast.cache_cleared': 'Cache cleared successfully',
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
            'premium.gift_card': 'Tarjeta regalo',
            'premium.redeem': 'Canjear código',

            'chat.placeholder': 'Envía un mensaje a Pollo...',
            'chat.thinking': 'Pollo Assistance está pensando...',
            'chat.searching': 'Buscando...',
            'chat.sources': 'Fuentes',
            'chat.regenerate': 'Regenerar',
            'chat.copy': 'Copiar',

            'toast.saved': 'Cambios guardados correctamente',
            'toast.error_save': 'Error al guardar los cambios',
            'toast.cache_cleared': 'Caché borrada correctamente',
        }
    };

    const STORAGE_KEY = 'pollo_lang';

    function detectLang() {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored && TRANSLATIONS[stored]) return stored;
        } catch (e) {}
        // Default: ENGLISH (TAAFT requirement)
        return 'en';
    }

    let currentLang = detectLang();

    function t(key, fallback) {
        const dict = TRANSLATIONS[currentLang] || TRANSLATIONS.en;
        if (dict[key] != null) return dict[key];
        if (TRANSLATIONS.en[key] != null) return TRANSLATIONS.en[key];
        return fallback != null ? fallback : key;
    }

    function applyTranslations(root) {
        root = root || document;
        // text content
        root.querySelectorAll('[data-i18n]').forEach(function (el) {
            const key = el.getAttribute('data-i18n');
            const val = t(key);
            if (val != null) el.textContent = val;
        });
        // placeholders
        root.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
            const key = el.getAttribute('data-i18n-placeholder');
            const val = t(key);
            if (val != null) el.setAttribute('placeholder', val);
        });
        // title attribute
        root.querySelectorAll('[data-i18n-title]').forEach(function (el) {
            const key = el.getAttribute('data-i18n-title');
            const val = t(key);
            if (val != null) el.setAttribute('title', val);
        });
        // value (for buttons / inputs)
        root.querySelectorAll('[data-i18n-value]').forEach(function (el) {
            const key = el.getAttribute('data-i18n-value');
            const val = t(key);
            if (val != null) el.value = val;
        });
        // <html lang>
        try { document.documentElement.lang = currentLang; } catch (e) {}
    }

    function setLang(lang) {
        if (!TRANSLATIONS[lang]) lang = 'en';
        currentLang = lang;
        try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}
        applyTranslations();
        document.dispatchEvent(new CustomEvent('pollo:langchanged', { detail: { lang: lang } }));
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
