import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, XCircle, Trophy, RotateCcw, BookOpen, Play } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
}

interface QuestionsProps {
  unitId: number;
}

const questionsData: Record<number, Question[]> = {
  1: [
    {
      id: 2,
      question: "Activities like running, Jumping & swimming.",
      options: ["lunch", "homework", "arts", "sports"],
      correct: 3
    },
    {
      id: 3,
      question: "Is Friday ……………… for you?",
      options: ["batter", "butter", "better", "bitter"],
      correct: 2
    },
    {
      id: 4,
      question: "I watched a good film ………………",
      options: ["Last week", "next year", "now", "every day"],
      correct: 0
    },
    {
      id: 5,
      question: "Titanic film started from the port of …..",
      options: ["Southampton", "Toronto", "London", "Liverpool"],
      correct: 0
    },
    {
      id: 6,
      question: "One word is incorrect (not correct): \"Have ……………\"",
      options: ["a picnic", "a rest", "breakfast", "shopping"],
      correct: 3
    },
    {
      id: 7,
      question: "How about ………… to the park.",
      options: ["to go", "going", "go", "goes"],
      correct: 1
    },
    {
      id: 8,
      question: "My brother ………… in the hotel pool.",
      options: ["drops", "spills", "falls", "trips"],
      correct: 2
    },
    {
      id: 9,
      question: "Mr Bean is a ………….. book.",
      options: ["horror", "fiction", "adventure", "comedy"],
      correct: 3
    },
    {
      id: 10,
      question: "How did you get the part? I ………… it after a film test.",
      options: ["did", "do", "got", "get"],
      correct: 2
    },
    {
      id: 11,
      question: "………… A hobby.",
      options: ["Go", "Kick", "Do", "Have"],
      correct: 3
    },
    {
      id: 12,
      question: "What kind of TV program is it?",
      options: ["I saw a poster of school", "I play the part of Samara", "I'm 16", "It's a comedy"],
      correct: 3
    },
    {
      id: 13,
      question: "She likes …………",
      options: ["swimming", "swam", "swims", "swim"],
      correct: 0
    },
    {
      id: 14,
      question: "………… she surprised?",
      options: ["Are", "Was", "Does", "Did"],
      correct: 1
    },
    {
      id: 15,
      question: "Why not ………… to the fun fair?",
      options: ["gone", "going", "to go", "go"],
      correct: 3
    },
    {
      id: 16,
      question: "What's the ending like? Means ………….",
      options: ["Where does it take place?", "What's the title", "How does it end", "What's it about"],
      correct: 2
    },
    {
      id: 17,
      question: "………… you free tomorrow?",
      options: ["Are", "Were", "Do", "Will"],
      correct: 0
    },
    {
      id: 18,
      question: "I use colourful threads to make something to keep you warm.",
      options: ["jewellery making", "blanket weaving", "watching TV", "fishing"],
      correct: 1
    },
    {
      id: 19,
      question: "We don't ………… to get tickets in advance.",
      options: ["need", "cost", "prefer", "start"],
      correct: 0
    },
    {
      id: 20,
      question: "There are ………… so you can't see into the car easily.",
      options: ["airbags", "sunroof", "electric windows", "tinted windows"],
      correct: 3
    },
    {
      id: 21,
      question: "I'd love ………… to the mall.",
      options: ["to go", "going", "goes", "go"],
      correct: 0
    },
    {
      id: 22,
      question: "If you live near the sea, you may enjoy …………",
      options: ["cooking", "dancing", "talking", "fishing"],
      correct: 3
    }
  ],
  2: [
    {
      id: 18,
      question: "It's important to always ………… what you …………",
      options: ["finish – start", "finished – started", "finish – started", "have – finished"],
      correct: 0
    },
    {
      id: 19,
      question: "A mountain bike is a ………… ride.",
      options: ["helpful", "harmful", "comfortable", "dangerous"],
      correct: 2
    },
    {
      id: 20,
      question: "Eating too many sweets is not ………… for your teeth.",
      options: ["bad", "hard", "nice", "good"],
      correct: 0
    },
    {
      id: 21,
      question: "It's three o'clock.",
      options: ["18:00", "15:00", "12:00", "13:00"],
      correct: 1
    },
    {
      id: 22,
      question: "Ants are one of the most ………… creatures in the world.",
      options: ["happy", "lazy", "imaginative", "hard-working"],
      correct: 3
    },
    {
      id: 23,
      question: "The opposite of old is …………",
      options: ["few", "knew", "new", "queue"],
      correct: 2
    },
    {
      id: 24,
      question: "It ………… a swimming pool.",
      options: ["don't have", "doesn't", "doesn't have", "don't has"],
      correct: 2
    },
    {
      id: 25,
      question: "It ………… a car park [negative sentence].",
      options: ["don't have", "doesn't have", "doesn't have", "doesn't has"],
      correct: 1
    },
    {
      id: 26,
      question: "There are lots ………… clothes shops.",
      options: ["at", "of", "in", "off"],
      correct: 1
    },
    {
      id: 27,
      question: "There ………… shops that sell chocolates.",
      options: ["are", "am", "be", "is"],
      correct: 0
    },
    {
      id: 28,
      question: "Are there ………… sweet shops?",
      options: ["some", "no", "any", "un"],
      correct: 2
    },
    {
      id: 29,
      question: "………… there a sweet shop?",
      options: ["Do", "has", "Are", "Is"],
      correct: 3
    },
    {
      id: 30,
      question: "The panther is a really ………… are.",
      options: ["fast", "happy", "hard-working", "slow"],
      correct: 0
    },
    {
      id: 31,
      question: "The panther is ………… fast.",
      options: ["quite", "quiet", "really", "quit"],
      correct: 2
    },
    {
      id: 32,
      question: "gaze means …………",
      options: ["To look for a long time.", "To look out for a long time.", "To look in a long time.", "To look at for a long time."],
      correct: 3
    },
    {
      id: 33,
      question: "Warranty means: …………",
      options: ["The cover of the cost of repairing anything isn't guaranteed.", "You can't guarantee anyone covers the cost of repair.", "A guarantee to cover the cost of repair.", "No guarantee to cover the cost of repair."],
      correct: 2
    },
    {
      id: 34,
      question: "Cars have airbags …………",
      options: ["so you can be safe in a crash.", "so you can't be safe in a crash.", "so you can be a good driver.", "so you can't be lost."],
      correct: 0
    },
    {
      id: 35,
      question: "It ………… GPS, so you can't get lost.",
      options: ["don't have", "have", "doesn't have", "has"],
      correct: 2
    }
  ],
  3: [
    {
      id: 24,
      question: "He lives in a very old house & has got a very old car. He is a …………..",
      options: ["a doctor", "rich", "poor", "businessman"],
      correct: 2
    },
    {
      id: 25,
      question: "If we didn't have any spiders, we ………….. more mosquitoes.",
      options: ["got", "would get", "get", "will get"],
      correct: 1
    },
    {
      id: 26,
      question: "A bear is not a bird, but it can ………….. like a bird.",
      options: ["try", "fly", "cry", "see"],
      correct: 1
    },
    {
      id: 27,
      question: "Tablets are ………… than phones.",
      options: ["more expensive", "expensive", "the most expensive", "expensiver"],
      correct: 0
    },
    {
      id: 28,
      question: "Single consonants after single vowels are ………….. when an ending is added.",
      options: ["deleted", "canceled", "removed", "doubled"],
      correct: 3
    },
    {
      id: 29,
      question: "The Bedouins ………….. watch falcons catching birds & food.",
      options: ["used", "use to", "uses", "used to"],
      correct: 3
    },
    {
      id: 30,
      question: "If I broke my leg, I ………….. in a lot of pain.",
      options: ["will be", "would been", "would be", "would be"],
      correct: 2
    },
    {
      id: 31,
      question: "me / him / them / us / are",
      options: ["object pronoun", "possessive adjective", "subject pronouns", "possessive pronoun"],
      correct: 0
    },
    {
      id: 32,
      question: "The dawn is ………….. than the night.",
      options: ["beautifuler", "beautiful", "The most beautiful", "more beautiful"],
      correct: 3
    },
    {
      id: 33,
      question: "The adjectives clever & gentle can be used with …………..",
      options: ["more", "many", "more & -er", "-er"],
      correct: 2
    },
    {
      id: 34,
      question: "Bats can be seen at …………..",
      options: ["evening", "morning", "night", "afternoon"],
      correct: 2
    },
    {
      id: 35,
      question: "She has ten falcons, four cars & two houses. She is …………..",
      options: ["sad", "happy", "expensive", "rich"],
      correct: 3
    },
    {
      id: 36,
      question: "What would you do if you …………..?",
      options: ["were bite by animal", "was bitten by an animal", "were bitten by an animal", "bite by an animal"],
      correct: 2
    },
    {
      id: 37,
      question: "(She) was playing in the park.",
      options: ["subject pronoun", "possessive", "an object pronoun"],
      correct: 0
    },
    {
      id: 38,
      question: "A new species …………..",
      options: ["were discovered", "are discovered", "has been discovered", "have been discovered"],
      correct: 2
    },
    {
      id: 39,
      question: "………….. are wild animals.",
      options: ["Storks & ducks", "Camels & cows", "Spiders & flies", "Tigers & jackals"],
      correct: 3
    },
    {
      id: 40,
      question: "The introduction explain the …………..",
      options: ["situation, points", "answers, scores", "Points, scores", "title, questions"],
      correct: 3
    },
    {
      id: 41,
      question: "Use ………….. when you want to say who did the action.",
      options: ["of", "by", "with", "at"],
      correct: 1
    },
    {
      id: 42,
      question: "He lives in a very old house & has got a very old car. He is a …………..",
      options: ["businessman", "poor", "rich", "doctor"],
      correct: 1
    }
  ],
  4: [
    {
      id: 8,
      question: "I enjoyed my holiday in London.",
      options: ["this person lives in London", "this person has left London", "this person is talking about a hobby", "this person is still in London"],
      correct: 1
    },
    {
      id: 9,
      question: "People who live in ……….. usually travel by bus.",
      options: ["Africa", "India", "Holland", "North America"],
      correct: 0
    },
    {
      id: 10,
      question: "If you come from England, your nationality is …………..",
      options: ["French", "English", "American", "Canadian"],
      correct: 1
    },
    {
      id: 11,
      question: "When I speak ……….., my teacher says \"speak up!\"",
      options: ["loudly", "quiet", "quietly", "loud"],
      correct: 2
    },
    {
      id: 12,
      question: "British school & government offices are closed on …………..",
      options: ["Fridays", "Mondays", "Tuesdays", "Sundays"],
      correct: 3
    },
    {
      id: 13,
      question: "My brother ……….. in Egypt two years ago.",
      options: ["was", "is", "been", "be"],
      correct: 0
    },
    {
      id: 14,
      question: "Sudan is the ……….. largest country in Africa.",
      options: ["third", "First", "Second", "Fourth"],
      correct: 0
    },
    {
      id: 15,
      question: "I ……….. in this school for three years.",
      options: ["be", "have been", "been", "has been"],
      correct: 1
    },
    {
      id: 16,
      question: "Adverbs of time tell us ……….. something happens.",
      options: ["Who", "When", "How", "Where"],
      correct: 1
    },
    {
      id: 17,
      question: "If you drive ……….., you might have an accident.",
      options: ["dangerously", "happily", "carefully", "quietly"],
      correct: 0
    },
    {
      id: 18,
      question: "The cake is a little dry. I'm sorry.",
      options: ["I'll say it again", "Pardon?", "That's OK I forgot", "Don't mention it"],
      correct: 3
    },
    {
      id: 19,
      question: "Africa, Asia & Europe are all …………..",
      options: ["countries", "lake", "cities", "continents"],
      correct: 3
    },
    {
      id: 20,
      question: "Adverbials are …………..",
      options: ["verbs", "phrases", "nouns", "sentences"],
      correct: 1
    },
    {
      id: 21,
      question: "My brother ……….. (be) in Egypt for two years.",
      options: ["was", "has been", "had been", "is"],
      correct: 1
    },
    {
      id: 22,
      question: "On the telephone, you should usually speak …………..",
      options: ["angrily", "in a bad way", "in a friendly way", "nervously"],
      correct: 2
    }
  ],
  5: [
    {
      id: 33,
      question: "The adjectives clever & gentle can be used with …………..",
      options: ["more", "many", "more & -er", "-er"],
      correct: 2
    },
    {
      id: 34,
      question: "Bats can be seen at …………..",
      options: ["evening", "morning", "night", "afternoon"],
      correct: 2
    },
    {
      id: 35,
      question: "She has ten falcons, four cars & two houses. She is …………..",
      options: ["sad", "happy", "expensive", "rich"],
      correct: 3
    },
    {
      id: 36,
      question: "What would you do if you …………..?",
      options: ["were bite by animal", "was bitten by an animal", "were bitten by an animal", "bite by an animal"],
      correct: 2
    },
    {
      id: 37,
      question: "(She) was playing in the park.",
      options: ["subject pronoun", "possessive", "an object pronoun"],
      correct: 0
    },
    {
      id: 38,
      question: "A new species …………..",
      options: ["were discovered", "are discovered", "has been discovered", "have been discovered"],
      correct: 2
    },
    {
      id: 39,
      question: "………….. are wild animals.",
      options: ["Storks & ducks", "Camels & cows", "Spiders & flies", "Tigers & jackals"],
      correct: 3
    },
    {
      id: 40,
      question: "The introduction explain the …………..",
      options: ["situation, points", "answers, scores", "Points, scores", "title, questions"],
      correct: 3
    },
    {
      id: 41,
      question: "Use ………….. when you want to say who did the action.",
      options: ["of", "by", "with", "at"],
      correct: 1
    },
    {
      id: 42,
      question: "He lives in a very old house & has got a very old car. He is a …………..",
      options: ["businessman", "poor", "rich", "doctor"],
      correct: 1
    }
  ],
  6: [
    {
      id: 1,
      question: "We can add ……….. after who, which, or that.",
      options: ["pictures", "information", "photos", "painting"],
      correct: 1
    },
    {
      id: 2,
      question: "……….. is on your left.",
      options: ["a school", "school", "the school", "nothing from the above"],
      correct: 2
    },
    {
      id: 3,
      question: "My house is ……….. the park.",
      options: ["past", "long", "straight on", "next to"],
      correct: 3
    },
    {
      id: 4,
      question: "I liked ……….. meat that we had for dinner last night.",
      options: ["the", "a", "don't use an", "all of the answers are wrong"],
      correct: 0
    },
    {
      id: 5,
      question: "……….. customers.",
      options: ["Run", "Help", "Take", "Put out"],
      correct: 1
    },
    {
      id: 6,
      question: "I have to be home at 10 O'clock or my father ……….. be angry.",
      options: ["will", "will", "going to", "will be"],
      correct: 0
    },
    {
      id: 7,
      question: "Can you tell me how to get to …………..",
      options: ["giving directions", "talking about football scores", "asking for directions", "giving reasons"],
      correct: 2
    }
  ],
  7: [
    {
      id: 65,
      question: "If you study hard, you ……….. the exam.",
      options: ["are passing", "passes", "pass", "will pass"],
      correct: 3
    },
    {
      id: 66,
      question: "Ali doesn't mind insects …………..",
      options: ["Neither does Ali", "so does Ali", "Nor do Ali", "So do I"],
      correct: 0
    },
    {
      id: 67,
      question: "I hate spiders …………..",
      options: ["shall do I", "will do I", "could do I", "So do I"],
      correct: 3
    },
    {
      id: 68,
      question: "My mum ……….. very angry if I was late.",
      options: ["is", "would be", "will be", "would"],
      correct: 1
    },
    {
      id: 69,
      question: "Falconry is a ……….. of hunting.",
      options: ["place", "sport", "city", "town"],
      correct: 1
    },
    {
      id: 70,
      question: "Some falcons can dive at …………..",
      options: ["350", "200", "150", "240"],
      correct: 1
    },
    {
      id: 71,
      question: "Birds ……….. fly.",
      options: ["couldn't", "might not", "can", "can't"],
      correct: 2
    },
    {
      id: 72,
      question: "A bat is not a bird, but it can ……….. like a bird.",
      options: ["flys", "not fly", "flying", "fly"],
      correct: 3
    },
    {
      id: 73,
      question: "Cows & goats ……….. milk.",
      options: ["produce", "was produced", "producing", "produces"],
      correct: 0
    },
    {
      id: 74,
      question: "Crocodiles aren't as ……….. as birds.",
      options: ["smallest", "big", "smaller", "small"],
      correct: 3
    },
    {
      id: 75,
      question: "A number of rodents ……….. in Libya.",
      options: ["can be find", "can be found", "found", "could be find"],
      correct: 1
    },
    {
      id: 76,
      question: "You ……….. find foxes in the desert of Libya.",
      options: ["won't", "can't", "can", "never"],
      correct: 2
    },
    {
      id: 77,
      question: "There are ……….. famous protected nature reserves in Libya.",
      options: ["four", "three", "seven", "two"],
      correct: 3
    },
    {
      id: 78,
      question: "Several species of birds can be ……….. near the coast.",
      options: ["see", "seen", "seeing", "saw"],
      correct: 1
    },
    {
      id: 79,
      question: "Traditional ……….. are used as transport.",
      options: ["shoes", "boats", "books", "paper"],
      correct: 1
    },
    {
      id: 80,
      question: "Crops are …………..",
      options: ["grown", "grow", "will grow", "grew"],
      correct: 0
    },
    {
      id: 81,
      question: "Her car has been stolen. ……….. we don't know who stole it.",
      options: ["we are going to steal it", "we will steal it", "we don't know who stole it", "we know stole it"],
      correct: 2
    },
    {
      id: 82,
      question: "Gazelles can ……….. by lions.",
      options: ["been hunt", "hunted", "be hunted", "hunt"],
      correct: 2
    },
    {
      id: 83,
      question: "Use the passive when ……….. is more important than who did it.",
      options: ["time", "the action", "the subject", "the person"],
      correct: 1
    },
    {
      id: 84,
      question: "A fawn is a …………..",
      options: ["young deer", "kid", "young boy", "child"],
      correct: 0
    },
    {
      id: 85,
      question: "……….. is an animal that kills & eats other animals.",
      options: ["cat", "fawn", "flies", "A predator"],
      correct: 3
    }
  ],
  8: [
    {
      id: 107,
      question: "How did you get the part?",
      options: ["I got it after a film test.", "I get it after a film test.", "I have got it after a film test.", "He got after a film test."],
      correct: 0
    },
    {
      id: 108,
      question: "The party ……….. at 10 a.m., but the doors ……….. at 9:30 a.m.",
      options: ["starts – opens", "starts – open", "opens – starts", "start – open"],
      correct: 0
    },
    {
      id: 109,
      question: "We don't ……….. to get tickets in advance.",
      options: ["need", "preferred", "cost", "start"],
      correct: 0
    },
    {
      id: 110,
      question: "You need a lot of patience for this hobby as it takes a long time to make one blanket. This hobby is …………..",
      options: ["watching television", "jewellery making", "blanket weaving", "swimming"],
      correct: 2
    },
    {
      id: 111,
      question: "Are you a movie fan?",
      options: ["Yes, I am.", "Yes, I was.", "Yes, you were", "No, I don't."],
      correct: 0
    },
    {
      id: 112,
      question: "My brother is very clumsy and …………..",
      options: ["then slips in the puddle.", "is always having silly accidents.", "it takes a long time.", "it tasted awful."],
      correct: 1
    },
    {
      id: 113,
      question: "What's it about?",
      options: ["How does it end?", "What's the topic?", "What's the name of the main character?", "Where does it take place?"],
      correct: 1
    },
    {
      id: 114,
      question: "Rose ……….. the events of that tragic night when the ship hit an iceberg and …………..",
      options: ["narrate – sink", "narrates – sank", "narrate – sank", "is narrating – sink"],
      correct: 2
    }
  ]
};

