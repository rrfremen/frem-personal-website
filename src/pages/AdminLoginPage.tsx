import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "@/services/api";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";

export default function AdminLoginPage() {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function handleLogin() {
        setError(null);
        setLoading(true);
        try {
            const data = await apiFetch<{ token: string }>("/pilot/login", {
                method: "POST",
                body: JSON.stringify({ username, password }),
            });
            login(data.token);
            navigate("/pilot");
        } catch {
            setError("Invalid credentials");
        } finally {
            setLoading(false);
        }
    }

    function handleKeyDown(e: React.KeyboardEvent) {
        if (e.key === "Enter" && !loading) handleLogin();
    }

    return (
        <section className="max-w-sm flex flex-col gap-5 px-4 md:px-0">
            <h1 className="text-2xl font-medium text-black">Admin</h1>

            <Field>
                <FieldLabel>Username</FieldLabel>
                <Input
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    onKeyDown={handleKeyDown}
                    autoComplete="username"
                />
            </Field>

            <Field>
                <FieldLabel>Password</FieldLabel>
                <Input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    onKeyDown={handleKeyDown}
                    autoComplete="current-password"
                />
            </Field>

            {error && <FieldError>{error}</FieldError>}

            <Button onClick={handleLogin} disabled={loading}>
                {loading ? "Logging in..." : "Login"}
            </Button>
        </section>
    );
}