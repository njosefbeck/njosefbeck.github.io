import React from "react";
import { Link, graphql } from "gatsby";
import Layout from '../components/layout';
import './index.scss';

export default ({ data }) => {
  const projects = data.allMarkdownRemark.edges.map(({ node }) => {
    return (
      <li key={node.id}>
        <Link to={node.frontmatter.slug}>{node.frontmatter.title}</Link>
      </li>
    );
  });

  return (
    <Layout>
      <main className="Home">
        <p className="lead">Former high school Spanish teacher turned fullstack JavaScript engineer. Lifelong learner. Passionate about helping others.</p>

        <p>
          <a href="https://github.com/njosefbeck/" target="_blank" rel="noopener noreferrer">github</a> &middot; <a href="https://www.linkedin.com/in/njosefbeck" target="_blank" rel="noopener noreferrer">linkedIn</a> &middot; <a href="https://twitter.com/njosefbeck" target="_blank" rel="noopener noreferrer">twitter</a>
        </p>

        <p>Here are some projects I'm proud of:</p>

        <ul>
          {projects}
        </ul>
      </main>
    </Layout>
  );
};

export const query = graphql`
  query {
    allMarkdownRemark(
      filter: { 
        frontmatter: {
          template: { eq: "project" } 
        }
      }
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            slug
          }
        }
      }
    }
  }
`
