# ETABS Beam Optimizer

A web-based tool for structural engineers to analyze ETABS model data and optimize beam sections based on moment requirements.

## Features

- Upload ETABS model files (.e2k, .EDB, JSON exports)
- Extract frame details using the ETABS API
- Compare beam sections against a comprehensive section library
- Identify optimal beam sections based on moment requirements
- View optimization results in interactive tables and detailed views
- Download optimization reports

## Technologies Used

### Frontend
- React with TypeScript
- Vite for fast development and building
- TailwindCSS for styling
- Lucide React for icons

### Backend
- Python with Flask
- ETABS API integration

## Development Setup

1. Clone the repository:
```
git clone https://github.com/your-username/etabs-beam-optimizer.git
cd etabs-beam-optimizer
```

2. Install frontend dependencies:
```
npm install
```

3. Setup backend (Python/Flask):
```
cd api
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

4. Run the application:
```
# Terminal 1 - Frontend
npm run dev

# Terminal 2 - Backend
npm run start-api
```

## Usage

1. Access the application at http://localhost:5173
2. Upload your ETABS model file
3. View the optimization results
4. Filter and sort results as needed
5. Download the optimization report

## License

MIT