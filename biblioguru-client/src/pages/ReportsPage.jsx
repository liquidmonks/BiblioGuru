import React from 'react';

function ReportsPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-purple-100 to-pink-200 p-8">
            <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md p-6">
                <h1 className="text-4xl font-bold text-center mb-6 text-gray-800">Reports</h1>
                <p className="text-lg text-gray-600 text-center">
                    Here, you can generate various reports related to library activity, such as borrowed books, due
                    returns, and borrower history.
                </p>
                {/* Placeholder content for reports */}
                <div className="mt-6">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600">Generate
                        Book Borrowing Report
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ReportsPage;
