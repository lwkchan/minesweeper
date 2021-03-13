import { Difficulty } from '../../gameDifficultyConfig';

interface Props {
  difficulty: Difficulty;
  isSelected: boolean;
  onChange: () => void;
}

export function DifficultyFieldRow({
  difficulty,
  isSelected,
  onChange,
}: Props) {
  return (
    <div className="field-row">
      <input
        onChange={onChange}
        checked={isSelected}
        id={difficulty}
        type="radio"
        name={difficulty}
      />
      <label htmlFor={difficulty}>{difficulty}</label>
    </div>
  );
}
