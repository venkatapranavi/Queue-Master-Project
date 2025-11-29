# Queue Management System 

## Description  
The **Queue Management System** is a **team-based project** built using **React, Spring Boot** and **PostgreSQL**. It enables employees to efficiently manage customer queues through a RESTful API, improving service operations in environments such as banks, service centers, and government offices.

This project is aimed to optimize the current queue systems being used in retail stores, fast food restaurants, and other institutions where long queues are present. Customers can book their place in the queue and receive an **AI-generated estimate of waiting time**, allowing them to wait comfortably instead of standing in line.

The project is built as a website where users can scan a **QR code** using their mobile phone, register into the queue, and receive a **token number**. A confirmation message will be sent to their **mobile number (via SMS)** and **email address**. After registration, users are redirected to a page where they can view their position and assigned counter number using the token. Notifications are also sent when it's their turn.

Additionally, the project features an **Admin Dashboard** that enables the admin to manage employees. Admins can **assign or update counter numbers**, **remove employees**, and **monitor all customers and employee status** through a clean UI. This improves staff coordination and helps in efficient queue distribution and load balancing.

This project has been successfully deployed. The backend is Dockerized and hosted on Render, the frontend is deployed using Netlify, and the PostgreSQL database is hosted on Neon cloud.

## 👉 Access the live project here:
🌐 Frontend URL: https://strong-travesseiro-eef607.netlify.app


## Features
- Admin dashboard to manage employees and counters.
- Employee login and counter assignment.
- Customer queue management (join, view, call next).
- Real-time queue updates and customer status tracking.
- Queue entry completion with email notification.
- Estimated wait time calculated using basic AI logic.
- Estimated wait time sent to customer via email upon joining queue.

## AI-Based Wait Time Estimation

To enhance user experience, the system includes a simple AI module that:
- Estimates the waiting time for each customer based on queue length, average handling time, and current counter load.
- Sends the estimated time via email and SMS during registration.
- Continuously improves estimation as more data becomes available.

This helps reduce customer frustration and improves queue transparency.

## Technologies Used
- **Java** (Spring Boot)
- **PostgreSQL**
- **Maven**
- **RESTful APIs**
- **Spring Data JPA**
- **Email Notifications (JavaMailSender)**


## 🔐 Admin Dashboard

The Admin Dashboard allows system administrators to:

- View all employees and assign counters.
- Update or change an employee’s counter.
- Remove employees.
- View the entire customer queue.
- Assign new counters via dedicated forms.
- Navigate seamlessly with sticky headers and tabbed layout.`


### Folder Structure

```md
queue-frontend/
├── src/
│   ├── components/
│   │   ├── AdminDashboard         #admin related activities (shown in admin folder)
│   │   ├── Employee
│   │   └── Queue
│   ├── App.js
│   └── ...
```

## Dependencies
Include the following dependencies in your `pom.xml`:

```xml
<dependencies>
    <!-- Spring Boot Starter Web -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>

    <!-- Spring Boot Starter Data JPA -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-data-jpa</artifactId>
    </dependency>

    <!-- PostgreSQL Driver -->
    <dependency>
        <groupId>org.postgresql</groupId>
        <artifactId>postgresql</artifactId>
        <version>42.5.4</version>
    </dependency>

    <!-- Spring Boot Starter Mail (for Email Notifications) -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-mail</artifactId>
    </dependency>

    <!-- Spring Boot DevTools (for live reload) -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-devtools</artifactId>
        <scope>runtime</scope>
    </dependency>

    <!-- Spring Boot Starter Test -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-test</artifactId>
        <scope>test</scope>
    </dependency>
</dependencies>
````

## Folder Structure

```
queue-backend/
├── src/
│   └── main/
│       ├── java/
│       │   └── com.queueapp.queue_backend/
│       │       ├── config/                 # Configuration files  
│       │       ├── controller/             # REST Controllers  
│       │       ├── model/                  # Data Models  
│       │       ├── repository/             # Database Repositories  
│       │       └── service/                # Business Logic  
│       ├── resources/
│       │   ├── application.properties      # Spring Boot configuration  
│       │   ├── static/                     # Static assets  
│       │   └── templates/                  # HTML templates  
├── pom.xml                                # Maven dependencies  
└── README.md                              # Project documentation  
```

## Setup and Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/username/QueueMaster.git
   cd QueueMaster
   ```

2. **Configure the database:**
   Update the `application.properties` file:

   ```properties
   spring.datasource.url=jdbc:postgresql://localhost:5432/queue_db
   spring.datasource.username=postgres
   spring.datasource.password=gopika
   ```

3. **Build the project:**

   ```bash
   mvn clean install
   ```


## Running the Application

1. **Start the application:**

   ```bash
   mvn spring-boot:run
   ```

## API Endpoints

## 🛠️ Admin Controller

| Endpoint                                | Method | Parameters / Body         | Description                                 |
|-----------------------------------------|--------|---------------------------|---------------------------------------------|
| `/api/employee/all-for-admin`           | GET    | None                      | Retrieve all employees for Admin dashboard  |
| `/api/employee/delete/{id}`             | DELETE | id                        | Delete an employee by their ID              |
| `/api/employee/assign-counter`          | POST   | username,counterNumber,C1 | Assign a new counter to an employee         |
| `/api/employee/update-counter`          | PUT    | id,counterNumber,C2       | Update counter assigned to an employee      |


## 🧑‍💼 Employee Controller

| Endpoint                           | Method | Parameters        | Description                                         |
|------------------------------------|--------|-------------------|-----------------------------------------------------|
| `/api/employee/login`              | POST   | username, password| Employee login                                      |
| `/api/employee/queue-list`         | GET    | counterNumber     | Get list of queued customers for a counter          |
| `/api/employee/peek-next-customer`| GET     | counterNumber     | Peek at the next customer without dequeuing         |
| `/api/employee/next-customer`     | POST    | counterNumber     | Call and dequeue the next customer                  |


## 🎫 Queue Entry Controller

| Endpoint                             | Method | Parameters / Body          | Description                           |
|--------------------------------------|--------|----------------------------|--------------------------------------|
| `/api/queue/join-queue`              | POST   | `{ customer details }`     | Customer joins the queue             |
| `/api/queue/all`                     | GET    | None                       | Retrieve all queue entries           |
| `/api/queue/status/{tokenNumber}`    | GET    | Path Variable: tokenNumber | Get queue status by token            |
| `/api/queue/complete/{tokenNumber}`  | PUT    | Path Variable: tokenNumber | Mark the queue entry as completed    |


## Configuration

Update `application.properties` for database and server port:

```properties
server.port=8080
spring.datasource.url=jdbc:postgresql://localhost:5432/queue_db
spring.datasource.username=your-username
spring.datasource.password=your-password
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

