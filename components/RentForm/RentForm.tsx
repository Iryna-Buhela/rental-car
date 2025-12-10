"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import type { FormikHelpers } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import css from "./RentForm.module.css";

interface RentFormProps {
  carId: string;
  carName: string;
}

type FormValues = {
  name: string;
  email: string;
  startDate: Date | null;
  endDate: Date | null;
  comment?: string;
};

export default function RentForm({ carId, carName }: RentFormProps) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const Schema = Yup.object({
    name: Yup.string()
      .trim()
      .min(2, "Minimum 2 characters")
      .max(50, "Maximum 50 characters")
      .required("Name is required"),
    email: Yup.string()
      .trim()
      .email("Invalid email format")
      .required("Email is required"),
    startDate: Yup.date()
      .nullable()
      .required("Start date is required")
      .test(
        "is-valid-date",
        "Start date must be today or in the future",
        function (value) {
          if (!value) return false;
          const dateOnly = new Date(value);
          dateOnly.setHours(0, 0, 0, 0);
          return dateOnly >= today;
        }
      ),
    endDate: Yup.date()
      .nullable()
      .required("End date is required")
      .test(
        "is-after-start",
        "End date must be after start date",
        function (value) {
          const { startDate } = this.parent;
          if (!value || !startDate) return false;
          return value >= startDate;
        }
      ),
    comment: Yup.string()
      .trim()
      .max(500, "Maximum 500 characters"),
  });

  const initialValues: FormValues = {
    name: "",
    email: "",
    startDate: null,
    endDate: null,
    comment: "",
  };

  const onSubmit = async (
    values: FormValues,
    helpers: FormikHelpers<FormValues>
  ) => {
    try {
      // Додаткова валідація перед відправкою
      if (!values.name.trim()) {
        helpers.setFieldError("name", "Name is required");
        helpers.setFieldTouched("name", true);
        return;
      }
      
      if (!values.email.trim()) {
        helpers.setFieldError("email", "Email is required");
        helpers.setFieldTouched("email", true);
        return;
      }

      if (!values.startDate) {
        helpers.setFieldError("startDate", "Start date is required");
        helpers.setFieldTouched("startDate", true);
        return;
      }

      if (!values.endDate) {
        helpers.setFieldError("endDate", "End date is required");
        helpers.setFieldTouched("endDate", true);
        return;
      }

      await new Promise((r) => setTimeout(r, 1000));

      const startDateStr = values.startDate.toLocaleDateString();
      const endDateStr = values.endDate.toLocaleDateString();

      toast.success(
        `Successfully booked ${carName} from ${startDateStr} to ${endDateStr}! We'll contact you at ${values.email}`,
        {
          duration: 5000,
        }
      );

      helpers.resetForm();
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      console.error("Form submission error:", error);
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
        {({ isSubmitting, errors, touched, values, setFieldValue, setFieldTouched }) => (
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
                  onBlur={() => {
                    setFieldTouched("name", true);
                  }}
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
                  onBlur={() => {
                    setFieldTouched("email", true);
                  }}
                />
                <ErrorMessage
                  id="email-error"
                  name="email"
                  component="div"
                  className={css.errorText}
                />
              </div>

              <div className={`${css.field} ${css.fullWidth}`}>
                <DatePicker
                  selectsRange
                  startDate={values.startDate}
                  endDate={values.endDate}
                  onChange={(dates) => {
                    const [start, end] = dates;
                    setFieldValue("startDate", start);
                    setFieldValue("endDate", end);
                  }}
                  minDate={today}
                  placeholderText="Booking date*"
                  className={`${css.input} ${css.dateInput} ${
                    (touched.startDate || touched.endDate) &&
                    (errors.startDate || errors.endDate)
                      ? css.inputError
                      : ""
                  }`}
                  dateFormat="dd/MM/yyyy"
                  isClearable={false}
                  onBlur={() => {
                    setFieldTouched("startDate", true);
                    setFieldTouched("endDate", true);
                  }}
                />
                {((touched.startDate && errors.startDate) ||
                  (touched.endDate && errors.endDate)) && (
                  <div className={css.errorText}>
                    {errors.startDate || errors.endDate}
                  </div>
                )}
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
