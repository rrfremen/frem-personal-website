import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "@/services/api";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";

interface Contact {
    id: number;
    type: string;
    name: string;
    email: string;
    message: string;
    timestamp: string;
    status: string;
}

async function loadData(
    t: string,
    setContacts: (c: Contact[]) => void,
    setLoading: (b: boolean) => void,
    setError: (e: string | null) => void,
) {
    setLoading(true);
    setError(null);
    try {
        const [contactsData] = await Promise.all([
            apiFetch<Contact[]>("/pilot/contacts", {}, t)
        ]);
        setContacts(contactsData);
    } catch {
        setError("Failed to load data");
    } finally {
        setLoading(false);
    }
}

export default function AdminPage() {
    const { token, logout } = useAuth();
    const navigate = useNavigate();

    const [contacts, setContacts] = useState<Contact[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [actionLoading, setActionLoading] = useState<number | null>(null);

    useEffect(() => {
        if (!token) {
            navigate("/pilot/login");
            return;
        }
        loadData(token, setContacts, setLoading, setError);
    }, [token, navigate]);

    async function handleToggleStatus(contactId: number) {
        if (!token) return;
        setActionLoading(contactId);
        try {
            await apiFetch(`/pilot/contacts/${contactId}/status`, { method: "PATCH" }, token);
            await loadData(token, setContacts, setLoading, setError);
        } catch {
            setError("Failed to update status");
        } finally {
            setActionLoading(null);
        }
    }

    async function handleDeleteContact(contactId: number) {
        if (!token) return;
        setActionLoading(contactId);
        try {
            await apiFetch(`/pilot/contacts/${contactId}`, { method: "DELETE" }, token);
            await loadData(token, setContacts, setLoading, setError);
        } catch {
            setError("Failed to delete contact");
        } finally {
            setActionLoading(null);
        }
    }

    function handleLogout() {
        logout();
        navigate("/pilot/login");
    }

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <section className="flex flex-col gap-8 px-4 md:px-0">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-medium text-black">Admin Dashboard</h1>
                <Button variant="outline" onClick={handleLogout}>Logout</Button>
            </div>

            {/* Contacts */}
            <div className="flex flex-col gap-4">
                <h2 className="text-lg font-medium">Submissions</h2>
                {contacts.length === 0 && <p className="text-sm text-gray-500">No submissions yet.</p>}
                {contacts.map(contact => (
                    <div key={contact.id} className="border rounded-lg p-4 flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-medium">{contact.name}</span>
                                <span className="text-xs text-gray-500">{contact.email}</span>
                                <span className="text-xs bg-gray-100 px-2 py-0.5 rounded">{contact.type}</span>
                                <span className="text-xs bg-gray-100 px-2 py-0.5 rounded">{contact.status}</span>
                            </div>
                            <span className="text-xs text-gray-400">{new Date(contact.timestamp).toLocaleDateString()}</span>
                        </div>
                        <p className="text-sm text-gray-700 whitespace-pre-wrap">{contact.message}</p>
                        <div className="flex gap-2 mt-1">
                            <Button
                                size="sm"
                                variant="outline"
                                disabled={actionLoading === contact.id}
                                onClick={() => handleToggleStatus(contact.id)}
                            >
                                {contact.status === "read" ? "Mark Unread" : "Mark Read"}
                            </Button>
                            <Button
                                size="sm"
                                variant="destructive"
                                disabled={actionLoading === contact.id}
                                onClick={() => handleDeleteContact(contact.id)}
                            >
                                Delete
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}