import React, { lazy, Suspense, useContext, useEffect, useState } from "react";
import ApolloClient, { gql } from "apollo-boost";
import Button from "../../components/Button/Button";
import { openSource, socialMediaLinks } from "../../portfolio";
import StyleContext from "../../contexts/StyleContext";
import Loading from "../../containers/Loading/Loading";
import "./Projects.css";

const Projects = () => {
  const GithubRepoCard = lazy(() =>
    import("../../components/GithubRepoCard/GithubRepoCard")
  );
  const FailedLoading = () => null;
  const renderLoader = () => <Loading />;
  const [repo, setrepo] = useState([]);
  const { isDark } = useContext(StyleContext);
  useEffect(() => {
    getRepoData();
  }, []);

  const getRepoData = () => {
    const client = new ApolloClient({
      uri: "https://api.github.com/graphql",
      request: (operation) => {
        operation.setContext({
          headers: {
            authorization: `Bearer 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`,
          },
        });
      },
    });
    client
      .query({
        query: gql`{
            user(login: "${openSource.githubUserName}") {
                pinnedItems(first: 6, types: [REPOSITORY]) {
                  totalCount
                  edges {
                    node {
                      ... on Repository {
                        name
                        description
                        forkCount
                        stargazers {
                          totalCount
                        }
                        url
                        id
                        diskUsage
                        primaryLanguage {
                          name
                          color
                        }
                      }
                    }
                  }
                }
              }
            }`,
      })
      .then((result) => {
        setrepoFunction(result.data.user.pinnedItems.edges);
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
        setrepoFunction("Error");
        console.log("Error");
      });
  };
  function setrepoFunction(array) {
    setrepo(array);
  }
  if (
    !(typeof repo === "string" || repo instanceof String) &&
    openSource.display
  ) {
    return (
      <Suspense fallback={renderLoader()}>
        <div className="main" id="opensource">
          <h1 className="project-title">Open Source Projects</h1>
          <div className="repo-cards-div-main">
            {repo.map((v, i) => {
              return (
                <GithubRepoCard repo={v} key={v.node.id} isDark={isDark} />
              );
            })}
          </div>
          <Button
            text={"More Projects"}
            className="project-button"
            href={socialMediaLinks.github}
            newTab={true}
          />
        </div>
      </Suspense>
    );
  } else {
    return <FailedLoading />;
  }
};

export default Projects;
