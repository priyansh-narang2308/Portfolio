import { urlFor } from "@/sanity/lib/image";
import { defineQuery } from "groq";
import { sanityFetch } from "@/sanity/lib/live";
import { AnimatedTestimonials } from "../ui/animated-testimonials";
import { SectionWrapper } from "../ui/section-wrapper";

const TESTI_QUERY =
  defineQuery(`*[_type=="testimonial" && featured==true] | order(order asc){
    name,
    position,
    company,
    testimonial,
    rating,
    date,
    avatar,
    companyLogo,
    linkedinUrl
  }`);

const TestimonialSection = async () => {
  const { data: testimonials } = await sanityFetch({ query: TESTI_QUERY });

  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  const formattedTestimonials = testimonials.map((testimonial: any) => ({
    quote: testimonial.testimonial || "",
    name: testimonial.name || "Anonymous",
    designation: testimonial.company
      ? `${testimonial.position} at ${testimonial.company}`
      : testimonial.position || "",
    src: testimonial.avatar
      ? urlFor(testimonial.avatar).width(500).height(500).url()
      : "https://images.unsplash.com/photo-1472099645785-5658abf4f4e7?q=80&w=500&auto=format&fit=crop",
    companyLogo: testimonial.companyLogo
      ? urlFor(testimonial.companyLogo).width(32).height(32).url()
      : undefined,
  }));

  return (
    <section id="testimonials" className="py-20 px-6">
      <SectionWrapper className="container mx-auto max-w-6xl">
        <div className="text-center mb-8">
          <SectionWrapper>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Client Testimonials
            </h2>
          </SectionWrapper>
          <SectionWrapper delay={0.1}>
            <p className="text-xl text-muted-foreground">
              What people say about working with me
            </p>
          </SectionWrapper>
        </div>

        <SectionWrapper delay={0.2}>
          <AnimatedTestimonials
            testimonials={formattedTestimonials}
            autoplay={true}
          />
        </SectionWrapper>
      </SectionWrapper>
    </section>
  );
};

export default TestimonialSection;
