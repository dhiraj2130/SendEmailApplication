# SendEmailApplication

to start the application :
 change to root directory of server where package.json is and npm start
to test the application : npm test

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


For troble shooting: the below url will change with further changes into code .
url to test from post man for mailgun:
Method: post
https://api:key-8d6d84a2b9890fb3a091217c4b368758@api.mailgun.net/v3/sandboxa74099bcdea14342a6b436007711c25a.mailgun.org/messages?from=postmaster%40sandboxa74099bcdea14342a6b436007711c25a.mailgun.org&to=dhirajvit%40gmail.com&subject=Hello%20dhirajvit&text=Congratulations%20dhirajvit

and for sendgrid mail
url : http://localhost:8000/sendGrid
method : post

Solution:
The problem of distributing the load of send mails across two providers require and solution.
Solution 1: implemented in code which is toggles between the two providers. If one fails, the other is invoked.
Considering a scenario of failure will lead to hit both the servers which will increase the turn around time. A quick solution
will be to stop hitting the target for a specified period like 3 minutes if one fails. this will minimise the turn
around time for other requests for next 3 minutes if one fails.
The other problem with this solution is, the api itself a single point of failure.
It will be less friendly and tightly coupled in case client want to introduce a third email server provider.

Solution 2:
A full stack involving external load balancer will be more robust and scalable. The solution requires creating two
independent API's for both providers and deployed on independently. the routing and load balancing between two can be
pushed to external gateway like ApiGee gateway with minimal coding and more configuration. The load balancing logic
can be implemented on gateway.
how it helps:
1. The external load balancers are management more professionally and can be better relied on. Moreever they provide
deployment on different CDN to make it more robust.
2. Single point of failure is avoided. Even if one API is down, the business won't stop.
3. Scale cube based scaling can be implemented more easily. Morever, scaling of one api is independent of others.
Let's consider, that if one provider comes up and say that , they have reduced time to sending email, and can absorb
higher volume for less price, we should be in position to absorb that.

what needs to be done :
1. External load balancer, gateway needs to be configured which can increase the intial set up cost.

frontend project
https://github.com/dhiraj2130/EmailSendAppFrontend


