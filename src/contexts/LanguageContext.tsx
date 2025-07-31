import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.login': 'Login',
    'nav.register': 'Register',
    'nav.dashboard': 'Dashboard',
    'nav.logout': 'Logout',
    
    // Auth
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.name': 'Full Name',
    'auth.phone': 'Phone Number',
    'auth.grade': 'Grade Level',
    'auth.login': 'Login',
    'auth.register': 'Create Account',
    'auth.adminLogin': 'Admin Login',
    'auth.userLogin': 'User Login',
    
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
    'waiting.contact': 'For inquiries, please contact:',
    'waiting.checkBack': 'Please check back later or contact support for updates.',
    
    // Home
    'home.title': 'Welcome to EduPlatform',
    'home.subtitle': 'Transform your learning experience with our innovative educational platform',
    'home.getStarted': 'Get Started',
    'home.learnMore': 'Learn More',
    
    // Pricing
    'pricing.title': 'Choose Your Plan',
    'pricing.basic': 'Basic',
    'pricing.premium': 'Premium',
    'pricing.enterprise': 'Enterprise',
    'pricing.perMonth': '/month',
    'pricing.selectPlan': 'Select Plan',
    
    // Common
    'common.loading': 'Loading...',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.confirm': 'Confirm',
    'common.error': 'Error',
    'common.success': 'Success',
  },
  ar: {
    // Navigation
    'nav.home': 'الرئيسية',
    'nav.login': 'تسجيل الدخول',
    'nav.register': 'إنشاء حساب',
    'nav.dashboard': 'لوحة التحكم',
    'nav.logout': 'تسجيل الخروج',
    
    // Auth
    'auth.email': 'البريد الإلكتروني',
    'auth.password': 'كلمة المرور',
    'auth.name': 'الاسم الكامل',
    'auth.phone': 'رقم الهاتف',
    'auth.grade': 'المستوى الدراسي',
    'auth.login': 'تسجيل الدخول',
    'auth.register': 'إنشاء حساب',
    'auth.adminLogin': 'دخول المدير',
    'auth.userLogin': 'دخول المستخدم',
    
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
    'waiting.contact': 'للاستفسارات، يرجى التواصل:',
    'waiting.checkBack': 'يرجى المراجعة لاحقاً أو التواصل مع الدعم للحصول على التحديثات.',
    
    // Home
    'home.title': 'مرحباً بكم في منصة التعليم',
    'home.subtitle': 'حوّل تجربتك التعليمية مع منصتنا التعليمية المبتكرة',
    'home.getStarted': 'ابدأ الآن',
    'home.learnMore': 'اعرف المزيد',
    
    // Pricing
    'pricing.title': 'اختر خطتك',
    'pricing.basic': 'أساسي',
    'pricing.premium': 'متميز',
    'pricing.enterprise': 'مؤسسي',
    'pricing.perMonth': '/شهرياً',
    'pricing.selectPlan': 'اختر الخطة',
    
    // Common
    'common.loading': 'جاري التحميل...',
    'common.save': 'حفظ',
    'common.cancel': 'إلغاء',
    'common.confirm': 'تأكيد',
    'common.error': 'خطأ',
    'common.success': 'نجح',
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