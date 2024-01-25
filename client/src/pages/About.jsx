import React from 'react'

const About = () => {
    return (
        <div className='px-5 py-5 mx-auto max-w-6xl mb-3 md:mb-5'>

            <h1 className="text-center text-2xl md:text-3xl mb-5 font-extrabold text-slate-700"> About This App</h1>
            <p className="text-center text-base md:text-2xl mb-5 font-normal text-slate-700">
                Welcome to the About page of my authentication application! 🌐 This app is designed to provide a secure and user-friendly authentication experience using the MERN stack (MongoDB, Express, React, Node.js). Let's dive into some key aspects of this project:
            </p>

            <span className="text-center text-2xl font-bold text-red-700">## Project Overview</span>
            <p className="mt-5 text-slate-700 text-base lg:text-2xl">
                This authentication app serves as a foundation for user authentication in web applications. It's built with modern web development practices, ensuring scalability, security, and a seamless user experience.
            </p>

            <p className="mt-5 text-slate-700 text-base md:text-2xl">
                <p className='text-orange-600 text-2xl font-bold mb-2 '>## Development Process</p>
                The development process prioritized clean and maintainable code, adhering to best practices. Regular testing and code reviews were conducted to ensure the reliability and security of the application.

            </p>

            <p className="mt-5 text-slate-700 mb-4 text-base md:text-2xl">
                <p className='text-purple-600 text-2xl font-bold mb-2'>## Get Involved</p>
                Feel free to explore the source code available on [GitHub](link-to-your-repository). If you have any feedback, suggestions, or would like to contribute, we welcome your involvement in making this project even better.

            </p>

            <p className=" text-slate-700 mt-2 font-medium text-base md:text-2xl">
                Thank you for being a part of our journey! 🚀
            </p>
        </div>
    )
}

export default About