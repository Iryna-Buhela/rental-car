"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import type { FormikHelpers } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import css from "./RentForm.module.css";

interface RentFormProps {
  carId: string;
  carName: string;
}

type FormValues = {
  name: string;
  email: string;
  date: string;
  comment?: string;
};

export default function RentForm({ carId, carName }: RentFormProps) {
  const todayISO = new Date().toISOString().split("T")[0];

  const Schema = Yup.object({
    name: Yup.string()
      .trim()
      .min(2, "Minimum 2 characters")
      .required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    date: Yup.string()
      .required("Date is required")
      .test(
        "not-past",
        "Date must be today or in the future",
        (v) => !v || v >= todayISO
      ),
    comment: Yup.string().max(500, "Maximum 500 characters"),
  });

  const initialValues: FormValues = {
    name: "",
    email: "",
    date: "",
    comment: "",
  };

  const onSubmit = async (
    values: FormValues,
    helpers: FormikHelpers<FormValues>
  ) => {
    try {
      await new Promise((r) => setTimeout(r, 1000));

      toast.success(
        `Successfully booked ${carName}! We'll contact you at ${values.email}`,
        {
          duration: 5000,
        }
      );

      helpers.resetForm();
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      helpers.setSubmitting(false);
    }
  };

  return (
    <div className={css.formContainer}>
      <h2 className={css.title}>Book your car now</h2>
      <p className={css.subtitle}>
        Stay connected! We are always ready to help you.
      </p>

      <Formik<FormValues>
        initialValues={initialValues}
        validationSchema={Schema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form className={css.form} noValidate>
            <div className={css.grid}>
              <div className={css.field}>
                <Field
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Name*"
                  className={`${css.input} ${touched.name && errors.name ? css.inputError : ""}`}
                  aria-invalid={!!(touched.name && errors.name)}
                  aria-describedby={
                    touched.name && errors.name ? "name-error" : undefined
                  }
                />
                <ErrorMessage
                  id="name-error"
                  name="name"
                  component="div"
                  className={css.errorText}
                />
              </div>

              <div className={css.field}>
                <Field
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email*"
                  className={`${css.input} ${touched.email && errors.email ? css.inputError : ""}`}
                  aria-invalid={!!(touched.email && errors.email)}
                  aria-describedby={
                    touched.email && errors.email ? "email-error" : undefined
                  }
                />
                <ErrorMessage
                  id="email-error"
                  name="email"
                  component="div"
                  className={css.errorText}
                />
              </div>

              <div className={`${css.field} ${css.fullWidth}`}>
                <Field
                  id="date"
                  name="date"
                  type="date"
                  min={todayISO}
                  placeholder="Booking date"
                  className={`${css.input} ${touched.date && errors.date ? css.inputError : ""}`}
                  aria-invalid={!!(touched.date && errors.date)}
                  aria-describedby={
                    touched.date && errors.date ? "date-error" : undefined
                  }
                />
                <ErrorMessage
                  id="date-error"
                  name="date"
                  component="div"
                  className={css.errorText}
                />
              </div>

              <div className={`${css.field} ${css.fullWidth}`}>
                <Field
                  as="textarea"
                  id="comment"
                  name="comment"
                  rows={4}
                  placeholder="Comment"
                  className={`${css.input} ${css.textarea}`}
                />
                <ErrorMessage
                  name="comment"
                  component="div"
                  className={css.errorText}
                />
              </div>
            </div>

            <input type="hidden" name="carId" value={carId} />
            <input type="hidden" name="carName" value={carName} />

            <button
              type="submit"
              className={css.submitBtn}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending…" : "Send"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