## 📦 Technologies Used

- **Backend**: Java, Spring Boot, PostgreSQL  
- **Frontend**: React.js  
- **Other Tools**: Postman, IntelliJ, Git, GitHub Actions

## Contributing

1. Fork the repository.
2. Create a feature branch:

   ```bash
   git checkout -b feature-branch
   ```
3. Commit your changes:

   ```bash
   git commit -m "Add new feature"
   ```
4. Push to the branch:

   ```bash
   git push origin feature-branch
   ```
5. Open a pull request.

## 🚀 Project Deployment – Queue Management System

This section provides a complete guide to deploying the project using **Docker**, **Render**, **Neon.tech**, and **Netlify**.

## 🧠 Backend Deployment – Spring Boot + Docker + Render

###  1. Build the JAR File

```bash
./mvnw clean package
```

 This generates:
  `target/queue-backend-0.0.1-SNAPSHOT.jar`

### 2. Create Dockerfile in project root

```Dockerfile
# Stage 1: Build with Maven
FROM maven:3.8.4-openjdk-17 AS build
WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline
COPY src ./src
RUN mvn clean package -DskipTests

# Stage 2: Run with JDK
FROM openjdk:17-jdk-slim
WORKDIR /app
COPY --from=build /app/target/queue-backend-0.0.1-SNAPSHOT.jar .
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app/queue-backend-0.0.1-SNAPSHOT.jar"]
```

### 3. Set Environment Variables in PowerShell (temporary)

```bash
$env:DB_URL="jdbc:postgresql://your-neon-url"
$env:DB_USERNAME="your-neon-username"
$env:DB_PASSWORD="your-password"
$env:FRONTEND_URL="https://strong-travesseiro-eef607.netlify.app"
```

### 4. Build Docker Image

```bash
docker build -t queue-backend .
```

### 5. Tag the Docker Image

```bash
docker tag queue-backend gopikasaranya/queue-deployment:v1
```

### 6. Push Image to Docker Hub

```bash
docker push gopikasaranya/queue-deployment:v1
```

> 📝 Make sure the repo exists on Docker Hub:  
> [https://hub.docker.com/repository/docker/gopikasaranya/queue-deployment](https://hub.docker.com/repository/docker/gopikasaranya/queue-deployment)

---

### 7. Set up PostgreSQL on Neon.tech

- Go to: https://neon.tech
- Create a project (e.g., `jolly-rain`)
- Create a database (e.g., `queue-db`)
- Copy connection string like:
  
  ```
  jdbc:postgresql://ep-xxxxxxx.neon.tech/queue-db
  ```

### 8. Deploy Backend on Render

- Go to: https://render.com
- Click **New > Web Service**
- Select **Docker** as deployment method
- Connect DockerHub image:  
  `gopikasaranya/queue-deployment:v1`
- Add the following **Environment Variables**:

```
DB_URL=jdbc:postgresql://<neon-db-url>
DB_USERNAME=<your_neon_username>
DB_PASSWORD=<your_neon_password>
FRONTEND_URL=https://strong-travesseiro-eef607.netlify.app
```

- Click **Deploy Web Service**


## 🎨 Frontend Deployment – React + Netlify

### 1. Build the React App

```bash
npm run build
```

### 2. Deploy to Netlify

- Go to: https://netlify.com
- Choose `Deploy Site` → drag and drop `build/` folder or connect GitHub
- Add the following environment variable:

```
REACT_APP_BACKEND_URL=https://queue-deployment.onrender.com
```

- Click **Deploy Site**

## 🌐 Live Project URLs

| Service     | URL                                                                                                                        |
|-------------|----------------------------------------------------------------------------------------------------------------------------|
| 🔙 Backend  | [https://queue-deployment.onrender.com](https://queue-deployment.onrender.com)                                             |
| 🌐 Frontend | [https://strong-travesseiro-eef607.netlify.app](https://strong-travesseiro-eef607.netlify.app)                             |
| 🧮 Database | [https://console.neon.tech/app/projects/jolly-rain-37321622](https://console.neon.tech/app/projects/jolly-rain-37321622)   |


## 📞 Contact

For questions, issues, or contributions:

- 📧 Email: kotakalagopika@gmail.com  
- 🐙 GitHub: [github.com/https://github.com/gopika04-saru](https://github.com/gopika04-saru)

- 📧 Email: gudipatikalpana14@gmail.com
- 🐙 GitHub: [github.com/https://github.com/Kalpana-1418](https://github.com/Kalpana-1418)

- 📧 Email: miryaladeepthi2005@gmail.com
- 🐙 GitHub: [github.com/https://github.com/MiriyalaDeepti](https://github.com/MiriyalaDeepti)

---
