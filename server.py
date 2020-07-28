import os
from flask import Flask, render_template, request, jsonify
from werkzeug.utils import secure_filename
from flask_pymongo import PyMongo
import numpy as np
# import tensorflow.compat.v1 as tf
# import cv2
import random
import json
from watson_developer_cloud import VisualRecognitionV3
# import pdb
from clandestined import Cluster
import random
import numpy as np
from clandestined import Cluster
import random
import numpy as np
import socketserver
from pysyncobj import SyncObj
from pysyncobj.batteries import ReplCounter, ReplDict


app = Flask(__name__)
host = os.getenv('Hosts')
db = os.getenv('Path')
print(host, db)
# app.config["MONGO_URI"] = str(host) + '/' + str(db)
# app.config['UPLOAD_FOLDER'] = 'uploads'
port = int(os.getenv('PORT', 8000))
# mongo = PyMongo(app)

# @app.route("/questionnare/form", methods=["POST"])
# def chat():
#     data = request.get_json()
#     print(data)
#     mongo.db.chat.insert_one(data)
#     return jsonify({'message':'Inserted Response'}), 200



# def predict(filename):
#     visual_recognition = VisualRecognitionV3(
#     '2018-03-19',
#     iam_apikey='0Pd3ksp-Djd42LBqa1isXjloH3t8ON4_mlXCcgChB23u')

#     with open(filename, 'rb') as images_file:
#         classes = visual_recognition.classify(
#             images_file,
#             threshold='0.6',
#         classifier_ids='DefaultCustomModel_417156246').get_result()


#     prediction = classes['images'][0]['classifiers'][0]['classes']
#     probability = 0.5
#     if len(prediction) and prediction[0]['class'] == 'Positive':
#         probability = prediction[0]['score']

#     return str(probability)
calendars = []  

for i in range(9):
    calendars.append(ReplDict())

all_nodes = {}
appointment_types = ['group_1', 'group_2', 'group_3']


j=0
for appointment_type in appointment_types:
    nodes_2 = {}
    hospitals = ['Hospital{}'.format(i+j) for i in range(9)]

    for idx, hospital in enumerate(hospitals):
        i = idx+j
        with socketserver.TCPServer(("localhost", 0), None) as s:
            free_port = s.server_address[1]

        nodes_2[str(i)] = {'name': hospital, 'zone': np.random.randint(8)+1, 'address': 'localhost:'+ str(free_port)}    
    j+=10
    nodes_2
    all_nodes[appointment_type] = nodes_2

    
objs = []
objs_2 = []
objs_3 = []
for i in range(9):
    objs.append(
        SyncObj(selfNode=all_nodes['group_1'][str(i)]['address'], otherNodes=[all_nodes['group_2'][str(i+10)]['address'], all_nodes['group_3'][str(i+20)]['address']], consumers=[calendars[i]]))
    objs_2.append(
        SyncObj(selfNode=all_nodes['group_2'][str(i+10)]['address'], otherNodes=[all_nodes['group_1'][str(i)]['address'], all_nodes['group_3'][str(i+20)]['address']], consumers=[calendars[i]]))
    
    objs_3.append(
        SyncObj(selfNode=all_nodes['group_3'][str(i+20)]['address'], otherNodes=[all_nodes['group_1'][str(i)]['address'], all_nodes['group_2'][str(i+10)]['address']], consumers=[calendars[i]]))

@app.route("/api/create_event", methods=["POST"])
def book_appointment(appoint_ment_json):
    nodes = cluster.find_nodes(appointment_id)

    for node in nodes:
        if date in calendars[int(node)].keys():
            continue
        else:
            calendars[int(node)][date] = appointment_id

    

def get_calendar(name):
    neighbor = rendezvous.find_node('Hospital1')

@app.route("/api/create_event", methods=["POST"])
def create_event():
    if 'event' not in request.events:
        return jsonify({'message': 'Invlaid Event'}), 422
    event =  request.events['event']

    calendar.add_event(event)
    neighbor.update(event)


@app.route('/')
@app.route('/SurvivorshipPlanForm')
@app.route('/questionnare')
@app.route('/questionnare/form')
@app.route('/scheduler')

def index():
    return render_template('index.html')

if __name__ == "__main__":
    app.run(host='0.0.0.0',port=port)
