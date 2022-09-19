import React from 'react';
import type { FieldValidation } from '@rjsf/core';
import {
  createScaffolderFieldExtension,
  FieldExtensionComponentProps,
  scaffolderPlugin,
} from '@backstage/plugin-scaffolder';

import { TextField } from '@material-ui/core';

const TextValuePicker = (props: FieldExtensionComponentProps<string>) => {
  const {
    onChange,
    required,
    schema: { title, description },
    rawErrors,
    formData,
    uiSchema: { 'ui:autofocus': autoFocus },
    idSchema,
    placeholder,
  } = props;

  return (
    <TextField
      id={idSchema?.$id}
      label={title}
      placeholder={placeholder}
      helperText={description}
      required={required}
      value={formData ?? ''}
      onChange={({ target: { value } }) => onChange(value)}
      margin="normal"
      error={rawErrors?.length > 0 && !formData}
      inputProps={{ autoFocus }}
    />
  );
};

export const TextValidation = scaffolderPlugin.provide(
  createScaffolderFieldExtension({
    name: 'TextValidation',
    component: TextValuePicker,
    validation: (value: string, validation: FieldValidation) => {
      if (value.match("^[a-zA-Z 0-9\-_]*$") == null) {
        validation.addError('Only spaces, underscores, hyphens and alphanumeric characters are allowed.');
      }
    },
  }),
);
