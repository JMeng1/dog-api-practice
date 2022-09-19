/*
 * Copyright 2020 The Backstage Authors
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

// import React, { useContext, PropsWithChildren } from 'react';
import React, { PropsWithChildren } from 'react';
// import { Link, makeStyles } from '@material-ui/core';
// import { makeStyles } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import MapIcon from '@material-ui/icons/MyLocation';
import LibraryBooks from '@material-ui/icons/LibraryBooks';
import CreateComponentIcon from '@material-ui/icons/AddCircleOutline';
// import LogoFull from './LogoFull';
// import LogoIcon from './LogoIcon';
// import { NavLink } from 'react-router-dom';
import {
  Settings as SidebarSettings,
  UserSettingsSignInAvatar,
} from '@backstage/plugin-user-settings';
import { SidebarSearchModal } from '@backstage/plugin-search';
import {
  Sidebar,
//   sidebarConfig,
//   SidebarContext,
  SidebarDivider,
  SidebarGroup,
  SidebarItem,
  SidebarPage,
  SidebarScrollWrapper,
  SidebarSpace,
} from '@backstage/core-components';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import CategoryIcon from '@material-ui/icons/Category';
// import MySidebarLogo from './logo/kohls_technology.svg';

// const useSidebarLogoStyles = makeStyles({
//   root: {
//     width: sidebarConfig.drawerWidthClosed,
//     height: 3 * sidebarConfig.logoHeight,
//     display: 'flex',
//     flexFlow: 'row nowrap',
//     alignItems: 'center',
//     marginBottom: -14,
//   },
//   link: {
//     width: sidebarConfig.drawerWidthClosed,
//     marginLeft: 24,
//   },
// });

// const SidebarLogo = () => {
//   const classes = useSidebarLogoStyles();
//   const { isOpen } = useContext(SidebarContext);
//
//   return (
//     <div className={classes.root}>
//       <Link
//         component={NavLink}
//         to="/"
//         underline="none"
//         className={classes.link}
//       >
//         {isOpen ? <LogoFull /> : <LogoIcon />}
//       </Link>
//     </div>
//   );
// };

// const useStyles = makeStyles({
//   svg: {
//     width: '224',
//     height: '24',
//   },
// });

// const DisplaySidebarLogoSmall = () => {
//   const classes = useStyles();

//   return (
//     <svg
//       className={classes.svg}
//       xmlns="http://www.w3.org/2000/svg"
//       viewBox="0 0 24 224"
//     >
//     <img src={MySidebarLogo} />
//     </svg>);
// };

// const DisplaySidebarLogoSmall = () => {
//    return <img src={MySidebarLogo} />;
// };

export const Root = ({ children }: PropsWithChildren<{}>) => (
  <SidebarPage>
    <Sidebar>
      {/* <SidebarLogo /> */}
      {/* <DisplaySidebarLogoSmall /> */}
      <SidebarGroup label="Search" icon={<SearchIcon />} to="/search">
        <SidebarSearchModal />
      </SidebarGroup>
      <SidebarDivider />
      <SidebarGroup label="Menu" icon={<MenuIcon />}>
        {/* Global nav, not org-specific */}
        <SidebarItem icon={HomeIcon} to="/" text="Home" />
        <SidebarItem icon={CategoryIcon} to="catalog" text="App Directory" />
        <SidebarItem icon={CreateComponentIcon} to="create" text="Create App" />
        <SidebarItem icon={LibraryBooks} to="docs" text="Docs" />
        {/* End global nav */}
        <SidebarDivider />
        <SidebarScrollWrapper>
          <SidebarItem icon={MapIcon} to="tech-radar" text="Tech Radar" />
        </SidebarScrollWrapper>
      </SidebarGroup>
      <SidebarSpace />
      <SidebarDivider />
      <SidebarGroup
        label="Settings"
        icon={<UserSettingsSignInAvatar />}
        to="/settings"
      >
        <SidebarSettings />
      </SidebarGroup>
    </Sidebar>
    {children}
  </SidebarPage>
);
