/*
 * Copyright 2021 The Backstage Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {
  HomePageToolkit,
  //HomePageCompanyLogo,
  HomePageStarredEntities,
  //TemplateBackstageLogo,
  //TemplateBackstageLogoIcon
} from '@backstage/plugin-home';
import { wrapInTestApp, TestApiProvider } from '@backstage/test-utils';
import { Content, Page, InfoCard } from '@backstage/core-components';
import {
  starredEntitiesApiRef,
  MockStarredEntitiesApi,
  entityRouteRef,
} from '@backstage/plugin-catalog-react';
import { configApiRef, useApi } from '@backstage/core-plugin-api';
// import { configApiRef } from '@backstage/core-plugin-api';
import { ConfigReader } from '@backstage/config';
import { HomePageSearchBar, searchPlugin } from '@backstage/plugin-search';

// Icons
import {
  searchApiRef,
  SearchContextProvider,
} from '@backstage/plugin-search-react';
//import { HomePageStackOverflowQuestions } from '@backstage/plugin-stack-overflow';
import { Grid, makeStyles, Typography } from '@material-ui/core';
//import Typography from '@material-ui/core/Typography';
import React, { ComponentType } from 'react';

import MyHomepageLogo from './logo/kohls_technology.svg';

// @mui/material
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemButton,
} from '@mui/material';
//import List from '@mui/material/List';
//import ListItem from '@mui/material/ListItem';
//import ListItemText from '@mui/material/ListItemText';
//import ListItemIcon from '@mui/material/ListItemIcon';
//import ListItemButton from '@mui/material/ListItemButton';

// @mui/icons-material
import ArticleIcon from '@mui/icons-material/Article';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
//import SecurityIcon from '@mui/icons-material/Security';
import ApiIcon from '@mui/icons-material/Api';
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';
import CloudCircleIcon from '@mui/icons-material/CloudCircle';

const starredEntitiesApi = new MockStarredEntitiesApi();
starredEntitiesApi.toggleStarred('component:default/example-starred-entity');
starredEntitiesApi.toggleStarred('component:default/example-starred-entity-2');
starredEntitiesApi.toggleStarred('component:default/example-starred-entity-3');
starredEntitiesApi.toggleStarred('component:default/example-starred-entity-4');

export default {
  title: 'Plugins/Home/Templates',
  decorators: [
    (Story: ComponentType<{}>) =>
      wrapInTestApp(
        <>
          <TestApiProvider
            apis={[
              [starredEntitiesApiRef, starredEntitiesApi],
              [searchApiRef, { query: () => Promise.resolve({ results: [] }) }],
              [
                configApiRef,
                new ConfigReader({
                  stackoverflow: {
                    baseUrl: 'https://api.stackexchange.com/2.2',
                  },
                }),
              ],
            ]}
          >
            <Story />
          </TestApiProvider>
        </>,
        {
          mountedRoutes: {
            '/hello-company': searchPlugin.routes.root,
            '/catalog/:namespace/:kind/:name': entityRouteRef,
          },
        },
      ),
  ],
};

const useStyles = makeStyles(theme => ({
  searchBar: {
    display: 'flex',
    maxWidth: '60vw',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[1],
    padding: '8px 0',
    borderRadius: '50px',
    margin: 'auto',
  },
}));
/*
 const bgColor = { // make sure all required component's inputs/Props keys&types match
     backgroundColor: '#37ECF8'
   }

  const useLogoStyles = makeStyles(theme => ({
    container: {
       margin: theme.spacing(5, 0),
    },
    svg: {
        width: 'auto',
        height: 100,
    },
    path: {
        fill: '#7df3e1',
    },
  }));
 */

const useBaseUrl = () => {
  try {
    const config = useApi(configApiRef);
    return config.getOptionalString('backend.baseUrl');
  } catch {
    return "";
  }
};

const backendBaseUrl = useBaseUrl() ?? '/';

