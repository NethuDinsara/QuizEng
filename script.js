/* ─────────────────────────────────────────
   TechQuiz — script.js
   Quiz engine: questions, state, rendering
   ───────────────────────────────────────── */

/* ══════════════════════════════════════════
   QUESTIONS DATA
   Each item has:
     type       "mcq" | "short"
     question   string
     options    string[] (mcq only)
     answer     string  (exact for mcq, lowercase flexible for short)
     hint       string  (shown after short-answer reveal)
══════════════════════════════════════════ */
const questions = [

/* =======================
   SECTION A — AI (10)
======================= */

{
  type: "mcq",
  question: "What is Artificial Intelligence?",
  options: ["Hard-coded programs","Systems that mimic human intelligence","Database systems","Network protocols"],
  answer: "Systems that mimic human intelligence",
  hint: "AI aims to simulate human-like thinking and behavior."
},
{
  type: "mcq",
  question: "Which is NOT a type of AI?",
  options: ["Narrow AI","General AI","Super AI","Linear AI"],
  answer: "Linear AI",
  hint: "Linear AI is not a standard AI category."
},
{
  type: "mcq",
  question: "Which search algorithm guarantees shortest path?",
  options: ["DFS","BFS","Greedy","Hill Climbing"],
  answer: "BFS",
  hint: "Breadth First Search explores level by level."
},
{
  type: "mcq",
  question: "Which is an example of supervised learning?",
  options: ["Clustering customers","Image labeling","Topic modeling","Market segmentation"],
  answer: "Image labeling",
  hint: "Supervised learning uses labeled data."
},
{
  type: "mcq",
  question: "What is an agent in AI?",
  options: ["Database","Environment","Entity that perceives and acts","Reward"],
  answer: "Entity that perceives and acts",
  hint: "Agents sense environment and take actions."
},
{
  type: "mcq",
  question: "What does heuristic mean?",
  options: ["Exact rule","Random guess","Approximate guiding function","Loss value"],
  answer: "Approximate guiding function",
  hint: "Heuristics guide search efficiently."
},
{
  type: "mcq",
  question: "Which is NOT part of RAG?",
  options: ["Retrieve","Augment","Generate","Compile"],
  answer: "Compile",
  hint: "RAG = Retrieve + Augment + Generate."
},
{
  type: "mcq",
  question: "Vector databases mainly perform:",
  options: ["Sorting","Similarity search","Compression","Encryption"],
  answer: "Similarity search",
  hint: "They retrieve semantically close vectors."
},
{
  type: "mcq",
  question: "What is RLHF?",
  options: ["Reinforcement Learning with Human Feedback","Recursive Learning","Rule Learning","Regression Learning"],
  answer: "Reinforcement Learning with Human Feedback",
  hint: "Humans guide model behavior."
},
{
  type: "mcq",
  question: "Tokenization means:",
  options: ["Encrypting data","Breaking text into pieces","Compressing models","Training networks"],
  answer: "Breaking text into pieces",
  hint: "Text is split into tokens."
},

/* =======================
   SECTION B — ML (10)
======================= */

{
  type: "mcq",
  question: "Which is NOT ML type?",
  options: ["Supervised","Unsupervised","Reinforced","Stored"],
  answer: "Stored",
  hint: "Stored is not an ML category."
},
{
  type: "mcq",
  question: "Overfitting means:",
  options: ["Model too simple","Model memorizes training data","Model underperforms","Data shortage"],
  answer: "Model memorizes training data",
  hint: "Overfit = poor generalization."
},
{
  type: "mcq",
  question: "Which metric used for classification?",
  options: ["MSE","RMSE","Accuracy","Variance"],
  answer: "Accuracy",
  hint: "Accuracy measures correct predictions."
},
{
  type: "mcq",
  question: "Gradient descent is used to:",
  options: ["Increase loss","Minimize loss","Shuffle data","Encode text"],
  answer: "Minimize loss",
  hint: "Optimization algorithm."
},
{
  type: "mcq",
  question: "Which algorithm is used for clustering?",
  options: ["Logistic Regression","K-Means","Linear Regression","Naive Bayes"],
  answer: "K-Means",
  hint: "Popular unsupervised clustering algorithm."
},
{
  type: "mcq",
  question: "What is a feature?",
  options: ["Output","Input variable","Error","Weight"],
  answer: "Input variable",
  hint: "Features describe data."
},
{
  type: "mcq",
  question: "Train/test split purpose?",
  options: ["Speed up model","Reduce memory","Evaluate performance","Compress data"],
  answer: "Evaluate performance",
  hint: "Testing checks generalization."
},
{
  type: "mcq",
  question: "Embeddings represent:",
  options: ["Images only","Code only","Meaning as vectors","Labels"],
  answer: "Meaning as vectors",
  hint: "Semantic numerical representation."
},
{
  type: "mcq",
  question: "Bias–variance tradeoff means:",
  options: ["Speed vs memory","Underfit vs overfit balance","Input vs output","CPU vs GPU"],
  answer: "Underfit vs overfit balance",
  hint: "Model complexity balance."
},
{
  type: "mcq",
  question: "Confusion matrix shows:",
  options: ["Learning rate","Prediction breakdown","Loss curve","Weights"],
  answer: "Prediction breakdown",
  hint: "TP, FP, TN, FN."
},

/* =======================
   SECTION C — PYTHON (10)
======================= */

{
  type: "mcq",
  question: "Output of print(type([]))?",
  options: ["list","<class 'list'>","array","tuple"],
  answer: "<class 'list'>",
  hint: "Python prints class type."
},
{
  type: "mcq",
  question: "Which creates dictionary?",
  options: ["[]","()","{}","<>"],
  answer: "{}",
  hint: "Curly braces."
},
{
  type: "mcq",
  question: "x=[1,2,3]; print(x[-1])",
  options: ["1","2","3","Error"],
  answer: "3",
  hint: "Negative index = last element."
},
{
  type: "mcq",
  question: "Which loop runs at least once?",
  options: ["for","while","do-while","repeat"],
  answer: "do-while",
  hint: "Executes before checking condition."
},
{
  type: "mcq",
  question: "What does len() do?",
  options: ["Sort","Count elements","Reverse","Sum"],
  answer: "Count elements",
  hint: "Length of iterable."
},
{
  type: "mcq",
  question: "Mutable datatype?",
  options: ["tuple","string","list","int"],
  answer: "list",
  hint: "Lists can be modified."
},
{
  type: "mcq",
  question: "print(5//2)",
  options: ["2.5","2","3","Error"],
  answer: "2",
  hint: "Floor division."
},
{
  type: "mcq",
  question: "Used to handle exceptions?",
  options: ["catch","try/except","error","handle"],
  answer: "try/except",
  hint: "Python exception handling."
},
{
  type: "mcq",
  question: "Time complexity of binary search?",
  options: ["O(n)","O(n²)","O(log n)","O(1)"],
  answer: "O(log n)",
  hint: "Divide and conquer."
},
{
  type: "mcq",
  question: "Which avoids loops in ML?",
  options: ["Iteration","Recursion","Vectorization","Compilation"],
  answer: "Vectorization",
  hint: "Operate on arrays directly."
},

/* =======================
   LLM / RAG / RLHF (20)
======================= */

{
  type:"mcq",
  question:"Primary function of LLM?",
  options:["Create images","Predict next token","Manage databases","Control robots"],
  answer:"Predict next token",
  hint:"Language modeling."
},
{
  type:"mcq",
  question:"Tokenization is:",
  options:["Text to speech","Breaking text into tokens","Encryption","Translation"],
  answer:"Breaking text into tokens",
  hint:"Preprocessing step."
},
{
  type:"mcq",
  question:"Vectors represent meaning by:",
  options:["Word length","Mapping in n-dimensional space","Alphabet order","Grammar"],
  answer:"Mapping in n-dimensional space",
  hint:"Semantic similarity."
},
{
  type:"mcq",
  question:"Attention helps by:",
  options:["Speed","Context disambiguation","Reduce cost","Decode vectors"],
  answer:"Context disambiguation",
  hint:"Focus on relevant words."
},
{
  type:"mcq",
  question:"Self-supervised learning:",
  options:["Human labels","Predict missing parts","Conversations","Bigger AI"],
  answer:"Predict missing parts",
  hint:"Model teaches itself."
},
{
  type:"mcq",
  question:"LLM vs Transformer:",
  options:["Same","LLM algo","Transformer product","LLM product, transformer engine"],
  answer:"LLM product, transformer engine",
  hint:"Car vs engine analogy."
},
{
  type:"mcq",
  question:"Fine-tuning purpose:",
  options:["Reduce size","General training","Specialize behavior","Multi-language"],
  answer:"Specialize behavior",
  hint:"Adapt base model."
},
{
  type:"mcq",
  question:"Few-shot prompting:",
  options:["No context","Few examples","Small dataset","Simple language"],
  answer:"Few examples",
  hint:"Guide responses."
},
{
  type:"mcq",
  question:"RAG objective:",
  options:["Speed","Diverse data","Augment with docs","Convert images"],
  answer:"Augment with docs",
  hint:"Retrieve + generate."
},
{
  type:"mcq",
  question:"Vector DB role:",
  options:["Store videos","Audio","Semantic search","Encrypt"],
  answer:"Semantic search",
  hint:"Similarity retrieval."
},
{
  type:"mcq",
  question:"MCP role:",
  options:["Compress","Connect tools","Ethics","Format text"],
  answer:"Connect tools",
  hint:"External actions."
},
{
  type:"mcq",
  question:"Context engineering:",
  options:["Single prompt","Combine RAG + few-shot + MCP","Hardware","Train from scratch"],
  answer:"Combine RAG + few-shot + MCP",
  hint:"Whole context pipeline."
},
{
  type:"mcq",
  question:"AI Agent:",
  options:["Small model","Long-running tool-using process","Human","Database"],
  answer:"Long-running tool-using process",
  hint:"Goal driven."
},
{
  type:"mcq",
  question:"RLHF trains via:",
  options:["Scores","Rules","No humans","Hardcode"],
  answer:"Scores",
  hint:"+1 / -1."
},
{
  type:"mcq",
  question:"Chain of Thought:",
  options:["Direct answer","Step-by-step","Guessing","Simple only"],
  answer:"Step-by-step",
  hint:"Reasoning traces."
},
{
  type:"mcq",
  question:"Reasoning model:",
  options:["Basic math","Step solving","Art","Human only"],
  answer:"Step solving",
  hint:"Tool + logic."
},
{
  type:"mcq",
  question:"Multi-modal models:",
  options:["Text only","Text + image + video","Numbers","Translation"],
  answer:"Text + image + video",
  hint:"Multiple inputs."
},
{
  type:"mcq",
  question:"SLMs:",
  options:["Bigger","Smaller","General","Always better"],
  answer:"Smaller",
  hint:"Fewer params."
},
{
  type:"mcq",
  question:"Distillation:",
  options:["Small teaches big","Big teaches small","Merge models","Clean data"],
  answer:"Big teaches small",
  hint:"Teacher → student."
},
{
  type:"mcq",
  question:"Quantization:",
  options:["Accuracy","Small dataset","Reduce bits","Hardware"],
  answer:"Reduce bits",
  hint:"Lower precision weights."
},
{
 type:"mcq",
 question:"Vector in Machine Learning:",
 options:["Image","Single number","List of numbers representing features","Database row"],
 answer:"List of numbers representing features",
 hint:"Represents data numerically."
}
,
{
 type:"mcq",
 question:"Vectorization:",
 options:["Converting code to C++","Turning text/data into vectors","Compressing files","Encrypting data"],
 answer:"Turning text/data into vectors",
 hint:"ML models only understand numbers."
}
,
{
 type:"mcq",
 question:"Embedding:",
 options:["Image resizing","Feature extraction into dense vectors","Sorting data","Model compression"],
 answer:"Feature extraction into dense vectors",
 hint:"Captures semantic meaning."
}
,
{
 type:"mcq",
 question:"Supervised Learning:",
 options:["No labels","Uses labeled data","Uses reinforcement","Random learning"],
 answer:"Uses labeled data",
 hint:"Input + output provided."
}
,
{
 type:"mcq",
 question:"Unsupervised Learning:",
 options:["Uses labeled data","Finds patterns without labels","Needs reward","Needs teacher"],
 answer:"Finds patterns without labels",
 hint:"Clustering."
}
,
{
 type:"mcq",
 question:"Overfitting:",
 options:["Model too simple","Model memorizes training data","Low accuracy","Under training"],
 answer:"Model memorizes training data",
 hint:"Poor test performance."
}
,
{
 type:"mcq",
 question:"Underfitting:",
 options:["Too complex","Too simple","High variance","Too many epochs"],
 answer:"Too simple",
 hint:"Can't learn patterns."
}
,
{
 type:"mcq",
 question:"Epoch:",
 options:["One prediction","One full pass over dataset","Loss value","Optimizer"],
 answer:"One full pass over dataset",
 hint:"Training cycle."
}
,
{
 type:"mcq",
 question:"Learning Rate:",
 options:["Speed of CPU","Step size during weight updates","Dataset size","Accuracy metric"],
 answer:"Step size during weight updates",
 hint:"Controls convergence."
}
,
{
 type:"mcq",
 question:"Activation Function:",
 options:["Stores weights","Adds non-linearity","Normalizes data","Reduces loss"],
 answer:"Adds non-linearity",
 hint:"Enables deep learning."
},

{
 type:"mcq",
 question:"Gradient Descent:",
 options:["Data cleaning","Optimization algorithm","Loss function","Activation"],
 answer:"Optimization algorithm",
 hint:"Minimizes loss."
},

{
 type:"mcq",
 question:"Train/Test Split:",
 options:["Model compression","Divide data for evaluation","Vector creation","Tokenization"],
 answer:"Divide data for evaluation",
 hint:"Check generalization."
}
,
{
 type:"mcq",
 question:"Accuracy:",
 options:["Loss","Correct predictions / total","Training time","Vector size"],
 answer:"Correct predictions / total",
 hint:"Basic metric."
}
,
{
 type:"mcq",
 question:"Confusion Matrix:",
 options:["Dataset","Performance table","Optimizer","Vector store"],
 answer:"Performance table",
 hint:"TP FP FN TN."
}
,
{
 type:"mcq",
 question:"Python List:",
 options:["Immutable","Ordered & mutable","Key value","Compiled"],
 answer:"Ordered & mutable",
 hint:"[] brackets."
}
,
{
 type:"mcq",
 question:"Python Tuple:",
 options:["Mutable","Unordered","Immutable","Dictionary"],
 answer:"Immutable",
 hint:"() brackets."
}
,
{
 type:"mcq",
 question:"Dictionary:",
 options:["Indexed","Key-value","Immutable","Sorted"],
 answer:"Key-value",
 hint:"Uses {}."
}
,
{
 type:"mcq",
 question:"Lambda Function:",
 options:["Loop","Anonymous function","Class","Decorator"],
 answer:"Anonymous function",
 hint:"Single line."
}
,
{
 type:"mcq",
 question:"NumPy:",
 options:["Web framework","Numerical computing","Database","IDE"],
 answer:"Numerical computing",
 hint:"Arrays + math."
}
,
{
 type:"mcq",
 question:"Pandas:",
 options:["Visualization","Data manipulation","Neural network","Compiler"],
 answer:"Data manipulation",
 hint:"DataFrames."
}
,
{
 type:"mcq",
 question:"For Loop:",
 options:["Conditional","Iteration","Exception","Class"],
 answer:"Iteration",
 hint:"Repeats code."
}
,
{
 type:"mcq",
 question:"Exception Handling:",
 options:["Loop","Debugging","Error control","Vectorization"],
 answer:"Error control",
 hint:"try/except."
}
,
{
 type:"mcq",
 question:"Time Complexity:",
 options:["Memory usage","Execution speed","Algorithm efficiency","Model size"],
 answer:"Algorithm efficiency",
 hint:"Big-O."
}
,
{
 type:"mcq",
 question:"O(n):",
 options:["Constant","Linear","Quadratic","Logarithmic"],
 answer:"Linear",
 hint:"Grows with input."
}
,
{
 type:"mcq",
 question:"API:",
 options:["Algorithm","Interface between systems","Dataset","Library"],
 answer:"Interface between systems",
 hint:"Communication layer."
}
,
{
 type:"mcq",
 question:"REST:",
 options:["Database","Web protocol style","Python package","ML model"],
 answer:"Web protocol style",
 hint:"Uses HTTP."
}

];

