import React from 'react'

const Home = () => {
    return (
        <div className='px-5 py-5 mx-auto max-w-6xl mb-3 md:mb-5'>

            <h1 className="text-center text-2xl md:text-3xl mb-5 font-extrabold text-slate-700">Welcome to My Auth App!</h1>
            <p className="text-center text-base md:text-2xl mb-5 font-normal text-slate-700">
                Thank you for exploring my authentication application! 🚀 This app has been developed using the MERN stack, incorporating various technologies to create a secure and seamless user authentication experience.
            </p>

            <span className="text-center text-2xl font-bold text-red-700">Technologies Used:</span>
            <p className="mt-5 text-slate-700 text-base lg:text-2xl">
                <p className='text-green-600 text-2xl font-bold mb-2'>### Frontend</p>
                - **React Vite:** The frontend of this application is built with React using Vite, a fast and opinionated build tool for modern web development.
            </p>

            <p className="mt-5 text-slate-700 text-base md:text-2xl">
                <p className='text-orange-600 text-2xl font-bold mb-2 '>### Backend</p>
                - **MongoDB:** The application utilizes MongoDB as the database to store user information securely.
                - **Express:** Express.js is used as the backend framework to handle server-side logic and API endpoints.
                - **Node.js:** The backend is powered by Node.js, providing a scalable and efficient runtime environment.
            </p>

            <p className="mt-5 text-slate-700 mb-4 text-base md:text-2xl">
                <p className='text-purple-600 text-2xl font-bold mb-2'>### Authentication Features</p>
                - **Bcrypt:** Passwords are securely hashed using Bcrypt to protect user credentials.
                - **JWT (JSON Web Tokens):** JWT is employed for secure and stateless user authentication, enhancing the overall security of the application.
            </p>

            <span className='text-blue-600 text-2xl font-bold '>## Get Started:</span>

            <p className=" text-slate-700 mt-2 text-base md:text-2xl">
                To explore the functionalities of this authentication app, follow these steps:

                1. Clone the repository.
                2. Install dependencies using `npm install` in both the client and server directories.
                3. Configure your MongoDB connection in the server's `.env` file.
                4. Run the server using `npm start` in the server directory.
                5. Run the client using `npm run dev` in the client directory.

                Feel free to explore the code and experiment with the features! If you have any questions or feedback, don't hesitate to reach out. Happy coding! 🚀
            </p>
        </div>
    )
}

export default Home