export function readCorrection(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error("invalid");
  const { lesson, change, name, email, credit, locale } = value;
  if (typeof lesson !== "string" || !/^[a-z0-9-]{1,80}$/.test(lesson)) throw new Error("lesson");
  if (typeof change !== "string" || change.trim().length < 20 || change.length > 3000)
    throw new Error("change");
  if (typeof name !== "string" || name.length > 80) throw new Error("name");
  if (
    typeof email !== "string" ||
    email.length > 254 ||
    (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
  )
    throw new Error("email");
  if (typeof credit !== "boolean" || (credit && !name.trim())) throw new Error("credit");
  if (locale !== "en" && locale !== "fr") throw new Error("locale");
  return { lesson, change: change.trim(), name: name.trim(), email: email.trim(), credit, locale };
}

export function enquiryPayload(value, turnstileToken) {
  const correction = readCorrection(value);
  const answers = {
    lesson: correction.lesson,
    message: correction.change,
    name: correction.name,
    email: correction.email,
    credit: correction.credit ? "yes" : "no",
    language: correction.locale,
  };
  return {
    journey: "academy-feedback",
    journeyName: "Academy correction or contribution",
    kind: "other",
    turnstileToken,
    answers,
    summary: Object.entries(answers).map(([field, value]) => ({
      field,
      label: field,
      value,
      isFile: false,
    })),
  };
}
