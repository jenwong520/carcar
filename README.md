<a id="readme-top"></a>

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]


<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://gitlab.com/ThisIsDodger/project-beta">
    <img src="CarCar.png" alt="Logo" width="auto" height="120">
  </a>

<h3 align="center">CarCar</h3>

  <p align="center">
     A microservices-based application for managing an automobile dealership, focusing on inventory, service, and sales.
    <br />
    <a href="https://gitlab.com/ThisIsDodger/project-beta"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://gitlab.com/ThisIsDodger/project-beta">View Demo</a>
    ·
    <a href="https://gitlab.com/ThisIsDodger/project-beta/issues/new?labels=bug&template=bug-report---.md">Report Bug</a>
    ·
    <a href="https://gitlab.com/ThisIsDodger/project-beta/issues/new?labels=enhancement&template=feature-request---.md">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#team">Team</a></li>
        <li><a href="#design">Design</a></li>
        <li><a href="#service-microservice">Service Microservice</a></li>
        <li><a href="#sales-microsesrvice">Sales Microservice</a></li>
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
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>


<!-- ABOUT THE PROJECT -->
## About The Project

<!-- [![Product Name Screen Shot][product-screenshot]](https://example.com) -->

CarCar is a microservices-based application designed to manage key operations of an automobile dealership. The features separate services for handling inventory, sales, and automobile servicing. It demonstrates the power and flexibility of microservices in creating scalable and maintainable systems. `github_username`, `repo_name`, `twitter_handle`, `linkedin_username`, `email_client`, `email`, `project_title`, `project_description`

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Team

* Jen Wong - Service Microservice
* Rachel McReynolds - Sales Microservice

### Design

### Service microservice

The service microservice manages the vehicle service appointments and integrates with the inventory microservice to retrieve and update automobile data. It includes models for customers, appointments, and service technicians.

### Sales microservice

The sales microservice handles the sales transactions and customer information. It integrates with the inventory microservice to ensure only available vehicles can be sold and updates the vehicle status after a sale is completed. The models include Salesperson, Customer, Sale, and AutomobileVO.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

* [![React][React.js]][React-url]
* [![Bootstrap][Bootstrap.com]][Bootstrap-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple example steps.

### Prerequisites

You will need the following software installed:

* npm
  ```sh
  npm install npm@latest -g
  ```

  * Python (for Django backend)
  ```sh
  sudo apt-get install python3
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://gitlab.com/ThisIsDodger/project-beta
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Install Python dependencies
   ```sh
   pip install -r requirements.txt
   ```
4. Set up the database
   ```sh
    python manage.py migrate
   ```
5. Start the development server
   ```sh
    npm start
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

Use this space to show useful examples of how a project can be used. Additional screenshots, code examples and demos work well in this space. You may also link to more resources.

The project allows users to manage inventory, create and track sales, and schedule service appointments. Here are some key use cases:

    1. Manage Inventory: Add, view, and update vehicle information in the inventory.
    2. Track Sales: Record new sales and view a history of sales transactions by salesperson.
    3. Schedule Service Appointments: Manage appointments for vehicle maintenance and repairs.

_For more examples, please refer to the [Documentation](https://example.com)_

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ROADMAP -->
## Roadmap

- [ ] Add more detailed reports for sales and service data
- [ ] Implement user authentication and roles
- [ ] Improve UI with additional themes
    - [ ] Nested Feature

See the [open issues](https://gitlab.com/ThisIsDodger/project-beta/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

To contribute:

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Top contributors:

<a href="https://gitlab.com/ThisIsDodger/project-beta/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=github_username/repo_name" alt="contrib.rocks image" />
</a>



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Your Name - [@twitter_handle](https://twitter.com/twitter_handle) - email@email_client.com

Project Link: [https://gitlab.com/ThisIsDodger/project-beta](https://gitlab.com/ThisIsDodger/project-beta)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

* [React](React)
* [Django](Django)
* [Bootstrap](Bootstrap)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/github_username/repo_name.svg?style=for-the-badge
[contributors-url]: https://github.com/github_username/repo_name/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/github_username/repo_name.svg?style=for-the-badge
[forks-url]: https://github.com/ThisIsDodger/project-beta
[stars-shield]: https://img.shields.io/github/stars/github_username/repo_name.svg?style=for-the-badge
[stars-url]: https://github.com/github_username/repo_name/stargazers
[issues-shield]: https://img.shields.io/github/issues/github_username/repo_name.svg?style=for-the-badge
[issues-url]: https://github.com/github_username/repo_name/issues
[license-shield]: https://img.shields.io/github/license/github_username/repo_name.svg?style=for-the-badge
[license-url]: https://github.com/github_username/repo_name/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/linkedin_username
[product-screenshot]: images/screenshot.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://static.djangoproject.com/img/badges/djangoproject120x25.gif
[React-url]: https://reactjs.org/
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com
