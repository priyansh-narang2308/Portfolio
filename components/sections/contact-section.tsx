import Globe from "../ui/globe";
import Link from "next/link";
import { defineQuery } from "groq";
import { sanityFetch } from "@/sanity/lib/live";
import { ContactForm } from "../contact-form";

const PROFILE_QUERY = defineQuery(`*[_id == "singleton-profile"][0]{
  email,
  phone,
  location,
  socialLinks
}`);

const ContactSection = async () => {
  const { data: profile } = await sanityFetch({ query: PROFILE_QUERY });

  if (!profile) {
    return null;
  }

  return (
    <section id="contact" className="py-20 px-6 bg-muted/20">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Get In Touch
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Whether you have a project in mind or just want to say hi, my inbox
            is always open.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column: Globe and Info */}
          <div className="space-y-12">
            <div className="hidden lg:block relative group">
              <div className="absolute -inset-4 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors duration-500" />
              <Globe className="w-full aspect-square max-w-[500px] mx-auto relative z-10" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold">Contact Information</h3>

                <div className="space-y-4">
                  {profile.email && (
                    <div className="flex items-center gap-4 group p-3 rounded-xl hover:bg-primary/5 transition-colors border border-transparent hover:border-primary/10">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                        <span className="text-2xl">📧</span>
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">
                          Email
                        </h4>
                        <Link
                          href={`mailto:${profile.email}`}
                          className="text-lg font-medium hover:text-primary transition-colors truncate block"
                        >
                          {profile.email}
                        </Link>
                      </div>
                    </div>
                  )}

                  {profile.phone && (
                    <div className="flex items-center gap-4 group p-3 rounded-xl hover:bg-primary/5 transition-colors border border-transparent hover:border-primary/10">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                        <span className="text-2xl">📱</span>
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">
                          Phone
                        </h4>
                        <Link
                          href={`tel:${profile.phone}`}
                          className="text-lg font-medium hover:text-primary transition-colors block"
                        >
                          {profile.phone}
                        </Link>
                      </div>
                    </div>
                  )}

                  {profile.location && (
                    <div className="flex items-center gap-4 group p-3 rounded-xl hover:bg-primary/5 transition-colors border border-transparent hover:border-primary/10">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                        <span className="text-2xl">📍</span>
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">
                          Location
                        </h4>
                        <p className="text-lg font-medium">
                          {profile.location}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-2xl font-bold">Follow Me</h3>
                <div className="flex flex-wrap gap-3">
                  {profile.socialLinks?.github && (
                    <Link
                      href={profile.socialLinks.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-2.5 rounded-xl border bg-background hover:bg-accent hover:border-primary/20 transition-all hover:-translate-y-1 font-medium"
                    >
                      GitHub
                    </Link>
                  )}
                  {profile.socialLinks?.linkedin && (
                    <Link
                      href={profile.socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-2.5 rounded-xl border bg-background hover:bg-accent hover:border-primary/20 transition-all hover:-translate-y-1 font-medium"
                    >
                      LinkedIn
                    </Link>
                  )}
                  {profile.socialLinks?.twitter && (
                    <Link
                      href={profile.socialLinks.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-2.5 rounded-xl border bg-background hover:bg-accent hover:border-primary/20 transition-all hover:-translate-y-1 font-medium"
                    >
                      Twitter
                    </Link>
                  )}
                  <Link
                    href="/CB.SC.U4CSE23642.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-2.5 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-all hover:-translate-y-1 font-medium shadow-lg shadow-primary/20"
                  >
                    Resume
                  </Link>
                </div>
              </div>
            </div>
          </div>


          <div className="relative">
            <div className="absolute -inset-4 bg-primary/5 rounded-[2rem] blur-3xl" />
            <div className="relative z-10">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
