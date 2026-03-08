import { sanityFetch } from "@/sanity/lib/live";
import { defineQuery } from "groq";
import { SectionWrapper } from "../ui/section-wrapper";
import { InfiniteSkills } from "./infinite-skills";

const SKILL_QUERY =
  defineQuery(`*[_type=="skill"] | order(order asc){
    name,
    category,
    proficiency,
    percentage,
    yearsOfExperience,
    color,
    iconId
  }`);

const SkillSection = async () => {
  const { data: skills } = await sanityFetch({
    query: SKILL_QUERY,
    // @ts-ignore
    revalidate: 0
  });

  if (!skills || skills.length === 0) {
    return null;
  }

  const midPoint = Math.ceil(skills.length / 2);
  const row1 = skills.slice(0, midPoint);
  const row2 = skills.slice(midPoint);

  return (
    <section id="skills" className="py-10 px-6 relative overflow-hidden bg-background">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full -z-10 opacity-30">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 blur-[120px] rounded-full" />
      </div>

      <SectionWrapper className="container mx-auto max-w-7xl">
        <div className="text-center mb-16 space-y-4">
          <SectionWrapper>
    
            <h2 className="text-4xl md:text-6xl font-black tracking-tight mt-4">
              Skills & <span className="text-primary">Expertise</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-medium mt-4">
              Helping brands stand out in the digital age through cutting-edge technologies.
            </p>
          </SectionWrapper>
        </div>

        <div className="space-y-4">
          <InfiniteSkills skills={row1} />
          <InfiniteSkills skills={row2} reverse />
        </div>
      </SectionWrapper>
    </section>
  );
};

export default SkillSection;
