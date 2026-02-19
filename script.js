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


//phase 2: LLM 
{
    "type": "mcq",
    "question": "Supervised learning uses:",
    "options": ["No labels", "Labeled data for training", "Rewards only", "Clustering only"],
    "answer": "Labeled data for training",
    "hint": "Input-output pairs guide learning."
  },
  {
    "type": "mcq",
    "question": "Unsupervised learning deals with:",
    "options": ["Labeled data", "Unlabeled data to find patterns", "Sequential decisions", "Predictions only"],
    "answer": "Unlabeled data to find patterns",
    "hint": "E.g., clustering, dimensionality reduction."
  },
  {
    "type": "mcq",
    "question": "Reinforcement learning involves:",
    "options": ["Static labels", "Agent learning via rewards/punishments", "Batch training only", "No environment"],
    "answer": "Agent learning via rewards/punishments",
    "hint": "Trial-error in dynamic environments."
  },
  {
    "type": "mcq",
    "question": "Features are:",
    "options": ["Target variables", "Input variables for model", "Model outputs", "Evaluation metrics"],
    "answer": "Input variables for model",
    "hint": "Attributes describing data points."
  },
  {
    "type": "mcq",
    "question": "Labels represent:",
    "options": ["Input features", "True outputs/targets", "Test data only", "Hyperparameters"],
    "answer": "True outputs/targets",
    "hint": "Used in supervised learning."
  },
  {
    "type": "mcq",
    "question": "Training data is used to:",
    "options": ["Evaluate final model", "Build and tune model parameters", "Only inference", "Validate splits"],
    "answer": "Build and tune model parameters",
    "hint": "Model learns from this."
  },
  {
    "type": "mcq",
    "question": "Test data assesses:",
    "options": ["Training speed", "Model generalization on unseen data", "Feature selection", "Hyperparameter tuning"],
    "answer": "Model generalization on unseen data",
    "hint": "Held out until end."
  },
  {
    "type": "mcq",
    "question": "Train/test split ratio commonly is:",
    "options": ["100/0", "80/20 or 70/30", "50/50 always", "No split needed"],
    "answer": "80/20 or 70/30",
    "hint": "Balances learning and evaluation."
  },
  {
    "type": "mcq",
    "question": "Model evaluation metrics include:",
    "options": ["Only accuracy", "Accuracy, precision, recall, F1, MSE etc.", "Training time only", "Data size"],
    "answer": "Accuracy, precision, recall, F1, MSE etc.",
    "hint": "Task-specific choices."
  },
  {
    "type": "mcq",
    "question": "Overfitting occurs when:",
    "options": ["Model too simple", "Model memorizes training data, poor on test", "Perfect generalization", "Low variance"],
    "answer": "Model memorizes training data, poor on test",
    "hint": "High training accuracy, low test."
  },
  {
    "type": "mcq",
    "question": "Underfitting happens due to:",
    "options": ["Too complex model", "Model too simple, misses patterns", "Excess data", "No regularization"],
    "answer": "Model too simple, misses patterns",
    "hint": "Poor on both train/test."
  },
  {
    "type": "mcq",
    "question": "Bias in ML refers to:",
    "options": ["Random errors", "Errors from wrong assumptions/simple models", "Data variance", "Overfitting"],
    "answer": "Errors from wrong assumptions/simple models",
    "hint": "High bias = underfitting."
  },
  {
    "type": "mcq",
    "question": "Variance is high when:",
    "options": ["Model insensitive to data", "Model changes much with training data", "Low bias", "Simple model"],
    "answer": "Model changes much with training data",
    "hint": "High variance = overfitting."
  },
  {
    "type": "mcq",
    "question": "Generalization means:",
    "options": ["Good on training only", "Performing well on unseen data", "Fast training", "Few features"],
    "answer": "Performing well on unseen data",
    "hint": "Goal of ML models."
  },
  {
    "type": "mcq",
    "question": "Linear Regression predicts:",
    "options": ["Categories", "Continuous values via line fit", "Clusters", "Probabilities"],
    "answer": "Continuous values via line fit",
    "hint": "Minimizes MSE."
  },
  {
    "type": "mcq",
    "question": "Logistic Regression is for:",
    "options": ["Continuous outputs", "Binary/multi-class classification", "Clustering", "Reinforcement"],
    "answer": "Binary/multi-class classification",
    "hint": "Uses sigmoid for probabilities."
  },
  {
    "type": "mcq",
    "question": "K-Means clustering is:",
    "options": ["Supervised", "Unsupervised partitioning into K groups", "Regression", "Sequential"],
    "answer": "Unsupervised partitioning into K groups",
    "hint": "Minimizes intra-cluster variance."
  },
  {
    "type": "mcq",
    "question": "Naive Bayes assumes:",
    "options": ["Feature dependence", "Features independent given class", "Linear relations", "No probabilities"],
    "answer": "Features independent given class",
    "hint": "Uses Bayes' theorem."
  },
  {
    "type": "mcq",
    "question": "Cross-validation helps combat:",
    "options": ["Fast training", "Overfitting by multiple splits", "More data", "Simple models"],
    "answer": "Overfitting by multiple splits",
    "hint": "E.g., K-fold."
  },
  {
    "type": "mcq",
    "question": "Precision measures:",
    "options": ["True positives / predicted positives", "True positives / actual positives", "All correct", "False negatives"],
    "answer": "True positives / predicted positives",
    "hint": "Avoids false positives."
  },
  {
    "type": "mcq",
    "question": "Recall is:",
    "options": ["TP / (TP + FP)", "TP / (TP + FN)", "TN / total", "1 - accuracy"],
    "answer": "TP / (TP + FN)",
    "hint": "Captures all positives."
  },
  {
    "type": "mcq",
    "question": "Regularization like L1/L2 prevents:",
    "options": ["Underfitting", "Overfitting by penalizing complexity", "Bias", "Variance reduction only"],
    "answer": "Overfitting by penalizing complexity",
    "hint": "Adds to loss function."
  },
  {
    "type": "mcq",
    "question": "Hyperparameters are:",
    "options": ["Learned from data", "Set before training e.g. learning rate", "Labels", "Features"],
    "answer": "Set before training e.g. learning rate",
    "hint": "Tuned via validation."
  },
  {
    "type": "mcq",
    "question": "Validation set used for:",
    "options": ["Final eval", "Hyperparameter tuning", "Training", "Inference"],
    "answer": "Hyperparameter tuning",
    "hint": "Separate from train/test."
  },
  {
    "type": "mcq",
    "question": "RMSE in regression is:",
    "options": ["Square root of MSE", "Absolute mean error", "R-squared", "Accuracy"],
    "answer": "Square root of MSE",
    "hint": "Same units as target."
  },
  {
    "type": "mcq",
    "question": "K-Means requires predefined:",
    "options": ["Labels", "Number of clusters K", "Regression line", "Probabilities"],
    "answer": "Number of clusters K",
    "hint": "Use elbow method to choose."
  },
  {
    "type": "mcq",
    "question": "Naive Bayes classifier is:",
    "options": ["Probabilistic, generative", "Discriminative", "Clustering", "Regression"],
    "answer": "Probabilistic, generative",
    "hint": "Models P(class|features)."
  },
  {
    "type": "mcq",
    "question": "Curse of dimensionality affects:",
    "options": ["Low-dim data", "High-dim data sparsity", "1D only", "Labels"],
    "answer": "High-dim data sparsity",
    "hint": "Needs feature selection."
  },
  {
    "type": "mcq",
    "question": "Ensemble methods combine:",
    "options": ["Single model", "Multiple models to reduce variance", "Data only", "Features"],
    "answer": "Multiple models to reduce variance",
    "hint": "E.g., bagging, boosting."
  },
  {
    "type": "mcq",
    "question": "Learning curve plots:",
    "options": ["Error vs data size", "Time only", "Features", "K values"],
    "answer": "Error vs data size",
    "hint": "Diagnoses over/underfitting."
  },
  {
    "type": "mcq",
    "question": "Logistic function outputs:",
    "options": ["0 to infinity", "0 to 1 probabilities", "-1 to 1", "Classes directly"],
    "answer": "0 to 1 probabilities",
    "hint": "Sigmoid shape."
  },
  {
    "type": "mcq",
    "question": "Silhouette score evaluates:",
    "options": ["Regression", "Clustering quality", "Classification", "RL rewards"],
    "answer": "Clustering quality",
    "hint": "-1 to 1, higher better."
  },
  {
    "type": "mcq",
    "question": "Feature scaling is important for:",
    "options": ["Distance-based algos like K-Means", "All only", "Labels", "No effect"],
    "answer": "Distance-based algos like K-Means",
    "hint": "E.g., standardization."
  },
  {
    "type": "mcq",
    "question": "Semi-supervised learning uses:",
    "options": ["All labeled", "Mostly unlabeled + some labeled", "Rewards", "No data"],
    "answer": "Mostly unlabeled + some labeled",
    "hint": "Leverages cheap unlabeled data."
  },
  {
    "type": "mcq",
    "question": "Q-learning is part of:",
    "options": ["Supervised", "Reinforcement model-free", "Clustering", "Regression"],
    "answer": "Reinforcement model-free",
    "hint": "Learns action-value function."
  },
  {
    "type": "mcq",
    "question": "R-squared measures:",
    "options": ["Error", "Variance explained by model", "Bias", "Clusters"],
    "answer": "Variance explained by model",
    "hint": "0 to 1, higher better."
  },
  {
    "type": "mcq",
    "question": "Early stopping prevents:",
    "options": ["Underfitting", "Overfitting during training", "Fast convergence", "Data split"],
    "answer": "Overfitting during training",
    "hint": "Monitors validation loss."
  },
  {
    "type": "mcq",
    "question": "One-hot encoding for:",
    "options": ["Continuous features", "Categorical to binary vectors", "Images", "Time series"],
    "answer": "Categorical to binary vectors",
    "hint": "Avoids ordinal assumptions."
  },
{
    "type": "mcq",
    "question": "Optimization in ML aims to:",
    "options": ["Maximize loss", "Minimize loss function", "Increase epochs", "Ignore gradients"],
    "answer": "Minimize loss function",
    "hint": "Finds best model parameters."
  },
  {
    "type": "mcq",
    "question": "Loss function measures:",
    "options": ["Model accuracy", "Prediction error", "Batch size", "Learning rate"],
    "answer": "Prediction error",
    "hint": "E.g., MSE for regression, cross-entropy for classification."
  },
  {
    "type": "mcq",
    "question": "Gradient descent updates parameters by:",
    "options": ["Adding gradients", "Subtracting gradient times learning rate", "Random walk", "Fixed steps"],
    "answer": "Subtracting gradient times learning rate",
    "hint": "θ = θ - η * ∇J(θ)."
  },
  {
    "type": "mcq",
    "question": "Learning rate controls:",
    "options": ["Step size in parameter updates", "Number of epochs", "Batch size", "Loss type"],
    "answer": "Step size in parameter updates",
    "hint": "Too high: overshoot; too low: slow."
  },
  {
    "type": "mcq",
    "question": "One epoch means:",
    "options": ["One batch", "Full pass over training data", "One gradient step", "Test evaluation"],
    "answer": "Full pass over training data",
    "hint": "Multiple epochs for learning."
  },
  {
    "type": "mcq",
    "question": "Batch size is:",
    "options": ["Total dataset", "Samples per gradient update", "Number of epochs", "Learning rate"],
    "answer": "Samples per gradient update",
    "hint": "Small: noisy; large: memory-intensive."
  },
  {
    "type": "mcq",
    "question": "Accuracy is:",
    "options": ["TP / predicted P", "Correct predictions / total", "TP / actual P", "1 - error"],
    "answer": "Correct predictions / total",
    "hint": "Simple but imbalanced-unfriendly."
  },
  {
    "type": "mcq",
    "question": "Precision measures:",
    "options": ["Of predicted positives, how many true", "Of actual positives, how many caught", "Balanced average", "False negatives"],
    "answer": "Of predicted positives, how many true",
    "hint": "TP / (TP + FP)."
  },
  {
    "type": "mcq",
    "question": "Recall (sensitivity) is:",
    "options": ["TP / (TP + FP)", "TP / (TP + FN)", "TN / total", "FP rate"],
    "answer": "TP / (TP + FN)",
    "hint": "Fraction of true positives caught."
  },
  {
    "type": "mcq",
    "question": "F1 score is:",
    "options": ["Precision + recall", "Harmonic mean of precision and recall", "Accuracy average", "ROC area"],
    "answer": "Harmonic mean of precision and recall",
    "hint": "2 * (P * R) / (P + R); balances both."
  },
  {
    "type": "mcq",
    "question": "Confusion matrix shows:",
    "options": ["Only accuracy", "TP, TN, FP, FN counts", "Gradients", "Loss curves"],
    "answer": "TP, TN, FP, FN counts",
    "hint": "Basis for all metrics."
  },
  {
    "type": "mcq",
    "question": "ROC curve plots:",
    "options": ["Precision vs recall", "TPR vs FPR at thresholds", "Loss vs epoch", "Accuracy vs batch"],
    "answer": "TPR vs FPR at thresholds",
    "hint": "AUC measures discrimination."
  },
  {
    "type": "mcq",
    "question": "Cross-validation:",
    "options": ["Single split", "Multiple data folds for robust eval", "Training only", "No test data"],
    "answer": "Multiple data folds for robust eval",
    "hint": "E.g., 5-fold averages performance."
  },
  {
    "type": "mcq",
    "question": "Regularization prevents:",
    "options": ["Underfitting", "Overfitting by penalizing complexity", "Fast training", "Small batches"],
    "answer": "Overfitting by penalizing complexity",
    "hint": "Adds penalty to loss."
  },
  {
    "type": "mcq",
    "question": "L1 regularization (Lasso):",
    "options": ["Squares weights", "Absolute sum of weights", "Multiplies weights", "Ignores small weights"],
    "answer": "Absolute sum of weights",
    "hint": "Promotes sparsity (zero weights)."
  },
  {
    "type": "mcq",
    "question": "L2 regularization (Ridge):",
    "options": ["Sum |w|", "Sum w² (squared weights)", "Feature selection", "Dropout"],
    "answer": "Sum w² (squared weights)",
    "hint": "Shrinks all weights evenly."
  },
  {
    "type": "mcq",
    "question": "Stochastic Gradient Descent (SGD) uses:",
    "options": ["Full dataset per update", "Single sample per update", "Batch only", "No gradients"],
    "answer": "Single sample per update",
    "hint": "Faster, noisier than batch GD."
  },
  {
    "type": "mcq",
    "question": "Momentum in GD:",
    "options": ["Slows convergence", "Accelerates by considering past gradients", "Increases learning rate", "Reduces batch"],
    "answer": "Accelerates by considering past gradients",
    "hint": "Like inertia."
  },
  {
    "type": "mcq",
    "question": "Adam optimizer combines:",
    "options": ["Momentum + RMSprop", "Only GD", "No adaptivity", "Fixed rate"],
    "answer": "Momentum + RMSprop",
    "hint": "Adaptive per-parameter learning rates."
  },
  {
    "type": "mcq",
    "question": "Binary cross-entropy loss for:",
    "options": ["Regression", "Binary classification", "Multi-class", "Clustering"],
    "answer": "Binary classification",
    "hint": "-[y log p + (1-y) log (1-p)]."
  },
  {
    "type": "mcq",
    "question": "Mean Squared Error (MSE) suits:",
    "options": ["Classification", "Regression", "Probabilities", "Counts"],
    "answer": "Regression",
    "hint": "Punishes large errors quadratically."
  },
  {
    "type": "mcq",
    "question": "Learning rate scheduling:",
    "options": ["Fixed always", "Adjusts rate over time e.g. decay", "Increases epochs", "Batch fixed"],
    "answer": "Adjusts rate over time e.g. decay",
    "hint": "E.g., step decay, cosine annealing."
  },
  {
    "type": "mcq",
    "question": "Mini-batch GD balances:",
    "options": ["Noise and computation", "Full speed only", "Single sample", "No variance"],
    "answer": "Noise and computation",
    "hint": "Common sizes: 32, 64, 128."
  },
  {
    "type": "mcq",
    "question": "Specificity is:",
    "options": ["TPR", "TNR = TN / (TN + FP)", "Precision", "F1"],
    "answer": "TNR = TN / (TN + FP)",
    "hint": "True negative rate."
  },
  {
    "type": "mcq",
    "question": "AUC-ROC of 0.5 means:",
    "options": ["Perfect model", "Random classifier", "Worse than random", "Overfit"],
    "answer": "Random classifier",
    "hint": "1.0 perfect, 0.0 inverse."
  },
  {
    "type": "mcq",
    "question": "Stratified K-fold ensures:",
    "options": ["Uneven classes", "Class distribution per fold", "Random split", "No labels"],
    "answer": "Class distribution per fold",
    "hint": "For imbalanced data."
  },
  {
    "type": "mcq",
    "question": "Elastic Net regularization:",
    "options": ["L1 only", "L1 + L2 combination", "L2 only", "No penalty"],
    "answer": "L1 + L2 combination",
    "hint": "Balances sparsity and shrinkage."
  },
  {
    "type": "mcq",
    "question": "Gradient clipping prevents:",
    "options": ["Exploding gradients", "Vanishing gradients only", "Slow training", "Small batches"],
    "answer": "Exploding gradients",
    "hint": "Caps gradient norm."
  },
  {
    "type": "mcq",
    "question": "Vanishing gradients fixed by:",
    "options": ["ReLU activation", "Sigmoid/tanh deep nets", "Batch norm", "Both ReLU and init"],
    "answer": "ReLU activation",
    "hint": "Avoids saturation."
  },
  {
    "type": "mcq",
    "question": "Macro F1 averages:",
    "options": ["Per class then average", "Weighted by support", "Global", "Precision only"],
    "answer": "Per class then average",
    "hint": "Treats classes equally."
  },
  {
    "type": "mcq",
    "question": "Micro F1 is:",
    "options": ["Class-weighted", "Global counts average", "Macro equal", "Recall only"],
    "answer": "Global counts average",
    "hint": "Same as accuracy for multi-class."
  },
  {
    "type": "mcq",
    "question": "Leave-One-Out CV is:",
    "options": ["Fast", "K=N folds, one sample out", "5-fold", "Train/test only"],
    "answer": "K=N folds, one sample out",
    "hint": "High variance, computationally expensive."
  },
  {
    "type": "mcq",
    "question": "Dropout is a form of:",
    "options": ["L1 reg", "Regularization by random neuron drop", "GD variant", "Loss func"],
    "answer": "Regularization by random neuron drop",
    "hint": "Prevents co-adaptation."
  },
  {
    "type": "mcq",
    "question": "Hinge loss used in:",
    "options": ["Regression", "SVM classification", "Clustering", "Probabilistic"],
    "answer": "SVM classification",
    "hint": "Max(0, 1 - y * pred)."
  },
  {
    "type": "mcq",
    "question": "PR curve useful for:",
    "options": ["Balanced data", "Highly imbalanced classes", "Regression", "Clustering"],
    "answer": "Highly imbalanced classes",
    "hint": "Precision vs recall."
  },
  {
    "type": "mcq",
    "question": "Batch normalization:",
    "options": ["Normalizes inputs per batch", "Global only", "No effect on training", "Increases variance"],
    "answer": "Normalizes inputs per batch",
    "hint": "Stabilizes deep net training."
  },
  {
    "type": "mcq",
    "question": "Cosine similarity in ROC:",
    "options": ["No", "AUC uses ranking ability", "Loss type", "Batch metric"],
    "answer": "AUC uses ranking ability",
    "hint": "Threshold-independent."
  },

  //phase 3 trainign and stuff 

  {
    "type": "mcq",
    "question": "Optimization in ML aims to:",
    "options": ["Maximize loss", "Minimize loss function", "Increase epochs", "Ignore gradients"],
    "answer": "Minimize loss function",
    "hint": "Finds best model parameters."
  },
  {
    "type": "mcq",
    "question": "Loss function measures:",
    "options": ["Model accuracy", "Prediction error", "Batch size", "Learning rate"],
    "answer": "Prediction error",
    "hint": "E.g., MSE for regression, cross-entropy for classification."
  },
  {
    "type": "mcq",
    "question": "Gradient descent updates parameters by:",
    "options": ["Adding gradients", "Subtracting gradient times learning rate", "Random walk", "Fixed steps"],
    "answer": "Subtracting gradient times learning rate",
    "hint": "θ = θ - η * ∇J(θ)."
  },
  {
    "type": "mcq",
    "question": "Learning rate controls:",
    "options": ["Step size in parameter updates", "Number of epochs", "Batch size", "Loss type"],
    "answer": "Step size in parameter updates",
    "hint": "Too high: overshoot; too low: slow."
  },
  {
    "type": "mcq",
    "question": "One epoch means:",
    "options": ["One batch", "Full pass over training data", "One gradient step", "Test evaluation"],
    "answer": "Full pass over training data",
    "hint": "Multiple epochs for learning."
  },
  {
    "type": "mcq",
    "question": "Batch size is:",
    "options": ["Total dataset", "Samples per gradient update", "Number of epochs", "Learning rate"],
    "answer": "Samples per gradient update",
    "hint": "Small: noisy; large: memory-intensive."
  },
  {
    "type": "mcq",
    "question": "Accuracy is:",
    "options": ["TP / predicted P", "Correct predictions / total", "TP / actual P", "1 - error"],
    "answer": "Correct predictions / total",
    "hint": "Simple but imbalanced-unfriendly."
  },
  {
    "type": "mcq",
    "question": "Precision measures:",
    "options": ["Of predicted positives, how many true", "Of actual positives, how many caught", "Balanced average", "False negatives"],
    "answer": "Of predicted positives, how many true",
    "hint": "TP / (TP + FP)."
  },
  {
    "type": "mcq",
    "question": "Recall (sensitivity) is:",
    "options": ["TP / (TP + FP)", "TP / (TP + FN)", "TN / total", "FP rate"],
    "answer": "TP / (TP + FN)",
    "hint": "Fraction of true positives caught."
  },
  {
    "type": "mcq",
    "question": "F1 score is:",
    "options": ["Precision + recall", "Harmonic mean of precision and recall", "Accuracy average", "ROC area"],
    "answer": "Harmonic mean of precision and recall",
    "hint": "2 * (P * R) / (P + R); balances both."
  },
  {
    "type": "mcq",
    "question": "Confusion matrix shows:",
    "options": ["Only accuracy", "TP, TN, FP, FN counts", "Gradients", "Loss curves"],
    "answer": "TP, TN, FP, FN counts",
    "hint": "Basis for all metrics."
  },
  {
    "type": "mcq",
    "question": "ROC curve plots:",
    "options": ["Precision vs recall", "TPR vs FPR at thresholds", "Loss vs epoch", "Accuracy vs batch"],
    "answer": "TPR vs FPR at thresholds",
    "hint": "AUC measures discrimination."
  },
  {
    "type": "mcq",
    "question": "Cross-validation:",
    "options": ["Single split", "Multiple data folds for robust eval", "Training only", "No test data"],
    "answer": "Multiple data folds for robust eval",
    "hint": "E.g., 5-fold averages performance."
  },
  {
    "type": "mcq",
    "question": "Regularization prevents:",
    "options": ["Underfitting", "Overfitting by penalizing complexity", "Fast training", "Small batches"],
    "answer": "Overfitting by penalizing complexity",
    "hint": "Adds penalty to loss."
  },
  {
    "type": "mcq",
    "question": "L1 regularization (Lasso):",
    "options": ["Squares weights", "Absolute sum of weights", "Multiplies weights", "Ignores small weights"],
    "answer": "Absolute sum of weights",
    "hint": "Promotes sparsity (zero weights)."
  },
  {
    "type": "mcq",
    "question": "L2 regularization (Ridge):",
    "options": ["Sum |w|", "Sum w² (squared weights)", "Feature selection", "Dropout"],
    "answer": "Sum w² (squared weights)",
    "hint": "Shrinks all weights evenly."
  },
  {
    "type": "mcq",
    "question": "Stochastic Gradient Descent (SGD) uses:",
    "options": ["Full dataset per update", "Single sample per update", "Batch only", "No gradients"],
    "answer": "Single sample per update",
    "hint": "Faster, noisier than batch GD."
  },
  {
    "type": "mcq",
    "question": "Momentum in GD:",
    "options": ["Slows convergence", "Accelerates by considering past gradients", "Increases learning rate", "Reduces batch"],
    "answer": "Accelerates by considering past gradients",
    "hint": "Like inertia."
  },
  {
    "type": "mcq",
    "question": "Adam optimizer combines:",
    "options": ["Momentum + RMSprop", "Only GD", "No adaptivity", "Fixed rate"],
    "answer": "Momentum + RMSprop",
    "hint": "Adaptive per-parameter learning rates."
  },
  {
    "type": "mcq",
    "question": "Binary cross-entropy loss for:",
    "options": ["Regression", "Binary classification", "Multi-class", "Clustering"],
    "answer": "Binary classification",
    "hint": "-[y log p + (1-y) log (1-p)]."
  },
  {
    "type": "mcq",
    "question": "Mean Squared Error (MSE) suits:",
    "options": ["Classification", "Regression", "Probabilities", "Counts"],
    "answer": "Regression",
    "hint": "Punishes large errors quadratically."
  },
  {
    "type": "mcq",
    "question": "Learning rate scheduling:",
    "options": ["Fixed always", "Adjusts rate over time e.g. decay", "Increases epochs", "Batch fixed"],
    "answer": "Adjusts rate over time e.g. decay",
    "hint": "E.g., step decay, cosine annealing."
  },
  {
    "type": "mcq",
    "question": "Mini-batch GD balances:",
    "options": ["Noise and computation", "Full speed only", "Single sample", "No variance"],
    "answer": "Noise and computation",
    "hint": "Common sizes: 32, 64, 128."
  },
  {
    "type": "mcq",
    "question": "Specificity is:",
    "options": ["TPR", "TNR = TN / (TN + FP)", "Precision", "F1"],
    "answer": "TNR = TN / (TN + FP)",
    "hint": "True negative rate."
  },
  {
    "type": "mcq",
    "question": "AUC-ROC of 0.5 means:",
    "options": ["Perfect model", "Random classifier", "Worse than random", "Overfit"],
    "answer": "Random classifier",
    "hint": "1.0 perfect, 0.0 inverse."
  },
  {
    "type": "mcq",
    "question": "Stratified K-fold ensures:",
    "options": ["Uneven classes", "Class distribution per fold", "Random split", "No labels"],
    "answer": "Class distribution per fold",
    "hint": "For imbalanced data."
  },
  {
    "type": "mcq",
    "question": "Elastic Net regularization:",
    "options": ["L1 only", "L1 + L2 combination", "L2 only", "No penalty"],
    "answer": "L1 + L2 combination",
    "hint": "Balances sparsity and shrinkage."
  },
  {
    "type": "mcq",
    "question": "Gradient clipping prevents:",
    "options": ["Exploding gradients", "Vanishing gradients only", "Slow training", "Small batches"],
    "answer": "Exploding gradients",
    "hint": "Caps gradient norm."
  },
  {
    "type": "mcq",
    "question": "Vanishing gradients fixed by:",
    "options": ["ReLU activation", "Sigmoid/tanh deep nets", "Batch norm", "Both ReLU and init"],
    "answer": "ReLU activation",
    "hint": "Avoids saturation."
  },
  {
    "type": "mcq",
    "question": "Macro F1 averages:",
    "options": ["Per class then average", "Weighted by support", "Global", "Precision only"],
    "answer": "Per class then average",
    "hint": "Treats classes equally."
  },
  {
    "type": "mcq",
    "question": "Micro F1 is:",
    "options": ["Class-weighted", "Global counts average", "Macro equal", "Recall only"],
    "answer": "Global counts average",
    "hint": "Same as accuracy for multi-class."
  },
  {
    "type": "mcq",
    "question": "Leave-One-Out CV is:",
    "options": ["Fast", "K=N folds, one sample out", "5-fold", "Train/test only"],
    "answer": "K=N folds, one sample out",
    "hint": "High variance, computationally expensive."
  },
  {
    "type": "mcq",
    "question": "Dropout is a form of:",
    "options": ["L1 reg", "Regularization by random neuron drop", "GD variant", "Loss func"],
    "answer": "Regularization by random neuron drop",
    "hint": "Prevents co-adaptation."
  },
  {
    "type": "mcq",
    "question": "Hinge loss used in:",
    "options": ["Regression", "SVM classification", "Clustering", "Probabilistic"],
    "answer": "SVM classification",
    "hint": "Max(0, 1 - y * pred)."
  },
  {
    "type": "mcq",
    "question": "PR curve useful for:",
    "options": ["Balanced data", "Highly imbalanced classes", "Regression", "Clustering"],
    "answer": "Highly imbalanced classes",
    "hint": "Precision vs recall."
  },
  {
    "type": "mcq",
    "question": "Batch normalization:",
    "options": ["Normalizes inputs per batch", "Global only", "No effect on training", "Increases variance"],
    "answer": "Normalizes inputs per batch",
    "hint": "Stabilizes deep net training."
  },
  {
    "type": "mcq",
    "question": "Cosine similarity in ROC:",
    "options": ["No", "AUC uses ranking ability", "Loss type", "Batch metric"],
    "answer": "AUC uses ranking ability",
    "hint": "Threshold-independent."
  },

