import { useState, useEffect } from "react";
import { apiFetch } from "@/services/api";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";


const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY

declare global {
    interface Window {
        turnstile: {
            render: (container: string | HTMLElement, options: Record<string, unknown>) => string;
            reset: (widgetId: string) => void;
            getResponse: (widgetId: string) => string | undefined;
        };
    }
}

export default function ContactPage() {
    const { ts } = useLanguage();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [widgetId, setWidgetId] = useState<string | null>(null);

    useEffect(() => {
        if (widgetId) return;
        const interval = setInterval(() => {
            if (!window.turnstile) return;
            const container = document.getElementById("turnstile-container");
            if (!container) return;
            const id = window.turnstile.render(container, { sitekey: TURNSTILE_SITE_KEY });
            setWidgetId(id);
            clearInterval(interval);
        }, 100);
        return () => clearInterval(interval);
    }, [widgetId]);

    async function handleSubmit() {
        setError(null);
        const turnstileToken = widgetId ? window.turnstile.getResponse(widgetId) : undefined;
        if (!turnstileToken) {
            setError(ts("contact.error_captcha"));
            return;
        }

        setLoading(true);
        try {
            await apiFetch("/contact/submit", {
                method: "POST",
                body: JSON.stringify({
                    type: "contact",
                    name,
                    email,
                    message,
                    turnstile_token: turnstileToken,
                }),
            });
            setSuccess(true);
        } catch (err) {
            setError(err instanceof Error ? err.message : ts("contact.error_generic"));
            if (widgetId) window.turnstile.reset(widgetId);
        } finally {
            setLoading(false);
        }
    }

    if (success) {
        return (
            <section className="max-w-lg">
                <h1 className="text-2xl font-medium text-black mb-2">{ts("contact.success_title")}</h1>
                <p className="text-base">{ts("contact.success_body")}</p>
            </section>
        );
    }

    return (
        <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="max-w-lg flex flex-col gap-5 px-4 md:px-0">
            <h1 className="text-2xl font-medium text-black">{ts("contact.title")}</h1>
            <p className="text-base">{ts("contact.subtitle")}</p>
            <Field>
                <FieldLabel>{ts("contact.name")}</FieldLabel>
                <Input
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder={ts("contact.name_placeholder")}
                    maxLength={50}
                    required
                />
            </Field>

            <Field>
                <FieldLabel>{ts("contact.email")} <span className="text-gray-400 font-normal">(Optional)</span> </FieldLabel>
                <Input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder={ts("contact.email_placeholder")}
                />
            </Field>

            <Field>
                <FieldLabel>{ts("contact.message")}</FieldLabel>
                <Textarea
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    placeholder={ts("contact.message_placeholder")}
                    maxLength={2000}
                    rows={5}
                    required
                />
            </Field>

            {/* Turnstile widget — script loaded via index.html */}
            <div id="turnstile-container" />

            {error && <FieldError>{error}</FieldError>}

            <Button type="submit" disabled={loading}>
                {loading ? ts("contact.sending") : ts("contact.submit")}
            </Button>
        </form>
    );
}
