from pydrive.auth import GoogleAuth
from pydrive.drive import GoogleDrive
import os
from django.conf import settings

def init_auth():
    '''
    Returns the drive object after authentication

            Parameters:
                    None

            Returns:
                    drive : object
    '''
    cred_path = os.path.join(settings.BASE_DIR, "mycreds.txt")

    gauth = GoogleAuth()
    gauth.LoadCredentialsFile(cred_path)

    drive = GoogleDrive(gauth)
    return drive

def list_all_user(file_id):
    '''
    Returns the list of users that has access the drive folder/file

            Parameters:
                    file_id : str

            Returns:
                    all_data : list
    '''

    drive = init_auth()

    users_list = drive.CreateFile({'id': file_id})
    users_list.FetchMetadata(fetch_all=True)

    all_data = []

    for user in users_list['permissions']:
        if user['role'] != "owner":
            temp_dict = dict()
            temp_dict['id'] = user['id']
            temp_dict['name'] = user['name']
            temp_dict['email'] = user['emailAddress']

            all_data.append(temp_dict)
    
    return all_data

def add_user(email_id, file_id):
    '''
    Returns id value of the new user

            Parameters:
                    email_id : str
                    file_id : str

            Returns:
                    id : str
    '''

    drive = init_auth()

    test_folder = drive.CreateFile({'id': file_id})
    test_folder.GetPermissions()

    permission = test_folder.InsertPermission({
                    'role' : 'writer',
                    'type' : 'user',
                    'value' : email_id
                })
    
    id = permission['id']
    
    return id

def remove_user(id, file_id):
    '''
    Returns boolean true upon method execution 

            Parameters:
                    id : str
                    file_id : str

            Returns:
                    boolean : True
    '''

    drive = init_auth()

    test_folder = drive.CreateFile({'id': file_id})
    test_folder.GetPermissions()

    test_folder.DeletePermission(id)

    return True