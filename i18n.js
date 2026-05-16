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
            'nav.get_started': 'Get started',

            'footer.tagline': 'Independent AI ecosystem.\nOne-time payment, no subscriptions.',
            'footer.copyright': '© 2024-2026 Pollo Assistance Studios. All rights reserved.',

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
            'toast.cache_cleared': 'Cache cleared successfully'
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
            'nav.get_started': 'Empezar',

            'footer.tagline': 'Ecosistema de IA independiente.\nPago único, sin suscripciones.',
            'footer.copyright': '© 2024-2026 Pollo Assistance Studios. Todos los derechos reservados.',
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
            'toast.cache_cleared': 'Caché borrada correctamente'
        }
    };

    // ---------------- BULK PHRASE DICTIONARY (ES <-> EN) ----------------
    // Used to auto-translate text in pages without explicit data-i18n.
    // Order matters: longer phrases first to avoid partial overlaps.
    const PHRASES_ES_EN = [
        // Navigation
        ['Abrir app', 'Open app'],
        ['Empezar gratis', 'Start free'],
        ['Más herramientas', 'More Tools'],
        ['Mas herramientas', 'More Tools'],
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

        // Features (landing)
        ['Chat inteligente', 'Smart chat'],
        ['Conversaciones naturales con memoria contextual. La IA recuerda tus chats anteriores para darte respuestas más relevantes.', 'Natural conversations with context memory. The AI remembers your previous chats to give you more relevant responses.'],
        ['Conversaciones naturales con memoria contextual. La IA recuerda tus chats anteriores para darte respuestas mas relevantes.', 'Natural conversations with context memory. The AI remembers your previous chats to give you more relevant responses.'],
        ['Generación de imágenes', 'Image generation'],
        ['Generacion de imagenes', 'Image generation'],
        ['Crea imágenes a partir de texto directamente en el chat. Describe lo que imaginas y la IA lo genera al instante.', 'Create images from text directly in the chat. Describe what you imagine and the AI generates it instantly.'],
        ['Crea imagenes a partir de texto directamente en el chat. Describe lo que imaginas y la IA lo genera al instante.', 'Create images from text directly in the chat. Describe what you imagine and the AI generates it instantly.'],
        ['Búsqueda en la web', 'Web search'],
        ['Busqueda en la web', 'Web search'],
        ['La IA busca información actualizada en internet cuando lo necesita, citando siempre las fuentes.', 'The AI searches for updated information on the internet when needed, always citing sources.'],
        ['La IA busca informacion actualizada en internet cuando lo necesita, citando siempre las fuentes.', 'The AI searches for updated information on the internet when needed, always citing sources.'],
        ['Voz a texto', 'Voice to text'],
        ['Habla en lugar de escribir. Reconocimiento de voz y lectura de respuestas integrados.', 'Speak instead of typing. Built-in voice recognition and text-to-speech for responses.'],
        ['Análisis de ajedrez', 'Chess analysis'],
        ['Analisis de ajedrez', 'Chess analysis'],
        ['Sube una imagen de una partida o pega el PGN. La IA analiza cada movimiento y te da su evaluación.', 'Upload a game image or paste the PGN. The AI analyzes every move and gives you its evaluation.'],
        ['Sube una imagen de una partida o pega el PGN. La IA analiza cada movimiento y te da su evaluacion.', 'Upload a game image or paste the PGN. The AI analyzes every move and gives you its evaluation.'],
        ['Diagramas interactivos', 'Interactive diagrams'],
        ['Genera mapas conceptuales y diagramas visuales a partir de cualquier texto o tema.', 'Generate concept maps and visual diagrams from any text or topic.'],

        // Modules (landing)
        ['Un ecosistema completo', 'A complete ecosystem'],
        ['Cinco módulos especializados que cubren todo lo que necesitas.', 'Five specialized modules that cover everything you need.'],
        ['Cinco modulos especializados que cubren todo lo que necesitas.', 'Five specialized modules that cover everything you need.'],
        ['Núcleo', 'Core'],
        ['Nucleo', 'Core'],
        ['Educación', 'Education'],
        ['Educacion', 'Education'],
        ['Desarrollo', 'Development'],
        ['Documentos', 'Documents'],
        ['Utilidades', 'Utilities'],
        ['El asistente principal. Chat IA, generación y análisis de imágenes, búsqueda web, voz y toda la potencia de la plataforma en una interfaz limpia y rápida.', "The main assistant. AI chat, image generation and analysis, web search, voice, and all the platform's power in a clean and fast interface."],
        ['El asistente principal. Chat IA, generacion y analisis de imagenes, busqueda web, voz y toda la potencia de la plataforma en una interfaz limpia y rapida.', "The main assistant. AI chat, image generation and analysis, web search, voice, and all the platform's power in a clean and fast interface."],
        ['Tu compañero de estudio. Genera resúmenes, prepara tests de opción múltiple, explica conceptos complejos de forma sencilla y crea diagramas para organizar tus ideas.', 'Your study companion. Generate summaries, prepare multiple-choice tests, explain complex concepts simply and create diagrams to organize your ideas.'],
        ['Tu companero de estudio. Genera resumenes, prepara tests de opcion multiple, explica conceptos complejos de forma sencilla y crea diagramas para organizar tus ideas.', 'Your study companion. Generate summaries, prepare multiple-choice tests, explain complex concepts simply and create diagrams to organize your ideas.'],
        ['Entorno de programación con IA. Genera código, depura errores, optimiza funciones y ejecuta código en el navegador. Soporta múltiples lenguajes.', 'AI-powered programming environment. Generate code, debug errors, optimize functions and run code in the browser. Supports multiple languages.'],
        ['Entorno de programacion con IA. Genera codigo, depura errores, optimiza funciones y ejecuta codigo en el navegador. Soporta multiples lenguajes.', 'AI-powered programming environment. Generate code, debug errors, optimize functions and run code in the browser. Supports multiple languages.'],
        ['Sube tus documentos y PDFs y pregunta cualquier cosa sobre ellos. Análisis profundo de archivos de hasta 10 MB en premium.', 'Upload your documents and PDFs and ask anything about them. Deep file analysis up to 10 MB in premium.'],
        ['Sube tus documentos y PDFs y pregunta cualquier cosa sobre ellos. Analisis profundo de archivos de hasta 10 MB en premium.', 'Upload your documents and PDFs and ask anything about them. Deep file analysis up to 10 MB in premium.'],
        ['Acceso rápido a herramientas y utilidades. Navega de forma inteligente y llega a las funciones clave sin rodeos.', 'Quick access to tools and utilities. Navigate intelligently and reach key features without detours.'],
        ['Acceso rapido a herramientas y utilidades. Navega de forma inteligente y llega a las funciones clave sin rodeos.', 'Quick access to tools and utilities. Navigate intelligently and reach key features without detours.'],

        // Pricing (landing)
        ['Precios justos, sin sorpresas', 'Fair pricing, no surprises'],
        ['Sin suscripciones mensuales. Paga una vez y es tuyo para siempre.', "No monthly subscriptions. Pay once and it's yours forever."],
        ['para siempre', 'forever'],
        ['pago único - de por vida', 'one-time payment - lifetime'],
        ['pago unico - de por vida', 'one-time payment - lifetime'],
        ['Recomendado', 'Recommended'],
        ['Gratis', 'Free'],
        ['20 mensajes cada 6 horas', '20 messages every 6 hours'],
        ['2 MB de almacenamiento', '2 MB storage'],
        ['Modelos Palos y Luces', 'Palos and Luces models'],
        ['Chat IA básico', 'Basic AI chat'],
        ['Chat IA basico', 'Basic AI chat'],
        ['Mensajes ilimitados', 'Unlimited messages'],
        ['10 MB de almacenamiento', '10 MB storage'],
        ['Todos los modelos (incluye Summum)', 'All models (includes Summum)'],
        ['Todas las funciones desbloqueadas', 'All features unlocked'],
        ['Integración total con Files y Code', 'Full integration with Files and Code'],
        ['Integracion total con Files y Code', 'Full integration with Files and Code'],
        ['Análisis profundo de documentos', 'Deep document analysis'],
        ['Analisis profundo de documentos', 'Deep document analysis'],
        ['Soporte prioritario', 'Priority support'],
        ['Obtener Premium', 'Get Premium'],
        ['También aceptamos', 'We also accept'],
        ['Tambien aceptamos', 'We also accept'],
        ['tarjetas regalo', 'gift cards'],
        ['Pregunta en el chat de la app.', 'Ask in the app chat.'],

        // Getting started (landing)
        ['Empieza en menos de un minuto', 'Get started in under a minute'],
        ['Crea tu cuenta', 'Create your account'],
        ['Regístrate con tu email o Google. Es gratis y tarda 10 segundos.', "Sign up with your email or Google. It's free and takes 10 seconds."],
        ['Registrate con tu email o Google. Es gratis y tarda 10 segundos.', "Sign up with your email or Google. It's free and takes 10 seconds."],
        ['Verifica tu correo', 'Verify your email'],
        ['Revisa tu bandeja de entrada y confirma tu dirección de email.', 'Check your inbox and confirm your email address.'],
        ['Revisa tu bandeja de entrada y confirma tu direccion de email.', 'Check your inbox and confirm your email address.'],
        ['Empieza a chatear', 'Start chatting'],
        ['Abre un chat nuevo y pregúntale a Pollo Assistance lo que quieras.', 'Open a new chat and ask Pollo Assistance anything you want.'],
        ['Abre un chat nuevo y preguntale a Pollo Assistance lo que quieras.', 'Open a new chat and ask Pollo Assistance anything you want.'],
        ['Abrir Pollo Assistance', 'Open Pollo Assistance'],
        ['Disponible en web y como aplicación Android.', 'Available on web and as an Android app.'],
        ['Disponible en web y como aplicacion Android.', 'Available on web and as an Android app.'],

        // AuraEON section (landing)
        ['Integrado con AuraEON', 'Integrated with AuraEON'],
        ['Pollo Assistance es la cuenta central y el sistema de IA de', 'Pollo Assistance is the central account and AI system for'],
        ['un proyecto educativo diseñado para centros escolares para gestionar el aprendizaje y la participación del alumnado.', 'an educational project designed for schools to manage student learning and participation.'],
        ['un proyecto educativo disenado para centros escolares para gestionar el aprendizaje y la participacion del alumnado.', 'an educational project designed for schools to manage student learning and participation.'],
        ['Saber más', 'Learn more'],
        ['Saber mas', 'Learn more'],

        // Footer (landing)
        ['Ecosistema de IA independiente.', 'Independent AI ecosystem.'],
        ['Pago único, sin suscripciones.', 'One-time payment, no subscriptions.'],
        ['Pago unico, sin suscripciones.', 'One-time payment, no subscriptions.'],
        ['Producto', 'Product'],
        ['Recursos', 'Resources'],
        ['Wiki oficial', 'Official Wiki'],
        ['Documentación', 'Documentation'],
        ['Documentacion', 'Documentation'],
        ['Ecosistema', 'Ecosystem'],
        ['Aplicación Pollo Assistance', 'Pollo Assistance App'],
        ['Aplicacion Pollo Assistance', 'Pollo Assistance App'],
        ['Todos los derechos reservados.', 'All rights reserved.'],

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
