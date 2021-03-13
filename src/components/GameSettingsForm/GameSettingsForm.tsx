import React from 'react';
import { useStore } from '../../store';
import { Difficulty } from '../../gameDifficultyConfig';
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
  const { setCurrentDifficulty, closeSettingsWindow, restartGame } = useStore(
    (s) => ({
      restartGame: s.restartGame,
      closeSettingsWindow: s.setSettingsWindowClosed,
      setCurrentDifficulty: s.setCurrentDifficulty,
    })
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (selected) {
      setCurrentDifficulty(selected);

      if (selected === Difficulty.CUSTOM) {
        return;
      }

      restartGame();
      closeSettingsWindow();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <legend>Choose your difficulty</legend>
        {[Difficulty.EASY, Difficulty.MEDIUM, Difficulty.EXPERT].map((d) => (
          <DifficultyFieldRow
            difficulty={d}
            isSelected={selected === d}
            onChange={() => setSelected(d)}
          />
        ))}
        <div className="field-row">
          <input
            onChange={() => setSelected(Difficulty.CUSTOM)}
            checked={selected === Difficulty.CUSTOM}
            id="custom"
            type="radio"
            name="custom"
          />
          <label htmlFor="custom">Custom</label>
        </div>
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
