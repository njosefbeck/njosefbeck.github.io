import React from "react";
import { graphql } from 'gatsby';
import { Helmet } from "react-helmet";
import { DiscussionEmbed } from "disqus-react";
import Layout from "../components/layout";
import './post.scss';
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';

export default ({ data }) => {
  const post = data.markdownRemark;
  const url = `${data.site.siteMetadata.siteUrl}${post.frontmatter.slug}`;
  const disqusShortname = 'njosefbeck';
  const disqusConfig = {
    url,
    identifier: post.frontmatter.slug,
    title: post.frontmatter.title,
  };

  return (
    <Layout>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{post.frontmatter.title} | njosefbeck</title>
        <meta name="description" content={post.frontmatter.description} />
      </Helmet>
      <article className="post">
        <h1>{post.frontmatter.title}</h1>
        <span className="date">{post.frontmatter.date}</span>
        <div className="content" dangerouslySetInnerHTML={{ __html: post.html }} />
        <DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
      </article>
    </Layout>
  )
};

export const query = graphql`
  query($slug: String!) {
    site {
      siteMetadata {
        siteUrl
      }
    }
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        slug
        description
        date
        image {
          publicURL
          childImageSharp {
            fluid(maxWidth: 800) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    }
  }
`;