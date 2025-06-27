import "./style.scss";

import { Field } from "formik";
import React from "react";

type Props = {
  item: {
    question: string;
    options: Array<{
      text: string;
      score: number;
    }>;
    id: string;
    description?: string;
  };
  errors: {
    [key: string]: string | undefined;
  };
  touched: {
    [key: string]: boolean | undefined;
  };
  showErrors?: boolean;
};

const FormQuestion = ({ item, errors, touched }: Props) => {
  const { question, options, id, description } = item;
  // Gestion des touches clavier pour l'accessibilité
  const handleKeyDown = (event: React.KeyboardEvent, callback: () => void) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      callback();
    }
  };

  const optionIsChecked = (option: { text: string; score: number }) => {
    const inputId = `option-${item.id}-${options.indexOf(option)}`;
    const inputElement = document.getElementById(inputId) as HTMLInputElement;
    return inputElement?.checked || false;
  };

  return (
    <div className="FormQuestion" key={id}>
      <fieldset
        aria-describedby={errors[id] && touched[id] ? `error-${id}` : undefined}
      >
        <legend id={`legend-${id}`}>
          <h3 className="h5">{question}</h3>
        </legend>
        {description && (
          <p className="FormQuestion__description">{description}</p>
        )}
        <div
          role="radiogroup"
          aria-labelledby={`legend-${id}`}
          aria-required="true"
        >
          {options?.map(
            (option: { text: string; score: number }, index: number) => {
              const inputId = `option-${item.id}-${index}`;
              return (
                <div key={index}>
                  <div className={"FormQuestion__option"}>
                    <Field
                      type="radio"
                      id={inputId}
                      name={id}
                      value={option.score.toString()}
                      aria-describedby={
                        errors[id] && touched[id] ? `error-${id}` : undefined
                      }
                      onKeyDown={(e: React.KeyboardEvent) =>
                        handleKeyDown(e, () => {
                          const input = e.target as HTMLInputElement;
                          input.checked = true;
                          input.focus();
                        })
                      }
                    />
                    <label htmlFor={inputId}>{option.text}</label>
                  </div>

                  {id === "technique-1" &&
                    index === options.length - 1 &&
                    optionIsChecked(options[options.length - 1]) && (
                      <Field
                        type="input"
                        id={`option-${item.id}-${index}-input`}
                        name={`${id}-ignore`}
                        placeholder="Précisez votre choix"
                        className="FormQuestion__input"
                        aria-describedby={
                          errors[id] && touched[id] ? `error-${id}` : undefined
                        }
                        onKeyDown={(e: React.KeyboardEvent) =>
                          handleKeyDown(e, () => {
                            const input = e.target as HTMLInputElement;
                            input.focus();
                          })
                        }
                      />
                    )}
                </div>
              );
            }
          )}
          {/* {showErrors && errors[id] && (
            <div className={`FormQuestion__error`} id={`error-${id}`}>
              {errors[id] || "Veuillez sélectionner une option."}
            </div>
          )} */}
        </div>
      </fieldset>
    </div>
  );
};

export default FormQuestion;
