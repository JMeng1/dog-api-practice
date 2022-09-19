import React from 'react';
import { Route } from 'react-router';
import { apiDocsPlugin, ApiExplorerPage } from '@backstage/plugin-api-docs';
import {
  CatalogEntityPage,
  CatalogIndexPage,
  catalogPlugin,
} from '@backstage/plugin-catalog';
import {
  CatalogImportPage,
  catalogImportPlugin,
} from '@backstage/plugin-catalog-import';
import { ScaffolderPage, scaffolderPlugin } from '@backstage/plugin-scaffolder';
import { orgPlugin } from '@backstage/plugin-org';
import { SearchPage } from '@backstage/plugin-search';
import { TechRadarPage } from '@backstage/plugin-tech-radar';
import {
  TechDocsIndexPage,
  techdocsPlugin,
  TechDocsReaderPage,
} from '@backstage/plugin-techdocs';
import { UserSettingsPage } from '@backstage/plugin-user-settings';
import { apis } from './apis';
import { entityPage } from './components/catalog/EntityPage';
import { searchPage } from './components/search/SearchPage';
import { Root } from './components/Root';

// import { SignInPage, AlertDisplay, OAuthRequestDialog } from '@backstage/core-components';
import { AlertDisplay, OAuthRequestDialog } from '@backstage/core-components';
import { createApp } from '@backstage/app-defaults';
import { FlatRoutes } from '@backstage/core-app-api';
import { CatalogGraphPage } from '@backstage/plugin-catalog-graph';
import { PermissionedRoute } from '@backstage/plugin-permission-react';
import { catalogEntityCreatePermission } from '@backstage/plugin-catalog-common/alpha';
import { HomepageCompositionRoot } from '@backstage/plugin-home';
import { HomePage } from './components/home/HomePage';
import { TextValidation } from './scaffolder/CustomFieldExtension/TextValidation';
import { ScaffolderFieldExtensions } from '@backstage/plugin-scaffolder';
// import { oktaAuthApiRef } from '@backstage/core-plugin-api';

// import { ThemeProvider } from '@material-ui/core/styles';
// import CssBaseline from '@material-ui/core/CssBaseline';
// import DarkIcon from '@material-ui/icons/WbSunny';

// import { createTheme, darkTheme } from '@backstage/theme';

// const myTheme = createTheme({
//   palette: darkTheme.palette,
//   defaultPageTheme: 'home',
// });


const app = createApp({
  apis,
//   components: {
//     SignInPage: props => (
//       <SignInPage
//         {...props}
//         auto
//         provider= {{
//           id: 'okta-auth-provider',
//           title: 'Okta',
//           message: 'Sign in using Okta',
//           apiRef: oktaAuthApiRef,
//         }}
//       />
//     ),
//   },
//   themes: [{
//     id: 'dark-theme',
//     title: 'My Dark Theme',
//     variant: 'dark',
//     icon: <DarkIcon />,
//     Provider: ({ children }) => (
//       <ThemeProvider theme={myTheme}>
//         <CssBaseline>{children}</CssBaseline>
//       </ThemeProvider>
//     )}],
  bindRoutes({ bind }) {
    bind(catalogPlugin.externalRoutes, {
      createComponent: scaffolderPlugin.routes.root,
      viewTechDoc: techdocsPlugin.routes.docRoot,
    });
    bind(apiDocsPlugin.externalRoutes, {
      registerApi: catalogImportPlugin.routes.importPage,
    });
    bind(scaffolderPlugin.externalRoutes, {
      registerComponent: catalogImportPlugin.routes.importPage,
    });
    bind(orgPlugin.externalRoutes, {
      catalogIndex: catalogPlugin.routes.catalogIndex,
    });
  },
});

const AppProvider = app.getProvider();
const AppRouter = app.getRouter();

const routes = (
  <FlatRoutes>
    <Route path="/" element={<HomepageCompositionRoot />}>
      <HomePage />
    </Route>
    <Route path="/catalog" element={<CatalogIndexPage />} />
    <Route
      path="/catalog/:namespace/:kind/:name"
      element={<CatalogEntityPage />}
    >
      {entityPage}
    </Route>
    <Route path="/docs" element={<TechDocsIndexPage />} />
    <Route
      path="/docs/:namespace/:kind/:name/*"
      element={<TechDocsReaderPage />}
    />
    <Route
      path="/create"
      element={
        <ScaffolderPage
          groups={[
            {
              title: 'Product Environments',
              filter: entity =>
                entity?.metadata?.tags?.includes('product') ?? false,
            },
            {
              title: 'Application',
              filter: entity =>
                entity?.metadata?.tags?.includes('app') ?? false,
            },
            {
              title: 'Documentation',
              filter: entity =>
                entity?.metadata?.tags?.includes('doc') ?? false,
            },
            {
              title: 'Data Services',
              filter: entity =>
                entity?.metadata?.tags?.includes('data-service') ?? false,
            },
          ]}
        />
      }>
      <ScaffolderFieldExtensions>
        <TextValidation />
      </ScaffolderFieldExtensions>
    </Route>
    <Route path="/api-docs" element={<ApiExplorerPage />} />
    <Route
      path="/tech-radar"
      element={<TechRadarPage width={1500} height={800} />}
    />
    <PermissionedRoute
      path="/catalog-import"
      permission={catalogEntityCreatePermission}
      element={<CatalogImportPage />}
    />
    <Route path="/search" element={<SearchPage />}>
      {searchPage}
    </Route>
    <Route path="/settings" element={<UserSettingsPage />} />
    <Route path="/catalog-graph" element={<CatalogGraphPage />} />
  </FlatRoutes>
);

const App = () => (
  <AppProvider>
    <AlertDisplay />
    <OAuthRequestDialog />
    <AppRouter>
      <Root>{routes}</Root>
    </AppRouter>
  </AppProvider>
);

export default App;
