<a id="readme-top"></a>

<br />
<div align="center">
  <a href="https://gitlab.com/ThisIsDodger/project-beta">
    <img src="Fabulosity.jpeg" alt="Logo" width="auto" height="200">
  </a>

<h3 align="center">CarCar</h3>

  <p align="center">
     A microservices-based application for managing an automobile dealership, focusing on inventory, service, and sales.
    <br />
    <a href="https://gitlab.com/ThisIsDodger/project-beta"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://gitlab.com/ThisIsDodger/project-beta">View Demo</a>
  </p>
</div>

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#team">Team</a></li>
        <li><a href="#diagram-of-project">Diagram of Project</a></li>
        <li><a href="#service-microservice">Service Microservice</a></li>
        <li><a href="#sales-microservice">Sales Microservice</a></li>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#urls-and-ports">URLs and Ports</a></li>
        <li><a href="#crud-route-documentation">CRUD Route Documentation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

## About The Project

CarCar is a microservices-based application designed to manage key operations of an automobile dealership. The features separate services for handling inventory, sales, and automobile servicing. It demonstrates the power and flexibility of microservices in creating scalable and maintainable systems.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Team

* Jen Wong - Service Microservice
* Rachel McReynolds - Sales Microservice

### Diagram of Project
<div align="center">
    <img src="CarCar Diagram.png" alt="Logo" width="auto" height="750">
  <p align="center">
     The diagram demonstrates how different data moves through the three different microservices in the CarCar app.
  </p>
</div>

### Service microservice

The Service microservice is designed to manage vehicle service appointments, tracking details such as appointment scheduling, technician assignment, and customer information. It integrates with the Inventory microservice, enabling real-time updates and status checks on vehicles.

#### Models:
* Technician: This model stores information about service technicians, including their first name, last name, and a unique employee ID.

* AutomobileVO: Represents vehicles within the Inventory microservice. It includes the VIN (Vehicle Identification Number) and a boolean field 'sold' that indicates whether the vehicle has been sold. This model is periodically updated by a poller that fetches the latest vehicle data from the Inventory microservice.

* Appointment: Tracks service appointments with fields such as date_time, reason, status, vin, customer, and technician. The technician field is a foreign key linking to the Technician model, ensuring that each appointment is associated with a specific technician.

#### Integration with Inventory Microservice:
The Service microservice includes a poller component that runs periodically to synchronize data with the Inventory microservice. This poller retrieves the latest vehicle information, updating the AutomobileVO model with current VINs and their sold status. This integration is crucial for implementing the VIP feature in service appointments. If an appointment's VIN matches that of a sold vehicle, the system marks the appointment as VIP, allowing for special treatment of the customer.

#### API Endpoints:
The Service microservice exposes several RESTful API endpoints to manage technicians and appointments:

* Technician Management: Endpoints to list, create, and delete technicians.
* Appointment Management: Endpoints to list, create, update status (cancel/finish), and delete appointments.

### Sales microservice

The Sales microservice is responsible for managing the sales process of automobiles, ensuring that only available, unsold vehicles can be sold. This microservice is integrated with the Inventory microservice to maintain up-to-date information on the status of vehicles.

#### Models:
* Salesperson: This model stores details about salespeople, including their first name, last name, and a unique employee ID.

* Customer: Represents customers who purchase vehicles. It includes fields for first name, last name, address, and phone number.

* Sale: Captures the details of each vehicle sale, including the automobile sold, the salesperson responsible for the sale, the customer purchasing the vehicle, and the sale price. The automobile, salesperson, and customer fields are foreign keys linking to their respective models.

* AutomobileVO: This model mirrors the vehicles in the inventory, tracking each automobile by its VIN and 'sold' status. The model is periodically updated by a poller that syncs data from the Inventory microservice.

#### Integration with Inventory Microservice:
The Sales microservice includes a poller component that runs periodically to synchronize vehicle data with the Inventory microservice. This poller fetches the latest vehicle information, updating the AutomobileVO model with current VINs and their sold status. The integration ensures that only vehicles marked as unsold in the inventory can be recorded in a sale.

