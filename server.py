import os
from flask import Flask, render_template, request, jsonify, redirect, url_for, send_from_directory
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
from flask_login import LoginManager, login_required
from flask_mongoengine import MongoEngine
from flask_login import UserMixin, login_user, current_user, logout_user
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField
from wtforms.validators import DataRequired, InputRequired, Email, Length
from werkzeug.security import check_password_hash, generate_password_hash
from hashlib import sha256

db = MongoEngine()


app = Flask(__name__)
host = os.getenv('Hosts')
dbpath = os.getenv('Path')
print(host, db)
app.config["MONGO_URI"] = str(host) + '/' + str(dbpath)
# app.config['UPLOAD_FOLDER'] = 'uploads'
port = int(os.getenv('PORT', 8000))
mongo = PyMongo(app)
login_manager = LoginManager(app)
db.init_app(app)
app.config['MONGODB_SETTINGS'] = {
    'db': 'Oncovid',
    'host': '127.0.0.1',
    'port': 27017
}

app.config['SECRET_KEY'] = 'oncovid'

class RegForm(FlaskForm):
    email = StringField('email',  validators=[InputRequired(), Email(message='Invalid email'), Length(max=30)])
    password = PasswordField('password', validators=[InputRequired(), Length(min=8, max=20)])

class AppointmentForm(FlaskForm):
    patient_id = StringField('Patient ID',  validators=[InputRequired(), Length(max=30)])

    date = StringField('Date', validators=[InputRequired(), Length(min=3, max=20)])

    state = StringField('State', validators=[InputRequired(), Length(min=3, max=20)])


@app.route('/register', methods=['GET', 'POST'])
def register():
    form = RegForm()
    if request.method == 'POST':
        if form.validate():
            existing_user = User.objects(email=form.email.data).first()
            if existing_user is None:
                hashpass = generate_password_hash(form.password.data, method='sha256')
                print(form.email.data, hashpass)
                hey = User(email=form.email.data,password=hashpass).save()
                login_user(hey)
                return redirect(url_for('dashboard'))
    return render_template('register.html', form=form)

class User(UserMixin, db.Document):
    meta = {'collection': 'users'}
    email = db.StringField(max_length=30)
    password = db.StringField()

@login_manager.user_loader
def load_user(user_id):
    return User.objects(pk=user_id).first()


@app.route('/login', methods=['GET', 'POST'])
def login():
    if current_user.is_authenticated == True:
        return redirect(url_for('dashboard'))
    form = RegForm()
    if request.method == 'POST':
        if form.validate():
            check_user = User.objects(email=form.email.data).first()
            if check_user:
                if check_password_hash(check_user['password'], form.password.data):
                    login_user(check_user)
                    return redirect(url_for('index'))
    return render_template('login.html', form=form)

@app.route('/dashboard')
@login_required
def dashboard():
    return render_template('test.html')

@app.route('/logout', methods = ['GET'])
@login_required
def logout():
    logout_user()
    return redirect(url_for('login'))

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
appointment_types = ['NY', 'MA', 'PA']
clusters = {}

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
clusters['NY'] = Cluster(all_nodes['NY'], replicas=2)
clusters['MA'] = Cluster(all_nodes['MA'], replicas=2)
clusters['PA'] = Cluster(all_nodes['PA'], replicas=2)

print(all_nodes)
    
objs = []
objs_2 = []
objs_3 = []
for i in range(9):
    objs.append(
        SyncObj(selfNode=all_nodes['NY'][str(i)]['address'], otherNodes=[all_nodes['MA'][str(i+10)]['address'], all_nodes['PA'][str(i+20)]['address']], consumers=[calendars[i]]))
    objs_2.append(
        SyncObj(selfNode=all_nodes['MA'][str(i+10)]['address'], otherNodes=[all_nodes['NY'][str(i)]['address'], all_nodes['PA'][str(i+20)]['address']], consumers=[calendars[i]]))
    
    objs_3.append(
        SyncObj(selfNode=all_nodes['PA'][str(i+20)]['address'], otherNodes=[all_nodes['MA'][str(i+10)]['address'], all_nodes['NY'][str(i)]['address']], consumers=[calendars[i]]))


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
@login_required
def homepage():
    return  render_template('index.html')


@app.route('/SurvivorshipPlanForm')
@app.route('/questionnare')
@app.route('/questionnare/form')
@app.route('/scheduler')



@app.route('/appointment', methods=['GET', 'POST'])
def appointment():
    APform = AppointmentForm()
    if request.method == 'POST':

        appointment_id = sha256((APform.patient_id.data + APform.date.data).encode()).hexdigest()
        nodes = clusters[APform.state.data].find_nodes(appointment_id)

        for node in nodes:
            if APform.date.data in calendars[int(node)].keys():
                continue
            else:
                calendars[int(node)][APform.date.data] = appointment_id
                break
        
        return redirect(url_for('dashboard'))

    return render_template('appointment.html', form=APform)

def index():
    return render_template('index.html')

if __name__ == "__main__":
    app.run(host='0.0.0.0',port=port, debug=True)
