import Link from 'next/link';

export default function Announcements() {
    const announcements = [
        {
            id: 1,
            title: 'New Semester Begins',
            date: 'September 1, 2024',
            description: 'The new semester will start on September 1st, 2024. Please check your schedule and be prepared for an exciting term ahead!',
        },
        {
            id: 2,
            title: 'COVID-19 Guidelines Update',
            date: 'August 25, 2024',
            description: 'Following recent health advisories, we have updated our COVID-19 guidelines. Please ensure to read and adhere to them.',
        },
        {
            id: 3,
            title: 'AU Connect Intercom Maintenance',
            date: 'August 20, 2024',
            description: 'Scheduled maintenance will take place on August 20th from 12:00 AM to 4:00 AM. The system will be inaccessible during this time.',
        },
        // Add more announcements as needed
    ];

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-gray-100">
            <div className="w-full max-w-4xl p-8 space-y-8 bg-white rounded-lg shadow-lg">
                <h1 className="text-3xl font-extrabold text-center text-gray-900">Announcements</h1>
                <div className="space-y-6">
                    {announcements.map((announcement) => (
                        <div key={announcement.id} className="p-6 border rounded-lg shadow-sm bg-gray-50 hover:bg-gray-100 transition">
                            <h2 className="text-xl font-bold text-indigo-600">{announcement.title}</h2>
                            <p className="text-sm text-gray-500">{announcement.date}</p>
                            <p className="mt-2 text-gray-700">{announcement.description}</p>
                        </div>
                    ))}
                </div>
                <div className="flex justify-between mt-6">
                    <Link href="/" className="text-indigo-600 hover:text-indigo-500">
                        Go back to homepage
                    </Link>
                    <Link href="/create-announcement" className="text-indigo-600 hover:text-indigo-500">
                        Create New Announcement
                    </Link>
                </div>
            </div>
        </main>
    );
}
