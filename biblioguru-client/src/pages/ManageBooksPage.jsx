import React from 'react';

function ManageBooksPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-yellow-100 to-orange-200 p-8">
            <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md p-6">
                <h1 className="text-4xl font-bold text-center mb-6 text-gray-800">Manage Books</h1>
                <p className="text-lg text-gray-600 text-center">
                    Add, edit, or remove books from the library's collection.
                </p>
                {/* Placeholder content for managing books */}
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-gray-100 p-4 rounded shadow-md">
                        <h2 className="text-xl font-bold">Book: "Sample Book Title"</h2>
                        <p>Author: Jane Doe</p>
                        <button
                            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600">Edit
                            Book
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ManageBooksPage;
