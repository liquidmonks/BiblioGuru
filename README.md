# BiblioGuru

> *A personal library collection and loan management system.*

## 📖 Overview

**BiblioGuru** is a cloud-based application designed to help users catalog their personal book collections and manage loans to friends, family, and other borrowers. The application tracks each book's title, author, borrower details, loan dates, and return status. By integrating AI-powered cataloging, BiblioGuru simplifies book management by allowing users to add books simply by uploading an image. The AI processes the image and identifies the book details, which are then added to the database.

The system also provides features for borrower management, ensuring you can keep track of who borrowed which books and when they're expected to return them. The UI includes an admin panel where you can manage your library with full CRUD capabilities.

## 📜 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Contributing](#contributing)
- [Author](#author)
- [License](#license)

## 🚀 Features

- AI-powered book cataloging by uploading book images.
- Full CRUD capabilities for managing book collection and borrowers.
- Loan tracking with borrow and return dates.
- Borrower management, including contact information and reminders.
- Administrative login for book and borrower management.
- Modern UI design styled with Tailwind CSS.
- User-friendly web interface to browse books and manage loans.
- Image and GIF placeholders showcasing the program in action.
- Export book and borrower records to XML format for easy sharing (e.g., on Google Sheets).

## 🛠️ Technologies Used

- **Frontend**: HTML, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (NoSQL database for flexibility in cataloging)
- **AI Integration**: OpenAI API for cataloging books via image recognition
- **Authentication**: JSON Web Token (JWT) for admin login
- **Cloud Hosting**: Render, Vercel, or another free cloud hosting provider

## 📂 Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/liquidmonks/biblioguru.git
   ```
2. **Install dependencies:**
   ```bash
   cd biblioguru
   npm install
   ```
3. **Configure environment variables:**
   - Create a `.env` file to store the following variables:
     - `MONGO_URI` (MongoDB connection string)
     - `OPENAI_API_KEY` (API key for OpenAI integration)
     - `JWT_SECRET` (Secret key for JWT authentication)
4. **Run the application:**
   ```bash
   npm start
   ```

## 📊 Usage

- **Admin Access:** Log in with admin credentials to manage your book catalog and borrowers.
- **Book Cataloging:** Upload an image of the book cover, and the AI will identify and add it to the catalog.
- **Loan Management:** Track who borrowed each book and send reminders as needed.
- **Export Records:** Export the list of books and borrower information in XML format for easy sharing and integration with other platforms like Google Sheets.

## 🌱 Contributing

We welcome contributions from the open-source community! To contribute:

1. Fork the repository.
2. Create a new branch for your feature (`git checkout -b feature/new-feature`).
3. Make your changes and commit them (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature/new-feature`).
5. Open a Pull Request.

## 👤 Author

**Liquid Monks**  
- GitHub: [liquidmonks](https://github.com/liquidmonks)

## 📜 License

This project is licensed under the MIT License. See the LICENSE file for more details.

---

## 📷 Placeholder Image and GIF

- *Placeholder for the application interface image*  
  ![App Screenshot](placeholder-image.png)

- *Placeholder for GIF showcasing the application's book cataloging feature*  
  ![App GIF](placeholder-gif.gif)

## ✨ Improvements & Ideas

- Consider adding a social sharing feature so users can share their favorite books or loan experiences.
- Implement a calendar view for better visualization of loan due dates.
- Allow users to add ratings and reviews for each book to add more value to the library collection.
- Enhance UX with notifications for upcoming or overdue returns.