const finalExamQuestions: Question[] = [
  {
    id: 5,
    question: "Titanic film started from the port of …..",
    options: ["Southampton", "Toronto", "London", "Liverpool"],
    correct: 0
  },
  {
    id: 12,
    question: "What kind of TV program is it?",
    options: ["I saw a poster of school", "I play the part of Samara", "I'm 16", "It's a comedy"],
    correct: 3
  },
  {
    id: 25,
    question: "If we didn't have any spiders, we ………….. more mosquitoes.",
    options: ["got", "would get", "get", "will get"],
    correct: 1
  },
  {
    id: 28,
    question: "Single consonants after single vowels are ………….. when an ending is added.",
    options: ["deleted", "canceled", "removed", "doubled"],
    correct: 3
  },
  {
    id: 35,
    question: "She has ten falcons, four cars & two houses. She is …………..",
    options: ["sad", "happy", "expensive", "rich"],
    correct: 3
  },
  {
    id: 45,
    question: "You will earn money & have a very ………….. job if you become a doctor.",
    options: ["silly", "important", "noisy", "not important"],
    correct: 1
  },
  {
    id: 52,
    question: "Someone who plays football is a …………..",
    options: ["teacher", "footballer", "doctor", "dentist"],
    correct: 1
  },
  {
    id: 69,
    question: "Falconry is a ………….. of hunting.",
    options: ["place", "sport", "city", "town"],
    correct: 1
  },
  {
    id: 74,
    question: "Crocodiles aren't as ……….. as birds.",
    options: ["smallest", "big", "smaller", "small"],
    correct: 3
  },
  {
    id: 110,
    question: "You need a lot of patience for this hobby as it takes a long time to make one blanket. This hobby is …………..",
    options: ["watching television", "jewellery making", "blanket weaving", "swimming"],
    correct: 2
  },
  {
    id: 115,
    question: "The comparative of (simple and clever) can be used with …………..",
    options: ["more", "-er", "er or more/less", "less"],
    correct: 2
  },
  {
    id: 116,
    question: "Falcons eat animals and birds.",
    options: ["Falcons eat small animals and birds.", "Small animals and birds are eaten by falcons.", "Small animals and birds ate by falcons.", "Small animals and birds is eaten by falcons."],
    correct: 1
  }
];

