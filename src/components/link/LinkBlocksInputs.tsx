import {
  GithubCardInput,
  SimpleLinkInput,
  Divider,
  Space,
  Text,
  GithubContributions,
  GithubRepoCard,
} from "./blocks";

const LinkBlocksInputs = ({
  element,
  handeBlockFormSubmit,
  setOpen,
  selectedIndex,
}: any) => {
  return (
    <>
      {element?.block_type == "simple_link" ? (
        <SimpleLinkInput
          selectedIndex={selectedIndex}
          element={element}
          setOpen={setOpen}
          handeBlockFormSubmit={handeBlockFormSubmit}
        />
      ) : element?.block_type == "github_card" ? (
        <GithubCardInput
          selectedIndex={selectedIndex}
          element={element}
          setOpen={setOpen}
          handeBlockFormSubmit={handeBlockFormSubmit}
        />
      ) : element?.block_type == "divider" ? (
        <Divider
          selectedIndex={selectedIndex}
          element={element}
          setOpen={setOpen}
          handeBlockFormSubmit={handeBlockFormSubmit}
        />
      ) : element?.block_type == "space" ? (
        <Space
          selectedIndex={selectedIndex}
          element={element}
          setOpen={setOpen}
          handeBlockFormSubmit={handeBlockFormSubmit}
        />
      ) : element?.block_type == "text" ? (
        <Text
          selectedIndex={selectedIndex}
          element={element}
          setOpen={setOpen}
          handeBlockFormSubmit={handeBlockFormSubmit}
        />
      ) : element?.block_type == "github_contributions" ? (
        <GithubContributions
          selectedIndex={selectedIndex}
          element={element}
          setOpen={setOpen}
          handeBlockFormSubmit={handeBlockFormSubmit}
        />
      ) : element?.block_type == "github_repo_card" ? (
        <GithubRepoCard
          selectedIndex={selectedIndex}
          element={element}
          setOpen={setOpen}
          handeBlockFormSubmit={handeBlockFormSubmit}
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default LinkBlocksInputs;
