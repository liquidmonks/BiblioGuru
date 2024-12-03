import React from 'react';

function ManageLoansPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-green-100 to-blue-200 p-8">
            <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md p-6">
                <h1 className="text-4xl font-bold text-center mb-6 text-gray-800">Manage Loans</h1>
                <p className="text-lg text-gray-600 text-center">
                    View and manage all the active loans and overdue items.
                </p>
                {/* Placeholder content for managing loans */}
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-gray-100 p-4 rounded shadow-md">
                        <h2 className="text-xl font-bold">Book: "Sample Book Title"</h2>
                        <p>Borrower: John Doe</p>
                        <p>Due Date: 2024-12-15</p>
                        <button
                            className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600">Mark
                            as Returned
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ManageLoansPage;
