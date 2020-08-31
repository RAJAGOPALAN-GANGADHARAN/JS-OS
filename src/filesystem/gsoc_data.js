export var data_gsoc = `

## Google Summer of Code 2019
_________

#### May 2019 - September 2019

+++
type = "blog"
title = "GSOC 2019 Final Report"
author = "rajagopalan"
date = "2019-08-15 20:40:33+05:30"
tags = ["haiku", "software"]
+++

### Introduction
Hey there beautiful person reading this post. We are in the endgame now (Ha get it avengers reference!). Yes, Google summer of code 2019 is coming to an end. Phew couldn't say how 3 months passed by, but this is one of my most memorable experiences I will never forget. So let me wrap GSOC with this final report. Buckle up tight it's going to be a long post...

I am trying to port webkit2 to Haiku.

**FAQ**

1. Why webkit2 when we already have awesome webkit?

    Duh, 2 is always better than 1 isn't it. Now jokes aside, WebKit2 is now webkit and webkit1 is called webkitlegacy. Webkit2 features a multi-process model so that means jobs are split across  different processes. This improves high reliability, less crashes, super fast performance. So obviously webkit2 is better than webkit1.

2. Will it be available for my favourite browser WebPositive?

    Lol, definitely thats the whole point of this project.

3. Did we really ask you these questions?

	No, you but I believe it wakes up the inner nerd inside you to ask more questions.

### Link to the source code

https://github.com/haiku/webkit/commit/f1a711a70db81705c9df6cdaaef53599daf2326f

### WebKit Rewind⏪

I'll go through what has been done till now on webkit2. I know I know that you guys would have read the same stuffs in my previous posts, please don't get bored, I promise it's so interesting this time. I have added stats for nerds *cough, cough* (that is link to commits that implements a specific feature)

> Community Bonding

By this time, I have talked with lot of haiku dev's mostly chitchat. I have never felt so welcomed anywhere. They accepted me even if I asked any stupid question.

Sorry don't know any github links related to this.

> Enable build fix

https://github.com/RAJAGOPALAN-GANGADHARAN/webkit/commit/d88342024e36b710294b87b1e5ce7a2cf3ca661c

Ah, yes I still remember that nostalgic moment, my stepping stone into webkit2 - was as simple as enabling cmake switch. **picture me giving nostalgic reactions for more dramatic effect**

> Build fixes

https://github.com/RAJAGOPALAN-GANGADHARAN/webkit/commit/aec19064eca9a9e30cfdac602f0a15de15ad12d9

Same old drama, had to get webkit to build on haiku before anything could be even done. Initially to get it to compile I had to just define all the platform dependent functions which were just declared and of course lot of time staring at screen to see if there is any error.

Few files were required to be added as a part of forwarding headers. I was confused with local and system includes and then came to know about dilemma between "Rect.h"(Webkit2) and <Rect.h>(BRect).

At this time we had stumbled a problem with deciding type of ProcessID. Our pid_t (long) and other platforms pid_t(int32_t) didn't go well I dont remember the problem exactly, But then we came up with a fix that went well with the webkit2 model too.

https://github.com/RAJAGOPALAN-GANGADHARAN/webkit/commit/e506367bfa01bd99842b00ecd141ddf9955a847d

> Github Practice

So our code was like around 5 years old before I started doing it. After dusting I mean updating our fork with latest upstream code. Before doing any commits I had to have the latest code in my fork. At that point of time all I knew was push,pull,commit and soon realized these are not enough. Took a week to train myself with advanced git commands like rebase,cherry-pick and then tried on the big picture.

To be honest I messed up the first time, Pulkomandy cleaned up my mess as usual and the saying **Second times the charm** is actually true.

> A Minibrowser to satisfy our needs

The compilation is done what now? A browser to test our stuff (even if we have nothing). I stole the design from HaikuLauncher( a testing browser that uses webkitlegacy ). Was just a basic browser with messed up schema but felt so happy that I have accomplished something.

https://github.com/RAJAGOPALAN-GANGADHARAN/webkit/commit/ba318c89f7ebd39a28436b7ca343589dc29da2a5

This is the part where it loads "blank url".

https://github.com/RAJAGOPALAN-GANGADHARAN/webkit/commit/db73dbafe380287638149c9c7c95ef2ee26fb581

![enter image description here](https://rajagopalan-gangadharan.github.io/Host-Server/img1.png)

> Birth of WebView

This the API that actually lets us connect our browser with webkit. It had simple functionality to load a html string as we haven't implemented network stuff yet.

> Process Launch

It hit my brain at a later point of time that this is a multiprocess engine. So where are they?

Here they are - https://github.com/RAJAGOPALAN-GANGADHARAN/webkit/commit/4e6627e0fc3ddcb6a0346771051551499fd07029


![enter image description here](https://rajagopalan-gangadharan.github.io/Host-Server/img2.png)

yayy

> RunLoop

So now the processes are up and running each process should have their main Runloop up and running. They were attached to Applications looper. At this point All BApplication, BLooper, BHandler started making sense to me!

https://github.com/RAJAGOPALAN-GANGADHARAN/webkit/commit/1d893a848557302876edb7a5cea8c4df512edcfc

> IPC (Inter process Communication)

We wish processes had mouths to speak with other processes instead all they had was BMessage. Other platforms used sockets for the same.

Initially we hit some kind of IPC deadlock as we tried to use mainloop as proxy. So we came to know that if we have BMessenger object then we can send message directly. In this way mainloop had to interfere only once for handshaking. *psst* It would be nice if we could directly send to any looper in a different process without much work.

https://github.com/RAJAGOPALAN-GANGADHARAN/webkit/commit/641dd71b0f55295d3c8047f22fc8659422a74536

Few fun facts related to IPC:

    The initialization is done by first exchanging

    'inil'-> sent to application looper (details of particular BLooper where messages from other process is expected)

    'inig'->sent to other process( BMessenger object of this looper).

    When the other process recieves the bmessenger it forwards to correct looper where message should be recieved. Then once connection is successful each process starts sending messages. Each IPC message is tagged 'ipcm' with Data Attached to them.

And yes I started to give meaningful commit messages. Plus here is one of a kind limited edition doodle by me.

![enter image description here](https://rajagopalan-gangadharan.github.io/Host-Server/Ipc.jpg)

> Shared Memory

**Sharing is caring**

Shared memory is pretty much used everywhere in webkit2 starting from sharing history to bitmap across different processes. I learnt about areas in Haiku. It's pretty cool.

https://github.com/RAJAGOPALAN-GANGADHARAN/webkit/commit/e5c14d2f67dfe92f0f7edf85b86133daaa1cdee5

> Redesign of Minibrowser

I realized halfway through that the design of Minibrowser is weird so I added widgets like url bar, buttons etc. All the widgets were even added to respective callbacks i.e pressing back button goes back in history. Score!!

https://github.com/RAJAGOPALAN-GANGADHARAN/webkit/commit/ae1fdf36c991cd0a685524b719c418596bcc5f89

https://github.com/RAJAGOPALAN-GANGADHARAN/webkit/commit/adb7b269ca6aa2a6b9420e69c79cda32315b82a7

![enter image description here](https://rajagopalan-gangadharan.github.io/Host-Server/zeus-3.png)

> Network Process

Now that our browser is ready to post Load a url request to webkit we need to get network process up and running. This process will actually communicate with the INTERNET(WOAH!!) - makes request using \`\`\`BUrlRequest \`\`\`. Html and other resources is received and added to a shared buffer and sent to WebProcess. This has to be called on the runloop( main thread) so we used an explicit call to \`\`\`callOnMainThread\`\`\` provided by WebTemplate Framework. But Pulkomandy suggested the use of SynchronousListener so which makes the BMessage end up on main thread but in this case it doesnt work consistently(Maybe this is a bug where some work is required!).

https://github.com/RAJAGOPALAN-GANGADHARAN/webkit/commit/ff1ed047c83c89c6a6d56a8771edda39d1eeddb5

> Logging

Have you guys ever tried BeDC its a cool logging tool in haiku (Give it a try!). We couldn't perform debug build because it always run of memory at that point of time. Maybe it is fixed with the advent of rpmalloc. But we used BeDC to log and to find which part requires tinkering. It is really colorful too.

https://github.com/RAJAGOPALAN-GANGADHARAN/webkit/commit/3b33d1ac69d2f89ea7f660b3fce881148e6ad1a2

![enter image description here](https://rajagopalan-gangadharan.github.io/Host-Server/zeus-4.png)

And can anyone point me to cool terminal designs? maybe like awesome color combination?

> BackingStore

There comes our final part of browser engine - "Rendering". A backingstore holds ownership of a BBitmap that was painted and shared from WebProcess. Only rendering is done till now, resizing is slow because everytime bits have to imported into bitmap on the UI Process side. It would be nice to have Bitmap access from one process to another through app_server maybe that would be faster.

https://github.com/RAJAGOPALAN-GANGADHARAN/webkit/commit/a1084355da9276ae72073673471fa0930fde40b6

![enter image description here](https://rajagopalan-gangadharan.github.io/Host-Server/render-1.png)

Check this out!

> Cleanup work

So my goal was to get webkit2 rendering and I could proudly say I achieved the base work required. Which we could build on top off it... 

Hence by the end of GSOC we wanted to have clean code with all debugging statements removed,Indentations were fixed (4 spaces for webkit and tab for haiku), Fixed lot of randomness with the code as well as the MiniBrowser.

https://github.com/RAJAGOPALAN-GANGADHARAN/webkit/commit/58274793f52f11a827448c8f2c42e68e2224c6b1

![enter image description here](https://rajagopalan-gangadharan.github.io/Host-Server/render-2.png)

![enter image description here](https://rajagopalan-gangadharan.github.io/Host-Server/render-3.png)

![enter image description here](https://rajagopalan-gangadharan.github.io/Host-Server/render-4.png)

### Conclusion

It was really a nice summer for me. I learnt a lot throughout especially how to use communication platforms efficiently, Work on a complex project, How to not loose my hopes anytime (seriously I doubted myself many times before taking up this project that its going to be impossible). But when we got that page rendered beautifully no words to speak...

### Credits

It is a very pleasant experience for me in Haiku and that was made possible again by sweet developers of haiku for making feel welcomed and helped us when things were seeming to be bad.

A special thanks to my mentor Pulkomandy for patiently listening to me, teaching me even smallest of things and also having some chit chat with me despite his busy schedule. Learnt a lot not only with code but related to life too... Readers may think I'm being overly dramatic but I really mean it. Im just so lucky to have got Pulkomandy as my mentor😀.Lots of love from me!! Especially when we are breaking our heads when browser initialization took about 15 seconds, and it was all because of me where I added sleep(15) and that was the reason for such a mess. Not to mention we were working with this 15 seconds lag until the end. When I said this to Pulkomandy, I expected him to be mad but he handled it so cool embracing my mistake(despite the fact that he told me many times not to mess up platform generic code). I would really like to thank Pulkomandy, well thanks can never be enough.I really owe you. 

I would also like to thank a developer from Qtwebkit and his name is annulen(Konstantin Tokarev ) for helping me initially to get through webkit code, patiently telling me what each stuff did. Im really really grateful for this. Thank you so much!!

I would also like to thank people from webkit for giving us solutions when we were stuck.

And finally, I promise you guys I'm not going to leave Haiku after GSOC. I really want to grow along with haiku sharing all its successes and failures.

### Apologies

English is my pretty weak spot. I'm sorry if there is any spelling mistakes or grammatical errors or any understanding problems(Hey this is just my 5th post so I'm improving). Also I'm sorry if it was too technical and too long...

I had lot to talk in my mind and I didnt make any plans on what to talk just went with the flow so sorry if I missed something important(Please let me know in the comments)

### Future Work

I have only setup a base for us to work upon there is a lot of pending things that needs to be done before it can be put into use.

+ Network process crashes when we visit sites like youtube.com 
+ Few sites only show white page that needs attention(probably solved by painting the next layer).
+ Certificate should be handled properly
+ Only single layer is getting painted so compositing is yet to be done. 
+ Mouse and keyboard events has to be added.
+ Webprocess and Networkprocess should be made as a background process
+ Resizing and memory consuming is slow an alternate mechanism for sharing bitmaps should be figured out.
+ API refactoring - should make API's easier for developers to include in their apps.
+ Get rid of WKRetainPtr - it is soon going to be deprecated and will become difficult to maintain in long run so it should be replaced with RefPtr's.
+ Features like zoom in, zoom out needs to be added.
+ Cleanup forwarding headers
+ Enable tests for webkit2
+ Once all is done(hopefully) update WebPositive
+ Enjoy!!

### TL;DR

This post is a gist of everything I did in this summer. Steps of work I followed goes like this.

1) Enable build fix
2) Get code to compile
3) Created Minibrowser to test webkit2 API's
4) Got webkit to paint webpage!!

And other emotional,technical stuff.
Check out successfully merged PR's

https://github.com/haiku/webkit/pull/8
https://github.com/haiku/webkit/pull/13
https://github.com/haiku/webkit/pull/14
https://github.com/haiku/webkit/pull/15
https://github.com/haiku/webkit/pull/16
https://github.com/haiku/webkit/pull/23
https://github.com/haiku/webkit/pull/25

List of sites that currently work:

    https://www.google.com
    http://www.gmail.com
    http://bing.com
    http://example.org
    https://text.npr.org/

List of sites that doesn't crash but shows white page

    https://haiku-os.org
    http://perdu.com


List of sites that crash

    http://github.com
    http://firefox.com
    http://youtube.com

THANK YOU FOR SCROLLING BY!!

`


