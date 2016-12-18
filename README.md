# SendEmailApplication


The application is initialised with
npm init

The application can be started using

npm start from SendEmailApplication/server directory which has the package.json


// use swagger if time permits


Enhancement:
retry, attachements, proxy and mime can be added a email features
input for email are considered to be in string and imposed with schema validation. it can be enhanced.
responseHandler after performing the mail operation can be enhanced.
only post method is supported. others should be blocked.


For troble shooting:
url to test from post man for mailgun:
Method: post
https://api:key-8d6d84a2b9890fb3a091217c4b368758@api.mailgun.net/v3/sandboxa74099bcdea14342a6b436007711c25a.mailgun.org/messages?from=postmaster%40sandboxa74099bcdea14342a6b436007711c25a.mailgun.org&to=dhirajvit%40gmail.com&subject=Hello%20dhirajvit&text=Congratulations%20dhirajvit