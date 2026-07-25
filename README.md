# Student Enrollment Form (JsonPowerDB)
> A responsive web-based Student Enrollment System interacting with JsonPowerDB (`SCHOOL-DB` / `STUDENT-TABLE`) for seamless CRUD data operations.

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-3.4.1-563D7C?style=flat-square&logo=bootstrap&logoColor=white)](https://getbootstrap.com/)
[![JsonPowerDB](https://img.shields.io/badge/JsonPowerDB-v0.0.3-007ACC?style=flat-square)](https://login2explore.com/jpdb/resources/js/0.0.3/jpdb-commons.js)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)

This project is a micro-web application that provides a complete user interface for managing student records. Powered by **JsonPowerDB**—a high-performance, real-time, multi-database engine developed by Login2Explore—it supports fetching, inserting, and updating records dynamically based on the primary key (`rollNo`).

The form intelligently adjusts its state (input field lock/unlock and Save/Update button toggling) based on whether the entered Roll No already exists in the database.

---

## Key Features

* **Automatic Primary Key Verification:** Instantly checks if a Roll No exists in `SCHOOL-DB` / `STUDENT-TABLE` as soon as the input field loses focus (`blur` event).
* **Smart Form State Management:**
  * **New Record Flow:** Enables form inputs, activates the `Save` and `Reset` buttons, and disables the `Update` button.
  * **Existing Record Flow:** Auto-populates all student details, locks the `Roll No` field, activates the `Update` and `Reset` buttons, and disables the `Save` button.
* **Complete Form Validation:** Checks that all required fields (`rollNo`, `fullName`, `stuClass`, `birthDate`, `address`, `enrollmentDate`) are populated before submitting.
* **Instant Toast Notifications:** Provides real-time visual feedback on data operation success or failure.
* **Clean & Modern UI:** Designed with custom glassmorphism styles, Google's *Plus Jakarta Sans* typography, and Bootstrap responsive grid.

---

## Database Schema & Configuration

| Field Name | Type | Description | Key Type |
| :--- | :--- | :--- | :--- |
| `rollNo` | String / Number | Unique identifier for the student | Primary Key |
| `fullName` | String | Full Name of the student | Field |
| `stuClass` | String | Class/Grade (e.g. `10-A`) | Field |
| `birthDate` | Date | Date of Birth (`YYYY-MM-DD`) | Field |
| `address` | String | Residential Address | Field |
| `enrollmentDate` | Date | Date of Enrollment (`YYYY-MM-DD`) | Field |

* **Database Name:** `SCHOOL-DB`
* **Relation Name:** `STUDENT-TABLE`
* **Base URL:** `http://api.login2explore.com:5577`

---

## Installation & Setup

1. **Clone the repository:**
   ```sh
   git clone https://github.com/your-username/MicroProject.git
   cd MicroProject
   ```

2. **Configure your JsonPowerDB Connection Token:**
   Open `script.js` and replace `connToken` with your valid JsonPowerDB token:
   ```javascript
   var connToken = "YOUR_JPDB_CONNECTION_TOKEN";
   ```

3. **Run the Application:**
   * Open `index.html` directly in any web browser.
   * Or use a local development server (such as VS Code Live Server or `npx serve`):
     ```sh
     npx serve .
     ```

---

## Usage Example

1. **Adding a New Student:**
   * Enter a new `Roll No.` (e.g., `101`) and press `Tab` or click outside the box.
   * The status badge will display **New Student**.
   * Fill out the unlocked fields: Full Name, Class, Birth Date, Address, and Enrollment Date.
   * Click **Save** to insert the record into `STUDENT-TABLE`.

2. **Updating an Existing Student:**
   * Enter an existing `Roll No.` (e.g., `101`) and blur the field.
   * The status badge will display **Existing Student** and pre-fill all saved data.
   * Modify any details as needed.
   * Click **Update** to save the changes to JsonPowerDB.

3. **Resetting the Form:**
   * Click **Reset** at any point to clear all form fields, reset button states, and set focus back to `Roll No.`.

---

## Development Setup

The application uses plain HTML, CSS, JavaScript (jQuery), and `jpdb-commons.js` without complex build pipelines.

To run locally and test API requests:

```sh
# Start a simple HTTP server
npx serve .
```

### Key API Operations used via `jpdb-commons.js`:
* **GET BY KEY (`/api/irl`):** `createGET_BY_KEYRequest(token, dbName, relName, jsonStr)`
* **PUT / INSERT (`/api/iml`):** `createPUTRequest(token, jsonStr, dbName, relName)`
* **UPDATE (`/api/iml`):** `createUPDATERecordRequest(token, jsonStr, dbName, relName, recNo)`

---

## Release History

* `0.1.0`
    * ADD: Initial release of Student Enrollment Form micro-project
    * ADD: JsonPowerDB integration for `GET_BY_KEY`, `PUT`, and `UPDATE` API calls
    * ADD: Dynamic UI state toggling and input validation
    * ADD: Responsive Bootstrap and custom CSS glassmorphism layout

---

## Meta

Your Name – [@twitter_handle](https://twitter.com/) – email@example.com

Distributed under the MIT license. See `LICENSE` for more information.

[https://github.com/your-username/MicroProject](https://github.com/)

---

## Contributing

1. Fork it (<https://github.com/your-username/MicroProject/fork>)
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request
