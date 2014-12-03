MEEPWN
=======

Tickets & Bug Reports:
---------------------
http://meepwn.lighthouseapp.com


Staging Deployment:
-------------------
http://meepwn.meteor.com/

What Is Implemented?
--------------------
* Sign-In/Sign-Out through 3rd party services (GitHub, Google, Twitter).
* Creation of projects. Projects are private and belong to the user by default.
* Basic authorization: Users can not read or modify projects without sufficent permissions.
* Invitations: User can invite other users on per-project basis by providing them specially generated url.
* Cursors are synchronized between editing users.
* Text selections are synchronized too.
* User-specific elements in editor window automatically colored in order to ease distinguishing.
* Concept of workspace was introduced. After navigating to the project page, user should automatically reopen previous files.
* Tabs! There's a tab control containing all opened files in current user session.
* And more!

Tech Behind:
------------
* Written from scratch using Meteor
* DB choice comes with Meteor too - Mongo
* Deployment using internal Meteor tool (```meteor deploy```)
* Handlebars as HTML template engine
* Stylus
* Underscore and jQuery as client-side libs
* ShareJS and Ace Editor combo
* Integration with Bower
* Internal Meteor packaging system (instead of ```npm``` and etc)
* Build tasks (compiling, source maps, minification) are carried out automatically by Meteor using strict conventions
