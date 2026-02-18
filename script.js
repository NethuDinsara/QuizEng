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

{
type:"mcq",
question:"Large Language Model:",
options:["Image generator","Next token predictor","Database","Robot controller"],
answer:"Next token predictor",
hint:"Predicts sequence."
}
,
{
type:"mcq",
question:"Tokenization:",
options:["Speech","Split text into tokens","Encrypt","Translate"],
answer:"Split text into tokens",
hint:"Breaks text."
}
,
{
type:"mcq",
question:"Vector meaning:",
options:["Alphabet","Length","Semantic position","Grammar"],
answer:"Semantic position",
hint:"Meaning space."
}
,
{
type:"mcq",
question:"Attention:",
options:["Speed","Context focus","Compression","Decode"],
answer:"Context focus",
hint:"Nearby words."
}
,
{
type:"mcq",
question:"Self-supervised learning:",
options:["Manual labels","Predict missing parts","Human chat","Another AI"],
answer:"Predict missing parts",
hint:"Auto labels."
}
,
{
type:"mcq",
question:"Transformer:",
options:["Product","Storage","Neural architecture","Database"],
answer:"Neural architecture",
hint:"Core model."
}
,
{
type:"mcq",
question:"Fine tuning:",
options:["Shrink model","General training","Task adaptation","Language add"],
answer:"Task adaptation",
hint:"Specialization."
}
,
{
type:"mcq",
question:"Few-shot prompting:",
options:["No examples","Few examples","Small dataset","Simple English"],
answer:"Few examples",
hint:"Guide output."
}
,
{
type:"mcq",
question:"RAG:",
options:["Speed","More data","External knowledge","Images"],
answer:"External knowledge",
hint:"Retrieve + generate."
}
,
{
type:"mcq",
question:"Vector database:",
options:["Images","Audio","Semantic search","Encryption"],
answer:"Semantic search",
hint:"Similarity."
},

/* =======================
   SECTION B — ML (10)
======================= */

{
type:"mcq",
question:"Supervised learning:",
options:["No labels","With labels","Reward","Random"],
answer:"With labels",
hint:"Input + output."
}
,
{
type:"mcq",
question:"Unsupervised learning:",
options:["Labels","Patterns","Reward","Teacher"],
answer:"Patterns",
hint:"No output."
}
,
{
type:"mcq",
question:"Regression:",
options:["Categories","Continuous values","Clustering","Ranking"],
answer:"Continuous values",
hint:"Numbers."
}
,
{
type:"mcq",
question:"Classification:",
options:["Numbers","Groups","Sorting","Ranking"],
answer:"Groups",
hint:"Discrete."
}
,
{
type:"mcq",
question:"Overfitting:",
options:["Simple","Memorization","Low acc","Few epochs"],
answer:"Memorization",
hint:"Bad generalization."
}
,
{
type:"mcq",
question:"Underfitting:",
options:["Complex","Too simple","High variance","Long training"],
answer:"Too simple",
hint:"Miss patterns."
}
,
{
type:"mcq",
question:"Train-test split:",
options:["Compress","Evaluate","Embed","Tokenize"],
answer:"Evaluate",
hint:"Validation."
}
,
{
type:"mcq",
question:"Bias:",
options:["Noise","Error from assumptions","Speed","Memory"],
answer:"Error from assumptions",
hint:"Wrong model."
}
,
{
type:"mcq",
question:"Variance:",
options:["Over sensitivity","Memory","Speed","Accuracy"],
answer:"Over sensitivity",
hint:"Overfitting."
}
,
{
type:"mcq",
question:"Accuracy:",
options:["Loss","Correct/Total","Speed","Epoch"],
answer:"Correct/Total",
hint:"Metric."
}
,
/* =======================
   SECTION C — PYTHON (10)
======================= */

{
type:"mcq",
question:"Neuron:",
options:["CPU","Math unit","Database","API"],
answer:"Math unit",
hint:"Weighted sum."
}
,
{
type:"mcq",
question:"Activation function:",
options:["Store","Non-linearity","Normalize","Reduce loss"],
answer:"Non-linearity",
hint:"Adds complexity."
}
,
{
type:"mcq",
question:"Epoch:",
options:["Step","Full dataset pass","Loss","Batch"],
answer:"Full dataset pass",
hint:"Training cycle."
}
,
{
type:"mcq",
question:"Batch size:",
options:["LR","Samples per update","Loss","Epoch"],
answer:"Samples per update",
hint:"Mini group."
}
,
{
type:"mcq",
question:"Gradient descent:",
options:["Cleaning","Optimizer","Metric","Embedding"],
answer:"Optimizer",
hint:"Minimize loss."
}
,
{
type:"mcq",
question:"Learning rate:",
options:["CPU speed","Step size","Accuracy","Memory"],
answer:"Step size",
hint:"Update size."
}
,
{
type:"mcq",
question:"Loss function:",
options:["Metric","Error value","Optimizer","Vector"],
answer:"Error value",
hint:"Training signal."
}
,
{
type:"mcq",
question:"Backpropagation:",
options:["Forward pass","Weight update","Inference","Embedding"],
answer:"Weight update",
hint:"Gradient flow."
}
,
{
type:"mcq",
question:"Dropout:",
options:["Speed","Prevent overfit","Compress","Tokenize"],
answer:"Prevent overfit",
hint:"Random neurons."
}
,
{
type:"mcq",
question:"CNN:",
options:["Text","Images","Audio","Database"],
answer:"Images",
hint:"Convolutions."
},

