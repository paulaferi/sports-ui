import { useState } from "react";
import type { PlayerPosition, Player } from "../../types";
import "./PlayerForm.css";

type PlayerFormValues = {
  name: string;
  position: PlayerPosition;
  number: number;
};

export function PlayerForm({
  onSubmit,
  defaultNumber = 1,
}: {
  onSubmit: (values: PlayerFormValues) => void;
  defaultNumber?: number;
}) {
  const [values, setValues] = useState<PlayerFormValues>({
    name: "",
    position: "MF",
    number: defaultNumber,
  });

  const [error, setError] = useState<string | null>(null);

  function handleChange<K extends keyof PlayerFormValues>(
    key: K,
    val: PlayerFormValues[K],
  ) {
    setValues((prev) => ({ ...prev, [key]: val }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Validaciones simples
    if (!values.name.trim()) return setError("Name is required.");
    if (!["GK", "DF", "MF", "FW"].includes(values.position))
      return setError("Invalid position.");
    if (values.number <= 0) return setError("Number must be positive.");
    setError(null);
    onSubmit(values);
    // Reset opcional del formulario
    setValues({ name: "", position: "MF", number: defaultNumber });
  }

  return (
    <form className="player-form" onSubmit={handleSubmit}>
      <h3 className="player-form__title">Add player</h3>

      {error && (
        <div className="player-form__error" role="alert">
          {error}
        </div>
      )}

      <div className="player-form__row">
        <label className="player-form__label">Name</label>
        <input
          className="player-form__input"
          type="text"
          value={values.name}
          onChange={(e) => handleChange("name", e.target.value)}
          placeholder="Player name"
        />
      </div>

      <div className="player-form__row">
        <label className="player-form__label">Position</label>
        <select
          className="player-form__select"
          value={values.position}
          onChange={(e) =>
            handleChange("position", e.target.value as PlayerPosition)
          }
        >
          <option value="GK">Goalkeeper</option>
          <option value="DF">Defender</option>
          <option value="MF">Midfielder</option>
          <option value="FW">Forward</option>
        </select>
      </div>

      <div className="player-form__row">
        <label className="player-form__label">Number</label>
        <input
          className="player-form__input"
          type="number"
          min={1}
          value={values.number}
          onChange={(e) => handleChange("number", Number(e.target.value))}
          placeholder="Shirt number"
        />
      </div>

      <div className="player-form__actions">
        <button
          className="player-form__submit"
          type="submit"
          disabled={!values.name.trim() || values.number <= 0}
        >
          Add
        </button>
      </div>
    </form>
  );
}