export var iiit = `
## IIITDM Research Intern
____

#### May 2018 - June 2018

Automating Detection of fabric flaw 
+ Implemented Transfer Learning with COCO Model, alongside edge detection algorithms to detect loops and other stains present on fabric using OpenCV and TensorFlow. 
+ Optimized model efficient enough to run on Raspberry Pi.
+ Initially the prototype used AlexNet model from R Lang to perform flaw detection but my suggestion of using COCO model proved to be very successful.

### Tech Stack
+ Python
+ Arduino
+ Tensorflow
+ C++

### Visual Info

![enter image description here](https://rajagopalan-gangadharan.github.io/Host-Server/iiit1.PNG)
![https://rajagopalan-gangadharan.github.io/Host-Server/iiit2.png](https://rajagopalan-gangadharan.github.io/Host-Server/iiit2.png)
![enter image description here](https://rajagopalan-gangadharan.github.io/Host-Server/iiit3.png)

![enter image description here](https://rajagopalan-gangadharan.github.io/Host-Server/iiit4.png)
`


export var vpropel_data = `

## VPROPEL
________
#### July 2017 - June 2018
VPROPEL is an online competitive programming platform designed for the students of VIT made by VIT, SCSE Chennai. 

+ Was the youngest member of the team.
+ Mentored by experienced professors.
+ Initially worked as a software tester, Functional testing using Selenium, Factory Boy
+ Developed a closed browser shell using chromium embedded framework to prevent plagiarism.
+ Used ELK stack to detect similarity of code.


### Tech Stack
+ Python
+ Django
+ Selenium
+ Factory boy
+ CEF (c++)
+ shell scripting
+ ELK ( Elastic search, Log Stash and Kibana)

### Screen Shots
![Screen Shot of VPROPEL](https://rajagopalan-gangadharan.github.io/Host-Server/vpropel_screenshot.PNG)

### Letter of Appreciation

![Letter of Appreciation](https://rajagopalan-gangadharan.github.io/Host-Server/vpropel_letter.png)

`


