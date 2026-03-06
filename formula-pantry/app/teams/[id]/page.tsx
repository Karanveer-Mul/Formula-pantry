
import TeamInfographic  from "../components/TeamInfographic"; 

interface Props {
  params: Promise<{ id: string }>;
}

export default async function TeamPage({ params }: Props) {
  const { id } = await params;

  return (
    <div className="w-full overflow-hidden">
        <TeamInfographic teamId={id} />
    </div>
  );
}