export const Questions: React.FC<QuestionsProps> = ({ unitId }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const questions = unitId === 9 ? finalExamQuestions : questionsData[unitId] || [];
  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerSelect = (answerIndex: number) => {
    if (isCompleted) return;
    
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: answerIndex
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setIsCompleted(true);
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach(question => {
      if (selectedAnswers[question.id] === question.correct) {
        correct++;
      }
    });
    return { correct, total: questions.length, percentage: Math.round((correct / questions.length) * 100) };
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setShowResults(false);
    setQuizStarted(false);
    setIsCompleted(false);
  };

  const getScoreColor = (percentage: number) => {
    if (percentage >= 90) return "text-emerald-600";
    if (percentage >= 75) return "text-blue-600";
    if (percentage >= 60) return "text-amber-600";
    return "text-red-600";
  };

  const getScoreGrade = (percentage: number) => {
    if (percentage >= 90) return "Excellent";
    if (percentage >= 75) return "Good";
    if (percentage >= 60) return "Pass";
    return "Needs Improvement";
  };

  if (questions.length === 0) {
    return (
      <Card className="border-muted/20 bg-gradient-to-br from-muted/5 to-muted/10">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 mx-auto bg-muted/20 rounded-full flex items-center justify-center">
              <BookOpen className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">No Questions Available</h3>
            <p className="text-muted-foreground">Questions are only available for Grade 12 students.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!quizStarted) {
    return (
      <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2 text-2xl">
            <Trophy className="w-6 h-6 text-primary" />
            {unitId === 9 ? 'Final Exam' : `Unit ${unitId} Questions`}
          </CardTitle>
          <CardDescription className="text-lg">
            Test your knowledge with {questions.length} questions
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="p-4 bg-background/50 rounded-lg border">
              <div className="text-2xl font-bold text-primary">{questions.length}</div>
              <div className="text-sm text-muted-foreground">Questions</div>
            </div>
            <div className="p-4 bg-background/50 rounded-lg border">
              <div className="text-2xl font-bold text-primary">~{Math.ceil(questions.length * 1.5)}</div>
              <div className="text-sm text-muted-foreground">Minutes</div>
            </div>
          </div>
          
          <div className="space-y-3">
            <h4 className="font-semibold text-foreground">Instructions:</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                Read each question carefully before selecting your answer
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                You can navigate between questions using Next/Previous buttons
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                Your score will be calculated automatically at the end
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                You can retake the quiz as many times as you want
              </li>
            </ul>
          </div>

          <Button 
            onClick={() => setQuizStarted(true)} 
            size="lg" 
            className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
          >
            <Play className="w-4 h-4 mr-2" />
            Start Quiz
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (showResults) {
    const score = calculateScore();
    
    return (
      <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2 text-2xl">
            <Trophy className="w-6 h-6 text-primary" />
            Quiz Results
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center space-y-4">
            <div className={`text-6xl font-bold ${getScoreColor(score.percentage)}`}>
              {score.percentage}%
            </div>
            <div className="space-y-2">
              <Badge variant="secondary" className="text-lg px-4 py-2">
                {getScoreGrade(score.percentage)}
              </Badge>
              <p className="text-muted-foreground">
                You got {score.correct} out of {score.total} questions correct
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Review Your Answers:</h4>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {questions.map((question, index) => {
                const userAnswer = selectedAnswers[question.id];
                const isCorrect = userAnswer === question.correct;
                
                return (
                  <div key={question.id} className="p-3 bg-background/50 rounded-lg border">
                    <div className="flex items-start gap-2">
                      {isCorrect ? (
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                      )}
                      <div className="flex-1 space-y-2">
                        <p className="text-sm font-medium">Q{index + 1}: {question.question}</p>
                        <div className="space-y-1 text-xs">
                          <p className={isCorrect ? "text-green-600" : "text-red-600"}>
                            Your answer: {question.options[userAnswer]} {isCorrect ? "✓" : "✗"}
                          </p>
                          {!isCorrect && (
                            <p className="text-green-600">
                              Correct answer: {question.options[question.correct]}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <Button 
            onClick={resetQuiz} 
            size="lg" 
            className="w-full"
            variant="outline"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Retake Quiz
          </Button>
        </CardContent>
      </Card>
    );
  }

  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  const selectedAnswer = selectedAnswers[currentQuestion.id];

  return (
    <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5">
      <CardHeader>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">
              Question {currentQuestionIndex + 1} of {questions.length}
            </CardTitle>
            <Badge variant="secondary">
              {unitId === 9 ? 'Final Exam' : `Unit ${unitId}`}
            </Badge>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="p-4 bg-background/50 rounded-lg border">
          <h3 className="text-lg font-medium text-foreground mb-4">
            {currentQuestion.question}
          </h3>
          
          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={cn(
                  "w-full p-4 text-left rounded-lg border transition-all duration-200",
                  "hover:border-primary/50 hover:bg-primary/5",
                  selectedAnswer === index
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-muted bg-background/50"
                )}
                disabled={isCompleted}
              >
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "w-6 h-6 rounded-full border-2 flex items-center justify-center",
                    selectedAnswer === index
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-muted"
                  )}>
                    {selectedAnswer === index && (
                      <CheckCircle className="w-4 h-4" />
                    )}
                  </div>
                  <span className="text-sm">
                    <strong>{String.fromCharCode(97 + index)})</strong> {option}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-between">
          <Button
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            variant="outline"
          >
            Previous
          </Button>
          
          <Button
            onClick={handleNext}
            disabled={selectedAnswer === undefined}
            className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
          >
            {currentQuestionIndex === questions.length - 1 ? 'Finish Quiz' : 'Next'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Questions;