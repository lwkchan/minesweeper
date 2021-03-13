import React from 'react';
import { useStore } from '../../store';
import {
  Difficulty,
  GameSettings,
  gameSettingsConfig,
} from '../../gameDifficultyConfig';
import { DifficultyFieldRow } from './DifficultyFieldRow';
import { CustomConfigForm, CustomGameConfigForm } from './CustomConfigForm';

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
  const { closeSettingsWindow, restartGame } = useStore((s) => ({
    restartGame: s.restartGame,
    closeSettingsWindow: s.setSettingsWindowClosed,
  }));

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (selected) {
      let nextGameConfig = {} as GameSettings;

      if (selected === Difficulty.CUSTOM) {
        console.log('handle submit');
        Object.keys(customGameConfig).forEach((key) => {
          const value = parseInt(
            customGameConfig[key as keyof CustomGameConfigForm]
          );

          nextGameConfig[key as keyof GameSettings] = value;
        });
      } else {
        nextGameConfig = gameSettingsConfig[selected] as GameSettings;
      }

      restartGame(nextGameConfig);
      closeSettingsWindow();
    }
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
          setCustomGameConfig={setCustomGameConfig}
        />
        <button type="submit">Confirm</button>
      </fieldset>
    </form>
  );
}
