import {
  Button,
  Checkbox,
  Combobox,
  DatePicker,
  Field,
  FieldControl,
  FieldDescription,
  FieldError,
  FieldLabel,
  FileInput,
  FormActions,
  Input,
  NativeSelect,
  OtpInput,
  PriceInput,
  RadioGroup,
  RadioGroupItem,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Switch,
  TagInput,
  Textarea,
  type ComboboxItem,
} from "@avero/react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useId, useState, type FormEvent } from "react";

// Phase 4 exit gate: one form with every form control and validation on, completed with the
// keyboard only in `tests/forms.spec.ts`.

type Values = {
  name: string;
  bio: string;
  city: string;
  level: string;
  course: string;
  startDate: string | null;
  budget: number | null;
  skills: string[];
  code: string;
  resume: File[];
  terms: boolean;
  plan: string;
  newsletter: boolean;
};

type Errors = Partial<Record<keyof Values, string>>;

const INITIAL_VALUES: Values = {
  name: "",
  bio: "",
  city: "",
  level: "",
  course: "",
  startDate: null,
  budget: null,
  skills: [],
  code: "",
  resume: [],
  terms: false,
  plan: "",
  newsletter: false,
};

const COURSES: ComboboxItem[] = [
  {
    label: "طراحی",
    options: [
      { value: "ui", label: "طراحی رابط کاربری" },
      { value: "motion", label: "موشن گرافیک" },
    ],
  },
  {
    label: "داده",
    options: [
      { value: "analytics", label: "تحلیل داده" },
      { value: "ml", label: "یادگیری ماشین" },
    ],
  },
];

const MB = 1024 * 1024;

function validate(values: Values): Errors {
  const errors: Errors = {};
  if (values.name.trim().length < 3) errors.name = "نام باید حداقل ۳ نویسه باشد.";
  if (values.bio.trim().length < 10) errors.bio = "معرفی باید حداقل ۱۰ نویسه باشد.";
  if (!values.city) errors.city = "شهر را انتخاب کنید.";
  if (!values.level) errors.level = "سطح را انتخاب کنید.";
  if (!values.course) errors.course = "دوره را انتخاب کنید.";
  if (!values.startDate) errors.startDate = "تاریخ شروع را وارد کنید.";
  if (!values.budget) errors.budget = "بودجه را وارد کنید.";
  if (values.skills.length === 0) errors.skills = "حداقل یک مهارت اضافه کنید.";
  if (values.code.length !== 6) errors.code = "کد ۶ رقمی را وارد کنید.";
  if (values.resume.length === 0) errors.resume = "رزومه را پیوست کنید.";
  if (!values.terms) errors.terms = "پذیرش قوانین لازم است.";
  if (!values.plan) errors.plan = "یک طرح را انتخاب کنید.";
  return errors;
}