const started = (
  <List>
    <ListItem disablePadding>
      <ListItemButton
        component="a"
        href={backendBaseUrl + '/docs/default/component/platform-quickstart-guide'}
        target="_blank"
        rel="noopener noreferrer"
      >
        <ListItemIcon>
          <ArticleIcon style={{ color: '#37ECF8' }} />
        </ListItemIcon>
        <ListItemText
          primary="Platform Quick Start Guide"
          secondary="Walk-through guide used for the Platform."
        />
      </ListItemButton>
    </ListItem>
    <ListItem disablePadding>
      <ListItemButton
        component="a"
        href={backendBaseUrl + '/docs/default/component/platform-contribution-guide'}
        target="_blank"
        rel="noopener noreferrer"
      >
        <ListItemIcon>
          <ArticleIcon style={{ color: '#37ECF8' }} />
        </ListItemIcon>
        <ListItemText
          primary="Platform Contribution Guide"
          secondary="Contribution guide for the Platform."
        />
      </ListItemButton>
    </ListItem>
  </List>
);

const help = (
  <List>
    <ListItem disablePadding>
      <ListItemButton
        component="a"
        href="https://eurl.io/#6xZEHurCn"
        target="_blank"
        rel="noopener noreferrer"
      >
        <ListItemIcon>
          <ArrowCircleRightIcon style={{ color: '#37ECF8' }} />
        </ListItemIcon>
        <ListItemText
          primary="Ensemble Chat Space"
          secondary="Join Ensemble chat and ask any questions. "
        />
      </ListItemButton>
    </ListItem> 


    <ListItem disablePadding>
      <ListItemButton
        component="a"
        href="https://miro.com/app/board/uXjVOht5qbM=/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <ListItemIcon>
          <ArrowCircleRightIcon style={{ color: '#37ECF8' }} />
        </ListItemIcon>
        <ListItemText
          primary="Ensemble Beta Feedback"
          secondary="Provide feedback on Ensemble."
        />
      </ListItemButton>
    </ListItem> 
  </List>
    
);

const DisplayHomepageLogo = () => {
  return <img src={MyHomepageLogo} />;
};

export const HomePage = () => {
  const classes = useStyles();
  // const { svg, path, container } = useLogoStyles();

  return (
    <SearchContextProvider>
      <Page themeId="home">
        <Content>
          <Grid container justifyContent="center">
            {/* <HomePageCompanyLogo
                            className={container}
                            logo={<TemplateBackstageLogo classes={{ svg, path }} />}
                        /> */}
            <Grid
              container
              item
              xs={12}
              alignItems="center"
              direction="row"
              justifyContent="center"
            >
              <Grid
                container
                item
                xs={12}
                justifyContent="center"
                alignItems="center"
              >
                <DisplayHomepageLogo />
              </Grid>
              <Grid
                container
                item
                xs={12}
                justifyContent="center"
                alignItems="center"
              >
                <Typography variant="h2">Welcome to Ensemble</Typography>
              </Grid>
            </Grid>
            <Grid container item xs={12} alignItems="center" direction="row">
              <HomePageSearchBar
                classes={{ root: classes.searchBar }}
                placeholder="Search"
              />
            </Grid>
            <Grid container item xs={12}>
              <Grid item xs={12} md={6}>
                <HomePageStarredEntities />
              </Grid>
              <Grid item xs={12} md={6}>
                <HomePageToolkit
                  tools={[
                    {
                      url: 'https://www.redhat.com/en/technologies/cloud-computing/openshift',
                      label: 'OpenShift',
                      icon: (
                        <CloudCircleIcon
                          style={{ color: '#37ECF8', fontSize: 60 }}
                        />
                      ),
                    },
                    {
                      url: 'https://gitlab.com/kohls/',
                      label: 'GitLab',
                      icon: (
                        <AllInclusiveIcon
                          style={{ color: '#37ECF8', fontSize: 60 }}
                        />
                      ),
                    },
                    //{url: 'https://sre.kohls.com/', label: 'SRE Dashboard', icon: <AutoGraphIcon style={{color:"#37ECF8"}}/>},
                    //{url: 'https://kohls.okta.com/', label: 'OKTA', icon: <SecurityIcon/>},
                    {
                      url: 'https://jiradc.kohls.com:8443/secure/Dashboard.jspa',
                      label: 'JIRA',
                      icon: (
                        <ApiIcon style={{ color: '#37ECF8', fontSize: 60 }} />
                      ),
                    },
                  ]}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <InfoCard title="Getting Started!">{started}</InfoCard>
              </Grid>
              <Grid item xs={12} md={6}>
                <InfoCard
                  title="Need Help?"
                  subheader="Use links below to ask questions or provide feedback."
                >
                  {help}
                </InfoCard>
              </Grid>
            </Grid>
          </Grid>
        </Content>
      </Page>
    </SearchContextProvider>
  );
};
