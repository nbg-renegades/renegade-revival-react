const Impressum = () => {
  return (
    <main className="min-h-screen pt-16">
      {/* Hero */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-display text-5xl md:text-6xl mb-4">Legal Notice</h1>
          <p className="text-muted-foreground text-lg">Impressum</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto prose prose-invert">
            <h2 className="font-display text-2xl mb-4 text-foreground">Representation</h2>
            <p className="text-muted-foreground mb-2">Nürnberg Renegades e.V.</p>
            <p className="text-muted-foreground mb-2">Bartholomäusstr. 26c</p>
            <p className="text-muted-foreground mb-8">90489 Nürnberg</p>

            <h2 className="font-display text-2xl mb-4 text-foreground">Contact</h2>
            <p className="text-muted-foreground mb-8">
              Email: <a href="mailto:info@nuernberg-renegades.de" className="text-primary hover:underline">info@nuernberg-renegades.de</a>
            </p>

            <h2 className="font-display text-2xl mb-4 text-foreground">Register Entry</h2>
            <p className="text-muted-foreground mb-2">Registered at Vereinsregister Nürnberg</p>
            <p className="text-muted-foreground mb-8">Registration number: VR 202816</p>

            <h2 className="font-display text-2xl mb-4 text-foreground">Responsible for Content</h2>
            <p className="text-muted-foreground mb-2">According to § 55 Abs. 2 RStV:</p>
            <p className="text-muted-foreground mb-8">Andreas Scherm</p>

            <h2 className="font-display text-2xl mb-4 text-foreground">Responsible for Data Privacy</h2>
            <p className="text-muted-foreground mb-8">
              <a href="mailto:it@nuernberg-renegades.de" className="text-primary hover:underline">it@nuernberg-renegades.de</a>
            </p>

            <h2 className="font-display text-2xl mb-4 text-foreground">Technical Implementation & Web Development</h2>
            <p className="text-muted-foreground mb-2">Philipp Bruchner</p>
            <p className="text-muted-foreground">
              <a href="mailto:renegades@phhbr.de" className="text-primary hover:underline">renegades@phhbr.de</a>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Impressum;
