const current_path = 'consult';
const current_path_version = 'demo';
const default_page = 'survey';
const fmConfig = {
  current_path: current_path,
  current_path_version: current_path_version,
  page_name: default_page,
  business_line: 'healthright',
  demo: true
};

const app_title = 'Get ready to speak with a doctor';
const app_subtitle = 'Qualify for your prescription now';

const personal_data = {
  name: "personal_data",
  component: "questions_1/register/register_1.js",
  app_title,
  app_subtitle,
  progress: true,
  next: {
    continue: "gender"
  }
};

const gender = {
  name: "gender",
  type: "Gender",
  app_title,
  app_subtitle,
  fields: {
    question_title: "What is your gender?"
  },
  next: {
    continue: "birthday"
  },
  progress: true
};

const birthday = {
  name: "birthday",
  type: "Birthday",
  app_title,
  app_subtitle,
  fields: {
    question_title: "When is your birthday?",
    min_age: 18
  },
  next: {
    continue: "motivation"
  },
  progress: true
};


const motivation = {
  name: "motivation",
  type: "SingleChoice",
  fields: {
    question_title: "Why do you want to solve this problem",
    question_subtitle: "(Select the most important)",
    answer: 'service_reasoning',
    data: [
      {
        title: 'Motivation 1',
        field: 'motivation_1',
        set: '1'
      },
      {
        title: 'Motivation 2',
        field: 'motivation_2',
        set: '2'
      },
      {
        title: 'Motivation 3',
        field: 'motivation_3',
        set: '3'
      },
      {
        title: 'Other',
        field: 'reason_other',
        set: 'other'
      }
    ]
  },
  app_title,
  app_subtitle,
  next: {
    continue: "symptoms"
  },
  progress: true
};


const symptoms  = {
  name: "symptoms",
  type: "MultipleChoice",
  fields: {
    question_title: "Which symptoms are you experiencing?",
    question_subtitle: "(Please Select all that apply)",
    data: [
      {
        title: 'Symptom 1',
        field: 'symptoms_1'
      },
      {
        title: 'Symptom 2',
        field: 'symptoms_2'
      },
      {
        title: 'Symptom 3',
        field: 'symptoms_3'
      },
      {
        title: 'None of the above',
        field: 'symptoms_none',
        reset: true
      }
    ]
  },
  app_title,
  app_subtitle,
  next: {
    continue: "symptoms_duration"
  },
  progress: true
};

const symptoms_duration = {
  name: "symptoms_duration",
  type: "SingleChoice",
  fields: {
    question_title: "How long have you been experiencing symptoms?",
    question_subtitle: "(Select one)",
    answer: 'symptoms_duration',
    data: [
      {
        title: 'Less than a month',
        field: 'symptoms_length_1',
        set: '1'
      },
      {
        title: 'One to six months',
        field: 'symptoms_length_2',
        set: '2'
      },
      {
        title: 'More than six months',
        field: 'symptoms_length_3',
        set: '3'
      }
    ]
  },
  app_title,
  app_subtitle,
  next: {
    continue: "allergies"
  },
  progress: true
};

const allergies = {
  name: "allergies",
  type: "YesNo",
  fields: {
    question_title: "Do you have any known allergies to ingredient?",
    answer: "allergies"
  },
  app_title,
  app_subtitle,
  next: {
    continue: "current_medications",
    no: "current_medications"
  },
  progress: true
};

const current_medications  = {
  name: "current_medications",
  type: "MultipleChoice",
  fields: {
    question_title: "Are you taking any of the following?",
    question_subtitle: "(Please Select all that apply)",
    data: [
      {
        title: 'Medication 1',
        field: 'current_medication_1'
      },
      {
        title: 'Medication 2',
        field: 'current_medication_2'
      },
      {
        title: 'Medication 3',
        field: 'current_medication_3'
      },
      {
        title: 'None of the above',
        field: 'current_medication_none',
        reset: true
      }
    ]
  },
  app_title,
  app_subtitle,
  next: {
    continue: "loader"
  },
  progress: true
};

const loader = {
  name: "loader",
  component: "questions_1/loader/loader_1.js",
  app_title,
  app_subtitle,
  next: {
    continue: "complete_registration",
    no: "complete_registration"
  },
  progress: true
};

const complete_registration = {
  name: "complete_registration",
  component: "questions_1/complete_registration/complete_registration.js",
  app_title: 'Congratulations',
  app_subtitle: "You're Approved to Start Your Consultation",
  progress: false,
  next: {
    continue: "schedule"
  },
  render_special: true
};

const schedule = {
  name: "schedule",
  component: "questions_1/schedule/schedule_1.js",
  app_title: "Congratulations",
  app_subtitle: "You're Approved to Start Your Consultation",
  progress: false,
  next: {
    continue: "qualified"
  },
  render_special: true
};

const qualified = {
  name: "qualified",
  component: "questions_1/qualified/qualified_1.js",
  app_title: "Consultation Scheduled",
  app_subtitle: "You've Scheduled Your Consultation",
  progress: false,
  next: {
    continue: ""
  },
  render_special: true
};

module.exports = {
  name: current_path,
  version: current_path_version,
  page_name: default_page,
  description: "Demo survey path",
  fm: fmConfig,
  qualified_url: "",
  disqualified_url: "",
  paths: [
    personal_data,
    gender,
    birthday,
    motivation,
    symptoms,
    symptoms_duration,
    allergies,
    current_medications,
    loader,
    complete_registration,
    schedule,
    qualified
  ]
};


/*
[
  { "name": "personal_data" },
  { "name": "gender" },
  { "name": "birthday" },
  { "name": "motivation", "type": "SingleChoice" },
  { "name": "symptoms", "type": "MultipleChoice" },
  { "name": "symptoms_duration", "type": "SingleChoice" },
  { "name": "allergies", "type": "YesNo" },
  { "name": "current_medications", "type": "MultipleChoice" }
]
{
  "first_name" : "fffff",
  "last_name" : "hhhhhhhh",
  "email" : "thisguyinwyoming@mailinator.com",
  "phone" : "5555555555",
  "zip_code" : "82002",
  "gender": "no",
  "birthday": "11111961",
  "motivation": "motivation_1",
  "symptoms": "symptoms_none",
  "symptoms_duration": "symptoms_length_1",
  "allergies": "no",
  "current_medications": "current_medication_1"
}
*/
