import { sanityFetch } from "@/sanity/lib/live";
import { defineQuery } from "groq";
import { SectionWrapper } from "../ui/section-wrapper";
import { ProjectsGrid } from "./projects-grid";

// Fetch all projects, ordered by featured first then display order
const PROJECTS_QUERY =
  defineQuery(`*[_type == "project"] | order(featured desc, order asc){
  title,
  slug,
  tagline,
  category,
  liveUrl,
  githubUrl,
  coverImage,
  featured,
  technologies[]->{name, category, color}
}`);

const ProjectsSection = async () => {
  const { data: projects } = await sanityFetch({ query: PROJECTS_QUERY });

  if (!projects || projects.length === 0) {
    return null;
  }

  return (
    <section id="projects" className="py-20 px-6 bg-muted/30">
      <SectionWrapper className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Featured Projects
          </h2>
          <p className="text-xl text-muted-foreground">Some of my best work</p>
        </div>

        <ProjectsGrid projects={projects} />
      </SectionWrapper>
    </section>
  );
};

export default ProjectsSection;

