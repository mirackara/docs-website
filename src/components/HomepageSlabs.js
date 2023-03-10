import React, { useState, useEffect } from 'react';
import { css } from '@emotion/react';
import { useSpring, animated, useTransition } from '@react-spring/web';
import { useTranslation } from '@newrelic/gatsby-theme-newrelic';
import { useMainLayoutContext } from './MainLayoutContext';
import useMediaQuery from '../hooks/useMediaQuery';
import backend from './backend.png';
import frontend from './frontend.png';
import devops from './devops.png';

// TODO
// random panel
// dark/lightmode overhaul
// add margin to top of default view

const HomepageSlabs = () => {
  const { t } = useTranslation();
  const [sidebar] = useMainLayoutContext();
  const randomPanelId = Math.ceil(Math.random() * 3);
  const [activePanel, setActivePanel] = useState(randomPanelId);

  const isTabletWidth = useMediaQuery('(max-width: 1240px)');

  const normalTransition = {
    from: {
      width: '15%',
    },
    to: {
      width: '70%',
    },
  };
  const tabletTransition = {
    from: {
      height: '25%',
    },
    to: {
      height: '50%',
    },
  };

  const [opacitySprings1, opacityApi1] = useSpring(() => {});

  const [opacitySprings2, opacityApi2] = useSpring(() => {});

  const [opacitySprings3, opacityApi3] = useSpring(() => {});

  const [panelSprings1, panelApi1] = useSpring(() => {});

  const [panelSprings2, panelApi2] = useSpring(() => {});

  const [panelSprings3, panelApi3] = useSpring(() => {});

  const PANEL_SPRING_APIS = { 1: panelApi1, 2: panelApi2, 3: panelApi3 };
  const OPACITY_SPRING_APIS = {
    1: opacityApi1,
    2: opacityApi2,
    3: opacityApi3,
  };

  useEffect(() => {
    const springConfig = {
      mass: 1,
      friction: 36,
      tension: 170,
    };
    const initialPanelState = {
      from: {
        width: '33%',
        height: '100%',
      },
      to: {
        width: '15%',
      },
      config: springConfig,
    };
    const initialTabletPanelState = {
      from: {
        height: '33%',
        width: '100%',
      },
      to: {
        height: '25%',
      },
      config: springConfig,
    };

    opacityApi1.start({
      from: { opacity: 0.5 },
      to: { opacity: 0 },
    });
    opacityApi2.start({
      from: { opacity: 0.5 },
      to: { opacity: 0.5 },
    });
    opacityApi3.start({
      from: { opacity: 0.5 },
      to: { opacity: 0.5 },
    });

    if (isTabletWidth) {
      for (const apiKey in PANEL_SPRING_APIS) {
        if (Number(apiKey) === randomPanelId) {
          PANEL_SPRING_APIS[apiKey].start({
            from: {
              height: '25%',
              width: '100%',
            },
            to: {
              height: '50%',
            },
            config: springConfig,
          });
        } else {
          PANEL_SPRING_APIS[apiKey].start(initialTabletPanelState);
        }
      }
    } else {
      for (const apiKey in PANEL_SPRING_APIS) {
        if (Number(apiKey) === randomPanelId) {
          PANEL_SPRING_APIS[apiKey].start({
            from: {
              width: '15%',
              height: '100%',
            },
            to: {
              width: '70%',
            },
            config: springConfig,
          });
        } else {
          PANEL_SPRING_APIS[apiKey].start(initialPanelState);
        }
      }
    }
  }, [PANEL_SPRING_APIS, isTabletWidth, opacityApi1, opacityApi2, opacityApi3]);

  const handlePanelClick = (panelId) => {
    if (activePanel !== panelId) {
      isTabletWidth
        ? PANEL_SPRING_APIS[panelId].start(tabletTransition)
        : PANEL_SPRING_APIS[panelId].start(normalTransition);
      PANEL_SPRING_APIS[activePanel].start({
        reverse: true,
      });
      OPACITY_SPRING_APIS[panelId].start({
        from: { opacity: 0.5 },
        to: { opacity: 0 },
      });
      OPACITY_SPRING_APIS[activePanel].start({ reverse: true });
    }

    setActivePanel(panelId);
  };

  return (
    <div
      css={css`
        width: ${sidebar ? 'calc(100vw - var(--sidebar-width))' : '100vw'};
        height: calc(100vh - 72px - 60px);
        display: flex;

        @media screen and (max-width: 1240px) {
          flex-direction: column;
        }
      `}
    >
      <Slab
        style={panelSprings1}
        opacitySprings={opacitySprings1}
        onClick={() => handlePanelClick(1)}
        headers={{
          active: t('home.personas.active.1'),
          default: t('home.personas.default.1'),
        }}
        isTabletWidth={isTabletWidth}
        activePanel={activePanel}
        panelId={1}
        css={css`
          background-image: url(${frontend});
          > div {
            background-color: #fac632;
          }
          ${activePanel !== 1 &&
          css`
            background-position-x: 80%;
          `}
          @media screen and (max-width: 1240px) {
            background-position: right -80px top 20%;
          }
        `}
      />
      <Slab
        style={panelSprings2}
        opacitySprings={opacitySprings2}
        onClick={() => handlePanelClick(2)}
        headers={{
          active: t('home.personas.active.2'),
          default: t('home.personas.default.2'),
        }}
        isTabletWidth={isTabletWidth}
        activePanel={activePanel}
        panelId={2}
        css={css`
          background-image: url(${backend});
          > div {
            background-color: #f547be;
          }
        `}
      />
      <Slab
        style={panelSprings3}
        opacitySprings={opacitySprings3}
        onClick={() => handlePanelClick(3)}
        headers={{
          active: t('home.personas.active.3'),
          default: t('home.personas.default.3'),
        }}
        isTabletWidth={isTabletWidth}
        activePanel={activePanel}
        panelId={3}
        css={css`
          background-image: url(${devops});
          > div {
            background-color: #2bdfe3;
          }
        `}
      />
    </div>
  );
};

const Slab = ({
  className,
  activePanel,
  panelId,
  headers,
  opacitySprings,
  isTabletWidth,
  ...props
}) => {
  const isActivePanel = activePanel === panelId;
  const header =
    !isActivePanel || isTabletWidth ? headers.default : headers.active;
  const transitions = useTransition(header, {
    initial: { opacity: 1 },
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { display: 'none' },
    exitBeforeEnter: true,
  });

  return (
    <animated.div
      css={css`
        height: 100%;
        width: 33%;
        padding: 1rem;
        background-color: black;
        background-size: auto 70%;
        background-repeat: no-repeat;
        background-position: center bottom -60px;
        padding-top: 5rem;
        min-width: 240px;
        position: relative;

        h1,
        p {
          color: var(--system-text-primary-dark);
        }

        h1 {
          font-size: 72px;
          font-weight: 500;
        }

        @media screen and (max-width: 1240px) {
          height: 33%;
          width: 100%;
          background-size: 800px auto;
          background-position: right -200px top 20%;
          h1 {
            font-size: 48px;
          }
        }
      `}
      className={className}
      {...props}
    >
      <animated.div
        css={css`
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0.5;
          z-index: 1;
          ${!isActivePanel &&
          css`
            &:hover {
              opacity: 0.3 !important;
              transition: opacity 300ms;
            }
            transition: opacity 300ms;
          `}
        `}
        style={opacitySprings}
      />
      {transitions((style, item) => (
        <animated.h1 style={style}>{item}</animated.h1>
      ))}
    </animated.div>
  );
};

export default HomepageSlabs;
