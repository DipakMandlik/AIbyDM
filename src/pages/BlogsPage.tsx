import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Search, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';

const blogs = [
  {
    id: 1,
    title: "Getting Started with Generative AI: A Beginner's Guide",
    excerpt: "Learn the basics of generative AI models and how they're transforming creative work across industries.",
    content: "# Getting Started with Generative AI\n\nGenerative AI refers to artificial intelligence systems that can generate new content, such as text, images, audio, or video. Unlike traditional AI systems that analyze or classify existing data, generative AI creates new content based on patterns it has learned.\n\n## How Generative AI Works\n\nAt the core of most generative AI systems are models called generative models. These models learn the patterns and structures in their training data and then generate new examples that follow those patterns. The most popular approaches include:\n\n- **Generative Adversarial Networks (GANs)**: These consist of two neural networks—a generator and a discriminator—that work against each other. The generator creates content, and the discriminator evaluates how realistic it is. Through this adversarial process, the generator improves over time.\n\n- **Variational Autoencoders (VAEs)**: These compress input data into a compact representation and then reconstruct it, learning to generate new data with similar properties.\n\n- **Transformer Models**: These have become dominant for text generation and are behind models like GPT (Generative Pre-trained Transformer). They use self-attention mechanisms to understand relationships between elements in a sequence.\n\n## Popular Generative AI Tools\n\n1. **ChatGPT/GPT-4**: Developed by OpenAI, these models can generate human-like text, write essays, answer questions, and even write code.\n\n2. **DALL-E**: Created by OpenAI, DALL-E generates images from text descriptions. You can ask for \"a cat riding a unicycle\" or \"a futuristic cityscape,\" and it will create corresponding images.\n\n3. **Midjourney**: Another AI image generator that creates highly detailed and artistic images based on text prompts.\n\n4. **Runway ML**: Offers various generative tools for creative professionals, including text-to-image generation and video editing capabilities.\n\n## Getting Started with Generative AI\n\nIf you're new to generative AI, here are some steps to get started:\n\n1. **Experiment with Available Tools**: Many generative AI tools offer free tiers or trials. Start by experimenting with ChatGPT, DALL-E, or Midjourney to get a feel for what these systems can do.\n\n2. **Learn the Basics of Prompting**: The way you phrase your requests (prompts) significantly affects the output of generative AI systems. Learn about effective prompting techniques.\n\n3. **Understand the Limitations**: Generative AI can produce impressive results, but it also has limitations and can make mistakes. Understanding these boundaries will help you use these tools more effectively.\n\n4. **Consider Ethical Implications**: Be aware of potential biases, copyright issues, and ethical considerations when using generative AI.\n\n## Conclusion\n\nGenerative AI is transforming how we create content and solve problems. Whether you're a designer, writer, developer, or business professional, understanding these tools can open up new possibilities for innovation and creativity. As you continue your journey with generative AI, remember that the field is rapidly evolving, with new models and capabilities emerging regularly.",
    date: 'June 25, 2025',
    readTime: '6 min read',
    category: 'Beginners',
    tags: ['Generative AI', 'ChatGPT', 'DALL-E', 'Midjourney'],
    image: 'https://images.unsplash.com/photo-1677442135143-6a667704d46d?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 2,
    title: 'How to Use AI to Automate Your Daily Tasks',
    excerpt: 'Discover practical ways to integrate AI tools into your workflow to save time and boost productivity.',
    content: "# How to Use AI to Automate Your Daily Tasks\n\nAI has evolved from a futuristic concept to an everyday tool that can dramatically improve your productivity and efficiency. This guide will show you practical ways to use AI to automate routine tasks and free up your time for more meaningful work.\n\n## Email Management and Communication\n\n### Smart Email Sorting and Responses\n\nAI tools can help you manage your inbox by:\n\n- **Automatically categorizing emails** using tools like Gmail's AI-powered filters or third-party apps like Clean Email\n- **Generating email responses** with ChatGPT or Gmail's Smart Compose feature\n- **Scheduling emails** based on optimal send times with tools like Boomerang or Mailbutler\n\n### Meeting Management\n\n- **AI meeting assistants** like Otter.ai or Fireflies.ai can transcribe and summarize meetings in real-time\n- **Smart scheduling tools** like Clara or x.ai can handle the back-and-forth of setting up meetings\n- **Meeting preparation** can be enhanced with AI tools that compile relevant information and briefing materials\n\n## Content Creation and Management\n\n### Writing Assistance\n\n- **Generate first drafts** of reports, blog posts, or social media content using ChatGPT or specialized tools like Jasper\n- **Improve your writing** with grammar and style checkers like Grammarly or ProWritingAid\n- **Translate content** automatically with DeepL or Google Translate\n\n### Image and Video Creation\n\n- **Create custom images** with AI tools like DALL-E, Midjourney, or Canva's Magic Media\n- **Generate video content** with tools like Synthesia or Lumen5\n- **Edit photos and videos** with AI-powered tools like Adobe's Generative Fill or Runway ML\n\n## Data Processing and Analysis\n\n### Data Extraction and Processing\n\n- **Extract data from documents** using tools like Amazon Textract or Google Document AI\n- **Process and clean data** with automated tools like Trifacta or Alteryx\n- **Convert formats** (e.g., PDF to spreadsheet) with AI-powered converters\n\n### Data Analysis and Visualization\n\n- **Generate insights from data** using tools like Obviously AI or MindsDB\n- **Create data visualizations** with minimal effort using tools like Quill or Narrative Science\n- **Build predictive models** without coding using AutoML platforms like Google AutoML or DataRobot\n\n## Workflow Automation with AI\n\n### No-Code Automation\n\n- **Connect different services** with tools like n8n, Zapier, or Make (formerly Integromat)\n- **Create custom workflows** that trigger based on specific events\n- **Automate document processing** for invoices, receipts, and other business documents\n\n### Personal Productivity\n\n- **AI-powered to-do lists** like Todoist or TickTick can prioritize your tasks\n- **Note-taking and organization** can be enhanced with tools like Notion AI or Mem.ai\n- **Time management** can be optimized with AI tools that analyze how you spend your time\n\n## Getting Started with AI Automation\n\n1. **Identify repetitive tasks**: Start by listing the routine tasks that consume your time\n2. **Start small**: Choose one or two simple tasks to automate first\n3. **Experiment with different tools**: Try several options to find what works best for your needs\n4. **Gradually expand**: As you become comfortable, add more automation to your workflow\n5. **Regularly review and optimize**: Refine your automation processes as tools evolve and your needs change\n\n## Conclusion\n\nAI automation isn't about replacing humans but augmenting human capabilities and freeing up time for more creative and strategic work. By thoughtfully implementing AI tools in your daily workflow, you can reduce routine busywork, minimize errors, and focus on what matters most. Start small, learn as you go, and watch your productivity soar as AI handles more of your repetitive tasks.",
    date: 'June 21, 2025',
    readTime: '8 min read',
    category: 'Productivity',
    tags: ['Automation', 'Productivity', 'Workflow', 'AI Tools'],
    image: 'https://images.unsplash.com/photo-1680169291272-0dba6a2ef5cd?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 3,
    title: 'The Future of AI in Healthcare: Trends to Watch',
    excerpt: 'Explore how artificial intelligence is revolutionizing healthcare through diagnostics, treatment, and patient care.',
    content: "# The Future of AI in Healthcare: Trends to Watch\n\nArtificial intelligence is transforming healthcare at an unprecedented pace, improving diagnostics, treatment planning, patient care, and administrative processes. This article explores the most important trends and innovations in AI healthcare applications that are shaping the future of medicine.\n\n## Diagnostic Innovation\n\n### Medical Imaging Analysis\n\nAI excels at analyzing medical images, often detecting patterns that may escape the human eye:\n\n- **Radiology**: AI systems can detect abnormalities in X-rays, CT scans, and MRIs with increasing accuracy, helping radiologists identify conditions like cancer, fractures, and neurological disorders earlier.\n\n- **Pathology**: Digital pathology combined with AI helps analyze tissue samples more quickly and accurately, improving cancer diagnosis and classification.\n\n- **Ophthalmology**: AI tools can analyze retinal images to detect diseases like diabetic retinopathy, often before symptoms are noticeable to patients.\n\n### Predictive Diagnostics\n\nAI systems are increasingly able to predict health issues before they become serious:\n\n- **Early disease detection** through pattern recognition in patient data\n- **Risk assessment models** that identify patients at higher risk for specific conditions\n- **Monitoring systems** that detect subtle changes in patient health data\n\n## Personalized Treatment\n\n### Precision Medicine\n\nAI is enabling truly personalized healthcare approaches:\n\n- **Genomic analysis** to tailor treatments based on a patient's genetic makeup\n- **Drug response prediction** to determine which medications will be most effective\n- **Treatment optimization** that considers multiple factors from a patient's health history\n\n### Drug Discovery and Development\n\nAI is revolutionizing how new treatments are created:\n\n- **Accelerated drug discovery** through simulation and modeling\n- **Repurposing existing drugs** for new applications\n- **Clinical trial optimization** to identify suitable participants and predict outcomes\n\n## Enhanced Patient Care\n\n### Remote Monitoring and Telehealth\n\nAI is extending care beyond hospital walls:\n\n- **Smart wearables** that continuously monitor vital signs and alert to concerning changes\n- **Virtual nursing assistants** that provide basic care guidance and medication reminders\n- **Telehealth platforms** enhanced with AI to provide more comprehensive remote care\n\n### Mental Health Applications\n\nMental healthcare is being transformed through AI applications:\n\n- **Mood tracking and early intervention tools**\n- **Chatbots and virtual therapists** providing support between sessions\n- **Voice and text analysis** to detect signs of depression, anxiety, or other conditions\n\n## Healthcare Operations and Administration\n\n### Workflow Optimization\n\nAI is making healthcare delivery more efficient:\n\n- **Scheduling optimization** to reduce wait times and maximize resource utilization\n- **Documentation automation** through voice recognition and natural language processing\n- **Supply chain management** to ensure critical supplies are always available\n\n### Fraud Detection and Security\n\nProtecting healthcare systems and patient data:\n\n- **Billing anomaly detection** to identify fraudulent claims\n- **Enhanced cybersecurity** to protect sensitive patient information\n- **Access monitoring** to ensure appropriate use of medical records\n\n## Ethical Considerations and Challenges\n\nAs AI becomes more integrated into healthcare, several important issues must be addressed:\n\n- **Privacy and data security** concerns around sensitive health information\n- **Algorithmic bias** that could lead to healthcare disparities\n- **Regulatory frameworks** that ensure AI systems are safe and effective\n- **Human-AI collaboration models** that leverage the strengths of both\n\n## The Road Ahead\n\nThe future of AI in healthcare promises continued innovation:\n\n- **Increased adoption** of AI tools across all healthcare specialties\n- **More sophisticated integration** between different AI systems\n- **Greater patient involvement** in AI-assisted healthcare decisions\n- **Expanded access** to quality healthcare through AI-enabled services\n\n## Conclusion\n\nAI is not replacing healthcare professionals but augmenting their capabilities, allowing them to provide better, more personalized care to more patients. As these technologies continue to evolve, we can expect healthcare to become more predictive, preventative, personalized, and accessible. The key to successful implementation will be thoughtful integration that prioritizes patient outcomes while addressing ethical concerns and ensuring that the human touch remains central to healthcare delivery.",
    date: 'June 18, 2025',
    readTime: '10 min read',
    category: 'Industry',
    tags: ['Healthcare', 'Medical AI', 'Diagnostics', 'Patient Care'],
    image: 'https://images.unsplash.com/photo-1576671414121-aa2d7c11c5b4?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 4,
    title: 'Understanding the Basics of Neural Networks',
    excerpt: 'A clear explanation of how neural networks function and why they form the backbone of modern AI systems.',
    content: "# Understanding the Basics of Neural Networks\n\nNeural networks are the foundation of many modern AI systems, from image recognition to language models. Despite their sophisticated capabilities, the core concepts behind neural networks are accessible with some basic understanding. This article explains how neural networks work and why they're so powerful.\n\n## What Are Neural Networks?\n\nNeural networks are computational systems inspired by the human brain. They consist of interconnected nodes or \"neurons\" organized in layers that process information and learn patterns from data. The key components include:\n\n- **Input Layer**: Receives the initial data (like pixel values in an image)\n- **Hidden Layers**: Process the information through various transformations\n- **Output Layer**: Produces the final result (like classification predictions)\n\nThe power of neural networks comes from their ability to automatically learn representations of data without being explicitly programmed with rules.\n\n## How Neural Networks Learn\n\n### The Training Process\n\nNeural networks learn through a process called training, which involves:\n\n1. **Forward Propagation**: Data passes through the network, with each layer performing calculations and passing results to the next layer\n\n2. **Error Calculation**: The network's output is compared to the desired output to determine the error\n\n3. **Backpropagation**: The error is propagated backward through the network to adjust the weights\n\n4. **Weight Updates**: The connections between neurons (weights) are adjusted to reduce the error\n\n5. **Iteration**: This process repeats many times with many examples until the network learns to make accurate predictions\n\n### Activation Functions\n\nActivation functions introduce non-linearity into the network, allowing it to learn complex patterns:\n\n- **ReLU (Rectified Linear Unit)**: The most common activation function, which outputs the input if positive, otherwise outputs zero\n- **Sigmoid**: Maps values between 0 and 1, useful for probabilities\n- **Tanh**: Maps values between -1 and 1, similar to sigmoid but zero-centered\n\n## Types of Neural Networks\n\n### Feedforward Neural Networks\n\nThe simplest type of neural network where connections between nodes do not form cycles. Information moves in only one direction, from input to output.\n\n### Convolutional Neural Networks (CNNs)\n\nSpecialized for processing grid-like data such as images:\n\n- Use convolutional layers that apply filters to detect features\n- Include pooling layers to reduce dimensionality\n- Particularly effective for image recognition and computer vision tasks\n\n### Recurrent Neural Networks (RNNs)\n\nDesigned to work with sequential data by maintaining a memory of previous inputs:\n\n- Connections between nodes form directed cycles\n- Can process sequences of variable length\n- Useful for tasks like speech recognition and language modeling\n\n### Transformers\n\nA newer architecture that has revolutionized natural language processing:\n\n- Uses self-attention mechanisms to weigh the importance of different parts of the input\n- Processes all parts of the sequence simultaneously rather than sequentially\n- Powers models like BERT and GPT\n\n## Applications of Neural Networks\n\nNeural networks have transformed numerous fields:\n\n- **Computer Vision**: Image classification, object detection, facial recognition\n- **Natural Language Processing**: Translation, sentiment analysis, text generation\n- **Speech Recognition**: Converting spoken language to text\n- **Game Playing**: Mastering complex games like Chess and Go\n- **Medical Diagnosis**: Detecting diseases from medical images\n- **Financial Forecasting**: Predicting stock prices and market trends\n\n## Challenges and Limitations\n\nDespite their power, neural networks face several challenges:\n\n- **Need for Large Datasets**: Most neural networks require substantial amounts of data to train effectively\n- **Computational Resources**: Training complex networks demands significant computing power\n- **Black Box Problem**: Neural networks often lack explainability, making it difficult to understand their decision-making process\n- **Overfitting**: Networks may perform well on training data but poorly on new, unseen data\n\n## Getting Started with Neural Networks\n\nIf you want to experiment with neural networks:\n\n1. **Learn the Basics**: Start with understanding the mathematics behind neural networks (linear algebra, calculus)\n2. **Choose a Framework**: Libraries like TensorFlow, PyTorch, or Keras make implementation easier\n3. **Start Simple**: Begin with basic classification or regression problems\n4. **Use Pre-trained Models**: Leverage transfer learning with existing models before building your own\n5. **Experiment and Iterate**: Neural network development is often empirical, requiring experimentation\n\n## Conclusion\n\nNeural networks have revolutionized artificial intelligence by providing systems that can learn from data without explicit programming. Their ability to recognize patterns and make predictions has enabled applications that seemed impossible just a decade ago. As research continues and computing power increases, neural networks will likely become even more sophisticated and accessible, further expanding their impact across industries and scientific disciplines.",
    date: 'June 15, 2025',
    readTime: '9 min read',
    category: 'Technical',
    tags: ['Neural Networks', 'Deep Learning', 'Machine Learning', 'AI Fundamentals'],
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 5,
    title: 'Ethical Considerations in Artificial Intelligence',
    excerpt: 'An exploration of the ethical challenges and responsibilities that come with developing and deploying AI systems.',
    content: "# Ethical Considerations in Artificial Intelligence\n\nAs artificial intelligence becomes increasingly integrated into our society, the ethical implications of these technologies demand careful consideration. This article explores the key ethical challenges in AI development and deployment, as well as frameworks for addressing them.\n\n## Fundamental Ethical Challenges in AI\n\n### Bias and Fairness\n\nAI systems learn from data that may contain historical biases, potentially perpetuating or amplifying these biases:\n\n- **Data bias**: Training data may under-represent certain groups or contain historical prejudices\n- **Algorithmic bias**: The design of algorithms themselves may inadvertently favor certain outcomes\n- **Impact bias**: Even unbiased algorithms can have disproportionate impacts on different groups\n\nAddressing bias requires diverse datasets, regular auditing of AI systems, and diverse teams developing these technologies.\n\n### Privacy and Surveillance\n\nAI systems often rely on vast amounts of personal data, raising concerns about:\n\n- **Data collection**: How is consent obtained for data collection?\n- **Data usage**: How is collected data being used beyond its original purpose?\n- **Surveillance capabilities**: How might facial recognition and other AI technologies enable unprecedented surveillance?\n\nProtecting privacy requires transparent data practices, meaningful consent mechanisms, and appropriate limitations on data use.\n\n### Transparency and Explainability\n\nMany advanced AI systems function as \"black boxes\" where decisions cannot be easily explained:\n\n- **Algorithmic transparency**: Can we understand how an AI system reaches its conclusions?\n- **Right to explanation**: Should individuals have the right to explanations for decisions affecting them?\n- **Auditability**: Can third parties verify that AI systems function as claimed?\n\nThe field of explainable AI (XAI) aims to develop methods for making AI decisions more transparent and interpretable.\n\n### Accountability and Liability\n\nWhen AI systems cause harm, questions arise about responsibility:\n\n- **Legal liability**: Who is legally responsible when an AI system causes harm?\n- **Moral responsibility**: Who bears the ethical burden for AI-related harms?\n- **Recourse mechanisms**: What avenues exist for those harmed by AI systems?\n\nLegal frameworks are still evolving to address these complex questions of accountability.\n\n## Specific Application Domains\n\n### Healthcare Ethics\n\nAI in healthcare raises unique ethical concerns:\n\n- **Patient autonomy**: How do AI diagnostic tools affect patient decision-making?\n- **Care quality**: Could AI create two-tiered healthcare systems?\n- **Human judgment**: When should AI recommendations be overridden by human clinicians?\n\n### Employment and Economic Impacts\n\nAI automation affects jobs and economic structures:\n\n- **Job displacement**: How should society respond to AI-driven job losses?\n- **Economic inequality**: Could AI exacerbate wealth disparities?\n- **Work dignity**: How does automation affect the meaning and value of work?\n\n### Autonomous Systems\n\nSelf-driving vehicles, autonomous weapons, and other independent systems raise critical questions:\n\n- **Safety thresholds**: How safe must autonomous systems be before deployment?\n- **Decision-making in dilemmas**: How should autonomous systems handle ethical dilemmas?\n- **Human oversight**: What level of human control should be maintained?\n\n## Ethical Frameworks and Governance\n\n### Principles-Based Approaches\n\nVarious organizations have developed ethical principles for AI, typically including:\n\n- **Beneficence**: AI should benefit humanity\n- **Non-maleficence**: AI should avoid causing harm\n- **Autonomy**: Human autonomy should be respected\n- **Justice**: Benefits and harms should be fairly distributed\n- **Explicability**: AI systems should be understandable and transparent\n\n### Regulation and Governance\n\nEffective AI governance may include:\n\n- **Industry self-regulation**: Voluntary standards and best practices\n- **Government regulation**: Legal frameworks for AI development and use\n- **International cooperation**: Cross-border agreements on AI standards\n- **Certification systems**: Independent verification of ethical compliance\n\n### Participatory Design\n\nInvolving diverse stakeholders in AI development can help address ethical concerns:\n\n- **Inclusive development teams**: Ensuring diverse perspectives in AI creation\n- **Community consultation**: Involving affected communities in design decisions\n- **Ethical impact assessments**: Systematically evaluating potential consequences\n\n## Building Ethical AI in Practice\n\n### Technical Approaches\n\nTechnical solutions can address some ethical concerns:\n\n- **Fairness tools**: Algorithms and metrics to detect and mitigate bias\n- **Privacy-preserving techniques**: Federated learning, differential privacy, and encryption\n- **Explainable AI methods**: Techniques to make AI decisions more interpretable\n\n### Organizational Practices\n\nOrganizations developing AI can embed ethics through:\n\n- **Ethics committees**: Dedicated groups overseeing ethical implications\n- **Ethics training**: Education for AI developers and users\n- **Diversity initiatives**: Ensuring varied perspectives in AI development\n- **Documentation requirements**: Recording design decisions and trade-offs\n\n### Individual Responsibility\n\nIndividual AI practitioners can contribute to ethical AI by:\n\n- **Ethical awareness**: Staying informed about ethical implications\n- **Speaking up**: Raising concerns about potentially harmful applications\n- **Ethical design**: Considering ethical implications throughout development\n\n## Conclusion\n\nEthical considerations in AI are not merely constraints but opportunities to build better, more trustworthy systems that truly benefit humanity. As AI capabilities advance, the importance of addressing these ethical questions grows. By thoughtfully engaging with these challenges—through technical innovation, policy development, and inclusive practices—we can work toward AI systems that reflect our highest values and serve the common good.\n\nThe most robust approach combines technical solutions, policy frameworks, organizational practices, and individual responsibility. Through this multi-faceted approach, we can harness AI's tremendous potential while minimizing its risks and ensuring its benefits are widely shared.",
    date: 'June 10, 2025',
    readTime: '11 min read',
    category: 'Ethics',
    tags: ['AI Ethics', 'Responsible AI', 'Bias', 'Privacy'],
    image: 'https://images.unsplash.com/photo-1633613286991-611fe299c4be?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 6,
    title: 'Building Your First Machine Learning Model',
    excerpt: 'A hands-on guide to creating and training a simple machine learning model, perfect for beginners looking to start their ML journey.',
    content: "# Building Your First Machine Learning Model\n\nMachine learning may seem intimidating at first, but creating your first model can be surprisingly accessible. This guide will walk you through the process of building a simple machine learning model from scratch, providing a solid foundation for your ML journey.\n\n## Prerequisites\n\nBefore getting started, you'll need:\n\n- **Basic programming knowledge**: Familiarity with Python is ideal\n- **Understanding of basic statistics**: Concepts like mean, median, and standard deviation\n- **Development environment**: Either a local Python installation with necessary libraries or a cloud-based notebook (like Google Colab or Jupyter)\n\n## Step 1: Define Your Problem\n\nEvery machine learning project starts with a clear problem definition:\n\n- **What are you trying to predict or classify?**\n- **What type of problem is it?** (classification, regression, clustering, etc.)\n- **How will you measure success?**\n\nFor this tutorial, we'll build a simple classification model to predict whether a customer will subscribe to a term deposit based on banking data.\n\n## Step 2: Gather and Prepare Your Data\n\n### Obtaining Data\n\nFor learning purposes, use a well-documented dataset:\n\n```python\n# We'll use the scikit-learn library's built-in datasets for this example\nfrom sklearn.datasets import load_iris\ndata = load_iris()\n\n# For real-world projects, you might load data from files:\n# import pandas as pd\n# data = pd.read_csv('your_dataset.csv')\n```\n\n### Exploring the Data\n\nBefore building a model, understand your data:\n\n```python\nimport pandas as pd\nimport numpy as np\nimport matplotlib.pyplot as plt\n\n# Convert to DataFrame for easier manipulation\nX = pd.DataFrame(data.data, columns=data.feature_names)\ny = data.target\n\n# Basic statistics\nprint(X.describe())\n\n# Check for missing values\nprint(X.isnull().sum())\n\n# Visualize the data\nplt.scatter(X.iloc[:, 0], X.iloc[:, 1], c=y)\nplt.xlabel(data.feature_names[0])\nplt.ylabel(data.feature_names[1])\nplt.show()\n```\n\n### Preprocessing the Data\n\nPrepare your data for the model:\n\n```python\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.preprocessing import StandardScaler\n\n# Split into training and testing sets\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.2, random_state=42)\n\n# Scale the features\nscaler = StandardScaler()\nX_train_scaled = scaler.fit_transform(X_train)\nX_test_scaled = scaler.transform(X_test)\n```\n\n## Step 3: Choose a Model\n\nFor beginners, start with simple models that are easy to understand:\n\n```python\nfrom sklearn.linear_model import LogisticRegression\nfrom sklearn.tree import DecisionTreeClassifier\nfrom sklearn.ensemble import RandomForestClassifier\nfrom sklearn.neighbors import KNeighborsClassifier\n\n# Initialize the model\n# For this example, we'll use logistic regression\nmodel = LogisticRegression(random_state=42)\n```\n\n## Step 4: Train the Model\n\nFit the model to your training data:\n\n```python\n# Train the model\nmodel.fit(X_train_scaled, y_train)\n\n# Alternative: you can try other models too\n# tree_model = DecisionTreeClassifier().fit(X_train_scaled, y_train)\n# rf_model = RandomForestClassifier().fit(X_train_scaled, y_train)\n# knn_model = KNeighborsClassifier().fit(X_train_scaled, y_train)\n```\n\n## Step 5: Evaluate the Model\n\nAssess how well your model performs:\n\n```python\nfrom sklearn.metrics import accuracy_score, classification_report, confusion_matrix\n\n# Make predictions\ny_pred = model.predict(X_test_scaled)\n\n# Calculate accuracy\naccuracy = accuracy_score(y_test, y_pred)\nprint(f\"Accuracy: {accuracy:.2f}\")\n\n# Detailed metrics\nprint(\"\\nClassification Report:\")\nprint(classification_report(y_test, y_pred))\n\n# Confusion matrix\nprint(\"\\nConfusion Matrix:\")\nprint(confusion_matrix(y_test, y_pred))\n```\n\n## Step 6: Improve Your Model\n\nTry different approaches to enhance performance:\n\n```python\n# Tune hyperparameters\nfrom sklearn.model_selection import GridSearchCV\n\nparam_grid = {\n    'C': [0.1, 1, 10, 100],\n    'solver': ['liblinear', 'lbfgs'],\n    'max_iter': [100, 200, 500]\n}\n\ngrid_search = GridSearchCV(\n    LogisticRegression(random_state=42),\n    param_grid,\n    cv=5,\n    scoring='accuracy'\n)\n\ngrid_search.fit(X_train_scaled, y_train)\n\n# Get the best model\nbest_model = grid_search.best_estimator_\nprint(f\"Best parameters: {grid_search.best_params_}\")\n\n# Evaluate the improved model\ny_pred_improved = best_model.predict(X_test_scaled)\naccuracy_improved = accuracy_score(y_test, y_pred_improved)\nprint(f\"Improved accuracy: {accuracy_improved:.2f}\")\n```\n\n## Step 7: Make Predictions with New Data\n\nUse your model with new, unseen data:\n\n```python\n# Example: new data points\nnew_data = np.array([[5.1, 3.5, 1.4, 0.2], [6.7, 3.1, 5.6, 2.4]])\n\n# Preprocess the new data the same way\nnew_data_scaled = scaler.transform(new_data)\n\n# Make predictions\nnew_predictions = best_model.predict(new_data_scaled)\nprint(f\"Predictions for new data: {new_predictions}\")\n\n# Get prediction probabilities\nprediction_probs = best_model.predict_proba(new_data_scaled)\nprint(f\"Prediction probabilities:\\n{prediction_probs}\")\n```\n\n## Step 8: Save Your Model\n\nPreserve your model for future use:\n\n```python\nimport joblib\n\n# Save the model\njoblib.dump(best_model, 'my_first_model.pkl')\n\n# Save the scaler too, as you'll need it for preprocessing new data\njoblib.dump(scaler, 'scaler.pkl')\n\n# Later, you can load the model and scaler\n# loaded_model = joblib.load('my_first_model.pkl')\n# loaded_scaler = joblib.load('scaler.pkl')\n```\n\n## Common Challenges and Solutions\n\n### Overfitting\n\nIf your model performs well on training data but poorly on test data:\n\n- Use simpler models\n- Implement regularization\n- Get more training data\n- Use cross-validation\n\n### Underfitting\n\nIf your model performs poorly on both training and test data:\n\n- Try more complex models\n- Engineer better features\n- Reduce regularization\n- Train longer (for iterative algorithms)\n\n### Imbalanced Data\n\nIf some classes are much more common than others:\n\n- Use sampling techniques (oversampling minority classes or undersampling majority classes)\n- Use class weights\n- Choose appropriate evaluation metrics (not just accuracy)\n\n## Next Steps in Your ML Journey\n\nNow that you've built your first model, consider these next steps:\n\n1. **Try different models**: Experiment with SVMs, neural networks, or gradient boosting\n2. **Work with different data types**: Text, images, or time series\n3. **Learn feature engineering**: Create better features from raw data\n4. **Explore deep learning**: For more complex problems and unstructured data\n5. **Participate in competitions**: Kaggle offers great opportunities to practice\n\n## Conclusion\n\nBuilding your first machine learning model is an exciting milestone. Remember that machine learning is an iterative process—start simple, learn from results, and gradually add complexity. With practice and experimentation, you'll develop the intuition and skills to tackle increasingly sophisticated problems. The journey from this first model to advanced applications is challenging but immensely rewarding.",
    date: 'June 7, 2025',
    readTime: '12 min read',
    category: 'Tutorial',
    tags: ['Machine Learning', 'Python', 'Data Science', 'Tutorial'],
    image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=1000&auto=format&fit=crop'
  }
];

