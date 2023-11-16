import React, { useState } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { SearchInput, useTranslation } from '@newrelic/gatsby-theme-newrelic';
import { navigate } from '@reach/router';
import curlyAndDotsBackground from './curlyAndDots.svg';
import curlyAndDotsBackgroundDarkmode from './curlyAndDotsDarkmode.svg';
import dotsBackground from './dots.svg';
import InlineSignup from './InlineSignup';

const MOBILE_BREAKPOINT = '1050px';

const HomepageVideo = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { t } = useTranslation();

  return (
    <>
      <PageContainer>
        <WelcomeContainer>
          <h1>{t('homepageVideo.header')}</h1>
          <p>{t('homepageVideo.p1')}</p>
          <p>{t('homepageVideo.p2')}</p>
          <SearchInput
            placeholder={t('home.search.placeholder')}
            size={SearchInput.SIZE.LARGE}
            value={searchTerm || ''}
            iconName={SearchInput.ICONS.SEARCH}
            isIconClickable
            alignIcon={SearchInput.ICON_ALIGNMENT.RIGHT}
            onChange={(e) => setSearchTerm(e.target.value)}
            onSubmit={() => navigate(`?q=${searchTerm || ''}`)}
            css={css`
              @media screen and (max-width: ${MOBILE_BREAKPOINT}) {
                margin-bottom: 1rem;
              }
            `}
          />
        </WelcomeContainer>
        <VideoContainer>
          <div
            className="wistia_responsive_padding"
            style={{ padding: '56.25% 0 0 ', position: 'relative' }}
          >
            <div
              clasName="wistia_responsive_wrapper"
              style={{
                height: '100%',
                left: '0',
                position: 'absolute',
                top: '0',
                width: '100%',
              }}
            >
              <iframe
                title="Welcome to new relic"
                src="https://fast.wistia.net/embed/iframe/wf5nv18wa4"
                allowTransparency="true"
                frameBorder="0"
                scrolling="no"
                className="wistia_embed"
                name="wistia_embed"
                allowFullScreen
                height="100%"
                width="100%"
              />
            </div>
          </div>
        </VideoContainer>

        <InlineSignup
          showCTA={false}
          hideWhenLoggedOut={false}
          css={css`
            grid-area: signup;
            margin-top: 1rem;
            margin: 0;
            div {
              height: 56px;
              margin-bottom: 1rem;
            }
            div:first-of-type {
              margin-left: 0;
            }
            input {
              height: 56px;
              background-color: var(--secondary-background-color);
              &::placeholder {
                color: var(--primary-font-color);
                font-size: 18px;
              }
            }
            button {
              height: 56px;
              font-size: 18px;
            }
            p {
              color: var(--primary-text-color);
            }
          `}
        />
      </PageContainer>
    </>
  );
};

export default HomepageVideo;

const PageContainer = styled.div`
  padding-top: 7rem;
  padding-bottom: 1rem;
  position: sticky;
  width: 100%;
  display: grid;
  grid-template-areas: 'welcome video' 'break signup';
  grid-template-columns: 2fr 3fr;
  grid-gap: 1rem;
  background-image: url(${curlyAndDotsBackground});
  background-size: 70%;
  background-repeat: no-repeat;
  background-position: top -3vh right 20%;
  .dark-mode & {
    background-image: url(${curlyAndDotsBackgroundDarkmode});
  }
  @media screen and (max-width: ${MOBILE_BREAKPOINT}) {
    display: flex;
    flex-direction: column;
    padding-top: 2rem;
    background-image: url(${dotsBackground});
    background-size: cover;
  }
`;
const WelcomeContainer = styled.div`
  grid-area: welcome;
  align-self: end;
  padding-right: 3rem;
  h1 {
    font-size: 56px;
    font-weight: 500;
  }
  @media screen and (max-width: ${MOBILE_BREAKPOINT}) {
    width: 100%;
    margin-bottom: 2rem;
  }
`;
const VideoContainer = styled.div`
  grid-area: video;
  @media screen and (max-width: ${MOBILE_BREAKPOINT}) {
    width: 100%;
  }
`;
