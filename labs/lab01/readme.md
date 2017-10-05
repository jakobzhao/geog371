# Lab 1: Project Management for Web Mapping

> Winter 2017 | Geography 371 | Geovisualization: Web Mapping
>
> **Instructor:** Bo Zhao  **Location:** Wilkinson 210 | **Time:** Th 1000 - 1150
>
> **Assigned:** 09/21/2017 | **Due:** `09/28/2017 @11:59pm` | **Points Available** = 50

Welcome to the lab session of **GEOG 371: Web Mapping**! In this lab, we will briefly introduce the Digital Earth Lab at Wilkinson 210, download the course material and more importantly, help you get familiar with the major operations on project management for web mapping. In practice, you will start with installing the required software (on your own computer or laptop), registering a GitHub account, and learn how to use several software products, such as Webstorm, Typora, and Git. To test your learning outcomes, you will be asked to generate a  GitHub repository to publish your resume on the web. Okay, let us get started!

# 1. Preparations

## 1.1 Digital Earth Lab @ Oregon State University

Digital Earth Lab is a teaching facility primarily for GIS, remote sensing, cartography, numerical analysis, and scientific visualization. The classroom is a facility of the OSU College of Earth, Ocean, and Atmospheric Science and is supported by the OSU Media Services. The lab was originally funded by a NASA infrastructure grant to Sherm Bloomer (Professor & Dean, College of Science) and Nick Pisias (Professor & former associate dean of CEOAS). Digital Earth is located in 210 Wilkinson Hall and is one of the most advanced teaching facilities on the Oregon State campus. We have been operational since the beginning of Spring term, 1999.

