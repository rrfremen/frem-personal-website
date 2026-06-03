import { useLanguage } from "@/context/LanguageContext";


export default function PrivacyPage() {
    const { ts } = useLanguage();

    return (
        <div className="w-full space-y-12">
 
            {/* English */}
            <section className="space-y-6">
                <h1 className="text-2xl font-bold">Privacy Notice</h1>
 
                <div className="space-y-2">
                    <h2 className="text-lg font-semibold">1. Controller</h2>
                    <p>{ts("footer.copyright_name")}<br />{ts("footer.domain_name")}<br />Deutschland</p>
                    <p>Contact: use the contact form on this website.</p>
                </div>
 
                <div className="space-y-2">
                    <h2 className="text-lg font-semibold">2. What Data Is Collected</h2>
                    <p><span className="font-medium">Server logs</span><br />
                    Every request to this website is logged automatically for security and abuse prevention purposes. This includes your IP address, the date and time of the request, and your browser's user agent string. Logs are deleted after 14 days.</p>
                    <p><span className="font-medium">Contact form</span><br />
                    When you submit the contact form, your name, email address, and message are stored. A confirmation email is sent to you via Resend (Resend Inc., USA). An internal notification is also sent to the site owner. Contact form submissions are stored until manually deleted. You may request deletion at any time.</p>
                    <p className="text-sm text-gray-500">Legal basis for all of the above: Art. 6(1)(f) GDPR — legitimate interest in operating the site and responding to enquiries.</p>
                </div>
 
                <div className="space-y-2">
                    <h2 className="text-lg font-semibold">3. Third Parties</h2>
                    <p>Traffic is routed through Cloudflare (Cloudflare Inc., USA), which provides security and DDoS protection. Confirmation emails are sent via Resend (Resend Inc., USA). Both companies may process data in the United States and provide Standard Contractual Clauses as a transfer safeguard.</p>
                    <p>
                        <a href="https://www.cloudflare.com/policies/privacy/" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-500">Cloudflare Privacy Policy</a>
                        <span className="mx-2">·</span>
                        <a href="https://resend.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-500">Resend Privacy Policy</a>
                    </p>
                </div>
 
                <div className="space-y-2">
                    <h2 className="text-lg font-semibold">4. Your Rights</h2>
                    <p>You have the right to access, correct, or delete your data, and to object to its processing. To exercise these rights, use the contact form. You also have the right to lodge a complaint with the local data protection authority: <a href="https://www.ldi.nrw.de/" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-500">ldi.nrw.de</a></p>
                </div>
 
                <div className="space-y-2">
                    <h2 className="text-lg font-semibold">5. Cookies</h2>
                    <p>This website does not use cookies for tracking or analytics.</p>
                </div>
 
                <p className="text-sm text-gray-500">Last updated: June 2026</p>
            </section>
 
            <hr className="border-gray-300" />
 
            {/* Deutsch */}
            <section className="space-y-6">
                <h1 className="text-2xl font-bold">Datenschutzerklärung</h1>
 
                <div className="space-y-2">
                    <h2 className="text-lg font-semibold">1. Verantwortlicher</h2>
                    <p>{ts("footer.copyright_name")}<br />{ts("footer.domain_name")}<br />Deutschland</p>
                    <p>Kontakt: über das Kontaktformular auf dieser Website.</p>
                </div>
 
                <div className="space-y-2">
                    <h2 className="text-lg font-semibold">2. Welche Daten werden erhoben</h2>
                    <p><span className="font-medium">Serverlogs</span><br />
                    Bei jedem Zugriff auf diese Website werden automatisch Daten zu Sicherheits- und Missbrauchsschutzzwecken protokolliert. Dazu gehören Ihre IP-Adresse, Datum und Uhrzeit des Zugriffs sowie der User-Agent-String Ihres Browsers. Logs werden nach 14 Tagen gelöscht.</p>
                    <p><span className="font-medium">Kontaktformular</span><br />
                    Bei der Nutzung des Kontaktformulars werden Ihr Name, Ihre E-Mail-Adresse und Ihre Nachricht gespeichert. An Ihre E-Mail-Adresse wird eine Bestätigungsmail über Resend (Resend Inc., USA) versandt. Der Seitenbetreiber erhält ebenfalls eine Benachrichtigung. Einsendungen werden gespeichert, bis sie manuell gelöscht werden. Sie können jederzeit die Löschung beantragen.</p>
                    <p className="text-sm text-gray-500">Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO — berechtigtes Interesse am Betrieb der Website und an der Beantwortung von Anfragen.</p>
                </div>
 
                <div className="space-y-2">
                    <h2 className="text-lg font-semibold">3. Drittanbieter</h2>
                    <p>Der Datenverkehr wird über Cloudflare (Cloudflare Inc., USA) geleitet, das Sicherheit und DDoS-Schutz bereitstellt. Bestätigungsmails werden über Resend (Resend Inc., USA) versandt. Beide Unternehmen können Daten in den USA verarbeiten und stellen Standardvertragsklauseln als Übertragungssicherung bereit.</p>
                    <p>
                        <a href="https://www.cloudflare.com/policies/privacy/" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-500">Cloudflare Datenschutzerklärung</a>
                        <span className="mx-2">·</span>
                        <a href="https://resend.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-500">Resend Datenschutzerklärung</a>
                    </p>
                </div>
 
                <div className="space-y-2">
                    <h2 className="text-lg font-semibold">4. Ihre Rechte</h2>
                    <p>Sie haben das Recht auf Auskunft, Berichtigung und Löschung Ihrer Daten sowie auf Widerspruch gegen die Verarbeitung. Zur Ausübung dieser Rechte nutzen Sie bitte das Kontaktformular. Sie haben außerdem das Recht, sich bei der zuständigen Datenschutzbehörde zu beschweren: <a href="https://www.ldi.nrw.de/" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-500">ldi.nrw.de</a></p>
                </div>
 
                <div className="space-y-2">
                    <h2 className="text-lg font-semibold">5. Cookies</h2>
                    <p>Diese Website verwendet keine Cookies zu Tracking- oder Analysezwecken.</p>
                </div>
 
                <p className="text-sm text-gray-500">Stand: Juni 2026</p>
            </section>
 
        </div>
    )

}