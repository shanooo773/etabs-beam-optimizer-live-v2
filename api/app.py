from flask import Flask, request, jsonify
import os
import uuid
import json
from datetime import datetime
import logging

# Configure logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

app = Flask(__name__)

# Mock data storage - in a real app, this would be a database
UPLOADS_FOLDER = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'uploads')
ANALYSIS_RESULTS = {}

# Ensure uploads folder exists with proper permissions
try:
    os.makedirs(UPLOADS_FOLDER, exist_ok=True)
    # Ensure directory has write permissions
    os.chmod(UPLOADS_FOLDER, 0o755)
except Exception as e:
    logger.error(f"Failed to create uploads directory: {str(e)}")

@app.route('/api/upload', methods=['POST'])
def upload_file():
    """Handle ETABS model file upload"""
    try:
        if 'file' not in request.files:
            return jsonify({'success': False, 'message': 'No file provided'}), 400
        
        file = request.files['file']
        
        if file.filename == '':
            return jsonify({'success': False, 'message': 'No file selected'}), 400
        
        # Generate a unique ID for this analysis
        file_id = str(uuid.uuid4())
        
        # Save the file
        file_path = os.path.join(UPLOADS_FOLDER, f"{file_id}_{file.filename}")
        file.save(file_path)
        
        logger.info(f"File successfully saved to {file_path}")
        
        # For now, return success with the file ID
        return jsonify({
            'success': True, 
            'message': 'File uploaded successfully',
            'fileId': file_id
        })
    except Exception as e:
        logger.error(f"Error during file upload: {str(e)}")
        return jsonify({
            'success': False,
            'message': f'Server error during file upload: {str(e)}'
        }), 500

@app.route('/api/analysis/<file_id>', methods=['GET'])
def get_analysis_results(file_id):
    """Get analysis results by file ID"""
    try:
        if file_id in ANALYSIS_RESULTS:
            return jsonify(ANALYSIS_RESULTS[file_id])
        
        return jsonify({
            'status': 'processing',
            'message': 'Analysis in progress'
        })
    except Exception as e:
        logger.error(f"Error retrieving analysis results: {str(e)}")
        return jsonify({
            'success': False,
            'message': f'Server error: {str(e)}'
        }), 500

@app.route('/api/sections', methods=['GET'])
def get_available_sections():
    """Return available beam sections library"""
    try:
        sections = {
            'W12X26': {
                'name': 'W12X26',
                'type': 'W',
                'depth': 310,
                'width': 165,
                'area': 49.4,
                'momentOfInertiaX': 8180,
                'momentOfInertiaY': 285,
                'sectionModulusX': 528,
                'sectionModulusY': 53.2,
                'weight': 38.7
            },
            'W16X26': {
                'name': 'W16X26',
                'type': 'W',
                'depth': 406,
                'width': 140,
                'area': 49.7,
                'momentOfInertiaX': 13400,
                'momentOfInertiaY': 187,
                'sectionModulusX': 659,
                'sectionModulusY': 26.7,
                'weight': 38.7
            }
        }
        return jsonify(sections)
    except Exception as e:
        logger.error(f"Error retrieving sections: {str(e)}")
        return jsonify({
            'success': False,
            'message': f'Server error: {str(e)}'
        }), 500

@app.route('/api/optimize', methods=['POST'])
def optimize_model():
    """Manually trigger optimization with provided parameters"""
    try:
        data = request.json
        
        if not data:
            return jsonify({'success': False, 'message': 'No data provided'}), 400
        
        return jsonify({
            'success': True,
            'message': 'Optimization complete',
            'timestamp': datetime.now().isoformat()
        })
    except Exception as e:
        logger.error(f"Error during optimization: {str(e)}")
        return jsonify({
            'success': False,
            'message': f'Server error: {str(e)}'
        }), 500

if __name__ == '__main__':
    # Log the server startup
    logger.info(f"Starting Flask server on port 5000")
    logger.info(f"Uploads directory: {UPLOADS_FOLDER}")
    app.run(debug=True)