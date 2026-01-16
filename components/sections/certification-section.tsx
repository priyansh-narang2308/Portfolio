import { sanityFetch } from "@/sanity/lib/live";
import { defineQuery } from "groq";
import { CometCard } from "../ui/comet-card";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";
import { SectionWrapper } from "../ui/section-wrapper";
import { IconExternalLink } from "@tabler/icons-react";

const CERTIFICATIONS_QUERY =
  defineQuery(`*[_type == "certification"] | order(issueDate desc){
  name,
  issuer,
  issueDate,
  expiryDate,
  credentialId,
  credentialUrl,
  logo,
  description,
  skills[]->{name, category},
  order
}`);

const Certificationsection = async () => {
  const { data: certifications } = await sanityFetch({
    query: CERTIFICATIONS_QUERY,
  });

  if (!certifications || certifications.length === 0) {
    return null;
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const isExpired = (expiryDate: string | null | undefined) => {
    if (!expiryDate) return false;
    return new Date(expiryDate) < new Date();
  };

  return (
    <section
      id="certifications"
      className="py-20 px-6 bg-linear-to-b from-background via-muted/20 to-background"
    >
      <SectionWrapper className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <SectionWrapper>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Certifications
            </h2>
          </SectionWrapper>
          <SectionWrapper delay={0.1}>
            <p className="text-xl text-muted-foreground">
              Professional credentials and certifications
            </p>
          </SectionWrapper>
        </div>

        <div className="@container">
          <div className="grid grid-cols-1 @2xl:grid-cols-2 gap-10">
            {certifications.map((cert, idx) => (
              <SectionWrapper key={`${cert.issuer}-${cert.name}-${cert.issueDate}`} delay={idx * 0.1}>
                <CometCard
                  rotateDepth={8}
                  translateDepth={10}
                  className="w-full"
                >
                  <div
                    className="relative bg-card border-8 border-card/80 rounded-sm shadow-2xl p-4"
                    style={{
                      transformStyle: "preserve-3d",
                    }}
                  >
                    <div className="relative bg-linear-to-br from-zinc-900 via-zinc-900 to-zinc-950 dark:from-zinc-950 dark:via-black dark:to-zinc-950 border-2 border-yellow-600/40 p-8 flex flex-col min-h-[450px]">
                      <div className="absolute top-0 left-0 w-20 h-20">
                        <div className="absolute top-3 left-3 w-10 h-10 border-t-2 border-l-2 border-yellow-600/60" />
                        <div className="absolute top-5 left-5 w-6 h-6 border-t-2 border-l-2 border-yellow-600/60" />
                      </div>

                      <div className="absolute top-0 right-0 w-20 h-20">
                        <div className="absolute top-3 right-3 w-10 h-10 border-t-2 border-r-2 border-yellow-600/60" />
                        <div className="absolute top-5 right-5 w-6 h-6 border-t-2 border-r-2 border-yellow-600/60" />
                      </div>

                      <div className="absolute bottom-0 left-0 w-20 h-20">
                        <div className="absolute bottom-3 left-3 w-10 h-10 border-b-2 border-l-2 border-yellow-600/60" />
                        <div className="absolute bottom-5 left-5 w-6 h-6 border-b-2 border-l-2 border-yellow-600/60" />
                      </div>

                      <div className="absolute bottom-0 right-0 w-20 h-20">
                        <div className="absolute bottom-3 right-3 w-10 h-10 border-b-2 border-r-2 border-yellow-600/60" />
                        <div className="absolute bottom-5 right-5 w-6 h-6 border-b-2 border-r-2 border-yellow-600/60" />
                      </div>

                      <div className="absolute top-2 left-2 w-3 h-3 rotate-45 bg-yellow-600/70" />
                      <div className="absolute top-2 right-2 w-3 h-3 rotate-45 bg-yellow-600/70" />
                      <div className="absolute bottom-2 left-2 w-3 h-3 rotate-45 bg-yellow-600/70" />
                      <div className="absolute bottom-2 right-2 w-3 h-3 rotate-45 bg-yellow-600/70" />
                      <div className="relative z-10 flex flex-col items-center text-center flex-1">
                        <div className="mb-4">
                          <p className="text-xs text-zinc-400">
                            {cert.issueDate && formatDate(cert.issueDate)}
                          </p>
                        </div>

                        <div className="mb-5">
                          <h4 className="text-lg font-bold text-yellow-600/80 mb-1 uppercase tracking-wide">
                            CERTIFICATE
                          </h4>
                          <p className="text-xs text-yellow-600/80 italic">for</p>
                        </div>

                        <h3 className="text-3xl font-bold text-white mb-6 leading-tight px-4">
                          {cert.name}
                        </h3>

                        {cert.description && (
                          <p className="text-sm text-zinc-300/80 mb-5 line-clamp-3 px-8 leading-relaxed">
                            {cert.description}
                          </p>
                        )}

                        {cert.logo && (
                          <div className="relative mb-5 flex items-center justify-center">
                            <div className="relative w-16 h-16 p-2 bg-white/10 rounded-full border border-yellow-600/30">
                              <div className="relative w-full h-full">
                                <Image
                                  src={urlFor(cert.logo)
                                    .width(64)
                                    .height(64)
                                    .url()}
                                  alt={`${cert.name} badge`}
                                  fill
                                  className="object-contain"
                                />
                              </div>
                            </div>
                          </div>
                        )}

                        <div className="mb-4">
                          <p className="text-lg font-semibold text-white">
                            {cert.issuer}
                          </p>
                        </div>

                        <div className="flex-1 flex flex-col justify-end w-full mt-auto">
                          {cert.skills && cert.skills.length > 0 && (
                            <div className="mb-4">
                              <div className="flex flex-wrap justify-center gap-1.5">
                                {cert.skills.slice(0, 4).map((skill, idx) => {
                                  const skillData =
                                    skill &&
                                      typeof skill === "object" &&
                                      "name" in skill
                                      ? skill
                                      : null;
                                  return skillData?.name ? (
                                    <span
                                      key={`${cert.name}-skill-${idx}`}
                                      className="px-2.5 py-1 text-[10px] bg-yellow-600/20 text-yellow-500 font-medium border border-yellow-600/30"
                                    >
                                      {skillData.name}
                                    </span>
                                  ) : null;
                                })}
                              </div>
                            </div>
                          )}

                          <div className="space-y-2 text-xs mb-4">
                            {cert.expiryDate && (
                              <div className="text-center">
                                <span className="text-zinc-400">
                                  Valid Until:{" "}
                                </span>
                                <span
                                  className={
                                    isExpired(cert.expiryDate)
                                      ? "text-red-400 font-semibold"
                                      : "text-zinc-300 font-semibold"
                                  }
                                >
                                  {formatDate(cert.expiryDate)}
                                  {isExpired(cert.expiryDate) && " (Expired)"}
                                </span>
                              </div>
                            )}
                            {cert.credentialId && (
                              <div className="text-center">
                                <p className="text-[9px] text-zinc-500 mb-1">
                                  Credential ID:
                                </p>
                                <p className="text-[9px] font-mono text-zinc-400 break-all px-4">
                                  {cert.credentialId}
                                </p>
                              </div>
                            )}
                          </div>

                          {cert.credentialUrl && (
                            <div className="w-full pt-4 border-t border-yellow-600/20">
                              <Link
                                href={cert.credentialUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-1.5 px-5 py-2 text-xs font-semibold text-zinc-900 bg-yellow-600/90 hover:bg-yellow-500 transition-all shadow-md hover:shadow-lg"
                              >
                                Verify Credential
                                <IconExternalLink className="w-3.5 h-3.5" />
                              </Link>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </CometCard>
              </SectionWrapper>
            ))}
          </div>
        </div>
      </SectionWrapper>
    </section>
  );
};

export default Certificationsection;