/* ══════════════════════════════════════════
   STATE
══════════════════════════════════════════ */
let currentIndex = 0;
let score = 0;
let answered = false; // prevents double-submitting

/* ══════════════════════════════════════════
   DOM REFERENCES
══════════════════════════════════════════ */
const screens = {
  welcome:  document.getElementById('screen-welcome'),
  question: document.getElementById('screen-question'),
  result:   document.getElementById('screen-result'),
};

const el = {
  qCounter:        document.getElementById('q-counter'),
  progressFill:    document.getElementById('progress-fill'),
  qTypeTag:        document.getElementById('q-type-tag'),
  qText:           document.getElementById('q-text'),
  optionsContainer:document.getElementById('options-container'),
  shortContainer:  document.getElementById('short-answer-container'),
  shortInput:      document.getElementById('short-input'),
  shortHint:       document.getElementById('short-hint'),
  answerFeedback:  document.getElementById('answer-feedback'),
  feedbackIcon:    document.getElementById('feedback-icon'),
  feedbackText:    document.getElementById('feedback-text'),
  btnNext:         document.getElementById('btn-next'),

  // result
  ringProgress:    document.getElementById('ring-progress'),
  resultScorePct:  document.getElementById('result-score-pct'),
  resultFraction:  document.getElementById('result-fraction'),
  levelBadge:      document.getElementById('level-badge'),
  levelText:       document.getElementById('level-text'),
  resultMessage:   document.getElementById('result-message'),
  resultBreakdown: document.getElementById('result-breakdown'),
};