export var readme = `
## Readme
______

Hey, Welcome to OS themed personal portfolio of Rajagopalan. This readme helps you to navigate around the OS.

### About:

JS-OS is a fun project, I started writing mostly because it's hard to write kernel and other stuff from scratch. While this on the other hand, its entirely written in javascript with help of React.

### Fun things to check out:

Check out JS-OS apps by opening the launcher( spaceship icon )
+ Has a window management system, event handling mechanism along with process control to emulate an OS on the web.
+ JSON filesystem with API's to provide abstraction.
+ Want to code, no problem check out CodeStudio (powered by monaco editor) and JSOS has cpp compiler(clang),java and python interpretor installed by default. Fire up a terminal to check it out.
+ Wanna make Sticky notes to remind you, I got you covered.
+ Use a calendar to plan events.
+ Just a sample 3d particles app to demonstrate the power of jsos.
+ In the mood for a retro game, have fun playing mineweeper.
+ I do write some blogs, fire up Blogger app and check it out to understand some advanced concepts like LCA, and tricks in competitive programming.
+ Clock is a bit funny, but I'll fix it up in future iterations.

### What's in it for you?

+ Well I'm a beginner in writing softwares and stuff, so I would love to get help from my fellow software developers in form of code contribution or feedback. Beware the code is really messy. It's just a hobby project of mine but I have learnt a lot along the way. Be sure to check out the official [repository](https://github.com/RAJAGOPALAN-GANGADHARAN/JS-OS).


### P.S

Hope you like this project. Be sure to leave a feedback or comment( good or bad).


`

export var data_qt = `

## FreeLance Software Developer - Qt
_______________

#### September 2019 - Present

+ Worked on porting Webkit using Cross platform UI framework Qt5.  
+ Various Networking Protocols implemented with native Qt network API’s .  
+ Cross platform Browser Engine over Mac, Windows, Linux, Android using Qt5.  
+ Used various rendering API’s of Qt5.
+ Ported most parts of Platform Integration Layer like Process spawning, Network Fetching threads, Bitmap drawing using Qt APIs. Ported Webkit tests to benchmark and diagnose Qtwebkit. 
+ Configured GitHub actions for building Qtwebkit across multiple platforms and Travis for QA Testing (YAML). 
+ Wrote python scripts for downloading qt binaries for CI and automated build process.


### Patch List:
[QtWebkit](https://github.com/qtwebkit/qtwebkit/pulls?q=is%3Apr+author%3A%40me+)

[Release Tests](https://github.com/qtwebkit/release-tests/pulls?q=+is%3Apr+author%3A%40me+)



`


export var data_keyboard = `

`