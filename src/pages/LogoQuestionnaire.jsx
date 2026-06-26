import { useMemo, useState } from "react";

import { ContactSection, PortfolioLayout, PortfolioReveal } from "../components/portfolio/PortfolioLayout.jsx";
import {
  INITIAL_FORM,
  LOGO_QUESTIONNAIRE_STEPS,
  validateStep,
} from "../data/logoQuestionnaire.js";

export default function LogoQuestionnairePage() {
  const [stepIndex, setStepIndex] = useState(0);
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [submitError, setSubmitError] = useState("");

  const step = LOGO_QUESTIONNAIRE_STEPS[stepIndex];
  const progress = useMemo(
    () => Math.round(((stepIndex + 1) / LOGO_QUESTIONNAIRE_STEPS.length) * 100),
    [stepIndex],
  );

  const updateField = (name, value) => {
    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => {
      if (!current[name]) return current;
      const next = { ...current };
      delete next[name];
      return next;
    });
  };

  const toggleDeliverable = (option) => {
    setForm((current) => {
      const selected = new Set(current.deliverables);
      if (selected.has(option)) selected.delete(option);
      else selected.add(option);
      return { ...current, deliverables: [...selected] };
    });
    setErrors((current) => {
      if (!current.deliverables) return current;
      const next = { ...current };
      delete next.deliverables;
      return next;
    });
  };

  const goNext = () => {
    const stepErrors = validateStep(step, form);
    if (Object.keys(stepErrors).length) {
      setErrors(stepErrors);
      return;
    }

    setErrors({});
    setStepIndex((current) => Math.min(current + 1, LOGO_QUESTIONNAIRE_STEPS.length - 1));
  };

  const goBack = () => {
    setErrors({});
    setStepIndex((current) => Math.max(current - 1, 0));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    let allErrors = {};
    LOGO_QUESTIONNAIRE_STEPS.forEach((currentStep) => {
      allErrors = { ...allErrors, ...validateStep(currentStep, form) };
    });

    if (Object.keys(allErrors).length) {
      setErrors(allErrors);
      const firstStepWithError = LOGO_QUESTIONNAIRE_STEPS.findIndex((currentStep) =>
        currentStep.fields.some((field) => allErrors[field.name]),
      );
      if (firstStepWithError >= 0) setStepIndex(firstStepWithError);
      return;
    }

    setStatus("submitting");
    setSubmitError("");

    try {
      const response = await fetch("/api/submit-logo-questionnaire", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const payload = await response.json();
      if (!response.ok) {
        if (payload.errors) setErrors(payload.errors);
        throw new Error(payload.error || "Submission failed.");
      }

      setStatus("success");
    } catch (error) {
      setStatus("idle");
      setSubmitError(error.message || "Something went wrong. Please try again.");
    }
  };

  if (status === "success") {
    return (
      <PortfolioLayout>
        <section className="portfolio-section logo-questionnaire-page">
          <div className="logo-questionnaire-shell logo-questionnaire-success portfolio-reveal">
            <p className="tc-section-kicker">Submitted</p>
            <h1>Thanks — your logo brief is on its way.</h1>
            <p>
              I received your responses and a branded PDF summary was emailed to me. I&apos;ll review everything and
              follow up at <strong>{form.email}</strong> soon.
            </p>
            <a href="/" className="portfolio-button portfolio-primary">
              Back to Home
            </a>
          </div>
        </section>
      </PortfolioLayout>
    );
  }

  return (
    <PortfolioLayout>
      <section className="portfolio-section portfolio-subpage-hero logo-questionnaire-hero">
        <PortfolioReveal className="portfolio-hero-kicker">New Logo Project / Client Brief</PortfolioReveal>
        <PortfolioReveal as="h1" className="portfolio-hero-title">
          Logo Discovery Questionnaire
        </PortfolioReveal>
        <PortfolioReveal as="p" className="portfolio-hero-copy">
          A guided brief to capture your business, goals, style, and project needs before we start designing.
        </PortfolioReveal>
      </section>

      <section className="portfolio-section logo-questionnaire-page">
        <div className="logo-questionnaire-shell portfolio-reveal">
          <div className="logo-questionnaire-progress" aria-hidden="true">
            <span style={{ width: `${progress}%` }} />
          </div>

          <div className="logo-questionnaire-step-meta">
            <p>
              Step {stepIndex + 1} of {LOGO_QUESTIONNAIRE_STEPS.length}
            </p>
            <h2>{step.title}</h2>
            <span>{step.description}</span>
          </div>

          <form className="logo-questionnaire-form" onSubmit={stepIndex === LOGO_QUESTIONNAIRE_STEPS.length - 1 ? handleSubmit : (event) => event.preventDefault()}>
            <div className="logo-questionnaire-fields">
              {step.fields.map((field) => (
                <div key={field.name} className={`logo-questionnaire-field ${errors[field.name] ? "has-error" : ""}`}>
                  <label htmlFor={field.name}>
                    {field.label}
                    {field.required ? <span aria-hidden="true"> *</span> : null}
                  </label>

                  {field.type === "textarea" ? (
                    <textarea
                      id={field.name}
                      name={field.name}
                      rows={4}
                      value={form[field.name]}
                      placeholder={field.placeholder}
                      onChange={(event) => updateField(field.name, event.target.value)}
                    />
                  ) : null}

                  {field.type === "select" ? (
                    <select
                      id={field.name}
                      name={field.name}
                      value={form[field.name]}
                      onChange={(event) => updateField(field.name, event.target.value)}
                    >
                      <option value="">Select one</option>
                      {field.options.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  ) : null}

                  {field.type === "checkbox-group" ? (
                    <div className="logo-questionnaire-checkboxes">
                      {field.options.map((option) => (
                        <label key={option} className="logo-questionnaire-checkbox">
                          <input
                            type="checkbox"
                            checked={form.deliverables.includes(option)}
                            onChange={() => toggleDeliverable(option)}
                          />
                          <span>{option}</span>
                        </label>
                      ))}
                    </div>
                  ) : null}

                  {["text", "email", "tel", "url", "date"].includes(field.type) ? (
                    <input
                      id={field.name}
                      name={field.name}
                      type={field.type}
                      value={form[field.name]}
                      placeholder={field.placeholder}
                      onChange={(event) => updateField(field.name, event.target.value)}
                    />
                  ) : null}

                  {errors[field.name] ? <p className="logo-questionnaire-error">{errors[field.name]}</p> : null}
                </div>
              ))}
            </div>

            {submitError ? <p className="logo-questionnaire-submit-error">{submitError}</p> : null}

            <div className="logo-questionnaire-actions">
              <button type="button" className="portfolio-button portfolio-secondary" onClick={goBack} disabled={stepIndex === 0 || status === "submitting"}>
                Back
              </button>

              {stepIndex < LOGO_QUESTIONNAIRE_STEPS.length - 1 ? (
                <button type="button" className="portfolio-button portfolio-primary" onClick={goNext}>
                  Continue
                </button>
              ) : (
                <button type="submit" className="portfolio-button portfolio-primary" disabled={status === "submitting"}>
                  {status === "submitting" ? "Submitting..." : "Submit Brief"}
                </button>
              )}
            </div>
          </form>
        </div>
      </section>

      <ContactSection />
    </PortfolioLayout>
  );
}