The lab generally opens 8am-5pm , a detailed schedule can be found at [http://dusk.geo.orst.edu/de/de_teach.html](http://dusk.geo.orst.edu/de/de_teach.html). The manager of the facility is Cory Langhoff. If you need afterhours access, contact Cory by email [langhofc@oregonstate.edu](mailto:langhofc@oregonstate.edu), or dial 7-2532 to make arrangements.

## 1.2 Software Setup

For this lab, you will use Webstorm, typora and git. Also these software products have already been installed in the computers in the Digital Earth Lab, except Typora (but you can always use text editor alternatives, such as Webstorm, Notepad, Brackets, and etc.). But I highly recommend you to install all these three.

- **Webstorm:** A professional web mapping programming development environment ([Click here for the installation instruction](https://www.jetbrains.com/webstorm/buy/#edition=discounts)). and make sure you install the edition **for students and teachers**). Check a tutorial on installing Webstorm at [here](install_webstorm.md);

- **Typora:** An editor for composing Markdown files ([Click here to download Typora](https://typora.io/)). Typora is dedicated to process markdown files. It can browse, edit, and even convert markdown files to pdf or word documents; and

- **Git:** A version control system (VCS) for tracking changes in computer files and coordinating work on those files among multiple people ([Click here to download, choose the right platform, and then install](https://git-scm.com/downloads)). 

If **Git** is successfully installed, type `git` in command prompt (if you are a Windows user) or terminal (if you are a Mac or Linux user), the following screen will be shown up.

![](img/git-command.jpg)

Using `git`, you can synchronize the course materials and also publish your own GitHub repository.  We will talk about that later in this lab.

### 1.3 Register a GitHub account

1\. You will apply for a GitHub account for managing and synchronizing your web mapping project. If you do not have a GitHub account yet, please sign up at [https://www.github.com](https://www.github.com)

> **Do you know the differences between Git and GitHub?**
>
> **Git** is a version control system (VCS) for tracking changes in computer files and coordinating work on those files among multiple people. It is primarily used for software development, but it can be used to keep track of changes in any files. Git was created by **Linus Torvalds** in 2005 for development of the Linux kernel, with other kernel developers contributing to its initial development.
>
>  **GitHub** is a web-based Git or version control repository and Internet hosting service. GitHub offers both plans for private and free repositories on the same account which are commonly used to host open-source software projects. As of April 2016, GitHub reports having more than 14 million users and more than 35 million repositories, making it the largest host of source code in the world.

## 2\. Download the course material

In this course, all the material is stored on GitHub. We will go through the steps on how to download the material as below.

1\. On GitHub, each project is stored as a project repository. The repository for this course is located at [https://github.com/jakobzhao/geog371](https://github.com/jakobzhao/geog371). Please navigate to this url on a browser such as `Chrome`. As indicated by the course website url, this repository is created by me; my GitHub account name is `jakobzhao`, while the repository name is `geog371`. 

2\. On the front page of this repository, please click the green button named after `Clone or download` . To download the course material, you can click the `Download ZIP` button, as a result, a compressed file of the course material will be downloaded. 

3\. However, **we recommend you to clone this project repository**. You can get the **git url** of this repository on the same information window. The git url is [https://github.com/jakobzhao/geog371.git](https://github.com/jakobzhao/geog371.git).

4\. Next, open your working space on your local computer through command prompt if you are on Windows or through terminal if you are on a Mac or Linux. For example, the working space of my computer is located as `C:\Workspace`.

```powershell
C:\Users\[your_username]>cd C:\Workspace
C:\Workspace>
```

> **Note:** If you are working on any computer in the Digital Earth Lab, the folder "Workspace" under the root of C drive. Also, you might not have the privilege to make such a folder. So to work on any computer in the Digital Earth Lab, you can navigate to the Desktop folder. See the command lines below.

```powershell
C:\Users\[your_username]>cd Desktop
C:\Users\[your_username]\Desktop>
```

5\. Having the **git url**, we will need to use the command `git clone` to clone the GitHub repository to your local computer.

 ```powershell
C:\Workspace\git clone https://github.com/jakobzhao/geog371.git
Cloning into 'geog371'...
remote: Counting objects: 962, done.
remote: Compressing objects: 100% (750/750), done.
remote: Total 962 (delta 214), reused 917 (delta 177), pack-reused 0Receiving objects:  99% (953/962), 158.77 MiB | 1.60 MiB/s
Receiving objects: 100% (962/962), 158.88 MiB | 1.60 MiB/s, done.
Resolving deltas: 100% (214/214), done.
Checking out files: 100% (650/650), done.
 ```

6\. To review the files and folders in the downloaded/cloned repository, you need to `cd` into the root directory of this repository. If you are on a Mac or Linux, type `ls` to check the file list of this repository, or try `dir` if you are on a Windows. Take windows for example.

```powershell
C:\Workspace>cd geog371

C:\Workspace\geog371>dir
 Volume in drive C has no label.
 Volume Serial Number is 3E8C-9A9E

 Directory of c:\Workspace\geog371

09/19/2017  09:12 PM    <DIR>          .
09/19/2017  09:12 PM    <DIR>          ..
09/19/2017  01:41 AM               412 .gitignore
09/19/2017  09:49 PM    <DIR>          .idea
09/19/2017  02:19 AM    <DIR>          labs
09/19/2017  01:41 AM    <DIR>          lectures
09/19/2017  01:41 AM             7,816 LICENSE
09/19/2017  01:41 AM    <DIR>          projects
09/19/2017  01:41 AM    <DIR>          readings
09/19/2017  04:35 AM             6,011 readme.md
09/19/2017  01:41 AM    <DIR>          resources
               3 File(s)         14,239 bytes
               8 Dir(s)  903,569,551,360 bytes free
```

In the root directory, there are folders like labs, lectures and readings, and files like readme.md and LICENSE. 

7\. Next, we open the `readme.md` file using `Typora`.  If the previous steps work successfully, we can read the similar content as shown below.

![](img/typora_syllabus.jpg)

8\. Once the course material is hosted on GitHub, it can be easily shared with a larger community and update. To synchronize the course material on remote GitHub repository to your local computer, you need to implement two sequential command lines `git checkout --force` and `git pull` in the root directory of the repository. Once the two commands are executed. An update notice will be shown as below.

```powershell
C:\Workspace\geog371>git checkout --force
Your branch is up-to-date with 'origin/master'.

C:\Workspace\geog371>git pull
remote: Counting objects: 3, done.
remote: Compressing objects: 100% (3/3), done.
remote: Total 3 (delta 2), reused 0 (delta 0), pack-reused 0
Unpacking objects: 100% (3/3), done.
From https://github.com/jakobzhao/geog371
   13b2cab..baf74b1  master     -> origin/master
Updating 13b2cab..baf74b1
Fast-forward
 readme.md | 3 ++-
```

Now, the course material on your local computer is updated. 

> **Note:** To ensure you are reading the latest version of the lecture or lab handouts, you need to regularly synchronize the course material, especially before class. 
>
> If you implement the above two commands in a Mac or Linux system, you might need to add `sudo` before `git`to a lack-of-privilege issue. For example, `sudo git clone`, `sudo git checkout --force`. In general, the command `sudo` will assign the superuser privilege to the command line. 

9\. Before we jump to the next section, please:

- Star the repository by pressing the `star` button on the top right, and;
- Navigate to Dr. Zhao's front page at [https://github.com/jakobzhao](https://github.com/jakobzhao), and click the `Follow` button to be a follower. 

## 3\. Project management

In this section, we will introduce a series of operations related to project management, such as create a project repository, compile a markdown file, and upload files to GitHub, and at last, publish a repository. As a practice, we will build a GitHub repository for your online resume.

### 3.1 Create a repository for your project

1\. Navigate to [https://github.com/new](https://github.com/new), and input your repository name in the blank text box for `Repository name`. Here, please name your repository in the format of **[account_username].github.io**. So, if your account_username is `jakobzhao`, this repository name will be **jakobzhao.github.io**. 

![""](img/create-new-repository-2.jpg)

2\. Besides, make sure you **CHECK** the box `Initialize this repository with a README`. You can leave other options by default. 

![](img/create-new-repository-3.jpg)

3\. Next, click the `Create repository` button. As a result, a new repository `[account_username].github.io` is created. You can access this repository through the link `https://github.com/[account_username]/[account_username].github.io`. For example,  you can access the repository I created through this link [https://github.com/jakobzhao/jakobzhao.github.io](https://github.com/jakobzhao/jakobzhao.github.io).

### 3.2 Craft a Markdown file

1\. On your local computer, create a text file, and name it `resume.md`.

2\. Open this file `resume.md` with `Typora`. In the Typora's editor, you can work on your resume. If you are not familiar with Markdown, please refer to a tutorial at [here](https://guides.github.com/features/mastering-markdown/). Or you can start with copying and pasting the template below. Notably, this template is only for your reference. You probably do not want to share too much about your personal information such as phone number, address and etc.

```markdown
# Your Name

1234 Main St., City, State 12345

(555) 555-5555

your.name@example.com

http://www.example.com

http://www.linkedin.com/in/yourname

# Summary

Quick Summary (not objective) specifically highlighting why you qualify for the job.

# Work Experience (only last 10 years)

## University Name 1 (City, State)

* [University 1][] description, particularly if not well-known.*

** Position Title (include alternate titles in parentheses)** (Start Date - End Date)

Summary of your role

- Accomplishment that contains **bold text**.
- Accomplishment
- Accomplishment
- Accomplishment

## University Name 2 (City, State)
*[University 2][] description, particularly if not well-known.*

** Position Title (include alternate titles in parentheses)** (Start Date - End Date)

Summary of your role

- Accomplishment that contains **bold text**.
- Accomplishment
- Accomplishment
- Accomplishment

## University Name 3 (City, State)
* [University 3][] description, particularly if not well-known.*

** Position Title (include alternate titles in parentheses)** (Start Date - End Date)

Summary of your role

- Accomplishment
- Accomplishment
- Accomplishment
- Accomplishment


[University 1]: http://www.univ1.edu
[University 2]: http://www.univ2.edu
[University 3]: http://www.univ3.edu
```
>**Note:** This resume template is from [http://www.jasonfilley.com/resumeinmarkdown.html](http://www.jasonfilley.com/resumeinmarkdown.html).

3\. In fact, you can use any text editor to generate Markdown files. If you do not have `Typora` at hand, you can use `Webstorm` as well. To enable `Webstorm` to recognize the markdown syntax, you will need to install a plugin named `Markdown Navigator`. To do that, open `Webstorm`, on the top menu, navigate through `File->Settings...`. In the popped up window, click `Plugins` tab, and then click the `Browse Repositories` on the bottom left of the window. In the newly popped-up window, search "markdown navigator" in the search box, as a result, the plugin "Markdown Navigator" will be found out. Then, you will need to install this plugin by pressing the green button `install`. Once installed, you might want to restart `WebStorm` to activate this change. Please let the instructor know if you meet any difficulty in installing this plugin.

### 3.3 Upload files to GitHub

Once you have drafted out your resume in the `resume.md` file. You will upload this file to the **root** of the project repository `https://github.com/[account_username]/[account_username].github.io` . In general, there are three solutions to complete this task, we will introduce them one by one.

#### 3.3.1 Drag & drop

1\. Open a web browser such as `Chrome`, navigate to the front page of the repository you have just created.

2\. Next, use your mouse to drag the `resume.md` file to the front page. Once you see a notice saying **Drop to upload your files**, you can then release your mouse. A new interface will appear as below. 

> **Note:** Certainly, you can drag and drop multiple files and/or folders. In this lab, we just upload one single file.

![](img/after-the-drop.jpg)

3\. Before pressing the green button `Commit Changes`, you might want to add a title and/or some descriptions for this commit. It will help you organize your commits.

#### 3.3.2 Git push

You can also upload the `resume.md` through `git push` command on either command prompt or terminal.

1\. Download the repository  `https://github.com/[account_username]/[account_username].github.io`  following the instruction in Section 2 ***"Download the course material”***.

2\. In the root directory of the downloaded repository, please copy the edited `resume.md` to the root.

3\. Next, you can push this change to the remote repository by implementing two command lines `git commit` and  `git push`. Since you have add new `untracked` files to this repository, you need to also implement another command line `git add` prior to the `git push`. As listed below.
```powershell
c:\Workspace\jakobzhao.github.io>git add -A
c:\Workspace\jakobzhao.github.io>git commit -a -m "update the resume.md"
c:\Workspace\geog371>git push
Username for 'https://github.com': jakobzhao
Password for 'https://jakobzhao@github.com':
```

> **Note:** Again, if you use a Mac or Linux, you might need to add `sudo` in front of the command line to avoid the privilege deny issue. Besides, the command prompt or terminal may ask you for GitHub username and password, please be prepared with such information.
>

In a nutshell, to push a change from your local computer to GitHub, you will need to (1) `git clone` a repository from GitHub, (2) `git add` the untracked file to the repository, (3) `git commit` that you have made a change, and at last, (4) `git push` your changes to the GitHub repository.

#### 3.3.3 WebStorm Commit

We can also use Webstorm to upload files to GitHub repository or more generally, commit changes. Compared with the first two solutions, I recommend you use Webstorm if you prefer graphic user interfaces.

1\. Download the repository  `https://github.com/[account_username]/[account_username].github.io`  following the instruction in Section 2 ***"Download the course material”***.

2\. In the root directory of the downloaded repository, please copy the edited `resume.md` to the root.

3\. Open the program `Webstorm`. By default, the welcome window will pop up. In this welcome window, click `Open` button on the bottom right. Then, another new window `Open File or Project` will pop up. Select the downloaded repository. The name should be in the format of `[account_username].github.io`.

![](img/open_webstorm_project.jpg)


4\. Once you open this repository, you can edit the `resume.md` in Webstorm.

5\. To update any edit changes, on the top menu, Click `VCS` on the top menu, and then `commit...` on the dropdown menu.

![](img/commit.jpg)

6\. On the popped-up `Commit Changes` window, make sure you check the `Unversioned Files` box if there is, also, you need to leave some message in the `Commit Message` textbox and input the name of the author who made this change.

![](img/commit_change.jpg)

7\. Before you commit, hover your mouse on the `Commit` button, then a dropdown menu will show up, **Choose `Commit and Push...`**. Then on the newly popped up window, click `push` to finish.


> **Note**: As you might already aware of, the first two steps are as same as those in the solution 2. The difference is, solution 2 works on a terminal/command prompt environment (a command-lline user interface), while solution 3 works in Webstorm (a graphic user interface).
>
> Using either of the three solutions, you can upload your resume or any other files to GitHub. Then, log on to this repository on GitHub to see whether the uploaded content is applied.
>
> Now you have already known how to commit a change. In practice, you will use this operation very frequently. Other than committing changes, you may also need to synchronize your latest version of your GitHub repository. Please think about how can we do that on Webstorm.

### 3.4 Publish your repository

Once the `resume.md` is uploaded to the root of the GitHub Repository, you can see this file listed in the root. Moreover, GitHub provide a new function named **GitHub Page** that converts a markdown file as a web page. Because your resume is located at the root of the repository, you can directly access your resume by visiting `http://[account_username].github.io/resume` if you implement the following steps.

1\. please click the `Settings`tab on the top bar of the repository front page. 

2\. On the `GitHub Pages` Section, please click the  `Source`  dropdown list and choose `master branch`.  Next, press the `Save` button.

3\. It usually takes several seconds to 1~2 minutes to apply this setting. If this setting is activated, you can read your resume from `http://[account_username].github.io/resume`.

## 4. Deliverable

Before submitting this lab, please make sure both the **GitHub repository** and the **GitHub page** work properly. In this lab, you are excepted to submit the url of the GitHub repository to the **Canvas Dropbox** of this course. This url should be in the format of `https://www.github.com/[account_username]/[account_username].github.io`. To do that, check the item of this lab on the assignment tab, and then press the `Submit Assignment` button. Please contact the instructor if you have any difficulty in submitting the url link. Here are the grading criteria:

1\. A GitHub account is registered, You have followed the instructor's GitHub account and `star-ed` the course GitHub repository. (6 POINTS)

2\. The repository should be named after `[account_username].github.io`. (5 POINTS)

3\. The `GitHub page` function of the repository should work properly. That said, your resume can be visited from `https://[account_username].github.io/resume` (5 POINTS);

4\. To hone your skills in generating Markdown files, the resume could be built upon the template that was shown in `Section 3.2`, but we still encourage you customize your resume. In terms of the format, your online resume should contain:

* different levels of headers (4 POINTS);
* block quotes (4 POINTS);
* url links (4 POINTS);
* one or several images (10 POINTS);
* A list (4 POINTS);
* A table (4 POINTS); and
* One or several emoji icons (4 POINTS).

> **Note:** Lab assignments are required to be submitted electronically to Canvas unless stated otherwise. Efforts will be made to have them graded and returned within one week after they are submitted.Lab assignments are expected to be completed by the due date. ***A late penalty of at least 10 percentage units will be taken off each day after the due date.***

> If you have a genuine reason(known medical condition, a pile-up of due assignments on other courses, ROTC,athletics teams, job interview, religious obligations etc.) for being unable to complete work on time, then some flexibility is possible. However, if in my judgment you could reasonably have let me know beforehand that there would likely be a delay, and then a late penalty will still be imposed if I don't hear from you until after the deadline has passed. For unforeseeable problems,I can be more flexible. If there are ongoing medical, personal, or other issues that are likely to affect your work all semester, then please arrange to see me to discuss the situation. There will be NO make-up exams except for circumstances like those above.
