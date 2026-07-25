# Student Enrollment Form (JsonPowerDB)

> A responsive web-based Student Enrollment System interacting with JsonPowerDB (`SCHOOL-DB` / `STUDENT-TABLE`) for seamless real-time CRUD data operations.

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-3.4.1-563D7C?style=flat-square&logo=bootstrap&logoColor=white)](https://getbootstrap.com/)
[![JsonPowerDB](https://img.shields.io/badge/JsonPowerDB-v0.0.3-007ACC?style=flat-square)](https://login2explore.com/jpdb/resources/js/0.0.3/jpdb-commons.js)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)

---

## Table of Contents

- [Description](#description)
- [Benefits of using JsonPowerDB](#benefits-of-using-jsonpowerdb)
- [Illustrations](#illustrations)
- [Scope of Functionalities](#scope-of-functionalities)
- [Examples of Use](#examples-of-use)
- [Installation & Setup](#installation--setup)
- [Development Setup](#development-setup)
- [Release History](#release-history)
- [Project Status](#project-status)
- [Sources](#sources)
- [Other Information](#other-information)
- [Meta](#meta)
- [Contributing](#contributing)

---

## Description

This micro-project is a web application designed to collect, retrieve, insert, and update student enrollment records in **JsonPowerDB**. 

The front-end user interface is built using standard HTML5, CSS3, Bootstrap 3.4.1, and jQuery. It interacts directly with JsonPowerDB backend services using the official `jpdb-commons.js` JavaScript library. 

The application automatically verifies the presence of a student record based on the primary key (`rollNo`) as soon as the user finishes typing in the Roll No field. Depending on whether the record exists or not, the form dynamically toggles its internal state between **Insert (Save)** mode and **Update** mode.

---

## Benefits of using JsonPowerDB

[JsonPowerDB (JPDB)](https://login2explore.com/jpdb/) is a Real-time, High Performance, Lightweight, and Simple to Use Serverless/NoSQL Data Server.

Key benefits of integrating JsonPowerDB into this project:
- **Serverless Backend Architecture:** Eliminates the need to write server-side scripts (Node.js, PHP, Python) or manage database connections manually.
- **High Performance & Speed:** Offers high-speed data indexation and retrieval, reducing round-trip latency.
- **RESTful API Access:** Standard HTTP endpoints for database operations (`/api/irl` for indexes and reading, `/api/iml` for data modification).
- **Schema-free / Flexible JSON Storage:** Stores records natively as JSON objects without needing rigid SQL table creation.
- **Low Memory Footprint:** Efficient server technology requiring minimum memory and resources.
- **Pre-built Helper Libraries:** Provides `jpdb-commons.js` out-of-the-box, making request generation (`createGET_BY_KEYRequest`, `createPUTRequest`, `createUPDATERecordRequest`) fast and developer-friendly.

---

## Illustrations

### System Architecture Flow

```
+------------------+         HTTP (AJAX)         +--------------------+
|                  | --------------------------> |                    |
|  Student Form    |   JSON Request / Tokens     |   JsonPowerDB      |
|  (HTML/JS/CSS)   |                             |   (Login2Explore)  |
|                  | <-------------------------- |                    |
+------------------+         JSON Response       +--------------------+
                                                        |
                                                 [ SCHOOL-DB ]
                                                        |
                                              [ STUDENT-TABLE ]
```

### UI Form Workflow

```
[ Input Roll No ] ---> Blur Event
                          |
                          v
               Check DB via /api/irl
                          |
        +-----------------+-----------------+
        |                                   |
(Status 400: Not Found)           (Status 200: Found)
        |                                   |
        v                                   v
  [ New Student ]                   [ Existing Student ]
- Enable Input Fields             - Pre-fill Student Data
- Enable Save & Reset             - Lock Roll No Field
- Disable Update                  - Enable Update & Reset
                                  - Disable Save
```

---

## Scope of Functionalities

- **Primary Key Search (`rollNo`):** Automatic checking of the Roll No field on `blur` event using `GET_BY_KEY`.
- **Dynamic Field Toggling:** Input fields remain disabled until a valid Roll No is entered and checked.
- **Form State Switcher:**
  - **New Record Flow:** Opens all fields for typing, enables `Save`, disables `Update`.
  - **Existing Record Flow:** Fills existing details (`fullName`, `stuClass`, `birthDate`, `address`, `enrollmentDate`), locks `rollNo`, enables `Update`, disables `Save`.
- **Data Validation:** Strict check for non-empty fields before sending API requests.
- **Local Storage Helper:** Stores `rec_no` locally to allow single-record updates without manually managing database primary keys.
- **Toast / Alert System:** Displays success and error feedback popups.

---

## Examples of Use

### 1. Saving a New Student Record
1. Enter `101` in the **Roll No** field and press `Tab` or click outside.
2. The badge updates to `<span class="badge-new">New Student</span>`.
3. Complete the form:
   - **Full Name:** `John Doe`
   - **Class:** `10-A`
   - **Birth Date:** `2008-05-15`
   - **Address:** `123 Main Street`
   - **Enrollment Date:** `2024-04-01`
4. Click **Save**. A notification will confirm that the record was saved successfully in `STUDENT-TABLE`.

### 2. Updating an Existing Student Record
1. Type `101` into **Roll No** and leave the input box.
2. The badge updates to `<span class="badge-existing">Existing Student</span>`, and all fields populate automatically.
3. Update the **Class** field to `11-A`.
4. Click **Update**. The record will be updated in JsonPowerDB using its record number (`rec_no`).

---

## Installation & Setup

1. **Clone the repository:**
   ```sh
   git clone https://github.com/your-username/MicroProject.git
   cd MicroProject
   ```

2. **Configure JsonPowerDB Token:**
   Open `script.js` and set your JsonPowerDB Connection Token:
   ```javascript
   var connToken = "90933498|-31949244602169023|90903854";
   ```

3. **Launch the Application:**
   - Double-click `index.html` to open it in your browser.
   - Or run with a local web server:
     ```sh
     npx serve .
     ```

---

## Development Setup

No complex build step or framework installation is required.

### Database Configuration (`script.js`):
- **Database Name:** `SCHOOL-DB`
- **Relation Name:** `STUDENT-TABLE`
- **Base API URL:** `http://api.login2explore.com:5577`

### API Endpoint Methods used:
- `createGET_BY_KEYRequest(connToken, dbName, relName, getReqObj)` sent to `/api/irl`
- `createPUTRequest(connToken, jsonStr, dbName, relName)` sent to `/api/iml`
- `createUPDATERecordRequest(connToken, jsonStr, dbName, relName, recNo)` sent to `/api/iml`

---

## Release History

* `0.1.0`
    * ADD: Initial GitHub release of JsonPowerDB Student Enrollment Form.
    * ADD: Full integration with JsonPowerDB `GET_BY_KEY`, `PUT`, and `UPDATE` APIs.
    * ADD: Smart form state switching (Save / Update / Reset).
    * ADD: Responsive Bootstrap layout with glassmorphism UI styling.

---

## Project Status

**Completed / Stable** — The core CRUD functionalities (Create, Read via Key, Update, Reset) for student records are fully implemented and verified with JsonPowerDB.

---

## Sources

- [JsonPowerDB Official Documentation](https://login2explore.com/jpdb/docs.html)
- [JsonPowerDB Developer Resources](https://login2explore.com/jpdb/resources.html)
- [Bootstrap 3.4 Documentation](https://getbootstrap.com/docs/3.4/)
- [jQuery API Documentation](https://api.jquery.com/)
- [README Template Reference by dbader](https://github.com/dbader/readme-template)

---

## Other Information

- **Primary Key:** `rollNo`
- **Dependencies Loaded via CDN:**
  - jQuery `v3.5.1`
  - Bootstrap CSS & JS `v3.4.1`
  - `jpdb-commons.js` (`v0.0.3`)
  - Google Fonts (*Plus Jakarta Sans*)

---

## Meta

Your Name – [@your_twitter](https://twitter.com/) – email@example.com

Distributed under the MIT license. See `LICENSE` for more information.

[https://github.com/your-username/MicroProject](https://github.com/)

---

## Contributing

1. Fork it (<https://github.com/your-username/MicroProject/fork>)
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request