/* ══════════════════════════════════════════
   HELPERS
══════════════════════════════════════════ */
function showScreen(name) {
  Object.keys(screens).forEach(k => {
    screens[k].classList.toggle('hidden', k !== name);
  });
  // Re-trigger animation
  screens[name].style.animation = 'none';
  void screens[name].offsetHeight; // reflow
  screens[name].style.animation = '';
}

function normalise(str) {
  return str.trim().toLowerCase().replace(/[^a-z0-9]/g, '');
}

/* ══════════════════════════════════════════
   RENDER QUESTION
══════════════════════════════════════════ */
function renderQuestion(index) {
  answered = false;
  const q = questions[index];

  // Progress
  el.qCounter.textContent = `Question ${index + 1} / ${questions.length}`;
  const pct = (index / questions.length) * 100;
  el.progressFill.style.width = pct + '%';

  // Type tag
  el.qTypeTag.textContent = q.type === 'mcq' ? 'Multiple Choice' : 'Short Answer';
  el.qTypeTag.className = 'question-type-tag ' + q.type;

  // Question text
  el.qText.textContent = q.question;

  // Reset feedback
  el.answerFeedback.classList.add('hidden');
  el.feedbackIcon.textContent = '';
  el.feedbackText.textContent = '';
  el.feedbackText.className = 'feedback-text';

  // Reset Next button
  el.btnNext.disabled = true;

  // Show correct input method
  if (q.type === 'mcq') {
    el.optionsContainer.style.display = 'flex';
    el.shortContainer.classList.add('hidden');
    renderMCQ(q);
  } else {
    el.optionsContainer.style.display = 'none';
    el.shortContainer.classList.remove('hidden');
    el.shortInput.value = '';
    el.shortInput.className = 'short-input';
    el.shortInput.disabled = false;
    el.shortInput.focus();
    el.shortHint.textContent = '';
    renderShort(q);
  }
}

