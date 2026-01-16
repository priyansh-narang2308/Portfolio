import { sanityFetch } from "@/sanity/lib/live";
import { defineQuery } from "groq";
import { PortableText } from "@portabletext/react";
import Link from "next/link";
import { SectionWrapper } from "../ui/section-wrapper";

const ABOUT_SECTION_QUERY = defineQuery(`*[_id == "singleton-profile"][0]{
  firstName,
  lastName,
  fullBio,
  yearsOfExperience,
  stats,
  email,
  phone,
  location
}`);
const AboutSection = async () => {
  const { data: profile } = await sanityFetch({ query: ABOUT_SECTION_QUERY });

  if (!profile) {
    return null;
  }

  return (
    <section id="about" className="py-20 px-6">
      <SectionWrapper className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <SectionWrapper>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">About Me</h2>
          </SectionWrapper>
          <SectionWrapper delay={0.1}>
            <p className="text-xl text-muted-foreground">Get to know me better</p>
          </SectionWrapper>
        </div>

        <SectionWrapper delay={0.2} className="prose prose-lg dark:prose-invert max-w-none">
          {profile.fullBio && (
            <PortableText
              value={profile.fullBio}
              components={{
                block: {
                  normal: ({ children }) => (
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      {children}
                    </p>
                  ),
                  h2: ({ children }) => (
                    <h2 className="text-3xl font-bold mt-8 mb-4">{children}</h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="text-2xl font-semibold mt-6 mb-3">
                      {children}
                    </h3>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-primary pl-4 italic my-4">
                      {children}
                    </blockquote>
                  ),
                },
                marks: {
                  strong: ({ children }) => (
                    <strong className="font-semibold text-foreground">
                      {children}
                    </strong>
                  ),
                  em: ({ children }) => <em className="italic">{children}</em>,
                  link: ({ children, value }) => {
                    const href = value?.href || "";
                    const isExternal = href.startsWith("http");
                    return (
                      <Link
                        href={href}
                        target={isExternal ? "_blank" : undefined}
                        rel={isExternal ? "noopener noreferrer" : undefined}
                        className="text-primary hover:underline"
                      >
                        {children}
                      </Link>
                    );
                  },
                },
                list: {
                  bullet: ({ children }) => (
                    <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground">
                      {children}
                    </ul>
                  ),
                  number: ({ children }) => (
                    <ol className="list-decimal list-inside space-y-2 mb-4 text-muted-foreground">
                      {children}
                    </ol>
                  ),
                },
              }}
            />
          )}
        </SectionWrapper>

        {/* This is the stats */}
        {profile.stats && profile.stats.length > 0 && (
          <SectionWrapper delay={0.3} className="@container mt-12 pt-12 border-t">
            <div className="grid grid-cols-2 @lg:grid-cols-4 gap-6">
              {profile.stats.map((stat, idx) => (
                <div
                  key={`${stat.label}-${idx}`}
                  className="@container/stat text-center"
                >
                  <div className="text-3xl @md/stat:text-4xl font-bold text-primary mb-2">
                    {stat.value}
                  </div>
                  <div className="text-xs @md/stat:text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </SectionWrapper>
        )}
      </SectionWrapper>
    </section>
  );
};

export default AboutSection;
