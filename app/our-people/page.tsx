import SubHero from '@/src/components/SubHero';
import { defaultContent } from '@/src/data/siteContent';
import PeopleClient from '@/src/components/PeopleClient';

export const metadata = {
  title: 'Our People | IERF',
  description: 'Meet the leadership, research advisors, scholarly network, and digital strategy team behind the India Eurasia Research Forum.',
};

export default function Team() {
  const leadershipData = defaultContent.team.leadership;
  const technicalTeamData = defaultContent.team.technicalTeam;
  const advisorData = defaultContent.team.advisor;
  const scholarlyNetworkData = defaultContent.team.scholarlyNetwork;
  
  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA]">
      <SubHero
        title="Our People"
        subtitle="A network of excellence spanning academia, policy, and technology."
        breadcrumb={[{ label: 'Our People' }]}
      />

      <PeopleClient 
        leadershipData={leadershipData}
        technicalTeamData={technicalTeamData}
        advisorData={advisorData}
        scholarlyNetworkData={scholarlyNetworkData}
      />
    </div>
  );
}
