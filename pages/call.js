// pages/contact-admin.js
import Link from 'next/link';

export default function ContactAdmin() {
    const adminContact = {
        address: '88 Moo 8 Bang Na-Trad Km. 26, Bang Sao Thong, Samut Prakan Thailand 10570',
        tel: '+66-2-7232222',
        fax: '+66-2-7070395',
        email: 'abac@au.edu',
        busLines: ['46', '132', '133', '533', '552', '537'],
    };

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-gray-100">
            <div className="w-full max-w-4xl p-8 space-y-8 bg-white rounded-lg shadow-lg">
                <h1 className="text-3xl font-extrabold text-center text-gray-900">Contact School Admin</h1>
                <div className="space-y-6">
                    {/* Address Section */}
                    <div className="p-4 border rounded-lg shadow-sm bg-gray-50 hover:bg-gray-100 transition">
                        <h2 className="text-lg font-bold text-indigo-600">Address</h2>
                        <p className="text-sm text-gray-700">{adminContact.address}</p>
                        <a
                            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(adminContact.address)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-indigo-600 hover:text-indigo-500 block mt-2"
                        >
                            View on Google Maps
                        </a>
                    </div>

                    {/* Telephone Section */}
                    <div className="p-4 border rounded-lg shadow-sm bg-gray-50 hover:bg-gray-100 transition">
                        <h2 className="text-lg font-bold text-indigo-600">Telephone</h2>
                        <p className="text-sm text-gray-700">Tel: <a href={`tel:${adminContact.tel}`} className="text-indigo-600 hover:text-indigo-500">{adminContact.tel}</a></p>
                        <p className="text-sm text-gray-700">Fax: {adminContact.fax}</p>
                    </div>

                    {/* Email Section */}
                    <div className="p-4 border rounded-lg shadow-sm bg-gray-50 hover:bg-gray-100 transition">
                        <h2 className="text-lg font-bold text-indigo-600">Email</h2>
                        <p className="text-sm text-gray-700">
                            E-mail: <a href={`mailto:${adminContact.email}`} className="text-indigo-600 hover:text-indigo-500">{adminContact.email}</a>
                        </p>
                    </div>

                    {/* Bus Lines Section */}
                    <div className="p-4 border rounded-lg shadow-sm bg-gray-50 hover:bg-gray-100 transition">
                        <h2 className="text-lg font-bold text-indigo-600">Bus Lines</h2>
                        <p className="text-sm text-gray-700">Available Bus Lines: {adminContact.busLines.join(', ')}</p>
                    </div>
                </div>

                {/* Back to Homepage Link */}
                <div className="flex justify-center mt-6">
                    <Link href="/" className="text-indigo-600 hover:text-indigo-500">
                        Go back to homepage
                    </Link>
                </div>
            </div>
        </main>
    );
}