/* =======================
   LLM / RAG / RLHF (20)
======================= */

{
type:"mcq",
question:"Embedding:",
options:["Resize","Dense vectors","Sort","Zip"],
answer:"Dense vectors",
hint:"Semantic."
}
,
{
type:"mcq",
question:"Vectorization:",
options:["Encrypt","Convert to numbers","Compile","Cache"],
answer:"Convert to numbers",
hint:"ML input."
}
,
{
type:"mcq",
question:"Cosine similarity:",
options:["Distance","Angle similarity","Loss","Accuracy"],
answer:"Angle similarity",
hint:"Vector match."
}
,
{
type:"mcq",
question:"Agent:",
options:["Model","Long running AI","Database","Prompt"],
answer:"Long running AI",
hint:"Uses tools."
}
,
{
type:"mcq",
question:"RLHF:",
options:["Manual code","Human scoring","Auto train","Hard rules"],
answer:"Human scoring",
hint:"Preference."
}
,
{
type:"mcq",
question:"Chain of Thought:",
options:["Direct","Step reasoning","Random","Guess"],
answer:"Step reasoning",
hint:"Intermediate steps."
}
,
{
type:"mcq",
question:"Quantization:",
options:["Accuracy","Small dataset","Reduce bits","Hardware"],
answer:"Reduce bits",
hint:"Lower precision."
}
,
{
type:"mcq",
question:"Distillation:",
options:["Small→big","Big→small","Merge","Delete"],
answer:"Big→small",
hint:"Teacher-student."
}
,
{
type:"mcq",
question:"SLM:",
options:["Huge","Company specific","General","Random"],
answer:"Company specific",
hint:"Small models."
}
,
{
type:"mcq",
question:"Context engineering:",
options:["Prompt only","Combine RAG+tools","Hardware","Training"],
answer:"Combine RAG+tools",
hint:"Full pipeline."
},
{
type:"mcq",
question:"Python list:",
options:["Immutable","Mutable","Key-value","Sorted"],
answer:"Mutable",
hint:"[]"
}
,
{
type:"mcq",
question:"Tuple:",
options:["Mutable","Immutable","Dict","Set"],
answer:"Immutable",
hint:"()"
}
,
{
type:"mcq",
question:"Dictionary:",
options:["Index","Key-value","List","Tuple"],
answer:"Key-value",
hint:"{}"
}
,
{
type:"mcq",
question:"Lambda:",
options:["Loop","Anonymous function","Class","Decorator"],
answer:"Anonymous function",
hint:"Inline."
}
,
{
type:"mcq",
question:"NumPy:",
options:["Web","Math arrays","DB","IDE"],
answer:"Math arrays",
hint:"Numerics."
}
,
{
type:"mcq",
question:"Pandas:",
options:["Plot","DataFrames","NN","Compiler"],
answer:"DataFrames",
hint:"Tables."
}
,
{
type:"mcq",
question:"For loop:",
options:["If","Repeat","Catch","Class"],
answer:"Repeat",
hint:"Iteration."
}
,
{
type:"mcq",
question:"try/except:",
options:["Loop","Error handling","Vector","Sort"],
answer:"Error handling",
hint:"Exceptions."
}
,
{
type:"mcq",
question:"O(n):",
options:["Const","Linear","Quad","Log"],
answer:"Linear",
hint:"Big-O."
}
,
{
type:"mcq",
question:"API:",
options:["Algo","Interface","Dataset","Library"],
answer:"Interface",
hint:"Communication."
},

{
type:"mcq",
question:"Pipeline:",
options:["Single model","End-to-end flow","Vector","Loss"],
answer:"End-to-end flow",
hint:"Stages."
}
,
{
type:"mcq",
question:"Inference:",
options:["Training","Prediction","Loss","Vector"],
answer:"Prediction",
hint:"Model output."
}
,
{
type:"mcq",
question:"Model deployment:",
options:["Training","Serving model","Embedding","Tokenizing"],
answer:"Serving model",
hint:"Production."
}
,
{
type:"mcq",
question:"Latency:",
options:["Accuracy","Response time","Loss","Epoch"],
answer:"Response time",
hint:"Speed."
}
,
{
type:"mcq",
question:"Hallucination:",
options:["Crash","Fake info","Slow","Overfit"],
answer:"Fake info",
hint:"LLM error."
}
,
{
type:"mcq",
question:"Prompt injection:",
options:["Speed","Security attack","Metric","Embedding"],
answer:"Security attack",
hint:"Manipulation."
}
,
{
type:"mcq",
question:"Feature engineering:",
options:["UI","Input prep","Deployment","Token"],
answer:"Input prep",
hint:"Better signals."
}
,
{
type:"mcq",
question:"Monitoring:",
options:["Training","Track production","Vector","Token"],
answer:"Track production",
hint:"Observe."
}
,
{
type:"mcq",
question:"Evaluation:",
options:["Deploy","Measure model","Tokenize","Embed"],
answer:"Measure model",
hint:"Metrics."
}
,
{
type:"mcq",
question:"MLOps:",
options:["Only ML","Dev + ML","Database","Frontend"],
answer:"Dev + ML",
hint:"Lifecycle."
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
