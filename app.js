document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Database Dictionary Data (Expanded Table List) ---
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
            description: 'يمثل المؤسسات ومراكز التكوين المهني والتمهين (CFPA / INSFP) بما في ذلك ملحقات المراكز وخصائص تشغيلها الجغرافي والشبكي.',
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
            name: 'locaux',
            originalName: 'Locaux',
            module: 'sig',
            domain: 'establishment',
            description: 'تسيير القاعات البيداغوجية، والورشات المهنية والمخازن التابعة للمركز لضبط وتوزيع المقاعد بيداغوجياً.',
            columns: [
                { name: 'id_locaux', type: 'BIGINT', key: 'PK', nullable: 'لا', desc: 'المعرف الفريد للقاعة أو المحل المهني' },
                { name: 'id_ets_form', type: 'BIGINT', key: 'FK', nullable: 'نعم', desc: 'المؤسسة أو المركز المالك للقاعة' },
                { name: 'nom', type: 'VARCHAR(50)', key: '', nullable: 'نعم', desc: 'اسم أو رقم القاعة البيداغوجية' },
                { name: 'type', type: 'VARCHAR(30)', key: '', nullable: 'نعم', desc: 'نوع الفضاء (ورشة، قاعة دراسة، مخبر)' }
            ]
        },
        {
            name: 'equipement',
            originalName: 'Equipement',
            module: 'sig',
            domain: 'establishment',
            description: 'العتاد والتجهيزات والوسائل المادية المخصصة للورشات والأقسام، لمتابعة الحركات والمخزون والصيانة.',
            columns: [
                { name: 'id_equipement', type: 'BIGINT', key: 'PK', nullable: 'لا', desc: 'المعرف الفريد للمعدة أو الجهاز' },
                { name: 'id_ets_form', type: 'BIGINT', key: 'FK', nullable: 'نعم', desc: 'المؤسسة المالكة للمعدة' },
                { name: 'designat', type: 'VARCHAR(150)', key: '', nullable: 'نعم', desc: 'التسمية التقنية للمعدة' },
                { name: 'code_barre', type: 'VARCHAR(50)', key: '', nullable: 'نعم', desc: 'الرمز الشريطي للرقابة والجرد المادي' },
                { name: 'prix', type: 'DECIMAL(10,2)', key: '', nullable: 'نعم', desc: 'قيمة شراء المعدة' }
            ]
        },
        {
            name: 'branche',
            originalName: 'Branche',
            module: 'sig',
            domain: 'specialty',
            description: 'يحدد الشعب المهنية والقطاعات الصناعية التي تنتمي إليها التخصصات بوزارة التكوين المهني (مثال: الإعلام الآلي).',
            columns: [
                { name: 'id_branche', type: 'BIGINT', key: 'PK', nullable: 'لا', desc: 'المعرف الفريد للشعبة المهنية' },
                { name: 'code', type: 'VARCHAR(5)', key: '', nullable: 'نعم', desc: 'الرمز القياسي للشعبة' },
                { name: 'nom', type: 'VARCHAR(50)', key: '', nullable: 'نعم', desc: 'تسمية الشعبة بالعربية' },
                { name: 'nom_fr', type: 'VARCHAR(50)', key: '', nullable: 'نعم', desc: 'تسمية الشعبة بالفرنسية' },
                { name: 'activee', type: 'BOOLEAN', key: '', nullable: 'نعم', desc: 'مؤشر تفعيل الشعبة في المركز' }
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
                { name: 'id_niveau_fp', type: 'BIGINT', key: 'FK', nullable: 'نعم', desc: 'معرف مستوى التكوين المهني للشهادة' },
                { name: 'nom', type: 'VARCHAR(250)', key: '', nullable: 'نعم', desc: 'تسمية التخصص باللغة العربية' },
                { name: 'nom_fr', type: 'VARCHAR(250)', key: '', nullable: 'نعم', desc: 'تسمية التخصص بالفرنسية' },
                { name: 'nbr_sem', type: 'TINYINT', key: '', nullable: 'نعم', desc: 'عدد السداسيات الدراسية الإجمالية للتخصص' },
                { name: 'duree_m', type: 'INT', key: '', nullable: 'نعم', desc: 'المدة الإجمالية للتكوين بالأشهر (مثال: 30 شهراً لـ تقني سامي)' },
                { name: 'id_niveau_scol', type: 'BIGINT', key: 'FK', nullable: 'نعم', desc: 'المستوى الدراسي الأدنى المطلق للالتحاق بيداغوجياً' }
            ]
        },
        {
            name: 'session',
            originalName: 'session',
            module: 'sig',
            domain: 'specialty',
            description: 'يدير الدورات البيداغوجية والزمنية الرسمية المعتمدة للاكتتاب والتسجيل للدخول المدرسي (دورة سبتمبر، دورة فبراير).',
            columns: [
                { name: 'id_session', type: 'BIGINT', key: 'PK', nullable: 'لا', desc: 'المعرف الفريد للدورة البيداغوجية' },
                { name: 'code', type: 'VARCHAR(6)', key: '', nullable: 'نعم', desc: 'رمز الدورة السنوية' },
                { name: 'nom', type: 'VARCHAR(30)', key: '', nullable: 'نعم', desc: 'اسم الدورة بالعربية' },
                { name: 'date_d', type: 'DATE', key: '', nullable: 'نعم', desc: 'تاريخ البداية الفعلية للدورة' },
                { name: 'date_d_inscr', type: 'DATE', key: '', nullable: 'نعم', desc: 'تاريخ انطلاق تسجيل المترشحين الجدد' },
                { name: 'date_f_inscr', type: 'DATE', key: '', nullable: 'نعم', desc: 'تاريخ اختتام عملية التسجيل' }
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
            name: 'section',
            originalName: 'Section',
            module: 'sig',
            domain: 'specialty',
            description: 'يمثل الأقسام والفرق البيداغوجية الفعلية التي ينضم إليها المتربصون لتلقي الدروس اليومية لكل تخصص ودورة.',
            columns: [
                { name: 'id_section', type: 'BIGINT', key: 'PK', nullable: 'لا', desc: 'المعرف الفريد للقسم الدراسي' },
                { name: 'id_offre', type: 'BIGINT', key: 'FK', nullable: 'نعم', desc: 'رابط عرض التكوين المشكل للقسم' },
                { name: 'code_section', type: 'VARCHAR(15)', key: '', nullable: 'نعم', desc: 'الرمز الرقمي المعرف للقسم' }
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
            name: 'candidat_contratapp',
            originalName: 'candidat_contratapp',
            module: 'sigpaf',
            domain: 'trainee',
            description: 'عقود التمهين والاتفاقيات المبرمة بين المتمهنين والشركات والمركز لضبط فترات التدريب الميداني والضمان CNAS.',
            columns: [
                { name: 'id_contratapp', type: 'BIGINT', key: 'PK', nullable: 'لا', desc: 'المعرف الفريد لعقد التمهين' },
                { name: 'id_candidat', type: 'BIGINT', key: 'FK', nullable: 'نعم', desc: 'رابط المترشح المقبول في نمط التمهين' },
                { name: 'id_employeur', type: 'BIGINT', key: 'FK', nullable: 'نعم', desc: 'رابط الشركة الاقتصادية الحاضنة' },
                { name: 'date_debut', type: 'DATE', key: '', nullable: 'نعم', desc: 'تاريخ بداية عقد العمل الفعلي للمتمهن' },
                { name: 'date_fin', type: 'DATE', key: '', nullable: 'نعم', desc: 'تاريخ انتهاء فترة التمهين القانونية' }
            ]
        },
        {
            name: 'bourse',
            originalName: 'bourse',
            module: 'sig',
            domain: 'trainee',
            description: 'يدير تسيير المنح الدراسية ومبالغ التكفل المالي المخصصة للطلبة والمتربصين المستحقين وفقاً للقانون.',
            columns: [
                { name: 'id_bourse', type: 'BIGINT', key: 'PK', nullable: 'لا', desc: 'المعرف الفريد للمنحة المدرسية' },
                { name: 'id_apprenant', type: 'BIGINT', key: 'FK', nullable: 'نعم', desc: 'المتربص المستفيد من المنحة' },
                { name: 'montant', type: 'DECIMAL(8,2)', key: '', nullable: 'نعم', desc: 'القيمة المالية للمنحة في الدورة' },
                { name: 'taux', type: 'VARCHAR(10)', key: '', nullable: 'نعم', desc: 'نسبة المنحة (كاملة، نصف منحة)' }
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
        },
        {
            name: 'utilisateur',
            originalName: 'utilisateur',
            module: 'sig',
            domain: 'establishment',
            description: 'حسابات وبيانات تسجيل الدخول لمستخدمي النظام الإداريين ومسؤولي التسيير البيداغوجي لضبط الصلاحيات.',
            columns: [
                { name: 'id_utilisateur', type: 'BIGINT', key: 'PK', nullable: 'لا', desc: 'معرف الحساب الإداري' },
                { name: 'login', type: 'VARCHAR(50)', key: '', nullable: 'لا', desc: 'اسم المستخدم للولوج إلى النظام' },
                { name: 'password', type: 'VARCHAR(255)', key: '', nullable: 'لا', desc: 'كلمة المرور المشفرة للحساب' },
                { name: 'nom', type: 'VARCHAR(50)', key: '', nullable: 'نعم', desc: 'لقب الموظف صاحب الحساب' }
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
        'architecture': {
            title: 'الهيكل المعماري وعلاقات الفئات (DDD)',
            subtitle: 'استكشاف النطاقات البرمجية وتصميم الفئات والعلاقات البينية لنظام Laravel 12'
        },
        'roadmap': {
            title: 'خطة ومنهجية ترحيل وتحويل النظام',
            subtitle: 'المخطط الزمني للتحول (12 أسبوعاً)، وتوزيع مسؤوليات الفريق وسكربتات ترحيل البيانات'
        },
        'interfaces': {
            title: 'دليل شاشات وواجهات النظام الشامل',
            subtitle: 'الربط المعماري بين شاشات WinDev ومدخلاتها في الجداول والتقارير الورقية المطبوعة'
        },
        'proposals': {
            title: 'الرؤية الهندسية والاقتراحات الاستراتيجية المستقبلية',
            subtitle: 'توصيات هندسية متكاملة لترقية وتطوير النظام في بيئة Laravel 12 لضمان الكفاءة والأمان والربط الفوري'
        }
    };

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const selectedTab = item.getAttribute('data-tab');
            
            navItems.forEach(n => n.classList.remove('active'));
            item.classList.add('active');

            tabContents.forEach(content => {
                content.classList.remove('active');
            });
            document.getElementById(`tab-${selectedTab}`).classList.add('active');

            if (tabDetails[selectedTab]) {
                tabTitleEl.textContent = tabDetails[selectedTab].title;
                tabSubtitleEl.textContent = tabDetails[selectedTab].subtitle;
            }

            // Trigger architecture render if tab selected
            if (selectedTab === 'architecture') {
                renderArchitectureDomain('establishment');
            }
            
            // Trigger roadmap defaults if selected
            if (selectedTab === 'roadmap') {
                renderRoadmapPhase(1);
                loadMigrationCode('wlang');
            }
        });
    });

    // --- 3. Dynamic Charts (Chart.js) ---
    const schemaCtx = document.getElementById('schemaChart').getContext('2d');
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
                backgroundColor: [primaryColor, accentColor, secondaryColor],
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
                        font: { family: 'Cairo', size: 13, weight: '600' },
                        padding: 20
                    }
                },
                tooltip: {
                    titleFont: { family: 'Cairo', size: 14 },
                    bodyFont: { family: 'Cairo', size: 13 }
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

    function renderTables() {
        tablesContainer.innerHTML = '';
        
        const filtered = databaseTables.filter(table => {
            const matchesDomain = currentFilterDomain === 'all' || table.domain === currentFilterDomain;
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

    // Modal Control & Code Generator Logic
    const schemaModal = document.getElementById('schema-modal');
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const modalCodeTabs = document.querySelectorAll('.modal-code-tab');
    const modalTabContents = document.querySelectorAll('.modal-tab-content');
    
    // Manage tabs inside modal
    modalCodeTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetTab = tab.getAttribute('data-modal-tab');
            
            modalCodeTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            modalTabContents.forEach(content => {
                content.classList.remove('active');
            });
            document.getElementById(`modal-tab-${targetTab}`).classList.add('active');
        });
    });

    function generateLaravelEloquentModel(table) {
        const className = table.name.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('');
        
        let relationships = '';
        table.columns.forEach(col => {
            if (col.key === 'FK') {
                const relationName = col.name.replace('id_', '').replace('i_d', '');
                const targetModel = relationName.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('');
                
                relationships += `
    /**
     * Get the ${relationName} associated with this model.
     */
    public function ${relationName}(): BelongsTo
    {
        return $this->belongsTo(${targetModel}::class, '${col.name}');
    }
`;
            }
        });

        const pkCol = table.columns.find(c => c.key === 'PK');
        const pkString = pkCol && pkCol.name !== 'id' ? `\n    protected $primaryKey = '${pkCol.name}';\n` : '';

        return `<?php

namespace App\\Models;

use Illuminate\\Database\\Eloquent\\Model;
use Illuminate\\Database\\Eloquent\\Relations\\BelongsTo;
use Illuminate\\Database\\Eloquent\\Relations\\HasMany;
use Illuminate\\Database\\Eloquent\\SoftDeletes;

class ${className} extends Model
{
    use SoftDeletes;

    protected $table = '${table.name}';
${pkString}
    protected $fillable = [
        ${table.columns.filter(c => c.key !== 'PK').map(c => `'${c.name}'`).join(',\n        ')}
    ];
${relationships}
}`;
    }

    function generateLaravelMigration(table) {
        const className = table.name.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('');
        
        let fieldsBlueprint = '';
        table.columns.forEach(col => {
            if (col.key === 'PK') {
                fieldsBlueprint += `            $table->id('${col.name}');\n`;
            } else if (col.key === 'FK') {
                const targetTable = col.name.replace('id_', '').replace('i_d', '');
                const nullableMethod = col.nullable === 'نعم' ? '->nullable()' : '';
                fieldsBlueprint += `            $table->foreignId('${col.name}')${nullableMethod}->constrained('${targetTable}')->onDelete('cascade');\n`;
            } else {
                let colMethod = '$table->string';
                if (col.type.startsWith('VARCHAR')) {
                    const sizeMatch = col.type.match(/\\((\\d+)\\)/);
                    const size = sizeMatch ? sizeMatch[1] : 255;
                    colMethod = `$table->string('${col.name}', ${size})`;
                } else if (col.type === 'BIGINT') {
                    colMethod = `$table->bigInteger('${col.name}')`;
                } else if (col.type === 'INT') {
                    colMethod = `$table->integer('${col.name}')`;
                } else if (col.type === 'TINYINT') {
                    colMethod = `$table->tinyInteger('${col.name}')`;
                } else if (col.type === 'BOOLEAN') {
                    colMethod = `$table->boolean('${col.name}')`;
                } else if (col.type === 'DATE') {
                    colMethod = `$table->date('${col.name}')`;
                } else if (col.type.startsWith('DECIMAL')) {
                    const decMatch = col.type.match(/\\((\\d+),(\\d+)\\)/);
                    const p1 = decMatch ? decMatch[1] : 8;
                    const p2 = decMatch ? decMatch[2] : 2;
                    colMethod = `$table->decimal('${col.name}', ${p1}, ${p2})`;
                }
                
                const nullableMethod = col.nullable === 'نعم' ? '->nullable()' : '';
                fieldsBlueprint += `            ${colMethod}${nullableMethod};\n`;
            }
        });

        return `<?php

use Illuminate\\Database\\Migrations\\Migration;
use Illuminate\\Database\\Schema\\Blueprint;
use Illuminate\\Support\\Facades\\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('${table.name}', function (Blueprint $table) {
${fieldsBlueprint}            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('${table.name}');
    }
};`;
    }

    function openTableModal(table) {
        document.getElementById('modal-table-name').textContent = table.name;
        document.getElementById('modal-table-desc').textContent = table.description;
        document.getElementById('modal-table-windev').textContent = table.originalName;
        document.getElementById('modal-table-module').textContent = table.module.toUpperCase();
        
        const domainMap = {
            'establishment': 'المؤسسات والهياكل (Centers)',
            'specialty': 'التخصصات وعروض التكوين (Specialties)',
            'trainee': 'المتربصين والتمهين (Trainees)',
            'finance': 'الرواتب والميزانية العامة (Finance)'
        };
        document.getElementById('modal-table-domain').textContent = domainMap[table.domain] || table.domain;
        
        modalCodeTabs.forEach(t => t.classList.remove('active'));
        document.querySelector('[data-modal-tab="schema"]').classList.add('active');
        modalTabContents.forEach(c => c.classList.remove('active'));
        document.getElementById('modal-tab-schema').classList.add('active');

        document.getElementById('modal-eloquent-code').textContent = generateLaravelEloquentModel(table);
        document.getElementById('modal-migration-code').textContent = generateLaravelMigration(table);

        const tbody = document.getElementById('modal-schema-rows');
        tbody.innerHTML = '';
        
        table.columns.forEach(col => {
            const tr = document.createElement('tr');
            
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

    modalCloseBtn.addEventListener('click', () => schemaModal.classList.remove('open'));
    schemaModal.addEventListener('click', (e) => {
        if (e.target === schemaModal) {
            schemaModal.classList.remove('open');
        }
    });

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

    renderTables();

    // --- 5. Domain Architecture Class Explorer & DDD diagrams ---
    const archSelectBtns = document.querySelectorAll('.arch-select-btn');
    const archClassesContainer = document.getElementById('arch-classes-container');
    const archDomainTitle = document.getElementById('arch-domain-title');
    const archDomainDesc = document.getElementById('arch-domain-desc');
    const mermaidArea = document.getElementById('mermaid-render-area');

    const domainDetails = {
        'establishment': {
            title: 'نطاق المؤسسات والهياكل (Centers & Establishments Domain)',
            desc: 'يدير هذا النطاق الهرم التنظيمي لقطاع التكوين المهني بدءاً من الوزارات الإشرافية إلى المديريات الولائية (DFEP)، ومراكز التكوين والمحلات والتجهيزات المادية داخلها.',
            mermaidMarkup: `classDiagram
    direction LR
    class Ministere {
        +bigint id_minister
        +string nom
        +string adrs
    }
    class Dfep {
        +bigint iddfep
        +bigint id_minister
        +string nom
    }
    class Ets_Form {
        +bigint id_ets_form
        +bigint iddfep
        +string nom
        +string code
    }
    class Locaux {
        +bigint id_locaux
        +bigint id_ets_form
        +string nom
    }
    Ministere "1" --* "0..*" Dfep : contains
    Dfep "1" --* "0..*" Ets_Form : supervises
    Ets_Form "1" --* "0..*" Locaux : contains`,
            classes: [
                {
                    name: 'Ministere',
                    arabic: 'الوزارة الوصية',
                    fields: [
                        { name: 'id_minister', type: 'bigint' },
                        { name: 'nom', type: 'string' },
                        { name: 'adrs', type: 'string' }
                    ],
                    relations: [
                        { type: 'hasMany', target: 'Dfep' }
                    ]
                },
                {
                    name: 'Dfep',
                    arabic: 'المديرية الولائية',
                    fields: [
                        { name: 'iddfep', type: 'bigint' },
                        { name: 'id_minister', type: 'bigint (FK)' },
                        { name: 'nom', type: 'string' }
                    ],
                    relations: [
                        { type: 'belongsTo', target: 'Ministere' },
                        { type: 'hasMany', target: 'Ets_Form' }
                    ]
                },
                {
                    name: 'Ets_Form',
                    arabic: 'مؤسسة التكوين',
                    fields: [
                        { name: 'id_ets_form', type: 'bigint' },
                        { name: 'iddfep', type: 'bigint (FK)' },
                        { name: 'nom', type: 'string' },
                        { name: 'code', type: 'string' }
                    ],
                    relations: [
                        { type: 'belongsTo', target: 'Dfep' },
                        { type: 'hasMany', target: 'Locaux' },
                        { type: 'hasMany', target: 'Equipement' }
                    ]
                },
                {
                    name: 'Locaux',
                    arabic: 'القاعات والورشات',
                    fields: [
                        { name: 'id_locaux', type: 'bigint' },
                        { name: 'id_ets_form', type: 'bigint (FK)' },
                        { name: 'nom', type: 'string' }
                    ],
                    relations: [
                        { type: 'belongsTo', target: 'Ets_Form' }
                    ]
                }
            ]
        },
        'specialty': {
            title: 'نطاق الشعب والتخصصات وعروض التكوين (Specialties & Offers)',
            desc: 'يدير هذا النطاق الهياكل التعليمية والبيداغوجية، مع تحديد الشعب والتخصصات المفتوحة لكل دورة دراسية، وتهيئة الفروع التعليمية.',
            mermaidMarkup: `classDiagram
    direction TB
    class Branche {
        +bigint id_branche
        +string code
        +string nom
    }
    class Specialite {
        +bigint id_specialite
        +bigint id_branche
        +string nom
    }
    class Offre {
        +bigint id_offre
        +bigint id_specialite
        +bigint id_session
    }
    class Session {
        +bigint id_session
        +string code
        +string nom
    }
    class Section {
        +bigint id_section
        +bigint id_offre
        +string code_section
    }
    Branche "1" --* "0..*" Specialite : groups
    Specialite "1" --* "0..*" Offre : defines
    Session "1" --* "0..*" Offre : timetables
    Offre "1" --* "0..*" Section : creates`,
            classes: [
                {
                    name: 'Branche',
                    arabic: 'الشعبة المهنية',
                    fields: [
                        { name: 'id_branche', type: 'bigint' },
                        { name: 'code', type: 'string' },
                        { name: 'nom', type: 'string' }
                    ],
                    relations: [
                        { type: 'hasMany', target: 'Specialite' }
                    ]
                },
                {
                    name: 'Specialite',
                    arabic: 'التخصص البيداغوجي',
                    fields: [
                        { name: 'id_specialite', type: 'bigint' },
                        { name: 'id_branche', type: 'bigint (FK)' },
                        { name: 'nom', type: 'string' }
                    ],
                    relations: [
                        { type: 'belongsTo', target: 'Branche' },
                        { type: 'hasMany', target: 'Offre' }
                    ]
                },
                {
                    name: 'Offre',
                    arabic: 'عرض التكوين',
                    fields: [
                        { name: 'id_offre', type: 'bigint' },
                        { name: 'id_specialite', type: 'bigint (FK)' },
                        { name: 'id_session', type: 'bigint (FK)' }
                    ],
                    relations: [
                        { type: 'belongsTo', target: 'Specialite' },
                        { type: 'belongsTo', target: 'Session' },
                        { type: 'hasMany', target: 'Section' }
                    ]
                },
                {
                    name: 'Session',
                    arabic: 'الدورة الدراسية',
                    fields: [
                        { name: 'id_session', type: 'bigint' },
                        { name: 'code', type: 'string' },
                        { name: 'nom', type: 'string' }
                    ],
                    relations: [
                        { type: 'hasMany', target: 'Offre' }
                    ]
                }
            ]
        },
        'trainee': {
            title: 'نطاق المترشحين والطلبة وعقود التمهين (Trainees & Apprenticeship)',
            desc: 'يدير الملفات والعمليات البيداغوجية للطلاب من التسجيل الأولي والمقابلة، إلى القبول والتوزيع الدراسي والغياب والدرجات والتعاقد المهني.',
            mermaidMarkup: `classDiagram
    direction LR
    class Candidat {
        +bigint id_candidat
        +string nom
        +string nin
    }
    class Preinscrit {
        +bigint id_preinscrit
        +bigint id_candidat
        +bigint id_offre
    }
    class Apprenant {
        +bigint id_apprenant
        +string num_carte
        +bigint id_section
    }
    class Apprenant_Absence {
        +bigint id_absence
        +bigint id_apprenant
        +date date_absence
    }
    Candidat "1" --o "1" Preinscrit : applies
    Preinscrit "1" ..> "1" Apprenant : enrolled
    Apprenant "1" --* "0..*" Apprenant_Absence : incurs`,
            classes: [
                {
                    name: 'Candidat',
                    arabic: 'المترشح',
                    fields: [
                        { name: 'id_candidat', type: 'bigint' },
                        { name: 'nom', type: 'string' },
                        { name: 'nin', type: 'string' }
                    ],
                    relations: [
                        { type: 'hasOne', target: 'Preinscrit' }
                    ]
                },
                {
                    name: 'Preinscrit',
                    arabic: 'التسجيل الأولي',
                    fields: [
                        { name: 'id_preinscrit', type: 'bigint' },
                        { name: 'id_candidat', type: 'bigint (FK)' },
                        { name: 'id_offre', type: 'bigint (FK)' }
                    ],
                    relations: [
                        { type: 'belongsTo', target: 'Candidat' },
                        { type: 'belongsTo', target: 'Offre' }
                    ]
                },
                {
                    name: 'Apprenant',
                    arabic: 'طالب متربص',
                    fields: [
                        { name: 'id_apprenant', type: 'bigint' },
                        { name: 'num_carte', type: 'string' },
                        { name: 'id_section', type: 'bigint (FK)' }
                    ],
                    relations: [
                        { type: 'belongsTo', target: 'Section' },
                        { type: 'hasMany', target: 'Apprenant_Absence' },
                        { type: 'hasMany', target: 'Evaluation' }
                    ]
                },
                {
                    name: 'Apprenant_Absence',
                    arabic: 'الغيابات اليومية',
                    fields: [
                        { name: 'id_absence', type: 'bigint' },
                        { name: 'id_apprenant', type: 'bigint (FK)' },
                        { name: 'date_absence', type: 'date' }
                    ],
                    relations: [
                        { type: 'belongsTo', target: 'Apprenant' }
                    ]
                }
            ]
        },
        'finance': {
            title: 'نطاق الرواتب والميزانية المالية (SIGFA Financial Domain)',
            desc: 'يدير شؤون المحاسبة والمالية بالمركز، متضمناً حساب رواتب الأساتذة والعمال، وتوزيع أرصدة الميزانية، وصرف الالتزامات للموردين.',
            mermaidMarkup: `classDiagram
    direction TB
    class Fonctionnaire {
        +bigint id_fonctionnaire
        +string ccp
        +bigint id_grade
    }
    class Grade {
        +bigint id_grade
        +string libelle
        +decimal salaire_base
    }
    class FichePaye {
        +bigint id_fiche_paye
        +bigint id_fonctionnaire
        +decimal net_a_payer
    }
    class BudgetArticle {
        +bigint id_budget_article
        +string code_article
        +decimal allocation
    }
    class Commitment {
        +bigint id_commitment
        +bigint id_budget_article
        +decimal amount
    }
    Grade "1" --* "0..*" Fonctionnaire : ranks
    Fonctionnaire "1" --* "0..*" FichePaye : compiles
    BudgetArticle "1" --* "0..*" Commitment : reserves`,
            classes: [
                {
                    name: 'Fonctionnaire',
                    arabic: 'الموظف/الأستاذ',
                    fields: [
                        { name: 'id_fonctionnaire', type: 'bigint' },
                        { name: 'ccp', type: 'string' },
                        { name: 'id_grade', type: 'bigint (FK)' }
                    ],
                    relations: [
                        { type: 'belongsTo', target: 'Grade' },
                        { type: 'hasMany', target: 'FichePaye' }
                    ]
                },
                {
                    name: 'Grade',
                    arabic: 'الرتبة الاستدلالية',
                    fields: [
                        { name: 'id_grade', type: 'bigint' },
                        { name: 'libelle', type: 'string' },
                        { name: 'salaire_base', type: 'decimal' }
                    ],
                    relations: [
                        { type: 'hasMany', target: 'Fonctionnaire' }
                    ]
                },
                {
                    name: 'FichePaye',
                    arabic: 'كشف الراتب',
                    fields: [
                        { name: 'id_fiche_paye', type: 'bigint' },
                        { name: 'id_fonctionnaire', type: 'bigint (FK)' },
                        { name: 'net_a_payer', type: 'decimal' }
                    ],
                    relations: [
                        { type: 'belongsTo', target: 'Fonctionnaire' }
                    ]
                },
                {
                    name: 'BudgetArticle',
                    arabic: 'بند الميزانية',
                    fields: [
                        { name: 'id_budget_article', type: 'bigint' },
                        { name: 'code_article', type: 'string' },
                        { name: 'allocation', type: 'decimal' }
                    ],
                    relations: [
                        { type: 'hasMany', target: 'Commitment' }
                    ]
                }
            ]
        }
    };

    function renderArchitectureDomain(domainName) {
        const domain = domainDetails[domainName];
        if (!domain) return;

        archDomainTitle.textContent = domain.title;
        archDomainDesc.textContent = domain.desc;
        archClassesContainer.innerHTML = '';

        domain.classes.forEach(cls => {
            const card = document.createElement('div');
            card.className = 'arch-class-card';
            
            let fieldsHtml = '';
            cls.fields.forEach(field => {
                fieldsHtml += `
                    <div class="arch-field-item">
                        <span class="field-name">+${field.name}</span>
                        <span class="field-type">${field.type}</span>
                    </div>
                `;
            });

            let relsHtml = '';
            cls.relations.forEach(rel => {
                relsHtml += `
                    <div class="arch-relation-item">
                        <svg style="width:12px;height:12px" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                        </svg>
                        <span class="relation-type">${rel.type}</span>
                        <span class="relation-target">${rel.target}</span>
                    </div>
                `;
            });

            card.innerHTML = `
                <div class="arch-class-name">
                    ${cls.name}
                    <span>${cls.arabic}</span>
                </div>
                <div class="arch-class-fields">
                    ${fieldsHtml}
                </div>
                <div class="arch-class-relations">
                    ${relsHtml}
                </div>
            `;
            archClassesContainer.appendChild(card);
        });

        if (window.mermaid) {
            const parent = mermaidArea.parentElement;
            parent.innerHTML = `<div class="mermaid" id="mermaid-render-area"></div>`;
            const newArea = document.getElementById('mermaid-render-area');
            
            newArea.textContent = domain.mermaidMarkup;
            window.mermaid.init(undefined, newArea);
        }
    }

    archSelectBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            archSelectBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const targetDomain = btn.getAttribute('data-arch-domain');
            renderArchitectureDomain(targetDomain);
        });
    });

    // --- 6. Interactive System Flowchart Details Clicker ---
    const flowNodes = document.querySelectorAll('.flow-node');
    const flowInfoText = document.getElementById('flow-info-text');

    const flowSystemExplanations = {
        'sig': '<strong>تطبيق SIG الإداري والبيداغوجي (Desktop Client):</strong> هو النواة المركزية لمكاتب التسيير والدراسة بالمركز. يدير بطاقات الطلبة، والغيابات، والتوجيه، والامتحانات، والجرد المادي للمقاعد والورشات والتجهيزات. يغذي قاعدة البيانات بكل المدخلات البيداغوجية واليومية.',
        'sigfa': '<strong>نظام الرواتب والميزانية العامة (SIGFA):</strong> يمثل تطبيق المصالح المالية للمؤسسة. يحتسب شهرياً أجور الأساتذة والموظفين بالاعتماد على سلم الرتب والدرجات ومطابقتها للمفتاح البريدي CCP، كما يتحقق من عدم تجاوز اعتمادات بنود الميزانية المخصصة سنوياً.',
        'db': '<strong>قاعدة البيانات الموحدة (MySQL 8 / Eloquent):</strong> المستودع المركزي المشترك للبيانات بعد ترحيله بالكامل توبولوجياً من WinDev HFSQL. يدعم سلامة العلاقات البينية (Integrity Constraints) ويمثل قاعدة الارتكاز لربط جميع المنصات المحلية والسحابية.',
        'sigpaf': '<strong>نظام PAF لعقود التمهين (Apprenticeship Contracts):</strong> يركز على تسيير المتمهنين الميدانيين. يقوم بإبرام عقود التدريب الثلاثية مع الشركات المستخدمة، وتوزيع وتصريح المتمهنين لدى الضمان الاجتماعي (CNAS)، ومتابعة ومراقبة كوتا المتمهنين المتاحة.',
        'mihnati': '<strong>بوابة التسجيل والمنصة الوطنية "مهنتي" (Mihnati API):</strong> تمثل الواجهة السحابية التكاملية مع الوزارة. يتم استيراد الدليل الوطني الرسمي للشعب والتخصصات والبلديات (عبر ملفات JSON) لتوحيد المدخلات، وتصدير قوائم المترشحين الجدد المقبولين مباشرة لقاعدة بيانات المركز.'
    };

    flowNodes.forEach(node => {
        node.addEventListener('click', () => {
            const system = node.getAttribute('data-system');
            
            flowNodes.forEach(n => n.style.transform = 'none');
            node.style.transform = 'translateY(-5px) scale(1.05)';
            node.style.borderColor = 'var(--secondary)';
            
            if (flowSystemExplanations[system]) {
                flowInfoText.innerHTML = flowSystemExplanations[system];
                flowInfoText.style.borderColor = 'var(--secondary)';
                flowInfoText.style.background = 'rgba(6, 182, 212, 0.05)';
                setTimeout(() => {
                    flowInfoText.style.borderColor = 'var(--border-color)';
                    flowInfoText.style.background = 'rgba(255, 255, 255, 0.02)';
                }, 1000);
            }
        });
    });


    // --- 7. Interactive Roadmap Timeline & Scripts Explorer ---
    const timelinePhaseCards = document.querySelectorAll('.timeline-phase-card');
    const phaseDetailsTitle = document.getElementById('phase-details-title');
    const phaseDetailsBox = document.getElementById('phase-details-box');

    const phaseDetailsData = {
        1: {
            title: 'المرحلة 1: التهيئة والتخطيط والتأسيس المعماري (الأسبوع 1 - 2)',
            html: `<div style="display:grid; grid-template-columns:1fr 1fr; gap:2rem; margin-top:1rem">
                <div>
                    <h5 style="font-weight:700; color:var(--primary); margin-bottom:0.5rem">الأنشطة والمهام الرئيسية:</h5>
                    <ul style="padding-right:1.25rem; font-size:0.85rem; color:var(--text-secondary); line-height:1.6">
                        <li>دراسة معجم وجداول قاعدة البيانات الـ 552 بالتفصيل لضبط الاعتماديات الهيكلية.</li>
                        <li>تهيئة وإعداد مشروع Laravel 12 فارغ وضبط تكوينات الأمان وربطه بـ MySQL 8.</li>
                        <li>تهيئة مستودع الأكواد (Git Repository) ووضع سياسات فروع التطوير الموحدة.</li>
                    </ul>
                </div>
                <div>
                    <h5 style="font-weight:700; color:var(--success); margin-bottom:0.5rem">المخرجات والملفات المستلمة:</h5>
                    <ul style="padding-right:1.25rem; font-size:0.85rem; color:var(--text-secondary); line-height:1.6">
                        <li>وثيقة المتطلبات البرمجية والتحليل المعماري المعتمدة.</li>
                        <li>هيكل مشروع Laravel 12 سليم ونظيف ومثبت الاعتمادات المطلوبة.</li>
                    </ul>
                </div>
            </div>`
        },
        2: {
            title: 'المرحلة 2: ترحيل وهجرة قاعدة البيانات والسجلات الحية (الأسبوع 3 - 5)',
            html: `<div style="display:grid; grid-template-columns:1fr 1fr; gap:2rem; margin-top:1rem">
                <div>
                    <h5 style="font-weight:700; color:var(--primary); margin-bottom:0.5rem">الأنشطة والمهام الرئيسية:</h5>
                    <ul style="padding-right:1.25rem; font-size:0.85rem; color:var(--text-secondary); line-height:1.6">
                        <li>تشغيل وإدراج ملفات الهجرة (Migrations) بالترتيب التوبولوجي الصحيح في خادم MySQL 8.</li>
                        <li>تطوير وتشغيل سكربتات ترحيل البيانات (WLanguage / Python ETL) ونقلها بالكامل.</li>
                        <li>تطهير وإعادة تهيئة السجلات التاريخية التالفة وتعديل صيغ التواريخ والبيانات الثنائية (BLOBs).</li>
                    </ul>
                </div>
                <div>
                    <h5 style="font-weight:700; color:var(--success); margin-bottom:0.5rem">المخرجات والملفات المستلمة:</h5>
                    <ul style="padding-right:1.25rem; font-size:0.85rem; color:var(--text-secondary); line-height:1.6">
                        <li>قاعدة بيانات MySQL 8 مأهولة بالكامل بكافة البيانات والسجلات التاريخية.</li>
                        <li>تقرير مطابقة الحسابات والبيانات وتأكيد عدم ضياع أي سجل (Data Validation Report).</li>
                    </ul>
                </div>
            </div>`
        },
        3: {
            title: 'المرحلة 3: برمجة المنطق الخلفي والأمان وعلاقات الكيانات (الأسبوع 6 - 9)',
            html: `<div style="display:grid; grid-template-columns:1fr 1fr; gap:2rem; margin-top:1rem">
                <div>
                    <h5 style="font-weight:700; color:var(--primary); margin-bottom:0.5rem">الأنشطة والمهام الرئيسية:</h5>
                    <ul style="padding-right:1.25rem; font-size:0.85rem; color:var(--text-secondary); line-height:1.6">
                        <li>برمجة نماذج البيانات (Eloquent Models) وتفعيل العلاقات المتشعبة المكتشفة.</li>
                        <li>تنفيذ خوارزميات وقواعد التحقق (الصب CCP، سن القبول البيداغوجي، كوتا عقود التمهين، وموازنات الصرف المالي).</li>
                        <li>تطوير واجهة برمجة التطبيقات (REST APIs) لربط المزامنة الفورية مع منصة "مهنتي" الوطنية.</li>
                    </ul>
                </div>
                <div>
                    <h5 style="font-weight:700; color:var(--success); margin-bottom:0.5rem">المخرجات والملفات المستلمة:</h5>
                    <ul style="padding-right:1.25rem; font-size:0.85rem; color:var(--text-secondary); line-height:1.6">
                        <li>الواجهة الخلفية (Backend) جاهزة بالكامل ومؤمنة بصلاحيات ولوج دقيقة.</li>
                        <li>حزمة اختبارات الوحدة (Unit Tests) لجميع الحسابات الحساسة للأجور والمالية بنسبة تغطية عالية.</li>
                    </ul>
                </div>
            </div>`
        },
        4: {
            title: 'المرحلة 4: بناء الواجهات وتكامل شاشات الويب (الأسبوع 10 - 11)',
            html: `<div style="display:grid; grid-template-columns:1fr 1fr; gap:2rem; margin-top:1rem">
                <div>
                    <h5 style="font-weight:700; color:var(--primary); margin-bottom:0.5rem">الأنشطة والمهام الرئيسية:</h5>
                    <ul style="padding-right:1.25rem; font-size:0.85rem; color:var(--text-secondary); line-height:1.6">
                        <li>تصميم لوحة التحكم الرئيسية وعروض التكوين وبوابات قبول المتربصين إلكترونياً.</li>
                        <li>برمجة النماذج المطبوعة والشهادات الرسمية وكشوف الرواتب بصيغ PDF مطابقة للمواصفات الحكومية.</li>
                        <li>ربط وتكامل واجهات العرض مع الواجهة الخلفية عبر استدعاءات API السريعة وبأسلوب Glassmorphic.</li>
                    </ul>
                </div>
                <div>
                    <h5 style="font-weight:700; color:var(--success); margin-bottom:0.5rem">المخرجات والملفات المستلمة:</h5>
                    <ul style="padding-right:1.25rem; font-size:0.85rem; color:var(--text-secondary); line-height:1.6">
                        <li>بوابة ويب متكاملة وتفاعلية (Frontend) جاهزة لكافة شاشات التسيير بالمركز.</li>
                        <li>ملفات ومحركات توليد المستندات الرسمية PDF باللغتين العربية والفرنسية خالية من أخطاء الترميز.</li>
                    </ul>
                </div>
            </div>`
        },
        5: {
            title: 'المرحلة 5: الجودة والنشر والتشغيل الميداني الفعلي (الأسبوع 12)',
            html: `<div style="display:grid; grid-template-columns:1fr 1fr; gap:2rem; margin-top:1rem">
                <div>
                    <h5 style="font-weight:700; color:var(--primary); margin-bottom:0.5rem">الأنشطة والمهام الرئيسية:</h5>
                    <ul style="padding-right:1.25rem; font-size:0.85rem; color:var(--text-secondary); line-height:1.6">
                        <li>إجراء اختبارات الأداء والضغط والتأكد من استقرار بوابة الويب وسرعة استعلامات MySQL 8.</li>
                        <li>تنصيب وإعداد خادم الإنتاج النهائي، ونشر التطبيق بالكامل وتأمين النسخ الاحتياطي التلقائي.</li>
                        <li>تقديم دورات تدريبية مكثفة لموظفي المركز الإداريين والماليين لاستعمال البوابة الجديدة بيسر.</li>
                    </ul>
                </div>
                <div>
                    <h5 style="font-weight:700; color:var(--success); margin-bottom:0.5rem">المخرجات والملفات المستلمة:</h5>
                    <ul style="padding-right:1.25rem; font-size:0.85rem; color:var(--text-secondary); line-height:1.6">
                        <li>رابط النظام النهائي في وضع التشغيل للإنتاج (Go-Live).</li>
                        <li>دليل الاستخدام والتشغيل الكامل وكتيب الدعم الفني والصيانة الدورية للمنصة.</li>
                    </ul>
                </div>
            </div>`
        }
    };

    function renderRoadmapPhase(phaseNum) {
        const data = phaseDetailsData[phaseNum];
        if (!data) return;

        timelinePhaseCards.forEach(card => card.classList.remove('active'));
        document.querySelector(`.timeline-phase-card[data-phase="${phaseNum}"]`).classList.add('active');

        phaseDetailsTitle.textContent = data.title;
        
        // Remove and animate details box to make interaction vivid
        phaseDetailsBox.style.animation = 'none';
        phaseDetailsBox.offsetHeight; /* trigger reflow */
        phaseDetailsBox.style.animation = null;
        
        // Render raw HTML
        const contentDiv = phaseDetailsBox.querySelector('div');
        if (contentDiv) {
            contentDiv.parentElement.removeChild(contentDiv);
        }
        phaseDetailsBox.insertAdjacentHTML('beforeend', data.html);
    }

    timelinePhaseCards.forEach(card => {
        card.addEventListener('click', () => {
            const phase = parseInt(card.getAttribute('data-phase'));
            renderRoadmapPhase(phase);
        });
    });

    // Code snippets templates for migration
    const migrationScripts = {
        'wlang': `// كود مبرمج في مشروع WinDev لنقل البيانات لـ MySQL
// 1. الاتصال بقاعدة بيانات MySQL 8
ConnexionMySQL is Connection
ConnexionMySQL.Provider = hAccessProviderMySQL
ConnexionMySQL.Server = "localhost"
ConnexionMySQL.User = "root"
ConnexionMySQL.Password = "password"
ConnexionMySQL.Database = "sig_laravel"
ConnexionMySQL.Port = 3306

IF NOT HOpenConnection(ConnexionMySQL) THEN
    Error("فشل الاتصال بقاعدة بيانات MySQL: " + HErrorInfo())
    RETURN
END

// 2. تكرار النقل لكل جدول (مثال: جدول المترشحين candidat)
HReadFirst(candidat)
WHILE NOT HOut(candidat)
    // كتابة استعلام الإدخال المباشر في MySQL
    QuerySQL is string = "INSERT INTO candidat (id_candidat, nom, prenom, date_naiss, nin) VALUES (%1, '%2', '%3', '%4', '%5')"
    QuerySQL = StringBuild(QuerySQL, candidat.id_candidat, SQLString(candidat.nom), SQLString(candidat.prenom), DateToString(candidat.date_naiss, "YYYY-MM-DD"), candidat.nin)
    
    IF NOT HExecuteSQLQuery(ConnexionMySQL, QuerySQL) THEN
        Trace("خطأ في نقل السجل: " + HErrorInfo())
    END
    HReadNext(candidat)
END
HCloseConnection(ConnexionMySQL)
Info("تم الانتهاء من ترحيل البيانات بنجاح.")`,
        
        'python': `import pyodbc
import pymysql
import datetime

# 1. الاتصال بملفات HFSQL الكلاسيكية عبر تعريف ODBC الخاص بشركة PC SOFT
hfsql_conn = pyodbc.connect(
    'DRIVER={HFSQL};'
    'Server Address=localhost:4900;'
    'Database=MyProjects_SIG;'
    'UID=admin;'
    'PWD=;'
)
hfsql_cursor = hfsql_conn.cursor()

# 2. الاتصال بقاعدة بيانات MySQL
mysql_conn = pymysql.connect(
    host='localhost',
    user='root',
    password='password',
    database='sig_laravel',
    charset='utf8mb4'
)
mysql_cursor = mysql_conn.cursor()

# 3. جلب وترحيل البيانات (مثال: جدول الموظفين)
hfsql_cursor.execute("SELECT id_fonctionnaire, ccp, cle_ccp, nom, prenom FROM fonctionnaire")
rows = hfsql_cursor.fetchall()

insert_query = "INSERT INTO fonctionnaire (id_fonctionnaire, ccp, cle_ccp, nom, prenom) VALUES (%s, %s, %s, %s, %s)"

for row in rows:
    # معالجة وتحويل القيم لتوافق MySQL
    ccp_val = str(row.ccp).strip()
    key_val = str(row.cle_ccp).strip()
    nom_val = str(row.nom).strip()
    prenom_val = str(row.prenom).strip()
    
    mysql_cursor.execute(insert_query, (row.id_fonctionnaire, ccp_val, key_val, nom_val, prenom_val))

mysql_conn.commit()

# إغلاق الاتصالات
mysql_cursor.close()
mysql_conn.close()
hfsql_cursor.close()
hfsql_conn.close()
print("تمت هجرة بيانات الجدول بنجاح.")`,
        
        'csv': `-- 1. تصدير الجدول بصيغة CSV من أداة HFSQL Control Center بترميز UTF-8
-- 2. استدعاء استعلام MySQL الفوري السريع لتحميل السجلات إلى الجدول Laravel المقابل

LOAD DATA INFILE '/path/to/candidat.csv' 
INTO TABLE candidat 
CHARACTER SET utf8mb4
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\\n'
IGNORE 1 ROWS
(id_candidat, nom, prenom, date_naiss, nin, @created_at, @updated_at)
SET created_at = NOW(), updated_at = NOW();`
    };

    const codeArea = document.getElementById('migration-code-area');
    const btnWlang = document.getElementById('btn-code-wlang');
    const btnPython = document.getElementById('btn-code-python');
    const btnCsv = document.getElementById('btn-code-csv');

    function loadMigrationCode(type) {
        if (migrationScripts[type]) {
            codeArea.textContent = migrationScripts[type];
        }
    }

    if (btnWlang && btnPython && btnCsv) {
        btnWlang.addEventListener('click', () => {
            document.querySelectorAll('#tab-roadmap .sim-select-btn').forEach(b => b.classList.remove('active'));
            btnWlang.classList.add('active');
            loadMigrationCode('wlang');
        });
        btnPython.addEventListener('click', () => {
            document.querySelectorAll('#tab-roadmap .sim-select-btn').forEach(b => b.classList.remove('active'));
            btnPython.classList.add('active');
            loadMigrationCode('python');
        });
        btnCsv.addEventListener('click', () => {
            document.querySelectorAll('#tab-roadmap .sim-select-btn').forEach(b => b.classList.remove('active'));
            btnCsv.classList.add('active');
            loadMigrationCode('csv');
        });
    }


    // --- 8. Interactive Validation Simulator ---
    const simSelectBtns = document.querySelectorAll('.sim-select-btn');
    const simForms = document.querySelectorAll('.sim-form');
    const simResultContainer = document.getElementById('sim-result-container');
    const simEmptyState = document.getElementById('sim-empty-state');
    const simResultContent = document.getElementById('sim-result-content');
    
    const resultIconEl = document.getElementById('sim-result-icon');
    const resultTitleEl = document.getElementById('sim-result-title');
    const resultMessageEl = document.getElementById('sim-result-message');
    const resultDetailsEl = document.getElementById('sim-result-details');

    simSelectBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetRule = btn.getAttribute('data-rule');
            
            // Protect simulator selections from timeline scripts selector tabs
            if (!targetRule) return;

            simSelectBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            simForms.forEach(form => form.classList.remove('active'));
            document.getElementById(`form-sim-${targetRule}`).classList.add('active');
            
            simEmptyState.style.display = 'flex';
            simResultContent.style.display = 'none';
            simResultContainer.className = 'sim-result-panel';
        });
    });

    // Form 1: CCP Modulo 97 calculation
    document.getElementById('form-sim-ccp').addEventListener('submit', (e) => {
        e.preventDefault();
        const ccpNum = document.getElementById('ccp-num').value.trim();
        const ccpKey = parseInt(document.getElementById('ccp-key').value.trim());

        if (!ccpNum || isNaN(ccpKey)) return;

        const ccpVal = parseInt(ccpNum);
        const calculatedKey = 97 - (ccpVal * 100) % 97;
        const isValid = ccpKey === calculatedKey;

        showSimulationResult({
            success: isValid,
            title: isValid ? 'مفتاح حساب بريدي صالح' : 'مفتاح حساب بريدي غير مطابق',
            message: isValid ? 
                `رقم الحساب البريدي والمفتاح متطابقان تماماً وخاليان من أخطاء الإدخال الحسابية. يقبل النظام التحويل المالي للموظف شهرياً.` :
                `أثبت الفحص الحسابي عدم تطابق رقم الحساب بالمفتاح البريدي الثنائي. الحساب المعطى غير صالح للصب وسيمنع النظام إدخاله.`,
            details: [
                { label: 'رقم الحساب الجاري CCP', value: ccpNum, en: true },
                { label: 'المفتاح المدخل', value: ccpKey.toString(), en: true },
                { label: 'المفتاح المحسوب بالنظام', value: calculatedKey.toString(), en: true },
                { label: 'معادلة الفحص والرقابة', value: '97 - (CCP_Number * 100) % 97', en: true }
            ]
        });
    });

    // Form 2: Trainee Age
    document.getElementById('form-sim-age').addEventListener('submit', (e) => {
        e.preventDefault();
        const birthDateVal = document.getElementById('birth-date').value;
        const mode = document.getElementById('training-mode').value;

        if (!birthDateVal) return;

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
            if (age >= 15 && age <= 35) {
                isAccepted = true;
            } else {
                rejectReason = 'عمر المتمهن في التمهين يجب أن يتراوح بين 15 و 35 سنة قانوناً حسب التشريع الجزائري لعقود العمل.';
            }
        } else if (mode === 'residentiel') {
            if (age >= 16) {
                isAccepted = true;
            } else {
                rejectReason = 'السن الأدنى المسموح به للتكوين الإقامي الحضوري بالمركز هو 16 سنة كاملة للالتحاق بيداغوجياً.';
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

    // Form 3: Budget check
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

    function showSimulationResult(data) {
        simEmptyState.style.display = 'none';
        simResultContent.style.display = 'flex';

        simResultContainer.className = 'sim-result-panel ' + (data.success ? 'success' : 'error');
        
        if (!data.success) {
            simResultContainer.classList.add('shake');
            setTimeout(() => {
                simResultContainer.classList.remove('shake');
            }, 500);
        }

        resultTitleEl.textContent = data.title;
        resultTitleEl.className = 'result-title ' + (data.success ? 'success' : 'error');
        resultMessageEl.textContent = data.message;

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

    // --- Validation Rules Tab Toggle ---
    const btnViewCards = document.getElementById('btn-view-cards');
    const btnViewComparison = document.getElementById('btn-view-comparison');
    const rulesCardsView = document.getElementById('rules-cards-view');
    const rulesComparisonView = document.getElementById('rules-comparison-view');

    if (btnViewCards && btnViewComparison && rulesCardsView && rulesComparisonView) {
        btnViewCards.addEventListener('click', () => {
            btnViewCards.classList.add('active');
            btnViewCards.style.background = 'var(--primary)';
            btnViewCards.style.color = 'white';
            btnViewCards.style.borderColor = 'transparent';

            btnViewComparison.classList.remove('active');
            btnViewComparison.style.background = 'rgba(255,255,255,0.03)';
            btnViewComparison.style.color = 'var(--text-secondary)';
            btnViewComparison.style.borderColor = 'var(--border-color)';

            rulesCardsView.style.display = 'grid';
            rulesComparisonView.style.display = 'none';
        });

        btnViewComparison.addEventListener('click', () => {
            btnViewComparison.classList.add('active');
            btnViewComparison.style.background = 'var(--primary)';
            btnViewComparison.style.color = 'white';
            btnViewComparison.style.borderColor = 'transparent';

            btnViewCards.classList.remove('active');
            btnViewCards.style.background = 'rgba(255,255,255,0.03)';
            btnViewCards.style.color = 'var(--text-secondary)';
            btnViewCards.style.borderColor = 'var(--border-color)';

            rulesCardsView.style.display = 'none';
            rulesComparisonView.style.display = 'block';
        });
    }

});
