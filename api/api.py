from flask import Flask, jsonify, json, request
from permission import Permission
import os.path
app = Flask(__name__)

pr = Permission()

@app.route('/api',methods=['GET'])

def index():
    return {'name':'Hello Flask'}

@app.route('/api/create',methods=['POST'])

def create():
    request_data = json.loads(request.data)
    print(request_data)
    #a = pr.create_permission(request_data['email'])
    status = search_mail(request_data['email'],request_data['fileName'],request_data['reader_writer'])
    print(status)
    return {'email': request_data['email'],
            'fileEmail': request_data['fileName']}

@app.route('/api/delete',methods=['POST'])
def delete():
    request_data = json.loads(request.data)
    print(request_data)
    status = del_mail(request_data['email'], request_data['fileName'])
    print(status)
    return {'email': request_data['email'],
            'fileEmail': request_data['fileName']}

def del_mail(email,file_name):
    if os.path.exists('email_list.txt'):
        with open('data.txt') as json_file:
            data = json.load(json_file)
        with open('email_list.txt') as json_file:
            dic_email1 = json.load(json_file)
        file_title = list(data.keys())
        file_id = list(data.values())
        if file_name in file_title:
            status = pr.revoke(data[file_name], dic_email1[email],email)
        else:
            status = 'File/Folder not exist'
    else:
        status = 'Email not exist'
    return status

def search_mail(email,file_name,role):
    with open('data.txt') as json_file:
        data = json.load(json_file)
    file_title = list(data.keys())
    file_id = list(data.values())
    if file_name in file_title:
        status = pr.create_permission(email,data[file_name],role)
    else:
        status = 'File/Folder not exist'
    return status
    #print(file_id,file_title)

if __name__ == '__main__':
    app.run(debug=True)