#### API Endpoints:
The Sales microservice exposes several RESTful API endpoints to manage salespeople, customers, and sales:

* Salesperson Management: Endpoints to list, create, and delete salespeople.
* Customer Management: Endpoints to list, create, and delete customers.
* Sale Management: Endpoints to list, create, and delete sales records, ensuring that sales are accurately tracked and associated with the correct automobile, salesperson, and customer.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

* [![React][React.js]][React-url]
* [![Bootstrap][Bootstrap.com]][Bootstrap-url]
* [![Django][Djangoproject.com]][Django-url]
* [![Javascript][nodejs.org]][Javascript-url]
* [![Python][python.org]][Python-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>


## Getting Started

To get a local copy up and running follow these simple example steps.

### Prerequisites
* Docker - Install and run Docker in order to run this application
* Chrome Developer Tools - Recommended for further development of application
* Code editor like VS Code - Recommended for further development of application
* API development platform like Insomnia (optional)
* React Developer Tools (optional)

### Installation

1. Fork and clone the repo - https://gitlab.com/ThisIsDodger/project-beta
   ```sh
   git clone https://gitlab.com/ThisIsDodger/project-beta
   ```
2. Set up the database
   ```sh
   docker volume create beta-data
   ```
3. Build Docker containers
   ```sh
   docker compose build
   ```
4. Run Docker containers
   ```sh
    docker compose up
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### URLs and Ports
URLs and Ports that were used for the inventory, service, and sales microservices.
1. Inventory Microservice
    * Port: 8100
    * Endpoints:
        * Manufacturers
            * List (GET), Create (POST): http://localhost:8100/api/manufacturers/
            * Detail (GET), Update (PUT), Delete (DELETE): http://localhost:8100/api/manufacturers/:id/
        * Vehicle Models
            * List (GET), Create (POST): http://localhost:8100/api/models/
            * Detail (GET), Update (PUT), Delete (DELETE): http://localhost:8100/api/models/:id/
        * Automobiles
            * List (GET), Create (POST): http://localhost:8100/api/automobiles/
            * Detail (GET), Update (PUT), Delete (DELETE): http://localhost:8100/api/automobiles/:vin/
2. Sales Microservice
    * Port: 8090
    * Endpoints:
        * Salespeople
            * List (GET), Create (POST): http://localhost:8090/api/salespeople/
            * Detail (GET), Update (PUT), Delete (DELETE): http://localhost:8090/api/salespeople/:id/
        * Customers
            * List (GET), Create (POST): http://localhost:8090/api/customers/
            * Detail (GET), Update (PUT), Delete (DELETE): http://localhost:8090/api/customers/:id/
        * Sales
            * List (GET), Create (POST): http://localhost:8090/api/sales/
            * Detail (GET), Update (PUT), Delete (DELETE): http://localhost:8090/api/sales/:id/
3. Service Microservice
    * Port: 8080
    * Endpoints:
        * Technicians
            * List (GET), Create (POST): http://localhost:8080/api/technicians/
            * Detail (GET), Update (PUT), Delete (DELETE): http://localhost:8080/api/technicians/:id/
        * Appointments
            * List (GET), Create (POST): http://localhost:8080/api/appointments/
            * Detail (GET), Update (PUT), Delete (DELETE): http://localhost:8080/api/appointments/:id/
            * Status Updates (PUT):
                * To change to 'cancel' status: http://localhost:8080/api/appointments/:id/cancel/
                * To change to 'finish' status: http://localhost:8080/api/appointments/:id/finish/
4. Frontend
    * Port: 5173
    * URL: http://localhost:5173/
    * Description: The frontend React application where users can interact with system's user interface.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### CRUD Route Documentation

1. Manufacturers
    * Create (POST): http://localhost:8100/api/manufacturers/
        * Required fields:
            ```sh
            {
                "name": "Chrysler"
            }
            ```
        * Response:
            ```sh
            {
                "href": "/api/manufacturers/1/",
                "id": 1,
                "name": "Chrysler"
            }
            ```
     * List (GET): http://localhost:8100/api/manufacturers/
        * Response:
            ```sh
            {
                "manufacturers": [
                    {
                        "href": "/api/manufacturers/1/",
                        "id": 1,
                        "name": "Chrysler"
                    },
                    {
                        "href": "/api/manufacturers/2/",
                        "id": 2,
                        "name": "Toyota"
                    }
                ]
            }
            ```
    * Detail (GET), Update (PUT), Delete (DELETE): http://localhost:8100/api/manufacturers/:id/
        * Required fields for Update (PUT):
            ```sh
            {
                "name": "Daimler-Chrysler"
            }
            ```
        * Response for Detail (GET) and Update (PUT):
            ```sh
            {
                "href": "/api/manufacturers/1/",
                "id": 1,
                "name": "Daimler-Chrysler"
            }
            ```

2. Vehicle Models
    * Create (POST): http://localhost:8100/api/models/
        * Required fields:
            ```sh
            {
                "name": "Sebring",
                "picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg",
                "manufacturer_id": 1
            }
            ```
        * Response:
            ```sh
            {
                "href": "/api/models/1/",
                "id": 1,
                "name": "Sebring",
                "picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg",
                "manufacturer": {
                    "href": "/api/manufacturers/1/",
                    "id": 1,
                    "name": "Daimler-Chrysler"
                }
            }
            ```
     * List (GET): http://localhost:8100/api/models/
        * Response:
            ```sh
            {
                "models": [
                    {
                        "href": "/api/models/1/",
                        "id": 1,
                        "name": "Sebring",
                        "picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg",
                        "manufacturer": {
                            "href": "/api/manufacturers/1/",
                            "id": 1,
                            "name": "Daimler-Chrysler"
                        }
                    },
                    {
                        "href": "/api/models/2/",
                        "id": 2,
                        "name": "Camry",
                        "picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/2018_Toyota_Camry_%28ASV70R%29_Ascent_sedan_%282018-08-27%29_01.jpg/560px-2018_Toyota_Camry_%28ASV70R%29_Ascent_sedan_%282018-08-27%29_01.jpg",
                        "manufacturer": {
                            "href": "/api/manufacturers/2/",
                            "id": 2,
                            "name": "Toyota"
                        }
                    }
                ]
            }
            ```
    * Detail (GET), Update (PUT), Delete (DELETE): http://localhost:8100/api/models/:id/
        * Required fields for Update (PUT):
            ```sh
            {
                "name": "Sebring Bebring",
                "picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg"
            }
            ```
        * Response for Detail (GET) and Update (PUT):
            ```sh
            {
                "href": "/api/models/1/",
                "id": 1,
                "name": "Sebring",
                "picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg",
                "manufacturer": {
                    "href": "/api/manufacturers/1/",
                    "id": 1,
                    "name": "Daimler-Chrysler"
                }
            }
            ```
3. Automobiles
    * Create (POST): http://localhost:8100/api/automobiles/
        * Required fields:
            ```sh
            {
                "color": "red",
                "year": 2012,
                "vin": "1C3CC5FB2AN120174",
                "model_id": 1
            }
            ```
        * Response:
            ```sh
            {
                "href": "/api/automobiles/1C3CC5FB2AN120174/",
                "id": 1,
                "color": "red",
                "year": 2012,
                "vin": "1C3CC5FB2AN120174",
                "model": {
                    "href": "/api/models/1/",
                    "id": 1,
                    "name": "Sebring",
                    "picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg",
                    "manufacturer": {
                        "href": "/api/manufacturers/1/",
                        "id": 1,
                        "name": "Daimler-Chrysler"
                    }
                },
                "sold": false
            }
            ```
     * List (GET): http://localhost:8100/api/automobiles/
        * Response:
            ```sh
            {
                "autos": [
                    {
                        "href": "/api/automobiles/1C3CC5FB2AN120174/",
                        "id": 1,
                        "color": "red",
                        "year": 2012,
                        "vin": "1C3CC5FB2AN120174",
                        "model": {
                            "href": "/api/models/1/",
                            "id": 1,
                            "name": "Sebring",
                            "picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg",
                            "manufacturer": {
                                "href": "/api/manufacturers/1/",
                                "id": 1,
                                "name": "Daimler-Chrysler"
                            }
                        },
                        "sold": false
                    }
                ]
            }
            ```
    * Detail (GET), Update (PUT), Delete (DELETE): http://localhost:8100/api/automobiles/:vin/
        * Required fields for Update (PUT):
            ```sh
            {
                "color": "red",
                "year": 2012,
                "sold": true
            }
            ```
        * Response for Detail (GET) and Update (PUT):
            ```sh
            {
                "href": "/api/automobiles/1C3CC5FB2AN120174/",
                "id": 1,
                "color": "white",
                "year": 2012,
                "vin": "1C3CC5FB2AN120174",
                "model": {
                    "href": "/api/models/1/",
                    "id": 1,
                    "name": "Sebring Bebring",
                    "picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg",
                    "manufacturer": {
                        "href": "/api/manufacturers/2/",
                        "id": 2,
                        "name": "Chrysler"
                    }
                },
                "sold": true
            }
            ```

4. Salespeople
    * Create (POST): http://localhost:8090/api/salespeople/
        * Required fields:
            ```sh
            {
                "first_name": "Rachel",
                "last_name": "McReynolds",
                "employee_id": "rmcreynolds"
            }
            ```
        * Response:
            ```sh
            {
                "id": 1,
                "first_name": "Rachel",
                "last_name": "McReynolds",
                "employee_id": "rmcreynolds"
            }
            ```
     * List (GET): http://localhost:8090/api/salespeople/
        * Response:
            ```sh
            {
                "salespeople": [
                    {
                        "id": 1,
                        "first_name": "Rachel",
                        "last_name": "McReynolds",
                        "employee_id": "rmcreynolds"
                    },
                    {
                        "id": 2,
                        "first_name": "Angelina",
                        "last_name": "Jolie",
                        "employee_id": "ajolie"
                    }
                ]
            }
            ```
    * Detail (GET), Update (PUT), Delete (DELETE): http://localhost:8090/api/salespeople/:id
        * Required fields for Update (PUT):
            ```sh
            {
                "first_name": "Rachel M",
                "last_name": "McReynolds",
                "employee_id": "rmcreynolds"
            }
            ```
        * Response for Detail (GET) and Update (PUT):
            ```sh
            {
                "id": 1,
                "first_name": "Rachel M",
                "last_name": "McReynolds",
                "employee_id": "rmcreynolds"
            }
            ```

5. Customers
    * Create (POST): http://localhost:8090/api/customers/
        * Required fields:
            ```sh
            {
                "first_name": "Agatha",
                "last_name": "Christie",
                "address": "123 E. Main Street",
                "phone_number": "802-555-8888"
            }
            ```
        * Response:
            ```sh
            {
                "id": 1,
                "first_name": "Agatha",
                "last_name": "Christie",
                "address": "123 E. Main Street",
                "phone_number": "802-555-8888"
            }
            ```
     * List (GET): http://localhost:8090/api/customers/
        * Response:
            ```sh
            {
                "customers": [
                    {
                        "id": 1,
                        "first_name": "Agatha",
                        "last_name": "Christie",
                        "address": "123 E. Main Street",
                        "phone_number": "802-555-8888"
                    },
                    {
                        "id": 2,
                        "first_name": "Stephen",
                        "last_name": "King",
                        "address": "321 W. 1st Boulevard",
                        "phone_number": "207-555-9876"
                    }
                ]
            }
            ```
    * Detail (GET), Update (PUT), Delete (DELETE): http://localhost:8090/api/customers/:id/
        * Required fields for Update (PUT):
            ```sh
            {
                "first_name": "Agatha",
                "last_name": "Christie",
                "address": "123 E. Reading St",
                "phone_number": "802-555-8888"
            }
            ```
        * Response for Detail (GET) and Update (PUT):
            ```sh
            {
                "id": 1,
                "first_name": "Agatha",
                "last_name": "Christie",
                "address": "123 E. Reading St",
                "phone_number": "802-555-8888"
            }
            ```

6. Sales
    * Create (POST): http://localhost:8090/api/sales/
        * Required fields:
            ```sh
            {
                "price": 25000.00,
                "automobile": "1C3CC5FB2AN120174",
                "salesperson": 1,
                "customer": 1
            }
            ```
        * Response:
            ```sh
            {
                "id": 1,
                "price": 25000.0,
                "automobile": {
                    "id": 1,
                    "vin": "1C3CC5FB2AN120174",
                    "sold": false,
                    "import_href": "/api/automobiles/1C3CC5FB2AN120174/"
                },
                "salesperson": {
                    "id": 1,
                    "first_name": "Rachel M",
                    "last_name": "McReynolds",
                    "employee_id": "rmcreynolds"
                },
                "customer": {
                    "id": 1,
                    "first_name": "Agatha",
                    "last_name": "Christie",
                    "address": "123 E. Reading St",
                    "phone_number": "802-555-8888"
                }
            }
            ```
     * List (GET): http://localhost:8090/api/sales/
        * Response:
            ```sh
            {
                "sales": [
                    {
                        "id": 1,
                        "price": 25000.0,
                        "automobile": {
                            "id": 1,
                            "vin": "1C3CC5FB2AN120174",
                            "sold": false,
                            "import_href": "/api/automobiles/1C3CC5FB2AN120174/"
                        },
                        "salesperson": {
                            "id": 1,
                            "first_name": "Rachel M",
                            "last_name": "McReynolds",
                            "employee_id": "rmcreynolds"
                        },
                        "customer": {
                            "id": 1,
                            "first_name": "Agatha",
                            "last_name": "Christie",
                            "address": "123 E. Reading St",
                            "phone_number": "802-555-8888"
                        }
                    }
                ]
            }
            ```
    * Detail (GET), Update (PUT), Delete (DELETE): http://localhost:8090/api/sales/:id/
        * Required fields for Update (PUT):
            ```sh
            {
                "price": 20000,
                "automobile": "1C3CC5FB2AN120174",
                "salesperson": 1,
                "customer": 1
            }
            ```
        * Response for Detail (GET) and Update (PUT):
            ```sh
            {
                "id": 1,
                "price": 20000.0,
                "automobile": {
                    "id": 1,
                    "vin": "1C3CC5FB2AN120174",
                    "sold": false,
                    "import_href": "/api/automobiles/1C3CC5FB2AN120174/"
                },
                "salesperson": {
                    "id": 1,
                    "first_name": "Rachel M",
                    "last_name": "McReynolds",
                    "employee_id": "rmcreynolds"
                },
                "customer": {
                    "id": 1,
                    "first_name": "Agatha",
                    "last_name": "Christie",
                    "address": "123 E. Reading St",
                    "phone_number": "802-555-8888"
                }
            }
            ```

7. Technicians
    * Create (POST): http://localhost:8080/api/technicians/
        * Required fields:
            ```sh
            {
                "first_name": "Jen",
                "last_name": "Wong",
                "employee_id": "jwong"
            }
            ```
        * Response:
            ```sh
            {
                "id": 1,
                "first_name": "Jen",
                "last_name": "Wong",
                "employee_id": "jwong"
            }
            ```
     * List (GET): http://localhost:8080/api/technicians/
        * Response:
            ```sh
            {
                "technicians": [
                    {
                        "id": 1,
                        "first_name": "Jen",
                        "last_name": "Wong",
                        "employee_id": "jwong"
                    },
                    {
                        "id": 2,
                        "first_name": "Jennifer",
                        "last_name": "Aniston",
                        "employee_id": "janiston"
                    }
                ]
            }
            ```
    * Detail (GET), Update (PUT), Delete (DELETE): http://localhost:8080/api/technicians/:id/
        * Required fields for Update (PUT):
            ```sh
            {
                "first_name": "Jen M",
                "last_name": "Wong",
                "employee_id": "jwong"
            }
            ```
        * Response for Detail (GET) and Update (PUT):
            ```sh
            {
                "id": 1,
                "first_name": "Jen M",
                "last_name": "Wong",
                "employee_id": "jwong"
            }
            ```

8. Appointments
    * Create (POST): http://localhost:8080/api/appointments/
        * Required fields:
            ```sh
            {
                "date_time": "2024-09-01",
                "reason": "Oil Change",
                "status": "active",
                "vin": "1C3CC5FB2AN120174",
                "customer": "Agatha Christie",
                "technician_id": 1
            }
            ```
        * Response:
            ```sh
            {
                "id": 1,
                "date_time": "2024-09-01",
                "reason": "Oil Change",
                "status": "active",
                "vin": "1C3CC5FB2AN120174",
                "customer": "Agatha Christie",
                "technician": {
                    "id": 1,
                    "first_name": "Jen M",
                    "last_name": "Wong",
                    "employee_id": "jwong"
                }
            }
            ```
     * List (GET): http://localhost:8080/api/appointments/
        * Response:
            ```sh
            {
                "appointments": [
                    {
                        "id": 1,
                        "date_time": "2024-09-01T00:00:00+00:00",
                        "reason": "Oil Change",
                        "status": "active",
                        "vin": "1C3CC5FB2AN120174",
                        "customer": "Agatha Christie",
                        "technician": {
                            "id": 1,
                            "first_name": "Jen M",
                            "last_name": "Wong",
                            "employee_id": "jwong"
                        }
                    },
                    {
                        "id": 2,
                        "date_time": "2024-09-01T00:00:00+00:00",
                        "reason": "Air Filter",
                        "status": "active",
                        "vin": "R12A45N12D09O98MN",
                        "customer": "Jane Austin",
                        "technician": {
                            "id": 2,
                            "first_name": "Jennifer",
                            "last_name": "Aniston",
                            "employee_id": "janiston"
                        }
                    }
                ]
            }
            ```
    * Detail (GET), Update (PUT), Delete (DELETE): http://localhost:8080/api/appointments/:id/
        * Required fields for Update (PUT):
            ```sh
            {
                "date_time": "2024-09-01T00:00:00+00:00",
                "reason": "Oil Change and Car Wash",
                "status": "active",
                "vin": "1C3CC5FB2AN120174",
                "customer": "Agatha Christie"
            }
            ```
        * Response for Detail (GET) and Update (PUT):
            ```sh
            {
                "id": 1,
                "date_time": "2024-09-01T00:00:00+00:00",
                "reason": "Oil Change and Car Wash",
                "status": "active",
                "vin": "1C3CC5FB2AN120174",
                "customer": "Agatha Christie",
                "technician": {
                    "id": 1,
                    "first_name": "Jen M",
                    "last_name": "Wong",
                    "employee_id": "jwong"
                }
            }
            ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

The project allows users to manage inventory, create and track sales, and schedule service appointments. Here are some key use cases:

    1. Manage Inventory: Add, view, and update vehicle information in the inventory.
    2. Track Sales: Record new sales and view a history of sales transactions by salesperson.
    3. Schedule Service Appointments: Manage appointments for vehicle maintenance and repairs.

Developers may use this application as a template for other types of inventory and personnel tracking.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Contact

Project Link: [https://gitlab.com/ThisIsDodger/project-beta](https://gitlab.com/ThisIsDodger/project-beta)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Acknowledgments

* Coffee
* Memes
* Discord

<p align="right">(<a href="#readme-top">back to top</a>)</p>

[contributors-shield]: https://img.shields.io/github/contributors/github_username/repo_name.svg?style=for-the-badge
[contributors-url]: https://github.com/github_username/repo_name/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/github_username/repo_name.svg?style=for-the-badge
[forks-url]: https://gitlab.com/ThisIsDodger/project-beta/-/forks/new
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[Djangoproject.com]: https://www.djangoproject.com/m/img/badges/djangoproject120x25.gif
[Django-url]: http://www.djangoproject.com/
[nodejs.org]: https://shields.io/badge/JavaScript-F7DF1E?logo=JavaScript&logoColor=000&style=flat-square
[Javascript-url]: https://nodejs.org/en
[Python.org]: https://img.shields.io/badge/python-3.10.14-blue?style=for-the-badge
[Python-url]: https://www.python.org/
