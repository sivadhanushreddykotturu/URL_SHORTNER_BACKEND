# 🔗 URL Shortener API

A lightweight, robust backend API built with Node.js, Express, and MongoDB to generate, redirect, and track shortened URLs. 

> **Note:** This is a pure backend project. Instead of a full frontend application, I built a minimal, built-in HTML documentation page directly at the root route to help you test the endpoints quickly.

🌐 **Live Demo API:** [https://url-shortner-backend-jycp.onrender.com](https://url-shortner-backend-jycp.onrender.com)

---

## 🚀 Features

* **URL Shortening:** Generates a unique, short ID for any long URL.
* **Expiration Logic:** Links automatically expire after 7 days (returns a `410 Gone` status).
* **Analytics Tracking:** Logs the precise timestamp of every single visit.
* **Fail-Safe Routing:** Handles invalid or expired short links cleanly with descriptive JSON error states.

---

## 🛠️ API Reference & Routing

You can test these routes using tools like **Postman**, **Hoppscotch**, or `curl`.

### 1. Get API Documentation
* **Route:** `GET /`
* **Description:** Returns a basic HTML page explaining how to interact with the API.

### 2. Create a Short URL
* **Route:** `POST /`
* **Headers:** `Content-Type: application/json`
* **Request Body (Raw JSON):**
    ```json
    {
      "url": "https://timetablekl.vercel.app"
    }
    ```
* **Response (201 Created):**
    ```json
    {
      "id": "2vCV9OtQ"
    }
    ```

### 3. Redirect to Original URL
* **Route:** `GET /:shortId`
* **Description:** Redirects the user to the original website if the link is valid and active.
* **Example Live Test:** [https://url-shortner-backend-jycp.onrender.com/2vCV9OtQ](https://url-shortner-backend-jycp.onrender.com/2vCV9OtQ)

#### Error Responses:
* **Link Doesn't Exist (`404 Not Found`):**
    ```json
    {
      "error": "Short URL not found"
    }
    ```
* **Link Exceeded 7-Day Window (`410 Gone`):**
    ```json
    {
      "error": "Short URL is expired"
    }
    ```

### 4. Get Link Analytics
* **Route:** `GET /analytics/:shortId`
* **Description:** Retrieves total click metrics along with historical timestamps for each visit.
* **Response (200 OK):**
    ```json
    {
      "totalclicks": 2,
      "analytics": [
        {
          "timestamp": 1779792873501,
          "_id": "6a157be9370040d9ec1a35ab"
        },
        {
          "timestamp": 1779793741525,
          "_id": "6a157f4d980dafa8fc32ca16"
        }
      ]
    }
    ```

---

## 💻 Tech Stack

* **Backend:** Node.js, Express.js
* **Database:** MongoDB Atlas (M0 Cluster)
* **Hosting:** Render
