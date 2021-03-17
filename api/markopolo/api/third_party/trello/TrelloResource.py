
import requests 

from string import Template 



class TrelloResource :

    def __init__(self,member,config):

        self.member   = member 

        self.token    = config['TRELLO_TOKEN']

        self.key      = config['TRELLO_KEY']  

        self.board_id = config['TRELLO_BOARD_ID'] 

        self.add_member_url    = Template('https://api.trello.com/1/boards/$board_id/members?key=$key&token=$token&type=$type&email=$email') 

        self.remove_member_url = Template('https://api.trello.com/1/boards/$board_id/members/$member_id?key=$key&token=$token') 
        

    def GiveAccess(self):
        email = self.member.email
        url   = self.add_member_url.safe_substitute( board_id=self.board_id,\
                                                     key=self.key , \
                                                     email=email  , \
                                                     token=self.token , \
                                                     type="normal"  )

        res = requests.put(url)

        # return member trellow id 
        if res.status_code == 200 :
            data = res.json()
            return data['members'][-1]['id']  #save the returned is to db 
        
        return "" 


    def RevokeAccess(self):
        tid = self.member.trello_id

        url = self.remove_member_url.substitute(  board_id=self.board_id ,\
                                                  key=self.key ,\
                                                  member_id=tid ,\
                                                  token=self.token )
        
        res = requests.delete( url )

        return True if res.status_code == 200 else False 
     