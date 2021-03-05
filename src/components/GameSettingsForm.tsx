import React from 'react';
import { useStore } from '../store';
import { Difficulty, gameSettingsConfig } from '../gameDifficultyConfig';

export function GameSettingsForm() {
  const [selected, setSelected] = React.useState<undefined | Difficulty>(
    undefined
  );
  const restartGame = useStore((s) => s.restartGame);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selected) {
      restartGame(gameSettingsConfig[selected]);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <legend>Choose your difficulty</legend>
        <div className="field-row">
          <input
            onChange={() => setSelected(Difficulty.EASY)}
            checked={selected === Difficulty.EASY}
            id="easy"
            type="radio"
            name="easy"
          />
          <label htmlFor="easy">Easy</label>
        </div>
        <div className="field-row">
          <input
            onChange={() => setSelected(Difficulty.MEDIUM)}
            checked={selected === Difficulty.MEDIUM}
            id="medium"
            type="radio"
            name="medium"
          />
          <label htmlFor="medium">Medium</label>
        </div>
        <div className="field-row">
          <input
            onChange={() => setSelected(Difficulty.EXPERT)}
            checked={selected === Difficulty.EXPERT}
            id="expert"
            type="radio"
            name="expert"
          />
          <label htmlFor="expert">Expert</label>
        </div>
      </fieldset>
      <button type="submit">Confirm</button>
    </form>
  );
}