function RegistrationForm() {
  const [values, setValues] = useState(INITIAL_VALUES);
  const [attempted, setAttempted] = useState(false);
  const [submitted, setSubmitted] = useState<string | null>(null);
  const planLabelId = useId();
  const planErrorId = useId();

  const errors = attempted ? validate(values) : {};

  function update<Key extends keyof Values>(key: Key, value: Values[Key]) {
    setValues((current) => ({ ...current, [key]: value }));
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setAttempted(true);
    if (Object.keys(validate(values)).length > 0) {
      setSubmitted(null);
      // Keyboard users land on the first problem once the errors have rendered.
      requestAnimationFrame(() => {
        form
          .querySelector<HTMLElement>('[aria-invalid="true"]:is(input, textarea, select, button)')
          ?.focus();
      });
      return;
    }
    setSubmitted(
      JSON.stringify({ ...values, resume: values.resume.map((file) => file.name) }, null, 2),
    );
  }

  return (
    <form
      aria-label="ثبت‌نام در دوره"
      noValidate
      onSubmit={onSubmit}
      className="flex max-w-xl flex-col gap-5"
    >
      <Field required invalid={Boolean(errors.name)}>
        <FieldLabel>نام و نام خانوادگی</FieldLabel>
        <FieldControl>
          <Input value={values.name} onChange={(event) => update("name", event.target.value)} />
        </FieldControl>
        <FieldError>{errors.name}</FieldError>
      </Field>

      <Field required invalid={Boolean(errors.bio)}>
        <FieldLabel>معرفی کوتاه</FieldLabel>
        <FieldControl>
          <Textarea value={values.bio} onChange={(event) => update("bio", event.target.value)} />
        </FieldControl>
        <FieldError>{errors.bio}</FieldError>
      </Field>

      <Field required invalid={Boolean(errors.city)}>
        <FieldLabel>شهر</FieldLabel>
        <FieldControl>
          <NativeSelect
            value={values.city}
            onChange={(event) => update("city", event.target.value)}
          >
            <option value="">انتخاب شهر</option>
            <option value="tehran">تهران</option>
            <option value="shiraz">شیراز</option>
            <option value="tabriz">تبریز</option>
          </NativeSelect>
        </FieldControl>
        <FieldError>{errors.city}</FieldError>
      </Field>

      <Field required invalid={Boolean(errors.level)}>
        <FieldLabel>سطح</FieldLabel>
        <Select value={values.level} onValueChange={(level) => update("level", level)}>
          <FieldControl>
            <SelectTrigger>
              <SelectValue placeholder="انتخاب سطح" />
            </SelectTrigger>
          </FieldControl>
          <SelectContent>
            <SelectItem value="beginner">مقدماتی</SelectItem>
            <SelectItem value="intermediate">متوسط</SelectItem>
            <SelectItem value="advanced">پیشرفته</SelectItem>
          </SelectContent>
        </Select>
        <FieldError>{errors.level}</FieldError>
      </Field>

      <Field required invalid={Boolean(errors.course)}>
        <FieldLabel>دوره</FieldLabel>
        <FieldControl>
          <Combobox
            options={COURSES}
            value={values.course}
            onValueChange={(course) => update("course", course)}
            placeholder="نام دوره را بنویسید"
          />
        </FieldControl>
        <FieldError>{errors.course}</FieldError>
      </Field>

      <Field required invalid={Boolean(errors.startDate)}>
        <FieldLabel>تاریخ شروع</FieldLabel>
        <FieldControl>
          <DatePicker
            value={values.startDate}
            onValueChange={(startDate) => update("startDate", startDate)}
          />
        </FieldControl>
        <FieldError>{errors.startDate}</FieldError>
      </Field>

      <Field required invalid={Boolean(errors.budget)}>
        <FieldLabel>بودجه</FieldLabel>
        <FieldControl>
          <PriceInput value={values.budget} onValueChange={(budget) => update("budget", budget)} />
        </FieldControl>
        <FieldError>{errors.budget}</FieldError>
      </Field>

      <Field required invalid={Boolean(errors.skills)}>
        <FieldLabel>مهارت‌ها</FieldLabel>
        <FieldControl>
          <TagInput value={values.skills} onValueChange={(skills) => update("skills", skills)} />
        </FieldControl>
        <FieldDescription>هر مهارت را بنویسید و Enter بزنید.</FieldDescription>
        <FieldError>{errors.skills}</FieldError>
      </Field>

      <Field required invalid={Boolean(errors.code)}>
        <FieldLabel>کد تأیید</FieldLabel>
        <FieldControl>
          <OtpInput value={values.code} onValueChange={(code) => update("code", code)} />
        </FieldControl>
        <FieldError>{errors.code}</FieldError>
      </Field>

      <Field required invalid={Boolean(errors.resume)}>
        <FieldLabel>رزومه</FieldLabel>
        <FieldControl>
          <FileInput
            accept=".pdf"
            maxSize={2 * MB}
            value={values.resume}
            onValueChange={(resume) => update("resume", resume)}
          />
        </FieldControl>
        <FieldError>{errors.resume}</FieldError>
      </Field>

      <Field required invalid={Boolean(errors.terms)}>
        <div className="flex items-center gap-2">
          <FieldControl>
            <Checkbox
              checked={values.terms}
              onCheckedChange={(checked) => update("terms", checked === true)}
            />
          </FieldControl>
          <FieldLabel>قوانین و مقررات را می‌پذیرم</FieldLabel>
        </div>
        <FieldError>{errors.terms}</FieldError>
      </Field>

      <div className="flex flex-col gap-2">
        <p id={planLabelId} className="text-sm font-medium text-gray-700">
          طرح
        </p>
        <RadioGroup
          aria-labelledby={planLabelId}
          aria-required
          aria-invalid={Boolean(errors.plan) || undefined}
          aria-describedby={errors.plan ? planErrorId : undefined}
          value={values.plan}
          onValueChange={(plan) => update("plan", plan)}
          className="flex gap-6"
        >
          {[
            { value: "basic", label: "پایه" },
            { value: "pro", label: "حرفه‌ای" },
          ].map((plan) => (
            <div key={plan.value} className="flex items-center gap-2">
              <RadioGroupItem id={`plan-${plan.value}`} value={plan.value} />
              <label htmlFor={`plan-${plan.value}`} className="text-sm text-gray-700">
                {plan.label}
              </label>
            </div>
          ))}
        </RadioGroup>
        {errors.plan ? (
          <p id={planErrorId} role="alert" className="text-xs leading-5 text-red-600">
            {errors.plan}
          </p>
        ) : null}
      </div>

      <Field>
        <div className="flex items-center gap-2">
          <FieldControl>
            <Switch
              checked={values.newsletter}
              onCheckedChange={(newsletter) => update("newsletter", newsletter)}
            />
          </FieldControl>
          <FieldLabel>دریافت خبرنامه</FieldLabel>
        </div>
      </Field>

      <FormActions hint="همه فیلدها به‌جز خبرنامه الزامی‌اند.">
        <Button type="submit">ثبت‌نام</Button>
      </FormActions>

      <div role="status" className="text-sm text-gray-700">
        {submitted ? (
          <>
            <p>فرم با موفقیت ارسال شد.</p>
            <pre dir="ltr" className="mt-2 overflow-x-auto rounded-xl bg-gray-50 p-3 text-xs">
              {submitted}
            </pre>
          </>
        ) : null}
      </div>
    </form>
  );
}

const meta = {
  title: "Patterns/Forms Demo",
  component: RegistrationForm,
  tags: ["!autodocs"],
} satisfies Meta<typeof RegistrationForm>;

export default meta;

export const Registration: StoryObj<typeof meta> = {};
