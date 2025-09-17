# student-dashboard
🧠 Cognitive Skills & Student Performance Dashboard
📊 Overview
This project analyzes synthetic student data to explore how cognitive skills impact academic performance. It includes:

Data analysis & ML modeling in Jupyter Notebook

Interactive dashboard built with Next.js

Student clustering into learning personas

Visual insights through charts and tables

📁 Dataset
Synthetic dataset includes the following fields:

student_id, name, class

comprehension, attention, focus, retention

assessment_score, engagement_time

🔍 Analysis & Machine Learning
Implemented in Jupyter Notebook:

Correlation analysis between cognitive skills and performance

Linear Regression model to predict assessment_score

KMeans clustering to group students into learning personas

Feature scaling & PCA for dimensionality reduction

📈 Dashboard Features (Next.js)
Overview Stats: Average scores and skill metrics

Charts:

Bar chart: Skill vs Score

Scatter plot: Attention vs Performance

Radar chart: Individual student profile

Student Table: Searchable and sortable

Insights Section: Key findings and recommendations

🚀 Setup Instructions
Backend (Jupyter Notebook)
Clone repo

Install dependencies:

bash
pip install pandas scikit-learn matplotlib seaborn
Run analysis.ipynb for data exploration, modeling, and clustering

Frontend (Next.js Dashboard)
Navigate to dashboard/

Install dependencies:

bash
npm install
Run locally:

bash
npm run dev
🌐 Deployment
Live dashboard hosted on Vercel: 🔗 View Dashboard

💡 Key Findings
Attention & retention show strong correlation with performance

Comprehension is the most predictive skill for assessment scores

Three learning personas emerged:

High performers with balanced skills

Struggling students with low focus and retention

Moderate scorers with high engagement but low comprehension

Personalized interventions can be designed based on cluster profiles

📦 Deliverables
✅ Jupyter Notebook (analysis.ipynb)

✅ Next.js Dashboard (/dashboard)

✅ GitHub Repo: [your-repo-link]

✅ Vercel Deployment: [your-vercel-link]
