import React from 'react';

function ManageBorrowersPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-red-100 to-purple-200 p-8">
            <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md p-6">
                <h1 className="text-4xl font-bold text-center mb-6 text-gray-800">Manage Borrowers</h1>
                <p className="text-lg text-gray-600 text-center">
                    View and manage all borrowers. Add new borrowers or update their details.
                </p>
                {/* Placeholder content for managing borrowers */}
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-gray-100 p-4 rounded shadow-md">
                        <h2 className="text-xl font-bold">Borrower: John Doe</h2>
                        <p>Email: johndoe@example.com</p>
                        <button
                            className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600">Edit
                            Borrower
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ManageBorrowersPage;
