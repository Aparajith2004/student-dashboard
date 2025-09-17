Cognitive Skills & Student Performance Dashboard

Overview
This project analyzes the relationship between students’ cognitive skills and their academic performance using a synthetic dataset. It includes a machine learning model to predict assessment scores, student clustering to identify learning personas, and an interactive dashboard built with Next.js to visualize insights.

Dataset
The synthetic dataset contains the following fields:
student_id – Unique identifier for each student
name – Student name
class – Student class/grade
comprehension – Score representing comprehension skill
attention – Score representing attention level
focus – Score representing focus level
retention – Score representing memory retention
assessment_score – Student’s performance score
engagement_time – Time spent actively engaging with learning material

Setup Instructions
1. Clone Repository
git clone https://github.com/<your-username>/cognitive-dashboard.git
cd cognitive-dashboard
2. Jupyter Notebook Environment
Install Python dependencies:
pip install -r requirements.txt

Run the notebook:
jupyter notebook
The notebook includes:
Data exploration and correlation analysis
Machine learning model (e.g., Linear Regression or Random Forest) to predict assessment scores
Clustering of students into learning personas

3. Next.js Dashboard
Install Node.js dependencies:
cd dashboard
npm install

Run the development server:
npm run dev
Open http://localhost:3000
 to view the dashboard.

4. Deployment
The dashboard is deployed on Vercel (public link):
https://<your-vercel-link>.vercel.app
Features
1. Overview Stats
Average assessment scores
Average cognitive skill scores (comprehension, attention, focus, retention, engagement)
2. Visualizations
Bar Chart: Skill vs Assessment Score
Scatter Plot: Attention vs Performance
Radar Chart: Individual student cognitive profile
3. Student Table
Searchable and sortable table of all students with their cognitive scores and assessment score
4. Insights Section
Key findings derived from analysis:
Comprehension and retention strongly correlate with assessment scores
Students with high engagement and focus tend to perform better
Clustering identifies 3–4 learning personas (e.g., "High Focus, Low Retention", "Balanced Learner")
Attention alone does not always predict performance; combination of skills matters

ML Model
Model: Random Forest Regressor (or Linear Regression for simplicity)
Features: comprehension, attention, focus, retention, engagement_time
Target: assessment_score
Performance: Evaluated using R² score and RMSE

Folder Structure
cognitive-dashboard/
│
├─ notebook/                 # Jupyter Notebook & analysis
│
├─ dashboard/                # Next.js project
│   ├─ pages/
│   ├─ components/
│   └─ public/
│
├─ dataset/                  # Synthetic dataset (CSV)
├─ requirements.txt
├─ package.json
└─ README.md

How to Use
Explore the Jupyter Notebook to understand correlations, ML model, and clusters.
Open the Next.js dashboard locally or via Vercel to interact with charts and student table.
Use insights to identify students’ learning personas and cognitive skill patterns.

Link: student-dashboard-lac-eta.vercel.app

Author
Your Name – GitHub: @AparajithMG
