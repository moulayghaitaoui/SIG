document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Database Dictionary Data (Selected Representative Key Tables) ---
    const databaseTables = [
        {
            name: 'ministere',
            originalName: 'Ministere',
            module: 'sig',
            domain: 'establishment',
            description: 'الجدول الرئيسي لحفظ معلومات الوزارة الوصية (وزارة التكوين والتعليم المهنيين الجزائرية) وبيانات الاتصال والربط الفني بقواعد البيانات المركزية.',
            columns: [
                { name: 'id_minister', type: 'BIGINT', key: 'PK', nullable: 'لا', desc: 'المعرف الفريد التلقائي للوزارة' },
                { name: 'nom', type: 'VARCHAR(50)', key: '', nullable: 'نعم', desc: 'اسم الوزارة بالعربية' },
                { name: 'nom_fr', type: 'VARCHAR(50)', key: '', nullable: 'نعم', desc: 'اسم الوزارة بالفرنسية' },
                { name: 'adrs', type: 'VARCHAR(50)', key: '', nullable: 'نعم', desc: 'العنوان الجغرافي للوزارة' },
                { name: 'tel', type: 'VARCHAR(50)', key: '', nullable: 'نعم', desc: 'رقم الهاتف' },
                { name: 'email', type: 'VARCHAR(50)', key: '', nullable: 'نعم', desc: 'البريد الإلكتروني للاتصال المباشر' },
                { name: 'ip_publique', type: 'VARCHAR(50)', key: '', nullable: 'نعم', desc: 'عنوان الـ IP العام للخادم' },
                { name: 'dnssrvhttps', type: 'VARCHAR(100)', key: '', nullable: 'لا', desc: 'رابط خادم الويب المؤمن HTTPS' }
            ]
        },
        {
            name: 'dfep',
            originalName: 'DFEP',
            module: 'sig',
            domain: 'establishment',
            description: 'يدير بيانات مديريات التكوين والتعليم المهنيين على المستوى الولائي، والتنسيق الإقليمي بين المراكز والوزارة.',
            columns: [
                { name: 'iddfep', type: 'BIGINT', key: 'PK', nullable: 'لا', desc: 'المعرف الفريد لمديرية الولاية' },
                { name: 'id_minister', type: 'BIGINT', key: 'FK', nullable: 'نعم', desc: 'معرف الوزارة المرتبطة (وزارة التكوين)' },
                { name: 'nom', type: 'VARCHAR(50)', key: '', nullable: 'نعم', desc: 'تسمية المديرية الولائية بالعربية' },
                { name: 'nom_fr', type: 'VARCHAR(50)', key: '', nullable: 'نعم', desc: 'تسمية المديرية الولائية بالفرنسية' },
                { name: 'id_wilayaa', type: 'BIGINT', key: 'FK', nullable: 'نعم', desc: 'رابط جدول الولايات الموحد' },
                { name: 'code', type: 'VARCHAR(2)', key: '', nullable: 'نعم', desc: 'الرمز الرقمي القياسي للولاية (مثال: 16 لولاية الجزائر)' }
            ]
        },
        {
            name: 'ets_form',
            originalName: 'Ets_Form',
            module: 'sig',
            domain: 'establishment',
            description: 'يمثل المؤسسات ومراكز التكوين المهني والتمهين (CFPA / INSFP) بما في ذلك ملحقات المراكز وخصائص تشغيلها.',
            columns: [
                { name: 'id_ets_form', type: 'BIGINT', key: 'PK', nullable: 'لا', desc: 'معرف مركز التكوين المهني' },
                { name: 'iddfep', type: 'BIGINT', key: 'FK', nullable: 'نعم', desc: 'المديرية الولائية المشرفة على هذا المركز' },
                { name: 'nom', type: 'VARCHAR(150)', key: '', nullable: 'نعم', desc: 'الاسم الرسمي للمركز بالعربية' },
                { name: 'nom_fr', type: 'VARCHAR(150)', key: '', nullable: 'نعم', desc: 'الاسم الرسمي للمركز بالفرنسية' },
                { name: 'code', type: 'VARCHAR(10)', key: '', nullable: 'نعم', desc: 'الرمز القانوني الفريد للمركز' },
                { name: 'code_mihnati', type: 'VARCHAR(10)', key: '', nullable: 'نعم', desc: 'رمز المزامنة مع المنصة الوطنية مهنتي' },
                { name: 'id_communn', type: 'BIGINT', key: 'FK', nullable: 'نعم', desc: 'معرف بلدية التواجد الجغرافي للمركز' },
                { name: 'annex', type: 'BOOLEAN', key: '', nullable: 'نعم', desc: 'مؤشر ما إذا كان المركز عبارة عن ملحقة إضافية' }
            ]
        },
        {
            name: 'specialite',
            originalName: 'Specialite',
            module: 'sig',
            domain: 'specialty',
            description: 'جدول التخصصات المهنية المعتمدة في الدليل الوطني الرسمي لوزارة التكوين المهني، متضمناً شروط القبول والشهادات الناتجة.',
            columns: [
                { name: 'id_specialite', type: 'BIGINT', key: 'PK', nullable: 'لا', desc: 'المعرف الفريد للتخصص' },
                { name: 'code_spec', type: 'VARCHAR(15)', key: '', nullable: 'نعم', desc: 'الرمز القياسي للتخصص (مثال: INF0701)' },
                { name: 'id_branche', type: 'BIGINT', key: 'FK', nullable: 'نعم', desc: 'معرف الشعبة المهنية التابع لها التخصص' },
                { name: 'id_niveau_fp', type: 'BIGINT', key: 'FK', nullable: 'نعم', desc: 'معرف مستوى التكوين المهني' },
                { name: 'nom', type: 'VARCHAR(250)', key: '', nullable: 'نعم', desc: 'تسمية التخصص باللغة العربية' },
                { name: 'nom_fr', type: 'VARCHAR(250)', key: '', nullable: 'نعم', desc: 'تسمية التخصص بالفرنسية' },
                { name: 'nbr_sem', type: 'TINYINT', key: '', nullable: 'نعم', desc: 'عدد السداسيات الدراسية الإجمالية للتخصص' },
                { name: 'duree_m', type: 'INT', key: '', nullable: 'نعم', desc: 'المدة الإجمالية للتكوين بالأشهر (مثال: 30 شهراً لـ تقني سامي)' },
                { name: 'id_niveau_scol', type: 'BIGINT', key: 'FK', nullable: 'نعم', desc: 'المستوى الدراسي الأدنى المطلق للالتحاق' }
            ]
        },
        {
            name: 'offre',
            originalName: 'Offre',
            module: 'sig',
            domain: 'specialty',
            description: 'جدول عروض التكوين، ويحدد المناصب والمقاعد البيداغوجية المفتوحة للتسجيل في دورة دراسية معينة وتخصيص نمط التكوين.',
            columns: [
                { name: 'id_offre', type: 'BIGINT', key: 'PK', nullable: 'لا', desc: 'المعرف الفريد لعرض التكوين المتاح' },
                { name: 'id_specialite', type: 'BIGINT', key: 'FK', nullable: 'نعم', desc: 'معرف التخصص القياسي المفتوح للتسجيل' },
                { name: 'id_session', type: 'BIGINT', key: 'FK', nullable: 'نعم', desc: 'دورة التسجيل والدراسة الحالية بالمركز' },
                { name: 'id_mode_formation', type: 'BIGINT', key: 'FK', nullable: 'نعم', desc: 'نمط التكوين المخصص (حضوري، تمهين، إلخ)' },
                { name: 'nbr_poste', type: 'INT', key: '', nullable: 'نعم', desc: 'عدد المقاعد البيداغوجية المتاحة للطلبة الجدد' }
            ]
        },
        {
            name: 'candidat',
            originalName: 'Candidat',
            module: 'sig',
            domain: 'trainee',
            description: 'يحوي المعلومات والملفات الشخصية للمترشحين الجدد المسجلين أولياً عبر البوابة الإلكترونية أو المزامنة مع "مهنتي".',
            columns: [
                { name: 'id_candidat', type: 'BIGINT', key: 'PK', nullable: 'لا', desc: 'المعرف الفريد للمترشح' },
                { name: 'nin', type: 'VARCHAR(18)', key: '', nullable: 'نعم', desc: 'رقم التعريف الوطني الفريد للتحقق من التكرار' },
                { name: 'nom', type: 'VARCHAR(50)', key: '', nullable: 'نعم', desc: 'لقب المترشح بالعربية' },
                { name: 'prenom', type: 'VARCHAR(50)', key: '', nullable: 'نعم', desc: 'اسم المترشح بالعربية' },
                { name: 'date_naiss', type: 'DATE', key: '', nullable: 'نعم', desc: 'تاريخ الميلاد لاستنتاج السن القانوني للقبول' },
                { name: 'id_commune', type: 'BIGINT', key: 'FK', nullable: 'نعم', desc: 'بلدية إقامة المترشح' },
                { name: 'email', type: 'VARCHAR(100)', key: '', nullable: 'نعم', desc: 'البريد الإلكتروني للمترشح' }
            ]
        },
        {
            name: 'preinscrit',
            originalName: 'Preinscrit',
            module: 'sig',
            domain: 'trainee',
            description: 'يدير التسجيلات الأولية للمترشحين وربطهم بعروض التكوين المفتوحة ودراسة الحالة الإدارية لملفاتهم.',
            columns: [
                { name: 'id_preinscrit', type: 'BIGINT', key: 'PK', nullable: 'لا', desc: 'المعرف الفريد للتسجيل الأولي' },
                { name: 'id_candidat', type: 'BIGINT', key: 'FK', nullable: 'نعم', desc: 'رابط ملف بيانات المترشح' },
                { name: 'id_offre', type: 'BIGINT', key: 'FK', nullable: 'نعم', desc: 'رابط عرض التكوين المهني المرغوب' },
                { name: 'date_preinscr', type: 'DATE', key: '', nullable: 'نعم', desc: 'تاريخ التسجيل الإلكتروني بالمنصة' },
                { name: 'etat_dossier', type: 'TINYINT', key: '', nullable: 'نعم', desc: 'حالة دراسة الملف (مقبول، قيد الدراسة، مرفوض)' }
            ]
        },
        {
            name: 'apprenant',
            originalName: 'Apprenant',
            module: 'sig',
            domain: 'trainee',
            description: 'الجدول المركزي للمتربصين والطلاب المقبولين نهائياً، والمسجلين لمتابعة دراستهم بالمركز وتوزيعهم على الأقسام.',
            columns: [
                { name: 'id_apprenant', type: 'BIGINT', key: 'PK', nullable: 'لا', desc: 'المعرف الفريد للمتربص المقبول' },
                { name: 'num_carte', type: 'VARCHAR(20)', key: '', nullable: 'نعم', desc: 'رقم البطاقة المدرسية المطبوعة للمتربص' },
                { name: 'nom', type: 'VARCHAR(50)', key: '', nullable: 'نعم', desc: 'اللقب بالعربية' },
                { name: 'prenom', type: 'VARCHAR(50)', key: '', nullable: 'نعم', desc: 'الاسم بالعربية' },
                { name: 'id_section', type: 'BIGINT', key: 'FK', nullable: 'نعم', desc: 'القسم البيداغوجي الموزع عليه المتربص' },
                { name: 'encour', type: 'BOOLEAN', key: '', nullable: 'نعم', desc: 'حالة المتمدرس (نشط حالياً = 1، متخرج/مسرح = 0)' }
            ]
        },
        {
            name: 'apprenant_absence',
            originalName: 'apprenant_absence',
            module: 'sig',
            domain: 'trainee',
            description: 'متابعة ورصد الغيابات اليومية للمتربصين وتحديد المبررة منها لتطبيق الإجراءات ومجلس التوجيه والتدريب.',
            columns: [
                { name: 'id_absence', type: 'BIGINT', key: 'PK', nullable: 'لا', desc: 'المعرف الفريد لعملية الغياب' },
                { name: 'id_apprenant', type: 'BIGINT', key: 'FK', nullable: 'نعم', desc: 'رابط الطالب المتربص المتغيب' },
                { name: 'date_absence', type: 'DATE', key: '', nullable: 'نعم', desc: 'تاريخ ويوم الغياب الفعلي' },
                { name: 'justifiee', type: 'BOOLEAN', key: '', nullable: 'نعم', desc: 'مؤشر ما إذا كان الغياب مبرراً بوثيقة إدارية' }
            ]
        },
        {
            name: 'evaluation',
            originalName: 'Evaluation',
            module: 'sig',
            domain: 'trainee',
            description: 'يسجل نقاط ودرجات الامتحانات والتقييمات الدورية والفصلية والمستمرة للطلبة المتربصين والمتمهنين في المواد التعليمية.',
            columns: [
                { name: 'id_evaluation', type: 'BIGINT', key: 'PK', nullable: 'لا', desc: 'المعرف الفريد للدرجة والتقييم' },
                { name: 'id_apprenant', type: 'BIGINT', key: 'FK', nullable: 'نعم', desc: 'رابط الطالب المتربص المعني بالتقييم' },
                { name: 'module', type: 'VARCHAR(50)', key: '', nullable: 'نعم', desc: 'اسم المادة البيداغوجية والوحدة التعليمية' },
                { name: 'note', type: 'DECIMAL(4,2)', key: '', nullable: 'نعم', desc: 'نقطة المتربص في الاختبار (بين 00.00 و 20.00)' }
            ]
        },
        {
            name: 'fonctionnaire',
            originalName: 'fonctionnaire',
            module: 'sigfa',
            domain: 'finance',
            description: 'الجدول الرئيسي لإدارة عمال وموظفي قطاع التكوين المهني مالياً، وتسيير أجورهم الشهرية وحساباتهم الجارية.',
            columns: [
                { name: 'id_fonctionnaire', type: 'BIGINT', key: 'PK', nullable: 'لا', desc: 'المعرف الفريد للموظف' },
                { name: 'ccp', type: 'VARCHAR(12)', key: '', nullable: 'نعم', desc: 'رقم الحساب الجاري البريدي للموظف شهرياً' },
                { name: 'cle_ccp', type: 'VARCHAR(2)', key: '', nullable: 'نعم', desc: 'مفتاح رقم الحساب الجاري البريدي للتحقق الحسابي' },
                { name: 'nom', type: 'VARCHAR(50)', key: '', nullable: 'نعم', desc: 'اللقب بالعربية' },
                { name: 'prenom', type: 'VARCHAR(50)', key: '', nullable: 'نعم', desc: 'الاسم بالعربية' },
                { name: 'id_grade', type: 'BIGINT', key: 'FK', nullable: 'نعم', desc: 'الرتبة المهنية والدرجة الوظيفية للموظف' }
            ]
        },
        {
            name: 'grade',
            originalName: 'Grade',
            module: 'sigfa',
            domain: 'finance',
            description: 'جدول الرتب والسلالم الاستدلالية المعتمدة لقطاع التكوين المهني لتحديد الأجر الأساسي لجميع الموظفين والأساتذة.',
            columns: [
                { name: 'id_grade', type: 'BIGINT', key: 'PK', nullable: 'لا', desc: 'المعرف الفريد للرتبة المهنية' },
                { name: 'libelle', type: 'VARCHAR(100)', key: '', nullable: 'نعم', desc: 'المسمى الوظيفي للرتبة بالعربية' },
                { name: 'salaire_base', type: 'DECIMAL(10,2)', key: '', nullable: 'نعم', desc: 'الراتب الأساسي القياسي المخصص للدرجة' }
            ]
        },
        {
            name: 'fiche_paye',
            originalName: 'FichePaye',
            module: 'sigfa',
            domain: 'finance',
            description: 'تسجيل وتفصيل كشوف الرواتب الشهرية والسنوية المحسوبة، وكافة العلاوات الدورية والمنح العائلية والاقتطاعات الضريبية.',
            columns: [
                { name: 'id_fiche_paye', type: 'BIGINT', key: 'PK', nullable: 'لا', desc: 'المعرف الفريد لكشف الراتب المفصل' },
                { name: 'id_fonctionnaire', type: 'BIGINT', key: 'FK', nullable: 'نعم', desc: 'رابط الموظف أو الأستاذ المعني بالدفع' },
                { name: 'date_calcul', type: 'DATE', key: '', nullable: 'نعم', desc: 'تاريخ احتساب وتوليد الراتب الإجمالي' },
                { name: 'net_a_payer', type: 'DECIMAL(10,2)', key: '', nullable: 'نعم', desc: 'الراتب الصافي النهائي المستحق للموظف قانوناً' }
            ]
        },
        {
            name: 'budget_article',
            originalName: 'BudgetArticle',
            module: 'sigfa',
            domain: 'finance',
            description: 'جدول بنود ومواد الميزانية السنوية للمؤسسة، والاعتمادات المالية المرصودة من الوزارة وعمليات الالتزام بها.',
            columns: [
                { name: 'id_budget_article', type: 'BIGINT', key: 'PK', nullable: 'لا', desc: 'المعرف الفريد لبند الميزانية' },
                { name: 'code_article', type: 'VARCHAR(15)', key: '', nullable: 'نعم', desc: 'الرمز القياسي للبند أو المادة في محاسبة الميزانية' },
                { name: 'allocation', type: 'DECIMAL(12,2)', key: '', nullable: 'نعم', desc: 'الاعتماد المالي الإجمالي المخصص سنوياً للبند' },
                { name: 'commited', type: 'DECIMAL(12,2)', key: '', nullable: 'نعم', desc: 'إجمالي المبالغ والالتزامات المالية المنفذة مسبقاً' }
            ]
        },
        {
            name: 'commitment',
            originalName: 'Commitment',
            module: 'sigfa',
            domain: 'finance',
            description: 'يسجل التزامات الميزانية التفصيلية وحسابات الصرف لفواتير الموردين والخدمات المنفذة بالمركز.',
            columns: [
                { name: 'id_commitment', type: 'BIGINT', key: 'PK', nullable: 'لا', desc: 'المعرف الفريد لبطاقة الالتزام المحاسبي' },
                { name: 'id_budget_article', type: 'BIGINT', key: 'FK', nullable: 'نعم', desc: 'رابط بند الميزانية الملتزم به' },
                { name: 'amount', type: 'DECIMAL(12,2)', key: '', nullable: 'نعم', desc: 'قيمة الفاتورة أو النفقة المالية الحالية' },
                { name: 'supplier', type: 'VARCHAR(100)', key: '', nullable: 'نعم', desc: 'الاسم أو الشركة الموردة المستحقة للمال' }
            ]
        },
        {
            name: 'employeur',
            originalName: 'employeur',
            module: 'sigpaf',
            domain: 'trainee',
            description: 'إدارة وتوثيق بيانات المؤسسات الاقتصادية والشركات الخارجية المشتركة مع مراكز التكوين في تدريب المتمهنين.',
            columns: [
                { name: 'id_employeur', type: 'BIGINT', key: 'PK', nullable: 'لا', desc: 'المعرف الفريد للمؤسسة المستخدمة' },
                { name: 'nom', type: 'VARCHAR(100)', key: '', nullable: 'نعم', desc: 'تسمية الشركة أو المؤسسة بالعربية' },
                { name: 'nbr_salarie', type: 'INT', key: '', nullable: 'نعم', desc: 'عدد العمال المسجلين قانوناً في الضمان الاجتماعي' },
                { name: 'max_quota_allowed', type: 'INT', key: '', nullable: 'نعم', desc: 'العدد الأقصى المسموح به للمتمهنين قانوناً بالشركة' }
            ]
        }
    ];

    // --- 2. Tab Navigation System ---
    const navItems = document.querySelectorAll('.nav-item');
    const tabContents = document.querySelectorAll('.tab-content');
    const tabTitleEl = document.getElementById('current-tab-title');
    const tabSubtitleEl = document.getElementById('current-tab-subtitle');

    const tabDetails = {
        'dashboard': {
            title: 'لوحة التحكم والإحصائيات العامة',
            subtitle: 'مؤشرات ومعلومات عامة لدراسة هيكل وقواعد بيانات النظام الشامل'
        },
        'schema-explorer': {
            title: 'معجم وقاموس قاعدة البيانات التفاعلي',
            subtitle: 'مستعرض الجداول البالغ عددها 552 مع الحقول والعلاقات ومطابقة Laravel 12'
        },
        'validation-rules': {
            title: 'قواعد التحقق وسلامة منطق البيانات',
            subtitle: 'استعراض الشروط والقيود البيداغوجية والمالية المبرمجة لضمان دقة البيانات'
        },
        'simulator': {
            title: 'محاكي ومحلل قواعد التحقق الحية',
            subtitle: 'اختبر تفاعلياً خوارزميات النظام وقواعد التحقق وقوانين العمل المطبقة'
        },
        'interfaces': {
            title: 'دليل شاشات وواجهات النظام الشامل',
            subtitle: 'الربط المعماري بين شاشات WinDev ومدخلاتها في الجداول والتقارير الورقية المطبوعة'
        }
    };

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const selectedTab = item.getAttribute('data-tab');
            
            // Toggle active classes on sidebar items
            navItems.forEach(n => n.classList.remove('active'));
            item.classList.add('active');

            // Toggle active views
            tabContents.forEach(content => {
                content.classList.remove('active');
            });
            document.getElementById(`tab-${selectedTab}`).classList.add('active');

            // Update titles
            if (tabDetails[selectedTab]) {
                tabTitleEl.textContent = tabDetails[selectedTab].title;
                tabSubtitleEl.textContent = tabDetails[selectedTab].subtitle;
            }
        });
    });

    // --- 3. Dynamic Charts (Chart.js) ---
    const schemaCtx = document.getElementById('schemaChart').getContext('2d');
    
    // Custom Color Palette compatible with CSS styles
    const primaryColor = '#6366f1';
    const secondaryColor = '#06b6d4';
    const accentColor = '#a855f7';
    
    new Chart(schemaCtx, {
        type: 'doughnut',
        data: {
            labels: [
                'التسيير الإداري والدراسي (SIG)',
                'إدارة الرواتب والميزانية (SIGFA)',
                'عقود التمهين والتخطيط (SIG-PAF)'
            ],
            datasets: [{
                data: [327, 86, 139],
                backgroundColor: [
                    primaryColor,
                    accentColor,
                    secondaryColor
                ],
                borderWidth: 2,
                borderColor: '#111827',
                hoverOffset: 12
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: '#94a3b8',
                        font: {
                            family: 'Cairo',
                            size: 13,
                            weight: '600'
                        },
                        padding: 20
                    }
                },
                tooltip: {
                    titleFont: { family: 'Cairo', size: 14 },
                    bodyFont: { family: 'Cairo', size: 13 },
                    callbacks: {
                        label: function(context) {
                            let label = context.label || '';
                            if (label) {
                                label += ': ';
                            }
                            if (context.parsed !== undefined) {
                                label += context.parsed + ' جدولاً أوملفاً';
                            }
                            return label;
                        }
                    }
                }
            },
            cutout: '65%'
        }
    });

    // --- 4. Database Schema Explorer & Search Engine ---
    const tablesContainer = document.getElementById('tables-container');
    const schemaSearchInput = document.getElementById('schema-search-input');
    const domainTabs = document.querySelectorAll('.domain-tab');
    
    let currentFilterDomain = 'all';
    let searchQuery = '';

    // Function to render table cards based on filters
    function renderTables() {
        tablesContainer.innerHTML = '';
        
        const filtered = databaseTables.filter(table => {
            // Domain filter
            const matchesDomain = currentFilterDomain === 'all' || table.domain === currentFilterDomain;
            
            // Search query filter
            const matchesSearch = table.name.toLowerCase().includes(searchQuery) ||
                                  table.originalName.toLowerCase().includes(searchQuery) ||
                                  table.description.includes(searchQuery);
                                  
            return matchesDomain && matchesSearch;
        });

        if (filtered.length === 0) {
            tablesContainer.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: var(--text-muted)">
                    <svg style="width:48px;height:48px;margin-bottom:1rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <p style="font-size:1.1rem;font-weight:600">لا توجد جداول تطابق عملية البحث الحالية</p>
                </div>
            `;
            return;
        }

        filtered.forEach(table => {
            const card = document.createElement('div');
            card.className = 'table-card';
            
            // Module text mapping
            const moduleText = table.module.toUpperCase();
            
            card.innerHTML = `
                <div class="table-header">
                    <span class="table-name">${table.name}</span>
                    <span class="table-module ${table.module}">${moduleText}</span>
                </div>
                <p class="table-desc">${table.description}</p>
                <div class="table-meta">
                    <span>حقول الأعمدة: ${table.columns.length}</span>
                    <span>WinDev: ${table.originalName}</span>
                </div>
            `;
            
            card.addEventListener('click', () => openTableModal(table));
            tablesContainer.appendChild(card);
        });
    }

    // Modal Control Logic
    const schemaModal = document.getElementById('schema-modal');
    const modalCloseBtn = document.getElementById('modal-close-btn');
    
    function openTableModal(table) {
        document.getElementById('modal-table-name').textContent = table.name;
        document.getElementById('modal-table-desc').textContent = table.description;
        document.getElementById('modal-table-windev').textContent = table.originalName;
        document.getElementById('modal-table-module').textContent = table.module.toUpperCase();
        
        // Domain text mapping in Arabic
        const domainMap = {
            'establishment': 'المؤسسات والهياكل (Centers)',
            'specialty': 'التخصصات وعروض التكوين (Specialties)',
            'trainee': 'المتربصين والتمهين (Trainees)',
            'finance': 'الرواتب والميزانية العامة (Finance)'
        };
        document.getElementById('modal-table-domain').textContent = domainMap[table.domain] || table.domain;
        
        // Populate modal rows
        const tbody = document.getElementById('modal-schema-rows');
        tbody.innerHTML = '';
        
        table.columns.forEach(col => {
            const tr = document.createElement('tr');
            
            // Key badge formatting
            let keyText = '';
            if (col.key === 'PK') {
                keyText = `<span class="key-badge pk">PK</span>`;
            } else if (col.key === 'FK') {
                keyText = `<span class="key-badge fk">FK</span>`;
            }
            
            tr.innerHTML = `
                <td class="column-name">${col.name}</td>
                <td class="column-type">${col.type}</td>
                <td>${col.nullable}</td>
                <td>${keyText}</td>
                <td style="color:var(--text-secondary)">${col.desc}</td>
            `;
            tbody.appendChild(tr);
        });

        schemaModal.classList.add('open');
    }

    // Close Modal Event handlers
    modalCloseBtn.addEventListener('click', () => schemaModal.classList.remove('open'));
    schemaModal.addEventListener('click', (e) => {
        if (e.target === schemaModal) {
            schemaModal.classList.remove('open');
        }
    });

    // Search and tab filters attachment
    schemaSearchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value.toLowerCase().trim();
        renderTables();
    });

    domainTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            domainTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            currentFilterDomain = tab.getAttribute('data-domain');
            renderTables();
        });
    });

    // Initial render
    renderTables();

    // --- 5. Interactive Validation Simulator ---
    const simSelectBtns = document.querySelectorAll('.sim-select-btn');
    const simForms = document.querySelectorAll('.sim-form');
    const simResultContainer = document.getElementById('sim-result-container');
    const simEmptyState = document.getElementById('sim-empty-state');
    const simResultContent = document.getElementById('sim-result-content');
    
    // Result elements
    const resultIconEl = document.getElementById('sim-result-icon');
    const resultTitleEl = document.getElementById('sim-result-title');
    const resultMessageEl = document.getElementById('sim-result-message');
    const resultDetailsEl = document.getElementById('sim-result-details');

    // Tab switching for simulation tools
    simSelectBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetRule = btn.getAttribute('data-rule');
            
            simSelectBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            simForms.forEach(form => form.classList.remove('active'));
            document.getElementById(`form-sim-${targetRule}`).classList.add('active');
            
            // Reset result panel to empty
            simEmptyState.style.display = 'flex';
            simResultContent.style.display = 'none';
            simResultContainer.className = 'sim-result-panel';
        });
    });

    // Submits and Rule Validators
    
    // Validator 1: CCP Modulo 97 calculation
    document.getElementById('form-sim-ccp').addEventListener('submit', (e) => {
        e.preventDefault();
        const ccpNum = document.getElementById('ccp-num').value.trim();
        const ccpKey = parseInt(document.getElementById('ccp-key').value.trim());

        if (!ccpNum || isNaN(ccpKey)) return;

        // Perform calculation
        const ccpVal = parseInt(ccpNum);
        const calculatedKey = 97 - (ccpVal * 100) % 97;
        const isValid = ccpKey === calculatedKey;

        // Show results
        showSimulationResult({
            success: isValid,
            title: isValid ? 'مفتاح حساب بريدي صالح' : 'مفتاح حساب بريدي غير مطابق',
            message: isValid ? 
                `رقم الحساب البريدي والمفتاح متطابقان تماماً وخاليان من أخطاء الإدخال الحسابية. يقبل النظام التحويل المالي للموظف شهرياً.` :
                `أثبت الفحص الحسابي عدم تطابق رقم الحساب بالمفتاح البريدي الثنائي. الحساب المعطى غير صالح للصب وسيمنع النظام إدخاله.`,
            details: [
                { label: 'رقم الحساب الجاريCCP', value: ccpNum, en: true },
                { label: 'المفتاح المدخل', value: ccpKey.toString(), en: true },
                { label: 'المفتاح المحسوب بالنظام', value: calculatedKey.toString(), en: true },
                { label: 'معادلة الفحص والرقابة', value: '97 - (CCP_Number * 100) % 97', en: true }
            ]
        });
    });

    // Validator 2: Admission age constraint
    document.getElementById('form-sim-age').addEventListener('submit', (e) => {
        e.preventDefault();
        const birthDateVal = document.getElementById('birth-date').value;
        const mode = document.getElementById('training-mode').value;

        if (!birthDateVal) return;

        // Calculate age
        const today = new Date();
        const birthDate = new Date(birthDateVal);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        let isAccepted = false;
        let rejectReason = '';

        if (mode === 'apprentissage') {
            // Apprenticeship: 15 to 35 years inclusive
            if (age >= 15 && age <= 35) {
                isAccepted = true;
            } else {
                rejectReason = 'عمر المتمهن في التمهين الخارجي يجب أن يكون بين 15 و 35 سنة قانوناً حسب التشريع الجزائري.';
            }
        } else if (mode === 'residentiel') {
            // Residential: min 16 years
            if (age >= 16) {
                isAccepted = true;
            } else {
                rejectReason = 'السن الأدنى للتكوين الإقامي الحضوري بالمركز هو 16 سنة كاملة للالتحاق البيداغوجي.';
            }
        }

        showSimulationResult({
            success: isAccepted,
            title: isAccepted ? 'مستوفٍ للشروط القانونية للسن' : 'مرفوض بيداغوجياً (السن غير قانوني)',
            message: isAccepted ? 
                `المترشح مستوفٍ بالكامل للسن القانوني للالتحاق بنمط التكوين المحدد وفق شروط المنظومة التربوية لوزارة التكوين المهني.` :
                rejectReason,
            details: [
                { label: 'تاريخ الميلاد المدخل', value: birthDateVal, en: true },
                { label: 'عمر المترشح الحالي', value: `${age} سنة`, en: false },
                { label: 'نمط التكوين المختار', value: mode === 'apprentissage' ? 'التمهين (Apprentissage)' : 'حضوري إقامي (Résidentiel)', en: false },
                { label: 'الشرط البيداغوجي المطبق', value: mode === 'apprentissage' ? 'بين 15 و 35 سنة' : '16 سنة فما فوق', en: false }
            ]
        });
    });

    // Validator 3: Financial budget article limits
    document.getElementById('form-sim-budget').addEventListener('submit', (e) => {
        e.preventDefault();
        const allocation = parseFloat(document.getElementById('budget-allocation').value);
        const committed = parseFloat(document.getElementById('budget-committed').value);
        const request = parseFloat(document.getElementById('budget-request').value);

        if (isNaN(allocation) || isNaN(committed) || isNaN(request)) return;

        const available = allocation - committed;
        const isApproved = (committed + request) <= allocation;

        showSimulationResult({
            success: isApproved,
            title: isApproved ? 'التزام مالي معتمد ومطابق' : 'مرفوض محاسبياً (تجاوز الميزانية)',
            message: isApproved ? 
                `يتوفر رصيد مالي كافٍ في البند المحاسبي. تم تمرير الفاتورة واعتماد بطاقة الالتزام المالي وإرسالها للمراقب المالي.` :
                `تجاوزت هذه القيمة الرصيد المتاح حالياً للبند المحاسبي المذكور. تم تجميد ورفض المعاملة تلقائياً لمنع عجز الموازنة.`,
            details: [
                { label: 'الاعتماد السنوي الإجمالي', value: `${allocation.toLocaleString()} د.ج`, en: false },
                { label: 'الالتزامات السابقة المتراكمة', value: `${committed.toLocaleString()} د.ج`, en: false },
                { label: 'الرصيد المالي المتبقي الفعلي', value: `${available.toLocaleString()} د.ج`, en: false },
                { label: 'قيمة النفقة/الفاتورة المقترحة', value: `${request.toLocaleString()} د.ج`, en: false }
            ]
        });
    });

    // Helper function to display results in output panel
    function showSimulationResult(data) {
        // Toggle view visibility
        simEmptyState.style.display = 'none';
        simResultContent.style.display = 'flex';

        // Add glow animation border
        simResultContainer.className = 'sim-result-panel ' + (data.success ? 'success' : 'error');
        
        // Apply temporary shake animation to error results for micro-interaction
        if (!data.success) {
            simResultContainer.classList.add('shake');
            setTimeout(() => {
                simResultContainer.classList.remove('shake');
            }, 500);
        }

        // Set title and message
        resultTitleEl.textContent = data.title;
        resultTitleEl.className = 'result-title ' + (data.success ? 'success' : 'error');
        resultMessageEl.textContent = data.message;

        // Set icon
        resultIconEl.className = 'result-icon ' + (data.success ? 'success' : 'error');
        if (data.success) {
            resultIconEl.innerHTML = `
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path>
                </svg>
            `;
        } else {
            resultIconEl.innerHTML = `
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
            `;
        }

        // Populate detail rows
        resultDetailsEl.innerHTML = '';
        data.details.forEach(row => {
            const div = document.createElement('div');
            div.className = 'result-detail-row';
            div.innerHTML = `
                <span class="result-detail-label">${row.label}:</span>
                <span class="result-detail-value ${row.en ? 'en' : ''}">${row.value}</span>
            `;
            resultDetailsEl.appendChild(div);
        });
    }

});
