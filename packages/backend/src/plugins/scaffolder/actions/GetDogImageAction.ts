import { createTemplateAction } from '@backstage/plugin-scaffolder-backend';
import { Config } from '@backstage/config';



export function createGetDogImageAction(options: { config: Config }) {
    const { config } = options;
    return createTemplateAction<{
      dogBreed: string;
    }>({
      id: 'http:getdog',
      schema: {
        input: {
          type: 'object',
          properties: {
            dogBreed:{
              title: 'Dog Breed Name',
              type: 'string',
            },
          },
        },
        output: { 
          type: 'object', 
          properties: {
            imageString: {
              title: 'A URL to a Dog Image',
              type: 'string',
            },
          },
        },
      },

  
      async handler(ctx) {
        const error_msg = new Error('Fetching URL failed')
        const unknown_err = new Error('Unknown Error Occured')
        const { dogBreed } = ctx.input;
        try {
          const dog_img_json = await fetch('https://dog.ceo/api/breed/' + dogBreed + '/images/random', {
            method: 'GET',
            headers: {
              Accept: 'application/json',
            },
          });
          if (dog_img_json.ok != true) {
            throw error_msg;
          }
      
          const result = (await dog_img_json.json());
          ctx.output = ('imageString', result.message);
        } finally{
        }
    },
  });
};