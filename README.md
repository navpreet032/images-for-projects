# xeno
this repo is Backend for contact_list site

# how it works
Mongodb is used as Database in this project.
User can create a account and then they can make contacts .
```bash
make POST request to
/api/auth/register
```
![image](https://github.com/navpreet032/xeno/assets/55250212/c9af3f21-f9f0-4d8b-8d99-086673002472)

This will make user account and contacts related to user.

# JWT
JsonWebToken is used to securely transmit information. And by using JWT user can access his contacts only.

# How passwords are stored in DB?

All the passwords are encrypted and encrypted passwords are stored in Db.


