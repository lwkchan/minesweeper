import { ChangeEvent } from 'react';
import { GameSettings } from '../../gameDifficultyConfig';

export type CustomGameConfigForm = Record<keyof GameSettings, string>;

interface Props {
  isEnabled: boolean;
  customGameConfig: CustomGameConfigForm;
  errors: Partial<CustomGameConfigForm>;
  setCustomGameConfig: (newConfig: CustomGameConfigForm) => void;
}

export function CustomConfigForm({
  isEnabled,
  customGameConfig,
  setCustomGameConfig,
  errors,
}: Props) {
  function onChange(e: ChangeEvent<HTMLInputElement>) {
    const key = e.target.name;
    const value = e.target.value;

    setCustomGameConfig({ ...customGameConfig, [key]: value });
  }

  return (
    <>
      <fieldset>
        <div className="field-row">
          <label htmlFor="height">Height</label>
          <input
            disabled={!isEnabled}
            id="height"
            type="text"
            name="height"
            onChange={onChange}
            value={customGameConfig.height}
          />
          {errors.height && errors.height}
        </div>
      </fieldset>
      <fieldset>
        <div className="field-row">
          <label htmlFor="width">Width</label>
          <input
            disabled={!isEnabled}
            id="width"
            name="width"
            type="text"
            onChange={onChange}
            value={customGameConfig.width}
          />
          {errors.width && errors.width}
        </div>
      </fieldset>
      <fieldset>
        <div className="field-row">
          <label htmlFor="mines">Mines</label>
          <input
            disabled={!isEnabled}
            id="mines"
            type="text"
            name="mines"
            onChange={onChange}
            value={customGameConfig.mines}
          />
          {errors.mines && errors.mines}
        </div>
      </fieldset>
    </>
  );
}
