import styled from "styled-components";
import resumePdf from "../assets/timothyresume.pdf";

const MobileStatic = () => {
  return (
    <Page>
      <TopStrip />
      <Header>
        <Title>timothy hansher</Title>
        <Subtitle>software developer</Subtitle>
      </Header>

      <Section aria-labelledby="about">
        <SectionTitle id="about">about</SectionTitle>
        <P>I am a software engineer based in new york city.</P>

        <P>
          In my free time, you may find me rating{" "}
          <A
            href="https://letterboxd.com/film/howards-end/"
            target="_blank"
            rel="noopener noreferrer"
          >
            period dramas
          </A>
          {" "}on Letterboxd, dreaming about{" "}
          <A
            href="https://www.riversidethaicooking.com/north-eastern-cuisine/lao-style-mushroom-soup/"
            target="_blank"
            rel="noopener noreferrer"
          >
            soup
          </A>
          , complaining about{" "}
          <A
            href="https://www.evertonfc.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Everton Football Club
          </A>
          , or planning my next{" "}
          <A
            href="https://en.wikipedia.org/wiki/North_Sentinel_Island"
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
          Formerly of{" "}
          <A href="https://www.ryder.com" target="_blank" rel="noopener noreferrer">
            Ryder
          </A>{" "}
          and{" "}
          <A href="https://nooklyn.com" target="_blank" rel="noopener noreferrer">
            nooklyn
          </A>
          , currently seeking new opportunities.
        </P>

        <Actions>
          <PrimaryLink
            href={resumePdf}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="open resume pdf in a new tab"
          >
            View resume (pdf)
          </PrimaryLink>
          <SecondaryLink
            href="https://github.com/timmyha"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </SecondaryLink>
        </Actions>
      </Section>

      <Divider />

      <Section aria-labelledby="portfolio">
        <SectionTitle id="portfolio">portfolio</SectionTitle>
        <P>Some projects i&apos;ve worked on:</P>
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

        <P>I also love to create ide themes:</P>
        <List>
          <Item>
            <A
              href="https://github.com/timmyha/hobbyist-goth"
              target="_blank"
              rel="noopener noreferrer"
            >
              hobbyist-goth
            </A>
            (vs code)
          </Item>
          <Item>
            <A
              href="https://github.com/timmyha/ekkamai.nvim"
              target="_blank"
              rel="noopener noreferrer"
            >
              ekkamai.nvim
            </A>
            (neovim)
          </Item>
          <Item>
            <A
              href="https://github.com/timmyha/henna.nvim"
              target="_blank"
              rel="noopener noreferrer"
            >
              henna.nvim
            </A>
            (neovim)
          </Item>
        </List>
      </Section>
    </Page>
  );
};

/* Styled Components (theme aligned with the desktop app) */

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

const SubsectionTitle = styled.h3`
  margin: 16px 0 10px 0;
  font-size: 1.05rem;
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
  margin: 0 0 8px 20px;
  line-height: 1.6;
`;

const A = styled.a`
  color: #86f0d1;
  text-decoration: none;
  border-bottom: 1px dashed rgba(216, 190, 255, 0.5);
  transition: color 120ms ease, border-color 120ms ease;

  &:hover,
  &:focus {
    color: #d8beff;
    border-bottom-color: rgba(134, 240, 209, 0.7);
    outline: none;
  }
`;

const PrimaryLink = styled(A)`
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

const TopStrip = styled.div`
  height: 10px;
  width: 100%;
  background: linear-gradient(90deg, #86f0d1, #d8beff);
`;

export default MobileStatic;
