<h1  align="center">
Student Guide
</h1>

university companion application designed to **enhance student experience** by centralizing essential university information into a single, user-friendly platform. Our project aims to provide students with a professional tool for accessing critical university-related data and leveraging a range of functional features tailored to their academic needs.
  


# Screenshots
![Desktop2024 02 14-18 58 34 02-ezgif com-video-to-gif-converter](https://github.com/AhmedHosny2/Student-Guide/assets/98207790/13ad54e2-754b-4c60-9c7a-41ddf1aab49e)



![TA Directory](https://github.com/AhmedHosny2/Student-Guide/assets/98207790/6256c24a-b87d-4f5e-bd74-4275bfd13046)![adding TA](https://github.com/AhmedHosny2/Student-Guide/assets/98207790/4e9490f6-e044-4b5f-abc3-f70b43547e38)![location 1](https://github.com/AhmedHosny2/Student-Guide/assets/98207790/05f02777-12df-4ea6-85e6-9d86de70475c)![add TA](https://github.com/AhmedHosny2/Student-Guide/assets/98207790/95e6b024-8a3b-4ed5-9ef0-d6b0d5ea6b7a)
![location 2](https://github.com/AhmedHosny2/Student-Guide/assets/98207790/d4e357e2-b80d-4f5c-87c7-f06995e9d5e0)
![responsive](https://github.com/AhmedHosny2/Student-Guide/assets/98207790/3625f193-c0aa-4b1d-a9f2-e6a27550262c)



ets/98207790/8e25045a-254d-4eb4-bcb5-855b2c08e3b1)
![responsive](https://github.com/AhmedHosny2/Student-Guide/assets/98207790/c771c54b-837c-46d6-bbcf-31888839db19)
![schedules](https://github.com/AhmedHosny2/Student-Guide/assets/98207790/5a53dc9a-eae6-42ae-8ad4-53d4ebdd38ff)
![RG](https://github.com/AhmedHosny2/Student-Guide/assets/98207790/465b419f-3b4b-455e-bb97-4063a8d12d6b)
![Grade Calc](https://github.com/AhmedHosny2/Student-Guide/assets/98207790/cdf80fd3-d3fe-496a-9f29-64fb5520a07f)
![GPA calc](https://github.com/AhmedHosny2/Student-Guide/assets/98207790/12907d05-9c5a-495c-8b23-219cdae55805)


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

You are very welcome to contribute to this repo. Just create the your Pull Request, I will review it & your updates will be merged ASAP insha'Allah.
