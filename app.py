import os
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
        os.makedirs(os.path.join(app.config['UPLOAD_FOLDER'], IMAGE_FOLDER),
                    exist_ok=True)
        fname = secure_filename(f.filename)
        f.save(os.path.join(app.config['UPLOAD_FOLDER'], IMAGE_FOLDER, fname))
        return jsonify({'message': 'File uploaded successfully'}), 200
    return jsonify({'message': 'An error occurred'}), 422

@app.route("/predict", methods=["POST"])
def predict():
    metaname =  "/Users/saurabh7/Downloads/model.meta"
    ckptname = "/Users/saurabh7/Downloads/model-8485"
    import numpy as np
    import tensorflow.compat.v1 as tf
    import os, argparse
    import cv2
    tf.disable_eager_execution()


    # parser = argparse.ArgumentParser(description='COVID-Net Inference')
    # parser.add_argument('--weightspath', default='models/COVIDNet-CXR-Large', type=str, help='Path to output folder')
    # parser.add_argument('--metaname', default='model.meta', type=str, help='Name of ckpt meta file')
    # parser.add_argument('--ckptname', default='model-8485', type=str, help='Name of model ckpts')
    # parser.add_argument('--imagepath', default='assets/ex-covid.jpeg', type=str, help='Full path to image to be inferenced')

    # args = parser.parse_args()

    mapping = {'normal': 0, 'pneumonia': 1, 'COVID-19': 2}
    inv_mapping = {0: 'normal', 1: 'pneumonia', 2: 'COVID-19'}

    sess = tf.Session()
    tf.get_default_graph()
    saver = tf.train.import_meta_graph(metaname)
    saver.restore(sess, ckptname)

    graph = tf.get_default_graph()

    image_tensor = graph.get_tensor_by_name("input_1:0")
    pred_tensor = graph.get_tensor_by_name("dense_3/Softmax:0")
    # forward to processing page
    x = cv2.imread("/Users/saurabh7/Downloads/xray1.jpeg")
    h, w, c = x.shape
    x = x[int(h/6):, :]
    x = cv2.resize(x, (224, 224))
    x = x.astype('float32') / 255.0
    pred = sess.run(pred_tensor, feed_dict={image_tensor: np.expand_dims(x, axis=0)})

    return jsonify(
        prediction=str(pred[:,2][0])
    )
    
@app.route('/')
@app.route('/xray')
def index():
    return render_template('index.html')


if __name__ == "__main__":
    app.run()
