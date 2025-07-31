import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Brand
    'brand.name': 'Libya-Can Learning',
    'brand.tagline': 'English for Libyan Grade 9 & 12 — powered by Abdullah & Hammam',
    
    // Navigation
    'nav.home': 'Home',
    'nav.login': 'Login',
    'nav.register': 'Register',
    'nav.dashboard': 'Dashboard',
    'nav.logout': 'Logout',
    
    // Auth
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.confirmPassword': 'Confirm Password',
    'auth.name': 'Full Name',
    'auth.phone': 'Phone Number',
    'auth.grade': 'Grade Level',
    'auth.login': 'Login',
    'auth.register': 'Create Account',
    'auth.adminLogin': 'Admin Login',
    'auth.userLogin': 'User Login',
    'auth.createPassword': 'Create Password',
    'auth.phoneCountry': 'Select Country',
    
    // Dashboard
    'dashboard.title': 'Admin Dashboard',
    'dashboard.userManagement': 'User Management',
    'dashboard.totalUsers': 'Total Users',
    'dashboard.pendingApprovals': 'Pending Approvals',
    'dashboard.approvedUsers': 'Approved Users',
    
    // User Management
    'users.approve': 'Approve',
    'users.reject': 'Reject',
    'users.delete': 'Delete',
    'users.pending': 'Pending',
    'users.approved': 'Approved',
    'users.rejected': 'Rejected',
    
    // Waiting Screen
    'waiting.title': 'Account Pending Approval',
    'waiting.message': 'Your account has been created successfully and is currently pending admin approval.',
    'waiting.contact': 'For inquiries, please contact Abdullah & Hammam:',
    'waiting.checkBack': 'Please check back later or contact support for updates.',
    'waiting.phone': '+218 926 845 740',
    
    // Home
    'home.title': 'Libya-Can Learning',
    'home.subtitle': 'Master English with personalized lessons designed for Libyan students',
    'home.heroDesc': 'Transform your English skills with our comprehensive learning platform tailored specifically for Grade 9 & 12 Libyan students.',
    'home.getStarted': 'Start Learning Today',
    'home.learnMore': 'Explore Features',
    'home.whyChoose': 'Why Choose Libya-Can Learning?',
    'home.whyChooseDesc': 'Experience cutting-edge educational technology designed specifically for Libyan students',
    'home.readyToTransform': 'Ready to Master English?',
    'home.readyDesc': 'Join hundreds of Libyan students already improving their English with our platform',
    'home.startJourney': 'Start Your Journey Today',
    
    // Features
    'features.interactive': 'Interactive Learning',
    'features.interactiveDesc': 'Engage with dynamic content designed for Libyan curriculum',
    'features.personalized': 'Personalized Experience',
    'features.personalizedDesc': 'Tailored lessons for Grade 9 & 12 students',
    'features.gamified': 'Gamified Progress',
    'features.gamifiedDesc': 'Track your scores and compete with classmates',
    'features.translation': 'Arabic Translation',
    'features.translationDesc': 'Learn with full Arabic support and explanations',
    'features.grammar': 'Grammar Mastery',
    'features.grammarDesc': 'Comprehensive grammar lessons with practice exercises',
    'features.notebook': 'Digital Notebook',
    'features.notebookDesc': 'Keep track of your progress and take notes',
    
    // Pricing
    'pricing.title': 'Simple, Affordable Pricing',
    'pricing.monthly': 'Monthly Plan',
    'pricing.price': '20 LYD',
    'pricing.perMonth': '/month',
    'pricing.selectPlan': 'Choose This Plan',
    'pricing.feature1': 'Full access to Grade 9 & 12 content',
    'pricing.feature2': 'Interactive lessons with Arabic translation',
    'pricing.feature3': 'Grammar exercises and practice tests',
    'pricing.feature4': 'Digital notebook and progress tracking',
    'pricing.feature5': 'Gamified scoring system',
    'pricing.feature6': 'Direct support from Abdullah & Hammam',
    
    // Testimonials
    'testimonials.title': 'What Our Students Say',
    'testimonials.student1': 'Libya-Can helped me improve my English grades significantly!',
    'testimonials.student1Name': 'Ahmed Al-Mansouri, Grade 12',
    'testimonials.student2': 'The Arabic explanations made everything so much clearer.',
    'testimonials.student2Name': 'Fatima Hassan, Grade 9',
    'testimonials.student3': 'Interactive lessons make learning English actually fun!',
    'testimonials.student3Name': 'Omar Khalil, Grade 11',
    
    // Contact
    'contact.title': 'Contact Abdullah & Hammam',
    'contact.phone': '+218 926 845 740',
    'contact.email': 'abdullah@libya-can.ly',
    'contact.support': 'Get personalized support from our founders',
    
    // Common
    'common.loading': 'Loading...',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.confirm': 'Confirm',
    'common.error': 'Error',
    'common.success': 'Success',
    'common.darkMode': 'Dark Mode',
    'common.lightMode': 'Light Mode',
  },
  ar: {
    // Brand
    'brand.name': 'ليبيا-كان للتعلم',
    'brand.tagline': 'الإنجليزية للصفين التاسع والثاني عشر الليبي — بإشراف عبد الله وهمام',
    
    // Navigation
    'nav.home': 'الرئيسية',
    'nav.login': 'تسجيل الدخول',
    'nav.register': 'إنشاء حساب',
    'nav.dashboard': 'لوحة التحكم',
    'nav.logout': 'تسجيل الخروج',
    
    // Auth
    'auth.email': 'البريد الإلكتروني',
    'auth.password': 'كلمة المرور',
    'auth.confirmPassword': 'تأكيد كلمة المرور',
    'auth.name': 'الاسم الكامل',
    'auth.phone': 'رقم الهاتف',
    'auth.grade': 'المستوى الدراسي',
    'auth.login': 'تسجيل الدخول',
    'auth.register': 'إنشاء حساب',
    'auth.adminLogin': 'دخول المدير',
    'auth.userLogin': 'دخول المستخدم',
    'auth.createPassword': 'إنشاء كلمة مرور',
    'auth.phoneCountry': 'اختر الدولة',
    
    // Dashboard
    'dashboard.title': 'لوحة تحكم المدير',
    'dashboard.userManagement': 'إدارة المستخدمين',
    'dashboard.totalUsers': 'إجمالي المستخدمين',
    'dashboard.pendingApprovals': 'في انتظار الموافقة',
    'dashboard.approvedUsers': 'المستخدمون المعتمدون',
    
    // User Management
    'users.approve': 'موافقة',
    'users.reject': 'رفض',
    'users.delete': 'حذف',
    'users.pending': 'في الانتظار',
    'users.approved': 'معتمد',
    'users.rejected': 'مرفوض',
    
    // Waiting Screen
    'waiting.title': 'الحساب في انتظار الموافقة',
    'waiting.message': 'تم إنشاء حسابك بنجاح وهو حالياً في انتظار موافقة المدير.',
    'waiting.contact': 'للاستفسارات، يرجى التواصل مع عبد الله وهمام:',
    'waiting.checkBack': 'يرجى المراجعة لاحقاً أو التواصل مع الدعم للحصول على التحديثات.',
    'waiting.phone': '+218 926 845 740',
    
    // Home
    'home.title': 'ليبيا-كان للتعلم',
    'home.subtitle': 'أتقن الإنجليزية مع دروس مخصصة للطلاب الليبيين',
    'home.heroDesc': 'طور مهاراتك في الإنجليزية مع منصتنا التعليمية الشاملة المصممة خصيصاً لطلاب الصفين التاسع والثاني عشر الليبيين.',
    'home.getStarted': 'ابدأ التعلم اليوم',
    'home.learnMore': 'استكشف المميزات',
    'home.whyChoose': 'لماذا تختار ليبيا-كان للتعلم؟',
    'home.whyChooseDesc': 'اختبر تقنية تعليمية متطورة مصممة خصيصاً للطلاب الليبيين',
    'home.readyToTransform': 'مستعد لإتقان الإنجليزية؟',
    'home.readyDesc': 'انضم لمئات الطلاب الليبيين الذين يحسنون إنجليزيتهم بمنصتنا',
    'home.startJourney': 'ابدأ رحلتك اليوم',
    
    // Features
    'features.interactive': 'تعلم تفاعلي',
    'features.interactiveDesc': 'تفاعل مع محتوى ديناميكي مصمم للمنهج الليبي',
    'features.personalized': 'تجربة مخصصة',
    'features.personalizedDesc': 'دروس مصممة خصيصاً لطلاب الصفين التاسع والثاني عشر',
    'features.gamified': 'تقدم مع المتعة',
    'features.gamifiedDesc': 'تابع نقاطك وتنافس مع زملائك',
    'features.translation': 'ترجمة عربية',
    'features.translationDesc': 'تعلم مع دعم كامل باللغة العربية والشروحات',
    'features.grammar': 'إتقان القواعد',
    'features.grammarDesc': 'دروس قواعد شاملة مع تمارين للممارسة',
    'features.notebook': 'دفتر رقمي',
    'features.notebookDesc': 'تابع تقدمك وسجل ملاحظاتك',
    
    // Pricing
    'pricing.title': 'أسعار بسيطة وبأسعار معقولة',
    'pricing.monthly': 'الخطة الشهرية',
    'pricing.price': '20 دينار ليبي',
    'pricing.perMonth': '/شهرياً',
    'pricing.selectPlan': 'اختر هذه الخطة',
    'pricing.feature1': 'وصول كامل لمحتوى الصفين التاسع والثاني عشر',
    'pricing.feature2': 'دروس تفاعلية مع ترجمة عربية',
    'pricing.feature3': 'تمارين قواعد واختبارات تدريبية',
    'pricing.feature4': 'دفتر رقمي ومتابعة التقدم',
    'pricing.feature5': 'نظام نقاط تفاعلي',
    'pricing.feature6': 'دعم مباشر من عبد الله وهمام',
    
    // Testimonials
    'testimonials.title': 'ماذا يقول طلابنا',
    'testimonials.student1': 'ليبيا-كان ساعدني في تحسين درجاتي في الإنجليزية بشكل كبير!',
    'testimonials.student1Name': 'أحمد المنصوري، الصف الثاني عشر',
    'testimonials.student2': 'الشروحات العربية جعلت كل شيء أوضح بكثير.',
    'testimonials.student2Name': 'فاطمة حسن، الصف التاسع',
    'testimonials.student3': 'الدروس التفاعلية تجعل تعلم الإنجليزية ممتعاً حقاً!',
    'testimonials.student3Name': 'عمر خليل، الصف الحادي عشر',
    
    // Contact
    'contact.title': 'تواصل مع عبد الله وهمام',
    'contact.phone': '+218 926 845 740',
    'contact.email': 'abdullah@libya-can.ly',
    'contact.support': 'احصل على دعم شخصي من مؤسسينا',
    
    // Common
    'common.loading': 'جاري التحميل...',
    'common.save': 'حفظ',
    'common.cancel': 'إلغاء',
    'common.confirm': 'تأكيد',
    'common.error': 'خطأ',
    'common.success': 'نجح',
    'common.darkMode': 'الوضع المظلم',
    'common.lightMode': 'الوضع المضيء',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      <div className={language === 'ar' ? 'rtl' : 'ltr'}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}