/* MCQ renderer */
function renderMCQ(q) {
  el.optionsContainer.innerHTML = '';
  const letters = ['A', 'B', 'C', 'D'];

  q.options.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.innerHTML = `
      <span class="option-letter">${letters[i]}</span>
      <span class="option-label">${opt}</span>
    `;
    btn.addEventListener('click', () => handleMCQSelect(btn, opt, q));
    el.optionsContainer.appendChild(btn);
  });
}

/* Short answer renderer */
function renderShort(q) {
  // Submit on Enter
  el.shortInput.onkeydown = (e) => {
    if (e.key === 'Enter' && !answered) submitShort(q);
  };

  // Enable Next once user types something
  el.shortInput.oninput = () => {
    if (!answered) {
      el.btnNext.disabled = el.shortInput.value.trim() === '';
    }
  };

  // Override Next button click for short-answer to first validate
  el.btnNext.onclick = () => {
    if (!answered && el.shortInput.value.trim() !== '') {
      submitShort(q);
    } else if (answered) {
      advance();
    }
  };
}

/* ══════════════════════════════════════════
   ANSWER HANDLING
══════════════════════════════════════════ */
function handleMCQSelect(btn, chosen, q) {
  if (answered) return;
  answered = true;

  const allBtns = el.optionsContainer.querySelectorAll('.option-btn');
  const isCorrect = chosen === q.answer;

  allBtns.forEach(b => {
    b.disabled = true;
    const label = b.querySelector('.option-label').textContent;
    if (label === q.answer) b.classList.add('correct');
    if (b === btn && !isCorrect) b.classList.add('wrong');
  });

  if (isCorrect) {
    score++;
    showFeedback(true);
  } else {
    showFeedback(false, `Correct answer: ${q.answer}`);
  }

  // Switch Next button to advance
  el.btnNext.onclick = advance;
  el.btnNext.disabled = false;
}

