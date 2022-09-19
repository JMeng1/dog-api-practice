import { createTemplateAction } from '@backstage/plugin-scaffolder-backend';
import { Config } from '@backstage/config';

export function createGetEnsembleUrlAction(options: { config: Config }) {
  const { config } = options;
  return createTemplateAction<{}>({
    id: 'config:ensembleurl',
    schema: {
      output: {
        type: 'object',
        properties: {
          ensembleUrl: {
            type: 'string',
          },
        },
      },
    },

    async handler(ctx) {
      ctx.logger.info('Reading application baseUrl from ensemble config');
      let ensembleUrl = config.getOptionalString('app.baseUrl') || '';
      if (ensembleUrl === '') {
        throw new Error('Unable to get ensemble base url from config');
      }
      ensembleUrl = ensembleUrl.split(':')[1].replace('//', '');
      ctx.output('ensembleUrl', ensembleUrl);
    },
  });
};