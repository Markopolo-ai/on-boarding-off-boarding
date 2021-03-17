My Documentation goes here.

Fisrtly I want to apologize for the fact that I didn't implemented the project with all of your requirements.


I have followed a pretty simple approach here. 

1. Fisrt, with the submission of an email, I am storing the mail in an array in local storage with the other mails presented in the array. Surely I would use a database for this purpose, but for the simplicity I have used the localstorage as the storage space. 

You can see for my implementation of storing the emails and adding new mails in the 'handleCLick' and 'handleSubmit' funtion in App.js.

2. Now, I have used user_list component to show the list of the emails. 

3. With the two attached buttons, I have given access and remove the access for an user to one of my private repo.

4. To implement that, I have make an fetch() with the email id submitted. From the response, I have recieved the UserName of that particular email.

5. Then with the UserName recieved before, I have made another fetch().
    I've used the second fetch() to give or remove access.

To give or remove access, I had do use my personal access token. I am not giving the token in the code. If you try to test, please use your own access tokens.



While implementing the remove access feature, I would like to remove the email from the list too. But I didn't implement that for this time.

***********Bugs************
After the submision of first email, it won't be shown in the list. 
Please add at least two emails one after another.


**********Attention***********

I don't know why, but there's a problem with github api while searching for the userName with email id. 

'https://api.github.com/search/users?q=' + email

for some accounts, this request returns nothing. I have tested it with postman in my environment with several of my friends email id's. Many of them returns nothing. If that is the case, then it will raise an error.