//phase 4 agents and Algos
{
    "type": "mcq",
    "question": "BFS explores nodes using:",
    "options": ["Stack (LIFO)", "Queue (FIFO)", "Priority queue", "No data structure"],
    "answer": "Queue (FIFO)",
    "hint": "Level-by-level expansion."
  },
  {
    "type": "mcq",
    "question": "DFS uses:",
    "options": ["Queue", "Stack (LIFO) or recursion", "Heuristic priority", "Breadth order"],
    "answer": "Stack (LIFO) or recursion",
    "hint": "Deep dive before backtrack."
  },
  {
    "type": "mcq",
    "question": "Greedy search selects:",
    "options": ["Lowest total path cost", "Most promising next step by heuristic", "All nodes equally", "Random node"],
    "answer": "Most promising next step by heuristic",
    "hint": "Uses h(n) only, ignores g(n)."
  },
  {
    "type": "mcq",
    "question": "Heuristic function h(n) estimates:",
    "options": ["Cost from start to n", "Cost from n to goal", "Total path cost", "No estimation"],
    "answer": "Cost from n to goal",
    "hint": "Must be admissible for optimality."
  },
  {
    "type": "mcq",
    "question": "AI agent is:",
    "options": ["Data storage", "Entity perceiving environment and acting", "Search algorithm only", "Loss function"],
    "answer": "Entity perceiving environment and acting",
    "hint": "Senses → thinks → acts."
  },
  {
    "type": "mcq",
    "question": "Agent environment classified by:",
    "options": ["PEAS framework only", "Observability, determinism, etc.", "Gradient descent", "Batch size"],
    "answer": "Observability, determinism, etc.",
    "hint": "Fully/partial, static/dynamic."
  },
  {
    "type": "mcq",
    "question": "Reward in RL agent:",
    "options": ["Immediate feedback signal", "Training labels", "Loss value", "Heuristic estimate"],
    "answer": "Immediate feedback signal",
    "hint": "Guides policy learning."
  },
  {
    "type": "mcq",
    "question": "Agent decision making uses:",
    "options": ["Fixed rules only", "Policy mapping states to actions", "Random choice", "No environment"],
    "answer": "Policy mapping states to actions",
    "hint": "π(s) → a."
  },
  {
    "type": "mcq",
    "question": "Chain of Thought reasoning:",
    "options": ["Single step inference", "Step-by-step explicit reasoning", "Parallel processing", "No explanation"],
    "answer": "Step-by-step explicit reasoning",
    "hint": "Improves complex problem solving."
  },
  {
    "type": "mcq",
    "question": "BFS guarantees:",
    "options": ["Fastest path always", "Shortest path in unweighted graph", "Optimal heuristic", "Low memory"],
    "answer": "Shortest path in unweighted graph",
    "hint": "Complete and optimal."
  },
  {
    "type": "mcq",
    "question": "DFS main drawback:",
    "options": ["High memory", "Not complete, infinite paths", "Slow expansion", "No backtracking"],
    "answer": "Not complete, infinite paths",
    "hint": "May never find goal."
  },
  {
    "type": "mcq",
    "question": "Greedy Best-First not:",
    "options": ["Fast", "Optimal", "Memory efficient", "Heuristic-based"],
    "answer": "Optimal",
    "hint": "Local optima trap."
  },
  {
    "type": "mcq",
    "question": "Admissible heuristic:",
    "options": ["Overestimates always", "Never overestimates cost to goal", "Ignores obstacles", "Random guess"],
    "answer": "Never overestimates cost to goal",
    "hint": "h(n) ≤ true cost."
  },
  {
    "type": "mcq",
    "question": "Simple reflex agent:",
    "options": ["Uses memory", "Current percept → action only", "Model-based", "Goal-based"],
    "answer": "Current percept → action only",
    "hint": "No history consideration."
  },
  {
    "type": "mcq",
    "question": "Model-based agent maintains:",
    "options": ["Internal world model", "Only rewards", "Random actions", "Fixed policy"],
    "answer": "Internal world model",
    "hint": "Handles partial observability."
  },
  {
    "type": "mcq",
    "question": "Utility-based agent maximizes:",
    "options": ["Single goal", "Expected utility", "Immediate reward", "Path length"],
    "answer": "Expected utility",
    "hint": "Multiple conflicting objectives."
  },
  {
    "type": "mcq",
    "question": "Learning agent components:",
    "options": ["Performance, critic, problem generator, learning element", "Search only", "Loss function", "Batch processing"],
    "answer": "Performance, critic, problem generator, learning element",
    "hint": "Improves over time."
  },
  {
    "type": "mcq",
    "question": "PEAS for vacuum agent: Performance=Clean, Environment=Room, Actuators=Movement, Sensors=",
    "options": ["Camera", "Dirt/location sensors", "GPS", "Voice"],
    "answer": "Dirt/location sensors",
    "hint": "Classic AI example."
  },
  {
    "type": "mcq",
    "question": "Step-by-step inference improves:",
    "options": ["Speed only", "Complex reasoning accuracy", "Memory usage", "Simple tasks"],
    "answer": "Complex reasoning accuracy",
    "hint": "Like human thinking."
  },
  {
    "type": "mcq",
    "question": "Uniform Cost Search expands:",
    "options": ["Lowest heuristic", "Lowest path cost g(n)", "Breadth first", "Depth first"],
    "answer": "Lowest path cost g(n)",
    "hint": "Optimal for varying costs."
  },
  {
    "type": "mcq",
    "question": "A* search evaluation function:",
    "options": ["g(n)", "h(n)", "f(n) = g(n) + h(n)", "Random"],
    "answer": "f(n) = g(n) + h(n)",
    "hint": "Optimal with admissible heuristic."
  },
  {
    "type": "mcq",
    "question": "Iterative Deepening DFS combines:",
    "options": ["BFS memory + DFS speed", "Greedy + A*", "Random + systematic", "No backtracking"],
    "answer": "BFS memory + DFS speed",
    "hint": "Optimal and complete."
  },
  {
    "type": "mcq",
    "question": "Fully observable environment:",
    "options": ["Partial info", "Agent sees complete state", "Hidden states", "Dynamic only"],
    "answer": "Agent sees complete state",
    "hint": "No uncertainty."
  },
  {
    "type": "mcq",
    "question": "Episodic environment tasks:",
    "options": ["Sequential dependence", "Independent episodes", "Single action", "No rewards"],
    "answer": "Independent episodes",
    "hint": "E.g., classification tasks."
  },
  {
    "type": "mcq",
    "question": "Deterministic environment:",
    "options": ["Random outcomes", "Action → exact state transition", "Probabilistic", "Partially observable"],
    "answer": "Action → exact state transition",
    "hint": "Predictable."
  },
  {
    "type": "mcq",
    "question": "State space size affects:",
    "options": ["Only BFS", "All search algorithms complexity", "Agents only", "Reasoning"],
    "answer": "All search algorithms complexity",
    "hint": "Branching factor ^ depth."
  },
  {
    "type": "mcq",
    "question": "Consistency heuristic satisfies:",
    "options": ["|h(n)-h(m)| ≤ c(n,m)", "|h(n)| ≤ |h(m)|", "Random", "Overestimate"],
    "answer": "|h(n)-h(m)| ≤ c(n,m)",
    "hint": "Triangle inequality."
  },
  {
    "type": "mcq",
    "question": "Goal-based agent:",
    "options": ["Ignores goal", "Searches actions leading to goal", "Reflex only", "Utility only"],
    "answer": "Searches actions leading to goal",
    "hint": "Planning capability."
  },
  {
    "type": "mcq",
    "question": "Markov Decision Process components:",
    "options": ["S, A, P, R, γ", "Search only", "Loss functions", "Batches"],
    "answer": "S, A, P, R, γ",
    "hint": "States, Actions, Transitions, Rewards, Discount."
  },
  {
    "type": "mcq",
    "question": "Policy iteration vs value iteration:",
    "options": ["Same", "Policy improves value; value improves policy", "Random", "No difference"],
    "answer": "Policy improves value; value improves policy",
    "hint": "RL solution methods."
  },
  {
    "type": "mcq",
    "question": "Zero-shot CoT prompting:",
    "options": ["No reasoning", "Just say 'Let's think step by step'", "Full explanation", "Few-shot only"],
    "answer": "Just say 'Let's think step by step'",
    "hint": "Triggers reasoning."
  },
  {
    "type": "mcq",
    "question": "Tree of Thoughts extends:",
    "options": ["BFS search", "CoT with branching reasoning paths", "Single path", "No structure"],
    "answer": "CoT with branching reasoning paths",
    "hint": "Search + reasoning."
  },
  {
    "type": "mcq",
    "question": "Branching factor b, depth d complexity:",
    "options": ["b*d", "b^d", "d^b", "Linear"],
    "answer": "b^d",
    "hint": "Exponential growth."
  },
  {
    "type": "mcq",
    "question": "Completeness means:",
    "options": ["Fastest", "Finds solution if exists", "Optimal", "Memory efficient"],
    "answer": "Finds solution if exists",
    "hint": "Regardless of order."
  },
  {
    "type": "mcq",
    "question": "Optimal algorithm guarantees:",
    "options": ["Any solution", "Best solution", "Fastest", "Low memory"],
    "answer": "Best solution",
    "hint": "Shortest/lowest cost path."
  },
  {
    "type": "mcq",
    "question": "Rational agent acts to:",
    "options": ["Maximize immediate reward", "Max performance measure", "Follow heuristics", "Random actions"],
    "answer": "Max performance measure",
    "hint": "Given percept sequence."
  },
  {
    "type": "mcq",
    "question": "Partially observable →",
    "options": ["Belief state", "Full state", "No uncertainty", "Simple reflex"],
    "answer": "Belief state",
    "hint": "Probability distribution."
  },

