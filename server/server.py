import os
from flask import Flask, request, jsonify 

import datetime

app = Flask(__name__)
app.config['SECRET_KEY'] = '21savage'

teachers = [{'id':1, 'subjectIds':'1,2', 'subjectNames': 'ISI, ES','name':'bairro 13', 'age':'19', 'gender': 1,'file':''}] # id, name, age, genre, subjectIds, subjectNames (server arrangment), img
students = [{'id': 1,'sno':1, 'name':'xpto','gender':1,'age':25,'classes':{'grade':1, 'className':'turma A'}}]
classes = [{'id': 1, 'className': 'turma A', 'grade': 1, 'mainTeacher': {'id': 1, 'name':'bairro 13'}}, {'id': 2, 'className': 'turma B', 'grade': 2, 'mainTeacher': {'id': 1, 'name':'bairro 13'}}]
courses = [{'id':1, 'grade': 2, 'subjectIds': '1,2','subjectNames':'ISI,ES'}]
subjects = [{'id': 1, 'name':'ISI'}, {'id': 2, 'name':'ES'}] # id, name


def classThreat(classId):


	classe = None
	grade = None
	for x in classes:
		if x['id'] == int(classId): 
			classe = x['className']		
			grade = x['grade']

	return classe, grade


def subThreat(subjectIds ):
	

	subjectIds = subjectIds.split(',')
	subjectNames = []
	
	for x in subjectIds:
		for i in subjects:
			if int(x) == i['id']: subjectNames.append(i['name'])			

	return subjectNames



@app.route('/')
def index():
	return "delusional"

@app.route('/studentmanage/login', methods=['POST'])
def login():

	return jsonify({'data':{'token': '21savage', 'username':'danny bravo'}}), 200	



# *************** SUBJECTS ******************
@app.route('/studentmanage/subject/subjects', methods=['GET'])
def all_subjects():
	print(subjects)
	return jsonify({'data':{'subjects': subjects, 'total': len(subjects)}}), 200	



@app.route('/studentmanage/subject/editSubject', methods=['GET'])
def edit_subject():
	data = request.args
	print(data)

	for x in range(len(subjects)):
		if subjects[x]['id'] == int(data.get('id')): subjects[x]['name'] = data.get('name') 

	return jsonify({}), 200

@app.route('/studentmanage/subject/addSubject', methods=['GET'])
def add_subject():
	data = request.args
	print(data)

	subjects.append({'id': (subjects[-1]['id'])+1, 'name': data.get('name')})	

	return jsonify({}), 200

# - delete

@app.route('/studentmanage/subject/deleteSubject', methods=['GET'])
def delete_subject():
	data = request.args
	print(data)

	for x in range(len(subjects)):
		if subjects[x]['id'] == int(data.get('id')):
			subjects.pop(x)	

	return jsonify({}), 200
# *********************************************


# *************** TEACHERS ******************

@app.route('/studentmanage/teacher/teachers', methods=['GET'])
def all_teachers():

	return jsonify({'data':{'teachers': teachers, 'total': len(teachers)}}), 200	


@app.route('/studentmanage/teacher/addTeacher', methods=['POST'])
def add_teacher():
	data = request.form
	print(data)

	
	subjectNames = subThreat(data['subjectIds'])
	
	teachers.append({'id': (subjects[-1]['id'])+1, 'name': data['name'], 'age': data['age'], 'gender': int(data['gender']), 'subjectIds': data['subjectIds'], 'subjectNames': ','.join(subjectNames), 'file':''  })

	return jsonify({}), 200	


@app.route('/studentmanage/teacher/teacherDetail', methods=['GET'])
def teacher_details():
	data = request.args
	print(data)

	teacher = None
	for x in teachers:
		if x['id'] == int(data.get('id')): teacher = x	

	return jsonify({'data':{'teacher':teacher}}), 200	


@app.route('/studentmanage/teacher/editTeacher', methods=['POST'])
def edit_teacher():
	data = request.form
	print(data)
	
	for x in teachers:
		if x['id'] == int(data['id']):
			x['name'] = data['name']
			x['age'] = data['age']
			x['gender'] = data['gender']
			x['subjectIds'] = data['subjectIds']
			x['subjectNames'] = ','.join(subThreat(data['subjectIds']))
				

	return jsonify({}), 200	


@app.route('/studentmanage/teacher/deleteTeacher', methods=['GET'])
def delete_teacher():
	data = request.args
	print(data)
	
	for x in range(len(teachers)):
		if teachers[x]['id'] == int(data.get('id')):
			teachers.pop(x)

	return jsonify({}), 200	
# *************** ******** ******************


# *************** COURSES ******************

@app.route('/studentmanage/gradeCourse/gradeCourses', methods=['GET'])
def all_courses():

	return jsonify({'data':{'gradeCourses': courses, 'total': len(courses)}}), 200	


# *************** ******** ******************

# TURMAS
# *************** CLASSES ******************

@app.route('/studentmanage/class/classes', methods=['GET'])
def all_classes():

	return jsonify({'data':{'classes': classes, 'total': len(classes)}}), 200	


@app.route('/studentmanage/class/courseTeachers', methods=['GET'])
def courset_classes():
	data = request.args	

	return jsonify({}), 200	


@app.route('/studentmanage/class/addClass', methods=['GET'])
def add_classes():
	data = request.args

	return jsonify({}), 200	



@app.route('/studentmanage/class/deleteClass', methods=['GET'])
def delete_classes():

	return jsonify({}), 200	



@app.route('/studentmanage/class/editClass', methods=['GET'])
def edit_classes():

	return jsonify({}), 200	
# *************** ******** ******************


# STUDENTS 
# *************** STUDENTS ******************

@app.route('/studentmanage/student/students', methods=['GET'])
def all_students():


	return jsonify({'data':{'students': students, 'total': len(students)}}), 200	


@app.route('/studentmanage/student/addStudent', methods=['POST'])
def add_student():
	data = request.form
	print(data)
	
	classe, grade = classThreat(data['classId'])
	
	students.append({'sno': data['sno'], 'name': data['name'], 'age': data['age'], 'gender': int(data['gender']), 'classes':{'grade': grade, 'className': classe}})

	return jsonify({}), 200	


@app.route('/studentmanage/student/editStudent', methods=['POST'])
def edit_student():
	data = request.form
	print(data)

	classe, grade = classThreat(data['classId'])
	
	for x in range(len(students)):
		if students[x]['id'] == int(data['id']):

			students[x]['sno'] = data['sno']
			students[x]['name'] = data['name']
			students[x]['gender'] = int(data['gender'])
			students[x]['age'] = data['age']
			students[x]['classes']['grade'] = grade 
			students[x]['classes']['className'] = classe 
			

	return jsonify({}), 200	


@app.route('/studentmanage/student/deleteStudent', methods=['GET'])
def delete_student():
	data = request.args
	print(data)

	for x in range(len(students)):
		if students[x]['id'] == int(data.get('id')):
			students.pop(x)

	return jsonify({}), 200	
# *************** ******** ******************

if __name__ == '__main__':
	app.run(debug = True, port=8080)
