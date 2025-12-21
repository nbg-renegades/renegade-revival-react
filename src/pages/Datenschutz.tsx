import { Link } from "react-router-dom";

const Datenschutz = () => {
  return (
    <main className="min-h-screen pt-16">
      {/* Hero */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-display text-5xl md:text-6xl mb-4">Datenschutzerklärung</h1>
          <p className="text-muted-foreground text-lg">Stand: 13. Januar 2025</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {/* Table of Contents */}
            <div className="bg-card-gradient rounded-lg p-6 border border-border mb-12">
              <h2 className="font-display text-xl mb-4 text-foreground">Inhaltsübersicht</h2>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#verantwortlicher" className="hover:text-primary transition-colors">Verantwortlicher</a></li>
                <li><a href="#verarbeitungen" className="hover:text-primary transition-colors">Übersicht der Verarbeitungen</a></li>
                <li><a href="#rechtsgrundlagen" className="hover:text-primary transition-colors">Maßgebliche Rechtsgrundlagen</a></li>
                <li><a href="#sicherheit" className="hover:text-primary transition-colors">Sicherheitsmaßnahmen</a></li>
                <li><a href="#uebermittlung" className="hover:text-primary transition-colors">Übermittlung von personenbezogenen Daten</a></li>
                <li><a href="#drittlaender" className="hover:text-primary transition-colors">Datenverarbeitung in Drittländern</a></li>
                <li><a href="#loeschung" className="hover:text-primary transition-colors">Löschung von Daten</a></li>
                <li><a href="#cookies" className="hover:text-primary transition-colors">Einsatz von Cookies</a></li>
                <li><a href="#openstreetmap" className="hover:text-primary transition-colors">OpenStreetMap</a></li>
                <li><a href="#rechte" className="hover:text-primary transition-colors">Rechte der betroffenen Personen</a></li>
              </ul>
            </div>

            {/* Verantwortlicher */}
            <section id="verantwortlicher" className="mb-12">
              <h2 className="font-display text-2xl mb-4 text-foreground">Verantwortlicher</h2>
              <p className="text-muted-foreground mb-2">Vorstand Nürnberg Renegades e.V.</p>
              <p className="text-muted-foreground mb-2">Vertretungsberechtigte Personen: Vereinsvorstand</p>
              <p className="text-muted-foreground mb-2">
                E-Mail-Adresse: <a href="mailto:it@nuernberg-renegades.de" className="text-primary hover:underline">it@nuernberg-renegades.de</a>
              </p>
              <p className="text-muted-foreground">
                Impressum: <Link to="/impressum" className="text-primary hover:underline">nuernberg-renegades.de/impressum</Link>
              </p>
            </section>

            {/* Verarbeitungen */}
            <section id="verarbeitungen" className="mb-12">
              <h2 className="font-display text-2xl mb-4 text-foreground">Übersicht der Verarbeitungen</h2>
              <p className="text-muted-foreground mb-4">
                Die nachfolgende Übersicht fasst die Arten der verarbeiteten Daten und die Zwecke ihrer Verarbeitung zusammen und verweist auf die betroffenen Personen.
              </p>
              
              <h3 className="font-semibold text-foreground mb-2">Arten der verarbeiteten Daten</h3>
              <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-1">
                <li>Bestandsdaten</li>
                <li>Zahlungsdaten</li>
                <li>Standortdaten</li>
                <li>Kontaktdaten</li>
                <li>Inhaltsdaten</li>
                <li>Vertragsdaten</li>
                <li>Nutzungsdaten</li>
                <li>Meta-, Kommunikations- und Verfahrensdaten</li>
              </ul>

              <h3 className="font-semibold text-foreground mb-2">Kategorien betroffener Personen</h3>
              <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-1">
                <li>Kommunikationspartner</li>
                <li>Nutzer</li>
                <li>Mitglieder</li>
                <li>Geschäfts- und Vertragspartner</li>
              </ul>

              <h3 className="font-semibold text-foreground mb-2">Zwecke der Verarbeitung</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>Erbringung vertraglicher Leistungen und Kundenservice</li>
                <li>Kontaktanfragen und Kommunikation</li>
                <li>Sicherheitsmaßnahmen</li>
                <li>Verwaltung und Beantwortung von Anfragen</li>
                <li>Feedback</li>
                <li>Marketing</li>
                <li>Bereitstellung unseres Onlineangebotes und Nutzerfreundlichkeit</li>
              </ul>
            </section>

            {/* Rechtsgrundlagen */}
            <section id="rechtsgrundlagen" className="mb-12">
              <h2 className="font-display text-2xl mb-4 text-foreground">Maßgebliche Rechtsgrundlagen</h2>
              <p className="text-muted-foreground mb-4">
                Im Folgenden erhalten Sie eine Übersicht der Rechtsgrundlagen der DSGVO, auf deren Basis wir personenbezogene Daten verarbeiten.
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>Einwilligung (Art. 6 Abs. 1 S. 1 lit. a) DSGVO)</li>
                <li>Vertragserfüllung und vorvertragliche Anfragen (Art. 6 Abs. 1 S. 1 lit. b) DSGVO)</li>
                <li>Berechtigte Interessen (Art. 6 Abs. 1 S. 1 lit. f) DSGVO)</li>
              </ul>
            </section>

            {/* Sicherheit */}
            <section id="sicherheit" className="mb-12">
              <h2 className="font-display text-2xl mb-4 text-foreground">Sicherheitsmaßnahmen</h2>
              <p className="text-muted-foreground">
                Wir treffen nach Maßgabe der gesetzlichen Vorgaben unter Berücksichtigung des Stands der Technik, der Implementierungskosten und der Art, des Umfangs, der Umstände und der Zwecke der Verarbeitung sowie der unterschiedlichen Eintrittswahrscheinlichkeiten und des Ausmaßes der Bedrohung der Rechte und Freiheiten natürlicher Personen geeignete technische und organisatorische Maßnahmen, um ein dem Risiko angemessenes Schutzniveau zu gewährleisten.
              </p>
            </section>

            {/* Übermittlung */}
            <section id="uebermittlung" className="mb-12">
              <h2 className="font-display text-2xl mb-4 text-foreground">Übermittlung von personenbezogenen Daten</h2>
              <p className="text-muted-foreground">
                Im Rahmen unserer Verarbeitung von personenbezogenen Daten kommt es vor, dass die Daten an andere Stellen, Unternehmen, rechtlich selbstständige Organisationseinheiten oder Personen übermittelt oder sie ihnen gegenüber offengelegt werden. Zu den Empfängern dieser Daten können z.B. mit IT-Aufgaben beauftragte Dienstleister gehören. In solchen Fällen beachten wir die gesetzlichen Vorgaben und schließen entsprechende Verträge ab.
              </p>
            </section>

            {/* Drittländer */}
            <section id="drittlaender" className="mb-12">
              <h2 className="font-display text-2xl mb-4 text-foreground">Datenverarbeitung in Drittländern</h2>
              <p className="text-muted-foreground">
                Sofern wir Daten in einem Drittland (d.h., außerhalb der Europäischen Union (EU), des Europäischen Wirtschaftsraums (EWR)) verarbeiten oder die Verarbeitung im Rahmen der Inanspruchnahme von Diensten Dritter stattfindet, erfolgt dies nur im Einklang mit den gesetzlichen Vorgaben (Art. 44 bis 49 DSGVO).
              </p>
            </section>

            {/* Löschung */}
            <section id="loeschung" className="mb-12">
              <h2 className="font-display text-2xl mb-4 text-foreground">Löschung von Daten</h2>
              <p className="text-muted-foreground">
                Die von uns verarbeiteten Daten werden nach Maßgabe der gesetzlichen Vorgaben gelöscht, sobald deren zur Verarbeitung erlaubten Einwilligungen widerrufen werden oder sonstige Erlaubnisse entfallen. Sofern die Daten nicht gelöscht werden, weil sie für andere und gesetzlich zulässige Zwecke erforderlich sind, wird deren Verarbeitung auf diese Zwecke beschränkt.
              </p>
            </section>

            {/* Cookies */}
            <section id="cookies" className="mb-12">
              <h2 className="font-display text-2xl mb-4 text-foreground">Einsatz von Cookies</h2>
              <p className="text-muted-foreground mb-4">
                Cookies sind kleine Textdateien, bzw. sonstige Speichervermerke, die Informationen auf Endgeräten speichern und Informationen aus den Endgeräten auslesen. Z.B. um den Login-Status in einem Nutzerkonto, einen Warenkorbinhalt in einem E-Shop, die aufgerufenen Inhalte oder verwendete Funktionen eines Onlineangebotes speichern.
              </p>
              <p className="text-muted-foreground">
                <strong>Hinweise zur Einwilligung:</strong> Wir setzen Cookies im Einklang mit den gesetzlichen Vorschriften ein. Daher holen wir von den Nutzern eine vorhergehende Einwilligung ein, außer wenn diese gesetzlich nicht gefordert ist.
              </p>
            </section>

            {/* OpenStreetMap */}
            <section id="openstreetmap" className="mb-12">
              <h2 className="font-display text-2xl mb-4 text-foreground">OpenStreetMap</h2>
              <p className="text-muted-foreground mb-4">
                Wir nutzen den Kartendienst OpenStreetMap zur Darstellung von Standorten unserer Trainingsgelände. Bei der Nutzung von OpenStreetMap werden Daten an die OpenStreetMap Foundation übertragen.
              </p>
              <h3 className="font-semibold text-foreground mb-2">Einwilligung</h3>
              <p className="text-muted-foreground mb-4">
                Die Karten werden erst nach Ihrer ausdrücklichen Einwilligung geladen. Vor dem Laden der Karte werden keine Daten an OpenStreetMap übertragen. Ihre Einwilligung wird lokal in Ihrem Browser gespeichert und kann jederzeit widerrufen werden.
              </p>
              <h3 className="font-semibold text-foreground mb-2">Verarbeitete Daten</h3>
              <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-1">
                <li>IP-Adresse</li>
                <li>Geräteinformationen (Browser, Betriebssystem)</li>
                <li>Angefragte Kartenausschnitte</li>
              </ul>
              <h3 className="font-semibold text-foreground mb-2">Rechtsgrundlage</h3>
              <p className="text-muted-foreground mb-4">
                Die Verarbeitung erfolgt auf Grundlage Ihrer Einwilligung (Art. 6 Abs. 1 S. 1 lit. a DSGVO).
              </p>
              <h3 className="font-semibold text-foreground mb-2">Widerruf der Einwilligung</h3>
              <p className="text-muted-foreground mb-4">
                Sie können Ihre Einwilligung jederzeit widerrufen, indem Sie die Cookies in Ihrem Browser löschen oder die Karten nicht mehr laden. Die Rechtmäßigkeit der bis zum Widerruf erfolgten Datenverarbeitung bleibt unberührt.
              </p>
              <p className="text-muted-foreground">
                <strong>Anbieter:</strong> OpenStreetMap Foundation, St John's Innovation Centre, Cowley Road, Cambridge, CB4 0WS, United Kingdom. 
                <a href="https://wiki.osmfoundation.org/wiki/Privacy_Policy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline ml-1">
                  Datenschutzerklärung von OpenStreetMap
                </a>
              </p>
            </section>

            {/* Rechte */}
            <section id="rechte" className="mb-12">
              <h2 className="font-display text-2xl mb-4 text-foreground">Rechte der betroffenen Personen</h2>
              <p className="text-muted-foreground mb-4">
                Ihnen stehen als Betroffene nach der DSGVO verschiedene Rechte zu, die sich insbesondere aus Art. 15 bis 21 DSGVO ergeben:
              </p>
              <ul className="space-y-3 text-muted-foreground">
                <li><strong className="text-foreground">Widerspruchsrecht:</strong> Sie haben das Recht, aus Gründen, die sich aus Ihrer besonderen Situation ergeben, jederzeit gegen die Verarbeitung der Sie betreffenden personenbezogenen Daten Widerspruch einzulegen.</li>
                <li><strong className="text-foreground">Widerrufsrecht bei Einwilligungen:</strong> Sie haben das Recht, erteilte Einwilligungen jederzeit zu widerrufen.</li>
                <li><strong className="text-foreground">Auskunftsrecht:</strong> Sie haben das Recht, eine Bestätigung darüber zu verlangen, ob betreffende Daten verarbeitet werden und auf Auskunft über diese Daten.</li>
                <li><strong className="text-foreground">Recht auf Berichtigung:</strong> Sie haben das Recht, die Vervollständigung oder Berichtigung der Sie betreffenden Daten zu verlangen.</li>
                <li><strong className="text-foreground">Recht auf Löschung:</strong> Sie haben das Recht, zu verlangen, dass Sie betreffende Daten unverzüglich gelöscht werden.</li>
                <li><strong className="text-foreground">Recht auf Datenübertragbarkeit:</strong> Sie haben das Recht, Sie betreffende Daten in einem strukturierten, gängigen und maschinenlesbaren Format zu erhalten.</li>
                <li><strong className="text-foreground">Beschwerde bei Aufsichtsbehörde:</strong> Sie haben das Recht auf Beschwerde bei einer Aufsichtsbehörde.</li>
              </ul>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Datenschutz;
