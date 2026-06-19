"use client";

import { useState } from "react";
import { SkillsHero } from "@/components/skills/skills-hero";
import { FeaturedSkills } from "@/components/skills/featured-skills";
import { TrendingSkills } from "@/components/skills/trending-skills";
import { CareerPathsSection } from "@/components/skills/career-paths-section";
import { CertificationTracks } from "@/components/skills/certification-tracks";
import { RoleBasedSection } from "@/components/skills/role-based-section";
import {
  featuredSkills,
  trendingSkills,
  featuredCareerPaths,
  featuredCertifications,
  careerPaths,
} from "@/lib/skills-data";

export function SkillsIndex() {
  const [category, setCategory] = useState("All");

  return (
    <>
      <SkillsHero onCategoryChange={setCategory} />
      <TrendingSkills skills={trendingSkills} />
      <FeaturedSkills skills={featuredSkills} category={category} />
      <CareerPathsSection paths={featuredCareerPaths} />
      <CertificationTracks certifications={featuredCertifications} />
      <RoleBasedSection paths={careerPaths} />
    </>
  );
}
