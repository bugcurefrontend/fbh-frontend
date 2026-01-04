import TeamPageClient from "@/components/TeamPageClient";
import { fetchGlobal } from "@/services/global";

const TeamPage = async () => {
  const global = await fetchGlobal();
  const headerImageUrl = global?.our_team_headerimage?.url ?? undefined;

  return <TeamPageClient headerImageUrl={headerImageUrl} />;
};

export default TeamPage;
