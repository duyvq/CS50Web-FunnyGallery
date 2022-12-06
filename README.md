# Project: Funny Gallery

Final Project for [CS50's Web Programming with Python and JavaScript.](https://cs50.harvard.edu/web/2020)


[Demo](https://youtu.be/lz307Ldm1Lw)


Thanks to the all lecturers and staffs.

## About Funny Gallery

Funny Gallery is a social media platform simulating 9GAG – a platform where people upload and share user-generated meme. This application made using Django, JavaScript, HTML, CSS, Bootstrap.

In Funny Gallery, user can publish pictures (with some description about the picture, if any) that they love, add text to picture create meme then upload to platform or just download it to their PC.

User can browse the platform for entertainment, search for meme/picture that uploaded to platform, view content/description of each meme/picture (if any) on specific url of meme/picture. There, user can leave comment on a particular meme/picture or reply other’s comment.

## Distinctiveness and Complexity

This web application is distinct from the other projects in this course and is not based on the old CS50W Pizza project. 
It is neither a social network project nor an e-commerce project. It a social media platform where user create meme and publish it.
It is more complex than the other projects as:
- The login/register is single page application using AJAX to communicate with back-end, to have a bit more friendly UX.
- It allows user to preview picture before publish, or write text dynamically to picture (using base64encode/decode) to make meme then publish (or just download it to their PC).
- It allows user to reply on a specific comment dynamically.
- It uses 4 models.
- It is mobile-responsive with the help of Bootstrap and some custom CSS.

## File Overview

|**Filename**                                  |**Description**|
|----------------------------------------------| :---------:|
|gallery/static/gallery/bootstrap.bundle.min.js|File for JavaScript function of Bootstrap’s template.|
|gallery/static/gallery/bootstrap.min.css      |File for CCS of Bootstrap’s template.|
|gallery/static/gallery/detail.js              |Contains JavaScript function for render page of a specific picture/meme, including comment/reply|
|gallery/static/gallery/index.js               |Contains JavaScript function for render general view of all pictures/memes on platform, including search function.|
|gallery/static/gallery/login-register.js      | Contains JavaScript function for opening/closing login/register modal dynamically and submit form using AJAX.|
|gallery/static/gallery/navbar.css             |CSS file from Bootstrap for NarBar.|
|gallery/static/gallery/style.css              |Custom CSS file.|
|gallery/templates/gallery/detail.html         |Template for page of a specific picture/meme.|
|gallery/templates/gallery/index.html          |Template for general view of all pictures/memes on platform.|
|gallery/templates/gallery/layout.html         |General layout for all other HTML template.|
|gallery/templates/gallery/meme.html           |Template for add, edit and describe picture/meme. And upload/download after editing.|

## How To Run

To run this project locally, follow these steps
1. Clone this repo or download zip
2. Unzip it
3. In a terminal, navigate to the project directory
4. Create virtual environment and activate, [Link for official instruction](https://packaging.python.org/en/latest/guides/installing-using-pip-and-virtual-environments/#creating-a-virtual-environment)
4. Install the requirements `pip3 install -r requirements.txt`
6. Run the django server `python3 manage.py runserver`
7. Enter URL and browse

## Acknowledgements and References

Referenced the previous projects and code in lecture’s note/source code.

[Django Documentation](https://docs.djangoproject.com/en/4.1/)

[Bootstrap Docs](https://getbootstrap.com/docs/5.2/getting-started/introduction/)

[Mozilla](https://developer.mozilla.org/en-US/docs/Web)

[W3School](w3schools.com/)


