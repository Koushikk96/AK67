import { AptitudeTopic } from '@/types/aptitude';

export const verbalTopics: AptitudeTopic[] = [
  {
    id: 'apt-verbal-01-reading-comprehension',
    number: 1,
    title: 'Reading Comprehension',
    category: 'verbal',
    explanation:
      'Reading Comprehension (RC) tests reading speed, vocabulary in context, inference, main idea synthesis, and tone identification. Key strategies: skim the passage for structure, read questions first to guide targeted reading, and distinguish explicit facts from author inferences.',
    formulas: [
      'Main Idea: Look at first and last sentences of each paragraph',
      'Tone Identification: Objective (factual), Critical, Optimistic, Pessimistic, Sarcastic, Analytical',
      'Inference: Must be logically guaranteed by the text, not an extrapolation',
    ],
    solvedExamples: [
      {
        question: 'Passage snippet: "While automated AI code generation boosts developer velocity, reliance without rigorous testing risks undetected vulnerabilities." Question: What is the author’s primary message?',
        solution: 'The author balances the benefit (velocity) with a crucial caveat (vulnerability risks), arguing for thorough testing alongside automated tools.',
      },
      {
        question: 'How do you differentiate an author\'s "Fact" from an "Inference"?',
        solution: 'A Fact is explicitly mentioned word-for-word in the text. An Inference is an unstated truth logically derived from stated premises.',
      },
    ],
    shortcuts: [
      'Read the question stems before reading long passages to highlight keywords while scanning.',
      'Extreme options containing "always", "never", "only", "completely" are almost always incorrect in RC.',
    ],
    commonMistakes: [
      'Selecting an option that is true in real life but is not mentioned or supported in the given passage.',
      'Spending too much time re-reading complex technical jargon instead of grasping the logical flow.',
    ],
    practiceQuestions: [
      {
        id: 'q-verb-01-1',
        question: 'Read: "Renewable energy investments surpassed fossil fuels in 2024, yet grid storage constraints continue to throttle rapid full-scale adoption." What is the main bottleneck mentioned?',
        options: ['High financial cost of solar', 'Fossil fuel subsidies', 'Grid energy storage limits', 'Government regulations'],
        correctOptionIndex: 2,
        explanation: 'The passage explicitly states "grid storage constraints continue to throttle rapid full-scale adoption".',
        difficulty: 'Easy',
      },
      {
        id: 'q-verb-01-2',
        question: 'In RC questions, if an author presents both pros and cons with balanced evidence, the tone is best described as:',
        options: ['Dogmatic', 'Biased', 'Objective / Balanced', 'Skeptical'],
        correctOptionIndex: 2,
        explanation: 'Presenting dual perspectives without emotional bias characterizes an objective/balanced analytical tone.',
        difficulty: 'Easy',
      },
      {
        id: 'q-verb-01-3',
        question: 'Read: "The decline of bees threatens global agriculture, as one out of every three bites of food depends on pollinators." What can be inferred?',
        options: ['All agricultural crops require bees', 'Bees are the only pollinators', 'Food security is tied to pollinator conservation', 'Artificial pollination will replace bees'],
        correctOptionIndex: 2,
        explanation: 'Because a large fraction of food depends on pollinators, protecting them is tied directly to global food security.',
        difficulty: 'Medium',
      },
      {
        id: 'q-verb-01-4',
        question: 'When asked for the antonym of a word used in a passage, you must choose the word opposite to:',
        options: ['Its dictionary root meaning', 'Its contextual meaning in the passage', 'Its literal etymology', 'Its most common colloquial use'],
        correctOptionIndex: 1,
        explanation: 'Words often carry contextual nuances in RC; always interpret meanings in the context of the sentence.',
        difficulty: 'Easy',
      },
      {
        id: 'q-verb-01-5',
        question: 'An assumption in an argument is best defined as:',
        options: ['A stated fact', 'An unstated premise necessary for the conclusion to hold', 'A counter-argument', 'The final summary'],
        correctOptionIndex: 1,
        explanation: 'An assumption is an unstated bridge between the premise and the conclusion that must be true for the argument to work.',
        difficulty: 'Medium',
      },
    ],
  },
  {
    id: 'apt-verbal-02-sentence-correction',
    number: 2,
    title: 'Sentence Correction & Grammar Rules',
    category: 'verbal',
    explanation:
      'Sentence correction evaluates grammatical accuracy, parallelism, modifier placement, redundancy, and idiom usage. Standard tests: Dangling Modifiers (modifier must immediately follow the noun it modifies), Parallelism in lists ("running, swimming, and biking"), and Pronoun Antecedent agreement.',
    formulas: [
      'Parallelism: Elements linked by "and/or/but" must share identical grammatical form',
      'Modifier Rule: Modifying phrase must sit directly adjacent to the modified noun',
      'Redundancy: Avoid "repeat again", "revert back", "return back", "sufficient enough"',
      'Correlative Conjunctions: "Not only... but also", "Either... or", "Neither... nor"',
    ],
    solvedExamples: [
      {
        question: 'Identify the error: "Walking into the room, the smoke was suffocating."',
        solution: 'Dangling modifier! The smoke was not walking into the room. Correct: "Walking into the room, he found the smoke suffocating."',
      },
      {
        question: 'Correct: "She likes hiking, swimming, and to ride bicycles."',
        solution: 'Faulty parallelism. Correct: "She likes hiking, swimming, and riding bicycles."',
      },
    ],
    shortcuts: [
      'Look for parallelism whenever you see lists or conjunctions ("and", "or", "as well as").',
      'Check whether introductory participial phrases (-ing) logically belong to the grammatical subject.',
    ],
    commonMistakes: [
      'Using "Between you and I" instead of the grammatically correct "Between you and me" (prepositions require objective pronouns).',
      'Using redundant phrasing like "discuss about" (discuss already means to talk about).',
    ],
    practiceQuestions: [
      {
        id: 'q-verb-02-1',
        question: 'Choose the grammatically correct sentence:',
        options: [
          'Neither the teacher nor the students was present.',
          'Neither the teacher nor the students were present.',
          'Neither the teacher or the students were present.',
          'Neither the teacher nor the students is present.',
        ],
        correctOptionIndex: 1,
        explanation: 'In "Neither... nor", the verb agrees with the closer subject ("students" is plural, so "were").',
        difficulty: 'Easy',
      },
      {
        id: 'q-verb-02-2',
        question: 'Correct the sentence: "He is not only famous for his wisdom but also for his wealth."',
        options: [
          'He is famous not only for his wisdom but also for his wealth.',
          'Not only he is famous for his wisdom but also for his wealth.',
          'He is famous for not only his wisdom but his wealth also.',
          'He is famous neither for his wisdom or his wealth.',
        ],
        correctOptionIndex: 0,
        explanation: 'Parallelism: "not only [for X] but also [for Y]". Placing "famous" before "not only" ensures both parts balance.',
        difficulty: 'Medium',
      },
      {
        id: 'q-verb-02-3',
        question: 'Identify the redundant sentence:',
        options: [
          'Please revert to this email at your earliest convenience.',
          'Please revert back to this email as soon as possible.',
          'Please reply to this email promptly.',
          'Please respond to this email quickly.',
        ],
        correctOptionIndex: 1,
        explanation: '"Revert back" is redundant because revert already implies returning back.',
        difficulty: 'Easy',
      },
      {
        id: 'q-verb-02-4',
        question: 'Choose the correct form: "The committee has submitted _____ report."',
        options: ['their', 'its', 'theirs', 'his'],
        correctOptionIndex: 1,
        explanation: 'A collective noun acting as a single unified entity ("the committee") takes the singular neuter pronoun "its".',
        difficulty: 'Easy',
      },
      {
        id: 'q-verb-02-5',
        question: 'Select the sentence free of dangling modifier:',
        options: [
          'Having finished the assignment, the TV was turned on.',
          'Having finished the assignment, Jill turned on the TV.',
          'Turning on the TV, the assignment was finished.',
          'Finished with assignment, the TV turned on.',
        ],
        correctOptionIndex: 1,
        explanation: 'The subject performing the action ("Jill") must directly follow the introductory participial phrase.',
        difficulty: 'Medium',
      },
    ],
  },
  {
    id: 'apt-verbal-03-subject-verb-agreement',
    number: 3,
    title: 'Subject-Verb Agreement',
    category: 'verbal',
    explanation:
      'A singular subject requires a singular verb; a plural subject requires a plural verb. Intervening phrases (like "as well as", "along with", "together with", "in addition to") do NOT change the number of the original subject. Indefinite pronouns like "each", "everyone", "nobody", "either" take singular verbs.',
    formulas: [
      'Singular Subject + Singular Verb (e.g. He runs, The dog barks)',
      'Plural Subject + Plural Verb (e.g. They run, The dogs bark)',
      'Subj1 + along with/as well as + Subj2 => Verb agrees with Subj1',
      'Either/Neither Subj1 or/nor Subj2 => Verb agrees with closer Subj2',
      'Each, Every, Either, Neither, Anyone, Everyone take Singular verbs',
    ],
    solvedExamples: [
      {
        question: 'Choose correct verb: "The Captain, along with his team members, (is / are) arriving today."',
        solution: '"along with his team members" is an intervening parenthetical phrase. The grammatical subject is singular "The Captain". Correct: "is".',
      },
      {
        question: 'Choose correct verb: "Neither the manager nor the employees (was / were) aware of the change."',
        solution: 'In "neither... nor", the verb agrees with the nearest subject ("employees", plural). Correct: "were".',
      },
    ],
    shortcuts: [
      'Ignore everything between commas or prepositions when identifying the true subject.',
      '"A number of" is PLURAL; "The number of" is SINGULAR.',
    ],
    commonMistakes: [
      'Making the verb agree with the noun inside an intervening prepositional phrase instead of the true subject (e.g. "The quality of these apples are good" is WRONG; "is good" is correct).',
      'Using plural verbs with collective nouns acting as a unit ("The team is winning").',
    ],
    practiceQuestions: [
      {
        id: 'q-verb-03-1',
        question: '"A large number of students _____ applied for the scholarship."',
        options: ['has', 'have', 'is', 'was'],
        correctOptionIndex: 1,
        explanation: '"A number of" takes a plural verb ("have applied"), whereas "The number of" takes a singular verb.',
        difficulty: 'Easy',
      },
      {
        id: 'q-verb-03-2',
        question: '"The prime minister, as well as his cabinet ministers, _____ expected at the conference."',
        options: ['is', 'are', 'were', 'have been'],
        correctOptionIndex: 0,
        explanation: 'With "as well as", the verb agrees strictly with the first subject ("The prime minister", singular).',
        difficulty: 'Easy',
      },
      {
        id: 'q-verb-03-3',
        question: '"Bread and butter _____ his favorite breakfast."',
        options: ['are', 'is', 'were', 'have been'],
        correctOptionIndex: 1,
        explanation: 'When two nouns express a single compound idea or entity, they take a singular verb ("is").',
        difficulty: 'Easy',
      },
      {
        id: 'q-verb-03-4',
        question: '"Ten miles _____ a long distance to walk on foot."',
        options: ['are', 'is', 'were', 'being'],
        correctOptionIndex: 1,
        explanation: 'Plural expressions of distance, money, or time regarded as a single unit take singular verbs ("is").',
        difficulty: 'Medium',
      },
      {
        id: 'q-verb-03-5',
        question: '"One of my colleagues _____ won the national award."',
        options: ['have', 'has', 'are', 'were'],
        correctOptionIndex: 1,
        explanation: '"One of + plural noun" takes a singular verb because the true subject is "One".',
        difficulty: 'Easy',
      },
    ],
  },
  {
    id: 'apt-verbal-04-tenses',
    number: 4,
    title: 'Tenses and Sequence of Tenses',
    category: 'verbal',
    explanation:
      'Tenses represent time of action and state of completion (Past, Present, Future × Simple, Continuous, Perfect, Perfect Continuous). Key rules: Past Perfect (had + V3) is used for the earlier of two past events. If the main clause is in past tense, subordinate clauses must be in corresponding past tense (unless expressing a universal truth).',
    formulas: [
      'Simple Present: S + V1/s/es (Habitual actions, universal truths)',
      'Present Perfect: S + has/have + V3 (Action completed with present relevance)',
      'Past Perfect: S + had + V3 (Earlier of two past actions: "The train had left before we reached")',
      'Conditional: "If + Simple Past, would + V1" | "If + Past Perfect, would have + V3"',
    ],
    solvedExamples: [
      {
        question: 'Identify the error: "The doctor arrived after the patient died."',
        solution: 'The patient died BEFORE the doctor arrived. The earlier action requires Past Perfect: "The doctor arrived after the patient had died."',
      },
      {
        question: 'Complete: "If I _____ you, I would accept the offer."',
        solution: 'Subjunctive mood for hypothetical/unreal condition uses "were" for all subjects. Correct: "If I were you...".',
      },
    ],
    shortcuts: [
      '"Since" or "For" indicating duration up to the present requires Present Perfect Continuous ("has been working").',
      'Universal truths remain in Simple Present even when preceded by past reporting verbs ("The teacher said the earth revolves around the sun").',
    ],
    commonMistakes: [
      'Using "will" in both if-clause and main clause (e.g. "If it will rain, we will cancel" is WRONG; use "If it rains, we will cancel").',
      'Using Simple Past when duration with "since/for" is stated.',
    ],
    practiceQuestions: [
      {
        id: 'q-verb-04-1',
        question: '"The train _____ before we reached the railway station."',
        options: ['left', 'had left', 'has left', 'was leaving'],
        correctOptionIndex: 1,
        explanation: 'Past Perfect ("had left") is used for the action that completed first in the past.',
        difficulty: 'Easy',
      },
      {
        id: 'q-verb-04-2',
        question: '"If he had studied diligently, he _____ the examination."',
        options: ['would pass', 'will pass', 'would have passed', 'had passed'],
        correctOptionIndex: 2,
        explanation: 'Third conditional pattern: If + Past Perfect ... would have + V3.',
        difficulty: 'Easy',
      },
      {
        id: 'q-verb-04-3',
        question: '"She _____ in this software company since 2020."',
        options: ['is working', 'has been working', 'worked', 'works'],
        correctOptionIndex: 1,
        explanation: 'An action starting in the past and continuing to the present with "since" requires Present Perfect Continuous.',
        difficulty: 'Easy',
      },
      {
        id: 'q-verb-04-4',
        question: '"Galileo discovered that the Earth _____ around the Sun."',
        options: ['revolved', 'revolves', 'was revolving', 'has revolved'],
        correctOptionIndex: 1,
        explanation: 'Universal scientific truths remain in the Simple Present tense even in indirect past speech.',
        difficulty: 'Medium',
      },
      {
        id: 'q-verb-04-5',
        question: '"I will contact you as soon as the results _____."',
        options: ['will be announced', 'are announced', 'were announced', 'have announced'],
        correctOptionIndex: 1,
        explanation: 'In time clauses starting with "as soon as", use Simple Present ("are announced") instead of future tense.',
        difficulty: 'Medium',
      },
    ],
  },
  {
    id: 'apt-verbal-05-prepositions',
    number: 5,
    title: 'Prepositions and Phrasal Verbs',
    category: 'verbal',
    explanation:
      'Prepositions denote spatial, temporal, or logical relationships (in, on, at, between, among, beside, besides). Fixed Prepositions are idioms where specific verbs/adjectives must take designated prepositions (e.g., "abide by", "accustomed to", "prevent from", "congratulate on").',
    formulas: [
      'Time: AT (exact time: at 5pm), ON (days/dates: on Monday), IN (months/years: in July, in 2026)',
      'Between (two entities) vs Among (more than two entities)',
      'Beside (by the side of) vs Besides (in addition to)',
      'Since (exact point of time) vs For (duration/period of time)',
    ],
    solvedExamples: [
      {
        question: 'Fill in the blank: "He congratulated his friend _____ his promotion."',
        solution: 'Congratulate takes the fixed preposition "on" (not "for"). Correct: "congratulated on his promotion".',
      },
      {
        question: 'Differentiate: "Beside" and "Besides".',
        solution: '"Beside" means next to ("He sat beside me"). "Besides" means in addition to ("Besides coding, she plays violin").',
      },
    ],
    shortcuts: [
      'Phrasal verbs test context: "Give up" (surrender/quit), "Call off" (cancel), "Look into" (investigate), "Put up with" (tolerate).',
      'No preposition after transitive verbs: "discuss" (not discuss about), "order" (not order for), "reach" (not reach to).',
    ],
    commonMistakes: [
      'Saying "congratulate for" instead of "congratulate on".',
      'Saying "superior than" instead of "superior to" (adjectives ending in -ior take "to": senior to, inferior to).',
    ],
    practiceQuestions: [
      {
        id: 'q-verb-05-1',
        question: '"She has been absent _____ Monday."',
        options: ['for', 'from', 'since', 'by'],
        correctOptionIndex: 2,
        explanation: 'Specific starting point in time takes "since" with perfect tenses.',
        difficulty: 'Easy',
      },
      {
        id: 'q-verb-05-2',
        question: '"This laptop is superior _____ that one in build quality."',
        options: ['than', 'to', 'from', 'over'],
        correctOptionIndex: 1,
        explanation: 'Adjectives ending in -ior (superior, inferior, senior, junior, prior) take "to", not "than".',
        difficulty: 'Easy',
      },
      {
        id: 'q-verb-05-3',
        question: '"The committee will look _____ the matter and submit findings."',
        options: ['after', 'into', 'at', 'on'],
        correctOptionIndex: 1,
        explanation: '"Look into" means to investigate or examine thoroughly.',
        difficulty: 'Easy',
      },
      {
        id: 'q-verb-05-4',
        question: '"Divide these sweets _____ the five children."',
        options: ['between', 'among', 'amidst', 'in'],
        correctOptionIndex: 1,
        explanation: '"Between" is used for two; "Among" is used for more than two entities.',
        difficulty: 'Easy',
      },
      {
        id: 'q-verb-05-5',
        question: '"He prevented me _____ signing the agreement prematurely."',
        options: ['to', 'from', 'for', 'of'],
        correctOptionIndex: 1,
        explanation: '"Prevent", "prohibit", and "refrain" take the fixed preposition "from" followed by gerund (-ing).',
        difficulty: 'Medium',
      },
    ],
  },
  {
    id: 'apt-verbal-06-articles',
    number: 6,
    title: 'Articles (A, An, The)',
    category: 'verbal',
    explanation:
      'Articles determine noun definiteness. Indefinite articles "A" and "An" depend on initial vowel SOUNDS, not alphabet letters (e.g. "an hour", "a European", "a university", "an honest man", "a one-dollar bill"). Definite article "The" is used for unique celestial entities, superlatives, oceans/rivers/mountain ranges, musical instruments, and specific previously mentioned nouns.',
    formulas: [
      'Use "An" before vowel SOUNDS: /a/, /e/, /i/, /o/, /u/ (e.g. an MBA, an heir)',
      'Use "A" before consonant SOUNDS: (e.g. a unicorn, a union, a one-eyed man)',
      'Use "The" before superlatives ("the best"), unique objects ("the sun"), rivers, holy books',
      'Zero Article: Omit articles before proper nouns, languages, meals, sports, abstract virtues',
    ],
    solvedExamples: [
      {
        question: 'Choose article: "He is _____ European diplomat."',
        solution: '"European" begins with the consonant /y/ sound ("yoo-ro-pe-an"). Therefore, use "a European".',
      },
      {
        question: 'Choose article: "My brother is _____ MBA graduate."',
        solution: '"MBA" is pronounced with an initial vowel sound /em/. Therefore, use "an MBA".',
      },
    ],
    shortcuts: [
      'Pronounce the word aloud. If the mouth starts with a vowel sound, use "an".',
      'No article before names of languages ("English"), but use "the" when referring to people ("the English").',
    ],
    commonMistakes: [
      'Relying mechanically on spelling instead of phonetic sound (e.g., writing "a honest" because of "h").',
      'Using "the" before names of single mountains (Mount Everest takes NO article; The Himalayas takes "the").',
    ],
    practiceQuestions: [
      {
        id: 'q-verb-06-1',
        question: '"He returned after _____ hour."',
        options: ['a', 'an', 'the', 'no article'],
        correctOptionIndex: 1,
        explanation: '"Hour" has a silent "h" and starts with vowel sound /ow-er/. Takes "an".',
        difficulty: 'Easy',
      },
      {
        id: 'q-verb-06-2',
        question: '"She is studying at _____ university in Delhi."',
        options: ['a', 'an', 'the', 'no article'],
        correctOptionIndex: 0,
        explanation: '"University" begins with consonant /y/ sound ("yoo-ni-ver-si-ty"). Takes "a".',
        difficulty: 'Easy',
      },
      {
        id: 'q-verb-06-3',
        question: '"_____ Nile is the longest river in the world."',
        options: ['A', 'An', 'The', 'No article'],
        correctOptionIndex: 2,
        explanation: 'Names of rivers take the definite article "The".',
        difficulty: 'Easy',
      },
      {
        id: 'q-verb-06-4',
        question: '"He is _____ honest officer serving in the ministry."',
        options: ['a', 'an', 'the', 'no article'],
        correctOptionIndex: 1,
        explanation: '"Honest" starts with a vowel sound /on-est/. Takes "an".',
        difficulty: 'Easy',
      },
      {
        id: 'q-verb-06-5',
        question: '"Copper is _____ useful metal for electrical wiring."',
        options: ['a', 'an', 'the', 'no article'],
        correctOptionIndex: 0,
        explanation: '"Useful" starts with consonant /y/ sound. Takes "a".',
        difficulty: 'Easy',
      },
    ],
  },
  {
    id: 'apt-verbal-07-synonyms-antonyms',
    number: 7,
    title: 'Synonyms and Antonyms',
    category: 'verbal',
    explanation:
      'Synonyms share near-identical meanings; Antonyms express opposite meanings. Placement tests emphasize high-frequency collegiate and corporate vocabulary (e.g., pragmatic, candid, ephemeral, lucrative, obscure, redundant).',
    formulas: [
      'Root words & Prefixes: Bene- (good), Mal- (bad), Chron- (time), Phil- (love), Path- (feeling)',
      'Negative prefixes: un-, in-, dis-, a-, non-, im-',
    ],
    solvedExamples: [
      {
        question: 'Find the synonym of "PRAGMATIC".',
        solution: 'Pragmatic means practical and dealing with things sensibly. Synonym: Practical / Realistic.',
      },
      {
        question: 'Find the antonym of "EPHEMERAL".',
        solution: 'Ephemeral means lasting for a very short time (transient). Antonym: Permanent / Eternal / Enduring.',
      },
    ],
    shortcuts: [
      'Eliminate options sharing the same positive/negative polarity as the question word when looking for antonyms.',
      'Use Latin/Greek roots to decipher unknown words.',
    ],
    commonMistakes: [
      'Selecting a synonym when the question explicitly requested an antonym.',
      'Selecting a secondary definition that does not match the part of speech of the target word.',
    ],
    practiceQuestions: [
      {
        id: 'q-verb-07-1',
        question: 'Choose the SYNONYM of "CANDID":',
        options: ['Secretive', 'Frank', 'Arrogant', 'Deceptive'],
        correctOptionIndex: 1,
        explanation: 'Candid means honest, straightforward, and frank.',
        difficulty: 'Easy',
      },
      {
        id: 'q-verb-07-2',
        question: 'Choose the ANTONYM of "METICULOUS":',
        options: ['Careful', 'Careless', 'Thorough', 'Detailed'],
        correctOptionIndex: 1,
        explanation: 'Meticulous means very careful and precise. Opposite is careless.',
        difficulty: 'Easy',
      },
      {
        id: 'q-verb-07-3',
        question: 'Choose the SYNONYM of "UBIQUITOUS":',
        options: ['Rare', 'Omnipresent', 'Dangerous', 'Ancient'],
        correctOptionIndex: 1,
        explanation: 'Ubiquitous means found everywhere; omnipresent.',
        difficulty: 'Medium',
      },
      {
        id: 'q-verb-07-4',
        question: 'Choose the ANTONYM of "AMBIGUOUS":',
        options: ['Vague', 'Obscure', 'Clear', 'Complicated'],
        correctOptionIndex: 2,
        explanation: 'Ambiguous means having multiple or unclear meanings. Antonym is clear/explicit.',
        difficulty: 'Easy',
      },
      {
        id: 'q-verb-07-5',
        question: 'Choose the SYNONYM of "MITIGATE":',
        options: ['Aggravate', 'Alleviate', 'Intensify', 'Postpone'],
        correctOptionIndex: 1,
        explanation: 'Mitigate means to make less severe or serious; alleviate.',
        difficulty: 'Medium',
      },
    ],
  },
  {
    id: 'apt-verbal-08-para-jumbles',
    number: 8,
    title: 'Para Jumbles (Sentence Rearrangement)',
    category: 'verbal',
    explanation:
      'Para Jumbles require re-ordering scrambled sentences into a coherent, logical paragraph. Strategies: Identify the independent introductory sentence, link mandatory noun-pronoun pairs, track transition signals (However, Furthermore, Consequently), and spot chronological or cause-effect sequences.',
    formulas: [
      'Introductory Sentence: Independent sentence that introduces the main theme or noun (no pronouns or starting transitions)',
      'Mandatory Pairs: Full noun statement must precede pronoun references ("Google... It")',
      'Cause and Effect: Problem statement precedes solution; premise precedes "therefore/thus"',
    ],
    solvedExamples: [
      {
        question: 'Rearrange:\nA. These solar farms generate clean electricity.\nB. Solar panels absorb sunlight and convert it to current.\nC. Clean energy adoption has surged globally.\nD. Thus, carbon emissions drop significantly.',
        solution: 'C introduces the overarching topic. B explains how panels work. A refers back to "These solar farms". D concludes with "Thus". Logical order: C -> B -> A -> D.',
      },
      {
        question: 'What is a "Mandatory Pair"?',
        solution: 'Two sentences that must sit adjacent to each other due to noun-pronoun agreement, chronological continuity, or acronym definitions (e.g. "WHO... The Organization").',
      },
    ],
    shortcuts: [
      'Work backwards from option choices: If 3 options start with sentence B, test B as the starter first.',
      'Check sentence endings for transition signposts linking to subsequent sentences.',
    ],
    commonMistakes: [
      'Choosing a sentence starting with a pronoun ("He", "They", "This") as the opening sentence.',
      'Ignoring transition words like "On the other hand" that require a contrasting preceding thought.',
    ],
    practiceQuestions: [
      {
        id: 'q-verb-08-1',
        question: 'Rearrange:\n1. He decided to learn software development.\n2. Alex was an accountant.\n3. Within a year, he secured a position as a frontend engineer.\n4. However, he realized automation was changing his field.',
        options: ['2-4-1-3', '2-1-4-3', '1-2-4-3', '4-2-1-3'],
        correctOptionIndex: 0,
        explanation: '2 introduces Alex. 4 describes his realization. 1 describes his decision. 3 concludes with the successful outcome. Order: 2-4-1-3.',
        difficulty: 'Easy',
      },
      {
        id: 'q-verb-08-2',
        question: 'Which of the following sentences CANNOT be the opening sentence of a paragraph?',
        options: [
          'Artificial Intelligence has transformed various industries.',
          'Therefore, stricter governance policies must be enforced immediately.',
          'Climate change remains a pressing challenge for modern civilizations.',
          'The human genome contains billions of base pairs.'
        ],
        correctOptionIndex: 1,
        explanation: '"Therefore" indicates a conclusion that requires prior context; it cannot open an independent paragraph.',
        difficulty: 'Easy',
      },
      {
        id: 'q-verb-08-3',
        question: 'Rearrange:\nP: But in practice, many users choose weak passwords.\nQ: Strong authentication is crucial for cybersecurity.\nR: This makes systems vulnerable to brute-force attacks.\nS: Consequently, multi-factor authentication has become standard.',
        options: ['Q-P-R-S', 'Q-R-P-S', 'P-Q-R-S', 'S-Q-P-R'],
        correctOptionIndex: 0,
        explanation: 'Q introduces cybersecurity. P contrasts with practice. R explains the risk of weak passwords. S concludes with the standard solution. Order: Q-P-R-S.',
        difficulty: 'Medium',
      },
      {
        id: 'q-verb-08-4',
        question: 'Rearrange:\nA. It provides decentralized transaction logs.\nB. Blockchain technology was introduced in 2008.\nC. This structure eliminates single points of failure.',
        options: ['B-A-C', 'A-B-C', 'B-C-A', 'C-B-A'],
        correctOptionIndex: 0,
        explanation: 'B introduces blockchain. A describes what it provides ("It"). C references "This structure" and concludes. Order: B-A-C.',
        difficulty: 'Easy',
      },
      {
        id: 'q-verb-08-5',
        question: 'In para jumbles, the acronym-full name rule dictates that:',
        options: [
          'Acronym must always precede full name',
          'Full name must appear before or with its acronym in the first reference',
          'Both must appear in the same sentence only',
          'Order does not matter'
        ],
        correctOptionIndex: 1,
        explanation: 'Standard writing convention introduces the full noun name first, followed by acronym in parentheses or subsequent sentences.',
        difficulty: 'Easy',
      },
    ],
  },
  {
    id: 'apt-verbal-09-error-spotting',
    number: 9,
    title: 'Error Spotting in Sentences',
    category: 'verbal',
    explanation:
      'Error Spotting partitions sentences into sections (A, B, C, D) to identify grammatical, syntactical, or idiomatic errors. Common placement test error categories include incorrect preposition, wrong verb tense, misplaced modifier, and conditional mismatch.',
    formulas: [
      'Scrutinize: 1. Subject-Verb Agreement -> 2. Tense Consistency -> 3. Pronoun Case -> 4. Preposition -> 5. Parallelism',
    ],
    solvedExamples: [
      {
        question: 'Spot error: "(A) One of the players / (B) were injured / (C) during the practice match / (D) No error."',
        solution: 'Error is in (B). "One of the players" takes singular verb "was injured", not "were".',
      },
      {
        question: 'Spot error: "(A) He told me that / (B) he is living in London / (C) for the last five years / (D) No error."',
        solution: 'Error is in (B). Duration with "for the last five years" in past reported speech requires Past Perfect Continuous: "he had been living".',
      },
    ],
    shortcuts: [
      'Whenever you see "One of the + plural noun", check if the verb is singular.',
      'Whenever you see "scarcely / hardly", verify it pairs with "when" (not "than"). "No sooner" pairs with "than".',
    ],
    commonMistakes: [
      'Assuming the error is always in the most complex sounding phrase rather than fundamental subject-verb agreement.',
      'Overlooking pronoun-antecedent number mismatch.',
    ],
    practiceQuestions: [
      {
        id: 'q-verb-09-1',
        question: 'Spot the error: "(A) Scarcely had I arrived / (B) than the train / (C) departed from the platform / (D) No error."',
        options: ['(A)', '(B)', '(C)', '(D)'],
        correctOptionIndex: 1,
        explanation: '"Scarcely" and "Hardly" correlate with "when", not "than". (B) should be "when the train".',
        difficulty: 'Medium',
      },
      {
        id: 'q-verb-09-2',
        question: 'Spot the error: "(A) Neither of the two candidates / (B) have submitted / (C) their credentials on time / (D) No error."',
        options: ['(A)', '(B)', '(C)', '(D)'],
        correctOptionIndex: 1,
        explanation: '"Neither of" takes a singular verb: (B) should be "has submitted".',
        difficulty: 'Easy',
      },
      {
        id: 'q-verb-09-3',
        question: 'Spot the error: "(A) She was senior / (B) than me / (C) in college / (D) No error."',
        options: ['(A)', '(B)', '(C)', '(D)'],
        correctOptionIndex: 1,
        explanation: '"Senior" takes preposition "to", not "than". (B) should be "to me".',
        difficulty: 'Easy',
      },
      {
        id: 'q-verb-09-4',
        question: 'Spot the error: "(A) Despite of his best efforts, / (B) he could not achieve / (C) the desired rank / (D) No error."',
        options: ['(A)', '(B)', '(C)', '(D)'],
        correctOptionIndex: 0,
        explanation: '"Despite" never takes "of" ("In spite of" takes "of"). (A) should be "Despite his best efforts".',
        difficulty: 'Easy',
      },
      {
        id: 'q-verb-09-5',
        question: 'Spot the error: "(A) If I will see him, / (B) I will invite him / (C) to the celebration / (D) No error."',
        options: ['(A)', '(B)', '(C)', '(D)'],
        correctOptionIndex: 0,
        explanation: 'First conditional if-clause takes Simple Present: (A) should be "If I see him".',
        difficulty: 'Medium',
      },
    ],
  },
  {
    id: 'apt-verbal-10-vocabulary',
    number: 10,
    title: 'High-Frequency Placement Vocabulary',
    category: 'verbal',
    explanation:
      'Mastery of core placement vocabulary includes understanding subtle nuances, tone connotations, idioms, and one-word substitutions frequently encountered in recruitment screening exams (e.g. TCS NQT, Infosys, Cognizant, Wipro, Capgemini).',
    formulas: [
      'Idioms: "Burn the midnight oil" (work late), "Bite the bullet" (endure hardship), "Cut corners" (do poorly to save money)',
      'One Word Substitutions: Altruist (one who loves humanity), Polyglot (speaks many languages), Inevitable (unavoidable)',
    ],
    solvedExamples: [
      {
        question: 'What does the idiom "Break the ice" mean?',
        solution: 'To relieve tension or initiate conversation in an awkward or quiet social setting.',
      },
      {
        question: 'One word for: "A person who looks at the bright side of things."',
        solution: 'Optimist (opposite is Pessimist).',
      },
    ],
    shortcuts: [
      'Learn words in thematic clusters (e.g., words for brevity: concise, succinct, laconic, pithy).',
      'Use context clues: surrounding words in a sentence reveal whether a word is complimentary or derogatory.',
    ],
    commonMistakes: [
      'Confusing words that sound similar (homophones): "Compliment" (praise) vs "Complement" (supplement/complete).',
      'Confusing "Stationary" (fixed) with "Stationery" (paper/pens).',
    ],
    practiceQuestions: [
      {
        id: 'q-verb-10-1',
        question: 'Give one word for: "Something that cannot be avoided or prevented."',
        options: ['Infallible', 'Inevitable', 'Indelible', 'Inestimable'],
        correctOptionIndex: 1,
        explanation: 'Inevitable means certain to happen; unavoidable.',
        difficulty: 'Easy',
      },
      {
        id: 'q-verb-10-2',
        question: 'What is the meaning of the idiom "To turn over a new leaf"?',
        options: [
          'To start a new book',
          'To change one\'s behavior for the better',
          'To hide one\'s mistakes',
          'To travel to a new city'
        ],
        correctOptionIndex: 1,
        explanation: '"To turn over a new leaf" means to reform or start behaving in a responsible, better way.',
        difficulty: 'Easy',
      },
      {
        id: 'q-verb-10-3',
        question: 'Choose the correctly spelled word:',
        options: ['Accomodate', 'Accommodate', 'Acommodate', 'Accomodete'],
        correctOptionIndex: 1,
        explanation: 'Correct spelling has double c and double m: "Accommodate".',
        difficulty: 'Medium',
      },
      {
        id: 'q-verb-10-4',
        question: 'Give one word for: "A person who knows and speaks many languages."',
        options: ['Philanthropist', 'Polyglot', 'Polymath', 'Linguist'],
        correctOptionIndex: 1,
        explanation: 'A polyglot is a person who knows and is able to speak several languages.',
        difficulty: 'Easy',
      },
      {
        id: 'q-verb-10-5',
        question: '"Compliment" and "Complement" are examples of:',
        options: ['Synonyms', 'Antonyms', 'Homophones', 'Acronyms'],
        correctOptionIndex: 2,
        explanation: 'Words that sound identical but differ in spelling and meaning are homophones.',
        difficulty: 'Easy',
      },
    ],
  },
];
