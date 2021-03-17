from __future__ import print_function
import os.path
import json
from googleapiclient.discovery import build
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials

#file_id = '17gwZqbdzMW621aHEK_wWb6_gGNMuECVG'

SCOPES = ['https://www.googleapis.com/auth/drive.metadata.readonly',
    'https://www.googleapis.com/auth/drive',
    'https://www.googleapis.com/auth/drive.file'
    ]
def access(self,email,file_id,role):
    creds = None
    dic_email = {}
    if os.path.exists('token.json'):
        creds = Credentials.from_authorized_user_file('token.json', SCOPES)

    def callback(request_id, response, exception):
        if exception:
            print (exception)
        else:
            #print ("Permission Id: %s %s" % response.get('id') % response.get('email'))
            print(response.get('id'), response)
            dic_email[email] = str(response.get('id'))
    service = build('drive', 'v3', credentials=creds)
    batch = service.new_batch_http_request(callback=callback)
    user_permission = {
        'type': 'user',
        'role': role,
        'emailAddress': email
    }
    batch.add(service.permissions().create(
            fileId=file_id,
            body=user_permission,
            fields='id',
    ))
    batch.execute()
    if os.path.exists('email_list.txt'):
        with open('email_list.txt') as json_file:
            dic_email1 = json.load(json_file)
        dic_email1[email] = dic_email[email]

        with open('email_list.txt', 'w') as outfile:
            json.dump(dic_email1, outfile)
    else:
        with open('email_list.txt', 'w') as outfile:
            json.dump(dic_email, outfile)

def revoke_permission(self,file_id,pr_id,email):
    creds = Credentials.from_authorized_user_file('token.json', SCOPES)
    service = build('drive', 'v3', credentials=creds)

    def callback(request_id, response, exception):
        if exception:
            # Handle error
            print(exception)
        else:
            # print ("Permission Id: %s" % response.get('id'))
            print("Permission Id: %s" % response)

    batch = service.new_batch_http_request(callback=callback)
    #batch.add(service.permissions().list(fileId=file_id))
    batch.add(service.permissions().delete(fileId=file_id,permissionId=pr_id))
    batch.execute()
    with open('email_list.txt') as json_file:
        dic_email1 = json.load(json_file)
    dic_email1.pop(email, None)
    with open('email_list.txt', 'w') as outfile:
        json.dump(dic_email1, outfile)



class Permission:
    def create_permission(self,email,file_id,role):
        access(self,email,file_id,role)
        return 'Permission Added'
    def revoke(self,file_id,pr_id,email):
        revoke_permission(self, file_id, pr_id,email)
        return 'Permission Revoke'