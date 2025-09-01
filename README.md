# Gene Sage AI

A web app that can classify how likely specific mutations in DNA are to cause diseases (**variant effect prediction**).  

We use the **state-of-the-art Evo2 large language model** to predict the pathogenicity of single nucleotide variants (SNVs).  
The backend is deployed on an **H100 serverless GPU with Modal**, exposing a **FastAPI endpoint** for analysis.  

On the frontend, users can:  
- Select a genome assembly (e.g., hg38)  
- Browse chromosomes or search for specific genes (e.g., **BRCA1**)  
- View the gene's **reference genome sequence**  
- Input a mutation and predict its pathogenicity with AI  
- Compare Evo2 predictions (**pathogenic/benign**) against existing **ClinVar classifications**  

---

##  Features

- Evo2 model for variant effect prediction  
- Predict pathogenicity of single nucleotide variants (**pathogenic / benign**)  
- Compare Evo2 prediction with existing **ClinVar classification**  
- Prediction confidence estimation  
- Genome assembly selector (e.g., hg38)  
- Chromosome browsing + gene search (e.g., BRCA1)  
- Full reference genome sequence from **UCSC API**  
- Explore gene & variants data from **NCBI ClinVar / E-utilities**  
  
---

##  Tech Stack

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS, Shadcn UI (T3 Stack)  
- **Backend**: Python, FastAPI, Modal (H100 GPU)  
- **Data Sources**: UCSC Genome Browser API, NCBI ClinVar, E-utilities  

---

## Setup Instructions

### 1. Clone the repository
```bash
  git clone https://github.com/your-username/gene-sage-ai.git
  cd gene-sage-ai
```
### Backend Setup
#### 2. Install Dependencies
```bash
  cd gs_backend
  python -m venv .venv && .venv\Scripts\activate
  pip install -r requirements.txt
```
#### 3.Login & setup Modal
```bash
  pip install modal
  modal token new
  modal setup
```
#### 4. Deploy
```bash
  modal run main.py
  modal app deploy main.py
```
#### Copy the HTTPS URL emitted by Modal; place it in frontend .env

### Frontend Setup
#### 1.Install Dependencies
```bash
  cd gs_frontend
  npm install    
```
#### 2.Create .env.local
```bash
  NEXT_PUBLIC_API_BASE_URL=https://<your-modal-app>.modal.run
```
#### 3.Run Frontend
```bash
  npm run dev
```
---

### Evo2 Model
  Check out the paper behind the model.<br/>
  [Paper](https://www.biorxiv.org/content/10.1101/2025.02.18.638918v1)<br/>
  [GitHub Repository](https://github.com/ArcInstitute/evo2.git)

---
