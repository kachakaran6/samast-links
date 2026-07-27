import GitHubCalendar from "react-github-calendar";

const GitHubContributions = ({ username }: any) => {
  return (
    <>
      <GitHubCalendar
        username={username}
        colorScheme={"light"}
        hideColorLegend
      />
    </>
  );
};

export default GitHubContributions;