function submitShort(q) {
  if (answered) return;
  answered = true;

  const userAnswer = el.shortInput.value.trim();
  const isCorrect = normalise(userAnswer) === normalise(q.answer);

  el.shortInput.disabled = true;
  el.shortInput.classList.add(isCorrect ? 'correct-state' : 'wrong-state');

  if (isCorrect) {
    score++;
    el.shortHint.textContent = '✓ ' + q.hint;
    el.shortHint.style.color = 'var(--green)';
    showFeedback(true);
  } else {
    el.shortHint.textContent = `Correct answer: "${q.answer}" — ${q.hint}`;
    el.shortHint.style.color = 'var(--red)';
    showFeedback(false);
  }

  // Next button now advances
  el.btnNext.onclick = advance;
  el.btnNext.disabled = false;
}

function showFeedback(correct, extra = '') {
  el.answerFeedback.classList.remove('hidden');
  el.feedbackIcon.textContent = correct ? '✓' : '✗';
  el.feedbackText.textContent = correct ? 'Correct!' : (extra || 'Incorrect');
  el.feedbackText.className = 'feedback-text ' + (correct ? 'correct' : 'wrong');
}

/* ══════════════════════════════════════════
   NAVIGATION
══════════════════════════════════════════ */
function advance() {
  currentIndex++;
  if (currentIndex < questions.length) {
    renderQuestion(currentIndex);
  } else {
    showResult();
  }
}

