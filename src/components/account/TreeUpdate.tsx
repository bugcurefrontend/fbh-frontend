"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Donation } from "./types";
import { fetchAllProjects, generateProjectSlug } from "@/services/projects";
import { ProjectUpdate as ProjectUpdateType, ProjectSimplified } from "@/types/project";
import Update from "../icons/Update";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { logger } from "@/lib/logger";

interface ProjectUpdateViewModel {
  id: number;
  month: string;
  date: string;
  year: number;
  images: string[];
  text: string;
}

function transformProjectUpdates(updates: ProjectUpdateType[]): ProjectUpdateViewModel[] {
  if (!updates || !Array.isArray(updates)) return [];

  const validUpdates = updates
    .filter((u) => !u.deleted)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return validUpdates.map((update) => {
    const date = new Date(update.date);
    return {
      id: update.id,
      month: date.toLocaleString("en-US", { month: "long" }),
      date: update.date,
      year: date.getFullYear(),
      images: update.media?.map((m) => m.url) || [],
      text: update.remarks || "",
    };
  });
}

function getDonationProjectName(tree: Donation): string | null {
  const candidate = (tree as unknown as { name?: string; projectName?: string }).name ??
    (tree as unknown as { projectName?: string }).projectName;
  return typeof candidate === "string" && candidate.trim() ? candidate : null;
}

function getDonationProjectId(tree: Donation): number | null {
  const raw = (tree as unknown as { projectId?: unknown; project_id?: unknown }).projectId ??
    (tree as unknown as { project_id?: unknown }).project_id;
  const parsed = Number(raw);
  return Number.isFinite(parsed) ? parsed : null;
}

export const TreeUpdate = ({ tree, onBack }: { tree: Donation; onBack: () => void }) => {
  const [updates, setUpdates] = useState<ProjectUpdateViewModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [years, setYears] = useState<number[]>([]);
  const [selectedYear, setSelectedYear] = useState<string>("");

  useEffect(() => {
    const getUpdates = async () => {
      setIsLoading(true);
      try {
        const projectName = getDonationProjectName(tree);
        const projectId = getDonationProjectId(tree);

        if (projectName || projectId !== null) {
          const allProjects = await fetchAllProjects();
          const slugToMatch = projectName ? generateProjectSlug(projectName) : null;

          const project = allProjects.find((p: ProjectSimplified) => {
            const strapiProjectSlug = generateProjectSlug(p.name);
            const nameMatch = projectName ? p.name.toLowerCase() === projectName.toLowerCase() : false;
            const idMatch = projectId !== null ? Number(p.id) === Number(projectId) : false;
            return Boolean(nameMatch || idMatch || (slugToMatch && strapiProjectSlug === slugToMatch));
          });

          if (project && project.projectUpdates && project.projectUpdates.length > 0) {
            setUpdates(transformProjectUpdates(project.projectUpdates));
          } else {
            setUpdates([]);
          }
        } else {
          setUpdates([]);
        }
      } catch (error) {
        logger.error("Failed to fetch tree updates", error);
        setUpdates([]);
      } finally {
        setIsLoading(false);
      }
    };

    getUpdates();
  }, [tree]);

  useEffect(() => {
    const uniqueYears = Array.from(new Set(updates.map((u) => u.year))).sort((a, b) => b - a);
    setYears(uniqueYears);
    if (uniqueYears.length > 0) setSelectedYear(uniqueYears[0].toString());
  }, [updates]);

  const filteredUpdates = selectedYear ? updates.filter((u) => u.year.toString() === selectedYear) : [];
  const projectLabel = getDonationProjectName(tree);

  return (
    <div className="md:px-4 space-y-8">
      <div className="flex flex-wrap items-center gap-2 sm:gap-4">
        <button onClick={onBack}>
          <ArrowLeft strokeWidth="3px" className="w-5 h-5" />
        </button>
        <h1 className="font-semibold text-xl md:text-2xl leading-9">
          {projectLabel ? `${projectLabel} Updates` : "Trees Updates"}
        </h1>
        <p className="bg-[#F4E9F6] px-3 py-1 rounded-[8px] text-[#8C249E] font-semibold text-sm md:text-base">
          {tree.reference}
        </p>
      </div>
      <div className="w-full px-0 md:px-10 space-y-10 relative">
        {years.length > 0 && (
          <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger className="absolute sm:-top-1.5 right-0 md:right-14 md:gap-10 max-sm:max-h-6 sm:py-[9px] px-[13px] sm:rounded-[8px] rounded border-[#D1D5DB] text-[#333333] text-sm w-auto">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              {years.map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <LoadingSpinner size="lg" />
          </div>
        ) : filteredUpdates.length === 0 ? (
          <div className="sm:p-15 p-4 flex items-center justify-center flex-col space-y-4 text-[#B7B9BB]">
            <Update strokeWidth={0.5} className="sm:w-50 w-10 h-10 sm:h-50" />
            <div className="text-center space-y-2">
              <p className="font-semibold sm:text-2xl leading-6">No updates Available</p>
              <p className="text-sm">for {projectLabel || "this project"}</p>
            </div>
          </div>
        ) : (
          filteredUpdates.map((update) => (
            <div key={update.id} className="space-y-4">
              <h3 className="font-semibold md:font-bold md:leading-[30px] md:text-xl text-[#454950]">
                {update.month} {update.year}
              </h3>

              <div className="flex flex-col lg:flex-row justify-between items-center gap-3 md:gap-8">
                <div className="flex justify-center gap-4 md:gap-8 w-full lg:w-auto">
                  {update.images.slice(0, 2).map((img: string, i: number) => (
                    <div
                      key={i}
                      className="relative w-full sm:w-[241px] h-[125px] sm:h-[185px] rounded-[8px] overflow-hidden"
                    >
                      <Image src={img} alt={`Update image ${i + 1}`} fill className="object-cover w-full h-full" />
                    </div>
                  ))}
                </div>

                <div className="w-full lg:w-[45%]">
                  <p className="text-xs md:text-base">{update.text}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