export default function BlogsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedTag, setSelectedTag] = useState('');

  // Extract unique categories and tags
  const categories = [...new Set(blogs.map(blog => blog.category))];
  const allTags = blogs.flatMap(blog => blog.tags);
  const uniqueTags = [...new Set(allTags)];

  // Filter blogs based on search term, category, and tag
  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = searchTerm === '' || 
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === '' || blog.category === selectedCategory;
    
    const matchesTag = selectedTag === '' || blog.tags.includes(selectedTag);
    
    return matchesSearch && matchesCategory && matchesTag;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-950/20 to-black pt-20 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            AI <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">Insights & Tutorials</span>
          </h1>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Explore our collection of articles, tutorials, and insights about artificial intelligence, machine learning, and their real-world applications.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="sticky top-24 bg-black/40 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Search</h3>
                <div className="relative">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search articles..."
                    className="w-full bg-black/50 text-white border border-purple-500/30 rounded-lg px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Categories</h3>
                <div className="space-y-2">
                  <div 
                    onClick={() => setSelectedCategory('')}
                    className={`cursor-pointer px-3 py-1.5 rounded-lg transition-colors ${
                      selectedCategory === '' 
                        ? 'bg-purple-600 text-white' 
                        : 'text-gray-300 hover:bg-purple-900/30'
                    }`}
                  >
                    All Categories
                  </div>
                  {categories.map((category, index) => (
                    <div
                      key={index}
                      onClick={() => setSelectedCategory(category)}
                      className={`cursor-pointer px-3 py-1.5 rounded-lg transition-colors ${
                        selectedCategory === category 
                          ? 'bg-purple-600 text-white' 
                          : 'text-gray-300 hover:bg-purple-900/30'
                      }`}
                    >
                      {category}
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Popular Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {uniqueTags.map((tag, index) => (
                    <span
                      key={index}
                      onClick={() => setSelectedTag(selectedTag === tag ? '' : tag)}
                      className={`cursor-pointer px-3 py-1 rounded-full text-sm ${
                        selectedTag === tag 
                          ? 'bg-purple-600 text-white' 
                          : 'bg-purple-900/30 text-gray-200 hover:bg-purple-900/50'
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-3"
          >
            {filteredBlogs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredBlogs.map((blog, index) => (
                  <motion.article
                    key={blog.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 + (index * 0.1) }}
                    className="bg-black/40 backdrop-blur-sm border border-purple-500/20 rounded-xl overflow-hidden group hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300"
                  >
                    <div className="h-48 overflow-hidden relative">
                      <img 
                        src={blog.image} 
                        alt={blog.title} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
                      <div className="absolute top-4 left-4">
                        <span className="text-xs font-medium text-white bg-purple-600 px-2 py-1 rounded-full">
                          {blog.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <Link to={`/blogs/${blog.id}`}>
                        <h3 className="text-xl font-semibold text-white mb-2 hover:text-purple-300 transition-colors">{blog.title}</h3>
                      </Link>
                      <p className="text-gray-300 mb-4 line-clamp-2">{blog.excerpt}</p>
                      <div className="flex items-center text-sm text-gray-400 mb-4">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>{blog.date}</span>
                        <span className="mx-2">•</span>
                        <span>{blog.readTime}</span>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {blog.tags.slice(0, 3).map((tag, i) => (
                          <span 
                            key={i} 
                            className="text-xs bg-purple-900/30 text-gray-300 px-2 py-1 rounded-full"
                            onClick={(e) => {
                              e.preventDefault();
                              setSelectedTag(tag);
                            }}
                          >
                            <Tag className="inline h-3 w-3 mr-1" />
                            {tag}
                          </span>
                        ))}
                      </div>
                      <Link to={`/blogs/${blog.id}`} className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors">
                        Read article <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </div>
                  </motion.article>
                ))}
              </div>
            ) : (
              <div className="bg-black/40 backdrop-blur-sm border border-purple-500/20 rounded-xl p-8 text-center">
                <h3 className="text-xl font-semibold text-white mb-4">No articles found</h3>
                <p className="text-gray-300">
                  No articles match your current search criteria. Try adjusting your filters or search term.
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
