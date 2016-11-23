
![cover](https://raw.githubusercontent.com/desaroger/recruiter/master/var/screenshots/list.png)

# Introduction

Recruiter is a web app for recruiters who want manage his contacts network. This project only has learning purposes and to check my skills.

# Run it

Following these steps you will run the dummy server on port 3000 and the web app on port 8080.
This guide takes for granted you have node and npm, as needed for run the dummy server.

Clone the repository:
```bash
$ git clone git@github.com:desaroger/recruiter.git
$ cd recruiter
```

Install the dependencies (only 3 dependencies):
```bash
$ npm i --production
```

Run the dummy server:
```bash
$ npm run api
```

On another terminal, run the web app:
```bash
$ npm run serve
```
 This will serve the folder `/build` with [http-server](https://github.com/indexzero/http-server).

For more commands look at the scripts on `package.json` file.

# Project Requirements

You need to build an Angular app with:

- A list of contacts (WhatsApp like)
- A detail/edit view of each contact
- It should allow create, edit and delete entries
- You can create a dummy-server

# First approach

I am going to make an MVP with the minimum requirements: A basic CRUD app of contacts. Name, phone, etc.
And later I will add extra functionality, like search, groups, etc.

I'm going to use Angular 1.6. I will use Webpack to compile everything, jasmine, karma, coverage, eslint, pug, sass... ES6 too with babel.
I will try to add some basic tests. I am not happy unless everything is tested, but on this frontend application, as testing directives in Angular is such a nightmare, I will be happy if I can test some basic functionality.

# Whys

Why I decided to use each technology.

### Git Flow

I always follow a standard for almost everything. I have used git-flow here to keep the repository arranged.

### Webpack

This is a little project and webpack actually isn't needed, but you never known how big a project can grow. I never scaled a project too big, always scaled to a good approach or too small, so when a project has angular, ES6, tests, pug (...) I know webpack will save a lot of time.

### ES6

This isn't needed. I am in love with new ES6/7 features, but none is critical to this project. But since you are using webpack,  add babel is quite straightforward, and it hasn't too much cons. You must go carefully configuring karma and coverage, but is not extremely difficult.

### Eslint

I don't care if you prefer spaces or tabs, or curly brace up or down, but you need to be consistent along your application. I chose Eslint with the Google configuration. I chose Google's for not a good, elaborate reason. I usually use the most common for each app. So if I am using angular, Google maybe is the logical choice.

### Jasmine

In my little experience with testing, Mocha is my choice if I am developing with NodeJS and ES6, as in the past I had issues with coverage and Jasmine with ES6. And to not use Mocha always and as most of examples of testing Angular are made with Jasmine, Jasmine will be my choice this time. As before, not a big reflexion picking up Jasmine, Mocha would have worked just as well in this case.

### Pug

I have tried Mustache, handlebars, underscore, twig... But none is (in my opinion, of course) as clean and fast (writing, not speaking of performance) as Pug. I am in love.

### Sass

I have doubts with this. I am going to use a css framework, and I am not going to make full custom components. I pretend to only make some little changes, so using SASS maybe isn't needed and I was thinking about it for a while. I finally installed it, as it has no cons (it doesn't affect the performance of the app or anything) and will made the styles more readable.

### Angular Material

Sincerely, I am bored of seeing all webpages the same. I am always thinking what will be the next style. Bootstrap is almost everywhere. I like Material and to me is not bad to do a webpage nowadays using Material styles. But lately the sites that use Material are growing and I am starting of be saturated.

So... why I used material? For two reasons mainly: This is a web app, it can be a prototype of a future mobile app and using the same styles as the global Android style is, maybe, a good choice. The second reason is that Angular Material is the most straightforward, angular native framework, so for a little project like this it will speed things up.

### Json-server

There is a lot of options in order to make a dummy CRUD server. My first thought was make a Loopback API REST. With the loopback's console you can make a full featured API REST in minutes. But too much for a dummy server. Later I thought to use the $httpBackend service of angular, which allow mock http calls and is used mainly for tests purposes, but I thought it will be awesome to have a dummy server without anything, no console, no running a server, only the browser. But I was unable to find out a library which uses the httpBackend to make a CRUD, and I don't want to lose time building it. Json-server allows, with only a json, make an REST API. And also I wanted to be able to do a full-text search, and json-server allows this and a lot more things, so it's perfect.

# Result

### List with filtering by tag

This is the first you see when enter on recruiter. The list of contacts, the big button to add a new contact, and the filters. The tags on the contacts data can used for filtering and found a contact by employed/unemployed, frontend/backend, etc.

![list](https://raw.githubusercontent.com/desaroger/recruiter/master/var/screenshots/list.png)

### Searching

You can make a quick search based on all the fields of the contacts.

![search](https://raw.githubusercontent.com/desaroger/recruiter/master/var/screenshots/search.png)

### Detail of a contact

On the detail you can see all the available info, including a short description, a image, emails, phones and tags.
The envelope icon allows you send an email to this address, and the phone icon allows call if you are on a phone.

![detail](https://raw.githubusercontent.com/desaroger/recruiter/master/var/screenshots/detail.png)

### Edit a contact

You can edit all the fields. The email, phone and tags are *chips*, so are very easy to manage.

![edit](https://raw.githubusercontent.com/desaroger/recruiter/master/var/screenshots/edit.png)

The image can be updated, allowing pick one from your pc.

![update image](https://raw.githubusercontent.com/desaroger/recruiter/master/var/screenshots/update-image.png)

The tags is a *chips* field with autocomplete, so when you start writing appears the related existing tags

![autocomplete](https://raw.githubusercontent.com/desaroger/recruiter/master/var/screenshots/autocomplete.png)

### Deleting a contact

When you click on the delete button, a confirmation dialog will show to ensure you want to delete the contact.

![delete dialog](https://raw.githubusercontent.com/desaroger/recruiter/master/var/screenshots/delete-dialog.png)

### Responsive

We use css flex simplify the responsiveness.

![responsive big](https://raw.githubusercontent.com/desaroger/recruiter/master/var/screenshots/responsive-big.png)

![responsive small](https://raw.githubusercontent.com/desaroger/recruiter/master/var/screenshots/responsive-small.png)

### Quality code

![jsdoc](https://raw.githubusercontent.com/desaroger/recruiter/master/var/screenshots/jsdoc.png)

All the code:
- Is documented with JSDoc standard.
- Pass Eslint following the Google Javascript style guide.

# Conclusions

I run out of time as I lost it with little issues with layouts on flexbox (first time using it) and webpack config (mainly). So to not delay more the end of the project I decided to stop here and not continuing adding things.

I loved working on this project. This allowed me use to use Angular Material that had never used it. I think, besides the things that I could not do, this it's a good project, prepared for grow as is structured as a big application. Thanks to Angular was easy and fast to make an app with a great performance and with few lines of code. And thanks to Webpack I was able to use babel, pug, sass, etc easily.

# Things that I left

**tests**: I'm not happy, but I am out of time and testing angular is (at least for me) a slow process. This isn't an excuse, this needs tests and if this had an update the most needed feature would be the tests.

**multilayout**: I wanted to add a layout change button too, to toggle between list and a tiles view. But the flexbox takes time and this isn't a critical need.

**badges**: I wanted to add travis and codeclimate to show the badges on this readme. Also I prepared the test coverage for this project, but it has no tests. I have 100% covarege forever, yippee.



# Times

| Task                                    | Expected | Reality | Observations                                                        |
|-----------------------------------------|----------|---------|---------------------------------------------------------------------|
| Basic documentation                     | 0:30     | 1:00    | I wrote more text than expected, and slower.                        |
| Install everything, webpack, babel, etc | 0:30     | 0:45    | Wep, webpack.                                                       |
| MVP                                     | 4:00     | 5:00    |                                                                     |
| Documentation (including extras)        | 2:00     | 2:00    |                                                                     |
| (extra) search                          | 2:00     | 3:00    |                                                                     |
| (extra) groups                          | 2:30     | 2:00    |                                                                     |
| (extra) html5 buttons                   | 1:00     | 0:10    |                                                                     |
| (extra) multilayouts                    | 2:30     | 0:00    | Canceled.                                                           |
| Unexpected things added on the fly      | 0:00     | 4:00    | I added a lot of little things that initially I didn't think to do. |