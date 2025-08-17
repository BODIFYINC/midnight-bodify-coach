import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Lock, BookOpen, Brain, Zap, Trophy, Star, Play, CheckCircle, HelpCircle } from 'lucide-react';
import { Navigate } from 'react-router-dom';
import Questions from '@/components/Questions';

interface Unit {
  id: number;
  title: string;
  description: string;
  icon: any;
  vocabulary: VocabularyItem[];
  grammar: GrammarPoint[];
  isCompleted: boolean;
  isUnlocked: boolean;
  progress: number;
}

interface VocabularyItem {
  english: string;
  arabic: string;
  context: string;
}

interface GrammarPoint {
  title: string;
  explanation: string;
  examples: string[];
}

const Dashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const { t } = useLanguage();
  const [selectedUnit, setSelectedUnit] = useState<Unit | null>(null);
  const [units, setUnits] = useState<Unit[]>([]);

  useEffect(() => {
    // Initialize units data
    const unitsData: Unit[] = [
      {
        id: 1,
        title: "Health Matters",
        description: "Learn vocabulary and grammar related to health, medical situations, and body parts.",
        icon: BookOpen,
        isCompleted: false,
        isUnlocked: true,
        progress: 0,
        vocabulary: [
          { english: "open (one's mouth)", arabic: "فتح فمه", context: "She told me to open my mouth and say 'Aah'" },
          { english: "throat", arabic: "حلق", context: "The doctor looked at my throat" },
          { english: "temperature (fever)", arabic: "حرارة الجسم", context: "I think I have a temperature." },
          { english: "burn (burnt)", arabic: "يحرق (محروق)", context: "It's very badly burnt." },
          { english: "X-ray", arabic: "صورة أشعة إكس", context: "Your wrist is fractured." },
          { english: "fracture", arabic: "كسر", context: "Your wrist is fractured." },
          { english: "wrist", arabic: "معصم", context: "I've hurt my wrist." },
          { english: "diabetes", arabic: "سكر", context: "Latifa suffers from diabetes." },
          { english: "insulin", arabic: "الأنسولين", context: "Control blood sugar with injections of insulin." },
          { english: "emergency services", arabic: "خدمات الطوارئ", context: "He called the emergency services." }
        ],
        grammar: [
          {
            title: "Past Simple vs. Past Continuous",
            explanation: "English distinguishes actions finished in the past (e.g. 'I fell') and actions in progress ('I was falling'). Past continuous uses was/were + verb-ing.",
            examples: ["I fell (past simple) vs. I was falling (past continuous)", "I was sleeping when the phone rang."]
          },
          {
            title: "Used to (Past Habits)",
            explanation: "Used to + verb expresses habits in the past no longer true. In negatives/questions, use didn't use to or did you use to.",
            examples: ["People used to be bigger.", "I didn't use to like vegetables.", "Did you use to play football?"]
          },
          {
            title: "Countable vs. Uncountable Nouns",
            explanation: "English requires much/many, a few/a little to quantify. Use many with count nouns (people) and much with mass nouns (water).",
            examples: ["many people, much water", "a few friends, a little time", "I have a lot of water (not much water)"]
          }
        ]
      },
      {
        id: 2,
        title: "Safety and Security",
        description: "Explore vocabulary about safety, security measures, and emergency situations.",
        icon: Brain,
        isCompleted: false,
        isUnlocked: false,
        progress: 0,
        vocabulary: [
          { english: "radar speed gun", arabic: "جهاز كشف السرعة", context: "The police officers had a radar gun." },
          { english: "speeding", arabic: "السرعة الزائدة", context: "I got a speeding ticket." },
          { english: "speed limit", arabic: "حد السرعة", context: "The speed limit was 110." },
          { english: "crash", arabic: "حادث اصطدام", context: "A five-car crash." },
          { english: "fingerprints", arabic: "بصمات الأصابع", context: "Sometimes we find fingerprints." },
          { english: "footprint", arabic: "أثر قدم", context: "Footprints can tell you the type of shoes..." },
          { english: "thief", arabic: "لص / حرامي", context: "The shoes a thief was wearing" },
          { english: "baggage", arabic: "أمتعة", context: "Have your baggage with you." },
          { english: "conveyor belt", arabic: "حزام ناقل للأمتعة", context: "Put your bag on the conveyor belt." },
          { english: "ambulance", arabic: "سيارة إسعاف", context: "Called an ambulance for help." }
        ],
        grammar: [
          {
            title: "Must / Have to (Necessity)",
            explanation: "Express obligation or necessity. Both translate to 'يجب' in Arabic, but 'must' is stronger. 'Mustn't' means prohibition.",
            examples: ["You must wear a seat belt.", "You have to wear one.", "You mustn't smoke here."]
          },
          {
            title: "Should / Shouldn't (Advice)",
            explanation: "Used for advice or expectation. Should is milder than must.",
            examples: ["You should enjoy the job.", "You shouldn't worry about it.", "You should study more."]
          },
          {
            title: "Polite Requests",
            explanation: "Phrases like 'Would you...?', 'Could you...?', 'May I...?' form polite requests.",
            examples: ["Would you open your suitcase, please?", "Could you help me?", "May I see your passport?"]
          }
        ]
      },
      {
        id: 3,
        title: "Careers and Industries",
        description: "Learn about different career paths, job requirements, and professional vocabulary.",
        icon: Zap,
        isCompleted: false,
        isUnlocked: false,
        progress: 0,
        vocabulary: [
          { english: "architecture", arabic: "هندسة معمارية", context: "Career field in construction design" },
          { english: "aviation", arabic: "طيران", context: "Career field in flying" },
          { english: "engineering", arabic: "هندسة", context: "Technical career field" },
          { english: "environment / ecology", arabic: "البيئة", context: "Interested in ecology and the environment." },
          { english: "qualifications", arabic: "مؤهلات / شهادات", context: "What kind of qualifications do I need?" },
          { english: "degree", arabic: "درجة جامعية", context: "You need to get a degree." },
          { english: "university", arabic: "جامعة", context: "Which university offers those courses?" },
          { english: "pilot", arabic: "طيار", context: "I'd like to be a pilot." },
          { english: "medical student", arabic: "طالب طب", context: "Medical students don't have any free time!" },
          { english: "organ transplant", arabic: "زرع عضو", context: "Famous for organ transplants." }
        ],
        grammar: [
          {
            title: "Zero Conditional (General Truths)",
            explanation: "Form: If + present simple, ... present simple. Indicates always true facts.",
            examples: ["If it rains, the flowers blossom.", "If you heat water to 100°C, it boils."]
          },
          {
            title: "First Conditional (Possible Future)",
            explanation: "Form: If + present simple, ... will + verb. Expresses a likely future result.",
            examples: ["If we leave now, we will arrive on time.", "If you study hard, you will pass the exam."]
          },
          {
            title: "Second Conditional (Unreal Present/Future)",
            explanation: "Form: If + past simple, ... would + infinitive. Used for hypothetical situations.",
            examples: ["If I were you, I'd train as a doctor.", "If I had more money, I would travel."]
          }
        ]
      },
      {
        id: 4,
        title: "Fun with English 1",
        description: "Explore wordplay, jokes, riddles, and entertaining aspects of English language.",
        icon: Trophy,
        isCompleted: false,
        isUnlocked: false,
        progress: 0,
        vocabulary: [
          { english: "riddle", arabic: "لغز", context: "A short puzzle or trick question" },
          { english: "pun", arabic: "تلاعب بالألفاظ", context: "A joke based on words that sound alike" },
          { english: "joke", arabic: "نكتة", context: "Something said to make people laugh" },
          { english: "tongue twister", arabic: "جملة صعبة النطق", context: "Sentence with similar sounds, hard to say fast" },
          { english: "laugh", arabic: "يضحك", context: "Reaction to something funny" },
          { english: "meaning", arabic: "معنى", context: "What a word or sentence expresses" },
          { english: "sound alike", arabic: "متشابهة في الصوت", context: "Words that have similar pronunciation" },
          { english: "misunderstanding", arabic: "سوء فهم", context: "Not understanding something correctly" }
        ],
        grammar: [
          {
            title: "Present Simple for Jokes and Riddles",
            explanation: "Used to express general or timeless actions in jokes and riddles.",
            examples: ["Why does a chicken cross the road?", "What do you call a sleeping bull? A bulldozer!"]
          },
          {
            title: "Wordplay (Pun) Structure",
            explanation: "English uses homophones for fun. Encourage recognition of double meanings.",
            examples: ["Knight/night", "Right/write", "Time flies like an arrow; fruit flies like a banana."]
          }
        ]
      },
      {
        id: 5,
        title: "Holidays",
        description: "Learn vocabulary and expressions related to travel, holidays, and vacation planning.",
        icon: Star,
        isCompleted: false,
        isUnlocked: false,
        progress: 0,
        vocabulary: [
          { english: "destination", arabic: "وجهة", context: "The place you're traveling to" },
          { english: "accommodation", arabic: "مكان الإقامة", context: "Hotel or place where you stay" },
          { english: "itinerary", arabic: "برنامج الرحلة", context: "Travel schedule or plan" },
          { english: "resort", arabic: "منتجع", context: "A holiday location, often luxurious" },
          { english: "package holiday", arabic: "عطلة شاملة", context: "Holiday with everything included" },
          { english: "brochure", arabic: "كتيب إعلاني", context: "A leaflet describing places/trips" },
          { english: "guidebook", arabic: "دليل سياحي", context: "Book with tourist information" },
          { english: "monument", arabic: "نصب تذكاري", context: "Famous historic structure" },
          { english: "sightseeing", arabic: "مشاهدة المعالم", context: "Visiting famous places while traveling" }
        ],
        grammar: [
          {
            title: "Past Simple & Past Continuous Review",
            explanation: "Use Past Simple for completed actions, Past Continuous for background actions.",
            examples: ["We went to Paris.", "We were walking when it rained.", "I was reading when the phone rang."]
          },
          {
            title: "Descriptive Writing Using Sequence Words",
            explanation: "First, then, next, after that, finally - for organizing travel stories.",
            examples: ["First, we checked in. Then, we went to our room. Finally, we had dinner."]
          },
          {
            title: "Prepositions of Time and Place",
            explanation: "At (time) / On (date) / In (month, year)",
            examples: ["At 3 o'clock", "On Monday", "In July", "In 2023"]
          }
        ]
      },
      {
        id: 6,
        title: "Money Matters",
        description: "Understand financial vocabulary, banking terms, and money management concepts.",
        icon: BookOpen,
        isCompleted: false,
        isUnlocked: false,
        progress: 0,
        vocabulary: [
          { english: "currency", arabic: "عملة", context: "Type of money in a country" },
          { english: "exchange rate", arabic: "سعر الصرف", context: "Value of one currency in another" },
          { english: "savings", arabic: "مدخرات", context: "Money you keep and don't spend" },
          { english: "budget", arabic: "ميزانية", context: "Money plan for spending/saving" },
          { english: "withdraw", arabic: "يسحب المال", context: "To take money from a bank" },
          { english: "deposit", arabic: "يودع", context: "Put money in a bank account" },
          { english: "credit card", arabic: "بطاقة ائتمان", context: "Plastic card used for paying" },
          { english: "cash", arabic: "نقداً", context: "Physical money (coins/notes)" },
          { english: "bank account", arabic: "حساب بنكي", context: "Place to store your money" }
        ],
        grammar: [
          {
            title: "Present Perfect Tense",
            explanation: "Form: have/has + past participle. Use for life experience, recent actions, unfinished time.",
            examples: ["I have saved a lot of money.", "She has bought a car.", "We have lived here for 2 years."]
          },
          {
            title: "How long...? / For / Since",
            explanation: "For duration, since point in time.",
            examples: ["I have lived here for 2 years.", "I have lived here since 2022.", "How long have you worked there?"]
          }
        ]
      },
      {
        id: 7,
        title: "Further Education",
        description: "Explore higher education options, university life, and academic requirements.",
        icon: Brain,
        isCompleted: false,
        isUnlocked: false,
        progress: 0,
        vocabulary: [
          { english: "scholarship", arabic: "منحة دراسية", context: "Money support for study" },
          { english: "undergraduate", arabic: "طالب جامعي", context: "Student before graduation" },
          { english: "postgraduate", arabic: "طالب دراسات عليا", context: "After first degree (Master's/PhD)" },
          { english: "tuition fees", arabic: "رسوم دراسية", context: "Money paid for university classes" },
          { english: "application", arabic: "طلب تقديم", context: "Official request for a place" },
          { english: "qualifications", arabic: "مؤهلات", context: "Skills and certificates" },
          { english: "internship", arabic: "تدريب عملي", context: "Work experience during/after studies" },
          { english: "graduate", arabic: "يتخرج / خريج", context: "Person finishing university" },
          { english: "lecture", arabic: "محاضرة", context: "Teacher talking to a class" }
        ],
        grammar: [
          {
            title: "Modal Verbs for Advice & Necessity",
            explanation: "Should, must, need to for giving advice and expressing necessity.",
            examples: ["You should study hard.", "You must attend lectures.", "You need to apply early."]
          },
          {
            title: "Relative Clauses",
            explanation: "Who, which, that → adds info about people/things.",
            examples: ["A student who studies hard will succeed.", "The book which I bought is excellent."]
          }
        ]
      },
      {
        id: 8,
        title: "Fun with English 2",
        description: "Advanced wordplay, idioms, proverbs, and figurative language in English.",
        icon: Zap,
        isCompleted: false,
        isUnlocked: false,
        progress: 0,
        vocabulary: [
          { english: "proverb", arabic: "مثل / حكمة", context: "Traditional wise saying" },
          { english: "idiom", arabic: "تعبير اصطلاحي", context: "Group of words with a special meaning" },
          { english: "expression", arabic: "تعبير", context: "Word(s) used to show an idea" },
          { english: "sarcasm", arabic: "سخرية", context: "Saying the opposite of what you mean" },
          { english: "irony", arabic: "المفارقة", context: "When the opposite of what's expected happens" },
          { english: "literal meaning", arabic: "المعنى الحرفي", context: "Word-for-word meaning" },
          { english: "figurative", arabic: "مجازي", context: "Not literal; symbolic meaning" },
          { english: "misunderstanding", arabic: "سوء فهم", context: "Not understanding correctly" }
        ],
        grammar: [
          {
            title: "Figurative vs. Literal Language",
            explanation: "Idioms and proverbs don't mean what they say literally.",
            examples: ["It's raining cats and dogs.", "Break a leg!", "Time flies when you're having fun."]
          },
          {
            title: "Reported Speech Practice",
            explanation: "Shift tense when reporting in past: Present → Past, Will → Would.",
            examples: ["'I like it.' → He said he liked it.", "'I will go.' → He said he would go."]
          }
        ]
      }
    ];
    
    setUnits(unitsData);
  }, []);

  const handleCompleteUnit = (unitId: number) => {
    setUnits(prev => prev.map(unit => {
      if (unit.id === unitId) {
        const nextUnit = prev.find(u => u.id === unitId + 1);
        if (nextUnit) {
          nextUnit.isUnlocked = true;
        }
        return { ...unit, isCompleted: true, progress: 100 };
      }
      return unit;
    }));
  };

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!user) {
    return <Navigate to="/waiting" replace />;
  }

  // Only show dashboard for approved users
  if (user.status !== 'approved') {
    return <Navigate to="/waiting" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background animate-fade-in">
      <div className="container mx-auto px-4 py-8">
        {/* Enhanced Welcome Header */}
        <div className="mb-12 text-center lg:text-left">
          <div className="flex flex-col lg:flex-row items-center justify-between mb-8 gap-6">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-float">
                Welcome back, {user.name}!
              </h1>
              <p className="text-xl text-muted-foreground">Grade {user.grade} English Learning Dashboard</p>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="text-lg px-6 py-3 rounded-xl clay-card hover-glow">
                Grade {user.grade}
              </Badge>
              <div className="clay-card px-4 py-2">
                <span className="text-primary font-semibold">Progress: {Math.round(units.filter(u => u.isCompleted).length / units.length * 100)}%</span>
              </div>
            </div>
          </div>
          
          {/* Progress Overview */}
          <Card className="gradient-card border-0 shadow-subtle">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="w-6 h-6 text-primary" />
                Learning Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span>Overall Progress</span>
                  <span>{Math.round((units.filter(u => u.isCompleted).length / units.length) * 100)}%</span>
                </div>
                <Progress value={(units.filter(u => u.isCompleted).length / units.length) * 100} className="h-3" />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>{units.filter(u => u.isCompleted).length} of {units.length} units completed</span>
                  <span>{units.filter(u => u.isUnlocked && !u.isCompleted).length} units available</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Units Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {units.map((unit) => (
            <Card 
              key={unit.id} 
              className={`cursor-pointer transition-all duration-300 border-0 shadow-subtle hover-lift ${
                unit.isUnlocked 
                  ? 'gradient-card' 
                  : 'bg-muted/50 opacity-60 cursor-not-allowed'
              } ${selectedUnit?.id === unit.id ? 'ring-2 ring-primary' : ''}`}
              onClick={() => unit.isUnlocked && setSelectedUnit(unit)}
            >
              <CardHeader className="text-center pb-4">
                <div className={`w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-4 ${
                  unit.isCompleted 
                    ? 'bg-gradient-to-r from-green-500 to-emerald-500' 
                    : unit.isUnlocked 
                      ? 'bg-gradient-to-r from-primary to-secondary' 
                      : 'bg-muted'
                }`}>
                  {unit.isCompleted ? (
                    <CheckCircle className="w-8 h-8 text-white" />
                  ) : unit.isUnlocked ? (
                    <unit.icon className="w-8 h-8 text-white" />
                  ) : (
                    <Lock className="w-8 h-8 text-muted-foreground" />
                  )}
                </div>
                <CardTitle className="text-lg">Unit {unit.id}</CardTitle>
                <CardDescription className="font-semibold">{unit.title}</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {unit.description}
                </p>
                {unit.isUnlocked && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span>Progress</span>
                      <span>{unit.progress}%</span>
                    </div>
                    <Progress value={unit.progress} className="h-2" />
                  </div>
                )}
                {!unit.isUnlocked && (
                  <Badge variant="outline" className="w-full justify-center">
                    Locked
                  </Badge>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Unit Details */}
        {selectedUnit && (
          <Card className="gradient-card border-0 shadow-elegant">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    selectedUnit.isCompleted 
                      ? 'bg-gradient-to-r from-green-500 to-emerald-500' 
                      : 'bg-gradient-to-r from-primary to-secondary'
                  }`}>
                    {selectedUnit.isCompleted ? (
                      <CheckCircle className="w-6 h-6 text-white" />
                    ) : (
                      <selectedUnit.icon className="w-6 h-6 text-white" />
                    )}
                  </div>
                  <div>
                    <CardTitle className="text-2xl">Unit {selectedUnit.id}: {selectedUnit.title}</CardTitle>
                    <CardDescription className="text-base">{selectedUnit.description}</CardDescription>
                  </div>
                </div>
                {!selectedUnit.isCompleted && (
                  <Button 
                    onClick={() => handleCompleteUnit(selectedUnit.id)}
                    className="gradient-primary text-white hover-lift"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Start Learning
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="vocabulary" className="w-full">
                <TabsList className={`grid w-full ${Number(user?.grade) === 12 ? 'grid-cols-3' : 'grid-cols-2'} mb-6`}>
                  <TabsTrigger value="vocabulary" className="text-base">
                    📚 Vocabulary
                  </TabsTrigger>
                  <TabsTrigger value="grammar" className="text-base">
                    📝 Grammar
                  </TabsTrigger>
                  {Number(user?.grade) === 12 && (
                    <TabsTrigger value="questions" className="text-base">
                      <HelpCircle className="w-4 h-4 mr-1" />
                      Questions
                    </TabsTrigger>
                  )}
                </TabsList>
                
                <TabsContent value="vocabulary" className="space-y-4">
                  <h3 className="text-xl font-semibold mb-4">Key Vocabulary</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedUnit.vocabulary.map((item, index) => (
                      <Card key={index} className="border shadow-subtle hover-lift transition-all duration-200">
                        <CardContent className="p-4">
                          <div className="space-y-2">
                            <div className="flex justify-between items-start">
                              <h4 className="font-semibold text-primary">{item.english}</h4>
                              <Badge variant="outline" className="text-xs">{item.arabic}</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground italic">
                              "{item.context}"
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="grammar" className="space-y-6">
                  <h3 className="text-xl font-semibold mb-4">Grammar Points</h3>
                  {selectedUnit.grammar.map((point, index) => (
                    <Card key={index} className="border shadow-subtle">
                      <CardContent className="p-6">
                        <h4 className="text-lg font-semibold text-primary mb-3">{point.title}</h4>
                        <p className="text-muted-foreground mb-4 leading-relaxed">{point.explanation}</p>
                        <div className="space-y-2">
                          <h5 className="font-medium">Examples:</h5>
                          <ul className="space-y-1">
                            {point.examples.map((example, exIndex) => (
                              <li key={exIndex} className="text-sm bg-muted/50 p-3 rounded-lg">
                                {example}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>
                
                {Number(user?.grade) === 12 && (
                  <TabsContent value="questions" className="space-y-4">
                    <Questions unitId={selectedUnit.id} />
                  </TabsContent>
                )}
              </Tabs>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Dashboard;