# SendEmailApplication

to start the application :
cd SendEmailApplication/server  && npm start

to test the application :
cd SendEmailApplication/server  && npm test

The application is initialised with
npm init

API keys need to be added in  sendGridKey files as
{ SENDGRID_API_KEY :'********************' }
and in /server/config/mailgunkey as
{ api_key :'******************************' }

Enhancement that can be implemented are :
1. retry, attachements, proxy and mime can be added a email features
2. input for email are considered to be in string and imposed with schema validation. it can be enhanced.
3. responseHandler after performing the mail operation can be enhanced.
4. only post method is supported. others except options are blocked.


For troble shooting: the below url can be fired from http client
method : post
url : http://localhost:8000/mail
Header: content-type :application/json

Features:
1. CORS implemented allowing http://localhost:4200 as a consumer. If other consumers are required, then '*' can be added

2. Schema validation is implemented with schema:
{
    properties:{
        emailFrom:{
            type:'string',
            required:true,
        },
        emailTo:{
            type:'string',
            required:true,
        },
        emailSubject:{
            type:'string',
            required:true,
        },
        emailContent:{
            type:'string',
            required:true,
        },
    }
}


Limitation:
1. sendGrid mail provider will not work as the account is locked.
2. Error handling can be improved
3. Swagger can be used for better documentation and modelling.
4. email to : needs to be verified and configured
5. email from : is postmaster@sandboxa74099bcdea14342a6b436007711c25a.mailgun.org , whatever we choose in ui.


Solution implemented for fail over and laod balancing:

both the email servers are selected randomly. if one server fails the other is tried.

As of now the sendGrid is failing because the api key is locked. It helps to test the load balancing and fail over.
from the logs it can be seen that both the server are tried as first option and send as second option.

An easy way to test the failover is using a wrong key in config file.


Solution consideration:

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


