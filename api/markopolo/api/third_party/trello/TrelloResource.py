
import requests 

from string import Template 

class TrelloResource :

    def __init__(self,member):

        self.member   = member 

        self.token    = "4076d55bbd9bab0c36f1fd9b82bb12109a2f57b1c46983180cf708fe2eb0f4ab"

        self.key      = "e4992763ab628749ae1adcd4ff3a5b68" 

        self.board_id = "604f0e8ed746c67a8e2b60d6"

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
     