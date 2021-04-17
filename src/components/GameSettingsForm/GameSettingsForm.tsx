import React from 'react';
import { useStore } from '../../store';
import {
  Difficulty,
  GameSettings,
  gameSettingsConfig,
} from '../../gameDifficultyConfig';
import { DifficultyFieldRow } from './DifficultyFieldRow';
import { CustomConfigForm, CustomGameConfigForm } from './CustomConfigForm';
import { validateCustomSettings } from './validateCustomSettings';

export function GameSettingsForm() {
  const [selected, setSelected] = React.useState<undefined | Difficulty>(
    undefined
  );
  const [
    customGameConfig,
    setCustomGameConfig,
  ] = React.useState<CustomGameConfigForm>({
    height: '',
    width: '',
    mines: '',
  });
  const [customGameConfigErrors, setCustomGameConfigErrors] = React.useState<
    Partial<CustomGameConfigForm>
  >({});
  const { closeSettingsWindow, restartGame } = useStore((s) => ({
    restartGame: s.restartGame,
    closeSettingsWindow: s.setSettingsWindowClosed,
  }));

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (selected && selected === Difficulty.CUSTOM) {
      // validate form
      const errors = validateCustomSettings(customGameConfig);

      if (errors) {
        setCustomGameConfigErrors(errors);
        return;
      }

      // get game config from form
      let nextGameConfig = {} as GameSettings;
      Object.keys(customGameConfig).forEach((k) => {
        const key = k as keyof CustomGameConfigForm;
        const value = parseInt(customGameConfig[key]);
        nextGameConfig[key] = value;
      });
      restartGame(nextGameConfig);
    }

    if (selected && selected !== Difficulty.CUSTOM) {
      restartGame(gameSettingsConfig[selected] as GameSettings);
    }

    closeSettingsWindow();
  };

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <legend>Choose your difficulty</legend>
        {[
          Difficulty.EASY,
          Difficulty.MEDIUM,
          Difficulty.EXPERT,
          Difficulty.CUSTOM,
        ].map((d) => (
          <DifficultyFieldRow
            key={d}
            difficulty={d}
            isSelected={selected === d}
            onChange={() => setSelected(d)}
          />
        ))}
        <CustomConfigForm
          isEnabled={selected === Difficulty.CUSTOM}
          customGameConfig={customGameConfig}
          errors={customGameConfigErrors}
          setCustomGameConfig={setCustomGameConfig}
        />
        <button type="submit">Confirm</button>
      </fieldset>
    </form>
  );
}
