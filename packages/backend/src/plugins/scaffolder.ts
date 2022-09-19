import { CatalogClient } from '@backstage/catalog-client';
import { createRouter, createBuiltinActions } from '@backstage/plugin-scaffolder-backend';
import { Router } from 'express';
import type { PluginEnvironment } from '../types';
import { createHttpBackstageAction } from '@roadiehq/scaffolder-backend-module-http-request'
// packages/backend/src/plugins/scaffolder.ts
import { createZipAction, createWriteFileAction, createAppendFileAction, createSleepAction } from '@roadiehq/scaffolder-backend-module-utils';

import { ScmIntegrations } from '@backstage/integration';
import { createGetEnsembleUrlAction } from './scaffolder/actions/GetEnsembleUrlAction';
import { createGetDogImageAction } from './scaffolder/actions/GetDogImageAction';

export default async function createPlugin(
  env: PluginEnvironment,
): Promise<Router> {
  const catalogClient = new CatalogClient({
    discoveryApi: env.discovery,
  });

  const integrations = ScmIntegrations.fromConfig(env.config);

  const builtInActions = createBuiltinActions({
    integrations,
    catalogClient,
    config: env.config,
    reader: env.reader,
  });

  const actions = [
    ...builtInActions,
    createHttpBackstageAction({ config: env.config }),
    createWriteFileAction(),
    createSleepAction(),
    createZipAction(),
    createAppendFileAction(),
    createGetEnsembleUrlAction({ config: env.config }),
    createGetDogImageAction({ config: env.config })
  ];

  return await createRouter({
    logger: env.logger,
    config: env.config,
    database: env.database,
    reader: env.reader,
    catalogClient,
    actions,
  });
}
