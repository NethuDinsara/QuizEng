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
    "type": "mcq",
    "question": "Artificial intelligence is the ability of machines to:",
    "options": ["Mimic human thinking and decision-making", "Only perform calculations", "Store data indefinitely", "Replace all human jobs"],
    "answer": "Mimic human thinking and decision-making",
    "hint": "AI simulates human intelligence for learning and problem-solving."
  },
  {
    "type": "mcq",
    "question": "What is the main difference between Weak AI and General AI?",
    "options": ["Weak AI is task-specific; General AI performs any intellectual task", "Weak AI is superintelligent", "General AI is limited to memory", "No difference"],
    "answer": "Weak AI is task-specific; General AI performs any intellectual task",
    "hint": "Examples: Siri (Weak), human-like versatility (General)."
  },
  {
    "type": "mcq",
    "question": "Machine Learning is a subset of:",
    "options": ["Deep Learning only", "Artificial Intelligence", "Robotics", "Databases"],
    "answer": "Artificial Intelligence",
    "hint": "ML enables machines to learn from data without explicit programming."
  },
  {
    "type": "mcq",
    "question": "Deep Learning differs from Machine Learning primarily in:",
    "options": ["Using labeled data only", "Automatic feature extraction from raw data", "Requiring no neural networks", "Human-defined features always"],
    "answer": "Automatic feature extraction from raw data",
    "hint": "DL uses neural networks for hierarchies like edges to objects."
  },
  {
    "type": "mcq",
    "question": "What is an AI model?",
    "options": ["A physical robot", "A mathematical representation learned from data", "A programming language", "Hardware component"],
    "answer": "A mathematical representation learned from data",
    "hint": "Models predict outputs based on inputs after training."
  },
  {
    "type": "mcq",
    "question": "In AI, input refers to:",
    "options": ["Model predictions", "Data fed into the model", "Training labels", "Final output"],
    "answer": "Data fed into the model",
    "hint": "Output is what the model produces from inputs."
  },
  {
    "type": "mcq",
    "question": "Features in data are:",
    "options": ["Raw unlabeled data", "Measurable properties used for predictions", "Model errors", "Training algorithms"],
    "answer": "Measurable properties used for predictions",
    "hint": "E.g., pixel values in images or age in user data."
  },
  {
    "type": "mcq",
    "question": "Training phase in ML involves:",
    "options": ["Using model for predictions on new data", "Adjusting model parameters on dataset", "Deploying the model", "Deleting data"],
    "answer": "Adjusting model parameters on dataset",
    "hint": "Inference uses trained model on unseen data."
  },
  {
    "type": "mcq",
    "question": "A dataset is:",
    "options": ["Single data point", "Collection of data examples for training/testing", "Model output", "Programming code"],
    "answer": "Collection of data examples for training/testing",
    "hint": "Split into train/validation/test sets."
  },
  {
    "type": "mcq",
    "question": "Labels in supervised learning are:",
    "options": ["Input features", "Correct answers or targets for data", "Model weights", "Error metrics"],
    "answer": "Correct answers or targets for data",
    "hint": "E.g., 'cat' label for image input."
  },
  {
    "type": "mcq",
    "question": "Classification tasks predict:",
    "options": ["Continuous values", "Discrete categories or classes", "Images only", "Text lengths"],
    "answer": "Discrete categories or classes",
    "hint": "E.g., spam/not spam; uses accuracy metrics."
  },
  {
    "type": "mcq",
    "question": "Regression tasks predict:",
    "options": ["Categories", "Continuous numeric values", "Binary yes/no", "Images"],
    "answer": "Continuous numeric values",
    "hint": "E.g., house price; uses MSE/MAE."
  },
  {
    "type": "mcq",
    "question": "In Python, a variable is used to:",
    "options": ["Store fixed data only", "Store data that can change", "Create loops", "Handle errors"],
    "answer": "Store data that can change",
    "hint": "E.g., x = 5; x is dynamic."
  },
  {
    "type": "mcq",
    "question": "Which is a mutable data type in Python?",
    "options": ["String", "Tuple", "List", "Integer"],
    "answer": "List",
    "hint": "Lists can be modified after creation."
  },
  {
    "type": "mcq",
    "question": "A Python list is:",
    "options": ["Unordered key-value pairs", "Ordered collection allowing duplicates", "Immutable sequence", "Single value"],
    "answer": "Ordered collection allowing duplicates",
    "hint": "E.g., my_list = [1, 2, 2]."
  },
  {
    "type": "mcq",
    "question": "Dictionary in Python stores:",
    "options": ["Ordered items by index", "Key-value pairs, keys unique", "Only numbers", "Fixed size"],
    "answer": "Key-value pairs, keys unique",
    "hint": "E.g., {'name': 'Alice'}."
  },
  {
    "type": "mcq",
    "question": "A for loop in Python iterates over:",
    "options": ["Only numbers", "Sequences like lists/strings", "Conditions only", "Functions"],
    "answer": "Sequences like lists/strings",
    "hint": "for item in my_list:."
  },
  {
    "type": "mcq",
    "question": "Functions in Python are defined with:",
    "options": ["if", "for", "def", "while"],
    "answer": "def",
    "hint": "def my_func(): reusable code block."
  },
  {
    "type": "mcq",
    "question": "Conditionals use:",
    "options": ["Loops", "if/elif/else", "Lists", "Dictionaries"],
    "answer": "if/elif/else",
    "hint": "For decision-making based on conditions."
  },
  {
    "type": "mcq",
    "question": "print() in Python:",
    "options": ["Reads input", "Outputs to console", "Creates lists", "Handles errors"],
    "answer": "Outputs to console",
    "hint": "print('Hello World')."
  },
  {
    "type": "mcq",
    "question": "len() returns:",
    "options": ["Item at index", "Length of sequence", "Data type", "Error"],
    "answer": "Length of sequence",
    "hint": "len([1,2,3]) == 3."
  },
  {
    "type": "mcq",
    "question": "List indexing starts at:",
    "options": ["1", "0", "-1", "End"],
    "answer": "0",
    "hint": "my_list[0] gets first item."
  },
  {
    "type": "mcq",
    "question": "List operation 'append' does:",
    "options": ["Remove last", "Add to end", "Insert at index", "Sort"],
    "answer": "Add to end",
    "hint": "my_list.append(4)."
  },
  {
    "type": "mcq",
    "question": "try/except handles:",
    "options": ["Normal code flow", "Exceptions/errors gracefully", "Loops", "Variables"],
    "answer": "Exceptions/errors gracefully",
    "hint": "Prevents crashes on errors."
  },
  {
    "type": "mcq",
    "question": "PEAS in AI agent stands for:",
    "options": ["Performance, Environment, Actuators, Sensors", "Programming, Execution, AI, Systems", "Python, Environment, Agents, States", "Planning, Execution, Adaptation, Search"],
    "answer": "Performance, Environment, Actuators, Sensors",
    "hint": "Framework for agent design."
  },
  {
    "type": "mcq",
    "question": "Reactive Machines AI has:",
    "options": ["Long-term memory", "No memory of past", "Human emotions", "Self-awareness"],
    "answer": "No memory of past",
    "hint": "Responds only to present inputs."
  },
  {
    "type": "mcq",
    "question": "State space in AI is:",
    "options": ["All possible problem states", "Single state", "Environment only", "Agent actions"],
    "answer": "All possible problem states",
    "hint": "Agent navigates within it."
  },
  {
    "type": "mcq",
    "question": "Utility-based agent aims to:",
    "options": ["Meet goals only", "Maximize user preference", "Ignore environment", "Use minimal memory"],
    "answer": "Maximize user preference",
    "hint": "Beyond just reaching goals."
  },
  {
    "type": "mcq",
    "question": "In Python, while loop uses:",
    "options": ["Fixed iterations", "Condition checked each time", "Sequences only", "Functions"],
    "answer": "Condition checked each time",
    "hint": "while condition:."
  },
  {
    "type": "mcq",
    "question": "List slicing my_list[1:3] gets:",
    "options": ["First two items", "Items from index 1 to 2", "Last two", "All"],
    "answer": "Items from index 1 to 2",
    "hint": "Exclusive end index."
  },
  {
    "type": "mcq",
    "question": "Default function parameter uses:",
    "options": ["=", ":", "def", "return"],
    "answer": "=",
    "hint": "def func(x=5):."
  },
  {
    "type": "mcq",
    "question": "Environment types in AI include:",
    "options": ["Deterministic only", "Observable, static/dynamic, etc.", "Python only", "Data only"],
    "answer": "Observable, static/dynamic, etc.",
    "hint": "Fully/partial, episodic/sequential."
  },
  {
    "type": "mcq",
    "question": "Unsupervised learning uses:",
    "options": ["Labels", "No labels, finds patterns", "Regression only", "Classification"],
    "answer": "No labels, finds patterns",
    "hint": "Contrast with supervised (labels)."
  },
  {
    "type": "mcq",
    "question": "Python dictionary access: my_dict['key']",
    "options": ["Gets value", "Adds key", "Deletes", "Lists keys"],
    "answer": "Gets value",
    "hint": "KeyError if missing."
  },
  {
    "type": "mcq",
    "question": "raise exception in Python:",
    "options": ["Ignores errors", "Triggers custom error", "Prints", "Loops"],
    "answer": "Triggers custom error",
    "hint": "Handled by try/except."
  },
  {
    "type": "mcq",
    "question": "Inference phase needs:",
    "options": ["Retraining", "Trained model on new data", "Labels always", "New dataset"],
    "answer": "Trained model on new data",
    "hint": "Real-world predictions."
  }
,
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
