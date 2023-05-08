from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_cors import cross_origin
import datetime


app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:password@localhost/testdb2'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False


CORS(app)
db = SQLAlchemy(app)
ma = Marshmallow(app)



class Employee(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    firstname = db.Column(db.String(50))
    lastname = db.Column(db.String(50))
    email = db.Column(db.String(50))
    date = db.Column(db.DateTime,default=datetime.datetime.now)
    
    def __repr__(self):
        return "<Employee %r>" % self.id,self.firstname,self.lastname,self.email
    
    def __init__(self, firstname, lastname, email): 
        self.firstname = firstname
        self.lastname = lastname
        self.email = email
        
        
        
        
class EmployeeSchema(ma.Schema):
     class Meta:
        fields = ('id','firstname','lastname','email','date')
        
employee_schema = EmployeeSchema()
employee_schema = EmployeeSchema(many=True)



       
@cross_origin()   
@app.route('/')
def server_status():
    results = ("Server Operational")
    return jsonify(results)

       
@cross_origin()   
@app.route('/employees', methods =  ['GET'])
def get_employees():
    all_employees = Employee.query.all()
    results = employee_schema.dump(all_employees)
    return jsonify(results)



@cross_origin()   
@app.route('/employee/<int:id>', methods=['GET'])
def get_employee(id):
    employee = Employee.query.get(id)
    return employee_schema.jsonify(employee)




@cross_origin()
@app.route('/add', methods =  ['POST'])
def add_employees():
    firstname = request.json['firstname']
    lastname = request.json['lastname']
    email = request.json['email']
    
    employees = Employee(firstname,lastname,email)
    db.session.add(employees)
    db.session.commit()
    return employee_schema.jsonify(employees)


@cross_origin()
@app.route('/update/<id>/', methods =  ['PUT'])
def update_employee(id):
    employee = Employee.query.get(id)
    
    firstname = request.json['firstname']
    lastname = request.json['lastname']
    email = request.json['email']
    
    employee.firstname = firstname
    employee.lastname = lastname
    employee.email = email
    
    db.session.commit()
    return employee_schema.jsonify(employee)

    
@cross_origin()
@app.route('/delete/<id>/', methods =  ['DELETE'])   
def employee_delete(id):
    employee = Employee.query.get(id)
    db.session.delete(employee)
    
    db.session.commit()
    return employee_schema.jsonify(employee)

    
    
    
    
    

if __name__ == "__main__":
    app.run(host="localhost", port=8000, debug=True)