//phase 5 

  {
    "type": "mcq",
    "question": "A vector in AI represents:",
    "options": ["Random numbers", "Numbers capturing semantic meaning", "Binary flags only", "Image pixels"],
    "answer": "Numbers capturing semantic meaning",
    "hint": "king ≈ [0.2, 0.8, 0.4]; encodes relationships."
  },
  {
    "type": "mcq",
    "question": "Similar meaning words have:",
    "options": ["Opposite vectors", "Similar/close vectors", "Same length always", "Random positions"],
    "answer": "Similar/close vectors",
    "hint": "queen ≈ [0.21, 0.79, 0.39] near king."
  },
  {
    "type": "mcq",
    "question": "Embeddings convert:",
    "options": ["Numbers to text", "Text/images to dense vectors", "Vectors to labels", "Data to sparse matrices"],
    "answer": "Text/images to dense vectors",
    "hint": "Captures semantic relationships."
  },
  {
    "type": "mcq",
    "question": "Primary use of embeddings:",
    "options": ["Storage only", "Semantic search & recommendations", "Plotting", "Counting words"],
    "answer": "Semantic search & recommendations",
    "hint": "Finds conceptually similar items."
  },
  {
    "type": "mcq",
    "question": "Cosine similarity measures:",
    "options": ["Euclidean distance", "Angle between vectors (direction)", "Vector length", "Dot product raw"],
    "answer": "Angle between vectors (direction)",
    "hint": "Range [-1,1]; ignores magnitude."
  },
  {
    "type": "mcq",
    "question": "Cosine similarity formula:",
    "options": ["||A|| * ||B||", "A·B / (||A|| * ||B||)", "A - B", "A + B"],
    "answer": "A·B / (||A|| * ||B||)",
    "hint": "1 = identical direction."
  },
  {
    "type": "mcq",
    "question": "Euclidean distance measures:",
    "options": ["Angle", "Straight-line distance", "Direction only", "Magnitude difference"],
    "answer": "Straight-line distance",
    "hint": "Smaller = more similar."
  },
  {
    "type": "mcq",
    "question": "Word2Vec creates:",
    "options": ["Sparse one-hot vectors", "Dense low-dim embeddings", "Bag-of-words", "TF-IDF"],
    "answer": "Dense low-dim embeddings",
    "hint": "Static embeddings per word."
  },
  {
    "type": "mcq",
    "question": "Dimensionality of typical embeddings:",
    "options": ["10-100", "100-1000 usually", "1 million", "Binary only"],
    "answer": "100-1000 usually",
    "hint": "E.g., 768 for BERT-base."
  },
  {
    "type": "mcq",
    "question": "King - man + woman ≈",
    "options": ["President", "Queen", "Brother", "Car"],
    "answer": "Queen",
    "hint": "Vector arithmetic captures analogy."
  },
  {
    "type": "mcq",
    "question": "Embeddings enable:",
    "options": ["Exact keyword match only", "Semantic similarity search", "Rule-based systems", "Database indexing"],
    "answer": "Semantic similarity search",
    "hint": "'big dog' matches 'large puppy'."
  },
  {
    "type": "mcq",
    "question": "Normalize vectors before cosine when:",
    "options": ["Never", "Magnitude matters", "Direction only matters", "Always"],
    "answer": "Direction only matters",
    "hint": "Unit vectors: cos θ = dot product."
  },
  {
    "type": "mcq",
    "question": "BERT embeddings are:",
    "options": ["Static per word", "Contextual (position-dependent)", "One-hot", "Random"],
    "answer": "Contextual (position-dependent)",
    "hint": "'bank' differs in 'river bank' vs 'money bank'."
  },
  {
    "type": "mcq",
    "question": "Vector database stores:",
    "options": ["SQL tables", "High-dim embeddings for ANN search", "Text documents", "Key-value pairs"],
    "answer": "High-dim embeddings for ANN search",
    "hint": "Fast similarity queries."
  },
  {
    "type": "mcq",
    "question": "Cosine similarity 0 means:",
    "options": ["Identical", "Orthogonal (no similarity)", "Opposite", "Same magnitude"],
    "answer": "Orthogonal (no similarity)",
    "hint": "90° angle between vectors."
  },
  {
    "type": "mcq",
    "question": "Why normalize for cosine similarity?",
    "options": ["Speed up computation", "Remove magnitude, keep direction", "Reduce dimensions", "Hash vectors"],
    "answer": "Remove magnitude, keep direction",
    "hint": "Focuses on semantic orientation."
  },
  {
    "type": "mcq",
    "question": "Sparse vs dense embeddings:",
    "options": ["Dense: mostly zeros", "Sparse: few non-zeros; Dense: continuous values", "Same thing", "Sparse for images"],
    "answer": "Sparse: few non-zeros; Dense: continuous values",
    "hint": "One-hot = sparse; Word2Vec = dense."
  },
  {
    "type": "mcq",
    "question": "FAISS library used for:",
    "options": ["Training embeddings", "Fast similarity search (ANN)", "Vector creation", "Visualization"],
    "answer": "Fast similarity search (ANN)",
    "hint": "Facebook AI Similarity Search."
  },
  {
    "type": "mcq",
    "question": "HNSW indexing in vector DBs:",
    "options": ["Exact search", "Approximate nearest neighbors via graphs", "Linear scan", "Hash tables"],
    "answer": "Approximate nearest neighbors via graphs",
    "hint": "Hierarchical Navigable Small World."
  },
  {
    "type": "mcq",
    "question": "RAG uses embeddings for:",
    "options": ["Generate answers", "Retrieve relevant context", "Fine-tune LLM", "Tokenize"],
    "answer": "Retrieve relevant context",
    "hint": "Query → embed → search → LLM."
  },
  {
    "type": "mcq",
    "question": "Dot product similarity:",
    "options": ["Direction + magnitude", "Direction only", "Distance", "Angle cosine"],
    "answer": "Direction + magnitude",
    "hint": "A·B = ||A|| ||B|| cos θ."
  },
  {
    "type": "mcq",
    "question": "Manhattan distance:",
    "options": ["L2 norm", "Sum of absolute differences (L1)", "Angle", "Max difference"],
    "answer": "Sum of absolute differences (L1)",
    "hint": "||A - B||₁"
  },
  {
    "type": "mcq",
    "question": "Why 300-1000 dimensions common?",
    "options": ["Too few loses info", "Balances expressiveness vs computation", "Fixed standard", "Random"],
    "answer": "Balances expressiveness vs computation",
    "hint": "Curse of dimensionality tradeoff."
  },
  {
    "type": "mcq",
    "question": "Sentence transformers create:",
    "options": ["Word embeddings", "Fixed document embeddings", "Token embeddings", "Image vectors"],
    "answer": "Fixed document embeddings",
    "hint": "Single vector per sentence/doc."
  },
  {
    "type": "mcq",
    "question": "t-SNE visualization reduces:",
    "options": ["To 1D", "High-dim embeddings to 2D/3D", "To binary", "Increases dimensions"],
    "answer": "High-dim embeddings to 2D/3D",
    "hint": "Preserves local structure."
  },
  {
    "type": "mcq",
    "question": "Contrastive learning trains embeddings by:",
    "options": ["Similar pairs close, dissimilar far", "Random positioning", "One-hot encoding", "Clustering"],
    "answer": "Similar pairs close, dissimilar far",
    "hint": "SimCLR, triplet loss."
  },
  {
    "type": "mcq",
    "question": "OpenAI embeddings API returns:",
    "options": ["Sparse vectors", "1536-dim dense vectors", "One-hot", "JSON text"],
    "answer": "1536-dim dense vectors",
    "hint": "text-embedding-ada-002."
  },
  {
    "type": "mcq",
    "question": "Vector quantization reduces:",
    "options": ["Precision", "Storage/memory via codebooks", "Similarity accuracy", "Dimensions only"],
    "answer": "Storage/memory via codebooks",
    "hint": "Product quantization in FAISS."
  },
  {
    "type": "mcq",
    "question": "Why cosine > Euclidean often?",
    "options": ["Faster", "Scale-invariant (direction matters)", "Exact match", "Lower dimensions"],
    "answer": "Scale-invariant (direction matters)",
    "hint": "Different length same meaning OK."
  },
  {
    "type": "mcq",
    "question": "CLS token in BERT gives:",
    "options": ["First word embedding", "[CLS] = sentence embedding", "Last token", "Padding"],
    "answer": "[CLS] = sentence embedding",
    "hint": "Pooled output for classification."
  },
  {
    "type": "mcq",
    "question": "PCA on embeddings does:",
    "options": ["Increases dimensions", "Unsupervised dimensionality reduction", "Clustering", "Classification"],
    "answer": "Unsupervised dimensionality reduction",
    "hint": "Linear transformation."
  },
  {
    "type": "mcq",
    "question": "Hybrid search combines:",
    "options": ["Only embeddings", "Keyword + semantic search", "Images + text", "SQL + NoSQL"],
    "answer": "Keyword + semantic search",
    "hint": "BM25 + cosine similarity."
  },
  {
    "type": "mcq",
    "question": "Embedding drift happens when:",
    "options": ["Model updates", "New embedding model changes vector space", "Data changes", "Both B & C"],
    "answer": "New embedding model changes vector space",
    "hint": "Re-embed everything."
  },
  {
    "type": "mcq",
    "question": "Negative cosine similarity:",
    "options": ["[0,1]", "[-1,0]", "[0,∞)", "Always positive"],
    "answer": "[-1,0]",
    "hint": "Opposite direction."
  },
  {
    "type": "mcq",
    "question": "Jaccard similarity for:",
    "options": ["Dense vectors", "Sparse set similarity", "Images", "Time series"],
    "answer": "Sparse set similarity",
    "hint": "Intersection over union."
  },
  {
    "type": "mcq",
    "question": "Pinecone, Weaviate are:",
    "options": ["Embedding models", "Managed vector databases", "Training frameworks", "Visualization tools"],
    "answer": "Managed vector databases",
    "hint": "Handle indexing + search."
  },

  //phase 6 LLMs 

  {
    "type": "mcq",
    "question": "What do Large Language Models (LLMs) primarily do?",
    "options": ["Image classification", "Predict next token in sequence", "Database querying", "Audio transcription"],
    "answer": "Predict next token in sequence",
    "hint": "Autoregressive text generation."
  },
  {
    "type": "mcq",
    "question": "LLMs generate text by predicting:",
    "options": ["First token only", "Each token given previous tokens", "Entire sentence at once", "Last token only"],
    "answer": "Each token given previous tokens",
    "hint": "\"The cat\" → predict \"sat\""
  },
  {
    "type": "mcq",
    "question": "LLMs are trained on:",
    "options": ["Small labeled datasets", "Massive unlabeled text corpora", "Image datasets", "Structured databases"],
    "answer": "Massive unlabeled text corpora",
    "hint": "Billions/trillions of tokens."
  },
  {
    "type": "mcq",
    "question": "Tokenization converts text into:",
    "options": ["Continuous numbers", "Discrete token IDs", "Binary vectors", "Character counts"],
    "answer": "Discrete token IDs",
    "hint": "\"AI is powerful\" → [125, 318, 2045]"
  },
  {
    "type": "mcq",
    "question": "Tokenization example: \"AI is powerful\" becomes:",
    "options": ["[\"A\", \"I\", \" \", \"i\", \"s\"] ", "[\"AI\", \"is\", \"powerful\"]", "[\"A.I.\", \"powerful\"]", "Single number"],
    "answer": "[\"AI\", \"is\", \"powerful\"]",
    "hint": "Word/subword level splitting."
  },
  {
    "type": "mcq",
    "question": "BPE tokenization stands for:",
    "options": ["Binary Processing Encoding", "Byte Pair Encoding", "Base Pair Extraction", "Block Processing Engine"],
    "answer": "Byte Pair Encoding",
    "hint": "Merges frequent character pairs."
  },
  {
    "type": "mcq",
    "question": "BPE handles unknown words by:",
    "options": ["Ignoring them", "Breaking into known subwords", "Using special token", "Copying from dictionary"],
    "answer": "Breaking into known subwords",
    "hint": "\"unseenword\" → \"un\" + \"seen\" + \"word\""
  },
  {
    "type": "mcq",
    "question": "Attention mechanism in LLMs helps with:",
    "options": ["Faster training only", "Context understanding across tokens", "Reduce vocabulary", "Memory optimization"],
    "answer": "Context understanding across tokens",
    "hint": "\"Apple\" meaning depends on context."
  },
  {
    "type": "mcq",
    "question": "Attention example: \"I ate an apple\" - model knows \"apple\" is:",
    "options": ["Fruit (from \"ate\")", "Company (from \"bought\")", "Color", "Random"],
    "answer": "Fruit (from \"ate\")",
    "hint": "Uses surrounding words."
  },
  {
    "type": "mcq",
    "question": "LLM training objective:",
    "options": ["Classification accuracy", "Maximize next token prediction likelihood", "Minimize token count", "Balance vocabulary"],
    "answer": "Maximize next token prediction likelihood",
    "hint": "Cross-entropy loss."
  },
  {
    "type": "mcq",
    "question": "Context window defines:",
    "options": ["Output length only", "Max input + output tokens", "Vocabulary size", "Model parameters"],
    "answer": "Max input + output tokens",
    "hint": "GPT-3.5: 4096 tokens."
  },
  {
    "type": "mcq",
    "question": "LLMs excel at \"in-context learning\" by:",
    "options": ["Weight updates", "Following examples in prompt", "Fine-tuning", "Database lookup"],
    "answer": "Following examples in prompt",
    "hint": "Few-shot learning."
  },
  {
    "type": "mcq",
    "question": "Temperature in LLM generation controls:",
    "options": ["Token length", "Randomness/creativity", "Speed", "Memory usage"],
    "answer": "Randomness/creativity",
    "hint": "High = diverse; Low = deterministic."
  },
  {
    "type": "mcq",
    "question": "Top-k sampling:",
    "options": ["All tokens", "Samples from k most likely tokens", "Single highest", "Random tokens"],
    "answer": "Samples from k most likely tokens",
    "hint": "k=50 common."
  },
  {
    "type": "mcq",
    "question": "Top-p (nucleus) sampling:",
    "options": ["Fixed k tokens", "Cumulative probability p threshold", "All tokens", "Lowest probability"],
    "answer": "Cumulative probability p threshold",
    "hint": "p=0.9 includes top tokens summing to 90%."
  },
  {
    "type": "mcq",
    "question": "Zero-shot prompting means:",
    "options": ["No examples", "Task description only", "Fine-tuning first", "100 examples"],
    "answer": "Task description only",
    "hint": "\"Translate to French: Hello\""
  },
  {
    "type": "mcq",
    "question": "Few-shot prompting provides:",
    "options": ["Task description only", "Few input-output examples", "Full training data", "No prompt"],
    "answer": "Few input-output examples",
    "hint": "3-5 examples in prompt."
  },
  {
    "type": "mcq",
    "question": "LLM hallucination refers to:",
    "options": ["Perfect answers", "Confidently wrong information", "Slow generation", "Token overflow"],
    "answer": "Confidently wrong information",
    "hint": "Makes up plausible facts."
  },
  {
    "type": "mcq",
    "question": "Instruction tuning teaches LLMs to:",
    "options": ["Ignore instructions", "Follow user commands", "Generate code only", "Summarize only"],
    "answer": "Follow user commands",
    "hint": "\"Write a poem about cats:\" → poem."
  },
  {
    "type": "mcq",
    "question": "RLHF aligns LLMs using:",
    "options": ["More pre-training", "Human preference feedback", "Random sampling", "Accuracy metrics"],
    "answer": "Human preference feedback",
    "hint": "Reinforcement Learning from Human Feedback."
  },
  {
    "type": "mcq",
    "question": "Pre-training phase goal:",
    "options": ["Specific tasks", "Learn language patterns from raw text", "Follow instructions", "Reduce parameters"],
    "answer": "Learn language patterns from raw text",
    "hint": "Next token prediction."
  },
  {
    "type": "mcq",
    "question": "Fine-tuning adapts LLM for:",
    "options": ["General language", "Specific tasks/domains", "Reduce size", "Increase speed"],
    "answer": "Specific tasks/domains",
    "hint": "\"MedicalBERT\" for healthcare."
  },
  {
    "type": "mcq",
    "question": "KV cache speeds up LLM inference by:",
    "options": ["Reducing parameters", "Caching attention keys/values", "Smaller vocabulary", "Faster tokenization"],
    "answer": "Caching attention keys/values",
    "hint": "Avoids recomputation."
  },
  {
    "type": "mcq",
    "question": "LLM parameter count example:",
    "options": ["100K", "7B, 70B, 175B+ parameters", "1 million", "10 parameters"],
    "answer": "7B, 70B, 175B+ parameters",
    "hint": "GPT-3 had 175 billion."
  },
  {
    "type": "mcq",
    "question": "Why subword tokenization?",
    "options": ["Fixed vocabulary", "Handles rare/OOV words efficiently", "Faster processing", "Less memory"],
    "answer": "Handles rare/OOV words efficiently",
    "hint": "Vocabulary ~50K tokens."
  },
  {
    "type": "mcq",
    "question": "LLM autoregressive means:",
    "options": ["Bidirectional context", "Uses only previous tokens", "Future + past tokens", "No context"],
    "answer": "Uses only previous tokens",
    "hint": "Left-to-right generation."
  },
  {
    "type": "mcq",
    "question": "Prompt engineering optimizes:",
    "options": ["Model weights", "Input text for better outputs", "Tokenization", "Inference speed"],
    "answer": "Input text for better outputs",
    "hint": "Few-shot, chain-of-thought."
  },
  {
    "type": "mcq",
    "question": "Chain-of-Thought prompting improves:",
    "options": ["Simple classification", "Complex reasoning tasks", "Token speed", "Memory efficiency"],
    "answer": "Complex reasoning tasks",
    "hint": "\"Let's think step by step...\""
  },
  {
    "type": "mcq",
    "question": "LLM evaluation metrics include:",
    "options": ["Pixels only", "Perplexity, BLEU, ROUGE", "Image accuracy", "Audio SNR"],
    "answer": "Perplexity, BLEU, ROUGE",
    "hint": "Perplexity = exp(cross-entropy)."
  },
  {
    "type": "mcq",
    "question": "Perplexity measures:",
    "options": ["Generation speed", "Prediction confidence/fluency", "Token count", "Vocabulary size"],
    "answer": "Prediction confidence/fluency",
    "hint": "Lower = better."
  },
  {
    "type": "mcq",
    "question": "RAG (Retrieval Augmented Generation):",
    "options": ["LLM only", "LLM + external knowledge retrieval", "Fine-tuning method", "Tokenization"],
    "answer": "LLM + external knowledge retrieval",
    "hint": "Reduces hallucinations."
  },
  {
    "type": "mcq",
    "question": "LLM inference cost scales with:",
    "options": ["Input tokens only", "Output tokens quadratically", "Fixed cost", "Vocabulary size"],
    "answer": "Output tokens quadratically",
    "hint": "Autoregressive attention O(n²)."
  },
  {
    "type": "mcq",
    "question": "Quantization reduces LLM:",
    "options": ["Accuracy only", "Memory footprint (FP16→INT8)", "Speed", "Vocabulary"],
    "answer": "Memory footprint (FP16→INT8)",
    "hint": "4-bit quantization common."
  },
  {
    "type": "mcq",
    "question": "LoRA fine-tuning:",
    "options": ["Full parameter update", "Low-Rank Adaptation (small updates)", "Pre-training", "No fine-tuning"],
    "answer": "Low-Rank Adaptation (small updates)",
    "hint": "Efficient parameter-efficient tuning."
  },
  {
    "type": "mcq",
    "question": "LLM safety alignment techniques:",
    "options": ["Ignore ethics", "RLHF, constitutional AI, red-teaming", "More parameters", "Faster inference"],
    "answer": "RLHF, constitutional AI, red-teaming",
    "hint": "Prevent harmful outputs."
  },
  {
    "type": "mcq",
    "question": "System prompt defines LLM:",
    "options": ["Tokenization", "Role/personality/behavior", "Model weights", "Vocabulary"],
    "answer": "Role/personality/behavior",
    "hint": "\"You are helpful assistant...\""
  },
  {
    "type": "mcq",
    "question": "JSON mode in LLMs forces:",
    "options": ["Free text", "Structured JSON output", "Images", "Code only"],
    "answer": "Structured JSON output",
    "hint": "Reliable parsing."
  },
  {
    "type": "mcq",
    "question": "LLM function calling enables:",
    "options": ["Text only", "Tool use/API calls", "Image generation", "Audio"],
    "answer": "Tool use/API calls",
    "hint": "\"Call weather API for NYC\""
  },

  //RAG and Vector DB 

  {
    "type": "mcq",
    "question": "Zero-shot prompting means:",
    "options": ["0 examples provided", "Task description only, no examples", "Full training data", "100 examples"],
    "answer": "Task description only, no examples",
    "hint": "\"Translate to Spanish: Hello\""
  },
  {
    "type": "mcq",
    "question": "Few-shot prompting uses:",
    "options": ["No examples", "2-5 input-output examples in prompt", "Fine-tuning", "Long context"],
    "answer": "2-5 input-output examples in prompt",
    "hint": "Teaches by demonstration."
  },
  {
    "type": "mcq",
    "question": "System prompt defines LLM's:",
    "options": ["Tokenization", "Role, personality, behavior", "Model size", "Vocabulary"],
    "answer": "Role, personality, behavior",
    "hint": "\"You are a helpful assistant...\""
  },
  {
    "type": "mcq",
    "question": "Chain-of-Thought prompting improves:",
    "options": ["Token speed", "Complex reasoning via step-by-step", "Simple classification", "Memory usage"],
    "answer": "Complex reasoning via step-by-step",
    "hint": "\"Let's think step by step...\""
  },
  {
    "type": "mcq",
    "question": "Best practice for controlling output format:",
    "options": ["Hope for best", "Specify exact format in prompt", "Post-process output", "Use images"],
    "answer": "Specify exact format in prompt",
    "hint": "\"Respond in JSON: {name, age}\""
  },
  {
    "type": "mcq",
    "question": "Temperature parameter controls:",
    "options": ["Token length", "Randomness/creativity", "Speed", "Memory"],
    "answer": "Randomness/creativity",
    "hint": "0.1=deterministic, 1.0=creative."
  },
  {
    "type": "mcq",
    "question": "RAG Step 1: User provides:",
    "options": ["Documents", "Question/query", "Embeddings", "Vector DB"],
    "answer": "Question/query",
    "hint": "\"What is our refund policy?\""
  },
  {
    "type": "mcq",
    "question": "RAG Step 2: System performs:",
    "options": ["Generate answer", "Vector search on documents", "Fine-tuning", "Tokenization"],
    "answer": "Vector search on documents",
    "hint": "Query → embedding → similarity search."
  },
  {
    "type": "mcq",
    "question": "RAG Step 3: Retrieved documents are:",
    "options": ["Deleted", "Added to LLM prompt context", "Summarized separately", "Ignored"],
    "answer": "Added to LLM prompt context",
    "hint": "\"Based on these docs: [docs] answer...\""
  },
  {
    "type": "mcq",
    "question": "Primary RAG benefit:",
    "options": ["Faster training", "Reduces LLM hallucination", "Smaller models", "More parameters"],
    "answer": "Reduces LLM hallucination",
    "hint": "Grounds answers in real documents."
  },
  {
    "type": "mcq",
    "question": "Vector Database stores:",
    "options": ["Raw text documents", "Embeddings/vectors", "SQL tables", "Images"],
    "answer": "Embeddings/vectors",
    "hint": "High-dimensional number arrays."
  },
  {
    "type": "mcq",
    "question": "Vector DB main function:",
    "options": ["Exact keyword match", "Find similar vectors (semantic search)", "Count documents", "Sort alphabetically"],
    "answer": "Find similar vectors (semantic search)",
    "hint": "\"refund policy\" → refund docs."
  },
  {
    "type": "mcq",
    "question": "Vector DB example: \"refund policy\" retrieves:",
    "options": ["Only exact matches", "refund docs, cancellation terms, payment rules", "First 10 docs", "Random docs"],
    "answer": "refund docs, cancellation terms, payment rules",
    "hint": "Semantic similarity."
  },
  {
    "type": "mcq",
    "question": "Prompt engineering example: Input + examples →",
    "options": ["Worse output", "Better structured output", "Longer output", "Random output"],
    "answer": "Better structured output",
    "hint": "Few-shot learning effect."
  },
  {
    "type": "mcq",
    "question": "Top-k sampling considers:",
    "options": ["All tokens", "k most probable tokens", "Lowest probability", "Random tokens"],
    "answer": "k most probable tokens",
    "hint": "k=40, 50 common values."
  },
  {
    "type": "mcq",
    "question": "RAG solves company knowledge problem by:",
    "options": ["Retraining LLM", "Indexing company docs in vector DB", "Longer prompts", "More parameters"],
    "answer": "Indexing company docs in vector DB",
    "hint": "No retraining needed."
  },
  {
    "type": "mcq",
    "question": "Vector DB similarity metric:",
    "options": ["Alphabetical", "Cosine similarity", "Word count", "File size"],
    "answer": "Cosine similarity",
    "hint": "Direction > magnitude."
  },
  {
    "type": "mcq",
    "question": "One-shot prompting uses:",
    "options": ["No examples", "Single input-output example", "5+ examples", "Task description only"],
    "answer": "Single input-output example",
    "hint": "Between zero/few-shot."
  },
  {
    "type": "mcq",
    "question": "RAG pipeline improves accuracy by:",
    "options": ["Random documents", "Providing relevant context to LLM", "Shorter prompts", "Less computation"],
    "answer": "Providing relevant context to LLM",
    "hint": "Ground truth in prompt."
  },
  {
    "type": "mcq",
    "question": "Vector DB indexing methods include:",
    "options": ["Binary search", "HNSW, IVF, PQ", "SQL indexes", "Hash tables only"],
    "answer": "HNSW, IVF, PQ",
    "hint": "Approximate nearest neighbors."
  },
  {
    "type": "mcq",
    "question": "Role prompting example:",
    "options": ["You are Claude", "You are expert Python developer", "Generate code", "Summarize text"],
    "answer": "You are expert Python developer",
    "hint": "Sets LLM persona."
  },
  {
    "type": "mcq",
    "question": "Hybrid search combines:",
    "options": ["Vector + keyword search", "Two vector DBs", "SQL + NoSQL", "Images + text"],
    "answer": "Vector + keyword search",
    "hint": "BM25 + cosine similarity."
  },
  {
    "type": "mcq",
    "question": "Prompt chaining breaks complex tasks into:",
    "options": ["Single prompt", "Sequential simpler prompts", "Parallel prompts", "Random order"],
    "answer": "Sequential simpler prompts",
    "hint": "\"First summarize, then analyze...\""
  },
  {
    "type": "mcq",
    "question": "Vector DB chunking strategy splits documents into:",
    "options": ["Single token chunks", "Fixed-size overlapping chunks", "Whole documents", "Random sizes"],
    "answer": "Fixed-size overlapping chunks",
    "hint": "500-1000 tokens common."
  },
  {
    "type": "mcq",
    "question": "JSON mode forcing ensures:",
    "options": ["Free text output", "Valid JSON structure", "HTML output", "Markdown"],
    "answer": "Valid JSON structure",
    "hint": "\"Respond only in JSON format:\"."
  },
  {
    "type": "mcq",
    "question": "RAG evaluation metrics:",
    "options": ["Speed only", "Context precision, faithfulness, answer relevance", "Token count", "Model size"],
    "answer": "Context precision, faithfulness, answer relevance",
    "hint": "RAGAS framework."
  },
  {
    "type": "mcq",
    "question": "Negative prompting avoids:",
    "options": ["Good outputs", "Unwanted content/styles", "Long answers", "Structured output"],
    "answer": "Unwanted content/styles",
    "hint": "\"Don't use bullet points\""
  },
  {
    "type": "mcq",
    "question": "Pinecone is example of:",
    "options": ["Embedding model", "Managed vector database", "LLM", "Tokenizer"],
    "answer": "Managed vector database",
    "hint": "Cloud vector search service."
  },
  {
    "type": "mcq",
    "question": "Few-shot prompting works because LLMs:",
    "options": ["Forget examples", "Learn in-context from examples", "Ignore examples", "Need fine-tuning"],
    "answer": "Learn in-context from examples",
    "hint": "Pattern matching ability."
  },
  {
    "type": "mcq",
    "question": "Vector DB metadata filtering:",
    "options": ["Only similarity", "Similarity + filters (date, user, etc.)", "Keyword only", "Random"],
    "answer": "Similarity + filters (date, user, etc.)",
    "hint": "\"refund docs WHERE date > 2024\""
  },
  {
    "type": "mcq",
    "question": "Self-consistency prompting:",
    "options": ["Single answer", "Multiple reasoning paths, majority vote", "Random answers", "No reasoning"],
    "answer": "Multiple reasoning paths, majority vote",
    "hint": "Improves reasoning accuracy."
  },
  {
    "type": "mcq",
    "question": "RAG vs fine-tuning tradeoff:",
    "options": ["RAG needs retraining", "RAG: dynamic knowledge; Fine-tuning: static", "Same performance", "RAG slower"],
    "answer": "RAG: dynamic knowledge; Fine-tuning: static",
    "hint": "RAG updates docs, no retraining."
  },
  {
    "type": "mcq",
    "question": "FAISS library provides:",
    "options": ["LLM training", "CPU/GPU vector similarity search", "Tokenization", "Prompt templates"],
    "answer": "CPU/GPU vector similarity search",
    "hint": "Facebook AI Similarity Search."
  },
  {
    "type": "mcq",
    "question": "Generated Knowledge prompting:",
    "options": ["Use external docs", "LLM generates its own context first", "No context", "Few-shot only"],
    "answer": "LLM generates its own context first",
    "hint": "\"First write what you know about X, then answer...\""
  },
  {
    "type": "mcq",
    "question": "Vector DB re-ranking:",
    "options": ["Final results", "Re-score top-k results with better model", "Skip similarity", "Random order"],
    "answer": "Re-score top-k results with better model",
    "hint": "Cross-encoder > bi-encoder."
  },
  {
    "type": "mcq",
    "question": "Tree-of-Thoughts extends chain-of-thought by:",
    "options": ["Linear reasoning", "Branching reasoning paths + search", "Single step", "No reasoning"],
    "answer": "Branching reasoning paths + search",
    "hint": "Explore multiple solution paths."
  },
  {
    "type": "mcq",
    "question": "RAG chunk overlap prevents:",
    "options": ["Too many chunks", "Context splitting across chunks", "Large chunks", "Small chunks"],
    "answer": "Context splitting across chunks",
    "hint": "100-200 token overlap common."
  },
  {
    "type": "mcq",
    "question": "Automatic prompt engineering:",
    "options": ["Manual only", "Evolutionary algorithms optimize prompts", "Fixed templates", "No optimization"],
    "answer": "Evolutionary algorithms optimize prompts",
    "hint": "APE, OPRO methods."
  },
  {
    "type": "mcq",
    "question": "HNSW indexing advantage:",
    "options": ["Slow exact search", "Fast approximate nearest neighbors", "Low memory", "Small datasets only"],
    "answer": "Fast approximate nearest neighbors",
    "hint": "Hierarchical Navigable Small World."
  },
  {
    "type": "mcq",
    "question": "Prompt compression reduces:",
    "options": ["Model quality", "Context length via LLM summarization", "Token prices", "Vector size"],
    "answer": "Context length via LLM summarization",
    "hint": "LLMLingua technique."
  },
  {
    "type": "mcq",
    "question": "Vector DB hybrid search weights:",
    "options": ["Fixed 50/50", "Configurable keyword + vector weights", "Vector only", "Keyword only"],
    "answer": "Configurable keyword + vector weights",
    "hint": "α*BM25 + (1-α)*cosine."
  },

  //Python for ML AI

  {
    "type": "mcq",
    "question": "List comprehension [x*x for x in range(5)] produces:",
    "options": ["[0,1,2,3,4]", "[0,1,4,9,16]", "[1,4,9,16,25]", "[5,4,3,2,1]"],
    "answer": "[0,1,4,9,16]",
    "hint": "Squares numbers 0-4."
  },
  {
    "type": "mcq",
    "question": "map() function applies function to:",
    "options": ["Single value", "Each item in iterable", "Dictionary keys only", "Sets only"],
    "answer": "Each item in iterable",
    "hint": "list(map(str, [1,2,3])) → ['1','2','3']"
  },
  {
    "type": "mcq",
    "question": "filter() returns items where function:",
    "options": ["Always True", "Returns True", "Returns False", "Is None"],
    "answer": "Returns True",
    "hint": "filter(lambda x: x>0, [-1,0,1]) → [1]"
  },
  {
    "type": "mcq",
    "question": "functools.reduce() does:",
    "options": ["Sums list", "Applies function cumulatively left-to-right", "Filters items", "Maps function"],
    "answer": "Applies function cumulatively left-to-right",
    "hint": "reduce(lambda x,y: x+y, [1,2,3]) → 6"
  },
  {
    "type": "mcq",
    "question": "Generator expression syntax:",
    "options": ["[x for x in range(5)]", "(x for x in range(5))", "{x for x in range(5)}", "gen(x for x in range(5))"],
    "answer": "(x for x in range(5))",
    "hint": "Memory efficient iteration."
  },
  {
    "type": "mcq",
    "question": "Generators use keyword:",
    "options": ["return", "yield", "next", "iter"],
    "answer": "yield",
    "hint": "yield pauses/resumes function."
  },
  {
    "type": "mcq",
    "question": "Iterator must implement:",
    "options": ["__next__()", "__iter__()", "Both", "Neither"],
    "answer": "Both",
    "hint": "Iterable → Iterator protocol."
  },
  {
    "type": "mcq",
    "question": "Stack data structure uses:",
    "options": ["Queue FIFO", "List with append/pop", "Dictionary", "Set"],
    "answer": "List with append/pop",
    "hint": "LIFO: Last In, First Out."
  },
  {
    "type": "mcq",
    "question": "Queue uses collections.deque with:",
    "options": ["append/pop", "append/popleft", "pop/pop", "appendleft/append"],
    "answer": "append/popleft",
    "hint": "FIFO: First In, First Out."
  },
  {
    "type": "mcq",
    "question": "Dictionary lookup time complexity:",
    "options": ["O(n)", "O(log n)", "O(1) average", "O(n^2)"],
    "answer": "O(1) average",
    "hint": "Hash table implementation."
  },
  {
    "type": "mcq",
    "question": "Set lookup complexity:",
    "options": ["O(n)", "O(1) average", "O(log n)", "O(n log n)"],
    "answer": "O(1) average",
    "hint": "Hash-based, no duplicates."
  },
  {
    "type": "mcq",
    "question": "List append time complexity:",
    "options": ["O(n)", "O(1) amortized", "O(log n)", "O(n^2)"],
    "answer": "O(1) amortized",
    "hint": "Dynamic array resizing."
  },
  {
    "type": "mcq",
    "question": "Binary search time complexity:",
    "options": ["O(n)", "O(log n)", "O(1)", "O(n log n)"],
    "answer": "O(log n)",
    "hint": "Requires sorted array."
  },
  {
    "type": "mcq",
    "question": "List comprehension with condition: even numbers:",
    "options": ["[x for x in range(10) if x%2==0]", "[x for x in range(10), x%2==0]", "filter(x%2==0, range(10))", "[x if x%2==0 for x in range(10)]"],
    "answer": "[x for x in range(10) if x%2==0]",
    "hint": "if after for clause."
  },
  {
    "type": "mcq",
    "question": "map(lambda x: x**2, [1,2,3]) returns:",
    "options": ["[1,4,9]", "[1,2,3]", "Generator object", "Error"],
    "answer": "Generator object",
    "hint": "Use list() to materialize."
  },
  {
    "type": "mcq",
    "question": "Nested list comprehension: 3x3 matrix:",
    "options": ["[[i,j] for i in range(3) for j in range(3)]", "[[i,j] for i in range(3), j in range(3)]", "[i,j for i in range(3) for j in range(3)]", "All wrong"],
    "answer": "[[i,j] for i in range(3) for j in range(3)]",
    "hint": "Read right-to-left."
  },
  {
    "type": "mcq",
    "question": "Generator advantage over list:",
    "options": ["Faster creation", "Memory efficient (lazy evaluation)", "Always faster", "More readable"],
    "answer": "Memory efficient (lazy evaluation)",
    "hint": "1 item at a time."
  },
  {
    "type": "mcq",
    "question": "Stack pop() removes:",
    "options": ["First element", "Last element (top)", "Random element", "Smallest element"],
    "answer": "Last element (top)",
    "hint": "LIFO principle."
  },
  {
    "type": "mcq",
    "question": "Queue append adds to:",
    "options": ["Front", "Back (right end)", "Random position", "Sorted position"],
    "answer": "Back (right end)",
    "hint": "FIFO principle."
  },
  {
    "type": "mcq",
    "question": "Set intersection operation:",
    "options": ["set1 | set2", "set1 & set2", "set1 - set2", "set1 ^ set2"],
    "answer": "set1 & set2",
    "hint": "Common elements."
  },
  {
    "type": "mcq",
    "question": "O(1) time complexity means:",
    "options": ["Linear time", "Constant time", "Logarithmic", "Quadratic"],
    "answer": "Constant time",
    "hint": "Independent of input size."
  },
  {
    "type": "mcq",
    "question": "O(n) example operation:",
    "options": ["Hash lookup", "Linear search", "Binary search", "Array access"],
    "answer": "Linear search",
    "hint": "Checks every element."
  },
  {
    "type": "mcq",
    "question": "Dictionary comprehension example:",
    "options": ["{x: x**2 for x in range(5)}", "[x: x**2 for x in range(5)]", "{x for x in range(5)}", "dict(x: x**2 for x in range(5))"],
    "answer": "{x: x**2 for x in range(5)}",
    "hint": "{0:0, 1:1, 2:4, 3:9, 4:16}"
  },
  {
    "type": "mcq",
    "question": "itertools.chain(*iterables) does:",
    "options": ["Sums iterables", "Concatenates multiple iterables", "Filters duplicates", "Maps function"],
    "answer": "Concatenates multiple iterables",
    "hint": "Flattens nested iteration."
  },
  {
    "type": "mcq",
    "question": "List slicing time complexity:",
    "options": ["O(1)", "O(n) where n=slice length", "O(log n)", "O(n^2)"],
    "answer": "O(n) where n=slice length",
    "hint": "Creates new list."
  },
  {
    "type": "mcq",
    "question": "Heapq implements:",
    "options": ["Stack", "Priority queue (min-heap)", "Circular queue", "Hash table"],
    "answer": "Priority queue (min-heap)",
    "hint": "heapq.heappush/pop."
  },
  {
    "type": "mcq",
    "question": "Set difference operation:",
    "options": ["set1 & set2", "set1 - set2", "set1 | set2", "set1 ^ set2"],
    "answer": "set1 - set2",
    "hint": "Elements in set1 not in set2."
  },
  {
    "type": "mcq",
    "question": "Generator expression memory usage:",
    "options": ["Same as list", "O(1) space (lazy)", "More than list", "Same as tuple"],
    "answer": "O(1) space (lazy)",
    "hint": "Processes 1 item at a time."
  },
  {
    "type": "mcq",
    "question": "Counter() from collections:",
    "options": ["Stack", "Dictionary subclass for counting", "Queue", "Set"],
    "answer": "Dictionary subclass for counting",
    "hint": "Counter('hello') → {'l':2, 'e':1}"
  },
  {
    "type": "mcq",
    "question": "Binary search requires:",
    "options": ["Unsorted list", "Sorted list", "Dictionary", "Set"],
    "answer": "Sorted list",
    "hint": "Halves search space."
  },
  {
    "type": "mcq",
    "question": "defaultdict advantage:",
    "options": ["Faster lookup", "No KeyError on missing keys", "Smaller memory", "Immutable"],
    "answer": "No KeyError on missing keys",
    "hint": "defaultdict(list)['new'].append(1)"
  },
  {
    "type": "mcq",
    "question": "List insert(0, x) time complexity:",
    "options": ["O(1)", "O(n) - shifts all elements", "O(log n)", "O(1) amortized"],
    "answer": "O(n) - shifts all elements",
    "hint": "Worst at beginning."
  },
  {
    "type": "mcq",
    "question": "enumerate() returns:",
    "options": ["Only indices", "Index-value pairs", "Values only", "Slices"],
    "answer": "Index-value pairs",
    "hint": "for i, v in enumerate(lst):"
  },
  {
    "type": "mcq",
    "question": "zip(*iterables) returns:",
    "options": ["Concatenation", "Tuples of parallel elements", "Sums", "Longest iterable"],
    "answer": "Tuples of parallel elements",
    "hint": "zip([1,2], ['a','b']) → [(1,'a'), (2,'b')]"
  },
  {
    "type": "mcq",
    "question": "O(log n) common in:",
    "options": ["Linear scan", "Binary search, balanced trees", "Hash lookup", "Nested loops"],
    "answer": "Binary search, balanced trees",
    "hint": "Halves search space each step."
  },
  {
    "type": "mcq",
    "question": "collections.deque best for:",
    "options": ["Random access", "Efficient append/pop from both ends", "Sorting", "Binary search"],
    "answer": "Efficient append/pop from both ends",
    "hint": "O(1) left/right operations."
  },
  {
    "type": "mcq",
    "question": "Set union operation:",
    "options": ["set1 & set2", "set1 | set2", "set1 - set2", "set1 ^ set2"],
    "answer": "set1 | set2",
    "hint": "All unique elements."
  },
  {
    "type": "mcq",
    "question": "any() returns True if:",
    "options": ["All elements True", "At least one element True", "None True", "Empty iterable"],
    "answer": "At least one element True",
    "hint": "Short-circuits on first True."
  },
  {
    "type": "mcq",
    "question": "List vs deque random access:",
    "options": ["List O(n), deque O(1)", "List O(1), deque O(n)", "Both O(1)", "Both O(n)"],
    "answer": "List O(1), deque O(n)",
    "hint": "List = array; deque = linked."
  },
  {
    "type": "mcq",
    "question": "islice() from itertools for:",
    "options": ["Infinite slicing", "Finite iterator slicing", "List slicing", "Set slicing"],
    "answer": "Finite iterator slicing",
    "hint": "Works with generators."
  },
  {
    "type": "mcq",
    "question": "Time complexity of sorting list:",
    "options": ["O(n)", "O(n log n)", "O(n^2)", "O(1)"],
    "answer": "O(n log n)",
    "hint": "Timsort algorithm."
  },
  {
    "type": "mcq",
    "question": "namedtuple advantage:",
    "options": ["Mutable", "Immutable, readable field access", "Fastest access", "Hashable"],
    "answer": "Immutable, readable field access",
    "hint": "Point(x=1, y=2).x"
  },

  //Context eng , agents , DL

  {
    "type": "mcq",
    "question": "Context Engineering combines:",
    "options": ["Prompts only", "Prompt+RAG+history+tools+memory", "Model weights only", "Tokenization"],
    "answer": "Prompt+RAG+history+tools+memory",
    "hint": "Optimal context for LLM."
  },
  {
    "type": "mcq",
    "question": "AI Agent definition:",
    "options": ["Static prompt responder", "LLM+tools+decision making system", "Vector database", "RAG only"],
    "answer": "LLM+tools+decision making system",
    "hint": "Perceives→thinks→acts loop."
  },
  {
    "type": "mcq",
    "question": "RLHF Step 1: Humans provide:",
    "options": ["Training data", "Preference rankings between responses", "Code", "Embeddings"],
    "answer": "Preference rankings between responses",
    "hint": "Response A > Response B"
  },
  {
    "type": "mcq",
    "question": "Neural network basic unit:",
    "options": ["Vector", "Neuron (weighted sum + activation)", "Token", "Embedding"],
    "answer": "Neuron (weighted sum + activation)",
    "hint": "σ(Wx + b)"
  },
  {
    "type": "mcq",
    "question": "Context window management prioritizes:",
    "options": ["Oldest messages", "Most relevant recent context", "All history equally", "Random"],
    "answer": "Most relevant recent context",
    "hint": "Relevance scoring + recency."
  },
  {
    "type": "mcq",
    "question": "AI Agent tool calling enables:",
    "options": ["Text only", "APIs, databases, code execution", "Images only", "Audio"],
    "answer": "APIs, databases, code execution",
    "hint": "Check weather API example. "
  },
  {
    "type": "mcq",
    "question": "RLHF reward model learns from:",
    "options": ["Next token prediction", "Human preference data", "Image labels", "Reinforcement signals"],
    "answer": "Human preference data",
    "hint": "Scores response quality."
  },
  {
    "type": "mcq",
    "question": "ReLU activation: f(x) =",
    "options": ["max(0,x)", "sigmoid(x)", "x if x>0 else 0", "Both A & C"],
    "answer": "max(0,x)",
    "hint": "Solves vanishing gradient."
  },
  {
    "type": "mcq",
    "question": "Agent memory systems store:",
    "options": ["Current prompt only", "Conversation history + facts + preferences", "Model weights", "Tokens"],
    "answer": "Conversation history + facts + preferences",
    "hint": "Short-term + long-term memory."
  },
  {
    "type": "mcq",
    "question": "Model Distillation transfers:",
    "options": ["Parameters directly", "Knowledge from teacher→student model", "Tokenization", "Embeddings"],
    "answer": "Knowledge from teacher→student model",
    "hint": "Large→small model."
  },
  {
    "type": "mcq",
    "question": "Agent reasoning loop:",
    "options": ["Single response", "Observe→Plan→Act→Observe", "RAG only", "Prompt only"],
    "answer": "Observe→Plan→Act→Observe",
    "hint": "ReAct framework."
  },
  {
    "type": "mcq",
    "question": "RLHF Step 3 uses:",
    "options": ["Supervised learning", "PPO reinforcement learning", "Next token prediction", "Clustering"],
    "answer": "PPO reinforcement learning",
    "hint": "Proximal Policy Optimization."
  },
  {
    "type": "mcq",
    "question": "Quantization converts:",
    "options": ["FP32→INT8 weights", "Tokens→embeddings", "Text→vectors", "Images→pixels"],
    "answer": "FP32→INT8 weights",
    "hint": "4x memory reduction."
  },
  {
    "type": "mcq",
    "question": "Context Engineering goal:",
    "options": ["Maximize tokens", "Give LLM optimal information", "Minimize cost", "Speed only"],
    "answer": "Give LLM optimal information",
    "hint": "Right data at right time."
  },
  {
    "type": "mcq",
    "question": "Agent tool use example:",
    "options": ["Write poem", "Call calculator for 234*567", "Summarize text", "Translate"],
    "answer": "Call calculator for 234*567",
    "hint": "Structured output parsing."
  },
  {
    "type": "mcq",
    "question": "Sigmoid activation range:",
    "options": ["[0,1]", "[-1,1]", "[0,∞)", "[-∞,∞)"],
    "answer": "[0,1]",
    "hint": "Probability output."
  },
  {
    "type": "mcq",
    "question": "Long-term memory in agents stores:",
    "options": ["Last 10 messages", "Facts, user preferences, key events", "Current prompt", "Tool results"],
    "answer": "Facts, user preferences, key events",
    "hint": "Vector DB or key-value."
  },
  {
    "type": "mcq",
    "question": "RLHF improves LLMs by aligning with:",
    "options": ["Accuracy only", "Human preferences", "Speed", "Token efficiency"],
    "answer": "Human preferences",
    "hint": "Helpful, harmless, honest."
  },
  {
    "type": "mcq",
    "question": "Batch Normalization normalizes:",
    "options": ["Across samples", "Per-layer activations", "Weights only", "Gradients"],
    "answer": "Per-layer activations",
    "hint": "Reduces internal covariate shift."
  },
  {
    "type": "mcq",
    "question": "Multi-agent systems coordinate via:",
    "options": ["Single LLM", "Shared memory + communication", "Independent operation", "No coordination"],
    "answer": "Shared memory + communication",
    "hint": "Agent teams for complex tasks."
  },
  {
    "type": "mcq",
    "question": "DPO (Direct Preference Optimization) alternative to:",
    "options": ["Pre-training", "RLHF (no separate reward model)", "Quantization", "Distillation"],
    "answer": "RLHF (no separate reward model)",
    "hint": "Directly optimizes preferences."
  },
  {
    "type": "mcq",
    "question": "Dropout regularization rate:",
    "options": ["0.1-0.2 common", "0.9 common", "1.0 (drop all)", "0.0 (no dropout)"],
    "answer": "0.1-0.2 common",
    "hint": "Randomly zeros neurons."
  },
  {
    "type": "mcq",
    "question": "Agent planning uses:",
    "options": ["Single step", "Chain-of-thought + tree search", "No reasoning", "RAG only"],
    "answer": "Chain-of-thought + tree search",
    "hint": "Tree-of-Thoughts, Monte Carlo."
  },
  {
    "type": "mcq",
    "question": "Knowledge Distillation loss:",
    "options": ["MSE only", "KL divergence teacher→student", "Cross-entropy only", "MAE"],
    "answer": "KL divergence teacher→student",
    "hint": "Soft targets from teacher."
  },
  {
    "type": "mcq",
    "question": "Context relevance scoring uses:",
    "options": ["Recency only", "Embedding similarity + recency", "Length only", "Random"],
    "answer": "Embedding similarity + recency",
    "hint": "Cosine similarity weighted."
  },
  {
    "type": "mcq",
    "question": "Agent reflection capability:",
    "options": ["Ignores past actions", "Critiques own performance", "No self-awareness", "Fixed behavior"],
    "answer": "Critiques own performance",
    "hint": "Self-improvement loop."
  },
  {
    "type": "mcq",
    "question": "Gradient clipping prevents:",
    "options": ["Vanishing gradients", "Exploding gradients", "Slow training", "Overfitting"],
    "answer": "Exploding gradients",
    "hint": "Caps gradient norm."
  },
  {
    "type": "mcq",
    "question": "Tool-calling JSON schema specifies:",
    "options": ["Free text", "Function parameters + types", "Return values only", "HTTP endpoints"],
    "answer": "Function parameters + types",
    "hint": "{'name': 'get_weather', 'parameters': {'type': 'object', 'properties': {...}}}"
  },
  {
    "type": "mcq",
    "question": "Learning rate scheduling:",
    "options": ["Fixed rate", "Decay over epochs", "Random", "Increase always"],
    "answer": "Decay over epochs",
    "hint": "Step decay, cosine annealing."
  },
  {
    "type": "mcq",
    "question": "Constitutional AI aligns via:",
    "options": ["Human feedback only", "AI-generated critiques + rules", "RL only", "No alignment"],
    "answer": "AI-generated critiques + rules",
    "hint": "Self-supervision principle."
  },
  {
    "type": "mcq",
    "question": "Early stopping monitors:",
    "options": ["Training loss only", "Validation loss", "Gradient norm", "Batch size"],
    "answer": "Validation loss",
    "hint": "Prevents overfitting."
  },
  {
    "type": "mcq",
    "question": "Hybrid RAG in context engineering uses:",
    "options": ["Vector search only", "Keyword+semantic search", "Random docs", "No retrieval"],
    "answer": "Keyword+semantic search",
    "hint": "BM25 + embeddings."
  },
  {
    "type": "mcq",
    "question": "Agent scaffolding frameworks:",
    "options": ["LangChain, LlamaIndex", "PyTorch only", "NumPy", "Pandas"],
    "answer": "LangChain, LlamaIndex",
    "hint": "Agent + RAG + memory."
  },
  {
    "type": "mcq",
    "question": "Adam optimizer combines:",
    "options": ["Momentum + RMSprop", "SGD only", "No adaptivity", "Fixed LR"],
    "answer": "Momentum + RMSprop",
    "hint": "Adaptive per-parameter LR."
  },
  {
    "type": "mcq",
    "question": "Memory eviction policy:",
    "options": ["Keep everything", "LRU (Least Recently Used)", "Random", "Largest first"],
    "answer": "LRU (Least Recently Used)",
    "hint": "Context window management."
  },
  {
    "type": "mcq",
    "question": "4-bit quantization achieves:",
    "options": ["No compression", "8x memory reduction vs FP32", "2x reduction", "Same memory"],
    "answer": "8x memory reduction vs FP32",
    "hint": "32→4 bits per parameter."
  },
  {
    "type": "mcq",
    "question": "Multi-agent debate improves:",
    "options": ["Speed", "Reasoning via disagreement", "Memory usage", "Token count"],
    "answer": "Reasoning via disagreement",
    "hint": "Multiple perspectives."
  },
  {
    "type": "mcq",
    "question": "LayerNorm vs BatchNorm:",
    "options": ["Same", "LayerNorm: per-sample; BatchNorm: per-batch", "BatchNorm better always", "No difference"],
    "answer": "LayerNorm: per-sample; BatchNorm: per-batch",
    "hint": "Transformers prefer LayerNorm."
  },
  {
    "type": "mcq",
    "question": "Process reward model in RLHF:",
    "options": ["Single response scoring", "Pairwise preference learning", "Next token prediction", "Classification"],
    "answer": "Pairwise preference learning",
    "hint": "P(preferred|pair) > 0.5"
  },
  {
    "type": "mcq",
    "question": "ReAct agent combines:",
    "options": ["Reasoning + Acting", "RAG + tools", "Memory + prompts", "Search + database"],
    "answer": "Reasoning + Acting",
    "hint": "Think→Act→Observe loop."
  },
  {
    "type": "mcq",
    "question": "Student model in distillation learns from:",
    "options": ["Hard labels only", "Teacher soft probabilities", "Random targets", "No labels"],
    "answer": "Teacher soft probabilities",
    "hint": "Dark knowledge transfer."
  },
  //Productio and AI MODEING

  {
    "type": "mcq",
    "question": "Model deployment via APIs enables:",
    "options": ["Local training only", "Real-time inference serving", "Batch processing only", "No monitoring"],
    "answer": "Real-time inference serving",
    "hint": "REST/gRPC endpoints."
  },
  {
    "type": "mcq",
    "question": "Inference latency measures:",
    "options": ["Training time", "Prediction time per request", "Model size", "Data loading"],
    "answer": "Prediction time per request",
    "hint": "Critical for user experience."
  },
  {
    "type": "mcq",
    "question": "Data drift occurs when:",
    "options": ["Model weights change", "Input data distribution shifts", "Output format changes", "API version updates"],
    "answer": "Input data distribution shifts",
    "hint": "Production vs training data."
  },
  {
    "type": "mcq",
    "question": "Model drift means:",
    "options": ["Input data changes", "Model performance degrades over time", "Faster inference", "More parameters"],
    "answer": "Model performance degrades over time",
    "hint": "Monitor accuracy metrics."
  },
  {
    "type": "mcq",
    "question": "A/B testing compares:",
    "options": ["Two model versions live", "Training vs inference", "Data drift types", "Latency only"],
    "answer": "Two model versions live",
    "hint": "Traffic split experiment."
  },
  {
    "type": "mcq",
    "question": "Feature store provides:",
    "options": ["Raw data storage", "Centralized ML features online/offline", "Model weights", "API endpoints"],
    "answer": "Centralized ML features online/offline",
    "hint": "Training + serving consistency."
  },
  {
    "type": "mcq",
    "question": "Multimodal models process:",
    "options": ["Text only", "Text+image+video+audio", "Code only", "Numbers only"],
    "answer": "Text+image+video+audio",
    "hint": "Unified embedding space."
  },
  {
    "type": "mcq",
    "question": "Small Language Models (SLMs) advantage:",
    "options": ["Slower inference", "Faster+cheaper+edge deployment", "More parameters", "Less accurate"],
    "answer": "Faster+cheaper+edge deployment",
    "hint": "1B-7B parameters typical."
  },
  {
    "type": "mcq",
    "question": "Edge AI runs models on:",
    "options": ["Cloud only", "Phones+devices+robots", "Servers only", "Mainframes"],
    "answer": "Phones+devices+robots",
    "hint": "Low latency, offline."
  },
  {
    "type": "mcq",
    "question": "Model monitoring tracks:",
    "options": ["Latency, accuracy, drift", "Only training loss", "Token count", "Vocabulary"],
    "answer": "Latency, accuracy, drift",
    "hint": "Production health metrics."
  },
  {
    "type": "mcq",
    "question": "Canary deployment strategy:",
    "options": ["All traffic new model", "Small % traffic to new model first", "A/B 50/50", "No testing"],
    "answer": "Small % traffic to new model first",
    "hint": "5-10% traffic initially."
  },
  {
    "type": "mcq",
    "question": "Shadow deployment:",
    "options": ["Live traffic", "Run new model parallel, compare predictions", "A/B testing", "Blue-green"],
    "answer": "Run new model parallel, compare predictions",
    "hint": "No production impact."
  },
  {
    "type": "mcq",
    "question": "Feature flags enable:",
    "options": ["Data drift", "Dynamic model switching", "More training data", "Slower inference"],
    "answer": "Dynamic model switching",
    "hint": "Roll forward/back."
  },
  {
    "type": "mcq",
    "question": "p95 latency means:",
    "options": ["Average", "95% requests < this time", "Worst case", "Median"],
    "answer": "95% requests < this time",
    "hint": "Better than average for outliers."
  },
  {
    "type": "mcq",
    "question": "Model versioning importance:",
    "options": ["No need", "Reproducibility + rollback", "Faster training", "More features"],
    "answer": "Reproducibility + rollback",
    "hint": "MLflow, Weights & Biases."
  },
  {
    "type": "mcq",
    "question": "Online feature store serves:",
    "options": ["Training data only", "Real-time inference features", "Historical data", "Model weights"],
    "answer": "Real-time inference features",
    "hint": "<100ms latency target."
  },
  {
    "type": "mcq",
    "question": "GPT-4o is example of:",
    "options": ["Text-only", "Multimodal (text+vision)", "Audio only", "Small model"],
    "answer": "Multimodal (text+vision)",
    "hint": "Unified token space."
  },
  {
    "type": "mcq",
    "question": "Phi-2 (2.7B) demonstrates:",
    "options": ["Need 100B+ params", "SLMs can match larger models", "Edge impossible", "Cloud only"],
    "answer": "SLMs can match larger models",
    "hint": "Quality instruction tuning."
  },
  {
    "type": "mcq",
    "question": "TensorRT optimization for:",
    "options": ["Training", "GPU inference speed", "CPU only", "Cloud only"],
    "answer": "GPU inference speed",
    "hint": "2-5x faster typically."
  },
  {
    "type": "mcq",
    "question": "Concept drift detection uses:",
    "options": ["Training loss", "Input/output distribution stats", "Latency", "Token count"],
    "answer": "Input/output distribution stats",
    "hint": "KS test, PSI metrics."
  },
  {
    "type": "mcq",
    "question": "Blue-green deployment:",
    "options": ["Single version live", "Two identical environments, switch traffic", "Gradual rollout", "No downtime"],
    "answer": "Two identical environments, switch traffic",
    "hint": "Zero-downtime deploys."
  },
  {
    "type": "mcq",
    "question": "Model registry stores:",
    "options": ["Features only", "Model artifacts + metadata + lineage", "Raw data", "API specs"],
    "answer": "Model artifacts + metadata + lineage",
    "hint": "MLflow Model Registry."
  },
  {
    "type": "mcq",
    "question": "ONNX format enables:",
    "options": ["PyTorch only", "Model interoperability (PyTorch→TensorFlow)", "Training only", "No export"],
    "answer": "Model interoperability (PyTorch→TensorFlow)",
    "hint": "Framework agnostic."
  },
  {
    "type": "mcq",
    "question": "vLLM serving framework advantage:",
    "options": ["CPU only", "Paged attention, 2-4x throughput", "Training focus", "Small models"],
    "answer": "Paged attention, 2-4x throughput",
    "hint": "Continuous batching."
  },
  {
    "type": "mcq",
    "question": "Guardrail monitoring detects:",
    "options": ["Fast responses", "Safety violations, PII, toxicity", "High accuracy", "Low latency"],
    "answer": "Safety violations, PII, toxicity",
    "hint": "Production safety layer."
  },
  {
    "type": "mcq",
    "question": "Multi-modal fusion example:",
    "options": ["Text only", "Image captioning from vision+language", "Audio only", "Numbers"],
    "answer": "Image captioning from vision+language",
    "hint": "CLIP-style models."
  },
  {
    "type": "mcq",
    "question": "Edge TPU runs:",
    "options": ["Cloud models", "Quantized INT8 models", "FP32 only", "100B param models"],
    "answer": "Quantized INT8 models",
    "hint": "Coral Edge TPU."
  },
  {
    "type": "mcq",
    "question": "Ray Serve advantage:",
    "options": ["Training only", "Distributed model serving", "Single GPU", "CPU only"],
    "answer": "Distributed model serving",
    "hint": "Python-native scaling."
  },
  {
    "type": "mcq",
    "question": "Drift detection window:",
    "options": ["1 request", "Rolling window (hours-days)", "All history", "Weekly"],
    "answer": "Rolling window (hours-days)",
    "hint": "Balance sensitivity/stability."
  },
  {
    "type": "mcq",
    "question": "KS test measures:",
    "options": ["Mean difference", "Max distribution difference", "Variance", "Correlation"],
    "answer": "Max distribution difference",
    "hint": "Kolmogorov-Smirnov test."
  },
  {
    "type": "mcq",
    "question": "Feature store consistency guarantees:",
    "options": ["Training/serving skew", "Same features for training+serving", "Different features", "No guarantees"],
    "answer": "Same features for training+serving",
    "hint": "Prevents skew."
  },
  {
    "type": "mcq",
    "question": "Llama.cpp enables:",
    "options": ["Cloud only", "CPU/GPU/Edge LLM inference", "Training only", "PyTorch only"],
    "answer": "CPU/GPU/Edge LLM inference",
    "hint": "GGUF format."
  },
  {
    "type": "mcq",
    "question": "Whisper model processes:",
    "options": ["Text only", "Audio→text transcription", "Images", "Video"],
    "answer": "Audio→text transcription",
    "hint": "Multimodal audio+language."
  },
  {
    "type": "mcq",
    "question": "Model card documents:",
    "options": ["Code only", "Model capabilities, limitations, ethics", "Training data only", "API endpoints"],
    "answer": "Model capabilities, limitations, ethics",
    "hint": "Responsible AI."
  },
  {
    "type": "mcq",
    "question": "Triton Inference Server supports:",
    "options": ["PyTorch only", "Multiple frameworks (TensorFlow/PyTorch/ONNX)", "CPU only", "Training"],
    "answer": "Multiple frameworks (TensorFlow/PyTorch/ONNX)",
    "hint": "NVIDIA GPU optimized."
  },
  {
    "type": "mcq",
    "question": "SLM fine-tuning advantage:",
    "options": ["Can't fine-tune", "Custom domain adaptation cheaper", "Same cost as LLM", "No improvement"],
    "answer": "Custom domain adaptation cheaper",
    "hint": "Fewer parameters."
  },
  {
    "type": "mcq",
    "question": "CoreML deployment target:",
    "options": ["Cloud", "Apple devices (iOS/macOS)", "Android", "Linux servers"],
    "answer": "Apple devices (iOS/macOS)",
    "hint": "On-device ML."
  },
  {
    "type": "mcq",
    "question": "Prompt caching optimization:",
    "options": ["Slower", "Reuses KV cache for repeated prompts", "More memory", "No effect"],
    "answer": "Reuses KV cache for repeated prompts",
    "hint": "Chat template optimization."
  },
  {
    "type": "mcq",
    "question": "SLO (Service Level Objective) example:",
    "options": ["99.9% requests < 200ms", "100% accuracy", "0 drift", "Max parameters"],
    "answer": "99.9% requests < 200ms",
    "hint": "Latency reliability target."
  },
  {
    "type": "mcq",
    "question": "FLOPs measures:",
    "options": ["Memory usage", "Floating point operations per inference", "Token count", "Accuracy"],
    "answer": "Floating point operations per inference",
    "hint": "Compute cost metric."
  },
  {
    "type": "mcq",
    "question": "OpenVINO toolkit optimizes for:",
    "options": ["GPU only", "Intel hardware (CPU/VPU)", "Mobile only", "Cloud only"],
    "answer": "Intel hardware (CPU/VPU)",
    "hint": "Model optimization."
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
