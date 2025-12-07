import { useState } from "react";
import "./TeamForm.css";

type TeamFormValues = {
  name: string;
  city: string;
};

export function TeamForm({
  onSubmit,
}: {
  onSubmit: (values: TeamFormValues) => void;
}) {
  const [values, setValues] = useState<TeamFormValues>({ name: "", city: "" });
  const [error, setError] = useState<string | null>(null);

  function handleChange<K extends keyof TeamFormValues>(
    key: K,
    val: TeamFormValues[K],
  ) {
    setValues((prev) => ({ ...prev, [key]: val }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const name = values.name.trim();
    const city = values.city.trim();
    if (!name) return setError("Team name is required.");
    if (!city) return setError("City is required.");
    setError(null);
    onSubmit({ name, city });
    setValues({ name: "", city: "" }); // reset
  }

  return (
    <form className="team-form" onSubmit={handleSubmit}>
      <h3 className="team-form__title">Create new team</h3>

      {error && (
        <div className="team-form__error" role="alert">
          {error}
        </div>
      )}

      <div className="team-form__row">
        <label className="team-form__label">Name</label>
        <input
          className="team-form__input"
          type="text"
          value={values.name}
          onChange={(e) => handleChange("name", e.target.value)}
          placeholder="Team name"
        />
      </div>

      <div className="team-form__row">
        <label className="team-form__label">City</label>
        <input
          className="team-form__input"
          type="text"
          value={values.city}
          onChange={(e) => handleChange("city", e.target.value)}
          placeholder="City"
        />
      </div>

      <div className="team-form__actions">
        <button
          className="team-form__submit"
          type="submit"
          disabled={!values.name.trim() || !values.city.trim()}
        >
          Add team
        </button>
      </div>
    </form>
  );
}
