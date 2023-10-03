
# Abe Kinney

<br />
<div>
  <h2 align="center">Anchore People List</h2>
  <p align="center">
    Vite scaffoled using React and React-Hook-Form to add, edit and delete a list of favorite people.
</div>
<!-- TABLE OF CONTENTS -->
<br />
<br />
<details>
  <summary>Table of Contents</summary><br />
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#assignment">Assignment</a></li>
    <li><a href="#improvements">Improvements</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

Well, it is an interesting time in Javascriptland. The last couple years have seen Create React App be deprecated and either Next.js or Vite (React) used in it's place. I chose Vite and React. As React-Hook-Form is bcoming the industry standard I used that. For off the shelf components I used Material UI. For the server/API I used an express server that uses json-server to replicate a database/REST API. It reads and writes to a local JSON file.


<p align="right">(<a href="#readme-top">back to top</a>)</p>


### Built With

This section should list any major frameworks/libraries used to bootstrap your project. Leave any add-ons/plugins for the acknowledgements section. Here are a few examples.

* Vite
* React
* React-Hook-Form
* Material UI
* Express/json-server

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

Local set up is very simple

### Prerequisites

Make sure you have the latest node & npm

  ```sh
  npm install npm@latest -g
  ```

### Installation


1. Clone the repo
   ```sh
   git clone https://github.com/mfp4073/anchore
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Run local API/Server
   ```sh
   npm run json-server
   ```

4. Run local dev instance
   ```sh
   npm run dev
   ```

* ALTERNATIVELY:
the Snackbar notifications will fire twice as this is Dev mode and React forces strict mode. If you want to avoid this do this in place of step 3:

  ```sh
   npm run build
   npm run preview
   ```

5. Open app

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ASSIGNMENT -->
## Assignment

Create a responsive React-based application that accepts user input in order to present data in an editable tabular form. The basic flow for data submission is described below:

Business Requirements
- [x] Clicking an Add User button will open a modal dialog

- [x] The modal dialog will contain a form that provides the following fields, all of
which must be populated unless otherwise stated:
  - First Name
  - Last Name
  - Date of Birth
  - Phone Number
  - Address
  - Notes (This field must be present, however entering data in this field is optional)


- [x] Once the required fields have been populated and validated, the form data can be submitted. Upon submission, a table that displays user data entries is updated to display the new information.

- [x] The application will also allow row entries to be edited and removed. The data submitted should be persistent and survive a refresh of the view or an application restart.

- [x] Follow wireframes for UI


Technical Requirements
- [x] CSS, HTML5, and Javascript (ES5 and above) or TypeScript

- [x] A service should be used to store and return user data, however this must not be a client-side storage mechanism (for example, local storage).

- [x] Note: The service can be the same one you use to provision your application view, or a standalone Node instance dedicated specifically to this task. The mechanism employed by the service to actually hold the data is up to you. You may use a remote system (for example Heroku) if you wish, although a local DB or flat file are also perfectly acceptable.
framework.

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- IMPROVEMENTS -->
## Improvements
- [ ] Work with PM and UX individuals to discuss edit strategy
- [ ] Work with QA to strongly test Floating Labels (abstract into component for re-use)
- [ ] Add React Router and Nav/Footer for new views and complete base UI
- [ ] Work with PM on mobile table solution

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- CONTACT -->
## Contact

Abraham Kinney
- [Linkedin](https://www.linkedin.com/in/abrahamkinney/)
- mfp4074@gmail.com

Project Link: [https://github.com/mfp4073/anchore](https://github.com/mfp4073/anchore)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

