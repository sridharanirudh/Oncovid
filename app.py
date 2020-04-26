import os
from datetime import datetime
from flask import Flask, render_template, request, jsonify
from werkzeug.utils import secure_filename
app = Flask(__name__)

app.config['UPLOAD_FOLDER'] = 'uploads'
IMAGE_FOLDER = 'images'

@app.route("/api/upload_and_predict", methods=["POST"])
def upload_and_predict():
    if 'file' not in request.files:
        return jsonify({'message': 'No file uploaded'}), 422
    f = request.files['file']
    if f:
        fname = secure_filename(f.filename)
        f.save(os.path.join(app.config['UPLOAD_FOLDER'], IMAGE_FOLDER, fname))
        return jsonify({'message': 'File uploaded successfully'}), 200
    return jsonify({'message': 'An error occurred'}), 422

@app.route('/')
@app.route('/xray')
def hello():
    return render_template('index.html')



if __name__ == "__main__":
  app.run()
