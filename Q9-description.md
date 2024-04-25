**For this question, I created a middleware function to send email to the site admin whenever a new contact request is sent.**

**To implement this, I first created a sendgrid account. Sendgrid is a cloud based service that delivers emails. The company owns a mailing server that allows the users to  utilize  multiple mailing services.**

**After creating an account, I npm installed nodemailer package to my local computer in the terminal. I also installed nodemailer transporter that works with the nodemailer package**

**I imported both packages by importing them in contactController. I created a transporter to allows mail delivery. Then, I created an API_KEY in the sendgrid interface. I copied and pasted this API_KEY to the transporter**

**In the contact controller, I created a transporter with a sendMail object. The object contains a to: and from: fields. This will allow the email to be sent to the contact generator with the subject line : "contact  successfully created" and an html content :"<h1>You successfully created your contact!</h1>" The content is sent to sendgrid server in my account which is delivered to the user's email**



<!--- Write a description of the functionality you implemented for question 9 here.  No special formatting is required; however, if desired you can use the basic markdown syntax (https://www.markdownguide.org/cheat-sheet/) and view the result by right-clicking the file and selecting 'Open Preview'. -->