/* ══════════════════════════════════════════
   RESULT SCREEN
══════════════════════════════════════════ */
function showResult() {
  showScreen('result');

  const total = questions.length;
  const pct   = Math.round((score / total) * 100);

  // Score text
  el.resultScorePct.textContent = pct + '%';
  el.resultFraction.textContent = `${score} / ${total} correct`;

  // Ring animation
  const circumference = 2 * Math.PI * 52; // ≈ 327
  const offset = circumference - (pct / 100) * circumference;
  setTimeout(() => {
    el.ringProgress.style.strokeDashoffset = offset;
  }, 200);

  // Colour ring based on performance
  if (pct >= 70) el.ringProgress.style.stroke = 'var(--green)';
  else if (pct >= 40) el.ringProgress.style.stroke = 'var(--amber)';
  else el.ringProgress.style.stroke = '#60a5fa';

  // Level
  let level, levelClass, message;
  if (pct < 40) {
    level = 'Beginner';
    levelClass = 'beginner';
    message = "You're just starting your tech journey! Review the basics of operating systems, CPUs, and storage — you'll level up quickly.";
  } else if (pct < 70) {
    level = 'Intermediate';
    levelClass = 'intermediate';
    message = "Solid foundation! You understand the core concepts. A little more study on the finer details and you'll be Advanced in no time.";
  } else {
    level = 'Advanced';
    levelClass = 'advanced';
    message = "Impressive! You have a strong grasp of ICT fundamentals. You clearly know your tech — share the quiz with someone who wants to learn!";
  }

  el.levelText.textContent = level;
  el.levelBadge.className = 'level-badge ' + levelClass;
  el.resultMessage.textContent = message;

  // Breakdown
  const wrong = total - score;
  el.resultBreakdown.innerHTML = `
    <div class="breakdown-item">
      <div class="breakdown-label">Correct</div>
      <div class="breakdown-value green">${score}</div>
    </div>
    <div class="breakdown-item">
      <div class="breakdown-label">Incorrect</div>
      <div class="breakdown-value red">${wrong}</div>
    </div>
    <div class="breakdown-item">
      <div class="breakdown-label">Accuracy</div>
      <div class="breakdown-value">${pct}%</div>
    </div>
    <div class="breakdown-item">
      <div class="breakdown-label">Questions</div>
      <div class="breakdown-value">${total}</div>
    </div>
  `;
}

/* ══════════════════════════════════════════
   RESET / RESTART
══════════════════════════════════════════ */
function resetQuiz() {
  currentIndex = 0;
  score = 0;
  answered = false;
  el.ringProgress.style.strokeDashoffset = 327;
  showScreen('welcome');
}

/* ══════════════════════════════════════════
   EVENT LISTENERS (static buttons)
══════════════════════════════════════════ */
document.getElementById('btn-start').addEventListener('click', () => {
  showScreen('question');
  renderQuestion(0);
  // Default Next handler (overridden per-question type inside render)
  el.btnNext.onclick = advance;
});

document.getElementById('btn-restart').addEventListener('click', resetQuiz);

// Initial Next button default
el.btnNext.onclick = advance;
