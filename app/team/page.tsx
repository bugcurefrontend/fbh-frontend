import TeamPageClient from "@/components/TeamPageClient";
import { fetchGlobal } from "@/services/global";
import { fetchOurTeamContent } from "@/services/our-team-content";
import { fetchAllTeams } from "@/services/teams";

const TeamPage = async () => {
  const [global, ourTeamContent, teams] = await Promise.all([
    fetchGlobal(),
    fetchOurTeamContent(),
    fetchAllTeams(),
  ]);

  const headerImageUrl = global?.our_team_headerimage?.url ?? undefined;
  const galleryImages =
    ourTeamContent?.gallery?.map((g: any) => g.url).filter(Boolean) ?? null;

  return (
    <TeamPageClient
      headerImageUrl={headerImageUrl}
      galleryImages={galleryImages}
      teams={teams}
    />
  );
};

export default TeamPage;
