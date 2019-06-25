import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'rebass';
import { StaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import Fade from 'react-reveal/Fade';
import { Tooltip } from 'react-tippy';
import Section from '../components/Section';
import Triangle from '../components/Triangle';

const Background = () => (
  <div>
    <Triangle
      color="secondaryLight"
      height={['50vh', '20vh']}
      width={['50vw', '50vw']}
      invertY
    />

    <Triangle
      color="primaryDark"
      height={['20vh', '40vh']}
      width={['75vw', '70vw']}
      invertX
    />

    <Triangle
      color="backgroundDark"
      height={['25vh', '20vh']}
      width={['100vw', '100vw']}
    />

    <Triangle
      color="backgroundDark"
      height={['20vh', '20vh']}
      width={['50vw', '100vw']}
      invertY
      invertX
    />
  </div>
);

const CIRCLE_HEIGHT = '150px';

const MEDIA_QUERY_SMALL = '@media (max-width: 400px)';

const ImageContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-content: flex-end;
`;

const ProjectImage = styled(Image)`
  width: ${CIRCLE_HEIGHT};
  height: ${CIRCLE_HEIGHT};
  margin-top: 0px;

  ${MEDIA_QUERY_SMALL} {
    height: calc(${CIRCLE_HEIGHT} / 2);
    width: calc(${CIRCLE_HEIGHT} / 2);
    margin-top: calc(${CIRCLE_HEIGHT} / 4);
    padding: 10px;
  }
`;

const Skill = ({ name, logo }) => (
  <Tooltip title={name} position="bottom" trigger="mouseenter">
    <ProjectImage src={logo.image.src} alt={logo.title} />
  </Tooltip>
);

Skill.propTypes = {
  name: PropTypes.string.isRequired,
  logo: PropTypes.shape({
    image: PropTypes.shape({
      src: PropTypes.string,
    }),
  }).isRequired,
};

const Skills = () => (
  <Section.Container id="skills" Background={Background}>
    <Section.Header name="Skills" icon="📝" label="skills" />
    <StaticQuery
      query={graphql`
        query SkillsQuery {
          contentfulAbout {
            skills {
              id
              name
              logo {
                title
                image: resize(width: 200, quality: 100) {
                  src
                }
              }
            }
          }
        }
      `}
      render={({ contentfulAbout }) => (
        <ImageContainer>
          {contentfulAbout.skills.map((s, i) => (
            <Fade bottom delay={i * 200}>
              <Skill key={s.id} {...s} />
            </Fade>
          ))}
        </ImageContainer>
      )}
    />
  </Section.Container>
);

export default Skills;
