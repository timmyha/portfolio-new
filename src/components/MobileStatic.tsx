import styled from "styled-components";
import { Video } from "../assets/Video";
import resumePdf from "../assets/timothyresume.pdf";

const MobileStatic = () => {
  return (
    <Page>
      <Header>
        <Title>timothy hansher</Title>
        <Subtitle>software developer</Subtitle>
      </Header>

      <Section aria-labelledby="about">
        <SectionTitle id="about">about</SectionTitle>
        <P>i am a software engineer based in new york city.</P>

        <P>
          In my free time, you may find me rating
          <NBSP />
          <A
            href="https://letterboxd.com/film/howards-end/"
            target="_blank"
            rel="noopener noreferrer"
          >
            period dramas
          </A>
          <NBSP /> on letterboxd, dreaming about
          <NBSP />
          <A
            href="https://www.riversidethaicooking.com/north-eastern-cuisine/lao-style-mushroom-soup/"
            target="_blank"
            rel="noopener noreferrer"
          >
            soup
          </A>
          , complaining about
          <NBSP />
          <A
            href="https://www.evertonfc.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            everton football club
          </A>
          , or planning my next
          <NBSP />
          <A
            href="https://en.wikipedia.org/wiki/Ho_Chi_Minh_City"
            target="_blank"
            rel="noopener noreferrer"
          >
            vacation
          </A>
          .
        </P>
      </Section>

      <Divider />

      <Section aria-labelledby="work">
        <SectionTitle id="work">work</SectionTitle>
        <P>
          formerly of
          <NBSP />
          <A href="https://nooklyn.com" target="_blank" rel="noopener noreferrer">
            nooklyn
          </A>
          <NBSP />
          and
          <NBSP />
          <A href="https://www.ryder.com" target="_blank" rel="noopener noreferrer">
            ryder
          </A>
          , currently seeking new opportunities.
        </P>

        <Actions>
          <PrimaryLink
            href={resumePdf}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open resume PDF in a new tab"
          >
            view resume (pdf)
          </PrimaryLink>
          <SecondaryLink
            href="https://github.com/timmyha"
            target="_blank"
            rel="noopener noreferrer"
          >
            github
          </SecondaryLink>
        </Actions>


      </Section>

      <Divider />

      <Section aria-labelledby="portfolio">
        <SectionTitle id="portfolio">portfolio</SectionTitle>
        <P>some projects i&apos;ve worked on:</P>
        <List>
          <Item>
            <A
              href="https://crashpad.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
            >
              crashpad
            </A>
            , a tongue-in-cheek airbnb-esque experience.
          </Item>
          <Item>
            <A
              href="https://timmy.gg/prefix"
              target="_blank"
              rel="noopener noreferrer"
            >
              prefix
            </A>
            , a web browser new-tab start page with shortcuts, widgets, and smart
            searching.
          </Item>
        </List>
      </Section>
    </Page>
  );
};

const Page = styled.main`
  min-height: 100vh;
  background-color: #1f242c;
  color: #f0f0f0;
  font-family: "IBM Plex Mono", monospace;
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

const Header = styled.header`
  padding: 24px 16px 8px;
  text-align: left;
`;

const Title = styled.h1`
  margin: 0 0 4px 0;
  font-size: 1.5rem;
  line-height: 1.2;
  color: #86f0d1;
  font-weight: 700;
`;

const Subtitle = styled.p`
  margin: 0;
  font-size: 0.95rem;
  color: #d8beff;
`;

const Section = styled.section`
  padding: 16px;
`;

const SectionTitle = styled.h2`
  margin: 0 0 12px 0;
  font-size: 1.2rem;
  color: #d8beff;
`;

const P = styled.p`
  margin: 0 0 12px 0;
  font-size: 0.98rem;
  line-height: 1.6;
`;

const List = styled.ul`
  margin: 6px 0 0 18px;
  padding: 0;
`;

const Item = styled.li`
  margin: 0 0 8px 0;
  line-height: 1.6;
`;

const A = styled.a`
  color: #d8beff;
  text-decoration: none;
  border-bottom: 1px dashed rgba(216, 190, 255, 0.5);
  transition: color 120ms ease, border-color 120ms ease;

  &:hover,
  &:focus {
    color: #86f0d1;
    border-bottom-color: rgba(134, 240, 209, 0.7);
    outline: none;
  }
`;

const PrimaryLink = styled(A).attrs({ as: "a" })`
  display: inline-block;
  padding: 10px 14px;
  border-radius: 8px;
  background: rgba(216, 190, 255, 0.12);
  border: 1px solid #d8beff;
  font-weight: 700;
  margin-right: 10px;

  &:hover,
  &:focus {
    background: rgba(216, 190, 255, 0.2);
  }
`;

const SecondaryLink = styled(A)`
  display: inline-block;
  padding: 10px 14px;
  border-radius: 8px;
  background: rgba(134, 240, 209, 0.08);
  border: 1px solid #86f0d1;

  &:hover,
  &:focus {
    background: rgba(134, 240, 209, 0.16);
  }
`;

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
  margin: 12px 0 16px;
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid rgba(216, 190, 255, 0.2);
  margin: 4px 16px;
`;

const Media = styled.figure`
  margin: 12px 0 16px;
`;

const MediaCaption = styled.figcaption`
  color: #d8beff;
  font-size: 0.9rem;
  margin: 0 0 8px 0;
`;

const MediaFrame = styled.div`
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(216, 190, 255, 0.35);
  border-radius: 8px;
  background: #1b2027;

  & iframe {
    width: 100% !important;
    height: 180px !important;
    border: 0;
    display: block;
  }
`;

const NBSP = styled.span.attrs({ "aria-hidden": true })`
  display: inline;
  &::before {
    content: "\\00a0";
  }
`;



export default MobileStatic;
