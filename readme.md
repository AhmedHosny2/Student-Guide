<h1  align="center">
Student Guide
</h1>

university companion application designed to **enhance student experience** by centralizing essential university information into a single, user-friendly platform. Our project aims to provide students with a professional tool for accessing critical university-related data and leveraging a range of functional features tailored to their academic needs.



# Screenshots
![home page](https://github.com/AhmedHosny2/Student-Guide/assets/98207790/ff069093-cbac-4ee4-b62c-537144b19d3c)
![location 1](https://github.com/AhmedHosny2/Student-Guide/assets/98207790/05f02777-12df-4ea6-85e6-9d86de70475c)
![location 2](https://github.com/AhmedHosny2/Student-Guide/assets/98207790/5c6078da-6115-4a91-8bf5-086e3c5f6a59)
![TA](https://github.com/AhmedHosny2/Student-Guide/assets/98207790/9bf9d668-a84a-4093-b997-7448fc260ea0)
![adding TA](https://github.com/AhmedHosny2/Student-Guide/assets/98207790/4e9490f6-e044-4b5f-abc3-f70b43547e38)
![add TA](https://github.com/AhmedHosny2/Student-Guide/assets/98207790/95e6b024-8a3b-4ed5-9ef0-d6b0d5ea6b7a)  
![courses](https://github.com/AhmedHosny2/Student-Guide/assets/98207790/20c68cee-9d63-4340-8cb0-e2870fc5207b)
![schedules](https://github.com/AhmedHosny2/Student-Guide/assets/98207790/5a53dc9a-eae6-42ae-8ad4-53d4ebdd38ff)
![Grade Calc](https://github.com/AhmedHosny2/Student-Guide/assets/98207790/cdf80fd3-d3fe-496a-9f29-64fb5520a07f)
![GPA calc](https://github.com/AhmedHosny2/Student-Guide/assets/98207790/12907d05-9c5a-495c-8b23-219cdae55805)
![RG](https://github.com/AhmedHosny2/Student-Guide/assets/98207790/465b419f-3b4b-455e-bb97-4063a8d12d6b)
![responsivness](https://github.com/AhmedHosny2/Student-Guide/assets/98207790/787ae805-d92c-4bb8-b9cb-155d75b94476)



# Tools & Technologies

-   [vanilla js](http://vanilla-js.com): for the front-end
-   [Node.js](https://nodejs.org): for the back-end
-   [MongoDB](https://mongodb.com): for the database

# Features

-  **Location**: Provides detailed information about each Office, including its description, email, and location.
-  **TA Directory**:Allows students to get all data about their TAs  including their office number, office hours and their emails.
-  **Courses**: Provide students with comprehensive resources and guidance from experienced peers through a visually appealing page layout.
- **Schedules**: Enable students to conveniently view all CS department schedules at a glance.
- **Grade Calculator**: Simplify the process for students to calculate their coursework and overall grades within a single course effortlessly.
- **GPA Calc**: Empower students to seamlessly and effortlessly calculate their GPA.
- **Resources Gateway**: Centralize essential links and tools for easy access to important resources.

# Installation and Usage

  

To run the project locally, follow these steps:

  

1. Clone the repository:

  

```bash

git  clone  https://github.com/AhmedHosny2/Student-Guide

```

  

2.Navigate to the Microservice Directories:

  

```bash
cd UserMicroservice
cd CoursesMicroservice
cd TADirectoryMicroservice

```
3.Install Dependencies:

```bash
npm i
```


4. Set up the environment variables:

  **User Microservice**:

```bash
-   cp UserMicroservice/.env.example UserMicroservice/.env 
```
-   **Courses Microservice**:
    
```bash
-   cp CoursesMicroservice/.env.example CoursesMicroservice/.env
```    
-   **TADirectory Microservice**:
     
```bash
cp TADirectoryMicroservice/.env.example TADirectoryMicroservice/.env
```

  

Then, fill in the required variables in the `.env` file.

  

4. Run the development server:

  

```bash
python runAll
```

  


This microservice project consists of three services, each running on a designated port:

  

**User Microservice**

Port: 5001

  

**Courses Microservice**

Port: 5002

  

**TADirectory Microservice**

Port: 5003



  # Meet the Team

  

| Name                  | Role                | GitHub                                             |
|-----------------------|---------------------|-----------------------------------------------------|
| Ahmed Yehia           | Backend Developer   | [@AhmedHosny2](https://github.com/AhmedHosny2)     |
| Abdelrahman Elkhateeb| Frontend Developer  | [@abdelrahman-elkhateeb](https://github.com/abdelrahman-elkhateeb) |
| Mohamed Tamer         | Frontend Developer  | [@MooTamer](https://github.com/MooTamer)           |




# Contribution 👀

1. **Assign Yourself a Task**: Head over to our [Trello board](https://trello.com/invite/b/ezMbfDl0/ATTId2130ade5328a5ca8751d4e40f69ac0e033F1DCF/student-guide) and assign yourself a task that you'd like to work on.

2. **Create a Pull Request**: Once you've chosen a task and made your changes, create a Pull Request (PR) in this repository.

3. **Review Process**: Your PR will be reviewed promptly.
4. **Merge**: After review, your updates will be merged into the project as soon as possible, insha'Allah.
